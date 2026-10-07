import sys
sys.path.insert(0, '.')
import ocr_engine

p = 'capturas mesa ejemplos/Captura de pantalla 2026-08-26 114410.png'
with open(p, 'rb') as f:
    res = ocr_engine.process_exam_sheet(f.read())

for c in res['casillas']:
    if 'Mec' in c['materia'] or 'Metal' in c['materia'] or 'Cálculo' in c['materia'] or 'Estabilidad II' in c['materia'] or 'Materiales' in c['materia']:
        print(f"id={c['id']:6s} esp={c['esp']:4s} aula={c['aula']:5s} | {c['materia']}")
