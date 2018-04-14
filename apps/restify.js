
'use strict'

const { createServer } = require('restify')

const server = createServer()

server.get('/', (_, res) => {
  res.send({ hello: 'world' })
})

server.listen(9000)
