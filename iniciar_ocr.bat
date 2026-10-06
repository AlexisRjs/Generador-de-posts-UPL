@echo off
title UPL - Servidor OCR Python
cd /d "%~dp0"
echo ===================================================
echo   Iniciando Servidor Python OCR (OpenCV + RapidOCR)
echo ===================================================
echo   Escuchando en http://127.0.0.1:8000
echo   Deja esta ventana abierta mientras utilices la app.
echo ===================================================
if exist "dist\UPL_OCR\UPL_OCR.exe" (
  dist\UPL_OCR\UPL_OCR.exe
) else (
  python server.py
)
pause
