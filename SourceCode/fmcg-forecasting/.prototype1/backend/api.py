from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
from datetime import datetime
from pathlib import Path
import kagglehub
from kagglehub import KaggleDatasetAdapter

# Import config
try:
    from config import KAGGLE_USERNAME, KAGGLE_DATASET
except ImportError:
    print("⚠️  config.py not found. Copy config.example.py to config.py")
    KAGGLE_USERNAME = "sand35h44jsd"
    KAGGLE_DATASET = "fmcg-dataset"

app = Flask(__name__)
CORS(app)

# PATHS
BASE_DIR = Path(__file__).parent.parent
DATA_PROCESSED = BASE_DIR / "data" / "processed"
DATA_PROCESSED.mkdir(parents=True, exist_ok=True)

print(f"✓ Data: {DATA_PROCESSED}")
print(f"✓ Kaggle: {KAGGLE_USERNAME}/{KAGGLE_DATASET}")

# ========== HEALTH ==========
@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy", "timestamp": datetime.now().isoformat()})

# ========== DOWNLOAD FROM KAGGLE ==========
@app.route('/api/download-kaggle', methods=['POST'])
def download_kaggle():
    """Download dataset from Kaggle using kagglehub"""
    try:
        print("📥 Downloading from Kaggle...")
        
        # Download entire dataset
        path = kagglehub.dataset_download(f"{KAGGLE_USERNAME}/{KAGGLE_DATASET}")
        
        print(f"✅ Downloaded to: {path}")
        
        # Copy CSV files to processed folder
        import shutil
        downloaded_path = Path(path)
        
        csv_files = []
        for file in downloaded_path.glob("*.csv"):
            dest = DATA_PROCESSED / file.name
            shutil.copy(file, dest)
            csv_files.append(file.name)
            print(f"  Copied: {file.name}")
        
        return jsonify({
            "status": "success",
            "message": f"✅ Downloaded {len(csv_files)} files",
            "files": csv_files,
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        })
        
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

# ========== LOAD SPECIFIC FILE FROM KAGGLE ==========
@app.route('/api/load-kaggle-file', methods=['POST'])
def load_kaggle_file():
    """Load specific file from Kaggle dataset"""
    try:
        data = request.json
        filename = data.get('filename', 'competitor_activity.csv')
        
        print(f"📥 Loading {filename} from Kaggle...")
        
        # Load specific file using kagglehub
        df = kagglehub.load_dataset(
            KaggleDatasetAdapter.PANDAS,
            f"{KAGGLE_USERNAME}/{KAGGLE_DATASET}",
            filename
        )
        
        # Save to processed folder
        output_path = DATA_PROCESSED / filename
        df.to_csv(output_path, index=False)
        
        return jsonify({
            "status": "success",
            "filename": filename,
            "rows": len(df),
            "cols": len(df.columns),
            "preview": df.head(10).to_dict(orient='records')
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ========== STATUS ==========
@app.route('/api/status', methods=['GET'])
def get_status():
    try:
        # Check for baseline predictions
        pred_file = DATA_PROCESSED / "baseline_predictions.csv"
        metrics_file = DATA_PROCESSED / "model_metrics.csv"
        
        if not pred_file.exists():
            return jsonify({
                "db": {"status": "no_data", "rows": 0, "last_update": "N/A"},
                "model": {"status": "no_model", "algorithm": "N/A", "metric_value": 0}
            })
        
        df = pd.read_csv(pred_file)
        
        if metrics_file.exists():
            metrics = pd.read_csv(metrics_file)
            rmse = float(metrics['RMSE'].iloc[0]) if 'RMSE' in metrics.columns else 0
            model_status = "trained"
        else:
            rmse = 0
            model_status = "unknown"
        
        return jsonify({
            "db": {
                "status": "online",
                "rows": len(df),
                "last_update": datetime.fromtimestamp(pred_file.stat().st_mtime).strftime("%Y-%m-%d %H:%M")
            },
            "model": {"status": model_status, "algorithm": "XGBoost", "metric_value": rmse}
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ========== LIST DATASETS ==========
@app.route('/api/datasets', methods=['GET'])
def list_datasets():
    try:
        datasets = {"processed": []}
        
        for file in DATA_PROCESSED.glob("*.csv"):
            try:
                df = pd.read_csv(file, nrows=1)
                stat = file.stat()
                datasets["processed"].append({
                    "name": file.name,
                    "size": f"{stat.st_size / 1024:.2f} KB",
                    "rows": len(pd.read_csv(file)),
                    "cols": len(df.columns),
                    "modified": datetime.fromtimestamp(stat.st_mtime).strftime("%m/%d/%y %H:%M")
                })
            except:
                pass
        
        return jsonify(datasets)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ========== READ DATASET ==========
@app.route('/api/dataset/<filename>', methods=['GET'])
def read_dataset(filename):
    try:
        file_path = DATA_PROCESSED / filename
        if not file_path.exists():
            return jsonify({"error": f"File not found: {filename}"}), 404
        
        df = pd.read_csv(file_path)
        return jsonify({
            "filename": filename,
            "rows": len(df),
            "cols": len(df.columns),
            "columns": df.columns.tolist(),
            "preview": df.head(50).to_dict(orient='records')
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ========== FORECAST ==========
@app.route('/api/forecast', methods=['POST'])
def generate_forecast():
    try:
        data = request.json
        sku = data.get('sku')
        location = data.get('location')
        horizon = int(data.get('horizon', 7))
        
        pred_file = DATA_PROCESSED / "baseline_predictions.csv"
        if not pred_file.exists():
            return jsonify({"error": "No predictions. Download from Kaggle first."}), 404
        
        df = pd.read_csv(pred_file)
        
        if sku and 'sku_id' in df.columns:
            df = df[df['sku_id'] == sku]
        if location and 'location_id' in df.columns:
            df = df[df['location_id'] == location]
        
        forecast_data = df.head(horizon).to_dict(orient='records')
        
        return jsonify({"sku": sku, "location": location, "horizon": horizon, "forecast": forecast_data})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ========== JOBS ==========
@app.route('/api/jobs', methods=['GET'])
def get_jobs():
    jobs = [
        {
            "id": 1,
            "name": "XGBoost Training",
            "timestamp": "2025-12-28 19:45:00",
            "duration": "~8 mins",
            "status": "success",
            "platform": "Kaggle GPU",
            "metrics": {"RMSE": 0.873, "R2": 0.92}
        }
    ]
    return jsonify({"jobs": jobs})

if __name__ == '__main__':
    print("\n" + "="*60)
    print("🚀 FMCG Forecasting API")
    print("="*60)
    print(f"📁 Data: {DATA_PROCESSED}")
    print(f"☁️  Kaggle: {KAGGLE_USERNAME}/{KAGGLE_DATASET}")
    print("="*60)
    print("🌐 Server: http://localhost:5000")
    print("="*60 + "\n")
    
    app.run(debug=True, port=5000, host='0.0.0.0')
