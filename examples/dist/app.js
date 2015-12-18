require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* eslint react/prop-types: 0 */

'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactImages = require('react-images');

var _reactImages2 = _interopRequireDefault(_reactImages);

var _componentsButton = require('./components/Button');

var _componentsButton2 = _interopRequireDefault(_componentsButton);

var _componentsGallery = require('./components/Gallery');

var _componentsGallery2 = _interopRequireDefault(_componentsGallery);

function capitalizeFirstLetter(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

var IMAGE_NAMES = ['cat', 'cats', 'chameleon', 'dog', 'ducks', 'goat', 'ostrich', 'pigeon', 'pigs', 'seagulls', 'wasp', 'yawn'];
var IMAGES = IMAGE_NAMES.map(function (img) {
	return {
		src: '/images/800-' + img + '.jpg',
		thumbnail: '/images/thumbnail-' + img + '.jpg',
		srcset: ['/images/1024-' + img + '.jpg 1024w', '/images/800-' + img + '.jpg 800w', '/images/500-' + img + '.jpg 500w', '/images/320-' + img + '.jpg 320w'],
		caption: capitalizeFirstLetter(img)
	};
});

// const theme = Lightbox.theme({
// 	image: {
// 		border: '10px solid white',
// 		border1Radius: 10,
// 		WebkitFilter: 'sepia(100%)',
// 		filter: 'sepia(100%)',
// 	},
// 	arrow: {
// 		backgroundColor: 'rgba(0,0,0,0.1)',
// 		borderRadius: 10,
// 	},
// });

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
	_react2['default'].createElement(_componentsGallery2['default'], { images: IMAGES }),
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

},{"./components/Button":2,"./components/Gallery":3,"react":undefined,"react-dom":undefined,"react-images":undefined}],2:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactImages = require('react-images');

var _reactImages2 = _interopRequireDefault(_reactImages);

var Button = _react2['default'].createClass({
	displayName: 'Button',
	propTypes: {
		images: _react2['default'].PropTypes.array
	},
	getInitialState: function getInitialState() {
		return {
			lightboxIsOpen: false
		};
	},
	gotoPrevious: function gotoPrevious(event) {
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}
		this.setState({
			currentImage: this.state.currentImage - 1
		});
	},
	gotoNext: function gotoNext(event) {
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}
		this.setState({
			currentImage: this.state.currentImage + 1
		});
	},
	openLightbox: function openLightbox(index, event) {
		event.preventDefault();
		this.setState({
			currentImage: index,
			lightboxIsOpen: true
		});
	},
	closeLightbox: function closeLightbox() {
		this.setState({
			lightboxIsOpen: false
		});
	},
	render: function render() {
		var _this = this;

		return _react2['default'].createElement(
			'div',
			{ className: 'section' },
			_react2['default'].createElement(
				'h2',
				null,
				this.props.heading
			),
			_react2['default'].createElement(
				'button',
				{ onClick: function (event) {
						return _this.openLightbox(0, event);
					} },
				'Sure, why not?'
			),
			_react2['default'].createElement(_reactImages2['default'], {
				images: this.props.images,
				currentImage: this.state.currentImage,
				isOpen: this.state.lightboxIsOpen,
				onClickPrev: this.gotoPrevious,
				onClickNext: this.gotoNext,
				onClose: this.closeLightbox,
				styles: this.props.styles
			})
		);
	}
});

var THUMBNAIL_SIZE = 58;

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
		height: THUMBNAIL_SIZE,
		left: '50%',
		position: 'relative',

		WebkitTransform: 'translateX(-50%)',
		MozTransform: 'translateX(-50%)',
		msTransform: 'translateX(-50%)',
		transform: 'translateX(-50%)'
	}
};

module.exports = Button;

},{"react":undefined,"react-images":undefined}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactImages = require('react-images');

var _reactImages2 = _interopRequireDefault(_reactImages);

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
		key: 'renderGallery',
		value: function renderGallery() {
			var _this = this;

			if (!this.props.images) return;
			var gallery = this.props.images.map(function (obj, i) {
				return _react2['default'].createElement(
					'a',
					{ key: i, href: obj.src, onClick: function (event) {
							return _this.openLightbox(i, event);
						}, style: styles.thumbnail },
					_react2['default'].createElement('img', { src: obj.thumbnail, style: styles.thumbnailImage, width: styles.thumbnail.size, height: styles.thumbnail.size })
				);
			});

			return _react2['default'].createElement(
				'div',
				{ style: styles.gallery },
				gallery
			);
		}
	}, {
		key: 'render',
		value: function render() {
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
					images: this.props.images,
					isOpen: this.state.lightboxIsOpen,
					onClickPrev: this.gotoPrevious,
					onClickNext: this.gotoNext,
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
	images: _react.PropTypes.array,
	heading: _react.PropTypes.string,
	subheading: _react.PropTypes.string,
	sepia: _react.PropTypes.bool
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

},{"react":undefined,"react-images":undefined}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9yZWFjdC1jb21wb25lbnQtZ3VscC10YXNrcy9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2pvc3MvRGV2ZWxvcG1lbnQvcGFja2FnZXMvcmVhY3QvaW1hZ2VzL2V4YW1wbGVzL3NyYy9hcHAuanMiLCIvVXNlcnMvam9zcy9EZXZlbG9wbWVudC9wYWNrYWdlcy9yZWFjdC9pbWFnZXMvZXhhbXBsZXMvc3JjL2NvbXBvbmVudHMvQnV0dG9uLmpzIiwiL1VzZXJzL2pvc3MvRGV2ZWxvcG1lbnQvcGFja2FnZXMvcmVhY3QvaW1hZ2VzL2V4YW1wbGVzL3NyYy9jb21wb25lbnRzL0dhbGxlcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7cUJDRWtCLE9BQU87Ozs7d0JBQ0YsV0FBVzs7MkJBQ2IsY0FBYzs7OztnQ0FDaEIscUJBQXFCOzs7O2lDQUNwQixzQkFBc0I7Ozs7QUFFMUMsU0FBUyxxQkFBcUIsQ0FBQyxHQUFHLEVBQUU7QUFDbkMsUUFBTyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDbEQ7O0FBRUQsSUFBTSxXQUFXLEdBQUcsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ2xJLElBQU0sTUFBTSxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsVUFBQSxHQUFHLEVBQUk7QUFDckMsUUFBTztBQUNOLEtBQUcsbUJBQWlCLEdBQUcsU0FBTTtBQUM3QixXQUFTLHlCQUF1QixHQUFHLFNBQU07QUFDekMsUUFBTSxFQUFFLG1CQUNT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QUFPOzs7QUF1RVosQ0FBQzs7QUFFRixPQUFPLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztBQUNoQyxPQUFPLENBQUMsU0FBUyxHQUFHO0FBQ25CLE9BQU0sRUFBRSxpQkFBVSxLQUFLO0FBQ3ZCLFFBQU8sRUFBRSxpQkFBVSxNQUFNO0FBQ3pCLFdBQVUsRUFBRSxpQkFBVSxNQUFNO0FBQzVCLE1BQUssRUFBRSxpQkFBVSxJQUFJO0NBQ3JCLENBQUM7O0FBRUYsSUFBTSxjQUFjLEdBQUcsRUFBRSxDQUFDOztBQUUxQixJQUFNLE1BQU0sR0FBRztBQUNkLFFBQU8sRUFBRTtBQUNSLFlBQVUsRUFBRSxDQUFDLENBQUM7QUFDZCxhQUFXLEVBQUUsQ0FBQyxDQUFDO0FBQ2YsVUFBUSxFQUFFLFFBQVE7RUFDbEI7QUFDRCxVQUFTLEVBQUU7QUFDVixnQkFBYyxFQUFFLE9BQU87QUFDdkIsY0FBWSxFQUFFLENBQUM7QUFDZixPQUFLLEVBQUUsTUFBTTtBQUNiLFFBQU0sRUFBRSxjQUFjO0FBQ3RCLFFBQU0sRUFBRSxDQUFDO0FBQ1QsVUFBUSxFQUFFLFFBQVE7QUFDbEIsT0FBSyxFQUFFLGNBQWM7RUFDckI7QUFDRCxlQUFjLEVBQUU7QUFDZixTQUFPLEVBQUUsT0FBTztBQUNoQixRQUFNLEVBQUUsTUFBTTtBQUNkLFVBQVEsRUFBRSxNQUFNO0VBU2hCO0NBQ0QsQ0FBQzs7Ozs7Ozs7OztxQkFFYSxPQUFPIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIGVzbGludCByZWFjdC9wcm9wLXR5cGVzOiAwICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyByZW5kZXIgfSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IExpZ2h0Ym94IGZyb20gJ3JlYWN0LWltYWdlcyc7XG5pbXBvcnQgQnV0dG9uIGZyb20gJy4vY29tcG9uZW50cy9CdXR0b24nO1xuaW1wb3J0IEdhbGxlcnkgZnJvbSAnLi9jb21wb25lbnRzL0dhbGxlcnknO1xuXG5mdW5jdGlvbiBjYXBpdGFsaXplRmlyc3RMZXR0ZXIoc3RyKSB7XG5cdHJldHVybiBzdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSk7XG59XG5cbmNvbnN0IElNQUdFX05BTUVTID0gWydjYXQnLCAnY2F0cycsICdjaGFtZWxlb24nLCAnZG9nJywgJ2R1Y2tzJywgJ2dvYXQnLCAnb3N0cmljaCcsICdwaWdlb24nLCAncGlncycsICdzZWFndWxscycsICd3YXNwJywgJ3lhd24nXTtcbmNvbnN0IElNQUdFUyA9IElNQUdFX05BTUVTLm1hcChpbWcgPT4ge1xuXHRyZXR1cm4ge1xuXHRcdHNyYzogYC9pbWFnZXMvODAwLSR7aW1nfS5qcGdgLFxuXHRcdHRodW1ibmFpbDogYC9pbWFnZXMvdGh1bWJuYWlsLSR7aW1nfS5qcGdgLFxuXHRcdHNyY3NldDogW1xuXHRcdFx0YC9pbWFnZXMvMTAyNC0ke2ltZ30uanBnIDEwMjR3YCxcblx0XHRcdGAvaW1hZ2VzLzgwMC0ke2ltZ30uanBnIDgwMHdgLFxuXHRcdFx0YC9pbWFnZXMvNTAwLSR7aW1nfS5qcGcgNTAwd2AsXG5cdFx0XHRgL2ltYWdlcy8zMjAtJHtpbWd9LmpwZyAzMjB3YCxcblx0XHRdLFxuXHRcdGNhcHRpb246IGNhcGl0YWxpemVGaXJzdExldHRlcihpbWcpXG5cdH07XG59KTtcblxuLy8gY29uc3QgdGhlbWUgPSBMaWdodGJveC50aGVtZSh7XG4vLyBcdGltYWdlOiB7XG4vLyBcdFx0Ym9yZGVyOiAnMTBweCBzb2xpZCB3aGl0ZScsXG4vLyBcdFx0Ym9yZGVyMVJhZGl1czogMTAsXG4vLyBcdFx0V2Via2l0RmlsdGVyOiAnc2VwaWEoMTAwJSknLFxuLy8gXHRcdGZpbHRlcjogJ3NlcGlhKDEwMCUpJyxcbi8vIFx0fSxcbi8vIFx0YXJyb3c6IHtcbi8vIFx0XHRiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDAsMCwwLDAuMSknLFxuLy8gXHRcdGJvcmRlclJhZGl1czogMTAsXG4vLyBcdH0sXG4vLyB9KTtcblxucmVuZGVyIChcblx0PGRpdj5cblx0XHQ8cCBzdHlsZT17eyBtYXJnaW5Cb3R0b206IDQwIH19PlVzZSB5b3VyIGtleWJvYXJkIHRvIG5hdmlnYXRlIDxrYmQ+bGVmdDwva2JkPiA8a2JkPnJpZ2h0PC9rYmQ+IDxrYmQ+ZXNjPC9rYmQ+ICZtZGFzaDsgQWxzbywgdHJ5IHJlc2l6aW5nIHlvdXIgYnJvd3NlciB3aW5kb3cuPC9wPlxuXHRcdDxHYWxsZXJ5IGltYWdlcz17SU1BR0VTfSAvPlxuXHRcdDxwPkltYWdlcyBjb3VydGVzeSBvZiA8YSBocmVmPVwiaHR0cDovL2dyYXRpc29ncmFwaHkuY29tL1wiIHRhcmdldD1cIl9ibGFua1wiPkdyYXRpc29ncmFwaHk8L2E+PC9wPlxuXHQ8L2Rpdj4sXG5cdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdleGFtcGxlJylcbik7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IExpZ2h0Ym94IGZyb20gJ3JlYWN0LWltYWdlcyc7XG5cbnZhciBCdXR0b24gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGRpc3BsYXlOYW1lOiAnQnV0dG9uJyxcblx0cHJvcFR5cGVzOiB7XG5cdFx0aW1hZ2VzOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXksXG5cdH0sXG5cdGdldEluaXRpYWxTdGF0ZSAoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGxpZ2h0Ym94SXNPcGVuOiBmYWxzZSxcblx0XHR9O1xuXHR9LFxuXHRnb3RvUHJldmlvdXMgKGV2ZW50KSB7XG5cdFx0aWYgKGV2ZW50KSB7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0fVxuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0Y3VycmVudEltYWdlOiB0aGlzLnN0YXRlLmN1cnJlbnRJbWFnZSAtIDEsXG5cdFx0fSk7XG5cdH0sXG5cdGdvdG9OZXh0IChldmVudCkge1xuXHRcdGlmIChldmVudCkge1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdH1cblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGN1cnJlbnRJbWFnZTogdGhpcy5zdGF0ZS5jdXJyZW50SW1hZ2UgKyAxLFxuXHRcdH0pO1xuXHR9LFxuXHRvcGVuTGlnaHRib3ggKGluZGV4LCBldmVudCkge1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRjdXJyZW50SW1hZ2U6IGluZGV4LFxuXHRcdFx0bGlnaHRib3hJc09wZW46IHRydWUsXG5cdFx0fSk7XG5cdH0sXG5cdGNsb3NlTGlnaHRib3ggKCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0bGlnaHRib3hJc09wZW46IGZhbHNlLFxuXHRcdH0pO1xuXHR9LFxuXHRyZW5kZXIgKCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInNlY3Rpb25cIj5cblx0XHRcdFx0PGgyPnt0aGlzLnByb3BzLmhlYWRpbmd9PC9oMj5cblx0XHRcdFx0PGJ1dHRvbiBvbkNsaWNrPXsoZXZlbnQpID0+IHRoaXMub3BlbkxpZ2h0Ym94KDAsIGV2ZW50KX0+U3VyZSwgd2h5IG5vdD88L2J1dHRvbj5cblx0XHRcdFx0PExpZ2h0Ym94XG5cdFx0XHRcdFx0aW1hZ2VzPXt0aGlzLnByb3BzLmltYWdlc31cblx0XHRcdFx0XHRjdXJyZW50SW1hZ2U9e3RoaXMuc3RhdGUuY3VycmVudEltYWdlfVxuXHRcdFx0XHRcdGlzT3Blbj17dGhpcy5zdGF0ZS5saWdodGJveElzT3Blbn1cblx0XHRcdFx0XHRvbkNsaWNrUHJldj17dGhpcy5nb3RvUHJldmlvdXN9XG5cdFx0XHRcdFx0b25DbGlja05leHQ9e3RoaXMuZ290b05leHR9XG5cdFx0XHRcdFx0b25DbG9zZT17dGhpcy5jbG9zZUxpZ2h0Ym94fVxuXHRcdFx0XHRcdHN0eWxlcz17dGhpcy5wcm9wcy5zdHlsZXN9XG5cdFx0XHRcdC8+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTtcblxuY29uc3QgVEhVTUJOQUlMX1NJWkUgPSA1ODtcblxuY29uc3Qgc3R5bGVzID0ge1xuXHRnYWxsZXJ5OiB7XG5cdFx0bWFyZ2luTGVmdDogLTUsXG5cdFx0bWFyZ2luUmlnaHQ6IC01LFxuXHRcdG92ZXJmbG93OiAnaGlkZGVuJyxcblx0fSxcblx0dGh1bWJuYWlsOiB7XG5cdFx0YmFja2dyb3VuZFNpemU6ICdjb3ZlcicsXG5cdFx0Ym9yZGVyUmFkaXVzOiAzLFxuXHRcdGZsb2F0OiAnbGVmdCcsXG5cdFx0aGVpZ2h0OiBUSFVNQk5BSUxfU0laRSxcblx0XHRtYXJnaW46IDUsXG5cdFx0b3ZlcmZsb3c6ICdoaWRkZW4nLFxuXHRcdHdpZHRoOiBUSFVNQk5BSUxfU0laRSxcblx0fSxcblx0dGh1bWJuYWlsSW1hZ2U6IHtcblx0XHRkaXNwbGF5OiAnYmxvY2snLFxuXHRcdGhlaWdodDogVEhVTUJOQUlMX1NJWkUsXG5cdFx0bGVmdDogJzUwJScsXG5cdFx0cG9zaXRpb246ICdyZWxhdGl2ZScsXG5cblx0XHRXZWJraXRUcmFuc2Zvcm06ICd0cmFuc2xhdGVYKC01MCUpJyxcblx0XHRNb3pUcmFuc2Zvcm06ICAgICd0cmFuc2xhdGVYKC01MCUpJyxcblx0XHRtc1RyYW5zZm9ybTogICAgICd0cmFuc2xhdGVYKC01MCUpJyxcblx0XHR0cmFuc2Zvcm06ICAgICAgICd0cmFuc2xhdGVYKC01MCUpJyxcblx0fSxcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQnV0dG9uO1xuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IExpZ2h0Ym94IGZyb20gJ3JlYWN0LWltYWdlcyc7XG5cbmNsYXNzIEdhbGxlcnkgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXG5cdFx0dGhpcy5zdGF0ZSA9IHtcblx0XHRcdGxpZ2h0Ym94SXNPcGVuOiBmYWxzZSxcblx0XHRcdGN1cnJlbnRJbWFnZTogMCxcblx0XHR9O1xuXG5cdFx0dGhpcy5jbG9zZUxpZ2h0Ym94ID0gdGhpcy5jbG9zZUxpZ2h0Ym94LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5nb3RvTmV4dCA9IHRoaXMuZ290b05leHQuYmluZCh0aGlzKTtcblx0XHR0aGlzLmdvdG9QcmV2aW91cyA9IHRoaXMuZ290b1ByZXZpb3VzLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5vcGVuTGlnaHRib3ggPSB0aGlzLm9wZW5MaWdodGJveC5iaW5kKHRoaXMpO1xuXHR9XG5cdG9wZW5MaWdodGJveCAoaW5kZXgsIGV2ZW50KSB7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGN1cnJlbnRJbWFnZTogaW5kZXgsXG5cdFx0XHRsaWdodGJveElzT3BlbjogdHJ1ZSxcblx0XHR9KTtcblx0fVxuXHRjbG9zZUxpZ2h0Ym94ICgpIHtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGN1cnJlbnRJbWFnZTogMCxcblx0XHRcdGxpZ2h0Ym94SXNPcGVuOiBmYWxzZSxcblx0XHR9KTtcblx0fVxuXHRnb3RvUHJldmlvdXMgKCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0Y3VycmVudEltYWdlOiB0aGlzLnN0YXRlLmN1cnJlbnRJbWFnZSAtIDEsXG5cdFx0fSk7XG5cdH1cblx0Z290b05leHQgKCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0Y3VycmVudEltYWdlOiB0aGlzLnN0YXRlLmN1cnJlbnRJbWFnZSArIDEsXG5cdFx0fSk7XG5cdH1cblx0cmVuZGVyR2FsbGVyeSAoKSB7XG5cdFx0aWYgKCF0aGlzLnByb3BzLmltYWdlcykgcmV0dXJuO1xuXHRcdGxldCBnYWxsZXJ5ID0gdGhpcy5wcm9wcy5pbWFnZXMubWFwKChvYmosIGkpID0+IHtcblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxhIGtleT17aX0gaHJlZj17b2JqLnNyY30gb25DbGljaz17KGV2ZW50KSA9PiB0aGlzLm9wZW5MaWdodGJveChpLCBldmVudCl9IHN0eWxlPXtzdHlsZXMudGh1bWJuYWlsfT5cblx0XHRcdFx0XHQ8aW1nIHNyYz17b2JqLnRodW1ibmFpbH0gc3R5bGU9e3N0eWxlcy50aHVtYm5haWxJbWFnZX0gd2lkdGg9e3N0eWxlcy50aHVtYm5haWwuc2l6ZX0gaGVpZ2h0PXtzdHlsZXMudGh1bWJuYWlsLnNpemV9IC8+XG5cdFx0XHRcdDwvYT5cblx0XHRcdCk7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBzdHlsZT17c3R5bGVzLmdhbGxlcnl9PlxuXHRcdFx0XHR7Z2FsbGVyeX1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cblx0cmVuZGVyICgpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJzZWN0aW9uXCI+XG5cdFx0XHRcdHt0aGlzLnByb3BzLmhlYWRpbmcgJiYgPGgyPnt0aGlzLnByb3BzLmhlYWRpbmd9PC9oMj59XG5cdFx0XHRcdHt0aGlzLnByb3BzLnN1YmhlYWRpbmcgJiYgPHA+e3RoaXMucHJvcHMuc3ViaGVhZGluZ308L3A+fVxuXHRcdFx0XHR7dGhpcy5yZW5kZXJHYWxsZXJ5KCl9XG5cdFx0XHRcdDxMaWdodGJveFxuXHRcdFx0XHRcdGN1cnJlbnRJbWFnZT17dGhpcy5zdGF0ZS5jdXJyZW50SW1hZ2V9XG5cdFx0XHRcdFx0aW1hZ2VzPXt0aGlzLnByb3BzLmltYWdlc31cblx0XHRcdFx0XHRpc09wZW49e3RoaXMuc3RhdGUubGlnaHRib3hJc09wZW59XG5cdFx0XHRcdFx0b25DbGlja1ByZXY9e3RoaXMuZ290b1ByZXZpb3VzfVxuXHRcdFx0XHRcdG9uQ2xpY2tOZXh0PXt0aGlzLmdvdG9OZXh0fVxuXHRcdFx0XHRcdG9uQ2xvc2U9e3RoaXMuY2xvc2VMaWdodGJveH1cblx0XHRcdFx0XHR0aGVtZT17dGhpcy5wcm9wcy50aGVtZX1cblx0XHRcdFx0Lz5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn07XG5cbkdhbGxlcnkuZGlzcGxheU5hbWUgPSAnR2FsbGVyeSc7XG5HYWxsZXJ5LnByb3BUeXBlcyA9IHtcblx0aW1hZ2VzOiBQcm9wVHlwZXMuYXJyYXksXG5cdGhlYWRpbmc6IFByb3BUeXBlcy5zdHJpbmcsXG5cdHN1YmhlYWRpbmc6IFByb3BUeXBlcy5zdHJpbmcsXG5cdHNlcGlhOiBQcm9wVHlwZXMuYm9vbCxcbn07XG5cbmNvbnN0IFRIVU1CTkFJTF9TSVpFID0gNzI7XG5cbmNvbnN0IHN0eWxlcyA9IHtcblx0Z2FsbGVyeToge1xuXHRcdG1hcmdpbkxlZnQ6IC01LFxuXHRcdG1hcmdpblJpZ2h0OiAtNSxcblx0XHRvdmVyZmxvdzogJ2hpZGRlbicsXG5cdH0sXG5cdHRodW1ibmFpbDoge1xuXHRcdGJhY2tncm91bmRTaXplOiAnY292ZXInLFxuXHRcdGJvcmRlclJhZGl1czogMyxcblx0XHRmbG9hdDogJ2xlZnQnLFxuXHRcdGhlaWdodDogVEhVTUJOQUlMX1NJWkUsXG5cdFx0bWFyZ2luOiA1LFxuXHRcdG92ZXJmbG93OiAnaGlkZGVuJyxcblx0XHR3aWR0aDogVEhVTUJOQUlMX1NJWkUsXG5cdH0sXG5cdHRodW1ibmFpbEltYWdlOiB7XG5cdFx0ZGlzcGxheTogJ2Jsb2NrJyxcblx0XHRoZWlnaHQ6ICdhdXRvJyxcblx0XHRtYXhXaWR0aDogJzEwMCUnLFxuXHRcdC8vIGhlaWdodDogVEhVTUJOQUlMX1NJWkUsXG5cdFx0Ly8gbGVmdDogJzUwJScsXG5cdFx0Ly8gcG9zaXRpb246ICdyZWxhdGl2ZScsXG5cdFx0Ly9cblx0XHQvLyBXZWJraXRUcmFuc2Zvcm06ICd0cmFuc2xhdGVYKC01MCUpJyxcblx0XHQvLyBNb3pUcmFuc2Zvcm06ICAgICd0cmFuc2xhdGVYKC01MCUpJyxcblx0XHQvLyBtc1RyYW5zZm9ybTogICAgICd0cmFuc2xhdGVYKC01MCUpJyxcblx0XHQvLyB0cmFuc2Zvcm06ICAgICAgICd0cmFuc2xhdGVYKC01MCUpJyxcblx0fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdhbGxlcnk7XG4iXX0=
