const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello from bankadd_smartdesk!");
});

app.get("/apporteur-app", (req, res) => {
  res.send("Hello from Apporteur App");
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
