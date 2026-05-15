const intentosPorEmail = new Map();

export const validarIntentoLogin = (email, passwordCorrecta) => {
    const intentos = intentosPorEmail.get(email) || { count: 0, bloqueadoHasta: null };
    
    if (intentos.bloqueadoHasta && intentos.bloqueadoHasta > Date.now()) {
        return {
            isBlocked: true,
            message: 'Cuenta bloqueada temporalmente. Intente más tarde',
            intentosRestantes: 0
        };
    }
    
    if (!passwordCorrecta) {
        const nuevoCount = intentos.count + 1;
        const bloqueadoHasta = nuevoCount >= 5 ? Date.now() + 15 * 60 * 1000 : null;
        
        intentosPorEmail.set(email, { count: nuevoCount, bloqueadoHasta });
        
        return {
            isBlocked: bloqueadoHasta !== null,
            message: bloqueadoHasta ? 'Cuenta bloqueada por 15 minutos' : `Contraseña incorrecta. Intentos: ${nuevoCount}/5`,
            intentosRestantes: Math.max(0, 5 - nuevoCount)
        };
    }
    
    intentosPorEmail.delete(email);
    
    return {
        isBlocked: false,
        message: 'Login exitoso',
        intentosRestantes: 5
    };
}