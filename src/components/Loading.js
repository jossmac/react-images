import React, { PropTypes } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

import defaults from '../theme';
import { deepMerge } from '../utils';

function Loading ({ ...props }, { theme }) {
	const classes = StyleSheet.create(deepMerge(defaultStyles, theme));

	props.className = css(classes.loading);

	return (
		<div {...props}>
			<span className={css(classes.dot, classes.dotFirst)} />
			<span className={css(classes.dot, classes.dotSecond)} />
			<span className={css(classes.dot, classes.dotThird)} />
			<span className={css(classes.text)}>Loading...</span>
		</div>
	);
};
Loading.contextTypes = {
	theme: PropTypes.object.isRequired,
};

const keyframes = {
	'0%, 80%, 100%': { opacity: 0 },
	'40%': { opacity: 1 },
};

const defaultStyles = {
	loading: {
		fontSize: '.8rem',
		left: '50%',
		lineHeight: 1,
		position: 'absolute',
		textAlign: 'center',
		top: '50%',
		transform: 'translate(-50%, -50%)',
		verticalAlign: 'middle',
	},

	// text
	text: {
		border: 0,
		clip: 'rect(0,0,0,0)',
		height: 1,
		margin: -1,
		overflow: 'hidden',
		padding: 0,
		position: 'absolute',
		width: 1,
	},

	// dots
	dot: {
		animationDuration: '1s',
		animationIterationCount: 'infinite',
		animationName: keyframes,
		animationTimingFunction: 'ease-in-out',
		backgroundColor: 'white',
		borderRadius: '1em',
		display: 'inline-block',
		height: '1em',
		verticalAlign: 'top',
		width: '1em',
	},
	dotSecond: {
		animationDelay: '160ms',
		marginLeft: '1em',
	},
	dotThird: {
		animationDelay: '320ms',
		marginLeft: '1em',
	},
};

module.exports = Loading;
