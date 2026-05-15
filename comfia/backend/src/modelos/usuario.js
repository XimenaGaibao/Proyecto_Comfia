const db = require('../configuracion/db');
const bcrypt = require('bcryptjs');

// Función para limpiar valores undefined
const cleanUndefined = (obj) => {
    const cleaned = {};
    for (const [key, value] of Object.entries(obj)) {
        cleaned[key] = value === undefined ? null : value;
    }
    return cleaned;
};

const User = {
    // Crear usuario
    create: async (userData) => {
        // Limpiar datos undefined
        const cleanData = cleanUndefined(userData);
        const { nombre, email, password, documento_id, telefono, rol, estado } = cleanData;
        
        // Validar campos requeridos
        if (!nombre || !email || !password) {
            throw new Error('Nombre, email y contraseña son requeridos');
        }
        
        // Hashear contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Asignar valores por defecto
        const userRol = rol || 'Visualizador';
        const userEstado = estado || 'Activo';
        
        const sql = `INSERT INTO usuarios 
                     (nombre, email, password, documento_id, telefono, rol, estado) 
                     VALUES (?, ?, ?, ?, ?, ?, ?)`;
        
        const [result] = await db.execute(sql, [
            nombre,
            email,
            hashedPassword,
            documento_id || null, 
            telefono || null,       
            userRol,
            userEstado
        ]);
        
        return result.insertId;
    },
    
    
    // Buscar por email
    findByEmail: async (email) => {
        const sql = 'SELECT * FROM usuarios WHERE email = ?';
        const [rows] = await db.execute(sql, [email]);
        return rows[0] || null;
    },
    
    // Buscar por ID
    findById: async (id) => {
        const sql = 'SELECT * FROM usuarios WHERE id = ?';
        const [rows] = await db.execute(sql, [id]);
        return rows[0] || null;
    },
    
    // Actualizar usuario
    update: async (id, userData) => {
        const { nombre, email, telefono, rol, estado } = userData;
        const sql = `UPDATE usuarios 
                     SET nombre = ?, email = ?, telefono = ?, rol = ?, estado = ?
                     WHERE id = ?`;
        const [result] = await db.execute(sql, [nombre, email, telefono, rol, estado, id]);
        return result.affectedRows > 0;
    },
    
    // Eliminar usuario
    delete: async (id) => {
        const sql = 'DELETE FROM usuarios WHERE id = ?';
        const [result] = await db.execute(sql, [id]);
        return result.affectedRows > 0;
    },
    
    // Listar todos
    getAll: async () => {
        const sql = 'SELECT id, nombre, email, documento_id, telefono, rol, estado, fecha_creacion FROM usuarios';
        const [rows] = await db.execute(sql);
        return rows;
    }
};

module.exports = User;