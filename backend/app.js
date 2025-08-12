


const express = require('express'); //Importa el módulo de Express, un framework de Node.js que facilita la creación de servidores web.
const app = express(); //Crea una aplicación Express.
const port = 3000; 
const {connection} = require('./config/db.js'); 

app.use(express.json());

const loginRoutes = require('./routes/loginRoutes.js')

app.use('/api/login', loginRoutes);

app.get('/', (req, res) => {    //Define una ruta GET para la API en '/api/data'.
    res.json({ message: 'Hola desde el backend!' }); 
});

app.listen(port, () => { 
    console.log(`El servidor backend está en funcionamiento en http://localhost:${port}`); //Imprime un mensaje en la consola indicando que el servidor está funcionando y en qué URL se puede acceder.
});

connection(); //Llama a la función connection para establecer la conexión a la base de datos al iniciar el servidor.