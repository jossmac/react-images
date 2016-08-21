import React, { PropTypes } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

import theme from '../theme';
import Icon from './Icon';

function Header ({
	customControls,
	onClose,
	showCloseButton,
	...props,
}, {
	theme,
}) {
	return (
		<div className={css(classes.header)} {...props}>
			{customControls ? customControls : <span />}
			{!!showCloseButton && (
				<button
					title="Close (Esc)"
					className={css(classes.close)}
					onClick={onClose}
				>
					<Icon color={theme.close.color} type="close" />
				</button>
			)}
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

const classes = StyleSheet.create({
	header: {
		display: 'flex',
		justifyContent: 'space-between',
		height: theme.header.height,
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
		height: theme.close.height + 20,
		marginRight: -10,
		padding: 10,
		width: theme.close.width + 20,
	},
});

module.exports = Header;
