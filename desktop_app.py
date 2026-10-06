"""
Lanzador de escritorio para UPL Stories.
Inicia el servidor FastAPI en un hilo en segundo plano y abre la ventana nativa con pywebview.
"""
import os
import sys
import threading
import time
import uvicorn
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import webview

# Importar la app de FastAPI desde server.py
from server import app

# Determinar la ruta base donde residen los archivos (soporta PyInstaller bundle)
if getattr(sys, 'frozen', False):
    BASE_DIR = getattr(sys, '_MEIPASS', os.path.dirname(os.path.abspath(__file__)))
else:
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DIST_DIR = os.path.join(BASE_DIR, "dist")

# Montar los archivos estáticos compilados de Vite si la carpeta dist existe
if os.path.exists(DIST_DIR):
    assets_dir = os.path.join(DIST_DIR, "assets")
    if os.path.exists(assets_dir):
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")

    @app.get("/")
    async def serve_index():
        return FileResponse(os.path.join(DIST_DIR, "index.html"))

    # Servir archivos estáticos raíz (imágenes de plantilla, favicon, manifest, etc.)
    @app.get("/{filename:path}")
    async def serve_static(filename: str):
        file_path = os.path.join(DIST_DIR, filename)
        if os.path.exists(file_path) and os.path.isfile(file_path):
            return FileResponse(file_path)
        return FileResponse(os.path.join(DIST_DIR, "index.html"))

def start_server():
    """Inicia el servidor web/API Uvicorn en segundo plano."""
    config = uvicorn.Config(app, host="127.0.0.1", port=8000, log_level="warning")
    server = uvicorn.Server(config)
    server.run()

if __name__ == "__main__":
    # Iniciar servidor en hilo daemon
    server_thread = threading.Thread(target=start_server, daemon=True)
    server_thread.start()

    # Pequeña pausa para asegurar que el socket en 8000 esté disponible
    time.sleep(0.8)

    # Crear y abrir la ventana nativa de escritorio
    window = webview.create_window(
        title="UPL Stories - UTN FRRO",
        url="http://127.0.0.1:8000",
        width=1280,
        height=850,
        min_size=(980, 640),
        text_select=True,
        confirm_close=False
    )

    webview.start(debug=False)
