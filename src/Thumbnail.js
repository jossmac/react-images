import React, { PropTypes } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

import theme from './theme';

function Thumbnail ({ index, src, thumbnail, active, onClick }) {
	const url = thumbnail ? thumbnail : src;

	return (
		<div
			className={css(classes.thumbnail, active && classes.active)}
			onClick={() => onClick(index)}
			style={{ backgroundImage: 'url("' + url + '")' }}
		/>
	);
}

Thumbnail.propTypes = {
	active: PropTypes.bool,
	index: PropTypes.number,
	onClick: PropTypes.func.isRequired,
	src: PropTypes.string,
	thumbnail: PropTypes.string,
};

const classes = StyleSheet.create({
	thumbnail: {
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		borderRadius: 2,
		boxShadow: 'inset 0 0 0 1px hsla(0,0%,100%,.2)',
		cursor: 'pointer',
		display: 'inline-block',
		height: theme.thumbnail.size,
		margin: theme.thumbnail.gutter,
		overflow: 'hidden',
		width: theme.thumbnail.size,
	},
	active: {
		boxShadow: `inset 0 0 0 2px ${theme.thumbnail.activeBorderColor}`,
	},
});

export default Thumbnail;
