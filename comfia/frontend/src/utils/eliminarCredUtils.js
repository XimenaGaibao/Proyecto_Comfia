export const puedeEliminarCredito = (credito) => {
    const estadosNoEliminables = ['Activo', 'Pendiente', 'En revisión'];
    
    if (estadosNoEliminables.includes(credito.estado)) {
        return {
            canDelete: false,
            reason: 'No se puede eliminar un crédito activo o pendiente'
        };
    }
    
    return {
        canDelete: true,
        reason: ''
    };
}