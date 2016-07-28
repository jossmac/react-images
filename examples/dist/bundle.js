require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var Fade = (function (_Component) {
	_inherits(Fade, _Component);

	function Fade() {
		_classCallCheck(this, Fade);

		_get(Object.getPrototypeOf(Fade.prototype), 'constructor', this).call(this);
		this._showElement = this._showElement.bind(this);
		this._hideElement = this._hideElement.bind(this);
	}

	_createClass(Fade, [{
		key: 'componentWillAppear',
		value: function componentWillAppear(callback) {
			setTimeout(callback, 1); // need at least one tick to fire transition
		}
	}, {
		key: 'componentDidAppear',
		value: function componentDidAppear() {
			this._showElement();
		}
	}, {
		key: 'componentWillEnter',
		value: function componentWillEnter(callback) {
			setTimeout(callback, 1);
		}
	}, {
		key: 'componentDidEnter',
		value: function componentDidEnter() {
			this._showElement();
		}
	}, {
		key: 'componentWillLeave',
		value: function componentWillLeave(callback) {
			this._hideElement();
			setTimeout(callback, this.props.duration);
		}
	}, {
		key: 'componentDidLeave',
		value: function componentDidLeave() {
			// empty
		}
	}, {
		key: '_showElement',
		value: function _showElement() {
			var el = this.refs.element;
			el.style.opacity = 1;
		}
	}, {
		key: '_hideElement',
		value: function _hideElement() {
			var el = this.refs.element;
			el.style.opacity = 0;
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props;
			var component = _props.component;
			var duration = _props.duration;
			var style = _props.style;

			var props = _objectWithoutProperties(_props, ['component', 'duration', 'style']);

			var componentProps = _extends({}, props, {
				style: _extends({
					opacity: 0,
					WebkitTransition: 'opacity ' + duration + 'ms ease-out',
					msTransition: 'opacity ' + duration + 'ms ease-out',
					transition: 'opacity ' + duration + 'ms ease-out'
				}, style)
			});
			return _react2['default'].createElement(component, componentProps);
		}
	}]);

	return Fade;
})(_react.Component);

Fade.propTypes = {
	children: _react.PropTypes.any,
	component: _react.PropTypes.any,
	duration: _react.PropTypes.number,
	style: _react.PropTypes.object
};

Fade.defaultProps = {
	component: 'div',
	duration: 200,
	ref: 'element'
};

exports['default'] = Fade;
module.exports = exports['default'];

},{"react":undefined}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _icons = require('./icons');

var _icons2 = _interopRequireDefault(_icons);

var Icon = function Icon(props) {
	return _react2['default'].createElement('span', _extends({
		dangerouslySetInnerHTML: { __html: _icons2['default'][props.type] }
	}, props));
};

Icon.propTypes = {
	type: _react.PropTypes.oneOf(Object.keys(_icons2['default']))
};

exports['default'] = Icon;
module.exports = exports['default'];

},{"./icons":7,"react":undefined}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsTransitionGroup = require('react-addons-transition-group');

var _reactAddonsTransitionGroup2 = _interopRequireDefault(_reactAddonsTransitionGroup);

var _reactDom = require('react-dom');

var FirstChild = function FirstChild(_ref) {
	var children = _ref.children;

	var kids = _react.Children.toArray(children);
	return kids[0] || null;
};

var Portal = (function (_Component) {
	_inherits(Portal, _Component);

	function Portal() {
		_classCallCheck(this, Portal);

		_get(Object.getPrototypeOf(Portal.prototype), 'constructor', this).call(this);
		this.portalElement = null;
	}

	_createClass(Portal, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var p = document.createElement('div');
			document.body.appendChild(p);
			this.portalElement = p;
			this.componentDidUpdate();
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			(0, _reactDom.render)(_react2['default'].createElement(_reactAddonsTransitionGroup2['default'], _extends({}, this.props, { component: FirstChild })), this.portalElement);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			document.body.removeChild(this.portalElement);
		}
	}, {
		key: 'render',
		value: function render() {
			return null;
		}
	}]);

	return Portal;
})(_react.Component);

exports['default'] = Portal;

Portal.propTypes = {
	children: _react.PropTypes.element
};
module.exports = exports['default'];

},{"react":undefined,"react-addons-transition-group":undefined,"react-dom":undefined}],4:[function(require,module,exports){
'use strict';

module.exports = '<svg fill="white" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 512 512" xml:space="preserve">' + '<path d="M213.7,256L213.7,256L213.7,256L380.9,81.9c4.2-4.3,4.1-11.4-0.2-15.8l-29.9-30.6c-4.3-4.4-11.3-4.5-15.5-0.2L131.1,247.9 c-2.2,2.2-3.2,5.2-3,8.1c-0.1,3,0.9,5.9,3,8.1l204.2,212.7c4.2,4.3,11.2,4.2,15.5-0.2l29.9-30.6c4.3-4.4,4.4-11.5,0.2-15.8 L213.7,256z"/>' + '</svg>';

},{}],5:[function(require,module,exports){
'use strict';

module.exports = '<svg fill="white" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 512 512" xml:space="preserve">' + '<path d="M298.3,256L298.3,256L298.3,256L131.1,81.9c-4.2-4.3-4.1-11.4,0.2-15.8l29.9-30.6c4.3-4.4,11.3-4.5,15.5-0.2l204.2,212.7 c2.2,2.2,3.2,5.2,3,8.1c0.1,3-0.9,5.9-3,8.1L176.7,476.8c-4.2,4.3-11.2,4.2-15.5-0.2L131.3,446c-4.3-4.4-4.4-11.5-0.2-15.8 L298.3,256z"/>' + '</svg>';

},{}],6:[function(require,module,exports){
'use strict';

module.exports = '<svg fill="white" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">' + '<path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4 L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1 c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1 c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z"/>' + '</svg>';

},{}],7:[function(require,module,exports){
'use strict';

module.exports = {
	arrowLeft: require('./arrowLeft'),
	arrowRight: require('./arrowRight'),
	close: require('./close')
};

},{"./arrowLeft":4,"./arrowRight":5,"./close":6}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var CLOSE_SIZE = 20;
var ARROW_HEIGHT = 120;
var GAP_BOTTOM = 50;
var GAP_TOP = 40;

var styles = {
	// SCENE
	container: {
		backgroundColor: 'rgba(0,0,0,0.8)',
		boxSizing: 'border-box',
		height: '100%',
		left: 0,
		padding: '0 10px',
		position: 'fixed',
		textAlign: 'center',
		top: 0,
		width: '100%',
		zIndex: 2001
	},
	content: {
		display: 'inline-block',
		margin: '0 auto',
		maxWidth: '100%',
		position: 'relative',
		verticalAlign: 'middle'
	},
	contentHeightShim: {
		display: 'inline-block',
		height: '100%',
		lineHeight: 0,
		verticalAlign: 'middle'
	},

	// IMAGES
	image: {
		boxSizing: 'border-box',
		display: 'block',
		lineHeight: 0,
		maxWidth: '100%',
		margin: '0 auto',
		paddingBottom: 50,
		paddingTop: 40,
		height: 'auto',
		width: 'auto',

		// disable user select
		WebkitTouchCallout: 'none',
		userSelect: 'none'

	},
	figure: {
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center center',
		lineHeight: 1,
		minHeight: 200,
		minWidth: 300,
		margin: 0,
		textAlign: 'center'
	},
	figureShadow: {
		bottom: GAP_BOTTOM,
		boxShadow: '0 0 8px -2px rgba(0,0,0,.6)',
		display: 'block',
		height: 'auto',
		left: 0,
		position: 'absolute',
		right: 0,
		top: GAP_TOP,
		width: 'auto',
		zIndex: -1
	},
	footer: {
		color: 'white',
		lineHeight: 1.3,
		height: GAP_BOTTOM,
		marginTop: -GAP_BOTTOM,
		paddingTop: 5,
		position: 'absolute',
		textAlign: 'left',
		top: '100%',
		left: 0,
		width: '100%',
		cursor: 'auto'
	},
	footerCount: {
		float: 'right',
		fontSize: '.85em',
		opacity: 0.75
	},
	footerCaption: {
		paddingRight: 80
	},

	// BUTTONS
	arrow: {
		background: 'none',
		border: 'none',
		cursor: 'pointer',
		outline: 'none',
		marginTop: ARROW_HEIGHT / -2,
		maxWidth: 80,
		padding: 20,
		position: 'absolute',
		top: '50%',
		height: ARROW_HEIGHT,
		width: '16%',
		zIndex: 1001,

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
	closeBar: {
		height: GAP_TOP,
		left: 0,
		position: 'absolute',
		textAlign: 'right',
		top: 0,
		width: '100%'
	},
	closeButton: {
		background: 'none',
		border: 'none',
		cursor: 'pointer',
		height: CLOSE_SIZE + 20,
		outline: 'none',
		padding: 10,
		position: 'relative',
		right: -10,
		top: 0,
		verticalAlign: 'bottom',
		width: CLOSE_SIZE + 20
	}
};

exports['default'] = styles;
module.exports = exports['default'];

},{}],9:[function(require,module,exports){
/**
	Bind multiple component methods:

	* @param {this} context
	* @param {Array} functions

	constructor() {
		...
		bindFunctions.call(this, ['handleClick', 'handleOther']);
	}
*/

"use strict";

module.exports = function bindFunctions(functions) {
	var _this = this;

	functions.forEach(function (f) {
		return _this[f] = _this[f].bind(_this);
	});
};

},{}],10:[function(require,module,exports){
// Don't try and apply overflow/padding if the scroll is already blocked
'use strict';

var bodyBlocked = false;

var allowScroll = function allowScroll() {
	if (typeof window === 'undefined' || !bodyBlocked) return;

	//  FIXME iOS ignores overflow on body

	try {
		var target = document.body;

		target.style.paddingRight = '';
		target.style.overflowY = '';

		bodyBlocked = false;
	} catch (err) {
		console.error('Failed to find body element. Err:', err);
	}
};

var blockScroll = function blockScroll() {
	if (typeof window === 'undefined' || bodyBlocked) return;

	//  FIXME iOS ignores overflow on body

	try {
		var scrollBarWidth = window.innerWidth - document.body.clientWidth;

		var target = document.body;

		target.style.paddingRight = scrollBarWidth + 'px';
		target.style.overflowY = 'hidden';

		bodyBlocked = true;
	} catch (err) {
		console.error('Failed to find body element. Err:', err);
	}
};

module.exports = {
	allowScroll: allowScroll,
	blockScroll: blockScroll
};

},{}],11:[function(require,module,exports){
// Return true if window + document

'use strict';

module.exports = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

},{}],12:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _bindFunctions = require('./bindFunctions');

var _bindFunctions2 = _interopRequireDefault(_bindFunctions);

var _bodyScroll = require('./bodyScroll');

var _bodyScroll2 = _interopRequireDefault(_bodyScroll);

var _canUseDom = require('./canUseDom');

var _canUseDom2 = _interopRequireDefault(_canUseDom);

module.exports = {
	bindFunctions: _bindFunctions2['default'],
	bodyScroll: _bodyScroll2['default'],
	canUseDom: _canUseDom2['default']
};

},{"./bindFunctions":9,"./bodyScroll":10,"./canUseDom":11}],"react-images":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _jss = require('jss');

var _reactJss = require('react-jss');

var _reactJss2 = _interopRequireDefault(_reactJss);

var _jssCamelCase = require('jss-camel-case');

var _jssCamelCase2 = _interopRequireDefault(_jssCamelCase);

var _jssPx = require('jss-px');

var _jssPx2 = _interopRequireDefault(_jssPx);

var _jssNested = require('jss-nested');

var _jssNested2 = _interopRequireDefault(_jssNested);

var _jssVendorPrefixer = require('jss-vendor-prefixer');

var _jssVendorPrefixer2 = _interopRequireDefault(_jssVendorPrefixer);

var _reactSwipeable = require('react-swipeable');

var _reactSwipeable2 = _interopRequireDefault(_reactSwipeable);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _Fade = require('./Fade');

var _Fade2 = _interopRequireDefault(_Fade);

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _Portal = require('./Portal');

var _Portal2 = _interopRequireDefault(_Portal);

var _stylesDefault = require('./styles/default');

var _stylesDefault2 = _interopRequireDefault(_stylesDefault);

var jss = (0, _jss.create)();
exports.jss = jss;
var useSheet = (0, _reactJss2['default'])(jss);
exports.useSheet = useSheet;
jss.use((0, _jssCamelCase2['default'])());
jss.use((0, _jssNested2['default'])());
jss.use((0, _jssPx2['default'])());
jss.use((0, _jssVendorPrefixer2['default'])());

var Lightbox = (function (_Component) {
	_inherits(Lightbox, _Component);

	_createClass(Lightbox, null, [{
		key: 'theme',
		value: function theme(themeStyles) {
			var extStyles = _extends({}, _stylesDefault2['default']);
			for (var key in extStyles) {
				if (key in themeStyles) {
					extStyles[key] = _extends({}, _stylesDefault2['default'][key], themeStyles[key]);
				}
			}
			return extStyles;
		}
	}]);

	function Lightbox() {
		_classCallCheck(this, Lightbox);

		_get(Object.getPrototypeOf(Lightbox.prototype), 'constructor', this).call(this);

		_utils2['default'].bindFunctions.call(this, ['close', 'gotoNext', 'gotoPrev', 'handleImageClick', 'handleKeyboardInput', 'handleResize']);

		this.state = { windowHeight: 0 };
	}

	_createClass(Lightbox, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (!_utils2['default'].canUseDom) return;

			if (nextProps.isOpen && nextProps.enableKeyboardInput) {
				window.addEventListener('keydown', this.handleKeyboardInput);
				window.addEventListener('resize', this.handleResize);
				this.handleResize();
			} else {
				window.removeEventListener('keydown', this.handleKeyboardInput);
				window.removeEventListener('resize', this.handleResize);
			}

			if (nextProps.isOpen) {
				_utils2['default'].bodyScroll.blockScroll();
			} else {
				_utils2['default'].bodyScroll.allowScroll();
			}
		}

		// ==============================
		// METHODS
		// ==============================

	}, {
		key: 'close',
		value: function close(e) {
			if (e.target.id !== 'react-images-container') return;

			if (this.props.backdropClosesModal && this.props.onClose) {
				this.props.onClose();
			}
		}
	}, {
		key: 'gotoNext',
		value: function gotoNext(event) {
			if (this.props.currentImage === this.props.images.length - 1) return;
			if (event) {
				event.preventDefault();
				event.stopPropagation();
			}
			this.props.onClickNext();
		}
	}, {
		key: 'gotoPrev',
		value: function gotoPrev(event) {
			if (this.props.currentImage === 0) return;
			if (event) {
				event.preventDefault();
				event.stopPropagation();
			}
			this.props.onClickPrev();
		}
	}, {
		key: 'handleImageClick',
		value: function handleImageClick() {
			if (!this.props.onClickImage) return;

			this.props.onClickImage();
		}
	}, {
		key: 'handleKeyboardInput',
		value: function handleKeyboardInput(event) {
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
	}, {
		key: 'handleResize',
		value: function handleResize() {
			this.setState({
				windowHeight: window.innerHeight || 0
			});
		}

		// ==============================
		// RENDERERS
		// ==============================

	}, {
		key: 'renderArrowPrev',
		value: function renderArrowPrev() {
			if (this.props.currentImage === 0) return null;
			var classes = this.props.sheet.classes;

			return _react2['default'].createElement(
				'button',
				{ title: 'Previous (Left arrow key)',
					type: 'button',
					className: classes.arrow + ' ' + classes.arrowPrev,
					onClick: this.gotoPrev,
					onTouchEnd: this.gotoPrev
				},
				_react2['default'].createElement(_Icon2['default'], { type: 'arrowLeft' })
			);
		}
	}, {
		key: 'renderArrowNext',
		value: function renderArrowNext() {
			if (this.props.currentImage === this.props.images.length - 1) return null;
			var classes = this.props.sheet.classes;

			return _react2['default'].createElement(
				'button',
				{ title: 'Next (Right arrow key)',
					type: 'button',
					className: classes.arrow + ' ' + classes.arrowNext,
					onClick: this.gotoNext,
					onTouchEnd: this.gotoNext
				},
				_react2['default'].createElement(_Icon2['default'], { type: 'arrowRight' })
			);
		}
	}, {
		key: 'renderCloseBar',
		value: function renderCloseBar() {
			var classes = this.props.sheet.classes;

			return _react2['default'].createElement(
				'div',
				{ className: classes.closeBar },
				this.renderCustomControls(),
				this.renderCloseButton()
			);
		}
	}, {
		key: 'renderCloseButton',
		value: function renderCloseButton() {
			if (!this.props.showCloseButton) return null;
			var classes = this.props.sheet.classes;

			return _react2['default'].createElement(
				'button',
				{
					title: 'Close (Esc)',
					className: classes.closeButton,
					onClick: this.props.onClose
				},
				_react2['default'].createElement(_Icon2['default'], { type: 'close' })
			);
		}
	}, {
		key: 'renderCustomControls',
		value: function renderCustomControls() {
			if (!this.props.customControls) return null;
			return this.props.customControls;
		}
	}, {
		key: 'renderDialog',
		value: function renderDialog() {
			if (!this.props.isOpen) return null;
			var classes = this.props.sheet.classes;

			return _react2['default'].createElement(
				_Fade2['default'],
				{ id: 'react-images-container',
					key: 'dialog',
					duration: 250,
					className: classes.container,
					onClick: this.close,
					onTouchEnd: this.close
				},
				_react2['default'].createElement('span', { className: classes.contentHeightShim }),
				_react2['default'].createElement(
					'div',
					{ className: classes.content },
					this.renderCloseBar(),
					this.renderImages()
				),
				this.renderArrowPrev(),
				this.renderArrowNext()
			);
		}
	}, {
		key: 'renderFooter',
		value: function renderFooter(caption) {
			var _props = this.props;
			var currentImage = _props.currentImage;
			var images = _props.images;
			var imageCountSeparator = _props.imageCountSeparator;
			var showImageCount = _props.showImageCount;
			var classes = this.props.sheet.classes;

			if (!caption && !showImageCount) return null;

			var imageCount = showImageCount ? _react2['default'].createElement(
				'div',
				{ className: classes.footerCount },
				currentImage + 1,
				imageCountSeparator,
				images.length
			) : null;
			var figcaption = caption ? _react2['default'].createElement(
				'figcaption',
				{ className: classes.footerCaption },
				caption
			) : null;

			return _react2['default'].createElement(
				'div',
				{ className: classes.footer },
				imageCount,
				figcaption
			);
		}
	}, {
		key: 'renderImages',
		value: function renderImages() {
			var _props2 = this.props;
			var images = _props2.images;
			var currentImage = _props2.currentImage;
			var classes = this.props.sheet.classes;
			var windowHeight = this.state.windowHeight;

			if (!images || !images.length) return null;

			var image = images[currentImage];

			var srcset = undefined;
			var sizes = undefined;

			if (image.srcset) {
				srcset = image.srcset.join();
				sizes = '100vw';
			}

			return _react2['default'].createElement(
				'figure',
				{ key: 'image ' + currentImage,
					className: classes.figure,
					style: { maxWidth: this.props.width }
				},
				_react2['default'].createElement('img', { className: classes.image,
					onClick: this.handleImageClick,
					sizes: sizes,
					src: image.src,
					srcSet: srcset,
					style: {
						cursor: this.props.onClickImage ? 'pointer' : 'auto',
						maxHeight: windowHeight
					}
				}),
				this.renderFooter(images[currentImage].caption)
			);
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2['default'].createElement(
				_Portal2['default'],
				null,
				this.renderDialog()
			);
		}
	}]);

	return Lightbox;
})(_react.Component);

Lightbox.displayName = 'Lightbox';

Lightbox.propTypes = {
	backdropClosesModal: _react.PropTypes.bool,
	currentImage: _react.PropTypes.number,
	customControls: _react.PropTypes.arrayOf(_react.PropTypes.node),
	enableKeyboardInput: _react.PropTypes.bool,
	imageCountSeparator: _react.PropTypes.string,
	images: _react.PropTypes.arrayOf(_react.PropTypes.shape({
		src: _react.PropTypes.string.isRequired,
		srcset: _react.PropTypes.array,
		caption: _react.PropTypes.string
	})).isRequired,
	isOpen: _react.PropTypes.bool,
	onClickImage: _react.PropTypes.func,
	onClickNext: _react.PropTypes.func,
	onClickPrev: _react.PropTypes.func,
	onClose: _react.PropTypes.func.isRequired,
	sheet: _react.PropTypes.object,
	showCloseButton: _react.PropTypes.bool,
	showImageCount: _react.PropTypes.bool,
	width: _react.PropTypes.number
};

Lightbox.defaultProps = {
	currentImage: 0,
	enableKeyboardInput: true,
	imageCountSeparator: ' of ',
	onClickShowNextImage: true,
	showCloseButton: true,
	showImageCount: true,
	width: 900
};

exports['default'] = useSheet(Lightbox, _stylesDefault2['default']);
/*
Re-implement when react warning "unknown props"
https://fb.me/react-unknown-prop is resolved
<Swipeable onSwipedLeft={this.gotoNext} onSwipedRight={this.gotoPrev} />
*/

},{"./Fade":1,"./Icon":2,"./Portal":3,"./styles/default":8,"./utils":12,"jss":undefined,"jss-camel-case":undefined,"jss-nested":undefined,"jss-px":undefined,"jss-vendor-prefixer":undefined,"react":undefined,"react-jss":undefined,"react-swipeable":undefined}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvam9zcy9EZXZlbG9wbWVudC9wYWNrYWdlcy9yZWFjdC9pbWFnZXMvc3JjL0ZhZGUuanMiLCIvVXNlcnMvam9zcy9EZXZlbG9wbWVudC9wYWNrYWdlcy9yZWFjdC9pbWFnZXMvc3JjL0ljb24uanMiLCIvVXNlcnMvam9zcy9EZXZlbG9wbWVudC9wYWNrYWdlcy9yZWFjdC9pbWFnZXMvc3JjL1BvcnRhbC5qcyIsIi9Vc2Vycy9qb3NzL0RldmVsb3BtZW50L3BhY2thZ2VzL3JlYWN0L2ltYWdlcy9zcmMvaWNvbnMvYXJyb3dMZWZ0LmpzIiwiL1VzZXJzL2pvc3MvRGV2ZWxvcG1lbnQvcGFja2FnZXMvcmVhY3QvaW1hZ2VzL3NyYy9pY29ucy9hcnJvd1JpZ2h0LmpzIiwiL1VzZXJzL2pvc3MvRGV2ZWxvcG1lbnQvcGFja2FnZXMvcmVhY3QvaW1hZ2VzL3NyYy9pY29ucy9jbG9zZS5qcyIsIi9Vc2Vycy9qb3NzL0RldmVsb3BtZW50L3BhY2thZ2VzL3JlYWN0L2ltYWdlcy9zcmMvaWNvbnMvaW5kZXguanMiLCIvVXNlcnMvam9zcy9EZXZlbG9wbWVudC9wYWNrYWdlcy9yZWFjdC9pbWFnZXMvc3JjL3N0eWxlcy9kZWZhdWx0LmpzIiwiL1VzZXJzL2pvc3MvRGV2ZWxvcG1lbnQvcGFja2FnZXMvcmVhY3QvaW1hZ2VzL3NyYy91dGlscy9iaW5kRnVuY3Rpb25zLmpzIiwiL1VzZXJzL2pvc3MvRGV2ZWxvcG1lbnQvcGFja2FnZXMvcmVhY3QvaW1hZ2VzL3NyYy91dGlscy9ib2R5U2Nyb2xsLmpzIiwiL1VzZXJzL2pvc3MvRGV2ZWxvcG1lbnQvcGFja2FnZXMvcmVhY3QvaW1hZ2VzL3NyYy91dGlscy9jYW5Vc2VEb20uanMiLCIvVXNlcnMvam9zcy9EZXZlbG9wbWVudC9wYWNrYWdlcy9yZWFjdC9pbWFnZXMvc3JjL3V0aWxzL2luZGV4LmpzIiwiL1VzZXJzL2pvc3MvRGV2ZWxvcG1l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QixFQUFFLGlCQUFVLElBQUk7QUFDbkMsb0JBQW1CLEVBQUUsaUJBQVUsTUFBTTtBQUNyQyxPQUFNLEVBQUUsaUJBQVUsT0FBTyxDQUN4QixpQkFBVSxLQUFLLENBQUM7QUFDZixLQUFHLEVBQUUsaUJBQVUsTUFBTSxDQUFDLFVBQVU7QUFDaEMsUUFBTSxFQUFFLGlCQUFVLEtBQUs7QUFDdkIsU0FBTyxFQUFFLGlCQUFVLE1BQU07RUFDekIsQ0FBQyxDQUNGLENBQUMsVUFBVTtBQUNaLE9BQU0sRUFBRSxpQkFBVSxJQUFJO0FBQ3RCLGFBQVksRUFBRSxpQkFBVSxJQUFJO0FBQzVCLFlBQVcsRUFBRSxpQkFBVSxJQUFJO0FBQzNCLFlBQVcsRUFBRSxpQkFBVSxJQUFJO0FBQzNCLFFBQU8sRUFBRSxpQkFBVSxJQUFJLENBQUMsVUFBVTtBQUNsQyxNQUFLLEVBQUUsaUJBQVUsTUFBTTtBQUN2QixnQkFBZSxFQUFFLGlCQUFVLElBQUk7QUFDL0IsZUFBYyxFQUFFLGlCQUFVLElBQUk7QUFDOUIsTUFBSyxFQUFFLGlCQUFVLE1BQU07Q0FDdkIsQ0FBQzs7QUFFRixRQUFRLENBQUMsWUFBWSxHQUFHO0FBQ3ZCLGFBQVksRUFBRSxDQUFDO0FBQ2Ysb0JBQW1CLEVBQUUsSUFBSTtBQUN6QixvQkFBbUIsRUFBRSxNQUFNO0FBQzNCLHFCQUFvQixFQUFFLElBQUk7QUFDMUIsZ0JBQWUsRUFBRSxJQUFJO0FBQ3JCLGVBQWMsRUFBRSxJQUFJO0FBQ3BCLE1BQUssRUFBRSxHQUFHO0NBQ1YsQ0FBQzs7cUJBRWEsUUFBUSxDQUFDLFFBQVEsNkJBQWdCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcblxuY2xhc3MgRmFkZSBleHRlbmRzIENvbXBvbmVudCB7XG5cdGNvbnN0cnVjdG9yICgpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMuX3Nob3dFbGVtZW50ID0gdGhpcy5fc2hvd0VsZW1lbnQuYmluZCh0aGlzKTtcblx0XHR0aGlzLl9oaWRlRWxlbWVudCA9IHRoaXMuX2hpZGVFbGVtZW50LmJpbmQodGhpcyk7XG5cdH1cblx0Y29tcG9uZW50V2lsbEFwcGVhciAoY2FsbGJhY2spIHtcblx0XHRzZXRUaW1lb3V0KGNhbGxiYWNrLCAxKTsgLy8gbmVlZCBhdCBsZWFzdCBvbmUgdGljayB0byBmaXJlIHRyYW5zaXRpb25cblx0fVxuXHRjb21wb25lbnREaWRBcHBlYXIgKCkge1xuXHRcdHRoaXMuX3Nob3dFbGVtZW50KCk7XG5cdH1cblx0Y29tcG9uZW50V2lsbEVudGVyIChjYWxsYmFjaykge1xuXHRcdHNldFRpbWVvdXQoY2FsbGJhY2ssIDEpO1xuXHR9XG5cdGNvbXBvbmVudERpZEVudGVyICgpIHtcblx0XHR0aGlzLl9zaG93RWxlbWVudCgpO1xuXHR9XG5cdGNvbXBvbmVudFdpbGxMZWF2ZSAoY2FsbGJhY2spIHtcblx0XHR0aGlzLl9oaWRlRWxlbWVudCgpO1xuXHRcdHNldFRpbWVvdXQoY2FsbGJhY2ssIHRoaXMucHJvcHMuZHVyYXRpb24pO1xuXHR9XG5cdGNvbXBvbmVudERpZExlYXZlICgpIHtcblx0XHQvLyBlbXB0eVxuXHR9XG5cblx0X3Nob3dFbGVtZW50ICgpIHtcblx0XHRjb25zdCBlbCA9IHRoaXMucmVmcy5lbGVtZW50O1xuXHRcdGVsLnN0eWxlLm9wYWNpdHkgPSAxO1xuXHR9XG5cdF9oaWRlRWxlbWVudCAoKSB7XG5cdFx0Y29uc3QgZWwgPSB0aGlzLnJlZnMuZWxlbWVudDtcblx0XHRlbC5zdHlsZS5vcGFjaXR5ID0gMDtcblx0fVxuXG5cdHJlbmRlciAoKSB7XG5cdFx0Y29uc3QgeyBjb21wb25lbnQsIGR1cmF0aW9uLCBzdHlsZSwgLi4ucHJvcHMgfSA9IHRoaXMucHJvcHM7XG5cdFx0Y29uc3QgY29tcG9uZW50UHJvcHMgPSB7XG5cdFx0XHQuLi5wcm9wcyxcblx0XHRcdHN0eWxlOiB7XG5cdFx0XHRcdG9wYWNpdHk6IDAsXG5cdFx0XHRcdFdlYmtpdFRyYW5zaXRpb246IGBvcGFjaXR5ICR7ZHVyYXRpb259bXMgZWFzZS1vdXRgLFxuXHRcdFx0XHRtc1RyYW5zaXRpb246IGBvcGFjaXR5ICR7ZHVyYXRpb259bXMgZWFzZS1vdXRgLFxuXHRcdFx0XHR0cmFuc2l0aW9uOiBgb3BhY2l0eSAke2R1cmF0aW9ufW1zIGVhc2Utb3V0YCxcblx0XHRcdFx0Li4uc3R5bGUsXG5cdFx0XHR9LFxuXHRcdH07XG5cdFx0cmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoY29tcG9uZW50LCBjb21wb25lbnRQcm9wcyk7XG5cdH1cbn1cblxuRmFkZS5wcm9wVHlwZXMgPSB7XG5cdGNoaWxkcmVuOiBQcm9wVHlwZXMuYW55LFxuXHRjb21wb25lbnQ6IFByb3BUeXBlcy5hbnksXG5cdGR1cmF0aW9uOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRzdHlsZTogUHJvcFR5cGVzLm9iamVjdCxcbn07XG5cbkZhZGUuZGVmYXVsdFByb3BzID0ge1xuXHRjb21wb25lbnQ6ICdkaXYnLFxuXHRkdXJhdGlvbjogMjAwLFxuXHRyZWY6ICdlbGVtZW50Jyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEZhZGU7XG4iLCJpbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGljb25zIGZyb20gJy4vaWNvbnMnO1xuXG5jb25zdCBJY29uID0gKHByb3BzKSA9PiAoXG5cdDxzcGFuXG5cdFx0ZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3sgX19odG1sOiBpY29uc1twcm9wcy50eXBlXSB9fVxuXHRcdHsuLi5wcm9wc31cblx0Lz5cbik7XG5cbkljb24ucHJvcFR5cGVzID0ge1xuXHR0eXBlOiBQcm9wVHlwZXMub25lT2YoT2JqZWN0LmtleXMoaWNvbnMpKSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEljb247XG4iLCJpbXBvcnQgUmVhY3QsIHsgQ2hpbGRyZW4sIENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFRyYW5zaXRpb24gZnJvbSAncmVhY3QtYWRkb25zLXRyYW5zaXRpb24tZ3JvdXAnO1xuaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSAncmVhY3QtZG9tJztcblxuY29uc3QgRmlyc3RDaGlsZCA9ICh7IGNoaWxkcmVuIH0pID0+IHtcblx0bGV0IGtpZHMgPSBDaGlsZHJlbi50b0FycmF5KGNoaWxkcmVuKTtcblx0cmV0dXJuIGtpZHNbMF0gfHwgbnVsbDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcnRhbCBleHRlbmRzIENvbXBvbmVudCB7XG5cdGNvbnN0cnVjdG9yICgpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMucG9ydGFsRWxlbWVudCA9IG51bGw7XG5cdH1cblx0Y29tcG9uZW50RGlkTW91bnQgKCkge1xuXHRcdGNvbnN0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHApO1xuXHRcdHRoaXMucG9ydGFsRWxlbWVudCA9IHA7XG5cdFx0dGhpcy5jb21wb25lbnREaWRVcGRhdGUoKTtcblx0fVxuXHRjb21wb25lbnREaWRVcGRhdGUgKCkge1xuXHRcdHJlbmRlcihcblx0XHRcdDxUcmFuc2l0aW9uIHsuLi50aGlzLnByb3BzfSBjb21wb25lbnQ9e0ZpcnN0Q2hpbGR9IC8+LFxuXHRcdFx0XHR0aGlzLnBvcnRhbEVsZW1lbnRcblx0XHQpO1xuXHR9XG5cdGNvbXBvbmVudFdpbGxVbm1vdW50ICgpIHtcblx0XHRkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMucG9ydGFsRWxlbWVudCk7XG5cdH1cblx0cmVuZGVyICgpIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxufVxuXG5Qb3J0YWwucHJvcFR5cGVzID0ge1xuXHRjaGlsZHJlbjogUHJvcFR5cGVzLmVsZW1lbnQsXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSAoXG5cdCc8c3ZnIGZpbGw9XCJ3aGl0ZVwiIHZlcnNpb249XCIxLjFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgeD1cIjBweFwiIHk9XCIwcHhcIiB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCIgeG1sOnNwYWNlPVwicHJlc2VydmVcIj4nXG5cdFx0KyAnPHBhdGggZD1cIk0yMTMuNywyNTZMMjEzLjcsMjU2TDIxMy43LDI1NkwzODAuOSw4MS45YzQuMi00LjMsNC4xLTExLjQtMC4yLTE1LjhsLTI5LjktMzAuNmMtNC4zLTQuNC0xMS4zLTQuNS0xNS41LTAuMkwxMzEuMSwyNDcuOSBjLTIuMiwyLjItMy4yLDUuMi0zLDguMWMtMC4xLDMsMC45LDUuOSwzLDguMWwyMDQuMiwyMTIuN2M0LjIsNC4zLDExLjIsNC4yLDE1LjUtMC4ybDI5LjktMzAuNmM0LjMtNC40LDQuNC0xMS41LDAuMi0xNS44IEwyMTMuNywyNTZ6XCIvPidcblx0KyAnPC9zdmc+J1xuKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gKFxuXHQnPHN2ZyBmaWxsPVwid2hpdGVcIiB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHg9XCIwcHhcIiB5PVwiMHB4XCIgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+J1xuXHRcdCsgJzxwYXRoIGQ9XCJNMjk4LjMsMjU2TDI5OC4zLDI1NkwyOTguMywyNTZMMTMxLjEsODEuOWMtNC4yLTQuMy00LjEtMTEuNCwwLjItMTUuOGwyOS45LTMwLjZjNC4zLTQuNCwxMS4zLTQuNSwxNS41LTAuMmwyMDQuMiwyMTIuNyBjMi4yLDIuMiwzLjIsNS4yLDMsOC4xYzAuMSwzLTAuOSw1LjktMyw4LjFMMTc2LjcsNDc2LjhjLTQuMiw0LjMtMTEuMiw0LjItMTUuNS0wLjJMMTMxLjMsNDQ2Yy00LjMtNC40LTQuNC0xMS41LTAuMi0xNS44IEwyOTguMywyNTZ6XCIvPidcblx0KyAnPC9zdmc+J1xuKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gKFxuXHQnPHN2ZyBmaWxsPVwid2hpdGVcIiB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHg9XCIwcHhcIiB5PVwiMHB4XCIgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiIHN0eWxlPVwiZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyO1wiIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+J1xuXHRcdCsgJzxwYXRoIGQ9XCJNNDQzLjYsMzg3LjFMMzEyLjQsMjU1LjRsMTMxLjUtMTMwYzUuNC01LjQsNS40LTE0LjIsMC0xOS42bC0zNy40LTM3LjZjLTIuNi0yLjYtNi4xLTQtOS44LTRjLTMuNywwLTcuMiwxLjUtOS44LDQgTDI1NiwxOTcuOEwxMjQuOSw2OC4zYy0yLjYtMi42LTYuMS00LTkuOC00Yy0zLjcsMC03LjIsMS41LTkuOCw0TDY4LDEwNS45Yy01LjQsNS40LTUuNCwxNC4yLDAsMTkuNmwxMzEuNSwxMzBMNjguNCwzODcuMSBjLTIuNiwyLjYtNC4xLDYuMS00LjEsOS44YzAsMy43LDEuNCw3LjIsNC4xLDkuOGwzNy40LDM3LjZjMi43LDIuNyw2LjIsNC4xLDkuOCw0LjFjMy41LDAsNy4xLTEuMyw5LjgtNC4xTDI1NiwzMTMuMWwxMzAuNywxMzEuMSBjMi43LDIuNyw2LjIsNC4xLDkuOCw0LjFjMy41LDAsNy4xLTEuMyw5LjgtNC4xbDM3LjQtMzcuNmMyLjYtMi42LDQuMS02LjEsNC4xLTkuOEM0NDcuNywzOTMuMiw0NDYuMiwzODkuNyw0NDMuNiwzODcuMXpcIi8+J1xuXHQrICc8L3N2Zz4nXG4pO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG5cdGFycm93TGVmdDogcmVxdWlyZSgnLi9hcnJvd0xlZnQnKSxcblx0YXJyb3dSaWdodDogcmVxdWlyZSgnLi9hcnJvd1JpZ2h0JyksXG5cdGNsb3NlOiByZXF1aXJlKCcuL2Nsb3NlJyksXG59O1xuIiwiY29uc3QgQ0xPU0VfU0laRSA9IDIwO1xuY29uc3QgQVJST1dfSEVJR0hUID0gMTIwO1xuY29uc3QgR0FQX0JPVFRPTSA9IDUwO1xuY29uc3QgR0FQX1RPUCA9IDQwO1xuXG5jb25zdCBzdHlsZXMgPSB7XG5cdC8vIFNDRU5FXG5cdGNvbnRhaW5lcjoge1xuXHRcdGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwwLDAsMC44KScsXG5cdFx0Ym94U2l6aW5nOiAnYm9yZGVyLWJveCcsXG5cdFx0aGVpZ2h0OiAnMTAwJScsXG5cdFx0bGVmdDogMCxcblx0XHRwYWRkaW5nOiAnMCAxMHB4Jyxcblx0XHRwb3NpdGlvbjogJ2ZpeGVkJyxcblx0XHR0ZXh0QWxpZ246ICdjZW50ZXInLFxuXHRcdHRvcDogMCxcblx0XHR3aWR0aDogJzEwMCUnLFxuXHRcdHpJbmRleDogMjAwMSxcblx0fSxcblx0Y29udGVudDoge1xuXHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuXHRcdG1hcmdpbjogJzAgYXV0bycsXG5cdFx0bWF4V2lkdGg6ICcxMDAlJyxcblx0XHRwb3NpdGlvbjogJ3JlbGF0aXZlJyxcblx0XHR2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyxcblx0fSxcblx0Y29udGVudEhlaWdodFNoaW06IHtcblx0XHRkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcblx0XHRoZWlnaHQ6ICcxMDAlJyxcblx0XHRsaW5lSGVpZ2h0OiAwLFxuXHRcdHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxuXHR9LFxuXG5cdC8vIElNQUdFU1xuXHRpbWFnZToge1xuXHRcdGJveFNpemluZzogJ2JvcmRlci1ib3gnLFxuXHRcdGRpc3BsYXk6ICdibG9jaycsXG5cdFx0bGluZUhlaWdodDogMCxcblx0XHRtYXhXaWR0aDogJzEwMCUnLFxuXHRcdG1hcmdpbjogJzAgYXV0bycsXG5cdFx0cGFkZGluZ0JvdHRvbTogNTAsXG5cdFx0cGFkZGluZ1RvcDogNDAsXG5cdFx0aGVpZ2h0OiAnYXV0bycsXG5cdFx0d2lkdGg6ICdhdXRvJyxcblxuXHRcdC8vIGRpc2FibGUgdXNlciBzZWxlY3Rcblx0XHRXZWJraXRUb3VjaENhbGxvdXQ6ICdub25lJyxcblx0XHR1c2VyU2VsZWN0OiAnbm9uZScsXG5cblx0fSxcblx0ZmlndXJlOiB7XG5cdFx0YmFja2dyb3VuZFJlcGVhdDogJ25vLXJlcGVhdCcsXG5cdFx0YmFja2dyb3VuZFBvc2l0aW9uOiAnY2VudGVyIGNlbnRlcicsXG5cdFx0bGluZUhlaWdodDogMSxcblx0XHRtaW5IZWlnaHQ6IDIwMCxcblx0XHRtaW5XaWR0aDogMzAwLFxuXHRcdG1hcmdpbjogMCxcblx0XHR0ZXh0QWxpZ246ICdjZW50ZXInLFxuXHR9LFxuXHRmaWd1cmVTaGFkb3c6IHtcblx0XHRib3R0b206IEdBUF9CT1RUT00sXG5cdFx0Ym94U2hhZG93OiAnMCAwIDhweCAtMnB4IHJnYmEoMCwwLDAsLjYpJyxcblx0XHRkaXNwbGF5OiAnYmxvY2snLFxuXHRcdGhlaWdodDogJ2F1dG8nLFxuXHRcdGxlZnQ6IDAsXG5cdFx0cG9zaXRpb246ICdhYnNvbHV0ZScsXG5cdFx0cmlnaHQ6IDAsXG5cdFx0dG9wOiBHQVBfVE9QLFxuXHRcdHdpZHRoOiAnYXV0bycsXG5cdFx0ekluZGV4OiAtMSxcblx0fSxcblx0Zm9vdGVyOiB7XG5cdFx0Y29sb3I6ICd3aGl0ZScsXG5cdFx0bGluZUhlaWdodDogMS4zLFxuXHRcdGhlaWdodDogR0FQX0JPVFRPTSxcblx0XHRtYXJnaW5Ub3A6IC1HQVBfQk9UVE9NLFxuXHRcdHBhZGRpbmdUb3A6IDUsXG5cdFx0cG9zaXRpb246ICdhYnNvbHV0ZScsXG5cdFx0dGV4dEFsaWduOiAnbGVmdCcsXG5cdFx0dG9wOiAnMTAwJScsXG5cdFx0bGVmdDogMCxcblx0XHR3aWR0aDogJzEwMCUnLFxuXHRcdGN1cnNvcjogJ2F1dG8nLFxuXHR9LFxuXHRmb290ZXJDb3VudDoge1xuXHRcdGZsb2F0OiAncmlnaHQnLFxuXHRcdGZvbnRTaXplOiAnLjg1ZW0nLFxuXHRcdG9wYWNpdHk6IDAuNzUsXG5cdH0sXG5cdGZvb3RlckNhcHRpb246IHtcblx0XHRwYWRkaW5nUmlnaHQ6IDgwLFxuXHR9LFxuXG5cdC8vIEJVVFRPTlNcblx0YXJyb3c6IHtcblx0XHRiYWNrZ3JvdW5kOiAnbm9uZScsXG5cdFx0Ym9yZGVyOiAnbm9uZScsXG5cdFx0Y3Vyc29yOiAncG9pbnRlcicsXG5cdFx0b3V0bGluZTogJ25vbmUnLFxuXHRcdG1hcmdpblRvcDogQVJST1dfSEVJR0hUIC8gLTIsXG5cdFx0bWF4V2lkdGg6IDgwLFxuXHRcdHBhZGRpbmc6IDIwLFxuXHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuXHRcdHRvcDogJzUwJScsXG5cdFx0aGVpZ2h0OiBBUlJPV19IRUlHSFQsXG5cdFx0d2lkdGg6ICcxNiUnLFxuXHRcdHpJbmRleDogMTAwMSxcblxuXHRcdC8vIGRpc2FibGUgdXNlciBzZWxlY3Rcblx0XHRXZWJraXRUb3VjaENhbGxvdXQ6ICdub25lJyxcblx0XHRXZWJraXRVc2VyU2VsZWN0OiAnbm9uZScsXG5cdFx0TW96VXNlclNlbGVjdDogJ25vbmUnLFxuXHRcdG1zVXNlclNlbGVjdDogJ25vbmUnLFxuXHRcdHVzZXJTZWxlY3Q6ICdub25lJyxcblx0fSxcblx0YXJyb3dOZXh0OiB7XG5cdFx0cmlnaHQ6IDAsXG5cdH0sXG5cdGFycm93UHJldjoge1xuXHRcdGxlZnQ6IDAsXG5cdH0sXG5cdGNsb3NlQmFyOiB7XG5cdFx0aGVpZ2h0OiBHQVBfVE9QLFxuXHRcdGxlZnQ6IDAsXG5cdFx0cG9zaXRpb246ICdhYnNvbHV0ZScsXG5cdFx0dGV4dEFsaWduOiAncmlnaHQnLFxuXHRcdHRvcDogMCxcblx0XHR3aWR0aDogJzEwMCUnLFxuXHR9LFxuXHRjbG9zZUJ1dHRvbjoge1xuXHRcdGJhY2tncm91bmQ6ICdub25lJyxcblx0XHRib3JkZXI6ICdub25lJyxcblx0XHRjdXJzb3I6ICdwb2ludGVyJyxcblx0XHRoZWlnaHQ6IENMT1NFX1NJWkUgKyAyMCxcblx0XHRvdXRsaW5lOiAnbm9uZScsXG5cdFx0cGFkZGluZzogMTAsXG5cdFx0cG9zaXRpb246ICdyZWxhdGl2ZScsXG5cdFx0cmlnaHQ6IC0xMCxcblx0XHR0b3A6IDAsXG5cdFx0dmVydGljYWxBbGlnbjogJ2JvdHRvbScsXG5cdFx0d2lkdGg6IENMT1NFX1NJWkUgKyAyMCxcblx0fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHN0eWxlcztcbiIsIi8qKlxuXHRCaW5kIG11bHRpcGxlIGNvbXBvbmVudCBtZXRob2RzOlxuXG5cdCogQHBhcmFtIHt0aGlzfSBjb250ZXh0XG5cdCogQHBhcmFtIHtBcnJheX0gZnVuY3Rpb25zXG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0Li4uXG5cdFx0YmluZEZ1bmN0aW9ucy5jYWxsKHRoaXMsIFsnaGFuZGxlQ2xpY2snLCAnaGFuZGxlT3RoZXInXSk7XG5cdH1cbiovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYmluZEZ1bmN0aW9ucyAoZnVuY3Rpb25zKSB7XG5cdGZ1bmN0aW9ucy5mb3JFYWNoKGYgPT4gKHRoaXNbZl0gPSB0aGlzW2ZdLmJpbmQodGhpcykpKTtcbn07XG4iLCIvLyBEb24ndCB0cnkgYW5kIGFwcGx5IG92ZXJmbG93L3BhZGRpbmcgaWYgdGhlIHNjcm9sbCBpcyBhbHJlYWR5IGJsb2NrZWRcbmxldCBib2R5QmxvY2tlZCA9IGZhbHNlO1xuXG5jb25zdCBhbGxvd1Njcm9sbCA9IGZ1bmN0aW9uICgpIHtcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnIHx8ICFib2R5QmxvY2tlZCkgcmV0dXJuO1xuXG5cdC8vICBGSVhNRSBpT1MgaWdub3JlcyBvdmVyZmxvdyBvbiBib2R5XG5cblx0dHJ5IHtcblx0XHRjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5ib2R5O1xuXG5cdFx0dGFyZ2V0LnN0eWxlLnBhZGRpbmdSaWdodCA9ICcnO1xuXHRcdHRhcmdldC5zdHlsZS5vdmVyZmxvd1kgPSAnJztcblxuXHRcdGJvZHlCbG9ja2VkID0gZmFsc2U7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBmaW5kIGJvZHkgZWxlbWVudC4gRXJyOicsIGVycik7XG5cdH1cbn07XG5cbmNvbnN0IGJsb2NrU2Nyb2xsID0gZnVuY3Rpb24gKCkge1xuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgfHwgYm9keUJsb2NrZWQpIHJldHVybjtcblxuXHQvLyAgRklYTUUgaU9TIGlnbm9yZXMgb3ZlcmZsb3cgb24gYm9keVxuXG5cdHRyeSB7XG5cdFx0Y29uc3Qgc2Nyb2xsQmFyV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCAtIGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGg7XG5cblx0XHRjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5ib2R5O1xuXG5cdFx0dGFyZ2V0LnN0eWxlLnBhZGRpbmdSaWdodCA9IHNjcm9sbEJhcldpZHRoICsgJ3B4Jztcblx0XHR0YXJnZXQuc3R5bGUub3ZlcmZsb3dZID0gJ2hpZGRlbic7XG5cblx0XHRib2R5QmxvY2tlZCA9IHRydWU7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBmaW5kIGJvZHkgZWxlbWVudC4gRXJyOicsIGVycik7XG5cdH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRhbGxvd1Njcm9sbCxcblx0YmxvY2tTY3JvbGwsXG59O1xuIiwiLy8gUmV0dXJuIHRydWUgaWYgd2luZG93ICsgZG9jdW1lbnRcblxubW9kdWxlLmV4cG9ydHMgPSAhIShcblx0dHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcblx0JiYgd2luZG93LmRvY3VtZW50XG5cdCYmIHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50XG4pO1xuIiwiaW1wb3J0IGJpbmRGdW5jdGlvbnMgZnJvbSAnLi9iaW5kRnVuY3Rpb25zJztcbmltcG9ydCBib2R5U2Nyb2xsIGZyb20gJy4vYm9keVNjcm9sbCc7XG5pbXBvcnQgY2FuVXNlRG9tIGZyb20gJy4vY2FuVXNlRG9tJztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdGJpbmRGdW5jdGlvbnMsXG5cdGJvZHlTY3JvbGwsXG5cdGNhblVzZURvbSxcbn07XG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjcmVhdGUgfSBmcm9tICdqc3MnO1xuaW1wb3J0IHJlYWN0SnNzIGZyb20gJ3JlYWN0LWpzcyc7XG5pbXBvcnQgY2FtZWxDYXNlIGZyb20gJ2pzcy1jYW1lbC1jYXNlJztcbmltcG9ydCBweCBmcm9tICdqc3MtcHgnO1xuaW1wb3J0IG5lc3RlZCBmcm9tICdqc3MtbmVzdGVkJztcbmltcG9ydCB2ZW5kb3JQcmVmaXhlciBmcm9tICdqc3MtdmVuZG9yLXByZWZpeGVyJztcbmltcG9ydCBTd2lwZWFibGUgZnJvbSAncmVhY3Qtc3dpcGVhYmxlJztcblxuZXhwb3J0IGxldCBqc3MgPSBjcmVhdGUoKTtcbmV4cG9ydCBsZXQgdXNlU2hlZXQgPSByZWFjdEpzcyhqc3MpO1xuanNzLnVzZShjYW1lbENhc2UoKSk7XG5qc3MudXNlKG5lc3RlZCgpKTtcbmpzcy51c2UocHgoKSk7XG5qc3MudXNlKHZlbmRvclByZWZpeGVyKCkpO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgRmFkZSBmcm9tICcuL0ZhZGUnO1xuaW1wb3J0IEljb24gZnJvbSAnLi9JY29uJztcbmltcG9ydCBQb3J0YWwgZnJvbSAnLi9Qb3J0YWwnO1xuXG5pbXBvcnQgZGVmYXVsdFN0eWxlcyBmcm9tICcuL3N0eWxlcy9kZWZhdWx0JztcblxuY2xhc3MgTGlnaHRib3ggZXh0ZW5kcyBDb21wb25lbnQge1xuXHRzdGF0aWMgdGhlbWUgKHRoZW1lU3R5bGVzKSB7XG5cdFx0Y29uc3QgZXh0U3R5bGVzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdFN0eWxlcyk7XG5cdFx0Zm9yIChjb25zdCBrZXkgaW4gZXh0U3R5bGVzKSB7XG5cdFx0XHRpZiAoa2V5IGluIHRoZW1lU3R5bGVzKSB7XG5cdFx0XHRcdGV4dFN0eWxlc1trZXldID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdFN0eWxlc1trZXldLCB0aGVtZVN0eWxlc1trZXldKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGV4dFN0eWxlcztcblx0fVxuXHRjb25zdHJ1Y3RvciAoKSB7XG5cdFx0c3VwZXIoKTtcblxuXHRcdHV0aWxzLmJpbmRGdW5jdGlvbnMuY2FsbCh0aGlzLCBbXG5cdFx0XHQnY2xvc2UnLFxuXHRcdFx0J2dvdG9OZXh0Jyxcblx0XHRcdCdnb3RvUHJldicsXG5cdFx0XHQnaGFuZGxlSW1hZ2VDbGljaycsXG5cdFx0XHQnaGFuZGxlS2V5Ym9hcmRJbnB1dCcsXG5cdFx0XHQnaGFuZGxlUmVzaXplJyxcblx0XHRdKTtcblxuXHRcdHRoaXMuc3RhdGUgPSB7IHdpbmRvd0hlaWdodDogMCB9O1xuXHR9XG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgKG5leHRQcm9wcykge1xuXHRcdGlmICghdXRpbHMuY2FuVXNlRG9tKSByZXR1cm47XG5cblx0XHRpZiAobmV4dFByb3BzLmlzT3BlbiAmJiBuZXh0UHJvcHMuZW5hYmxlS2V5Ym9hcmRJbnB1dCkge1xuXHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmhhbmRsZUtleWJvYXJkSW5wdXQpO1xuXHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuaGFuZGxlUmVzaXplKTtcblx0XHRcdHRoaXMuaGFuZGxlUmVzaXplKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5oYW5kbGVLZXlib2FyZElucHV0KTtcblx0XHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmhhbmRsZVJlc2l6ZSk7XG5cdFx0fVxuXG5cdFx0aWYgKG5leHRQcm9wcy5pc09wZW4pIHtcblx0XHRcdHV0aWxzLmJvZHlTY3JvbGwuYmxvY2tTY3JvbGwoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dXRpbHMuYm9keVNjcm9sbC5hbGxvd1Njcm9sbCgpO1xuXHRcdH1cblx0fVxuXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHQvLyBNRVRIT0RTXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cdGNsb3NlIChlKSB7XG5cdFx0aWYgKGUudGFyZ2V0LmlkICE9PSAncmVhY3QtaW1hZ2VzLWNvbnRhaW5lcicpIHJldHVybjtcblxuXHRcdGlmICh0aGlzLnByb3BzLmJhY2tkcm9wQ2xvc2VzTW9kYWwgJiYgdGhpcy5wcm9wcy5vbkNsb3NlKSB7XG5cdFx0XHR0aGlzLnByb3BzLm9uQ2xvc2UoKTtcblx0XHR9XG5cblx0fVxuXHRnb3RvTmV4dCAoZXZlbnQpIHtcblx0XHRpZiAodGhpcy5wcm9wcy5jdXJyZW50SW1hZ2UgPT09ICh0aGlzLnByb3BzLmltYWdlcy5sZW5ndGggLSAxKSkgcmV0dXJuO1xuXHRcdGlmIChldmVudCkge1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdH1cblx0XHR0aGlzLnByb3BzLm9uQ2xpY2tOZXh0KCk7XG5cblx0fVxuXHRnb3RvUHJldiAoZXZlbnQpIHtcblx0XHRpZiAodGhpcy5wcm9wcy5jdXJyZW50SW1hZ2UgPT09IDApIHJldHVybjtcblx0XHRpZiAoZXZlbnQpIHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHR9XG5cdFx0dGhpcy5wcm9wcy5vbkNsaWNrUHJldigpO1xuXG5cdH1cblx0aGFuZGxlSW1hZ2VDbGljayAoKSB7XG5cdFx0aWYgKCF0aGlzLnByb3BzLm9uQ2xpY2tJbWFnZSkgcmV0dXJuO1xuXG5cdFx0dGhpcy5wcm9wcy5vbkNsaWNrSW1hZ2UoKTtcblxuXHR9XG5cdGhhbmRsZUtleWJvYXJkSW5wdXQgKGV2ZW50KSB7XG5cdFx0aWYgKGV2ZW50LmtleUNvZGUgPT09IDM3KSB7XG5cdFx0XHR0aGlzLmdvdG9QcmV2KGV2ZW50KTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0gZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzkpIHtcblx0XHRcdHRoaXMuZ290b05leHQoZXZlbnQpO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSBlbHNlIGlmIChldmVudC5rZXlDb2RlID09PSAyNykge1xuXHRcdFx0dGhpcy5wcm9wcy5vbkNsb3NlKCk7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXG5cdH1cblx0aGFuZGxlUmVzaXplICgpIHtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdHdpbmRvd0hlaWdodDogd2luZG93LmlubmVySGVpZ2h0IHx8IDAsXG5cdFx0fSk7XG5cblx0fVxuXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHQvLyBSRU5ERVJFUlNcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblx0cmVuZGVyQXJyb3dQcmV2ICgpIHtcblx0XHRpZiAodGhpcy5wcm9wcy5jdXJyZW50SW1hZ2UgPT09IDApIHJldHVybiBudWxsO1xuXHRcdGNvbnN0IHsgY2xhc3NlcyB9ID0gdGhpcy5wcm9wcy5zaGVldDtcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8YnV0dG9uIHRpdGxlPVwiUHJldmlvdXMgKExlZnQgYXJyb3cga2V5KVwiXG5cdFx0XHRcdHR5cGU9XCJidXR0b25cIlxuXHRcdFx0XHRjbGFzc05hbWU9e2Ake2NsYXNzZXMuYXJyb3d9ICR7Y2xhc3Nlcy5hcnJvd1ByZXZ9YH1cblx0XHRcdFx0b25DbGljaz17dGhpcy5nb3RvUHJldn1cblx0XHRcdFx0b25Ub3VjaEVuZD17dGhpcy5nb3RvUHJldn1cblx0XHRcdD5cblx0XHRcdFx0PEljb24gdHlwZT1cImFycm93TGVmdFwiIC8+XG5cdFx0XHQ8L2J1dHRvbj5cblx0XHQpO1xuXHR9XG5cdHJlbmRlckFycm93TmV4dCAoKSB7XG5cdFx0aWYgKHRoaXMucHJvcHMuY3VycmVudEltYWdlID09PSAodGhpcy5wcm9wcy5pbWFnZXMubGVuZ3RoIC0gMSkpIHJldHVybiBudWxsO1xuXHRcdGNvbnN0IHsgY2xhc3NlcyB9ID0gdGhpcy5wcm9wcy5zaGVldDtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGJ1dHRvbiB0aXRsZT1cIk5leHQgKFJpZ2h0IGFycm93IGtleSlcIlxuXHRcdFx0XHR0eXBlPVwiYnV0dG9uXCJcblx0XHRcdFx0Y2xhc3NOYW1lPXtgJHtjbGFzc2VzLmFycm93fSAke2NsYXNzZXMuYXJyb3dOZXh0fWB9XG5cdFx0XHRcdG9uQ2xpY2s9e3RoaXMuZ290b05leHR9XG5cdFx0XHRcdG9uVG91Y2hFbmQ9e3RoaXMuZ290b05leHR9XG5cdFx0XHRcdD5cblx0XHRcdFx0PEljb24gdHlwZT1cImFycm93UmlnaHRcIiAvPlxuXHRcdFx0PC9idXR0b24+XG5cdFx0KTtcblx0fVxuXHRyZW5kZXJDbG9zZUJhciAoKSB7XG5cdFx0Y29uc3QgeyBjbGFzc2VzIH0gPSB0aGlzLnByb3BzLnNoZWV0O1xuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzLmNsb3NlQmFyfT5cblx0XHRcdFx0e3RoaXMucmVuZGVyQ3VzdG9tQ29udHJvbHMoKX1cblx0XHRcdFx0e3RoaXMucmVuZGVyQ2xvc2VCdXR0b24oKX1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cblx0cmVuZGVyQ2xvc2VCdXR0b24gKCkge1xuXHRcdGlmICghdGhpcy5wcm9wcy5zaG93Q2xvc2VCdXR0b24pIHJldHVybiBudWxsO1xuXHRcdGNvbnN0IHsgY2xhc3NlcyB9ID0gdGhpcy5wcm9wcy5zaGVldDtcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8YnV0dG9uXG5cdFx0XHRcdHRpdGxlPVwiQ2xvc2UgKEVzYylcIlxuXHRcdFx0XHRjbGFzc05hbWU9e2NsYXNzZXMuY2xvc2VCdXR0b259XG5cdFx0XHRcdG9uQ2xpY2s9e3RoaXMucHJvcHMub25DbG9zZX1cblx0XHRcdD5cblx0XHRcdFx0PEljb24gdHlwZT1cImNsb3NlXCIgLz5cblx0XHRcdDwvYnV0dG9uPlxuXHRcdCk7XG5cdH1cblx0cmVuZGVyQ3VzdG9tQ29udHJvbHMgKCkge1xuXHRcdGlmICghdGhpcy5wcm9wcy5jdXN0b21Db250cm9scykgcmV0dXJuIG51bGw7XG5cdFx0cmV0dXJuIHRoaXMucHJvcHMuY3VzdG9tQ29udHJvbHM7XG5cdH1cblx0cmVuZGVyRGlhbG9nICgpIHtcblx0XHRpZiAoIXRoaXMucHJvcHMuaXNPcGVuKSByZXR1cm4gbnVsbDtcblx0XHRjb25zdCB7IGNsYXNzZXMgfSA9IHRoaXMucHJvcHMuc2hlZXQ7XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PEZhZGUgaWQ9XCJyZWFjdC1pbWFnZXMtY29udGFpbmVyXCJcblx0XHRcdFx0a2V5PVwiZGlhbG9nXCJcblx0XHRcdFx0ZHVyYXRpb249ezI1MH1cblx0XHRcdFx0Y2xhc3NOYW1lPXtjbGFzc2VzLmNvbnRhaW5lcn1cblx0XHRcdFx0b25DbGljaz17dGhpcy5jbG9zZX1cblx0XHRcdFx0b25Ub3VjaEVuZD17dGhpcy5jbG9zZX1cblx0XHRcdD5cblx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPXtjbGFzc2VzLmNvbnRlbnRIZWlnaHRTaGltfSAvPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlcy5jb250ZW50fT5cblx0XHRcdFx0XHR7dGhpcy5yZW5kZXJDbG9zZUJhcigpfVxuXHRcdFx0XHRcdHt0aGlzLnJlbmRlckltYWdlcygpfVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0e3RoaXMucmVuZGVyQXJyb3dQcmV2KCl9XG5cdFx0XHRcdHt0aGlzLnJlbmRlckFycm93TmV4dCgpfVxuXHRcdFx0PC9GYWRlPlxuXHRcdCk7XG5cdH1cblx0cmVuZGVyRm9vdGVyIChjYXB0aW9uKSB7XG5cdFx0Y29uc3QgeyBjdXJyZW50SW1hZ2UsIGltYWdlcywgaW1hZ2VDb3VudFNlcGFyYXRvciwgc2hvd0ltYWdlQ291bnQgfSA9IHRoaXMucHJvcHM7XG5cdFx0Y29uc3QgeyBjbGFzc2VzIH0gPSB0aGlzLnByb3BzLnNoZWV0O1xuXG5cdFx0aWYgKCFjYXB0aW9uICYmICFzaG93SW1hZ2VDb3VudCkgcmV0dXJuIG51bGw7XG5cblx0XHRjb25zdCBpbWFnZUNvdW50ID0gc2hvd0ltYWdlQ291bnQgPyAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlcy5mb290ZXJDb3VudH0+XG5cdFx0XHRcdHtjdXJyZW50SW1hZ2UgKyAxfVxuXHRcdFx0XHR7aW1hZ2VDb3VudFNlcGFyYXRvcn1cblx0XHRcdFx0e2ltYWdlcy5sZW5ndGh9XG5cdFx0XHQ8L2Rpdj4pXG5cdFx0XHQ6IG51bGw7XG5cdFx0Y29uc3QgZmlnY2FwdGlvbiA9IGNhcHRpb25cblx0XHRcdD8gPGZpZ2NhcHRpb24gY2xhc3NOYW1lPXtjbGFzc2VzLmZvb3RlckNhcHRpb259PntjYXB0aW9ufTwvZmlnY2FwdGlvbj5cblx0XHRcdDogbnVsbDtcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlcy5mb290ZXJ9PlxuXHRcdFx0XHR7aW1hZ2VDb3VudH1cblx0XHRcdFx0e2ZpZ2NhcHRpb259XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG5cdHJlbmRlckltYWdlcyAoKSB7XG5cdFx0Y29uc3QgeyBpbWFnZXMsIGN1cnJlbnRJbWFnZSB9ID0gdGhpcy5wcm9wcztcblx0XHRjb25zdCB7IGNsYXNzZXMgfSA9IHRoaXMucHJvcHMuc2hlZXQ7XG5cdFx0Y29uc3QgeyB3aW5kb3dIZWlnaHQgfSA9IHRoaXMuc3RhdGU7XG5cblx0XHRpZiAoIWltYWdlcyB8fCAhaW1hZ2VzLmxlbmd0aCkgcmV0dXJuIG51bGw7XG5cblx0XHRjb25zdCBpbWFnZSA9IGltYWdlc1tjdXJyZW50SW1hZ2VdO1xuXG5cdFx0bGV0IHNyY3NldDtcblx0XHRsZXQgc2l6ZXM7XG5cblx0XHRpZiAoaW1hZ2Uuc3Jjc2V0KSB7XG5cdFx0XHRzcmNzZXQgPSBpbWFnZS5zcmNzZXQuam9pbigpO1xuXHRcdFx0c2l6ZXMgPSAnMTAwdncnO1xuXHRcdH1cblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZmlndXJlIGtleT17YGltYWdlICR7Y3VycmVudEltYWdlfWB9XG5cdFx0XHRcdGNsYXNzTmFtZT17Y2xhc3Nlcy5maWd1cmV9XG5cdFx0XHRcdHN0eWxlPXt7IG1heFdpZHRoOiB0aGlzLnByb3BzLndpZHRoIH19XG5cdFx0XHRcdD5cblx0XHRcdFx0ey8qXG5cdFx0XHRcdFx0UmUtaW1wbGVtZW50IHdoZW4gcmVhY3Qgd2FybmluZyBcInVua25vd24gcHJvcHNcIlxuXHRcdFx0XHRcdGh0dHBzOi8vZmIubWUvcmVhY3QtdW5rbm93bi1wcm9wIGlzIHJlc29sdmVkXG5cdFx0XHRcdFx0PFN3aXBlYWJsZSBvblN3aXBlZExlZnQ9e3RoaXMuZ290b05leHR9IG9uU3dpcGVkUmlnaHQ9e3RoaXMuZ290b1ByZXZ9IC8+XG5cdFx0XHRcdCovfVxuXHRcdFx0XHQ8aW1nIGNsYXNzTmFtZT17Y2xhc3Nlcy5pbWFnZX1cblx0XHRcdFx0XHRvbkNsaWNrPXt0aGlzLmhhbmRsZUltYWdlQ2xpY2t9XG5cdFx0XHRcdFx0c2l6ZXM9e3NpemVzfVxuXHRcdFx0XHRcdHNyYz17aW1hZ2Uuc3JjfVxuXHRcdFx0XHRcdHNyY1NldD17c3Jjc2V0fVxuXHRcdFx0XHRcdHN0eWxlPXt7XG5cdFx0XHRcdFx0XHRjdXJzb3I6IHRoaXMucHJvcHMub25DbGlja0ltYWdlID8gJ3BvaW50ZXInIDogJ2F1dG8nLFxuXHRcdFx0XHRcdFx0bWF4SGVpZ2h0OiB3aW5kb3dIZWlnaHQsXG5cdFx0XHRcdFx0fX1cblx0XHRcdFx0Lz5cblx0XHRcdFx0e3RoaXMucmVuZGVyRm9vdGVyKGltYWdlc1tjdXJyZW50SW1hZ2VdLmNhcHRpb24pfVxuXHRcdFx0PC9maWd1cmU+XG5cdFx0KTtcblx0fVxuXHRyZW5kZXIgKCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8UG9ydGFsPlxuXHRcdFx0XHR7dGhpcy5yZW5kZXJEaWFsb2coKX1cblx0XHRcdDwvUG9ydGFsPlxuXHRcdCk7XG5cdH1cbn1cblxuTGlnaHRib3guZGlzcGxheU5hbWUgPSAnTGlnaHRib3gnO1xuXG5MaWdodGJveC5wcm9wVHlwZXMgPSB7XG5cdGJhY2tkcm9wQ2xvc2VzTW9kYWw6IFByb3BUeXBlcy5ib29sLFxuXHRjdXJyZW50SW1hZ2U6IFByb3BUeXBlcy5udW1iZXIsXG5cdGN1c3RvbUNvbnRyb2xzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMubm9kZSksXG5cdGVuYWJsZUtleWJvYXJkSW5wdXQ6IFByb3BUeXBlcy5ib29sLFxuXHRpbWFnZUNvdW50U2VwYXJhdG9yOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRpbWFnZXM6IFByb3BUeXBlcy5hcnJheU9mKFxuXHRcdFByb3BUeXBlcy5zaGFwZSh7XG5cdFx0XHRzcmM6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcblx0XHRcdHNyY3NldDogUHJvcFR5cGVzLmFycmF5LFxuXHRcdFx0Y2FwdGlvbjogUHJvcFR5cGVzLnN0cmluZyxcblx0XHR9KVxuXHQpLmlzUmVxdWlyZWQsXG5cdGlzT3BlbjogUHJvcFR5cGVzLmJvb2wsXG5cdG9uQ2xpY2tJbWFnZTogUHJvcFR5cGVzLmZ1bmMsXG5cdG9uQ2xpY2tOZXh0OiBQcm9wVHlwZXMuZnVuYyxcblx0b25DbGlja1ByZXY6IFByb3BUeXBlcy5mdW5jLFxuXHRvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuXHRzaGVldDogUHJvcFR5cGVzLm9iamVjdCxcblx0c2hvd0Nsb3NlQnV0dG9uOiBQcm9wVHlwZXMuYm9vbCxcblx0c2hvd0ltYWdlQ291bnQ6IFByb3BUeXBlcy5ib29sLFxuXHR3aWR0aDogUHJvcFR5cGVzLm51bWJlcixcbn07XG5cbkxpZ2h0Ym94LmRlZmF1bHRQcm9wcyA9IHtcblx0Y3VycmVudEltYWdlOiAwLFxuXHRlbmFibGVLZXlib2FyZElucHV0OiB0cnVlLFxuXHRpbWFnZUNvdW50U2VwYXJhdG9yOiAnIG9mICcsXG5cdG9uQ2xpY2tTaG93TmV4dEltYWdlOiB0cnVlLFxuXHRzaG93Q2xvc2VCdXR0b246IHRydWUsXG5cdHNob3dJbWFnZUNvdW50OiB0cnVlLFxuXHR3aWR0aDogOTAwLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgdXNlU2hlZXQoTGlnaHRib3gsIGRlZmF1bHRTdHlsZXMpO1xuIl19
