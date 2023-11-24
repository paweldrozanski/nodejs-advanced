process.env.UV_THREADPOOL_SIZE = 1;

const cluster = require('cluster')
const express = require('express')
const crypto = require('crypto')

const app = express()

// Is the file being executed in the master mode?
if (cluster.isMaster) {
  // Cause index.js to be executed *again* but in the child mode

  // Use forks number same as cores in your CPU for optimization purposes
  // I'm using M1 cpu with 8 cores, so I will use 8 forks
  cluster.fork()
  cluster.fork()
  cluster.fork()
  cluster.fork()
  cluster.fork()
  cluster.fork()
  cluster.fork()
  cluster.fork()
} else {
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
}

