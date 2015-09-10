'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _reactAddons = require('react/addons');

var _reactAddons2 = _interopRequireDefault(_reactAddons);

var _icons = require('./icons');

var _icons2 = _interopRequireDefault(_icons);

module.exports = _reactAddons2['default'].createClass({
	displayName: 'Icon',
	propTypes: {
		type: _reactAddons2['default'].PropTypes.oneOf(Object.keys(_icons2['default']))
	},
	render: function render() {
		return _reactAddons2['default'].createElement('span', _extends({ dangerouslySetInnerHTML: { __html: _icons2['default'][this.props.type] } }, this.props));
	}
});