import React, { Component, PropTypes } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

import theme from './theme';
import Arrow from './components/Arrow';
import Container from './components/Container';
import SwipeContainer from './components/SwipeContainer';
import PaginatedThumbnails from './components/PaginatedThumbnails';
import Portal from './components/Portal';
import ScrollLock from './components/ScrollLock';

import { bindFunctions, canUseDom } from './utils';

class Lightbox extends Component {
	constructor () {
		super();

		this.state = {
			swipeDeltaX: 0
		}

		bindFunctions.call(this, [
      'onClose',
			'gotoNext',
			'gotoPrev',
			'onSwiping',
			'onStopSwiping',
			'handleKeyboardInput',
		]);
	}
	getChildContext () {
		return {
			theme: this.props.theme,
		};
	}
	componentWillReceiveProps (nextProps) {
		if (!canUseDom) return;

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

		// add event listeners
		if (nextProps.enableKeyboardInput) {
			window.addEventListener('keydown', this.handleKeyboardInput);
		} else {
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

	preloadImage (idx) {
		const image = this.props.images[idx];

		if (!image) return;

		const img = new Image();

		img.src = image.src;

		if (image.srcset) {
			img.srcset = image.srcset.join();
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
		if (event.keyCode === 37) {
			this.gotoPrev(event);
			return true;
		} else if (event.keyCode === 39) {
			this.gotoNext(event);
			return true;
		} else if (event.keyCode === 27) {
			this.onClose();
			return true;
		}
		return false;

	}
	onSwiping (event, deltaX, deltaY, absX, absY, velocity) {
		if ( (this.isFirstImage() && deltaX < 0) || (this.isLastImage() && deltaX > 0) ) return;
    console.log('deltaX ' + deltaX + '  velocity ' + velocity);
		this.setState({
			swipeDeltaX: -deltaX
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
    }else if (this.state.swipeDeltaX < 0) {
      this.gotoNext();
    } else if (this.state.swipeDeltaX > 0) {
      this.gotoPrev();
    }

	}
  resetSwipe () {
    this.setState({
      swipeDeltaX: 0
    })
  }

	isFirstImage() {
		return this.props.currentImage === 0;

	}
	isLastImage () {
		return this.props.currentImage === (this.props.images.length - 1);

	}

	// ==============================
	// RENDERERS
	// ==============================

	renderArrowPrev () {
		if (this.props.currentImage === 0) return null;

		return (
			<Arrow
				direction="left"
				icon="arrowLeft"
				onClick={this.gotoPrev}
				title="Previous (Left arrow key)"
				type="button"
			/>
		);
	}
	renderArrowNext () {
		if (this.props.currentImage === (this.props.images.length - 1)) return null;

		return (
			<Arrow
				direction="right"
				icon="arrowRight"
				onClick={this.gotoNext}
				title="Previous (Right arrow key)"
				type="button"
			/>
		);
	}
	renderDialog () {
		const {
			backdropClosesModal,
			isOpen,
		} = this.props;

		if (!isOpen) return <span key="closed" />;

		return (
			<Container
				key="open"
				onClick={!!backdropClosesModal && this.onClose}
				onTouchEnd={!!backdropClosesModal && this.onClose}
			>
        <SwipeContainer
					deltaX={this.state.swipeDeltaX}
          onSwiping={this.onSwiping}
          onStopSwiping={this.onStopSwiping}
          onClose={this.onClose}
          {...this.props}
				/>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {this.renderThumbnails()}
          {this.renderArrowPrev()}
          {this.renderArrowNext()}
        </div>
        <ScrollLock />
			</Container>
		);
	}
	renderThumbnails () {
		const { images, currentImage, onClickThumbnail, showThumbnails, thumbnailOffset } = this.props;

		if (!showThumbnails) return;

		return (
			<PaginatedThumbnails
				currentImage={currentImage}
				images={images}
				offset={thumbnailOffset}
				onClickThumbnail={onClickThumbnail}
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
	sheet: PropTypes.object,
	showCloseButton: PropTypes.bool,
	showImageCount: PropTypes.bool,
	showThumbnails: PropTypes.bool,
	theme: PropTypes.object,
	thumbnailOffset: PropTypes.number,
	width: PropTypes.number,
};
Lightbox.defaultProps = {
	currentImage: 0,
	enableKeyboardInput: true,
	imageCountSeparator: ' of ',
	onClickShowNextImage: true,
	preloadNextImage: true,
	showCloseButton: true,
	showImageCount: true,
	theme: {},
	thumbnailOffset: 2,
	width: 1024,
};
Lightbox.childContextTypes = {
	theme: PropTypes.object.isRequired,
};

export default Lightbox;
