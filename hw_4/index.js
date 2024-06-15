const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const e = require("express");
const joi = require("joi")
const port = 3000;
const usersFile = 'db/users.json'

app.use(express.json())

const usersSchema = joi.object({
  name: joi.string().min(1).required(),
  surname: joi.string().min(1).required(),
  age: joi.number().min(0).required(),
  city: joi.string(),
})

app.get('/users', (req, res) => {
  const users = JSON.parse(fs.readFileSync(path.join(__dirname, usersFile), 'utf-8'));
  res.send({users});
});

app.get('/user/:id', (req, res) => {
  const users = JSON.parse(fs.readFileSync(path.join(__dirname, usersFile), 'utf-8'));
  const user = users.find(item => item.id === +req.params.id)
  if (user) {
    res.send({user});
  } else {
    res.status(404).send({user: null, error: "not found", status: "error"});
  }
});

app.post('/users', (req, res) => {
  const result = usersSchema.validate(req.body)
  if (result.error) {
    return res.status(400).send({error: result.error.details, status: 'error'})
  }

  const users = JSON.parse(fs.readFileSync(path.join(__dirname, usersFile), 'utf-8'));
  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    name: req.body.name,
    surname: req.body.surname,
    age: req.body.age,
    city: req.body.city,
  }
  users.push(newUser);
  fs.writeFileSync(path.join(__dirname, usersFile), JSON.stringify(users, null, 2));
  res.send({user: newUser});
});

app.put('/user/:id', (req, res) => {
  const result = usersSchema.validate(req.body)
  if (result.error) {
    return res.status(404).send({error: result.error.details, status: 'error'})
  }

  const users = JSON.parse(fs.readFileSync(path.join(__dirname, usersFile), 'utf-8'));
  const user = users.find(item => item.id === +req.params.id)
  if (user) {
    user.name = req.body.name;
    user.surname = req.body.surname;
    user.age = req.body.age;
    user.city = req.body.city;
    fs.writeFileSync(path.join(__dirname, usersFile), JSON.stringify(users, null, 2));
    res.send({user});
  } else {
    res.status(404).send({user: null, error: "not found", status: "error"});
  }
});

app.delete('/user/:id', (req, res) => {
  const users = JSON.parse(fs.readFileSync(path.join(__dirname, usersFile), 'utf-8'));
  const userIndex = users.findIndex(item => item.id === +req.params.id)
  if (userIndex > -1) {
    users.splice(userIndex, 1);
    fs.writeFileSync(path.join(__dirname, usersFile), JSON.stringify(users, null, 2));
    res.send({status: 'ok'});
  } else {
    res.status(404).send({user: null, error: "not found", status: "error"});
  }
});

app.use(express.static('static_pages'));
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'static_pages', '404.html'));
});

app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});