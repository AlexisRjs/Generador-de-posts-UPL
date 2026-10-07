import sys
sys.path.insert(0, '.')
import cv2, ocr_engine
from rapidocr_onnxruntime import RapidOCR

ocr = RapidOCR()
img_path = "capturas mesa ejemplos/Captura de pantalla 2026-08-24 220445.png"
img = cv2.imread(img_path)
h, w = img.shape[:2]
results, _ = ocr(img)

# Let's inspect esp_labels and subjects
items = []
for box, text, score in results:
    x0 = min(pt[0] for pt in box)
    x1 = max(pt[0] for pt in box)
    y0 = min(pt[1] for pt in box)
    y1 = max(pt[1] for pt in box)
    items.append({
        'text': text.strip(),
        'x_mid': (x0 + x1)/2,
        'y_mid': (y0 + y1)/2,
        'y0': y0, 'y1': y1,
        'x0': x0, 'x1': x1
    })

# Check d1, d2
h_esp = [it for it in items if 'esp' in it['text'].lower() and it['y1'] < h*0.08]
print("h_esp:", h_esp)
esp_items = [it for it in items if (w*0.08) <= it['x_mid'] <= (w*0.20) and it['y_mid'] > h*0.06]
esp_items.sort(key=lambda x: x['y_mid'])
print("\n--- Esp items ---")
for it in esp_items:
    print(f"y_mid={it['y_mid']:5.1f} [{it['y0']:4.1f}..{it['y1']:4.1f}]: {it['text']} -> norm: {ocr_engine.normalize_esp_text(it['text'])}")

sub_items = [it for it in items if (w*0.25) <= it['x_mid'] <= (w*0.85) and it['y_mid'] > h*0.06]
sub_items.sort(key=lambda x: x['y_mid'])
print("\n--- Subjects ---")
for it in sub_items:
    print(f"y_mid={it['y_mid']:5.1f}: {it['text']}")
