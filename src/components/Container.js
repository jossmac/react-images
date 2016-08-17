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

const classes = StyleSheet.create({
	container: {
		alignItems: 'center',
		boxSizing: 'border-box',
		display: 'flex',
		height: '100%',
		justifyContent: 'center',
		left: 0,
		position: 'fixed',
		top: 0,
		width: '100%',
	},
});

module.exports = Container;
