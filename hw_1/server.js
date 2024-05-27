const http = require('http')
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
    res.end('<h1>123</h1>')
  }
  else if (req.url === '/about') {
    res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
    res.end('<h1>456</h1>')
  }
  else {
    res.writeHead(404, {'Content-Type': 'text/html; charset=UTF-8'})
    res.end('not found')
  }
})
server.listen(3000)