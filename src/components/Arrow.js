import PropTypes from 'prop-types';
import React from 'react';
import { ArrowLeft, ArrowRight } from '../icons';
import glamorous from 'glamorous';

export default function Arrow ({
	direction,
	onClick,
	size,
	...props,
}) {
	return (
		<Button
			direction={direction}
			onClick={onClick}
			onTouchEnd={onClick}
			size={size}
			type="button"
			{...props}
		>
			{direction === 'left'
				? <ArrowLeft size={size} />
				: <ArrowRight size={size} />
			}
		</Button>
	);
}

Arrow.propTypes = {
	direction: PropTypes.oneOf(['left', 'right']),
	onClick: PropTypes.func.isRequired,
	size: PropTypes.oneOf(['medium', 'small']).isRequired,
};
Arrow.defaultProps = {
	size: 'medium',
};

const Button = glamorous.button({
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
}, ({ theme }) => ({
	height: theme.arrow.height,
	marginTop: theme.arrow.height / -2,
	width: 40,

	'@media (min-width: 768px)': {
		width: 70,
	},
}));
