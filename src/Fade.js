import React, { Component, PropTypes } from 'react';

class Fade extends Component {
	constructor () {
		super();
		this._showElement = this._showElement.bind(this);
		this._hideElement = this._hideElement.bind(this);
	}
	componentWillAppear (callback) {
		setTimeout(callback, 1); // need at least one tick to fire transition
	}
	componentDidAppear () {
		this._showElement();
	}
	componentWillEnter (callback) {
		setTimeout(callback, 1);
	}
	componentDidEnter () {
		this._showElement();
	}
	componentWillLeave (callback) {
		this._hideElement();
		setTimeout(callback, this.props.duration);
	}
	componentDidLeave () {
	}
	_showElement () {
		const el = this.refs.element;
		el.style.opacity = 1;
	}
	_hideElement () {
		const el = this.refs.element;
		el.style.opacity = 0;
	}
	render () {
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
};

Fade.defaultProps = {
	component: 'div',
	duration: 200,
	ref: 'element'
};

export default Fade;
