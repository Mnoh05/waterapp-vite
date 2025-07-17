const express = require('express');
const app = express();
const db = require('../config/db'); // Importa la configuración de la base de datos
const cors = require('cors'); // Importa el middleware CORS para permitir solicitudes desde otros dominios

app.use(cors()); // Usa CORS para permitir solicitudes desde otros dominios
app.use(express.json()); // Permite que la aplicación maneje solicitudes JSON

app.post('/login', (req, res) => {  
    const { username, password } = req.body; // Extrae el nombre de usuario y la contraseña del cuerpo de la solicitud

    // Consulta SQL para verificar las credenciales del usuario
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Error al consultar la base de datos:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        if (results.length > 0) {
            // Si se encuentran resultados, las credenciales son válidas
            res.json({ message: 'Inicio de sesión exitoso' });
        } else {
            // Si no se encuentran resultados, las credenciales son inválidas
            res.status(401).json({ error: 'Credenciales inválidas' });
        }
    });

    const port = process.env.PORT || 3000; // Define el puerto en el que la aplicación escuchará las solicitudes
    app.listen(port, () => {
        console.log(`Servidor escuchando en http://localhost:${port}`); // Imprime un mensaje en la consola indicando que el servidor está funcionando
    });
});