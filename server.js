const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const dbPath = './usuarios.json';
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, '{}');
}

app.post('/cadastrar', (req, res) => {
  const { usuario, senha, perfil } = req.body;
  const db = JSON.parse(fs.readFileSync(dbPath));
  db[usuario] = { senha, perfil };
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  res.json({ mensagem: 'Usuário cadastrado com sucesso.' });
});

app.post('/login', (req, res) => {
  const { usuario, senha } = req.body;
  const db = JSON.parse(fs.readFileSync(dbPath));
  if (db[usuario] && db[usuario].senha === senha) {
    if (db[usuario].perfil === 'admin') {
      res.json({ mensagem: 'admin', dados: db });
    } else {
      res.json({ mensagem: 'usuario', nome: usuario });
    }
  } else {
    res.status(403).json({ mensagem: 'Usuário ou senha inválidos.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});