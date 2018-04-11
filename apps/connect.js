
'use strict'

const app = require('connect')()

app.use((_, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ hello: 'world' }))
})

app.listen(9000)
