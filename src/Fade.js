import React from 'react';

var Fade = React.createClass({
	getDefaultProps () {
		return {
			component: 'div',
			duration: 200,
			ref: 'element'
		};
	},
	componentWillAppear: function (callback) {
		setTimeout(callback, 1); // need at least one tick to fire transition
	},
	componentDidAppear: function () {
		this._showElement();
	},
	componentWillEnter: function (callback) {
		setTimeout(callback, 1);
	},
	componentDidEnter: function () {
		this._showElement();
	},
	componentWillLeave: function (callback) {
		this._hideElement();
		setTimeout(callback, this.props.duration);
	},
	componentDidLeave: function () {
	},
	_showElement: function () {
		var el = this.refs.element;
		el.style.opacity = 1;
	},
	_hideElement: function () {
		var el = this.refs.element;
		el.style.opacity = 0;
	},
	render: function () {
		let props = Object.assign({}, this.props);
		const style = {
			opacity: 0,
			WebkitTransition: `opacity ${this.props.duration}ms ease-out`,
			msTransition:     `opacity ${this.props.duration}ms ease-out`,
			transition:       `opacity ${this.props.duration}ms ease-out`,
		}
		props.style = Object.assign(style, this.props.style)
		return React.createElement(
			this.props.component,
			props,
			this.props.children
		);
	}
});

module.exports = Fade;
