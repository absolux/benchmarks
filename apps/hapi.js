
'use strict'

const Hapi = require('hapi')

const server = Hapi.server({
  port: 9000
})

server.route({
  path: '/',
  method: 'GET',
  handler: () => ({ hello: 'world' })
})

// Start the server
server.start()
