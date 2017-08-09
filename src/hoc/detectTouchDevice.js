import React, { Component } from 'react';

export default function detectTouchDevice (Component) {
	return class ComponentWithTouchDetected extends Component {
		constructor (props) {
			super(props);
			this.state = { isTouchSupported: false };
		}
		componentDidMount () {
			function onFirstTouch () {
				this.setState({ isTouchSupported: true });
			}
			window.addEventListener('touchstart', onFirstTouch, false);
			window.removeEventListener('touchstart', onFirstTouch, false);
		}
		render () {
			return (
				<Component {...this.props} isTouchSupported={this.state.isTouchSupported}/>
			);
		}
  };
};
