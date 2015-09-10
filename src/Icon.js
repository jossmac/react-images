import React from 'react/addons';
import icons from './icons';

module.exports = React.createClass({
	displayName: 'Icon',
	propTypes: {
		type: React.PropTypes.oneOf(Object.keys(icons))
	},
	render () {
		return <span dangerouslySetInnerHTML={{ __html: icons[this.props.type] }} {...this.props} />
	},
});
