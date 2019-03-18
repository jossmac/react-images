import React from 'react';
import { css, StyleSheet } from 'aphrodite';

import defaults from '../theme';

function BigContainer ({ ...props }) {
	const classes = StyleSheet.create(defaultStyles(props.isMobile));

	return (
		<div
			className={css(classes.container)}
			{...props}
		/>
	);
}

const defaultStyles = isMobile => ({
	container: {
		display: 'flex',
		flexDirection: isMobile ? 'column-reverse' : 'row',
		height: '100%',
		width: '100%',
		top: '0px',
		left: '0px',
		position: 'fixed',
		zIndex: defaults.container.zIndex,
	},
});

export default BigContainer;
