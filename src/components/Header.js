import glamorous from 'glamorous';
import PropTypes from 'prop-types';
import React from 'react';
import { Close } from '../icons';

function Header ({
	customControls,
	onClose,
	showCloseButton,
	closeButtonTitle,
	...props,
}) {
	return (
		<Wrapper {...props}>
			{customControls ? customControls : <span />}
			{!!showCloseButton && (
				<Button
					title={closeButtonTitle}
					type="button"
					onClick={onClose}
				>
					<Close fill="white" type="close" />
				</Button>
			)}
		</Wrapper>
	);
}

Header.propTypes = {
	customControls: PropTypes.array,
	onClose: PropTypes.func.isRequired,
	showCloseButton: PropTypes.bool,
};


const Wrapper = glamorous.div({
	display: 'flex',
	justifyContent: 'space-between',
}, ({ theme }) => ({
	height: theme.header.height,
}));

const Button = glamorous.button({
	background: 'none',
	border: 'none',
	cursor: 'pointer',
	outline: 'none',
	position: 'relative',
	top: 0,
	verticalAlign: 'bottom',

	// increase hit area
	height: 40,
	marginRight: -10,
	padding: 10,
	width: 40,
});

module.exports = Header;
