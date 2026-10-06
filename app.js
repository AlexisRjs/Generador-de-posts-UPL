/**
 * UPL Stories - Application Logic & Canvas Engine
 * Universitarios por la Libertad - UTN FRRO
 */

// ============================================================================

// ============================================================================
// Official UTN FRRO Subjects Catalog & Career Mapping (from LISTADODEMATERIAS.MD)
// Runs 100% Client-Side for Offline / Static Web OCR Correction
// ============================================================================
const UTN_SUBJECT_CATALOG = [
  "Análisis Matemático I",
  "Álgebra y Geometría Analítica",
  "Física I",
  "Inglés I",
  "Lógica y Esctructuras Discretas",
  "Algoritmos y Estructuras de Datos",
  "Arquitectura de Computadoras",
  "Sistemas y Procesos de Negocio",
  "Análisis Matemático II",
  "Física II",
  "Ingeniería y sociedad",
  "Inglés II",
  "Sintaxis y Semántica de los Lenguajes",
  "Paradigmas de Programación",
  "Sistemas Operativos",
  "Análisis de Sistemas de Información",
  "Probabilidad y Estadística",
  "Economía",
  "Bases de Datos",
  "Desarrollo de Software",
  "Comunicación de Datos",
  "Análisis Numérico",
  "Diseño de Sistemas de Información",
  "Legislación",
  "Ingeniería y Calidad de Software",
  "Redes de Datos",
  "Investigación Operativa",
  "Simulación",
  "Tecnologías para la Automatización",
  "Administración de Sistemas de Información",
  "Inteligencia Artificial",
  "Ciencia de Datos",
  "Sistemas de Gestión",
  "Gestión Gerencial",
  "Seguridad en los Sistemas de Información",
  "Proyecto Final",
  "Entornos Gráficos",
  "Análisis y Diseño de Datos e Información",
  "Sistemas de Información Geográfica",
  "Programación Competitiva",
  "Algorítmos Genéticos",
  "Información Jurídica",
  "Lenguaje de Programación JAVA",
  "Tecnologías de Desarrollo de Software IDE",
  "Gestión Ingenieril",
  "Introducción a la Práctica Profesional",
  "Infraestructura Tecnológica",
  "Soporte a las Bases de Datos con Programación Visual",
  "Metodología de la Investigación",
  "Metodologías Ágiles en el Desarrollo de Software",
  "Fabricación Aditiva",
  "Dirección de Recursos Humanos",
  "Informática en la Administración Pública",
  "Sistemas de Información Integrados para la Industria",
  "Minería de Datos",
  "Introducción a la Ingeniería Química",
  "Química",
  "Sistemas de Representación",
  "Fundamentos de Informática",
  "Introducción a Equipos y Procesos",
  "Química Inorgánica",
  "Química Orgánica",
  "Balances de Masa y Energía",
  "Termodinámica",
  "Matemática Superior Aplicada",
  "Ciencia de los Materiales",
  "Fisicoquímica",
  "Fenómenos de Transporte",
  "Química Analítica",
  "Microbiología y Química Biológica",
  "Química Aplicada",
  "Diseño, Simulación, Opt. y Seg. de Proc.",
  "Operaciones Unitarias I",
  "Tecnología de la Energía Térmica",
  "Operaciones Unitarias II",
  "Ingeniería de las Reacciones Químicas",
  "Organización Industrial",
  "Calidad y Control Estadístico de Procesos",
  "Control Automático de Procesos",
  "Mecánica Industrial",
  "Ingeniería Ambiental",
  "Procesos Biotecnológicos",
  "Higiene y Seguridad en el Trabajo",
  "Máquinas e Instalaciones Eléctricas",
  "Introducción a la Tecnología de los Alimentos",
  "Gestión Socioambiental Urbana Sustentable",
  "Electrónica Aplicada",
  "Gestión del Medio Ambiente y la Energía",
  "Control de Calidad de los Alimentos",
  "Introducción a la Bromatología",
  "Química de los Alimentos",
  "Liderazgo en Ingeniería",
  "Calidad de los Alimentos",
  "Procesos Industriales I",
  "Ingeniería Ambiental Aplicada a Medios Líquidos",
  "Ingeniería de Control de la Contaminación del Aire",
  "Gestión de Tecnologías Sustentables",
  "Aplicación de Programación Matemática para el",
  "Diseño y Optimización de Procesos y Sistemas",
  "Procesos y Equipos para la Industria de los",
  "Alimentos",
  "Química General",
  "Ingeniería Mecánica I",
  "Materiales No Metálicos",
  "Estabilidad I",
  "Materiales Metálicos",
  "Ingeniería Ambiental y Seguridad Industrial",
  "Ingeniería Mecánica II",
  "Mecánica Racional",
  "Estabilidad II",
  "Mediciones y Ensayos",
  "Diseño Mecánico",
  "Cálculo Avanzado",
  "Ingeniería Mecánica III",
  "Elementos de Máquinas",
  "Tecnología del Calor",
  "Metrología e Ingeniería de la Calidad",
  "Mecánica de los Fluidos",
  "Electrotecnia y Máquinas Eléctricas",
  "Electrónica y Sistemas de Control",
  "Estabilidad III",
  "Tecnología de la Fabricación",
  "Máquinas Alternativas y Turbomáquinas",
  "Instalaciones Industriales",
  "Mantenimiento",
  "Metalografía y Tratamientos Térmicos",
  "Máquinas de Elevación y Transporte",
  "Materiales de Ingeniería",
  "Sistemas de Control en Instalaciones Térmicas",
  "Transferencia de Energia Térmica",
  "Diseño de Instalaciones Térmicas",
  "Maquinaria Agrícola",
  "Formación de Emprendedores",
  "Integración Eléctrica I",
  "Electrotecnia I",
  "Mecánica Técnica",
  "Integración Eléctrica II",
  "Cálculo Numérico",
  "Tecnologías y Ensayo de Materiales Eléctricos",
  "Instrumentos y Mediciones Eléctricas",
  "Teoría de los Campos",
  "Física III",
  "Máquinas Eléctricas",
  "Electrotecnia II",
  "Fundamentos para el Análisis de Señales",
  "Taller Interdisciplinario",
  "Electrónica I",
  "Máquinas Eléctricas II",
  "Seguridad, Riesgo Eléctrico y Medio Ambiente",
  "Instalaciones Eléctricas y Luminotecnia",
  "Control Automático",
  "Máquinas Térmicas, Hidráulicas y de Fluido",
  "Electrónica II",
  "Generación, Transmisión y Distribución de la EE",
  "Sistemas de Potencia",
  "Accionamientos y Controles Eléctricos",
  "Organización y Administración de Empresas",
  "Fuentes Renovables de Energía",
  "Control Numérico y Robótica",
  "Electromedicina",
  "Gestión de Calidad",
  "Transmisión de Datos en Sistemas Eléctricos",
  "Mantenimiento de Plantas",
  "Instrumentación Industrial",
  "Movilidad Eléctrica",
  "Ingeniería Civil",
  "Estabilidad",
  "Ingeniería Civil II",
  "Tecnología de los Materiales",
  "Resistencia de Materiales",
  "Tecnología del Hormigón",
  "Tecnología de la Construcción",
  "Geotopografía",
  "Hidráulica General y Aplicada",
  "Instalaciones Eléctricas y Acústicas",
  "Instalaciones Termomecánicas",
  "Geotecnia",
  "Instalaciones Sanitarias y de Gas",
  "Diseño Arquitectónico, Planeamiento y Urb.",
  "Análisis Estructural I",
  "Estructuras de Hormigón I",
  "Hidrología y Obras Hidráulicas",
  "Ingeniería Legal",
  "Construcciones Metálicas y de Madera",
  "Cimentaciones",
  "Ingeniería Sanitaria",
  "Organización y Conducción de Obras",
  "Vías de Comunicación I",
  "Análisis Estructural II",
  "Vías de Comunicación II",
  "Gestión Ambiental y Desarrollo Sustentable",
  "Geología Aplicada",
  "Elasticidad y Plasticidad",
  "Uso del Recurso Hídrico",
  "Prefabricación",
  "Herramientas para el Desarrollo Profesional",
  "Vialidad Especial",
  "Obras Fluviales y Marítimas",
  "Tránsito Y Transporte",
  "Análisis Estructural III",
  "Proyecto y Gestión Urbana",
  "Gestión y Administración Ambiental",
  "Teoría del Control",
  "Máquinas Térmicas",
  "Matemática Superior/ Análisis Numérico",
  "Comunicaciones / Comunicación de Datos",
  "Redes de Información / Redes de Datos",
  "Administración Gerencial / Gestión Gerencial",
  "Ingeniería de Software / Ing. y Calidad",
  "Lógica y Estruc. Discretas / Matemática Discreta",
  "Tecnolog. Para la Automatización",
  "Dirección de Rec.Humanos",
  "Lenguaje de Programación Java (Electiva)",
  "Formación de Emprendedores (Elec.)",
  "Química General / Química Aplicada",
  "Fundamentos de Informat.",
  "Generación, Transm. Y Distrib. De la Energía Térmica",
  "Acondicionamientos y Controles Eléctricos",
  "Integración III y IV",
  "Gestión Socio-Ambiental",
  "Control Estadístico de Procesos",
  "Diseño de Instalac. Térmicas",
  "Transmisión del Calor",
  "Tecnología de Fabricación",
  "Construcciones Metálicas y de Maderas",
  "Estructuras de Hormigón",
  "Soporte a la Gestión de Datos",
  "Biotecnología",
  "Transmisión de Datos",
  "Instalaciones Eléctricas",
  "Ing. Sanitaria",
  "Ing. Legal",
  "Hidráulica Gral y Aplicada",
  "Ing. Mecánica II",
  "Ing. Mecánica III",
  "Tecnol. Y Ensayos de Materiales Electr.",
  "Administración de Recursos",
  "Algoritmos Genéticos",
  "Química Analítica Aplicada",
  "Aplic. de Programación Matemática",
  "Ingeniería y Desarrollo",
  "Máquinas Eléctricas I",
  "Gestión de Calidad y Mejora Continua",
  "Ingeniería Civil I",
  "Sistemas y Procesos de Negocios",
  "Formación de Emprendedores(Elec.)",
  "Control Estadístico de Procesos",
  "Organización y Conducción de Obras",
  "Análisis Estructural I",
  "Tecnología de los Materiales",
  "Instalaciones Sanitarias y de Gas"
];

const UTN_SUBJECT_CAREER_MAP = {
  "Análisis Matemático I": "UDB",
  "Álgebra y Geometría Analítica": "UDB",
  "Física I": "UDB",
  "Inglés I": "UDB",
  "Lógica y Esctructuras Discretas": "ISI",
  "Algoritmos y Estructuras de Datos": "ISI",
  "Arquitectura de Computadoras": "ISI",
  "Sistemas y Procesos de Negocio": "ISI",
  "Análisis Matemático II": "UDB",
  "Física II": "UDB",
  "Ingeniería y sociedad": "ISI",
  "Inglés II": "UDB",
  "Sintaxis y Semántica de los Lenguajes": "ISI",
  "Paradigmas de Programación": "ISI",
  "Sistemas Operativos": "ISI",
  "Análisis de Sistemas de Información": "ISI",
  "Probabilidad y Estadística": "UDB",
  "Economía": "UDB",
  "Bases de Datos": "ISI",
  "Desarrollo de Software": "ISI",
  "Comunicación de Datos": "ISI",
  "Análisis Numérico": "ISI",
  "Diseño de Sistemas de Información": "ISI",
  "Legislación": "UDB",
  "Ingeniería y Calidad de Software": "ISI",
  "Redes de Datos": "ISI",
  "Investigación Operativa": "ISI",
  "Simulación": "ISI",
  "Tecnologías para la Automatización": "ISI",
  "Administración de Sistemas de Información": "ISI",
  "Inteligencia Artificial": "ISI",
  "Ciencia de Datos": "ISI",
  "Sistemas de Gestión": "ISI",
  "Gestión Gerencial": "ISI",
  "Seguridad en los Sistemas de Información": "ISI",
  "Proyecto Final": "ISI",
  "Entornos Gráficos": "ISI",
  "Análisis y Diseño de Datos e Información": "ISI",
  "Sistemas de Información Geográfica": "ISI",
  "Programación Competitiva": "ISI",
  "Algorítmos Genéticos": "ISI",
  "Información Jurídica": "ISI",
  "Lenguaje de Programación JAVA": "ISI",
  "Tecnologías de Desarrollo de Software IDE": "ISI",
  "Gestión Ingenieril": "ISI",
  "Introducción a la Práctica Profesional": "ISI",
  "Infraestructura Tecnológica": "ISI",
  "Soporte a las Bases de Datos con Programación Visual": "ISI",
  "Metodología de la Investigación": "ISI",
  "Metodologías Ágiles en el Desarrollo de Software": "ISI",
  "Fabricación Aditiva": "ISI",
  "Dirección de Recursos Humanos": "ISI",
  "Informática en la Administración Pública": "ISI",
  "Sistemas de Información Integrados para la Industria": "ISI",
  "Minería de Datos": "ISI",
  "Introducción a la Ingeniería Química": "IQ",
  "Química": "UDB",
  "Sistemas de Representación": "UDB",
  "Fundamentos de Informática": "UDB",
  "Introducción a Equipos y Procesos": "IQ",
  "Química Inorgánica": "IQ",
  "Química Orgánica": "IQ",
  "Balances de Masa y Energía": "IQ",
  "Termodinámica": "IQ",
  "Matemática Superior Aplicada": "IQ",
  "Ciencia de los Materiales": "IQ",
  "Fisicoquímica": "IQ",
  "Fenómenos de Transporte": "IQ",
  "Química Analítica": "IQ",
  "Microbiología y Química Biológica": "IQ",
  "Química Aplicada": "IQ",
  "Diseño, Simulación, Opt. y Seg. de Proc.": "IQ",
  "Operaciones Unitarias I": "IQ",
  "Tecnología de la Energía Térmica": "IQ",
  "Operaciones Unitarias II": "IQ",
  "Ingeniería de las Reacciones Químicas": "IQ",
  "Organización Industrial": "IQ",
  "Calidad y Control Estadístico de Procesos": "IQ",
  "Control Automático de Procesos": "IQ",
  "Mecánica Industrial": "IQ",
  "Ingeniería Ambiental": "IQ",
  "Procesos Biotecnológicos": "IQ",
  "Higiene y Seguridad en el Trabajo": "IQ",
  "Máquinas e Instalaciones Eléctricas": "IQ",
  "Introducción a la Tecnología de los Alimentos": "IQ",
  "Gestión Socioambiental Urbana Sustentable": "IQ",
  "Electrónica Aplicada": "IQ",
  "Gestión del Medio Ambiente y la Energía": "IQ",
  "Control de Calidad de los Alimentos": "IQ",
  "Introducción a la Bromatología": "IQ",
  "Química de los Alimentos": "IQ",
  "Liderazgo en Ingeniería": "IQ",
  "Calidad de los Alimentos": "IQ",
  "Procesos Industriales I": "IQ",
  "Ingeniería Ambiental Aplicada a Medios Líquidos": "IQ",
  "Ingeniería de Control de la Contaminación del Aire": "IQ",
  "Gestión de Tecnologías Sustentables": "IQ",
  "Aplicación de Programación Matemática para el": "IQ",
  "Diseño y Optimización de Procesos y Sistemas": "IQ",
  "Procesos y Equipos para la Industria de los": "IQ",
  "Alimentos": "IQ",
  "Química General": "UDB",
  "Ingeniería Mecánica I": "IM",
  "Materiales No Metálicos": "IM",
  "Estabilidad I": "IM",
  "Materiales Metálicos": "IM",
  "Ingeniería Ambiental y Seguridad Industrial": "IM",
  "Ingeniería Mecánica II": "IM",
  "Mecánica Racional": "IM",
  "Estabilidad II": "IM",
  "Mediciones y Ensayos": "IM",
  "Diseño Mecánico": "IM",
  "Cálculo Avanzado": "IM",
  "Ingeniería Mecánica III": "IM",
  "Elementos de Máquinas": "IM",
  "Tecnología del Calor": "IM",
  "Metrología e Ingeniería de la Calidad": "IM",
  "Mecánica de los Fluidos": "IM",
  "Electrotecnia y Máquinas Eléctricas": "IM",
  "Electrónica y Sistemas de Control": "IM",
  "Estabilidad III": "IM",
  "Tecnología de la Fabricación": "IM",
  "Máquinas Alternativas y Turbomáquinas": "IM",
  "Instalaciones Industriales": "IM",
  "Mantenimiento": "IM",
  "Metalografía y Tratamientos Térmicos": "IM",
  "Máquinas de Elevación y Transporte": "IM",
  "Materiales de Ingeniería": "IM",
  "Sistemas de Control en Instalaciones Térmicas": "IM",
  "Transferencia de Energia Térmica": "IM",
  "Diseño de Instalaciones Térmicas": "IM",
  "Maquinaria Agrícola": "IM",
  "Formación de Emprendedores": "IM",
  "Integración Eléctrica I": "IE",
  "Electrotecnia I": "IE",
  "Mecánica Técnica": "IE",
  "Integración Eléctrica II": "IE",
  "Cálculo Numérico": "IE",
  "Tecnologías y Ensayo de Materiales Eléctricos": "IE",
  "Instrumentos y Mediciones Eléctricas": "IE",
  "Teoría de los Campos": "IE",
  "Física III": "IE",
  "Máquinas Eléctricas": "IE",
  "Electrotecnia II": "IE",
  "Fundamentos para el Análisis de Señales": "IE",
  "Taller Interdisciplinario": "IE",
  "Electrónica I": "IE",
  "Máquinas Eléctricas II": "IE",
  "Seguridad, Riesgo Eléctrico y Medio Ambiente": "IE",
  "Instalaciones Eléctricas y Luminotecnia": "IE",
  "Control Automático": "IE",
  "Máquinas Térmicas, Hidráulicas y de Fluido": "IE",
  "Electrónica II": "IE",
  "Generación, Transmisión y Distribución de la EE": "IE",
  "Sistemas de Potencia": "IE",
  "Accionamientos y Controles Eléctricos": "IE",
  "Organización y Administración de Empresas": "IE",
  "Fuentes Renovables de Energía": "IE",
  "Control Numérico y Robótica": "IE",
  "Electromedicina": "IE",
  "Gestión de Calidad": "IE",
  "Transmisión de Datos en Sistemas Eléctricos": "IE",
  "Mantenimiento de Plantas": "IE",
  "Instrumentación Industrial": "IE",
  "Movilidad Eléctrica": "IE",
  "Ingeniería Civil": "IC",
  "Estabilidad": "IC",
  "Ingeniería Civil II": "IC",
  "Tecnología de los Materiales": "IC",
  "Resistencia de Materiales": "IC",
  "Tecnología del Hormigón": "IC",
  "Tecnología de la Construcción": "IC",
  "Geotopografía": "IC",
  "Hidráulica General y Aplicada": "IC",
  "Instalaciones Eléctricas y Acústicas": "IC",
  "Instalaciones Termomecánicas": "IC",
  "Geotecnia": "IC",
  "Instalaciones Sanitarias y de Gas": "IC",
  "Diseño Arquitectónico, Planeamiento y Urb.": "IC",
  "Análisis Estructural I": "IC",
  "Estructuras de Hormigón I": "IC",
  "Hidrología y Obras Hidráulicas": "IC",
  "Ingeniería Legal": "IC",
  "Construcciones Metálicas y de Madera": "IC",
  "Cimentaciones": "IC",
  "Ingeniería Sanitaria": "IC",
  "Organización y Conducción de Obras": "IC",
  "Vías de Comunicación I": "IC",
  "Análisis Estructural II": "IC",
  "Vías de Comunicación II": "IC",
  "Gestión Ambiental y Desarrollo Sustentable": "IC",
  "Geología Aplicada": "IC",
  "Elasticidad y Plasticidad": "IC",
  "Uso del Recurso Hídrico": "IC",
  "Prefabricación": "IC",
  "Herramientas para el Desarrollo Profesional": "IC",
  "Vialidad Especial": "IC",
  "Obras Fluviales y Marítimas": "IC",
  "Tránsito Y Transporte": "IC",
  "Análisis Estructural III": "IC",
  "Proyecto y Gestión Urbana": "IC",
  "Gestión y Administración Ambiental": "IC",
  "Teoría del Control": "ISI",
  "Máquinas Térmicas": "IM",
  "Matemática Superior/ Análisis Numérico": "ISI",
  "Comunicaciones / Comunicación de Datos": "ISI",
  "Redes de Información / Redes de Datos": "ISI",
  "Administración Gerencial / Gestión Gerencial": "ISI",
  "Ingeniería de Software / Ing. y Calidad": "ISI",
  "Lógica y Estruc. Discretas / Matemática Discreta": "ISI",
  "Tecnolog. Para la Automatización": "ISI",
  "Dirección de Rec.Humanos": "ISI",
  "Lenguaje de Programación Java (Electiva)": "ISI",
  "Formación de Emprendedores (Elec.)": "ISI",
  "Química General / Química Aplicada": "UDB",
  "Fundamentos de Informat.": "UDB",
  "Generación, Transm. Y Distrib. De la Energía Térmica": "IE",
  "Acondicionamientos y Controles Eléctricos": "IE",
  "Integración III y IV": "IQ",
  "Gestión Socio-Ambiental": "IQ",
  "Control Estadístico de Procesos": "IQ",
  "Diseño de Instalac. Térmicas": "IM",
  "Transmisión del Calor": "IM",
  "Tecnología de Fabricación": "IM",
  "Construcciones Metálicas y de Maderas": "IC",
  "Estructuras de Hormigón": "IC",
  "Soporte a la Gestión de Datos": "ISI",
  "Biotecnología": "IQ",
  "Transmisión de Datos": "IE",
  "Instalaciones Eléctricas": "IE",
  "Ing. Sanitaria": "IC",
  "Ing. Legal": "IC",
  "Hidráulica Gral y Aplicada": "IC",
  "Ing. Mecánica II": "IM",
  "Ing. Mecánica III": "IM",
  "Tecnol. Y Ensayos de Materiales Electr.": "IE",
  "Administración de Recursos": "ISI",
  "Algoritmos Genéticos": "ISI",
  "Química Analítica Aplicada": "IQ",
  "Aplic. de Programación Matemática": "IQ",
  "Ingeniería y Desarrollo": "IM",
  "Máquinas Eléctricas I": "IE",
  "Gestión de Calidad y Mejora Continua": "IQ",
  "Ingeniería Civil I": "IC",
  "Sistemas y Procesos de Negocios": "ISI",
  "Formación de Emprendedores(Elec.)": "ISI",
  "Control Estadístico de Procesos": "IQ",
  "Organización y Conducción de Obras": "IC",
  "Análisis Estructural I": "IC",
  "Tecnología de los Materiales": "IC",
  "Instalaciones Sanitarias y de Gas": "IC"
};

function cleanStr(s) {
  return (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');
}

function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const d = Array.from({ length: m + 1 }, () => new Uint16Array(n + 1));
  for (let i = 0; i <= m; i++) d[i][0] = i;
  for (let j = 0; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
    }
  }
  return d[m][n];
}

function extractRomanNumeral(str) {
  const trimmed = (str || '').trim();

  // 1. Check for explicit Roman numerals III
  if (/\b(iii|111|lll|ill|iil|lii|ili|3)\b|[il1|!]{3}\s*$/i.test(trimmed)) {
    return 'III';
  }
  if (/\b(ul|ui|iil)\b\s*$/i.test(trimmed)) {
    return 'III';
  }

  // 2. Check for Roman numerals II (including § symbol, ez, and attached n/u/ez)
  if (/(?:§|§\b|\b(ii|11|ll|il|li|ez|2)\b|[il1|!]{2}\s*$)/i.test(trimmed)) {
    return 'II';
  }
  if (/(?:[im]n?gl[eé]s|f[ií]sica|electr[oó]nica|electrotecnia)[nu]\s*$/i.test(trimmed)) {
    return 'II';
  }
  if (/\s+[nu]\s*$/i.test(trimmed) && !/\b(en|un|sin)\b/i.test(trimmed)) {
    return 'II';
  }

  // 3. Single bar or digit I
  if (/\b(i|1)\b|[il1|!]\s*$/i.test(trimmed)) {
    return 'I';
  }

  return null;
}

function stripRomanNumeral(str) {
  return str
    .replace(/(?:§|\s*(?:iii|111|lll|ill|iil|lii|ili|3)\b)/i, '')
    .replace(/\s+(ii|11|ll|il|li|ez|2)\b/i, '')
    .replace(/(?:[im]n?gl[eé]s|f[ií]sica|electr[oó]nica|electrotecnia)[nu]\s*$/i, (m) => m.slice(0, -1))
    .replace(/\s+(ul|ui)\s*$/i, '')
    .replace(/\s+[nu]\s*$/i, '')
    .replace(/\s+[il1|!]{1,3}\s*$/i, '')
    .trim();
}

function matchCatalogSubject(raw, catalog) {
  let cleanRaw = (raw || '').trim();
  if (cleanRaw.length < 2) return null;

  // 1. Direct check for "Física" and known OCR mistranslations (e.g. "TENE", "Fiscal", "Fsica", "Pisica")
  if (/\b(tene|fiscal|fsica|fisca|pisica|risica|tisica|t[eé]ne|f[ií]sca|flsica|flsical|f[ií]sica|fisica)\b/i.test(cleanRaw)) {
    const num = extractRomanNumeral(cleanRaw) || 'I';
    const target = `Física ${num}`;
    if (catalog.includes(target)) return target;
    return 'Física I';
  }

  // 2. Separate base name and Roman numeral for both raw and catalog entries
  const rawNumeral = extractRomanNumeral(cleanRaw);
  const rawBase = stripRomanNumeral(cleanRaw);
  const cRawBase = cleanStr(rawBase);
  const cRawFull = cleanStr(cleanRaw);

  let bestCand = null;
  let bestScore = -1;

  for (const item of catalog) {
    const itemNumeralMatch = item.match(/\s+(I|II|III|IV|V)$/);
    const itemNumeral = itemNumeralMatch ? itemNumeralMatch[1] : null;
    const itemBase = itemNumeral ? item.replace(/\s+(I|II|III|IV|V)$/, '') : item;
    const cItemBase = cleanStr(itemBase);
    const cItemFull = cleanStr(item);

    let score = 0;

    if (itemNumeral) {
      const exactBase = (cRawBase.length >= 3 && cRawBase === cItemBase);
      let baseSim = 0;
      if (exactBase) {
        baseSim = 1.0;
      } else {
        const dist = levenshtein(cRawBase, cItemBase);
        const maxLen = Math.max(cRawBase.length, cItemBase.length);
        baseSim = 1 - dist / maxLen;
        if (cRawBase.length >= 5 && cItemBase.includes(cRawBase)) {
          baseSim = Math.max(baseSim, cRawBase.length / cItemBase.length);
        }
        if (cItemBase.length >= 5 && cRawBase.includes(cItemBase)) {
          baseSim = Math.max(baseSim, cItemBase.length / cRawBase.length);
        }
      }

      if (baseSim > 0.45) {
        score = baseSim;
        if (rawNumeral) {
          if (rawNumeral === itemNumeral) {
            score += 0.5; // Strong match for matching Roman numeral
          } else {
            score -= 0.6; // Heavy penalty for mismatched Roman numeral
          }
        } else {
          if (itemNumeral === 'I') score += 0.05;
        }
      }
    } else {
      if (cRawFull === cItemFull) {
        score = 1.5;
      } else {
        if (cRawFull.length >= 6 && cItemFull.includes(cRawFull)) {
          score = Math.max(score, (cRawFull.length / cItemFull.length) * 1.1);
        }
        if (cItemFull.length >= 6 && cRawFull.includes(cItemFull)) {
          score = Math.max(score, (cItemFull.length / cRawFull.length) * 1.1);
        }
        const dist = levenshtein(cRawFull, cItemFull);
        const maxLen = Math.max(cRawFull.length, cItemFull.length);
        const sim = 1 - dist / maxLen;
        score = Math.max(score, sim);
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestCand = item;
    }
  }

  if (bestScore > 0.40) return bestCand;
  return null;
}

// ============================================================================

// Safe Visual Canvas Bounds (1080 x 1920)
// Guarantees that neither the header title nor the footer eagle are obstructed
// ============================================================================
const SAFE_BOUNDS = {
  TOP: 430,       // Ends below header title box (Y = 430 in template)
  BOTTOM: 1385,   // Eagle emblem starts at Y = 1474; guarantees clean breathing room
  HEIGHT: 955     // 1385 - 430 = 955px available vertical height
};

// ============================================================================
// State Management
// ============================================================================
const state = {
  currentMode: 'mesa', // 'mesa' | 'info' | 'paro'
  currentMobileView: 'edit', // 'edit' | 'preview'
  fontLoaded: false,

  pagination: {
    info: { currentPage: 1, totalPages: 1 },
    mesa: { currentPage: 1, totalPages: 1 },
    paro: { currentPage: 1, totalPages: 1 }
  },

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
    hasLoadedData: false,
    photoName: '',
    photoUrl: '',
    date: 'Martes 17/10',
    filterEsp: 'TODAS', // 'TODAS' | 'ISI' | 'IC' | 'IQ' | 'IE' | 'IM' | 'UDB'
    filterTurno: 'TODOS', // 'TODOS' | '1-Mañana' | '2-Tarde' | '3-Noche'
    distribMode: 'auto', // 'auto' | 'pages' | 'all'
    currentPage: 1,
    itemsPerPage: 45,
    columns: 'auto', // 'auto' | '1' | '2' | '3'
    yOffset: 0,
    scale: 1.0,
    casillas: []
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

  // Mesa Foto & Casillas Inputs
  mesaDate: document.getElementById('mesa-date'),
  mesaDropzone: document.getElementById('mesa-dropzone'),
  mesaFileInput: document.getElementById('mesa-file-input'),
  btnTriggerUploadMesa: document.getElementById('btn-trigger-upload-mesa'),
  mesaEngineBadge: document.getElementById('mesa-engine-badge'),
  mesaEngineText: document.getElementById('mesa-engine-text'),
  mesaUploadStatus: document.getElementById('mesa-upload-status'),
  mesaPreviewThumb: document.getElementById('mesa-preview-thumb'),
  mesaFileName: document.getElementById('mesa-file-name'),
  mesaDetectionBadge: document.getElementById('mesa-detection-badge'),
  mesaOcrProgressWrap: document.getElementById('mesa-ocr-progress-wrap'),
  mesaOcrProgress: document.getElementById('mesa-ocr-progress'),
  mesaOcrStatusText: document.getElementById('mesa-ocr-status-text'),
  btnSelectAllCasillas: document.getElementById('btn-select-all-casillas'),
  btnDeselectAllCasillas: document.getElementById('btn-deselect-all-casillas'),
  mesaFilterChips: document.getElementById('mesa-filter-chips'),
  mesaTurnoChips: document.getElementById('mesa-turno-chips'),
  btnAddCasilla: document.getElementById('btn-add-casilla'),
  mesaSelectedCount: document.getElementById('mesa-selected-count'),
  mesaCasillasContainer: document.getElementById('mesa-casillas-container'),
  btnDistribAuto: document.getElementById('btn-distrib-auto'),
  btnDistribPages: document.getElementById('btn-distrib-pages'),
  btnDistribAll: document.getElementById('btn-distrib-all'),
  distribHelperText: document.getElementById('distrib-helper-text'),
  mesaPaginationWrap: document.getElementById('mesa-pagination-wrap'),
  btnPrevPage: document.getElementById('btn-prev-page'),
  btnNextPage: document.getElementById('btn-next-page'),
  mesaPageInfo: document.getElementById('mesa-page-info'),
  mesaPagePills: document.getElementById('mesa-page-pills'),
  btnColsAuto: document.getElementById('btn-cols-auto'),
  btnCols1: document.getElementById('btn-cols-1'),
  btnCols2: document.getElementById('btn-cols-2'),
  btnCols3: document.getElementById('btn-cols-3'),
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
  captionPreviewText: document.getElementById('caption-preview-text'),
  btnCopyCaption: document.getElementById('btn-copy-caption'),
  storyPartsBar: document.getElementById('story-parts-bar'),
  storyPartsLabel: document.getElementById('story-parts-label'),
  storyPartsButtons: document.getElementById('story-parts-buttons'),

  // Bottom Actions
  btnDownload: document.getElementById('btn-download'),
  btnDownloadText: document.getElementById('btn-download-text'),
  btnDownloadAll: document.getElementById('btn-download-all'),
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
  renderMesaCasillasUI();
  syncFormToState();
  checkPythonOcrHealth();

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
// Mesa de Examen - Casillas UI Manager & OCR Extraction
// ============================================================================

function getCarreraColor(esp) {
  const e = (esp || '').toUpperCase().trim();
  if (e.includes('ISI')) return '#651c99'; // Purple UTN Sistemas
  if (e.includes('IC')) return '#00629b';  // Blue Civil
  if (e.includes('IQ')) return '#c24b00';  // Orange Quimica
  if (e.includes('IE')) return '#d97706';  // Amber Electromecánica
  if (e.includes('IM')) return '#b91c1c';  // Crimson Red Mecánica
  if (e.includes('UDB')) return '#008552'; // Green Basicas
  return '#4c1575';
}

function renderMesaCasillasUI() {
  if (!dom.mesaCasillasContainer) return;
  dom.mesaCasillasContainer.innerHTML = '';

  const allCasillas = state.mesa.casillas || [];
  const currentFilter = (state.mesa.filterEsp || 'TODAS').toUpperCase();
  const currentTurno = (state.mesa.filterTurno || 'TODOS').toUpperCase();

  // Filter casillas if specific carrera or turno is selected
  const displayedCasillas = allCasillas.filter(c => {
    if (currentFilter !== 'TODAS' && (c.esp || '').toUpperCase().trim() !== currentFilter) {
      return false;
    }
    if (currentTurno !== 'TODOS') {
      const cTurno = (c.turno || '').toUpperCase().trim();
      const searchTurno = currentTurno.replace('1-', '').replace('2-', '').replace('3-', '');
      if (!cTurno.includes(searchTurno)) {
        return false;
      }
    }
    return true;
  });

  const activeInFlyerCount = allCasillas.filter(c => {
    if (c.enabled === false) return false;
    if (currentFilter !== 'TODAS' && (c.esp || '').toUpperCase().trim() !== currentFilter) return false;
    if (currentTurno !== 'TODOS') {
      const cTurno = (c.turno || '').toUpperCase().trim();
      const searchTurno = currentTurno.replace('1-', '').replace('2-', '').replace('3-', '');
      if (!cTurno.includes(searchTurno)) return false;
    }
    return true;
  }).length;

  if (dom.mesaSelectedCount) {
    dom.mesaSelectedCount.textContent = `${activeInFlyerCount} de ${allCasillas.length} en flyer`;
  }
  if (dom.mesaDetectionBadge) {
    dom.mesaDetectionBadge.textContent = `${allCasillas.length} casillas`;
  }
  if (dom.mesaFileName && state.mesa.photoName) {
    dom.mesaFileName.textContent = state.mesa.photoName;
  }
  if (dom.mesaPreviewThumb && state.mesa.photoUrl) {
    dom.mesaPreviewThumb.src = state.mesa.photoUrl;
    if (dom.mesaUploadStatus) dom.mesaUploadStatus.classList.remove('hidden');
  }

  // Sync filter chips active state
  document.querySelectorAll('#mesa-filter-chips .chip-filter').forEach(chip => {
    chip.classList.toggle('active', chip.dataset.esp.toUpperCase() === currentFilter);
  });

  // Sync turno chips active state
  document.querySelectorAll('#mesa-turno-chips .chip-turno').forEach(chip => {
    chip.classList.toggle('active', chip.dataset.turno.toUpperCase() === currentTurno);
  });

  // Sync distribution mode buttons
  if (dom.btnDistribAuto) dom.btnDistribAuto.classList.toggle('active', state.mesa.distribMode === 'auto');
  if (dom.btnDistribPages) dom.btnDistribPages.classList.toggle('active', state.mesa.distribMode === 'pages');
  if (dom.btnDistribAll) dom.btnDistribAll.classList.toggle('active', state.mesa.distribMode === 'all');

  if (displayedCasillas.length === 0) {
    dom.mesaCasillasContainer.innerHTML = `
      <div class="casillas-empty-state">
        <p>No hay casillas cargadas para los filtros seleccionados.</p>
        <button type="button" class="btn-mini-add" id="btn-add-casilla-empty">+ Añadir Casilla Manual</button>
      </div>
    `;
    const btnEmptyAdd = document.getElementById('btn-add-casilla-empty');
    if (btnEmptyAdd) btnEmptyAdd.addEventListener('click', addCasillaManual);
    return;
  }

  displayedCasillas.forEach((casilla) => {
    const originalIndex = allCasillas.findIndex(c => c.id === casilla.id);
    const card = document.createElement('div');
    card.className = `casilla-edit-card ${casilla.enabled !== false ? 'is-enabled' : 'is-disabled'}`;
    card.dataset.id = casilla.id;

    const esp = casilla.esp || 'ISI';
    const espColor = getCarreraColor(esp);

    card.innerHTML = `
      <div class="casilla-card-header">
        <div class="casilla-header-left">
          <input type="checkbox" class="casilla-checkbox" data-id="${casilla.id}" ${casilla.enabled !== false ? 'checked' : ''} title="Activar/Desactivar en flyer">
          <span class="casilla-num-badge">#${originalIndex + 1}</span>
          <select class="casilla-esp-select" data-id="${casilla.id}" style="border-left: 3px solid ${espColor};">
            <option value="ISI" ${esp === 'ISI' ? 'selected' : ''}>ISI</option>
            <option value="IC" ${esp === 'IC' ? 'selected' : ''}>IC</option>
            <option value="IQ" ${esp === 'IQ' ? 'selected' : ''}>IQ</option>
            <option value="IE" ${esp === 'IE' ? 'selected' : ''}>IE</option>
            <option value="IM" ${esp === 'IM' ? 'selected' : ''}>IM</option>
            <option value="UDB" ${esp === 'UDB' ? 'selected' : ''}>UDB</option>
          </select>
        </div>
        <button type="button" class="btn-remove-casilla" data-id="${casilla.id}" title="Eliminar esta casilla">✕</button>
      </div>
      <div class="casilla-fields-row">
        <div class="field-item flex-grow">
          <label class="field-label-sm">Nombre de Materia</label>
          <input type="text" class="input-text casilla-materia-input font-bold" data-id="${casilla.id}" value="${casilla.materia || ''}" placeholder="Ej: Redes de Información">
        </div>
        <div class="field-item field-aula">
          <label class="field-label-sm">Aula</label>
          <input type="text" class="input-text casilla-aula-input text-center font-bold" data-id="${casilla.id}" value="${casilla.aula || ''}" placeholder="210">
        </div>
        <div class="field-item field-hora">
          <label class="field-label-sm">Horario</label>
          <input type="text" class="input-text casilla-hora-input text-center font-bold" data-id="${casilla.id}" value="${casilla.hora || ''}" placeholder="17:00">
        </div>
      </div>
    `;

    dom.mesaCasillasContainer.appendChild(card);
  });

  attachCasillasEventListeners();
}

function attachCasillasEventListeners() {
  if (!dom.mesaCasillasContainer) return;

  // Checkbox toggle
  dom.mesaCasillasContainer.querySelectorAll('.casilla-checkbox').forEach(chk => {
    chk.addEventListener('change', (e) => {
      const id = e.target.dataset.id;
      const target = state.mesa.casillas.find(c => c.id === id);
      if (target) {
        target.enabled = e.target.checked;
        const card = e.target.closest('.casilla-edit-card');
        if (card) {
          card.classList.toggle('is-enabled', target.enabled);
          card.classList.toggle('is-disabled', !target.enabled);
        }
        updateCasillaCounter();
        saveAndRender();
      }
    });
  });

  // Especialidad select
  dom.mesaCasillasContainer.querySelectorAll('.casilla-esp-select').forEach(sel => {
    sel.addEventListener('change', (e) => {
      const id = e.target.dataset.id;
      const target = state.mesa.casillas.find(c => c.id === id);
      if (target) {
        target.esp = e.target.value;
        e.target.style.borderLeft = `3px solid ${getCarreraColor(target.esp)}`;
        saveAndRender();
      }
    });
  });

  // Materia text input
  dom.mesaCasillasContainer.querySelectorAll('.casilla-materia-input').forEach(inp => {
    inp.addEventListener('input', (e) => {
      const id = e.target.dataset.id;
      const target = state.mesa.casillas.find(c => c.id === id);
      if (target) {
        target.materia = e.target.value;
        saveAndRender();
      }
    });
  });

  // Aula input
  dom.mesaCasillasContainer.querySelectorAll('.casilla-aula-input').forEach(inp => {
    inp.addEventListener('input', (e) => {
      const id = e.target.dataset.id;
      const target = state.mesa.casillas.find(c => c.id === id);
      if (target) {
        target.aula = e.target.value.trim();
        saveAndRender();
      }
    });
  });

  // Horario input
  dom.mesaCasillasContainer.querySelectorAll('.casilla-hora-input').forEach(inp => {
    inp.addEventListener('input', (e) => {
      const id = e.target.dataset.id;
      const target = state.mesa.casillas.find(c => c.id === id);
      if (target) {
        target.hora = e.target.value.trim();
        saveAndRender();
      }
    });
  });

  // Remove Casilla button
  dom.mesaCasillasContainer.querySelectorAll('.btn-remove-casilla').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = btn.dataset.id;
      const idx = state.mesa.casillas.findIndex(c => c.id === id);
      if (idx !== -1) {
        state.mesa.casillas.splice(idx, 1);
        renderMesaCasillasUI();
        saveAndRender();
        showToast('Casilla eliminada');
      }
    });
  });
}

function updateCasillaCounter() {
  const currentFilter = (state.mesa.filterEsp || 'TODAS').toUpperCase();
  const allCasillas = state.mesa.casillas || [];
  const activeInFlyerCount = allCasillas.filter(c => c.enabled !== false && (currentFilter === 'TODAS' || (c.esp || '').toUpperCase().trim() === currentFilter)).length;
  if (dom.mesaSelectedCount) {
    dom.mesaSelectedCount.textContent = `${activeInFlyerCount} de ${allCasillas.length} en flyer`;
  }
}

function addCasillaManual() {
  state.mesa.hasLoadedData = true;
  const newId = `c-${Date.now()}`;
  const espDefault = state.mesa.filterEsp === 'TODAS' ? 'ISI' : state.mesa.filterEsp;
  const newCasilla = {
    id: newId,
    enabled: true,
    esp: espDefault,
    aula: '301',
    materia: 'Nueva Materia',
    hora: '18:00',
    turno: 'Tarde'
  };

  state.mesa.casillas.push(newCasilla);
  renderMesaCasillasUI();
  saveAndRender();
  showToast('¡Casilla manual añadida! ✨');

  // Focus the newly added input
  setTimeout(() => {
    const card = dom.mesaCasillasContainer.querySelector(`[data-id="${newId}"]`);
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      const inp = card.querySelector('.casilla-materia-input');
      if (inp) {
        inp.focus();
        inp.select();
      }
    }
  }, 100);
}

function handleMesaFileUpload(file) {
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async (e) => {
    const dataUrl = e.target.result;
    state.mesa.photoName = file.name;
    state.mesa.photoUrl = dataUrl;

    if (dom.mesaPreviewThumb) dom.mesaPreviewThumb.src = dataUrl;
    if (dom.mesaFileName) dom.mesaFileName.textContent = file.name;
    if (dom.mesaUploadStatus) dom.mesaUploadStatus.classList.remove('hidden');

    // Run OCR extraction directly from uploaded user photo
    await performOcrOnImage(dataUrl, file);
  };
  reader.readAsDataURL(file);
}

let activeBackendBaseUrl = '';

function getCandidateBackendUrls() {
  const candidates = [];
  
  // 1. Manual override configured in localStorage
  const saved = localStorage.getItem('upl_ocr_backend_url');
  if (saved && saved.trim()) {
    candidates.push(saved.trim().replace(/\/+$/, ''));
  }

  // 2. Relative API path (ideal for Vercel deployment: https://.../api/health)
  candidates.push('');

  const hostname = window.location.hostname;
  // 3. Current host with port 8000 (if accessed from mobile on local Wi-Fi: http://192.168.x.x:5173)
  if (hostname && hostname !== 'localhost' && hostname !== '127.0.0.1') {
    if (/^(\d{1,3}\.){3}\d{1,3}$/.test(hostname)) {
      candidates.push(`http://${hostname}:8000`);
    }
  }

  // 4. Local loopback ports
  candidates.push('http://127.0.0.1:8000');
  candidates.push('http://localhost:8000');

  return [...new Set(candidates)];
}

function updateEngineBadge(isOnline, activeUrl = '') {
  const badge = dom.mesaEngineBadge || document.getElementById('mesa-engine-badge');
  const text = dom.mesaEngineText || document.getElementById('mesa-engine-text');
  if (!badge) return;
  if (isOnline) {
    badge.className = 'ocr-engine-badge online';
    const label = activeUrl === '' ? 'Python OCR: Nube ⚡' : 'Python OCR: Activo ⚡';
    if (text) text.textContent = label;
    badge.title = `Motor Python conectado (${activeUrl || 'Vercel API'}). Toca para ver detalles o cambiar servidor.`;
  } else {
    badge.className = 'ocr-engine-badge offline';
    if (text) text.textContent = 'Python OCR: Desconectado ⚠️';
    badge.title = 'Servidor desconectado. Toca para configurar la IP de tu PC o reconectar.';
  }
}

async function checkPythonOcrHealth() {
  const candidates = getCandidateBackendUrls();

  for (const base of candidates) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);
      const url = `${base}/api/health`;
      const res = await fetch(url, { method: 'GET', signal: controller.signal });
      clearTimeout(timeoutId);
      if (res.ok) {
        const data = await res.json().catch(() => null);
        if (data && data.status === 'ok') {
          activeBackendBaseUrl = base;
          updateEngineBadge(true, base);
          return true;
        }
      }
    } catch (e) {
      // continue testing candidates
    }
  }

  updateEngineBadge(false);
  return false;
}

function openBackendConfigPrompt() {
  const currentSaved = localStorage.getItem('upl_ocr_backend_url') || (activeBackendBaseUrl || 'http://127.0.0.1:8000');
  const isHttps = window.location.protocol === 'https:';
  const httpsWarning = isHttps
    ? '\n\n⚠️ NOTA HTTPS (Vercel): Los navegadores móviles bloquean "http://" por seguridad (Mixed Content).\n' +
      'Para usar OCR desde tu celular te recomendamos:\n' +
      '1. Abrir en el celular tu IP local por HTTP (ej: http://192.168.1.5:5173)\n' +
      '2. O ingresar una URL HTTPS segura (ej: ngrok, Cloudflare Tunnel o servicio en la nube).'
    : '';

  const userUrl = prompt(
    '⚙️ CONFIGURACIÓN DEL MOTOR PYTHON (OCR)\n\n' +
    '• Si estás en el celular y en la misma red Wi-Fi que tu PC, ingresa la IP de tu PC con puerto 8000 (ej: http://192.168.1.5:8000).\n' +
    '• Para restaurar la detección automática, deja el campo vacío o escribe un punto (.).' +
    httpsWarning,
    currentSaved
  );

  if (userUrl !== null) {
    const trimmed = userUrl.trim();
    if (trimmed === '' || trimmed === '.') {
      localStorage.removeItem('upl_ocr_backend_url');
      showToast('Configuración reiniciada a detección automática.');
    } else {
      let finalUrl = trimmed.replace(/\/+$/, '');
      if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
        finalUrl = `http://${finalUrl}`;
      }
      localStorage.setItem('upl_ocr_backend_url', finalUrl);
      showToast(`URL guardada: ${finalUrl}`);
    }
    checkPythonOcrHealth();
  }
}

async function performOcrOnImage(imageSource, file = null) {
  if (!dom.mesaOcrProgressWrap) {
    showToast('Procesando imagen...');
    return;
  }

  dom.mesaOcrProgressWrap.classList.remove('hidden');
  if (dom.mesaOcrProgress) dom.mesaOcrProgress.style.width = '20%';
  if (dom.mesaOcrStatusText) dom.mesaOcrStatusText.textContent = 'Conectando con motor Python (OpenCV + RapidOCR)...';

  try {
    let imageBlob = file;
    if (!imageBlob && imageSource) {
      if (imageSource.startsWith('data:') || imageSource.startsWith('blob:')) {
        const res = await fetch(imageSource);
        imageBlob = await res.blob();
      }
    }

    if (!imageBlob) {
      throw new Error('No se pudo obtener el archivo de la imagen.');
    }

    const formData = new FormData();
    formData.append('file', imageBlob, file?.name || 'mesa.png');

    if (dom.mesaOcrProgress) dom.mesaOcrProgress.style.width = '50%';
    if (dom.mesaOcrStatusText) dom.mesaOcrStatusText.textContent = 'Extrayendo materias con OpenCV + RapidOCR en Python...';

    // Verify or discover active URL
    if (!activeBackendBaseUrl) {
      await checkPythonOcrHealth();
    }

    const candidatesToTry = activeBackendBaseUrl
      ? [activeBackendBaseUrl, ...getCandidateBackendUrls().filter(u => u !== activeBackendBaseUrl)]
      : getCandidateBackendUrls();

    let pyData = null;

    for (const base of candidatesToTry) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 20000);
        const endpoint = `${base}/api/ocr-mesa`;
        const res = await fetch(endpoint, {
          method: 'POST',
          body: formData,
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          if (data && data.success && Array.isArray(data.casillas) && data.casillas.length > 0) {
            activeBackendBaseUrl = base;
            pyData = data;
            break;
          }
        }
      } catch (err) {
        // try next candidate
      }
    }

    if (pyData && pyData.success && Array.isArray(pyData.casillas) && pyData.casillas.length > 0) {
      updateEngineBadge(true, activeBackendBaseUrl);
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
      showToast(`¡${pyData.casillas.length} materias extraídas exitosamente con Python! ⚡`);
      return;
    } else {
      throw new Error('No se pudo conectar con el motor Python en ningún endpoint.');
    }
  } catch (err) {
    console.error('Error al procesar OCR con Python:', err);
    updateEngineBadge(false);
    if (dom.mesaOcrProgressWrap) dom.mesaOcrProgressWrap.classList.add('hidden');
    state.mesa.hasLoadedData = true;
    renderMesaCasillasUI();
    saveAndRender();
    showToast('No se pudo conectar con el motor Python. Toca el botón de estado OCR para configurar la IP o inicia el servidor.', 'error');
  }
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
  // Mesa Exam Date Input
  if (dom.mesaDate) {
    dom.mesaDate.addEventListener('input', (e) => {
      state.mesa.date = e.target.value;
      const valUp = (e.target.value || '').toUpperCase();
      document.querySelectorAll('#mesa-quick-days .chip-item').forEach(b => {
        b.classList.toggle('active', valUp.includes(b.dataset.day));
      });
      saveAndRender();
    });
  }

  // Quick Days Chips for Mesa
  document.querySelectorAll('#mesa-quick-days .chip-item').forEach(chip => {
    chip.addEventListener('click', () => {
      const dayName = chip.dataset.day; // e.g. "MARTES"
      const formattedDay = dayName.charAt(0).toUpperCase() + dayName.slice(1).toLowerCase();
      const currentVal = (state.mesa.date || '').trim();
      const matchDate = currentVal.match(/\b\d{1,2}\/\d{1,2}\b|\b\d{1,2}\b/);
      const datePart = matchDate ? matchDate[0] : '17/10';
      state.mesa.date = `${formattedDay} ${datePart}`;
      if (dom.mesaDate) dom.mesaDate.value = state.mesa.date;
      document.querySelectorAll('#mesa-quick-days .chip-item').forEach(b => b.classList.remove('active'));
      chip.classList.add('active');
      saveAndRender();
    });
  });

  // Dropzone and file input
  if (dom.mesaDropzone) {
    dom.mesaDropzone.addEventListener('click', () => {
      if (dom.mesaFileInput) dom.mesaFileInput.click();
    });

    dom.mesaDropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dom.mesaDropzone.classList.add('drag-over');
    });

    dom.mesaDropzone.addEventListener('dragleave', () => {
      dom.mesaDropzone.classList.remove('drag-over');
    });

    dom.mesaDropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dom.mesaDropzone.classList.remove('drag-over');
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleMesaFileUpload(e.dataTransfer.files[0]);
      }
    });
  }

  if (dom.btnTriggerUploadMesa) {
    dom.btnTriggerUploadMesa.addEventListener('click', () => {
      if (dom.mesaFileInput) dom.mesaFileInput.click();
    });
  }

  if (dom.mesaEngineBadge) {
    dom.mesaEngineBadge.addEventListener('click', openBackendConfigPrompt);
  }

  if (dom.mesaFileInput) {
    dom.mesaFileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        handleMesaFileUpload(e.target.files[0]);
      }
    });
  }

  // Filter chips (TODAS, ISI, IC, IQ, IE, IM, UDB)
  document.querySelectorAll('#mesa-filter-chips .chip-filter').forEach(chip => {
    chip.addEventListener('click', () => {
      const esp = chip.dataset.esp;
      state.mesa.filterEsp = esp;
      state.mesa.currentPage = 1;
      state.pagination.mesa.currentPage = 1;
      renderMesaCasillasUI();
      saveAndRender();
      showToast(`Filtrado por carrera: ${esp}`);
    });
  });

  // Turno chips (TODOS, 1-Mañana, 2-Tarde, 3-Noche)
  document.querySelectorAll('#mesa-turno-chips .chip-turno').forEach(chip => {
    chip.addEventListener('click', () => {
      const turno = chip.dataset.turno;
      state.mesa.filterTurno = turno;
      state.mesa.currentPage = 1;
      state.pagination.mesa.currentPage = 1;
      renderMesaCasillasUI();
      saveAndRender();
      showToast(`Filtrado por turno: ${turno}`);
    });
  });

  // Distribution Mode (Auto, Dividir en Partes, Todo en 1 Historia)
  function setDistribMode(mode) {
    state.mesa.distribMode = mode;
    state.mesa.currentPage = 1;
    state.pagination.mesa.currentPage = 1;
    if (mode === 'all') {
      state.mesa.itemsPerPage = 45;
    } else if (mode === 'pages' && (state.mesa.itemsPerPage || 45) >= 45) {
      state.mesa.itemsPerPage = 20;
    }
    if (dom.btnDistribAuto) dom.btnDistribAuto.classList.toggle('active', mode === 'auto');
    if (dom.btnDistribPages) dom.btnDistribPages.classList.toggle('active', mode === 'pages');
    if (dom.btnDistribAll) dom.btnDistribAll.classList.toggle('active', mode === 'all');
    if (dom.distribHelperText) {
      if (mode === 'pages') dom.distribHelperText.textContent = 'Forzado: se divide en historias HD según el límite de materias.';
      else if (mode === 'all') dom.distribHelperText.textContent = 'Forzado: todas las materias en 1 historia sin cortar.';
      else dom.distribHelperText.textContent = 'Optimiza automáticamente la cantidad de historias según las materias seleccionadas.';
    }
    document.querySelectorAll('.btn-density').forEach(b => {
      b.classList.toggle('active', parseInt(b.dataset.density, 10) === (state.mesa.itemsPerPage || 45));
    });
    saveAndRender();
  }

  if (dom.btnDistribAuto) dom.btnDistribAuto.addEventListener('click', () => setDistribMode('auto'));
  if (dom.btnDistribPages) dom.btnDistribPages.addEventListener('click', () => setDistribMode('pages'));
  if (dom.btnDistribAll) dom.btnDistribAll.addEventListener('click', () => setDistribMode('all'));

  // Editor Pagination controls
  if (dom.btnPrevPage) {
    dom.btnPrevPage.addEventListener('click', () => {
      if (state.pagination.mesa.currentPage > 1) {
        state.pagination.mesa.currentPage--;
        state.mesa.currentPage = state.pagination.mesa.currentPage;
        saveAndRender();
      }
    });
  }
  if (dom.btnNextPage) {
    dom.btnNextPage.addEventListener('click', () => {
      if (state.pagination.mesa.currentPage < state.pagination.mesa.totalPages) {
        state.pagination.mesa.currentPage++;
        state.mesa.currentPage = state.pagination.mesa.currentPage;
        saveAndRender();
      }
    });
  }

  // Density buttons (15, 20, 30, 45 materias por historia)
  document.querySelectorAll('.btn-density').forEach(btn => {
    btn.addEventListener('click', () => {
      const density = parseInt(btn.dataset.density, 10);
      state.mesa.itemsPerPage = density;
      if (density < 45 && state.mesa.distribMode === 'all') {
        state.mesa.distribMode = 'auto';
        if (dom.btnDistribAuto) dom.btnDistribAuto.classList.add('active');
        if (dom.btnDistribAll) dom.btnDistribAll.classList.remove('active');
        if (dom.btnDistribPages) dom.btnDistribPages.classList.remove('active');
      }
      document.querySelectorAll('.btn-density').forEach(b => {
        b.classList.toggle('active', parseInt(b.dataset.density, 10) === density);
      });
      state.mesa.currentPage = 1;
      state.pagination.mesa.currentPage = 1;
      saveAndRender();
      showToast(`Materias por historia: ${density} 📋`);
    });
  });

  // Select all / Deselect all casillas
  if (dom.btnSelectAllCasillas) {
    dom.btnSelectAllCasillas.addEventListener('click', () => {
      const currentFilter = (state.mesa.filterEsp || 'TODAS').toUpperCase();
      const currentTurno = (state.mesa.filterTurno || 'TODOS').toUpperCase();
      (state.mesa.casillas || []).forEach(c => {
        let matchEsp = (currentFilter === 'TODAS' || (c.esp || '').toUpperCase().trim() === currentFilter);
        let matchTurno = (currentTurno === 'TODOS' || (c.turno || '').toUpperCase().includes(currentTurno.replace('1-', '').replace('2-', '').replace('3-', '')));
        if (matchEsp && matchTurno) {
          c.enabled = true;
        }
      });
      renderMesaCasillasUI();
      saveAndRender();
      showToast('Todas las casillas visibles activadas');
    });
  }

  if (dom.btnDeselectAllCasillas) {
    dom.btnDeselectAllCasillas.addEventListener('click', () => {
      const currentFilter = (state.mesa.filterEsp || 'TODAS').toUpperCase();
      const currentTurno = (state.mesa.filterTurno || 'TODOS').toUpperCase();
      (state.mesa.casillas || []).forEach(c => {
        let matchEsp = (currentFilter === 'TODAS' || (c.esp || '').toUpperCase().trim() === currentFilter);
        let matchTurno = (currentTurno === 'TODOS' || (c.turno || '').toUpperCase().includes(currentTurno.replace('1-', '').replace('2-', '').replace('3-', '')));
        if (matchEsp && matchTurno) {
          c.enabled = false;
        }
      });
      renderMesaCasillasUI();
      saveAndRender();
      showToast('Todas las casillas visibles desactivadas');
    });
  }

  // Add Casilla Manual
  if (dom.btnAddCasilla) {
    dom.btnAddCasilla.addEventListener('click', addCasillaManual);
  }

  // Column layout buttons
  function setMesaCols(cols) {
    state.mesa.columns = cols;
    if (dom.btnColsAuto) dom.btnColsAuto.classList.toggle('active', cols === 'auto');
    if (dom.btnCols1) dom.btnCols1.classList.toggle('active', cols === '1');
    if (dom.btnCols2) dom.btnCols2.classList.toggle('active', cols === '2');
    if (dom.btnCols3) dom.btnCols3.classList.toggle('active', cols === '3');
    saveAndRender();
  }

  if (dom.btnColsAuto) dom.btnColsAuto.addEventListener('click', () => setMesaCols('auto'));
  if (dom.btnCols1) dom.btnCols1.addEventListener('click', () => setMesaCols('1'));
  if (dom.btnCols2) dom.btnCols2.addEventListener('click', () => setMesaCols('2'));
  if (dom.btnCols3) dom.btnCols3.addEventListener('click', () => setMesaCols('3'));

  // Sliders for Casillas on Canvas
  if (dom.mesaYOffset) {
    dom.mesaYOffset.addEventListener('input', (e) => {
      state.mesa.yOffset = parseInt(e.target.value, 10);
      if (dom.mesaYVal) dom.mesaYVal.textContent = `${state.mesa.yOffset}px`;
      saveAndRender();
    });
  }

  if (dom.mesaScale) {
    dom.mesaScale.addEventListener('input', (e) => {
      state.mesa.scale = parseInt(e.target.value, 10) / 100;
      if (dom.mesaScaleVal) dom.mesaScaleVal.textContent = `${e.target.value}%`;
      saveAndRender();
    });
  }

  if (dom.btnResetMesaAdj) {
    dom.btnResetMesaAdj.addEventListener('click', () => {
      state.mesa.yOffset = 0;
      state.mesa.scale = 1.0;
      state.mesa.columns = 'auto';
      syncFormToState();
      saveAndRender();
      showToast('Ajustes de casillas restablecidos');
    });
  }

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
  if (dom.btnDownloadAll) dom.btnDownloadAll.addEventListener('click', downloadAllPages);
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

  if (mode === 'mesa') {
    checkPythonOcrHealth();
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
  const mode = state.currentMode || 'mesa';
  dom.tabMesa.classList.toggle('active', mode === 'mesa');
  dom.tabMesa.setAttribute('aria-selected', mode === 'mesa' ? 'true' : 'false');
  dom.tabInfo.classList.toggle('active', mode === 'info');
  dom.tabInfo.setAttribute('aria-selected', mode === 'info' ? 'true' : 'false');
  dom.tabParo.classList.toggle('active', mode === 'paro');
  dom.tabParo.setAttribute('aria-selected', mode === 'paro' ? 'true' : 'false');

  dom.formMesa.classList.toggle('active', mode === 'mesa');
  dom.formInfo.classList.toggle('active', mode === 'info');
  dom.formParo.classList.toggle('active', mode === 'paro');

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
  if (dom.mesaDate) {
    dom.mesaDate.value = state.mesa.date !== undefined ? state.mesa.date : 'Martes 17/10';
  }
  if (dom.mesaYOffset) {
    dom.mesaYOffset.value = state.mesa.yOffset || 0;
    if (dom.mesaYVal) dom.mesaYVal.textContent = `${state.mesa.yOffset || 0}px`;
  }
  if (dom.mesaScale) {
    dom.mesaScale.value = Math.round((state.mesa.scale || 1.0) * 100);
    if (dom.mesaScaleVal) dom.mesaScaleVal.textContent = `${Math.round((state.mesa.scale || 1.0) * 100)}%`;
  }
  const cols = state.mesa.columns || 'auto';
  if (dom.btnColsAuto) dom.btnColsAuto.classList.toggle('active', cols === 'auto');
  if (dom.btnCols1) dom.btnCols1.classList.toggle('active', cols === '1');
  if (dom.btnCols2) dom.btnCols2.classList.toggle('active', cols === '2');
  if (dom.btnCols3) dom.btnCols3.classList.toggle('active', cols === '3');
  renderMesaCasillasUI();

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
    renderMesaCasillasUI();
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
    state.mesa.hasLoadedData = false;
    state.mesa.casillas = [];
    state.mesa.photoName = '';
    state.mesa.photoUrl = '';
    state.mesa.date = 'Martes 17/10';
    state.mesa.filterEsp = 'TODAS';
    state.mesa.filterTurno = 'TODOS';
    state.mesa.searchQuery = '';
    state.mesa.columns = 'auto';
    state.mesa.yOffset = 0;
    state.mesa.scale = 1.0;
    if (dom.mesaUploadStatus) dom.mesaUploadStatus.classList.add('hidden');
    renderMesaCasillasUI();
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
      if (!state.mesa.date) {
        state.mesa.date = 'Martes 17/10';
      }
      if (parsed.paro) {
        if (parsed.paro.day && (!parsed.paro.days || parsed.paro.days.length === 0)) {
          parsed.paro.days = [{ day: parsed.paro.day, date: parsed.paro.date || '' }];
        }
        Object.assign(state.paro, parsed.paro);
      }
      if (parsed.currentMode) state.currentMode = parsed.currentMode;
      else state.currentMode = 'mesa';
    } else {
      state.currentMode = 'mesa';
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
  if (!state.mesa.casillas || !Array.isArray(state.mesa.casillas)) {
    state.mesa.casillas = [];
  }
  // Clear any residual sample data from previous demo sessions in localStorage
  if (state.mesa.photoUrl && (state.mesa.photoUrl.includes('foto-mesa-ejemplo') || (state.mesa.photoName && state.mesa.photoName.includes('ejemplo')) || (state.mesa.photoName && state.mesa.photoName.includes('(con sello)')))) {
    state.mesa.hasLoadedData = false;
    state.mesa.casillas = [];
    state.mesa.photoName = '';
    state.mesa.photoUrl = '';
  }
  state.mesa.hasLoadedData = state.mesa.casillas.length > 0;
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

function drawPageBadge(context, currentPage, totalPages, extraLabel = '') {
  if (totalPages <= 1) return;
  context.save();
  const text = `PARTE ${currentPage} DE ${totalPages}${extraLabel ? ' • ' + extraLabel.toUpperCase() : ''}`;
  context.font = '800 20px "Montserrat", sans-serif';
  const textW = context.measureText(text).width;
  const badgeW = Math.max(340, textW + 48);
  const badgeH = 38;
  const badgeX = (1080 - badgeW) / 2;
  const badgeY = 478;

  // Dark glass capsule background so it is ultra visible over any background
  context.fillStyle = 'rgba(17, 6, 32, 0.75)';
  roundRect(context, badgeX, badgeY, badgeW, badgeH, 19);
  context.fill();

  context.strokeStyle = 'rgba(255, 255, 255, 0.45)';
  context.lineWidth = 1.5;
  roundRect(context, badgeX, badgeY, badgeW, badgeH, 19);
  context.stroke();

  // Amber indicator dot
  const dotX = badgeX + 20;
  const dotY = badgeY + badgeH / 2;
  context.fillStyle = '#f59e0b';
  context.beginPath();
  context.arc(dotX, dotY, 4.5, 0, Math.PI * 2);
  context.fill();

  // Text inside badge
  context.fillStyle = '#ffffff';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(text, 540 + 6, badgeY + badgeH / 2);
  context.restore();
}

function updateStoryPartsUI() {
  const currentMode = state.currentMode;
  const pag = state.pagination[currentMode] || { currentPage: 1, totalPages: 1 };
  const totalPages = pag.totalPages || 1;
  const currentPage = Math.min(Math.max(1, pag.currentPage || 1), totalPages);
  pag.currentPage = currentPage;

  if (totalPages > 1) {
    if (dom.storyPartsBar) {
      dom.storyPartsBar.classList.remove('hidden');
      if (dom.storyPartsLabel) {
        dom.storyPartsLabel.textContent = `Contenido repartido en ${totalPages} historias HD`;
      }
    }

    if (dom.storyPartsButtons) {
      dom.storyPartsButtons.innerHTML = '';
      for (let p = 1; p <= totalPages; p++) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `btn-part-switch ${p === currentPage ? 'active' : ''}`;
        btn.dataset.page = p;
        btn.textContent = `Historia ${p} (Parte ${p}/${totalPages})`;
        btn.addEventListener('click', () => {
          state.pagination[state.currentMode].currentPage = p;
          if (state.currentMode === 'mesa') {
            state.mesa.currentPage = p;
          }
          saveAndRender();
        });
        dom.storyPartsButtons.appendChild(btn);
      }
    }

    if (dom.btnDownloadText) {
      dom.btnDownloadText.textContent = `Descargar Historia ${currentPage} HD`;
    }
    if (dom.btnDownloadAll) {
      dom.btnDownloadAll.classList.remove('hidden');
      const allSpan = dom.btnDownloadAll.querySelector('span');
      if (allSpan) {
        allSpan.textContent = totalPages === 2 
          ? 'Descargar Ambas Historias (2 PNGs HD)' 
          : `Descargar Todas las Historias (${totalPages} PNGs HD)`;
      }
    }
  } else {
    if (dom.storyPartsBar) {
      dom.storyPartsBar.classList.add('hidden');
    }
    if (dom.btnDownloadText) {
      dom.btnDownloadText.textContent = 'Descargar Historia HD';
    }
    if (dom.btnDownloadAll) {
      dom.btnDownloadAll.classList.add('hidden');
    }
  }

  // Update mesa editor pagination bar if in mesa mode
  if (dom.mesaPaginationWrap) {
    if (state.currentMode === 'mesa' && totalPages > 1) {
      dom.mesaPaginationWrap.classList.remove('hidden');
      if (dom.mesaPageInfo) dom.mesaPageInfo.textContent = `Historia ${currentPage} de ${totalPages}`;
      if (dom.btnPrevPage) dom.btnPrevPage.disabled = (currentPage <= 1);
      if (dom.btnNextPage) dom.btnNextPage.disabled = (currentPage >= totalPages);
      if (dom.mesaPagePills) {
        dom.mesaPagePills.innerHTML = '';
        for (let p = 1; p <= totalPages; p++) {
          const pill = document.createElement('button');
          pill.type = 'button';
          pill.className = `page-pill ${p === currentPage ? 'active' : ''}`;
          pill.textContent = `H${p}`;
          pill.addEventListener('click', () => {
            state.pagination.mesa.currentPage = p;
            state.mesa.currentPage = p;
            saveAndRender();
          });
          dom.mesaPagePills.appendChild(pill);
        }
      }
    } else {
      dom.mesaPaginationWrap.classList.add('hidden');
    }
  }

  // Always keep density buttons active state in sync
  const curDensity = state.mesa.itemsPerPage || 45;
  document.querySelectorAll('.btn-density').forEach(b => {
    b.classList.toggle('active', parseInt(b.dataset.density, 10) === curDensity);
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

  // Strict visual safety bounds: prevent ANY text or card from covering the header title or footer eagle
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, SAFE_BOUNDS.TOP - 5, width, (SAFE_BOUNDS.BOTTOM - SAFE_BOUNDS.TOP) + 10);
  ctx.clip();

  // 2. Render Text Content based on currentMode
  if (state.currentMode === 'info') {
    renderBlockBasedContent(ctx, width, height, state.info);
  } else if (state.currentMode === 'mesa') {
    renderMesaCasillasContent(ctx, width, height);
  } else {
    renderParoContent(ctx, width, height);
  }

  ctx.restore();

  // Update story navigation bar and download buttons for multi-story
  updateStoryPartsUI();
}

/**
 * Render Casillas Blancas for MESA DE EXAMEN
 * Places clean, modern white cards with subject, classroom, time and career badges
 */
function renderMesaCasillasContent(context, width, height) {
  const currentFilter = (state.mesa.filterEsp || 'TODAS').toUpperCase();
  const currentTurno = (state.mesa.filterTurno || 'TODOS').toUpperCase();
  const allCasillas = state.mesa.casillas || [];

  const activeCasillas = allCasillas.filter(c => {
    if (c.enabled === false) return false;
    if (currentFilter !== 'TODAS' && (c.esp || '').toUpperCase().trim() !== currentFilter) {
      return false;
    }
    if (currentTurno !== 'TODOS') {
      const cTurno = (c.turno || '').toUpperCase().trim();
      const searchTurno = currentTurno.replace('1-', '').replace('2-', '').replace('3-', '');
      if (!cTurno.includes(searchTurno)) {
        return false;
      }
    }
    return true;
  });

  // Determine pagination: based on distribMode and itemsPerPage (Materias por historia)
  let totalPages = 1;
  const itemsPerPage = state.mesa.itemsPerPage || 45;

  if (state.mesa.distribMode === 'all') {
    totalPages = 1;
  } else if (state.mesa.distribMode === 'pages') {
    if (itemsPerPage < 45) {
      totalPages = Math.max(2, Math.ceil(activeCasillas.length / itemsPerPage));
    } else {
      totalPages = Math.max(2, Math.ceil(activeCasillas.length / 22));
    }
  } else {
    // Auto mode: divided strictly by itemsPerPage selected by the user!
    totalPages = Math.max(1, Math.ceil(activeCasillas.length / itemsPerPage));
  }

  state.pagination.mesa.totalPages = totalPages;
  const currentPage = Math.min(Math.max(1, state.pagination.mesa.currentPage || 1), totalPages);
  state.pagination.mesa.currentPage = currentPage;
  state.mesa.currentPage = currentPage;

  let pageCasillas = activeCasillas;
  if (totalPages > 1) {
    let perPage = itemsPerPage;
    if (state.mesa.distribMode === 'pages' && itemsPerPage >= 45) {
      perPage = Math.ceil(activeCasillas.length / totalPages);
    }
    const startIdx = (currentPage - 1) * perPage;
    pageCasillas = activeCasillas.slice(startIdx, startIdx + perPage);
  }

  const scale = state.mesa.scale || 1.0;
  let startY = 485 + (state.mesa.yOffset || 0);

  // If the user has not loaded or entered exam data yet, do not render the story cards
  if (!state.mesa.hasLoadedData || activeCasillas.length === 0) {
    context.save();
    const boxX = 120;
    const boxY = 600;
    const boxW = 840;
    const boxH = 440;

    context.fillStyle = 'rgba(255, 255, 255, 0.10)';
    roundRect(context, boxX, boxY, boxW, boxH, 24);
    context.fill();

    context.strokeStyle = 'rgba(255, 255, 255, 0.35)';
    context.lineWidth = 2.5;
    context.setLineDash([12, 10]);
    roundRect(context, boxX, boxY, boxW, boxH, 24);
    context.stroke();
    context.setLineDash([]);

    // Icon
    context.font = '68px "Montserrat", sans-serif';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('📸', 540, boxY + 110);

    // Title
    context.fillStyle = '#ffffff';
    context.font = '800 32px "Montserrat", sans-serif';
    context.fillText('PLANILLA DE EXÁMENES', 540, boxY + 195);

    // Instructions
    context.fillStyle = 'rgba(255, 255, 255, 0.82)';
    context.font = '600 22px "Montserrat", sans-serif';
    context.fillText('Sube una foto o planilla en el editor para', 540, boxY + 260);
    context.fillText('generar las materias en casillas blancas', 540, boxY + 298);

    // Formats supported hint
    context.fillStyle = 'rgba(255, 255, 255, 0.6)';
    context.font = '500 18px "Montserrat", sans-serif';
    context.fillText('Formatos: PNG, JPG, WEBP o capturas de pantalla', 540, boxY + 360);

    context.restore();
    return;
  }

  // Plain text title for Exam Date (Between Header and Subject Cards)
  if (state.mesa.date && state.mesa.date.trim()) {
    let dateText = state.mesa.date.trim().toUpperCase();
    if (totalPages > 1) {
      dateText += ` • PARTE ${currentPage}/${totalPages}`;
    }
    const dateFontSize = Math.round(34 * scale);
    const dateY = 464 + (state.mesa.yOffset || 0);

    context.save();
    context.fillStyle = '#ffffff';
    context.font = `800 ${dateFontSize}px "Montserrat", sans-serif`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.shadowColor = 'rgba(0, 0, 0, 0.6)';
    context.shadowBlur = 8;
    context.shadowOffsetY = 2;
    drawTextWithSpacing(context, dateText, width / 2, dateY, 2.0, 'center');
    context.restore();

    startY = dateY + Math.round(30 * scale);
  }

  // Available vertical height strictly bounded well before the eagle (Eagle starts at Y = 1474)
  const maxBottom = SAFE_BOUNDS.BOTTOM - 10; // 1370px, leaving 104px of breathing room!
  const availH = Math.max(200, maxBottom - startY);

  // Determine Columns: 'auto' | '1' | '2' | '3'
  let numCols = 2;
  if (state.mesa.columns === '1') {
    numCols = 1;
  } else if (state.mesa.columns === '2') {
    numCols = 2;
  } else if (state.mesa.columns === '3') {
    numCols = 3;
  } else {
    // Auto mode: choose optimal columns so cards fit and fill vertical space
    // <= 8 subjects: 1 column
    // <= 22 subjects: 2 columns
    // > 22 subjects: 3 columns (e.g. 45 subjects in 15 rows fit in 1 story)
    numCols = pageCasillas.length <= 8 ? 1 : (pageCasillas.length <= 22 ? 2 : 3);
  }

  if (numCols === 1) {
    // Single Column Layout (Clean full-width cards with adaptive height & typography)
    const count = pageCasillas.length;
    const cardW = Math.round(940 * scale);
    const cardX = Math.round((width - cardW) / 2);

    let targetGap = count <= 5 ? 18 : (count <= 8 ? 14 : 10);
    const gapY = targetGap * scale;
    const maxCardH = 125 * scale;
    const rawH = Math.floor((availH - (count - 1) * gapY) / count);
    const cardH = Math.max(76 * scale, Math.min(maxCardH, rawH));

    const totalBlockH = (count - 1) * gapY + count * cardH;
    const extraH = availH - totalBlockH;
    if (extraH > 30 && extraH < 500) {
      startY += Math.round(Math.min(180, extraH * 0.25));
    }

    pageCasillas.forEach((c, i) => {
      const cardY = startY + i * (cardH + gapY);
      const espColor = getCarreraColor(c.esp);

      // Card Shadow & White Background
      context.save();
      context.shadowColor = 'rgba(0, 0, 0, 0.22)';
      context.shadowBlur = 10 * scale;
      context.shadowOffsetY = 4 * scale;
      context.fillStyle = '#ffffff';
      roundRect(context, cardX, cardY, cardW, cardH, 16 * scale);
      context.fill();
      context.restore();

      // Left Color Accent Strip
      context.save();
      context.fillStyle = espColor;
      roundRect(context, cardX, cardY, 8 * scale, cardH, 4 * scale);
      context.fill();
      context.restore();

      // Badge Especialidad (ISI, IC, etc.)
      const pillH = Math.min(38 * scale, Math.max(26 * scale, Math.round(cardH * 0.36)));
      const pillY = cardY + Math.round((cardH - pillH) / 2);
      const pillX = cardX + Math.round(22 * scale);

      context.save();
      const espFontSize = Math.min(20 * scale, Math.max(14 * scale, Math.round(pillH * 0.55)));
      context.font = `800 ${espFontSize}px "Montserrat", sans-serif`;
      const espText = (c.esp || 'ISI').toUpperCase();
      const espTextW = context.measureText(espText).width;
      const pillW = Math.max(Math.round(65 * scale), espTextW + Math.round(20 * scale));

      context.fillStyle = espColor;
      roundRect(context, pillX, pillY, pillW, pillH, 8 * scale);
      context.fill();

      context.fillStyle = '#ffffff';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(espText, pillX + pillW / 2, pillY + pillH / 2);
      context.restore();

      // Badge Aula
      const aulaX = pillX + pillW + Math.round(14 * scale);
      context.save();
      const aulaFontSize = Math.min(18 * scale, Math.max(13 * scale, Math.round(pillH * 0.52)));
      context.font = `800 ${aulaFontSize}px "Montserrat", sans-serif`;
      const aulaText = `AULA ${c.aula || 'TBA'}`.toUpperCase();
      const aulaTextW = context.measureText(aulaText).width;
      const aulaPillW = aulaTextW + Math.round(22 * scale);

      context.fillStyle = '#f3e8ff';
      roundRect(context, aulaX, pillY, aulaPillW, pillH, 8 * scale);
      context.fill();

      context.fillStyle = '#4c1575';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(aulaText, aulaX + aulaPillW / 2, pillY + pillH / 2);
      context.restore();

      // Horario (Right aligned - BIG & BOLD)
      const horaPillW = Math.round(155 * scale);
      const horaX = cardX + cardW - horaPillW - Math.round(20 * scale);

      context.save();
      context.fillStyle = '#faf5ff';
      context.strokeStyle = '#d8b4fe';
      context.lineWidth = 1.5 * scale;
      roundRect(context, horaX, pillY, horaPillW, pillH, 8 * scale);
      context.fill();
      context.stroke();

      context.fillStyle = '#4a044e';
      const horaFontSize = Math.min(22 * scale, Math.max(16 * scale, Math.round(cardH * 0.25)));
      context.font = `800 ${horaFontSize}px "Montserrat", sans-serif`;
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(`⏰ ${c.hora || '18:00'} hs`, horaX + horaPillW / 2, pillY + pillH / 2);
      context.restore();

      // Materia Name (Middle text)
      const textLeft = aulaX + aulaPillW + Math.round(18 * scale);
      const textMaxW = horaX - textLeft - Math.round(16 * scale);

      context.save();
      context.fillStyle = '#0f0322';
      const materiaFontSize = Math.min(26 * scale, Math.max(18 * scale, Math.round(cardH * 0.28)));
      context.font = `800 ${materiaFontSize}px "Montserrat", sans-serif`;
      context.textAlign = 'left';
      context.textBaseline = 'middle';

      let materiaStr = c.materia || 'Materia';
      while (context.measureText(materiaStr).width > textMaxW && materiaStr.length > 3) {
        materiaStr = materiaStr.slice(0, -2).trim();
      }
      if (materiaStr !== c.materia) materiaStr += '...';

      context.fillText(materiaStr, textLeft, cardY + cardH / 2);
      context.restore();
    });
  } else if (numCols === 3) {
    // 3-Column Grid Layout (Optimized for 45 subjects in 1 story, and adapts for fewer)
    const rows = Math.ceil(pageCasillas.length / 3);
    
    // Adaptive gaps & card height
    let targetGap;
    if (rows <= 5) targetGap = 16;
    else if (rows <= 8) targetGap = 12;
    else if (rows <= 11) targetGap = 8;
    else if (rows <= 13) targetGap = 6;
    else targetGap = 4;
    const gapY = targetGap * scale;

    const gapX = Math.round(12 * scale);
    const cardW = Math.round(314 * scale);
    const totalColsW = 3 * cardW + 2 * gapX;
    const col0X = Math.round((width - totalColsW) / 2);
    const col1X = col0X + cardW + gapX;
    const col2X = col1X + cardW + gapX;

    const maxCardH = 100 * scale;
    const rawH = Math.floor((availH - (rows - 1) * gapY) / rows);
    const cardH = Math.max(52 * scale, Math.min(maxCardH, rawH));

    const totalBlockH = (rows - 1) * gapY + rows * cardH;
    const extraH = availH - totalBlockH;
    if (extraH > 30 && extraH < 500) {
      startY += Math.round(Math.min(180, extraH * 0.25));
    }

    pageCasillas.forEach((c, i) => {
      const col = i % 3;
      const row = Math.floor(i / 3);
      const cardX = col === 0 ? col0X : (col === 1 ? col1X : col2X);
      const cardY = startY + row * (cardH + gapY);
      const espColor = getCarreraColor(c.esp);

      // Card Background & Drop Shadow
      context.save();
      context.shadowColor = 'rgba(0, 0, 0, 0.20)';
      context.shadowBlur = Math.max(4, Math.round(6 * scale));
      context.shadowOffsetY = Math.max(1, Math.round(2 * scale));
      context.fillStyle = '#ffffff';
      roundRect(context, cardX, cardY, cardW, cardH, Math.max(6, Math.round(10 * scale)));
      context.fill();
      context.restore();

      // Left Accent Strip
      context.save();
      context.fillStyle = espColor;
      roundRect(context, cardX, cardY, Math.max(4, Math.round(5 * scale)), cardH, 3 * scale);
      context.fill();
      context.restore();

      // --- ROW 1: Materia Name (HERO TEXT - Prominent & Bold) ---
      const materiaX = cardX + Math.max(8, Math.round(10 * scale));
      const materiaY = cardY + Math.round(cardH * 0.32);
      const materiaMaxW = cardW - Math.max(14, Math.round(18 * scale));
      const materiaFontSize = Math.min(21 * scale, Math.max(13 * scale, Math.round(cardH * 0.255)));

      context.save();
      context.fillStyle = '#0f0322';
      context.font = `800 ${materiaFontSize}px "Montserrat", sans-serif`;
      context.textAlign = 'left';
      context.textBaseline = 'middle';

      let materiaStr = c.materia || 'Materia';
      while (context.measureText(materiaStr).width > materiaMaxW && materiaStr.length > 3) {
        materiaStr = materiaStr.slice(0, -2).trim();
      }
      if (materiaStr !== c.materia) materiaStr += '...';

      context.fillText(materiaStr, materiaX, materiaY);
      context.restore();

      // --- ROW 2: Especialidad + Aula + Horario ---
      const bottomCenterY = cardY + cardH - Math.round(cardH * 0.30);
      const pillH = Math.min(24 * scale, Math.max(18 * scale, Math.round(cardH * 0.34)));
      const pillY = bottomCenterY - Math.round(pillH / 2);

      // Esp Pill
      const espX = materiaX;
      context.save();
      const espFontSize = Math.min(13.5 * scale, Math.max(10.5 * scale, Math.round(pillH * 0.58)));
      context.font = `800 ${espFontSize}px "Montserrat", sans-serif`;
      const espText = (c.esp || 'ISI').toUpperCase();
      const espW = context.measureText(espText).width + Math.max(7, Math.round(9 * scale));
      context.fillStyle = espColor;
      roundRect(context, espX, pillY, espW, pillH, Math.max(4, Math.round(5 * scale)));
      context.fill();

      context.fillStyle = '#ffffff';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(espText, espX + espW / 2, bottomCenterY);
      context.restore();

      // Aula Pill
      const aulaX = espX + espW + Math.max(4, Math.round(5 * scale));
      context.save();
      const aulaFontSize = Math.min(13 * scale, Math.max(10 * scale, Math.round(pillH * 0.55)));
      context.font = `800 ${aulaFontSize}px "Montserrat", sans-serif`;
      const aulaText = `${c.aula || 'TBA'}`;
      const aulaW = context.measureText(aulaText).width + Math.max(8, Math.round(10 * scale));
      context.fillStyle = '#f3e8ff';
      roundRect(context, aulaX, pillY, aulaW, pillH, Math.max(4, Math.round(5 * scale)));
      context.fill();

      context.fillStyle = '#4c1575';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(aulaText, aulaX + aulaW / 2, bottomCenterY);
      context.restore();

      // Horario (Right aligned)
      const horaRightX = cardX + cardW - Math.max(6, Math.round(8 * scale));
      const horaFontSize = Math.min(17 * scale, Math.max(13 * scale, Math.round(cardH * 0.255)));
      context.save();
      context.fillStyle = '#4a044e';
      context.font = `800 ${horaFontSize}px "Montserrat", sans-serif`;
      context.textAlign = 'right';
      context.textBaseline = 'middle';
      context.fillText(`⏰ ${c.hora || '18:00'}`, horaRightX, bottomCenterY);
      context.restore();
    });
  } else {
    // 2-Column Grid Layout (Optimized for maximum readability and visual breathing space)
    const rows = Math.ceil(pageCasillas.length / 2);
    
    // Adaptive gaps & card height
    let targetGap;
    if (rows <= 5) targetGap = 18;
    else if (rows <= 8) targetGap = 14;
    else if (rows <= 11) targetGap = 10;
    else if (rows <= 14) targetGap = 6;
    else targetGap = 4;
    const gapY = targetGap * scale;

    const gapX = Math.round(20 * scale);
    const cardW = Math.round(472 * scale);
    const col0X = Math.round(54 * scale);
    const col1X = col0X + cardW + gapX;

    const maxCardH = 120 * scale;
    const rawH = Math.floor((availH - (rows - 1) * gapY) / rows);
    const cardH = Math.max(50 * scale, Math.min(maxCardH, rawH));

    const totalBlockH = (rows - 1) * gapY + rows * cardH;
    const extraH = availH - totalBlockH;
    if (extraH > 30 && extraH < 500) {
      startY += Math.round(Math.min(180, extraH * 0.25));
    }

    pageCasillas.forEach((c, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const cardX = col === 0 ? col0X : col1X;
      const cardY = startY + row * (cardH + gapY);
      const espColor = getCarreraColor(c.esp);

      // Card Background & Drop Shadow
      context.save();
      context.shadowColor = 'rgba(0, 0, 0, 0.20)';
      context.shadowBlur = Math.max(4, Math.round(8 * scale));
      context.shadowOffsetY = Math.max(2, Math.round(3 * scale));
      context.fillStyle = '#ffffff';
      roundRect(context, cardX, cardY, cardW, cardH, Math.max(8, Math.round(14 * scale)));
      context.fill();
      context.restore();

      // Left Accent Strip
      context.save();
      context.fillStyle = espColor;
      roundRect(context, cardX, cardY, Math.max(4, Math.round(6 * scale)), cardH, 3 * scale);
      context.fill();
      context.restore();

      // --- ROW 1: Materia Name (HERO TEXT - Prominent & Bold) ---
      const materiaX = cardX + Math.max(12, Math.round(15 * scale));
      const materiaY = cardY + Math.round(cardH * 0.32);
      const materiaMaxW = cardW - Math.max(20, Math.round(26 * scale));
      const materiaFontSize = Math.min(24 * scale, Math.max(15 * scale, Math.round(cardH * 0.26)));

      context.save();
      context.fillStyle = '#0f0322';
      context.font = `800 ${materiaFontSize}px "Montserrat", sans-serif`;
      context.textAlign = 'left';
      context.textBaseline = 'middle';

      let materiaStr = c.materia || 'Materia';
      while (context.measureText(materiaStr).width > materiaMaxW && materiaStr.length > 3) {
        materiaStr = materiaStr.slice(0, -2).trim();
      }
      if (materiaStr !== c.materia) materiaStr += '...';

      context.fillText(materiaStr, materiaX, materiaY);
      context.restore();

      // --- ROW 2: Especialidad + Aula + BIG Horario ---
      const bottomCenterY = cardY + cardH - Math.round(cardH * 0.29);
      const pillH = Math.min(28 * scale, Math.max(20 * scale, Math.round(cardH * 0.32)));
      const pillY = bottomCenterY - Math.round(pillH / 2);

      // Esp Pill
      const espX = materiaX;
      context.save();
      const espFontSize = Math.min(15 * scale, Math.max(11 * scale, Math.round(pillH * 0.58)));
      context.font = `800 ${espFontSize}px "Montserrat", sans-serif`;
      const espText = (c.esp || 'ISI').toUpperCase();
      const espW = context.measureText(espText).width + Math.max(12, Math.round(15 * scale));
      context.fillStyle = espColor;
      roundRect(context, espX, pillY, espW, pillH, Math.max(5, Math.round(6 * scale)));
      context.fill();

      context.fillStyle = '#ffffff';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(espText, espX + espW / 2, bottomCenterY);
      context.restore();

      // Aula Pill
      const aulaX = espX + espW + Math.max(6, Math.round(8 * scale));
      context.save();
      const aulaFontSize = Math.min(14.5 * scale, Math.max(10.5 * scale, Math.round(pillH * 0.55)));
      context.font = `800 ${aulaFontSize}px "Montserrat", sans-serif`;
      const aulaText = `Aula ${c.aula || 'TBA'}`;
      const aulaW = context.measureText(aulaText).width + Math.max(12, Math.round(15 * scale));
      context.fillStyle = '#f3e8ff';
      roundRect(context, aulaX, pillY, aulaW, pillH, Math.max(5, Math.round(6 * scale)));
      context.fill();

      context.fillStyle = '#4c1575';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(aulaText, aulaX + aulaW / 2, bottomCenterY);
      context.restore();

      // Horario (Right aligned - BIG & BOLD)
      const horaRightX = cardX + cardW - Math.max(10, Math.round(14 * scale));
      const horaFontSize = Math.min(21 * scale, Math.max(15 * scale, Math.round(cardH * 0.25)));
      context.save();
      context.fillStyle = '#4a044e';
      context.font = `800 ${horaFontSize}px "Montserrat", sans-serif`;
      context.textAlign = 'right';
      context.textBaseline = 'middle';
      context.fillText(`⏰ ${c.hora || '18:00'} hs`, horaRightX, bottomCenterY);
      context.restore();
    });
  }
}

/**
 * Universal Block-Based Renderer (used for INFO)
 * Supports title, multi-badge list, and body with independent position & scale per block
 */
function renderBlockBasedContent(context, width, height, data) {
  const { title, titleY = 0, titleScale = 1.0, hasBadge, badges, body, bodyY = 0, bodyScale = 1.0, align, yOffset, scale } = data;

  const titleLines = (title || '').split('\n').filter(l => l.trim().length > 0);
  const effectiveTitleScale = scale * titleScale;
  const titleFontSize = Math.round(68 * effectiveTitleScale);
  const titleLineHeight = Math.round(titleFontSize * 1.22);
  const titleH = titleLines.length > 0 ? (titleLines.length * titleLineHeight + Math.round(40 * scale)) : 0;

  const validBadges = (hasBadge && badges && badges.length > 0)
    ? badges.filter(b => (b.val && b.val.trim()) || (b.sub && b.sub.trim()))
    : [];
  const badgesH = validBadges.length > 0 ? (validBadges.length * Math.round(118 * scale) + Math.round(20 * scale)) : 0;

  const paragraphs = (body || '').split(/\n\s*\n/).map(p => p.trim()).filter(p => p.length > 0);
  const bodyMarginX = Math.round(158 * scale);
  const bodyMaxWidth = width - (bodyMarginX * 2);
  const effectiveBodyScale = scale * bodyScale;
  const headerFontSize = Math.round(38 * effectiveBodyScale);
  const bodyFontSize = Math.round(34 * effectiveBodyScale);
  const bodyLineHeight = Math.round(bodyFontSize * 1.38);

  const paraHeights = paragraphs.map(p => {
    const colonIndex = p.indexOf(':');
    let hasHdr = (colonIndex > 0 && colonIndex < 35 && !p.slice(0, colonIndex).includes('\n'));
    let remText = hasHdr ? p.slice(colonIndex + 1).trim() : p;
    let lines = wrapTextLines(context, remText, bodyMaxWidth);
    let h = (hasHdr ? Math.round(headerFontSize * 1.4) : 0) + (lines.length * bodyLineHeight) + Math.round(35 * effectiveBodyScale);
    return { p, hasHdr, headerText: hasHdr ? p.slice(0, colonIndex + 1).trim() : '', remText, lines, h };
  });

  const totalBodyH = paraHeights.reduce((acc, ph) => acc + ph.h, 0);
  const totalContentH = titleH + badgesH + totalBodyH;

  // Multi-story split check: available safe height is ~980px
  let totalPages = 1;
  if (totalContentH > 960 || (paragraphs.length >= 3 && totalContentH > 880)) {
    totalPages = 2;
  }

  state.pagination.info.totalPages = totalPages;
  const currentPage = Math.min(Math.max(1, state.pagination.info.currentPage || 1), totalPages);
  state.pagination.info.currentPage = currentPage;

  let currentY = (totalPages > 1 ? 528 : 530) + yOffset;

  // Draw Page Badge if multi-story
  if (totalPages > 1) {
    drawPageBadge(context, currentPage, totalPages, 'COMUNICADO');
  }

  // --- Story 1 ---
  if (totalPages === 1 || currentPage === 1) {
    // 1. Title Rendering
    if (titleLines.length > 0) {
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

    // 2. Badges
    if (validBadges.length > 0) {
      for (let i = 0; i < validBadges.length; i++) {
        const badge = validBadges[i];
        const effectiveBadgeScale = scale * (badge.scale || 1.0);
        const badgeHeight = Math.round(86 * effectiveBadgeScale);
        const badgeY = currentY + (badge.yOffset || 0);

        context.save();
        const badgeFontSize = Math.round(46 * effectiveBadgeScale);
        context.font = `800 ${badgeFontSize}px "Montserrat", sans-serif`;
        const valText = (badge.val || '').trim();
        const measuredBadgeTextWidth = context.measureText(valText).width;

        const badgeWidth = Math.max(Math.round(210 * effectiveBadgeScale), measuredBadgeTextWidth + Math.round(48 * effectiveBadgeScale));
        const badgeX = Math.round(135 * effectiveBadgeScale);
        const badgeRadius = Math.round(20 * effectiveBadgeScale);
        const borderWidth = Math.round(5.5 * effectiveBadgeScale);

        context.strokeStyle = '#ffffff';
        context.lineWidth = borderWidth;
        roundRect(context, badgeX, badgeY, badgeWidth, badgeHeight, badgeRadius);
        context.stroke();

        context.fillStyle = '#ffffff';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(valText, badgeX + badgeWidth / 2, badgeY + badgeHeight / 2 + (2 * effectiveBadgeScale));
        context.restore();

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

        currentY = badgeY + badgeHeight + Math.round(32 * scale);
      }
      currentY += Math.round(20 * scale);
    }

    // 3. Body: if totalPages == 1, render all. If totalPages == 2, render first paragraph
    const parasToRender = totalPages === 1 ? paraHeights : paraHeights.slice(0, 1);
    if (parasToRender.length > 0) {
      let bodyCursorY = currentY + bodyY;
      const bodyCenterX = 540;

      for (let p = 0; p < parasToRender.length; p++) {
        const item = parasToRender[p];
        if (bodyCursorY + item.h > SAFE_BOUNDS.BOTTOM - 20) break;

        if (item.headerText) {
          context.save();
          context.font = `800 ${headerFontSize}px "Montserrat", sans-serif`;
          context.fillStyle = '#ffffff';
          context.textBaseline = 'alphabetic';
          const hX = align === 'center' ? bodyCenterX : bodyMarginX;
          drawTextWithSpacing(context, item.headerText, hX, bodyCursorY + headerFontSize, 0.8, align);
          bodyCursorY += Math.round(headerFontSize * 1.4);
          context.restore();
        }

        if (item.lines && item.lines.length > 0) {
          context.save();
          context.font = `500 ${bodyFontSize}px "Montserrat", sans-serif`;
          context.fillStyle = '#ffffff';
          context.textAlign = align === 'center' ? 'center' : 'left';
          context.textBaseline = 'alphabetic';

          for (const line of item.lines) {
            const lineX = align === 'center' ? bodyCenterX : bodyMarginX;
            context.fillText(line, lineX, bodyCursorY + bodyFontSize);
            bodyCursorY += bodyLineHeight;
          }
          context.restore();
        }

        bodyCursorY += Math.round(35 * effectiveBodyScale);
      }
    }
  } else {
    // --- Story 2 (Continuation) ---
    // Title continuation header
    if (titleLines.length > 0) {
      let titleCursorY = currentY + titleY;
      context.save();
      const contFontSize = Math.round(titleFontSize * 0.85);
      const contLineH = Math.round(contFontSize * 1.22);
      context.fillStyle = '#ffffff';
      context.textBaseline = 'alphabetic';
      context.font = `800 ${contFontSize}px "Montserrat", sans-serif`;

      for (let i = 0; i < Math.min(2, titleLines.length); i++) {
        const line = titleLines[i].trim();
        drawTextWithSpacing(context, line, 540, titleCursorY, 1.2, 'center');
        titleCursorY += contLineH;
      }
      context.restore();

      currentY = titleCursorY + Math.round(40 * scale);
    }

    // Remaining paragraphs (from index 1 onward)
    const parasToRender = paraHeights.slice(1);
    if (parasToRender.length > 0) {
      let bodyCursorY = currentY + bodyY;
      const bodyCenterX = 540;

      for (let p = 0; p < parasToRender.length; p++) {
        const item = parasToRender[p];
        if (bodyCursorY + item.h > SAFE_BOUNDS.BOTTOM - 20) break;

        if (item.headerText) {
          context.save();
          context.font = `800 ${headerFontSize}px "Montserrat", sans-serif`;
          context.fillStyle = '#ffffff';
          context.textBaseline = 'alphabetic';
          const hX = align === 'center' ? bodyCenterX : bodyMarginX;
          drawTextWithSpacing(context, item.headerText, hX, bodyCursorY + headerFontSize, 0.8, align);
          bodyCursorY += Math.round(headerFontSize * 1.4);
          context.restore();
        }

        if (item.lines && item.lines.length > 0) {
          context.save();
          context.font = `500 ${bodyFontSize}px "Montserrat", sans-serif`;
          context.fillStyle = '#ffffff';
          context.textAlign = align === 'center' ? 'center' : 'left';
          context.textBaseline = 'alphabetic';

          for (const line of item.lines) {
            const lineX = align === 'center' ? bodyCenterX : bodyMarginX;
            context.fillText(line, lineX, bodyCursorY + bodyFontSize);
            bodyCursorY += bodyLineHeight;
          }
          context.restore();
        }

        bodyCursorY += Math.round(35 * effectiveBodyScale);
      }
    }
  }
}

/**
 * Render PARO layout (with 1 or multiple days support, specific gremios and status)
 */
function renderParoContent(context, width, height) {
  const { days, format, hasLine, gremium, status, extra, yOffset, scale } = state.paro;

  const validDays = (days && days.length > 0) 
    ? days.filter(d => (d.day && d.day.trim()) || (d.date && d.date.trim())) 
    : [];

  // Multi-story check for PARO
  let totalPages = 1;
  if (validDays.length > 4 || (validDays.length >= 2 && ((status || '').length + (extra || '').length > 200))) {
    totalPages = 2;
  }

  state.pagination.paro.totalPages = totalPages;
  const currentPage = Math.min(Math.max(1, state.pagination.paro.currentPage || 1), totalPages);
  state.pagination.paro.currentPage = currentPage;

  let currentY = (totalPages > 1 ? 528 : 570) + yOffset;

  // Draw Page Badge if multi-story
  if (totalPages > 1) {
    drawPageBadge(context, currentPage, totalPages, 'PARO ANUNCIADO');
  }

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
        dateText = `${d1.split('/')[0]}  Y  ${d2}`;
      } else {
        dateText = `${d1}  Y  ${d2}`;
      }
    } else {
      const dayNames = validDays.map(d => d.day.trim().toUpperCase());
      const lastDay = dayNames.pop();
      dayText = `${dayNames.join(', ')} Y ${lastDay}`;
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
      if (currentY + statusFontSize > SAFE_BOUNDS.BOTTOM - 10) break;
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
      if (currentY + extraFontSize > SAFE_BOUNDS.BOTTOM - 10) break;
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
    if (!state.mesa.hasLoadedData || !state.mesa.casillas || state.mesa.casillas.length === 0) {
      dom.captionPreviewText.textContent = 'Esperando planilla de exámenes para generar el texto...';
      return;
    }
    const filterTxt = state.mesa.filterEsp === 'TODAS' ? 'TODAS LAS ESPECIALIDADES' : `ESPECIALIDAD ${state.mesa.filterEsp}`;
    const dateLine = state.mesa.date && state.mesa.date.trim() ? `🗓️ FECHA: ${state.mesa.date.trim()}\n` : '';
    caption = `📋 MESA DE EXAMEN | UTN FRRO\n${dateLine}📍 DISTRIBUCIÓN DE AULAS Y HORARIOS (${filterTxt})\n\n`;

    const activeCasillas = (state.mesa.casillas || []).filter(c => {
      if (c.enabled === false) return false;
      if (state.mesa.filterEsp === 'TODAS') return true;
      return (c.esp || '').toUpperCase().trim() === state.mesa.filterEsp.toUpperCase();
    });

    if (activeCasillas.length > 0) {
      activeCasillas.forEach(c => {
        caption += `• [${c.esp}] ${c.materia} ➔ Aula ${c.aula} (${c.hora} hs)\n`;
      });
      caption += '\n';
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
  const currentMode = state.currentMode;
  if (currentMode === 'mesa' && (!state.mesa.hasLoadedData || !state.mesa.casillas || state.mesa.casillas.length === 0)) {
    showToast('Primero debes cargar una planilla de examen', true);
    return;
  }
  const pag = state.pagination[currentMode] || { currentPage: 1, totalPages: 1 };
  const pageStr = pag.totalPages > 1 ? `-parte${pag.currentPage}-de-${pag.totalPages}` : '';

  let filename = '';
  if (currentMode === 'info') {
    filename = `story-info-upl${pageStr}-${Date.now().toString().slice(-4)}.png`;
  } else if (currentMode === 'mesa') {
    filename = `story-mesa-examen-upl${pageStr}-${Date.now().toString().slice(-4)}.png`;
  } else {
    const firstDay = state.paro.days[0] || { date: 'paro' };
    const dateStr = firstDay.date ? firstDay.date.replace('/', '-') : Date.now().toString().slice(-4);
    filename = `story-paro-upl${pageStr}-${dateStr}.png`;
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
    showToast(`¡Historia HD ${pag.totalPages > 1 ? `(Parte ${pag.currentPage}/${pag.totalPages}) ` : ''}descargada! 🚀`);
  }, 'image/png');
}

async function downloadAllPages() {
  const currentMode = state.currentMode;
  if (currentMode === 'mesa' && (!state.mesa.hasLoadedData || !state.mesa.casillas || state.mesa.casillas.length === 0)) {
    showToast('Primero debes cargar una planilla de examen', true);
    return;
  }
  const pag = state.pagination[currentMode] || { currentPage: 1, totalPages: 1 };
  const totalPages = pag.totalPages || 1;
  const originalPage = pag.currentPage || 1;

  if (totalPages <= 1) {
    downloadHighResStory();
    return;
  }

  showToast(`Descargando las ${totalPages} historias HD en resolución completa... ⏳`);

  for (let p = 1; p <= totalPages; p++) {
    state.pagination[currentMode].currentPage = p;
    if (currentMode === 'mesa') state.mesa.currentPage = p;
    drawCanvasContent();
    await new Promise(r => setTimeout(r, 150));
    await downloadSinglePagePromise(p, totalPages, currentMode);
    await new Promise(r => setTimeout(r, 450));
  }

  // Restore previous active page state
  state.pagination[currentMode].currentPage = originalPage;
  if (currentMode === 'mesa') state.mesa.currentPage = originalPage;
  drawCanvasContent();
  updateStoryPartsUI();
  showToast(`¡Las ${totalPages} historias HD fueron descargadas con éxito! 🚀`);
}

function downloadSinglePagePromise(pageNum, totalPages, mode) {
  return new Promise((resolve) => {
    let modeLabel = mode === 'mesa' ? 'mesa-examen' : (mode === 'info' ? 'info' : 'paro');
    const filename = `story-${modeLabel}-parte${pageNum}-de-${totalPages}-upl-${Date.now().toString().slice(-4)}.png`;
    dom.canvas.toBlob((blob) => {
      if (!blob) { resolve(); return; }
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => {
        URL.revokeObjectURL(url);
        resolve();
      }, 120);
    }, 'image/png');
  });
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
