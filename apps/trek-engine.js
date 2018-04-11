
'use strict'

const Application = require('trek-engine')

const app = new Application()

app.use(function ({ res }) {
  res.body = { hello: 'world' }
})

app.run(9000)
