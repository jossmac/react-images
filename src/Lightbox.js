import React, { Component, PropTypes } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';
import Swipeable from 'react-swipeable';
import {Motion, spring} from 'react-motion';

import theme from './theme';
import Arrow from './components/Arrow';
import Container from './components/Container';
import Footer from './components/Footer';
import Header from './components/Header';
import PaginatedThumbnails from './components/PaginatedThumbnails';
import Portal from './components/Portal';
import ScrollLock from './components/ScrollLock';

import { bindFunctions, canUseDom } from './utils';

class Lightbox extends Component {
	constructor () {
		super();

		this.state = {
			isSwipingLeft: false,
			isSwipingRight: false,
			swipeDeltaX: 0
		}

		bindFunctions.call(this, [
      'onClose',
			'gotoNext',
			'gotoPrev',
			'onSwipingLeft',
			'onSwipingRight',
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
	onSwipingLeft (event, deltaX) {
		if (this.isLastImage()) return;
		this.setState({
			isSwipingLeft: true,
			isSwipingRight: false,
			swipeDeltaX: -deltaX
		});

	}
	onSwipingRight (event, deltaX) {
		if (this.isFirstImage()) return;
		this.setState({
			isSwipingLeft: false,
			isSwipingRight: true,
			swipeDeltaX: deltaX
		});

	}
	onStopSwiping (event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const stayAtCurrentImage = Math.abs(this.state.swipeDeltaX) < window.innerWidth * 0.5;
    if (stayAtCurrentImage) {
      this.resetSwipe();
    }else if (this.state.isSwipingLeft) {
      this.gotoNext();
    } else if (this.state.isSwipingRight) {
      this.gotoPrev();
    }

	}
  resetSwipe () {
    this.setState({
      isSwipingLeft: false,
      isSwipingRight: false,
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
      currentImage,
      customControls,
			isOpen,
			showCloseButton,
			showThumbnails,
			width,
      images,
		} = this.props;

		if (!isOpen) return <span key="closed" />;

		let offsetThumbnails = 0;
		if (showThumbnails) {
			offsetThumbnails = theme.thumbnail.size + theme.container.gutter.vertical;
		}

    const horizontalPadding = theme.container.gutter.horizontal;

    const swipeDeltaX = this.state.isSwipingLeft || this.state.isSwipingRight ? this.state.swipeDeltaX : 0;
    const motionStyle = { marginLeft: spring(-currentImage * window.innerWidth - horizontalPadding + swipeDeltaX) };

		return (
			<Container
				key="open"
				onClick={!!backdropClosesModal && this.onClose}
				onTouchEnd={!!backdropClosesModal && this.onClose}
			>
        <Swipeable
          className={css(classes.swipeable)}
          onSwipedLeft={this.onStopSwiping}
          onSwipedRight={this.onStopSwiping}
          onSwipingLeft={this.onSwipingLeft}
          onSwipingRight={this.onSwipingRight}
        >
          <Motion style={motionStyle}>
            {
              ({ marginLeft }) => (
                <div
                  className={css(classes.swipeContainer)}
                  style={{ width: window.innerWidth * images.length, marginLeft }}
                >
                  {
                    images.map((image, index) => (
                      <div
                        key={index}
                        className={css(classes.contentContainer)}
                        style={{ width: window.innerWidth, paddingLeft: horizontalPadding, paddingRight: horizontalPadding}}
                      >
                        <div className={css(classes.content)} style={{ marginBottom: offsetThumbnails, maxWidth: width }}>
                          <Header
                            customControls={customControls}
                            onClose={this.onClose}
                            showCloseButton={showCloseButton}
                          />
                          {this.renderImage(image)}
                        </div>
                      </div>
                    ))
                  }
                </div>
              )
            }
          </Motion>
        </Swipeable>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {this.renderThumbnails()}
          {this.renderArrowPrev()}
          {this.renderArrowNext()}
        </div>
        <ScrollLock />
			</Container>
		);
	}
	renderImage (image) {
		const {
			currentImage,
			images,
			imageCountSeparator,
			onClickImage,
			showImageCount,
			showThumbnails,
		} = this.props;

		if (!images || !images.length) return null;

		//const image = images[currentImage];

		let srcset;
		let sizes;

		if (image.srcset) {
			srcset = image.srcset.join();
			sizes = '100vw';
		}

		const thumbnailsSize = showThumbnails ? theme.thumbnail.size : 0;
		const heightOffset = `${theme.header.height + theme.footer.height + thumbnailsSize + (theme.container.gutter.vertical)}px`;

		return (
			<figure className={css(classes.figure)}>
				<img
					className={css(classes.image)}
					onClick={!!onClickImage && onClickImage}
					sizes={sizes}
					src={image.src}
					srcSet={srcset}
					style={{
						cursor: this.props.onClickImage ? 'pointer' : 'auto',
						maxHeight: `calc(100vh - ${heightOffset})`,
					}}
				/>
				<Footer
					caption={images[currentImage].caption}
					countCurrent={currentImage + 1}
					countSeparator={imageCountSeparator}
					countTotal={images.length}
					showCount={showImageCount}
				/>
			</figure>
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

const classes = StyleSheet.create({
  swipeable: {
    height: '100%'
  },
  swipeContainer: {
    display: 'flex',
    height: '100%'
  },
  contentContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center'
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
		margin: '0 auto', // maintain center on very short screens OR very narrow image
		maxWidth: '100%',

		// disable user select
		WebkitTouchCallout: 'none',
		userSelect: 'none',
	},
});

export default Lightbox;
