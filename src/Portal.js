import React from 'react';
import {render} from 'react-dom';
module.exports = React.createClass({
	displayName: 'Portal',
	portalElement: null,
	render: () => null,
	componentDidMount() {
		var p = document.createElement('div');
		document.body.appendChild(p);
		this.portalElement = p;
		this.componentDidUpdate();
	},
	componentWillUnmount() {
		document.body.removeChild(this.portalElement);
	},
	componentDidUpdate() {
		render(<div {...this.props}>{this.props.children}</div>, this.portalElement);
	}
});
