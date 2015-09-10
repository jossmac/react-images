require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* eslint react/prop-types: 0 */

'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _componentsStandard = require('./components/Standard');

var _componentsStandard2 = _interopRequireDefault(_componentsStandard);

var IMAGES = ['http://www.fillmurray.com/400/600', 'http://www.fillmurray.com/600/900', 'http://www.fillmurray.com/500/500', 'http://www.fillmurray.com/700/700', 'http://www.fillmurray.com/900/600', 'http://www.fillmurray.com/600/400', 'http://www.fillmurray.com/401/601', 'http://www.fillmurray.com/601/901', 'http://www.fillmurray.com/501/501', 'http://www.fillmurray.com/701/701', 'http://www.fillmurray.com/901/601', 'http://www.fillmurray.com/601/401', 'http://www.fillmurray.com/402/602', 'http://www.fillmurray.com/602/902', 'http://www.fillmurray.com/502/502', 'http://www.fillmurray.com/702/702', 'http://www.fillmurray.com/902/602', 'http://www.fillmurray.com/602/402'];

_react2['default'].render(_react2['default'].createElement(
	'div',
	null,
	_react2['default'].createElement(_componentsStandard2['default'], { images: IMAGES })
), document.getElementById('example'));

},{"./components/Standard":2,"react":undefined}],2:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactImages = require('react-images');

var _reactImages2 = _interopRequireDefault(_reactImages);

var Standard = _react2['default'].createClass({
	displayName: 'Standard',
	propTypes: {
		images: _react2['default'].PropTypes.array
	},
	getInitialState: function getInitialState() {
		return {
			lightboxIsOpen: false
		};
	},

	openLightbox: function openLightbox(index) {
		event.preventDefault();
		this.setState({
			lightboxIsOpen: true,
			lightboxInitialImage: index
		});
	},
	closeLightbox: function closeLightbox() {
		this.setState({
			lightboxIsOpen: false,
			lightboxInitialImage: null
		});
	},
	renderGallery: function renderGallery() {
		var _this = this;

		if (!this.props.images) return;

		var gallery = this.props.images.map(function (url, i) {
			return _react2['default'].createElement('a', { key: i, href: url, onClick: _this.openLightbox.bind(_this, i), style: _extends({}, styles.thumbnail, { backgroundImage: 'url(' + url + ')' }) });
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
			null,
			_react2['default'].createElement(
				'h2',
				null,
				'Standard'
			),
			this.renderGallery(),
			_react2['default'].createElement(_reactImages2['default'], {
				images: this.props.images,
				initialImage: this.state.lightboxInitialImage,
				isOpen: this.state.lightboxIsOpen,
				onCancel: this.closeLightbox
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

module.exports = Standard;

},{"react":undefined,"react-images":undefined}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9yZWFjdC1jb21wb25lbnQtZ3VscC10YXNrcy9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2pvc3MvRGV2ZWxvcG1lbnQvcGFja2FnZXMvcmVhY3QvaW1hZ2VzL2V4YW1wbGVzL3NyYy9hcHAuanMiLCIvVXNlcnMvam9zcy9EZXZlbG9wbWVudC9wYWNrYWdlcy9yZWFjdC9pbWFnZXMvZXhhbXBsZXMvc3JjL2NvbXBvbmVudHMvU3RhbmRhcmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7cUJDRWtCLE9BQU87Ozs7a0NBQ0osdUJBQXVCOzs7O0FBRTVDLElBQU0sTUFBTSxHQUFHLENBQ2QsbUNBQW1DLEVBQ25DLG1DQUFtQyxFQUNuQyxtQ0FBbUMsRUFDbkMsbUNBQW1DLEVBQ25DLG1DQUFtQyxFQUNuQyxtQ0FBbUMsRUFFbkMsbUNBQW1DLEVBQ25DLG1DQUFtQyxFQUNuQyxtQ0FBbUMsRUFDbkMsbUNBQW1DLEVBQ25DLG1DQUFtQyxFQUNuQyxtQ0FBbUMsRUFFbkMsbUNBQW1DLEVBQ25DLG1DQUFtQyxFQUNuQyxtQ0FBbUMsRUFDbkMsbUNBQW1DLEVBQ25DLG1DQUFtQyxFQUNuQyxtQ0FBbUMsQ0FDbkMsQ0FBQzs7QUFFRixtQkFBTSxNQUFNLENBQ1g7OztDQUNDLG9FQUFVLE1BQU0sRUFBRSxNQUFNLEFBQUMsR0FBRztDQUN2QixFQUNOLFFBQVEsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQ2xDLENBQUM7Ozs7Ozs7OztxQkNqQ2dCLE9BQU87Ozs7MkJBQ0osY0FBYzs7OztBQUVuQyxJQUFJLFFBQVEsR0FBRyxtQkFBTSxXQUFXLENBQUM7QUFDaEMsWUFBVyxFQUFFLFVBQVU7QUFDdkIsVUFBUyxFQUFFO0FBQ1YsUUFBTSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxLQUFLO0VBQzdCO0FBQ0QsZ0JBQWUsRUFBQywyQkFBRztBQUNsQixTQUFPO0FBQ04saUJBQWMsRUFBRSxLQUFLO0dBQ3JCLENBQUM7RUFDRjs7QUFFRCxhQUFZLEVBQUMsc0JBQUMsS0FBSyxFQUFFO0FBQ3BCLE9BQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUN2QixNQUFJLENBQUMsUUFBUSxDQUFDO0FBQ2IsaUJBQWMsRUFBRSxJQUFJO0FBQ3BCLHVCQUFvQixFQUFFLEtBQUs7R0FDM0IsQ0FBQyxDQUFDO0VBQ0g7QUFDRCxjQUFhLEVBQUMseUJBQUc7QUFDaEIsTUFBSSxDQUFDLFFBQVEsQ0FBQztBQUNiLGlCQUFjLEVBQUUsS0FBSztBQUNyQix1QkFBb0IsRUFBRSxJQUFJO0dBQzFCLENBQUMsQ0FBQztFQUNIO0FBQ0QsY0FBYSxFQUFDLHlCQUFHOzs7QUFDaEIsTUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLE9BQU87O0FBRS9CLE1BQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUs7QUFDL0MsVUFDQyx3Q0FBRyxHQUFHLEVBQUUsQ0FBQyxBQUFDLEVBQUMsSUFBSSxFQUFFLEdBQUcsQUFBQyxFQUFDLE9BQU8sRUFBRSxNQUFLLFlBQVksQ0FBQyxJQUFJLFFBQU8sQ0FBQyxDQUFDLEFBQUMsRUFBQyxLQUFLLEVBQUUsU0FBYyxFQUFFLEVBQUUsTUFBTSxDQUFDLFNBQVMsRUFBRSxFQUFFLGVBQWUsV0FBUyxHQUFHLE1BQUcsRUFBRSxDQUFDLEFBQUMsR0FBRyxDQUNqSjtHQUNGLENBQUMsQ0FBQzs7QUFFSCxTQUNDOztLQUFLLEtBQUssRUFBRSxNQUFNLENBQUMsT0FBTyxBQUFDO0dBQ3pCLE9BQU87R0FDSCxDQUNMO0VBQ0Y7QUFDRCxPQUFNLEVBQUMsa0JBQUc7QUFDVCxTQUNDOzs7R0FDQzs7OztJQUFpQjtHQUNoQixJQUFJLENBQUMsYUFBYSxFQUFFO0dBQ3JCO0FBQ0MsVUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxBQUFDO0FBQzFCLGdCQUFZLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQUFBQztBQUM5QyxVQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEFBQUM7QUFDbEMsWUFBUSxFQUFFLElBQUksQ0FBQyxhQUFhLEFBQUM7S0FDNUI7R0FDRyxDQUNMO0VBQ0Y7Q0FDRCxDQUFDLENBQUM7O0FBRUgsSUFBTSxjQUFjLEdBQUcsRUFBRSxDQUFDOztBQUUxQixJQUFNLE1BQU0sR0FBRztBQUNkLFFBQU8sRUFBRTtBQUNSLFlBQVUsRUFBRSxDQUFDLENBQUM7QUFDZCxhQUFXLEVBQUUsQ0FBQyxDQUFDO0FBQ2YsVUFBUSxFQUFFLFFBQVE7RUFDbEI7QUFDRCxVQUFTLEVBQUU7QUFDVixnQkFBYyxFQUFFLE9BQU87QUFDdkIsY0FBWSxFQUFFLENBQUM7QUFDZixPQUFLLEVBQUUsTUFBTTtBQUNiLFFBQU0sRUFBRSxjQUFjO0FBQ3RCLFFBQU0sRUFBRSxDQUFDO0FBQ1QsVUFBUSxFQUFFLFFBQVE7QUFDbEIsT0FBSyxFQUFFLGNBQWM7RUFDckI7QUFDRCxlQUFjLEVBQUU7QUFDZixTQUFPLEVBQUUsT0FBTztBQUNoQixRQUFNLEVBQUUsY0FBYztBQUN0QixNQUFJLEVBQUUsS0FBSztBQUNYLFVBQVEsRUFBRSxVQUFVOztBQUVwQixpQkFBZSxFQUFFLGtCQUFrQjtBQUNuQyxjQUFZLEVBQUssa0JBQWtCO0FBQ25DLGFBQVcsRUFBTSxrQkFBa0I7QUFDbkMsV0FBUyxFQUFRLGtCQUFrQjtFQUNuQztDQUNELENBQUM7O0FBRUYsTUFBTSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyogZXNsaW50IHJlYWN0L3Byb3AtdHlwZXM6IDAgKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTdGFuZGFyZCBmcm9tICcuL2NvbXBvbmVudHMvU3RhbmRhcmQnO1xuXG5jb25zdCBJTUFHRVMgPSBbXG5cdCdodHRwOi8vd3d3LmZpbGxtdXJyYXkuY29tLzQwMC82MDAnLFxuXHQnaHR0cDovL3d3dy5maWxsbXVycmF5LmNvbS82MDAvOTAwJyxcblx0J2h0dHA6Ly93d3cuZmlsbG11cnJheS5jb20vNTAwLzUwMCcsXG5cdCdodHRwOi8vd3d3LmZpbGxtdXJyYXkuY29tLzcwMC83MDAnLFxuXHQnaHR0cDovL3d3dy5maWxsbXVycmF5LmNvbS85MDAvNjAwJyxcblx0J2h0dHA6Ly93d3cuZmlsbG11cnJheS5jb20vNjAwLzQwMCcsXG5cblx0J2h0dHA6Ly93d3cuZmlsbG11cnJheS5jb20vNDAxLzYwMScsXG5cdCdodHRwOi8vd3d3LmZpbGxtdXJyYXkuY29tLzYwMS85MDEnLFxuXHQnaHR0cDovL3d3dy5maWxsbXVycmF5LmNvbS81MDEvNTAxJyxcblx0J2h0dHA6Ly93d3cuZmlsbG11cnJheS5jb20vNzAxLzcwMScsXG5cdCdodHRwOi8vd3d3LmZpbGxtdXJyYXkuY29tLzkwMS82MDEnLFxuXHQnaHR0cDovL3d3dy5maWxsbXVycmF5LmNvbS82MDEvNDAxJyxcblxuXHQnaHR0cDovL3d3dy5maWxsbXVycmF5LmNvbS80MDIvNjAyJyxcblx0J2h0dHA6Ly93d3cuZmlsbG11cnJheS5jb20vNjAyLzkwMicsXG5cdCdodHRwOi8vd3d3LmZpbGxtdXJyYXkuY29tLzUwMi81MDInLFxuXHQnaHR0cDovL3d3dy5maWxsbXVycmF5LmNvbS83MDIvNzAyJyxcblx0J2h0dHA6Ly93d3cuZmlsbG11cnJheS5jb20vOTAyLzYwMicsXG5cdCdodHRwOi8vd3d3LmZpbGxtdXJyYXkuY29tLzYwMi80MDInLFxuXTtcblxuUmVhY3QucmVuZGVyKFxuXHQ8ZGl2PlxuXHRcdDxTdGFuZGFyZCBpbWFnZXM9e0lNQUdFU30gLz5cblx0PC9kaXY+LFxuXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXhhbXBsZScpXG4pO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBMaWdodGJveCBmcm9tICdyZWFjdC1pbWFnZXMnO1xuXG52YXIgU3RhbmRhcmQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGRpc3BsYXlOYW1lOiAnU3RhbmRhcmQnLFxuXHRwcm9wVHlwZXM6IHtcblx0XHRpbWFnZXM6IFJlYWN0LlByb3BUeXBlcy5hcnJheSxcblx0fSxcblx0Z2V0SW5pdGlhbFN0YXRlICgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0bGlnaHRib3hJc09wZW46IGZhbHNlLFxuXHRcdH07XG5cdH0sXG5cblx0b3BlbkxpZ2h0Ym94IChpbmRleCkge1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRsaWdodGJveElzT3BlbjogdHJ1ZSxcblx0XHRcdGxpZ2h0Ym94SW5pdGlhbEltYWdlOiBpbmRleCxcblx0XHR9KTtcblx0fSxcblx0Y2xvc2VMaWdodGJveCAoKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHRsaWdodGJveElzT3BlbjogZmFsc2UsXG5cdFx0XHRsaWdodGJveEluaXRpYWxJbWFnZTogbnVsbCxcblx0XHR9KTtcblx0fSxcblx0cmVuZGVyR2FsbGVyeSAoKSB7XG5cdFx0aWYgKCF0aGlzLnByb3BzLmltYWdlcykgcmV0dXJuO1xuXG5cdFx0bGV0IGdhbGxlcnkgPSB0aGlzLnByb3BzLmltYWdlcy5tYXAoKHVybCwgaSkgPT4ge1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PGEga2V5PXtpfSBocmVmPXt1cmx9IG9uQ2xpY2s9e3RoaXMub3BlbkxpZ2h0Ym94LmJpbmQodGhpcywgaSl9IHN0eWxlPXtPYmplY3QuYXNzaWduKHt9LCBzdHlsZXMudGh1bWJuYWlsLCB7IGJhY2tncm91bmRJbWFnZTogYHVybCgke3VybH0pYCB9KX0gLz5cblx0XHRcdCk7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBzdHlsZT17c3R5bGVzLmdhbGxlcnl9PlxuXHRcdFx0XHR7Z2FsbGVyeX1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH0sXG5cdHJlbmRlciAoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXY+XG5cdFx0XHRcdDxoMj5TdGFuZGFyZDwvaDI+XG5cdFx0XHRcdHt0aGlzLnJlbmRlckdhbGxlcnkoKX1cblx0XHRcdFx0PExpZ2h0Ym94XG5cdFx0XHRcdFx0aW1hZ2VzPXt0aGlzLnByb3BzLmltYWdlc31cblx0XHRcdFx0XHRpbml0aWFsSW1hZ2U9e3RoaXMuc3RhdGUubGlnaHRib3hJbml0aWFsSW1hZ2V9XG5cdFx0XHRcdFx0aXNPcGVuPXt0aGlzLnN0YXRlLmxpZ2h0Ym94SXNPcGVufVxuXHRcdFx0XHRcdG9uQ2FuY2VsPXt0aGlzLmNsb3NlTGlnaHRib3h9XG5cdFx0XHRcdC8+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59KTtcblxuY29uc3QgVEhVTUJOQUlMX1NJWkUgPSA1ODtcblxuY29uc3Qgc3R5bGVzID0ge1xuXHRnYWxsZXJ5OiB7XG5cdFx0bWFyZ2luTGVmdDogLTUsXG5cdFx0bWFyZ2luUmlnaHQ6IC01LFxuXHRcdG92ZXJmbG93OiAnaGlkZGVuJyxcblx0fSxcblx0dGh1bWJuYWlsOiB7XG5cdFx0YmFja2dyb3VuZFNpemU6ICdjb3ZlcicsXG5cdFx0Ym9yZGVyUmFkaXVzOiAzLFxuXHRcdGZsb2F0OiAnbGVmdCcsXG5cdFx0aGVpZ2h0OiBUSFVNQk5BSUxfU0laRSxcblx0XHRtYXJnaW46IDUsXG5cdFx0b3ZlcmZsb3c6ICdoaWRkZW4nLFxuXHRcdHdpZHRoOiBUSFVNQk5BSUxfU0laRSxcblx0fSxcblx0dGh1bWJuYWlsSW1hZ2U6IHtcblx0XHRkaXNwbGF5OiAnYmxvY2snLFxuXHRcdGhlaWdodDogVEhVTUJOQUlMX1NJWkUsXG5cdFx0bGVmdDogJzUwJScsXG5cdFx0cG9zaXRpb246ICdyZWxhdGl2ZScsXG5cblx0XHRXZWJraXRUcmFuc2Zvcm06ICd0cmFuc2xhdGVYKC01MCUpJyxcblx0XHRNb3pUcmFuc2Zvcm06ICAgICd0cmFuc2xhdGVYKC01MCUpJyxcblx0XHRtc1RyYW5zZm9ybTogICAgICd0cmFuc2xhdGVYKC01MCUpJyxcblx0XHR0cmFuc2Zvcm06ICAgICAgICd0cmFuc2xhdGVYKC01MCUpJyxcblx0fSxcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU3RhbmRhcmQ7XG4iXX0=
