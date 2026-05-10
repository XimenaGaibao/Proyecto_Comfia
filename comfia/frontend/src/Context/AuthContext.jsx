/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AuthService } from '../Services/AuthService';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
    
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar usuario al iniciar
  useEffect(() => {
    const loadUser = async () => {
      const storedToken = localStorage.getItem('comfia_token');
      
      if (storedToken) {
        setToken(storedToken);
        try {
          // Verificar token y obtener usuario
          const userData = await AuthService.verifyToken(storedToken);
          setUser(userData);
        } catch (err) {
          console.error('Error al verificar token:', err);
          localStorage.removeItem('comfia_token');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  // Login
  const login = useCallback(async (credentials) => {
    setError(null);
    try {
      const response = await AuthService.login(credentials);
      const { user: loggedUser, token: newToken } = response;
      
      localStorage.setItem('comfia_token', newToken);
      setToken(newToken);
      setUser(loggedUser);
      
      return { success: true, user: loggedUser };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al iniciar sesión';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, []);

  // Registro
  const register = useCallback(async (userData) => {
    setError(null);
    try {
      const response = await AuthService.register(userData);
      const { user: newUser, token: newToken } = response;
      
      localStorage.setItem('comfia_token', newToken);
      setToken(newToken);
      setUser(newUser);
      
      return { success: true, user: newUser };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al registrar usuario';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, []);

  // Logout
  const logout = useCallback(() => {
    localStorage.removeItem('comfia_token');
    setToken(null);
    setUser(null);
    setError(null);
  }, []);

  // Actualizar usuario
  const updateUser = useCallback((updates) => {
    setUser(prev => ({ ...prev, ...updates }));
  }, []);

  // Valores del contexto
  const value = {
    user,
    token,
    loading,
    error,
    isAuthenticated: !!user && !!token,
    role: user?.role || null,
    login,
    register,
    logout,
    updateUser,
    // Helpers de rol
    isAdmin: user?.role === 'admin',
    isWorker: user?.role === 'trabajador',
    isClient: user?.role === 'cliente',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;