/**
 * UPL Stories - Application Logic & Canvas Engine
 * Universitarios por la Libertad - UTN FRRO
 */

// ============================================================================
// State Management
// ============================================================================
const state = {
  currentMode: 'paro', // Default to 'paro' as requested
  currentMobileView: 'edit', // 'edit' | 'preview'
  isComparing: false,
  fontLoaded: false,

  info: {
    title: 'MESAS ESPECIALES\nDE OCTUBRE',
    hasBadge: true,
    badgeVal: '5 AL 9',
    badgeSub: 'INSCRIPCIÓN AL PEDIDO\nDE MESA ESPECIAL',
    body: 'REQUISITOS:\nTener cursada y regularizada toda la carrera, excepto Proyecto Final.\n\nUna vez confirmadas las mesas, habrá una fecha de enganche, donde podrán anotarse quienes no cumplían el requisito.',
    align: 'left', // 'left' | 'center'
    yOffset: 0,
    scale: 1.0,
  },

  paro: {
    // Array of days for multi-day support with "+" button
    days: [
      { day: 'MIÉRCOLES', date: '15/10' }
    ],
    format: 'combined', // 'combined' | 'stacked'
    hasLine: true,
    gremium: 'FAGDUT', // Default gremium from requested options: FAGDUT, SIDUT, APUTN (No docente)
    status: 'La facultad estará cerrada.', // Options: 'La facultad estará cerrada.', 'Consulta a tu docente.', 'Actividad normal.', ''
    extra: '',
    yOffset: 0,
    scale: 1.0,
  }
};

// ============================================================================
// Presets Data
// ============================================================================
const PRESETS = {
  'info-mesas': {
    title: 'MESAS ESPECIALES\nDE OCTUBRE',
    hasBadge: true,
    badgeVal: '5 AL 9',
    badgeSub: 'INSCRIPCIÓN AL PEDIDO\nDE MESA ESPECIAL',
    body: 'REQUISITOS:\nTener cursada y regularizada toda la carrera, excepto Proyecto Final.\n\nUna vez confirmadas las mesas, habrá una fecha de enganche, donde podrán anotarse quienes no cumplían el requisito.',
    align: 'left',
    yOffset: 0,
    scale: 1.0
  },
  'info-inscripcion': {
    title: 'INSCRIPCIÓN\nA CURSADAS',
    hasBadge: true,
    badgeVal: 'SYSACAD',
    badgeSub: 'APERTURA DE TURNOS\nDE MATRICULACIÓN',
    body: 'HORARIOS DE INSCRIPCIÓN:\nRevisá tu turno de prioridad académica ingresando a la plataforma institucional.\n\nPor inconvenientes con correlativas comunicarse con secretaría estudiantil.',
    align: 'left',
    yOffset: 0,
    scale: 1.0
  },
  'info-reprogramacion': {
    title: 'REPROGRAMACIÓN\nDE EXÁMENES',
    hasBadge: true,
    badgeVal: 'ATENCIÓN',
    badgeSub: 'MODIFICACIÓN DE\nFECHAS OFICIALES',
    body: 'Las mesas afectadas por medidas de fuerza se reprograman de acuerdo al nuevo cronograma establecido por decanato.\n\nConsultá el listado por carrera y cátedra en el enlace de la bio.',
    align: 'left',
    yOffset: 0,
    scale: 1.0
  },
  'info-becas': {
    title: 'BECAS UTN\nCONVOCATORIA',
    hasBadge: true,
    badgeVal: 'POSTULATE',
    badgeSub: 'AYUDA ECONÓMICA E\nINVESTIGACIÓN',
    body: 'REQUISITOS:\nSer estudiante regular y presentar la documentación solicitada a través de secretaría de asuntos estudiantiles.\n\nFecha límite de presentación: 30 de octubre.',
    align: 'left',
    yOffset: 0,
    scale: 1.0
  },
  'paro-aputn': {
    days: [{ day: 'MIÉRCOLES', date: '15/10' }],
    format: 'combined',
    hasLine: true,
    gremium: 'APUTN (NO DOCENTE)',
    status: 'La facultad estará cerrada.',
    extra: '',
    yOffset: 0,
    scale: 1.0
  },
  'paro-fagdut': {
    days: [{ day: 'JUEVES', date: '16/10' }],
    format: 'combined',
    hasLine: true,
    gremium: 'FAGDUT',
    status: 'Consulta a tu docente.',
    extra: '',
    yOffset: 0,
    scale: 1.0
  },
  'paro-sidut': {
    days: [{ day: 'VIERNES', date: '17/10' }],
    format: 'combined',
    hasLine: true,
    gremium: 'SIDUT',
    status: 'Consulta a tu docente.',
    extra: '',
    yOffset: 0,
    scale: 1.0
  },
  'paro-ambos': {
    days: [
      { day: 'MIÉRCOLES', date: '15/10' },
      { day: 'JUEVES', date: '16/10' }
    ],
    format: 'combined',
    hasLine: true,
    gremium: 'FAGDUT - APUTN (NO DOCENTE)',
    status: 'La facultad estará cerrada.',
    extra: '',
    yOffset: 0,
    scale: 1.0
  }
};

const BASE_GREMIOS = [
  'FAGDUT',
  'SIDUT',
  'APUTN (NO DOCENTE)'
];

const BASE_STATUSES = [
  'La facultad estará cerrada.',
  'Consulta a tu docente.',
  'Actividad normal.',
  ''
];

const DAYS_SEQUENCE = ['LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO'];

// ============================================================================
// DOM Elements
// ============================================================================
const dom = {
  // Tabs & Views
  tabInfo: document.getElementById('tab-info'),
  tabParo: document.getElementById('tab-paro'),
  formInfo: document.getElementById('form-info'),
  formParo: document.getElementById('form-paro'),
  btnViewEdit: document.getElementById('btn-view-edit'),
  btnViewPreview: document.getElementById('btn-view-preview'),
  editorSection: document.getElementById('editor-section'),
  previewSection: document.getElementById('preview-section'),

  // Header Actions
  btnQuickPresets: document.getElementById('btn-quick-presets'),
  btnReset: document.getElementById('btn-reset'),

  // Info Inputs
  infoTitle: document.getElementById('info-title'),
  infoHasBadge: document.getElementById('info-has-badge'),
  infoBadgeFields: document.getElementById('info-badge-fields'),
  infoBadgeVal: document.getElementById('info-badge-val'),
  infoBadgeSubtitle: document.getElementById('info-badge-subtitle'),
  infoBody: document.getElementById('info-body'),
  btnAlignLeft: document.getElementById('btn-align-left'),
  btnAlignCenter: document.getElementById('btn-align-center'),
  infoYOffset: document.getElementById('info-y-offset'),
  infoYVal: document.getElementById('info-y-val'),
  infoScale: document.getElementById('info-scale'),
  infoScaleVal: document.getElementById('info-scale-val'),
  btnResetInfoAdj: document.getElementById('btn-reset-info-adjustments'),

  // Paro Inputs
  btnAddDay: document.getElementById('btn-add-day'),
  paroDaysList: document.getElementById('paro-days-list'),
  multiDayStyleWrap: document.getElementById('multi-day-style-wrap'),
  btnFormatCombined: document.getElementById('btn-format-combined'),
  btnFormatStacked: document.getElementById('btn-format-stacked'),
  paroHasLine: document.getElementById('paro-has-line'),
  paroGremium: document.getElementById('paro-gremium'),
  paroStatus: document.getElementById('paro-status'),
  paroExtra: document.getElementById('paro-extra'),
  paroYOffset: document.getElementById('paro-y-offset'),
  paroYVal: document.getElementById('paro-y-val'),
  paroScale: document.getElementById('paro-scale'),
  paroScaleVal: document.getElementById('paro-scale-val'),
  btnResetParoAdj: document.getElementById('btn-reset-paro-adjustments'),

  // Canvas & Preview
  canvas: document.getElementById('output-canvas'),
  refOverlay: document.getElementById('ref-overlay'),
  btnToggleRef: document.getElementById('btn-toggle-ref'),
  captionPreviewText: document.getElementById('caption-preview-text'),
  btnCopyCaption: document.getElementById('btn-copy-caption'),

  // Bottom Actions
  btnDownload: document.getElementById('btn-download'),
  btnShare: document.getElementById('btn-share'),
  toastContainer: document.getElementById('toast-container'),
  canvasLoading: document.getElementById('canvas-loading'),
};

const ctx = dom.canvas.getContext('2d');

// Image assets cache
const assets = {
  infoTemplate: new Image(),
  paroTemplate: new Image(),
  infoRef: new Image(),
  paroRef: new Image(),
  loaded: {
    infoTemplate: false,
    paroTemplate: false
  }
};

// ============================================================================
// Initialization & Asset Preloading
// ============================================================================
async function init() {
  loadSavedState();
  setupEventListeners();
  renderDaysInputs();
  syncFormToState();
  
  // Show loading while fonts and assets load
  dom.canvasLoading.classList.remove('hidden');

  await Promise.all([
    preloadFonts(),
    loadImages()
  ]);

  dom.canvasLoading.classList.add('hidden');
  renderCanvas();
  updateCaption();

  // Re-render when document fonts finish loading
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      renderCanvas();
    });
  }
}

/**
 * Preload Montserrat font weights for Canvas rendering
 */
async function preloadFonts() {
  try {
    if (document.fonts) {
      await Promise.all([
        document.fonts.load('400 32px "Montserrat"'),
        document.fonts.load('500 32px "Montserrat"'),
        document.fonts.load('600 36px "Montserrat"'),
        document.fonts.load('700 48px "Montserrat"'),
        document.fonts.load('800 68px "Montserrat"'),
        document.fonts.load('900 168px "Montserrat"')
      ]);
      await document.fonts.ready;
    }
  } catch (err) {
    console.warn('Font loading error (fallback to system sans):', err);
  }
  state.fontLoaded = true;
}

/**
 * Load background templates and reference images
 */
function loadImages() {
  return new Promise((resolve) => {
    let toLoad = 2;
    const checkDone = () => {
      toLoad--;
      if (toLoad <= 0) resolve();
    };

    // Base template paths (with fallback to workspace files)
    assets.infoTemplate.crossOrigin = 'anonymous';
    assets.infoTemplate.src = './info-template.png';
    assets.infoTemplate.onload = () => {
      assets.loaded.infoTemplate = true;
      checkDone();
    };
    assets.infoTemplate.onerror = () => {
      assets.infoTemplate.src = './INFO%20UPL.png';
      assets.infoTemplate.onload = () => { assets.loaded.infoTemplate = true; checkDone(); };
      assets.infoTemplate.onerror = () => checkDone();
    };

    assets.paroTemplate.crossOrigin = 'anonymous';
    assets.paroTemplate.src = './paro-template.png';
    assets.paroTemplate.onload = () => {
      assets.loaded.paroTemplate = true;
      checkDone();
    };
    assets.paroTemplate.onerror = () => {
      assets.paroTemplate.src = './PARO%20UPL.png';
      assets.paroTemplate.onload = () => { assets.loaded.paroTemplate = true; checkDone(); };
      assets.paroTemplate.onerror = () => checkDone();
    };

    assets.infoRef.src = './info-output-ref.png';
    assets.paroRef.src = './paro-output-ref.png';
  });
}

// ============================================================================
// Multi-Day UI Manager
// ============================================================================
function renderDaysInputs() {
  dom.paroDaysList.innerHTML = '';

  state.paro.days.forEach((dayItem, index) => {
    const card = document.createElement('div');
    card.className = 'paro-day-card';
    card.innerHTML = `
      <div class="day-card-header">
        <span class="day-card-badge">Día ${index + 1}</span>
        ${state.paro.days.length > 1 ? `<button type="button" class="btn-remove-day" data-remove="${index}" title="Eliminar este día">✕</button>` : ''}
      </div>
      <div class="fields-2col">
        <div class="field-item">
          <label class="field-label-sm">Día de la semana</label>
          <input type="text" class="input-text text-center font-bold input-day" data-index="${index}" value="${dayItem.day}" placeholder="MIÉRCOLES">
        </div>
        <div class="field-item">
          <label class="field-label-sm">Fecha</label>
          <input type="text" class="input-text text-center font-bold input-date" data-index="${index}" value="${dayItem.date}" placeholder="15/10">
        </div>
      </div>
      <div class="quick-chips-wrap">
        <div class="chips-grid">
          <button type="button" class="chip-item ${dayItem.day.toUpperCase() === 'LUNES' ? 'active' : ''}" data-day-pick="LUNES" data-index="${index}">LUN</button>
          <button type="button" class="chip-item ${dayItem.day.toUpperCase() === 'MARTES' ? 'active' : ''}" data-day-pick="MARTES" data-index="${index}">MAR</button>
          <button type="button" class="chip-item ${dayItem.day.toUpperCase() === 'MIÉRCOLES' ? 'active' : ''}" data-day-pick="MIÉRCOLES" data-index="${index}">MIÉ</button>
          <button type="button" class="chip-item ${dayItem.day.toUpperCase() === 'JUEVES' ? 'active' : ''}" data-day-pick="JUEVES" data-index="${index}">JUE</button>
          <button type="button" class="chip-item ${dayItem.day.toUpperCase() === 'VIERNES' ? 'active' : ''}" data-day-pick="VIERNES" data-index="${index}">VIE</button>
          <button type="button" class="chip-item ${dayItem.day.toUpperCase() === 'SÁBADO' ? 'active' : ''}" data-day-pick="SÁBADO" data-index="${index}">SÁB</button>
        </div>
      </div>
    `;
    dom.paroDaysList.appendChild(card);
  });

  // Show/Hide multi-day visual format toggle
  if (state.paro.days.length > 1) {
    dom.multiDayStyleWrap.classList.remove('hidden');
    dom.btnFormatCombined.classList.toggle('active', state.paro.format === 'combined');
    dom.btnFormatStacked.classList.toggle('active', state.paro.format === 'stacked');
  } else {
    dom.multiDayStyleWrap.classList.add('hidden');
  }

  // Attach dynamic event listeners to newly generated day inputs
  attachDayInputListeners();
}

function attachDayInputListeners() {
  // Day text change
  dom.paroDaysList.querySelectorAll('.input-day').forEach(inp => {
    inp.addEventListener('input', (e) => {
      const idx = parseInt(e.target.dataset.index, 10);
      state.paro.days[idx].day = e.target.value.toUpperCase();
      // Update chip highlights for this card
      const card = e.target.closest('.paro-day-card');
      card.querySelectorAll('.chip-item').forEach(ch => {
        ch.classList.toggle('active', ch.dataset.dayPick === state.paro.days[idx].day);
      });
      saveAndRender();
    });
  });

  // Date text change
  dom.paroDaysList.querySelectorAll('.input-date').forEach(inp => {
    inp.addEventListener('input', (e) => {
      const idx = parseInt(e.target.dataset.index, 10);
      state.paro.days[idx].date = e.target.value.trim();
      saveAndRender();
    });
  });

  // Quick day pick chips
  dom.paroDaysList.querySelectorAll('.chip-item').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(btn.dataset.index, 10);
      const chosenDay = btn.dataset.dayPick;
      state.paro.days[idx].day = chosenDay;
      const card = btn.closest('.paro-day-card');
      card.querySelector('.input-day').value = chosenDay;
      card.querySelectorAll('.chip-item').forEach(ch => {
        ch.classList.toggle('active', ch.dataset.dayPick === chosenDay);
      });
      saveAndRender();
    });
  });

  // Remove day button
  dom.paroDaysList.querySelectorAll('.btn-remove-day').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(btn.dataset.remove, 10);
      if (state.paro.days.length > 1) {
        state.paro.days.splice(idx, 1);
        renderDaysInputs();
        saveAndRender();
        showToast('Día eliminado');
      }
    });
  });
}

function addDay() {
  const lastItem = state.paro.days[state.paro.days.length - 1] || { day: 'MIÉRCOLES', date: '15/10' };
  
  // Suggest next day of week
  let nextDay = 'JUEVES';
  const lastDayIndex = DAYS_SEQUENCE.indexOf(lastItem.day.toUpperCase());
  if (lastDayIndex >= 0 && lastDayIndex < DAYS_SEQUENCE.length - 1) {
    nextDay = DAYS_SEQUENCE[lastDayIndex + 1];
  }

  // Suggest next date if numeric
  let nextDate = '';
  if (lastItem.date.includes('/')) {
    const parts = lastItem.date.split('/');
    const dNum = parseInt(parts[0], 10);
    if (!isNaN(dNum)) {
      nextDate = `${dNum + 1}/${parts[1]}`;
    }
  }

  state.paro.days.push({
    day: nextDay,
    date: nextDate || lastItem.date
  });

  renderDaysInputs();
  saveAndRender();
  showToast('¡Día añadido a la historia! 📅');
}

// ============================================================================
// Event Listeners
// ============================================================================
function setupEventListeners() {
  // Mode Switch Tabs
  dom.tabInfo.addEventListener('click', () => setMode('info'));
  dom.tabParo.addEventListener('click', () => setMode('paro'));

  // Mobile View Switcher (Edit vs Preview)
  dom.btnViewEdit.addEventListener('click', () => setMobileView('edit'));
  dom.btnViewPreview.addEventListener('click', () => setMobileView('preview'));

  // Reset Button
  dom.btnReset.addEventListener('click', resetCurrentForm);

  // Reference comparison toggle
  dom.btnToggleRef.addEventListener('click', toggleReferenceOverlay);

  // Quick Preset Chips click delegation
  document.querySelectorAll('.preset-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      const presetKey = btn.dataset.preset;
      applyPreset(presetKey);
    });
  });

  // ================= INFO LISTENERS =================
  dom.infoTitle.addEventListener('input', (e) => {
    state.info.title = e.target.value.toUpperCase();
    e.target.value = state.info.title;
    saveAndRender();
  });

  dom.infoHasBadge.addEventListener('change', (e) => {
    state.info.hasBadge = e.target.checked;
    dom.infoBadgeFields.classList.toggle('hidden', !state.info.hasBadge);
    saveAndRender();
  });

  dom.infoBadgeVal.addEventListener('input', (e) => {
    state.info.badgeVal = e.target.value.toUpperCase();
    saveAndRender();
  });

  dom.infoBadgeSubtitle.addEventListener('input', (e) => {
    state.info.badgeSub = e.target.value.toUpperCase();
    saveAndRender();
  });

  dom.infoBody.addEventListener('input', (e) => {
    state.info.body = e.target.value;
    saveAndRender();
  });

  dom.btnAlignLeft.addEventListener('click', () => {
    state.info.align = 'left';
    dom.btnAlignLeft.classList.add('active');
    dom.btnAlignCenter.classList.remove('active');
    saveAndRender();
  });

  dom.btnAlignCenter.addEventListener('click', () => {
    state.info.align = 'center';
    dom.btnAlignCenter.classList.add('active');
    dom.btnAlignLeft.classList.remove('active');
    saveAndRender();
  });

  dom.infoYOffset.addEventListener('input', (e) => {
    state.info.yOffset = parseInt(e.target.value, 10);
    dom.infoYVal.textContent = `${state.info.yOffset}px`;
    saveAndRender();
  });

  dom.infoScale.addEventListener('input', (e) => {
    state.info.scale = parseInt(e.target.value, 10) / 100;
    dom.infoScaleVal.textContent = `${e.target.value}%`;
    saveAndRender();
  });

  dom.btnResetInfoAdj.addEventListener('click', () => {
    state.info.yOffset = 0;
    state.info.scale = 1.0;
    dom.infoYOffset.value = 0;
    dom.infoYVal.textContent = '0px';
    dom.infoScale.value = 100;
    dom.infoScaleVal.textContent = '100%';
    saveAndRender();
  });

  // ================= PARO LISTENERS =================
  // Add Day Button
  dom.btnAddDay.addEventListener('click', addDay);

  // Multi-day format buttons
  dom.btnFormatCombined.addEventListener('click', () => {
    state.paro.format = 'combined';
    dom.btnFormatCombined.classList.add('active');
    dom.btnFormatStacked.classList.remove('active');
    saveAndRender();
  });

  dom.btnFormatStacked.addEventListener('click', () => {
    state.paro.format = 'stacked';
    dom.btnFormatStacked.classList.add('active');
    dom.btnFormatCombined.classList.remove('active');
    saveAndRender();
  });

  dom.paroHasLine.addEventListener('change', (e) => {
    state.paro.hasLine = e.target.checked;
    saveAndRender();
  });

  // Gremios Selector Buttons (FAGDUT, SIDUT, APUTN)
  document.querySelectorAll('.chip-gremio').forEach(chip => {
    chip.addEventListener('click', () => {
      const gremioName = chip.dataset.gremium;
      toggleGremioSelection(gremioName);
    });
  });

  // Paro Gremium Text input (keeps chips in sync)
  dom.paroGremium.addEventListener('input', (e) => {
    state.paro.gremium = e.target.value.toUpperCase();
    syncGremioChipsHighlight();
    saveAndRender();
  });

  // Status Selector Buttons (La facultad estará cerrada, Consulta a tu docente, Actividad normal, nada)
  document.querySelectorAll('.chip-status').forEach(chip => {
    chip.addEventListener('click', () => {
      const chosenStatus = chip.dataset.status;
      setStatus(chosenStatus);
    });
  });

  dom.paroStatus.addEventListener('input', (e) => {
    state.paro.status = e.target.value;
    syncStatusChipsHighlight();
    saveAndRender();
  });

  dom.paroExtra.addEventListener('input', (e) => {
    state.paro.extra = e.target.value;
    saveAndRender();
  });

  dom.paroYOffset.addEventListener('input', (e) => {
    state.paro.yOffset = parseInt(e.target.value, 10);
    dom.paroYVal.textContent = `${state.paro.yOffset}px`;
    saveAndRender();
  });

  dom.paroScale.addEventListener('input', (e) => {
    state.paro.scale = parseInt(e.target.value, 10) / 100;
    dom.paroScaleVal.textContent = `${e.target.value}%`;
    saveAndRender();
  });

  dom.btnResetParoAdj.addEventListener('click', () => {
    state.paro.yOffset = 0;
    state.paro.scale = 1.0;
    dom.paroYOffset.value = 0;
    dom.paroYVal.textContent = '0px';
    dom.paroScale.value = 100;
    dom.paroScaleVal.textContent = '100%';
    saveAndRender();
  });

  // ================= EXPORT ACTIONS =================
  dom.btnDownload.addEventListener('click', downloadHighResStory);
  dom.btnShare.addEventListener('click', shareStory);
  dom.btnCopyCaption.addEventListener('click', copyCaptionToClipboard);
}

// ============================================================================
// Gremios & Status Helpers
// ============================================================================
function toggleGremioSelection(targetGremio) {
  const currentUpper = (state.paro.gremium || '').toUpperCase();
  const selected = BASE_GREMIOS.filter(g => currentUpper.includes(g));

  const alreadySelected = selected.includes(targetGremio);
  let newSelected = [];

  if (alreadySelected) {
    newSelected = selected.filter(g => g !== targetGremio);
  } else {
    newSelected = [...selected, targetGremio];
  }

  // Preserve standard order: FAGDUT, SIDUT, APUTN (NO DOCENTE)
  newSelected.sort((a, b) => BASE_GREMIOS.indexOf(a) - BASE_GREMIOS.indexOf(b));

  // Separate multiple gremios with " - " as requested by the user
  const resultText = newSelected.join(' - ');

  state.paro.gremium = resultText;
  dom.paroGremium.value = resultText;
  syncGremioChipsHighlight();
  saveAndRender();
}

function syncGremioChipsHighlight() {
  const currentUpper = (state.paro.gremium || '').toUpperCase();
  document.querySelectorAll('.chip-gremio').forEach(chip => {
    const g = chip.dataset.gremium;
    chip.classList.toggle('active', currentUpper.includes(g));
  });
}

function setStatus(statusText) {
  state.paro.status = statusText;
  dom.paroStatus.value = statusText;
  syncStatusChipsHighlight();
  saveAndRender();
}

function syncStatusChipsHighlight() {
  const current = (state.paro.status || '').trim().toLowerCase();
  document.querySelectorAll('.chip-status').forEach(chip => {
    const chipVal = (chip.dataset.status || '').trim().toLowerCase();
    const isMatch = (chipVal === '' && current === '') || (chipVal !== '' && current === chipVal);
    chip.classList.toggle('active', isMatch);
  });
}

// ============================================================================
// State Sync & Storage
// ============================================================================
function setMode(mode) {
  state.currentMode = mode;
  
  if (mode === 'info') {
    dom.tabInfo.classList.add('active');
    dom.tabInfo.setAttribute('aria-selected', 'true');
    dom.tabParo.classList.remove('active');
    dom.tabParo.setAttribute('aria-selected', 'false');

    dom.formInfo.classList.add('active');
    dom.formParo.classList.remove('active');
  } else {
    dom.tabParo.classList.add('active');
    dom.tabParo.setAttribute('aria-selected', 'true');
    dom.tabInfo.classList.remove('active');
    dom.tabInfo.setAttribute('aria-selected', 'false');

    dom.formParo.classList.add('active');
    dom.formInfo.classList.remove('active');
  }

  if (state.isComparing) {
    updateReferenceOverlayImage();
  }

  saveAndRender();
}

function setMobileView(view) {
  state.currentMobileView = view;
  if (view === 'edit') {
    dom.btnViewEdit.classList.add('active');
    dom.btnViewPreview.classList.remove('active');
    dom.editorSection.classList.add('active');
    dom.previewSection.classList.remove('active');
  } else {
    dom.btnViewPreview.classList.add('active');
    dom.btnViewEdit.classList.remove('active');
    dom.previewSection.classList.add('active');
    dom.editorSection.classList.remove('active');
    dom.previewSection.scrollIntoView({ behavior: 'smooth' });
  }
}

function syncFormToState() {
  // Info
  dom.infoTitle.value = state.info.title;
  dom.infoHasBadge.checked = state.info.hasBadge;
  dom.infoBadgeFields.classList.toggle('hidden', !state.info.hasBadge);
  dom.infoBadgeVal.value = state.info.badgeVal;
  dom.infoBadgeSubtitle.value = state.info.badgeSub;
  dom.infoBody.value = state.info.body;
  if (state.info.align === 'center') {
    dom.btnAlignCenter.classList.add('active');
    dom.btnAlignLeft.classList.remove('active');
  } else {
    dom.btnAlignLeft.classList.add('active');
    dom.btnAlignCenter.classList.remove('active');
  }
  dom.infoYOffset.value = state.info.yOffset;
  dom.infoYVal.textContent = `${state.info.yOffset}px`;
  dom.infoScale.value = Math.round(state.info.scale * 100);
  dom.infoScaleVal.textContent = `${Math.round(state.info.scale * 100)}%`;

  // Paro
  dom.paroHasLine.checked = state.paro.hasLine;
  dom.paroGremium.value = state.paro.gremium;
  syncGremioChipsHighlight();
  dom.paroStatus.value = state.paro.status;
  syncStatusChipsHighlight();
  dom.paroExtra.value = state.paro.extra;
  dom.paroYOffset.value = state.paro.yOffset;
  dom.paroYVal.textContent = `${state.paro.yOffset}px`;
  dom.paroScale.value = Math.round(state.paro.scale * 100);
  dom.paroScaleVal.textContent = `${Math.round(state.paro.scale * 100)}%`;
}

function applyPreset(presetKey) {
  const preset = PRESETS[presetKey];
  if (!preset) return;

  if (presetKey.startsWith('info-')) {
    setMode('info');
    Object.assign(state.info, preset);
  } else if (presetKey.startsWith('paro-')) {
    setMode('paro');
    state.paro.days = JSON.parse(JSON.stringify(preset.days));
    state.paro.format = preset.format || 'combined';
    state.paro.hasLine = preset.hasLine;
    state.paro.gremium = preset.gremium;
    state.paro.status = preset.status;
    state.paro.extra = preset.extra;
    state.paro.yOffset = preset.yOffset;
    state.paro.scale = preset.scale;
    renderDaysInputs();
  }

  syncFormToState();
  saveAndRender();
  showToast('Plantilla aplicada con éxito ✨');
}

function resetCurrentForm() {
  if (state.currentMode === 'info') {
    state.info.title = '';
    state.info.hasBadge = false;
    state.info.badgeVal = '';
    state.info.badgeSub = '';
    state.info.body = '';
    state.info.yOffset = 0;
    state.info.scale = 1.0;
  } else {
    state.paro.days = [{ day: 'MIÉRCOLES', date: '15/10' }];
    state.paro.format = 'combined';
    state.paro.hasLine = true;
    state.paro.gremium = '';
    state.paro.status = '';
    state.paro.extra = '';
    state.paro.yOffset = 0;
    state.paro.scale = 1.0;
    renderDaysInputs();
  }
  syncFormToState();
  saveAndRender();
  showToast('Formulario limpiado');
}

function saveAndRender() {
  try {
    localStorage.setItem('upl_stories_state', JSON.stringify(state));
  } catch (e) {
    // LocalStorage quota or privacy mode
  }
  renderCanvas();
  updateCaption();
}

function loadSavedState() {
  try {
    const saved = localStorage.getItem('upl_stories_state');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.info) Object.assign(state.info, parsed.info);
      if (parsed.paro) {
        // Backward compatibility for single day to multi-day array
        if (parsed.paro.day && (!parsed.paro.days || parsed.paro.days.length === 0)) {
          parsed.paro.days = [{ day: parsed.paro.day, date: parsed.paro.date || '' }];
        }
        Object.assign(state.paro, parsed.paro);
      }
      if (parsed.currentMode) state.currentMode = parsed.currentMode;
    }
  } catch (e) {
    // Ignore corrupt storage
  }

  // Ensure at least 1 day in array
  if (!state.paro.days || !Array.isArray(state.paro.days) || state.paro.days.length === 0) {
    state.paro.days = [{ day: 'MIÉRCOLES', date: '15/10' }];
  }
}

// ============================================================================
// Canvas Rendering Engine (Pixel Perfect 1080 x 1920)
// ============================================================================
let renderAnimationId = null;

function renderCanvas() {
  if (renderAnimationId) cancelAnimationFrame(renderAnimationId);
  renderAnimationId = requestAnimationFrame(() => {
    drawCanvasContent();
  });
}

function drawCanvasContent() {
  const width = dom.canvas.width;   // 1080
  const height = dom.canvas.height; // 1920

  // 1. Draw Background Template
  const templateImg = state.currentMode === 'info' ? assets.infoTemplate : assets.paroTemplate;
  const isLoaded = state.currentMode === 'info' ? assets.loaded.infoTemplate : assets.loaded.paroTemplate;

  if (isLoaded && templateImg.complete && templateImg.naturalWidth > 0) {
    ctx.drawImage(templateImg, 0, 0, width, height);
  } else {
    // Fallback gradient if image not ready yet
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, '#2d1447');
    grad.addColorStop(0.5, '#1e0c30');
    grad.addColorStop(1, '#0e0517');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
  }

  // 2. Render Text Content based on mode
  if (state.currentMode === 'info') {
    renderInfoContent(ctx, width, height);
  } else {
    renderParoContent(ctx, width, height);
  }
}

/**
 * Render INFO / AVISO layout
 */
function renderInfoContent(context, width, height) {
  const { title, hasBadge, badgeVal, badgeSub, body, align, yOffset, scale } = state.info;

  let currentY = 530 + yOffset;

  // --- Title Rendering ---
  if (title && title.trim()) {
    const titleLines = title.split('\n');
    const titleFontSize = Math.round(68 * scale);
    const titleLineHeight = Math.round(titleFontSize * 1.22);

    context.save();
    context.fillStyle = '#ffffff';
    context.textBaseline = 'alphabetic';
    context.font = `800 ${titleFontSize}px "Montserrat", sans-serif`;

    for (let i = 0; i < titleLines.length; i++) {
      const line = titleLines[i].trim();
      if (!line) continue;
      drawTextWithSpacing(context, line, 540, currentY, 1.2, 'center');
      currentY += titleLineHeight;
    }
    context.restore();

    currentY += Math.round(45 * scale); // spacing after title
  }

  // --- Badge + Subtitle Block ---
  if (hasBadge && (badgeVal.trim() || badgeSub.trim())) {
    const badgeHeight = Math.round(86 * scale);
    const badgeY = currentY;

    // Measure badge text to auto-fit pill width
    context.save();
    const badgeFontSize = Math.round(46 * scale);
    context.font = `800 ${badgeFontSize}px "Montserrat", sans-serif`;
    const measuredBadgeTextWidth = context.measureText(badgeVal.trim()).width;
    
    const badgeWidth = Math.max(Math.round(210 * scale), measuredBadgeTextWidth + Math.round(48 * scale));
    const badgeX = Math.round(135 * scale);
    const badgeRadius = Math.round(20 * scale);
    const borderWidth = Math.round(5.5 * scale);

    // Draw rounded badge outline
    context.strokeStyle = '#ffffff';
    context.lineWidth = borderWidth;
    roundRect(context, badgeX, badgeY, badgeWidth, badgeHeight, badgeRadius);
    context.stroke();

    // Draw text inside badge
    context.fillStyle = '#ffffff';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(badgeVal.trim(), badgeX + badgeWidth / 2, badgeY + badgeHeight / 2 + (2 * scale));
    context.restore();

    // Draw Subtitle beside badge
    if (badgeSub && badgeSub.trim()) {
      context.save();
      const subFontSize = Math.round(36 * scale);
      const subLineHeight = Math.round(subFontSize * 1.25);
      context.font = `700 ${subFontSize}px "Montserrat", sans-serif`;
      context.fillStyle = '#ffffff';
      context.textBaseline = 'top';

      const subLines = badgeSub.split('\n');
      const totalSubHeight = subLines.length * subLineHeight;
      let subY = badgeY + (badgeHeight - totalSubHeight) / 2 + (2 * scale);
      const subX = badgeX + badgeWidth + Math.round(36 * scale);

      for (const line of subLines) {
        drawTextWithSpacing(context, line.trim(), subX, subY, 0.5, 'left');
        subY += subLineHeight;
      }
      context.restore();
    }

    currentY += badgeHeight + Math.round(55 * scale);
  }

  // --- Body Text & Paragraphs ---
  if (body && body.trim()) {
    context.save();
    const bodyMarginX = Math.round(158 * scale);
    const bodyMaxWidth = width - (bodyMarginX * 2);
    const bodyCenterX = 540;

    const paragraphs = body.split(/\n\s*\n/);

    for (let p = 0; p < paragraphs.length; p++) {
      const paragraph = paragraphs[p].trim();
      if (!paragraph) continue;

      const colonIndex = paragraph.indexOf(':');
      let headerText = '';
      let remainingText = paragraph;

      if (colonIndex > 0 && colonIndex < 35 && !paragraph.slice(0, colonIndex).includes('\n')) {
        headerText = paragraph.slice(0, colonIndex + 1).trim();
        remainingText = paragraph.slice(colonIndex + 1).trim();
      }

      // Draw Section Header (Bold)
      if (headerText) {
        const headerFontSize = Math.round(38 * scale);
        context.font = `800 ${headerFontSize}px "Montserrat", sans-serif`;
        context.fillStyle = '#ffffff';
        context.textBaseline = 'alphabetic';

        const hX = align === 'center' ? bodyCenterX : bodyMarginX;
        drawTextWithSpacing(context, headerText, hX, currentY + headerFontSize, 0.8, align);
        currentY += Math.round(headerFontSize * 1.4);
      }

      // Draw Paragraph Body
      if (remainingText) {
        const bodyFontSize = Math.round(34 * scale);
        const bodyLineHeight = Math.round(bodyFontSize * 1.38);
        context.font = `500 ${bodyFontSize}px "Montserrat", sans-serif`;
        context.fillStyle = '#ffffff';
        context.textAlign = align === 'center' ? 'center' : 'left';
        context.textBaseline = 'alphabetic';

        const lines = wrapTextLines(context, remainingText, bodyMaxWidth);
        for (const line of lines) {
          const lineX = align === 'center' ? bodyCenterX : bodyMarginX;
          context.fillText(line, lineX, currentY + bodyFontSize);
          currentY += bodyLineHeight;
        }
      }

      currentY += Math.round(35 * scale);
    }

    context.restore();
  }
}

/**
 * Render PARO layout (with 1 or multiple days support, specific gremios and status)
 */
function renderParoContent(context, width, height) {
  const { days, format, hasLine, gremium, status, extra, yOffset, scale } = state.paro;

  let currentY = 570 + yOffset;

  // Filter valid days
  const validDays = (days && days.length > 0) 
    ? days.filter(d => (d.day && d.day.trim()) || (d.date && d.date.trim())) 
    : [];

  if (validDays.length === 0) {
    // Empty state placeholder
    currentY += 100;
  } else if (validDays.length === 1 || format === 'combined') {
    // ==========================================
    // 1 DAY or COMBINED MULTI-DAY FORMAT
    // ==========================================
    let dayText = '';
    let dateText = '';

    if (validDays.length === 1) {
      dayText = validDays[0].day.trim().toUpperCase();
      dateText = validDays[0].date.trim();
    } else if (validDays.length === 2) {
      dayText = `${validDays[0].day.trim()} Y ${validDays[1].day.trim()}`.toUpperCase();
      const d1 = validDays[0].date.trim();
      const d2 = validDays[1].date.trim();
      if (d1.includes('/') && d2.includes('/') && d1.split('/')[1] === d2.split('/')[1]) {
        dateText = `${d1.split('/')[0]} Y ${d2}`;
      } else {
        dateText = `${d1} Y ${d2}`;
      }
    } else {
      // 3 or more days
      const dayNames = validDays.map(d => d.day.trim().toUpperCase());
      const lastDay = dayNames.pop();
      dayText = `${dayNames.join(', ')} Y ${lastDay}`;
      dateText = validDays.map(d => d.date.trim()).join(' • ');
    }

    // 1. Day of Week
    if (dayText) {
      context.save();
      const baseDaySize = validDays.length > 2 ? 46 : (validDays.length === 2 ? 52 : 62);
      const dayFontSize = Math.round(baseDaySize * scale);
      context.font = `800 ${dayFontSize}px "Montserrat", sans-serif`;
      context.fillStyle = '#ffffff';
      context.textBaseline = 'alphabetic';
      // Native letter-spacing of 1.5px (clean, perfectly spaced)
      drawTextWithSpacing(context, dayText, 540, currentY + dayFontSize, 1.5, 'center');
      context.restore();

      currentY += Math.round(dayFontSize * 1.25);
    }

    // 2. Date (Exact proportion and weight matching user reference)
    if (dateText) {
      context.save();
      // For 2 days: 108px with weight 800 matches reference '14 Y 16/10' without being overly thick/grueso
      const baseDateSize = validDays.length > 2 ? 88 : (validDays.length === 2 ? 108 : 152);
      const dateFontSize = Math.round(baseDateSize * scale);
      context.font = `800 ${dateFontSize}px "Montserrat", sans-serif`;
      context.fillStyle = '#ffffff';
      context.textBaseline = 'alphabetic';
      // 0 letter spacing for native crisp numbers & slashes
      drawTextWithSpacing(context, dateText, 540, currentY + dateFontSize, 0, 'center');
      context.restore();

      currentY += Math.round(dateFontSize * 1.08);
    }
  } else {
    // ==========================================
    // STACKED MULTI-DAY FORMAT (Día por Día)
    // ==========================================
    context.save();
    const itemFontSize = Math.round(58 * scale);
    const itemLineHeight = Math.round(itemFontSize * 1.38);
    context.font = `800 ${itemFontSize}px "Montserrat", sans-serif`;
    context.fillStyle = '#ffffff';
    context.textBaseline = 'alphabetic';

    for (const d of validDays) {
      const line = `${d.day.trim().toUpperCase()} ${d.date.trim()}`.trim();
      drawTextWithSpacing(context, line, 540, currentY + itemFontSize, 1.0, 'center');
      currentY += itemLineHeight;
    }
    context.restore();

    currentY += Math.round(20 * scale);
  }

  // 3. Separator Line
  if (hasLine) {
    currentY += Math.round(20 * scale);
    const lineWidth = Math.round(632 * scale);
    const lineThickness = Math.round(5.5 * scale);
    const lineX = (width - lineWidth) / 2;

    context.save();
    context.fillStyle = '#ffffff';
    roundRect(context, lineX, currentY, lineWidth, lineThickness, lineThickness / 2);
    context.fill();
    context.restore();

    currentY += lineThickness + Math.round(55 * scale);
  } else {
    currentY += Math.round(50 * scale);
  }

  // 4. Gremium / Convocante
  if (gremium && gremium.trim()) {
    context.save();
    const gremiumFontSize = Math.round(60 * scale);
    context.font = `800 ${gremiumFontSize}px "Montserrat", sans-serif`;
    context.fillStyle = '#ffffff';
    context.textBaseline = 'alphabetic';

    const gremiumLines = wrapTextLines(context, gremium.trim().toUpperCase(), 860);
    const gLineHeight = Math.round(gremiumFontSize * 1.22);
    for (const gLine of gremiumLines) {
      drawTextWithSpacing(context, gLine, 540, currentY + gremiumFontSize, 0.8, 'center');
      currentY += gLineHeight;
    }
    context.restore();

    currentY += Math.round(135 * scale);
  }

  // 5. Status / Consequence (Only rendered if NOT empty / "nada")
  if (status && status.trim()) {
    context.save();
    const statusFontSize = Math.round(46 * scale);
    const statusLineHeight = Math.round(statusFontSize * 1.35);
    context.font = `500 ${statusFontSize}px "Montserrat", sans-serif`;
    context.fillStyle = '#ffffff';
    context.textAlign = 'center';
    context.textBaseline = 'alphabetic';

    const statusLines = wrapTextLines(context, status.trim(), 840);
    for (const sLine of statusLines) {
      context.fillText(sLine, 540, currentY + statusFontSize);
      currentY += statusLineHeight;
    }
    context.restore();
  }

  // 6. Optional Extra Note
  if (extra && extra.trim()) {
    currentY += Math.round(35 * scale);
    context.save();
    const extraFontSize = Math.round(36 * scale);
    const extraLineHeight = Math.round(extraFontSize * 1.3);
    context.font = `500 ${extraFontSize}px "Montserrat", sans-serif`;
    context.fillStyle = 'rgba(255, 255, 255, 0.85)';
    context.textAlign = 'center';
    context.textBaseline = 'alphabetic';

    const extraLines = wrapTextLines(context, extra.trim(), 840);
    for (const eLine of extraLines) {
      context.fillText(eLine, 540, currentY + extraFontSize);
      currentY += extraLineHeight;
    }
    context.restore();
  }
}

// ============================================================================
// Helper Canvas Functions (Fixed typography & spacing engine)
// ============================================================================

/**
 * Draw text with native typography, proper kerning, accents and parentheses
 */
function drawTextWithSpacing(context, text, x, y, letterSpacing = 0, alignment = 'center') {
  if (!text) return;

  context.save();
  context.textAlign = alignment;

  // Use native letterSpacing supported by modern Canvas 2D
  if (letterSpacing && 'letterSpacing' in context) {
    context.letterSpacing = `${letterSpacing}px`;
    context.fillText(text, x, y);
    context.restore();
    return;
  }

  if (!letterSpacing || letterSpacing === 0) {
    context.fillText(text, x, y);
    context.restore();
    return;
  }

  // Precise fallback for older engines: MUST use textAlign = 'left' when positioning characters sequentially
  context.textAlign = 'left';
  const chars = Array.from(text);
  const widths = chars.map(c => context.measureText(c).width);
  const totalWidth = widths.reduce((sum, w) => sum + w, 0) + (chars.length - 1) * letterSpacing;

  let curX = x;
  if (alignment === 'center') {
    curX = x - totalWidth / 2;
  } else if (alignment === 'right') {
    curX = x - totalWidth;
  }

  for (let i = 0; i < chars.length; i++) {
    context.fillText(chars[i], curX, y);
    curX += widths[i] + letterSpacing;
  }
  context.restore();
}

/**
 * Multi-line word wrapper that honors explicit \n and line boundaries
 */
function wrapTextLines(context, text, maxWidth) {
  const paragraphs = text.split('\n');
  const allLines = [];

  for (const para of paragraphs) {
    if (!para.trim()) {
      continue;
    }
    const words = para.split(/\s+/);
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const testWidth = context.measureText(testLine).width;

      if (testWidth > maxWidth && currentLine) {
        allLines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      allLines.push(currentLine);
    }
  }

  return allLines;
}

/**
 * Path for rounded rectangle
 */
function roundRect(context, x, y, width, height, radius) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.lineTo(x + width - radius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + radius);
  context.lineTo(x + width, y + height - radius);
  context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  context.lineTo(x + radius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - radius);
  context.lineTo(x, y + radius);
  context.quadraticCurveTo(x, y, x + radius, y);
  context.closePath();
}

// ============================================================================
// Caption Generator
// ============================================================================
function updateCaption() {
  let caption = '';

  if (state.currentMode === 'info') {
    const title = state.info.title.replace(/\n/g, ' ').trim() || 'COMUNICADO IMPORTANTE';
    caption = `🔔 IMPORTANTE | ${title}\n\n`;
    if (state.info.hasBadge && (state.info.badgeVal || state.info.badgeSub)) {
      caption += `🗓️ ${state.info.badgeVal.trim()} - ${state.info.badgeSub.replace(/\n/g, ' ').trim()}\n\n`;
    }
    if (state.info.body) {
      caption += `${state.info.body.trim()}\n\n`;
    }
  } else {
    const validDays = state.paro.days.filter(d => d.day.trim() || d.date.trim());
    let daysString = 'PARO ANUNCIADO';
    if (validDays.length === 1) {
      daysString = `${validDays[0].day} ${validDays[0].date}`.trim();
    } else if (validDays.length > 1) {
      daysString = validDays.map(d => `${d.day} ${d.date}`.trim()).join(' y ');
    }

    caption = `🛑 PARO ANUNCIADO | ${daysString}\n\n`;
    if (state.paro.gremium) {
      caption += `⚠️ Gremio: ${state.paro.gremium.trim()}\n`;
    }
    if (state.paro.status && state.paro.status.trim()) {
      caption += `📍 Estado: ${state.paro.status.trim()}\n`;
    }
    if (state.paro.extra && state.paro.extra.trim()) {
      caption += `ℹ️ ${state.paro.extra.trim()}\n`;
    }
    caption += '\n';
  }

  caption += `🏛️ Universitarios por la Libertad - UTN FRRO\n#UTN #UTNFRRO #Ingenieria #Rosario #UniversitariosPorLaLibertad`;
  dom.captionPreviewText.textContent = caption;
}

function copyCaptionToClipboard() {
  const text = dom.captionPreviewText.textContent;
  if (!text) return;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('¡Epígrafe copiado al portapapeles! 📋');
    }).catch(() => {
      fallbackCopy(text);
    });
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
  showToast('¡Texto copiado! 📋');
}

// ============================================================================
// Export & Share (Instagram Stories)
// ============================================================================

/**
 * Download High-Resolution 1080x1920 PNG file
 */
function downloadHighResStory() {
  const firstDay = state.paro.days[0] || { date: 'paro' };
  const dateStr = firstDay.date ? firstDay.date.replace('/', '-') : Date.now().toString().slice(-4);
  const filename = state.currentMode === 'info'
    ? `story-info-upl-${Date.now().toString().slice(-4)}.png`
    : `story-paro-upl-${dateStr}.png`;

  dom.canvas.toBlob((blob) => {
    if (!blob) {
      showToast('Error al generar la imagen', true);
      return;
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('¡Historia HD descargada! Lista para subir a Instagram 🚀');
  }, 'image/png');
}

/**
 * Share Story using native Web Share API (Mobile phones / Instagram)
 */
async function shareStory() {
  const filename = state.currentMode === 'info' ? 'story-info-upl.png' : 'story-paro-upl.png';
  const caption = dom.captionPreviewText.textContent;

  dom.canvas.toBlob(async (blob) => {
    if (!blob) return;

    const file = new File([blob], filename, { type: 'image/png' });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: 'Historia UPL UTN FRRO',
          text: caption
        });
        showToast('¡Compartido con éxito! 🎉');
      } catch (err) {
        if (err.name !== 'AbortError') {
          downloadHighResStory();
        }
      }
    } else {
      downloadHighResStory();
      copyCaptionToClipboard();
      showToast('Descargando imagen y copiando texto para Instagram 📲');
    }
  }, 'image/png');
}

// ============================================================================
// Reference Comparison Tool
// ============================================================================
function toggleReferenceOverlay() {
  state.isComparing = !state.isComparing;
  dom.btnToggleRef.classList.toggle('active', state.isComparing);

  if (state.isComparing) {
    updateReferenceOverlayImage();
    dom.refOverlay.classList.remove('hidden');
    showToast('Modo comparación activo (superposición)');
  } else {
    dom.refOverlay.classList.add('hidden');
  }
}

function updateReferenceOverlayImage() {
  dom.refOverlay.src = state.currentMode === 'info' ? './info-output-ref.png' : './paro-output-ref.png';
}

// ============================================================================
// Toast Notification
// ============================================================================
function showToast(message, isError = false) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  if (isError) toast.style.borderColor = '#ef4444';
  toast.innerHTML = `<span>${message}</span>`;

  dom.toastContainer.appendChild(toast);
  setTimeout(() => {
    if (toast.parentNode) toast.parentNode.removeChild(toast);
  }, 3000);
}

// Start application
init();
