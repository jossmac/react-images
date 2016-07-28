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
		// empty
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
		const { component, duration, style, ...props } = this.props;
		const componentProps = {
			...props,
			style: {
				opacity: 0,
				WebkitTransition: `opacity ${duration}ms ease-out`,
				msTransition: `opacity ${duration}ms ease-out`,
				transition: `opacity ${duration}ms ease-out`,
				...style,
			},
		};
		return React.createElement(component, componentProps);
	}
}

Fade.propTypes = {
	children: PropTypes.any,
	component: PropTypes.any,
	duration: PropTypes.number,
	style: PropTypes.object,
};

Fade.defaultProps = {
	component: 'div',
	duration: 200,
	ref: 'element',
};

export default Fade;
