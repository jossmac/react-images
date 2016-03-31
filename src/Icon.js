import React, { Component, PropTypes } from 'react';
import icons from './icons';

const Icon = ({ type }) => (
	<span
		dangerouslySetInnerHTML={{ __html: icons[type] }}
		{...this.props}
	/>
);

Icon.propTypes = {
	type: PropTypes.oneOf(Object.keys(icons)),
};

export default Icon;
