import cv2
import numpy as np

p = 'capturas mesa ejemplos/Captura de pantalla 2026-09-10 105818.png'
img = cv2.imread(p)
# Save crop of Esp column between y=400 and 570
crop = img[400:580, 60:110]
cv2.imwrite('scratch/sample3_crop_esp.png', crop)
print("Saved scratch/sample3_crop_esp.png, shape:", crop.shape)

from rapidocr_onnxruntime import RapidOCR
ocr = RapidOCR()
res, _ = ocr(crop)
print("OCR on raw crop:", res)

# Try upscaled and contrast
gray = cv2.cvtColor(crop, cv2.COLOR_BGR2GRAY)
scaled = cv2.resize(gray, (0,0), fx=3.0, fy=3.0, interpolation=cv2.INTER_CUBIC)
res_scaled, _ = ocr(scaled)
print("OCR on scaled crop:", res_scaled)
