import React, { PropTypes } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

import theme from './theme';
import Icon from './Icon';

function Arrow ({
	direction,
	icon,
	onClick,
	size,
	...props,
}) {
	return (
		<button
			type="button"
			className={css(classes.arrow, classes[direction], size && classes[size])}
			onClick={onClick}
			onTouchEnd={onClick}
			{...props}
		>
			<Icon type={icon} />
		</button>
	);
};

Arrow.propTypes = {
	direction: PropTypes.oneOf(['left', 'right']),
	icon: PropTypes.string,
	onClick: PropTypes.func.isRequired,
};

const classes = StyleSheet.create({
	arrow: {
		background: 'none',
		border: 'none',
		borderRadius: 4,
		cursor: 'pointer',
		height: theme.arrow.height,
		marginTop: theme.arrow.height / -2,
		outline: 'none',
		padding: 10,
		position: 'absolute',
		top: '50%',
		width: 40,

		// disable user select
		WebkitTouchCallout: 'none',
		userSelect: 'none',

		'@media (min-width: 500px)': {
			width: 70,
		},
	},
	small: {
		width: 30,

		'@media (min-width: 500px)': {
			width: 40,
		},
	},
	right: {
		right: theme.container.gutter.horizontal,
	},
	left: {
		left: theme.container.gutter.horizontal,
	},
});

module.exports = Arrow;
