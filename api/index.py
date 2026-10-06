"""
Vercel Serverless Function entry point for UPL Mesas OCR Backend.
Exposes /api/health and /api/ocr-mesa via FastAPI.
"""
import os
import sys
import traceback
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

# Ensure root repository directory is in sys.path
root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if root_dir not in sys.path:
    sys.path.insert(0, root_dir)

from ocr_engine import process_exam_sheet

app = FastAPI(
    title="UPL Mesas OCR Backend",
    description="Motor de OCR con OpenCV y RapidOCR",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
@app.get("/health")
async def health():
    return {
        "status": "ok",
        "engine": "Python + OpenCV + RapidOCR (ONNX Runtime)",
        "message": "Servidor OCR UPL activo y listo"
    }

@app.post("/api/ocr-mesa")
@app.post("/ocr-mesa")
async def ocr_mesa(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        if not contents or len(contents) == 0:
            raise HTTPException(status_code=400, detail="El archivo recibido está vacío.")
        result = process_exam_sheet(contents)
        return JSONResponse(content=result)
    except HTTPException:
        raise
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Error procesando la imagen: {str(e)}")
