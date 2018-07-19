import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';

const name = 'Lightbox';
const path = 'dist/react-images';
const globals = {
	'prop-types': 'PropTypes',
	'react-dom': 'ReactDOM',
	react: 'React',
  aphrodite: 'aphrodite',
  'aphrodite/no-important': 'aphrodite',
  'react-scrolllock': 'ScrollLock',
  'react-transition-group': 'ReactTransitionGroup',
  'react-spinners': 'BounceLoader'
};
const external = Object.keys(globals);
const babelOptions = (production) => {
  let result = {
    babelrc: false,
    presets: [['env', { modules: false  }], 'react'],
    plugins: [["transform-object-rest-spread", { "useBuiltIns": true   }], 'transform-object-rest-spread', 'external-helpers'],
  };
	if (production) {
		result.plugins.push('transform-react-remove-prop-types');
	};
	return result;
};

export default [
	{
		input: 'src/Lightbox.js',
		output: {
			file: path + '.es.js',
			format: 'es',
		},
		external: external,
		plugins: [babel(babelOptions(false))],
	},
	{
		input: 'src/Lightbox.js',
		output: {
			name: name,
			file: path + '.js',
			format: 'umd',
		},
		globals: globals,
		external: external,
		plugins: [babel(babelOptions(false)), resolve()],
	},
	{
		input: 'src/Lightbox.js',
		output: {
			name: name,
			file: path + '.min.js',
			format: 'umd',
		},
		globals: globals,
		external: external,
		plugins: [babel(babelOptions(true)), resolve(), uglify({}, minify)],
	},
];
