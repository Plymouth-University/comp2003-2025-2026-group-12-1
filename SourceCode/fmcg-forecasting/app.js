// STATE
let currentTheme = 'dark';

// INIT
document.addEventListener('DOMContentLoaded', function() {
    console.log('Forecast Explorer initialized');
    initNavigation();
    initTheme();
    initSearch();
    loadMetrics();
    loadFileInfo();
});

// NAVIGATION
function initNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('nav-item--active'));
            item.classList.add('nav-item--active');
            
            const targetId = item.getAttribute('data-section') + '-section';
            document.querySelectorAll('.content-section').forEach(sec => sec.classList.add('hidden'));
            document.getElementById(targetId)?.classList.remove('hidden');
        });
    });
}

// THEME
function initTheme() {
    const themeBtn = document.getElementById('theme-toggle');
    const themeOptions = document.querySelectorAll('.theme-option');
    
    themeBtn?.addEventListener('click', toggleTheme);
    
    themeOptions.forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.dataset.theme;
            setTheme(theme);
            themeOptions.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

function toggleTheme() {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    currentTheme = theme;
    
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        if (theme === 'light') {
            themeBtn.innerHTML = `
                <svg viewBox="0 0 24 24" stroke-width="2" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
            `;
        } else {
            themeBtn.innerHTML = `
                <svg viewBox="0 0 24 24" stroke-width="2" fill="none" stroke="currentColor">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
            `;
        }
    }
}

// SEARCH
function initSearch() {
    const searchInput = document.getElementById('search');
    searchInput?.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        document.querySelectorAll('.file-card').forEach(item => {
            const fileName = item.getAttribute('data-filename')?.toLowerCase() || '';
            item.style.display = fileName.includes(query) ? 'flex' : 'none';
        });
    });
}

// AUTO-LOAD METRICS FROM CSV
async function loadMetrics() {
    try {
        console.log('Loading metrics from CSV...');
        
        const response = await fetch('data/processed/xgb_baseline_gpu_metrics.csv');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const csvText = await response.text();
        
        Papa.parse(csvText, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: function(results) {
                if (results.data && results.data.length > 0) {
                    const metrics = results.data[0];
                    updateModelCard(metrics);
                    console.log('✅ Metrics loaded successfully:', metrics);
                } else {
                    console.warn('⚠️ No metrics data found in CSV');
                }
            },
            error: function(error) {
                console.error('⚠️ Error parsing CSV:', error);
                handleError(error);
            }
        });
        
    } catch (error) {
        console.warn('⚠️ Could not load metrics file:', error.message);
        handleError(error);
    }
}

// UPDATE MODEL PERFORMANCE CARDS
function updateModelCard(metrics) {
    const mae = metrics.MAE || metrics.mae || null;
    const rmse = metrics.RMSE || metrics.rmse || null;
    const r2 = metrics.R2 || metrics.r2 || metrics.R_squared || null;
    const mape = metrics.MAPE || metrics.mape || null;
    
    const maeElement = document.getElementById('model-mae');
    const rmseElement = document.getElementById('model-rmse');
    const r2Element = document.getElementById('model-r2');
    
    if (maeElement) maeElement.textContent = mae !== null ? mae.toFixed(4) : '-';
    if (rmseElement) rmseElement.textContent = rmse !== null ? rmse.toFixed(4) : '-';
    if (r2Element) r2Element.textContent = r2 !== null ? r2.toFixed(4) : '-';
    
    const modelsMae = document.getElementById('models-mae');
    const modelsRmse = document.getElementById('models-rmse');
    const modelsR2 = document.getElementById('models-r2');
    const modelsMape = document.getElementById('models-mape');
    
    if (modelsMae) modelsMae.textContent = mae !== null ? mae.toFixed(4) : '-';
    if (modelsRmse) modelsRmse.textContent = rmse !== null ? rmse.toFixed(4) : '-';
    if (modelsR2) modelsR2.textContent = r2 !== null ? r2.toFixed(4) : '-';
    if (modelsMape) modelsMape.textContent = mape !== null ? (mape * 100).toFixed(2) + '%' : '-';
}

// LOAD FILE INFO (sizes etc., optional)
async function loadFileInfo() {
    const files = [
        { name: 'xgb_baseline_gpu_metrics.csv', path: 'data/processed/xgb_baseline_gpu_metrics.csv' },
        { name: 'xgb_baseline_gpu_test_predictions.csv', path: 'data/processed/xgb_baseline_gpu_test_predictions.csv' }
    ];
    
    for (const file of files) {
        try {
            const response = await fetch(file.path, { method: 'HEAD' });
            if (response.ok) {
                const size = response.headers.get('content-length');
                if (size) {
                    console.log(`✅ ${file.name}: ${formatBytes(size)}`);
                }
            }
        } catch (error) {
            console.log(`⚠️ Could not fetch info for ${file.name}`);
        }
    }
}

function formatBytes(bytes) {
    if (!bytes) return '-';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// ERROR HANDLING
function handleError(error) {
    console.error('Error:', error);
    const ids = ['model-mae','model-rmse','model-r2','models-mae','models-rmse','models-r2','models-mape'];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el && (el.textContent === '' || el.textContent === null)) el.textContent = '-';
    });
}

// NOTEBOOK ACTIONS
function downloadNotebook() {
    const link = document.createElement('a');
    link.href = 'data/notebooks/fmcg-kaggle-full-pipeline-xgboost-ipynb.ipynb';
    link.download = 'fmcg-kaggle-full-pipeline-xgboost.ipynb';
    link.click();
}

function openInKaggle() {
    window.open('https://www.kaggle.com', '_blank'); // replace with your URL
}

function toggleFullscreen() {
    const container = document.getElementById('notebook-container');
    if (!container) return;
    container.classList.toggle('fullscreen');
}

// Exit fullscreen with ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const container = document.getElementById('notebook-container');
        if (container && container.classList.contains('fullscreen')) {
            container.classList.remove('fullscreen');
        }
    }
});
