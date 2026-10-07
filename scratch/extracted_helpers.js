function preprocessImageForOcr(imageSource) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const origW = img.naturalWidth || img.width;
        const origH = img.naturalHeight || img.height;

        // 1. Draw 1:1 original on unscaled canvas to detect and suppress table borders/grid lines
        // Table cell borders confuse Tesseract's block segmentation, causing it to skip entire rows.
        const canvas1x = document.createElement('canvas');
        canvas1x.width = origW;
        canvas1x.height = origH;
        const ctx1x = canvas1x.getContext('2d', { willReadFrequently: true });
        ctx1x.drawImage(img, 0, 0);

        const imgData = ctx1x.getImageData(0, 0, origW, origH);
        const data = imgData.data;

        function getLum(x, y) {
          const idx = (y * origW + x) * 4;
          return (data[idx] * 299 + data[idx + 1] * 587 + data[idx + 2] * 114) / 1000;
        }

        // Horizontal line suppression: continuous dark pixel run >= 60px
        for (let y = 0; y < origH; y++) {
          let runStart = -1;
          for (let x = 0; x < origW; x++) {
            if (getLum(x, y) < 130) {
              if (runStart === -1) runStart = x;
            } else {
              if (runStart !== -1) {
                if ((x - runStart) >= 60) {
                  for (let rx = runStart; rx < x; rx++) {
                    const idx = (y * origW + rx) * 4;
                    data[idx] = 255; data[idx + 1] = 255; data[idx + 2] = 255;
                  }
                }
                runStart = -1;
              }
            }
          }
          if (runStart !== -1 && (origW - runStart) >= 60) {
            for (let rx = runStart; rx < origW; rx++) {
              const idx = (y * origW + rx) * 4;
              data[idx] = 255; data[idx + 1] = 255; data[idx + 2] = 255;
            }
          }
        }

        // Vertical line suppression: continuous dark pixel run >= 45px
        for (let x = 0; x < origW; x++) {
          let runStart = -1;
          for (let y = 0; y < origH; y++) {
            if (getLum(x, y) < 130) {
              if (runStart === -1) runStart = y;
            } else {
              if (runStart !== -1) {
                if ((y - runStart) >= 45) {
                  for (let ry = runStart; ry < y; ry++) {
                    const idx = (ry * origW + x) * 4;
                    data[idx] = 255; data[idx + 1] = 255; data[idx + 2] = 255;
                  }
                }
                runStart = -1;
              }
            }
          }
          if (runStart !== -1 && (origH - runStart) >= 45) {
            for (let ry = runStart; ry < origH; ry++) {
              const idx = (ry * origW + x) * 4;
              data[idx] = 255; data[idx + 1] = 255; data[idx + 2] = 255;
            }
          }
        }

        ctx1x.putImageData(imgData, 0, 0);

        // 2. High-DPI Upscale (Optimal scale up to 2400px so character strokes reach 20-25px tall for Tesseract LSTM)
        const maxDim = Math.max(origW, origH);
        const scale = Math.max(1.5, Math.min(3.0, 2400 / maxDim));

        const upCanvas = document.createElement('canvas');
        upCanvas.width = Math.round(origW * scale);
        upCanvas.height = Math.round(origH * scale);
        const upCtx = upCanvas.getContext('2d');
        upCtx.imageSmoothingEnabled = true;
        upCtx.imageSmoothingQuality = 'high';
        upCtx.drawImage(canvas1x, 0, 0, upCanvas.width, upCanvas.height);

        resolve(upCanvas.toDataURL('image/png'));
      } catch (e) {
        resolve(imageSource);
      }
    };
    img.onerror = () => resolve(imageSource);
    img.src = typeof imageSource === 'string' ? imageSource : URL.createObjectURL(imageSource);
  });
}


// ============================================================================


function parseCasillasFromOcrText(rawText) {
  const lines = rawText.split('\n').map(l => l.trim()).filter(l => l.length > 2);
  const results = [];

  let currentTurno = '2-Tarde';
  let currentEsp = 'ISI';
  let currentAula = '211';
  let currentTime = '18:00';
  let lastSubject = null;

  const turnoRegex = /\b(1-Mañana|2-Tarde|3-Noche|1\s*Mañana|2\s*Tarde|3\s*Noche|Mañana|Tarde|Noche|SHoche)\b/i;
  const espRegex = /\b(ISI|IC|IQ|UDB|IE|IM|LAR|EM|181|1S1|lSl|UD8|U0B|lE|1E|lQ|1Q|lM|1M|lC|1C)\b/i;
  const aulaRegex = /\b(?:Aula\s*)?(\d{1,4}(?:\/[\d\/]+)?|JavaLab|Lab\.[a-z0-9]+)\b/i;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Skip table header lines
    const normLine = line.toLowerCase();
    if (normLine.includes('horario') && (normLine.includes('esp') || normLine.includes('aula') || normLine.includes('materia'))) {
      continue;
    }
    if (normLine.includes('nombre de materia') || normLine.includes('nombredemateria')) {
      continue;
    }

    // 1. Detect and update Shift / Turno
    const turnoMatch = line.match(turnoRegex);
    if (turnoMatch) {
      const t = turnoMatch[1].toLowerCase();
      if (t.includes('mañan') || t.includes('1')) currentTurno = '1-Mañana';
      else if (t.includes('tard') || t.includes('2')) currentTurno = '2-Tarde';
      else if (t.includes('noch') || t.includes('3') || t.includes('shoch')) currentTurno = '3-Noche';
      line = line.replace(turnoMatch[0], ' ');
    }

    // 2. Detect and update Career / Especialidad
    const espMatch = line.match(espRegex);
    if (espMatch) {
      const rawEsp = espMatch[1].toUpperCase();
      if (/181|1S1|LSL|ISI/.test(rawEsp)) currentEsp = 'ISI';
      else if (/UD8|U0B|UDB/.test(rawEsp)) currentEsp = 'UDB';
      else if (/LE|1E|IE/.test(rawEsp)) currentEsp = 'IE';
      else if (/LQ|1Q|IQ/.test(rawEsp)) currentEsp = 'IQ';
      else if (/LM|1M|IM/.test(rawEsp)) currentEsp = 'IM';
      else if (/LC|1C|IC/.test(rawEsp)) currentEsp = 'IC';
      else currentEsp = rawEsp;
      line = line.replace(espMatch[0], ' ');
    }

    // 3. Extract Exam Time FIRST (supports HH:MM, HH:MM:SS, and compact numbers like 190000, 160000, 09000)
    const timeMatch = line.match(/\b(\d{1,2})[:.](\d{2})(?:[:.]\d{2})?\s*$/)
      || line.match(/\b(0[89]|1\d|2[0-3])(\d{2})(?:00)?\s*$/)
      || line.match(/\b(\d{1,2})[:.](\d{2})(?:[:.]\d{2})?\b/)
      || line.match(/\b(0[89]|1\d|2[0-3])(\d{2})\s*$/);

    if (timeMatch) {
      const hh = timeMatch[1].padStart(2, '0');
      const mm = timeMatch[2].padEnd(2, '0');
      currentTime = `${hh}:${mm}`;
      line = line.replace(timeMatch[0], ' ');
    }

    // 4. Detect and update Classroom / Aula
    const aulaMatch = line.match(aulaRegex);
    if (aulaMatch) {
      currentAula = aulaMatch[1];
      line = line.replace(aulaMatch[0], ' ');
    }

    // 5. Clean stamp tokens and trailing leftover digits
    line = line.replace(/\b(DEPTO\.?|DPTO\.?|BEDELIA|BEDELÍA|EDELIA|DEPARTAMENTO)\b/gi, ' ');
    line = line.replace(/\s+\d{3,6}$/, '').trim();

    // Skip empty or tiny fragments
    if (line.length < 2) continue;

    // Prevent classroom strings from being treated as subject names
    if (/^\d{1,4}(?:\/[\d\/]+)?$/i.test(line) || /^(?:aula|lab|javalab|lab\.)\b/i.test(line)) {
      currentAula = line;
      continue;
    }

    // 6. Fuzzy match against UTN subject catalog with Roman numeral (I, II, III) & Fisica/TENE discrimination
    let matchedSubject = matchCatalogSubject(line, UTN_SUBJECT_CATALOG);

    // Sequence heuristic: If previous row was [Base] II, and this row has same base or is ambiguously matched, advance to III!
    if (lastSubject && lastSubject.endsWith(' II')) {
      const baseOfLast = lastSubject.replace(/\s+II$/, '');
      if (matchedSubject === `${baseOfLast} I` || matchedSubject === `${baseOfLast} II`) {
        if (UTN_SUBJECT_CATALOG.includes(`${baseOfLast} III`)) {
          matchedSubject = `${baseOfLast} III`;
        }
      }
    }

    const cleanedLine = line.replace(/[\[\]|\-_~*«»<>—+=\/\\{}()$%#@!?¿¡.:;,"§']/g, ' ').replace(/\s+/g, ' ').trim();
    const finalMateria = matchedSubject || cleanedLine;

    // 7. Smart career determination from official catalog:
    let finalEsp = currentEsp;
    if (UTN_SUBJECT_CAREER_MAP[finalMateria]) {
      const mappedCareer = UTN_SUBJECT_CAREER_MAP[finalMateria];
      if (!espMatch || (finalEsp !== mappedCareer && mappedCareer !== 'UDB')) {
        finalEsp = mappedCareer;
        currentEsp = mappedCareer;
      }
    }

    lastSubject = finalMateria;

    // Push casilla
    results.push({
      id: `ocr-${Date.now()}-${results.length}`,
      enabled: true,
      esp: finalEsp,
      aula: currentAula,
      materia: finalMateria,
      hora: currentTime,
      turno: currentTurno
    });
  }

  return results;
}

// ============================================================================
