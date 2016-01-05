'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var Fade = _react2['default'].createClass({
	displayName: 'Fade',

	getDefaultProps: function getDefaultProps() {
		return {
			component: 'div',
			duration: 200,
			ref: 'element'
		};
	},
	componentWillAppear: function componentWillAppear(callback) {
		setTimeout(callback, 1); // need at least one tick to fire transition
	},
	componentDidAppear: function componentDidAppear() {
		this._showElement();
	},
	componentWillEnter: function componentWillEnter(callback) {
		setTimeout(callback, 1);
	},
	componentDidEnter: function componentDidEnter() {
		this._showElement();
	},
	componentWillLeave: function componentWillLeave(callback) {
		this._hideElement();
		setTimeout(callback, this.props.duration);
	},
	componentDidLeave: function componentDidLeave() {},
	_showElement: function _showElement() {
		var el = this.refs.element;
		el.style.opacity = 1;
	},
	_hideElement: function _hideElement() {
		var el = this.refs.element;
		el.style.opacity = 0;
	},
	render: function render() {
		var props = _extends({}, this.props);
		var style = {
			opacity: 0,
			WebkitTransition: 'opacity ' + this.props.duration + 'ms ease-out',
			msTransition: 'opacity ' + this.props.duration + 'ms ease-out',
			transition: 'opacity ' + this.props.duration + 'ms ease-out'
		};
		props.style = _extends(style, this.props.style);
		return _react2['default'].createElement(this.props.component, props, this.props.children);
	}
});

module.exports = Fade;