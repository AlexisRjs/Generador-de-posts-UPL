import sys
sys.path.insert(0, '.')
import cv2, glob
from rapidocr_onnxruntime import RapidOCR

ocr = RapidOCR()
for p in sorted(glob.glob('capturas mesa ejemplos/*.png')):
    print(f"\n==================== {p} ====================")
    img = cv2.imread(p)
    h, w = img.shape[:2]
    results, _ = ocr(img)
    esp_items = []
    for box, text, score in results:
        x0 = min(pt[0] for pt in box)
        x1 = max(pt[0] for pt in box)
        y0 = min(pt[1] for pt in box)
        y1 = max(pt[1] for pt in box)
        xmid = (x0 + x1) / 2.0
        ymid = (y0 + y1) / 2.0
        if (w * 0.06) <= xmid <= (w * 0.22):
            esp_items.append((ymid, xmid, text.strip(), y0, y1))
    esp_items.sort(key=lambda x: x[0])
    for ymid, xmid, t, y0, y1 in esp_items:
        print(f"  y={ymid:5.1f} [{y0:4.1f}..{y1:4.1f}]: '{t}'")
