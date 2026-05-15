import { describe, test, expect } from 'vitest';
import { puedeEliminarCredito } from '../src/utils/eliminarCredUtils';


describe('puedeEliminarCredito', () => {
    test('Crédito con estado "Activo" - rechaza eliminación con mensaje', () => {
        const credito = {
            id: 1,
            estado: 'Activo',
            monto: 5000000
        };
        
        expect(puedeEliminarCredito(credito).canDelete).toBe(false);
        expect(puedeEliminarCredito(credito).reason).toContain('No se puede eliminar');
    });
    
    test('Crédito con estado "Saldado" - permite eliminación', () => {
        const credito = {
            id: 1,
            estado: 'Saldado',
            monto: 5000000
        };
        
        expect(puedeEliminarCredito(credito).canDelete).toBe(true);
    });
});