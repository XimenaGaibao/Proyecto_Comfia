const User = require('../modelos/usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authController = {
    // Registro de usuario
    register: async (req, res) => {
        try {
            const { nombre, email, password, documento_id, telefono, estado } = req.body;
            
            // Verificar si el usuario ya existe
            const existingUser = await User.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
            }
           
            const userData = {
                nombre,
                email,
                password,
                documento_id: documento_id || null,
                telefono: telefono || null,
                rol: 'Visualizador',  //Valor por defecto 
                estado: estado || 'Activo'
            };
            
            const userId = await User.create({ 
            nombre, 
            email, 
            password, 
            documento_id, 
            telefono,
            rol: 'Visualizador',
            estado: 'Activo'
        });
        console.log("Usuario creado con ID:", userId);
            
            const user = await User.findById(userId);
            console.log("Usuario recuperado:", user);
            
            const token = jwt.sign(
                { id: user.id, email: user.email, rol: user.rol, estado: user.estado },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
            );
            
            const { password: _, ...userWithoutPassword } = user;
            
            res.status(201).json({
                success: true,
                message: 'Usuario registrado exitosamente',
                user: userWithoutPassword,
                token
            });
        } catch (error) {
            console.error('Error en registro:', error);
            res.status(500).json({ message: 'Error al registrar usuario: ' + error.message });
        }
    },
    
    // Login
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            
            const user = await User.findByEmail(email);
            if (!user) {
                return res.status(401).json({ message: 'Credenciales inválidas' });
            }
            
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(401).json({ message: 'Credenciales inválidas' });
            }
            
            const token = jwt.sign(
                { id: user.id, email: user.email, rol: user.rol, estado: user.estado },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
            );
            
            const { password: _, ...userWithoutPassword } = user;
            
            res.json({
                success: true,
                message: 'Inicio de sesión exitoso',
                user: userWithoutPassword,
                token
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al iniciar sesión' });
        }
    },
    
    // Verificar token
    verify: async (req, res) => {
        try {
            const user = await User.findById(req.user.id);
            if (!user) {
                return res.status(401).json({ message: 'Usuario no encontrado' });
            }
            const { password: _, ...userWithoutPassword } = user;
            res.json({ user: userWithoutPassword });
        } catch (error) {
            res.status(500).json({ message: 'Error al verificar token' });
        }
    }
};

module.exports = authController;