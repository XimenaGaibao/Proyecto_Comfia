const User = require("../modelos/usuario");

const usuarioController = {
  // Obtener todos los usuarios
  getAll: async (req, res) => {
  try {
    const users = await User.getAll();
    console.log("=== ENDPOINT GET /api/users ===");
    console.log("Usuarios encontrados:", users.length);
    console.log("Primer usuario:", users[0]);
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
},

  // Obtener usuario por ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener usuario" });
    }
  },

  // Crear usuario (solo admin)
  create: async (req, res) => {
    try {
      const { nombre, email, password, documento, telefono, rol, estado } = req.body;

      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "El correo ya está registrado" });
      }

      const userId = await User.create({
        nombre,
        email,
        password,
        documento,
        telefono,
        rol,
        estado,
      });
      const newUser = await User.findById(userId);

      res.status(201).json({
        success: true,
        message: "Usuario creado exitosamente",
        user: newUser,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al crear usuario" });
    }
  },

  // Actualizar usuario
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      await User.update(id, req.body);
      const updatedUser = await User.findById(id);

      res.json({
        success: true,
        message: "Usuario actualizado exitosamente",
        user: updatedUser,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al actualizar usuario" });
    }
  },

  // Eliminar usuario
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      await User.delete(id);
      res.json({ success: true, message: "Usuario eliminado exitosamente" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al eliminar usuario" });
    }
  },

  // Cambiar contraseña
  changePassword: async (req, res) => {
    try {
      const { id } = req.params;
      const { currentPassword, newPassword } = req.body;

      const user = await User.findByEmail((await User.findById(id)).email);
      const isValid = await bcrypt.compare(currentPassword, user.password);

      if (!isValid) {
        return res
          .status(401)
          .json({ message: "Contraseña actual incorrecta" });
      }

      await User.updatePassword(id, newPassword);
      res.json({
        success: true,
        message: "Contraseña actualizada exitosamente",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al cambiar contraseña" });
    }
  },

  // Obtener perfil del usuario autenticado
  getProfile: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener perfil" });
    }
  },

  // Actualizar perfil
  updateProfile: async (req, res) => {
    try {
      const { nombre, email, documento, telefono, direccion } = req.body;

      await User.update(req.user.id, {
        name: nombre,
        email: email,
        document: documento,
        phone: telefono,
        direccion: direccion,
      });

      const updatedUser = await User.findById(req.user.id);
      res.json({
        success: true,
        message: "Perfil actualizado",
        user: updatedUser,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al actualizar perfil" });
    }
  },

  // Cambiar contraseña
  changePassword: async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      const user = await User.findByEmail(
        (await User.findById(req.user.id)).email,
      );

      const isValid = await bcrypt.compare(currentPassword, user.password);
      if (!isValid) {
        return res
          .status(401)
          .json({ message: "Contraseña actual incorrecta" });
      }

      await User.updatePassword(req.user.id, newPassword);
      res.json({ success: true, message: "Contraseña actualizada" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al cambiar contraseña" });
    }
  },
};

module.exports = usuarioController;
