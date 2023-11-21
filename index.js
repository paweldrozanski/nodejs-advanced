const cluster = require('cluster')
const express = require('express')
const app = express()

// Is the file being executed in the master mode?
if (cluster.isMaster) {
  // Cause index.js to be executed *again* but in the child mode
  cluster.fork()
} else {
  // i'm a child, i'm going to act like a server and do nothing else
  function doWork(duration) {
    const start = Date.now();

    while (Date.now() - start < duration) {}
  }

  app.get('/', (_req, res) => {
    doWork(5000); // <- blocking operation
    res.send('Hi there!')
  })

  app.listen(3000);
}

