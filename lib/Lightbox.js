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

var BODY = document.getElementsByTagName('body')[0];

var Lightbox = _react2['default'].createClass({
	displayName: 'Lightbox',
	propTypes: {
		backdropClosesModal: _react2['default'].PropTypes.bool,
		enableKeyboardInput: _react2['default'].PropTypes.bool,
		initialImage: _react2['default'].PropTypes.number,
		height: _react2['default'].PropTypes.number,
		images: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.shape({
			src: _react2['default'].PropTypes.string.isRequired,
			srcset: _react2['default'].PropTypes.array
		})).isRequired,
		isOpen: _react2['default'].PropTypes.bool,
		onClose: _react2['default'].PropTypes.func.isRequired,
		showCloseButton: _react2['default'].PropTypes.bool,
		styles: _react2['default'].PropTypes.object,
		width: _react2['default'].PropTypes.number
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
	close: function close() {
		this.props.backdropClosesModal && this.props.onClose && this.props.onClose();
	},
	gotoPrevious: function gotoPrevious(event) {
		if (this.state.currentImage === 0) return;
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}
		this.setState({
			currentImage: this.state.currentImage - 1
		});
	},
	gotoNext: function gotoNext(event) {
		if (this.state.currentImage === this.props.images.length - 1) return;
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}
		this.setState({
			currentImage: this.state.currentImage + 1
		});
	},

	renderArrowPrev: function renderArrowPrev() {
		if (this.state.currentImage === 0) return;

		return _react2['default'].createElement(
			_Fade2['default'],
			{ key: 'arrowPrev' },
			_react2['default'].createElement(
				'button',
				{ type: 'button', style: _extends({}, this.props.styles.arrow, this.props.styles.arrowPrev), onClick: this.gotoPrevious, onTouchEnd: this.gotoPrevious },
				_react2['default'].createElement(_Icon2['default'], { type: 'arrowLeft' })
			)
		);
	},
	renderArrowNext: function renderArrowNext() {
		if (this.state.currentImage === this.props.images.length - 1) return;

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
		var images = this.props.images;
		var currentImage = this.state.currentImage;

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
		var props = (0, _blacklist2['default'])(this.props, 'backdropClosesModal', 'initialImage', 'height', 'images', 'isOpen', 'onClose', 'showCloseButton', 'width');

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