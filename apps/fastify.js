
'use strict'

const app = require('fastify')()

var server = app.server

app.use((_, reply) => {
  reply.send('Hello world!')
})

/**
 * Launch the app
 *
 * @returns {Promise<Number>}
 */
exports.start = function start () {
  return new Promise((resolve) => {
    server.listen(0, resolve)
  }).then(() => {
    return server.address().port
  })
}

/**
 * Shut down the app
 *
 * @returns {Promise<void>}
 */
exports.stop = function stop () {
  return new Promise((resolve) => server.close(resolve))
}
