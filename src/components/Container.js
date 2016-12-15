import React, { PropTypes } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

import defaults from '../theme';
import { deepMerge } from '../utils';

function Container ({ ...props }, { theme }) {
	const classes = StyleSheet.create(deepMerge(defaultStyles, theme));

	return (
		<div
			className={css(classes.container)}
			{...props}
		/>
	);
};

Container.contextTypes = {
	theme: PropTypes.object.isRequired,
};

const defaultStyles = {
	container: {
		boxSizing: 'border-box',
		display: 'flex',
		justifyContent: 'space-between',
		margin: '0 auto',
		paddingBottom: defaults.common.gutter.vertical,
		paddingLeft: defaults.common.gutter.horizontal,
		paddingRight: defaults.common.gutter.horizontal,
		paddingTop: defaults.common.gutter.vertical,

		'@media (max-width: 500px)': {
			paddingBottom: Math.floor(defaults.common.gutter.vertical / 2),
			paddingLeft: Math.floor(defaults.common.gutter.horizontal / 2),
			paddingRight: Math.floor(defaults.common.gutter.horizontal / 2),
			paddingTop: Math.floor(defaults.common.gutter.vertical / 2),
		},
	},
};

module.exports = Container;
