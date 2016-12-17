import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import ScrollLock from 'react-scrolllock';
import screenfull from 'screenfull';

import theme from './theme';

import Arrow from './components/Arrow';
import PaginatedThumbnails from './components/PaginatedThumbnails';
import Portal from './components/Portal';
import SwipeContainer from './components/SwipeContainer';
import Wrapper from './components/Wrapper';

import { bindFunctions, canUseDom, isMobileDevice } from './utils';

class Lightbox extends Component {
	constructor () {
		super();

		bindFunctions.call(this, [
			'onClose',
			'gotoNext',
			'gotoPrev',
			'onSwiping',
			'onStopSwiping',
			'handleKeyboardInput',
			'trackIdleTime',
		]);

		this.timer;

		this.state = {
			swipeDeltaX: 0,
			userIsActive: true,
		};
	}
	getChildContext () {
		return {
			theme: this.props.theme,
		};
	}
	componentDidMount () {
		if (this.props.isOpen && this.props.enableKeyboardInput) {
			window.addEventListener('keydown', this.handleKeyboardInput);
		}
	}
	componentWillReceiveProps (nextProps) {
		if (!canUseDom) return;

		// maintain state with props
		this.preloadImage(nextProps.currentImage, true);

		if (nextProps.currentImage !== this.props.currentImage) {
			this.resetSwipe();
		}

		// preload images
		if (nextProps.preloadNextImage) {
			const currentIndex = this.props.currentImage;
			const nextIndex = nextProps.currentImage + 1;
			const prevIndex = nextProps.currentImage - 1;
			let preloadIndex;

			if (currentIndex && nextProps.currentImage > currentIndex) {
				preloadIndex = nextIndex;
			} else if (currentIndex && nextProps.currentImage < currentIndex) {
				preloadIndex = prevIndex;
			}

			// if we know the user's direction just get one image
			// otherwise, to be safe, we need to grab one in each direction
			if (preloadIndex) {
				this.preloadImage(preloadIndex);
			} else {
				this.preloadImage(prevIndex);
				this.preloadImage(nextIndex);
			}
		}

		// check user interaction
		if (!this.props.isOpen && nextProps.isOpen && nextProps.enableKeyboardInput) {
			this.trackIdleTime();
			document.onmousemove = this.trackIdleTime;
		}

		// add/remove event listeners
		if (!this.props.isOpen && nextProps.isOpen && nextProps.enableKeyboardInput) {
			window.addEventListener('keydown', this.handleKeyboardInput);
		}
		if (!nextProps.isOpen && nextProps.enableKeyboardInput) {
			window.removeEventListener('keydown', this.handleKeyboardInput);
		}
	}
	componentWillUnmount () {
		if (this.props.enableKeyboardInput) {
			window.removeEventListener('keydown', this.handleKeyboardInput);
		}
	}

	// ==============================
	// METHODS
	// ==============================

	trackIdleTime () {
		// TODO debounce

		const self = this;

		clearTimeout(this.timer);

		this.setState({ userIsActive: true });

		this.timer = setTimeout(function () {
			self.setState({ userIsActive: false });
		}, 3000);
	}
	preloadImage (idx, upcoming) {
		const image = this.props.images[idx];

		// check if data available
		if (!image) return;

		// set props on the image
		const img = new Image();
		img.src = image.src;
		if (image.srcset) {
			img.srcset = image.srcset.join();
		}

		// current image
		if (upcoming) {
			this.setState({ loading: true }, () => {
				img.onload = () => this.setState({
					index: idx,
					loading: false,
					dimensions: {
						height: img.height,
						width: img.width,
					},
				});
			});
		}
	}
	onClose (event) {
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}
		this.resetSwipe();
		this.props.onClose();
	}
	gotoNext (event) {
		if (this.isLastImage()) return;
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}

		this.props.onClickNext();
	}
	gotoPrev (event) {
		if (this.isFirstImage()) return;
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}

		this.props.onClickPrev();
	}
	handleKeyboardInput (event) {
		const { enableFullscreen } = this.props;

		if (event.keyCode === 37) { // left
			this.gotoPrev(event);
			return true;
		} else if (event.keyCode === 39) { // right
			this.gotoNext(event);
			return true;
		} else if (event.keyCode === 27) { // esc
			this.props.onClose();
			return true;
		} else if (event.keyCode === 70 && enableFullscreen) { // F
			if (screenfull.enabled && this.refs.wrapper) {
				screenfull.request(findDOMNode(this.refs.wrapper));
			}
			return true;
		}
		return false;

	}
	onSwiping (event, deltaX) {
		if ((this.isFirstImage() && deltaX < 0) || (this.isLastImage() && deltaX > 0)) return;
		this.setState({
			swipeDeltaX: -deltaX,
		});

	}
	onStopSwiping (event, x, y, isFlick, velocity) {
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}

		const quickSwipe = velocity > 0.7 && Math.abs(this.state.swipeDeltaX) > window.innerWidth * 0.3;

		const stayAtCurrentImage = !quickSwipe && Math.abs(this.state.swipeDeltaX) < window.innerWidth * 0.5;
		if (stayAtCurrentImage) {
			this.resetSwipe();
		} else if (this.state.swipeDeltaX < 0) {
			this.gotoNext();
		} else if (this.state.swipeDeltaX > 0) {
			this.gotoPrev();
		}

	}
	resetSwipe () {
		this.setState({
			swipeDeltaX: 0,
		});
	}

	isFirstImage () {
		return this.props.currentImage === 0;

	}
	isLastImage () {
		return this.props.currentImage === (this.props.images.length - 1);

	}

	// ==============================
	// RENDERERS
	// ==============================

	renderArrowPrev () {
		if (this.isFirstImage() || isMobileDevice()) return null;

		return (
			<Arrow
				direction="left"
				icon="arrowLeft"
				onClick={this.gotoPrev}
				title="Previous (Left arrow key)"
				type="button"
				visible={this.state.userIsActive}
			/>
		);
	}
	renderArrowNext () {
		if (this.isLastImage() || isMobileDevice()) return null;

		return (
			<Arrow
				direction="right"
				icon="arrowRight"
				onClick={this.gotoNext}
				title="Next (Right arrow key)"
				type="button"
				visible={this.state.userIsActive}
			/>
		);
	}
	renderDialog () {
		const {
			backdropClosesModal,
			currentImage,
			images,
			isOpen,
		} = this.props;
		const { index, loading, userIsActive } = this.state;

		if (!images || !images.length) return null;

		if (!isOpen) return <span key="closed" />;

		return (
			<Wrapper
				key="wrapper"
				onClick={!!backdropClosesModal && this.onClose}
				onTouchEnd={!!backdropClosesModal && this.onClose}
				ref="wrapper"
			>
				<SwipeContainer
					currentImage={index || currentImage}
					deltaX={this.state.swipeDeltaX}
					loading={loading}
					onClose={this.onClose}
					onStopSwiping={this.onStopSwiping}
					onSwiping={this.onSwiping}
					userIsActive={userIsActive}
					{...this.props}
				/>
				{this.renderThumbnails()}
				{this.renderArrowPrev()}
				{this.renderArrowNext()}
				<ScrollLock />
			</Wrapper>
		);
	}
	renderThumbnails () {
		const { images, currentImage, onClickThumbnail, showThumbnails, thumbnailOffset } = this.props;
		const { userIsActive } = this.state;

		if (!showThumbnails) return;

		const styles = !userIsActive ? {
			opacity: 0,
			transition: 'all 200ms',
			transform: `translateY(${theme.thumbnail.size}px)`,
		} : {
			opacity: 1,
			transition: 'all 200ms',
		};

		return (
			<PaginatedThumbnails
				currentImage={currentImage}
				images={images}
				offset={thumbnailOffset}
				onClickThumbnail={onClickThumbnail}
				style={styles}
			/>
		);
	}
	render () {
		return (
			<Portal>
				{this.renderDialog()}
			</Portal>
		);
	}
}

Lightbox.propTypes = {
	backdropClosesModal: PropTypes.bool,
	currentImage: PropTypes.number,
	customControls: PropTypes.arrayOf(PropTypes.node),
	enableFullscreen: PropTypes.bool,
	enableKeyboardInput: PropTypes.bool,
	imageCountSeparator: PropTypes.string,
	images: PropTypes.arrayOf(
		PropTypes.shape({
			src: PropTypes.string.isRequired,
			srcset: PropTypes.array,
			caption: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
			thumbnail: PropTypes.string,
		})
	).isRequired,
	isOpen: PropTypes.bool,
	onClickImage: PropTypes.func,
	onClickNext: PropTypes.func,
	onClickPrev: PropTypes.func,
	onClose: PropTypes.func.isRequired,
	preloadNextImage: PropTypes.bool,
	showCloseButton: PropTypes.bool,
	showImageCount: PropTypes.bool,
	showThumbnails: PropTypes.bool,
	theme: PropTypes.object,
	thumbnailOffset: PropTypes.number,
	width: PropTypes.number,
};
Lightbox.defaultProps = {
	currentImage: 0,
	enableFullscreen: true,
	enableKeyboardInput: true,
	imageCountSeparator: ' of ',
	onClickShowNextImage: true,
	preloadNextImage: true,
	showCloseButton: true,
	showImageCount: true,
	theme: {},
	thumbnailOffset: 2,
	width: 1280,
};
Lightbox.childContextTypes = {
	theme: PropTypes.object.isRequired,
};

export default Lightbox;
