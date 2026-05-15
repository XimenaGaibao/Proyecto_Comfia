import { describe, test, expect } from 'vitest';
import { validarDocumento } from '../src/utils/validarUtils';


describe('validarDocumento', () => {
    test('Documento "123" (muy corto) - retorna false (inválido)', () => {
        const documento = '123';
        
        expect(validarDocumento(documento)).toBe(false);
    });
    
    test('Documento "1234567890" (válido) - retorna true', () => {
        expect(validarDocumento('1234567890')).toBe(true);
    });
});