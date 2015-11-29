require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var Fade = _react2["default"].createClass({
	displayName: "Fade",

	getDefaultProps: function getDefaultProps() {
		return {
			duration: 200
		};
	},
	componentWillAppear: function componentWillAppear(callback) {
		setTimeout(callback, 1); // need at least one tick to fire transition
	},
	componentDidAppear: function componentDidAppear() {
		this._showElement();
	},
	componentWillEnter: function componentWillEnter(callback) {
		setTimeout(callback, 1);
	},
	componentDidEnter: function componentDidEnter() {
		this._showElement();
	},
	componentWillLeave: function componentWillLeave(callback) {
		this._hideElement();
		setTimeout(callback, this.props.duration);
	},
	componentDidLeave: function componentDidLeave() {},
	_showElement: function _showElement() {
		var el = this.refs.element;
		el.style.opacity = 1;
	},
	_hideElement: function _hideElement() {
		var el = this.refs.element;
		el.style.opacity = 0;
	},
	render: function render() {
		var style = {
			opacity: 0,
			WebkitTransition: "opacity " + this.props.duration + "ms ease-out",
			msTransition: "opacity " + this.props.duration + "ms ease-out",
			transition: "opacity " + this.props.duration + "ms ease-out"
		};
		return _react2["default"].createElement("div", _extends({ ref: "element" }, this.props, { style: _extends({}, style, this.props.style) }));
	}
});

module.exports = Fade;

},{"react":undefined}],2:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _icons = require('./icons');

var _icons2 = _interopRequireDefault(_icons);

module.exports = _react2['default'].createClass({
	displayName: 'Icon',
	propTypes: {
		type: _react2['default'].PropTypes.oneOf(Object.keys(_icons2['default']))
	},
	render: function render() {
		return _react2['default'].createElement('span', _extends({ dangerouslySetInnerHTML: { __html: _icons2['default'][this.props.type] } }, this.props));
	}
});

},{"./icons":6,"react":undefined}],3:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

module.exports = _react2['default'].createClass({
	displayName: 'Portal',
	portalElement: null,
	render: function render() {
		return null;
	},
	componentDidMount: function componentDidMount() {
		var p = document.createElement('div');
		document.body.appendChild(p);
		this.portalElement = p;
		this.componentDidUpdate();
	},
	componentWillUnmount: function componentWillUnmount() {
		document.body.removeChild(this.portalElement);
	},
	componentDidUpdate: function componentDidUpdate() {
		(0, _reactDom.render)(_react2['default'].createElement(
			'div',
			this.props,
			this.props.children
		), this.portalElement);
	}
});

},{"react":undefined,"react-dom":undefined}],4:[function(require,module,exports){
'use strict';

module.exports = '<svg fill="white" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 512 512" xml:space="preserve">' + '<path d="M213.7,256L213.7,256L213.7,256L380.9,81.9c4.2-4.3,4.1-11.4-0.2-15.8l-29.9-30.6c-4.3-4.4-11.3-4.5-15.5-0.2L131.1,247.9 c-2.2,2.2-3.2,5.2-3,8.1c-0.1,3,0.9,5.9,3,8.1l204.2,212.7c4.2,4.3,11.2,4.2,15.5-0.2l29.9-30.6c4.3-4.4,4.4-11.5,0.2-15.8 L213.7,256z"/>' + '</svg>';

},{}],5:[function(require,module,exports){
'use strict';

module.exports = '<svg fill="white" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 512 512" xml:space="preserve">' + '<path d="M298.3,256L298.3,256L298.3,256L131.1,81.9c-4.2-4.3-4.1-11.4,0.2-15.8l29.9-30.6c4.3-4.4,11.3-4.5,15.5-0.2l204.2,212.7 c2.2,2.2,3.2,5.2,3,8.1c0.1,3-0.9,5.9-3,8.1L176.7,476.8c-4.2,4.3-11.2,4.2-15.5-0.2L131.3,446c-4.3-4.4-4.4-11.5-0.2-15.8 L298.3,256z"/>' + '</svg>';

},{}],6:[function(require,module,exports){
'use strict';

module.exports = {
	arrowLeft: require('./arrowLeft'),
	arrowRight: require('./arrowRight')
};

},{"./arrowLeft":4,"./arrowRight":5}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var styles = {
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
		WebkitUserSelect: 'none',
		MozUserSelect: 'none',
		msUserSelect: 'none',
		userSelect: 'none'
	},
	arrowNext: {
		right: 0
	},
	arrowPrev: {
		left: 0
	},
	backdrop: {
		backgroundColor: 'rgba(0,0,0,0.76)',
		bottom: 0,
		left: 0,
		position: 'fixed',
		right: 0,
		top: 0,
		zIndex: 1000
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
		width: 100
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
		MozTransform: 'translateY(-50%)',
		msTransform: 'translateY(-50%)',
		transform: 'translateY(-50%)'
	},
	image: {
		backgroundColor: 'white',
		boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
		maxHeight: '100%',
		maxWidth: '80%',
		position: 'absolute',

		// center the image within the dialog
		left: '50%',
		top: '50%',
		WebkitTransform: 'translate(-50%, -50%)',
		MozTransform: 'translate(-50%, -50%)',
		msTransform: 'translate(-50%, -50%)',
		transform: 'translate(-50%, -50%)',

		// disable user select
		WebkitTouchCallout: 'none',
		WebkitUserSelect: 'none',
		MozUserSelect: 'none',
		msUserSelect: 'none',
		userSelect: 'none'

	}
};

exports['default'] = styles;
module.exports = exports['default'];

},{}],"react-images":[function(require,module,exports){
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
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}
		this.props.onClickPrev();
	},
	gotoNext: function gotoNext(event) {
		if (this.props.currentImage === this.props.images.length - 1) return;
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}
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

},{"./Fade":1,"./Icon":2,"./Portal":3,"./styles/default":7,"blacklist":undefined,"react":undefined,"react-addons-transition-group":undefined}]},{},[]);
