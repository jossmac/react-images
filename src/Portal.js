import React, { Children, Component, PropTypes } from 'react';
import Transition from 'react-addons-transition-group';
import { render } from 'react-dom';

const FirstChild = ({ children }) => {
	let kids = Children.toArray(children);
	return kids[0] || null;
};

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
		render(
			<Transition {...this.props} component={FirstChild} />,
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

Portal.propTypes = {
	children: PropTypes.element,
};
