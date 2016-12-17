import React, { PropTypes } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

import theme from '../theme';
import Footer from './Footer';
import Header from './Header';
import Loading from './Loading';

function renderImage ({ props, image, isVisible }) {
	const {
		images,
		imageCountSeparator,
		index,
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
				src={isVisible ? image.src : 'data:'}
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
				countTotal={images.length}
				showCount={showImageCount}
				visible={userIsActive}
			/>
		</figure>
	);
}

const ImageContainer = (props) => {
	const {
		customControls,
		image,
		isFullscreen,
		isVisible,
		marginBottom,
		onClose,
		showCloseButton,
		width,
		userIsActive,
	} = props;

	const horizontalPadding = theme.wrapper.gutter.horizontal;

	return (
		<div
			className={css(classes.contentContainer)}
			style={{ width: window.innerWidth, paddingLeft: horizontalPadding, paddingRight: horizontalPadding }}
		>
			<div className={css(classes.content)} style={{ marginBottom: marginBottom, maxWidth: isFullscreen ? 'none' : width }}>
				<Header
					customControls={customControls}
					onClose={onClose}
					showCloseButton={showCloseButton}
					visible={userIsActive}
				/>
				{renderImage({ props, image, isVisible })}
			</div>
		</div>
	);
};

ImageContainer.propTypes = {
	customControls: PropTypes.arrayOf(PropTypes.node),
	image: PropTypes.shape({
		src: PropTypes.string.isRequired,
		srcset: PropTypes.array,
		caption: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
		thumbnail: PropTypes.string,
	}),
	imageCountSeparator: PropTypes.string,
	images: PropTypes.arrayOf(
		PropTypes.shape({
			src: PropTypes.string.isRequired,
			srcset: PropTypes.array,
			caption: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
			thumbnail: PropTypes.string,
		})
	).isRequired,
	index: PropTypes.number.isRequired,
	isFullscreen: PropTypes.bool,
	isVisible: PropTypes.bool,
	loading: PropTypes.bool,
	marginBottom: PropTypes.number,
	onClickImage: PropTypes.func,
	onClose: PropTypes.func.isRequired,
	showCloseButton: PropTypes.bool,
	showImageCount: PropTypes.bool,
	showThumbnails: PropTypes.bool,
	userIsActive: PropTypes.bool,
	width: PropTypes.number,
};

const classes = StyleSheet.create({
	contentContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignSelf: 'center',
	},
	content: {
		position: 'relative',
	},
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

export default ImageContainer;
