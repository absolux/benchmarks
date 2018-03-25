
'use strict'

var Trek = require('trek-engine')

var server
var app = new Trek()

app.use(({ res }) => {
  res.body = 'Hello world!'
})

/**
 * Launch the app
 *
 * @returns {Promise<Number>}
 */
exports.start = function start () {
  return new Promise((resolve) => {
    server = app.run(0, resolve)
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
