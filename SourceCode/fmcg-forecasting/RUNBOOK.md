1. Repository layout (relevant bits)

    SourceCode/

        fmcg-forecasting/

            notebooks/

                02_feature_engineering.ipynb

                03_model_baseline_xgboost.ipynb

            src/

                feature helper modules (e.g., features.py)

            Shared project assets/data/

                raw/datasets/ – input CSVs

                    sku_master.csv

                    location_master.csv

                    festival_calendar.csv

                    monthly_macro.csv

                    daily_timeseries.csv (expected main dataset – see below)

                processed/ – outputs (training table, predictions).

                ​

All code uses repo‑relative paths so it works on any machine.

​
2. Environment setup

    Open a terminal in SourceCode/fmcg-forecasting.

    Create and activate a virtual environment:

bash
python -m venv .venv
.venv\Scripts\activate      # Windows
# source .venv/bin/activate # macOS / Linux

Install dependencies from requirements.txt (to be committed with at least pandas, numpy, matplotlib, scikit-learn, xgboost, jupyter).

​

bash
pip install -r requirements.txt

Launch Jupyter:

    bash
    jupyter notebook

3. Data prerequisites

Place all input CSVs here:

SourceCode/fmcg-forecasting/Shared project assets/data/raw/datasets/

Required files:

​

    sku_master.csv – SKU attributes (sku_id, brand, category, segment, pack_size, material, base_price, cost).

    location_master.csv – location attributes (location_id, city, region, population, avg_income_index).

    festival_calendar.csv – event dates (date, festival).

    monthly_macro.csv – monthly economic indicators (month, gdp_growth, cpi_index, consumer_confidence).

    daily_timeseries.csv – main time-series dataset with at least:
    date, sku_id, location_id, units_sold plus any other raw fields (price, promo_flag, stock, etc.).

Without daily_timeseries.csv, 02/03 can be opened and read but not fully executed; this is clearly marked as a TODO in the notebooks.

​
4. Running the notebooks
4.1 02_feature_engineering.ipynb

Purpose: join the main daily time-series data with master tables and create a modelling table.

​

    Open 02_feature_engineering.ipynb in Jupyter.

    Run all cells in order. The notebook will:

        Load daily_timeseries.csv (once present).

        Attach SKU attributes from sku_master.csv via sku_id.

        Attach location attributes from location_master.csv via location_id.

        Add festival flags from festival_calendar.csv on date.

        Add macro features from monthly_macro.csv via month.

    The final cell writes a processed file:

    Shared project assets/data/processed/training_table.csv

    This is the input to the baseline model notebook.

    ​

4.2 03_model_baseline_xgboost.ipynb

Purpose: train and evaluate a simple XGBoost baseline model.

​

    Ensure training_table.csv exists in processed/ from step 4.1.

    Open 03_model_baseline_xgboost.ipynb.

    Run all cells in order. The notebook will:

        Load training_table.csv.

        Sort by date and split into train (first 80% of dates) and test (last 20%).

        Train an XGBRegressor to predict units_sold.

​

Compute MAE, MAPE, and a simple bias metric and print them.
​

​

Optionally save predictions (e.g., baseline_predictions.csv) into processed/ for dashboards or further analysis.

        ​

5. Conventions and notes

    No absolute paths: all file access uses pathlib.Path("..") from the notebooks so any teammate can run the code without editing paths.

​

​

Order of execution: always run 02_feature_engineering.ipynb before 03_model_baseline_xgboost.ipynb.

​

Expected schema: if the actual daily_timeseries.csv has different column names, adjust only the small “load & rename” section at the top of 02, not the whole notebook.

​

No credentials in code: AWS or other secrets should not appear in notebooks; those will be configured separately when deploying.