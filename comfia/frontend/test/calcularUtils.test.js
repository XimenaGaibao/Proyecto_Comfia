import { describe, test, expect } from 'vitest';
import { calcularCuotaMensual } from '../src/utils/calcularUtils';

describe('calcularCuotaMensual', () => {
    test('Monto $5.000.000, tasa 12%, 12 meses - cuota calculada correctamente', () => {
        const monto = 5000000;
        const tasaAnual = 12;
        const meses = 12;
        
        const resultado = calcularCuotaMensual(monto, tasaAnual, meses);
        
        //Usar el valor real que devuelve tu función
        expect(resultado).toBe(444244);  
    });
});
