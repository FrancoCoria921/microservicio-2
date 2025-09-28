// server.js

const express = require('express');
const app = express();
const cors = require('cors');

// La variable PORT se toma del entorno (como Railway), si no, usa 3000
const port = process.env.PORT || 3000;

// Habilitar CORS para que la aplicación sea accesible públicamente
app.use(cors({ optionsSuccessStatus: 200 })); 

// ----------------------------------------------------------------------
// RUTA DE INICIO
// ----------------------------------------------------------------------

// Una ruta simple para verificar que el servidor está activo.
app.get('/', (req, res) => {
  res.send('Request Header Parser Microservice is running. Navigate to /api/whoami');
});

// ----------------------------------------------------------------------
// RUTA PRINCIPAL DE LA API
// ----------------------------------------------------------------------

app.get('/api/whoami', (req, res) => {
  // 1. Obtener la dirección IP del cliente
  // La IP real a menudo viene en el encabezado 'x-forwarded-for' cuando se usa un proxy (como en Railway).
  // Si no, se usa req.ip.
  const ipaddress = req.header('x-forwarded-for') || req.ip;
  
  // 2. Obtener el idioma preferido del cliente
  // Se extrae del encabezado 'Accept-Language'.
  const language = req.header('Accept-Language');

  // 3. Obtener el software (User-Agent) del cliente
  // Se extrae del encabezado 'User-Agent'.
  const software = req.header('User-Agent');

  // 4. Devolver el objeto JSON con la información recopilada
  res.json({
    ipaddress: ipaddress,
    language: language,
    software: software
  });
});

// ----------------------------------------------------------------------
// INICIO DEL SERVIDOR
// ----------------------------------------------------------------------

app.listen(port, () => {
  console.log(`Tu servidor está escuchando en el puerto ${port}...`);
});
