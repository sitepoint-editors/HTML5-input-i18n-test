const spawn = require('child_process').spawn;
const fs = require('fs');
const app = require('express')();

const LISTEN_PORT = 4000;
const TEST_URLS = ((languages) => {
  const urls = [];

  languages.forEach((languageHttp) => {
    languages.forEach((languageDocument) => {
      urls.push(`http://localhost:${LISTEN_PORT}/${languageHttp}/${languageDocument}`);
    });
  });

  return urls;
})(['en', 'nl']);

app.get('/', (req, res, next) => {
  res.set({
    'Content-Language': 'en',
    'Content-Type': 'text/html',
  });

  let response = TEST_URLS.map((testUrl) => {
    return `<div><a href="${testUrl}">${testUrl}</a></div>`;
  }).join('');

  res.send(response);
});

app.get('/:languageHttp/:languageDocument', (req, res, next) => {
  res.set({
    'Content-Language': 'en',
    'Content-Type': 'text/html',
  });

  fs.readFile(`${__dirname}/index.html`, (err, data) => {
    res.send(data.toString().replace('{{language}}', req.params.languageDocument));
  });
});

app.listen(LISTEN_PORT, () => {
  console.log(`Started server on http://localhost:${LISTEN_PORT}`);
});
