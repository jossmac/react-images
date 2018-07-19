var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import PropTypes from 'prop-types';
import React from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

import defaults from '../theme';
import deepMerge from '../utils/deepMerge';
import Icon from './Icon';

function Header(_ref, _ref2) {
	var theme = _ref2.theme;

	var customControls = _ref.customControls,
	    onClose = _ref.onClose,
	    showCloseButton = _ref.showCloseButton,
	    closeButtonTitle = _ref.closeButtonTitle,
	    props = _objectWithoutProperties(_ref, ['customControls', 'onClose', 'showCloseButton', 'closeButtonTitle']);

	var classes = StyleSheet.create(deepMerge(defaultStyles, theme));

	return React.createElement(
		'div',
		_extends({ className: css(classes.header) }, props),
		customControls ? customControls : React.createElement('span', null),
		!!showCloseButton && React.createElement(
			'button',
			{
				title: closeButtonTitle,
				className: css(classes.close),
				onClick: onClose
			},
			React.createElement(Icon, { fill: !!theme.close && theme.close.fill || defaults.close.fill, type: 'close' })
		)
	);
}

Header.propTypes = {
	customControls: PropTypes.array,
	onClose: PropTypes.func.isRequired,
	showCloseButton: PropTypes.bool
};
Header.contextTypes = {
	theme: PropTypes.object.isRequired
};

var defaultStyles = {
	header: {
		display: 'flex',
		justifyContent: 'space-between',
		height: defaults.header.height
	},
	close: {
		background: 'none',
		border: 'none',
		cursor: 'pointer',
		outline: 'none',
		position: 'relative',
		top: 0,
		verticalAlign: 'bottom',
		zIndex: 1,

		// increase hit area
		height: 40,
		marginRight: -10,
		padding: 10,
		width: 40
	}
};

export default Header;