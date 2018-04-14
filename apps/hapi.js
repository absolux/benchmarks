
'use strict'

const Hapi = require('hapi')

const server = Hapi.server({
  port: 9000
})

server.route({
  method: 'GET',
  path: '/',
  handler: (request, h) => {
      return { hello: 'world' }
  }
})

// Start the server
server.start()
