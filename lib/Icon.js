'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _icons = require('./icons');

var _icons2 = _interopRequireDefault(_icons);

var Icon = function Icon(props) {
	return _react2['default'].createElement('span', _extends({
		dangerouslySetInnerHTML: { __html: _icons2['default'][props.type] }
	}, props));
};

Icon.propTypes = {
	type: _react.PropTypes.oneOf(Object.keys(_icons2['default']))
};

exports['default'] = Icon;
module.exports = exports['default'];