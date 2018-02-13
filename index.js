
'use strict'

const wrk = require('wrk')
const createSpinner = require('ora')
const { promisify } = require('util')
const { readdirSync } = require('fs')
const { basename, join } = require('path')

const PORT = process.env.PORT || 3000

const wrkPromise = promisify(wrk)

async function test (port) {
  const options = {
    // duration: 3,
    threads: 10,
    connections: 100,
    url: `http://localhost:${port}`
  }

  return (await wrkPromise(options)).requestsPerSec
}

async function doBench (name, app, port) {
  var result = { name }

  // start
  await app.up(port)

  // wrk
  result.rps = await test(port)

  // stop
  await app.down()

  return result
}

async function bench (path) {
  const results = []
  const files = readdirSync(path)

  for (let source of files) {
    const spinner = createSpinner()
    const name = basename(source).slice(0, -3)
    const app = require(join(__dirname, path, source))

    try {
      spinner.start(`Working on ${name} app`)

      results.push(await doBench(name, app, PORT))

      spinner.succeed()
    } catch (error) {
      spinner.fail()
    }
  }

  console.dir(results.sort((a, b) => a.rps < b.rps), { colors: true })
}

bench('hello')
