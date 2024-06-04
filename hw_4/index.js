const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const e = require("express");
const joy = require("joy")
const port = 3000;
const usersFile = '/db/users.json'

app.use(express.json())

const usersSchema = joy.object({
  name: joy.string().min(1).required(),
  surname: joy.string().min(1).required(),
  age: joy.number().min(0).required(),
  city: joy.string(),
})

app.get('/users', (req, res) => {
  const users = JSON.parse(fs.readFileSync(path.join(__dirname, usersFile), 'utf-8'));
  res.send({users});
});

app.get('/user/:id', (req, res) => {
  const users = JSON.parse(fs.readFileSync(path.join(__dirname, usersFile), 'utf-8'));
  const user = users.find((item) => {
    item.id === +req.params.id
  })
  if (user) {
    res.send({user});
  } else {
    res.status(404).send({user: null, error: "not found", status: "error"});
  }
});

app.post('/users', (req, res) => {
  const result = usersSchema.validate(req.body)
  if (result.error) {
    return res.status(404).send({error: result.error.details, status: 'error'})
  }

  const users = JSON.parse(fs.readFileSync(path.join(__dirname, usersFile), 'utf-8'));
  const user = {
    name: req.body.name,
    surname: req.body.surname,
    age: req.body.age,
    city: req.body.city,
  }
  users.push(user);
  fs.writeFileSync(path.join(__dirname, usersFile), JSON.stringify(users, null, 2));
  res.send({user});
});

app.put('/user/:id', (req, res) => {
  const result = usersSchema.validate(req.body)
  if (result.error) {
    return res.status(404).send({error: result.error.details, status: 'error'})
  }

  const users = JSON.parse(fs.readFileSync(path.join(__dirname, usersFile), 'utf-8'));
  const user = users.find((item) => {
    item.id === +req.params.id
  })
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
  const userIndex = users.findIndex((item) => {
    item.id === +req.params.id
  })
  if (userIndex > -1) {
    users.slice(userIndex, 1);
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