import React, { Component, PropTypes } from 'react';
import icons from './icons';

class Icon extends Component {
	render () {
		return <span dangerouslySetInnerHTML={{ __html: icons[this.props.type] }} {...this.props} />;
	}
};

Icon.propTypes = {
	type: React.PropTypes.oneOf(Object.keys(icons))
}

export default Icon;
