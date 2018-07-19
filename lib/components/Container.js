var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import PropTypes from 'prop-types';
import React from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

import defaults from '../theme';
import deepMerge from '../utils/deepMerge';

function Container(_ref, _ref2) {
	var theme = _ref2.theme;

	var props = _objectWithoutProperties(_ref, []);

	var classes = StyleSheet.create(deepMerge(defaultStyles, theme));

	return React.createElement('div', _extends({ id: 'lightboxBackdrop',
		className: css(classes.container)
	}, props));
}

Container.contextTypes = {
	theme: PropTypes.object.isRequired
};

var defaultStyles = {
	container: {
		alignItems: 'center',
		backgroundColor: defaults.container.background,
		boxSizing: 'border-box',
		display: 'flex',
		height: '100%',
		justifyContent: 'center',
		left: 0,
		paddingBottom: defaults.container.gutter.vertical,
		paddingLeft: defaults.container.gutter.horizontal,
		paddingRight: defaults.container.gutter.horizontal,
		paddingTop: defaults.container.gutter.vertical,
		position: 'fixed',
		top: 0,
		width: '100%',
		zIndex: defaults.container.zIndex
	}
};

export default Container;