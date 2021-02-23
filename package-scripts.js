// @flow

const npsUtils = require('nps-utils')
const series = npsUtils.series
const rimraf = npsUtils.rimraf
const concurrent = npsUtils.concurrent

module.exports = {
  scripts: {
    build: {
      description: 'clean dist directory and run all builds',
      default: series(rimraf('dist'), rimraf('lib'), concurrent.nps('build.rollup', 'build.babel')),
      rollup: 'cross-env rollup --config',
      babel: 'cross-env babel src -d lib',
      watch: 'cross-env babel src -d lib -w',
      docs: series(rimraf('docs/dist'), 'webpack --progress -p'),
    },
    publish: {
      default: series('nps build.docs', 'cross-env gh-pages -d docs/dist', rimraf('docs/dist')),
    },
  },
}
