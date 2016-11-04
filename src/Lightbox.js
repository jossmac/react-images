import React, { Component, PropTypes } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';
import ScrollLock from 'react-scrolllock';

import theme from './theme';
import Arrow from './components/Arrow';
import Container from './components/Container';
import Footer from './components/Footer';
import Header from './components/Header';
import PaginatedThumbnails from './components/PaginatedThumbnails';
import Portal from './components/Portal';

import { bindFunctions, canUseDom } from './utils';

class Lightbox extends Component {
	constructor () {
		super();

		bindFunctions.call(this, [
			'gotoNext',
			'gotoPrev',
			'handleKeyboardInput',
		]);
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

	preloadImage (idx) {
		const image = this.props.images[idx];

		if (!image) return;

		const img = new Image();

		img.src = image.src;

		if (image.srcset) {
			img.srcset = image.srcset.join();
		}
	}
	gotoNext (event) {
		if (this.props.currentImage === (this.props.images.length - 1)) return;
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}
		this.props.onClickNext();

	}
	gotoPrev (event) {
		if (this.props.currentImage === 0) return;
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}
		this.props.onClickPrev();

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
			customControls,
			isOpen,
			onClose,
			showCloseButton,
			showThumbnails,
			width,
		} = this.props;

		if (!isOpen) return <span key="closed" />;

		let offsetThumbnails = 0;
		if (showThumbnails) {
			offsetThumbnails = theme.thumbnail.size + theme.container.gutter.vertical;
		}

		return (
			<Container
				key="open"
				onClick={!!backdropClosesModal && onClose}
				onTouchEnd={!!backdropClosesModal && onClose}
			>
				<div className={css(classes.content)} style={{ marginBottom: offsetThumbnails, maxWidth: width }}>
					<Header
						customControls={customControls}
						onClose={onClose}
						showCloseButton={showCloseButton}
					/>
					{this.renderImages()}
				</div>
				{this.renderThumbnails()}
				{this.renderArrowPrev()}
				{this.renderArrowNext()}
				<ScrollLock />
			</Container>
		);
	}
	renderImages () {
		const {
			currentImage,
			images,
			imageCountSeparator,
			onClickImage,
			showImageCount,
			showThumbnails,
		} = this.props;

		if (!images || !images.length) return null;

		const image = images[currentImage];

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
				{/*
					Re-implement when react warning "unknown props"
					https://fb.me/react-unknown-prop is resolved
					<Swipeable onSwipedLeft={this.gotoNext} onSwipedRight={this.gotoPrev} />
				*/}
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
