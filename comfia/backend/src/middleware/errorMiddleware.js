const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);
    
    const status = err.status || 500;
    const message = err.message || 'Error interno del servidor';
    
    res.status(status).json({
        success: false,
        message: message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

module.exports = errorMiddleware;