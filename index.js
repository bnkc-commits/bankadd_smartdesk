const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Route pour Apporteur App
app.get('/apporteur-app', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Apporteur App</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; margin-top: 50px; }
          h1 { color: #2c3e50; }
          p { color: #34495e; }
        </style>
      </head>
      <body>
        <h1>Hello from Apporteur App</h1>
        <p>Bienvenue sur votre application déployée avec Render !</p>
      </body>
    </html>
  `);
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
