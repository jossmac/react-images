'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _aphrodite = require('aphrodite');

var _theme = require('../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function BigContainer(_ref) {
	var props = _objectWithoutProperties(_ref, []);

	var classes = _aphrodite.StyleSheet.create(defaultStyles(props.isMobile));

	return _react2.default.createElement('div', _extends({
		className: (0, _aphrodite.css)(classes.container)
	}, props));
}

var defaultStyles = function defaultStyles(isMobile) {
	return {
		container: {
			display: 'flex',
			flexDirection: isMobile ? 'column-reverse' : 'row',
			height: '100%',
			width: '100%',
			top: '0px',
			left: '0px',
			position: 'fixed',
			zIndex: _theme2.default.container.zIndex
		}
	};
};

exports.default = BigContainer;