import React, { PropTypes } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

import defaults from '../theme';
import { deepMerge } from '../utils';
import Container from './Container';
import Icon from './Icon';

function Header ({
	customControls,
	onClose,
	showCloseButton,
	visible,
	...props,
}, {
	theme,
}) {
	const classes = StyleSheet.create(deepMerge(defaultStyles, theme));

	return (
		<div className={css(classes.header, visible ? classes.visible : null)} {...props}>
			<Container>
				{customControls ? customControls : <span />}
				{!!showCloseButton && (
					<button
						title="Close (Esc)"
						className={css(classes.close)}
						onClick={onClose}
					>
						<Icon fill={!!theme.close && theme.close.fill || defaults.close.fill} type="close" />
					</button>
				)}
			</Container>
		</div>
	);
};

Header.propTypes = {
	customControls: PropTypes.array,
	onClose: PropTypes.func.isRequired,
	showCloseButton: PropTypes.bool,
};
Header.contextTypes = {
	theme: PropTypes.object.isRequired,
};

const defaultStyles = {
	header: {
		background: 'linear-gradient(to top, hsla(0, 0%, 10%, 0) 0%, hsla(0, 0%, 10%, 0.94) 100%)',
		color: defaults.header.color,
		cursor: 'auto',
		left: 0,
		lineHeight: 1.3,
		position: 'absolute',
		opacity: 0,
		right: 0,
		top: 0,
		transition: 'all 200ms',
		transform: 'translateY(-10px)',
		visibility: 'hidden',
		zIndex: 1,
	},
	visible: {
		opacity: 1,
		transform: 'translateY(0)',
		visibility: 'visible',
	},
	close: {
		background: 'none',
		border: 'none',
		cursor: 'pointer',
		outline: 'none',
		position: 'relative',
		top: 0,
		verticalAlign: 'bottom',

		// increase hit area
		height: defaults.close.height + 20,
		marginRight: -10,
		padding: 10,
		width: defaults.close.width + 20,
	},
};

module.exports = Header;
