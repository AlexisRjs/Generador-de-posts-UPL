@echo off
title UPL - Servidor OCR Python

:: Intentar ir a la carpeta actual del bat, o a C:\dev\Redes UPL si se abrió desde Descargas/Escritorio
cd /d "%~dp0"
if not exist "server.py" if not exist "dist\UPL_OCR\UPL_OCR.exe" (
  cd /d "C:\dev\Redes UPL"
)

echo ===================================================
echo   Iniciando Servidor Python OCR (OpenCV + RapidOCR)
echo ===================================================
echo   Escuchando en http://127.0.0.1:8000
echo   Deja esta ventana abierta mientras utilices la app.
echo ===================================================

if exist "dist\UPL_OCR\UPL_OCR.exe" (
  "dist\UPL_OCR\UPL_OCR.exe"
) else (
  python server.py
)
pause
