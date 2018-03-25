
'use strict'

const createSpinner = require('ora')
const { promisify } = require('util')
const { readdirSync } = require('fs')
const { basename, join } = require('path')
const wunderbar = require('@gribnoysup/wunderbar')

const wrk = promisify(require('wrk'))

/**
 * @param {string} port
 */
async function request (url) {
  var options = {
    duration: 5,
    threads: 10,
    connections: 100,
    url: url
  }

  return (await wrk(options)).requestsPerSec
}

/**
 * @param {string} label
 * @param {string} app
 */
async function bench (label, app) {
  var port = await app.start()

  // calculate
  var value = await request(`http://0.0.0.0:${port}`)

  await app.stop()

  return { label, value }
}

/**
 * @param {string} folder
 */
function loadFiles (folder) {
  return readdirSync(folder).map((filename) => {
    return {
      name: basename(filename).slice(0, -3),
      path: join(__dirname, folder, filename)
    }
  })
}

/**
 * @param {string} folder
 */
async function run (folder) {
  var results = []
  var files = loadFiles(folder)

  for (let { name, path } of files) {
    let spinner = createSpinner()

    try {
      spinner.start(`Working on "${name}"`)

      results.push(await bench(name, require(path)))

      spinner.succeed()
    } catch (err) {
      console.error(err)
      spinner.fail()
      results = []
      break
    }
  }

  if (results.length) {
    printChart(results, {
      length: 100,
      // sort: 'min',
      min: 0
    })
  }
}

/**
 * @param {Array<{ label: string, value: number }>} data
 * @param {{ [x: string]: any }} options
 */
function printChart (data, options) {
  var { chart, legend } = wunderbar(data, options)

  console.log()
  console.log(chart)
  console.log()
  console.log(legend)
  console.log()
}

// exports
module.exports = run
