const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Conéctate a la base de datos MongoDB
mongoose.connect('mongodb://mongo:BC2cHB36-GG4B6c45C3h--dFEdbcfC53@roundhouse.proxy.rlwy.net:49540', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Conexión a MongoDB exitosa');
});

// Define un modelo de datos utilizando Mongoose
const ViteData = mongoose.model('ViteData', {
  name: String,
  // Agrega otros campos según tu colección
});

// Define una ruta para obtener datos de la colección "vite"
app.get('/api/data', async (req, res) => {
  try {
    const data = await ViteData.find(); // Consulta todos los documentos en la colección "vite"
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al recuperar datos de MongoDB' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor Express en el puerto ${PORT}`);
});
