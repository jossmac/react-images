'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _noImportant = require('aphrodite/no-important');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Caption(_ref) {
	var render = _ref.render,
	    currentImage = _ref.currentImage,
	    isMobile = _ref.isMobile;

	var classes = _noImportant.StyleSheet.create(defaultStyles(isMobile));

	return _react2.default.createElement(
		'div',
		{ id: 'lightboxCaption',
			className: (0, _noImportant.css)(classes.container)
		},
		render({ currentImage: currentImage })
	);
}

var defaultStyles = function defaultStyles(isMobile) {
	return {
		container: {
			flex: isMobile ? '0 0 55%' : '0 0 25%',
			backgroundColor: '#2d2d2d',
			overflow: 'auto'
		}
	};
};

Caption.propTypes = {
	/**
  * Current image object
  */
	currentImage: _propTypes2.default.object.isRequired,
	/**
  * Render props to render caption
  */
	render: _propTypes2.default.func.isRequired
};

exports.default = Caption;