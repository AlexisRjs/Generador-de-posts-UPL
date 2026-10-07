import sys
sys.path.insert(0, '.')
import cv2, glob, ocr_engine, re, numpy as np
from rapidocr_onnxruntime import RapidOCR

ocr = RapidOCR()

for p in sorted(glob.glob('capturas mesa ejemplos/*.png')):
    print(f"\n==================== {p} ====================")
    img = cv2.imread(p)
    h, w = img.shape[:2]
    full_res, _ = ocr(img)
    
    # Headers
    h_esp = None
    h_aula = None
    h_turno = None
    h_materia = None
    h_hora = None
    header_y_max = 0
    for box, text, _ in full_res:
        norm = text.lower()
        x0 = min(pt[0] for pt in box)
        x1 = max(pt[0] for pt in box)
        y1 = max(pt[1] for pt in box)
        if y1 < (h * 0.08):
            if 'esp' in norm: h_esp = (x0, x1); header_y_max = max(header_y_max, y1)
            elif 'aula' in norm: h_aula = (x0, x1); header_y_max = max(header_y_max, y1)
            elif 'horario' in norm:
                if x0 < (w * 0.25): h_turno = (x0, x1)
                else: h_hora = (x0, x1)
                header_y_max = max(header_y_max, y1)
            elif 'materia' in norm: h_materia = (x0, x1); header_y_max = max(header_y_max, y1)

    d1 = int((h_turno[1] + h_esp[0]) / 2.0 if (h_turno and h_esp) else (w * 0.10))
    d2 = int((h_esp[1] + h_aula[0]) / 2.0 if (h_esp and h_aula) else (w * 0.18))
    d3 = (h_aula[1] + 5.0) if h_aula else (w * 0.26)
    d4 = (h_hora[0] - 5.0) if h_hora else (w * 0.88)

    # 1. Esp column focused crop pass
    esp_crop = img[:, max(0, d1 - 6):min(w, d2 + 6)]
    crop_res, _ = ocr(esp_crop)
    esp_labels = []
    if crop_res:
        for box, text, score in crop_res:
            t = text.strip()
            y_mid = (min(pt[1] for pt in box) + max(pt[1] for pt in box)) / 2.0
            if y_mid > (header_y_max or h * 0.04) and 'esp' not in t.lower() and not ocr_engine.is_classroom_string(t):
                norm = ocr_engine.normalize_esp_text(t)
                esp_labels.append({'text': norm, 'y_mid': y_mid, 'raw': t})
    esp_labels.sort(key=lambda x: x['y_mid'])

    # Also detect horizontal lines in Esp crop
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    esp_x0 = max(0, d1 - 6)
    esp_x1 = min(w, d2 + 6)
    crop_gray = gray[:, esp_x0:esp_x1]
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (max(5, int((esp_x1 - esp_x0) * 0.35)), 1))
    h_lines = cv2.morphologyEx(~crop_gray, cv2.MORPH_OPEN, kernel)
    row_sums = np.sum(h_lines > 100, axis=1)
    detected_lines = np.where(row_sums > (esp_x1 - esp_x0) * 0.22)[0]
    
    # Filter and merge lines
    merged_lines = []
    for y in detected_lines:
        if not merged_lines or (y - merged_lines[-1]) > 5:
            merged_lines.append(int(y))
        else:
            merged_lines[-1] = (merged_lines[-1] + int(y)) // 2

    # Build exact boundaries between esp_labels
    # For each label i, determine its [top_boundary, bot_boundary]
    boundaries = [0]
    for i in range(len(esp_labels) - 1):
        y_curr = esp_labels[i]['y_mid']
        y_next = esp_labels[i + 1]['y_mid']
        # Find if there is a line between y_curr and y_next
        lines_between = [ly for ly in merged_lines if (y_curr + 4) < ly < (y_next - 4)]
        if lines_between:
            # Pick the line closest to the midpoint
            mid = (y_curr + y_next) / 2.0
            best_line = min(lines_between, key=lambda ly: abs(ly - mid))
            boundaries.append(best_line)
        else:
            boundaries.append((y_curr + y_next) / 2.0)
    boundaries.append(h)

    print(f"esp_labels ({len(esp_labels)}): {[l['text'] for l in esp_labels]}")

    def get_esp(y):
        for i in range(len(esp_labels)):
            if boundaries[i] <= y <= boundaries[i + 1]:
                return esp_labels[i]['text']
        if esp_labels:
            return min(esp_labels, key=lambda l: abs(l['y_mid'] - y))['text']
        return "ISI"

    # Get subjects
    subjects = []
    for box, text, _ in full_res:
        t = text.strip()
        y_mid = (min(pt[1] for pt in box) + max(pt[1] for pt in box)) / 2.0
        x_mid = (min(pt[0] for pt in box) + max(pt[0] for pt in box)) / 2.0
        if y_mid > (header_y_max or h * 0.04) and d3 <= x_mid < d4:
            if not ocr_engine.is_classroom_string(t) and 'nombre' not in t.lower() and 'materia' not in t.lower():
                subjects.append({'text': t, 'y_mid': y_mid})
    subjects.sort(key=lambda s: s['y_mid'])

    counts = {}
    for sub in subjects:
        esp = get_esp(sub['y_mid'])
        counts[esp] = counts.get(esp, 0) + 1
        matched = ocr_engine.match_catalog_subject(sub['text'], ocr_engine.UTN_SUBJECT_CATALOG) or sub['text']
        print(f"  [{esp:4s}] y={sub['y_mid']:5.1f} | {matched}")
    print("Counts:", counts)
