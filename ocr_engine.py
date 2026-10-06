"""
Motor OCR y Procesamiento de Imágenes para Mesas de Examen UPL
Utiliza OpenCV, Pillow y RapidOCR (ONNX Runtime)
Garantiza separación estricta de columnas y celdas combinadas de Especialidad:
Columna 1: Horario / Turno
Columna 2: Especialidad (respeta celdas individuales para materias compartidas como Formación de Emprendedores)
Columna 3: Aula/s
Columna 4: Nombre de la materia
Columna 5: Horario
"""
import re
import cv2
import numpy as np
from rapidocr_onnxruntime import RapidOCR

# Inicialización diferida del motor RapidOCR
_ocr_engine = None

def get_ocr_engine():
    global _ocr_engine
    if _ocr_engine is None:
        _ocr_engine = RapidOCR()
    return _ocr_engine

# Catálogo oficial de materias UTN FRRO y mapeo de carreras
UTN_SUBJECT_CATALOG = [
    "Análisis Matemático I", "Álgebra y Geometría Analítica", "Física I", "Inglés I",
    "Lógica y Esctructuras Discretas", "Algoritmos y Estructuras de Datos", "Arquitectura de Computadoras",
    "Sistemas y Procesos de Negocios", "Sistemas y Procesos de Negocio", "Análisis Matemático II",
    "Física II", "Ingeniería y sociedad", "Inglés II", "Sintaxis y Semántica de los Lenguajes",
    "Paradigmas de Programación", "Sistemas Operativos", "Análisis de Sistemas de Información",
    "Probabilidad y Estadística", "Economía", "Bases de Datos", "Desarrollo de Software",
    "Comunicación de Datos", "Análisis Numérico", "Diseño de Sistemas de Información", "Legislación",
    "Ingeniería y Calidad de Software", "Redes de Datos", "Investigación Operativa", "Simulación",
    "Tecnologías para la Automatización", "Administración de Sistemas de Información",
    "Inteligencia Artificial", "Ciencia de Datos", "Sistemas de Gestión", "Gestión Gerencial",
    "Seguridad en los Sistemas de Información", "Proyecto Final", "Entornos Gráficos",
    "Análisis y Diseño de Datos e Información", "Sistemas de Información Geográfica",
    "Programación Competitiva", "Algorítmos Genéticos", "Algoritmos Genéticos", "Información Jurídica",
    "Lenguaje de Programación JAVA", "Tecnologías de Desarrollo de Software IDE", "Gestión Ingenieril",
    "Introducción a la Práctica Profesional", "Infraestructura Tecnológica",
    "Soporte a las Bases de Datos con Programación Visual", "Metodología de la Investigación",
    "Metodologías Ágiles en el Desarrollo de Software", "Fabricación Aditiva",
    "Dirección de Recursos Humanos", "Informática en la Administración Pública",
    "Sistemas de Información Integrados para la Industria", "Minería de Datos",
    "Teoría del Control", "Soporte a la Gestión de Datos",
    "Introducción a la Ingeniería Química", "Química", "Sistemas de Representación",
    "Fundamentos de Informática", "Introducción a Equipos y Procesos", "Química Inorgánica",
    "Química Orgánica", "Balances de Masa y Energía", "Termodinámica", "Matemática Superior Aplicada",
    "Ciencia de los Materiales", "Fisicoquímica", "Fenómenos de Transporte", "Química Analítica",
    "Química Analítica Aplicada", "Microbiología y Química Biológica", "Química Aplicada",
    "Diseño, Simulación, Opt. y Seg. de Proc.", "Operaciones Unitarias I", "Tecnología de la Energía Térmica",
    "Operaciones Unitarias II", "Ingeniería de las Reacciones Químicas", "Organización Industrial",
    "Calidad y Control Estadístico de Procesos", "Control Estadístico de Procesos",
    "Control Automático de Procesos", "Mecánica Industrial", "Ingeniería Ambiental",
    "Procesos Biotecnológicos", "Higiene y Seguridad en el Trabajo", "Máquinas e Instalaciones Eléctricas",
    "Introducción a la Tecnología de los Alimentos", "Gestión Socioambiental Urbana Sustentable",
    "Electrónica Aplicada", "Gestión del Medio Ambiente y la Energía", "Control de Calidad de los Alimentos",
    "Introducción a la Bromatología", "Química de los Alimentos", "Liderazgo en Ingeniería",
    "Calidad de los Alimentos", "Procesos Industriales I", "Ingeniería Ambiental Aplicada a Medios Líquidos",
    "Ingeniería de Control de la Contaminación del Aire", "Gestión de Tecnologías Sustentables",
    "Aplic. de Programación Matemática", "Aplicación de Programación Matemática", "Química General",
    "Uso del Recurso Hídrico",
    "Ingeniería Mecánica I", "Materiales No Metálicos", "Estabilidad I", "Materiales Metálicos",
    "Ingeniería Ambiental y Seguridad Industrial", "Ingeniería Mecánica II", "Mecánica Racional",
    "Estabilidad II", "Mediciones y Ensayos", "Diseño Mecánico", "Cálculo Avanzado",
    "Ingeniería Mecánica III", "Elementos de Máquinas", "Tecnología del Calor",
    "Metrología e Ingeniería de la Calidad", "Mecánica de los Fluidos",
    "Electrotecnia y Máquinas Eléctricas", "Electrónica y Sistemas de Control", "Estabilidad III",
    "Tecnología de la Fabricación", "Máquinas Alternativas y Turbomáquinas", "Instalaciones Industriales",
    "Mantenimiento", "Metalografía y Tratamientos Térmicos", "Máquinas de Elevación y Transporte",
    "Materiales de Ingeniería", "Sistemas de Control en Instalaciones Térmicas",
    "Transferencia de Energia Térmica", "Diseño de Instalaciones Térmicas", "Maquinaria Agrícola",
    "Máquinas Térmicas", "Transmisión del Calor",
    "Formación de Emprendedores", "Formación de Emprendedores(Elec.)", "Formación de Emprendedores (Elec.)",
    "Integración Eléctrica I", "Electrotecnia I", "Mecánica Técnica", "Integración Eléctrica II",
    "Integración III", "Integración IV", "Integración III y IV",
    "Cálculo Numérico", "Tecnologías y Ensayo de Materiales Eléctricos", "Instrumentos y Mediciones Eléctricas",
    "Teoría de los Campos", "Física III", "Máquinas Eléctricas I", "Máquinas Eléctricas II",
    "Electrotecnia II", "Fundamentos para el Análisis de Señales", "Taller Interdisciplinario",
    "Electrónica I", "Seguridad, Riesgo Eléctrico y Medio Ambiente",
    "Instalaciones Eléctricas y Luminotecnia", "Control Automático", "Máquinas Térmicas, Hidráulicas y de Fluido",
    "Electrónica II", "Generación, Transmisión y Distribución de la EE", "Sistemas de Potencia",
    "Accionamientos y Controles Eléctricos", "Acondicionamientos y Controles Eléctricos",
    "Organización y Administración de Empresas", "Fuentes Renovables de Energía",
    "Control Numérico y Robótica", "Control Numérico, Robótica y Sistemas Intelig.", "Electromedicina",
    "Gestión de Calidad", "Gestión de Calidad y Mejora Continua", "Transmisión de Datos en Sistemas Eléctricos",
    "Mantenimiento de Plantas", "Instrumentación Industrial", "Movilidad Eléctrica", "Ingeniería Civil",
    "Ingeniería Civil I", "Estabilidad", "Ingeniería Civil II", "Organización y Conducción de Obras",
    "Análisis Estructural I", "Análisis Estructural II", "Análisis Estructural III",
    "Tecnología de los Materiales", "Instalaciones Sanitarias y de Gas", "Geología Aplicada",
    "Estructuras de Hormigón", "Estructuras de Hormigón I", "Administración de Recursos",
    "Ingeniería y Desarrollo", "Cimentaciones", "Tecnología de la Construcción",
    "Tecnología del Hormigón", "Elasticidad y Plasticidad",
    "Construcciones Metálicas y de Madera", "Construcciones Metálicas y de Maderas",
    "Prefabricación", "Proyecto y Gestión Urbana", "Obras Fluviales y Marítimas",
    "Vialidad Especial", "Vías de Comunicación I", "Vías de Comunicación II",
    "Instalaciones Eléctricas y Acústicas", "Hidráulica Aplicada", "Hidráulica General"
]

UTN_SUBJECT_CAREER_MAP = {
    "Análisis Matemático I": "UDB", "Álgebra y Geometría Analítica": "UDB", "Física I": "UDB", "Inglés I": "UDB",
    "Lógica y Esctructuras Discretas": "ISI", "Algoritmos y Estructuras de Datos": "ISI", "Arquitectura de Computadoras": "ISI",
    "Sistemas y Procesos de Negocios": "ISI", "Sistemas y Procesos de Negocio": "ISI", "Análisis Matemático II": "UDB",
    "Física II": "UDB", "Ingeniería y sociedad": "ISI", "Inglés II": "UDB", "Sintaxis y Semántica de los Lenguajes": "ISI",
    "Paradigmas de Programación": "ISI", "Sistemas Operativos": "ISI", "Análisis de Sistemas de Información": "ISI",
    "Probabilidad y Estadística": "UDB", "Economía": "UDB", "Bases de Datos": "ISI", "Desarrollo de Software": "ISI",
    "Comunicación de Datos": "ISI", "Análisis Numérico": "ISI", "Diseño de Sistemas de Información": "ISI", "Legislación": "UDB",
    "Ingeniería y Calidad de Software": "ISI", "Redes de Datos": "ISI", "Investigación Operativa": "ISI", "Simulación": "ISI",
    "Tecnologías para la Automatización": "ISI", "Administración de Sistemas de Información": "ISI",
    "Inteligencia Artificial": "ISI", "Ciencia de Datos": "ISI", "Sistemas de Gestión": "ISI", "Gestión Gerencial": "ISI",
    "Seguridad en los Sistemas de Información": "ISI", "Proyecto Final": "ISI", "Entornos Gráficos": "ISI",
    "Algorítmos Genéticos": "ISI", "Algoritmos Genéticos": "ISI", "Administración de Recursos": "ISI",
    "Teoría del Control": "ISI", "Soporte a la Gestión de Datos": "ISI",
    "Fenómenos de Transporte": "IQ", "Química Analítica": "IQ", "Química Analítica Aplicada": "IQ",
    "Aplic. de Programación Matemática": "IQ", "Calidad de los Alimentos": "IQ", "Control Estadístico de Procesos": "IQ",
    "Gestión de Calidad y Mejora Continua": "IQ", "Organización Industrial": "IQ", "Uso del Recurso Hídrico": "IQ",
    "Cálculo Avanzado": "IM", "Ingeniería y Desarrollo": "IM", "Máquinas Térmicas": "IM", "Transmisión del Calor": "IM",
    "Electrónica Aplicada": "IE", "Integración Eléctrica I": "IE", "Integración Eléctrica II": "IE",
    "Integración III": "IE", "Integración IV": "IE", "Integración III y IV": "IE",
    "Electrotecnia I": "IE", "Electrotecnia II": "IE", "Electrónica I": "IE", "Electrónica II": "IE",
    "Máquinas Eléctricas I": "IE", "Máquinas Eléctricas II": "IE", "Electrónica y Sistemas de Control": "IE",
    "Acondicionamientos y Controles Eléctricos": "IE", "Control Numérico, Robótica y Sistemas Intelig.": "IE",
    "Control Numérico y Robótica": "IE",
    "Organización y Conducción de Obras": "IC", "Ingeniería Civil I": "IC", "Ingeniería Civil II": "IC",
    "Análisis Estructural I": "IC", "Análisis Estructural II": "IC", "Análisis Estructural III": "IC",
    "Fundamentos de Informática": "IC", "Tecnología de los Materiales": "IC", "Sistemas de Representación": "IC",
    "Geología Aplicada": "IC", "Estructuras de Hormigón": "IC", "Estructuras de Hormigón I": "IC",
    "Instalaciones Sanitarias y de Gas": "IC", "Cimentaciones": "IC", "Tecnología de la Construcción": "IC",
    "Tecnología del Hormigón": "IC", "Elasticidad y Plasticidad": "IC",
    "Construcciones Metálicas y de Madera": "IC", "Construcciones Metálicas y de Maderas": "IC",
    "Prefabricación": "IC", "Proyecto y Gestión Urbana": "IC", "Obras Fluviales y Marítimas": "IC",
    "Vialidad Especial": "IC", "Vías de Comunicación I": "IC", "Vías de Comunicación II": "IC",
    "Instalaciones Eléctricas y Acústicas": "IC", "Hidráulica Aplicada": "IC", "Hidráulica General": "IC"
}

def clean_str(s: str) -> str:
    if not s:
        return ""
    import unicodedata
    norm = unicodedata.normalize('NFD', s.lower())
    without_accents = "".join(c for c in norm if unicodedata.category(c) != 'Mn')
    return re.sub(r'[^a-z0-9]', '', without_accents)

def levenshtein(a: str, b: str) -> int:
    m, n = len(a), len(b)
    d = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(m + 1):
        d[i][0] = i
    for j in range(n + 1):
        d[0][j] = j
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            cost = 0 if a[i - 1] == b[j - 1] else 1
            d[i][j] = min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost)
    return d[m][n]

def extract_roman_numeral(s: str) -> str | None:
    trimmed = (s or "").strip()
    if re.search(r'\b(iii|111|lll|ill|iil|lii|ili|3)\b|[il1|!]{3}\s*$', trimmed, re.I):
        return 'III'
    if re.search(r'\b(ul|ui|iil)\b\s*$', trimmed, re.I):
        return 'III'
    if re.search(r'(?:§|§\b|\b(ii|11|ll|il|li|ez|2)\b|[il1|!]{2}\s*$)', trimmed, re.I):
        return 'II'
    if re.search(r'(?:[im]n?gl[eé]s|f[ií]sica|electr[oó]nica|electrotecnia)[nu]\s*$', trimmed, re.I):
        return 'II'
    if re.search(r'\s+[nu]\s*$', trimmed, re.I) and not re.search(r'\b(en|un|sin)\b', trimmed, re.I):
        return 'II'
    if re.search(r'\b(i|1)\b|[il1|!]\s*$', trimmed, re.I):
        return 'I'
    return None

def strip_roman_numeral(s: str) -> str:
    s = re.sub(r'(?:§|\s*(?:iii|111|lll|ill|iil|lii|ili|3)\b)', '', s, flags=re.I)
    s = re.sub(r'\s+(ii|11|ll|il|li|ez|2)\b', '', s, flags=re.I)
    s = re.sub(r'(?:[im]n?gl[eé]s|f[ií]sica|electr[oó]nica|electrotecnia)[nu]\s*$', lambda m: m.group(0)[:-1], s, flags=re.I)
    s = re.sub(r'\s+(ul|ui)\s*$', '', s, flags=re.I)
    s = re.sub(r'\s+[nu]\s*$', '', s, flags=re.I)
    s = re.sub(r'\s+[il1|!]{1,3}\s*$', '', s, flags=re.I)
    return s.strip()

def is_classroom_string(s: str) -> bool:
    """
    Determina si un texto representa un aula o código de aula y NO el nombre de una materia.
    Ej: "211", "308/09", "308/309", "401/2/3/4", "501/502", "JavaLab", "Lab.5to", "Aula 12", etc.
    """
    if not s:
        return False
    norm = s.strip().lower()
    if re.match(r'^\d{1,4}(?:[/\-]\d{1,4})*$', norm):
        return True
    if re.match(r'^[a-z]\d{1,3}$', norm):
        return True
    if re.match(r'^(?:aula|lab|javalab|lab\.)\b', norm):
        return True
    return False

def normalize_esp_text(raw_esp: str) -> str:
    """
    Normaliza el código de especialidad leído en la columna Esp.
    """
    if not raw_esp:
        return "ISI"
    cleaned = raw_esp.upper().strip()
    if re.search(r'181|1S1|LSL|ISI', cleaned): return "ISI"
    if re.search(r'UD8|U0B|UDB', cleaned): return "UDB"
    if re.search(r'LE|1E|IE', cleaned): return "IE"
    if re.search(r'LQ|1Q|IQ', cleaned): return "IQ"
    if re.search(r'LM|1M|IM', cleaned): return "IM"
    if re.search(r'LC|1C|IC', cleaned): return "IC"
    return cleaned

def match_catalog_subject(raw: str, catalog: list[str]) -> str | None:
    clean_raw = (raw or "").strip()
    if len(clean_raw) < 2:
        return None

    # Normalización directa de "Física" y errores OCR (TENE, Fiscal, Fsica, Pisica)
    if re.search(r'\b(tene|fiscal|fsica|fisca|pisica|risica|tisica|t[eé]ne|f[ií]sca|flsica|flsical|f[ií]sica|fisica)\b', clean_raw, re.I):
        num = extract_roman_numeral(clean_raw) or 'I'
        target = f"Física {num}"
        if target in catalog:
            return target
        return "Física I"

    # Normalización directa de Análisis Numérico / Matemática Superior
    if re.search(r'analisis\s*numerico', clean_raw, re.I):
        return "Análisis Numérico"

    raw_numeral = extract_roman_numeral(clean_raw)
    raw_base = strip_roman_numeral(clean_raw)
    c_raw_base = clean_str(raw_base)
    c_raw_full = clean_str(clean_raw)

    best_cand = None
    best_score = -1.0

    for item in catalog:
        num_m = re.search(r'\s+(I|II|III|IV|V)$', item)
        item_numeral = num_m.group(1) if num_m else None
        item_base = item[:num_m.start()] if num_m else item
        c_item_base = clean_str(item_base)
        c_item_full = clean_str(item)

        score = 0.0

        if item_numeral:
            exact = len(c_raw_base) >= 3 and c_raw_base == c_item_base
            if exact:
                base_sim = 1.0
            else:
                dist = levenshtein(c_raw_base, c_item_base)
                max_len = max(len(c_raw_base), len(c_item_base))
                base_sim = 1.0 - (dist / max_len) if max_len > 0 else 0
                if len(c_raw_base) >= 5 and c_raw_base in c_item_base:
                    base_sim = max(base_sim, len(c_raw_base) / len(c_item_base))
                if len(c_item_base) >= 5 and c_item_base in c_raw_base:
                    base_sim = max(base_sim, len(c_item_base) / len(c_raw_base))

            if base_sim > 0.60:
                score = base_sim
                if raw_numeral:
                    if raw_numeral == item_numeral:
                        score += 0.5
                    else:
                        score -= 0.6
                else:
                    if item_numeral == 'I':
                        score += 0.05
        else:
            if c_raw_full == c_item_full:
                score = 1.5
            else:
                dist = levenshtein(c_raw_full, c_item_full)
                max_len = max(len(c_raw_full), len(c_item_full))
                sim = 1.0 - (dist / max_len) if max_len > 0 else 0
                if len(c_raw_full) >= 6 and c_raw_full in c_item_full:
                    sim = max(sim, (len(c_raw_full) / len(c_item_full)) * 1.0)
                if len(c_item_full) >= 6 and c_item_full in c_raw_full:
                    sim = max(sim, (len(c_item_full) / len(c_raw_full)) * 1.0)
                score = sim

        if score > best_score:
            best_score = score
            best_cand = item

    # Se requiere un umbral mínimo de similitud del 65% para corregir.
    if best_score >= 0.65:
        return best_cand
    return None

def process_exam_sheet(image_bytes: bytes) -> dict:
    """
    Procesa una imagen en bytes con RapidOCR (PaddleOCR ONNX).
    Aplica detección dinámica de encabezados y delimitación geométrica de columnas:
    Columna 1: Horario / Turno
    Columna 2: Especialidad (con análisis de celda combinada por bordes horizontales)
    Columna 3: Aula/s
    Columna 4: Nombre de la materia
    Columna 5: Horario
    """
    nparr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    if img is None:
        raise ValueError("No se pudo decodificar la imagen enviada")

    h, w = img.shape[:2]
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Ejecutar RapidOCR directamente sobre la imagen
    engine = get_ocr_engine()
    results, _ = engine(img)

    if not results:
        return {"success": True, "date": "", "count": 0, "casillas": []}

    # 1. Detección de encabezados y fecha
    detected_date = ""
    h_turno = None
    h_esp = None
    h_aula = None
    h_materia = None
    h_hora = None
    header_y_max = 0.0

    for box, text, _ in results:
        t = text.strip()
        norm = t.lower()

        # Detección de fecha de examen
        date_m = re.search(r'\b(LUNES|MARTES|MI[EÉ]RCOLES|JUEVES|VIERNES|S[AÁ]BADO)\s+(\d{1,2}/\d{1,2}|\d{1,2}\b)', t, re.I)
        if date_m and not detected_date:
            detected_date = date_m.group(0).upper()

        x0 = min(pt[0] for pt in box)
        x1 = max(pt[0] for pt in box)
        y0 = min(pt[1] for pt in box)
        y1 = max(pt[1] for pt in box)

        # Buscar en la franja superior de encabezados
        if y1 < (h * 0.08):
            if 'horario' in norm:
                if x0 < (w * 0.25):
                    h_turno = (x0, x1, y0, y1)
                else:
                    h_hora = (x0, x1, y0, y1)
                header_y_max = max(header_y_max, y1)
            elif 'esp' in norm:
                h_esp = (x0, x1, y0, y1)
                header_y_max = max(header_y_max, y1)
            elif 'aula' in norm:
                h_aula = (x0, x1, y0, y1)
                header_y_max = max(header_y_max, y1)
            elif 'nombre' in norm and 'materia' in norm:
                h_materia = (x0, x1, y0, y1)
                header_y_max = max(header_y_max, y1)

    # 2. Calcular los divisores de columnas (D1, D2, D3, D4)
    d1 = (h_turno[1] + h_esp[0]) / 2.0 if (h_turno and h_esp) else (w * 0.10)
    d2 = (h_esp[1] + h_aula[0]) / 2.0 if (h_esp and h_aula) else (w * 0.18)
    d3 = (h_aula[1] + 5.0) if h_aula else (w * 0.26)
    d4 = (h_hora[0] - 5.0) if h_hora else (w * 0.88)

    # 3. Detectar bordes horizontales de celda en la columna Esp (para celdas combinadas)
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

    # 4. Clasificar elementos detectados por debajo del encabezado
    items = []
    for box, text, score in results:
        t = text.strip()
        if not t:
            continue
        x0 = min(pt[0] for pt in box)
        x1 = max(pt[0] for pt in box)
        y0 = min(pt[1] for pt in box)
        y1 = max(pt[1] for pt in box)
        ymid = (y0 + y1) / 2.0
        xmid = (x0 + x1) / 2.0

        if ymid <= header_y_max:
            continue

        items.append({
            'text': t,
            'score': float(score),
            'x0': x0, 'x1': x1,
            'y0': y0, 'y1': y1,
            'x_mid': xmid,
            'y_mid': ymid
        })

    # Columna 1: Turnos
    turnos = [it for it in items if it['x_mid'] < d1]
    turnos.sort(key=lambda t: t['y_mid'])

    # Columna 2: Etiquetas de Especialidad
    esp_labels = []
    for it in items:
        if d1 <= it['x_mid'] < d2 and not is_classroom_string(it['text']):
            norm_esp = normalize_esp_text(it['text'])
            esp_labels.append({'text': norm_esp, 'y_mid': it['y_mid']})
    esp_labels.sort(key=lambda e: e['y_mid'])

    def get_esp_for_y(y):
        """
        Determina la Especialidad de la fila en Y respetando las líneas de celda combinada.
        """
        for i in range(len(merged_borders) - 1):
            top_b = merged_borders[i]
            bot_b = merged_borders[i + 1]
            if top_b <= y <= bot_b:
                in_interval = [l for l in esp_labels if (top_b - 8) <= l['y_mid'] <= (bot_b + 8)]
                if in_interval:
                    return in_interval[0]['text']
        if esp_labels:
            closest = min(esp_labels, key=lambda l: abs(l['y_mid'] - y))
            return closest['text']
        return "ISI"

    # Columna 3: Aulas (entre D2 y D3, o códigos de aula cerca de D3)
    aulas = [it for it in items if (d2 <= it['x_mid'] < d3) or (is_classroom_string(it['text']) and it['x_mid'] < (d3 + 15))]
    aulas.sort(key=lambda a: a['y_mid'])

    # Columna 4: Materias (entre D3 y D4, excluyendo números de aula)
    subjects = []
    for it in items:
        if d3 <= it['x_mid'] < d4:
            if is_classroom_string(it['text']):
                if it not in aulas:
                    aulas.append(it)
                continue
            norm = it['text'].lower()
            if 'nombre' in norm and 'materia' in norm:
                continue
            subjects.append(it)

    subjects.sort(key=lambda s: s['y_mid'])
    aulas.sort(key=lambda a: a['y_mid'])

    cur_turno = "1-Mañana"
    cur_aula = "211"
    cur_hora = "18:00"
    last_subject = None

    casillas = []

    for sub in subjects:
        y = sub['y_mid']

        # 1. Turno: candidato en la fila actual o el turno activo
        t_cands = [t for t in turnos if abs(t['y_mid'] - y) < 14]
        if t_cands:
            tt = t_cands[0]['text'].lower()
            if 'mañ' in tt or 'mari' in tt or '1' in tt:
                cur_turno = "1-Mañana"
            elif 'tard' in tt or '2' in tt:
                cur_turno = "2-Tarde"
            elif 'noch' in tt or '3' in tt:
                cur_turno = "3-Noche"

        # 2. Especialidad / Carrera: obtenida fielmente de la celda de la imagen
        final_esp = get_esp_for_y(y)

        # 3. Aula: buscar candidato en la misma fila (+/- 12px) o celda combinada anterior
        a_cands = [a for a in aulas if abs(a['y_mid'] - y) < 12]
        if a_cands:
            cur_aula = a_cands[0]['text']
        else:
            prior_aulas = [a for a in aulas if a['y_mid'] <= y]
            if prior_aulas:
                cur_aula = prior_aulas[-1]['text']

        # 4. Hora: candidato en la columna de horario (x >= D4)
        h_cands = [it for it in items if it['x_mid'] >= d4 and abs(it['y_mid'] - y) < 12]
        if h_cands:
            raw_h = h_cands[0]['text']
            hm = re.search(r'\b(\d{1,2})[:.](\d{2})', raw_h)
            if hm:
                cur_hora = f"{hm.group(1).zfill(2)}:{hm.group(2)}"

        # 5. Materia: normalización y desambiguación con catálogo oficial
        raw_materia = sub['text']
        matched = match_catalog_subject(raw_materia, UTN_SUBJECT_CATALOG)

        # Heurística de correlación romana (I -> II -> III)
        if last_subject and last_subject.endswith(" II"):
            base_of_last = last_subject[:-3]
            if matched in (f"{base_of_last} I", f"{base_of_last} II"):
                if f"{base_of_last} III" in UTN_SUBJECT_CATALOG:
                    matched = f"{base_of_last} III"

        final_materia = matched or raw_materia

        # Si por alguna razón la imagen no tuviese Especialidad válida, usar fallback del catálogo
        if not final_esp or final_esp not in ["ISI", "IQ", "IC", "IM", "IE", "UDB"]:
            final_esp = UTN_SUBJECT_CAREER_MAP.get(final_materia, "ISI")

        last_subject = final_materia

        casillas.append({
            "id": f"py-{len(casillas)+1}",
            "enabled": True,
            "esp": final_esp,
            "aula": cur_aula,
            "materia": final_materia,
            "hora": cur_hora,
            "turno": cur_turno
        })

    return {
        "success": True,
        "date": detected_date,
        "count": len(casillas),
        "casillas": casillas
    }
