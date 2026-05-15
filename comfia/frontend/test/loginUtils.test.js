import { describe, test, expect } from 'vitest';
import { validarIntentoLogin } from '../src/utils/loginUtils';


describe('validarIntentoLogin', () => {
    test('5 intentos consecutivos con contraseña incorrecta - retorna bloqueado', () => {
        const email = 'test@example.com';
        
        for (let i = 0; i < 5; i++) {
            validarIntentoLogin(email, false);
        }
        
        const resultado = validarIntentoLogin(email, false);
        expect(resultado.isBlocked).toBe(true);
        expect(resultado.message).toContain('bloqueada');
    });
});