export const validarCredito = (credito) => {
    const errors = [];
    
    if (!credito.monto || credito.monto < 100000) {
        errors.push('El monto mínimo es $100.000 COP');
    }
    
    if (!credito.documento_cliente || credito.documento_cliente.length < 7) {
        errors.push('El documento del cliente es inválido');
    }
    
    if (!credito.fecha_inicio) {
        errors.push('La fecha de inicio es requerida');
    }
    
    if (!credito.fecha_fin) {
        errors.push('La fecha límite es requerida');
    }
    
    return {
        isValid: errors.length === 0,
        errors
    };
};