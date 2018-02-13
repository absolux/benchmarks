
'use strict'

const { createServer } = require('http')

// configure the server
const server = createServer((req, res) => {
  let body = 'Hello world!'

  // set content headers
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.setHeader('Content-Length', Buffer.byteLength(body))

  // send the response
  res.end(body)
})

/**
 * Launch the app
 *
 * @param {Number} port
 * @returns {Promise<void>}
 */
exports.up = function up (port) {
  return new Promise((resolve) => server.listen(port, resolve))
}

/**
 * Shut down the app
 *
 * @returns {Promise<void>}
 */
exports.down = function down () {
  return new Promise((resolve) => server.close(resolve))
}
