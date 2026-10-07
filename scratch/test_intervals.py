import sys
sys.path.insert(0, '.')
import cv2, ocr_engine, numpy as np

img_path = "capturas mesa ejemplos/Captura de pantalla 2026-08-24 220445.png"
with open(img_path, 'rb') as f:
    img_bytes = f.read()

# Let's inspect borders
nparr = np.frombuffer(img_bytes, np.uint8)
img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
h, w = img.shape[:2]
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

d1 = w * 0.10
d2 = w * 0.18
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

print("merged_borders:", merged_borders)

# Now check each interval
esp_labels = [
    {'text': 'UDB', 'y_mid': 40.5},
    {'text': 'ISI', 'y_mid': 84.5},
    {'text': 'IQ', 'y_mid': 120.5},
    {'text': 'ISI', 'y_mid': 157.5},
    {'text': 'IM', 'y_mid': 179.0},
    {'text': 'IE', 'y_mid': 243.5},
    {'text': 'IQ', 'y_mid': 322.5},
    {'text': 'IC', 'y_mid': 413.0}
]

for sub_y in [152.0, 164.0, 174.5, 185.5, 196.5]:
    for i in range(len(merged_borders) - 1):
        top_b = merged_borders[i]
        bot_b = merged_borders[i + 1]
        if top_b <= sub_y <= bot_b:
            in_interval = [l for l in esp_labels if (top_b - 8) <= l['y_mid'] <= (bot_b + 8)]
            print(f"sub_y={sub_y}: in interval [{top_b}..{bot_b}], in_interval={in_interval}")
