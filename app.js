/**
 * UPL Stories - Application Logic & Canvas Engine
 * Universitarios por la Libertad - UTN FRRO
 */

// ============================================================================
// State Management
// ============================================================================
const state = {
  currentMode: 'info', // 'info' | 'paro' | 'mesa'
  currentMobileView: 'edit', // 'edit' | 'preview'
  isComparing: false,
  fontLoaded: false,

  info: {
    template: 'importante', // 'importante' | 'recordatorio'
    title: 'MESAS ESPECIALES\nDE OCTUBRE',
    titleY: 0,
    titleScale: 1.0,
    hasBadge: true,
    badges: [
      {
        id: 'info-b1',
        val: '5 AL 9',
        sub: 'INSCRIPCIÓN AL PEDIDO\nDE MESA ESPECIAL',
        yOffset: 0,
        scale: 1.0
      }
    ],
    body: 'REQUISITOS:\nTener cursada y regularizada toda la carrera, excepto Proyecto Final.\n\nUna vez confirmadas las mesas, habrá una fecha de enganche, donde podrán anotarse quienes no cumplían el requisito.',
    bodyY: 0,
    bodyScale: 1.0,
    align: 'left', // 'left' | 'center'
    yOffset: 0,
    scale: 1.0,
  },

  mesa: {
    template: 'mesa',
    title: 'MESAS ESPECIALES\nDE OCTUBRE',
    titleY: 0,
    titleScale: 1.0,
    hasBadge: true,
    badges: [
      {
        id: 'mesa-b1',
        val: '5 AL 9',
        sub: 'INSCRIPCIÓN AL PEDIDO\nDE MESA ESPECIAL',
        yOffset: 0,
        scale: 1.0
      }
    ],
    body: 'REQUISITOS:\nTener cursada y regularizada toda la carrera, excepto Proyecto Final.\n\nUna vez confirmadas las mesas, habrá una fecha de enganche, donde podrán anotarse quienes no cumplían el requisito.',
    bodyY: 0,
    bodyScale: 1.0,
    align: 'left',
    yOffset: 0,
    scale: 1.0,
  },

  paro: {
    days: [
      { day: 'MIÉRCOLES', date: '15/10' }
    ],
    format: 'combined', // 'combined' | 'stacked'
    hasLine: true,
    gremium: 'FAGDUT',
    status: 'La facultad estará cerrada.',
    extra: '',
    yOffset: 0,
    scale: 1.0,
  }
};

// ============================================================================
// Presets Data
// ============================================================================
const PRESETS = {
  // INFO Presets
  'info-mesas': {
    template: 'importante',
    title: 'MESAS ESPECIALES\nDE OCTUBRE',
    titleY: 0,
    titleScale: 1.0,
    hasBadge: true,
    badges: [
      { id: 'b-1', val: '5 AL 9', sub: 'INSCRIPCIÓN AL PEDIDO\nDE MESA ESPECIAL', yOffset: 0, scale: 1.0 }
    ],
    body: 'REQUISITOS:\nTener cursada y regularizada toda la carrera, excepto Proyecto Final.\n\nUna vez confirmadas las mesas, habrá una fecha de enganche, donde podrán anotarse quienes no cumplían el requisito.',
    bodyY: 0,
    bodyScale: 1.0,
    align: 'left',
    yOffset: 0,
    scale: 1.0
  },
  'info-inscripcion': {
    template: 'importante',
    title: 'INSCRIPCIÓN\nA CURSADAS',
    titleY: 0,
    titleScale: 1.0,
    hasBadge: true,
    badges: [
      { id: 'b-1', val: 'SYSACAD', sub: 'APERTURA DE TURNOS\nDE MATRICULACIÓN', yOffset: 0, scale: 1.0 }
    ],
    body: 'HORARIOS DE INSCRIPCIÓN:\nRevisá tu turno de prioridad académica ingresando a la plataforma institucional.\n\nPor inconvenientes con correlativas comunicarse con secretaría estudiantil.',
    bodyY: 0,
    bodyScale: 1.0,
    align: 'left',
    yOffset: 0,
    scale: 1.0
  },
  'info-reprogramacion': {
    template: 'recordatorio',
    title: 'REPROGRAMACIÓN\nDE EXÁMENES',
    titleY: 0,
    titleScale: 1.0,
    hasBadge: true,
    badges: [
      { id: 'b-1', val: 'ATENCIÓN', sub: 'MODIFICACIÓN DE\nFECHAS OFICIALES', yOffset: 0, scale: 1.0 }
    ],
    body: 'Las mesas afectadas por medidas de fuerza se reprograman de acuerdo al nuevo cronograma establecido por decanato.\n\nConsultá el listado por carrera y cátedra en el enlace de la bio.',
    bodyY: 0,
    bodyScale: 1.0,
    align: 'left',
    yOffset: 0,
    scale: 1.0
  },
  'info-becas': {
    template: 'importante',
    title: 'BECAS UTN\nCONVOCATORIA',
    titleY: 0,
    titleScale: 1.0,
    hasBadge: true,
    badges: [
      { id: 'b-1', val: 'POSTULATE', sub: 'AYUDA ECONÓMICA E\nINVESTIGACIÓN', yOffset: 0, scale: 1.0 }
    ],
    body: 'REQUISITOS:\nSer estudiante regular y presentar la documentación solicitada a través de secretaría de asuntos estudiantiles.\n\nFecha límite de presentación: 30 de octubre.',
    bodyY: 0,
    bodyScale: 1.0,
    align: 'left',
    yOffset: 0,
    scale: 1.0
  },

  // MESA DE EXAMEN Presets
  'mesa-especial': {
    template: 'mesa',
    title: 'MESAS ESPECIALES\nDE OCTUBRE',
    titleY: 0,
    titleScale: 1.0,
    hasBadge: true,
    badges: [
      { id: 'm-1', val: '5 AL 9', sub: 'INSCRIPCIÓN AL PEDIDO\nDE MESA ESPECIAL', yOffset: 0, scale: 1.0 }
    ],
    body: 'REQUISITOS:\nTener cursada y regularizada toda la carrera, excepto Proyecto Final.\n\nUna vez confirmadas las mesas, habrá una fecha de enganche, donde podrán anotarse quienes no cumplían el requisito.',
    bodyY: 0,
    bodyScale: 1.0,
    align: 'left',
    yOffset: 0,
    scale: 1.0
  },
  'mesa-inscripcion': {
    template: 'mesa',
    title: 'INSCRIPCIÓN A\nMESAS DE EXAMEN',
    titleY: 0,
    titleScale: 1.0,
    hasBadge: true,
    badges: [
      { id: 'm-1', val: 'SYSACAD', sub: 'REGISTRO HABILITADO\nEN EL PORTAL', yOffset: 0, scale: 1.0 }
    ],
    body: 'Recordá anotarte con al menos 48 horas hábiles de anticipación a la fecha del examen.\n\nVerificá en tu estado académico que figure el comprobante de inscripción emitido.',
    bodyY: 0,
    bodyScale: 1.0,
    align: 'left',
    yOffset: 0,
    scale: 1.0
  },
  'mesa-enganche': {
    template: 'mesa',
    title: 'FECHAS DE ENGANCHE\nMESAS DE EXAMEN',
    titleY: 0,
    titleScale: 1.0,
    hasBadge: true,
    badges: [
      { id: 'm-1', val: 'ATENCIÓN', sub: 'PERÍODO EXCEPCIONAL\nDE INSCRIPCIÓN', yOffset: 0, scale: 1.0 }
    ],
    body: 'Habilitado exclusivamente para estudiantes que regularizaron materias en el último llamado y necesitan rendir la correlativa inmediata.\n\nConsultá plazos y condiciones con secretaría estudiantil.',
    bodyY: 0,
    bodyScale: 1.0,
    align: 'left',
    yOffset: 0,
    scale: 1.0
  },
  'mesa-ordinario': {
    template: 'mesa',
    title: 'TURNO ORDINARIO\nNOV / DIC',
    titleY: 0,
    titleScale: 1.0,
    hasBadge: true,
    badges: [
      { id: 'm-1', val: 'LLAMADO 1', sub: 'DEL 25 AL 29 DE NOVIEMBRE', yOffset: 0, scale: 1.0 },
      { id: 'm-2', val: 'LLAMADO 2', sub: 'DEL 9 AL 13 DE DICIEMBRE', yOffset: 0, scale: 1.0 }
    ],
    body: 'Cronograma oficial de exámenes finales para todas las especialidades de ingeniería.\n\nHorarios y aulas disponibles en la web de la facultad.',
    bodyY: 0,
    bodyScale: 1.0,
    align: 'left',
    yOffset: 0,
    scale: 1.0
  },

  // PARO Presets
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

const DAYS_SEQUENCE = ['LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO'];

// ============================================================================
// DOM Elements
// ============================================================================
const dom = {
  // Tabs & Views
  tabInfo: document.getElementById('tab-info'),
  tabParo: document.getElementById('tab-paro'),
  tabMesa: document.getElementById('tab-mesa'),
  formInfo: document.getElementById('form-info'),
  formParo: document.getElementById('form-paro'),
  formMesa: document.getElementById('form-mesa'),
  btnViewEdit: document.getElementById('btn-view-edit'),
  btnViewPreview: document.getElementById('btn-view-preview'),
  editorSection: document.getElementById('editor-section'),
  previewSection: document.getElementById('preview-section'),

  // Header Actions
  btnQuickPresets: document.getElementById('btn-quick-presets'),
  btnReset: document.getElementById('btn-reset'),

  // Info Inputs
  infoTitle: document.getElementById('info-title'),
  infoTitleY: document.getElementById('info-title-y'),
  infoTitleYVal: document.getElementById('info-title-y-val'),
  infoTitleScale: document.getElementById('info-title-scale'),
  infoTitleScaleVal: document.getElementById('info-title-scale-val'),
  infoHasBadge: document.getElementById('info-has-badge'),
  btnAddBadgeInfo: document.getElementById('btn-add-badge-info'),
  infoBadgesContainer: document.getElementById('info-badges-container'),
  infoBody: document.getElementById('info-body'),
  infoBodyY: document.getElementById('info-body-y'),
  infoBodyYVal: document.getElementById('info-body-y-val'),
  infoBodyScale: document.getElementById('info-body-scale'),
  infoBodyScaleVal: document.getElementById('info-body-scale-val'),
  btnAlignLeft: document.getElementById('btn-align-left'),
  btnAlignCenter: document.getElementById('btn-align-center'),
  infoYOffset: document.getElementById('info-y-offset'),
  infoYVal: document.getElementById('info-y-val'),
  infoScale: document.getElementById('info-scale'),
  infoScaleVal: document.getElementById('info-scale-val'),
  btnResetInfoAdj: document.getElementById('btn-reset-info-adjustments'),

  // Mesa Inputs
  mesaTitle: document.getElementById('mesa-title'),
  mesaTitleY: document.getElementById('mesa-title-y'),
  mesaTitleYVal: document.getElementById('mesa-title-y-val'),
  mesaTitleScale: document.getElementById('mesa-title-scale'),
  mesaTitleScaleVal: document.getElementById('mesa-title-scale-val'),
  mesaHasBadge: document.getElementById('mesa-has-badge'),
  btnAddBadgeMesa: document.getElementById('btn-add-badge-mesa'),
  mesaBadgesContainer: document.getElementById('mesa-badges-container'),
  mesaBody: document.getElementById('mesa-body'),
  mesaBodyY: document.getElementById('mesa-body-y'),
  mesaBodyYVal: document.getElementById('mesa-body-y-val'),
  mesaBodyScale: document.getElementById('mesa-body-scale'),
  mesaBodyScaleVal: document.getElementById('mesa-body-scale-val'),
  btnAlignLeftMesa: document.getElementById('btn-align-left-mesa'),
  btnAlignCenterMesa: document.getElementById('btn-align-center-mesa'),
  mesaYOffset: document.getElementById('mesa-y-offset'),
  mesaYVal: document.getElementById('mesa-y-val'),
  mesaScale: document.getElementById('mesa-scale'),
  mesaScaleVal: document.getElementById('mesa-scale-val'),
  btnResetMesaAdj: document.getElementById('btn-reset-mesa-adjustments'),

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
  recordatorioTemplate: new Image(),
  mesaTemplate: new Image(),
  paroTemplate: new Image(),
  infoRef: new Image(),
  paroRef: new Image(),
  loaded: {
    infoTemplate: false,
    recordatorioTemplate: false,
    mesaTemplate: false,
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
  renderBadgesUI('info');
  renderBadgesUI('mesa');
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
    let toLoad = 4;
    const checkDone = () => {
      toLoad--;
      if (toLoad <= 0) resolve();
    };

    // 1. Info / Importante Template
    assets.infoTemplate.crossOrigin = 'anonymous';
    assets.infoTemplate.src = './info-template.png';
    assets.infoTemplate.onload = () => { assets.loaded.infoTemplate = true; checkDone(); };
    assets.infoTemplate.onerror = () => {
      assets.infoTemplate.src = './INFO%20UPL.png';
      assets.infoTemplate.onload = () => { assets.loaded.infoTemplate = true; checkDone(); };
      assets.infoTemplate.onerror = () => checkDone();
    };

    // 2. Recordatorio Template
    assets.recordatorioTemplate.crossOrigin = 'anonymous';
    assets.recordatorioTemplate.src = './recordatorio-template.png';
    assets.recordatorioTemplate.onload = () => { assets.loaded.recordatorioTemplate = true; checkDone(); };
    assets.recordatorioTemplate.onerror = () => {
      assets.recordatorioTemplate.src = './RECORDATORIO%20UPL.png';
      assets.recordatorioTemplate.onload = () => { assets.loaded.recordatorioTemplate = true; checkDone(); };
      assets.recordatorioTemplate.onerror = () => checkDone();
    };

    // 3. Mesa de Examen Template
    assets.mesaTemplate.crossOrigin = 'anonymous';
    assets.mesaTemplate.src = './mesa-template.png';
    assets.mesaTemplate.onload = () => { assets.loaded.mesaTemplate = true; checkDone(); };
    assets.mesaTemplate.onerror = () => {
      assets.mesaTemplate.src = './MESA%20DE%20EXAMEN%20UPL.png';
      assets.mesaTemplate.onload = () => { assets.loaded.mesaTemplate = true; checkDone(); };
      assets.mesaTemplate.onerror = () => checkDone();
    };

    // 4. Paro Template
    assets.paroTemplate.crossOrigin = 'anonymous';
    assets.paroTemplate.src = './paro-template.png';
    assets.paroTemplate.onload = () => { assets.loaded.paroTemplate = true; checkDone(); };
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
// Multi-Badge UI Manager (Dynamic Badges with individual Position & Scale)
// ============================================================================
function renderBadgesUI(mode) {
  const container = mode === 'info' ? dom.infoBadgesContainer : dom.mesaBadgesContainer;
  if (!container) return;

  const data = state[mode];
  container.innerHTML = '';

  if (!data.badges || data.badges.length === 0) {
    data.badges = [{ id: `${mode}-b1`, val: '', sub: '', yOffset: 0, scale: 1.0 }];
  }

  data.badges.forEach((badge, index) => {
    const card = document.createElement('div');
    card.className = 'badge-item-card';
    card.dataset.badgeId = badge.id;

    const yVal = badge.yOffset || 0;
    const scalePercent = Math.round((badge.scale || 1.0) * 100);

    card.innerHTML = `
      <div class="badge-card-top">
        <span class="badge-card-tag">Bloque ${index + 1}</span>
        ${data.badges.length > 1 ? `<button type="button" class="btn-remove-badge" data-mode="${mode}" data-index="${index}" title="Eliminar este bloque">✕</button>` : ''}
      </div>
      <div class="badge-row">
        <div class="field-item field-badge-text">
          <label class="field-label-sm">Texto Cápsula</label>
          <input type="text" class="input-text text-center font-bold input-badge-val" data-mode="${mode}" data-index="${index}" value="${badge.val || ''}" placeholder="5 AL 9">
        </div>
        <div class="field-item field-badge-sub">
          <label class="field-label-sm">Subtítulo Lateral</label>
          <textarea class="input-text font-bold input-badge-sub" data-mode="${mode}" data-index="${index}" rows="2" placeholder="INSCRIPCIÓN AL PEDIDO&#10;DE MESA ESPECIAL">${badge.sub || ''}</textarea>
        </div>
      </div>
      <div class="block-fine-adjustments">
        <div class="block-adjust-row">
          <span class="block-adjust-label">Posición Y:</span>
          <input type="range" class="range-slider range-slider-sm input-badge-y" data-mode="${mode}" data-index="${index}" min="-100" max="100" value="${yVal}" step="2">
          <span class="slider-num-sm badge-y-indicator">${yVal}px</span>
        </div>
        <div class="block-adjust-row">
          <span class="block-adjust-label">Tamaño:</span>
          <input type="range" class="range-slider range-slider-sm input-badge-scale" data-mode="${mode}" data-index="${index}" min="70" max="140" value="${scalePercent}" step="2">
          <span class="slider-num-sm badge-scale-indicator">${scalePercent}%</span>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  // Attach dynamic event listeners
  attachBadgeEventListeners(mode, container);
}

function attachBadgeEventListeners(mode, container) {
  // Capsule text input
  container.querySelectorAll('.input-badge-val').forEach(inp => {
    inp.addEventListener('input', (e) => {
      const idx = parseInt(e.target.dataset.index, 10);
      state[mode].badges[idx].val = e.target.value.toUpperCase();
      e.target.value = state[mode].badges[idx].val;
      saveAndRender();
    });
  });

  // Subtitle textarea
  container.querySelectorAll('.input-badge-sub').forEach(inp => {
    inp.addEventListener('input', (e) => {
      const idx = parseInt(e.target.dataset.index, 10);
      state[mode].badges[idx].sub = e.target.value.toUpperCase();
      saveAndRender();
    });
  });

  // Badge Position Y slider
  container.querySelectorAll('.input-badge-y').forEach(slider => {
    slider.addEventListener('input', (e) => {
      const idx = parseInt(e.target.dataset.index, 10);
      const val = parseInt(e.target.value, 10);
      state[mode].badges[idx].yOffset = val;
      const indicator = e.target.closest('.block-adjust-row').querySelector('.badge-y-indicator');
      if (indicator) indicator.textContent = `${val}px`;
      saveAndRender();
    });
  });

  // Badge Scale slider
  container.querySelectorAll('.input-badge-scale').forEach(slider => {
    slider.addEventListener('input', (e) => {
      const idx = parseInt(e.target.dataset.index, 10);
      const val = parseInt(e.target.value, 10);
      state[mode].badges[idx].scale = val / 100;
      const indicator = e.target.closest('.block-adjust-row').querySelector('.badge-scale-indicator');
      if (indicator) indicator.textContent = `${val}%`;
      saveAndRender();
    });
  });

  // Remove badge button
  container.querySelectorAll('.btn-remove-badge').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(btn.dataset.index, 10);
      if (state[mode].badges.length > 1) {
        state[mode].badges.splice(idx, 1);
        renderBadgesUI(mode);
        saveAndRender();
        showToast('Bloque destacado eliminado');
      }
    });
  });
}

function addBadge(mode) {
  const newBadge = {
    id: `${mode}-b-${Date.now()}`,
    val: '',
    sub: '',
    yOffset: 0,
    scale: 1.0
  };

  state[mode].badges.push(newBadge);
  renderBadgesUI(mode);
  saveAndRender();
  showToast('¡Bloque destacado añadido! ✨');
}

// ============================================================================
// Multi-Day UI Manager (PARO)
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

  if (state.paro.days.length > 1) {
    dom.multiDayStyleWrap.classList.remove('hidden');
    dom.btnFormatCombined.classList.toggle('active', state.paro.format === 'combined');
    dom.btnFormatStacked.classList.toggle('active', state.paro.format === 'stacked');
  } else {
    dom.multiDayStyleWrap.classList.add('hidden');
  }

  attachDayInputListeners();
}

function attachDayInputListeners() {
  dom.paroDaysList.querySelectorAll('.input-day').forEach(inp => {
    inp.addEventListener('input', (e) => {
      const idx = parseInt(e.target.dataset.index, 10);
      state.paro.days[idx].day = e.target.value.toUpperCase();
      const card = e.target.closest('.paro-day-card');
      card.querySelectorAll('.chip-item').forEach(ch => {
        ch.classList.toggle('active', ch.dataset.dayPick === state.paro.days[idx].day);
      });
      saveAndRender();
    });
  });

  dom.paroDaysList.querySelectorAll('.input-date').forEach(inp => {
    inp.addEventListener('input', (e) => {
      const idx = parseInt(e.target.dataset.index, 10);
      state.paro.days[idx].date = e.target.value.trim();
      saveAndRender();
    });
  });

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
  
  let nextDay = 'JUEVES';
  const lastDayIndex = DAYS_SEQUENCE.indexOf(lastItem.day.toUpperCase());
  if (lastDayIndex >= 0 && lastDayIndex < DAYS_SEQUENCE.length - 1) {
    nextDay = DAYS_SEQUENCE[lastDayIndex + 1];
  }

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
  // Mode Switch Tabs (Info vs Paro vs Mesa)
  dom.tabInfo.addEventListener('click', () => setMode('info'));
  dom.tabParo.addEventListener('click', () => setMode('paro'));
  dom.tabMesa.addEventListener('click', () => setMode('mesa'));

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

  // Template Picker Buttons (for Info and Mesa)
  document.querySelectorAll('.btn-template-pick').forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.mode;
      const tpl = btn.dataset.template;
      if (mode && tpl && state[mode]) {
        state[mode].template = tpl;
        syncTemplateButtons(mode);
        saveAndRender();
        showToast(`Plantilla ${tpl.toUpperCase()} activada ✨`);
      }
    });
  });

  // ================= INFO LISTENERS =================
  dom.infoTitle.addEventListener('input', (e) => {
    state.info.title = e.target.value.toUpperCase();
    e.target.value = state.info.title;
    saveAndRender();
  });

  dom.infoTitleY.addEventListener('input', (e) => {
    state.info.titleY = parseInt(e.target.value, 10);
    dom.infoTitleYVal.textContent = `${state.info.titleY}px`;
    saveAndRender();
  });

  dom.infoTitleScale.addEventListener('input', (e) => {
    state.info.titleScale = parseInt(e.target.value, 10) / 100;
    dom.infoTitleScaleVal.textContent = `${e.target.value}%`;
    saveAndRender();
  });

  dom.infoHasBadge.addEventListener('change', (e) => {
    state.info.hasBadge = e.target.checked;
    dom.infoBadgesContainer.classList.toggle('hidden', !state.info.hasBadge);
    saveAndRender();
  });

  dom.btnAddBadgeInfo.addEventListener('click', () => addBadge('info'));

  dom.infoBody.addEventListener('input', (e) => {
    state.info.body = e.target.value;
    saveAndRender();
  });

  dom.infoBodyY.addEventListener('input', (e) => {
    state.info.bodyY = parseInt(e.target.value, 10);
    dom.infoBodyYVal.textContent = `${state.info.bodyY}px`;
    saveAndRender();
  });

  dom.infoBodyScale.addEventListener('input', (e) => {
    state.info.bodyScale = parseInt(e.target.value, 10) / 100;
    dom.infoBodyScaleVal.textContent = `${e.target.value}%`;
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
    state.info.titleY = 0;
    state.info.titleScale = 1.0;
    state.info.bodyY = 0;
    state.info.bodyScale = 1.0;
    syncFormToState();
    saveAndRender();
    showToast('Ajustes restablecidos');
  });

  // ================= MESA DE EXAMEN LISTENERS =================
  dom.mesaTitle.addEventListener('input', (e) => {
    state.mesa.title = e.target.value.toUpperCase();
    e.target.value = state.mesa.title;
    saveAndRender();
  });

  dom.mesaTitleY.addEventListener('input', (e) => {
    state.mesa.titleY = parseInt(e.target.value, 10);
    dom.mesaTitleYVal.textContent = `${state.mesa.titleY}px`;
    saveAndRender();
  });

  dom.mesaTitleScale.addEventListener('input', (e) => {
    state.mesa.titleScale = parseInt(e.target.value, 10) / 100;
    dom.mesaTitleScaleVal.textContent = `${e.target.value}%`;
    saveAndRender();
  });

  dom.mesaHasBadge.addEventListener('change', (e) => {
    state.mesa.hasBadge = e.target.checked;
    dom.mesaBadgesContainer.classList.toggle('hidden', !state.mesa.hasBadge);
    saveAndRender();
  });

  dom.btnAddBadgeMesa.addEventListener('click', () => addBadge('mesa'));

  dom.mesaBody.addEventListener('input', (e) => {
    state.mesa.body = e.target.value;
    saveAndRender();
  });

  dom.mesaBodyY.addEventListener('input', (e) => {
    state.mesa.bodyY = parseInt(e.target.value, 10);
    dom.mesaBodyYVal.textContent = `${state.mesa.bodyY}px`;
    saveAndRender();
  });

  dom.mesaBodyScale.addEventListener('input', (e) => {
    state.mesa.bodyScale = parseInt(e.target.value, 10) / 100;
    dom.mesaBodyScaleVal.textContent = `${e.target.value}%`;
    saveAndRender();
  });

  dom.btnAlignLeftMesa.addEventListener('click', () => {
    state.mesa.align = 'left';
    dom.btnAlignLeftMesa.classList.add('active');
    dom.btnAlignCenterMesa.classList.remove('active');
    saveAndRender();
  });

  dom.btnAlignCenterMesa.addEventListener('click', () => {
    state.mesa.align = 'center';
    dom.btnAlignCenterMesa.classList.add('active');
    dom.btnAlignLeftMesa.classList.remove('active');
    saveAndRender();
  });

  dom.mesaYOffset.addEventListener('input', (e) => {
    state.mesa.yOffset = parseInt(e.target.value, 10);
    dom.mesaYVal.textContent = `${state.mesa.yOffset}px`;
    saveAndRender();
  });

  dom.mesaScale.addEventListener('input', (e) => {
    state.mesa.scale = parseInt(e.target.value, 10) / 100;
    dom.mesaScaleVal.textContent = `${e.target.value}%`;
    saveAndRender();
  });

  dom.btnResetMesaAdj.addEventListener('click', () => {
    state.mesa.yOffset = 0;
    state.mesa.scale = 1.0;
    state.mesa.titleY = 0;
    state.mesa.titleScale = 1.0;
    state.mesa.bodyY = 0;
    state.mesa.bodyScale = 1.0;
    syncFormToState();
    saveAndRender();
    showToast('Ajustes restablecidos');
  });

  // ================= PARO LISTENERS =================
  dom.btnAddDay.addEventListener('click', addDay);

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

  document.querySelectorAll('.chip-gremio').forEach(chip => {
    chip.addEventListener('click', () => {
      const gremioName = chip.dataset.gremium;
      toggleGremioSelection(gremioName);
    });
  });

  dom.paroGremium.addEventListener('input', (e) => {
    state.paro.gremium = e.target.value.toUpperCase();
    syncGremioChipsHighlight();
    saveAndRender();
  });

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

  newSelected.sort((a, b) => BASE_GREMIOS.indexOf(a) - BASE_GREMIOS.indexOf(b));
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

function syncTemplateButtons(mode) {
  document.querySelectorAll(`.btn-template-pick[data-mode="${mode}"]`).forEach(btn => {
    btn.classList.toggle('active', btn.dataset.template === state[mode].template);
  });
}

// ============================================================================
// State Sync & Storage
// ============================================================================
function setMode(mode) {
  state.currentMode = mode;

  // Tabs
  dom.tabInfo.classList.toggle('active', mode === 'info');
  dom.tabInfo.setAttribute('aria-selected', mode === 'info' ? 'true' : 'false');
  dom.tabParo.classList.toggle('active', mode === 'paro');
  dom.tabParo.setAttribute('aria-selected', mode === 'paro' ? 'true' : 'false');
  dom.tabMesa.classList.toggle('active', mode === 'mesa');
  dom.tabMesa.setAttribute('aria-selected', mode === 'mesa' ? 'true' : 'false');

  // Forms
  dom.formInfo.classList.toggle('active', mode === 'info');
  dom.formParo.classList.toggle('active', mode === 'paro');
  dom.formMesa.classList.toggle('active', mode === 'mesa');

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
  // INFO
  dom.infoTitle.value = state.info.title || '';
  dom.infoTitleY.value = state.info.titleY || 0;
  dom.infoTitleYVal.textContent = `${state.info.titleY || 0}px`;
  dom.infoTitleScale.value = Math.round((state.info.titleScale || 1.0) * 100);
  dom.infoTitleScaleVal.textContent = `${Math.round((state.info.titleScale || 1.0) * 100)}%`;

  dom.infoHasBadge.checked = state.info.hasBadge;
  dom.infoBadgesContainer.classList.toggle('hidden', !state.info.hasBadge);

  dom.infoBody.value = state.info.body || '';
  dom.infoBodyY.value = state.info.bodyY || 0;
  dom.infoBodyYVal.textContent = `${state.info.bodyY || 0}px`;
  dom.infoBodyScale.value = Math.round((state.info.bodyScale || 1.0) * 100);
  dom.infoBodyScaleVal.textContent = `${Math.round((state.info.bodyScale || 1.0) * 100)}%`;

  dom.btnAlignLeft.classList.toggle('active', state.info.align === 'left');
  dom.btnAlignCenter.classList.toggle('active', state.info.align === 'center');

  dom.infoYOffset.value = state.info.yOffset || 0;
  dom.infoYVal.textContent = `${state.info.yOffset || 0}px`;
  dom.infoScale.value = Math.round((state.info.scale || 1.0) * 100);
  dom.infoScaleVal.textContent = `${Math.round((state.info.scale || 1.0) * 100)}%`;
  syncTemplateButtons('info');

  // MESA
  dom.mesaTitle.value = state.mesa.title || '';
  dom.mesaTitleY.value = state.mesa.titleY || 0;
  dom.mesaTitleYVal.textContent = `${state.mesa.titleY || 0}px`;
  dom.mesaTitleScale.value = Math.round((state.mesa.titleScale || 1.0) * 100);
  dom.mesaTitleScaleVal.textContent = `${Math.round((state.mesa.titleScale || 1.0) * 100)}%`;

  dom.mesaHasBadge.checked = state.mesa.hasBadge;
  dom.mesaBadgesContainer.classList.toggle('hidden', !state.mesa.hasBadge);

  dom.mesaBody.value = state.mesa.body || '';
  dom.mesaBodyY.value = state.mesa.bodyY || 0;
  dom.mesaBodyYVal.textContent = `${state.mesa.bodyY || 0}px`;
  dom.mesaBodyScale.value = Math.round((state.mesa.bodyScale || 1.0) * 100);
  dom.mesaBodyScaleVal.textContent = `${Math.round((state.mesa.bodyScale || 1.0) * 100)}%`;

  dom.btnAlignLeftMesa.classList.toggle('active', state.mesa.align === 'left');
  dom.btnAlignCenterMesa.classList.toggle('active', state.mesa.align === 'center');

  dom.mesaYOffset.value = state.mesa.yOffset || 0;
  dom.mesaYVal.textContent = `${state.mesa.yOffset || 0}px`;
  dom.mesaScale.value = Math.round((state.mesa.scale || 1.0) * 100);
  dom.mesaScaleVal.textContent = `${Math.round((state.mesa.scale || 1.0) * 100)}%`;

  // PARO
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
    state.info = JSON.parse(JSON.stringify(preset));
    renderBadgesUI('info');
  } else if (presetKey.startsWith('mesa-')) {
    setMode('mesa');
    state.mesa = JSON.parse(JSON.stringify(preset));
    renderBadgesUI('mesa');
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
    state.info.titleY = 0;
    state.info.titleScale = 1.0;
    state.info.hasBadge = false;
    state.info.badges = [{ id: 'info-b1', val: '', sub: '', yOffset: 0, scale: 1.0 }];
    state.info.body = '';
    state.info.bodyY = 0;
    state.info.bodyScale = 1.0;
    state.info.yOffset = 0;
    state.info.scale = 1.0;
    renderBadgesUI('info');
  } else if (state.currentMode === 'mesa') {
    state.mesa.title = '';
    state.mesa.titleY = 0;
    state.mesa.titleScale = 1.0;
    state.mesa.hasBadge = false;
    state.mesa.badges = [{ id: 'mesa-b1', val: '', sub: '', yOffset: 0, scale: 1.0 }];
    state.mesa.body = '';
    state.mesa.bodyY = 0;
    state.mesa.bodyScale = 1.0;
    state.mesa.yOffset = 0;
    state.mesa.scale = 1.0;
    renderBadgesUI('mesa');
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
    // Quota exceeded or private browsing
  }
  renderCanvas();
  updateCaption();
}

function loadSavedState() {
  try {
    const saved = localStorage.getItem('upl_stories_state');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.info) {
        // Backward compatibility migration for older single-badge format
        if (parsed.info.badgeVal !== undefined && !parsed.info.badges) {
          parsed.info.badges = [
            {
              id: 'info-b1',
              val: parsed.info.badgeVal || '',
              sub: parsed.info.badgeSub || '',
              yOffset: 0,
              scale: 1.0
            }
          ];
        }
        Object.assign(state.info, parsed.info);
      }
      if (parsed.mesa) {
        Object.assign(state.mesa, parsed.mesa);
      }
      if (parsed.paro) {
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

  // Ensure valid arrays
  if (!state.paro.days || !Array.isArray(state.paro.days) || state.paro.days.length === 0) {
    state.paro.days = [{ day: 'MIÉRCOLES', date: '15/10' }];
  }
  if (!state.info.badges || !Array.isArray(state.info.badges) || state.info.badges.length === 0) {
    state.info.badges = [{ id: 'info-b1', val: '5 AL 9', sub: 'INSCRIPCIÓN AL PEDIDO\nDE MESA ESPECIAL', yOffset: 0, scale: 1.0 }];
  }
  if (!state.mesa.badges || !Array.isArray(state.mesa.badges) || state.mesa.badges.length === 0) {
    state.mesa.badges = [{ id: 'mesa-b1', val: '5 AL 9', sub: 'INSCRIPCIÓN AL PEDIDO\nDE MESA ESPECIAL', yOffset: 0, scale: 1.0 }];
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

  // 1. Determine Background Template
  let templateImg = assets.infoTemplate;
  let isLoaded = assets.loaded.infoTemplate;

  if (state.currentMode === 'info') {
    if (state.info.template === 'recordatorio') {
      templateImg = assets.recordatorioTemplate;
      isLoaded = assets.loaded.recordatorioTemplate;
    } else {
      templateImg = assets.infoTemplate;
      isLoaded = assets.loaded.infoTemplate;
    }
  } else if (state.currentMode === 'mesa') {
    templateImg = assets.mesaTemplate;
    isLoaded = assets.loaded.mesaTemplate;
  } else {
    templateImg = assets.paroTemplate;
    isLoaded = assets.loaded.paroTemplate;
  }

  // Draw background image or fallback gradient
  if (isLoaded && templateImg.complete && templateImg.naturalWidth > 0) {
    ctx.drawImage(templateImg, 0, 0, width, height);
  } else {
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, '#2d1447');
    grad.addColorStop(0.5, '#1e0c30');
    grad.addColorStop(1, '#0e0517');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
  }

  // 2. Render Text Content based on currentMode
  if (state.currentMode === 'info') {
    renderBlockBasedContent(ctx, width, height, state.info);
  } else if (state.currentMode === 'mesa') {
    renderBlockBasedContent(ctx, width, height, state.mesa);
  } else {
    renderParoContent(ctx, width, height);
  }
}

/**
 * Universal Block-Based Renderer (used for INFO and MESA DE EXAMEN)
 * Supports title, multi-badge list, and body with independent position & scale per block
 */
function renderBlockBasedContent(context, width, height, data) {
  const { title, titleY = 0, titleScale = 1.0, hasBadge, badges, body, bodyY = 0, bodyScale = 1.0, align, yOffset, scale } = data;

  let currentY = 530 + yOffset;

  // --- 1. Title Rendering ---
  if (title && title.trim()) {
    const titleLines = title.split('\n');
    const effectiveTitleScale = scale * titleScale;
    const titleFontSize = Math.round(68 * effectiveTitleScale);
    const titleLineHeight = Math.round(titleFontSize * 1.22);
    let titleCursorY = currentY + titleY;

    context.save();
    context.fillStyle = '#ffffff';
    context.textBaseline = 'alphabetic';
    context.font = `800 ${titleFontSize}px "Montserrat", sans-serif`;

    for (let i = 0; i < titleLines.length; i++) {
      const line = titleLines[i].trim();
      if (!line) continue;
      drawTextWithSpacing(context, line, 540, titleCursorY, 1.2, 'center');
      titleCursorY += titleLineHeight;
    }
    context.restore();

    currentY = Math.max(currentY + titleLines.length * titleLineHeight, titleCursorY) + Math.round(45 * scale);
  }

  // --- 2. Multiple Badges (Bloques Destacados) ---
  if (hasBadge && badges && badges.length > 0) {
    const validBadges = badges.filter(b => (b.val && b.val.trim()) || (b.sub && b.sub.trim()));

    for (let i = 0; i < validBadges.length; i++) {
      const badge = validBadges[i];
      const effectiveBadgeScale = scale * (badge.scale || 1.0);
      const badgeHeight = Math.round(86 * effectiveBadgeScale);
      const badgeY = currentY + (badge.yOffset || 0);

      // Measure badge text to auto-fit pill width
      context.save();
      const badgeFontSize = Math.round(46 * effectiveBadgeScale);
      context.font = `800 ${badgeFontSize}px "Montserrat", sans-serif`;
      const valText = (badge.val || '').trim();
      const measuredBadgeTextWidth = context.measureText(valText).width;

      const badgeWidth = Math.max(Math.round(210 * effectiveBadgeScale), measuredBadgeTextWidth + Math.round(48 * effectiveBadgeScale));
      const badgeX = Math.round(135 * effectiveBadgeScale);
      const badgeRadius = Math.round(20 * effectiveBadgeScale);
      const borderWidth = Math.round(5.5 * effectiveBadgeScale);

      // Draw rounded outline capsule
      context.strokeStyle = '#ffffff';
      context.lineWidth = borderWidth;
      roundRect(context, badgeX, badgeY, badgeWidth, badgeHeight, badgeRadius);
      context.stroke();

      // Draw text inside capsule
      context.fillStyle = '#ffffff';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(valText, badgeX + badgeWidth / 2, badgeY + badgeHeight / 2 + (2 * effectiveBadgeScale));
      context.restore();

      // Draw Subtitle beside capsule
      if (badge.sub && badge.sub.trim()) {
        context.save();
        const subFontSize = Math.round(36 * effectiveBadgeScale);
        const subLineHeight = Math.round(subFontSize * 1.25);
        context.font = `700 ${subFontSize}px "Montserrat", sans-serif`;
        context.fillStyle = '#ffffff';
        context.textBaseline = 'top';

        const subLines = badge.sub.split('\n');
        const totalSubHeight = subLines.length * subLineHeight;
        let subY = badgeY + (badgeHeight - totalSubHeight) / 2 + (2 * effectiveBadgeScale);
        const subX = badgeX + badgeWidth + Math.round(36 * effectiveBadgeScale);

        for (const line of subLines) {
          drawTextWithSpacing(context, line.trim(), subX, subY, 0.5, 'left');
          subY += subLineHeight;
        }
        context.restore();
      }

      // Increment Y coordinate for next element
      currentY = badgeY + badgeHeight + Math.round(32 * scale);
    }

    currentY += Math.round(20 * scale);
  }

  // --- 3. Body Text & Paragraphs ---
  if (body && body.trim()) {
    context.save();
    const effectiveBodyScale = scale * bodyScale;
    let bodyCursorY = currentY + bodyY;

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
        const headerFontSize = Math.round(38 * effectiveBodyScale);
        context.font = `800 ${headerFontSize}px "Montserrat", sans-serif`;
        context.fillStyle = '#ffffff';
        context.textBaseline = 'alphabetic';

        const hX = align === 'center' ? bodyCenterX : bodyMarginX;
        drawTextWithSpacing(context, headerText, hX, bodyCursorY + headerFontSize, 0.8, align);
        bodyCursorY += Math.round(headerFontSize * 1.4);
      }

      // Draw Paragraph Body
      if (remainingText) {
        const bodyFontSize = Math.round(34 * effectiveBodyScale);
        const bodyLineHeight = Math.round(bodyFontSize * 1.38);
        context.font = `500 ${bodyFontSize}px "Montserrat", sans-serif`;
        context.fillStyle = '#ffffff';
        context.textAlign = align === 'center' ? 'center' : 'left';
        context.textBaseline = 'alphabetic';

        const lines = wrapTextLines(context, remainingText, bodyMaxWidth);
        for (const line of lines) {
          const lineX = align === 'center' ? bodyCenterX : bodyMarginX;
          context.fillText(line, lineX, bodyCursorY + bodyFontSize);
          bodyCursorY += bodyLineHeight;
        }
      }

      bodyCursorY += Math.round(35 * effectiveBodyScale);
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

  const validDays = (days && days.length > 0) 
    ? days.filter(d => (d.day && d.day.trim()) || (d.date && d.date.trim())) 
    : [];

  if (validDays.length === 0) {
    currentY += 100;
  } else if (validDays.length === 1 || format === 'combined') {
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
        // e.g. "14  Y  16/10" with clean readable spacing
        dateText = `${d1.split('/')[0]}  Y  ${d2}`;
      } else {
        dateText = `${d1}  Y  ${d2}`;
      }
    } else {
      const dayNames = validDays.map(d => d.day.trim().toUpperCase());
      const lastDay = dayNames.pop();
      dayText = `${dayNames.join(', ')} Y ${lastDay}`;
      // Separate multiple dates with spaces
      dateText = validDays.map(d => d.date.trim()).join('   ');
    }

    // 1. Day of Week
    if (dayText) {
      context.save();
      const baseDaySize = validDays.length > 2 ? 46 : (validDays.length === 2 ? 52 : 62);
      const dayFontSize = Math.round(baseDaySize * scale);
      context.font = `800 ${dayFontSize}px "Montserrat", sans-serif`;
      context.fillStyle = '#ffffff';
      context.textBaseline = 'alphabetic';
      drawTextWithSpacing(context, dayText, 540, currentY + dayFontSize, 1.5, 'center');
      context.restore();

      currentY += Math.round(dayFontSize * 1.25);
    }

    // 2. Date
    if (dateText) {
      context.save();
      const baseDateSize = validDays.length > 2 ? 88 : (validDays.length === 2 ? 108 : 152);
      const dateFontSize = Math.round(baseDateSize * scale);
      context.font = `800 ${dateFontSize}px "Montserrat", sans-serif`;
      context.fillStyle = '#ffffff';
      context.textBaseline = 'alphabetic';
      drawTextWithSpacing(context, dateText, 540, currentY + dateFontSize, 0, 'center');
      context.restore();

      currentY += Math.round(dateFontSize * 1.08);
    }
  } else {
    // STACKED MULTI-DAY FORMAT
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

  // 5. Status / Consequence
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
// Helper Canvas Functions
// ============================================================================
function drawTextWithSpacing(context, text, x, y, letterSpacing = 0, alignment = 'center') {
  if (!text) return;

  context.save();
  context.textAlign = alignment;

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
    const title = (state.info.title || '').replace(/\n/g, ' ').trim() || 'COMUNICADO IMPORTANTE';
    const tplLabel = state.info.template === 'recordatorio' ? '⏰ RECORDATORIO' : '🔔 IMPORTANTE';
    caption = `${tplLabel} | ${title}\n\n`;

    if (state.info.hasBadge && state.info.badges && state.info.badges.length > 0) {
      state.info.badges.forEach(b => {
        if (b.val || b.sub) {
          caption += `🗓️ ${b.val.trim()} - ${(b.sub || '').replace(/\n/g, ' ').trim()}\n`;
        }
      });
      caption += '\n';
    }
    if (state.info.body) {
      caption += `${state.info.body.trim()}\n\n`;
    }
  } else if (state.currentMode === 'mesa') {
    const title = (state.mesa.title || '').replace(/\n/g, ' ').trim() || 'MESAS DE EXAMEN';
    caption = `📅 MESA DE EXAMEN | ${title}\n\n`;

    if (state.mesa.hasBadge && state.mesa.badges && state.mesa.badges.length > 0) {
      state.mesa.badges.forEach(b => {
        if (b.val || b.sub) {
          caption += `🗓️ ${b.val.trim()} - ${(b.sub || '').replace(/\n/g, ' ').trim()}\n`;
        }
      });
      caption += '\n';
    }
    if (state.mesa.body) {
      caption += `${state.mesa.body.trim()}\n\n`;
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
function downloadHighResStory() {
  let filename = '';
  if (state.currentMode === 'info') {
    filename = `story-info-upl-${Date.now().toString().slice(-4)}.png`;
  } else if (state.currentMode === 'mesa') {
    filename = `story-mesa-examen-upl-${Date.now().toString().slice(-4)}.png`;
  } else {
    const firstDay = state.paro.days[0] || { date: 'paro' };
    const dateStr = firstDay.date ? firstDay.date.replace('/', '-') : Date.now().toString().slice(-4);
    filename = `story-paro-upl-${dateStr}.png`;
  }

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

async function shareStory() {
  let filename = 'story-upl.png';
  if (state.currentMode === 'info') filename = 'story-info-upl.png';
  else if (state.currentMode === 'mesa') filename = 'story-mesa-examen-upl.png';
  else filename = 'story-paro-upl.png';

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
  dom.refOverlay.src = state.currentMode === 'paro' ? './paro-output-ref.png' : './info-output-ref.png';
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
