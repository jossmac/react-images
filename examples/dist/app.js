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
var IMAGES_PRELOAD = IMAGE_MAP.map(function (img) {
	return _react2['default'].createElement('img', { key: img.caption, src: './images/1024-' + img + '.jpg' });
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
	),
	_react2['default'].createElement(
		'div',
		{ style: { display: 'none' } },
		IMAGES_PRELOAD
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvam9zcy9EZXZlbG9wbWVudC9wYWNrYWdlcy9yZWFjdC9pbWFnZXMvZXhhbXBsZXMvc3JjL2FwcC5qcyIsIi9Vc2Vycy9qb3NzL0RldmVsb3BtZW50L3BhY2thZ2VzL3JlYWN0L2ltYWdlcy9leGFtcGxlcy9zcmMvY29tcG9uZW50cy9Eb3dubG9hZEJ1dHRvbi9pY29uLmpzIiwiL1VzZXJzL2pvc3MvRGV2ZWxvcG1lbnQvcGFja2FnZXMvcmVhY3QvaW1hZ2VzL2V4YW1wbGVzL3NyYy9jb21wb25lbnRzL0Rvd25sb2FkQnV0dG9uL2luZGV4LmpzIiwiL1VzZXJzL2pvc3MvRGV2ZWxvcG1lbnQvcGFja2FnZXMvcmVhY3QvaW1hZ2VzL2V4YW1wbGVzL3NyYy9jb21wb25lbnRzL0dhbGxlcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O3FCQ0FrQixPQUFPOzs7O3dCQUNGLFdBQVc7O2lDQUNkLHNCQUFzQjs7OztBQUUxQyxTQUFTLHFCQUFxQixDQUFFLEdBQUcsRUFBRTtBQUNwQyxRQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUNsRDs7QUFFRCxJQUFNLFdBQVcsR0FBRyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDbEksSUFBTSxTQUFTLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxVQUFBLEdBQUc7UUFBSztBQUN6QyxLQUFHLG9CQUFrQixHQUFHLFNBQU07QUFDOUIsV0FBUywwQkFBd0IsR0FBRyxTQUFNO0FBQzFDLFFBQU0sRUFBRSxvQkFD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QixPQUFLLEVBQUUsY0FBYztFQUNyQjtBQUNELGVBQWMsRUFBRTtBQUNmLFNBQU8sRUFBRSxPQUFPO0FBQ2hCLFFBQU0sRUFBRSxNQUFNO0FBQ2QsVUFBUSxFQUFFLE1BQU07RUFTaEI7Q0FDRCxDQUFDOzs7Ozs7Ozs7O3FCQUVhLE9BQU8iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgR2FsbGVyeSBmcm9tICcuL2NvbXBvbmVudHMvR2FsbGVyeSc7XG5cbmZ1bmN0aW9uIGNhcGl0YWxpemVGaXJzdExldHRlciAoc3RyKSB7XG5cdHJldHVybiBzdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSk7XG59XG5cbmNvbnN0IElNQUdFX05BTUVTID0gWydjYXQnLCAnY2F0cycsICdjaGFtZWxlb24nLCAnZG9nJywgJ2R1Y2tzJywgJ2dvYXQnLCAnb3N0cmljaCcsICdwaWdlb24nLCAncGlncycsICdzZWFndWxscycsICd3YXNwJywgJ3lhd24nXTtcbmNvbnN0IElNQUdFX01BUCA9IElNQUdFX05BTUVTLm1hcChpbWcgPT4gKHtcblx0c3JjOiBgLi9pbWFnZXMvODAwLSR7aW1nfS5qcGdgLFxuXHR0aHVtYm5haWw6IGAuL2ltYWdlcy90aHVtYm5haWwtJHtpbWd9LmpwZ2AsXG5cdHNyY3NldDogW1xuXHRcdGAuL2ltYWdlcy8xMDI0LSR7aW1nfS5qcGcgMTAyNHdgLFxuXHRcdGAuL2ltYWdlcy84MDAtJHtpbWd9LmpwZyA4MDB3YCxcblx0XHRgLi9pbWFnZXMvNTAwLSR7aW1nfS5qcGcgNTAwd2AsXG5cdFx0YC4vaW1hZ2VzLzMyMC0ke2ltZ30uanBnIDMyMHdgLFxuXHRdLFxuXHRjYXB0aW9uOiBjYXBpdGFsaXplRmlyc3RMZXR0ZXIoaW1nKSxcbn0pKTtcbmNvbnN0IElNQUdFU19QUkVMT0FEID0gSU1BR0VfTUFQLm1hcChpbWcgPT4ge1xuXHRyZXR1cm4gPGltZyBrZXk9e2ltZy5jYXB0aW9ufSBzcmM9e2AuL2ltYWdlcy8xMDI0LSR7aW1nfS5qcGdgfSAvPjtcbn0pO1xuXG5yZW5kZXIoXG5cdDxkaXY+XG5cdFx0PHAgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiA0MCB9fT5Vc2UgeW91ciBrZXlib2FyZCB0byBuYXZpZ2F0ZSA8a2JkPmxlZnQ8L2tiZD4gPGtiZD5yaWdodDwva2JkPiA8a2JkPmVzYzwva2JkPiAmbWRhc2g7IEFsc28sIHRyeSByZXNpemluZyB5b3VyIGJyb3dzZXIgd2luZG93LjwvcD5cblx0XHQ8R2FsbGVyeSBpbWFnZXM9e0lNQUdFX01BUH0gLz5cblx0XHQ8cD5JbWFnZXMgY291cnRlc3kgb2YgPGEgaHJlZj1cImh0dHA6Ly9ncmF0aXNvZ3JhcGh5LmNvbS9cIiB0YXJnZXQ9XCJfYmxhbmtcIj5HcmF0aXNvZ3JhcGh5PC9hPjwvcD5cblx0XHQ8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdub25lJyB9fT57SU1BR0VTX1BSRUxPQUR9PC9kaXY+XG5cdDwvZGl2Pixcblx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2V4YW1wbGUnKVxuKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gKFxuICAgICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB2ZXJzaW9uPVwiMS4xXCIgeD1cIjBweFwiIHk9XCIwcHhcIiB2aWV3Qm94PVwiMCAwIDI0IDMwXCIgZW5hYmxlLWJhY2tncm91bmQ9XCJuZXcgMCAwIDI0IDI0XCIgeG1sOnNwYWNlPVwicHJlc2VydmVcIj4nXG4gICAgICAgICsgJzxnPidcbiAgICAgICAgICAgICsgJzxwb2x5Z29uIGZpbGw9XCJ3aGl0ZVwiIHBvaW50cz1cIjE5LDE0IDE5LDE4IDUsMTggNSwxNCAyLDE0IDIsMTggMiwyMiA1LDIyIDE5LDIyIDIyLDIyIDIyLDE4IDIyLDE0ICBcIi8+J1xuICAgICAgICAgICAgKyAnPHBvbHlnb24gZmlsbD1cIndoaXRlXCIgcG9pbnRzPVwiMTUsOS45IDE1LDIgOSwyIDksOS45IDUuOCw5LjkgMTIsMTYuMSAxOC4yLDkuOSAgXCIvPidcbiAgICAgICAgKyAnPC9nPidcbiAgICArICc8L3N2Zz4nXG4pO1xuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IERvd25sb2FkSWNvbiBmcm9tICcuL2ljb24nO1xuXG5jbGFzcyBEb3dubG9hZEJ1dHRvbiBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IgKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cbiAgICByZW5kZXIgKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHRpdGxlPVwiRG93bmxvYWRcIlxuICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICdub25lJyxcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgICAgIGN1cnNvcjogJ3BvaW50ZXInLFxuICAgICAgICAgICAgICAgICAgICBmbG9hdDogJ2xlZnQnLFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDQwLFxuICAgICAgICAgICAgICAgICAgICBvdXRsaW5lOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IDEwLFxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogLTEwLFxuICAgICAgICAgICAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgICAgICAgICAgIHZlcnRpY2FsQWxpZ246ICdib3R0b20nLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNDAsXG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnByb3BzLmhhbmRsZXJ9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3sgX19odG1sOiBEb3dubG9hZEljb24gfX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIClcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERvd25sb2FkQnV0dG9uO1xuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IExpZ2h0Ym94IGZyb20gJ3JlYWN0LWltYWdlcyc7XG5pbXBvcnQgRG93bmxvYWRCdXR0b24gZnJvbSAnLi9Eb3dubG9hZEJ1dHRvbic7XG5cbmNsYXNzIEdhbGxlcnkgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRjb25zdHJ1Y3RvciAoKSB7XG5cdFx0c3VwZXIoKTtcblxuXHRcdHRoaXMuc3RhdGUgPSB7XG5cdFx0XHRsaWdodGJveElzT3BlbjogZmFsc2UsXG5cdFx0XHRjdXJyZW50SW1hZ2U6IDAsXG5cdFx0fTtcblxuXHRcdHRoaXMuY2xvc2VMaWdodGJveCA9IHRoaXMuY2xvc2VMaWdodGJveC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZ290b05leHQgPSB0aGlzLmdvdG9OZXh0LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5nb3RvUHJldmlvdXMgPSB0aGlzLmdvdG9QcmV2aW91cy5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuaGFuZGxlQ2xpY2tJbWFnZSA9IHRoaXMuaGFuZGxlQ2xpY2tJbWFnZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMub3BlbkxpZ2h0Ym94ID0gdGhpcy5vcGVuTGlnaHRib3guYmluZCh0aGlzKTtcblx0fVxuXHRvcGVuTGlnaHRib3ggKGluZGV4LCBldmVudCkge1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRjdXJyZW50SW1hZ2U6IGluZGV4LFxuXHRcdFx0bGlnaHRib3hJc09wZW46IHRydWUsXG5cdFx0fSk7XG5cdH1cblx0Y2xvc2VMaWdodGJveCAoKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRjdXJyZW50SW1hZ2U6IDAsXG5cdFx0XHRsaWdodGJveElzT3BlbjogZmFsc2UsXG5cdFx0fSk7XG5cdH1cblx0Z290b1ByZXZpb3VzICgpIHtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGN1cnJlbnRJbWFnZTogdGhpcy5zdGF0ZS5jdXJyZW50SW1hZ2UgLSAxLFxuXHRcdH0pO1xuXHR9XG5cdGdvdG9OZXh0ICgpIHtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGN1cnJlbnRJbWFnZTogdGhpcy5zdGF0ZS5jdXJyZW50SW1hZ2UgKyAxLFxuXHRcdH0pO1xuXHR9XG5cdGhhbmRsZUNsaWNrSW1hZ2UgKCkge1xuXHRcdGlmICh0aGlzLnN0YXRlLmN1cnJlbnRJbWFnZSA9PT0gdGhpcy5wcm9wcy5pbWFnZXMubGVuZ3RoIC0gMSkgcmV0dXJuO1xuXG5cdFx0dGhpcy5nb3RvTmV4dCgpO1xuXHR9XG5cdHJlbmRlckdhbGxlcnkgKCkge1xuXHRcdGlmICghdGhpcy5wcm9wcy5pbWFnZXMpIHJldHVybjtcblx0XHRjb25zdCBnYWxsZXJ5ID0gdGhpcy5wcm9wcy5pbWFnZXMubWFwKChvYmosIGkpID0+IHtcblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxhXG5cdFx0XHRcdFx0aHJlZj17b2JqLnNyY31cblx0XHRcdFx0XHRrZXk9e2l9XG5cdFx0XHRcdFx0b25DbGljaz17KGUpID0+IHRoaXMub3BlbkxpZ2h0Ym94KGksIGUpfVxuXHRcdFx0XHRcdHN0eWxlPXtzdHlsZXMudGh1bWJuYWlsfVxuXHRcdFx0XHRcdD5cblx0XHRcdFx0XHQ8aW1nXG5cdFx0XHRcdFx0XHRoZWlnaHQ9e3N0eWxlcy50aHVtYm5haWwuc2l6ZX1cblx0XHRcdFx0XHRcdHNyYz17b2JqLnRodW1ibmFpbH1cblx0XHRcdFx0XHRcdHN0eWxlPXtzdHlsZXMudGh1bWJuYWlsSW1hZ2V9XG5cdFx0XHRcdFx0XHR3aWR0aD17c3R5bGVzLnRodW1ibmFpbC5zaXplfVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdDwvYT5cblx0XHRcdCk7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBzdHlsZT17c3R5bGVzLmdhbGxlcnl9PlxuXHRcdFx0XHR7Z2FsbGVyeX1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cblx0aGFuZGxlRG93bmxvYWQgKCkge1xuXHRcdHdpbmRvdy5vcGVuKHRoaXMucHJvcHMuaW1hZ2VzW3RoaXMuc3RhdGUuY3VycmVudEltYWdlXS5zcmMpO1xuXHR9XG5cdHJlbmRlciAoKSB7XG5cdFx0bGV0IGN1c3RvbUNvbnRyb2xzID0gW1xuXHRcdFx0PERvd25sb2FkQnV0dG9uIGtleT1cIkRvd25sb2FkXCIgaGFuZGxlcj17dGhpcy5oYW5kbGVEb3dubG9hZC5iaW5kKHRoaXMpfSAvPixcblx0XHRdO1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInNlY3Rpb25cIj5cblx0XHRcdFx0e3RoaXMucHJvcHMuaGVhZGluZyAmJiA8aDI+e3RoaXMucHJvcHMuaGVhZGluZ308L2gyPn1cblx0XHRcdFx0e3RoaXMucHJvcHMuc3ViaGVhZGluZyAmJiA8cD57dGhpcy5wcm9wcy5zdWJoZWFkaW5nfTwvcD59XG5cdFx0XHRcdHt0aGlzLnJlbmRlckdhbGxlcnkoKX1cblx0XHRcdFx0PExpZ2h0Ym94XG5cdFx0XHRcdFx0Y3VycmVudEltYWdlPXt0aGlzLnN0YXRlLmN1cnJlbnRJbWFnZX1cblx0XHRcdFx0XHRjdXN0b21Db250cm9scz17Y3VzdG9tQ29udHJvbHN9XG5cdFx0XHRcdFx0aW1hZ2VzPXt0aGlzLnByb3BzLmltYWdlc31cblx0XHRcdFx0XHRpc09wZW49e3RoaXMuc3RhdGUubGlnaHRib3hJc09wZW59XG5cdFx0XHRcdFx0b25DbGlja1ByZXY9e3RoaXMuZ290b1ByZXZpb3VzfVxuXHRcdFx0XHRcdG9uQ2xpY2tOZXh0PXt0aGlzLmdvdG9OZXh0fVxuXHRcdFx0XHRcdG9uQ2xpY2tJbWFnZT17dGhpcy5oYW5kbGVDbGlja0ltYWdlfVxuXHRcdFx0XHRcdG9uQ2xvc2U9e3RoaXMuY2xvc2VMaWdodGJveH1cblx0XHRcdFx0XHR0aGVtZT17dGhpcy5wcm9wcy50aGVtZX1cblx0XHRcdFx0Lz5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn07XG5cbkdhbGxlcnkuZGlzcGxheU5hbWUgPSAnR2FsbGVyeSc7XG5HYWxsZXJ5LnByb3BUeXBlcyA9IHtcblx0aGVhZGluZzogUHJvcFR5cGVzLnN0cmluZyxcblx0aW1hZ2VzOiBQcm9wVHlwZXMuYXJyYXksXG5cdHNlcGlhOiBQcm9wVHlwZXMuYm9vbCxcblx0c3ViaGVhZGluZzogUHJvcFR5cGVzLnN0cmluZyxcbn07XG5cbmNvbnN0IFRIVU1CTkFJTF9TSVpFID0gNzI7XG5cbmNvbnN0IHN0eWxlcyA9IHtcblx0Z2FsbGVyeToge1xuXHRcdG1hcmdpbkxlZnQ6IC01LFxuXHRcdG1hcmdpblJpZ2h0OiAtNSxcblx0XHRvdmVyZmxvdzogJ2hpZGRlbicsXG5cdH0sXG5cdHRodW1ibmFpbDoge1xuXHRcdGJhY2tncm91bmRTaXplOiAnY292ZXInLFxuXHRcdGJvcmRlclJhZGl1czogMyxcblx0XHRmbG9hdDogJ2xlZnQnLFxuXHRcdGhlaWdodDogVEhVTUJOQUlMX1NJWkUsXG5cdFx0bWFyZ2luOiA1LFxuXHRcdG92ZXJmbG93OiAnaGlkZGVuJyxcblx0XHR3aWR0aDogVEhVTUJOQUlMX1NJWkUsXG5cdH0sXG5cdHRodW1ibmFpbEltYWdlOiB7XG5cdFx0ZGlzcGxheTogJ2Jsb2NrJyxcblx0XHRoZWlnaHQ6ICdhdXRvJyxcblx0XHRtYXhXaWR0aDogJzEwMCUnLFxuXHRcdC8vIGhlaWdodDogVEhVTUJOQUlMX1NJWkUsXG5cdFx0Ly8gbGVmdDogJzUwJScsXG5cdFx0Ly8gcG9zaXRpb246ICdyZWxhdGl2ZScsXG5cdFx0Ly9cblx0XHQvLyBXZWJraXRUcmFuc2Zvcm06ICd0cmFuc2xhdGVYKC01MCUpJyxcblx0XHQvLyBNb3pUcmFuc2Zvcm06ICAgICd0cmFuc2xhdGVYKC01MCUpJyxcblx0XHQvLyBtc1RyYW5zZm9ybTogICAgICd0cmFuc2xhdGVYKC01MCUpJyxcblx0XHQvLyB0cmFuc2Zvcm06ICAgICAgICd0cmFuc2xhdGVYKC01MCUpJyxcblx0fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdhbGxlcnk7XG4iXX0=
