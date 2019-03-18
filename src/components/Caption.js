import React from 'react';
import PropTypes from 'prop-types';
import { css, StyleSheet } from 'aphrodite/no-important';

function Caption ({ render, currentImage }) {
	const classes = StyleSheet.create(defaultStyles);

	return (
		<div id="lightboxCaption"
			className={css(classes.container)}
		>
			{render({ currentImage })}
		</div>
	);
}

const defaultStyles = {
	container: {
		flex: 1,
		backgroundColor: '#2d2d2d',
		overflow: 'auto',
	},
};

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
