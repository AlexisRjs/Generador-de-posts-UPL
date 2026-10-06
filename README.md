# 📱 Generador de Posts e Historias UPL — UTN FRRO

Herramienta web oficial de diseño y automatización de flyers para redes sociales (Instagram Stories HD 1080×1920) de la agrupación estudiantil **Universitarios por la Libertad (UPL)** de la **UTN Facultad Regional Rosario**.

Permite diseñar y exportar en segundos placas informativas de alta calidad para comunicar mesas de examen, paros docentes y avisos institucionales a los estudiantes.

---

## 🚀 Características Principales

### 1. 📋 Mesas de Examen con OCR Inteligente (Python + RapidOCR + OpenCV)
- **Extracción Automática desde Foto:** Sube o arrastra una captura de la planilla de examen y el sistema extrae automáticamente todas las materias, aulas, turnos y horarios en ~0.2 segundos.
- **Delimitación Precisa de 5 Columnas:** Detecta fielmente la estructura de la planilla:
  $$\text{Horario (Turno)} \;\longrightarrow\; \text{Especialidad} \;\longrightarrow\; \text{Aula/s} \;\longrightarrow\; \text{Nombre de la materia} \;\longrightarrow\; \text{Horario}$$
- **Aislamiento Estricto de Aulas:** Previene que números de aula (como `211`, `308/09`, `401/2/3/4`) se confundan con nombres de materias.
- **Soporte de Materias Compartidas:** En asignaturas electivas o comunes (ej. *Formación de Emprendedores*), respeta la especialidad de cada celda combinada (`ISI`, `IQ`, `IC`), evitando duplicar carreras erróneamente.
- **Normalización con Catálogo Oficial:** Corrección difusa contra el listado oficial de materias de la UTN FRRO, desambiguación de números romanos (*I, II y III*) y detección de errores de escaneo (*ej. "TENE" a "Física"*).
- **Reparto Multi-Historia:** Si la cantidad de materias supera el espacio de una placa, el generador distribuye las materias en múltiples historias HD (Parte 1/2, 2/2, etc.).
- **Filtros Interactivos:** Filtra por especialidad (`ISI`, `IQ`, `IC`, `IE`, `IM`, `UDB`) y turno (*Mañana, Tarde, Noche*), con edición manual de casillas en tiempo real.

### 2. 🔔 Avisos y Comunicados (Plantillas Importante / Recordatorio)
- Modos visuales intercambiables: `🔔 IMPORTANTE` y `⏰ RECORDATORIO`.
- Bloques destacados con cápsula de fecha y subtítulo lateral.
- Ajustes finos individuales de posición vertical ($Y$) y escala para títulos, bloques y texto.
- Resaltado automático en negrita para subtítulos clave.

### 3. 🚫 Paros y Medidas de Fuerza
- Gestión interactiva de días y fechas de paro (apilados o combinados, ej. *MIÉ 21 Y JUE 22*).
- Selector rápido de gremios y convocantes (*FAGDUT*, *SIDUT*, *APUTN No Docente*).
- Indicador de estado de la facultad (*Cerrada*, *Consulta a tu docente*, *Actividad normal*).

---

## 🛠️ Stack Tecnológico

- **Frontend:**
  - Vanilla JavaScript ES6+
  - HTML5 Canvas Engine (Renderizado nativo a 1080×1920 px, 60fps)
  - Vanilla CSS3 (Diseño responsivo, modo oscuro, glassmorphism)
  - [Vite](https://vitejs.dev/) como bundler y entorno de desarrollo local.
  - Tesseract.js (Motor de respaldo en navegador para funcionamiento 100% offline o estático).

- **Backend OCR (Python):**
  - **FastAPI** & **Uvicorn** (API REST ultrarrápida con CORS).
  - **RapidOCR** (Modelos ONNX PaddleOCR v4 optimizados para CPU).
  - **OpenCV** & **Pillow** (Procesamiento morfológico y análisis matricial de celdas).

---

## 💻 Instalación y Uso Local

### Prerrequisitos
- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [Python](https://www.python.org/) (versión 3.10 o superior)

### 1. Clonar el Repositorio
```bash
git clone https://github.com/AlexisRjs/Generador-de-posts-UPL.git
cd Generador-de-posts-UPL
```

### 2. Instalar Dependencias de JavaScript
```bash
npm install
```

### 3. Instalar Dependencias de Python
```bash
pip install -r requirements.txt
```

---

## ▶️ Ejecución

Para disfrutar de la máxima velocidad y precisión del OCR con Python, inicia el servidor en una terminal:

```bash
npm run python:server
# O alternativamente: python server.py
```
> El servidor iniciará en `http://127.0.0.1:8000`.

En otra terminal, inicia el frontend web con Vite:

```bash
npm run dev
```
> Abre tu navegador en la URL indicada por Vite (usualmente `http://localhost:5173`).

*(Nota: si no inicias el servidor Python, el frontend cuenta con un motor de respaldo automático en el navegador con Tesseract.js).*

---

## 📦 Construcción para Producción

Para generar el bundle estático optimizado:
```bash
npm run build
```
Los archivos de distribución se generarán en la carpeta `dist/`.

---

## 📁 Estructura del Proyecto

```text
├── app.js                 # Lógica de la aplicación, estado y motor de Canvas
├── index.html             # Interfaz web y estructura de paneles
├── style.css              # Sistema de diseño, tokens y estilos responsivos
├── server.py              # Servidor API FastAPI (/api/ocr-mesa, /api/health)
├── ocr_engine.py          # Motor Python de visión por computadora y RapidOCR
├── requirements.txt       # Dependencias de Python
├── package.json           # Scripts de NPM y dependencias web
├── LISTADODEMATERIAS.MD   # Catálogo oficial de materias UTN FRRO
├── dist/                  # Bundle de producción compilado con Vite
└── public/                # Recursos estáticos (logos, fuentes, plantillas base)
```

---

## 👥 Agrupación

Desarrollado para **Universitarios por la Libertad (UPL)** — *UTN FRRO*.
Libertad, transparencia y servicio para la comunidad estudiantil.
