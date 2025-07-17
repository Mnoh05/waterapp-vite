
require('dotenv').config(); // Importa el módulo dotenv para cargar las variables de entorno desde un archivo .env.
// Este archivo es responsable de establecer la conexión a la base de datos MySQL utilizando las variables
const {Sequelize} = require('sequelize'); // Importa el módulo pg para manejar la conexión a la base de datos PostgreSQL.

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  logging: true, // Habilita el registro de consultas SQL en la consola.
});

sequelize.authenticate()
    .then(() => {
        console.log('Conexión a la base de datos exitosa'); // Imprime un mensaje en la consola si la conexión es exitosa.
    })
    .catch(err => {
        console.error('Error al conectar a la base de datos', err); // Imprime un mensaje en la consola si hay un error en la conexión.
    });

module.exports = { // Exporta el objeto sequelize para que pueda ser utilizado en otros archivos.
  query: (text, params) => sequelize.query(text, params),
  connect: () => sequelize.authenticate()
};