import { describe, test, expect } from 'vitest';
import { formatearMoneda } from '../src/utils/formatoUtils';

describe('formatearMoneda', () => {
    test('Monto $5.000.000 - formato correcto en pesos colombianos', () => {
        const monto = 5000000;
        const resultado = formatearMoneda(monto);
        
        //verificar que contiene $ y los números correctos
        expect(resultado).toContain('$');
        expect(resultado).toContain('5');
        expect(resultado.replace(/[^0-9]/g, '')).toBe('5000000');
    });
    
    test('Monto $0 - retorna $0', () => {
        const resultado = formatearMoneda(0);
        //verificar que contiene $ y 0
        expect(resultado).toContain('$');
        expect(resultado).toContain('0');
    });
});