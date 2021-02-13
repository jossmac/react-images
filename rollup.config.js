// @flow

import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import { uglify } from 'rollup-plugin-uglify'
import replace from 'rollup-plugin-replace'
import { minify } from 'uglify-es'

const name = 'Images'
const path = 'dist/react-images'
const globals = {
  classnames: 'classNames',
  glam: 'glam',
  'prop-types': 'PropTypes',
  'react-dom': 'ReactDOM',
  'react-input-autosize': 'AutosizeInput',
  'raf-schd': 'rafScheduler',
  'react-view-pager': 'PageView',
  'react-full-screen': 'Fullscreen',
  'a11y-focus-store': 'focusStore',
  'react-transition-group': 'Transition',
  'react-focus-on': 'FocusOn',
  react: 'React',
  'html-react-parser': 'ParseHtml',
}
import createEnv from 'dotenv'

createEnv.config()
const external = Object.keys(globals)
const babelOptions = prod => {
  let result = {
    babelrc: false,
    presets: [['env', { modules: false }], 'react'],
    plugins: ['transform-class-properties', 'transform-object-rest-spread', 'external-helpers'],
  }
  if (prod) {
    result.plugins.push('transform-react-remove-prop-types')
  }
  return result
}
const injectSecret = () => {
  return replace({
    'process.env.UNSPLASH_API_KEY': JSON.stringify(process.env.UNSPLASH_API_KEY),
  })
}

export default [
  {
    input: 'src/index.js',
    output: {
      file: path + '.es.js',
      format: 'es',
    },
    external: external,
    plugins: [babel(babelOptions(false)), injectSecret()],
  },
  {
    input: 'src/index.umd.js',
    output: {
      name: name,
      file: path + '.js',
      format: 'umd',
      globals: globals,
    },
    external: external,
    plugins: [babel(babelOptions(false)), injectSecret(), resolve()],
  },
  {
    input: 'src/index.umd.js',
    output: {
      name: name,
      file: path + '.min.js',
      format: 'umd',
      globals: globals,
    },
    external: external,
    plugins: [babel(babelOptions(true)), injectSecret(), resolve(), uglify({}, minify)],
  },
]
