import React, { PropTypes } from 'react';
import icons from './icons';

const Icon = ({ type, ...props }) => (
	<span
		dangerouslySetInnerHTML={{ __html: icons[type] }}
		{...props}
	/>
);

Icon.propTypes = {
	type: PropTypes.oneOf(Object.keys(icons)),
};

export default Icon;
