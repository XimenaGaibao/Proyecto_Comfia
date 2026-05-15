export const validarDocumento = (documento) => {
    if (!documento) return false;
    const docStr = documento.toString();
    return docStr.length >= 8 && docStr.length <= 10 && /^\d+$/.test(docStr);
}
