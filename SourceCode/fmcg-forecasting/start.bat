@echo off
echo ================================================
echo   FMCG Forecast Explorer - Local Server
echo ================================================
echo.
echo Starting development server...
echo Server will be available at: http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
echo ================================================
echo.
python -m http.server 8000
pause
