import glamorous from 'glamorous';
import PropTypes from 'prop-types';
import React from 'react';

function Thumbnail ({ index, src, thumbnail, active, onClick }) {
	const url = thumbnail ? thumbnail : src;
	const style = { backgroundImage: 'url("' + url + '")' };
	const handleClick = (e) => {
		e.preventDefault();
		e.stopPropagation();
		onClick(index);
	};

	return (
		<Div isSelected={active} onClick={handleClick} style={style} />
	);
}

Thumbnail.propTypes = {
	active: PropTypes.bool,
	index: PropTypes.number,
	onClick: PropTypes.func.isRequired,
	src: PropTypes.string,
	thumbnail: PropTypes.string,
};

Thumbnail.contextTypes = {
	theme: PropTypes.object.isRequired,
};

const Div = glamorous.div({
	backgroundPosition: 'center',
	backgroundSize: 'cover',
	borderRadius: 2,
	cursor: 'pointer',
	display: 'inline-block',
	overflow: 'hidden',
}, ({ isSelected, theme }) => ({
	boxShadow: `inset 0 0 0 2px ${isSelected
		? theme.thumbnail.borderColor
		: theme.thumbnail.selectedBorderColor
	}`,
	height: theme.thumbnail.size,
	margin: theme.thumbnail.gutter,
	width: theme.thumbnail.size,
}));

export default Thumbnail;
