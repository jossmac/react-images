import React from 'react';
import blacklist from 'blacklist';
import Fade from './Fade';
import Icon from './Icon';
import Portal from './Portal';

import defaultStyles from './styles/default';
import Transition from 'react-addons-transition-group';

const BODY = document.getElementsByTagName('body')[0];

var Lightbox = React.createClass({
	displayName: 'Lightbox',
	propTypes: {
		backdropClosesModal: React.PropTypes.bool,
		enableKeyboardInput: React.PropTypes.bool,
		initialImage: React.PropTypes.number,
		height: React.PropTypes.number,
		images: React.PropTypes.array,
		isOpen: React.PropTypes.bool,
		onClose: React.PropTypes.func,
		showCloseButton: React.PropTypes.bool,
		styles: React.PropTypes.object,
		width: React.PropTypes.number,
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
			initialImage: 0,
			height: 600,
			styles: defaultStyles,
			width: 900,
		};
	},
	getInitialState () {
		return {
			currentImage: this.props.initialImage
		};
	},
	componentWillReceiveProps (nextProps) {
		this.setState({
			currentImage: nextProps.initialImage
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
			this.gotoPrevious();
		} else if (event.keyCode === 39) {
			this.gotoNext();
		} else if (event.keyCode === 27) {
			this.props.onClose();
		} else {
			return false;
		}
	},
	close () {
		this.props.backdropClosesModal && this.props.onClose && this.props.onClose();
	},
	gotoPrevious (event) {
		if (this.state.currentImage === 0) return;
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}
		this.setState({
			currentImage: this.state.currentImage - 1,
		});
	},
	gotoNext (event) {
		if (this.state.currentImage === (this.props.images.length - 1)) return;
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}
		this.setState({
			currentImage: this.state.currentImage + 1,
		});
	},

	renderArrowPrev () {
		if (this.state.currentImage === 0) return;

		return (
			<Fade key="arrowPrev">
				<button type="button" style={Object.assign({}, this.props.styles.arrow, this.props.styles.arrowPrev)} onClick={this.gotoPrevious} onTouchEnd={this.gotoPrevious}>
					<Icon type="arrowLeft" />
				</button>
			</Fade>
		);
	},
	renderArrowNext () {
		if (this.state.currentImage === (this.props.images.length - 1)) return;

		return (
			<Fade key="arrowNext">
				<button type="button" style={Object.assign({}, this.props.styles.arrow, this.props.styles.arrowNext)} onClick={this.gotoNext} onTouchEnd={this.gotoNext}>
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
		let { images } = this.props;
		let { currentImage } = this.state;
		if (!images || !images.length) return;

		return (
			<Transition transitionName="div" component="div">
				<Fade key={'image' + currentImage}>
					<img src={images[currentImage]} style={this.props.styles.image} onTouchEnd={e => e.stopPropagation()} onClick={e => e.stopPropagation()} />
				</Fade>
			</Transition>
		);
	},
	render () {
		let props = blacklist(this.props, 'backdropClosesModal', 'initialImage', 'height', 'images', 'isOpen', 'onClose', 'showCloseButton', 'width');

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
