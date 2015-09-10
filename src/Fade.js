import React from 'react/addons';

var Fade = React.createClass({
	getDefaultProps () {
		return {
			duration: 200
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
		var el = this.refs.element.getDOMNode();
		el.style.opacity = 1;
	},
	_hideElement: function () {
		var el = this.refs.element.getDOMNode();
		el.style.opacity = 0;
	},
	render: function () {
		let style = {
			opacity: 0,
			WebkitTransition: `opacity ${this.props.duration}ms ease-out`,
			msTransition:     `opacity ${this.props.duration}ms ease-out`,
			transition:       `opacity ${this.props.duration}ms ease-out`,
		}
		return <div ref="element" {...this.props} style={Object.assign({}, style, this.props.style)} />;
	}
});

module.exports = Fade;
