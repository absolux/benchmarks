
'use strict'

const createSpinner = require('ora')
const { promisify } = require('util')
const { readdirSync } = require('fs')
const { fork } = require('child_process')
const { basename, join } = require('path')
const wunderbar = require('@gribnoysup/wunderbar')

const wrk = promisify(require('wrk'))

const wrkOptions = {
  url: 'http://0.0.0.0:9000',
  connections: 100,
  duration: 5,
  threads: 10
}

/**
 * 
 * 
 * @param {Number} ms
 * @private
 */
function _wait(ms = 1) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * 
 * 
 * @param {String} app
 * @param {Object} options
 * @returns {Number}
 * @private
 */
async function _bench (app, options) {
  // create sub process
  var forked = fork(app)

  // wait until the server runs
  await _wait(1000)

  // start `wrk`
  var results = await wrk(options)

  // terminate the process
  forked.kill('SIGINT')

  return results.requestsPerSec
}

/**
 * Run benchmarks of the given apps
 * 
 * @param {Array<{ name: String, path: String, version: String }>} apps
 * @public
 */
async function run (apps) {
  var results = []

  for (let { name, path, version } of apps) {
    let spinner = createSpinner()

    try {
      spinner.start(`Bench: ${name} v${version}`)

      var rps = await _bench(path, wrkOptions)

      // save the results
      results.push({ value: rps, label: name })

      spinner.succeed()
    } catch (err) {
      console.error(err)
      spinner.fail()
      results = []
      break
    }
  }

  if (results.length) {
    _printChart(results, {
      length: 100,
      // sort: 'min',
      min: 0
    })
  }
}

/**
 * Draw the console chart
 * 
 * @param {Array<{ label: string, value: number }>} data
 * @param {{ [x: string]: any }} options
 * @private
 */
function _printChart (data, options) {
  var { chart, legend } = wunderbar(data, options)

  console.log()
  console.log(chart)
  console.log()
  console.log(legend)
  console.log()
}

// exports
module.exports = run
