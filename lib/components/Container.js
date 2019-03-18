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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function Container(_ref, _ref2) {
	var theme = _ref2.theme;

	var props = _objectWithoutProperties(_ref, []);

	var classes = _noImportant.StyleSheet.create((0, _deepMerge2.default)(defaultStyles(props.isMobile), theme));

	return _react2.default.createElement('div', _extends({ id: 'lightboxBackdrop',
		className: (0, _noImportant.css)(classes.container)
	}, props));
}

Container.contextTypes = {
	theme: _propTypes2.default.object.isRequired
};

var defaultStyles = function defaultStyles(isMobile) {
	return {
		container: {
			flex: isMobile ? '1 0 45%' : '3 0 75%',
			alignItems: 'center',
			backgroundColor: _theme2.default.container.background,
			boxSizing: 'border-box',
			display: 'flex',
			justifyContent: 'center',
			paddingBottom: _theme2.default.container.gutter.vertical,
			paddingLeft: _theme2.default.container.gutter.horizontal,
			paddingRight: _theme2.default.container.gutter.horizontal,
			paddingTop: _theme2.default.container.gutter.vertical,
			position: 'relative'
		}
	};
};

exports.default = Container;