'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _noImportant = require('aphrodite/no-important');

var _theme = require('../theme');

var _theme2 = _interopRequireDefault(_theme);

var _deepMerge = require('../utils/deepMerge');

var _deepMerge2 = _interopRequireDefault(_deepMerge);

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function Arrow(_ref, _ref2) {
	var theme = _ref2.theme;

	var direction = _ref.direction,
	    icon = _ref.icon,
	    onClick = _ref.onClick,
	    size = _ref.size,
	    props = _objectWithoutProperties(_ref, ['direction', 'icon', 'onClick', 'size']);

	var classes = _noImportant.StyleSheet.create((0, _deepMerge2.default)(defaultStyles, theme));

	return _react2.default.createElement(
		'button',
		_extends({
			type: 'button',
			className: (0, _noImportant.css)(classes.arrow, classes['arrow__direction__' + direction], size && classes['arrow__size__' + size]),
			onClick: onClick,
			onTouchEnd: onClick
		}, props),
		_react2.default.createElement(_Icon2.default, { fill: !!theme.arrow && theme.arrow.fill || _theme2.default.arrow.fill, type: icon })
	);
}

Arrow.propTypes = {
	direction: _propTypes2.default.oneOf(['left', 'right']),
	icon: _propTypes2.default.string,
	onClick: _propTypes2.default.func.isRequired,
	size: _propTypes2.default.oneOf(['medium', 'small']).isRequired
};
Arrow.defaultProps = {
	size: 'medium'
};
Arrow.contextTypes = {
	theme: _propTypes2.default.object.isRequired
};

var defaultStyles = {
	arrow: {
		background: 'none',
		border: 'none',
		borderRadius: 4,
		cursor: 'pointer',
		outline: 'none',
		padding: 10, // increase hit area
		position: 'absolute',
		top: '50%',

		// disable user select
		WebkitTouchCallout: 'none',
		userSelect: 'none'
	},

	// sizes
	arrow__size__medium: {
		height: _theme2.default.arrow.height,
		marginTop: _theme2.default.arrow.height / -2,
		width: 40,

		'@media (min-width: 768px)': {
			width: 70
		}
	},
	arrow__size__small: {
		height: _theme2.default.thumbnail.size,
		marginTop: _theme2.default.thumbnail.size / -2,
		width: 30,

		'@media (min-width: 500px)': {
			width: 40
		}
	},

	// direction
	arrow__direction__right: {
		right: _theme2.default.container.gutter.horizontal
	},
	arrow__direction__left: {
		left: _theme2.default.container.gutter.horizontal
	}
};

exports.default = Arrow;