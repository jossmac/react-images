import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { render } from 'react-dom';
import PassContext from './PassContext';
import { StyleSheet, css } from 'aphrodite';

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
		// Animate fade on mount/unmount
		const duration = 200;
		const styles = StyleSheet.create({
			fadeEnter: { opacity: 0.01 },
			fadeEnterActive: { opacity: 1, transition: `opacity ${duration}ms` },
			fadeLeave: { opacity: 1 },
			fadeLeaveActive: { opacity: 0.01, transition: `opacity ${duration}ms` },
		});

		render(
			<PassContext context={this.context}>
				<div>
					<CSSTransitionGroup
						component="div"
						transitionName={{
							enter: css(styles.fadeEnter),
							enterActive: css(styles.fadeEnterActive),
							leave: css(styles.fadeLeave),
							leaveActive: css(styles.fadeLeaveActive),
						}}
						transitionEnterTimeout={duration}
						transitionLeaveTimeout={duration}
						{...this.props}
					/>
				</div>
			</PassContext>,
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

Portal.contextTypes = {
	theme: PropTypes.object.isRequired,
};
