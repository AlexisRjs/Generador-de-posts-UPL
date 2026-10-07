import sys
sys.path.insert(0, '.')
import cv2, glob
from rapidocr_onnxruntime import RapidOCR

ocr = RapidOCR()
for p in sorted(glob.glob('capturas mesa ejemplos/*.png')):
    print(f"\n==================== {p} ====================")
    img = cv2.imread(p)
    h, w = img.shape[:2]
    # First pass: find headers
    full_res, _ = ocr(img)
    h_esp = None
    h_aula = None
    h_turno = None
    for box, text, _ in full_res:
        norm = text.lower()
        x0 = min(pt[0] for pt in box)
        x1 = max(pt[0] for pt in box)
        y1 = max(pt[1] for pt in box)
        if y1 < (h * 0.08):
            if 'esp' in norm: h_esp = (x0, x1)
            elif 'aula' in norm: h_aula = (x0, x1)
            elif 'horario' in norm and x0 < (w * 0.25): h_turno = (x0, x1)

    d1 = int((h_turno[1] + h_esp[0]) / 2.0 if (h_turno and h_esp) else (w * 0.10))
    d2 = int((h_esp[1] + h_aula[0]) / 2.0 if (h_esp and h_aula) else (w * 0.18))
    
    # Crop Esp column
    esp_crop = img[:, max(0, d1 - 5):min(w, d2 + 5)]
    crop_res, _ = ocr(esp_crop)
    print(f"Esp column crop x=[{d1-5}..{d2+5}]:")
    if crop_res:
        crop_res.sort(key=lambda x: min(pt[1] for pt in x[0]))
        for box, text, score in crop_res:
            y_mid = (min(pt[1] for pt in box) + max(pt[1] for pt in box)) / 2.0
            print(f"  y={y_mid:5.1f} (score={float(score):.2f}): '{text}'")
    else:
        print("  None detected")
