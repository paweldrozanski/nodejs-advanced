const https = require('https');
const crypto = require('crypto')
const fs = require('fs')

const start = Date.now()

function doRequest() {
  https.request('https://www.google.com', res => {
    res.on('data', () => {});
    res.on('end', () => {
      console.log(Date.now() - start)
    })
  }).end()
}

function doHash() {
  crypto.pbkdf2('a', 'b', 400000, 512, 'sha512', () => {
    console.log('Hash:', Date.now() - start)
  })
}

doRequest()

fs.readFile('multitask.js', 'utf8', () => {
  console.log('FS:', Date.now() - start)
})

doHash()
doHash()
doHash()
doHash()

// node multitask.js
// 227 -> request done
// Hash: 1116 -> hash calculation
// FS: 1117 -> hash calculation
// Hash: 1117 -> hash calculation
// Hash: 1125 -> hash calculation
// Hash: 1140 -> hash calculation
