const express = require('express')
const app = express()
const path = require('path')

app.listen(4000, err => {
  if (!err) {
    console.log('listen 80')
  }
})

// slideBar
app.get('/api/slideBar', (req, res) => {
  res.sendFile(path.join(__dirname, '/data/sidebar.md'))
})
