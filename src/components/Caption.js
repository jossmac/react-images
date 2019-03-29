import React from 'react';
import PropTypes from 'prop-types';
import { css, StyleSheet } from 'aphrodite/no-important';

import defaults from '../theme';

function Caption ({ render, currentImage, isMobile }) {
	const classes = StyleSheet.create(defaultStyles(isMobile));

	return (
		<div id="lightboxCaption"
			className={css(classes.container)}
		>
			{render({ currentImage })}
		</div>
	);
}

const defaultStyles = isMobile => ({
	container: {
		flex: isMobile ? '1 0 40%' : '1 0 25%',
		backgroundColor: '#2d2d2d',
		overflow: 'auto',
		zIndex: defaults.container.zIndex,
	},
});

Caption.propTypes = {
	/**
	 * Current image object
	 */
	currentImage: PropTypes.object.isRequired,
	/**
	 * Render props to render caption
	 */
	render: PropTypes.func.isRequired,
};

export default Caption;
