import React, { PropTypes } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

import theme from '../theme';
import Header from './Header';
import Image from './Image';

const ImageContainer = (props) => {
	const {
		customControls,
		isFullscreen,
		marginBottom,
		onClose,
		showCloseButton,
		width,
		userIsActive,
		...imageProps,
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
				<Image
					userIsActive={userIsActive}
					{...imageProps}
				/>
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
	imageCount: PropTypes.number.isRequired,
	imageCountSeparator: PropTypes.string,
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
});

export default ImageContainer;
