import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import * as glamor from 'glamor';
import glamorous from 'glamorous';

const exitXPosition = '10px';
const animationDuration = '500ms';

const animationEnter = glamor.css.keyframes({
	from: {
		opacity: 0,
		transform: `translate(${exitXPosition}, 0)`,
	},
	to: {
		opacity: 1,
		transform: 'translate(0, 0)',
	},
});
const animationLeave = glamor.css.keyframes({
	from: {
		opacity: 1,
		transform: 'translate(0, 0)',
	},
	to: {
		opacity: 0,
		transform: `translate(${exitXPosition}, 0)`,
	},
});

const Wrapper = glamorous.div({
}, ({ isEntering, isLeaving }) => {
	let animation = 'initial';
	if (isEntering) animation = `${animationEnter} ${animationDuration}`;
	if (isLeaving) animation = `${animationLeave} ${animationDuration}`;

	console.log('isEntering', isEntering);

	return { animation };
});


export default class AnimationWrapper extends PureComponent {
	constructor (props) {
		super(props);

		console.log('AnimationWrapper');

		this.parentNode = null;
		this.state = {
			isEntering: false,
			isLeaving: false,
		};

		this.runAfterAnimation = this.runAfterAnimation.bind(this);
	}

	componentWillEnter (callback) {
		console.log('componentWillEnter');
		this.setState({ isEntering: true });
		this.runAfterAnimation(callback);
	}

	componentDidEnter () {
		console.log('componentDidEnter');
		this.setState({ isEntering: false });
	}

	componentWillLeave (callback) {
		console.log('componentWillLeave');
		this.setState({ isLeaving: true });
		this.runAfterAnimation(callback);
	}

	componentDidLeave () {
		console.log('componentDidLeave');
		this.setState({ isLeaving: false });
	}

	/**
	 * componentWillEnter and componentWillLeave provide a callback function which we need to call
	 * when our enter/leave animations are complete. This function listens for an animationend event
	 * then runs the callback.
	 */
	runAfterAnimation (callback) {
		console.log('runAfterAnimation');
		const { parentNode } = this;

		function executeCallback () {
			callback();
			return parentNode && parentNode.removeEventListener('animationend', executeCallback);
		}

		return parentNode && parentNode.addEventListener('animationend', executeCallback);
	}

	render () {
		return (
			<Wrapper
				innerRef={(node) => { this.parentNode = node ? node.parentElement : null; }}
				isEntering={this.state.isEntering}
				isLeaving={this.state.isLeaving}
			>
				{this.props.children}
			</Wrapper>
		);
	}
}

AnimationWrapper.propTypes = {
	children: PropTypes.node,
};
