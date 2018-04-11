
const run = require('./lib/runner')
const pkg = require('./package.json')
const { readdirSync } = require('fs')
const { basename, join } = require('path')

/**
 * Load the apps to benchmark
 * 
 * @param {String} folder
 * @returns {Array<{name: String, path: String, version: String}>}
 * @private
 */
function _loadFiles (folder) {
  return readdirSync(folder).map((filename) => {
    var name = basename(filename).slice(0, -3)
    var path = join(__dirname, folder, filename)
    var version = pkg.dependencies[name].slice(1)

    return { name, path, version }
  })
}

// run benchmarks
run(_loadFiles('./apps'))
