var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import PropTypes from 'prop-types';
import React from 'react';
import arrowLeft from '../icons/arrowLeft';
import arrowRight from '../icons/arrowRight';
import close from '../icons/close';

var icons = { arrowLeft: arrowLeft, arrowRight: arrowRight, close: close };

var Icon = function Icon(_ref) {
	var fill = _ref.fill,
	    type = _ref.type,
	    props = _objectWithoutProperties(_ref, ['fill', 'type']);

	var icon = icons[type];

	return React.createElement('span', _extends({
		dangerouslySetInnerHTML: { __html: icon(fill) }
	}, props));
};

Icon.propTypes = {
	fill: PropTypes.string,
	type: PropTypes.oneOf(Object.keys(icons))
};
Icon.defaultProps = {
	fill: 'white'
};

export default Icon;