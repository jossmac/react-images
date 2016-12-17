import React, { PropTypes } from 'react';
import Swipeable from 'react-swipeable';
import { Motion, spring } from 'react-motion';
import { css, StyleSheet } from 'aphrodite/no-important';

import theme from '../theme';
import ImageContainer from './ImageContainer';

function isImageVisible (imageIndex, deltaXWithContainerPadding) {
	const containerPadding = theme.wrapper.gutter.horizontal;
	const marginLeft = Math.abs(deltaXWithContainerPadding) - containerPadding;
	const visibleIndex = Math.floor(marginLeft / window.innerWidth);
	if (visibleIndex === imageIndex) {
		return true;
	}

	const isNextImageVisible = marginLeft - visibleIndex * window.innerWidth > -200;
	return isNextImageVisible && imageIndex === visibleIndex + 1;
}

const SwipeContainer = (props) => {
	const {
		currentImage,
		images,
		isLoading,
		onStopSwiping,
		onSwiping,
		showThumbnails,
		swipeDeltaX,
		userIsActive,
	} = props;

	let offsetThumbnails = 0;
	if (showThumbnails) {
		offsetThumbnails = theme.thumbnail.size + theme.wrapper.gutter.vertical;
	}

	const horizontalPadding = theme.wrapper.gutter.horizontal;
	const springConfig = { stiffness: 300, damping: 30 };
	const containerWidth = window.innerWidth * images.length;
	const initialTransformX = (containerWidth - window.innerWidth) / 2;
	const motionStyle = { deltaX: spring(-currentImage * window.innerWidth - horizontalPadding + swipeDeltaX, springConfig) };

	return (
		<Swipeable
			className={css(classes.swipeable)}
			delta={0}
			onSwiped={onStopSwiping}
			onSwiping={onSwiping}
			preventDefaultTouchmoveEvent
			stopPropagation
		>
			<Motion style={motionStyle}>
				{
					({ deltaX }) => (
						<div
							className={css(classes.swipeContainer)}
							style={{
								width: containerWidth,
								transform: `translate(${deltaX + initialTransformX}px, 0)`,
								WebkitTransform: `translate(${deltaX + initialTransformX}px, 0)`,
							}}
						>
							{
								images.map((image, index) => (
									<ImageContainer
										image={image}
										index={index}
										isLoading={isLoading}
										isVisible={isImageVisible(index, deltaX)}
										key={index}
										marginBottom={offsetThumbnails}
										userIsActive={userIsActive}
										{...props}
									/>
								))
							}
						</div>
					)
				}
			</Motion>
		</Swipeable>
	);
};

SwipeContainer.propTypes = {
	currentImage: PropTypes.number.isRequired,
	images: PropTypes.arrayOf(
		PropTypes.shape({
			src: PropTypes.string.isRequired,
			srcset: PropTypes.array,
			caption: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
			thumbnail: PropTypes.string,
		})
	).isRequired,
	isLoading: PropTypes.bool,
	onStopSwiping: PropTypes.func.isRequired,
	onSwiping: PropTypes.func.isRequired,
	showThumbnails: PropTypes.bool,
	swipeDeltaX: PropTypes.number,
	userIsActive: PropTypes.bool,
};
SwipeContainer.defaultProps = {
	swipeDeltaX: 0,
};

const classes = StyleSheet.create({
	swipeable: {
		height: '100%',
	},
	swipeContainer: {
		display: 'flex',
		height: '100%',
		willChange: 'transform',
	},
});

export default SwipeContainer;
