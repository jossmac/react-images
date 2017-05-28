import PropTypes from 'prop-types';
import React from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';
import Thumbnail from './Thumbnail';

import theme from '../theme';

function Thumbnails ({ currentImage, images, onClickThumbnail }) {
	return (
		<div className={css(classes.thumbnails)}>
			{images.map((img, idx) => (
				<Thumbnail
					{...img}
					active={idx === currentImage}
					index={idx}
					key={idx}
					onClick={onClickThumbnail}
				/>
			))}
		</div>
	);
}

Thumbnails.propTypes = {
	currentImage: PropTypes.number,
	images: PropTypes.array,
	onClickThumbnail: PropTypes.func.isRequired,
};

const classes = StyleSheet.create({
	thumbnails: {
		bottom: theme.container.gutter.vertical,
		color: 'white',
		height: theme.thumbnail.size,
		left: theme.container.gutter.horizontal,
		overflowX: 'scroll',
		overflowY: 'hidden',
		position: 'absolute',
		right: theme.container.gutter.horizontal,
		textAlign: 'center',
		whiteSpace: 'nowrap',
	},
});

export default Thumbnails;
