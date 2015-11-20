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
		var p = this.props.portalId && document.getElementById(this.props.portalId);
		if (!p) {
			var p = document.createElement('div');
			if (this.props.portalId) {
				p.id = this.props.portalId;
			}
			document.body.appendChild(p);
		}
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

},{"./Fade":1,"./Icon":2,"./Portal":3,"./styles/default":7,"blacklist":undefined,"react":undefined,"react-addons-transition-group":undefined}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9yZWFjdC1jb21wb25lbnQtZ3VscC10YXNrcy9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2pvc3MvRGV2ZWxvcG1lbnQvcGFja2FnZXMvcmVhY3QvaW1hZ2VzL3NyYy9GYWRlLmpzIiwiL1VzZXJzL2pvc3MvRGV2ZWxvcG1lbnQvcGFja2FnZXMvcmVhY3QvaW1hZ2VzL3NyYy9JY29uLmpzIiwiL1VzZXJzL2pvc3MvRGV2ZWxvcG1lbnQvcGFja2FnZXMvcmVhY3QvaW1hZ2VzL3NyYy9Qb3J0YWwuanMiLCIvVXNlcnMvam9zcy9EZXZlbG9wbWVudC9wYWNrYWdlcy9yZWFjdC9pbWFnZXMvc3JjL2ljb25zL2Fycm93TGVmdC5qcyIsIi9Vc2Vycy9qb3NzL0RldmVsb3BtZW50L3BhY2thZ2VzL3JlYWN0L2ltYWdlcy9zcmMvaWNvbnMvYXJyb3dSaWdodC5qcyIsIi9Vc2Vycy9qb3NzL0RldmVsb3BtZW50L3BhY2thZ2VzL3JlYWN0L2ltYWdlcy9zcmMvaWNvbnMvaW5kZXguanMiLCIvVXNlcnMvam9zcy9EZXZlbG9wbWVudC9wYWNrYWdlcy9yZWFjdC9pbWFnZXMvc3JjL3N0eWxlcy9kZWZhdWx0LmpzIiwiL1VzZXJzL2pvc3MvRGV2ZWxvcG1lbnQvcGFja2FnZXMvcmVhY3QvaW1hZ2VzL3NyYy9MaWdodGJveC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztxQkNBa0IsT0FBTzs7OztBQUV6QixJQUFJLElBQUksR0FBRyxtQkFBTSxXQUFXLENBQUM7OztBQUM1QixnQkFBZSxFQUFDLDJCQUFHO0FBQ2xCLFNBQU87QUFDTixXQUFRLEVBQUUsR0FBRztHQUNiLENBQUM7RUFDRjtBQUNELG9CQUFtQixFQUFFLDZCQUFVLFFBQVEsRUFBRTtBQUN4QyxZQUFVLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQ3hCO0FBQ0QsbUJB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RztJQUNFO0dBQ0ssQ0FDWjtFQUNGO0FBQ0QsT0FBTSxFQUFDLGtCQUFHO0FBQ1QsTUFBSSxLQUFLLEdBQUcsNEJBQVUsSUFBSSxDQUFDLEtBQUssRUFBRSxxQkFBcUIsRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFLE9BQU8sQ0FBQyxDQUFDOztBQUU5SSxTQUNDOztHQUFZLEtBQUs7R0FDaEI7O01BQVksY0FBYyxFQUFDLEtBQUssRUFBQyxTQUFTLEVBQUMsS0FBSztJQUM5QyxJQUFJLENBQUMsWUFBWSxFQUFFO0lBQ1I7R0FDYjs7TUFBWSxjQUFjLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQyxLQUFLO0lBQzlDLElBQUksQ0FBQyxjQUFjLEVBQUU7SUFDVjtHQUNMLENBQ1I7RUFDRjtDQUNELENBQUMsQ0FBQzs7QUFFSCxNQUFNLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG52YXIgRmFkZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0Z2V0RGVmYXVsdFByb3BzICgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0ZHVyYXRpb246IDIwMFxuXHRcdH07XG5cdH0sXG5cdGNvbXBvbmVudFdpbGxBcHBlYXI6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuXHRcdHNldFRpbWVvdXQoY2FsbGJhY2ssIDEpOyAvLyBuZWVkIGF0IGxlYXN0IG9uZSB0aWNrIHRvIGZpcmUgdHJhbnNpdGlvblxuXHR9LFxuXHRjb21wb25lbnREaWRBcHBlYXI6IGZ1bmN0aW9uICgpIHtcblx0XHR0aGlzLl9zaG93RWxlbWVudCgpO1xuXHR9LFxuXHRjb21wb25lbnRXaWxsRW50ZXI6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuXHRcdHNldFRpbWVvdXQoY2FsbGJhY2ssIDEpO1xuXHR9LFxuXHRjb21wb25lbnREaWRFbnRlcjogZnVuY3Rpb24gKCkge1xuXHRcdHRoaXMuX3Nob3dFbGVtZW50KCk7XG5cdH0sXG5cdGNvbXBvbmVudFdpbGxMZWF2ZTogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG5cdFx0dGhpcy5faGlkZUVsZW1lbnQoKTtcblx0XHRzZXRUaW1lb3V0KGNhbGxiYWNrLCB0aGlzLnByb3BzLmR1cmF0aW9uKTtcblx0fSxcblx0Y29tcG9uZW50RGlkTGVhdmU6IGZ1bmN0aW9uICgpIHtcblx0fSxcblx0X3Nob3dFbGVtZW50OiBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIGVsID0gdGhpcy5yZWZzLmVsZW1lbnQ7XG5cdFx0ZWwuc3R5bGUub3BhY2l0eSA9IDE7XG5cdH0sXG5cdF9oaWRlRWxlbWVudDogZnVuY3Rpb24gKCkge1xuXHRcdHZhciBlbCA9IHRoaXMucmVmcy5lbGVtZW50O1xuXHRcdGVsLnN0eWxlLm9wYWNpdHkgPSAwO1xuXHR9LFxuXHRyZW5kZXI6IGZ1bmN0aW9uICgpIHtcblx0XHRsZXQgc3R5bGUgPSB7XG5cdFx0XHRvcGFjaXR5OiAwLFxuXHRcdFx0V2Via2l0VHJhbnNpdGlvbjogYG9wYWNpdHkgJHt0aGlzLnByb3BzLmR1cmF0aW9ufW1zIGVhc2Utb3V0YCxcblx0XHRcdG1zVHJhbnNpdGlvbjogICAgIGBvcGFjaXR5ICR7dGhpcy5wcm9wcy5kdXJhdGlvbn1tcyBlYXNlLW91dGAsXG5cdFx0XHR0cmFuc2l0aW9uOiAgICAgICBgb3BhY2l0eSAke3RoaXMucHJvcHMuZHVyYXRpb259bXMgZWFzZS1vdXRgLFxuXHRcdH1cblx0XHRyZXR1cm4gPGRpdiByZWY9XCJlbGVtZW50XCIgey4uLnRoaXMucHJvcHN9IHN0eWxlPXtPYmplY3QuYXNzaWduKHt9LCBzdHlsZSwgdGhpcy5wcm9wcy5zdHlsZSl9IC8+O1xuXHR9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBGYWRlO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBpY29ucyBmcm9tICcuL2ljb25zJztcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGRpc3BsYXlOYW1lOiAnSWNvbicsXG5cdHByb3BUeXBlczoge1xuXHRcdHR5cGU6IFJlYWN0LlByb3BUeXBlcy5vbmVPZihPYmplY3Qua2V5cyhpY29ucykpXG5cdH0sXG5cdHJlbmRlciAoKSB7XG5cdFx0cmV0dXJuIDxzcGFuIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogaWNvbnNbdGhpcy5wcm9wcy50eXBlXSB9fSB7Li4udGhpcy5wcm9wc30gLz5cblx0fSxcbn0pO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7cmVuZGVyfSBmcm9tICdyZWFjdC1kb20nO1xubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGRpc3BsYXlOYW1lOiAnUG9ydGFsJyxcblx0cG9ydGFsRWxlbWVudDogbnVsbCxcblx0cmVuZGVyOiAoKSA9PiBudWxsLFxuXHRjb21wb25lbnREaWRNb3VudCgpIHtcblx0XHR2YXIgcCA9IHRoaXMucHJvcHMucG9ydGFsSWQgJiYgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5wcm9wcy5wb3J0YWxJZCk7XG5cdFx0aWYgKCFwKSB7XG5cdFx0XHR2YXIgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdFx0aWYgKHRoaXMucHJvcHMucG9ydGFsSWQpIHtcblx0XHRcdFx0cC5pZCA9IHRoaXMucHJvcHMucG9ydGFsSWQ7XG5cdFx0XHR9XG5cdFx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHApO1xuXHRcdH1cblx0XHR0aGlzLnBvcnRhbEVsZW1lbnQgPSBwO1xuXHRcdHRoaXMuY29tcG9uZW50RGlkVXBkYXRlKCk7XG5cdH0sXG5cdGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuXHRcdGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy5wb3J0YWxFbGVtZW50KTtcblx0fSxcblx0Y29tcG9uZW50RGlkVXBkYXRlKCkge1xuXHRcdHJlbmRlcig8ZGl2IHsuLi50aGlzLnByb3BzfT57dGhpcy5wcm9wcy5jaGlsZHJlbn08L2Rpdj4sIHRoaXMucG9ydGFsRWxlbWVudCk7XG5cdH1cbn0pO1xuIiwibW9kdWxlLmV4cG9ydHMgPSAnPHN2ZyBmaWxsPVwid2hpdGVcIiB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHg9XCIwcHhcIiB5PVwiMHB4XCIgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+JyArXHJcblx0JzxwYXRoIGQ9XCJNMjEzLjcsMjU2TDIxMy43LDI1NkwyMTMuNywyNTZMMzgwLjksODEuOWM0LjItNC4zLDQuMS0xMS40LTAuMi0xNS44bC0yOS45LTMwLjZjLTQuMy00LjQtMTEuMy00LjUtMTUuNS0wLjJMMTMxLjEsMjQ3LjkgYy0yLjIsMi4yLTMuMiw1LjItMyw4LjFjLTAuMSwzLDAuOSw1LjksMyw4LjFsMjA0LjIsMjEyLjdjNC4yLDQuMywxMS4yLDQuMiwxNS41LTAuMmwyOS45LTMwLjZjNC4zLTQuNCw0LjQtMTEuNSwwLjItMTUuOCBMMjEzLjcsMjU2elwiLz4nICtcclxuJzwvc3ZnPic7XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gJzxzdmcgZmlsbD1cIndoaXRlXCIgdmVyc2lvbj1cIjEuMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4PVwiMHB4XCIgeT1cIjBweFwiIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIiB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiPicgK1xyXG5cdCc8cGF0aCBkPVwiTTI5OC4zLDI1NkwyOTguMywyNTZMMjk4LjMsMjU2TDEzMS4xLDgxLjljLTQuMi00LjMtNC4xLTExLjQsMC4yLTE1LjhsMjkuOS0zMC42YzQuMy00LjQsMTEuMy00LjUsMTUuNS0wLjJsMjA0LjIsMjEyLjcgYzIuMiwyLjIsMy4yLDUuMiwzLDguMWMwLjEsMy0wLjksNS45LTMsOC4xTDE3Ni43LDQ3Ni44Yy00LjIsNC4zLTExLjIsNC4yLTE1LjUtMC4yTDEzMS4zLDQ0NmMtNC4zLTQuNC00LjQtMTEuNS0wLjItMTUuOCBMMjk4LjMsMjU2elwiLz4nICtcclxuJzwvc3ZnPic7XHJcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuXHRhcnJvd0xlZnQ6IHJlcXVpcmUoJy4vYXJyb3dMZWZ0JyksXG5cdGFycm93UmlnaHQ6IHJlcXVpcmUoJy4vYXJyb3dSaWdodCcpXG59O1xuIiwiY29uc3Qgc3R5bGVzID0ge1xuXHRhcnJvdzoge1xuXHRcdGJhY2tncm91bmQ6ICdub25lJyxcblx0XHRib3JkZXI6ICdub25lJyxcblx0XHRib3R0b206IDAsXG5cdFx0Y29sb3I6ICd3aGl0ZScsXG5cdFx0Y3Vyc29yOiAncG9pbnRlcicsXG5cdFx0Zm9udFNpemU6IDQ4LFxuXHRcdHJpZ2h0OiAwLFxuXHRcdG91dGxpbmU6ICdub25lJyxcblx0XHRwYWRkaW5nOiAnMCAyJScsXG5cdFx0cG9zaXRpb246ICdhYnNvbHV0ZScsXG5cdFx0dG9wOiAwLFxuXHRcdHdpZHRoOiAnMTAlJyxcblx0XHR6SW5kZXg6IDEwMDIsXG5cblx0XHQvLyBkaXNhYmxlIHVzZXIgc2VsZWN0XG5cdFx0V2Via2l0VG91Y2hDYWxsb3V0OiAnbm9uZScsXG5cdFx0V2Via2l0VXNlclNlbGVjdDogICAnbm9uZScsXG5cdFx0TW96VXNlclNlbGVjdDogICAgICAnbm9uZScsXG5cdFx0bXNVc2VyU2VsZWN0OiAgICAgICAnbm9uZScsXG5cdFx0dXNlclNlbGVjdDogICAgICAgICAnbm9uZScsXG5cdH0sXG5cdGFycm93TmV4dDoge1xuXHRcdHJpZ2h0OiAwLFxuXHR9LFxuXHRhcnJvd1ByZXY6IHtcblx0XHRsZWZ0OiAwLFxuXHR9LFxuXHRiYWNrZHJvcDoge1xuXHRcdGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwwLDAsMC43NiknLFxuXHRcdGJvdHRvbTogMCxcblx0XHRsZWZ0OiAwLFxuXHRcdHBvc2l0aW9uOiAnZml4ZWQnLFxuXHRcdHJpZ2h0OiAwLFxuXHRcdHRvcDogMCxcblx0XHR6SW5kZXg6IDEwMDAsXG5cdH0sXG5cdGNsb3NlOiB7XG5cdFx0YmFja2dyb3VuZDogJ25vbmUnLFxuXHRcdGJvcmRlcjogJ25vbmUnLFxuXHRcdGJvdHRvbTogLTMyLFxuXHRcdGNvbG9yOiAnd2hpdGUnLFxuXHRcdGN1cnNvcjogJ3BvaW50ZXInLFxuXHRcdGZvbnRTaXplOiAxNixcblx0XHRoZWlnaHQ6IDMyLFxuXHRcdGxlZnQ6IDAsXG5cdFx0bWFyZ2luTGVmdDogJ2F1dG8nLFxuXHRcdG1hcmdpblJpZ2h0OiAnYXV0bycsXG5cdFx0b3V0bGluZTogJ25vbmUnLFxuXHRcdHBhZGRpbmc6IDAsXG5cdFx0cG9zaXRpb246ICdhYnNvbHV0ZScsXG5cdFx0cmlnaHQ6IDAsXG5cdFx0dGV4dEFsaWduOiAnY2VudGVyJyxcblx0XHR0ZXh0VHJhbnNmb3JtOiAndXBwZXJjYXNlJyxcblx0XHR3aWR0aDogMTAwLFxuXHR9LFxuXHRkaWFsb2c6IHtcblx0XHRsZWZ0OiAwLFxuXHRcdGxpbmVIZWlnaHQ6IDEsXG5cdFx0bWFyZ2luTGVmdDogJ2F1dG8nLFxuXHRcdG1hcmdpblJpZ2h0OiAnYXV0bycsXG5cdFx0bWF4SGVpZ2h0OiAnODAlJyxcblx0XHRtYXhXaWR0aDogJzEwMCUnLFxuXHRcdHBvc2l0aW9uOiAnZml4ZWQnLFxuXHRcdHJpZ2h0OiAwLFxuXHRcdHRvcDogJzUwJScsXG5cdFx0ekluZGV4OiAxMDAxLFxuXG5cdFx0V2Via2l0VHJhbnNmb3JtOiAndHJhbnNsYXRlWSgtNTAlKScsXG5cdFx0TW96VHJhbnNmb3JtOiAgICAndHJhbnNsYXRlWSgtNTAlKScsXG5cdFx0bXNUcmFuc2Zvcm06ICAgICAndHJhbnNsYXRlWSgtNTAlKScsXG5cdFx0dHJhbnNmb3JtOiAgICAgICAndHJhbnNsYXRlWSgtNTAlKScsXG5cdH0sXG5cdGltYWdlOiB7XG5cdFx0Ym94U2hhZG93OiAnMCAxcHggNHB4IHJnYmEoMCwwLDAsMC4yNSknLFxuXHRcdG1heEhlaWdodDogJzEwMCUnLFxuXHRcdG1heFdpZHRoOiAnODAlJyxcblx0XHRwb3NpdGlvbjogJ2Fic29sdXRlJyxcblxuXHRcdC8vIGNlbnRlciB0aGUgaW1hZ2Ugd2l0aGluIHRoZSBkaWFsb2dcblx0XHRsZWZ0OiAnNTAlJyxcblx0XHR0b3A6ICc1MCUnLFxuXHRcdFdlYmtpdFRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgtNTAlLCAtNTAlKScsXG5cdFx0TW96VHJhbnNmb3JtOiAgICAndHJhbnNsYXRlKC01MCUsIC01MCUpJyxcblx0XHRtc1RyYW5zZm9ybTogICAgICd0cmFuc2xhdGUoLTUwJSwgLTUwJSknLFxuXHRcdHRyYW5zZm9ybTogICAgICAgJ3RyYW5zbGF0ZSgtNTAlLCAtNTAlKScsXG5cblx0XHQvLyBkaXNhYmxlIHVzZXIgc2VsZWN0XG5cdFx0V2Via2l0VG91Y2hDYWxsb3V0OiAnbm9uZScsXG5cdFx0V2Via2l0VXNlclNlbGVjdDogICAnbm9uZScsXG5cdFx0TW96VXNlclNlbGVjdDogICAgICAnbm9uZScsXG5cdFx0bXNVc2VyU2VsZWN0OiAgICAgICAnbm9uZScsXG5cdFx0dXNlclNlbGVjdDogICAgICAgICAnbm9uZScsXG5cblx0fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHN0eWxlcztcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgYmxhY2tsaXN0IGZyb20gJ2JsYWNrbGlzdCc7XG5pbXBvcnQgRmFkZSBmcm9tICcuL0ZhZGUnO1xuaW1wb3J0IEljb24gZnJvbSAnLi9JY29uJztcbmltcG9ydCBQb3J0YWwgZnJvbSAnLi9Qb3J0YWwnO1xuXG5pbXBvcnQgZGVmYXVsdFN0eWxlcyBmcm9tICcuL3N0eWxlcy9kZWZhdWx0JztcbmltcG9ydCBUcmFuc2l0aW9uIGZyb20gJ3JlYWN0LWFkZG9ucy10cmFuc2l0aW9uLWdyb3VwJztcblxuY29uc3QgQk9EWSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF07XG5cbnZhciBMaWdodGJveCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0ZGlzcGxheU5hbWU6ICdMaWdodGJveCcsXG5cdHByb3BUeXBlczoge1xuXHRcdGJhY2tkcm9wQ2xvc2VzTW9kYWw6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuXHRcdGVuYWJsZUtleWJvYXJkSW5wdXQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuXHRcdGluaXRpYWxJbWFnZTogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcblx0XHRoZWlnaHQ6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG5cdFx0aW1hZ2VzOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlPZihcblx0XHRcdFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XG5cdFx0XHRcdHNyYzogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuXHRcdFx0XHRzcmNzZXQ6IFJlYWN0LlByb3BUeXBlcy5hcnJheSxcblx0XHRcdH0pXG5cdFx0KS5pc1JlcXVpcmVkLFxuXHRcdGlzT3BlbjogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG5cdFx0b25DbG9zZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblx0XHRzaG93Q2xvc2VCdXR0b246IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuXHRcdHN0eWxlczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcblx0XHR3aWR0aDogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcblx0fSxcblx0c3RhdGljczoge1xuXHRcdGV4dGVuZFN0eWxlcyhzdHlsZXMpIHtcblx0XHRcdGxldCBleHRTdHlsZXMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0U3R5bGVzKTtcblx0XHRcdGZvciAodmFyIGtleSBpbiBleHRTdHlsZXMpIHtcblx0XHRcdFx0aWYgKGtleSBpbiBzdHlsZXMpIHtcblx0XHRcdFx0XHRleHRTdHlsZXNba2V5XSA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRTdHlsZXNba2V5XSwgc3R5bGVzW2tleV0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZXh0U3R5bGVzO1xuXHRcdH1cblx0fSxcblx0Z2V0RGVmYXVsdFByb3BzICgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0YmFja2Ryb3BDbG9zZXNNb2RhbDogdHJ1ZSxcblx0XHRcdGVuYWJsZUtleWJvYXJkSW5wdXQ6IHRydWUsXG5cdFx0XHRpbml0aWFsSW1hZ2U6IDAsXG5cdFx0XHRoZWlnaHQ6IDYwMCxcblx0XHRcdHN0eWxlczogZGVmYXVsdFN0eWxlcyxcblx0XHRcdHdpZHRoOiA5MDAsXG5cdFx0fTtcblx0fSxcblx0Z2V0SW5pdGlhbFN0YXRlICgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0Y3VycmVudEltYWdlOiB0aGlzLnByb3BzLmluaXRpYWxJbWFnZVxuXHRcdH07XG5cdH0sXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgKG5leHRQcm9wcykge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0Y3VycmVudEltYWdlOiBuZXh0UHJvcHMuaW5pdGlhbEltYWdlXG5cdFx0fSk7XG5cblx0XHRpZiAobmV4dFByb3BzLmlzT3BlbiAmJiBuZXh0UHJvcHMuZW5hYmxlS2V5Ym9hcmRJbnB1dCkge1xuXHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmhhbmRsZUtleWJvYXJkSW5wdXQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuaGFuZGxlS2V5Ym9hcmRJbnB1dCk7XG5cdFx0fVxuXG5cdFx0aWYgKG5leHRQcm9wcy5pc09wZW4pIHtcblx0XHRcdEJPRFkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcblx0XHR9IGVsc2Uge1xuXHRcdFx0Qk9EWS5zdHlsZS5vdmVyZmxvdyA9IG51bGw7XG5cdFx0fVxuXHR9LFxuXG5cdGhhbmRsZUtleWJvYXJkSW5wdXQgKGV2ZW50KSB7XG5cdFx0aWYgKGV2ZW50LmtleUNvZGUgPT09IDM3KSB7XG5cdFx0XHR0aGlzLmdvdG9QcmV2aW91cygpO1xuXHRcdH0gZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzkpIHtcblx0XHRcdHRoaXMuZ290b05leHQoKTtcblx0XHR9IGVsc2UgaWYgKGV2ZW50LmtleUNvZGUgPT09IDI3KSB7XG5cdFx0XHR0aGlzLnByb3BzLm9uQ2xvc2UoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0fSxcblx0Y2xvc2UgKCkge1xuXHRcdHRoaXMucHJvcHMuYmFja2Ryb3BDbG9zZXNNb2RhbCAmJiB0aGlzLnByb3BzLm9uQ2xvc2UgJiYgdGhpcy5wcm9wcy5vbkNsb3NlKCk7XG5cdH0sXG5cdGdvdG9QcmV2aW91cyAoZXZlbnQpIHtcblx0XHRpZiAodGhpcy5zdGF0ZS5jdXJyZW50SW1hZ2UgPT09IDApIHJldHVybjtcblx0XHRpZiAoZXZlbnQpIHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHR9XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRjdXJyZW50SW1hZ2U6IHRoaXMuc3RhdGUuY3VycmVudEltYWdlIC0gMSxcblx0XHR9KTtcblx0fSxcblx0Z290b05leHQgKGV2ZW50KSB7XG5cdFx0aWYgKHRoaXMuc3RhdGUuY3VycmVudEltYWdlID09PSAodGhpcy5wcm9wcy5pbWFnZXMubGVuZ3RoIC0gMSkpIHJldHVybjtcblx0XHRpZiAoZXZlbnQpIHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHR9XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRjdXJyZW50SW1hZ2U6IHRoaXMuc3RhdGUuY3VycmVudEltYWdlICsgMSxcblx0XHR9KTtcblx0fSxcblxuXHRyZW5kZXJBcnJvd1ByZXYgKCkge1xuXHRcdGlmICh0aGlzLnN0YXRlLmN1cnJlbnRJbWFnZSA9PT0gMCkgcmV0dXJuO1xuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxGYWRlIGtleT1cImFycm93UHJldlwiPlxuXHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBzdHlsZT17T2JqZWN0LmFzc2lnbih7fSwgdGhpcy5wcm9wcy5zdHlsZXMuYXJyb3csIHRoaXMucHJvcHMuc3R5bGVzLmFycm93UHJldil9IG9uQ2xpY2s9e3RoaXMuZ290b1ByZXZpb3VzfSBvblRvdWNoRW5kPXt0aGlzLmdvdG9QcmV2aW91c30+XG5cdFx0XHRcdFx0PEljb24gdHlwZT1cImFycm93TGVmdFwiIC8+XG5cdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0PC9GYWRlPlxuXHRcdCk7XG5cdH0sXG5cdHJlbmRlckFycm93TmV4dCAoKSB7XG5cdFx0aWYgKHRoaXMuc3RhdGUuY3VycmVudEltYWdlID09PSAodGhpcy5wcm9wcy5pbWFnZXMubGVuZ3RoIC0gMSkpIHJldHVybjtcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8RmFkZSBrZXk9XCJhcnJvd05leHRcIj5cblx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgc3R5bGU9e09iamVjdC5hc3NpZ24oe30sIHRoaXMucHJvcHMuc3R5bGVzLmFycm93LCB0aGlzLnByb3BzLnN0eWxlcy5hcnJvd05leHQpfSBvbkNsaWNrPXt0aGlzLmdvdG9OZXh0fSBvblRvdWNoRW5kPXt0aGlzLmdvdG9OZXh0fT5cblx0XHRcdFx0XHQ8SWNvbiB0eXBlPVwiYXJyb3dSaWdodFwiIC8+XG5cdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0PC9GYWRlPlxuXHRcdCk7XG5cdH0sXG5cdHJlbmRlckJhY2tkcm9wICgpIHtcblx0XHRpZiAoIXRoaXMucHJvcHMuaXNPcGVuKSByZXR1cm47XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PEZhZGUga2V5PVwiYmFja2Ryb3BcIj5cblx0XHRcdFx0PGRpdiBrZXk9XCJiYWNrZHJvcFwiIHN0eWxlPXt0aGlzLnByb3BzLnN0eWxlcy5iYWNrZHJvcH0gb25Ub3VjaEVuZD17dGhpcy5jbG9zZX0gb25DbGljaz17dGhpcy5jbG9zZX0gLz5cblx0XHRcdDwvRmFkZT5cblx0XHQpO1xuXHR9LFxuXHRyZW5kZXJDbG9zZUJ1dHRvbiAoKSB7XG5cdFx0aWYgKCF0aGlzLnByb3BzLnNob3dDbG9zZUJ1dHRvbikgcmV0dXJuO1xuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxGYWRlIGtleT1cImNsb3NlQnV0dG9uXCI+XG5cdFx0XHRcdDxidXR0b24gc3R5bGU9e3RoaXMucHJvcHMuc3R5bGVzLmNsb3NlfSBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQ2xvc2V9PkNsb3NlPC9idXR0b24+XG5cdFx0XHQ8L0ZhZGU+XG5cdFx0KTtcblx0fSxcblx0cmVuZGVyRGlhbG9nICgpIHtcblx0XHRpZiAoIXRoaXMucHJvcHMuaXNPcGVuKSByZXR1cm47XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PEZhZGUga2V5PVwiZGlhbG9nXCIgb25Ub3VjaEVuZD17dGhpcy5jbG9zZX0gb25DbGljaz17dGhpcy5jbG9zZX0gc3R5bGU9e09iamVjdC5hc3NpZ24oe30sIHRoaXMucHJvcHMuc3R5bGVzLmRpYWxvZywgeyBoZWlnaHQ6IHRoaXMucHJvcHMuaGVpZ2h0LCB3aWR0aDogdGhpcy5wcm9wcy53aWR0aCB9KX0+XG5cdFx0XHRcdHt0aGlzLnJlbmRlckltYWdlcygpfVxuXHRcdFx0XHQ8VHJhbnNpdGlvbiB0cmFuc2l0aW9uTmFtZT1cImRpdlwiIGNvbXBvbmVudD1cImRpdlwiPlxuXHRcdFx0XHRcdHt0aGlzLnJlbmRlckFycm93UHJldigpfVxuXHRcdFx0XHQ8L1RyYW5zaXRpb24+XG5cdFx0XHRcdDxUcmFuc2l0aW9uIHRyYW5zaXRpb25OYW1lPVwiZGl2XCIgY29tcG9uZW50PVwiZGl2XCI+XG5cdFx0XHRcdFx0e3RoaXMucmVuZGVyQXJyb3dOZXh0KCl9XG5cdFx0XHRcdDwvVHJhbnNpdGlvbj5cblx0XHRcdFx0PFRyYW5zaXRpb24gdHJhbnNpdGlvbk5hbWU9XCJkaXZcIiBjb21wb25lbnQ9XCJkaXZcIj5cblx0XHRcdFx0XHR7dGhpcy5yZW5kZXJDbG9zZUJ1dHRvbigpfVxuXHRcdFx0XHQ8L1RyYW5zaXRpb24+XG5cdFx0XHQ8L0ZhZGU+XG5cdFx0KTtcblx0fSxcblx0cmVuZGVySW1hZ2VzICgpIHtcblx0XHRsZXQgeyBpbWFnZXMgfSA9IHRoaXMucHJvcHM7XG5cdFx0bGV0IHsgY3VycmVudEltYWdlIH0gPSB0aGlzLnN0YXRlO1xuXHRcdGlmICghaW1hZ2VzIHx8ICFpbWFnZXMubGVuZ3RoKSByZXR1cm47XG5cblx0XHRpZiAoaW1hZ2VzW2N1cnJlbnRJbWFnZV0uc3Jjc2V0KSB7XG5cdFx0XHR2YXIgaW1nID0gPGltZyBzcmM9e2ltYWdlc1tjdXJyZW50SW1hZ2VdLnNyY30gc3JjU2V0PXtpbWFnZXNbY3VycmVudEltYWdlXS5zcmNzZXQuam9pbigpfSBzaXplcz17cGFyc2VJbnQodGhpcy5wcm9wcy5zdHlsZXMuaW1hZ2UubWF4V2lkdGgpKyd2dyd9IHN0eWxlPXt0aGlzLnByb3BzLnN0eWxlcy5pbWFnZX0gb25Ub3VjaEVuZD17ZSA9PiBlLnN0b3BQcm9wYWdhdGlvbigpfSBvbkNsaWNrPXtlID0+IGUuc3RvcFByb3BhZ2F0aW9uKCl9IC8+XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBpbWcgPSA8aW1nIHNyYz17aW1hZ2VzW2N1cnJlbnRJbWFnZV0uc3JjfSBzdHlsZT17dGhpcy5wcm9wcy5zdHlsZXMuaW1hZ2V9IG9uVG91Y2hFbmQ9e2UgPT4gZS5zdG9wUHJvcGFnYXRpb24oKX0gb25DbGljaz17ZSA9PiBlLnN0b3BQcm9wYWdhdGlvbigpfSAvPlxuXHRcdH1cblx0XHRyZXR1cm4gKFxuXHRcdFx0PFRyYW5zaXRpb24gdHJhbnNpdGlvbk5hbWU9XCJkaXZcIiBjb21wb25lbnQ9XCJkaXZcIj5cblx0XHRcdFx0PEZhZGUga2V5PXsnaW1hZ2UnICsgY3VycmVudEltYWdlfT5cblx0XHRcdFx0XHR7aW1nfVxuXHRcdFx0XHQ8L0ZhZGU+XG5cdFx0XHQ8L1RyYW5zaXRpb24+XG5cdFx0KTtcblx0fSxcblx0cmVuZGVyICgpIHtcblx0XHRsZXQgcHJvcHMgPSBibGFja2xpc3QodGhpcy5wcm9wcywgJ2JhY2tkcm9wQ2xvc2VzTW9kYWwnLCAnaW5pdGlhbEltYWdlJywgJ2hlaWdodCcsICdpbWFnZXMnLCAnaXNPcGVuJywgJ29uQ2xvc2UnLCAnc2hvd0Nsb3NlQnV0dG9uJywgJ3dpZHRoJyk7XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PFBvcnRhbCB7Li4ucHJvcHN9PlxuXHRcdFx0XHQ8VHJhbnNpdGlvbiB0cmFuc2l0aW9uTmFtZT1cImRpdlwiIGNvbXBvbmVudD1cImRpdlwiPlxuXHRcdFx0XHRcdHt0aGlzLnJlbmRlckRpYWxvZygpfVxuXHRcdFx0XHQ8L1RyYW5zaXRpb24+XG5cdFx0XHRcdDxUcmFuc2l0aW9uIHRyYW5zaXRpb25OYW1lPVwiZGl2XCIgY29tcG9uZW50PVwiZGl2XCI+XG5cdFx0XHRcdFx0e3RoaXMucmVuZGVyQmFja2Ryb3AoKX1cblx0XHRcdFx0PC9UcmFuc2l0aW9uPlxuXHRcdFx0PC9Qb3J0YWw+XG5cdFx0KTtcblx0fVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTGlnaHRib3g7XG4iXX0=
