const mysql = require('mysql2');  // para conectar Node.js con MySQL
const dotenv = require('dotenv'); 

dotenv.config(); 

// Crea un "pool" de conexiones (grupo de conexiones reutilizables)
const pool = mysql.createPool({
    host: process.env.DB_HOST,        
    user: process.env.DB_USER,        
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_NAME,     
    waitForConnections: true,          
    connectionLimit: 10,            
    queueLimit: 0                    
});

// Convierte el pool a Promesas (para usar async/await en lugar de callbacks)
const promisePool = pool.promise();


module.exports = promisePool;