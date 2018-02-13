
'use strict'

const { createServer } = require('aldo-http')

// configure the server
const server = createServer((req, res) => {
  // send the response
  res.send('Hello world!')
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
