with open('app.js', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Add btnLaunchOcr to dom object
s1 = "mesaEngineText: document.getElementById('mesa-engine-text'),"
r1 = s1 + "\n  btnLaunchOcr: document.getElementById('btn-launch-ocr'),"
text = text.replace(s1, r1)

# 2. Add event listener to btnLaunchOcr
s2 = """    dom.btnTriggerUploadMesa.addEventListener('click', () => {
      if (dom.mesaFileInput) dom.mesaFileInput.click();
    });"""

r2 = s2 + """

  if (dom.btnLaunchOcr) {
    dom.btnLaunchOcr.addEventListener('click', () => {
      const batContent = `@echo off\\r\\ntitle UPL - Servidor OCR Python\\r\\ncd /d "%~dp0"\\r\\necho ===================================================\\r\\necho   Iniciando Servidor Python OCR (OpenCV + RapidOCR)\\r\\necho ===================================================\\r\\necho   Escuchando en http://127.0.0.1:8000\\r\\necho   Deja esta ventana abierta mientras utilices la app.\\r\\necho ===================================================\\r\\nif exist "dist\\\\UPL_OCR\\\\UPL_OCR.exe" (\\r\\n  dist\\\\UPL_OCR\\\\UPL_OCR.exe\\r\\n) else (\\r\\n  python server.py\\r\\n)\\r\\npause\\r\\n`;
      const blob = new Blob([batContent], { type: 'application/x-bat' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'iniciar_ocr.bat';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Descargando iniciar_ocr.bat. ¡Hazle doble clic para encender el servidor! ⚡');
    });
  }"""

text = text.replace(s2, r2)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(text)

print('Updated app.js successfully')
