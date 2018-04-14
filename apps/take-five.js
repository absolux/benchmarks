
'use strict'

const server = require('take-five')()

server.get('/', function (_, res) {
  res.send({ hello: 'world' })
})

server.listen(9000)
