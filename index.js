const express = require('express')
const app = express()
const { Worker } = require('worker_threads')

app.get('/', (_req, res) => {
  const worker = new Worker('./worker.js');

  worker.on('message', function(message) {
    console.log(message)
    res.send('' + message)
  })

  worker.postMessage('start!')
})

// non blocked route to compare load times while utilizing clusters
app.get('/fast', (req, res) => {
  res.send('This was fast!');
})

app.listen(3000);
