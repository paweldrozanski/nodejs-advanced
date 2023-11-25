const express = require('express')
const crypto = require('crypto')

// test
const app = express()

// i'm a child, i'm going to act like a server and do nothing else
function doWork(duration) {
  const start = Date.now();

  while (Date.now() - start < duration) {}
}

app.get('/', (_req, res) => {
  crypto.pbkdf2('a', 'b', 400000, 512, 'sha512', () => {
    res.send('Hi there!')
  })
})

// non blocked route to compare load times while utilizing clusters
app.get('/fast', (req, res) => {
  res.send('This was fast!');
})

app.listen(3000);
