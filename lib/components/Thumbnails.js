'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _aphroditeNoImportant = require('aphrodite/no-important');

var _Thumbnail = require('./Thumbnail');

var _Thumbnail2 = _interopRequireDefault(_Thumbnail);

var _theme = require('../theme');

var _theme2 = _interopRequireDefault(_theme);

function Thumbnails(_ref) {
	var currentImage = _ref.currentImage;
	var images = _ref.images;
	var onClickThumbnail = _ref.onClickThumbnail;

	return _react2['default'].createElement(
		'div',
		{ className: (0, _aphroditeNoImportant.css)(classes.thumbnails) },
		images.map(function (img, idx) {
			return _react2['default'].createElement(_Thumbnail2['default'], _extends({}, img, {
				active: idx === currentImage,
				index: idx,
				key: idx,
				onClick: onClickThumbnail
			}));
		})
	);
}

Thumbnails.propTypes = {
	currentImage: _react.PropTypes.number,
	images: _react.PropTypes.array,
	onClickThumbnail: _react.PropTypes.func.isRequired
};

var classes = _aphroditeNoImportant.StyleSheet.create({
	thumbnails: {
		bottom: _theme2['default'].container.gutter.vertical,
		color: 'white',
		height: _theme2['default'].thumbnail.size,
		left: _theme2['default'].container.gutter.horizontal,
		overflowX: 'scroll',
		overflowY: 'hidden',
		position: 'absolute',
		right: _theme2['default'].container.gutter.horizontal,
		textAlign: 'center',
		whiteSpace: 'nowrap'
	}
});

exports['default'] = Thumbnails;
module.exports = exports['default'];