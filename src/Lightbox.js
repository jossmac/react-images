import React, { Component, PropTypes } from 'react';
import useSheet from 'react-jss';
import jss from 'jss';
import camelCase from 'jss-camel-case';
import px from 'jss-px';
import nested from 'jss-nested';
import vendorPrefixer from 'jss-vendor-prefixer';

jss.use(camelCase());
jss.use(nested());
jss.use(px());
jss.use(vendorPrefixer());

import utils from './utils';
import Fade from './Fade';
import Icon from './Icon';
import Portal from './Portal';

import defaultStyles from './styles/default';

class Lightbox extends Component {
	static theme(themeStyles) {
		let extStyles = Object.assign({}, defaultStyles);
		for (let key in extStyles) {
			if (key in themeStyles) {
				extStyles[key] = Object.assign({}, defaultStyles[key], themeStyles[key]);
			}
		}
		return extStyles;
	}
	constructor() {
		super();

		this.close = this.close.bind(this);
		this.gotoNext = this.gotoNext.bind(this);
		this.gotoPrev = this.gotoPrev.bind(this);
		this.handleImageClick = this.handleImageClick.bind(this);
		this.handleKeyboardInput = this.handleKeyboardInput.bind(this);
		this.handleResize = this.handleResize.bind(this);
	}
	componentWillReceiveProps (nextProps) {
		if (nextProps.isOpen && nextProps.enableKeyboardInput) {
			if (utils.canUseDOM) window.addEventListener('keydown', this.handleKeyboardInput);
			if (utils.canUseDOM) window.addEventListener('resize', this.handleResize);
			this.handleResize();
		} else {
			if (utils.canUseDOM) window.removeEventListener('keydown', this.handleKeyboardInput);
			if (utils.canUseDOM) window.removeEventListener('resize', this.handleResize);
		}

		if (nextProps.isOpen) {
			if (utils.canUseDOM) document.body.style.overflow = 'hidden';
		} else {
			if (utils.canUseDOM) document.body.style.overflow = null;
		}
	}

	close (e) {
		if (e.target.id !== 'react-images-container') return;

		this.props.backdropClosesModal && this.props.onClose && this.props.onClose();
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
	handleImageClick (e) {
		if (!this.props.onClickShowNextImage) return;

		this.gotoNext(e);

	}
	handleImageLoad (e, index) {
		// console.log('image', index, 'loaded', e);
	}
	handleKeyboardInput (event) {
		if (event.keyCode === 37) {
			this.gotoPrev(event);
		} else if (event.keyCode === 39) {
			this.gotoNext(event);
		} else if (event.keyCode === 27) {
			this.props.onClose();
		} else {
			return false;
		}
	}
	handleResize () {
		if (!utils.canUseDOM) return;
		this.setState({
			windowHeight: window.innerHeight || 0
		});
	}

	renderArrowNext () {
		if (this.props.currentImage === (this.props.images.length - 1)) return;
		const { classes } = this.props.sheet;

		return (
			<button title="Next (Right arrow key)" type="button" className={`${classes.arrow} ${classes.arrowNext}`} onClick={this.gotoNext} onTouchEnd={this.gotoNext}>
				<Icon type="arrowRight" />
			</button>
		);
	}
	renderArrowPrev () {
		if (this.props.currentImage === 0) return;
		const { classes } = this.props.sheet;

		return (
			<button title="Previous (Left arrow key)" type="button" className={`${classes.arrow} ${classes.arrowPrev}`} onClick={this.gotoPrev} onTouchEnd={this.gotoPrev}>
				<Icon type="arrowLeft" />
			</button>
		);
	}
	renderCloseButton () {
		if (!this.props.showCloseButton) return;
		const { classes } = this.props.sheet;

		return (
			<div className={classes.closeBar}>
				<button title="Close (Esc)" className={classes.closeButton} onClick={this.props.onClose}>
					<Icon type="close" />
				</button>
			</div>
		);
	}
	renderDialog () {
		if (!this.props.isOpen) return;
		const { classes } = this.props.sheet;

		return (
			<Fade id="react-images-container" key="dialog" duration={250} className={classes.container} onClick={this.close} onTouchEnd={this.close}>
				<span className={classes.contentHeightShim} />
				<div className={classes.content}>
					{this.renderCloseButton()}
					{this.renderImages()}
				</div>
				{this.renderArrowPrev()}
				{this.renderArrowNext()}
			</Fade>
		);
	}
	renderFooter (caption) {
		const { currentImage, images, showImageCount } = this.props;
		const { classes } = this.props.sheet;

		if (!caption && !showImageCount) return;

		const imageCount = showImageCount ? <div className={classes.footerCount}>{currentImage + 1} of {images.length}</div> : null;
		const figcaption = caption ? <figcaption className={classes.footerCaption}>{caption}</figcaption> : null;

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

		if (!images || !images.length) return;

		const image = images[currentImage];

		let srcset, sizes;
		if (image.srcset) {
			srcset = image.srcset.join();
			sizes = '100vw';
		}

		return (
			<figure key={'image' + currentImage} className={classes.figure} style={{ maxWidth: this.props.width }}>
				<img
					className={classes.image}
					onClick={this.handleImageClick}
					onLoad={e => this.handleImageLoad(e, currentImage)}
					onTouchEnd={this.handleImageClick}
					sizes={sizes}
					src={image.src}
					srcSet={srcset}
					style={{
						cursor: this.props.onClickShowNextImage ? 'pointer' : 'auto',
						maxHeight: windowHeight
					}}
				/>
				{this.renderFooter(images[currentImage].caption)}
			</figure>
		);
	}
	render () {
		const { classes } = this.props.sheet;

		return (
			<Portal>
				{this.renderDialog()}
			</Portal>
		);
	}
};

Lightbox.displayName = 'Lightbox';
Lightbox.propTypes = {
	backdropClosesModal: PropTypes.bool,
	currentImage: PropTypes.number,
	enableKeyboardInput: PropTypes.bool,
	images: PropTypes.arrayOf(
		PropTypes.shape({
			src: PropTypes.string.isRequired,
			srcset: PropTypes.array,
			caption: PropTypes.string
		})
	).isRequired,
	isOpen: PropTypes.bool,
	onClickShowNextImage: PropTypes.bool,
	onClickNext: PropTypes.func.isRequired,
	onClickPrev: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
	showCloseButton: PropTypes.bool,
	showImageCount: PropTypes.bool,
	width: PropTypes.number,
};
Lightbox.defaultProps = {
	enableKeyboardInput: true,
	currentImage: 0,
	onClickShowNextImage: true,
	showCloseButton: true,
	showImageCount: true,
	width: 900,
};

export default useSheet(Lightbox, defaultStyles);
