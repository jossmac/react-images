import React from 'react/addons';
import blacklist from 'blacklist';
import Fade from './Fade';
import Icon from './Icon';
import Portal from './Portal';

const Transition = React.addons.TransitionGroup;
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
		width: React.PropTypes.number,
	},
	getDefaultProps () {
		return {
			backdropClosesModal: true,
			enableKeyboardInput: true,
			initialImage: 0,
			height: 600,
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
	gotoPrevious () {
		if (this.state.currentImage === 0) return;

		this.setState({
			currentImage: this.state.currentImage - 1,
		});
	},
	gotoNext () {
		if (this.state.currentImage === (this.props.images.length - 1)) return;

		this.setState({
			currentImage: this.state.currentImage + 1,
		});
	},

	renderArrowPrev () {
		if (this.state.currentImage === 0) return;

		return (
			<Fade key="arrowPrev">
				<button type="button" style={Object.assign({}, styles.arrow, styles.arrowPrev)} onClick={this.gotoPrevious}>
					<Icon type="arrowLeft" />
				</button>
			</Fade>
		);
	},
	renderArrowNext () {
		if (this.state.currentImage === (this.props.images.length - 1)) return;

		return (
			<Fade key="arrowNext">
				<button type="button" style={Object.assign({}, styles.arrow, styles.arrowNext)} onClick={this.gotoNext}>
					<Icon type="arrowRight" />
				</button>
			</Fade>
		);
	},
	renderBackdrop () {
		if (!this.props.isOpen) return;

		return (
			<Fade key="backdrop">
				<div key="backdrop" style={styles.backdrop} onClick={this.props.backdropClosesModal ? this.props.onClose : null} />
			</Fade>
		);
	},
	renderCloseButton () {
		if (!this.props.showCloseButton) return;

		return (
			<Fade key="closeButton">
				<button style={styles.close} onClick={this.props.onClose}>Close</button>
			</Fade>
		);
	},
	renderDialog () {
		if (!this.props.isOpen) return;

		return (
			<Fade key="dialog" style={Object.assign({}, styles.dialog, { height: this.props.height, width: this.props.width })}>
				{this.renderImages()}
				<Transition component="div">
					{this.renderArrowPrev()}
				</Transition>
				<Transition component="div">
					{this.renderArrowNext()}
				</Transition>
				<Transition component="div">
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
			<Transition component="div">
				<Fade key={'image' + currentImage}>
					<img src={images[currentImage]} style={styles.image} />
				</Fade>
			</Transition>
		);
	},
	render () {
		let props = blacklist(this.props, 'backdropClosesModal', 'initialImage', 'height', 'images', 'isOpen', 'onClose', 'showCloseButton', 'width');

		return (
			<Portal {...props}>
				<Transition component="div">
					{this.renderDialog()}
				</Transition>
				<Transition component="div">
					{this.renderBackdrop()}
				</Transition>
			</Portal>
		);
	}
});

const styles = {
	arrow: {
		background: 'none',
		border: 'none',
		bottom: 0,
		color: 'white',
		cursor: 'pointer',
		fontSize: 48,
		right: 0,
		outline: 'none',
		padding: '0 2%',
		position: 'absolute',
		top: 0,
		width: '10%',
		zIndex: 1002,

		// disable user select
		WebkitTouchCallout: 'none',
		WebkitUserSelect:   'none',
		MozUserSelect:      'none',
		msUserSelect:       'none',
		userSelect:         'none',
	},
	arrowNext: {
		right: 0,
	},
	arrowPrev: {
		left: 0,
	},
	backdrop: {
		backgroundColor: 'rgba(0,0,0,0.66)',
		bottom: 0,
		left: 0,
		position: 'fixed',
		right: 0,
		top: 0,
		zIndex: 1000,
	},
	close: {
		background: 'none',
		border: 'none',
		bottom: -32,
		color: 'white',
		cursor: 'pointer',
		fontSize: 16,
		height: 32,
		left: 0,
		marginLeft: 'auto',
		marginRight: 'auto',
		outline: 'none',
		padding: 0,
		position: 'absolute',
		right: 0,
		textAlign: 'center',
		textTransform: 'uppercase',
		width: 100,
	},
	dialog: {
		left: 0,
		lineHeight: 1,
		marginLeft: 'auto',
		marginRight: 'auto',
		maxHeight: '80%',
		maxWidth: '100%',
		position: 'fixed',
		right: 0,
		top: '50%',
		zIndex: 1001,

		WebkitTransform: 'translateY(-50%)',
		MozTransform:    'translateY(-50%)',
		msTransform:     'translateY(-50%)',
		transform:       'translateY(-50%)',
	},
	image: {
		boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
		maxHeight: '100%',
		maxWidth: '80%',
		position: 'absolute',

		// center the image within the dialog
		left: '50%',
		top: '50%',
		WebkitTransform: 'translate(-50%, -50%)',
		MozTransform:    'translate(-50%, -50%)',
		msTransform:     'translate(-50%, -50%)',
		transform:       'translate(-50%, -50%)',

		// disable user select
		WebkitTouchCallout: 'none',
		WebkitUserSelect:   'none',
		MozUserSelect:      'none',
		msUserSelect:       'none',
		userSelect:         'none',

	},
};

module.exports = Lightbox;
