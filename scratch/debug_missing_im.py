import sys
sys.path.insert(0, '.')
import cv2, ocr_engine, re
from rapidocr_onnxruntime import RapidOCR

ocr = RapidOCR()
img_path = "capturas mesa ejemplos/Captura de pantalla 2026-08-24 220445.png"
with open(img_path, 'rb') as f:
    res = ocr_engine.process_exam_sheet(f.read())

print("Casillas in 220445:")
for c in res['casillas']:
    print(f"  id={c['id']:6s} esp={c['esp']:4s} aula={c['aula']:5s} hora={c['hora']} | {c['materia']}")
