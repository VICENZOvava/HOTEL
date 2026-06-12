require('dotenv').config();
const express = require('express');
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const reservasRoutes = require('./src/routes/reservas.routes');

app.use('/reservas', reservasRoutes);


const quartoRoutes = require('./src/routes/quarto.routes');

app.use('/quarto', quartoRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
