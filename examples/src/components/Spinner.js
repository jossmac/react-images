import PropTypes from 'prop-types';
import React from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

const Spinner = (props) => {
	const classes = StyleSheet.create(styles(props));

	return (
		<div className={css(classes.spinner)}>
			<div className={css(classes.square)}/>
		</div>
	);
};

Spinner.propTypes = {
	color: PropTypes.string,
	size: PropTypes.number,
};

const squareKeyframes = {
	'0%': {
		top: 0,
		left: '25%',
		opacity: 1,
	},
	'25%': {
		top: '50%',
		left: '50%',
		opacity: 0.75,
	},
	'75%': {
		top: '50%',
		left: 0,
		opacity: 0.5,
	},
	'100%': {
		top: 0,
		left: '25%',
		opacity: 1,
	},
};

const styles = ({ color, size }) => ({
	spinner: {
		display: 'inline-block',
		position: 'relative',
		width: size,
		height: size,
	},
	square: {
		position: 'absolute',
		width: size / 10,
		height: size / 10,
		border: `4px solid ${color}`,
		borderRadius: '50%',
		background: color,
		animationName: squareKeyframes,
		animationDuration: '2s',
		animationTimingFunction: 'linear',
		animationIterationCount: 'infinite',
	},
});

export default Spinner;
