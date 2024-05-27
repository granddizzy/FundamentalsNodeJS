const http = require('http')

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
<a href="/">Перейти на главную /about</a>
`)
  } else {
    res.writeHead(404, {'Content-Type': 'text/html; charset=UTF-8'})
    res.end('<h1>Not found</h1>')
  }
})
server.listen(3000)