const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Middleware para processar JSON
app.use(bodyParser.json());

// Rota para salvar localização
app.post("/save-location", (req, res) => {
  const { latitude, longitude } = req.body;

  if (!latitude || !longitude) {
    return res.status(400).send("Dados inválidos");
  }

  // Salva os dados em um arquivo
  const data = { latitude, longitude, timestamp: new Date() };
  fs.appendFileSync("locations.json", JSON.stringify(data) + "\n");

  res.status(200).send("Localização salva com sucesso!");
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
