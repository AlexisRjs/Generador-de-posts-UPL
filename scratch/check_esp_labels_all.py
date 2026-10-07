import sys
sys.path.insert(0, '.')
import cv2, glob, ocr_engine
from rapidocr_onnxruntime import RapidOCR

ocr = RapidOCR()
for p in sorted(glob.glob('capturas mesa ejemplos/*.png')):
    print(f"\n==================== {p} ====================")
    img = cv2.imread(p)
    h, w = img.shape[:2]
    results, _ = ocr(img)
    # Check headers
    h_esp = None
    h_aula = None
    h_turno = None
    for box, text, _ in results:
        norm = text.lower()
        x0 = min(pt[0] for pt in box)
        x1 = max(pt[0] for pt in box)
        y1 = max(pt[1] for pt in box)
        if y1 < (h * 0.08):
            if 'esp' in norm: h_esp = (x0, x1)
            elif 'aula' in norm: h_aula = (x0, x1)
            elif 'horario' in norm and x0 < (w * 0.25): h_turno = (x0, x1)

    d1 = (h_turno[1] + h_esp[0]) / 2.0 if (h_turno and h_esp) else (w * 0.10)
    d2 = (h_esp[1] + h_aula[0]) / 2.0 if (h_esp and h_aula) else (w * 0.18)
    print(f"w={w}, h={h}, h_esp={h_esp}, h_aula={h_aula}, d1={d1:.1f}, d2={d2:.1f}")

    esp_labels = []
    for box, text, _ in results:
        t = text.strip()
        x_mid = (min(pt[0] for pt in box) + max(pt[0] for pt in box)) / 2.0
        y_mid = (min(pt[1] for pt in box) + max(pt[1] for pt in box)) / 2.0
        if d1 <= x_mid < d2 and not ocr_engine.is_classroom_string(t):
            esp_labels.append((y_mid, t, ocr_engine.normalize_esp_text(t)))
    esp_labels.sort(key=lambda x: x[0])
    print("esp_labels found:")
    for y_mid, raw, norm in esp_labels:
        print(f"  y={y_mid:5.1f}: raw='{raw}' -> norm='{norm}'")
