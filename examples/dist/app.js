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

var IMAGES = [{
	src: 'https://c1.staticflickr.com/9/8383/8517694980_21bef8e9fc_c.jpg',
	thumbnail: 'https://c1.staticflickr.com/9/8383/8517694980_21bef8e9fc_s.jpg',
	srcset: ['https://c1.staticflickr.com/9/8383/8517694980_21bef8e9fc_b.jpg 1024w', 'https://c1.staticflickr.com/9/8383/8517694980_21bef8e9fc_c.jpg 800w', 'https://c1.staticflickr.com/9/8383/8517694980_21bef8e9fc.jpg 500w', 'https://c1.staticflickr.com/9/8383/8517694980_21bef8e9fc_n.jpg 320w']
}, {
	src: 'https://c1.staticflickr.com/9/8379/8516580741_058e7c7317_c.jpg',
	thumbnail: 'https://c1.staticflickr.com/9/8379/8516580741_058e7c7317_s.jpg',
	srcset: ['https://c1.staticflickr.com/9/8379/8516580741_058e7c7317_b.jpg 1024w', 'https://c1.staticflickr.com/9/8379/8516580741_058e7c7317_c.jpg 800w', 'https://c1.staticflickr.com/9/8379/8516580741_058e7c7317.jpg 500w', 'https://c1.staticflickr.com/9/8379/8516580741_058e7c7317_n.jpg 320w']
}, {
	src: 'https://c1.staticflickr.com/9/8509/8517695778_f08f11150f_c.jpg',
	thumbnail: 'https://c1.staticflickr.com/9/8509/8517695778_f08f11150f_s.jpg',
	srcset: ['https://c1.staticflickr.com/9/8509/8517695778_f08f11150f_b.jpg 1024w', 'https://c1.staticflickr.com/9/8509/8517695778_f08f11150f_c.jpg 800w', 'https://c1.staticflickr.com/9/8509/8517695778_f08f11150f.jpg 500w', 'https://c1.staticflickr.com/9/8509/8517695778_f08f11150f_n.jpg 320w']
}, {
	src: 'https://c1.staticflickr.com/9/8109/8526026980_a152c5f11d_z.jpg',
	thumbnail: 'https://c1.staticflickr.com/9/8109/8526026980_a152c5f11d_s.jpg'
}, {
	src: 'https://c1.staticflickr.com/9/8243/8524916085_ed79b45249_z.jpg',
	thumbnail: 'https://c1.staticflickr.com/9/8243/8524916085_ed79b45249_s.jpg'
}, {
	src: 'https://c2.staticflickr.com/8/7489/16129020136_f36604d33f_c.jpg',
	thumbnail: 'https://c2.staticflickr.com/8/7489/16129020136_f36604d33f_s.jpg',
	srcset: ['https://c2.staticflickr.com/8/7489/16129020136_f36604d33f_b.jpg 1024w', 'https://c2.staticflickr.com/8/7489/16129020136_f36604d33f_c.jpg 800w', 'https://c2.staticflickr.com/8/7489/16129020136_f36604d33f.jpg 500w', 'https://c2.staticflickr.com/8/7489/16129020136_f36604d33f_n.jpg 320w']
}, {
	src: 'https://c1.staticflickr.com/9/8376/8526026438_a06baf0f58_c.jpg',
	thumbnail: 'https://c1.staticflickr.com/9/8376/8526026438_a06baf0f58_s.jpg',
	srcset: ['https://c1.staticflickr.com/9/8376/8526026438_a06baf0f58_b.jpg 1024w', 'https://c1.staticflickr.com/9/8376/8526026438_a06baf0f58_c.jpg 800w', 'https://c1.staticflickr.com/9/8376/8526026438_a06baf0f58.jpg 500w', 'https://c1.staticflickr.com/9/8376/8526026438_a06baf0f58_n.jpg 320w']
}, {
	src: 'https://c1.staticflickr.com/9/8225/8524911453_598b176b7e_c.jpg',
	thumbnail: 'https://c1.staticflickr.com/9/8225/8524911453_598b176b7e_s.jpg',
	srcset: ['https://c1.staticflickr.com/9/8225/8524911453_598b176b7e_b.jpg 1024w', 'https://c1.staticflickr.com/9/8225/8524911453_598b176b7e_c.jpg 800w', 'https://c1.staticflickr.com/9/8225/8524911453_598b176b7e.jpg 500w', 'https://c1.staticflickr.com/9/8225/8524911453_598b176b7e_n.jpg 320w']
}, {
	src: 'https://c1.staticflickr.com/9/8513/8533369906_96f03a6434_c.jpg',
	thumbnail: 'https://c1.staticflickr.com/9/8513/8533369906_96f03a6434_s.jpg',
	srcset: ['https://c1.staticflickr.com/9/8513/8533369906_96f03a6434_b.jpg 1024w', 'https://c1.staticflickr.com/9/8513/8533369906_96f03a6434_c.jpg 800w', 'https://c1.staticflickr.com/9/8513/8533369906_96f03a6434.jpg 500w', 'https://c1.staticflickr.com/9/8513/8533369906_96f03a6434_n.jpg 320w']
}, {
	src: 'https://c1.staticflickr.com/9/8096/8532223657_b1efa18ac8_c.jpg',
	thumbnail: 'https://c1.staticflickr.com/9/8096/8532223657_b1efa18ac8_s.jpg',
	srcset: ['https://c1.staticflickr.com/9/8096/8532223657_b1efa18ac8_b.jpg 1024w', 'https://c1.staticflickr.com/9/8096/8532223657_b1efa18ac8_c.jpg 800w', 'https://c1.staticflickr.com/9/8096/8532223657_b1efa18ac8.jpg 500w', 'https://c1.staticflickr.com/9/8096/8532223657_b1efa18ac8_n.jpg 320w']
}, {
	src: 'https://c1.staticflickr.com/9/8390/8532222553_e0e05dbdd6_c.jpg',
	thumbnail: 'https://c1.staticflickr.com/9/8390/8532222553_e0e05dbdd6_s.jpg',
	srcset: ['https://c1.staticflickr.com/9/8390/8532222553_e0e05dbdd6_b.jpg 1024w', 'https://c1.staticflickr.com/9/8390/8532222553_e0e05dbdd6_c.jpg 800w', 'https://c1.staticflickr.com/9/8390/8532222553_e0e05dbdd6.jpg 500w', 'https://c1.staticflickr.com/9/8390/8532222553_e0e05dbdd6_n.jpg 320w']
}, {
	src: 'https://c1.staticflickr.com/9/8513/8533333694_736fc6c9af_c.jpg',
	thumbnail: 'https://c1.staticflickr.com/9/8513/8533333694_736fc6c9af_s.jpg',
	srcset: ['https://c1.staticflickr.com/9/8513/8533333694_736fc6c9af_b.jpg 1024w', 'https://c1.staticflickr.com/9/8513/8533333694_736fc6c9af_c.jpg 800w', 'https://c1.staticflickr.com/9/8513/8533333694_736fc6c9af.jpg 500w', 'https://c1.staticflickr.com/9/8513/8533333694_736fc6c9af_n.jpg 320w']
}, {
	src: 'https://c1.staticflickr.com/9/8391/8532223463_abe07ac0a6_z.jpg',
	thumbnail: 'https://c1.staticflickr.com/9/8391/8532223463_abe07ac0a6_s.jpg'
}, {
	src: 'https://c1.staticflickr.com/9/8365/8529344273_eedda51ea1_c.jpg',
	thumbnail: 'https://c1.staticflickr.com/9/8365/8529344273_eedda51ea1_s.jpg',
	srcset: ['https://c1.staticflickr.com/9/8365/8529344273_eedda51ea1_b.jpg 1024w', 'https://c1.staticflickr.com/9/8365/8529344273_eedda51ea1_c.jpg 800w', 'https://c1.staticflickr.com/9/8365/8529344273_eedda51ea1.jpg 500w', 'https://c1.staticflickr.com/9/8365/8529344273_eedda51ea1_n.jpg 320w']
}, {
	src: 'https://c1.staticflickr.com/9/8381/8527501230_61882a7918_c.jpg',
	thumbnail: 'https://c1.staticflickr.com/9/8381/8527501230_61882a7918_s.jpg',
	srcset: ['https://c1.staticflickr.com/9/8381/8527501230_61882a7918_b.jpg 1024w', 'https://c1.staticflickr.com/9/8381/8527501230_61882a7918_c.jpg 800w', 'https://c1.staticflickr.com/9/8381/8527501230_61882a7918.jpg 500w', 'https://c1.staticflickr.com/9/8381/8527501230_61882a7918_n.jpg 320w']
}, {
	src: 'https://c2.staticflickr.com/8/7538/15535067073_5835371a5f_c.jpg',
	thumbnail: 'https://c2.staticflickr.com/8/7538/15535067073_5835371a5f_s.jpg',
	srcset: ['https://c2.staticflickr.com/8/7538/15535067073_5835371a5f_b.jpg 1024w', 'https://c2.staticflickr.com/8/7538/15535067073_5835371a5f_c.jpg 800w', 'https://c2.staticflickr.com/8/7538/15535067073_5835371a5f.jpg 500w', 'https://c2.staticflickr.com/8/7538/15535067073_5835371a5f_n.jpg 320w']
}, {
	src: 'https://c2.staticflickr.com/8/7550/15532469404_e39e2fe2e8_c.jpg',
	thumbnail: 'https://c2.staticflickr.com/8/7550/15532469404_e39e2fe2e8_s.jpg',
	srcset: ['https://c2.staticflickr.com/8/7550/15532469404_e39e2fe2e8_b.jpg 1024w', 'https://c2.staticflickr.com/8/7550/15532469404_e39e2fe2e8_c.jpg 800w', 'https://c2.staticflickr.com/8/7550/15532469404_e39e2fe2e8.jpg 500w', 'https://c2.staticflickr.com/8/7550/15532469404_e39e2fe2e8_n.jpg 320w']
}, {
	src: 'https://c2.staticflickr.com/8/7581/16129016486_085eb8dedd_c.jpg',
	thumbnail: 'https://c2.staticflickr.com/8/7581/16129016486_085eb8dedd_s.jpg',
	srcset: ['https://c2.staticflickr.com/8/7581/16129016486_085eb8dedd_b.jpg 1024w', 'https://c2.staticflickr.com/8/7581/16129016486_085eb8dedd_c.jpg 800w', 'https://c2.staticflickr.com/8/7581/16129016486_085eb8dedd.jpg 500w', 'https://c2.staticflickr.com/8/7581/16129016486_085eb8dedd_n.jpg 320w']
}];
var styles = _reactImages2['default'].extendStyles({
	image: {
		border: '10px solid white',
		borderRadius: 10,
		WebkitFilter: 'sepia(100%)',
		filter: 'sepia(100%)'
	},
	arrow: {
		backgroundColor: 'rgba(0,0,0,0.1)',
		borderRadius: 10
	}
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
	_react2['default'].createElement(_componentsGallery2['default'], { heading: 'Gallery', images: IMAGES }),
	_react2['default'].createElement(_componentsGallery2['default'], { heading: 'Custom Styles', images: IMAGES, styles: styles }),
	_react2['default'].createElement(_componentsButton2['default'], { heading: 'Launch with a button', images: IMAGES }),
	_react2['default'].createElement('hr', null),
	_react2['default'].createElement(
		'p',
		{ className: 'hint' },
		'Images courtesy of ',
		_react2['default'].createElement(
			'a',
			{ href: 'http://www.sandygonzales.com', target: '_blank' },
			'Sandy Gonzales'
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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactImages = require('react-images');

var _reactImages2 = _interopRequireDefault(_reactImages);

var Gallery = _react2['default'].createClass({
	displayName: 'Gallery',
	propTypes: {
		images: _react2['default'].PropTypes.array,
		heading: _react2['default'].PropTypes.string,
		subheading: _react2['default'].PropTypes.string,
		sepia: _react2['default'].PropTypes.bool
	},
	getInitialState: function getInitialState() {
		return {
			lightboxIsOpen: false,
			currentImage: 0
		};
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
			currentImage: 0,
			lightboxIsOpen: false
		});
	},
	gotoPrevious: function gotoPrevious() {
		this.setState({
			currentImage: this.state.currentImage - 1
		});
	},
	gotoNext: function gotoNext() {
		this.setState({
			currentImage: this.state.currentImage + 1
		});
	},
	renderGallery: function renderGallery() {
		var _this = this;

		if (!this.props.images) return;
		var gallery = this.props.images.map(function (obj, i) {
			return _react2['default'].createElement(
				'a',
				{ key: i, href: obj.src, onClick: function (event) {
						return _this.openLightbox(i, event);
					}, style: _extends({}, styles.thumbnail) },
				_react2['default'].createElement('img', { src: obj.thumbnail, width: styles.thumbnail.size, height: styles.thumbnail.size })
			);
		});

		return _react2['default'].createElement(
			'div',
			{ style: styles.gallery },
			gallery
		);
	},
	render: function render() {
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
				styles: this.props.styles,
				width: 1200
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

module.exports = Gallery;

},{"react":undefined,"react-images":undefined}]},{},[1]);
