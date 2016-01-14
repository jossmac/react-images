import React from 'react';
import Transition from 'react-addons-transition-group';
import { render } from 'react-dom';

module.exports = React.createClass({
	displayName: 'Portal',
	portalElement: null,
	render: () => null,
	componentDidMount () {
		var p = document.createElement('div');
		document.body.appendChild(p);
		this.portalElement = p;
		this.componentDidUpdate();
	},
	componentWillUnmount () {
		document.body.removeChild(this.portalElement);
	},
	componentDidUpdate () {
		render(
			<Transition {...this.props} component="div">{this.props.children}</Transition>, this.portalElement);
	}
});
