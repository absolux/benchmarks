
'use strict'

const { Application } = require('aldo')

const app = new Application()

app.use(({ res }) => {
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ hello: 'world' }))
})

app.listen(9000)
