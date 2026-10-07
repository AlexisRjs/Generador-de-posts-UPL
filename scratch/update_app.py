import sys

with open('app.js', 'r', encoding='utf-8') as f:
    code = f.read()

with open('scratch/extracted_helpers.js', 'r', encoding='utf-8') as f:
    helpers = f.read()

preprocess_fn = helpers[:helpers.find('function parseCasillasFromOcrText')].strip()
parse_fn = helpers[helpers.find('function parseCasillasFromOcrText'):].strip()

# 1. Insert preprocessImageForOcr before SAFE_BOUNDS
marker1 = '// Safe Visual Canvas Bounds'
if 'function preprocessImageForOcr' not in code:
    code = code.replace(marker1, preprocess_fn + '\n\n' + marker1)

# 2. Update OCR block
old_block_start = 'function updateEngineBadge(isOnline) {'
old_block_end = '// Multi-Day UI Manager (PARO)'
idx_start = code.find(old_block_start)
idx_end = code.find(old_block_end)

if idx_start == -1 or idx_end == -1:
    print('Error finding block', idx_start, idx_end)
    sys.exit(1)

new_middle = """function updateEngineBadge(isOnline) {
  const badge = dom.mesaEngineBadge || document.getElementById('mesa-engine-badge');
  const text = dom.mesaEngineText || document.getElementById('mesa-engine-text');
  if (!badge) return;
  if (isOnline) {
    badge.className = 'ocr-engine-badge online';
    if (text) text.textContent = 'Python OCR: Activo ⚡';
    badge.title = `Motor Python conectado en ${activeOcrUrl} (OpenCV + RapidOCR ONNX)`;
  } else {
    badge.className = 'ocr-engine-badge offline';
    if (text) text.textContent = 'OCR: Navegador 🌐';
    badge.title = 'Motor local del navegador (Tesseract.js). Inicia el servidor local en tu PC con "npm run python:server" para máxima velocidad y precisión.';
  }
}

let activeOcrUrl = 'http://127.0.0.1:8000';

async function checkPythonOcrHealth() {
  const candidates = [
    'http://127.0.0.1:8000',
    'http://localhost:8000'
  ];
  if (window.location.hostname && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    candidates.push(`http://${window.location.hostname}:8000`);
  }

  for (const url of candidates) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1500);
      const res = await fetch(`${url}/api/health`, { method: 'GET', signal: controller.signal });
      clearTimeout(timeoutId);
      if (res.ok) {
        activeOcrUrl = url;
        updateEngineBadge(true);
        return true;
      }
    } catch (e) {
      // continuar
    }
  }
  updateEngineBadge(false);
  return false;
}

async function performOcrOnImage(imageSource, file = null) {
  if (!dom.mesaOcrProgressWrap) {
    showToast('Procesando imagen...');
    return;
  }

  dom.mesaOcrProgressWrap.classList.remove('hidden');
  if (dom.mesaOcrProgress) dom.mesaOcrProgress.style.width = '15%';
  if (dom.mesaOcrStatusText) dom.mesaOcrStatusText.textContent = 'Consultando motor Python (OpenCV + RapidOCR)...';

  // 1. PRIORIDAD 1: Intentar siempre motor Python local de alta precisión
  try {
    let imageBlob = file;
    if (!imageBlob && imageSource) {
      if (imageSource.startsWith('data:') || imageSource.startsWith('blob:')) {
        const res = await fetch(imageSource);
        imageBlob = await res.blob();
      }
    }

    if (imageBlob) {
      const formData = new FormData();
      formData.append('file', imageBlob, file?.name || 'mesa.png');

      if (dom.mesaOcrProgress) dom.mesaOcrProgress.style.width = '35%';
      if (dom.mesaOcrStatusText) dom.mesaOcrStatusText.textContent = 'Extrayendo materias con OpenCV + RapidOCR en Python...';

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const pyResponse = await fetch(`${activeOcrUrl}/api/ocr-mesa`, {
        method: 'POST',
        body: formData,
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (pyResponse.ok) {
        const pyData = await pyResponse.json();
        if (pyData && pyData.success && Array.isArray(pyData.casillas) && pyData.casillas.length > 0) {
          updateEngineBadge(true);
          if (dom.mesaOcrProgress) dom.mesaOcrProgress.style.width = '100%';
          if (dom.mesaOcrStatusText) dom.mesaOcrStatusText.textContent = `¡Listo! ${pyData.casillas.length} materias detectadas ⚡`;

          if (pyData.date) {
            state.mesa.date = pyData.date;
            if (dom.mesaDate) dom.mesaDate.value = pyData.date;
          }

          state.mesa.hasLoadedData = true;
          state.mesa.casillas = pyData.casillas;

          setTimeout(() => {
            if (dom.mesaOcrProgressWrap) dom.mesaOcrProgressWrap.classList.add('hidden');
          }, 800);

          renderMesaCasillasUI();
          saveAndRender();
          showToast(`¡${pyData.casillas.length} materias extraídas con motor Python (OpenCV + RapidOCR)! ⚡`);
          return;
        }
      }
    }
  } catch (pyErr) {
    console.info('Servidor Python offline, recurriendo a OCR en navegador:', pyErr.message);
    updateEngineBadge(false);
  }

  // 2. FALLBACK AUTOMÁTICO: Tesseract.js en el navegador (móvil o sin Python encendido)
  if (!window.Tesseract) {
    if (dom.mesaOcrProgressWrap) dom.mesaOcrProgressWrap.classList.add('hidden');
    showToast('Inicia el servidor Python con "npm run python:server" en la terminal para procesar la imagen.', 'error');
    return;
  }

  if (dom.mesaOcrProgress) dom.mesaOcrProgress.style.width = '20%';
  if (dom.mesaOcrStatusText) dom.mesaOcrStatusText.textContent = 'Servidor Python no detectado. Usando OCR en navegador...';

  try {
    const enhancedImage = await preprocessImageForOcr(imageSource);

    if (dom.mesaOcrProgress) dom.mesaOcrProgress.style.width = '35%';
    if (dom.mesaOcrStatusText) dom.mesaOcrStatusText.textContent = 'Iniciando Tesseract.js en el navegador...';

    const result = await window.Tesseract.recognize(
      enhancedImage,
      'spa+eng',
      {
        tessedit_pageseg_mode: '6',
        user_defined_dpi: '300',
        logger: (m) => {
          if (m.status === 'recognizing text' && m.progress) {
            const pct = Math.round(35 + m.progress * 60);
            if (dom.mesaOcrProgress) dom.mesaOcrProgress.style.width = `${pct}%`;
            if (dom.mesaOcrStatusText) dom.mesaOcrStatusText.textContent = `Extrayendo materias y aulas (navegador)... ${pct}%`;
          }
        }
      }
    );

    const extractedText = result.data.text || '';

    const dateMatch = extractedText.match(/\\b(LUNES|MARTES|MI[EÉ]RCOLES|JUEVES|VIERNES|S[AÁ]BADO)\\s+(\\d{1,2}\\/\\d{1,2}|\\d{1,2}\\b)/i);
    if (dateMatch) {
      const detectedDate = dateMatch[0].toUpperCase();
      state.mesa.date = detectedDate;
      if (dom.mesaDate) dom.mesaDate.value = detectedDate;
    }

    const parsed = parseCasillasFromOcrText(extractedText);

    state.mesa.hasLoadedData = true;
    if (parsed.length > 0) {
      state.mesa.casillas = parsed;
      showToast(`¡${parsed.length} materias detectadas en navegador! ✨ (Para mayor precisión inicia "npm run python:server")`);
    } else {
      state.mesa.casillas = [];
      showToast('No se detectaron materias con claridad. Puedes añadirlas con "+ Agregar Materia".', 'error');
    }

    if (dom.mesaOcrProgressWrap) dom.mesaOcrProgressWrap.classList.add('hidden');
    renderMesaCasillasUI();
    saveAndRender();
  } catch (err) {
    console.error('Error during OCR fallback:', err);
    if (dom.mesaOcrProgressWrap) dom.mesaOcrProgressWrap.classList.add('hidden');
    state.mesa.hasLoadedData = true;
    state.mesa.casillas = [];
    renderMesaCasillasUI();
    saveAndRender();
    showToast('Ocurrió un error al procesar la foto con OCR. Puedes agregar materias manualmente.', 'error');
  }
}

"""

code = code[:idx_start] + new_middle + parse_fn + '\n\n' + code[idx_end:]

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(code)

print('SUCCESS')
