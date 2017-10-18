'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _arrowLeft = require('../icons/arrowLeft');

var _arrowLeft2 = _interopRequireDefault(_arrowLeft);

var _arrowRight = require('../icons/arrowRight');

var _arrowRight2 = _interopRequireDefault(_arrowRight);

var _close = require('../icons/close');

var _close2 = _interopRequireDefault(_close);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var icons = { arrowLeft: _arrowLeft2.default, arrowRight: _arrowRight2.default, close: _close2.default };

var Icon = function Icon(_ref) {
	var fill = _ref.fill,
	    type = _ref.type,
	    props = _objectWithoutProperties(_ref, ['fill', 'type']);

	var icon = icons[type];

	return _react2.default.createElement('span', _extends({
		dangerouslySetInnerHTML: { __html: icon(fill) }
	}, props));
};

Icon.propTypes = {
	fill: _propTypes2.default.string,
	type: _propTypes2.default.oneOf(Object.keys(icons))
};
Icon.defaultProps = {
	fill: 'white'
};

exports.default = Icon;