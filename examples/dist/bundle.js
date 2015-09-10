require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./icons":5,"react":undefined}],2:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

module.exports = _react2['default'].createClass({
	displayName: 'Portal',
	render: function render() {
		return null;
	},
	portalElement: null,
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
		_react2['default'].render(_react2['default'].createElement(
			'div',
			this.props,
			this.props.children
		), this.portalElement);
	}
});

},{"react":undefined}],3:[function(require,module,exports){
'use strict';

module.exports = '<svg fill="white" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 512 512" xml:space="preserve">' + '<path d="M213.7,256L213.7,256L213.7,256L380.9,81.9c4.2-4.3,4.1-11.4-0.2-15.8l-29.9-30.6c-4.3-4.4-11.3-4.5-15.5-0.2L131.1,247.9 c-2.2,2.2-3.2,5.2-3,8.1c-0.1,3,0.9,5.9,3,8.1l204.2,212.7c4.2,4.3,11.2,4.2,15.5-0.2l29.9-30.6c4.3-4.4,4.4-11.5,0.2-15.8 L213.7,256z"/>' + '</svg>';

},{}],4:[function(require,module,exports){
'use strict';

module.exports = '<svg fill="white" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 512 512" xml:space="preserve">' + '<path d="M298.3,256L298.3,256L298.3,256L131.1,81.9c-4.2-4.3-4.1-11.4,0.2-15.8l29.9-30.6c4.3-4.4,11.3-4.5,15.5-0.2l204.2,212.7 c2.2,2.2,3.2,5.2,3,8.1c0.1,3-0.9,5.9-3,8.1L176.7,476.8c-4.2,4.3-11.2,4.2-15.5-0.2L131.3,446c-4.3-4.4-4.4-11.5-0.2-15.8 L298.3,256z"/>' + '</svg>';

},{}],5:[function(require,module,exports){
'use strict';

module.exports = {
	arrowLeft: require('./arrowLeft'),
	arrowRight: require('./arrowRight')
};

},{"./arrowLeft":3,"./arrowRight":4}],"react-images":[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _blacklist = require('blacklist');

var _blacklist2 = _interopRequireDefault(_blacklist);

var _Portal = require('./Portal');

var _Portal2 = _interopRequireDefault(_Portal);

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var BODY = document.getElementsByTagName('body')[0];

var Lightbox = _react2['default'].createClass({
	displayName: 'Lightbox',
	propTypes: {
		backdropClosesModal: _react2['default'].PropTypes.bool,
		className: _react2['default'].PropTypes.string,
		enableKeyboardInput: _react2['default'].PropTypes.bool,
		initialImage: _react2['default'].PropTypes.number,
		height: _react2['default'].PropTypes.number,
		images: _react2['default'].PropTypes.array,
		isOpen: _react2['default'].PropTypes.bool,
		onCancel: _react2['default'].PropTypes.func,
		showCloseButton: _react2['default'].PropTypes.bool,
		width: _react2['default'].PropTypes.number
	},
	getDefaultProps: function getDefaultProps() {
		return {
			backdropClosesModal: true,
			enableKeyboardInput: true,
			initialImage: 0,
			height: 600,
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
			this.props.onCancel();
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
		// <Transition transitionName="react-transitiongroup-fade">
		// 	{(this.state.currentImage > 0) && <button type="button" style={Object.assign({}, styles.arrow, styles.arrowPrev)} onClick={this.gotoPrevious} className="octicon octicon-chevron-left" />}
		// </Transition>
		return _react2['default'].createElement(
			'button',
			{ type: 'button', style: _extends({}, styles.arrow, styles.arrowPrev), onClick: this.gotoPrevious },
			_react2['default'].createElement(_Icon2['default'], { type: 'arrowLeft' })
		);
	},
	renderArrowNext: function renderArrowNext() {
		if (this.state.currentImage === this.props.images.length - 1) return;
		// <Transition transitionName="react-transitiongroup-fade">
		// 	{(this.state.currentImage < (this.props.images.length - 1)) && <button type="button" style={Object.assign({}, styles.arrow, styles.arrowNext)} onClick={this.gotoNext} className="octicon octicon-chevron-right" />}
		// </Transition>
		return _react2['default'].createElement(
			'button',
			{ type: 'button', style: _extends({}, styles.arrow, styles.arrowNext), onClick: this.gotoNext, className: 'octicon octicon-chevron-right' },
			_react2['default'].createElement(_Icon2['default'], { type: 'arrowRight' })
		);
	},
	renderBackdrop: function renderBackdrop() {
		if (!this.props.isOpen) return;

		return _react2['default'].createElement('div', { key: 'backdrop', style: styles.backdrop, onClick: this.props.backdropClosesModal ? this.props.onCancel : null });
	},
	renderCloseButton: function renderCloseButton() {
		if (!this.props.showCloseButton) return;

		return _react2['default'].createElement(
			'button',
			{ key: 'close', style: styles.close, onClick: this.props.onCancel },
			'Close'
		);
	},
	renderDialog: function renderDialog() {
		if (!this.props.isOpen) return;

		return _react2['default'].createElement(
			'div',
			{ key: 'dialog', style: _extends({}, styles.dialog, { height: this.props.height, width: this.props.width }) },
			this.renderImages(),
			this.renderArrowPrev(),
			this.renderArrowNext(),
			this.renderCloseButton()
		);
	},
	renderImages: function renderImages() {
		var images = this.props.images;
		var currentImage = this.state.currentImage;

		if (!images || !images.length) return;

		// <Transition transitionName="react-transitiongroup-fade" style={styles.imageContainer} component="div">
		// 	<img key={'image' + currentImage} src={images[currentImage]} style={styles.image} />
		// </Transition>

		return _react2['default'].createElement('img', { key: 'image' + currentImage, src: images[currentImage], style: styles.image });
	},
	render: function render() {
		var props = (0, _blacklist2['default'])(this.props, 'backdropClosesModal', 'initialImage', 'height', 'images', 'isOpen', 'onCancel', 'showCloseButton', 'width');

		return _react2['default'].createElement(
			_Portal2['default'],
			props,
			this.renderDialog(),
			this.renderBackdrop()
		);
	}
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
		backgroundColor: 'rgba(0,0,0,0.66)',
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
		// backgroundColor: 'rgba(255,255,255,0.26)',
		left: 0,
		lineHeight: 1,
		marginLeft: 'auto',
		marginRight: 'auto',
		maxHeight: '100%',
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

module.exports = Lightbox;

},{"./Icon":1,"./Portal":2,"blacklist":undefined,"react":undefined}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9yZWFjdC1jb21wb25lbnQtZ3VscC10YXNrcy9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2pvc3MvRGV2ZWxvcG1lbnQvcGFja2FnZXMvcmVhY3QvaW1hZ2VzL3NyYy9JY29uLmpzIiwiL1VzZXJzL2pvc3MvRGV2ZWxvcG1lbnQvcGFja2FnZXMvcmVhY3QvaW1hZ2VzL3NyYy9Qb3J0YWwuanMiLCIvVXNlcnMvam9zcy9EZXZlbG9wbWVudC9wYWNrYWdlcy9yZWFjdC9pbWFnZXMvc3JjL2ljb25zL2Fycm93TGVmdC5qcyIsIi9Vc2Vycy9qb3NzL0RldmVsb3BtZW50L3BhY2thZ2VzL3JlYWN0L2ltYWdlcy9zcmMvaWNvbnMvYXJyb3dSaWdodC5qcyIsIi9Vc2Vycy9qb3NzL0RldmVsb3BtZW50L3BhY2thZ2VzL3JlYWN0L2ltYWdlcy9zcmMvaWNvbnMvaW5kZXguanMiLCIvVXNlcnMvam9zcy9EZXZlbG9wbWVudC9wYWNrYWdlcy9yZWFjdC9pbWFnZXMvc3JjL0xpZ2h0Ym94LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O3FCQ0FrQixPQUFPOzs7O3FCQUNQLFNBQVM7Ozs7QUFFM0IsTUFBTSxDQUFDLE9BQU8sR0FBRyxtQkFBTSxXQUFXLENBQUM7QUFDbEMsWUFBVyxFQUFFLE1BQU07QUFDbkIsVUFBUyxFQUFFO0FBQ1YsTUFBSSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksb0JBQU8sQ0FBQztFQUMvQztBQUNELE9BQU0sRUFBQyxrQkFBRztBQUNULFNBQU8sb0RBQU0sdUJBQXVCLEVBQUUsRUFBRSxNQUFNLEVBQUUsbUJBQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxBQUFDLElBQUssSUFBSSxDQUFDLEtBQUssRUFBSSxDQUFBO0VBQzVGO0NBQ0QsQ0FBQyxDQUFDOzs7Ozs7O3FCQ1hlLE9BQU87Ozs7QUFDekIsTUFBTSxDQUFDLE9BQU8sR0FBRyxtQkFBTSxXQUFXLENBQUM7QUFDbEMsWUFBVyxFQUFFLFFBQVE7QUFDckIsT0FBTSxFQUFFO1NBQU0sSUFBSTtFQUFBO0FBQ2xCLGNBQWEsRUFBRSxJQUFJO0FBQ25CLGtCQUFpQixFQUFBLDZCQUFHO0FBQ25CLE1BQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUM1RSxNQUFJLENBQUMsQ0FBQyxFQUFFO0FBQ1AsT0FBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN0QyxPQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO0FBQ3hCLEtBQUMsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7SUFDM0I7QUFDRCxXQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztHQUM3QjtBQUNELE1BQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZCLE1BQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0VBQzFCO0FBQ0QscUJBQW9CLEVBQUEsZ0NBQUc7QUFDdEIsVUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0VBQzlDO0FBQ0QsbUJBQWtCLEVBQUEsOEJBQUc7QUFDcEIscUJBQU0sTUFBTSxDQUFDOztHQUFTLElBQUksQ0FBQyxLQUFLO0dBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRO0dBQU8sRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7RUFDbkY7Q0FDRCxDQUFDLENBQUM7Ozs7O0FDdkJILE1BQU0sQ0FBQyxPQUFPLEdBQUcsc01BQXNNLEdBQ3ROLHNRQUFzUSxHQUN2USxRQUFRLENBQUM7Ozs7O0FDRlQsTUFBTSxDQUFDLE9BQU8sR0FBRyxzTUFBc00sR0FDdE4scVFBQXFRLEdBQ3RRLFFBQVEsQ0FBQzs7Ozs7QUNGVCxNQUFNLENBQUMsT0FBTyxHQUFHO0FBQ2hCLFVBQVMsRUFBRSxPQUFPLENBQUMsYUFBYSxDQUFDO0FBQ2pDLFdBQVUsRUFBRSxPQUFPLENBQUMsY0FBYyxDQUFDO0NBQ25DLENBQUM7Ozs7Ozs7OztxQkNIZ0IsT0FBTzs7Ozt5QkFDSCxXQUFXOzs7O3NCQUNkLFVBQVU7Ozs7b0JBQ1osUUFBUTs7OztBQUV6QixJQUFNLElBQUksR0FBRyxRQUFRLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O0FBRXRELElBQUksUUFBUSxHQUFHLG1CQUFNLFdBQVcsQ0FBQztBQUNoQyxZQUFXLEVBQUUsVUFBVTtBQUN2QixVQUFTLEVBQUU7QUFDVixxQkFBbUIsRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUN6QyxXQUFTLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU07QUFDakMscUJBQW1CLEVBQUUsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDekMsY0FBWSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQ3BDLFFBQU0sRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTTtBQUM5QixRQUFNLEVBQUUsbUJBQU0sU0FBUyxDQUFDLEtBQUs7QUFDN0IsUUFBTSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQzVCLFVBQVEsRUFBRSxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUM5QixpQkFBZSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQ3JDLE9BQUssRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTTtFQUM3QjtBQUNELGdCQUFlLEVBQUMsMkJBQUc7QUFDbEIsU0FBTztBQUNOLHNCQUFtQixFQUFFLElBQUk7QUFDekIsc0JBQW1CLEVBQUUsSUFBSTtBQUN6QixlQUFZLEVBQUUsQ0FBQztBQUNmLFNBQU0sRUFBRSxHQUFHO0FBQ1gsUUFBSyxFQUFFLEdBQUc7R0FDVixDQUFDO0VBQ0Y7QUFDRCxnQkFBZSxFQUFDLDJCQUFHO0FBQ2xCLFNBQU87QUFDTixlQUFZLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZO0dBQ3JDLENBQUM7RUFDRjtBQUNELDBCQUF5QixFQUFDLG1DQUFDLFNBQVMsRUFBRTtBQUNyQyxNQUFJLENBQUMsUUFBUSxDQUFDO0FBQ2IsZUFBWSxFQUFFLFNBQVMsQ0FBQyxZQUFZO0dBQ3BDLENBQUMsQ0FBQzs7QUFFSCxNQUFJLFNBQVMsQ0FBQyxNQUFNLElBQUksU0FBUyxDQUFDLG1CQUFtQixFQUFFO0FBQ3RELFNBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7R0FDN0QsTUFBTTtBQUNOLFNBQU0sQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7R0FDaEU7O0FBRUQsTUFBSSxTQUFTLENBQUMsTUFBTSxFQUFFO0FBQ3JCLE9BQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztHQUMvQixNQUFNO0FBQ04sT0FBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0dBQzNCO0VBQ0Q7O0FBRUQsb0JBQW1CLEVBQUMsNkJBQUMsS0FBSyxFQUFFO0FBQzNCLE1BQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxFQUFFLEVBQUU7QUFDekIsT0FBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0dBQ3BCLE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLEVBQUUsRUFBRTtBQUNoQyxPQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7R0FDaEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssRUFBRSxFQUFFO0FBQ2hDLE9BQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7R0FDdEIsTUFBTTtBQUNOLFVBQU8sS0FBSyxDQUFDO0dBQ2I7RUFDRDtBQUNELGFBQVksRUFBQyx3QkFBRztBQUNmLE1BQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEtBQUssQ0FBQyxFQUFFLE9BQU87O0FBRTFDLE1BQUksQ0FBQyxRQUFRLENBQUM7QUFDYixlQUFZLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsQ0FBQztHQUN6QyxDQUFDLENBQUM7RUFDSDtBQUNELFNBQVEsRUFBQyxvQkFBRztBQUNYLE1BQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEtBQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQUFBQyxFQUFFLE9BQU87O0FBRXZFLE1BQUksQ0FBQyxRQUFRLENBQUM7QUFDYixlQUFZLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsQ0FBQztHQUN6QyxDQUFDLENBQUM7RUFDSDs7QUFFRCxnQkFBZSxFQUFDLDJCQUFHO0FBQ2xCLE1BQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEtBQUssQ0FBQyxFQUFFLE9BQU87Ozs7QUFJMUMsU0FDQzs7S0FBUSxJQUFJLEVBQUMsUUFBUSxFQUFDLEtBQUssRUFBRSxTQUFjLEVBQUUsRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsQUFBQyxFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsWUFBWSxBQUFDO0dBQzFHLHNEQUFNLElBQUksRUFBQyxXQUFXLEdBQUc7R0FDakIsQ0FDUjtFQUNGO0FBQ0QsZ0JBQWUsRUFBQywyQkFBRztBQUNsQixNQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxLQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEFBQUMsRUFBRSxPQUFPOzs7O0FBSXZFLFNBQ0M7O0tBQVEsSUFBSSxFQUFDLFFBQVEsRUFBQyxLQUFLLEVBQUUsU0FBYyxFQUFFLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLEFBQUMsRUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsQUFBQyxFQUFDLFNBQVMsRUFBQywrQkFBK0I7R0FDaEosc0RBQU0sSUFBSSxFQUFDLFlBQVksR0FBRztHQUNsQixDQUNSO0VBQ0Y7QUFDRCxlQUFjLEVBQUMsMEJBQUc7QUFDakIsTUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLE9BQU87O0FBRS9CLFNBQU8sMENBQUssR0FBRyxFQUFDLFVBQVUsRUFBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLFFBQVEsQUFBQyxFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLElBQUksQUFBQyxHQUFHLENBQUM7RUFDNUg7QUFDRCxrQkFBaUIsRUFBQyw2QkFBRztBQUNwQixNQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUUsT0FBTzs7QUFFeEMsU0FBTzs7S0FBUSxHQUFHLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSyxBQUFDLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxBQUFDOztHQUFlLENBQUM7RUFDN0Y7QUFDRCxhQUFZLEVBQUMsd0JBQUc7QUFDZixNQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsT0FBTzs7QUFFL0IsU0FDQzs7S0FBSyxHQUFHLEVBQUMsUUFBUSxFQUFDLEtBQUssRUFBRSxTQUFjLEVBQUUsRUFBRSxNQUFNLENBQUMsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLEFBQUM7R0FDaEgsSUFBSSxDQUFDLFlBQVksRUFBRTtHQUNuQixJQUFJLENBQUMsZUFBZSxFQUFFO0dBQ3RCLElBQUksQ0FBQyxlQUFlLEVBQUU7R0FDdEIsSUFBSSxDQUFDLGlCQUFpQixFQUFFO0dBQ3BCLENBQ0w7RUFDRjtBQUNELGFBQVksRUFBQyx3QkFBRztNQUNULE1BQU0sR0FBSyxJQUFJLENBQUMsS0FBSyxDQUFyQixNQUFNO01BQ04sWUFBWSxHQUFLLElBQUksQ0FBQyxLQUFLLENBQTNCLFlBQVk7O0FBQ2xCLE1BQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLE9BQU87Ozs7OztBQU10QyxTQUNDLDBDQUFLLEdBQUcsRUFBRSxPQUFPLEdBQUcsWUFBWSxBQUFDLEVBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUMsQUFBQyxFQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSyxBQUFDLEdBQUcsQ0FDbkY7RUFDRjtBQUNELE9BQU0sRUFBQyxrQkFBRztBQUNULE1BQUksS0FBSyxHQUFHLDRCQUFVLElBQUksQ0FBQyxLQUFLLEVBQUUscUJBQXFCLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxpQkFBaUIsRUFBRSxPQUFPLENBQUMsQ0FBQzs7QUFFL0ksU0FDQzs7R0FBWSxLQUFLO0dBQ2YsSUFBSSxDQUFDLFlBQVksRUFBRTtHQUNuQixJQUFJLENBQUMsY0FBYyxFQUFFO0dBQ2QsQ0FDUjtFQUNGO0NBQ0QsQ0FBQyxDQUFDOztBQUVILElBQU0sTUFBTSxHQUFHO0FBQ2QsTUFBSyxFQUFFO0FBQ04sWUFBVSxFQUFFLE1BQU07QUFDbEIsUUFBTSxFQUFFLE1BQU07QUFDZCxRQUFNLEVBQUUsQ0FBQztBQUNULE9BQUssRUFBRSxPQUFPO0FBQ2QsUUFBTSxFQUFFLFNBQVM7QUFDakIsVUFBUSxFQUFFLEVBQUU7QUFDWixPQUFLLEVBQUUsQ0FBQztBQUNSLFNBQU8sRUFBRSxNQUFNO0FBQ2YsU0FBTyxFQUFFLE1BQU07QUFDZixVQUFRLEVBQUUsVUFBVTtBQUNwQixLQUFHLEVBQUUsQ0FBQztBQUNOLE9BQUssRUFBRSxLQUFLO0FBQ1osUUFBTSxFQUFFLElBQUk7OztBQUdaLG9CQUFrQixFQUFFLE1BQU07QUFDMUIsa0JBQWdCLEVBQUksTUFBTTtBQUMxQixlQUFhLEVBQU8sTUFBTTtBQUMxQixjQUFZLEVBQVEsTUFBTTtBQUMxQixZQUFVLEVBQVUsTUFBTTtFQUMxQjtBQUNELFVBQVMsRUFBRTtBQUNWLE9BQUssRUFBRSxDQUFDO0VBQ1I7QUFDRCxVQUFTLEVBQUU7QUFDVixNQUFJLEVBQUUsQ0FBQztFQUNQO0FBQ0QsU0FBUSxFQUFFO0FBQ1QsaUJBQWUsRUFBRSxrQkFBa0I7QUFDbkMsUUFBTSxFQUFFLENBQUM7QUFDVCxNQUFJLEVBQUUsQ0FBQztBQUNQLFVBQVEsRUFBRSxPQUFPO0FBQ2pCLE9BQUssRUFBRSxDQUFDO0FBQ1IsS0FBRyxFQUFFLENBQUM7QUFDTixRQUFNLEVBQUUsSUFBSTtFQUNaO0FBQ0QsTUFBSyxFQUFFO0FBQ04sWUFBVSxFQUFFLE1BQU07QUFDbEIsUUFBTSxFQUFFLE1BQU07QUFDZCxRQUFNLEVBQUUsQ0FBQyxFQUFFO0FBQ1gsT0FBSyxFQUFFLE9BQU87QUFDZCxVQUFRLEVBQUUsRUFBRTtBQUNaLFFBQU0sRUFBRSxFQUFFO0FBQ1YsTUFBSSxFQUFFLENBQUM7QUFDUCxZQUFVLEVBQUUsTUFBTTtBQUNsQixhQUFXLEVBQUUsTUFBTTtBQUNuQixTQUFPLEVBQUUsTUFBTTtBQUNmLFNBQU8sRUFBRSxDQUFDO0FBQ1YsVUFBUSxFQUFFLFVBQVU7QUFDcEIsT0FBSyxFQUFFLENBQUM7QUFDUixXQUFTLEVBQUUsUUFBUTtBQUNuQixlQUFhLEVBQUUsV0FBVztBQUMxQixPQUFLLEVBQUUsR0FBRztFQUNWO0FBQ0QsT0FBTSxFQUFFOztBQUVQLE1BQUksRUFBRSxDQUFDO0FBQ1AsWUFBVSxFQUFFLENBQUM7QUFDYixZQUFVLEVBQUUsTUFBTTtBQUNsQixhQUFXLEVBQUUsTUFBTTtBQUNuQixXQUFTLEVBQUUsTUFBTTtBQUNqQixVQUFRLEVBQUUsTUFBTTtBQUNoQixVQUFRLEVBQUUsT0FBTztBQUNqQixPQUFLLEVBQUUsQ0FBQztBQUNSLEtBQUcsRUFBRSxLQUFLO0FBQ1YsUUFBTSxFQUFFLElBQUk7O0FBRVosaUJBQWUsRUFBRSxrQkFBa0I7QUFDbkMsY0FBWSxFQUFLLGtCQUFrQjtBQUNuQyxhQUFXLEVBQU0sa0JBQWtCO0FBQ25DLFdBQVMsRUFBUSxrQkFBa0I7RUFDbkM7QUFDRCxNQUFLLEVBQUU7QUFDTixXQUFTLEVBQUUsNEJBQTRCO0FBQ3ZDLFdBQVMsRUFBRSxNQUFNO0FBQ2pCLFVBQVEsRUFBRSxLQUFLO0FBQ2YsVUFBUSxFQUFFLFVBQVU7OztBQUdwQixNQUFJLEVBQUUsS0FBSztBQUNYLEtBQUcsRUFBRSxLQUFLO0FBQ1YsaUJBQWUsRUFBRSx1QkFBdUI7QUFDeEMsY0FBWSxFQUFLLHVCQUF1QjtBQUN4QyxhQUFXLEVBQU0sdUJBQXVCO0FBQ3hDLFdBQVMsRUFBUSx1QkFBdUI7OztBQUd4QyxvQkFBa0IsRUFBRSxNQUFNO0FBQzFCLGtCQUFnQixFQUFJLE1BQU07QUFDMUIsZUFBYSxFQUFPLE1BQU07QUFDMUIsY0FBWSxFQUFRLE1BQU07QUFDMUIsWUFBVSxFQUFVLE1BQU07O0VBRTFCO0NBQ0QsQ0FBQzs7QUFFRixNQUFNLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGljb25zIGZyb20gJy4vaWNvbnMnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0ZGlzcGxheU5hbWU6ICdJY29uJyxcblx0cHJvcFR5cGVzOiB7XG5cdFx0dHlwZTogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKE9iamVjdC5rZXlzKGljb25zKSlcblx0fSxcblx0cmVuZGVyICgpIHtcblx0XHRyZXR1cm4gPHNwYW4gZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3sgX19odG1sOiBpY29uc1t0aGlzLnByb3BzLnR5cGVdIH19IHsuLi50aGlzLnByb3BzfSAvPlxuXHR9LFxufSk7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGRpc3BsYXlOYW1lOiAnUG9ydGFsJyxcblx0cmVuZGVyOiAoKSA9PiBudWxsLFxuXHRwb3J0YWxFbGVtZW50OiBudWxsLFxuXHRjb21wb25lbnREaWRNb3VudCgpIHtcblx0XHR2YXIgcCA9IHRoaXMucHJvcHMucG9ydGFsSWQgJiYgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5wcm9wcy5wb3J0YWxJZCk7XG5cdFx0aWYgKCFwKSB7XG5cdFx0XHR2YXIgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdFx0aWYgKHRoaXMucHJvcHMucG9ydGFsSWQpIHtcblx0XHRcdFx0cC5pZCA9IHRoaXMucHJvcHMucG9ydGFsSWQ7XG5cdFx0XHR9XG5cdFx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHApO1xuXHRcdH1cblx0XHR0aGlzLnBvcnRhbEVsZW1lbnQgPSBwO1xuXHRcdHRoaXMuY29tcG9uZW50RGlkVXBkYXRlKCk7XG5cdH0sXG5cdGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuXHRcdGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy5wb3J0YWxFbGVtZW50KTtcblx0fSxcblx0Y29tcG9uZW50RGlkVXBkYXRlKCkge1xuXHRcdFJlYWN0LnJlbmRlcig8ZGl2IHsuLi50aGlzLnByb3BzfT57dGhpcy5wcm9wcy5jaGlsZHJlbn08L2Rpdj4sIHRoaXMucG9ydGFsRWxlbWVudCk7XG5cdH1cbn0pO1xuIiwibW9kdWxlLmV4cG9ydHMgPSAnPHN2ZyBmaWxsPVwid2hpdGVcIiB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHg9XCIwcHhcIiB5PVwiMHB4XCIgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+JyArXHJcblx0JzxwYXRoIGQ9XCJNMjEzLjcsMjU2TDIxMy43LDI1NkwyMTMuNywyNTZMMzgwLjksODEuOWM0LjItNC4zLDQuMS0xMS40LTAuMi0xNS44bC0yOS45LTMwLjZjLTQuMy00LjQtMTEuMy00LjUtMTUuNS0wLjJMMTMxLjEsMjQ3LjkgYy0yLjIsMi4yLTMuMiw1LjItMyw4LjFjLTAuMSwzLDAuOSw1LjksMyw4LjFsMjA0LjIsMjEyLjdjNC4yLDQuMywxMS4yLDQuMiwxNS41LTAuMmwyOS45LTMwLjZjNC4zLTQuNCw0LjQtMTEuNSwwLjItMTUuOCBMMjEzLjcsMjU2elwiLz4nICtcclxuJzwvc3ZnPic7XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gJzxzdmcgZmlsbD1cIndoaXRlXCIgdmVyc2lvbj1cIjEuMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4PVwiMHB4XCIgeT1cIjBweFwiIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIiB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiPicgK1xyXG5cdCc8cGF0aCBkPVwiTTI5OC4zLDI1NkwyOTguMywyNTZMMjk4LjMsMjU2TDEzMS4xLDgxLjljLTQuMi00LjMtNC4xLTExLjQsMC4yLTE1LjhsMjkuOS0zMC42YzQuMy00LjQsMTEuMy00LjUsMTUuNS0wLjJsMjA0LjIsMjEyLjcgYzIuMiwyLjIsMy4yLDUuMiwzLDguMWMwLjEsMy0wLjksNS45LTMsOC4xTDE3Ni43LDQ3Ni44Yy00LjIsNC4zLTExLjIsNC4yLTE1LjUtMC4yTDEzMS4zLDQ0NmMtNC4zLTQuNC00LjQtMTEuNS0wLjItMTUuOCBMMjk4LjMsMjU2elwiLz4nICtcclxuJzwvc3ZnPic7XHJcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuXHRhcnJvd0xlZnQ6IHJlcXVpcmUoJy4vYXJyb3dMZWZ0JyksXG5cdGFycm93UmlnaHQ6IHJlcXVpcmUoJy4vYXJyb3dSaWdodCcpXG59O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBibGFja2xpc3QgZnJvbSAnYmxhY2tsaXN0JztcbmltcG9ydCBQb3J0YWwgZnJvbSAnLi9Qb3J0YWwnO1xuaW1wb3J0IEljb24gZnJvbSAnLi9JY29uJztcblxuY29uc3QgQk9EWSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF07XG5cbnZhciBMaWdodGJveCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0ZGlzcGxheU5hbWU6ICdMaWdodGJveCcsXG5cdHByb3BUeXBlczoge1xuXHRcdGJhY2tkcm9wQ2xvc2VzTW9kYWw6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuXHRcdGNsYXNzTmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblx0XHRlbmFibGVLZXlib2FyZElucHV0OiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcblx0XHRpbml0aWFsSW1hZ2U6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG5cdFx0aGVpZ2h0OiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuXHRcdGltYWdlczogUmVhY3QuUHJvcFR5cGVzLmFycmF5LFxuXHRcdGlzT3BlbjogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG5cdFx0b25DYW5jZWw6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuXHRcdHNob3dDbG9zZUJ1dHRvbjogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG5cdFx0d2lkdGg6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG5cdH0sXG5cdGdldERlZmF1bHRQcm9wcyAoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGJhY2tkcm9wQ2xvc2VzTW9kYWw6IHRydWUsXG5cdFx0XHRlbmFibGVLZXlib2FyZElucHV0OiB0cnVlLFxuXHRcdFx0aW5pdGlhbEltYWdlOiAwLFxuXHRcdFx0aGVpZ2h0OiA2MDAsXG5cdFx0XHR3aWR0aDogOTAwLFxuXHRcdH07XG5cdH0sXG5cdGdldEluaXRpYWxTdGF0ZSAoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGN1cnJlbnRJbWFnZTogdGhpcy5wcm9wcy5pbml0aWFsSW1hZ2Vcblx0XHR9O1xuXHR9LFxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIChuZXh0UHJvcHMpIHtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGN1cnJlbnRJbWFnZTogbmV4dFByb3BzLmluaXRpYWxJbWFnZVxuXHRcdH0pO1xuXG5cdFx0aWYgKG5leHRQcm9wcy5pc09wZW4gJiYgbmV4dFByb3BzLmVuYWJsZUtleWJvYXJkSW5wdXQpIHtcblx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5oYW5kbGVLZXlib2FyZElucHV0KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmhhbmRsZUtleWJvYXJkSW5wdXQpO1xuXHRcdH1cblxuXHRcdGlmIChuZXh0UHJvcHMuaXNPcGVuKSB7XG5cdFx0XHRCT0RZLnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG5cdFx0fSBlbHNlIHtcblx0XHRcdEJPRFkuc3R5bGUub3ZlcmZsb3cgPSBudWxsO1xuXHRcdH1cblx0fSxcblxuXHRoYW5kbGVLZXlib2FyZElucHV0IChldmVudCkge1xuXHRcdGlmIChldmVudC5rZXlDb2RlID09PSAzNykge1xuXHRcdFx0dGhpcy5nb3RvUHJldmlvdXMoKTtcblx0XHR9IGVsc2UgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM5KSB7XG5cdFx0XHR0aGlzLmdvdG9OZXh0KCk7XG5cdFx0fSBlbHNlIGlmIChldmVudC5rZXlDb2RlID09PSAyNykge1xuXHRcdFx0dGhpcy5wcm9wcy5vbkNhbmNlbCgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHR9LFxuXHRnb3RvUHJldmlvdXMgKCkge1xuXHRcdGlmICh0aGlzLnN0YXRlLmN1cnJlbnRJbWFnZSA9PT0gMCkgcmV0dXJuO1xuXG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRjdXJyZW50SW1hZ2U6IHRoaXMuc3RhdGUuY3VycmVudEltYWdlIC0gMSxcblx0XHR9KTtcblx0fSxcblx0Z290b05leHQgKCkge1xuXHRcdGlmICh0aGlzLnN0YXRlLmN1cnJlbnRJbWFnZSA9PT0gKHRoaXMucHJvcHMuaW1hZ2VzLmxlbmd0aCAtIDEpKSByZXR1cm47XG5cblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGN1cnJlbnRJbWFnZTogdGhpcy5zdGF0ZS5jdXJyZW50SW1hZ2UgKyAxLFxuXHRcdH0pO1xuXHR9LFxuXG5cdHJlbmRlckFycm93UHJldiAoKSB7XG5cdFx0aWYgKHRoaXMuc3RhdGUuY3VycmVudEltYWdlID09PSAwKSByZXR1cm47XG5cdFx0Ly8gPFRyYW5zaXRpb24gdHJhbnNpdGlvbk5hbWU9XCJyZWFjdC10cmFuc2l0aW9uZ3JvdXAtZmFkZVwiPlxuXHRcdC8vIFx0eyh0aGlzLnN0YXRlLmN1cnJlbnRJbWFnZSA+IDApICYmIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHN0eWxlPXtPYmplY3QuYXNzaWduKHt9LCBzdHlsZXMuYXJyb3csIHN0eWxlcy5hcnJvd1ByZXYpfSBvbkNsaWNrPXt0aGlzLmdvdG9QcmV2aW91c30gY2xhc3NOYW1lPVwib2N0aWNvbiBvY3RpY29uLWNoZXZyb24tbGVmdFwiIC8+fVxuXHRcdC8vIDwvVHJhbnNpdGlvbj5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgc3R5bGU9e09iamVjdC5hc3NpZ24oe30sIHN0eWxlcy5hcnJvdywgc3R5bGVzLmFycm93UHJldil9IG9uQ2xpY2s9e3RoaXMuZ290b1ByZXZpb3VzfT5cblx0XHRcdFx0PEljb24gdHlwZT1cImFycm93TGVmdFwiIC8+XG5cdFx0XHQ8L2J1dHRvbj5cblx0XHQpO1xuXHR9LFxuXHRyZW5kZXJBcnJvd05leHQgKCkge1xuXHRcdGlmICh0aGlzLnN0YXRlLmN1cnJlbnRJbWFnZSA9PT0gKHRoaXMucHJvcHMuaW1hZ2VzLmxlbmd0aCAtIDEpKSByZXR1cm47XG5cdFx0Ly8gPFRyYW5zaXRpb24gdHJhbnNpdGlvbk5hbWU9XCJyZWFjdC10cmFuc2l0aW9uZ3JvdXAtZmFkZVwiPlxuXHRcdC8vIFx0eyh0aGlzLnN0YXRlLmN1cnJlbnRJbWFnZSA8ICh0aGlzLnByb3BzLmltYWdlcy5sZW5ndGggLSAxKSkgJiYgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgc3R5bGU9e09iamVjdC5hc3NpZ24oe30sIHN0eWxlcy5hcnJvdywgc3R5bGVzLmFycm93TmV4dCl9IG9uQ2xpY2s9e3RoaXMuZ290b05leHR9IGNsYXNzTmFtZT1cIm9jdGljb24gb2N0aWNvbi1jaGV2cm9uLXJpZ2h0XCIgLz59XG5cdFx0Ly8gPC9UcmFuc2l0aW9uPlxuXHRcdHJldHVybiAoXG5cdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBzdHlsZT17T2JqZWN0LmFzc2lnbih7fSwgc3R5bGVzLmFycm93LCBzdHlsZXMuYXJyb3dOZXh0KX0gb25DbGljaz17dGhpcy5nb3RvTmV4dH0gY2xhc3NOYW1lPVwib2N0aWNvbiBvY3RpY29uLWNoZXZyb24tcmlnaHRcIj5cblx0XHRcdFx0PEljb24gdHlwZT1cImFycm93UmlnaHRcIiAvPlxuXHRcdFx0PC9idXR0b24+XG5cdFx0KTtcblx0fSxcblx0cmVuZGVyQmFja2Ryb3AgKCkge1xuXHRcdGlmICghdGhpcy5wcm9wcy5pc09wZW4pIHJldHVybjtcblxuXHRcdHJldHVybiA8ZGl2IGtleT1cImJhY2tkcm9wXCIgc3R5bGU9e3N0eWxlcy5iYWNrZHJvcH0gb25DbGljaz17dGhpcy5wcm9wcy5iYWNrZHJvcENsb3Nlc01vZGFsID8gdGhpcy5wcm9wcy5vbkNhbmNlbCA6IG51bGx9IC8+O1xuXHR9LFxuXHRyZW5kZXJDbG9zZUJ1dHRvbiAoKSB7XG5cdFx0aWYgKCF0aGlzLnByb3BzLnNob3dDbG9zZUJ1dHRvbikgcmV0dXJuO1xuXG5cdFx0cmV0dXJuIDxidXR0b24ga2V5PVwiY2xvc2VcIiBzdHlsZT17c3R5bGVzLmNsb3NlfSBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQ2FuY2VsfT5DbG9zZTwvYnV0dG9uPjtcblx0fSxcblx0cmVuZGVyRGlhbG9nICgpIHtcblx0XHRpZiAoIXRoaXMucHJvcHMuaXNPcGVuKSByZXR1cm47XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBrZXk9XCJkaWFsb2dcIiBzdHlsZT17T2JqZWN0LmFzc2lnbih7fSwgc3R5bGVzLmRpYWxvZywgeyBoZWlnaHQ6IHRoaXMucHJvcHMuaGVpZ2h0LCB3aWR0aDogdGhpcy5wcm9wcy53aWR0aCB9KX0+XG5cdFx0XHRcdHt0aGlzLnJlbmRlckltYWdlcygpfVxuXHRcdFx0XHR7dGhpcy5yZW5kZXJBcnJvd1ByZXYoKX1cblx0XHRcdFx0e3RoaXMucmVuZGVyQXJyb3dOZXh0KCl9XG5cdFx0XHRcdHt0aGlzLnJlbmRlckNsb3NlQnV0dG9uKCl9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9LFxuXHRyZW5kZXJJbWFnZXMgKCkge1xuXHRcdGxldCB7IGltYWdlcyB9ID0gdGhpcy5wcm9wcztcblx0XHRsZXQgeyBjdXJyZW50SW1hZ2UgfSA9IHRoaXMuc3RhdGU7XG5cdFx0aWYgKCFpbWFnZXMgfHwgIWltYWdlcy5sZW5ndGgpIHJldHVybjtcblxuXHRcdC8vIDxUcmFuc2l0aW9uIHRyYW5zaXRpb25OYW1lPVwicmVhY3QtdHJhbnNpdGlvbmdyb3VwLWZhZGVcIiBzdHlsZT17c3R5bGVzLmltYWdlQ29udGFpbmVyfSBjb21wb25lbnQ9XCJkaXZcIj5cblx0XHQvLyBcdDxpbWcga2V5PXsnaW1hZ2UnICsgY3VycmVudEltYWdlfSBzcmM9e2ltYWdlc1tjdXJyZW50SW1hZ2VdfSBzdHlsZT17c3R5bGVzLmltYWdlfSAvPlxuXHRcdC8vIDwvVHJhbnNpdGlvbj5cblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8aW1nIGtleT17J2ltYWdlJyArIGN1cnJlbnRJbWFnZX0gc3JjPXtpbWFnZXNbY3VycmVudEltYWdlXX0gc3R5bGU9e3N0eWxlcy5pbWFnZX0gLz5cblx0XHQpO1xuXHR9LFxuXHRyZW5kZXIgKCkge1xuXHRcdGxldCBwcm9wcyA9IGJsYWNrbGlzdCh0aGlzLnByb3BzLCAnYmFja2Ryb3BDbG9zZXNNb2RhbCcsICdpbml0aWFsSW1hZ2UnLCAnaGVpZ2h0JywgJ2ltYWdlcycsICdpc09wZW4nLCAnb25DYW5jZWwnLCAnc2hvd0Nsb3NlQnV0dG9uJywgJ3dpZHRoJyk7XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PFBvcnRhbCB7Li4ucHJvcHN9PlxuXHRcdFx0XHR7dGhpcy5yZW5kZXJEaWFsb2coKX1cblx0XHRcdFx0e3RoaXMucmVuZGVyQmFja2Ryb3AoKX1cblx0XHRcdDwvUG9ydGFsPlxuXHRcdCk7XG5cdH1cbn0pO1xuXG5jb25zdCBzdHlsZXMgPSB7XG5cdGFycm93OiB7XG5cdFx0YmFja2dyb3VuZDogJ25vbmUnLFxuXHRcdGJvcmRlcjogJ25vbmUnLFxuXHRcdGJvdHRvbTogMCxcblx0XHRjb2xvcjogJ3doaXRlJyxcblx0XHRjdXJzb3I6ICdwb2ludGVyJyxcblx0XHRmb250U2l6ZTogNDgsXG5cdFx0cmlnaHQ6IDAsXG5cdFx0b3V0bGluZTogJ25vbmUnLFxuXHRcdHBhZGRpbmc6ICcwIDIlJyxcblx0XHRwb3NpdGlvbjogJ2Fic29sdXRlJyxcblx0XHR0b3A6IDAsXG5cdFx0d2lkdGg6ICcxMCUnLFxuXHRcdHpJbmRleDogMTAwMixcblxuXHRcdC8vIGRpc2FibGUgdXNlciBzZWxlY3Rcblx0XHRXZWJraXRUb3VjaENhbGxvdXQ6ICdub25lJyxcblx0XHRXZWJraXRVc2VyU2VsZWN0OiAgICdub25lJyxcblx0XHRNb3pVc2VyU2VsZWN0OiAgICAgICdub25lJyxcblx0XHRtc1VzZXJTZWxlY3Q6ICAgICAgICdub25lJyxcblx0XHR1c2VyU2VsZWN0OiAgICAgICAgICdub25lJyxcblx0fSxcblx0YXJyb3dOZXh0OiB7XG5cdFx0cmlnaHQ6IDAsXG5cdH0sXG5cdGFycm93UHJldjoge1xuXHRcdGxlZnQ6IDAsXG5cdH0sXG5cdGJhY2tkcm9wOiB7XG5cdFx0YmFja2dyb3VuZENvbG9yOiAncmdiYSgwLDAsMCwwLjY2KScsXG5cdFx0Ym90dG9tOiAwLFxuXHRcdGxlZnQ6IDAsXG5cdFx0cG9zaXRpb246ICdmaXhlZCcsXG5cdFx0cmlnaHQ6IDAsXG5cdFx0dG9wOiAwLFxuXHRcdHpJbmRleDogMTAwMCxcblx0fSxcblx0Y2xvc2U6IHtcblx0XHRiYWNrZ3JvdW5kOiAnbm9uZScsXG5cdFx0Ym9yZGVyOiAnbm9uZScsXG5cdFx0Ym90dG9tOiAtMzIsXG5cdFx0Y29sb3I6ICd3aGl0ZScsXG5cdFx0Zm9udFNpemU6IDE2LFxuXHRcdGhlaWdodDogMzIsXG5cdFx0bGVmdDogMCxcblx0XHRtYXJnaW5MZWZ0OiAnYXV0bycsXG5cdFx0bWFyZ2luUmlnaHQ6ICdhdXRvJyxcblx0XHRvdXRsaW5lOiAnbm9uZScsXG5cdFx0cGFkZGluZzogMCxcblx0XHRwb3NpdGlvbjogJ2Fic29sdXRlJyxcblx0XHRyaWdodDogMCxcblx0XHR0ZXh0QWxpZ246ICdjZW50ZXInLFxuXHRcdHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnLFxuXHRcdHdpZHRoOiAxMDAsXG5cdH0sXG5cdGRpYWxvZzoge1xuXHRcdC8vIGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMjU1LDI1NSwyNTUsMC4yNiknLFxuXHRcdGxlZnQ6IDAsXG5cdFx0bGluZUhlaWdodDogMSxcblx0XHRtYXJnaW5MZWZ0OiAnYXV0bycsXG5cdFx0bWFyZ2luUmlnaHQ6ICdhdXRvJyxcblx0XHRtYXhIZWlnaHQ6ICcxMDAlJyxcblx0XHRtYXhXaWR0aDogJzEwMCUnLFxuXHRcdHBvc2l0aW9uOiAnZml4ZWQnLFxuXHRcdHJpZ2h0OiAwLFxuXHRcdHRvcDogJzUwJScsXG5cdFx0ekluZGV4OiAxMDAxLFxuXG5cdFx0V2Via2l0VHJhbnNmb3JtOiAndHJhbnNsYXRlWSgtNTAlKScsXG5cdFx0TW96VHJhbnNmb3JtOiAgICAndHJhbnNsYXRlWSgtNTAlKScsXG5cdFx0bXNUcmFuc2Zvcm06ICAgICAndHJhbnNsYXRlWSgtNTAlKScsXG5cdFx0dHJhbnNmb3JtOiAgICAgICAndHJhbnNsYXRlWSgtNTAlKScsXG5cdH0sXG5cdGltYWdlOiB7XG5cdFx0Ym94U2hhZG93OiAnMCAxcHggNHB4IHJnYmEoMCwwLDAsMC4yNSknLFxuXHRcdG1heEhlaWdodDogJzEwMCUnLFxuXHRcdG1heFdpZHRoOiAnODAlJyxcblx0XHRwb3NpdGlvbjogJ2Fic29sdXRlJyxcblxuXHRcdC8vIGNlbnRlciB0aGUgaW1hZ2Ugd2l0aGluIHRoZSBkaWFsb2dcblx0XHRsZWZ0OiAnNTAlJyxcblx0XHR0b3A6ICc1MCUnLFxuXHRcdFdlYmtpdFRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgtNTAlLCAtNTAlKScsXG5cdFx0TW96VHJhbnNmb3JtOiAgICAndHJhbnNsYXRlKC01MCUsIC01MCUpJyxcblx0XHRtc1RyYW5zZm9ybTogICAgICd0cmFuc2xhdGUoLTUwJSwgLTUwJSknLFxuXHRcdHRyYW5zZm9ybTogICAgICAgJ3RyYW5zbGF0ZSgtNTAlLCAtNTAlKScsXG5cblx0XHQvLyBkaXNhYmxlIHVzZXIgc2VsZWN0XG5cdFx0V2Via2l0VG91Y2hDYWxsb3V0OiAnbm9uZScsXG5cdFx0V2Via2l0VXNlclNlbGVjdDogICAnbm9uZScsXG5cdFx0TW96VXNlclNlbGVjdDogICAgICAnbm9uZScsXG5cdFx0bXNVc2VyU2VsZWN0OiAgICAgICAnbm9uZScsXG5cdFx0dXNlclNlbGVjdDogICAgICAgICAnbm9uZScsXG5cblx0fSxcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gTGlnaHRib3g7XG4iXX0=
