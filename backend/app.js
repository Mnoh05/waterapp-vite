require("dotenv").config();
const express = require("express"); //Importa el módulo de Express, un framework de Node.js que facilita la creación de servidores web.
const app = express(); //Crea una aplicación Express.
const cors = require('cors');//Sirve para permitir (o bloquear) el acceso de tu frontend (ej: http://localhost:5173) a tu backend (ej: http://localhost:3000).
const port = 3000;
const { connection} = require("./config/db.js");
app.use(express.json());

const loginRoutes = require("./routes/loginRoutes.js");
const modulosRoutes = require("./routes/moduloRoutes.js");
const incidenciaRoutes = require("./routes/incidenciaRoutes.js");
const tiempoRoutes = require("./routes/tiempoRoutes.js");

app.use(cors({
  origin: 'http://localhost:5173', // o '*' para permitir todos
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true
}));

//endpoints

app.use("/api/login", loginRoutes);
app.use("/api/modulos", modulosRoutes);
app.use("/api/incidencia", incidenciaRoutes);
app.use("/api/tiempos", tiempoRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Hola desde el backend!" });
});

app.post('/login', (req, res) => {}); //para loguear un usuario
app.post('/register', (req, res) => {}); //para registrar un usuario
app.post('/logout', (req, res) => {}); //para cerrar sesion de un usuario

app.post('/protected', (req, res) => {}); //ruta protegida

app.listen(port, () => {
  console.log(
    `El servidor backend está en funcionamiento en http://localhost:${port}`
  );
});

connection();
