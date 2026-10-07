import sys
sys.path.insert(0, '.')
import cv2, glob, ocr_engine, re, numpy as np
from rapidocr_onnxruntime import RapidOCR

ocr = RapidOCR()

UTN_MAP = {
    # UBD
    "Análisis Matemático I": "UBD", "Álgebra y Geometría Analítica": "UBD", "Física I": "UBD", "Inglés I": "UBD",
    "Análisis Matemático II": "UBD", "Física II": "UBD", "Inglés II": "UBD", "Probabilidad y Estadística": "UBD",
    "Economía": "UBD", "Legislación": "UBD", "Química General": "UBD", "Química": "UBD",
    # ISI
    "Lógica y Esctructuras Discretas": "ISI", "Algoritmos y Estructuras de Datos": "ISI", "Arquitectura de Computadoras": "ISI",
    "Sistemas y Procesos de Negocios": "ISI", "Sistemas y Procesos de Negocio": "ISI", "Ingeniería y sociedad": "ISI",
    "Sintaxis y Semántica de los Lenguajes": "ISI", "Paradigmas de Programación": "ISI", "Sistemas Operativos": "ISI",
    "Análisis de Sistemas de Información": "ISI", "Bases de Datos": "ISI", "Desarrollo de Software": "ISI",
    "Comunicación de Datos": "ISI", "Análisis Numérico": "ISI", "Diseño de Sistemas de Información": "ISI",
    "Ingeniería y Calidad de Software": "ISI", "Redes de Datos": "ISI", "Investigación Operativa": "ISI", "Simulación": "ISI",
    "Tecnologías para la Automatización": "ISI", "Administración de Sistemas de Información": "ISI",
    "Inteligencia Artificial": "ISI", "Ciencia de Datos": "ISI", "Sistemas de Gestión": "ISI", "Gestión Gerencial": "ISI",
    "Seguridad en los Sistemas de Información": "ISI", "Proyecto Final": "ISI", "Entornos Gráficos": "ISI",
    "Algorítmos Genéticos": "ISI", "Algoritmos Genéticos": "ISI", "Administración de Recursos": "ISI",
    "Teoría del Control": "ISI", "Soporte a la Gestión de Datos": "ISI", "Minería de Datos": "ISI",
    "Infraestructura Tecnológica": "ISI", "Dirección de Recursos Humanos": "ISI",
    # IQ
    "Fenómenos de Transporte": "IQ", "Química Analítica": "IQ", "Química Analítica Aplicada": "IQ",
    "Aplic. de Programación Matemática": "IQ", "Calidad de los Alimentos": "IQ", "Control Estadístico de Procesos": "IQ",
    "Gestión de Calidad y Mejora Continua": "IQ", "Organización Industrial": "IQ", "Uso del Recurso Hídrico": "IQ",
    "Química Orgánica": "IQ", "Química Inorgánica": "IQ", "Matemática Superior Aplicada": "IQ",
    "Ciencia de los Materiales": "IQ", "Fisicoquímica": "IQ", "Microbiología y Química Biológica": "IQ",
    "Operaciones Unitarias I": "IQ", "Operaciones Unitarias II": "IQ", "Ingeniería de las Reacciones Químicas": "IQ",
    "Control Automático de Procesos": "IQ", "Biotecnología": "IQ", "Gestion Socio-Ambiental": "IQ",
    "Introducción a la Bromatología": "IQ", "Química de los Alimentos": "IQ",
    # IM
    "Cálculo Avanzado": "IM", "Ingeniería y Desarrollo": "IM", "Máquinas Térmicas": "IM", "Transmisión del Calor": "IM",
    "Mecánica Racional": "IM", "Tecnología de la Fabricación": "IM", "Estabilidad I": "IM", "Estabilidad II": "IM",
    "Diseño de Instalaciones Térmicas": "IM", "Mecánica de los Fluidos": "IM", "Elementos de Máquinas": "IM",
    "Ingeniería Mecánica I": "IM", "Ingeniería Mecánica II": "IM", "Ingeniería Mecánica III": "IM",
    "Metalografía y Tratamientos Térmicos": "IM", "Mediciones y Ensayos": "IM", "Materiales Metálicos": "IM",
    "Materiales No Metálicos": "IM", "Ingeniería Ambiental y Seguridad Industrial": "IM",
    # IEE
    "Electrónica Aplicada": "IEE", "Integración Eléctrica I": "IEE", "Integración Eléctrica II": "IEE",
    "Electrotecnia I": "IEE", "Electrotecnia II": "IEE", "Electrónica I": "IEE", "Electrónica II": "IEE",
    "Máquinas Eléctricas I": "IEE", "Máquinas Eléctricas II": "IEE", "Máquinas Eléctricas": "IEE",
    "Electrónica y Sistemas de Control": "IEE", "Acondicionamientos y Controles Eléctricos": "IEE",
    "Control Numérico, Robótica y Sistemas Intelig.": "IEE", "Cálculo Numérico": "IEE", "Control Automático": "IEE",
    "Sistemas de Potencia": "IEE", "Tecnologías y Ensayo de Materiales Eléctricos": "IEE", "Teoría de los Campos": "IEE",
    "Generacion,Transm. Y Distrib. De la Energia Termica": "IEE", "Instrumentos y Mediciones Eléctricas": "IEE",
    # IC
    "Organización y Conducción de Obras": "IC", "Ingeniería Civil I": "IC", "Ingeniería Civil II": "IC",
    "Análisis Estructural I": "IC", "Análisis Estructural II": "IC", "Análisis Estructural III": "IC",
    "Fundamentos de Informática": "IC", "Tecnología de los Materiales": "IC", "Sistemas de Representación": "IC",
    "Geología Aplicada": "IC", "Estructuras de Hormigón": "IC", "Estructuras de Hormigón I": "IC",
    "Instalaciones Sanitarias y de Gas": "IC", "Cimentaciones": "IC", "Tecnología de la Construcción": "IC",
    "Tecnología del Hormigón": "IC", "Elasticidad y Plasticidad": "IC", "Construcciones Metálicas y de Madera": "IC",
    "Construcciones Metálicas y de Maderas": "IC", "Prefabricación": "IC", "Proyecto y Gestión Urbana": "IC",
    "Obras Fluviales y Marítimas": "IC", "Vialidad Especial": "IC", "Vías de Comunicación I": "IC", "Vías de Comunicación II": "IC",
    "Instalaciones Eléctricas y Acústicas": "IC", "Hidráulica Aplicada": "IC", "Hidráulica General": "IC",
    "Ing. Sanitaria": "IC", "Instalaciones Termomecanicas": "IC", "Geotopografia": "IC"
}

def norm_esp(raw):
    if not raw: return "ISI"
    c = raw.upper().strip()
    if re.search(r'181|1S1|LSL|ISI', c): return "ISI"
    if re.search(r'UBD|UD8|U0B|UDB', c): return "UBD"
    if re.search(r'1EE|IEE|LE|1E|IE', c): return "IEE"
    if re.search(r'LQ|1Q|IQ', c): return "IQ"
    if re.search(r'LM|1M|IM', c): return "IM"
    if re.search(r'LC|1C|IC', c): return "IC"
    return c

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

    # Esp column focused crop pass
    esp_crop = img[:, max(0, d1 - 6):min(w, d2 + 6)]
    crop_res, _ = ocr(esp_crop)
    esp_labels = []
    if crop_res:
        for box, text, score in crop_res:
            t = text.strip()
            y_mid = (min(pt[1] for pt in box) + max(pt[1] for pt in box)) / 2.0
            if y_mid > (header_y_max or h * 0.04) and 'esp' not in t.lower() and not ocr_engine.is_classroom_string(t):
                norm = norm_esp(t)
                if norm in ["UBD", "ISI", "IC", "IM", "IEE", "IQ"]:
                    esp_labels.append({'text': norm, 'y_mid': y_mid})

    # Combine with any label from full pass
    for box, text, _ in full_res:
        t = text.strip()
        y_mid = (min(pt[1] for pt in box) + max(pt[1] for pt in box)) / 2.0
        x_mid = (min(pt[0] for pt in box) + max(pt[0] for pt in box)) / 2.0
        if d1 <= x_mid < d2 and y_mid > (header_y_max or h * 0.04) and not ocr_engine.is_classroom_string(t):
            norm = norm_esp(t)
            if norm in ["UBD", "ISI", "IC", "IM", "IEE", "IQ"]:
                if not any(abs(l['y_mid'] - y_mid) < 12 for l in esp_labels):
                    esp_labels.append({'text': norm, 'y_mid': y_mid})

    esp_labels.sort(key=lambda x: x['y_mid'])

    # Lines detection
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    esp_x0 = max(0, d1 - 6)
    esp_x1 = min(w, d2 + 6)
    crop_gray = gray[:, esp_x0:esp_x1]
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (max(5, int((esp_x1 - esp_x0) * 0.35)), 1))
    h_lines = cv2.morphologyEx(~crop_gray, cv2.MORPH_OPEN, kernel)
    row_sums = np.sum(h_lines > 100, axis=1)
    detected_lines = np.where(row_sums > (esp_x1 - esp_x0) * 0.22)[0]
    
    merged_lines = []
    for y in detected_lines:
        if not merged_lines or (y - merged_lines[-1]) > 5:
            merged_lines.append(int(y))
        else:
            merged_lines[-1] = (merged_lines[-1] + int(y)) // 2

    boundaries = [0]
    for i in range(len(esp_labels) - 1):
        y_curr = esp_labels[i]['y_mid']
        y_next = esp_labels[i + 1]['y_mid']
        lines_between = [ly for ly in merged_lines if (y_curr + 4) < ly < (y_next - 4)]
        if lines_between:
            mid = (y_curr + y_next) / 2.0
            boundaries.append(min(lines_between, key=lambda ly: abs(ly - mid)))
        else:
            boundaries.append((y_curr + y_next) / 2.0)
    boundaries.append(h)

    print(f"esp_labels ({len(esp_labels)}): {[l['text'] for l in esp_labels]}")

    def get_esp(y, mat):
        for i in range(len(esp_labels)):
            if boundaries[i] <= y <= boundaries[i + 1]:
                return esp_labels[i]['text']
        if esp_labels:
            return min(esp_labels, key=lambda l: abs(l['y_mid'] - y))['text']
        return UTN_MAP.get(mat, "ISI")

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
        matched = ocr_engine.match_catalog_subject(sub['text'], ocr_engine.UTN_SUBJECT_CATALOG) or sub['text']
        esp = get_esp(sub['y_mid'], matched)
        counts[esp] = counts.get(esp, 0) + 1
        print(f"  [{esp:4s}] y={sub['y_mid']:5.1f} | {matched}")
    print("Counts:", counts)
