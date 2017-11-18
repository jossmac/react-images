import React, { Component } from 'react';
import { render } from 'react-dom';


export default class Portal extends Component {
	constructor (props) {
		super(props);
		this.portalElement = null;
	}
	componentDidMount () {
		const p = document.createElement('div');
		document.body.appendChild(p);
		this.portalElement = p;
		this.componentDidUpdate();
	}
	componentDidUpdate () {
		render(
			<div {...this.props} />,
			this.portalElement
		);
	}
	componentWillUnmount () {
		document.body.removeChild(this.portalElement);
	}
	render () {
		return null;
	}
}
