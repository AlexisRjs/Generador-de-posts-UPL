import sys, glob
sys.path.insert(0, '.')
import ocr_engine

for p in glob.glob('capturas mesa ejemplos/*.png'):
    print('=== FILE:', p, '===')
    with open(p, 'rb') as f:
        res = ocr_engine.process_exam_sheet(f.read())
    print('Detected date:', res.get('date'))
    casillas = res.get('casillas', [])
    print(f'Total casillas: {len(casillas)}')
    esps = {}
    for c in casillas:
        esp = c['esp']
        esps[esp] = esps.get(esp, 0) + 1
        print(f"  [{esp:4s}] Aula: {c['aula']:5s} | {c['materia']} ({c['turno']})")
    print('Specialty counts:', esps)
