const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const viewCountsFileName = 'viewCounts';

let viewCounts = {};
try {
  viewCounts = JSON.parse(fs.readFileSync(path.join(__dirname, viewCountsFileName), 'utf-8'));
} catch (e) {
  console.log(e.message)
}

app.get('/', (req, res) => {
  addViewCount(viewCounts, '/');
  res.send(`
<h1>Корневая страница</h1>
<p>Просмотров: ${viewCounts['/']}</p>
<a href="/about">Перейти на страницу /about</a>
`)
});
app.get('/about', (req, res) => {
  addViewCount(viewCounts, '/about');
  res.send(`
<h1>Страница About</h1>
<p>Просмотров: ${viewCounts['/about']}</p>
<a href="/">Перейти на главную страницу</a>
`)
});

app.use(express.static('static_pages'));
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'static_pages', '404.html'));
});

app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});

function addViewCount(viewCounts, url) {
  if (viewCounts.hasOwnProperty(url)) {
    viewCounts[url] += 1;
  } else {
    viewCounts[url] = 1;
  }

  try {
    fs.writeFileSync(path.join(__dirname, viewCountsFileName), JSON.stringify(viewCounts, null, 2));
  } catch (e) {
    console.log(e.message)
  }
}