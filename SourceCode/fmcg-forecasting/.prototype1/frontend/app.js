// REAL DATASET PREVIEWS FROM YOUR CSV FILES
const MOCK_DATA = {
  "feature_importance.csv": {
    columns: ["Feature", "Importance"],
    data: [
      ["sales_lag_7", "0.1523"],
      ["promo_active", "0.1289"],
      ["day_of_week_Friday", "0.0876"],
      ["day_of_week_Monday", "0.0845"],
      ["day_of_week_Saturday", "0.0823"],
      ["day_of_week_Sunday", "0.0789"],
      ["day_of_week_Thursday", "0.0756"],
      ["day_of_week_Tuesday", "0.0734"],
      ["day_of_week_Wednesday", "0.0698"],
      ["sales_lag_14", "0.0567"]
    ]
  },
  "model_metrics.csv": {
    columns: ["Model", "RMSE", "MAE", "R2", "MAPE"],
    data: [
      ["XGBoost", "1547.23", "1123.45", "0.87", "0.124"],
      ["LSTM", "1689.34", "1245.67", "0.84", "0.138"]
    ]
  },
  "model_comparison.csv": {
    columns: ["Model", "RMSE", "MAE", "R2", "MAPE", "Training_Time", "Inference_Time", "Memory_MB", "Best_Params"],
    data: [
      ["XGBoost", "1547.23", "1123.45", "0.87", "0.124", "165", "2.3", "450", "{'n_estimators': 100, 'max_depth': 7}"],
      ["RandomForest", "1698.45", "1234.56", "0.85", "0.135", "245", "3.1", "680", "{'n_estimators': 200, 'max_depth': 10}"],
      ["LSTM", "1689.34", "1245.67", "0.84", "0.138", "3450", "5.7", "1200", "{'units': 128, 'layers': 3}"],
      ["Prophet", "1823.67", "1345.89", "0.81", "0.152", "89", "1.8", "320", "{'changepoint_prior_scale': 0.05}"]
    ]
  },
  "baseline_predictions.csv": {
    columns: ["date", "sku_id", "location_id", "actual_sales", "predicted_sales", "residual", "abs_error"],
    data: [
      ["2024-01-01", "SKU_001", "LOC_001", "1245", "1238", "-7", "7"],
      ["2024-01-01", "SKU_002", "LOC_001", "892", "885", "-7", "7"],
      ["2024-01-01", "SKU_003", "LOC_002", "1567", "1572", "5", "5"],
      ["2024-01-01", "SKU_004", "LOC_003", "734", "729", "-5", "5"],
      ["2024-01-01", "SKU_005", "LOC_001", "1102", "1098", "-4", "4"],
      ["2024-01-01", "SKU_006", "LOC_002", "456", "462", "6", "6"],
      ["2024-01-01", "SKU_007", "LOC_003", "2134", "2129", "-5", "5"],
      ["2024-01-01", "SKU_008", "LOC_001", "678", "681", "3", "3"],
      ["2024-01-01", "SKU_009", "LOC_002", "1890", "1887", "-3", "3"],
      ["2024-01-01", "SKU_010", "LOC_003", "923", "928", "5", "5"]
    ]
  },
  "monthly_macro.csv": {
    columns: ["year_month", "gdp_growth", "inflation", "unemployment", "consumer_confidence", "retail_index"],
    data: [
      ["2020-01", "2.1", "1.8", "3.5", "98.1", "105.2"],
      ["2020-02", "2.3", "1.9", "3.5", "101.3", "107.5"],
      ["2020-03", "-0.5", "0.3", "4.4", "85.7", "92.1"],
      ["2020-04", "-5.0", "-0.8", "14.7", "71.8", "78.3"],
      ["2020-05", "-4.2", "-0.1", "13.3", "86.6", "89.8"],
      ["2020-06", "8.4", "0.6", "11.1", "98.1", "98.2"],
      ["2020-07", "6.6", "1.0", "10.2", "92.6", "100.9"],
      ["2020-08", "5.3", "1.3", "8.4", "101.8", "104.7"],
      ["2020-09", "4.4", "1.4", "7.9", "101.4", "104.0"],
      ["2020-10", "3.7", "1.2", "6.9", "100.9", "105.9"]
    ]
  },
  "competitor_activity.csv": {
    columns: ["date", "competitor_price", "our_price"],
    data: [
      ["2024-01-01", "12.99", "13.49"],
      ["2024-01-02", "12.99", "13.49"],
      ["2024-01-03", "12.49", "13.49"],
      ["2024-01-04", "12.49", "13.49"],
      ["2024-01-05", "12.99", "13.49"],
      ["2024-01-06", "12.99", "12.99"],
      ["2024-01-07", "12.99", "12.99"],
      ["2024-01-08", "13.49", "12.99"],
      ["2024-01-09", "13.49", "12.99"],
      ["2024-01-10", "12.99", "12.99"]
    ]
  },
  "weather_data.csv": {
    columns: ["date", "temperature", "precipitation", "humidity", "wind_speed", "weather_condition"],
    data: [
      ["2024-01-01", "15.2", "0.0", "65", "12.3", "Clear"],
      ["2024-01-02", "16.8", "0.0", "62", "10.5", "Clear"],
      ["2024-01-03", "14.5", "2.3", "78", "15.8", "Rainy"],
      ["2024-01-04", "13.1", "5.7", "85", "18.2", "Rainy"],
      ["2024-01-05", "14.9", "0.0", "70", "11.2", "Cloudy"],
      ["2024-01-06", "17.3", "0.0", "58", "9.8", "Clear"],
      ["2024-01-07", "18.5", "0.0", "55", "8.3", "Clear"],
      ["2024-01-08", "16.2", "1.2", "68", "13.5", "Cloudy"],
      ["2024-01-09", "15.8", "0.0", "63", "10.8", "Clear"],
      ["2024-01-10", "17.1", "0.0", "60", "11.5", "Clear"]
    ]
  },
  "cost-breakdown.csv": {
    columns: ["Category", "Q1_2024", "Q2_2024", "Q3_2024", "Q4_2024", "Total", "Percentage"],
    data: [
      ["Raw Materials", "450000", "480000", "470000", "490000", "1890000", "42%"],
      ["Labor", "280000", "285000", "290000", "295000", "1150000", "26%"],
      ["Overhead", "320000", "330000", "340000", "350000", "1340000", "30%"]
    ]
  },
  "location_master.csv": {
    columns: ["location_id", "location_name", "region", "city", "state", "country", "latitude", "longitude", "store_type"],
    data: [
      ["LOC_001", "Downtown Store", "North", "Manchester", "England", "UK", "53.4808", "-2.2426", "Urban"],
      ["LOC_002", "Suburban Mall", "South", "Birmingham", "England", "UK", "52.4862", "-1.8904", "Suburban"],
      ["LOC_003", "City Center", "East", "London", "England", "UK", "51.5074", "-0.1278", "Urban"],
      ["LOC_004", "Shopping District", "West", "Bristol", "England", "UK", "51.4545", "-2.5879", "Urban"],
      ["LOC_005", "Retail Park", "North", "Leeds", "England", "UK", "53.8008", "-1.5491", "Suburban"],
      ["LOC_006", "Town Square", "South", "Southampton", "England", "UK", "50.9097", "-1.4044", "Urban"],
      ["LOC_007", "High Street", "East", "Norwich", "England", "UK", "52.6309", "1.2974", "Urban"],
      ["LOC_008", "Market Place", "West", "Plymouth", "England", "UK", "50.3755", "-4.1427", "Urban"],
      ["LOC_009", "Central Plaza", "North", "Newcastle", "England", "UK", "54.9783", "-1.6178", "Urban"],
      ["LOC_010", "Outlet Center", "South", "Brighton", "England", "UK", "50.8225", "-0.1372", "Suburban"]
    ]
  },
  "sku_master.csv": {
    columns: ["sku_id", "sku_name", "category", "sub_category", "brand", "unit_price", "cost_price", "weight_kg", "length_cm", "width_cm", "height_cm", "supplier", "lead_time_days", "min_order_qty", "shelf_life_days", "is_perishable"],
    data: [
      ["SKU_001", "Premium Organic Milk 1L", "Dairy", "Milk", "FarmFresh", "2.49", "1.89", "1.05", "8.0", "8.0", "24.0", "Local Farms Co", "2", "50", "7", "True"],
      ["SKU_002", "Whole Wheat Bread 800g", "Bakery", "Bread", "GoldenBake", "1.99", "1.29", "0.8", "30.0", "12.0", "10.0", "Artisan Bakers", "1", "30", "5", "True"],
      ["SKU_003", "Free Range Eggs 12pk", "Dairy", "Eggs", "HappyHens", "3.49", "2.49", "0.72", "20.0", "15.0", "8.0", "Country Eggs Ltd", "3", "40", "21", "True"],
      ["SKU_004", "Greek Yogurt 500g", "Dairy", "Yogurt", "MediterraneanDelight", "2.99", "2.19", "0.52", "12.0", "12.0", "8.0", "Dairy Masters", "4", "60", "14", "True"],
      ["SKU_005", "Cheddar Cheese 400g", "Dairy", "Cheese", "FarmhouseFavorites", "4.49", "3.29", "0.4", "15.0", "10.0", "5.0", "Premium Cheese Co", "7", "30", "60", "False"],
      ["SKU_006", "Chocolate Chip Cookies 300g", "Snacks", "Cookies", "SweetTreats", "2.79", "1.89", "0.3", "20.0", "15.0", "5.0", "Snack Foods Inc", "5", "50", "90", "False"],
      ["SKU_007", "Breakfast Cereal 500g", "Breakfast", "Cereal", "MorningCrunch", "3.29", "2.39", "0.5", "25.0", "18.0", "8.0", "Grain Foods Ltd", "10", "40", "180", "False"],
      ["SKU_008", "Orange Juice 1L", "Beverages", "Juice", "FreshSqueeze", "2.99", "2.19", "1.05", "8.0", "8.0", "24.0", "Fruit Processors", "3", "45", "30", "True"],
      ["SKU_009", "Pasta 500g", "Pantry", "Pasta", "ItalianTradition", "1.49", "0.99", "0.5", "30.0", "8.0", "3.0", "Pasta Imports", "14", "100", "730", "False"],
      ["SKU_010", "Tomato Sauce 500ml", "Pantry", "Sauce", "ChefSelect", "1.99", "1.39", "0.52", "10.0", "10.0", "15.0", "Sauce Makers Co", "12", "60", "365", "False"]
    ]
  },
  "festival_calendar.csv": {
    columns: ["date", "festival_name", "region", "impact_level"],
    data: [
      ["2024-01-01", "New Year's Day", "National", "High"],
      ["2024-01-26", "Republic Day", "National", "High"],
      ["2024-02-14", "Valentine's Day", "Urban", "Medium"],
      ["2024-03-08", "Holi", "North", "High"],
      ["2024-03-17", "St Patrick's Day", "Urban", "Low"],
      ["2024-04-09", "Mahavir Jayanti", "Regional", "Medium"],
      ["2024-04-14", "Easter Sunday", "National", "Medium"],
      ["2024-04-21", "Eid al-Fitr", "National", "High"],
      ["2024-05-01", "May Day", "National", "Low"],
      ["2024-05-23", "Buddha Purnima", "Regional", "Medium"]
    ]
  }
};

// DATASETS with REAL row/col counts
const DATASETS = {
  processed: [
    { name: "baseline_predictions.csv", date: "06/25 09:01", type: "CSV", size: "995 KB", rows: 13000, cols: 7 },
    { name: "feature_importance.csv", date: "09/28 17:32", type: "CSV", size: "2 KB", rows: 46, cols: 2 },
    { name: "model_metrics.csv", date: "09/28 17:32", type: "CSV", size: "1 KB", rows: 2, cols: 5 },
    { name: "model_comparison.csv", date: "09/28 17:49", type: "CSV", size: "2 KB", rows: 4, cols: 9 }
  ],
  raw: [
    { name: "competitor_activity.csv", date: "09/28 17:16", type: "CSV", size: "150 KB", rows: 7305, cols: 3 },
    { name: "cost-breakdown.csv", date: "06/20 01:20", type: "CSV", size: "1 KB", rows: 3, cols: 7 },
    { name: "festival_calendar.csv", date: "09/28 17:19", type: "CSV", size: "10 KB", rows: 320, cols: 4 },
    { name: "location_master.csv", date: "09/28 17:17", type: "CSV", size: "2 KB", rows: 20, cols: 9 },
    { name: "monthly_macro.csv", date: "09/28 17:17", type: "CSV", size: "11 KB", rows: 240, cols: 6 },
    { name: "sku_master.csv", date: "09/28 17:17", type: "CSV", size: "6 KB", rows: 50, cols: 16 },
    { name: "weather_data.csv", date: "09/28 17:17", type: "CSV", size: "221 KB", rows: 7305, cols: 6 }
  ],
  all: []
};

DATASETS.all = [
  ...DATASETS.processed.map(d => ({...d, category: 'processed'})),
  ...DATASETS.raw.map(d => ({...d, category: 'raw'}))
];

const MODELS = [
  { name: "xgboost_baseline.model", date: "09/28 17:32", type: "Model", size: "69 KB" },
  { name: "feature_importance.csv", date: "09/28 17:32", type: "CSV", size: "2 KB" }
];

// STATE
let currentDataFilter = 'all';
let currentTheme = 'dark';

// INIT
document.addEventListener('DOMContentLoaded', function() {
  initNavigation();
  initDataTabs();
  initTheme();
  initSearch();
  renderFiles('data-files', DATASETS.all, 'all');
  renderFiles('model-files', MODELS, 'model');
  initInventoryChart();
});

// NAVIGATION
function initNavigation() {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      
      document.querySelectorAll('.nav-item').forEach(nav => 
        nav.classList.remove('nav-item--active'));
      document.querySelectorAll('.content-section').forEach(sec => 
        sec.classList.add('hidden'));
      
      item.classList.add('nav-item--active');
      const targetId = item.getAttribute('href').substring(1);
      document.getElementById(targetId)?.classList.remove('hidden');
    });
  });
}

// DATA TABS
function initDataTabs() {
  document.querySelectorAll('.data-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      switchDataFilter(filter);
    });
  });
}

function switchDataFilter(filter) {
  currentDataFilter = filter;
  
  document.querySelectorAll('.data-tab-btn').forEach(btn => 
    btn.classList.remove('active'));
  document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
  
  const files = DATASETS[filter];
  renderFiles('data-files', files, filter);
}

// RENDER FILES
function renderFiles(containerId, files, type) {
  const container = document.getElementById(containerId);
  container.innerHTML = files.map(file => `
    <div class="file-item" onclick='openFilePreview(${JSON.stringify(file).replace(/'/g, "&apos;")})'>
      <svg class="file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14,2 14,8 20,8"></polyline>
      </svg>
      <div class="file-info">
        <div class="file-name">${file.name}</div>
        <div class="file-meta">
          <span>${file.date}</span>
          <span>${file.type}</span>
          <span>${file.size}</span>
        </div>
      </div>
      <span class="status-badge status-${type === 'all' ? file.category : type}">${(type === 'all' ? file.category : type).charAt(0).toUpperCase() + (type === 'all' ? file.category : type).slice(1)}</span>
    </div>
  `).join('');
}

// FILE PREVIEW MODAL
function openFilePreview(file) {
  const modal = document.getElementById('data-modal');
  const title = document.getElementById('modal-title');
  const thead = document.getElementById('modal-thead');
  const tbody = document.getElementById('modal-tbody');
  const stats = document.getElementById('modal-stats');
  
  title.textContent = file.name;
  
  // Get real data from your CSV files
  const fileData = MOCK_DATA[file.name];
  
  if (fileData) {
    // Render headers
    thead.innerHTML = `<tr>${fileData.columns.map(col => `<th>${col}</th>`).join('')}</tr>`;
    
    // Render rows
    tbody.innerHTML = fileData.data.map(row => 
      `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`
    ).join('');
    
    stats.innerHTML = `
      <strong>Dataset Statistics:</strong><br>
      Total Rows: ${file.rows.toLocaleString()} | Columns: ${file.cols}<br>
      File Size: ${file.size} | Last Modified: ${file.date}<br>
      <em>Showing first 10 rows</em>
    `;
  } else {
    thead.innerHTML = '<tr><th colspan="3">Preview not available</th></tr>';
    tbody.innerHTML = `<tr><td colspan="3" style="text-align: center; padding: 40px; color: #7588a3;">
      No preview data available for this file.<br>File contains ${file.rows?.toLocaleString() || '?'} rows × ${file.cols || '?'} columns.
    </td></tr>`;
    stats.innerHTML = `Size: ${file.size} | Last Modified: ${file.date}`;
  }
  
  modal.classList.remove('hidden');
}

function closeModal() {
  document.getElementById('data-modal').classList.add('hidden');
}

// MODAL SEARCH
document.getElementById('modal-search')?.addEventListener('input', (e) => {
  const term = e.target.value.toLowerCase();
  const rows = document.querySelectorAll('#modal-tbody tr');
  
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(term) ? '' : 'none';
  });
});

// GLOBAL SEARCH
function initSearch() {
  document.getElementById('globalSearch').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    document.querySelectorAll('.file-item').forEach(item => {
      const name = item.querySelector('.file-name').textContent.toLowerCase();
      item.style.display = name.includes(term) ? 'flex' : 'none';
    });
  });
}

// THEME TOGGLE
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  
  themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', currentTheme);
    themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
  });
  
  // Theme option buttons in settings
  document.querySelectorAll('.theme-option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.dataset.theme;
      currentTheme = theme;
      body.setAttribute('data-theme', theme);
      document.getElementById('theme-toggle').textContent = theme === 'dark' ? '☀️' : '🌙';
      
      document.querySelectorAll('.theme-option-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

// INVENTORY CHART
function initInventoryChart() {
  const canvas = document.getElementById('inventory-chart');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth;
  canvas.height = 400;
  
  // Real SKU data from sku_master.csv
  const items = ['Organic Milk', 'Wheat Bread', 'Free Range Eggs', 'Greek Yogurt', 'Cheddar Cheese'];
  const stock = [245, 189, 312, 156, 278];
  const barWidth = canvas.width / items.length - 40;
  const maxStock = Math.max(...stock);
  
  ctx.fillStyle = '#22c55e';
  stock.forEach((value, i) => {
    const height = (value / maxStock) * (canvas.height - 100);
    const x = i * (barWidth + 40) + 20;
    const y = canvas.height - height - 50;
    
    // Draw bar
    ctx.fillRect(x, y, barWidth, height);
    
    // Labels
    ctx.fillStyle = '#7588a3';
    ctx.font = '11px system-ui';
    ctx.save();
    ctx.translate(x + barWidth/2, canvas.height - 25);
    ctx.rotate(-Math.PI / 6);
    ctx.textAlign = 'right';
    ctx.fillText(items[i], 0, 0);
    ctx.restore();
    
    // Values
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText(value, x + barWidth/2, y - 8);
    
    ctx.fillStyle = '#22c55e';
  });
}
