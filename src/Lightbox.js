import React, { Component, PropTypes } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';
// import Swipeable from 'react-swipeable';

import Arrow from './components/Arrow';
import Container from './components/Container';
import Footer from './components/Footer';
import Header from './components/Header';
import Portal from './components/Portal';

import theme from './theme';
import { bindFunctions, bodyScroll, canUseDom, deepMerge } from './utils';
import styles from './styles/default';

const classes = StyleSheet.create(styles);

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
		const extended = deepMerge(theme, this.props.theme);
		// console.log('Lightbox extended theme', extended);

		return {
			theme: extended,
		};
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

		// add event listeners
		if (nextProps.enableKeyboardInput) {
			window.addEventListener('keydown', this.handleKeyboardInput);
		} else {
			window.removeEventListener('keydown', this.handleKeyboardInput);
		}

		// handle body scroll
		if (nextProps.isOpen) {
			bodyScroll.blockScroll();
		} else {
			bodyScroll.allowScroll();
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
		if (event.keyCode === 37) {
			this.gotoPrev(event);
			return true;
		} else if (event.keyCode === 39) {
			this.gotoNext(event);
			return true;
		} else if (event.keyCode === 27) {
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
		} = this.props;

		if (!isOpen) return <span key="closed" />;

		return (
			<Container
				key="open"
				onClick={!!backdropClosesModal && onClose}
				onTouchEnd={!!backdropClosesModal && onClose}
			>
				<div className={css(classes.content)} style={{ maxWidth: this.props.width }}>
					<Header
						customControls={customControls}
						onClose={onClose}
						showCloseButton={showCloseButton}
					/>
					{this.renderImages()}
				</div>
				{this.renderArrowPrev()}
				{this.renderArrowNext()}
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
		} = this.props;

		if (!images || !images.length) return null;

		const image = images[currentImage];

		let srcset;
		let sizes;
		let width;

		if (image.srcset) {
			srcset = image.srcset.join();
			sizes = '100vw';
		}

		return (
			<figure className={css(classes.figure)} style={{ width }}>
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
						maxHeight: `calc(100vh - ${theme.header.height + theme.footer.height}px)`,
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
	render () {
		// return this.renderDialog();
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
			caption: PropTypes.string,
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
	theme: PropTypes.object,
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
	width: 1024,
};
Lightbox.childContextTypes = {
	theme: PropTypes.object.isRequired,
};

export default Lightbox;
