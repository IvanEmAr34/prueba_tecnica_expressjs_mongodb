require("dotenv").config();

const port = process.env.PORT ?? 3000;

const usuarios = require("./routes/usuarios");
const express = require("express");
const cors = require("cors");
const app = express();

// const schema = Joi.obj

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use("/api/users", usuarios);

app.listen(port, () => {
  console.log(`escuchando en el puerto ${port}`);
});
