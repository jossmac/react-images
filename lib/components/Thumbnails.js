var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import PropTypes from 'prop-types';
import React from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';
import Thumbnail from './Thumbnail';

import theme from '../theme';

function Thumbnails(_ref) {
	var currentImage = _ref.currentImage,
	    images = _ref.images,
	    onClickThumbnail = _ref.onClickThumbnail;

	return React.createElement(
		'div',
		{ className: css(classes.thumbnails) },
		images.map(function (img, idx) {
			return React.createElement(Thumbnail, _extends({}, img, {
				active: idx === currentImage,
				index: idx,
				key: idx,
				onClick: onClickThumbnail
			}));
		})
	);
}

Thumbnails.propTypes = {
	currentImage: PropTypes.number,
	images: PropTypes.array,
	onClickThumbnail: PropTypes.func.isRequired
};

var classes = StyleSheet.create({
	thumbnails: {
		bottom: theme.container.gutter.vertical,
		color: 'white',
		height: theme.thumbnail.size,
		left: theme.container.gutter.horizontal,
		overflowX: 'scroll',
		overflowY: 'hidden',
		position: 'absolute',
		right: theme.container.gutter.horizontal,
		textAlign: 'center',
		whiteSpace: 'nowrap'
	}
});

export default Thumbnails;