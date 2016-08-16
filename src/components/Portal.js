import React, { Component } from 'react';
import Transition from 'react-addons-css-transition-group';
import { render } from 'react-dom';

export default class Portal extends Component {
	constructor () {
		super();
		this.portalElement = null;
	}
	componentDidMount () {
		const p = document.createElement('div');
		document.body.appendChild(p);
		this.portalElement = p;
		this.componentDidUpdate();
	}
	componentDidUpdate () {
		const styles = `
				.fade-enter { opacity: 0.01; }
				.fade-enter.fade-enter-active { opacity: 1; transition: opacity 200ms; }
				.fade-leave { opacity: 1; }
				.fade-leave.fade-leave-active { opacity: 0.01; transition: opacity 200ms; }
		`;
		render(
			<div>
				<style>{styles}</style>
				<Transition
					transitionName="fade"
					transitionEnterTimeout={200}
					transitionLeaveTimeout={200}
					{...this.props}
				/>
			</div>,
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
