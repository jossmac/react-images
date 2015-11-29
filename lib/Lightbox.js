'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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

var _reactAddonsTransitionGroup = require('react-addons-transition-group');

var _reactAddonsTransitionGroup2 = _interopRequireDefault(_reactAddonsTransitionGroup);

var PropTypes = _react2['default'].PropTypes;

var BODY = document.body;

var Lightbox = _react2['default'].createClass({
	displayName: 'Lightbox',
	propTypes: {
		backdropClosesModal: PropTypes.bool,
		currentImage: PropTypes.number,
		enableKeyboardInput: PropTypes.bool,
		height: PropTypes.number,
		images: PropTypes.arrayOf(PropTypes.shape({
			src: PropTypes.string.isRequired,
			srcset: PropTypes.array
		})).isRequired,
		isOpen: PropTypes.bool,
		onClickNext: PropTypes.func.isRequired,
		onClickPrev: PropTypes.func.isRequired,
		onClose: PropTypes.func.isRequired,
		showCloseButton: PropTypes.bool,
		styles: PropTypes.object,
		width: PropTypes.number
	},
	statics: {
		extendStyles: function extendStyles(styles) {
			var extStyles = _extends({}, _stylesDefault2['default']);
			for (var key in extStyles) {
				if (key in styles) {
					extStyles[key] = _extends({}, _stylesDefault2['default'][key], styles[key]);
				}
			}
			return extStyles;
		}
	},
	getDefaultProps: function getDefaultProps() {
		return {
			backdropClosesModal: true,
			enableKeyboardInput: true,
			currentImage: 0,
			height: 600,
			styles: _stylesDefault2['default'],
			width: 900
		};
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
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

	gotoPrev: function gotoPrev(event) {
		if (this.props.currentImage === 0) return;
		this.props.onClickPrev();
	},
	gotoNext: function gotoNext(event) {
		if (this.props.currentImage === this.props.images.length - 1) return;
		this.props.onClickNext();
	},
	handleKeyboardInput: function handleKeyboardInput(event) {
		if (event.keyCode === 37) {
			this.gotoPrev();
		} else if (event.keyCode === 39) {
			this.gotoNext();
		} else if (event.keyCode === 27) {
			this.props.onClose();
		} else {
			return false;
		}
	},
	close: function close() {
		this.props.backdropClosesModal && this.props.onClose && this.props.onClose();
	},

	renderArrowPrev: function renderArrowPrev() {
		if (this.props.currentImage === 0) return;

		return _react2['default'].createElement(
			_Fade2['default'],
			{ key: 'arrowPrev' },
			_react2['default'].createElement(
				'button',
				{ type: 'button', style: _extends({}, this.props.styles.arrow, this.props.styles.arrowPrev), onClick: this.gotoPrev, onTouchEnd: this.gotoPrev },
				_react2['default'].createElement(_Icon2['default'], { type: 'arrowLeft' })
			)
		);
	},
	renderArrowNext: function renderArrowNext() {
		if (this.props.currentImage === this.props.images.length - 1) return;

		return _react2['default'].createElement(
			_Fade2['default'],
			{ key: 'arrowNext' },
			_react2['default'].createElement(
				'button',
				{ type: 'button', style: _extends({}, this.props.styles.arrow, this.props.styles.arrowNext), onClick: this.gotoNext, onTouchEnd: this.gotoNext },
				_react2['default'].createElement(_Icon2['default'], { type: 'arrowRight' })
			)
		);
	},
	renderBackdrop: function renderBackdrop() {
		if (!this.props.isOpen) return;

		return _react2['default'].createElement(
			_Fade2['default'],
			{ key: 'backdrop' },
			_react2['default'].createElement('div', { key: 'backdrop', style: this.props.styles.backdrop, onTouchEnd: this.close, onClick: this.close })
		);
	},
	renderCloseButton: function renderCloseButton() {
		if (!this.props.showCloseButton) return;

		return _react2['default'].createElement(
			_Fade2['default'],
			{ key: 'closeButton' },
			_react2['default'].createElement(
				'button',
				{ style: this.props.styles.close, onClick: this.props.onClose },
				'Close'
			)
		);
	},
	renderDialog: function renderDialog() {
		if (!this.props.isOpen) return;

		return _react2['default'].createElement(
			_Fade2['default'],
			{ key: 'dialog', onTouchEnd: this.close, onClick: this.close, style: _extends({}, this.props.styles.dialog, { height: this.props.height, width: this.props.width }) },
			this.renderImages(),
			_react2['default'].createElement(
				_reactAddonsTransitionGroup2['default'],
				{ transitionName: 'div', component: 'div' },
				this.renderArrowPrev()
			),
			_react2['default'].createElement(
				_reactAddonsTransitionGroup2['default'],
				{ transitionName: 'div', component: 'div' },
				this.renderArrowNext()
			),
			_react2['default'].createElement(
				_reactAddonsTransitionGroup2['default'],
				{ transitionName: 'div', component: 'div' },
				this.renderCloseButton()
			)
		);
	},
	renderImages: function renderImages() {
		var _props = this.props;
		var images = _props.images;
		var currentImage = _props.currentImage;

		if (!images || !images.length) return;

		if (images[currentImage].srcset) {
			var img = _react2['default'].createElement('img', { src: images[currentImage].src, srcSet: images[currentImage].srcset.join(), sizes: parseInt(this.props.styles.image.maxWidth) + 'vw', style: this.props.styles.image, onTouchEnd: function (e) {
					return e.stopPropagation();
				}, onClick: function (e) {
					return e.stopPropagation();
				} });
		} else {
			var img = _react2['default'].createElement('img', { src: images[currentImage].src, style: this.props.styles.image, onTouchEnd: function (e) {
					return e.stopPropagation();
				}, onClick: function (e) {
					return e.stopPropagation();
				} });
		}
		return _react2['default'].createElement(
			_reactAddonsTransitionGroup2['default'],
			{ transitionName: 'div', component: 'div' },
			_react2['default'].createElement(
				_Fade2['default'],
				{ key: 'image' + currentImage },
				img
			)
		);
	},
	render: function render() {
		var props = (0, _blacklist2['default'])(this.props, 'backdropClosesModal', 'currentImage', 'enableKeyboardInput', 'height', 'images', 'isOpen', 'onClickNext', 'onClickPrev', 'onClose', 'showCloseButton', 'styles', 'width');

		return _react2['default'].createElement(
			_Portal2['default'],
			props,
			_react2['default'].createElement(
				_reactAddonsTransitionGroup2['default'],
				{ transitionName: 'div', component: 'div' },
				this.renderDialog()
			),
			_react2['default'].createElement(
				_reactAddonsTransitionGroup2['default'],
				{ transitionName: 'div', component: 'div' },
				this.renderBackdrop()
			)
		);
	}
});

module.exports = Lightbox;