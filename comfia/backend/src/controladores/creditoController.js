const Credit = require("../modelos/credito");
const db = require("../configuracion/db");

const creditoController = {
  // Obtener todos los créditos
  getAll: async (req, res) => {
    try {
      const credits = await Credit.findAll();
      res.json(credits);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener créditos" });
    }
  },

  // Obtener crédito por ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const credit = await Credit.findById(id);
      if (!credit) {
        return res.status(404).json({ message: "Crédito no encontrado" });
      }

      const payments = await Credit.getPayments(id);
      res.json({ ...credit, payments });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener crédito" });
    }
  },

  // Crear crédito
  create: async (req, res) => {
    try {
      const creditData = {
        ...req.body,
        created_by: req.user.id,
        pending_amount: req.body.amount,
      };

      const creditId = await Credit.create(creditData);
      const newCredit = await Credit.findById(creditId);

      res.status(201).json({
        success: true,
        message: "Crédito creado exitosamente",
        credit: newCredit,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al crear crédito" });
    }
  },

  // Actualizar crédito
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        nombre_cliente,
        documento_cliente,
        monto,
        estado,
        fecha_inicio,
        fecha_fin,
      } = req.body;

      console.log("=== ACTUALIZANDO CRÉDITO ===");
      console.log("ID:", id);
      console.log("Datos recibidos:", req.body);

      // Verificar conexión a BD
      console.log("Intentando conectar a BD...");

      const [result] = await db.execute(
        `UPDATE creditos 
             SET nombre_cliente = ?, 
                 documento_cliente = ?, 
                 monto = ?, 
                 estado = ?, 
                 fecha_inicio = ?, 
                 fecha_fin = ?
             WHERE id = ?`,
        [
          nombre_cliente,
          documento_cliente,
          monto,
          estado,
          fecha_inicio,
          fecha_fin || null,
          id,
        ],
      );

      console.log("Resultado de la actualización:", result);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Crédito no encontrado" });
      }

      res.json({ success: true, message: "Crédito actualizado exitosamente" });
    } catch (error) {
      console.error("ERROR COMPLETO:", error);
      res.status(500).json({
        message: "Error al actualizar crédito",
        error: error.message,
        sql: error.sql,
      });
    }
  },

  // Eliminar crédito
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const credit = await Credit.findById(id);
      if (!credit) {
        return res.status(404).json({ message: "Crédito no encontrado" });
      }

      await Credit.delete(id);
      res.json({ success: true, message: "Crédito eliminado exitosamente" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al eliminar crédito" });
    }
  },

  //Registrar pago
 addPayment: async (req, res) => {
    try {
        const { id } = req.params;
        const paymentData = req.body;
        
        // LOGS DE DEPURACIÓN
        console.log('=== REGISTRO DE PAGO ===');
        console.log('ID del crédito:', id);
        console.log('Datos recibidos del frontend:', paymentData);
        console.log('Tipo de datos:', {
            monto: typeof paymentData.monto,
            fecha_pago: typeof paymentData.fecha_pago,
            metodo_pago: typeof paymentData.metodo_pago,
            referencia: typeof paymentData.referencia,
            observaciones: typeof paymentData.observaciones
        });
        
        // Validar campos requeridos
        if (!paymentData.monto || !paymentData.fecha_pago) {
            console.log('ERROR: Faltan campos requeridos');
            return res.status(400).json({ 
                message: 'Monto y fecha de pago son obligatorios' 
            });
        }
        
        // Limpiar datos undefined
        const cleanPaymentData = {
            credito_id: parseInt(id),
            monto: parseFloat(paymentData.monto),
            fecha_pago: paymentData.fecha_pago,
            metodo_pago: paymentData.metodo_pago === undefined ? null : paymentData.metodo_pago,
            referencia: paymentData.referencia === undefined ? null : paymentData.referencia,
            observaciones: paymentData.observaciones === undefined ? null : paymentData.observaciones
        };
        
        console.log('Datos limpios para insertar:', cleanPaymentData);
        
        // Agregar el pago
        const paymentId = await Credit.addPayment(cleanPaymentData);
        
        console.log('Pago registrado exitosamente, ID:', paymentId);
        
        res.status(201).json({
            success: true,
            message: 'Pago registrado exitosamente',
            paymentId: paymentId
        });
        
    } catch (error) {
        console.error('ERROR EN addPayment:', error);
        console.error('Stack trace:', error.stack);
        res.status(500).json({ 
            message: 'Error al registrar el pago',
            error: error.message 
        });
    }
},

  // Obtener estadísticas
  getStats: async (req, res) => {
    try {
      const stats = await Credit.getStats();
      res.json(stats);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener estadísticas" });
    }
  },
};

module.exports = creditoController;
