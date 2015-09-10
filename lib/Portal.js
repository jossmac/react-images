'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _reactAddons = require('react/addons');

var _reactAddons2 = _interopRequireDefault(_reactAddons);

module.exports = _reactAddons2['default'].createClass({
	displayName: 'Portal',
	portalElement: null,
	render: function render() {
		return null;
	},
	componentDidMount: function componentDidMount() {
		var p = this.props.portalId && document.getElementById(this.props.portalId);
		if (!p) {
			var p = document.createElement('div');
			if (this.props.portalId) {
				p.id = this.props.portalId;
			}
			document.body.appendChild(p);
		}
		this.portalElement = p;
		this.componentDidUpdate();
	},
	componentWillUnmount: function componentWillUnmount() {
		document.body.removeChild(this.portalElement);
	},
	componentDidUpdate: function componentDidUpdate() {
		_reactAddons2['default'].render(_reactAddons2['default'].createElement(
			'div',
			this.props,
			this.props.children
		), this.portalElement);
	}
});