
'use strict'

const app = require('express')()

// configure the app
var server

// app.disable('etag')
// app.disable('x-powered-by')

app.use((req, res) => res.send('Hello World!'))

/**
 * Launch the app
 *
 * @returns {Promise<Number>}
 */
exports.start = function start () {
  return new Promise((resolve) => {
    server = app.listen(0, resolve)
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
