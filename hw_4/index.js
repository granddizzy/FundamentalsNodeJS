const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const e = require("express");
const port = 3000;
const usersFile = '/db/users.json'

app.use(express.json())

app.get('/users', (req, res) => {
  const users = JSON.parse(fs.readFileSync(path.join(__dirname, usersFile), 'utf-8'));
  res.send({users});
});

app.post('/', (req, res) => {

});

app.put('/', (req, res) => {

});

app.delete('/', (req, res) => {

});

app.use(express.static('static_pages'));
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'static_pages', '404.html'));
});

app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});