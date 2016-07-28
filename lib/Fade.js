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