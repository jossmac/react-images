'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _reactAddons = require('react/addons');

var _reactAddons2 = _interopRequireDefault(_reactAddons);

var _blacklist = require('blacklist');

var _blacklist2 = _interopRequireDefault(_blacklist);

var _Fade = require('./Fade');

var _Fade2 = _interopRequireDefault(_Fade);

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _Portal = require('./Portal');

var _Portal2 = _interopRequireDefault(_Portal);

var _stylesDefault = require('./styles/default');

var _stylesDefault2 = _interopRequireDefault(_stylesDefault);

var Transition = _reactAddons2['default'].addons.TransitionGroup;
var BODY = document.getElementsByTagName('body')[0];

var Lightbox = _reactAddons2['default'].createClass({
	displayName: 'Lightbox',
	propTypes: {
		backdropClosesModal: _reactAddons2['default'].PropTypes.bool,
		enableKeyboardInput: _reactAddons2['default'].PropTypes.bool,
		initialImage: _reactAddons2['default'].PropTypes.number,
		height: _reactAddons2['default'].PropTypes.number,
		images: _reactAddons2['default'].PropTypes.array,
		isOpen: _reactAddons2['default'].PropTypes.bool,
		onClose: _reactAddons2['default'].PropTypes.func,
		showCloseButton: _reactAddons2['default'].PropTypes.bool,
		styles: _reactAddons2['default'].PropTypes.object,
		width: _reactAddons2['default'].PropTypes.number
	},
	getDefaultProps: function getDefaultProps() {
		return {
			backdropClosesModal: true,
			enableKeyboardInput: true,
			initialImage: 0,
			height: 600,
			styles: _stylesDefault2['default'],
			width: 900
		};
	},
	getInitialState: function getInitialState() {
		return {
			currentImage: this.props.initialImage
		};
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
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

	handleKeyboardInput: function handleKeyboardInput(event) {
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
	gotoPrevious: function gotoPrevious() {
		if (this.state.currentImage === 0) return;

		this.setState({
			currentImage: this.state.currentImage - 1
		});
	},
	gotoNext: function gotoNext() {
		if (this.state.currentImage === this.props.images.length - 1) return;

		this.setState({
			currentImage: this.state.currentImage + 1
		});
	},

	renderArrowPrev: function renderArrowPrev() {
		if (this.state.currentImage === 0) return;

		return _reactAddons2['default'].createElement(
			_Fade2['default'],
			{ key: 'arrowPrev' },
			_reactAddons2['default'].createElement(
				'button',
				{ type: 'button', style: _extends({}, this.props.styles.arrow, this.props.styles.arrowPrev), onClick: this.gotoPrevious },
				_reactAddons2['default'].createElement(_Icon2['default'], { type: 'arrowLeft' })
			)
		);
	},
	renderArrowNext: function renderArrowNext() {
		if (this.state.currentImage === this.props.images.length - 1) return;

		return _reactAddons2['default'].createElement(
			_Fade2['default'],
			{ key: 'arrowNext' },
			_reactAddons2['default'].createElement(
				'button',
				{ type: 'button', style: _extends({}, this.props.styles.arrow, this.props.styles.arrowNext), onClick: this.gotoNext },
				_reactAddons2['default'].createElement(_Icon2['default'], { type: 'arrowRight' })
			)
		);
	},
	renderBackdrop: function renderBackdrop() {
		if (!this.props.isOpen) return;

		return _reactAddons2['default'].createElement(
			_Fade2['default'],
			{ key: 'backdrop' },
			_reactAddons2['default'].createElement('div', { key: 'backdrop', style: this.props.styles.backdrop, onClick: this.props.backdropClosesModal ? this.props.onClose : null })
		);
	},
	renderCloseButton: function renderCloseButton() {
		if (!this.props.showCloseButton) return;

		return _reactAddons2['default'].createElement(
			_Fade2['default'],
			{ key: 'closeButton' },
			_reactAddons2['default'].createElement(
				'button',
				{ style: this.props.styles.close, onClick: this.props.onClose },
				'Close'
			)
		);
	},
	renderDialog: function renderDialog() {
		if (!this.props.isOpen) return;

		return _reactAddons2['default'].createElement(
			_Fade2['default'],
			{ key: 'dialog', style: _extends({}, this.props.styles.dialog, { height: this.props.height, width: this.props.width }) },
			this.renderImages(),
			_reactAddons2['default'].createElement(
				Transition,
				{ component: 'div' },
				this.renderArrowPrev()
			),
			_reactAddons2['default'].createElement(
				Transition,
				{ component: 'div' },
				this.renderArrowNext()
			),
			_reactAddons2['default'].createElement(
				Transition,
				{ component: 'div' },
				this.renderCloseButton()
			)
		);
	},
	renderImages: function renderImages() {
		var images = this.props.images;
		var currentImage = this.state.currentImage;

		if (!images || !images.length) return;

		return _reactAddons2['default'].createElement(
			Transition,
			{ component: 'div' },
			_reactAddons2['default'].createElement(
				_Fade2['default'],
				{ key: 'image' + currentImage },
				_reactAddons2['default'].createElement('img', { src: images[currentImage], style: this.props.styles.image })
			)
		);
	},
	render: function render() {
		var props = (0, _blacklist2['default'])(this.props, 'backdropClosesModal', 'initialImage', 'height', 'images', 'isOpen', 'onClose', 'showCloseButton', 'width');

		return _reactAddons2['default'].createElement(
			_Portal2['default'],
			props,
			_reactAddons2['default'].createElement(
				Transition,
				{ component: 'div' },
				this.renderDialog()
			),
			_reactAddons2['default'].createElement(
				Transition,
				{ component: 'div' },
				this.renderBackdrop()
			)
		);
	}
});

module.exports = Lightbox;