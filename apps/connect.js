
'use strict'

var server
var app = require('connect')()

app.use((_, res) => {
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello world!')
})

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
