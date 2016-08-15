require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _componentsGallery = require('./components/Gallery');

var _componentsGallery2 = _interopRequireDefault(_componentsGallery);

function capitalizeFirstLetter(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

var IMAGE_NAMES = ['cat', 'cats', 'chameleon', 'dog', 'ducks', 'goat', 'ostrich', 'pigeon', 'pigs', 'seagulls', 'wasp', 'yawn'];
var IMAGE_MAP = IMAGE_NAMES.map(function (img) {
	return {
		src: './images/800-' + img + '.jpg',
		thumbnail: './images/thumbnail-' + img + '.jpg',
		srcset: ['./images/1024-' + img + '.jpg 1024w', './images/800-' + img + '.jpg 800w', './images/500-' + img + '.jpg 500w', './images/320-' + img + '.jpg 320w'],
		caption: capitalizeFirstLetter(img)
	};
});

(0, _reactDom.render)(_react2['default'].createElement(
	'div',
	null,
	_react2['default'].createElement(
		'p',
		{ style: { marginBottom: 40 } },
		'Use your keyboard to navigate ',
		_react2['default'].createElement(
			'kbd',
			null,
			'left'
		),
		' ',
		_react2['default'].createElement(
			'kbd',
			null,
			'right'
		),
		' ',
		_react2['default'].createElement(
			'kbd',
			null,
			'esc'
		),
		' — Also, try resizing your browser window.'
	),
	_react2['default'].createElement(_componentsGallery2['default'], { images: IMAGE_MAP }),
	_react2['default'].createElement(
		'p',
		null,
		'Images courtesy of ',
		_react2['default'].createElement(
			'a',
			{ href: 'http://gratisography.com/', target: '_blank' },
			'Gratisography'
		)
	)
), document.getElementById('example'));

},{"./components/Gallery":4,"react":undefined,"react-dom":undefined}],2:[function(require,module,exports){
'use strict';

module.exports = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 24 30" enable-background="new 0 0 24 24" xml:space="preserve">' + '<g>' + '<polygon fill="white" points="19,14 19,18 5,18 5,14 2,14 2,18 2,22 5,22 19,22 22,22 22,18 22,14  "/>' + '<polygon fill="white" points="15,9.9 15,2 9,2 9,9.9 5.8,9.9 12,16.1 18.2,9.9  "/>' + '</g>' + '</svg>';

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _icon = require('./icon');

var _icon2 = _interopRequireDefault(_icon);

var DownloadButton = (function (_Component) {
    _inherits(DownloadButton, _Component);

    function DownloadButton() {
        _classCallCheck(this, DownloadButton);

        _get(Object.getPrototypeOf(DownloadButton.prototype), 'constructor', this).call(this);
    }

    _createClass(DownloadButton, [{
        key: 'render',
        value: function render() {
            return _react2['default'].createElement(
                'button',
                {
                    title: 'Download',
                    style: {
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        float: 'left',
                        height: 40,
                        outline: 'none',
                        padding: 10,
                        position: 'relative',
                        left: -10,
                        top: 0,
                        verticalAlign: 'bottom',
                        width: 40
                    },
                    onClick: this.props.handler
                },
                _react2['default'].createElement('span', {
                    dangerouslySetInnerHTML: { __html: _icon2['default'] }
                })
            );
        }
    }]);

    return DownloadButton;
})(_react.Component);

exports['default'] = DownloadButton;
module.exports = exports['default'];

},{"./icon":2,"react":undefined}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactImages = require('react-images');

var _reactImages2 = _interopRequireDefault(_reactImages);

var _DownloadButton = require('./DownloadButton');

var _DownloadButton2 = _interopRequireDefault(_DownloadButton);

var Gallery = (function (_Component) {
	_inherits(Gallery, _Component);

	function Gallery() {
		_classCallCheck(this, Gallery);

		_get(Object.getPrototypeOf(Gallery.prototype), 'constructor', this).call(this);

		this.state = {
			lightboxIsOpen: false,
			currentImage: 0
		};

		this.closeLightbox = this.closeLightbox.bind(this);
		this.gotoNext = this.gotoNext.bind(this);
		this.gotoPrevious = this.gotoPrevious.bind(this);
		this.handleClickImage = this.handleClickImage.bind(this);
		this.openLightbox = this.openLightbox.bind(this);
	}

	_createClass(Gallery, [{
		key: 'openLightbox',
		value: function openLightbox(index, event) {
			event.preventDefault();
			this.setState({
				currentImage: index,
				lightboxIsOpen: true
			});
		}
	}, {
		key: 'closeLightbox',
		value: function closeLightbox() {
			this.setState({
				currentImage: 0,
				lightboxIsOpen: false
			});
		}
	}, {
		key: 'gotoPrevious',
		value: function gotoPrevious() {
			this.setState({
				currentImage: this.state.currentImage - 1
			});
		}
	}, {
		key: 'gotoNext',
		value: function gotoNext() {
			this.setState({
				currentImage: this.state.currentImage + 1
			});
		}
	}, {
		key: 'handleClickImage',
		value: function handleClickImage() {
			if (this.state.currentImage === this.props.images.length - 1) return;

			this.gotoNext();
		}
	}, {
		key: 'renderGallery',
		value: function renderGallery() {
			var _this = this;

			if (!this.props.images) return;
			var gallery = this.props.images.map(function (obj, i) {
				return _react2['default'].createElement(
					'a',
					{
						href: obj.src,
						key: i,
						onClick: function (e) {
							return _this.openLightbox(i, e);
						},
						style: styles.thumbnail
					},
					_react2['default'].createElement('img', {
						height: styles.thumbnail.size,
						src: obj.thumbnail,
						style: styles.thumbnailImage,
						width: styles.thumbnail.size
					})
				);
			});

			return _react2['default'].createElement(
				'div',
				{ style: styles.gallery },
				gallery
			);
		}
	}, {
		key: 'handleDownload',
		value: function handleDownload() {
			window.open(this.props.images[this.state.currentImage].src);
		}
	}, {
		key: 'render',
		value: function render() {
			var customControls = [_react2['default'].createElement(_DownloadButton2['default'], { key: 'Download', handler: this.handleDownload.bind(this) })];
			return _react2['default'].createElement(
				'div',
				{ className: 'section' },
				this.props.heading && _react2['default'].createElement(
					'h2',
					null,
					this.props.heading
				),
				this.props.subheading && _react2['default'].createElement(
					'p',
					null,
					this.props.subheading
				),
				this.renderGallery(),
				_react2['default'].createElement(_reactImages2['default'], {
					currentImage: this.state.currentImage,
					customControls: customControls,
					images: this.props.images,
					isOpen: this.state.lightboxIsOpen,
					onClickPrev: this.gotoPrevious,
					onClickNext: this.gotoNext,
					onClickImage: this.handleClickImage,
					onClose: this.closeLightbox,
					theme: this.props.theme
				})
			);
		}
	}]);

	return Gallery;
})(_react.Component);

;

Gallery.displayName = 'Gallery';
Gallery.propTypes = {
	heading: _react.PropTypes.string,
	images: _react.PropTypes.array,
	sepia: _react.PropTypes.bool,
	subheading: _react.PropTypes.string
};

var THUMBNAIL_SIZE = 72;

var styles = {
	gallery: {
		marginLeft: -5,
		marginRight: -5,
		overflow: 'hidden'
	},
	thumbnail: {
		backgroundSize: 'cover',
		borderRadius: 3,
		float: 'left',
		height: THUMBNAIL_SIZE,
		margin: 5,
		overflow: 'hidden',
		width: THUMBNAIL_SIZE
	},
	thumbnailImage: {
		display: 'block',
		height: 'auto',
		maxWidth: '100%'
	}
};

// height: THUMBNAIL_SIZE,
// left: '50%',
// position: 'relative',
//
// WebkitTransform: 'translateX(-50%)',
// MozTransform:    'translateX(-50%)',
// msTransform:     'translateX(-50%)',
// transform:       'translateX(-50%)',
exports['default'] = Gallery;
module.exports = exports['default'];

},{"./DownloadButton":3,"react":undefined,"react-images":undefined}]},{},[1]);
