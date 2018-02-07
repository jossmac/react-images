import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite';
import ScrollLock from 'react-scrolllock';

import defaultTheme from './theme';
import Arrow from './components/Arrow';
import Container from './components/Container';
import Footer from './components/Footer';
import Header from './components/Header';
import PaginatedThumbnails from './components/PaginatedThumbnails';
import Portal from './components/Portal';
import DefaultSpinner from './components/Spinner';

import bindFunctions from './utils/bindFunctions';
import canUseDom from './utils/canUseDom';
import deepMerge from './utils/deepMerge';

// consumers sometimes provide incorrect type or casing
function normalizeSourceSet (data) {
	const sourceSet = data.srcSet || data.srcset;

	if (Array.isArray(sourceSet)) {
		return sourceSet.join();
	}

	return sourceSet;
}

class Lightbox extends Component {
	constructor (props) {
		super(props);

		this.theme = deepMerge(defaultTheme, props.theme);
		this.classes = StyleSheet.create(deepMerge(defaultStyles, this.theme));
		this.state = { imageLoaded: false };

		bindFunctions.call(this, [
			'gotoNext',
			'gotoPrev',
			'closeBackdrop',
			'handleKeyboardInput',
			'handleImageLoaded',
		]);
	}
	getChildContext () {
		return {
			theme: this.theme,
		};
	}
	componentDidMount () {
		if (this.props.isOpen) {
			if (this.props.enableKeyboardInput) {
				window.addEventListener('keydown', this.handleKeyboardInput);
			}
			if (typeof this.props.currentImage === 'number') {
				this.preloadImage(this.props.currentImage, this.handleImageLoaded);
			}
		}
	}
	componentWillReceiveProps (nextProps) {
		if (!canUseDom) return;

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

		// preload current image
		if (this.props.currentImage !== nextProps.currentImage || !this.props.isOpen && nextProps.isOpen) {
			const img = this.preloadImage(nextProps.currentImage, this.handleImageLoaded);
			this.setState({ imageLoaded: img.complete });
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

	preloadImage (idx, onload) {
		const data = this.props.images[idx];

		if (!data) return;

		const img = new Image();
		const sourceSet = normalizeSourceSet(data);

		// TODO: add error handling for missing images
		img.onerror = onload;
		img.onload = onload;
		img.src = data.src;

		if (sourceSet) img.srcset = sourceSet;

		return img;
	}
	gotoNext (event) {
		const { currentImage, images } = this.props;
		const { imageLoaded } = this.state;

		if (!imageLoaded || currentImage === (images.length - 1)) return;

		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}

		this.props.onClickNext();
	}
	gotoPrev (event) {
		const { currentImage } = this.props;
		const { imageLoaded } = this.state;

		if (!imageLoaded || currentImage === 0) return;

		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}

		this.props.onClickPrev();
	}
	closeBackdrop (event) {
		// make sure event only happens if they click the backdrop
		// and if the caption is widening the figure element let that respond too
		if (event.target.id === 'lightboxBackdrop' || event.target.tagName === 'FIGURE') {
			this.props.onClose();
		}
	}
	handleKeyboardInput (event) {
		if (event.keyCode === 37) { // left
			this.gotoPrev(event);
			return true;
		} else if (event.keyCode === 39) { // right
			this.gotoNext(event);
			return true;
		} else if (event.keyCode === 27) { // esc
			this.props.onClose();
			return true;
		}
		return false;

	}
	handleImageLoaded () {
		this.setState({ imageLoaded: true });
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
				title={this.props.leftArrowTitle}
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
				title={this.props.rightArrowTitle}
				type="button"
			/>
		);
	}
	renderDialog () {
		const {
			backdropClosesModal,
			isOpen,
			showThumbnails,
			width,
		} = this.props;

		const { imageLoaded } = this.state;

		if (!isOpen) return <span key="closed" />;

		let offsetThumbnails = 0;
		if (showThumbnails) {
			offsetThumbnails = this.theme.thumbnail.size + this.theme.container.gutter.vertical;
		}

		return (
			<Container
				key="open"
				onClick={backdropClosesModal && this.closeBackdrop}
				onTouchEnd={backdropClosesModal && this.closeBackdrop}
			>
				<div>
					<div className={css(this.classes.content)} style={{ marginBottom: offsetThumbnails, maxWidth: width }}>
						{imageLoaded && this.renderHeader()}
						{this.renderImages()}
						{this.renderSpinner()}
						{imageLoaded && this.renderFooter()}
					</div>
					{imageLoaded && this.renderThumbnails()}
					{imageLoaded && this.renderArrowPrev()}
					{imageLoaded && this.renderArrowNext()}
					{this.props.preventScroll && <ScrollLock />}
				</div>
			</Container>
		);
	}
	renderImages () {
		const {
			currentImage,
			images,
			onClickImage,
			showThumbnails,
		} = this.props;

		const { imageLoaded } = this.state;

		if (!images || !images.length) return null;

		const image = images[currentImage];
		const sourceSet = normalizeSourceSet(image);
		const sizes = sourceSet ? '100vw' : null;

		const thumbnailsSize = showThumbnails ? this.theme.thumbnail.size : 0;
		const heightOffset = `${this.theme.header.height + this.theme.footer.height + thumbnailsSize
			+ (this.theme.container.gutter.vertical)}px`;

		return (
			<figure className={css(this.classes.figure)}>
				{/*
					Re-implement when react warning "unknown props"
					https://fb.me/react-unknown-prop is resolved
					<Swipeable onSwipedLeft={this.gotoNext} onSwipedRight={this.gotoPrev} />
				*/}
				<img
					className={css(this.classes.image, imageLoaded && this.classes.imageLoaded)}
					onClick={onClickImage}
					sizes={sizes}
					alt={image.alt}
					src={image.src}
					srcSet={sourceSet}
					style={{
						cursor: onClickImage ? 'pointer' : 'auto',
						maxHeight: `calc(100vh - ${heightOffset})`,
					}}
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
	renderHeader () {
		const {
			closeButtonTitle,
			customControls,
			onClose,
			showCloseButton,
		} = this.props;

		return (
			<Header
				customControls={customControls}
				onClose={onClose}
				showCloseButton={showCloseButton}
				closeButtonTitle={closeButtonTitle}
			/>
		);
	}
	renderFooter () {
		const {
			currentImage,
			images,
			imageCountSeparator,
			showImageCount,
		} = this.props;

		if (!images || !images.length) return null;

		return (
			<Footer
				caption={images[currentImage].caption}
				countCurrent={currentImage + 1}
				countSeparator={imageCountSeparator}
				countTotal={images.length}
				showCount={showImageCount}
			/>
		);
	}
	renderSpinner () {
		const {
			spinner,
			spinnerColor,
			spinnerSize,
		} = this.props;

		const { imageLoaded } = this.state;
		const Spinner = spinner;

		return (
			<div className={css(this.classes.spinner, !imageLoaded && this.classes.spinnerActive)}>
				<Spinner
					color={spinnerColor}
					size={spinnerSize}
				/>
			</div>
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
	closeButtonTitle: PropTypes.string,
	currentImage: PropTypes.number,
	customControls: PropTypes.arrayOf(PropTypes.node),
	enableKeyboardInput: PropTypes.bool,
	imageCountSeparator: PropTypes.string,
	images: PropTypes.arrayOf(
		PropTypes.shape({
			src: PropTypes.string.isRequired,
			srcSet: PropTypes.array,
			caption: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
			thumbnail: PropTypes.string,
		})
	).isRequired,
	isOpen: PropTypes.bool,
	leftArrowTitle: PropTypes.string,
	onClickImage: PropTypes.func,
	onClickNext: PropTypes.func,
	onClickPrev: PropTypes.func,
	onClose: PropTypes.func.isRequired,
	preloadNextImage: PropTypes.bool,
	preventScroll: PropTypes.bool,
	rightArrowTitle: PropTypes.string,
	showCloseButton: PropTypes.bool,
	showImageCount: PropTypes.bool,
	showThumbnails: PropTypes.bool,
	spinner: PropTypes.func,
	spinnerColor: PropTypes.string,
	spinnerSize: PropTypes.number,
	theme: PropTypes.object,
	thumbnailOffset: PropTypes.number,
	width: PropTypes.number,
};
Lightbox.defaultProps = {
	closeButtonTitle: 'Close (Esc)',
	currentImage: 0,
	enableKeyboardInput: true,
	imageCountSeparator: ' of ',
	leftArrowTitle: 'Previous (Left arrow key)',
	onClickShowNextImage: true,
	preloadNextImage: true,
	preventScroll: true,
	rightArrowTitle: 'Next (Right arrow key)',
	showCloseButton: true,
	showImageCount: true,
	spinner: DefaultSpinner,
	spinnerColor: 'white',
	spinnerSize: 100,
	theme: {},
	thumbnailOffset: 2,
	width: 1024,
};
Lightbox.childContextTypes = {
	theme: PropTypes.object.isRequired,
};

const defaultStyles = {
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

		// opacity animation on image load
		opacity: 0,
		transition: 'opacity 0.3s',
	},
	imageLoaded: {
		opacity: 1,
	},
	spinner: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',

		// opacity animation to make spinner appear with delay
		opacity: 0,
		transition: 'opacity 0.3s',
	},
	spinnerActive: {
		opacity: 1,
	},
};


export default Lightbox;
