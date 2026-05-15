const db = require("../configuracion/db");

const Credit = {
  // Crear crédito
  create: async (creditData) => {
    const {
      nombre_cliente,
      documento_cliente,
      monto,
      interes,
      plazo,
      estado,
      fecha_inicio,
      fecha_fin,
      monto_pendiente,
      monto_pagado,
      creado_por,
    } = creditData;

    const [result] = await db.execute(
      `INSERT INTO creditos 
            (nombre_cliente, documento_cliente, monto, interes, plazo, estado, fecha_inicio, fecha_fin, monto_pendiente, monto_pagado, creado_por) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nombre_cliente,
        documento_cliente,
        monto,
        interes || 0,
        plazo,
        estado || "Pendiente",
        fecha_inicio,
        fecha_fin || null,
        monto_pendiente !== undefined ? monto_pendiente : monto,
        monto_pagado || 0,
        creado_por,
      ],
    );
    return result.insertId;
  },

  // Obtener todos los créditos
  findAll: async () => {
    const [rows] = await db.execute(`
            SELECT c.*, u.nombre as creado_por_nombre 
            FROM creditos c 
            LEFT JOIN usuarios u ON c.creado_por = u.id 
            ORDER BY c.fecha_creacion DESC
        `);
    return rows;
  },

  // Buscar crédito por ID
  findById: async (id) => {
    const [rows] = await db.execute(
      `
            SELECT c.*, u.nombre as creado_por_nombre 
            FROM creditos c 
            LEFT JOIN usuarios u ON c.creado_por = u.id 
            WHERE c.id = ?
        `,
      [id],
    );
    return rows[0];
  },

  // Buscar créditos por cliente
  findByClient: async (documento) => {
    const [rows] = await db.execute(
      "SELECT * FROM creditos WHERE documento_cliente = ? ORDER BY fecha_creacion DESC",
      [documento],
    );
    return rows;
  },

  // Actualizar crédito
  update: async (id, creditData) => {
    const {
      nombre_cliente,
      documento_cliente,
      monto,
      interes,
      plazo,
      estado,
      fecha_inicio,
      fecha_fin,
      monto_pendiente,
      monto_pagado,
    } = creditData;

    const [result] = await db.execute(
      `UPDATE creditos 
            SET nombre_cliente = ?, 
                documento_cliente = ?, 
                monto = ?, 
                interes = ?, 
                plazo = ?, 
                estado = ?, 
                fecha_inicio = ?, 
                fecha_fin = ?, 
                monto_pendiente = ?, 
                monto_pagado = ? 
            WHERE id = ?`,
      [
        nombre_cliente,
        documento_cliente,
        monto,
        interes,
        plazo,
        estado,
        fecha_inicio,
        fecha_fin || null,
        monto_pendiente,
        monto_pagado,
        id,
      ],
    );
    return result.affectedRows;
  },

  // Eliminar crédito
  delete: async (id) => {
    const [result] = await db.execute("DELETE FROM creditos WHERE id = ?", [
      id,
    ]);
    return result.affectedRows;
  },

  // Registrar pago
  addPayment: async (paymentData) => {
    const { credito_id, monto, fecha_pago, estado } = paymentData;
    
    const [result] = await db.execute(
        `INSERT INTO pagos (credito_id, monto, fecha_pago, estado) 
         VALUES (?, ?, ?, ?)`,
        [credito_id, monto, fecha_pago, estado || 'Pagado']
    );
    
    // Actualizar el crédito
    const [updateResult] = await db.execute(
        `UPDATE creditos 
         SET monto_pendiente = monto_pendiente - ?, 
             monto_pagado = monto_pagado + ? 
         WHERE id = ?`,
        [monto, monto, credito_id]
    );
    
    // verifica que el credito este en 0
    const [credit] = await db.execute(
        `SELECT monto_pendiente FROM creditos WHERE id = ?`,
        [credito_id]
    );
    
    if (credit[0].monto_pendiente <= 0) {
        // Actualizar estado
        await db.execute(
            `UPDATE creditos SET estado = 'Pagado' WHERE id = ?`,
            [credito_id]
        );
    }
    
    return result.insertId;
},


  // Obtener pagos de un crédito
  getPayments: async (credito_id) => {
    const [rows] = await db.execute(
      `SELECT * FROM pagos 
         WHERE credito_id = ? 
         ORDER BY fecha_pago DESC`,
      [credito_id],
    );
    return rows;
  },

  // Obtener estadísticas
  getStats: async () => {
    const [total] = await db.execute(
      "SELECT COUNT(*) as total, SUM(monto) as total_monto FROM creditos",
    );

    const [byStatus] = await db.execute(
      "SELECT estado, COUNT(*) as count FROM creditos GROUP BY estado",
    );

    const [monthly] = await db.execute(`
            SELECT DATE_FORMAT(fecha_creacion, '%Y-%m') as mes, 
                   COUNT(*) as cantidad, 
                   SUM(monto) as total 
            FROM creditos 
            WHERE fecha_creacion >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
            GROUP BY DATE_FORMAT(fecha_creacion, '%Y-%m')
            ORDER BY mes ASC
        `);

    return {
      total: total[0] || { total: 0, total_monto: 0 },
      byStatus: byStatus || [],
      monthly: monthly || [],
    };
  },

  // Obtener créditos por estado
  findByStatus: async (estado) => {
    const [rows] = await db.execute(
      "SELECT * FROM creditos WHERE estado = ? ORDER BY fecha_creacion DESC",
      [estado],
    );
    return rows;
  },

  // Obtener créditos por rango de fechas
  findByDateRange: async (startDate, endDate) => {
    const [rows] = await db.execute(
      "SELECT * FROM creditos WHERE fecha_inicio BETWEEN ? AND ? ORDER BY fecha_inicio DESC",
      [startDate, endDate],
    );
    return rows;
  },
};

module.exports = Credit;
