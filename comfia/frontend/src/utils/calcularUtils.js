export const calcularCuotaMensual = (monto, tasaAnual, meses) => {
    if (!monto || !tasaAnual || !meses) return 0;
    
    const tasaMensual = tasaAnual / 100 / 12;
    const cuota = (monto * tasaMensual * Math.pow(1 + tasaMensual, meses)) / 
                  (Math.pow(1 + tasaMensual, meses) - 1);
    
    // Redondear a 2 decimales y luego a entero
    return Math.round(cuota);
};