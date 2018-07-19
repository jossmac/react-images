import PropTypes from 'prop-types';
import React from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

import defaults from '../theme';
import deepMerge from '../utils/deepMerge';

function Thumbnail(_ref, _ref2) {
	var index = _ref.index,
	    src = _ref.src,
	    thumbnail = _ref.thumbnail,
	    active = _ref.active,
	    _onClick = _ref.onClick;
	var theme = _ref2.theme;

	var url = thumbnail ? thumbnail : src;
	var classes = StyleSheet.create(deepMerge(defaultStyles, theme));

	return React.createElement('div', {
		className: css(classes.thumbnail, active && classes.thumbnail__active),
		onClick: function onClick(e) {
			e.preventDefault();
			e.stopPropagation();
			_onClick(index);
		},
		style: { backgroundImage: 'url("' + url + '")' }
	});
}

Thumbnail.propTypes = {
	active: PropTypes.bool,
	index: PropTypes.number,
	onClick: PropTypes.func.isRequired,
	src: PropTypes.string,
	thumbnail: PropTypes.string
};

Thumbnail.contextTypes = {
	theme: PropTypes.object.isRequired
};

var defaultStyles = {
	thumbnail: {
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		borderRadius: 2,
		boxShadow: 'inset 0 0 0 1px hsla(0,0%,100%,.2)',
		cursor: 'pointer',
		display: 'inline-block',
		height: defaults.thumbnail.size,
		margin: defaults.thumbnail.gutter,
		overflow: 'hidden',
		width: defaults.thumbnail.size
	},
	thumbnail__active: {
		boxShadow: 'inset 0 0 0 2px ' + defaults.thumbnail.activeBorderColor
	}
};

export default Thumbnail;