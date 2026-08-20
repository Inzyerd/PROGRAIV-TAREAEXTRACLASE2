const express = require('express');

const app = express();
app.use(express.json());

// Almacenamiento en memoria (suficiente para demostrar el pipeline)
const users = [];

function sum(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number' || Number.isNaN(a) || Number.isNaN(b)) {
    throw new TypeError('a y b deben ser números');
  }
  return a + b;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/sum', (req, res) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);
  try {
    const result = sum(a, b);
    res.status(200).json({ result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/users', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'name y email son requeridos' });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'email inválido' });
  }

  const user = { id: users.length + 1, name, email };
  users.push(user);
  return res.status(201).json(user);
});

app.get('/users', (req, res) => {
  res.status(200).json(users);
});

module.exports = { app, sum, isValidEmail };
