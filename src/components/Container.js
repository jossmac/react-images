import React, { PropTypes } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

// import theme from './theme';

function Container ({ style, ...props }, { theme }) {
	props.style = {
		backgroundColor: theme.container.background,
		paddingBottom: theme.container.gutter.vertical,
		paddingLeft: theme.container.gutter.horizontal,
		paddingRight: theme.container.gutter.horizontal,
		paddingTop: theme.container.gutter.vertical,
		zIndex: theme.container.zIndex,
		...style,
	};
	console.log('Container theme', theme);

	return (
		<div
			className={css(classes.container)}
			{...props}
		/>
	);
};

Container.contextTypes = {
	theme: PropTypes.object,
};

const classes = StyleSheet.create({
	container: {
		alignItems: 'center',
		// backgroundColor: theme.container.background,
		boxSizing: 'border-box',
		display: 'flex',
		height: '100%',
		justifyContent: 'center',
		left: 0,
		// paddingBottom: theme.container.gutter.vertical,
		// paddingLeft: theme.container.gutter.horizontal,
		// paddingRight: theme.container.gutter.horizontal,
		// paddingTop: theme.container.gutter.vertical,
		position: 'fixed',
		top: 0,
		width: '100%',
		// zIndex: theme.container.zIndex,
	},
});

module.exports = Container;
