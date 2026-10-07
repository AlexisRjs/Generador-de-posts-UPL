import sys
sys.path.insert(0, '.')
import cv2, ocr_engine, numpy as np
from rapidocr_onnxruntime import RapidOCR

ocr = RapidOCR()
p = 'capturas mesa ejemplos/Captura de pantalla 2026-08-26 114410.png'
img = cv2.imread(p)
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
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
d1 = 46.0
d2 = 83.0
esp_x0 = max(0, int(d1 - 6))
esp_x1 = min(w, int(d2 + 6))
esp_crop = gray[:, esp_x0:esp_x1]
kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (max(5, int((esp_x1 - esp_x0) * 0.50)), 1))
h_lines = cv2.morphologyEx(~esp_crop, cv2.MORPH_OPEN, kernel)
row_sums = np.sum(h_lines > 100, axis=1)
line_indices = np.where(row_sums > (esp_x1 - esp_x0) * 0.28)[0]

merged_borders = [0]
for y in line_indices:
    if (y - merged_borders[-1]) > 5:
        merged_borders.append(int(y))
    else:
        merged_borders[-1] = (merged_borders[-1] + int(y)) // 2
if merged_borders[-1] < (h - 5):
    merged_borders.append(h)

print("Sample 2 merged_borders:", merged_borders)

esp_labels = [it for it in items if d1 <= it['x_mid'] < d2 and not ocr_engine.is_classroom_string(it['text']) and it['text'] != 'Esp.']
esp_labels.sort(key=lambda x: x['y_mid'])
print("\nSample 2 esp_labels:")
for it in esp_labels:
    print(f"  y={it['y_mid']:.1f}: {it['text']}")

# Check why py-38 got IC
# In sample 2: Ingenieria Mecanica I is at some y
sub_mec = [it for it in items if 'Mecánica I' in it['text'] or 'Mecanica I' in it['text']]
print("\nIngenieria Mecanica I:", sub_mec)
for sub in sub_mec:
    y = sub['y_mid']
    # Check intervals
    for i in range(len(merged_borders) - 1):
        top_b = merged_borders[i]
        bot_b = merged_borders[i + 1]
        if top_b <= y <= bot_b:
            in_interval = [l for l in esp_labels if (top_b - 8) <= l['y_mid'] <= (bot_b + 8)]
            print(f"  y={y}: in interval [{top_b}..{bot_b}], in_interval={[l['text'] for l in in_interval]}")
            if in_interval:
                print(f"  picked in_interval[0]: {in_interval[0]['text']}")
