
'use strict'

const { Application } = require('aldo')

var app = new Application()

app.use(({ res }) => {
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello world!')
})

var server

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
