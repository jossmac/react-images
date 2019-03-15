import PropTypes from 'prop-types';
import React from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

import defaults from '../theme';
import deepMerge from '../utils/deepMerge';

function Container ({ ...props }, { theme }) {
	const classes = StyleSheet.create(deepMerge(defaultStyles, theme));

	return (
		<div id="lightboxBackdrop"
			className={css(classes.container)}
			{...props}
		/>
	);
}

Container.contextTypes = {
	theme: PropTypes.object.isRequired,
};

const defaultStyles = {
	container: {
		flex: 3,
		alignItems: 'center',
		backgroundColor: defaults.container.background,
		boxSizing: 'border-box',
		display: 'flex',
		justifyContent: 'center',
		paddingBottom: defaults.container.gutter.vertical,
		paddingLeft: defaults.container.gutter.horizontal,
		paddingRight: defaults.container.gutter.horizontal,
		paddingTop: defaults.container.gutter.vertical,
		position: 'relative',
	},
};

export default Container;
