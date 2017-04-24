import PropTypes from 'prop-types';
import React from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

import defaults from '../theme';
import { deepMerge } from '../utils';
import Icon from './Icon';

function Arrow ({
	direction,
	icon,
	onClick,
	size,
	...props,
},
{
	theme,
}) {
	const classes = StyleSheet.create(deepMerge(defaultStyles, theme));

	return (
		<button
			type="button"
			className={css(classes.arrow, classes['arrow__direction__' + direction], size && classes['arrow__size__' + size])}
			onClick={onClick}
			onTouchEnd={onClick}
			{...props}
		>
			<Icon fill={!!theme.arrow && theme.arrow.fill || defaults.arrow.fill} type={icon} />
		</button>
	);
}

Arrow.propTypes = {
	direction: PropTypes.oneOf(['left', 'right']),
	icon: PropTypes.string,
	onClick: PropTypes.func.isRequired,
	size: PropTypes.oneOf(['medium', 'small']).isRequired,
};
Arrow.defaultProps = {
	size: 'medium',
};
Arrow.contextTypes = {
	theme: PropTypes.object.isRequired,
};

const defaultStyles = {
	arrow: {
		background: 'none',
		border: 'none',
		borderRadius: 4,
		cursor: 'pointer',
		outline: 'none',
		padding: 10, // increase hit area
		position: 'absolute',
		top: '50%',

		// disable user select
		WebkitTouchCallout: 'none',
		userSelect: 'none',
	},

	// sizees
	arrow__size__medium: {
		height: defaults.arrow.height,
		marginTop: defaults.arrow.height / -2,
		width: 40,

		'@media (min-width: 768px)': {
			width: 70,
		},
	},
	arrow__size__small: {
		height: defaults.thumbnail.size,
		marginTop: defaults.thumbnail.size / -2,
		width: 30,

		'@media (min-width: 500px)': {
			width: 40,
		},
	},

	// direction
	arrow__direction__right: {
		right: defaults.container.gutter.horizontal,
	},
	arrow__direction__left: {
		left: defaults.container.gutter.horizontal,
	},
};

module.exports = Arrow;
