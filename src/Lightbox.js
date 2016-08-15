import React, { Component, PropTypes } from 'react';
import { create } from 'jss';
import reactJss from 'react-jss';
import camelCase from 'jss-camel-case';
import px from 'jss-px';
import nested from 'jss-nested';
import vendorPrefixer from 'jss-vendor-prefixer';
// import Swipeable from 'react-swipeable';

export let jss = create();
export let useSheet = reactJss(jss);
jss.use(camelCase());
jss.use(nested());
jss.use(px());
jss.use(vendorPrefixer());

import utils from './utils';
import Icon from './Icon';
import Portal from './Portal';

import defaultStyles from './styles/default';

class Lightbox extends Component {
	static theme (themeStyles) {
		const extStyles = Object.assign({}, defaultStyles);
		for (const key in extStyles) {
			if (key in themeStyles) {
				extStyles[key] = Object.assign({}, defaultStyles[key], themeStyles[key]);
			}
		}
		return extStyles;
	}
	constructor () {
		super();

		utils.bindFunctions.call(this, [
			'close',
			'gotoNext',
			'gotoPrev',
			'handleImageClick',
			'handleKeyboardInput',
			'handleResize',
		]);

		this.state = { windowHeight: 0 };
	}
	componentWillReceiveProps (nextProps) {
		if (!utils.canUseDom) return;

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
		if (nextProps.isOpen) {
			window.addEventListener('resize', this.handleResize);
			this.handleResize();
		} else {
			window.removeEventListener('resize', this.handleResize);
		}

		// handle body scroll
		if (nextProps.isOpen) {
			utils.bodyScroll.blockScroll();
		} else {
			utils.bodyScroll.allowScroll();
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
	close (e) {
		if (e.target.id !== 'react-images-container') return;

		if (this.props.backdropClosesModal && this.props.onClose) {
			this.props.onClose();
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
	handleImageClick () {
		if (!this.props.onClickImage) return;

		this.props.onClickImage();

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
	handleResize () {
		this.setState({
			windowHeight: window.innerHeight || 0,
		});

	}

	// ==============================
	// RENDERERS
	// ==============================

	renderArrowPrev () {
		if (this.props.currentImage === 0) return null;
		const { classes } = this.props.sheet;

		return (
			<button title="Previous (Left arrow key)"
				type="button"
				className={`${classes.arrow} ${classes.arrowPrev}`}
				onClick={this.gotoPrev}
				onTouchEnd={this.gotoPrev}
			>
				<Icon type="arrowLeft" />
			</button>
		);
	}
	renderArrowNext () {
		if (this.props.currentImage === (this.props.images.length - 1)) return null;
		const { classes } = this.props.sheet;
		return (
			<button title="Next (Right arrow key)"
				type="button"
				className={`${classes.arrow} ${classes.arrowNext}`}
				onClick={this.gotoNext}
				onTouchEnd={this.gotoNext}
				>
				<Icon type="arrowRight" />
			</button>
		);
	}
	renderCloseBar () {
		const { classes } = this.props.sheet;

		return (
			<div className={classes.closeBar}>
				{this.renderCustomControls()}
				{this.renderCloseButton()}
			</div>
		);
	}
	renderCloseButton () {
		if (!this.props.showCloseButton) return null;
		const { classes } = this.props.sheet;

		return (
			<button
				title="Close (Esc)"
				className={classes.closeButton}
				onClick={this.props.onClose}
			>
				<Icon type="close" />
			</button>
		);
	}
	renderCustomControls () {
		if (!this.props.customControls) return null;
		return this.props.customControls;
	}
	renderDialog () {
		if (!this.props.isOpen) return null;
		const { classes } = this.props.sheet;

		return (
			<div id="react-images-container"
				key="dialog"
				className={classes.container}
				onClick={this.close}
				onTouchEnd={this.close}
			>
				<span className={classes.contentHeightShim} />
				<div className={classes.content}>
					{this.renderCloseBar()}
					{this.renderImages()}
				</div>
				{this.renderArrowPrev()}
				{this.renderArrowNext()}
			</div>
		);
	}
	renderFooter (caption) {
		const { currentImage, images, imageCountSeparator, showImageCount } = this.props;
		const { classes } = this.props.sheet;

		if (!caption && !showImageCount) return null;

		const imageCount = showImageCount ? (
			<div className={classes.footerCount}>
				{currentImage + 1}
				{imageCountSeparator}
				{images.length}
			</div>)
			: null;
		const figcaption = caption
			? <figcaption className={classes.footerCaption}>{caption}</figcaption>
			: null;

		return (
			<div className={classes.footer}>
				{imageCount}
				{figcaption}
			</div>
		);
	}
	renderImages () {
		const { images, currentImage } = this.props;
		const { classes } = this.props.sheet;
		const { windowHeight } = this.state;

		if (!images || !images.length) return null;

		const image = images[currentImage];

		let srcset;
		let sizes;

		if (image.srcset) {
			srcset = image.srcset.join();
			sizes = '100vw';
		}

		return (
			<figure key={`image ${currentImage}`}
				className={classes.figure}
				style={{ maxWidth: this.props.width }}
				>
				{/*
					Re-implement when react warning "unknown props"
					https://fb.me/react-unknown-prop is resolved
					<Swipeable onSwipedLeft={this.gotoNext} onSwipedRight={this.gotoPrev} />
				*/}
				<img className={classes.image}
					onClick={this.handleImageClick}
					sizes={sizes}
					src={image.src}
					srcSet={srcset}
					style={{
						cursor: this.props.onClickImage ? 'pointer' : 'auto',
						maxHeight: windowHeight,
					}}
				/>
				{this.renderFooter(images[currentImage].caption)}
			</figure>
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

Lightbox.displayName = 'Lightbox';

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
	width: 1024,
};

export default useSheet(Lightbox, defaultStyles);
