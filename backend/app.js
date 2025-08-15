require("dotenv").config();
const express = require("express"); //Importa el módulo de Express, un framework de Node.js que facilita la creación de servidores web.
const app = express(); //Crea una aplicación Express.
const port = 3000;
const { connection } = require("./config/db.js");
app.use(express.json());

const loginRoutes = require("./routes/loginRoutes.js");

//endpoints

app.use("/api/login", loginRoutes);

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
