import React, { PropTypes } from 'react';
import icons from '../icons';

const Icon = ({ color, type, ...props }) => {
	const icon = icons[type];

	return (
		<span
			dangerouslySetInnerHTML={{ __html: icon(color) }}
			{...props}
		/>
	);
};

Icon.propTypes = {
	color: PropTypes.string,
	type: PropTypes.oneOf(Object.keys(icons)),
};
Icon.defaultProps = {
	color: 'white',
};

export default Icon;
