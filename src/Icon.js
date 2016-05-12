import React, { PropTypes } from 'react';
import icons from './icons';

const Icon = (props) => (
	<span
		dangerouslySetInnerHTML={{ __html: icons[props.type] }}
		{...props}
	/>
);

Icon.propTypes = {
	type: PropTypes.oneOf(Object.keys(icons)),
};

export default Icon;
