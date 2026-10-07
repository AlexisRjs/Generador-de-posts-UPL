import cv2
from rapidocr_onnxruntime import RapidOCR

ocr = RapidOCR()
p = 'capturas mesa ejemplos/Captura de pantalla 2026-09-10 105818.png'
img = cv2.imread(p)
h, w = img.shape[:2]
results, _ = ocr(img)

print("All text in sample 3 with y between 350 and 600:")
for box, text, score in results:
    x0 = min(pt[0] for pt in box)
    x1 = max(pt[0] for pt in box)
    y0 = min(pt[1] for pt in box)
    y1 = max(pt[1] for pt in box)
    ymid = (y0 + y1) / 2.0
    xmid = (x0 + x1) / 2.0
    if 330 <= ymid <= 610:
        print(f"  y={ymid:5.1f}, x={xmid:5.1f} [{x0:4.1f}..{x1:4.1f}]: '{text}'")
