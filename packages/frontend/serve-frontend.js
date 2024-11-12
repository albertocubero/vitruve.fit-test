const express = require('express');
const path = require('path');

const app = express();
const PORT = 4200;

// Configura la ruta para servir archivos estáticos desde `dist/packages/frontend`
const frontendDistPath = path.join(__dirname, '../../dist/packages/frontend');
app.use(express.static(frontendDistPath));

// Ruta por defecto para cualquier otra solicitud
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendDistPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Frontend server running on http://localhost:${PORT}`);
});
