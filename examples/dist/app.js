require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _componentsGallery = require('./components/Gallery');

var _componentsGallery2 = _interopRequireDefault(_componentsGallery);

var _reactImages = require('react-images');

var _reactImages2 = _interopRequireDefault(_reactImages);

function makeUnsplashSrc(id) {
	return 'https://images.unsplash.com/photo-' + id + '?dpr=2&auto=format&w=1600&h=1600';
}
function makeUnsplashSrcSet(id, size) {
	return 'https://images.unsplash.com/photo-' + id + '?dpr=2&auto=format&w=' + size + ' ' + size + 'w';
}
function makeUnsplashThumbnail(id) {
	return 'https://images.unsplash.com/photo-' + id + '?dpr=2&auto=format&crop=entropy&fit=crop&w=100&h=100';
}

var IMAGE_NAMES = [{ id: '1471079502516-250c19af6928', caption: _react2['default'].createElement(
		'span',
		null,
		_react2['default'].createElement(
			'a',
			{ href: 'https://unsplash.com/photos/GIpGxe2_cT4', target: '_blank' },
			'Turtle'
		),
		', by Jeremy Bishop'
	) }, { id: '1455970022149-a8f26b6902dd', caption: _react2['default'].createElement(
		'span',
		null,
		_react2['default'].createElement(
			'a',
			{ href: 'https://unsplash.com/photos/a7bdqjeG6M4', target: '_blank' },
			'Cat'
		),
		', by Mona Magnussen'
	) }, { id: '1470317596697-cbdeda56f999', caption: _react2['default'].createElement(
		'span',
		null,
		_react2['default'].createElement(
			'a',
			{ href: 'https://unsplash.com/photos/XgF9e93Tkt0', target: '_blank' },
			'Ladybug'
		),
		', by Michel Bosma'
	) }, { id: '1454023492550-5696f8ff10e1', caption: _react2['default'].createElement(
		'span',
		null,
		_react2['default'].createElement(
			'a',
			{ href: 'https://unsplash.com/photos/LmVSKeDy6EA', target: '_blank' },
			'Tiger'
		),
		', by Jessica Weiller'
	) }, { id: '1470619549108-b85c56fe5be8', caption: _react2['default'].createElement(
		'span',
		null,
		_react2['default'].createElement(
			'a',
			{ href: 'https://unsplash.com/photos/SYzUF6XcWBY', target: '_blank' },
			'Flamingo'
		),
		', by Alan Emery'
	) }, { id: '1458167072153-a2eb76d67c1c', caption: _react2['default'].createElement(
		'span',
		null,
		_react2['default'].createElement(
			'a',
			{ href: 'https://unsplash.com/photos/I4AEXHh00uo', target: '_blank' },
			'Chimpanzee'
		),
		', by Liz Bridges'
	) }, { id: '1471101173712-b9884175254e', caption: _react2['default'].createElement(
		'span',
		null,
		_react2['default'].createElement(
			'a',
			{ href: 'https://unsplash.com/photos/5oRzZU5uwSM', target: '_blank' },
			'Dragonfly'
		),
		', by Pedro Lastra'
	) }, { id: '1471127432458-65206be149c9', caption: _react2['default'].createElement(
		'span',
		null,
		_react2['default'].createElement(
			'a',
			{ href: 'https://unsplash.com/photos/Kpgt4pl03O0', target: '_blank' },
			'Deer'
		),
		', by Ernesto Velázquez'
	) }, { id: '1470854989922-5be2f7456d78', caption: _react2['default'].createElement(
		'span',
		null,
		_react2['default'].createElement(
			'a',
			{ href: 'https://unsplash.com/photos/GXMr7BadXQo', target: '_blank' },
			'Hedgehog'
		),
		', by Piotr Łaskawski'
	) }, { id: '1470777639313-60af88918203', caption: _react2['default'].createElement(
		'span',
		null,
		_react2['default'].createElement(
			'a',
			{ href: 'https://unsplash.com/photos/GNUcUx-iObg', target: '_blank' },
			'Koala'
		),
		', by Cris Saur'
	) }, { id: '1453550486481-aa4175b013ea', caption: _react2['default'].createElement(
		'span',
		null,
		_react2['default'].createElement(
			'a',
			{ href: 'https://unsplash.com/photos/WiSeaZ4E6ZI', target: '_blank' },
			'Elephant'
		),
		', by Benjamin Pley'
	) }];
var IMAGE_MAP = IMAGE_NAMES.map(function (_ref) {
	var caption = _ref.caption;
	var id = _ref.id;
	return {
		src: makeUnsplashSrc(id),
		thumbnail: makeUnsplashThumbnail(id),
		srcset: [makeUnsplashSrcSet(id, 1024), makeUnsplashSrcSet(id, 800), makeUnsplashSrcSet(id, 500), makeUnsplashSrcSet(id, 320)],
		caption: caption
	};
});

(0, _reactDom.render)(_react2['default'].createElement(
	'div',
	null,
	_react2['default'].createElement(
		'h3',
		null,
		'Default options'
	),
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
			{ href: 'https://unsplash.com/', target: '_blank' },
			'Unsplash'
		)
	),
	_react2['default'].createElement(
		'h3',
		null,
		'Without thumbnails'
	),
	_react2['default'].createElement(
		'p',
		{ style: { marginBottom: 40 } },
		'Set ',
		_react2['default'].createElement(
			'code',
			null,
			"thumbnails={false}"
		),
		' to remove thumbnails'
	),
	_react2['default'].createElement(_componentsGallery2['default'], { images: IMAGE_MAP, thumbnails: false }),
	_react2['default'].createElement(
		'h3',
		null,
		'Paginated version'
	),
	_react2['default'].createElement(
		'p',
		{ style: { marginBottom: 40 } },
		'The ',
		_react2['default'].createElement(
			'code',
			null,
			'thumbnails'
		),
		' prop can actually take a component as value',
		_react2['default'].createElement('br', null),
		_react2['default'].createElement(
			'code',
			null,
			"thumbnails={Lightbox.Lightbox.PaginatedThumbnails}"
		)
	),
	_react2['default'].createElement(_componentsGallery2['default'], { images: IMAGE_MAP, thumbnails: _reactImages2['default'].PaginatedThumbnails }),
	_react2['default'].createElement(
		'p',
		{ style: { marginBottom: 20 } },
		'Note : PaginatedThumbnails has an offset prop to change the number of thumbnails to show around the current one.',
		_react2['default'].createElement('br', null),
		_react2['default'].createElement(
			'code',
			null,
			"<Lightbox thumbnails={(props) => <PaginatedThumbnails {...props} offset={5} />} />"
		)
	)
), document.getElementById('example'));

},{"./components/Gallery":4,"react":undefined,"react-dom":undefined,"react-images":undefined}],2:[function(require,module,exports){
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
		this.gotoImage = this.gotoImage.bind(this);
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
		key: 'gotoImage',
		value: function gotoImage(index) {
			this.setState({
				currentImage: index
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
			var thumbnails = this.props.thumbnails;

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
					onClickThumbnail: this.gotoImage,
					onClickImage: this.handleClickImage,
					onClose: this.closeLightbox,
					theme: this.props.theme,
					thumbnails: thumbnails
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvam9zcy9EZXZlbG9wbWVudC9wYWNrYWdlcy9yZWFjdC9pbWFnZXMvZXhhbXBsZXMvc3JjL2FwcC5qcyIsIi9Vc2Vycy9qb3NzL0RldmVsb3BtZW50L3BhY2thZ2VzL3JlYWN0L2ltYWdlcy9leGFtcGxlcy9zcmMvY29tcG9uZW50cy9Eb3dubG9hZEJ1dHRvbi9pY29uLmpzIiwiL1VzZXJzL2pvc3MvRGV2ZWxvcG1lbnQvcGFja2FnZXMvcmVhY3QvaW1hZ2VzL2V4YW1wbGVzL3NyYy9jb21wb25lbnRzL0Rvd25sb2FkQnV0dG9uL2luZGV4LmpzIiwiL1VzZXJzL2pvc3MvRGV2ZWxvcG1lbnQvcGFja2FnZXMvcmVhY3QvaW1hZ2VzL2V4YW1wbGVzL3NyYy9jb21wb25lbnRzL0dhbGxlcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O3FCQ0FrQixPQUFPOzs7O3dCQUNGLFdBQVc7O2lDQUNkLHNCQUFzQjs7OzsyQkFDckIsY0FBYzs7OztBQUVuQyxTQUFTLGVBQWUsQ0FBRSxFQUFFLEVBQUU7QUFDN0IsK0NBQTRDLEVBQUUsc0NBQW1DO0NBQ2pGO0FBQ0QsU0FBUyxrQkFBa0IsQ0FBRSxFQUFFLEVBQUUsSUFBSSxFQUFFO0FBQ3RDLCtDQUE0QyxFQUFFLDZCQUF3QixJQUFJLFNBQUksSUFBSSxPQUFJO0NBQ3RGO0FBQ0QsU0FBUyxxQkFBcUIsQ0FBRSxFQUFFLEVBQUU7QUFDbkMsK0NBQTRDLEVBQUUsMERBQXVEO0NBQ3JHOztBQUVELElBQU0sV0FBVyxHQUFHLENBQ25CLEVBQUUsRUFBRSxFQUFFLDRCQUE0QixFQUFFLE9BQU8sRUFBRTs7O0VBQU07O0tBQUcsSUFBSSxFQUFDLHlDQUF5QyxFQUFDLE1BQU0sRUFBQyxRQUFROztHQUFXOztFQUF5QixFQUFFLEVBQzFKLEVBQUUsRUFBRSxFQUFFLDRCQUE0QixFQUFFLE9BQU8sRUFBRTs7O0VBQU07O0tBQUcsSUFBSSxFQUFDLHlDQUF5QyxFQUFDLE1BQU0sRUFBQyxRQUFROztHQUFROztFQUEwQixFQUFFLEVBQ3hKLEVBQUUsRUFBRSxFQUFFLDRCQUE0QixFQUFFLE9BQU8sRUFBRTs7O0VBQU07O0tBQUcsSUFBSSxFQUFDLHlDQUF5QyxFQUFDLE1BQU0sRUFBQyxRQUFROztHQUFZOztFQUF3QixFQUFFLEVBQzFKLEVBQUUsRUFBRSxFQUFFLDRCQUE0QixFQUFFLE9BQU8sRUFBRTs7O0VBQU07O0tBQUcsSUFBSSxFQUFDLHlDQUF5QyxFQUFDLE1BQU0sRUFBQyxRQUFROztHQUFVOztFQUEyQixFQUFFLEVBQzNKLEVBQUUsRUFBRSxFQUFFLDRCQUE0QixFQUFFLE9BQU8sRUFBRTs7O0VBQU07O0tBQUcsSUFBSSxFQUFDLHlDQUF5QyxFQUFDLE1BQU0sRUFBQyxRQUFROztHQUFhOztFQUFzQixFQUFFLEVBQ3pKLEVBQUUsRUFBRSxFQUFFLDRCQUE0QixFQUFFLE9BQU8sRUFBRTs7O0VBQU07O0tBQUcsSUFBSSxFQUFDLHlDQUF5QyxFQUFDLE1BQU0sRUFBQyxRQUFROztHQUFlOztFQUF1QixFQUFFLEVBQzVKLEVBQUUsRUFBRSxFQUFFLDRCQUE0QixFQUFFLE9BQU8sRUFBRTs7O0VBQU07O0tBQUcsSUFBSSxFQUFDLHlDQUF5QyxFQUFDLE1BQU0sRUFBQyxRQUFROztHQUFjOztFQUF3QixFQUFFLEVBQzVKLEVBQUUsRUFBRSxFQUFFLDRCQUE0QixFQUFFLE9BQU8sRUFBRTs7O0VBQU07O0tBQUcsSUFBSSxFQUFDLHlDQUF5QyxFQUFDLE1BQU0sRUFBQyxRQUFROztHQUFTOztFQUE2QixFQUFFLEVBQzVKLEVBQUUsRUFBRSxFQUFFLDRCQUE0QixFQUFFLE9BQU8sRUFBRTs7O0VBQU07O0tBQUcsSUFBSSxFQUFDLHlDQUF5QyxFQUFDLE1BQU0sRUFBQyxRQUFROztHQUFhOztFQUEyQixFQUFFLEVBQzlKLEVBQUUsRUFBRSxFQUFFLDRCQUE0QixFQUFFLE9BQU8sRUFBRTs7O0VBQU07O0tBQUcsSUFBSSxFQUFD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QUssRUFBRSxNQUFNO0FBQ2IsUUFBTSxFQUFFLGNBQWM7QUFDdEIsUUFBTSxFQUFFLENBQUM7QUFDVCxVQUFRLEVBQUUsUUFBUTtBQUNsQixPQUFLLEVBQUUsY0FBYztFQUNyQjtBQUNELGVBQWMsRUFBRTtBQUNmLFNBQU8sRUFBRSxPQUFPO0FBQ2hCLFFBQU0sRUFBRSxNQUFNO0FBQ2QsVUFBUSxFQUFFLE1BQU07RUFTaEI7Q0FDRCxDQUFDOzs7Ozs7Ozs7O3FCQUVhLE9BQU8iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgR2FsbGVyeSBmcm9tICcuL2NvbXBvbmVudHMvR2FsbGVyeSc7XG5pbXBvcnQgTGlnaHRib3ggZnJvbSAncmVhY3QtaW1hZ2VzJztcblxuZnVuY3Rpb24gbWFrZVVuc3BsYXNoU3JjIChpZCkge1xuXHRyZXR1cm4gYGh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0ke2lkfT9kcHI9MiZhdXRvPWZvcm1hdCZ3PTE2MDAmaD0xNjAwYDtcbn1cbmZ1bmN0aW9uIG1ha2VVbnNwbGFzaFNyY1NldCAoaWQsIHNpemUpIHtcblx0cmV0dXJuIGBodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tJHtpZH0/ZHByPTImYXV0bz1mb3JtYXQmdz0ke3NpemV9ICR7c2l6ZX13YDtcbn1cbmZ1bmN0aW9uIG1ha2VVbnNwbGFzaFRodW1ibmFpbCAoaWQpIHtcblx0cmV0dXJuIGBodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tJHtpZH0/ZHByPTImYXV0bz1mb3JtYXQmY3JvcD1lbnRyb3B5JmZpdD1jcm9wJnc9MTAwJmg9MTAwYDtcbn1cblxuY29uc3QgSU1BR0VfTkFNRVMgPSBbXG5cdHsgaWQ6ICcxNDcxMDc5NTAyNTE2LTI1MGMxOWFmNjkyOCcsIGNhcHRpb246IDxzcGFuPjxhIGhyZWY9XCJodHRwczovL3Vuc3BsYXNoLmNvbS9waG90b3MvR0lwR3hlMl9jVDRcIiB0YXJnZXQ9XCJfYmxhbmtcIj5UdXJ0bGU8L2E+LCBieSBKZXJlbXkgQmlzaG9wPC9zcGFuPiB9LFxuXHR7IGlkOiAnMTQ1NTk3MDAyMjE0OS1hOGYyNmI2OTAyZGQnLCBjYXB0aW9uOiA8c3Bhbj48YSBocmVmPVwiaHR0cHM6Ly91bnNwbGFzaC5jb20vcGhvdG9zL2E3YmRxamVHNk00XCIgdGFyZ2V0PVwiX2JsYW5rXCI+Q2F0PC9hPiwgYnkgTW9uYSBNYWdudXNzZW48L3NwYW4+IH0sXG5cdHsgaWQ6ICcxNDcwMzE3NTk2Njk3LWNiZGVkYTU2Zjk5OScsIGNhcHRpb246IDxzcGFuPjxhIGhyZWY9XCJodHRwczovL3Vuc3BsYXNoLmNvbS9waG90b3MvWGdGOWU5M1RrdDBcIiB0YXJnZXQ9XCJfYmxhbmtcIj5MYWR5YnVnPC9hPiwgYnkgTWljaGVsIEJvc21hPC9zcGFuPiB9LFxuXHR7IGlkOiAnMTQ1NDAyMzQ5MjU1MC01Njk2ZjhmZjEwZTEnLCBjYXB0aW9uOiA8c3Bhbj48YSBocmVmPVwiaHR0cHM6Ly91bnNwbGFzaC5jb20vcGhvdG9zL0xtVlNLZUR5NkVBXCIgdGFyZ2V0PVwiX2JsYW5rXCI+VGlnZXI8L2E+LCBieSBKZXNzaWNhIFdlaWxsZXI8L3NwYW4+IH0sXG5cdHsgaWQ6ICcxNDcwNjE5NTQ5MTA4LWI4NWM1NmZlNWJlOCcsIGNhcHRpb246IDxzcGFuPjxhIGhyZWY9XCJodHRwczovL3Vuc3BsYXNoLmNvbS9waG90b3MvU1l6VUY2WGNXQllcIiB0YXJnZXQ9XCJfYmxhbmtcIj5GbGFtaW5nbzwvYT4sIGJ5IEFsYW4gRW1lcnk8L3NwYW4+IH0sXG5cdHsgaWQ6ICcxNDU4MTY3MDcyMTUzLWEyZWI3NmQ2N2MxYycsIGNhcHRpb246IDxzcGFuPjxhIGhyZWY9XCJodHRwczovL3Vuc3BsYXNoLmNvbS9waG90b3MvSTRBRVhIaDAwdW9cIiB0YXJnZXQ9XCJfYmxhbmtcIj5DaGltcGFuemVlPC9hPiwgYnkgTGl6IEJyaWRnZXM8L3NwYW4+IH0sXG5cdHsgaWQ6ICcxNDcxMTAxMTczNzEyLWI5ODg0MTc1MjU0ZScsIGNhcHRpb246IDxzcGFuPjxhIGhyZWY9XCJodHRwczovL3Vuc3BsYXNoLmNvbS9waG90b3MvNW9SelpVNXV3U01cIiB0YXJnZXQ9XCJfYmxhbmtcIj5EcmFnb25mbHk8L2E+LCBieSBQZWRybyBMYXN0cmE8L3NwYW4+IH0sXG5cdHsgaWQ6ICcxNDcxMTI3NDMyNDU4LTY1MjA2YmUxNDljOScsIGNhcHRpb246IDxzcGFuPjxhIGhyZWY9XCJodHRwczovL3Vuc3BsYXNoLmNvbS9waG90b3MvS3BndDRwbDAzTzBcIiB0YXJnZXQ9XCJfYmxhbmtcIj5EZWVyPC9hPiwgYnkgRXJuZXN0byBWZWzDoXpxdWV6PC9zcGFuPiB9LFxuXHR7IGlkOiAnMTQ3MDg1NDk4OTkyMi01YmUyZjc0NTZkNzgnLCBjYXB0aW9uOiA8c3Bhbj48YSBocmVmPVwiaHR0cHM6Ly91bnNwbGFzaC5jb20vcGhvdG9zL0dYTXI3QmFkWFFvXCIgdGFyZ2V0PVwiX2JsYW5rXCI+SGVkZ2Vob2c8L2E+LCBieSBQaW90ciDFgWFza2F3c2tpPC9zcGFuPiB9LFxuXHR7IGlkOiAnMTQ3MDc3NzYzOTMxMy02MGFmODg5MTgyMDMnLCBjYXB0aW9uOiA8c3Bhbj48YSBocmVmPVwiaHR0cHM6Ly91bnNwbGFzaC5jb20vcGhvdG9zL0dOVWNVeC1pT2JnXCIgdGFyZ2V0PVwiX2JsYW5rXCI+S29hbGE8L2E+LCBieSBDcmlzIFNhdXI8L3NwYW4+IH0sXG5cdHsgaWQ6ICcxNDUzNTUwNDg2NDgxLWFhNDE3NWIwMTNlYScsIGNhcHRpb246IDxzcGFuPjxhIGhyZWY9XCJodHRwczovL3Vuc3BsYXNoLmNvbS9waG90b3MvV2lTZWFaNEU2WklcIiB0YXJnZXQ9XCJfYmxhbmtcIj5FbGVwaGFudDwvYT4sIGJ5IEJlbmphbWluIFBsZXk8L3NwYW4+IH0sXG5dO1xuY29uc3QgSU1BR0VfTUFQID0gSU1BR0VfTkFNRVMubWFwKCh7IGNhcHRpb24sIGlkIH0pID0+ICh7XG5cdHNyYzogbWFrZVVuc3BsYXNoU3JjKGlkKSxcblx0dGh1bWJuYWlsOiBtYWtlVW5zcGxhc2hUaHVtYm5haWwoaWQpLFxuXHRzcmNzZXQ6IFtcblx0XHRtYWtlVW5zcGxhc2hTcmNTZXQoaWQsIDEwMjQpLFxuXHRcdG1ha2VVbnNwbGFzaFNyY1NldChpZCwgODAwKSxcblx0XHRtYWtlVW5zcGxhc2hTcmNTZXQoaWQsIDUwMCksXG5cdFx0bWFrZVVuc3BsYXNoU3JjU2V0KGlkLCAzMjApLFxuXHRdLFxuXHRjYXB0aW9uLFxufSkpO1xuXG5yZW5kZXIoXG5cdDxkaXY+XG5cdFx0PGgzPkRlZmF1bHQgb3B0aW9uczwvaDM+XG5cdFx0PHAgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiA0MCB9fT5Vc2UgeW91ciBrZXlib2FyZCB0byBuYXZpZ2F0ZSA8a2JkPmxlZnQ8L2tiZD4gPGtiZD5yaWdodDwva2JkPiA8a2JkPmVzYzwva2JkPiAmbWRhc2g7IEFsc28sIHRyeSByZXNpemluZyB5b3VyIGJyb3dzZXIgd2luZG93LjwvcD5cblx0XHQ8R2FsbGVyeSBpbWFnZXM9e0lNQUdFX01BUH0gLz5cblx0XHQ8cD5JbWFnZXMgY291cnRlc3kgb2YgPGEgaHJlZj1cImh0dHBzOi8vdW5zcGxhc2guY29tL1wiIHRhcmdldD1cIl9ibGFua1wiPlVuc3BsYXNoPC9hPjwvcD5cblxuXHRcdDxoMz5XaXRob3V0IHRodW1ibmFpbHM8L2gzPlxuXHRcdDxwIHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogNDAgfX0+U2V0IDxjb2RlPntcInRodW1ibmFpbHM9e2ZhbHNlfVwifTwvY29kZT4gdG8gcmVtb3ZlIHRodW1ibmFpbHM8L3A+XG5cdFx0PEdhbGxlcnkgaW1hZ2VzPXtJTUFHRV9NQVB9IHRodW1ibmFpbHM9e2ZhbHNlfSAvPlxuXG5cdFx0PGgzPlBhZ2luYXRlZCB2ZXJzaW9uPC9oMz5cblx0XHQ8cCBzdHlsZT17eyBtYXJnaW5Cb3R0b206IDQwIH19PlRoZSA8Y29kZT50aHVtYm5haWxzPC9jb2RlPiBwcm9wIGNhbiBhY3R1YWxseSB0YWtlIGEgY29tcG9uZW50IGFzIHZhbHVlPGJyIC8+PGNvZGU+e1widGh1bWJuYWlscz17TGlnaHRib3guTGlnaHRib3guUGFnaW5hdGVkVGh1bWJuYWlsc31cIn08L2NvZGU+PC9wPlxuXHRcdDxHYWxsZXJ5IGltYWdlcz17SU1BR0VfTUFQfSB0aHVtYm5haWxzPXtMaWdodGJveC5QYWdpbmF0ZWRUaHVtYm5haWxzfSAvPlxuXHRcdDxwIHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogMjAgfX0+Tm90ZSA6IFBhZ2luYXRlZFRodW1ibmFpbHMgaGFzIGFuIG9mZnNldCBwcm9wIHRvIGNoYW5nZSB0aGUgbnVtYmVyIG9mIHRodW1ibmFpbHMgdG8gc2hvdyBhcm91bmQgdGhlIGN1cnJlbnQgb25lLjxiciAvPlxuXHRcdDxjb2RlPntcIjxMaWdodGJveCB0aHVtYm5haWxzPXsocHJvcHMpID0+IDxQYWdpbmF0ZWRUaHVtYm5haWxzIHsuLi5wcm9wc30gb2Zmc2V0PXs1fSAvPn0gLz5cIn08L2NvZGU+XG5cdFx0PC9wPlxuXHQ8L2Rpdj4sXG5cdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdleGFtcGxlJylcbik7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IChcbiAgICAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgdmVyc2lvbj1cIjEuMVwiIHg9XCIwcHhcIiB5PVwiMHB4XCIgdmlld0JveD1cIjAgMCAyNCAzMFwiIGVuYWJsZS1iYWNrZ3JvdW5kPVwibmV3IDAgMCAyNCAyNFwiIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+J1xuICAgICAgICArICc8Zz4nXG4gICAgICAgICAgICArICc8cG9seWdvbiBmaWxsPVwid2hpdGVcIiBwb2ludHM9XCIxOSwxNCAxOSwxOCA1LDE4IDUsMTQgMiwxNCAyLDE4IDIsMjIgNSwyMiAxOSwyMiAyMiwyMiAyMiwxOCAyMiwxNCAgXCIvPidcbiAgICAgICAgICAgICsgJzxwb2x5Z29uIGZpbGw9XCJ3aGl0ZVwiIHBvaW50cz1cIjE1LDkuOSAxNSwyIDksMiA5LDkuOSA1LjgsOS45IDEyLDE2LjEgMTguMiw5LjkgIFwiLz4nXG4gICAgICAgICsgJzwvZz4nXG4gICAgKyAnPC9zdmc+J1xuKTtcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBEb3dubG9hZEljb24gZnJvbSAnLi9pY29uJztcblxuY2xhc3MgRG93bmxvYWRCdXR0b24gZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG4gICAgcmVuZGVyICgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0aXRsZT1cIkRvd25sb2FkXCJcbiAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogJ25vbmUnLFxuICAgICAgICAgICAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJyxcbiAgICAgICAgICAgICAgICAgICAgZmxvYXQ6ICdsZWZ0JyxcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiA0MCxcbiAgICAgICAgICAgICAgICAgICAgb3V0bGluZTogJ25vbmUnLFxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAxMCxcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IC0xMCxcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgICAgICAgICAgICB2ZXJ0aWNhbEFsaWduOiAnYm90dG9tJyxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDQwLFxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5wcm9wcy5oYW5kbGVyfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogRG93bmxvYWRJY29uIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICApXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEb3dubG9hZEJ1dHRvbjtcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBMaWdodGJveCBmcm9tICdyZWFjdC1pbWFnZXMnO1xuaW1wb3J0IERvd25sb2FkQnV0dG9uIGZyb20gJy4vRG93bmxvYWRCdXR0b24nO1xuXG5jbGFzcyBHYWxsZXJ5IGV4dGVuZHMgQ29tcG9uZW50IHtcblx0Y29uc3RydWN0b3IgKCkge1xuXHRcdHN1cGVyKCk7XG5cblx0XHR0aGlzLnN0YXRlID0ge1xuXHRcdFx0bGlnaHRib3hJc09wZW46IGZhbHNlLFxuXHRcdFx0Y3VycmVudEltYWdlOiAwLFxuXHRcdH07XG5cblx0XHR0aGlzLmNsb3NlTGlnaHRib3ggPSB0aGlzLmNsb3NlTGlnaHRib3guYmluZCh0aGlzKTtcblx0XHR0aGlzLmdvdG9OZXh0ID0gdGhpcy5nb3RvTmV4dC5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZ290b1ByZXZpb3VzID0gdGhpcy5nb3RvUHJldmlvdXMuYmluZCh0aGlzKTtcblx0XHR0aGlzLmdvdG9JbWFnZSA9IHRoaXMuZ290b0ltYWdlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5oYW5kbGVDbGlja0ltYWdlID0gdGhpcy5oYW5kbGVDbGlja0ltYWdlLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5vcGVuTGlnaHRib3ggPSB0aGlzLm9wZW5MaWdodGJveC5iaW5kKHRoaXMpO1xuXHR9XG5cdG9wZW5MaWdodGJveCAoaW5kZXgsIGV2ZW50KSB7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGN1cnJlbnRJbWFnZTogaW5kZXgsXG5cdFx0XHRsaWdodGJveElzT3BlbjogdHJ1ZSxcblx0XHR9KTtcblx0fVxuXHRjbG9zZUxpZ2h0Ym94ICgpIHtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGN1cnJlbnRJbWFnZTogMCxcblx0XHRcdGxpZ2h0Ym94SXNPcGVuOiBmYWxzZSxcblx0XHR9KTtcblx0fVxuXHRnb3RvUHJldmlvdXMgKCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0Y3VycmVudEltYWdlOiB0aGlzLnN0YXRlLmN1cnJlbnRJbWFnZSAtIDEsXG5cdFx0fSk7XG5cdH1cblx0Z290b05leHQgKCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0Y3VycmVudEltYWdlOiB0aGlzLnN0YXRlLmN1cnJlbnRJbWFnZSArIDEsXG5cdFx0fSk7XG5cdH1cblx0Z290b0ltYWdlIChpbmRleCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0Y3VycmVudEltYWdlOiBpbmRleCxcblx0XHR9KTtcblx0fVxuXHRoYW5kbGVDbGlja0ltYWdlICgpIHtcblx0XHRpZiAodGhpcy5zdGF0ZS5jdXJyZW50SW1hZ2UgPT09IHRoaXMucHJvcHMuaW1hZ2VzLmxlbmd0aCAtIDEpIHJldHVybjtcblxuXHRcdHRoaXMuZ290b05leHQoKTtcblx0fVxuXHRyZW5kZXJHYWxsZXJ5ICgpIHtcblx0XHRpZiAoIXRoaXMucHJvcHMuaW1hZ2VzKSByZXR1cm47XG5cdFx0Y29uc3QgZ2FsbGVyeSA9IHRoaXMucHJvcHMuaW1hZ2VzLm1hcCgob2JqLCBpKSA9PiB7XG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8YVxuXHRcdFx0XHRcdGhyZWY9e29iai5zcmN9XG5cdFx0XHRcdFx0a2V5PXtpfVxuXHRcdFx0XHRcdG9uQ2xpY2s9eyhlKSA9PiB0aGlzLm9wZW5MaWdodGJveChpLCBlKX1cblx0XHRcdFx0XHRzdHlsZT17c3R5bGVzLnRodW1ibmFpbH1cblx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0PGltZ1xuXHRcdFx0XHRcdFx0aGVpZ2h0PXtzdHlsZXMudGh1bWJuYWlsLnNpemV9XG5cdFx0XHRcdFx0XHRzcmM9e29iai50aHVtYm5haWx9XG5cdFx0XHRcdFx0XHRzdHlsZT17c3R5bGVzLnRodW1ibmFpbEltYWdlfVxuXHRcdFx0XHRcdFx0d2lkdGg9e3N0eWxlcy50aHVtYm5haWwuc2l6ZX1cblx0XHRcdFx0XHQvPlxuXHRcdFx0XHQ8L2E+XG5cdFx0XHQpO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgc3R5bGU9e3N0eWxlcy5nYWxsZXJ5fT5cblx0XHRcdFx0e2dhbGxlcnl9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG5cdGhhbmRsZURvd25sb2FkICgpIHtcblx0XHR3aW5kb3cub3Blbih0aGlzLnByb3BzLmltYWdlc1t0aGlzLnN0YXRlLmN1cnJlbnRJbWFnZV0uc3JjKTtcblx0fVxuXHRyZW5kZXIgKCkge1xuXHRcdGNvbnN0IHsgdGh1bWJuYWlscyB9ID0gdGhpcy5wcm9wc1xuXHRcdGxldCBjdXN0b21Db250cm9scyA9IFtcblx0XHRcdDxEb3dubG9hZEJ1dHRvbiBrZXk9XCJEb3dubG9hZFwiIGhhbmRsZXI9e3RoaXMuaGFuZGxlRG93bmxvYWQuYmluZCh0aGlzKX0gLz4sXG5cdFx0XTtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJzZWN0aW9uXCI+XG5cdFx0XHRcdHt0aGlzLnByb3BzLmhlYWRpbmcgJiYgPGgyPnt0aGlzLnByb3BzLmhlYWRpbmd9PC9oMj59XG5cdFx0XHRcdHt0aGlzLnByb3BzLnN1YmhlYWRpbmcgJiYgPHA+e3RoaXMucHJvcHMuc3ViaGVhZGluZ308L3A+fVxuXHRcdFx0XHR7dGhpcy5yZW5kZXJHYWxsZXJ5KCl9XG5cdFx0XHRcdDxMaWdodGJveFxuXHRcdFx0XHRcdGN1cnJlbnRJbWFnZT17dGhpcy5zdGF0ZS5jdXJyZW50SW1hZ2V9XG5cdFx0XHRcdFx0Y3VzdG9tQ29udHJvbHM9e2N1c3RvbUNvbnRyb2xzfVxuXHRcdFx0XHRcdGltYWdlcz17dGhpcy5wcm9wcy5pbWFnZXN9XG5cdFx0XHRcdFx0aXNPcGVuPXt0aGlzLnN0YXRlLmxpZ2h0Ym94SXNPcGVufVxuXHRcdFx0XHRcdG9uQ2xpY2tQcmV2PXt0aGlzLmdvdG9QcmV2aW91c31cblx0XHRcdFx0XHRvbkNsaWNrTmV4dD17dGhpcy5nb3RvTmV4dH1cblx0XHRcdFx0XHRvbkNsaWNrVGh1bWJuYWlsPXt0aGlzLmdvdG9JbWFnZX1cblx0XHRcdFx0XHRvbkNsaWNrSW1hZ2U9e3RoaXMuaGFuZGxlQ2xpY2tJbWFnZX1cblx0XHRcdFx0XHRvbkNsb3NlPXt0aGlzLmNsb3NlTGlnaHRib3h9XG5cdFx0XHRcdFx0dGhlbWU9e3RoaXMucHJvcHMudGhlbWV9XG5cdFx0XHRcdFx0dGh1bWJuYWlscz17dGh1bWJuYWlsc31cblx0XHRcdFx0Lz5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn07XG5cbkdhbGxlcnkuZGlzcGxheU5hbWUgPSAnR2FsbGVyeSc7XG5HYWxsZXJ5LnByb3BUeXBlcyA9IHtcblx0aGVhZGluZzogUHJvcFR5cGVzLnN0cmluZyxcblx0aW1hZ2VzOiBQcm9wVHlwZXMuYXJyYXksXG5cdHNlcGlhOiBQcm9wVHlwZXMuYm9vbCxcblx0c3ViaGVhZGluZzogUHJvcFR5cGVzLnN0cmluZyxcbn07XG5cbmNvbnN0IFRIVU1CTkFJTF9TSVpFID0gNzI7XG5cbmNvbnN0IHN0eWxlcyA9IHtcblx0Z2FsbGVyeToge1xuXHRcdG1hcmdpbkxlZnQ6IC01LFxuXHRcdG1hcmdpblJpZ2h0OiAtNSxcblx0XHRvdmVyZmxvdzogJ2hpZGRlbicsXG5cdH0sXG5cdHRodW1ibmFpbDoge1xuXHRcdGJhY2tncm91bmRTaXplOiAnY292ZXInLFxuXHRcdGJvcmRlclJhZGl1czogMyxcblx0XHRmbG9hdDogJ2xlZnQnLFxuXHRcdGhlaWdodDogVEhVTUJOQUlMX1NJWkUsXG5cdFx0bWFyZ2luOiA1LFxuXHRcdG92ZXJmbG93OiAnaGlkZGVuJyxcblx0XHR3aWR0aDogVEhVTUJOQUlMX1NJWkUsXG5cdH0sXG5cdHRodW1ibmFpbEltYWdlOiB7XG5cdFx0ZGlzcGxheTogJ2Jsb2NrJyxcblx0XHRoZWlnaHQ6ICdhdXRvJyxcblx0XHRtYXhXaWR0aDogJzEwMCUnLFxuXHRcdC8vIGhlaWdodDogVEhVTUJOQUlMX1NJWkUsXG5cdFx0Ly8gbGVmdDogJzUwJScsXG5cdFx0Ly8gcG9zaXRpb246ICdyZWxhdGl2ZScsXG5cdFx0Ly9cblx0XHQvLyBXZWJraXRUcmFuc2Zvcm06ICd0cmFuc2xhdGVYKC01MCUpJyxcblx0XHQvLyBNb3pUcmFuc2Zvcm06ICAgICd0cmFuc2xhdGVYKC01MCUpJyxcblx0XHQvLyBtc1RyYW5zZm9ybTogICAgICd0cmFuc2xhdGVYKC01MCUpJyxcblx0XHQvLyB0cmFuc2Zvcm06ICAgICAgICd0cmFuc2xhdGVYKC01MCUpJyxcblx0fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdhbGxlcnk7XG4iXX0=
