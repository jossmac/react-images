import React, { PropTypes } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

import theme from '../theme';
import Footer from './Footer';
import Loading from './Loading';

const Image = (props) => {
	const {
    image,
		imageCount,
		imageCountSeparator,
		index,
    isVisible,
		loading,
		onClickImage,
		showImageCount,
		showThumbnails,
		userIsActive,
		} = props;

	let srcset;
	let sizes;

	if (image.srcset) {
		srcset = image.srcset.join();
		sizes = '100vw';
	}

	const thumbnailsSize = showThumbnails ? theme.thumbnail.size : 0;
	const heightOffset = `${theme.header.height + theme.footer.height + thumbnailsSize + (theme.wrapper.gutter.vertical)}px`;

	return (
		<figure className={css(classes.figure)}>
			<img
				className={css(classes.image)}
				onClick={!!onClickImage && onClickImage}
				sizes={sizes}
				src={isVisible ? image.src : 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='}
				srcSet={isVisible ? srcset : null}
				style={{
					cursor: onClickImage ? 'pointer' : 'auto',
					maxHeight: `calc(100vh - ${heightOffset})`,
				}}
			/>
			{loading && (
				<Loading />
			)}
			<Footer
				caption={image.caption}
				countCurrent={index + 1}
				countSeparator={imageCountSeparator}
				countTotal={imageCount}
				showCount={showImageCount}
				visible={userIsActive}
			/>
		</figure>
	);
};

Image.propTypes = {
	image: PropTypes.shape({
		src: PropTypes.string.isRequired,
		srcset: PropTypes.array,
		caption: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
		thumbnail: PropTypes.string,
	}),
	imageCount: PropTypes.number.isRequired,
	imageCountSeparator: PropTypes.string,
	index: PropTypes.number.isRequired,
	isVisible: PropTypes.bool,
	loading: PropTypes.bool,
	onClickImage: PropTypes.func,
	showImageCount: PropTypes.bool,
	showThumbnails: PropTypes.bool,
	userIsActive: PropTypes.bool,
};

const classes = StyleSheet.create({
	figure: {
		margin: 0, // remove browser default
	},
	image: {
		display: 'block', // removes browser default gutter
		height: 'auto',
		maxHeight: '100vh',
		margin: '0 auto', // maintain center on very short screens OR very narrow image
		maxWidth: '100%',

		// disable user select
		WebkitTouchCallout: 'none',
		userSelect: 'none',
	},
});

export default Image;
