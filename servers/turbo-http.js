
'use strict'

const { createServer } = require('turbo-http')

var server = createServer(function (req, res) {
  res.setHeader('Content-Length', '12')
  res.setHeader('Content-Type', 'text/plain')
  res.write(Buffer.from('Hello world!'))
})

/**
 * Launch the app
 *
 * @returns {Promise<Number>}
 */
exports.start = async function start () {
  return new Promise((resolve) => server.listen(0, resolve)).then(() => {
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
