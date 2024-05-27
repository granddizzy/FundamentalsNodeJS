const http = require('http')
const fs = require('fs')
const path = require('path')

// будем использовать объект для подсчета посещений страниц
let viewCounts = {};

const server = http.createServer((req, res) => {
  if (viewCounts.hasOwnProperty(req.url)) {
    viewCounts[req.url] += 1;
  } else {
    viewCounts[req.url] = 1;
  }

  if (req.url === '/') {
    res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
    res.end(`
<h1>Главная страница</h1>
<p>Просмотров: ${viewCounts['/']}</p>
<a href="/about">Перейти на страницу /about</a>
`)
  } else if (req.url === '/about') {
    res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
    res.end(`
<h1><h1>Cтраница about</h1>
<p>Просмотров: ${viewCounts['/about']}</p></h1>
<a href="/">Перейти на главную</a>
`)
  } else if (req.url === '/img/404.jpg') {
    // join формирует корректный путь к файлу изображения 404.jpg, который находится в директории img.
    const imagePath = path.join(__dirname, 'img', '404.jpg')
    fs.readFile(imagePath, (err, data) => {
      if (err) {
        res.writeHead(500, {'Content-Type': 'text/html; charset=UTF-8'})
        res.end('<h1>Ошибка сервера</h1>')
      } else {
        res.writeHead(200, {'Content-Type': 'image/jpeg'})
        res.end(data)
      }
    })
  } else {
    res.writeHead(404, {'Content-Type': 'text/html; charset=UTF-8'})
    res.end(`
<div style="height: 95vh; width: 100%; background-image: url('./img/404.jpg'); background-size: contain; background-position: center; background-repeat: no-repeat">
</div>
`)
  }
})
server.listen(3000)