
'use strict'

const micro = require('micro')

// configure the app
const server = micro(async function (req, res) {
  return 'Hello world!'
})

/**
 * Launch the app
 *
 * @param {Number} port
 * @returns {Promise<void>}
 */
exports.up = async function up (port) {
  return new Promise((resolve) => server.listen(port, resolve))
}

/**
 * Shut down the app
 *
 * @returns {Promise<void>}
 */
exports.down = async function down () {
  return new Promise((resolve) => server.close(resolve))
}
