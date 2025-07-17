//index.js
// Este archivo es el punto de entrada para el backend de la aplicación. Aquí se configura un servidor Express que escucha en un puerto específico y define una ruta para manejar solicitudes API.
// Se utiliza para enviar datos al frontend de la aplicación, en este caso, un mensaje simple   


const express = require('express'); //Importa el módulo de Express, un framework de Node.js que facilita la creación de servidores web.
const app = express(); //Crea una aplicación Express.
const port = 3000; //Define el puerto en el que la aplicación escuchará las solicitudes. Si no se especifica un puerto en las variables de entorno, usará el 3000 por defecto.

app.get('/api/data', (req, res) => {    //Define una ruta GET para la API en '/api/data'.
    res.json({ message: 'Hola desde el backend!' }); //Envía una respuesta JSON con un mensaje.
});

app.listen(port, () => { //Inicia el servidor y escucha en el puerto definido.
    console.log(`El servidor backend está en funcionamiento en http://localhost:${port}`); //Imprime un mensaje en la consola indicando que el servidor está funcionando y en qué URL se puede acceder.
});