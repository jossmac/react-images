import React from 'react';
import blacklist from 'blacklist';
import Fade from './Fade';
import Icon from './Icon';
import Portal from './Portal';

import defaultStyles from './styles/default';
import Transition from 'react-addons-transition-group';

const { PropTypes } = React;
const BODY = document.body;

var Lightbox = React.createClass({
	displayName: 'Lightbox',
	propTypes: {
		backdropClosesModal: PropTypes.bool,
		currentImage: PropTypes.number,
		enableKeyboardInput: PropTypes.bool,
		height: PropTypes.number,
		images: PropTypes.arrayOf(
			PropTypes.shape({
				src: PropTypes.string.isRequired,
				srcset: PropTypes.array,
			})
		).isRequired,
		isOpen: PropTypes.bool,
		onClickNext: PropTypes.func.isRequired,
		onClickPrev: PropTypes.func.isRequired,
		onClose: PropTypes.func.isRequired,
		showCloseButton: PropTypes.bool,
		styles: PropTypes.object,
		width: PropTypes.number,
	},
	statics: {
		extendStyles(styles) {
			let extStyles = Object.assign({}, defaultStyles);
			for (var key in extStyles) {
				if (key in styles) {
					extStyles[key] = Object.assign({}, defaultStyles[key], styles[key]);
				}
			}
			return extStyles;
		}
	},
	getDefaultProps () {
		return {
			backdropClosesModal: true,
			enableKeyboardInput: true,
			currentImage: 0,
			height: 600,
			styles: defaultStyles,
			width: 900,
		};
	},
	componentWillReceiveProps (nextProps) {
		this.setState({
			currentImage: nextProps.currentImage
		});

		if (nextProps.isOpen && nextProps.enableKeyboardInput) {
			window.addEventListener('keydown', this.handleKeyboardInput);
		} else {
			window.removeEventListener('keydown', this.handleKeyboardInput);
		}

		if (nextProps.isOpen) {
			BODY.style.overflow = 'hidden';
		} else {
			BODY.style.overflow = null;
		}
	},

	handleKeyboardInput (event) {
		if (event.keyCode === 37) {
			this.props.onClickPrev();
		} else if (event.keyCode === 39) {
			this.props.onClickNext();
		} else if (event.keyCode === 27) {
			this.props.onClose();
		} else {
			return false;
		}
	},
	close () {
		this.props.backdropClosesModal && this.props.onClose && this.props.onClose();
	},

	renderArrowPrev () {
		if (this.props.currentImage === 0) return;

		return (
			<Fade key="arrowPrev">
				<button type="button" style={Object.assign({}, this.props.styles.arrow, this.props.styles.arrowPrev)} onClick={this.props.onClickPrev} onTouchEnd={this.props.onClickPrev}>
					<Icon type="arrowLeft" />
				</button>
			</Fade>
		);
	},
	renderArrowNext () {
		if (this.props.currentImage === (this.props.images.length - 1)) return;

		return (
			<Fade key="arrowNext">
				<button type="button" style={Object.assign({}, this.props.styles.arrow, this.props.styles.arrowNext)} onClick={this.props.onClickNext} onTouchEnd={this.props.onClickNext}>
					<Icon type="arrowRight" />
				</button>
			</Fade>
		);
	},
	renderBackdrop () {
		if (!this.props.isOpen) return;

		return (
			<Fade key="backdrop">
				<div key="backdrop" style={this.props.styles.backdrop} onTouchEnd={this.close} onClick={this.close} />
			</Fade>
		);
	},
	renderCloseButton () {
		if (!this.props.showCloseButton) return;

		return (
			<Fade key="closeButton">
				<button style={this.props.styles.close} onClick={this.props.onClose}>Close</button>
			</Fade>
		);
	},
	renderDialog () {
		if (!this.props.isOpen) return;

		return (
			<Fade key="dialog" onTouchEnd={this.close} onClick={this.close} style={Object.assign({}, this.props.styles.dialog, { height: this.props.height, width: this.props.width })}>
				{this.renderImages()}
				<Transition transitionName="div" component="div">
					{this.renderArrowPrev()}
				</Transition>
				<Transition transitionName="div" component="div">
					{this.renderArrowNext()}
				</Transition>
				<Transition transitionName="div" component="div">
					{this.renderCloseButton()}
				</Transition>
			</Fade>
		);
	},
	renderImages () {
		let { images, currentImage } = this.props;
		if (!images || !images.length) return;

		if (images[currentImage].srcset) {
			var img = <img src={images[currentImage].src} srcSet={images[currentImage].srcset.join()} sizes={parseInt(this.props.styles.image.maxWidth)+'vw'} style={this.props.styles.image} onTouchEnd={e => e.stopPropagation()} onClick={e => e.stopPropagation()} />
		} else {
			var img = <img src={images[currentImage].src} style={this.props.styles.image} onTouchEnd={e => e.stopPropagation()} onClick={e => e.stopPropagation()} />
		}
		return (
			<Transition transitionName="div" component="div">
				<Fade key={'image' + currentImage}>
					{img}
				</Fade>
			</Transition>
		);
	},
	render () {
		let props = blacklist(this.props, {
			'backdropClosesModal' = true,
			'currentImage' = true,
			'enableKeyboardInput' = true,
			'height' = true,
			'images' = true,
			'isOpen' = true,
			'onClickNext' = true,
			'onClickPrev' = true,
			'onClose' = true,
			'showCloseButton' = true,
			'styles' = true,
			'width' = true,
		});

		return (
			<Portal {...props}>
				<Transition transitionName="div" component="div">
					{this.renderDialog()}
				</Transition>
				<Transition transitionName="div" component="div">
					{this.renderBackdrop()}
				</Transition>
			</Portal>
		);
	}
});

module.exports = Lightbox;
