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

},{"./DownloadButton":3,"react":undefined,"react-images":undefined}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZ3BvdGRldmluL3dlYi90aGlyZHBhcnR5L3JlYWN0LWltYWdlcy9leGFtcGxlcy9zcmMvYXBwLmpzIiwiL1VzZXJzL2dwb3RkZXZpbi93ZWIvdGhpcmRwYXJ0eS9yZWFjdC1pbWFnZXMvZXhhbXBsZXMvc3JjL2NvbXBvbmVudHMvRG93bmxvYWRCdXR0b24vaWNvbi5qcyIsIi9Vc2Vycy9ncG90ZGV2aW4vd2ViL3RoaXJkcGFydHkvcmVhY3QtaW1hZ2VzL2V4YW1wbGVzL3NyYy9jb21wb25lbnRzL0Rvd25sb2FkQnV0dG9uL2luZGV4LmpzIiwiL1VzZXJzL2dwb3RkZXZpbi93ZWIvdGhpcmRwYXJ0eS9yZWFjdC1pbWFnZXMvZXhhbXBsZXMvc3JjL2NvbXBvbmVudHMvR2FsbGVyeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7cUJDQWtCLE9BQU87Ozs7d0JBQ0YsV0FBVzs7aUNBQ2Qsc0JBQXNCOzs7O0FBRTFDLFNBQVMscUJBQXFCLENBQUUsR0FBRyxFQUFFO0FBQ3BDLFFBQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ2xEOztBQUVELElBQU0sV0FBVyxHQUFHLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNsSSxJQUFNLFNBQVMsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLFVBQUEsR0FBRztRQUFLO0FBQ3pDLEtBQUcsb0JBQWtCLEdBQUcsU0FBTTtBQUM5QixXQUFTLDBCQUF3QixHQUFHLFNBQU07QUFDMUMsUUFBTSxFQUFFLG9CQUNVLEdB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QztBQUMvQixnQkFBVyxFQUFFLElBQUksQ0FBQyxRQUFRLEFBQUM7QUFDM0IsaUJBQVksRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEFBQUM7QUFDcEMsWUFBTyxFQUFFLElBQUksQ0FBQyxhQUFhLEFBQUM7QUFDNUIsVUFBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxBQUFDO01BQ3ZCO0lBQ0csQ0FDTDtHQUNGOzs7UUE5RkksT0FBTzs7O0FBK0ZaLENBQUM7O0FBRUYsT0FBTyxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7QUFDaEMsT0FBTyxDQUFDLFNBQVMsR0FBRztBQUNuQixRQUFPLEVBQUUsaUJBQVUsTUFBTTtBQUN6QixPQUFNLEVBQUUsaUJBQVUsS0FBSztBQUN2QixNQUFLLEVBQUUsaUJBQVUsSUFBSTtBQUNyQixXQUFVLEVBQUUsaUJBQVUsTUFBTTtDQUM1QixDQUFDOztBQUVGLElBQU0sY0FBYyxHQUFHLEVBQUUsQ0FBQzs7QUFFMUIsSUFBTSxNQUFNLEdBQUc7QUFDZCxRQUFPLEVBQUU7QUFDUixZQUFVLEVBQUUsQ0FBQyxDQUFDO0FBQ2QsYUFBVyxFQUFFLENBQUMsQ0FBQztBQUNmLFVBQVEsRUFBRSxRQUFRO0VBQ2xCO0FBQ0QsVUFBUyxFQUFFO0FBQ1YsZ0JBQWMsRUFBRSxPQUFPO0FBQ3ZCLGNBQVksRUFBRSxDQUFDO0FBQ2YsT0FBSyxFQUFFLE1BQU07QUFDYixRQUFNLEVBQUUsY0FBYztBQUN0QixRQUFNLEVBQUUsQ0FBQztBQUNULFVBQVEsRUFBRSxRQUFRO0FBQ2xCLE9BQUssRUFBRSxjQUFjO0VBQ3JCO0FBQ0QsZUFBYyxFQUFFO0FBQ2YsU0FBTyxFQUFFLE9BQU87QUFDaEIsUUFBTSxFQUFFLE1BQU07QUFDZCxVQUFRLEVBQUUsTUFBTTtFQVNoQjtDQUNELENBQUM7Ozs7Ozs7Ozs7cUJBRWEsT0FBTyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBHYWxsZXJ5IGZyb20gJy4vY29tcG9uZW50cy9HYWxsZXJ5JztcblxuZnVuY3Rpb24gY2FwaXRhbGl6ZUZpcnN0TGV0dGVyIChzdHIpIHtcblx0cmV0dXJuIHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKTtcbn1cblxuY29uc3QgSU1BR0VfTkFNRVMgPSBbJ2NhdCcsICdjYXRzJywgJ2NoYW1lbGVvbicsICdkb2cnLCAnZHVja3MnLCAnZ29hdCcsICdvc3RyaWNoJywgJ3BpZ2VvbicsICdwaWdzJywgJ3NlYWd1bGxzJywgJ3dhc3AnLCAneWF3biddO1xuY29uc3QgSU1BR0VfTUFQID0gSU1BR0VfTkFNRVMubWFwKGltZyA9PiAoe1xuXHRzcmM6IGAuL2ltYWdlcy84MDAtJHtpbWd9LmpwZ2AsXG5cdHRodW1ibmFpbDogYC4vaW1hZ2VzL3RodW1ibmFpbC0ke2ltZ30uanBnYCxcblx0c3Jjc2V0OiBbXG5cdFx0YC4vaW1hZ2VzLzEwMjQtJHtpbWd9LmpwZyAxMDI0d2AsXG5cdFx0YC4vaW1hZ2VzLzgwMC0ke2ltZ30uanBnIDgwMHdgLFxuXHRcdGAuL2ltYWdlcy81MDAtJHtpbWd9LmpwZyA1MDB3YCxcblx0XHRgLi9pbWFnZXMvMzIwLSR7aW1nfS5qcGcgMzIwd2AsXG5cdF0sXG5cdGNhcHRpb246IGNhcGl0YWxpemVGaXJzdExldHRlcihpbWcpLFxufSkpO1xuXG5yZW5kZXIoXG5cdDxkaXY+XG5cdFx0PHAgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiA0MCB9fT5Vc2UgeW91ciBrZXlib2FyZCB0byBuYXZpZ2F0ZSA8a2JkPmxlZnQ8L2tiZD4gPGtiZD5yaWdodDwva2JkPiA8a2JkPmVzYzwva2JkPiAmbWRhc2g7IEFsc28sIHRyeSByZXNpemluZyB5b3VyIGJyb3dzZXIgd2luZG93LjwvcD5cblx0XHQ8R2FsbGVyeSBpbWFnZXM9e0lNQUdFX01BUH0gLz5cblx0XHQ8cD5JbWFnZXMgY291cnRlc3kgb2YgPGEgaHJlZj1cImh0dHA6Ly9ncmF0aXNvZ3JhcGh5LmNvbS9cIiB0YXJnZXQ9XCJfYmxhbmtcIj5HcmF0aXNvZ3JhcGh5PC9hPjwvcD5cblx0PC9kaXY+LFxuXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXhhbXBsZScpXG4pO1xuIiwibW9kdWxlLmV4cG9ydHMgPSAoXG4gICAgJzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHZlcnNpb249XCIxLjFcIiB4PVwiMHB4XCIgeT1cIjBweFwiIHZpZXdCb3g9XCIwIDAgMjQgMzBcIiBlbmFibGUtYmFja2dyb3VuZD1cIm5ldyAwIDAgMjQgMjRcIiB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiPidcbiAgICAgICAgKyAnPGc+J1xuICAgICAgICAgICAgKyAnPHBvbHlnb24gZmlsbD1cIndoaXRlXCIgcG9pbnRzPVwiMTksMTQgMTksMTggNSwxOCA1LDE0IDIsMTQgMiwxOCAyLDIyIDUsMjIgMTksMjIgMjIsMjIgMjIsMTggMjIsMTQgIFwiLz4nXG4gICAgICAgICAgICArICc8cG9seWdvbiBmaWxsPVwid2hpdGVcIiBwb2ludHM9XCIxNSw5LjkgMTUsMiA5LDIgOSw5LjkgNS44LDkuOSAxMiwxNi4xIDE4LjIsOS45ICBcIi8+J1xuICAgICAgICArICc8L2c+J1xuICAgICsgJzwvc3ZnPidcbik7XG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgRG93bmxvYWRJY29uIGZyb20gJy4vaWNvbic7XG5cbmNsYXNzIERvd25sb2FkQnV0dG9uIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuICAgIHJlbmRlciAoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdGl0bGU9XCJEb3dubG9hZFwiXG4gICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJ25vbmUnLFxuICAgICAgICAgICAgICAgICAgICBib3JkZXI6ICdub25lJyxcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiAncG9pbnRlcicsXG4gICAgICAgICAgICAgICAgICAgIGZsb2F0OiAnbGVmdCcsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogNDAsXG4gICAgICAgICAgICAgICAgICAgIG91dGxpbmU6ICdub25lJyxcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogMTAsXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiAtMTAsXG4gICAgICAgICAgICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICAgICAgICAgICAgdmVydGljYWxBbGlnbjogJ2JvdHRvbScsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA0MCxcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMuaGFuZGxlcn1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICBkYW5nZXJvdXNseVNldElubmVySFRNTD17eyBfX2h0bWw6IERvd25sb2FkSWNvbiB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgKVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRG93bmxvYWRCdXR0b247XG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgTGlnaHRib3ggZnJvbSAncmVhY3QtaW1hZ2VzJztcbmltcG9ydCBEb3dubG9hZEJ1dHRvbiBmcm9tICcuL0Rvd25sb2FkQnV0dG9uJztcblxuY2xhc3MgR2FsbGVyeSBleHRlbmRzIENvbXBvbmVudCB7XG5cdGNvbnN0cnVjdG9yICgpIHtcblx0XHRzdXBlcigpO1xuXG5cdFx0dGhpcy5zdGF0ZSA9IHtcblx0XHRcdGxpZ2h0Ym94SXNPcGVuOiBmYWxzZSxcblx0XHRcdGN1cnJlbnRJbWFnZTogMCxcblx0XHR9O1xuXG5cdFx0dGhpcy5jbG9zZUxpZ2h0Ym94ID0gdGhpcy5jbG9zZUxpZ2h0Ym94LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5nb3RvTmV4dCA9IHRoaXMuZ290b05leHQuYmluZCh0aGlzKTtcblx0XHR0aGlzLmdvdG9QcmV2aW91cyA9IHRoaXMuZ290b1ByZXZpb3VzLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5oYW5kbGVDbGlja0ltYWdlID0gdGhpcy5oYW5kbGVDbGlja0ltYWdlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5vcGVuTGlnaHRib3ggPSB0aGlzLm9wZW5MaWdodGJveC5iaW5kKHRoaXMpO1xuXHR9XG5cdG9wZW5MaWdodGJveCAoaW5kZXgsIGV2ZW50KSB7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGN1cnJlbnRJbWFnZTogaW5kZXgsXG5cdFx0XHRsaWdodGJveElzT3BlbjogdHJ1ZSxcblx0XHR9KTtcblx0fVxuXHRjbG9zZUxpZ2h0Ym94ICgpIHtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGN1cnJlbnRJbWFnZTogMCxcblx0XHRcdGxpZ2h0Ym94SXNPcGVuOiBmYWxzZSxcblx0XHR9KTtcblx0fVxuXHRnb3RvUHJldmlvdXMgKCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0Y3VycmVudEltYWdlOiB0aGlzLnN0YXRlLmN1cnJlbnRJbWFnZSAtIDEsXG5cdFx0fSk7XG5cdH1cblx0Z290b05leHQgKCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0Y3VycmVudEltYWdlOiB0aGlzLnN0YXRlLmN1cnJlbnRJbWFnZSArIDEsXG5cdFx0fSk7XG5cdH1cblx0aGFuZGxlQ2xpY2tJbWFnZSAoKSB7XG5cdFx0aWYgKHRoaXMuc3RhdGUuY3VycmVudEltYWdlID09PSB0aGlzLnByb3BzLmltYWdlcy5sZW5ndGggLSAxKSByZXR1cm47XG5cblx0XHR0aGlzLmdvdG9OZXh0KCk7XG5cdH1cblx0cmVuZGVyR2FsbGVyeSAoKSB7XG5cdFx0aWYgKCF0aGlzLnByb3BzLmltYWdlcykgcmV0dXJuO1xuXHRcdGNvbnN0IGdhbGxlcnkgPSB0aGlzLnByb3BzLmltYWdlcy5tYXAoKG9iaiwgaSkgPT4ge1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PGFcblx0XHRcdFx0XHRocmVmPXtvYmouc3JjfVxuXHRcdFx0XHRcdGtleT17aX1cblx0XHRcdFx0XHRvbkNsaWNrPXsoZSkgPT4gdGhpcy5vcGVuTGlnaHRib3goaSwgZSl9XG5cdFx0XHRcdFx0c3R5bGU9e3N0eWxlcy50aHVtYm5haWx9XG5cdFx0XHRcdFx0PlxuXHRcdFx0XHRcdDxpbWdcblx0XHRcdFx0XHRcdGhlaWdodD17c3R5bGVzLnRodW1ibmFpbC5zaXplfVxuXHRcdFx0XHRcdFx0c3JjPXtvYmoudGh1bWJuYWlsfVxuXHRcdFx0XHRcdFx0c3R5bGU9e3N0eWxlcy50aHVtYm5haWxJbWFnZX1cblx0XHRcdFx0XHRcdHdpZHRoPXtzdHlsZXMudGh1bWJuYWlsLnNpemV9XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0PC9hPlxuXHRcdFx0KTtcblx0XHR9KTtcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IHN0eWxlPXtzdHlsZXMuZ2FsbGVyeX0+XG5cdFx0XHRcdHtnYWxsZXJ5fVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxuXHRoYW5kbGVEb3dubG9hZCAoKSB7XG5cdFx0d2luZG93Lm9wZW4odGhpcy5wcm9wcy5pbWFnZXNbdGhpcy5zdGF0ZS5jdXJyZW50SW1hZ2VdLnNyYyk7XG5cdH1cblx0cmVuZGVyICgpIHtcblx0XHRsZXQgY3VzdG9tQ29udHJvbHMgPSBbXG5cdFx0XHQ8RG93bmxvYWRCdXR0b24ga2V5PVwiRG93bmxvYWRcIiBoYW5kbGVyPXt0aGlzLmhhbmRsZURvd25sb2FkLmJpbmQodGhpcyl9IC8+LFxuXHRcdF07XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwic2VjdGlvblwiPlxuXHRcdFx0XHR7dGhpcy5wcm9wcy5oZWFkaW5nICYmIDxoMj57dGhpcy5wcm9wcy5oZWFkaW5nfTwvaDI+fVxuXHRcdFx0XHR7dGhpcy5wcm9wcy5zdWJoZWFkaW5nICYmIDxwPnt0aGlzLnByb3BzLnN1YmhlYWRpbmd9PC9wPn1cblx0XHRcdFx0e3RoaXMucmVuZGVyR2FsbGVyeSgpfVxuXHRcdFx0XHQ8TGlnaHRib3hcblx0XHRcdFx0XHRjdXJyZW50SW1hZ2U9e3RoaXMuc3RhdGUuY3VycmVudEltYWdlfVxuXHRcdFx0XHRcdGN1c3RvbUNvbnRyb2xzPXtjdXN0b21Db250cm9sc31cblx0XHRcdFx0XHRpbWFnZXM9e3RoaXMucHJvcHMuaW1hZ2VzfVxuXHRcdFx0XHRcdGlzT3Blbj17dGhpcy5zdGF0ZS5saWdodGJveElzT3Blbn1cblx0XHRcdFx0XHRvbkNsaWNrUHJldj17dGhpcy5nb3RvUHJldmlvdXN9XG5cdFx0XHRcdFx0b25DbGlja05leHQ9e3RoaXMuZ290b05leHR9XG5cdFx0XHRcdFx0b25DbGlja0ltYWdlPXt0aGlzLmhhbmRsZUNsaWNrSW1hZ2V9XG5cdFx0XHRcdFx0b25DbG9zZT17dGhpcy5jbG9zZUxpZ2h0Ym94fVxuXHRcdFx0XHRcdHRoZW1lPXt0aGlzLnByb3BzLnRoZW1lfVxuXHRcdFx0XHQvPlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufTtcblxuR2FsbGVyeS5kaXNwbGF5TmFtZSA9ICdHYWxsZXJ5JztcbkdhbGxlcnkucHJvcFR5cGVzID0ge1xuXHRoZWFkaW5nOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRpbWFnZXM6IFByb3BUeXBlcy5hcnJheSxcblx0c2VwaWE6IFByb3BUeXBlcy5ib29sLFxuXHRzdWJoZWFkaW5nOiBQcm9wVHlwZXMuc3RyaW5nLFxufTtcblxuY29uc3QgVEhVTUJOQUlMX1NJWkUgPSA3MjtcblxuY29uc3Qgc3R5bGVzID0ge1xuXHRnYWxsZXJ5OiB7XG5cdFx0bWFyZ2luTGVmdDogLTUsXG5cdFx0bWFyZ2luUmlnaHQ6IC01LFxuXHRcdG92ZXJmbG93OiAnaGlkZGVuJyxcblx0fSxcblx0dGh1bWJuYWlsOiB7XG5cdFx0YmFja2dyb3VuZFNpemU6ICdjb3ZlcicsXG5cdFx0Ym9yZGVyUmFkaXVzOiAzLFxuXHRcdGZsb2F0OiAnbGVmdCcsXG5cdFx0aGVpZ2h0OiBUSFVNQk5BSUxfU0laRSxcblx0XHRtYXJnaW46IDUsXG5cdFx0b3ZlcmZsb3c6ICdoaWRkZW4nLFxuXHRcdHdpZHRoOiBUSFVNQk5BSUxfU0laRSxcblx0fSxcblx0dGh1bWJuYWlsSW1hZ2U6IHtcblx0XHRkaXNwbGF5OiAnYmxvY2snLFxuXHRcdGhlaWdodDogJ2F1dG8nLFxuXHRcdG1heFdpZHRoOiAnMTAwJScsXG5cdFx0Ly8gaGVpZ2h0OiBUSFVNQk5BSUxfU0laRSxcblx0XHQvLyBsZWZ0OiAnNTAlJyxcblx0XHQvLyBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcblx0XHQvL1xuXHRcdC8vIFdlYmtpdFRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoLTUwJSknLFxuXHRcdC8vIE1velRyYW5zZm9ybTogICAgJ3RyYW5zbGF0ZVgoLTUwJSknLFxuXHRcdC8vIG1zVHJhbnNmb3JtOiAgICAgJ3RyYW5zbGF0ZVgoLTUwJSknLFxuXHRcdC8vIHRyYW5zZm9ybTogICAgICAgJ3RyYW5zbGF0ZVgoLTUwJSknLFxuXHR9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgR2FsbGVyeTtcbiJdfQ==
