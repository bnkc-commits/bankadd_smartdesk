const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello from bankadd_smartdesk!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 

app.get('/apporteur-app', (req, res) => {
  res.send('Hello from Apporteur App');
});
