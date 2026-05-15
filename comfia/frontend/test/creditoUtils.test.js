import { describe, test, expect } from 'vitest';
import { validarCredito } from '../src/utils/creditoUtils';

describe('validarCredito', () => {
    
    test('PU-01: Datos completos y válidos - retorna isValid: true', () => {
        const credito = {
            monto: 5000000,
            documento_cliente: '12345678',
            fecha_inicio: '2026-05-14',
            fecha_fin: '2027-05-14'
        };
        
        const resultado = validarCredito(credito);
        
        expect(resultado.isValid).toBe(true);
        expect(resultado.errors).toHaveLength(0);
    });
    
    test('PU-02: Monto menor al mínimo - retorna isValid: false', () => {
        const credito = {
            monto: 50000,
            documento_cliente: '12345678',
            fecha_inicio: '2026-05-14',
            fecha_fin: '2027-05-14'
        };
        
        const resultado = validarCredito(credito);
        
        expect(resultado.isValid).toBe(false);
        expect(resultado.errors).toContain('El monto mínimo es $100.000 COP');
    });
});