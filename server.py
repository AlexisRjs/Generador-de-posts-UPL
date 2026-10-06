"""
Servidor FastAPI para OCR y procesamiento de imágenes de Mesas de Examen UPL.
Provee endpoints para extracción precisa de materias con OpenCV y RapidOCR.
"""
import traceback
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
from ocr_engine import process_exam_sheet

app = FastAPI(
    title="UPL Mesas OCR Backend",
    description="Motor de OCR de alta velocidad y precisión con OpenCV y RapidOCR",
    version="1.0.0"
)

# Configuración de CORS para permitir peticiones desde Vite y cualquier origen local
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
async def health_check():
    return {
        "status": "ok",
        "engine": "Python + OpenCV + RapidOCR (ONNX Runtime)",
        "message": "Servidor OCR UPL activo y listo"
    }

@app.post("/api/ocr-mesa")
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

if __name__ == "__main__":
    print("[UPL OCR] Iniciando Servidor UPL Mesas OCR en http://127.0.0.1:8000 ...")
    uvicorn.run(app, host="127.0.0.1", port=8000)
