require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

module.exports = function chain(){
  var len = arguments.length
  var args = [];

  for (var i = 0; i < len; i++)
    args[i] = arguments[i]

  args = args.filter(function(fn){ return fn != null })

  if (args.length === 0) return undefined
  if (args.length === 1) return args[0]

  return args.reduce(function(current, next){
    return function chainedFunction() {
      current.apply(this, arguments);
      next.apply(this, arguments);
    };
  })
}

},{}],2:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],3:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _chainFunction = require('chain-function');

var _chainFunction2 = _interopRequireDefault(_chainFunction);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _ChildMapping = require('./utils/ChildMapping');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  component: _propTypes2.default.any,
  childFactory: _propTypes2.default.func,
  children: _propTypes2.default.node
};

var defaultProps = {
  component: 'span',
  childFactory: function childFactory(child) {
    return child;
  }
};

var TransitionGroup = function (_React$Component) {
  _inherits(TransitionGroup, _React$Component);

  function TransitionGroup(props, context) {
    _classCallCheck(this, TransitionGroup);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

    _this.performAppear = function (key, component) {
      _this.currentlyTransitioningKeys[key] = true;

      if (component.componentWillAppear) {
        component.componentWillAppear(_this._handleDoneAppearing.bind(_this, key, component));
      } else {
        _this._handleDoneAppearing(key, component);
      }
    };

    _this._handleDoneAppearing = function (key, component) {
      if (component.componentDidAppear) {
        component.componentDidAppear();
      }

      delete _this.currentlyTransitioningKeys[key];

      var currentChildMapping = (0, _ChildMapping.getChildMapping)(_this.props.children);

      if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
        // This was removed before it had fully appeared. Remove it.
        _this.performLeave(key, component);
      }
    };

    _this.performEnter = function (key, component) {
      _this.currentlyTransitioningKeys[key] = true;

      if (component.componentWillEnter) {
        component.componentWillEnter(_this._handleDoneEntering.bind(_this, key, component));
      } else {
        _this._handleDoneEntering(key, component);
      }
    };

    _this._handleDoneEntering = function (key, component) {
      if (component.componentDidEnter) {
        component.componentDidEnter();
      }

      delete _this.currentlyTransitioningKeys[key];

      var currentChildMapping = (0, _ChildMapping.getChildMapping)(_this.props.children);

      if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
        // This was removed before it had fully entered. Remove it.
        _this.performLeave(key, component);
      }
    };

    _this.performLeave = function (key, component) {
      _this.currentlyTransitioningKeys[key] = true;

      if (component.componentWillLeave) {
        component.componentWillLeave(_this._handleDoneLeaving.bind(_this, key, component));
      } else {
        // Note that this is somewhat dangerous b/c it calls setState()
        // again, effectively mutating the component before all the work
        // is done.
        _this._handleDoneLeaving(key, component);
      }
    };

    _this._handleDoneLeaving = function (key, component) {
      if (component.componentDidLeave) {
        component.componentDidLeave();
      }

      delete _this.currentlyTransitioningKeys[key];

      var currentChildMapping = (0, _ChildMapping.getChildMapping)(_this.props.children);

      if (currentChildMapping && currentChildMapping.hasOwnProperty(key)) {
        // This entered again before it fully left. Add it again.
        _this.keysToEnter.push(key);
      } else {
        _this.setState(function (state) {
          var newChildren = _extends({}, state.children);
          delete newChildren[key];
          return { children: newChildren };
        });
      }
    };

    _this.childRefs = Object.create(null);

    _this.state = {
      children: (0, _ChildMapping.getChildMapping)(props.children)
    };
    return _this;
  }

  TransitionGroup.prototype.componentWillMount = function componentWillMount() {
    this.currentlyTransitioningKeys = {};
    this.keysToEnter = [];
    this.keysToLeave = [];
  };

  TransitionGroup.prototype.componentDidMount = function componentDidMount() {
    var initialChildMapping = this.state.children;
    for (var key in initialChildMapping) {
      if (initialChildMapping[key]) {
        this.performAppear(key, this.childRefs[key]);
      }
    }
  };

  TransitionGroup.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var nextChildMapping = (0, _ChildMapping.getChildMapping)(nextProps.children);
    var prevChildMapping = this.state.children;

    this.setState({
      children: (0, _ChildMapping.mergeChildMappings)(prevChildMapping, nextChildMapping)
    });

    for (var key in nextChildMapping) {
      var hasPrev = prevChildMapping && prevChildMapping.hasOwnProperty(key);
      if (nextChildMapping[key] && !hasPrev && !this.currentlyTransitioningKeys[key]) {
        this.keysToEnter.push(key);
      }
    }

    for (var _key in prevChildMapping) {
      var hasNext = nextChildMapping && nextChildMapping.hasOwnProperty(_key);
      if (prevChildMapping[_key] && !hasNext && !this.currentlyTransitioningKeys[_key]) {
        this.keysToLeave.push(_key);
      }
    }

    // If we want to someday check for reordering, we could do it here.
  };

  TransitionGroup.prototype.componentDidUpdate = function componentDidUpdate() {
    var _this2 = this;

    var keysToEnter = this.keysToEnter;
    this.keysToEnter = [];
    keysToEnter.forEach(function (key) {
      return _this2.performEnter(key, _this2.childRefs[key]);
    });

    var keysToLeave = this.keysToLeave;
    this.keysToLeave = [];
    keysToLeave.forEach(function (key) {
      return _this2.performLeave(key, _this2.childRefs[key]);
    });
  };

  TransitionGroup.prototype.render = function render() {
    var _this3 = this;

    // TODO: we could get rid of the need for the wrapper node
    // by cloning a single child
    var childrenToRender = [];

    var _loop = function _loop(key) {
      var child = _this3.state.children[key];
      if (child) {
        var isCallbackRef = typeof child.ref !== 'string';
        var factoryChild = _this3.props.childFactory(child);
        var ref = function ref(r) {
          _this3.childRefs[key] = r;
        };

        process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(isCallbackRef, 'string refs are not supported on children of TransitionGroup and will be ignored. ' + 'Please use a callback ref instead: https://facebook.github.io/react/docs/refs-and-the-dom.html#the-ref-callback-attribute') : void 0;

        // Always chaining the refs leads to problems when the childFactory
        // wraps the child. The child ref callback gets called twice with the
        // wrapper and the child. So we only need to chain the ref if the
        // factoryChild is not different from child.
        if (factoryChild === child && isCallbackRef) {
          ref = (0, _chainFunction2.default)(child.ref, ref);
        }

        // You may need to apply reactive updates to a child as it is leaving.
        // The normal React way to do it won't work since the child will have
        // already been removed. In case you need this behavior you can provide
        // a childFactory function to wrap every child, even the ones that are
        // leaving.
        childrenToRender.push(_react2.default.cloneElement(factoryChild, {
          key: key,
          ref: ref
        }));
      }
    };

    for (var key in this.state.children) {
      _loop(key);
    }

    // Do not forward TransitionGroup props to primitive DOM nodes
    var props = _extends({}, this.props);
    delete props.transitionLeave;
    delete props.transitionName;
    delete props.transitionAppear;
    delete props.transitionEnter;
    delete props.childFactory;
    delete props.transitionLeaveTimeout;
    delete props.transitionEnterTimeout;
    delete props.transitionAppearTimeout;
    delete props.component;

    return _react2.default.createElement(this.props.component, props, childrenToRender);
  };

  return TransitionGroup;
}(_react2.default.Component);

TransitionGroup.displayName = 'TransitionGroup';


TransitionGroup.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
TransitionGroup.defaultProps = defaultProps;

exports.default = TransitionGroup;
module.exports = exports['default'];
}).call(this,require('_process'))

},{"./utils/ChildMapping":4,"_process":2,"chain-function":1,"prop-types":undefined,"react":undefined,"warning":5}],4:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.getChildMapping = getChildMapping;
exports.mergeChildMappings = mergeChildMappings;

var _react = require('react');

/**
 * Given `this.props.children`, return an object mapping key to child.
 *
 * @param {*} children `this.props.children`
 * @return {object} Mapping of key to child
 */
function getChildMapping(children) {
  if (!children) {
    return children;
  }
  var result = {};
  _react.Children.map(children, function (child) {
    return child;
  }).forEach(function (child) {
    result[child.key] = child;
  });
  return result;
}

/**
 * When you're adding or removing children some may be added or removed in the
 * same render pass. We want to show *both* since we want to simultaneously
 * animate elements in and out. This function takes a previous set of keys
 * and a new set of keys and merges them with its best guess of the correct
 * ordering. In the future we may expose some of the utilities in
 * ReactMultiChild to make this easy, but for now React itself does not
 * directly have this concept of the union of prevChildren and nextChildren
 * so we implement it here.
 *
 * @param {object} prev prev children as returned from
 * `ReactTransitionChildMapping.getChildMapping()`.
 * @param {object} next next children as returned from
 * `ReactTransitionChildMapping.getChildMapping()`.
 * @return {object} a key set that contains all keys in `prev` and all keys
 * in `next` in a reasonable order.
 */
function mergeChildMappings(prev, next) {
  prev = prev || {};
  next = next || {};

  function getValueForKey(key) {
    if (next.hasOwnProperty(key)) {
      return next[key];
    }

    return prev[key];
  }

  // For each key of `next`, the list of keys to insert before that key in
  // the combined list
  var nextKeysPending = {};

  var pendingKeys = [];
  for (var prevKey in prev) {
    if (next.hasOwnProperty(prevKey)) {
      if (pendingKeys.length) {
        nextKeysPending[prevKey] = pendingKeys;
        pendingKeys = [];
      }
    } else {
      pendingKeys.push(prevKey);
    }
  }

  var i = void 0;
  var childMapping = {};
  for (var nextKey in next) {
    if (nextKeysPending.hasOwnProperty(nextKey)) {
      for (i = 0; i < nextKeysPending[nextKey].length; i++) {
        var pendingNextKey = nextKeysPending[nextKey][i];
        childMapping[nextKeysPending[nextKey][i]] = getValueForKey(pendingNextKey);
      }
    }
    childMapping[nextKey] = getValueForKey(nextKey);
  }

  // Finally, add the keys which didn't appear before any key in `next`
  for (i = 0; i < pendingKeys.length; i++) {
    childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
  }

  return childMapping;
}
},{"react":undefined}],5:[function(require,module,exports){
(function (process){
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = function() {};

if (process.env.NODE_ENV !== 'production') {
  warning = function(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error(
        '`warning(condition, format, ...args)` requires a warning ' +
        'message argument'
      );
    }

    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
      throw new Error(
        'The warning format should be able to uniquely identify this ' +
        'warning. Please, use a more descriptive format than: ' + format
      );
    }

    if (!condition) {
      var argIndex = 0;
      var message = 'Warning: ' +
        format.replace(/%s/g, function() {
          return args[argIndex++];
        });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch(x) {}
    }
  };
}

module.exports = warning;

}).call(this,require('_process'))

},{"_process":2}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _glamor = require('glamor');

var glamor = _interopRequireWildcard(_glamor);

var _glamorous = require('glamorous');

var _glamorous2 = _interopRequireDefault(_glamorous);

var exitXPosition = '10px';
var animationDuration = '500ms';

var animationEnter = glamor.css.keyframes({
	from: {
		opacity: 0,
		transform: 'translate(' + exitXPosition + ', 0)'
	},
	to: {
		opacity: 1,
		transform: 'translate(0, 0)'
	}
});
var animationLeave = glamor.css.keyframes({
	from: {
		opacity: 1,
		transform: 'translate(0, 0)'
	},
	to: {
		opacity: 0,
		transform: 'translate(' + exitXPosition + ', 0)'
	}
});

var Wrapper = _glamorous2['default'].div({}, function (_ref) {
	var isEntering = _ref.isEntering;
	var isLeaving = _ref.isLeaving;

	var animation = 'initial';
	if (isEntering) animation = animationEnter + ' ' + animationDuration;
	if (isLeaving) animation = animationLeave + ' ' + animationDuration;

	console.log('isEntering', isEntering);

	return { animation: animation };
});

var AnimationWrapper = (function (_PureComponent) {
	_inherits(AnimationWrapper, _PureComponent);

	function AnimationWrapper(props) {
		_classCallCheck(this, AnimationWrapper);

		_get(Object.getPrototypeOf(AnimationWrapper.prototype), 'constructor', this).call(this, props);

		console.log('AnimationWrapper');

		this.parentNode = null;
		this.state = {
			isEntering: false,
			isLeaving: false
		};

		this.runAfterAnimation = this.runAfterAnimation.bind(this);
	}

	_createClass(AnimationWrapper, [{
		key: 'componentWillEnter',
		value: function componentWillEnter(callback) {
			console.log('componentWillEnter');
			this.setState({ isEntering: true });
			this.runAfterAnimation(callback);
		}
	}, {
		key: 'componentDidEnter',
		value: function componentDidEnter() {
			console.log('componentDidEnter');
			this.setState({ isEntering: false });
		}
	}, {
		key: 'componentWillLeave',
		value: function componentWillLeave(callback) {
			console.log('componentWillLeave');
			this.setState({ isLeaving: true });
			this.runAfterAnimation(callback);
		}
	}, {
		key: 'componentDidLeave',
		value: function componentDidLeave() {
			console.log('componentDidLeave');
			this.setState({ isLeaving: false });
		}

		/**
   * componentWillEnter and componentWillLeave provide a callback function which we need to call
   * when our enter/leave animations are complete. This function listens for an animationend event
   * then runs the callback.
   */
	}, {
		key: 'runAfterAnimation',
		value: function runAfterAnimation(callback) {
			console.log('runAfterAnimation');
			var parentNode = this.parentNode;

			function executeCallback() {
				callback();
				return parentNode && parentNode.removeEventListener('animationend', executeCallback);
			}

			return parentNode && parentNode.addEventListener('animationend', executeCallback);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this = this;

			return _react2['default'].createElement(
				Wrapper,
				{
					innerRef: function (node) {
						_this.parentNode = node ? node.parentElement : null;
					},
					isEntering: this.state.isEntering,
					isLeaving: this.state.isLeaving
				},
				this.props.children
			);
		}
	}]);

	return AnimationWrapper;
})(_react.PureComponent);

exports['default'] = AnimationWrapper;

AnimationWrapper.propTypes = {
	children: _propTypes2['default'].node
};
module.exports = exports['default'];

},{"glamor":undefined,"glamorous":undefined,"prop-types":undefined,"react":undefined}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = Arrow;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _icons = require('../icons');

var _glamorous = require('glamorous');

var _glamorous2 = _interopRequireDefault(_glamorous);

function Arrow(_ref) {
	var direction = _ref.direction;
	var onClick = _ref.onClick;
	var size = _ref.size;

	var props = _objectWithoutProperties(_ref, ['direction', 'onClick', 'size']);

	return _react2['default'].createElement(
		Button,
		_extends({
			direction: direction,
			onClick: onClick,
			onTouchEnd: onClick,
			size: size,
			type: 'button'
		}, props),
		direction === 'left' ? _react2['default'].createElement(_icons.ArrowLeft, { size: size }) : _react2['default'].createElement(_icons.ArrowRight, { size: size })
	);
}

Arrow.propTypes = {
	direction: _propTypes2['default'].oneOf(['left', 'right']),
	onClick: _propTypes2['default'].func.isRequired,
	size: _propTypes2['default'].oneOf(['medium', 'small']).isRequired
};
Arrow.defaultProps = {
	size: 'medium'
};

var Button = _glamorous2['default'].button({
	background: 'none',
	border: 'none',
	borderRadius: 4,
	cursor: 'pointer',
	outline: 'none',
	padding: 10, // increase hit area
	position: 'absolute',
	top: '50%',

	// disable user select
	WebkitTouchCallout: 'none',
	userSelect: 'none'
}, function (_ref2) {
	var theme = _ref2.theme;
	return {
		height: theme.arrow.height,
		marginTop: theme.arrow.height / -2,
		width: 40,

		'@media (min-width: 768px)': {
			width: 70
		}
	};
});
module.exports = exports['default'];

},{"../icons":14,"glamorous":undefined,"prop-types":undefined,"react":undefined}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _glamorous = require('glamorous');

var _glamorous2 = _interopRequireDefault(_glamorous);

exports['default'] = _glamorous2['default'].div({
	alignItems: 'center',
	boxSizing: 'border-box',
	display: 'flex',
	height: '100%',
	justifyContent: 'center',
	left: 0,
	position: 'fixed',
	top: 0,
	width: '100%'
}, function (_ref) {
	var theme = _ref.theme;
	return {
		backgroundColor: theme.container.background,
		paddingBottom: theme.container.gutter.vertical,
		paddingLeft: theme.container.gutter.horizontal,
		paddingRight: theme.container.gutter.horizontal,
		paddingTop: theme.container.gutter.vertical,
		zIndex: theme.container.zIndex
	};
});
module.exports = exports['default'];

},{"glamorous":undefined}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = Footer;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _glamorous = require('glamorous');

var _glamorous2 = _interopRequireDefault(_glamorous);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function Footer(_ref) {
	var caption = _ref.caption;
	var countCurrent = _ref.countCurrent;
	var countSeparator = _ref.countSeparator;
	var countTotal = _ref.countTotal;
	var showCount = _ref.showCount;

	var props = _objectWithoutProperties(_ref, ['caption', 'countCurrent', 'countSeparator', 'countTotal', 'showCount']);

	if (!caption && !showCount) return null;

	var imageCount = showCount ? _react2['default'].createElement(
		Count,
		null,
		countCurrent,
		countSeparator,
		countTotal
	) : _react2['default'].createElement('span', null);

	return _react2['default'].createElement(
		Wrapper,
		props,
		caption ? _react2['default'].createElement(
			Caption,
			null,
			caption
		) : _react2['default'].createElement('span', null),
		imageCount
	);
}

Footer.propTypes = {
	caption: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].element]),
	countCurrent: _propTypes2['default'].number,
	countSeparator: _propTypes2['default'].string,
	countTotal: _propTypes2['default'].number,
	showCount: _propTypes2['default'].bool
};

var Wrapper = _glamorous2['default'].div({
	boxSizing: 'border-box',
	cursor: 'auto',
	display: 'flex',
	justifyContent: 'space-between',
	left: 0,
	lineHeight: 1.3
}, function (_ref2) {
	var theme = _ref2.theme;
	return {
		color: theme.footer.color,
		paddingBottom: theme.footer.gutter.vertical,
		paddingLeft: theme.footer.gutter.horizontal,
		paddingRight: theme.footer.gutter.horizontal,
		paddingTop: theme.footer.gutter.vertical
	};
});

var Count = _glamorous2['default'].div({
	paddingLeft: '1em' }, // add a small gutter for the caption
function (_ref3) {
	var theme = _ref3.theme;
	return {
		color: theme.footer.count.color,
		fontSize: theme.footer.count.fontSize
	};
});

var Caption = _glamorous2['default'].figcaption({
	flex: '1 1 0'
});
module.exports = exports['default'];

},{"glamorous":undefined,"prop-types":undefined,"react":undefined}],10:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _glamorous = require('glamorous');

var _glamorous2 = _interopRequireDefault(_glamorous);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _icons = require('../icons');

function Header(_ref) {
	var customControls = _ref.customControls;
	var onClose = _ref.onClose;
	var showCloseButton = _ref.showCloseButton;
	var closeButtonTitle = _ref.closeButtonTitle;

	var props = _objectWithoutProperties(_ref, ['customControls', 'onClose', 'showCloseButton', 'closeButtonTitle']);

	return _react2['default'].createElement(
		Wrapper,
		props,
		customControls ? customControls : _react2['default'].createElement('span', null),
		!!showCloseButton && _react2['default'].createElement(
			Button,
			{
				title: closeButtonTitle,
				type: 'button',
				onClick: onClose
			},
			_react2['default'].createElement(_icons.Close, { fill: 'white', type: 'close' })
		)
	);
}

Header.propTypes = {
	customControls: _propTypes2['default'].array,
	onClose: _propTypes2['default'].func.isRequired,
	showCloseButton: _propTypes2['default'].bool
};

var Wrapper = _glamorous2['default'].div({
	display: 'flex',
	justifyContent: 'space-between'
}, function (_ref2) {
	var theme = _ref2.theme;
	return {
		height: theme.header.height
	};
});

var Button = _glamorous2['default'].button({
	background: 'none',
	border: 'none',
	cursor: 'pointer',
	outline: 'none',
	position: 'relative',
	top: 0,
	verticalAlign: 'bottom',

	// increase hit area
	height: 40,
	marginRight: -10,
	padding: 10,
	width: 40
});

module.exports = Header;

},{"../icons":14,"glamorous":undefined,"prop-types":undefined,"react":undefined}],11:[function(require,module,exports){
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

var _glamorous = require('glamorous');

var _glamorous2 = _interopRequireDefault(_glamorous);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Thumbnail = require('./Thumbnail');

var _Thumbnail2 = _interopRequireDefault(_Thumbnail);

var _Arrow = require('./Arrow');

var _Arrow2 = _interopRequireDefault(_Arrow);

var Wrapper = (0, _glamorous2['default'])({
	padding: '0 50px',
	position: 'absolute',
	textAlign: 'center',
	whiteSpace: 'nowrap'
}, function (_ref) {
	var theme = _ref.theme;
	return {
		bottom: theme.container.gutter.vertical,
		height: theme.thumbnail.size
	};
});

// const arrowStyles = {
// 	height: theme.thumbnail.size + (theme.thumbnail.gutter * 2),
// 	width: 40,
// };

var PaginatedThumbnails = (function (_Component) {
	_inherits(PaginatedThumbnails, _Component);

	function PaginatedThumbnails(props) {
		_classCallCheck(this, PaginatedThumbnails);

		_get(Object.getPrototypeOf(PaginatedThumbnails.prototype), 'constructor', this).call(this, props);

		this.state = {
			hasCustomPage: false
		};

		this.gotoPrev = this.gotoPrev.bind(this);
		this.gotoNext = this.gotoNext.bind(this);
	}

	_createClass(PaginatedThumbnails, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			// Component should be controlled, flush state when currentImage changes
			if (nextProps.currentImage !== this.props.currentImage) {
				this.setState({
					hasCustomPage: false
				});
			}
		}

		// ==============================
		// METHODS
		// ==============================

	}, {
		key: 'getFirst',
		value: function getFirst() {
			var _props = this.props;
			var currentImage = _props.currentImage;
			var offset = _props.offset;

			if (this.state.hasCustomPage) {
				return this.clampFirst(this.state.first);
			}
			return this.clampFirst(currentImage - offset);
		}
	}, {
		key: 'setFirst',
		value: function setFirst(event, newFirst) {
			var first = this.state.first;

			if (event) {
				event.preventDefault();
				event.stopPropagation();
			}

			if (first === newFirst) return;

			this.setState({
				hasCustomPage: true,
				first: newFirst
			});
		}
	}, {
		key: 'gotoPrev',
		value: function gotoPrev(event) {
			this.setFirst(event, this.getFirst() - this.props.offset);
		}
	}, {
		key: 'gotoNext',
		value: function gotoNext(event) {
			this.setFirst(event, this.getFirst() + this.props.offset);
		}
	}, {
		key: 'clampFirst',
		value: function clampFirst(value) {
			var _props2 = this.props;
			var images = _props2.images;
			var offset = _props2.offset;

			var totalCount = 2 * offset + 1; // show $offset extra thumbnails on each side

			if (value < 0) {
				return 0;
			} else if (value + totalCount > images.length) {
				// Too far
				return images.length - totalCount;
			} else {
				return value;
			}
		}

		// ==============================
		// RENDERERS
		// ==============================

	}, {
		key: 'renderArrowPrev',
		value: function renderArrowPrev() {
			if (this.getFirst() <= 0) return null;

			return _react2['default'].createElement(_Arrow2['default'], {
				direction: 'left',
				size: 'small',
				icon: 'arrowLeft',
				onClick: this.gotoPrev,
				title: 'Previous (Left arrow key)',
				type: 'button'
			});
		}
	}, {
		key: 'renderArrowNext',
		value: function renderArrowNext() {
			var _props3 = this.props;
			var offset = _props3.offset;
			var images = _props3.images;

			var totalCount = 2 * offset + 1;
			if (this.getFirst() + totalCount >= images.length) return null;

			return _react2['default'].createElement(_Arrow2['default'], {
				direction: 'right',
				size: 'small',
				icon: 'arrowRight',
				onClick: this.gotoNext,
				title: 'Next (Right arrow key)',
				type: 'button'
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _props4 = this.props;
			var images = _props4.images;
			var currentImage = _props4.currentImage;
			var onClickThumbnail = _props4.onClickThumbnail;
			var offset = _props4.offset;

			var totalCount = 2 * offset + 1; // show $offset extra thumbnails on each side
			var thumbnails = [];
			var baseOffset = 0;
			if (images.length <= totalCount) {
				thumbnails = images;
			} else {
				// Try to center current image in list
				baseOffset = this.getFirst();
				thumbnails = images.slice(baseOffset, baseOffset + totalCount);
			}

			return _react2['default'].createElement(
				Wrapper,
				null,
				this.renderArrowPrev(),
				thumbnails.map(function (img, idx) {
					return _react2['default'].createElement(_Thumbnail2['default'], _extends({ key: baseOffset + idx
					}, img, {
						index: baseOffset + idx,
						onClick: onClickThumbnail,
						active: baseOffset + idx === currentImage }));
				}),
				this.renderArrowNext()
			);
		}
	}]);

	return PaginatedThumbnails;
})(_react.Component);

exports['default'] = PaginatedThumbnails;

PaginatedThumbnails.propTypes = {
	currentImage: _propTypes2['default'].number,
	images: _propTypes2['default'].array,
	offset: _propTypes2['default'].number,
	onClickThumbnail: _propTypes2['default'].func.isRequired
};
module.exports = exports['default'];

},{"./Arrow":7,"./Thumbnail":13,"glamorous":undefined,"prop-types":undefined,"react":undefined}],12:[function(require,module,exports){
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

var _reactDom = require('react-dom');

var Portal = (function (_Component) {
	_inherits(Portal, _Component);

	function Portal(props) {
		_classCallCheck(this, Portal);

		_get(Object.getPrototypeOf(Portal.prototype), 'constructor', this).call(this, props);
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
			(0, _reactDom.render)(_react2['default'].createElement('div', this.props), this.portalElement);
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
module.exports = exports['default'];

},{"react":undefined,"react-dom":undefined}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _glamorous = require('glamorous');

var _glamorous2 = _interopRequireDefault(_glamorous);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function Thumbnail(_ref) {
	var index = _ref.index;
	var src = _ref.src;
	var thumbnail = _ref.thumbnail;
	var active = _ref.active;
	var onClick = _ref.onClick;

	var url = thumbnail ? thumbnail : src;
	var style = { backgroundImage: 'url("' + url + '")' };
	var handleClick = function handleClick(e) {
		e.preventDefault();
		e.stopPropagation();
		onClick(index);
	};

	return _react2['default'].createElement(Div, { isSelected: active, onClick: handleClick, style: style });
}

Thumbnail.propTypes = {
	active: _propTypes2['default'].bool,
	index: _propTypes2['default'].number,
	onClick: _propTypes2['default'].func.isRequired,
	src: _propTypes2['default'].string,
	thumbnail: _propTypes2['default'].string
};

Thumbnail.contextTypes = {
	theme: _propTypes2['default'].object.isRequired
};

var Div = _glamorous2['default'].div({
	backgroundPosition: 'center',
	backgroundSize: 'cover',
	borderRadius: 2,
	cursor: 'pointer',
	display: 'inline-block',
	overflow: 'hidden'
}, function (_ref2) {
	var isSelected = _ref2.isSelected;
	var theme = _ref2.theme;
	return {
		boxShadow: 'inset 0 0 0 2px ' + (isSelected ? theme.thumbnail.borderColor : theme.thumbnail.selectedBorderColor),
		height: theme.thumbnail.size,
		margin: theme.thumbnail.gutter,
		width: theme.thumbnail.size
	};
});

exports['default'] = Thumbnail;
module.exports = exports['default'];

},{"glamorous":undefined,"prop-types":undefined,"react":undefined}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var Svg = function Svg(_ref) {
	var children = _ref.children;
	var fill = _ref.fill;

	var rest = _objectWithoutProperties(_ref, ["children", "fill"]);

	return _react2["default"].createElement(
		"svg",
		_extends({ fill: fill, version: "1.1", xmlns: "http://www.w3.org/2000/svg", x: "0px", y: "0px", width: "100%", height: "100%", viewBox: "0 0 512 512" }, rest),
		children
	);
};

var ArrowLeft = function ArrowLeft(props) {
	return _react2["default"].createElement(
		Svg,
		props,
		_react2["default"].createElement("path", { d: "M213.7,256L213.7,256L213.7,256L380.9,81.9c4.2-4.3,4.1-11.4-0.2-15.8l-29.9-30.6c-4.3-4.4-11.3-4.5-15.5-0.2L131.1,247.9 c-2.2,2.2-3.2,5.2-3,8.1c-0.1,3,0.9,5.9,3,8.1l204.2,212.7c4.2,4.3,11.2,4.2,15.5-0.2l29.9-30.6c4.3-4.4,4.4-11.5,0.2-15.8 L213.7,256z" })
	);
};
exports.ArrowLeft = ArrowLeft;
var ArrowRight = function ArrowRight(props) {
	return _react2["default"].createElement(
		Svg,
		props,
		_react2["default"].createElement("path", { d: "M298.3,256L298.3,256L298.3,256L131.1,81.9c-4.2-4.3-4.1-11.4,0.2-15.8l29.9-30.6c4.3-4.4,11.3-4.5,15.5-0.2l204.2,212.7 c2.2,2.2,3.2,5.2,3,8.1c0.1,3-0.9,5.9-3,8.1L176.7,476.8c-4.2,4.3-11.2,4.2-15.5-0.2L131.3,446c-4.3-4.4-4.4-11.5-0.2-15.8 L298.3,256z" })
	);
};
exports.ArrowRight = ArrowRight;
var Close = function Close(props) {
	return _react2["default"].createElement(
		Svg,
		props,
		_react2["default"].createElement("path", { d: "M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4 L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1 c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1 c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z" })
	);
};
exports.Close = Close;

},{"react":undefined}],15:[function(require,module,exports){
// ==============================
// THEME
// ==============================

'use strict';

var theme = {};

// container
theme.container = {
	background: 'rgba(0, 0, 0, 0.8)',
	gutter: {
		horizontal: 10,
		vertical: 10
	},
	zIndex: 2001
};

// header
theme.header = {
	height: 40
};
theme.close = {
	fill: 'white'
};

// footer
theme.footer = {
	color: 'white',
	count: {
		color: 'rgba(255, 255, 255, 0.75)',
		fontSize: '0.85em'
	},
	height: 40,
	gutter: {
		horizontal: 0,
		vertical: 5
	}
};

// thumbnails
theme.pagination = {
	arrow: {
		background: 'black',
		fill: 'white',
		size: 50
	},
	thumbnail: {
		borderColor: 'hsla(0, 0%, 100%, 0.2)',
		selectedBorderColor: 'white',
		size: 50,
		gutter: 2
	}
};

// arrow
theme.arrow = {
	background: 'black',
	fill: 'white',
	height: 120
};

module.exports = theme;

},{}],16:[function(require,module,exports){
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

},{}],17:[function(require,module,exports){
// Return true if window + document

'use strict';

module.exports = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

},{}],18:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function deepMerge(target) {
	var source = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	var extended = _extends({}, target);

	Object.keys(source).forEach(function (key) {
		if (typeof source[key] !== 'object' || !source[key]) {
			extended[key] = source[key];
		} else {
			if (!target[key]) {
				extended[key] = source[key];
			} else {
				extended[key] = deepMerge(target[key], source[key]);
			}
		}
	});

	return extended;
}

module.exports = deepMerge;

},{}],19:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _bindFunctions = require('./bindFunctions');

var _bindFunctions2 = _interopRequireDefault(_bindFunctions);

var _canUseDom = require('./canUseDom');

var _canUseDom2 = _interopRequireDefault(_canUseDom);

var _deepMerge = require('./deepMerge');

var _deepMerge2 = _interopRequireDefault(_deepMerge);

module.exports = {
	bindFunctions: _bindFunctions2['default'],
	canUseDom: _canUseDom2['default'],
	deepMerge: _deepMerge2['default']
};

},{"./bindFunctions":16,"./canUseDom":17,"./deepMerge":18}],"react-images":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactTransitionGroupTransitionGroup = require('react-transition-group/TransitionGroup');

var _reactTransitionGroupTransitionGroup2 = _interopRequireDefault(_reactTransitionGroupTransitionGroup);

var _glamorous = require('glamorous');

var _glamorous2 = _interopRequireDefault(_glamorous);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactScrolllock = require('react-scrolllock');

var _reactScrolllock2 = _interopRequireDefault(_reactScrolllock);

var _theme = require('./theme');

var _theme2 = _interopRequireDefault(_theme);

var _componentsAnimationWrapper = require('./components/AnimationWrapper');

var _componentsAnimationWrapper2 = _interopRequireDefault(_componentsAnimationWrapper);

var _componentsArrow = require('./components/Arrow');

var _componentsArrow2 = _interopRequireDefault(_componentsArrow);

var _componentsContainer = require('./components/Container');

var _componentsContainer2 = _interopRequireDefault(_componentsContainer);

var _componentsFooter = require('./components/Footer');

var _componentsFooter2 = _interopRequireDefault(_componentsFooter);

var _componentsHeader = require('./components/Header');

var _componentsHeader2 = _interopRequireDefault(_componentsHeader);

var _componentsPaginatedThumbnails = require('./components/PaginatedThumbnails');

var _componentsPaginatedThumbnails2 = _interopRequireDefault(_componentsPaginatedThumbnails);

var _componentsPortal = require('./components/Portal');

var _componentsPortal2 = _interopRequireDefault(_componentsPortal);

var _utils = require('./utils');

var Lightbox = (function (_Component) {
	_inherits(Lightbox, _Component);

	function Lightbox(props) {
		_classCallCheck(this, Lightbox);

		_get(Object.getPrototypeOf(Lightbox.prototype), 'constructor', this).call(this, props);
		this.theme = (0, _utils.deepMerge)(_theme2['default'], props.theme);
		_utils.bindFunctions.call(this, ['gotoNext', 'gotoPrev', 'closeBackdrop', 'handleKeyboardInput']);
	}

	_createClass(Lightbox, [{
		key: 'getChildContext',
		value: function getChildContext() {
			return {
				theme: this.theme
			};
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			if (this.props.isOpen && this.props.enableKeyboardInput) {
				window.addEventListener('keydown', this.handleKeyboardInput);
			}
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (!_utils.canUseDom) return;

			// preload images
			if (nextProps.preloadNextImage) {
				var currentIndex = this.props.currentImage;
				var nextIndex = nextProps.currentImage + 1;
				var prevIndex = nextProps.currentImage - 1;
				var preloadIndex = undefined;

				if (currentIndex && nextProps.currentImage > currentIndex) {
					preloadIndex = nextIndex;
				} else if (currentIndex && nextProps.currentImage < currentIndex) {
					preloadIndex = prevIndex;
				}

				// if we know the user's direction just get one image
				// otherwise, to be safe, we need to grab one in each direction
				if (preloadIndex) {
					this.preloadImage(preloadIndex);
				} else {
					this.preloadImage(prevIndex);
					this.preloadImage(nextIndex);
				}
			}

			// add/remove event listeners
			if (!this.props.isOpen && nextProps.isOpen && nextProps.enableKeyboardInput) {
				window.addEventListener('keydown', this.handleKeyboardInput);
			}
			if (!nextProps.isOpen && nextProps.enableKeyboardInput) {
				window.removeEventListener('keydown', this.handleKeyboardInput);
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			if (this.props.enableKeyboardInput) {
				window.removeEventListener('keydown', this.handleKeyboardInput);
			}
		}

		// ==============================
		// METHODS
		// ==============================

	}, {
		key: 'preloadImage',
		value: function preloadImage(idx) {
			var image = this.props.images[idx];

			if (!image) return;

			var img = new Image();

			img.src = image.src;

			if (image.srcset) {
				img.srcset = image.srcset.join();
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
		key: 'closeBackdrop',
		value: function closeBackdrop(event) {
			if (event.target.id === 'lightboxBackdrop') {
				this.props.onClose();
			}
		}
	}, {
		key: 'handleKeyboardInput',
		value: function handleKeyboardInput(event) {
			if (event.keyCode === 37) {
				// left
				this.gotoPrev(event);
				return true;
			} else if (event.keyCode === 39) {
				// right
				this.gotoNext(event);
				return true;
			} else if (event.keyCode === 27) {
				// esc
				this.props.onClose();
				return true;
			}
			return false;
		}

		// ==============================
		// RENDERERS
		// ==============================

	}, {
		key: 'renderArrowPrev',
		value: function renderArrowPrev() {
			if (this.props.currentImage === 0) return null;

			return _react2['default'].createElement(_componentsArrow2['default'], {
				direction: 'left',
				icon: 'arrowLeft',
				onClick: this.gotoPrev,
				title: this.props.leftArrowTitle,
				type: 'button'
			});
		}
	}, {
		key: 'renderArrowNext',
		value: function renderArrowNext() {
			if (this.props.currentImage === this.props.images.length - 1) return null;

			return _react2['default'].createElement(_componentsArrow2['default'], {
				direction: 'right',
				icon: 'arrowRight',
				onClick: this.gotoNext,
				title: this.props.rightArrowTitle,
				type: 'button'
			});
		}
	}, {
		key: 'renderDialog',
		value: function renderDialog() {
			var _props = this.props;
			var backdropClosesModal = _props.backdropClosesModal;
			var customControls = _props.customControls;
			var isOpen = _props.isOpen;
			var onClose = _props.onClose;
			var showCloseButton = _props.showCloseButton;
			var showThumbnails = _props.showThumbnails;
			var width = _props.width;

			// if (!isOpen) return <span key="closed" />;
			if (!isOpen) return null;

			var offsetThumbnails = 0;
			if (showThumbnails) {
				offsetThumbnails = this.theme.pagination.thumbnail.size + this.theme.container.gutter.vertical;
			}

			return _react2['default'].createElement(
				_componentsContainer2['default'],
				{
					key: 'open',
					onClick: !!backdropClosesModal && this.closeBackdrop,
					onTouchEnd: !!backdropClosesModal && this.closeBackdrop
				},
				_react2['default'].createElement(
					Content,
					{ style: { marginBottom: offsetThumbnails, maxWidth: width } },
					_react2['default'].createElement(_componentsHeader2['default'], {
						customControls: customControls,
						onClose: onClose,
						showCloseButton: showCloseButton,
						closeButtonTitle: this.props.closeButtonTitle
					}),
					this.renderImages()
				),
				this.renderThumbnails(),
				this.renderArrowPrev(),
				this.renderArrowNext(),
				_react2['default'].createElement(_reactScrolllock2['default'], null)
			);
		}
	}, {
		key: 'renderImages',
		value: function renderImages() {
			var _props2 = this.props;
			var currentImage = _props2.currentImage;
			var images = _props2.images;
			var imageCountSeparator = _props2.imageCountSeparator;
			var onClickImage = _props2.onClickImage;
			var showImageCount = _props2.showImageCount;
			var showThumbnails = _props2.showThumbnails;

			if (!images || !images.length) return null;

			var image = images[currentImage];

			var srcset = undefined;
			var sizes = undefined;

			if (image.srcset) {
				srcset = image.srcset.join();
				sizes = '100vw';
			}

			var thumbnailsSize = showThumbnails ? this.theme.pagination.thumbnail.size : 0;
			var heightOffset = this.theme.header.height + this.theme.footer.height + thumbnailsSize + this.theme.container.gutter.vertical + 'px';

			return _react2['default'].createElement(
				Figure,
				null,
				_react2['default'].createElement(Image, {
					onClick: !!onClickImage && onClickImage,
					sizes: sizes,
					alt: image.alt,
					src: image.src,
					srcSet: srcset,
					style: {
						cursor: this.props.onClickImage ? 'pointer' : 'auto',
						maxHeight: 'calc(100vh - ' + heightOffset + ')'
					}
				}),
				_react2['default'].createElement(_componentsFooter2['default'], {
					caption: images[currentImage].caption,
					countCurrent: currentImage + 1,
					countSeparator: imageCountSeparator,
					countTotal: images.length,
					showCount: showImageCount
				})
			);
		}
	}, {
		key: 'renderThumbnails',
		value: function renderThumbnails() {
			var _props3 = this.props;
			var images = _props3.images;
			var currentImage = _props3.currentImage;
			var onClickThumbnail = _props3.onClickThumbnail;
			var showThumbnails = _props3.showThumbnails;
			var thumbnailOffset = _props3.thumbnailOffset;

			if (!showThumbnails) return;

			return _react2['default'].createElement(_componentsPaginatedThumbnails2['default'], {
				currentImage: currentImage,
				images: images,
				offset: thumbnailOffset,
				onClickThumbnail: onClickThumbnail
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var theme = this.props.theme;

			return _react2['default'].createElement(
				_glamorous.ThemeProvider,
				{ theme: (0, _utils.deepMerge)(_theme2['default'], theme) },
				_react2['default'].createElement(
					_reactTransitionGroupTransitionGroup2['default'],
					null,
					_react2['default'].createElement(
						_componentsAnimationWrapper2['default'],
						null,
						this.renderDialog()
					)
				)
			);
		}
	}]);

	return Lightbox;
})(_react.Component);

Lightbox.propTypes = {
	backdropClosesModal: _propTypes2['default'].bool,
	closeButtonTitle: _propTypes2['default'].string,
	currentImage: _propTypes2['default'].number,
	customControls: _propTypes2['default'].arrayOf(_propTypes2['default'].node),
	enableKeyboardInput: _propTypes2['default'].bool,
	imageCountSeparator: _propTypes2['default'].string,
	images: _propTypes2['default'].arrayOf(_propTypes2['default'].shape({
		src: _propTypes2['default'].string.isRequired,
		srcset: _propTypes2['default'].array,
		caption: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].element]),
		thumbnail: _propTypes2['default'].string
	})).isRequired,
	isOpen: _propTypes2['default'].bool,
	leftArrowTitle: _propTypes2['default'].string,
	onClickImage: _propTypes2['default'].func,
	onClickNext: _propTypes2['default'].func,
	onClickPrev: _propTypes2['default'].func,
	onClose: _propTypes2['default'].func.isRequired,
	preloadNextImage: _propTypes2['default'].bool,
	rightArrowTitle: _propTypes2['default'].string,
	showCloseButton: _propTypes2['default'].bool,
	showImageCount: _propTypes2['default'].bool,
	showThumbnails: _propTypes2['default'].bool,
	theme: _propTypes2['default'].object,
	thumbnailOffset: _propTypes2['default'].number,
	width: _propTypes2['default'].number
};
Lightbox.defaultProps = {
	closeButtonTitle: 'Close (Esc)',
	currentImage: 0,
	enableKeyboardInput: true,
	imageCountSeparator: ' of ',
	leftArrowTitle: 'Previous (Left arrow key)',
	onClickShowNextImage: true,
	preloadNextImage: true,
	rightArrowTitle: 'Next (Right arrow key)',
	showCloseButton: true,
	showImageCount: true,
	theme: {},
	thumbnailOffset: 2,
	width: 1024
};
Lightbox.childContextTypes = {
	theme: _propTypes2['default'].object.isRequired
};

var Content = _glamorous2['default'].div({
	position: 'relative'
});
var Figure = _glamorous2['default'].div({
	margin: 0 });
// remove browser default
var Image = _glamorous2['default'].img({
	display: 'block', // removes browser default gutter
	height: 'auto',
	margin: '0 auto', // maintain center on very short screens OR very narrow image
	maxWidth: '100%',

	// disable user select
	WebkitTouchCallout: 'none',
	userSelect: 'none'
});

exports['default'] = Lightbox;
module.exports = exports['default'];
/*
Re-implement when react warning "unknown props"
https://fb.me/react-unknown-prop is resolved
<Swipeable onSwipedLeft={this.gotoNext} onSwipedRight={this.gotoPrev} />
*/

},{"./components/AnimationWrapper":6,"./components/Arrow":7,"./components/Container":8,"./components/Footer":9,"./components/Header":10,"./components/PaginatedThumbnails":11,"./components/Portal":12,"./theme":15,"./utils":19,"glamorous":undefined,"prop-types":undefined,"react":undefined,"react-scrolllock":undefined,"react-transition-group/TransitionGroup":3}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvY2hhaW4tZnVuY3Rpb24vaW5kZXguanMiLCJub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXRyYW5zaXRpb24tZ3JvdXAvVHJhbnNpdGlvbkdyb3VwLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LXRyYW5zaXRpb24tZ3JvdXAvdXRpbHMvQ2hpbGRNYXBwaW5nLmpzIiwibm9kZV9tb2R1bGVzL3dhcm5pbmcvYnJvd3Nlci5qcyIsIi9Vc2Vycy9qb3NzL0RldmVsb3BtZW50L3BhY2thZ2VzL3JlYWN0L2ltYWdlcy9zcmMvY29tcG9uZW50cy9BbmltYXRpb25XcmFwcGVyLmpzIiwiL1VzZXJzL2pvc3MvRGV2ZWxvcG1lbnQvcGFja2FnZXMvcmVhY3QvaW1hZ2VzL3NyYy9jb21wb25lbnRzL0Fycm93LmpzIiwiL1VzZXJzL2pvc3MvRGV2ZWxvcG1lbnQvcGFja2FnZXMvcmVhY3QvaW1hZ2VzL3NyYy9jb21wb25lbnRzL0NvbnRhaW5lci5qcyIsIi9Vc2Vycy9qb3NzL0RldmVsb3BtZW50L3BhY2thZ2VzL3JlYWN0L2ltYWdlcy9zcmMvY29tcG9uZW50cy9Gb290ZXIuanMiLCIvVXNlcnMvam9zcy9EZXZlbG9wbWVudC9wYWNrYWdlcy9yZWFjdC9pbWFnZXMvc3JjL2NvbXBvbmVudHMvSGVhZGVyLmpzIiwiL1VzZXJzL2pvc3MvRGV2ZWxvcG1lbnQvcGFja2FnZXMvcmVhY3QvaW1hZ2VzL3NyYy9jb21wb25lbnRzL1BhZ2luYXRlZFRodW1ibmFpbHMuanMiLCIvVXNlcnMvam9zcy9EZXZlbG9wbWVudC9wYWNrYWdlcy9yZWFjdC9pbWFnZXMvc3JjL2NvbXBvbmVudHMvUG9ydGFsLmpzIiwiL1VzZXJzL2pvc3MvRGV2ZWxvcG1lbnQvcGFja2FnZXMvcmVhY3QvaW1hZ2VzL3NyYy9jb21wb25lbnRzL1RodW1ibmFpbC5qcyIsIi9Vc2Vycy9qb3NzL0RldmVsb3BtZW50L3BhY2thZ2VzL3JlYWN0L2ltYWdlcy9zcmMvaWNvbnMvaW5kZXguanMiLCIvVXNlcnMvam9zcy9EZXZlbG9wbWVudC9wYWNrYWdlcy9yZWFjdC9pbWFnZXMvc3JjL3RoZW1lLmpzIiwiL1VzZXJzL2pvc3MvRGV2ZWxvcG1lbnQvcGFja2FnZXMvcmVhY3QvaW1hZ2VzL3NyYy91dGlscy9iaW5kRnVuY3Rpb25zLmpzIiwiL1VzZXJzL2pvc3MvRGV2ZWxvcG1lbnQvcGFja2FnZXMvcmVhY3QvaW1hZ2VzL3NyYy91dGlscy9jYW5Vc2VEb20uanMiLCIvVXNlcnMvam9zcy9EZXZlbG9wbWVudC9wYWNrYWdlcy9yZWFjdC9pbWFnZXMvc3JjL3V0aWxzL2RlZXBNZXJnZS5qcyIsIi9Vc2Vycy9qb3NzL0RldmVsb3BtZW50L3BhY2thZ2VzL3JlYWN0L2ltYWdlcy9zcmMvdXRpbHMvaW5kZXguanMiLCIvVXNlcnMvam9zcy9EZXZlbG9wbWVudC9wYWNrYWdlcy9yZWFjdC9pbWFnZXMvc3JjL0xpZ2h0Ym94LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUN4TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzVRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDMUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUFDdkIsaUJBQWdCLEVBQUUsYUFBYTtBQUMvQixhQUFZLEVBQUUsQ0FBQztBQUNmLG9CQUFtQixFQUFFLElBQUk7QUFDekIsb0JBQW1CLEVBQUUsTUFBTTtBQUMzQixlQUFjLEVBQUUsMkJBQTJCO0FBQzNDLHFCQUFvQixFQUFFLElBQUk7QUFDMUIsaUJBQWdCLEVBQUUsSUFBSTtBQUN0QixnQkFBZSxFQUFFLHdCQUF3QjtBQUN6QyxnQkFBZSxFQUFFLElBQUk7QUFDckIsZUFBYyxFQUFFLElBQUk7QUFDcEIsTUFBSyxFQUFFLEVBQUU7QUFDVCxnQkFBZSxFQUFFLENBQUM7QUFDbEIsTUFBSyxFQUFFLElBQUk7Q0FDWCxDQUFDO0FBQ0YsUUFBUSxDQUFDLGlCQUFpQixHQUFHO0FBQzVCLE1BQUssRUFBRSx1QkFBVSxNQUFNLENBQUMsVUFBVTtDQUNsQyxDQUFDOztBQUVGLElBQU0sT0FBTyxHQUFHLHVCQUFVLEdBQUcsQ0FBQztBQUM3QixTQUFRLEVBQUUsVUFBVTtDQUNwQixDQUFDLENBQUM7QUFDSCxJQUFNLE1BQU0sR0FBRyx1QkFBVSxHQUFHLENBQUM7QUFDNUIsT0FBTSxFQUFFLENBQUMsRUFDVCxDQUFDLENBQUM7O0FBQ0gsSUFBTSxLQUFLLEdBQUcsdUJBQVUsR0FBRyxDQUFDO0FBQzNCLFFBQU8sRUFBRSxPQUFPO0FBQ2hCLE9BQU0sRUFBRSxNQUFNO0FBQ2QsT0FBTSxFQUFFLFFBQVE7QUFDaEIsU0FBUSxFQUFFLE1BQU07OztBQUdoQixtQkFBa0IsRUFBRSxNQUFNO0FBQzFCLFdBQVUsRUFBRSxNQUFNO0NBQ2xCLENBQUMsQ0FBQzs7cUJBRVksUUFBUSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjaGFpbigpe1xyXG4gIHZhciBsZW4gPSBhcmd1bWVudHMubGVuZ3RoXHJcbiAgdmFyIGFyZ3MgPSBbXTtcclxuXHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKylcclxuICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV1cclxuXHJcbiAgYXJncyA9IGFyZ3MuZmlsdGVyKGZ1bmN0aW9uKGZuKXsgcmV0dXJuIGZuICE9IG51bGwgfSlcclxuXHJcbiAgaWYgKGFyZ3MubGVuZ3RoID09PSAwKSByZXR1cm4gdW5kZWZpbmVkXHJcbiAgaWYgKGFyZ3MubGVuZ3RoID09PSAxKSByZXR1cm4gYXJnc1swXVxyXG5cclxuICByZXR1cm4gYXJncy5yZWR1Y2UoZnVuY3Rpb24oY3VycmVudCwgbmV4dCl7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gY2hhaW5lZEZ1bmN0aW9uKCkge1xyXG4gICAgICBjdXJyZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgIG5leHQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgIH07XHJcbiAgfSlcclxufVxyXG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG52YXIgX2NoYWluRnVuY3Rpb24gPSByZXF1aXJlKCdjaGFpbi1mdW5jdGlvbicpO1xuXG52YXIgX2NoYWluRnVuY3Rpb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2hhaW5GdW5jdGlvbik7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9wcm9wVHlwZXMgPSByZXF1aXJlKCdwcm9wLXR5cGVzJyk7XG5cbnZhciBfcHJvcFR5cGVzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Byb3BUeXBlcyk7XG5cbnZhciBfd2FybmluZyA9IHJlcXVpcmUoJ3dhcm5pbmcnKTtcblxudmFyIF93YXJuaW5nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3dhcm5pbmcpO1xuXG52YXIgX0NoaWxkTWFwcGluZyA9IHJlcXVpcmUoJy4vdXRpbHMvQ2hpbGRNYXBwaW5nJyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIHByb3BUeXBlcyA9IHtcbiAgY29tcG9uZW50OiBfcHJvcFR5cGVzMi5kZWZhdWx0LmFueSxcbiAgY2hpbGRGYWN0b3J5OiBfcHJvcFR5cGVzMi5kZWZhdWx0LmZ1bmMsXG4gIGNoaWxkcmVuOiBfcHJvcFR5cGVzMi5kZWZhdWx0Lm5vZGVcbn07XG5cbnZhciBkZWZhdWx0UHJvcHMgPSB7XG4gIGNvbXBvbmVudDogJ3NwYW4nLFxuICBjaGlsZEZhY3Rvcnk6IGZ1bmN0aW9uIGNoaWxkRmFjdG9yeShjaGlsZCkge1xuICAgIHJldHVybiBjaGlsZDtcbiAgfVxufTtcblxudmFyIFRyYW5zaXRpb25Hcm91cCA9IGZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gIF9pbmhlcml0cyhUcmFuc2l0aW9uR3JvdXAsIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIFRyYW5zaXRpb25Hcm91cChwcm9wcywgY29udGV4dCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBUcmFuc2l0aW9uR3JvdXApO1xuXG4gICAgdmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgX1JlYWN0JENvbXBvbmVudC5jYWxsKHRoaXMsIHByb3BzLCBjb250ZXh0KSk7XG5cbiAgICBfdGhpcy5wZXJmb3JtQXBwZWFyID0gZnVuY3Rpb24gKGtleSwgY29tcG9uZW50KSB7XG4gICAgICBfdGhpcy5jdXJyZW50bHlUcmFuc2l0aW9uaW5nS2V5c1trZXldID0gdHJ1ZTtcblxuICAgICAgaWYgKGNvbXBvbmVudC5jb21wb25lbnRXaWxsQXBwZWFyKSB7XG4gICAgICAgIGNvbXBvbmVudC5jb21wb25lbnRXaWxsQXBwZWFyKF90aGlzLl9oYW5kbGVEb25lQXBwZWFyaW5nLmJpbmQoX3RoaXMsIGtleSwgY29tcG9uZW50KSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfdGhpcy5faGFuZGxlRG9uZUFwcGVhcmluZyhrZXksIGNvbXBvbmVudCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIF90aGlzLl9oYW5kbGVEb25lQXBwZWFyaW5nID0gZnVuY3Rpb24gKGtleSwgY29tcG9uZW50KSB7XG4gICAgICBpZiAoY29tcG9uZW50LmNvbXBvbmVudERpZEFwcGVhcikge1xuICAgICAgICBjb21wb25lbnQuY29tcG9uZW50RGlkQXBwZWFyKCk7XG4gICAgICB9XG5cbiAgICAgIGRlbGV0ZSBfdGhpcy5jdXJyZW50bHlUcmFuc2l0aW9uaW5nS2V5c1trZXldO1xuXG4gICAgICB2YXIgY3VycmVudENoaWxkTWFwcGluZyA9ICgwLCBfQ2hpbGRNYXBwaW5nLmdldENoaWxkTWFwcGluZykoX3RoaXMucHJvcHMuY2hpbGRyZW4pO1xuXG4gICAgICBpZiAoIWN1cnJlbnRDaGlsZE1hcHBpbmcgfHwgIWN1cnJlbnRDaGlsZE1hcHBpbmcuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAvLyBUaGlzIHdhcyByZW1vdmVkIGJlZm9yZSBpdCBoYWQgZnVsbHkgYXBwZWFyZWQuIFJlbW92ZSBpdC5cbiAgICAgICAgX3RoaXMucGVyZm9ybUxlYXZlKGtleSwgY29tcG9uZW50KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgX3RoaXMucGVyZm9ybUVudGVyID0gZnVuY3Rpb24gKGtleSwgY29tcG9uZW50KSB7XG4gICAgICBfdGhpcy5jdXJyZW50bHlUcmFuc2l0aW9uaW5nS2V5c1trZXldID0gdHJ1ZTtcblxuICAgICAgaWYgKGNvbXBvbmVudC5jb21wb25lbnRXaWxsRW50ZXIpIHtcbiAgICAgICAgY29tcG9uZW50LmNvbXBvbmVudFdpbGxFbnRlcihfdGhpcy5faGFuZGxlRG9uZUVudGVyaW5nLmJpbmQoX3RoaXMsIGtleSwgY29tcG9uZW50KSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfdGhpcy5faGFuZGxlRG9uZUVudGVyaW5nKGtleSwgY29tcG9uZW50KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgX3RoaXMuX2hhbmRsZURvbmVFbnRlcmluZyA9IGZ1bmN0aW9uIChrZXksIGNvbXBvbmVudCkge1xuICAgICAgaWYgKGNvbXBvbmVudC5jb21wb25lbnREaWRFbnRlcikge1xuICAgICAgICBjb21wb25lbnQuY29tcG9uZW50RGlkRW50ZXIoKTtcbiAgICAgIH1cblxuICAgICAgZGVsZXRlIF90aGlzLmN1cnJlbnRseVRyYW5zaXRpb25pbmdLZXlzW2tleV07XG5cbiAgICAgIHZhciBjdXJyZW50Q2hpbGRNYXBwaW5nID0gKDAsIF9DaGlsZE1hcHBpbmcuZ2V0Q2hpbGRNYXBwaW5nKShfdGhpcy5wcm9wcy5jaGlsZHJlbik7XG5cbiAgICAgIGlmICghY3VycmVudENoaWxkTWFwcGluZyB8fCAhY3VycmVudENoaWxkTWFwcGluZy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIC8vIFRoaXMgd2FzIHJlbW92ZWQgYmVmb3JlIGl0IGhhZCBmdWxseSBlbnRlcmVkLiBSZW1vdmUgaXQuXG4gICAgICAgIF90aGlzLnBlcmZvcm1MZWF2ZShrZXksIGNvbXBvbmVudCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIF90aGlzLnBlcmZvcm1MZWF2ZSA9IGZ1bmN0aW9uIChrZXksIGNvbXBvbmVudCkge1xuICAgICAgX3RoaXMuY3VycmVudGx5VHJhbnNpdGlvbmluZ0tleXNba2V5XSA9IHRydWU7XG5cbiAgICAgIGlmIChjb21wb25lbnQuY29tcG9uZW50V2lsbExlYXZlKSB7XG4gICAgICAgIGNvbXBvbmVudC5jb21wb25lbnRXaWxsTGVhdmUoX3RoaXMuX2hhbmRsZURvbmVMZWF2aW5nLmJpbmQoX3RoaXMsIGtleSwgY29tcG9uZW50KSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBOb3RlIHRoYXQgdGhpcyBpcyBzb21ld2hhdCBkYW5nZXJvdXMgYi9jIGl0IGNhbGxzIHNldFN0YXRlKClcbiAgICAgICAgLy8gYWdhaW4sIGVmZmVjdGl2ZWx5IG11dGF0aW5nIHRoZSBjb21wb25lbnQgYmVmb3JlIGFsbCB0aGUgd29ya1xuICAgICAgICAvLyBpcyBkb25lLlxuICAgICAgICBfdGhpcy5faGFuZGxlRG9uZUxlYXZpbmcoa2V5LCBjb21wb25lbnQpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBfdGhpcy5faGFuZGxlRG9uZUxlYXZpbmcgPSBmdW5jdGlvbiAoa2V5LCBjb21wb25lbnQpIHtcbiAgICAgIGlmIChjb21wb25lbnQuY29tcG9uZW50RGlkTGVhdmUpIHtcbiAgICAgICAgY29tcG9uZW50LmNvbXBvbmVudERpZExlYXZlKCk7XG4gICAgICB9XG5cbiAgICAgIGRlbGV0ZSBfdGhpcy5jdXJyZW50bHlUcmFuc2l0aW9uaW5nS2V5c1trZXldO1xuXG4gICAgICB2YXIgY3VycmVudENoaWxkTWFwcGluZyA9ICgwLCBfQ2hpbGRNYXBwaW5nLmdldENoaWxkTWFwcGluZykoX3RoaXMucHJvcHMuY2hpbGRyZW4pO1xuXG4gICAgICBpZiAoY3VycmVudENoaWxkTWFwcGluZyAmJiBjdXJyZW50Q2hpbGRNYXBwaW5nLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgLy8gVGhpcyBlbnRlcmVkIGFnYWluIGJlZm9yZSBpdCBmdWxseSBsZWZ0LiBBZGQgaXQgYWdhaW4uXG4gICAgICAgIF90aGlzLmtleXNUb0VudGVyLnB1c2goa2V5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF90aGlzLnNldFN0YXRlKGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgICAgICAgIHZhciBuZXdDaGlsZHJlbiA9IF9leHRlbmRzKHt9LCBzdGF0ZS5jaGlsZHJlbik7XG4gICAgICAgICAgZGVsZXRlIG5ld0NoaWxkcmVuW2tleV07XG4gICAgICAgICAgcmV0dXJuIHsgY2hpbGRyZW46IG5ld0NoaWxkcmVuIH07XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBfdGhpcy5jaGlsZFJlZnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gICAgX3RoaXMuc3RhdGUgPSB7XG4gICAgICBjaGlsZHJlbjogKDAsIF9DaGlsZE1hcHBpbmcuZ2V0Q2hpbGRNYXBwaW5nKShwcm9wcy5jaGlsZHJlbilcbiAgICB9O1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIFRyYW5zaXRpb25Hcm91cC5wcm90b3R5cGUuY29tcG9uZW50V2lsbE1vdW50ID0gZnVuY3Rpb24gY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIHRoaXMuY3VycmVudGx5VHJhbnNpdGlvbmluZ0tleXMgPSB7fTtcbiAgICB0aGlzLmtleXNUb0VudGVyID0gW107XG4gICAgdGhpcy5rZXlzVG9MZWF2ZSA9IFtdO1xuICB9O1xuXG4gIFRyYW5zaXRpb25Hcm91cC5wcm90b3R5cGUuY29tcG9uZW50RGlkTW91bnQgPSBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB2YXIgaW5pdGlhbENoaWxkTWFwcGluZyA9IHRoaXMuc3RhdGUuY2hpbGRyZW47XG4gICAgZm9yICh2YXIga2V5IGluIGluaXRpYWxDaGlsZE1hcHBpbmcpIHtcbiAgICAgIGlmIChpbml0aWFsQ2hpbGRNYXBwaW5nW2tleV0pIHtcbiAgICAgICAgdGhpcy5wZXJmb3JtQXBwZWFyKGtleSwgdGhpcy5jaGlsZFJlZnNba2V5XSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIFRyYW5zaXRpb25Hcm91cC5wcm90b3R5cGUuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyA9IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgdmFyIG5leHRDaGlsZE1hcHBpbmcgPSAoMCwgX0NoaWxkTWFwcGluZy5nZXRDaGlsZE1hcHBpbmcpKG5leHRQcm9wcy5jaGlsZHJlbik7XG4gICAgdmFyIHByZXZDaGlsZE1hcHBpbmcgPSB0aGlzLnN0YXRlLmNoaWxkcmVuO1xuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBjaGlsZHJlbjogKDAsIF9DaGlsZE1hcHBpbmcubWVyZ2VDaGlsZE1hcHBpbmdzKShwcmV2Q2hpbGRNYXBwaW5nLCBuZXh0Q2hpbGRNYXBwaW5nKVxuICAgIH0pO1xuXG4gICAgZm9yICh2YXIga2V5IGluIG5leHRDaGlsZE1hcHBpbmcpIHtcbiAgICAgIHZhciBoYXNQcmV2ID0gcHJldkNoaWxkTWFwcGluZyAmJiBwcmV2Q2hpbGRNYXBwaW5nLmhhc093blByb3BlcnR5KGtleSk7XG4gICAgICBpZiAobmV4dENoaWxkTWFwcGluZ1trZXldICYmICFoYXNQcmV2ICYmICF0aGlzLmN1cnJlbnRseVRyYW5zaXRpb25pbmdLZXlzW2tleV0pIHtcbiAgICAgICAgdGhpcy5rZXlzVG9FbnRlci5wdXNoKGtleSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2tleSBpbiBwcmV2Q2hpbGRNYXBwaW5nKSB7XG4gICAgICB2YXIgaGFzTmV4dCA9IG5leHRDaGlsZE1hcHBpbmcgJiYgbmV4dENoaWxkTWFwcGluZy5oYXNPd25Qcm9wZXJ0eShfa2V5KTtcbiAgICAgIGlmIChwcmV2Q2hpbGRNYXBwaW5nW19rZXldICYmICFoYXNOZXh0ICYmICF0aGlzLmN1cnJlbnRseVRyYW5zaXRpb25pbmdLZXlzW19rZXldKSB7XG4gICAgICAgIHRoaXMua2V5c1RvTGVhdmUucHVzaChfa2V5KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBJZiB3ZSB3YW50IHRvIHNvbWVkYXkgY2hlY2sgZm9yIHJlb3JkZXJpbmcsIHdlIGNvdWxkIGRvIGl0IGhlcmUuXG4gIH07XG5cbiAgVHJhbnNpdGlvbkdyb3VwLnByb3RvdHlwZS5jb21wb25lbnREaWRVcGRhdGUgPSBmdW5jdGlvbiBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICB2YXIga2V5c1RvRW50ZXIgPSB0aGlzLmtleXNUb0VudGVyO1xuICAgIHRoaXMua2V5c1RvRW50ZXIgPSBbXTtcbiAgICBrZXlzVG9FbnRlci5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHJldHVybiBfdGhpczIucGVyZm9ybUVudGVyKGtleSwgX3RoaXMyLmNoaWxkUmVmc1trZXldKTtcbiAgICB9KTtcblxuICAgIHZhciBrZXlzVG9MZWF2ZSA9IHRoaXMua2V5c1RvTGVhdmU7XG4gICAgdGhpcy5rZXlzVG9MZWF2ZSA9IFtdO1xuICAgIGtleXNUb0xlYXZlLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgcmV0dXJuIF90aGlzMi5wZXJmb3JtTGVhdmUoa2V5LCBfdGhpczIuY2hpbGRSZWZzW2tleV0pO1xuICAgIH0pO1xuICB9O1xuXG4gIFRyYW5zaXRpb25Hcm91cC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgLy8gVE9ETzogd2UgY291bGQgZ2V0IHJpZCBvZiB0aGUgbmVlZCBmb3IgdGhlIHdyYXBwZXIgbm9kZVxuICAgIC8vIGJ5IGNsb25pbmcgYSBzaW5nbGUgY2hpbGRcbiAgICB2YXIgY2hpbGRyZW5Ub1JlbmRlciA9IFtdO1xuXG4gICAgdmFyIF9sb29wID0gZnVuY3Rpb24gX2xvb3Aoa2V5KSB7XG4gICAgICB2YXIgY2hpbGQgPSBfdGhpczMuc3RhdGUuY2hpbGRyZW5ba2V5XTtcbiAgICAgIGlmIChjaGlsZCkge1xuICAgICAgICB2YXIgaXNDYWxsYmFja1JlZiA9IHR5cGVvZiBjaGlsZC5yZWYgIT09ICdzdHJpbmcnO1xuICAgICAgICB2YXIgZmFjdG9yeUNoaWxkID0gX3RoaXMzLnByb3BzLmNoaWxkRmFjdG9yeShjaGlsZCk7XG4gICAgICAgIHZhciByZWYgPSBmdW5jdGlvbiByZWYocikge1xuICAgICAgICAgIF90aGlzMy5jaGlsZFJlZnNba2V5XSA9IHI7XG4gICAgICAgIH07XG5cbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/ICgwLCBfd2FybmluZzIuZGVmYXVsdCkoaXNDYWxsYmFja1JlZiwgJ3N0cmluZyByZWZzIGFyZSBub3Qgc3VwcG9ydGVkIG9uIGNoaWxkcmVuIG9mIFRyYW5zaXRpb25Hcm91cCBhbmQgd2lsbCBiZSBpZ25vcmVkLiAnICsgJ1BsZWFzZSB1c2UgYSBjYWxsYmFjayByZWYgaW5zdGVhZDogaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy9yZWZzLWFuZC10aGUtZG9tLmh0bWwjdGhlLXJlZi1jYWxsYmFjay1hdHRyaWJ1dGUnKSA6IHZvaWQgMDtcblxuICAgICAgICAvLyBBbHdheXMgY2hhaW5pbmcgdGhlIHJlZnMgbGVhZHMgdG8gcHJvYmxlbXMgd2hlbiB0aGUgY2hpbGRGYWN0b3J5XG4gICAgICAgIC8vIHdyYXBzIHRoZSBjaGlsZC4gVGhlIGNoaWxkIHJlZiBjYWxsYmFjayBnZXRzIGNhbGxlZCB0d2ljZSB3aXRoIHRoZVxuICAgICAgICAvLyB3cmFwcGVyIGFuZCB0aGUgY2hpbGQuIFNvIHdlIG9ubHkgbmVlZCB0byBjaGFpbiB0aGUgcmVmIGlmIHRoZVxuICAgICAgICAvLyBmYWN0b3J5Q2hpbGQgaXMgbm90IGRpZmZlcmVudCBmcm9tIGNoaWxkLlxuICAgICAgICBpZiAoZmFjdG9yeUNoaWxkID09PSBjaGlsZCAmJiBpc0NhbGxiYWNrUmVmKSB7XG4gICAgICAgICAgcmVmID0gKDAsIF9jaGFpbkZ1bmN0aW9uMi5kZWZhdWx0KShjaGlsZC5yZWYsIHJlZik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBZb3UgbWF5IG5lZWQgdG8gYXBwbHkgcmVhY3RpdmUgdXBkYXRlcyB0byBhIGNoaWxkIGFzIGl0IGlzIGxlYXZpbmcuXG4gICAgICAgIC8vIFRoZSBub3JtYWwgUmVhY3Qgd2F5IHRvIGRvIGl0IHdvbid0IHdvcmsgc2luY2UgdGhlIGNoaWxkIHdpbGwgaGF2ZVxuICAgICAgICAvLyBhbHJlYWR5IGJlZW4gcmVtb3ZlZC4gSW4gY2FzZSB5b3UgbmVlZCB0aGlzIGJlaGF2aW9yIHlvdSBjYW4gcHJvdmlkZVxuICAgICAgICAvLyBhIGNoaWxkRmFjdG9yeSBmdW5jdGlvbiB0byB3cmFwIGV2ZXJ5IGNoaWxkLCBldmVuIHRoZSBvbmVzIHRoYXQgYXJlXG4gICAgICAgIC8vIGxlYXZpbmcuXG4gICAgICAgIGNoaWxkcmVuVG9SZW5kZXIucHVzaChfcmVhY3QyLmRlZmF1bHQuY2xvbmVFbGVtZW50KGZhY3RvcnlDaGlsZCwge1xuICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgIHJlZjogcmVmXG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZm9yICh2YXIga2V5IGluIHRoaXMuc3RhdGUuY2hpbGRyZW4pIHtcbiAgICAgIF9sb29wKGtleSk7XG4gICAgfVxuXG4gICAgLy8gRG8gbm90IGZvcndhcmQgVHJhbnNpdGlvbkdyb3VwIHByb3BzIHRvIHByaW1pdGl2ZSBET00gbm9kZXNcbiAgICB2YXIgcHJvcHMgPSBfZXh0ZW5kcyh7fSwgdGhpcy5wcm9wcyk7XG4gICAgZGVsZXRlIHByb3BzLnRyYW5zaXRpb25MZWF2ZTtcbiAgICBkZWxldGUgcHJvcHMudHJhbnNpdGlvbk5hbWU7XG4gICAgZGVsZXRlIHByb3BzLnRyYW5zaXRpb25BcHBlYXI7XG4gICAgZGVsZXRlIHByb3BzLnRyYW5zaXRpb25FbnRlcjtcbiAgICBkZWxldGUgcHJvcHMuY2hpbGRGYWN0b3J5O1xuICAgIGRlbGV0ZSBwcm9wcy50cmFuc2l0aW9uTGVhdmVUaW1lb3V0O1xuICAgIGRlbGV0ZSBwcm9wcy50cmFuc2l0aW9uRW50ZXJUaW1lb3V0O1xuICAgIGRlbGV0ZSBwcm9wcy50cmFuc2l0aW9uQXBwZWFyVGltZW91dDtcbiAgICBkZWxldGUgcHJvcHMuY29tcG9uZW50O1xuXG4gICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KHRoaXMucHJvcHMuY29tcG9uZW50LCBwcm9wcywgY2hpbGRyZW5Ub1JlbmRlcik7XG4gIH07XG5cbiAgcmV0dXJuIFRyYW5zaXRpb25Hcm91cDtcbn0oX3JlYWN0Mi5kZWZhdWx0LkNvbXBvbmVudCk7XG5cblRyYW5zaXRpb25Hcm91cC5kaXNwbGF5TmFtZSA9ICdUcmFuc2l0aW9uR3JvdXAnO1xuXG5cblRyYW5zaXRpb25Hcm91cC5wcm9wVHlwZXMgPSBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBwcm9wVHlwZXMgOiB7fTtcblRyYW5zaXRpb25Hcm91cC5kZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFRyYW5zaXRpb25Hcm91cDtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHMuZ2V0Q2hpbGRNYXBwaW5nID0gZ2V0Q2hpbGRNYXBwaW5nO1xuZXhwb3J0cy5tZXJnZUNoaWxkTWFwcGluZ3MgPSBtZXJnZUNoaWxkTWFwcGluZ3M7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG4vKipcbiAqIEdpdmVuIGB0aGlzLnByb3BzLmNoaWxkcmVuYCwgcmV0dXJuIGFuIG9iamVjdCBtYXBwaW5nIGtleSB0byBjaGlsZC5cbiAqXG4gKiBAcGFyYW0geyp9IGNoaWxkcmVuIGB0aGlzLnByb3BzLmNoaWxkcmVuYFxuICogQHJldHVybiB7b2JqZWN0fSBNYXBwaW5nIG9mIGtleSB0byBjaGlsZFxuICovXG5mdW5jdGlvbiBnZXRDaGlsZE1hcHBpbmcoY2hpbGRyZW4pIHtcbiAgaWYgKCFjaGlsZHJlbikge1xuICAgIHJldHVybiBjaGlsZHJlbjtcbiAgfVxuICB2YXIgcmVzdWx0ID0ge307XG4gIF9yZWFjdC5DaGlsZHJlbi5tYXAoY2hpbGRyZW4sIGZ1bmN0aW9uIChjaGlsZCkge1xuICAgIHJldHVybiBjaGlsZDtcbiAgfSkuZm9yRWFjaChmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICByZXN1bHRbY2hpbGQua2V5XSA9IGNoaWxkO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBXaGVuIHlvdSdyZSBhZGRpbmcgb3IgcmVtb3ZpbmcgY2hpbGRyZW4gc29tZSBtYXkgYmUgYWRkZWQgb3IgcmVtb3ZlZCBpbiB0aGVcbiAqIHNhbWUgcmVuZGVyIHBhc3MuIFdlIHdhbnQgdG8gc2hvdyAqYm90aCogc2luY2Ugd2Ugd2FudCB0byBzaW11bHRhbmVvdXNseVxuICogYW5pbWF0ZSBlbGVtZW50cyBpbiBhbmQgb3V0LiBUaGlzIGZ1bmN0aW9uIHRha2VzIGEgcHJldmlvdXMgc2V0IG9mIGtleXNcbiAqIGFuZCBhIG5ldyBzZXQgb2Yga2V5cyBhbmQgbWVyZ2VzIHRoZW0gd2l0aCBpdHMgYmVzdCBndWVzcyBvZiB0aGUgY29ycmVjdFxuICogb3JkZXJpbmcuIEluIHRoZSBmdXR1cmUgd2UgbWF5IGV4cG9zZSBzb21lIG9mIHRoZSB1dGlsaXRpZXMgaW5cbiAqIFJlYWN0TXVsdGlDaGlsZCB0byBtYWtlIHRoaXMgZWFzeSwgYnV0IGZvciBub3cgUmVhY3QgaXRzZWxmIGRvZXMgbm90XG4gKiBkaXJlY3RseSBoYXZlIHRoaXMgY29uY2VwdCBvZiB0aGUgdW5pb24gb2YgcHJldkNoaWxkcmVuIGFuZCBuZXh0Q2hpbGRyZW5cbiAqIHNvIHdlIGltcGxlbWVudCBpdCBoZXJlLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBwcmV2IHByZXYgY2hpbGRyZW4gYXMgcmV0dXJuZWQgZnJvbVxuICogYFJlYWN0VHJhbnNpdGlvbkNoaWxkTWFwcGluZy5nZXRDaGlsZE1hcHBpbmcoKWAuXG4gKiBAcGFyYW0ge29iamVjdH0gbmV4dCBuZXh0IGNoaWxkcmVuIGFzIHJldHVybmVkIGZyb21cbiAqIGBSZWFjdFRyYW5zaXRpb25DaGlsZE1hcHBpbmcuZ2V0Q2hpbGRNYXBwaW5nKClgLlxuICogQHJldHVybiB7b2JqZWN0fSBhIGtleSBzZXQgdGhhdCBjb250YWlucyBhbGwga2V5cyBpbiBgcHJldmAgYW5kIGFsbCBrZXlzXG4gKiBpbiBgbmV4dGAgaW4gYSByZWFzb25hYmxlIG9yZGVyLlxuICovXG5mdW5jdGlvbiBtZXJnZUNoaWxkTWFwcGluZ3MocHJldiwgbmV4dCkge1xuICBwcmV2ID0gcHJldiB8fCB7fTtcbiAgbmV4dCA9IG5leHQgfHwge307XG5cbiAgZnVuY3Rpb24gZ2V0VmFsdWVGb3JLZXkoa2V5KSB7XG4gICAgaWYgKG5leHQuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgcmV0dXJuIG5leHRba2V5XTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJldltrZXldO1xuICB9XG5cbiAgLy8gRm9yIGVhY2gga2V5IG9mIGBuZXh0YCwgdGhlIGxpc3Qgb2Yga2V5cyB0byBpbnNlcnQgYmVmb3JlIHRoYXQga2V5IGluXG4gIC8vIHRoZSBjb21iaW5lZCBsaXN0XG4gIHZhciBuZXh0S2V5c1BlbmRpbmcgPSB7fTtcblxuICB2YXIgcGVuZGluZ0tleXMgPSBbXTtcbiAgZm9yICh2YXIgcHJldktleSBpbiBwcmV2KSB7XG4gICAgaWYgKG5leHQuaGFzT3duUHJvcGVydHkocHJldktleSkpIHtcbiAgICAgIGlmIChwZW5kaW5nS2V5cy5sZW5ndGgpIHtcbiAgICAgICAgbmV4dEtleXNQZW5kaW5nW3ByZXZLZXldID0gcGVuZGluZ0tleXM7XG4gICAgICAgIHBlbmRpbmdLZXlzID0gW107XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHBlbmRpbmdLZXlzLnB1c2gocHJldktleSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIGkgPSB2b2lkIDA7XG4gIHZhciBjaGlsZE1hcHBpbmcgPSB7fTtcbiAgZm9yICh2YXIgbmV4dEtleSBpbiBuZXh0KSB7XG4gICAgaWYgKG5leHRLZXlzUGVuZGluZy5oYXNPd25Qcm9wZXJ0eShuZXh0S2V5KSkge1xuICAgICAgZm9yIChpID0gMDsgaSA8IG5leHRLZXlzUGVuZGluZ1tuZXh0S2V5XS5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgcGVuZGluZ05leHRLZXkgPSBuZXh0S2V5c1BlbmRpbmdbbmV4dEtleV1baV07XG4gICAgICAgIGNoaWxkTWFwcGluZ1tuZXh0S2V5c1BlbmRpbmdbbmV4dEtleV1baV1dID0gZ2V0VmFsdWVGb3JLZXkocGVuZGluZ05leHRLZXkpO1xuICAgICAgfVxuICAgIH1cbiAgICBjaGlsZE1hcHBpbmdbbmV4dEtleV0gPSBnZXRWYWx1ZUZvcktleShuZXh0S2V5KTtcbiAgfVxuXG4gIC8vIEZpbmFsbHksIGFkZCB0aGUga2V5cyB3aGljaCBkaWRuJ3QgYXBwZWFyIGJlZm9yZSBhbnkga2V5IGluIGBuZXh0YFxuICBmb3IgKGkgPSAwOyBpIDwgcGVuZGluZ0tleXMubGVuZ3RoOyBpKyspIHtcbiAgICBjaGlsZE1hcHBpbmdbcGVuZGluZ0tleXNbaV1dID0gZ2V0VmFsdWVGb3JLZXkocGVuZGluZ0tleXNbaV0pO1xuICB9XG5cbiAgcmV0dXJuIGNoaWxkTWFwcGluZztcbn0iLCIvKipcbiAqIENvcHlyaWdodCAyMDE0LTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU2ltaWxhciB0byBpbnZhcmlhbnQgYnV0IG9ubHkgbG9ncyBhIHdhcm5pbmcgaWYgdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0LlxuICogVGhpcyBjYW4gYmUgdXNlZCB0byBsb2cgaXNzdWVzIGluIGRldmVsb3BtZW50IGVudmlyb25tZW50cyBpbiBjcml0aWNhbFxuICogcGF0aHMuIFJlbW92aW5nIHRoZSBsb2dnaW5nIGNvZGUgZm9yIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRzIHdpbGwga2VlcCB0aGVcbiAqIHNhbWUgbG9naWMgYW5kIGZvbGxvdyB0aGUgc2FtZSBjb2RlIHBhdGhzLlxuICovXG5cbnZhciB3YXJuaW5nID0gZnVuY3Rpb24oKSB7fTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgd2FybmluZyA9IGZ1bmN0aW9uKGNvbmRpdGlvbiwgZm9ybWF0LCBhcmdzKSB7XG4gICAgdmFyIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgYXJncyA9IG5ldyBBcnJheShsZW4gPiAyID8gbGVuIC0gMiA6IDApO1xuICAgIGZvciAodmFyIGtleSA9IDI7IGtleSA8IGxlbjsga2V5KyspIHtcbiAgICAgIGFyZ3Nba2V5IC0gMl0gPSBhcmd1bWVudHNba2V5XTtcbiAgICB9XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdgd2FybmluZyhjb25kaXRpb24sIGZvcm1hdCwgLi4uYXJncylgIHJlcXVpcmVzIGEgd2FybmluZyAnICtcbiAgICAgICAgJ21lc3NhZ2UgYXJndW1lbnQnXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChmb3JtYXQubGVuZ3RoIDwgMTAgfHwgKC9eW3NcXFddKiQvKS50ZXN0KGZvcm1hdCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1RoZSB3YXJuaW5nIGZvcm1hdCBzaG91bGQgYmUgYWJsZSB0byB1bmlxdWVseSBpZGVudGlmeSB0aGlzICcgK1xuICAgICAgICAnd2FybmluZy4gUGxlYXNlLCB1c2UgYSBtb3JlIGRlc2NyaXB0aXZlIGZvcm1hdCB0aGFuOiAnICsgZm9ybWF0XG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArXG4gICAgICAgIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICAgICAgfSk7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gICAgICB9XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICAgIH0gY2F0Y2goeCkge31cbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gd2FybmluZztcbiIsImltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgUmVhY3QsIHsgUHVyZUNvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCAqIGFzIGdsYW1vciBmcm9tICdnbGFtb3InO1xuaW1wb3J0IGdsYW1vcm91cyBmcm9tICdnbGFtb3JvdXMnO1xuXG5jb25zdCBleGl0WFBvc2l0aW9uID0gJzEwcHgnO1xuY29uc3QgYW5pbWF0aW9uRHVyYXRpb24gPSAnNTAwbXMnO1xuXG5jb25zdCBhbmltYXRpb25FbnRlciA9IGdsYW1vci5jc3Mua2V5ZnJhbWVzKHtcblx0ZnJvbToge1xuXHRcdG9wYWNpdHk6IDAsXG5cdFx0dHJhbnNmb3JtOiBgdHJhbnNsYXRlKCR7ZXhpdFhQb3NpdGlvbn0sIDApYCxcblx0fSxcblx0dG86IHtcblx0XHRvcGFjaXR5OiAxLFxuXHRcdHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgwLCAwKScsXG5cdH0sXG59KTtcbmNvbnN0IGFuaW1hdGlvbkxlYXZlID0gZ2xhbW9yLmNzcy5rZXlmcmFtZXMoe1xuXHRmcm9tOiB7XG5cdFx0b3BhY2l0eTogMSxcblx0XHR0cmFuc2Zvcm06ICd0cmFuc2xhdGUoMCwgMCknLFxuXHR9LFxuXHR0bzoge1xuXHRcdG9wYWNpdHk6IDAsXG5cdFx0dHJhbnNmb3JtOiBgdHJhbnNsYXRlKCR7ZXhpdFhQb3NpdGlvbn0sIDApYCxcblx0fSxcbn0pO1xuXG5jb25zdCBXcmFwcGVyID0gZ2xhbW9yb3VzLmRpdih7XG59LCAoeyBpc0VudGVyaW5nLCBpc0xlYXZpbmcgfSkgPT4ge1xuXHRsZXQgYW5pbWF0aW9uID0gJ2luaXRpYWwnO1xuXHRpZiAoaXNFbnRlcmluZykgYW5pbWF0aW9uID0gYCR7YW5pbWF0aW9uRW50ZXJ9ICR7YW5pbWF0aW9uRHVyYXRpb259YDtcblx0aWYgKGlzTGVhdmluZykgYW5pbWF0aW9uID0gYCR7YW5pbWF0aW9uTGVhdmV9ICR7YW5pbWF0aW9uRHVyYXRpb259YDtcblxuXHRjb25zb2xlLmxvZygnaXNFbnRlcmluZycsIGlzRW50ZXJpbmcpO1xuXG5cdHJldHVybiB7IGFuaW1hdGlvbiB9O1xufSk7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQW5pbWF0aW9uV3JhcHBlciBleHRlbmRzIFB1cmVDb21wb25lbnQge1xuXHRjb25zdHJ1Y3RvciAocHJvcHMpIHtcblx0XHRzdXBlcihwcm9wcyk7XG5cblx0XHRjb25zb2xlLmxvZygnQW5pbWF0aW9uV3JhcHBlcicpO1xuXG5cdFx0dGhpcy5wYXJlbnROb2RlID0gbnVsbDtcblx0XHR0aGlzLnN0YXRlID0ge1xuXHRcdFx0aXNFbnRlcmluZzogZmFsc2UsXG5cdFx0XHRpc0xlYXZpbmc6IGZhbHNlLFxuXHRcdH07XG5cblx0XHR0aGlzLnJ1bkFmdGVyQW5pbWF0aW9uID0gdGhpcy5ydW5BZnRlckFuaW1hdGlvbi5iaW5kKHRoaXMpO1xuXHR9XG5cblx0Y29tcG9uZW50V2lsbEVudGVyIChjYWxsYmFjaykge1xuXHRcdGNvbnNvbGUubG9nKCdjb21wb25lbnRXaWxsRW50ZXInKTtcblx0XHR0aGlzLnNldFN0YXRlKHsgaXNFbnRlcmluZzogdHJ1ZSB9KTtcblx0XHR0aGlzLnJ1bkFmdGVyQW5pbWF0aW9uKGNhbGxiYWNrKTtcblx0fVxuXG5cdGNvbXBvbmVudERpZEVudGVyICgpIHtcblx0XHRjb25zb2xlLmxvZygnY29tcG9uZW50RGlkRW50ZXInKTtcblx0XHR0aGlzLnNldFN0YXRlKHsgaXNFbnRlcmluZzogZmFsc2UgfSk7XG5cdH1cblxuXHRjb21wb25lbnRXaWxsTGVhdmUgKGNhbGxiYWNrKSB7XG5cdFx0Y29uc29sZS5sb2coJ2NvbXBvbmVudFdpbGxMZWF2ZScpO1xuXHRcdHRoaXMuc2V0U3RhdGUoeyBpc0xlYXZpbmc6IHRydWUgfSk7XG5cdFx0dGhpcy5ydW5BZnRlckFuaW1hdGlvbihjYWxsYmFjayk7XG5cdH1cblxuXHRjb21wb25lbnREaWRMZWF2ZSAoKSB7XG5cdFx0Y29uc29sZS5sb2coJ2NvbXBvbmVudERpZExlYXZlJyk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7IGlzTGVhdmluZzogZmFsc2UgfSk7XG5cdH1cblxuXHQvKipcblx0ICogY29tcG9uZW50V2lsbEVudGVyIGFuZCBjb21wb25lbnRXaWxsTGVhdmUgcHJvdmlkZSBhIGNhbGxiYWNrIGZ1bmN0aW9uIHdoaWNoIHdlIG5lZWQgdG8gY2FsbFxuXHQgKiB3aGVuIG91ciBlbnRlci9sZWF2ZSBhbmltYXRpb25zIGFyZSBjb21wbGV0ZS4gVGhpcyBmdW5jdGlvbiBsaXN0ZW5zIGZvciBhbiBhbmltYXRpb25lbmQgZXZlbnRcblx0ICogdGhlbiBydW5zIHRoZSBjYWxsYmFjay5cblx0ICovXG5cdHJ1bkFmdGVyQW5pbWF0aW9uIChjYWxsYmFjaykge1xuXHRcdGNvbnNvbGUubG9nKCdydW5BZnRlckFuaW1hdGlvbicpO1xuXHRcdGNvbnN0IHsgcGFyZW50Tm9kZSB9ID0gdGhpcztcblxuXHRcdGZ1bmN0aW9uIGV4ZWN1dGVDYWxsYmFjayAoKSB7XG5cdFx0XHRjYWxsYmFjaygpO1xuXHRcdFx0cmV0dXJuIHBhcmVudE5vZGUgJiYgcGFyZW50Tm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCdhbmltYXRpb25lbmQnLCBleGVjdXRlQ2FsbGJhY2spO1xuXHRcdH1cblxuXHRcdHJldHVybiBwYXJlbnROb2RlICYmIHBhcmVudE5vZGUuYWRkRXZlbnRMaXN0ZW5lcignYW5pbWF0aW9uZW5kJywgZXhlY3V0ZUNhbGxiYWNrKTtcblx0fVxuXG5cdHJlbmRlciAoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxXcmFwcGVyXG5cdFx0XHRcdGlubmVyUmVmPXsobm9kZSkgPT4geyB0aGlzLnBhcmVudE5vZGUgPSBub2RlID8gbm9kZS5wYXJlbnRFbGVtZW50IDogbnVsbDsgfX1cblx0XHRcdFx0aXNFbnRlcmluZz17dGhpcy5zdGF0ZS5pc0VudGVyaW5nfVxuXHRcdFx0XHRpc0xlYXZpbmc9e3RoaXMuc3RhdGUuaXNMZWF2aW5nfVxuXHRcdFx0PlxuXHRcdFx0XHR7dGhpcy5wcm9wcy5jaGlsZHJlbn1cblx0XHRcdDwvV3JhcHBlcj5cblx0XHQpO1xuXHR9XG59XG5cbkFuaW1hdGlvbldyYXBwZXIucHJvcFR5cGVzID0ge1xuXHRjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG59O1xuIiwiaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBBcnJvd0xlZnQsIEFycm93UmlnaHQgfSBmcm9tICcuLi9pY29ucyc7XG5pbXBvcnQgZ2xhbW9yb3VzIGZyb20gJ2dsYW1vcm91cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEFycm93ICh7XG5cdGRpcmVjdGlvbixcblx0b25DbGljayxcblx0c2l6ZSxcblx0Li4ucHJvcHMsXG59KSB7XG5cdHJldHVybiAoXG5cdFx0PEJ1dHRvblxuXHRcdFx0ZGlyZWN0aW9uPXtkaXJlY3Rpb259XG5cdFx0XHRvbkNsaWNrPXtvbkNsaWNrfVxuXHRcdFx0b25Ub3VjaEVuZD17b25DbGlja31cblx0XHRcdHNpemU9e3NpemV9XG5cdFx0XHR0eXBlPVwiYnV0dG9uXCJcblx0XHRcdHsuLi5wcm9wc31cblx0XHQ+XG5cdFx0XHR7ZGlyZWN0aW9uID09PSAnbGVmdCdcblx0XHRcdFx0PyA8QXJyb3dMZWZ0IHNpemU9e3NpemV9IC8+XG5cdFx0XHRcdDogPEFycm93UmlnaHQgc2l6ZT17c2l6ZX0gLz5cblx0XHRcdH1cblx0XHQ8L0J1dHRvbj5cblx0KTtcbn1cblxuQXJyb3cucHJvcFR5cGVzID0ge1xuXHRkaXJlY3Rpb246IFByb3BUeXBlcy5vbmVPZihbJ2xlZnQnLCAncmlnaHQnXSksXG5cdG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cdHNpemU6IFByb3BUeXBlcy5vbmVPZihbJ21lZGl1bScsICdzbWFsbCddKS5pc1JlcXVpcmVkLFxufTtcbkFycm93LmRlZmF1bHRQcm9wcyA9IHtcblx0c2l6ZTogJ21lZGl1bScsXG59O1xuXG5jb25zdCBCdXR0b24gPSBnbGFtb3JvdXMuYnV0dG9uKHtcblx0YmFja2dyb3VuZDogJ25vbmUnLFxuXHRib3JkZXI6ICdub25lJyxcblx0Ym9yZGVyUmFkaXVzOiA0LFxuXHRjdXJzb3I6ICdwb2ludGVyJyxcblx0b3V0bGluZTogJ25vbmUnLFxuXHRwYWRkaW5nOiAxMCwgLy8gaW5jcmVhc2UgaGl0IGFyZWFcblx0cG9zaXRpb246ICdhYnNvbHV0ZScsXG5cdHRvcDogJzUwJScsXG5cblx0Ly8gZGlzYWJsZSB1c2VyIHNlbGVjdFxuXHRXZWJraXRUb3VjaENhbGxvdXQ6ICdub25lJyxcblx0dXNlclNlbGVjdDogJ25vbmUnLFxufSwgKHsgdGhlbWUgfSkgPT4gKHtcblx0aGVpZ2h0OiB0aGVtZS5hcnJvdy5oZWlnaHQsXG5cdG1hcmdpblRvcDogdGhlbWUuYXJyb3cuaGVpZ2h0IC8gLTIsXG5cdHdpZHRoOiA0MCxcblxuXHQnQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSc6IHtcblx0XHR3aWR0aDogNzAsXG5cdH0sXG59KSk7XG4iLCJpbXBvcnQgZ2xhbW9yb3VzIGZyb20gJ2dsYW1vcm91cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGdsYW1vcm91cy5kaXYoe1xuXHRhbGlnbkl0ZW1zOiAnY2VudGVyJyxcblx0Ym94U2l6aW5nOiAnYm9yZGVyLWJveCcsXG5cdGRpc3BsYXk6ICdmbGV4Jyxcblx0aGVpZ2h0OiAnMTAwJScsXG5cdGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcblx0bGVmdDogMCxcblx0cG9zaXRpb246ICdmaXhlZCcsXG5cdHRvcDogMCxcblx0d2lkdGg6ICcxMDAlJyxcbn0sICh7IHRoZW1lIH0pID0+ICh7XG5cdGJhY2tncm91bmRDb2xvcjogdGhlbWUuY29udGFpbmVyLmJhY2tncm91bmQsXG5cdHBhZGRpbmdCb3R0b206IHRoZW1lLmNvbnRhaW5lci5ndXR0ZXIudmVydGljYWwsXG5cdHBhZGRpbmdMZWZ0OiB0aGVtZS5jb250YWluZXIuZ3V0dGVyLmhvcml6b250YWwsXG5cdHBhZGRpbmdSaWdodDogdGhlbWUuY29udGFpbmVyLmd1dHRlci5ob3Jpem9udGFsLFxuXHRwYWRkaW5nVG9wOiB0aGVtZS5jb250YWluZXIuZ3V0dGVyLnZlcnRpY2FsLFxuXHR6SW5kZXg6IHRoZW1lLmNvbnRhaW5lci56SW5kZXgsXG59KSk7XG4iLCJpbXBvcnQgZ2xhbW9yb3VzIGZyb20gJ2dsYW1vcm91cyc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRm9vdGVyICh7XG5cdGNhcHRpb24sXG5cdGNvdW50Q3VycmVudCxcblx0Y291bnRTZXBhcmF0b3IsXG5cdGNvdW50VG90YWwsXG5cdHNob3dDb3VudCxcblx0Li4ucHJvcHMsXG59KSB7XG5cdGlmICghY2FwdGlvbiAmJiAhc2hvd0NvdW50KSByZXR1cm4gbnVsbDtcblxuXHRjb25zdCBpbWFnZUNvdW50ID0gc2hvd0NvdW50ID8gKFxuXHRcdDxDb3VudD5cblx0XHRcdHtjb3VudEN1cnJlbnR9XG5cdFx0XHR7Y291bnRTZXBhcmF0b3J9XG5cdFx0XHR7Y291bnRUb3RhbH1cblx0XHQ8L0NvdW50Pilcblx0XHQ6IDxzcGFuIC8+O1xuXG5cdHJldHVybiAoXG5cdFx0PFdyYXBwZXIgey4uLnByb3BzfT5cblx0XHRcdHtjYXB0aW9uID8gKFxuXHRcdFx0XHQ8Q2FwdGlvbj5cblx0XHRcdFx0XHR7Y2FwdGlvbn1cblx0XHRcdFx0PC9DYXB0aW9uPlxuXHRcdFx0KSA6IDxzcGFuIC8+fVxuXHRcdFx0e2ltYWdlQ291bnR9XG5cdFx0PC9XcmFwcGVyPlxuXHQpO1xufVxuXG5Gb290ZXIucHJvcFR5cGVzID0ge1xuXHRjYXB0aW9uOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuXHRjb3VudEN1cnJlbnQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdGNvdW50U2VwYXJhdG9yOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRjb3VudFRvdGFsOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRzaG93Q291bnQ6IFByb3BUeXBlcy5ib29sLFxufTtcblxuY29uc3RcdFdyYXBwZXIgPSBnbGFtb3JvdXMuZGl2KHtcblx0Ym94U2l6aW5nOiAnYm9yZGVyLWJveCcsXG5cdGN1cnNvcjogJ2F1dG8nLFxuXHRkaXNwbGF5OiAnZmxleCcsXG5cdGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsXG5cdGxlZnQ6IDAsXG5cdGxpbmVIZWlnaHQ6IDEuMyxcbn0sICh7IHRoZW1lIH0pID0+ICh7XG5cdGNvbG9yOiB0aGVtZS5mb290ZXIuY29sb3IsXG5cdHBhZGRpbmdCb3R0b206IHRoZW1lLmZvb3Rlci5ndXR0ZXIudmVydGljYWwsXG5cdHBhZGRpbmdMZWZ0OiB0aGVtZS5mb290ZXIuZ3V0dGVyLmhvcml6b250YWwsXG5cdHBhZGRpbmdSaWdodDogdGhlbWUuZm9vdGVyLmd1dHRlci5ob3Jpem9udGFsLFxuXHRwYWRkaW5nVG9wOiB0aGVtZS5mb290ZXIuZ3V0dGVyLnZlcnRpY2FsLFxufSkpO1xuXG5jb25zdFx0Q291bnQgPSBnbGFtb3JvdXMuZGl2KHtcblx0cGFkZGluZ0xlZnQ6ICcxZW0nLCAvLyBhZGQgYSBzbWFsbCBndXR0ZXIgZm9yIHRoZSBjYXB0aW9uXG59LCAoeyB0aGVtZSB9KSA9PiAoe1xuXHRjb2xvcjogdGhlbWUuZm9vdGVyLmNvdW50LmNvbG9yLFxuXHRmb250U2l6ZTogdGhlbWUuZm9vdGVyLmNvdW50LmZvbnRTaXplLFxufSkpO1xuXG5jb25zdFx0Q2FwdGlvbiA9IGdsYW1vcm91cy5maWdjYXB0aW9uKHtcblx0ZmxleDogJzEgMSAwJyxcbn0pO1xuIiwiaW1wb3J0IGdsYW1vcm91cyBmcm9tICdnbGFtb3JvdXMnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBDbG9zZSB9IGZyb20gJy4uL2ljb25zJztcblxuZnVuY3Rpb24gSGVhZGVyICh7XG5cdGN1c3RvbUNvbnRyb2xzLFxuXHRvbkNsb3NlLFxuXHRzaG93Q2xvc2VCdXR0b24sXG5cdGNsb3NlQnV0dG9uVGl0bGUsXG5cdC4uLnByb3BzLFxufSkge1xuXHRyZXR1cm4gKFxuXHRcdDxXcmFwcGVyIHsuLi5wcm9wc30+XG5cdFx0XHR7Y3VzdG9tQ29udHJvbHMgPyBjdXN0b21Db250cm9scyA6IDxzcGFuIC8+fVxuXHRcdFx0eyEhc2hvd0Nsb3NlQnV0dG9uICYmIChcblx0XHRcdFx0PEJ1dHRvblxuXHRcdFx0XHRcdHRpdGxlPXtjbG9zZUJ1dHRvblRpdGxlfVxuXHRcdFx0XHRcdHR5cGU9XCJidXR0b25cIlxuXHRcdFx0XHRcdG9uQ2xpY2s9e29uQ2xvc2V9XG5cdFx0XHRcdD5cblx0XHRcdFx0XHQ8Q2xvc2UgZmlsbD1cIndoaXRlXCIgdHlwZT1cImNsb3NlXCIgLz5cblx0XHRcdFx0PC9CdXR0b24+XG5cdFx0XHQpfVxuXHRcdDwvV3JhcHBlcj5cblx0KTtcbn1cblxuSGVhZGVyLnByb3BUeXBlcyA9IHtcblx0Y3VzdG9tQ29udHJvbHM6IFByb3BUeXBlcy5hcnJheSxcblx0b25DbG9zZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblx0c2hvd0Nsb3NlQnV0dG9uOiBQcm9wVHlwZXMuYm9vbCxcbn07XG5cblxuY29uc3QgV3JhcHBlciA9IGdsYW1vcm91cy5kaXYoe1xuXHRkaXNwbGF5OiAnZmxleCcsXG5cdGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsXG59LCAoeyB0aGVtZSB9KSA9PiAoe1xuXHRoZWlnaHQ6IHRoZW1lLmhlYWRlci5oZWlnaHQsXG59KSk7XG5cbmNvbnN0IEJ1dHRvbiA9IGdsYW1vcm91cy5idXR0b24oe1xuXHRiYWNrZ3JvdW5kOiAnbm9uZScsXG5cdGJvcmRlcjogJ25vbmUnLFxuXHRjdXJzb3I6ICdwb2ludGVyJyxcblx0b3V0bGluZTogJ25vbmUnLFxuXHRwb3NpdGlvbjogJ3JlbGF0aXZlJyxcblx0dG9wOiAwLFxuXHR2ZXJ0aWNhbEFsaWduOiAnYm90dG9tJyxcblxuXHQvLyBpbmNyZWFzZSBoaXQgYXJlYVxuXHRoZWlnaHQ6IDQwLFxuXHRtYXJnaW5SaWdodDogLTEwLFxuXHRwYWRkaW5nOiAxMCxcblx0d2lkdGg6IDQwLFxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gSGVhZGVyO1xuIiwiaW1wb3J0IGdsYW1vcm91cyBmcm9tICdnbGFtb3JvdXMnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBUaHVtYm5haWwgZnJvbSAnLi9UaHVtYm5haWwnO1xuaW1wb3J0IEFycm93IGZyb20gJy4vQXJyb3cnO1xuXG5jb25zdCBXcmFwcGVyID0gZ2xhbW9yb3VzKHtcblx0cGFkZGluZzogJzAgNTBweCcsXG5cdHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuXHR0ZXh0QWxpZ246ICdjZW50ZXInLFxuXHR3aGl0ZVNwYWNlOiAnbm93cmFwJyxcbn0sICh7IHRoZW1lIH0pID0+ICh7XG5cdGJvdHRvbTogdGhlbWUuY29udGFpbmVyLmd1dHRlci52ZXJ0aWNhbCxcblx0aGVpZ2h0OiB0aGVtZS50aHVtYm5haWwuc2l6ZSxcbn0pKTtcblxuLy8gY29uc3QgYXJyb3dTdHlsZXMgPSB7XG4vLyBcdGhlaWdodDogdGhlbWUudGh1bWJuYWlsLnNpemUgKyAodGhlbWUudGh1bWJuYWlsLmd1dHRlciAqIDIpLFxuLy8gXHR3aWR0aDogNDAsXG4vLyB9O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYWdpbmF0ZWRUaHVtYm5haWxzIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0Y29uc3RydWN0b3IgKHByb3BzKSB7XG5cdFx0c3VwZXIocHJvcHMpO1xuXG5cdFx0dGhpcy5zdGF0ZSA9IHtcblx0XHRcdGhhc0N1c3RvbVBhZ2U6IGZhbHNlLFxuXHRcdH07XG5cblx0XHR0aGlzLmdvdG9QcmV2ID0gdGhpcy5nb3RvUHJldi5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZ290b05leHQgPSB0aGlzLmdvdG9OZXh0LmJpbmQodGhpcyk7XG5cdH1cblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyAobmV4dFByb3BzKSB7XG5cdFx0Ly8gQ29tcG9uZW50IHNob3VsZCBiZSBjb250cm9sbGVkLCBmbHVzaCBzdGF0ZSB3aGVuIGN1cnJlbnRJbWFnZSBjaGFuZ2VzXG5cdFx0aWYgKG5leHRQcm9wcy5jdXJyZW50SW1hZ2UgIT09IHRoaXMucHJvcHMuY3VycmVudEltYWdlKSB7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0aGFzQ3VzdG9tUGFnZTogZmFsc2UsXG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblx0Ly8gTUVUSE9EU1xuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXHRnZXRGaXJzdCAoKSB7XG5cdFx0Y29uc3QgeyBjdXJyZW50SW1hZ2UsIG9mZnNldCB9ID0gdGhpcy5wcm9wcztcblx0XHRpZiAodGhpcy5zdGF0ZS5oYXNDdXN0b21QYWdlKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5jbGFtcEZpcnN0KHRoaXMuc3RhdGUuZmlyc3QpO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5jbGFtcEZpcnN0KGN1cnJlbnRJbWFnZSAtIG9mZnNldCk7XG5cdH1cblx0c2V0Rmlyc3QgKGV2ZW50LCBuZXdGaXJzdCkge1xuXHRcdGNvbnN0IHsgZmlyc3QgfSA9IHRoaXMuc3RhdGU7XG5cblx0XHRpZiAoZXZlbnQpIHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHR9XG5cblx0XHRpZiAoZmlyc3QgPT09IG5ld0ZpcnN0KSByZXR1cm47XG5cblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGhhc0N1c3RvbVBhZ2U6IHRydWUsXG5cdFx0XHRmaXJzdDogbmV3Rmlyc3QsXG5cdFx0fSk7XG5cdH1cblx0Z290b1ByZXYgKGV2ZW50KSB7XG5cdFx0dGhpcy5zZXRGaXJzdChldmVudCwgdGhpcy5nZXRGaXJzdCgpIC0gdGhpcy5wcm9wcy5vZmZzZXQpO1xuXHR9XG5cdGdvdG9OZXh0IChldmVudCkge1xuXHRcdHRoaXMuc2V0Rmlyc3QoZXZlbnQsIHRoaXMuZ2V0Rmlyc3QoKSArIHRoaXMucHJvcHMub2Zmc2V0KTtcblx0fVxuXHRjbGFtcEZpcnN0ICh2YWx1ZSkge1xuXHRcdGNvbnN0IHsgaW1hZ2VzLCBvZmZzZXQgfSA9IHRoaXMucHJvcHM7XG5cblx0XHRjb25zdCB0b3RhbENvdW50ID0gMiAqIG9mZnNldCArIDE7IC8vIHNob3cgJG9mZnNldCBleHRyYSB0aHVtYm5haWxzIG9uIGVhY2ggc2lkZVxuXG5cdFx0aWYgKHZhbHVlIDwgMCkge1xuXHRcdFx0cmV0dXJuIDA7XG5cdFx0fSBlbHNlIGlmICh2YWx1ZSArIHRvdGFsQ291bnQgPiBpbWFnZXMubGVuZ3RoKSB7IC8vIFRvbyBmYXJcblx0XHRcdHJldHVybiBpbWFnZXMubGVuZ3RoIC0gdG90YWxDb3VudDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdH1cblx0fVxuXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHQvLyBSRU5ERVJFUlNcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblx0cmVuZGVyQXJyb3dQcmV2ICgpIHtcblx0XHRpZiAodGhpcy5nZXRGaXJzdCgpIDw9IDApIHJldHVybiBudWxsO1xuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxBcnJvd1xuXHRcdFx0XHRkaXJlY3Rpb249XCJsZWZ0XCJcblx0XHRcdFx0c2l6ZT1cInNtYWxsXCJcblx0XHRcdFx0aWNvbj1cImFycm93TGVmdFwiXG5cdFx0XHRcdG9uQ2xpY2s9e3RoaXMuZ290b1ByZXZ9XG5cdFx0XHRcdHRpdGxlPVwiUHJldmlvdXMgKExlZnQgYXJyb3cga2V5KVwiXG5cdFx0XHRcdHR5cGU9XCJidXR0b25cIlxuXHRcdFx0Lz5cblx0XHQpO1xuXHR9XG5cdHJlbmRlckFycm93TmV4dCAoKSB7XG5cdFx0Y29uc3QgeyBvZmZzZXQsIGltYWdlcyB9ID0gdGhpcy5wcm9wcztcblx0XHRjb25zdCB0b3RhbENvdW50ID0gMiAqIG9mZnNldCArIDE7XG5cdFx0aWYgKHRoaXMuZ2V0Rmlyc3QoKSArIHRvdGFsQ291bnQgPj0gaW1hZ2VzLmxlbmd0aCkgcmV0dXJuIG51bGw7XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PEFycm93XG5cdFx0XHRcdGRpcmVjdGlvbj1cInJpZ2h0XCJcblx0XHRcdFx0c2l6ZT1cInNtYWxsXCJcblx0XHRcdFx0aWNvbj1cImFycm93UmlnaHRcIlxuXHRcdFx0XHRvbkNsaWNrPXt0aGlzLmdvdG9OZXh0fVxuXHRcdFx0XHR0aXRsZT1cIk5leHQgKFJpZ2h0IGFycm93IGtleSlcIlxuXHRcdFx0XHR0eXBlPVwiYnV0dG9uXCJcblx0XHRcdC8+XG5cdFx0KTtcblx0fVxuXHRyZW5kZXIgKCkge1xuXHRcdGNvbnN0IHsgaW1hZ2VzLCBjdXJyZW50SW1hZ2UsIG9uQ2xpY2tUaHVtYm5haWwsIG9mZnNldCB9ID0gdGhpcy5wcm9wcztcblxuXHRcdGNvbnN0IHRvdGFsQ291bnQgPSAyICogb2Zmc2V0ICsgMTsgLy8gc2hvdyAkb2Zmc2V0IGV4dHJhIHRodW1ibmFpbHMgb24gZWFjaCBzaWRlXG5cdFx0bGV0IHRodW1ibmFpbHMgPSBbXTtcblx0XHRsZXQgYmFzZU9mZnNldCA9IDA7XG5cdFx0aWYgKGltYWdlcy5sZW5ndGggPD0gdG90YWxDb3VudCkge1xuXHRcdFx0dGh1bWJuYWlscyA9IGltYWdlcztcblx0XHR9IGVsc2UgeyAvLyBUcnkgdG8gY2VudGVyIGN1cnJlbnQgaW1hZ2UgaW4gbGlzdFxuXHRcdFx0YmFzZU9mZnNldCA9IHRoaXMuZ2V0Rmlyc3QoKTtcblx0XHRcdHRodW1ibmFpbHMgPSBpbWFnZXMuc2xpY2UoYmFzZU9mZnNldCwgYmFzZU9mZnNldCArIHRvdGFsQ291bnQpO1xuXHRcdH1cblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8V3JhcHBlcj5cblx0XHRcdFx0e3RoaXMucmVuZGVyQXJyb3dQcmV2KCl9XG5cdFx0XHRcdHt0aHVtYm5haWxzLm1hcCgoaW1nLCBpZHgpID0+IChcblx0XHRcdFx0XHQ8VGh1bWJuYWlsIGtleT17YmFzZU9mZnNldCArIGlkeH1cblx0XHRcdFx0XHRcdHsuLi5pbWd9XG5cdFx0XHRcdFx0XHRpbmRleD17YmFzZU9mZnNldCArIGlkeH1cblx0XHRcdFx0XHRcdG9uQ2xpY2s9e29uQ2xpY2tUaHVtYm5haWx9XG5cdFx0XHRcdFx0XHRhY3RpdmU9e2Jhc2VPZmZzZXQgKyBpZHggPT09IGN1cnJlbnRJbWFnZX0gLz5cblx0XHRcdFx0KSl9XG5cdFx0XHRcdHt0aGlzLnJlbmRlckFycm93TmV4dCgpfVxuXHRcdFx0PC9XcmFwcGVyPlxuXHRcdCk7XG5cdH1cbn1cblxuUGFnaW5hdGVkVGh1bWJuYWlscy5wcm9wVHlwZXMgPSB7XG5cdGN1cnJlbnRJbWFnZTogUHJvcFR5cGVzLm51bWJlcixcblx0aW1hZ2VzOiBQcm9wVHlwZXMuYXJyYXksXG5cdG9mZnNldDogUHJvcFR5cGVzLm51bWJlcixcblx0b25DbGlja1RodW1ibmFpbDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSAncmVhY3QtZG9tJztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3J0YWwgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRjb25zdHJ1Y3RvciAocHJvcHMpIHtcblx0XHRzdXBlcihwcm9wcyk7XG5cdFx0dGhpcy5wb3J0YWxFbGVtZW50ID0gbnVsbDtcblx0fVxuXHRjb21wb25lbnREaWRNb3VudCAoKSB7XG5cdFx0Y29uc3QgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocCk7XG5cdFx0dGhpcy5wb3J0YWxFbGVtZW50ID0gcDtcblx0XHR0aGlzLmNvbXBvbmVudERpZFVwZGF0ZSgpO1xuXHR9XG5cdGNvbXBvbmVudERpZFVwZGF0ZSAoKSB7XG5cdFx0cmVuZGVyKFxuXHRcdFx0PGRpdiB7Li4udGhpcy5wcm9wc30gLz4sXG5cdFx0XHR0aGlzLnBvcnRhbEVsZW1lbnRcblx0XHQpO1xuXHR9XG5cdGNvbXBvbmVudFdpbGxVbm1vdW50ICgpIHtcblx0XHRkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMucG9ydGFsRWxlbWVudCk7XG5cdH1cblx0cmVuZGVyICgpIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxufVxuIiwiaW1wb3J0IGdsYW1vcm91cyBmcm9tICdnbGFtb3JvdXMnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmZ1bmN0aW9uIFRodW1ibmFpbCAoeyBpbmRleCwgc3JjLCB0aHVtYm5haWwsIGFjdGl2ZSwgb25DbGljayB9KSB7XG5cdGNvbnN0IHVybCA9IHRodW1ibmFpbCA/IHRodW1ibmFpbCA6IHNyYztcblx0Y29uc3Qgc3R5bGUgPSB7IGJhY2tncm91bmRJbWFnZTogJ3VybChcIicgKyB1cmwgKyAnXCIpJyB9O1xuXHRjb25zdCBoYW5kbGVDbGljayA9IChlKSA9PiB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0b25DbGljayhpbmRleCk7XG5cdH07XG5cblx0cmV0dXJuIChcblx0XHQ8RGl2IGlzU2VsZWN0ZWQ9e2FjdGl2ZX0gb25DbGljaz17aGFuZGxlQ2xpY2t9IHN0eWxlPXtzdHlsZX0gLz5cblx0KTtcbn1cblxuVGh1bWJuYWlsLnByb3BUeXBlcyA9IHtcblx0YWN0aXZlOiBQcm9wVHlwZXMuYm9vbCxcblx0aW5kZXg6IFByb3BUeXBlcy5udW1iZXIsXG5cdG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cdHNyYzogUHJvcFR5cGVzLnN0cmluZyxcblx0dGh1bWJuYWlsOiBQcm9wVHlwZXMuc3RyaW5nLFxufTtcblxuVGh1bWJuYWlsLmNvbnRleHRUeXBlcyA9IHtcblx0dGhlbWU6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbn07XG5cbmNvbnN0IERpdiA9IGdsYW1vcm91cy5kaXYoe1xuXHRiYWNrZ3JvdW5kUG9zaXRpb246ICdjZW50ZXInLFxuXHRiYWNrZ3JvdW5kU2l6ZTogJ2NvdmVyJyxcblx0Ym9yZGVyUmFkaXVzOiAyLFxuXHRjdXJzb3I6ICdwb2ludGVyJyxcblx0ZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG5cdG92ZXJmbG93OiAnaGlkZGVuJyxcbn0sICh7IGlzU2VsZWN0ZWQsIHRoZW1lIH0pID0+ICh7XG5cdGJveFNoYWRvdzogYGluc2V0IDAgMCAwIDJweCAke2lzU2VsZWN0ZWRcblx0XHQ/IHRoZW1lLnRodW1ibmFpbC5ib3JkZXJDb2xvclxuXHRcdDogdGhlbWUudGh1bWJuYWlsLnNlbGVjdGVkQm9yZGVyQ29sb3Jcblx0fWAsXG5cdGhlaWdodDogdGhlbWUudGh1bWJuYWlsLnNpemUsXG5cdG1hcmdpbjogdGhlbWUudGh1bWJuYWlsLmd1dHRlcixcblx0d2lkdGg6IHRoZW1lLnRodW1ibmFpbC5zaXplLFxufSkpO1xuXG5leHBvcnQgZGVmYXVsdCBUaHVtYm5haWw7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jb25zdCBTdmcgPSAoeyBjaGlsZHJlbiwgZmlsbCwgLi4ucmVzdCB9KSA9PiAoXG5cdDxzdmcgZmlsbD17ZmlsbH0gdmVyc2lvbj1cIjEuMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4PVwiMHB4XCIgeT1cIjBweFwiIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIiB7Li4ucmVzdH0+XG5cdFx0e2NoaWxkcmVufVxuXHQ8L3N2Zz5cbik7XG5cbmV4cG9ydCBjb25zdCBBcnJvd0xlZnQgPSBwcm9wcyA9PiAoXG5cdDxTdmcgey4uLnByb3BzfT5cblx0XHQ8cGF0aCBkPVwiTTIxMy43LDI1NkwyMTMuNywyNTZMMjEzLjcsMjU2TDM4MC45LDgxLjljNC4yLTQuMyw0LjEtMTEuNC0wLjItMTUuOGwtMjkuOS0zMC42Yy00LjMtNC40LTExLjMtNC41LTE1LjUtMC4yTDEzMS4xLDI0Ny45IGMtMi4yLDIuMi0zLjIsNS4yLTMsOC4xYy0wLjEsMywwLjksNS45LDMsOC4xbDIwNC4yLDIxMi43YzQuMiw0LjMsMTEuMiw0LjIsMTUuNS0wLjJsMjkuOS0zMC42YzQuMy00LjQsNC40LTExLjUsMC4yLTE1LjggTDIxMy43LDI1NnpcIiAvPlxuXHQ8L1N2Zz5cbik7XG5leHBvcnQgY29uc3QgQXJyb3dSaWdodCA9IHByb3BzID0+IChcblx0PFN2ZyB7Li4ucHJvcHN9PlxuXHRcdDxwYXRoIGQ9XCJNMjk4LjMsMjU2TDI5OC4zLDI1NkwyOTguMywyNTZMMTMxLjEsODEuOWMtNC4yLTQuMy00LjEtMTEuNCwwLjItMTUuOGwyOS45LTMwLjZjNC4zLTQuNCwxMS4zLTQuNSwxNS41LTAuMmwyMDQuMiwyMTIuNyBjMi4yLDIuMiwzLjIsNS4yLDMsOC4xYzAuMSwzLTAuOSw1LjktMyw4LjFMMTc2LjcsNDc2LjhjLTQuMiw0LjMtMTEuMiw0LjItMTUuNS0wLjJMMTMxLjMsNDQ2Yy00LjMtNC40LTQuNC0xMS41LTAuMi0xNS44IEwyOTguMywyNTZ6XCIgLz5cblx0PC9Tdmc+XG4pO1xuZXhwb3J0IGNvbnN0IENsb3NlID0gcHJvcHMgPT4gKFxuXHQ8U3ZnIHsuLi5wcm9wc30+XG5cdFx0PHBhdGggZD1cIk00NDMuNiwzODcuMUwzMTIuNCwyNTUuNGwxMzEuNS0xMzBjNS40LTUuNCw1LjQtMTQuMiwwLTE5LjZsLTM3LjQtMzcuNmMtMi42LTIuNi02LjEtNC05LjgtNGMtMy43LDAtNy4yLDEuNS05LjgsNCBMMjU2LDE5Ny44TDEyNC45LDY4LjNjLTIuNi0yLjYtNi4xLTQtOS44LTRjLTMuNywwLTcuMiwxLjUtOS44LDRMNjgsMTA1LjljLTUuNCw1LjQtNS40LDE0LjIsMCwxOS42bDEzMS41LDEzMEw2OC40LDM4Ny4xIGMtMi42LDIuNi00LjEsNi4xLTQuMSw5LjhjMCwzLjcsMS40LDcuMiw0LjEsOS44bDM3LjQsMzcuNmMyLjcsMi43LDYuMiw0LjEsOS44LDQuMWMzLjUsMCw3LjEtMS4zLDkuOC00LjFMMjU2LDMxMy4xbDEzMC43LDEzMS4xIGMyLjcsMi43LDYuMiw0LjEsOS44LDQuMWMzLjUsMCw3LjEtMS4zLDkuOC00LjFsMzcuNC0zNy42YzIuNi0yLjYsNC4xLTYuMSw0LjEtOS44QzQ0Ny43LDM5My4yLDQ0Ni4yLDM4OS43LDQ0My42LDM4Ny4xelwiIC8+XG5cdDwvU3ZnPlxuKTtcbiIsIi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gVEhFTUVcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5jb25zdCB0aGVtZSA9IHt9O1xuXG4vLyBjb250YWluZXJcbnRoZW1lLmNvbnRhaW5lciA9IHtcblx0YmFja2dyb3VuZDogJ3JnYmEoMCwgMCwgMCwgMC44KScsXG5cdGd1dHRlcjoge1xuXHRcdGhvcml6b250YWw6IDEwLFxuXHRcdHZlcnRpY2FsOiAxMCxcblx0fSxcblx0ekluZGV4OiAyMDAxLFxufTtcblxuLy8gaGVhZGVyXG50aGVtZS5oZWFkZXIgPSB7XG5cdGhlaWdodDogNDAsXG59O1xudGhlbWUuY2xvc2UgPSB7XG5cdGZpbGw6ICd3aGl0ZScsXG59O1xuXG4vLyBmb290ZXJcbnRoZW1lLmZvb3RlciA9IHtcblx0Y29sb3I6ICd3aGl0ZScsXG5cdGNvdW50OiB7XG5cdFx0Y29sb3I6ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNzUpJyxcblx0XHRmb250U2l6ZTogJzAuODVlbScsXG5cdH0sXG5cdGhlaWdodDogNDAsXG5cdGd1dHRlcjoge1xuXHRcdGhvcml6b250YWw6IDAsXG5cdFx0dmVydGljYWw6IDUsXG5cdH0sXG59O1xuXG4vLyB0aHVtYm5haWxzXG50aGVtZS5wYWdpbmF0aW9uID0ge1xuXHRhcnJvdzoge1xuXHRcdGJhY2tncm91bmQ6ICdibGFjaycsXG5cdFx0ZmlsbDogJ3doaXRlJyxcblx0XHRzaXplOiA1MCxcblx0fSxcblx0dGh1bWJuYWlsOiB7XG5cdFx0Ym9yZGVyQ29sb3I6ICdoc2xhKDAsIDAlLCAxMDAlLCAwLjIpJyxcblx0XHRzZWxlY3RlZEJvcmRlckNvbG9yOiAnd2hpdGUnLFxuXHRcdHNpemU6IDUwLFxuXHRcdGd1dHRlcjogMixcblx0fSxcbn07XG5cbi8vIGFycm93XG50aGVtZS5hcnJvdyA9IHtcblx0YmFja2dyb3VuZDogJ2JsYWNrJyxcblx0ZmlsbDogJ3doaXRlJyxcblx0aGVpZ2h0OiAxMjAsXG59O1xuXG5cbm1vZHVsZS5leHBvcnRzID0gdGhlbWU7XG4iLCIvKipcblx0QmluZCBtdWx0aXBsZSBjb21wb25lbnQgbWV0aG9kczpcblxuXHQqIEBwYXJhbSB7dGhpc30gY29udGV4dFxuXHQqIEBwYXJhbSB7QXJyYXl9IGZ1bmN0aW9uc1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdC4uLlxuXHRcdGJpbmRGdW5jdGlvbnMuY2FsbCh0aGlzLCBbJ2hhbmRsZUNsaWNrJywgJ2hhbmRsZU90aGVyJ10pO1xuXHR9XG4qL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJpbmRGdW5jdGlvbnMgKGZ1bmN0aW9ucykge1xuXHRmdW5jdGlvbnMuZm9yRWFjaChmID0+ICh0aGlzW2ZdID0gdGhpc1tmXS5iaW5kKHRoaXMpKSk7XG59O1xuIiwiLy8gUmV0dXJuIHRydWUgaWYgd2luZG93ICsgZG9jdW1lbnRcblxubW9kdWxlLmV4cG9ydHMgPSAhIShcblx0dHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcblx0JiYgd2luZG93LmRvY3VtZW50XG5cdCYmIHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50XG4pO1xuIiwiZnVuY3Rpb24gZGVlcE1lcmdlICh0YXJnZXQsIHNvdXJjZSA9IHt9KSB7XG5cdGNvbnN0IGV4dGVuZGVkID0gT2JqZWN0LmFzc2lnbih7fSwgdGFyZ2V0KTtcblxuXHRPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2goKGtleSkgPT4ge1xuXHRcdGlmICh0eXBlb2Ygc291cmNlW2tleV0gIT09ICdvYmplY3QnIHx8ICFzb3VyY2Vba2V5XSkge1xuXHRcdFx0ZXh0ZW5kZWRba2V5XSA9IHNvdXJjZVtrZXldO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAoIXRhcmdldFtrZXldKSB7XG5cdFx0XHRcdGV4dGVuZGVkW2tleV0gPSBzb3VyY2Vba2V5XTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGV4dGVuZGVkW2tleV0gPSBkZWVwTWVyZ2UodGFyZ2V0W2tleV0sIHNvdXJjZVtrZXldKTtcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xuXG5cdHJldHVybiBleHRlbmRlZDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkZWVwTWVyZ2U7XG4iLCJpbXBvcnQgYmluZEZ1bmN0aW9ucyBmcm9tICcuL2JpbmRGdW5jdGlvbnMnO1xuaW1wb3J0IGNhblVzZURvbSBmcm9tICcuL2NhblVzZURvbSc7XG5pbXBvcnQgZGVlcE1lcmdlIGZyb20gJy4vZGVlcE1lcmdlJztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdGJpbmRGdW5jdGlvbnMsXG5cdGNhblVzZURvbSxcblx0ZGVlcE1lcmdlLFxufTtcbiIsImltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgVHJhbnNpdGlvbkdyb3VwIGZyb20gJ3JlYWN0LXRyYW5zaXRpb24tZ3JvdXAvVHJhbnNpdGlvbkdyb3VwJztcbmltcG9ydCBnbGFtb3JvdXMsIHsgVGhlbWVQcm92aWRlciB9IGZyb20gJ2dsYW1vcm91cyc7XG5pbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFNjcm9sbExvY2sgZnJvbSAncmVhY3Qtc2Nyb2xsbG9jayc7XG5cbmltcG9ydCBkZWZhdWx0VGhlbWUgZnJvbSAnLi90aGVtZSc7XG5pbXBvcnQgQW5pbWF0aW9uV3JhcHBlciBmcm9tICcuL2NvbXBvbmVudHMvQW5pbWF0aW9uV3JhcHBlcic7XG5pbXBvcnQgQXJyb3cgZnJvbSAnLi9jb21wb25lbnRzL0Fycm93JztcbmltcG9ydCBDb250YWluZXIgZnJvbSAnLi9jb21wb25lbnRzL0NvbnRhaW5lcic7XG5pbXBvcnQgRm9vdGVyIGZyb20gJy4vY29tcG9uZW50cy9Gb290ZXInO1xuaW1wb3J0IEhlYWRlciBmcm9tICcuL2NvbXBvbmVudHMvSGVhZGVyJztcbmltcG9ydCBQYWdpbmF0ZWRUaHVtYm5haWxzIGZyb20gJy4vY29tcG9uZW50cy9QYWdpbmF0ZWRUaHVtYm5haWxzJztcbmltcG9ydCBQb3J0YWwgZnJvbSAnLi9jb21wb25lbnRzL1BvcnRhbCc7XG5cbmltcG9ydCB7IGJpbmRGdW5jdGlvbnMsIGNhblVzZURvbSwgZGVlcE1lcmdlIH0gZnJvbSAnLi91dGlscyc7XG5cbmNsYXNzIExpZ2h0Ym94IGV4dGVuZHMgQ29tcG9uZW50IHtcblx0Y29uc3RydWN0b3IgKHByb3BzKSB7XG5cdFx0c3VwZXIocHJvcHMpO1xuXHRcdHRoaXMudGhlbWUgPSBkZWVwTWVyZ2UoZGVmYXVsdFRoZW1lLCBwcm9wcy50aGVtZSk7XG5cdFx0YmluZEZ1bmN0aW9ucy5jYWxsKHRoaXMsIFtcblx0XHRcdCdnb3RvTmV4dCcsXG5cdFx0XHQnZ290b1ByZXYnLFxuXHRcdFx0J2Nsb3NlQmFja2Ryb3AnLFxuXHRcdFx0J2hhbmRsZUtleWJvYXJkSW5wdXQnLFxuXHRcdF0pO1xuXHR9XG5cdGdldENoaWxkQ29udGV4dCAoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHRoZW1lOiB0aGlzLnRoZW1lLFxuXHRcdH07XG5cdH1cblx0Y29tcG9uZW50RGlkTW91bnQgKCkge1xuXHRcdGlmICh0aGlzLnByb3BzLmlzT3BlbiAmJiB0aGlzLnByb3BzLmVuYWJsZUtleWJvYXJkSW5wdXQpIHtcblx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5oYW5kbGVLZXlib2FyZElucHV0KTtcblx0XHR9XG5cdH1cblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyAobmV4dFByb3BzKSB7XG5cdFx0aWYgKCFjYW5Vc2VEb20pIHJldHVybjtcblxuXHRcdC8vIHByZWxvYWQgaW1hZ2VzXG5cdFx0aWYgKG5leHRQcm9wcy5wcmVsb2FkTmV4dEltYWdlKSB7XG5cdFx0XHRjb25zdCBjdXJyZW50SW5kZXggPSB0aGlzLnByb3BzLmN1cnJlbnRJbWFnZTtcblx0XHRcdGNvbnN0IG5leHRJbmRleCA9IG5leHRQcm9wcy5jdXJyZW50SW1hZ2UgKyAxO1xuXHRcdFx0Y29uc3QgcHJldkluZGV4ID0gbmV4dFByb3BzLmN1cnJlbnRJbWFnZSAtIDE7XG5cdFx0XHRsZXQgcHJlbG9hZEluZGV4O1xuXG5cdFx0XHRpZiAoY3VycmVudEluZGV4ICYmIG5leHRQcm9wcy5jdXJyZW50SW1hZ2UgPiBjdXJyZW50SW5kZXgpIHtcblx0XHRcdFx0cHJlbG9hZEluZGV4ID0gbmV4dEluZGV4O1xuXHRcdFx0fSBlbHNlIGlmIChjdXJyZW50SW5kZXggJiYgbmV4dFByb3BzLmN1cnJlbnRJbWFnZSA8IGN1cnJlbnRJbmRleCkge1xuXHRcdFx0XHRwcmVsb2FkSW5kZXggPSBwcmV2SW5kZXg7XG5cdFx0XHR9XG5cblx0XHRcdC8vIGlmIHdlIGtub3cgdGhlIHVzZXIncyBkaXJlY3Rpb24ganVzdCBnZXQgb25lIGltYWdlXG5cdFx0XHQvLyBvdGhlcndpc2UsIHRvIGJlIHNhZmUsIHdlIG5lZWQgdG8gZ3JhYiBvbmUgaW4gZWFjaCBkaXJlY3Rpb25cblx0XHRcdGlmIChwcmVsb2FkSW5kZXgpIHtcblx0XHRcdFx0dGhpcy5wcmVsb2FkSW1hZ2UocHJlbG9hZEluZGV4KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMucHJlbG9hZEltYWdlKHByZXZJbmRleCk7XG5cdFx0XHRcdHRoaXMucHJlbG9hZEltYWdlKG5leHRJbmRleCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gYWRkL3JlbW92ZSBldmVudCBsaXN0ZW5lcnNcblx0XHRpZiAoIXRoaXMucHJvcHMuaXNPcGVuICYmIG5leHRQcm9wcy5pc09wZW4gJiYgbmV4dFByb3BzLmVuYWJsZUtleWJvYXJkSW5wdXQpIHtcblx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5oYW5kbGVLZXlib2FyZElucHV0KTtcblx0XHR9XG5cdFx0aWYgKCFuZXh0UHJvcHMuaXNPcGVuICYmIG5leHRQcm9wcy5lbmFibGVLZXlib2FyZElucHV0KSB7XG5cdFx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuaGFuZGxlS2V5Ym9hcmRJbnB1dCk7XG5cdFx0fVxuXHR9XG5cdGNvbXBvbmVudFdpbGxVbm1vdW50ICgpIHtcblx0XHRpZiAodGhpcy5wcm9wcy5lbmFibGVLZXlib2FyZElucHV0KSB7XG5cdFx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuaGFuZGxlS2V5Ym9hcmRJbnB1dCk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdC8vIE1FVEhPRFNcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblx0cHJlbG9hZEltYWdlIChpZHgpIHtcblx0XHRjb25zdCBpbWFnZSA9IHRoaXMucHJvcHMuaW1hZ2VzW2lkeF07XG5cblx0XHRpZiAoIWltYWdlKSByZXR1cm47XG5cblx0XHRjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcblxuXHRcdGltZy5zcmMgPSBpbWFnZS5zcmM7XG5cblx0XHRpZiAoaW1hZ2Uuc3Jjc2V0KSB7XG5cdFx0XHRpbWcuc3Jjc2V0ID0gaW1hZ2Uuc3Jjc2V0LmpvaW4oKTtcblx0XHR9XG5cdH1cblx0Z290b05leHQgKGV2ZW50KSB7XG5cdFx0aWYgKHRoaXMucHJvcHMuY3VycmVudEltYWdlID09PSAodGhpcy5wcm9wcy5pbWFnZXMubGVuZ3RoIC0gMSkpIHJldHVybjtcblx0XHRpZiAoZXZlbnQpIHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHR9XG5cdFx0dGhpcy5wcm9wcy5vbkNsaWNrTmV4dCgpO1xuXG5cdH1cblx0Z290b1ByZXYgKGV2ZW50KSB7XG5cdFx0aWYgKHRoaXMucHJvcHMuY3VycmVudEltYWdlID09PSAwKSByZXR1cm47XG5cdFx0aWYgKGV2ZW50KSB7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0fVxuXHRcdHRoaXMucHJvcHMub25DbGlja1ByZXYoKTtcblxuXHR9XG5cdGNsb3NlQmFja2Ryb3AgKGV2ZW50KSB7XG5cdFx0aWYgKGV2ZW50LnRhcmdldC5pZCA9PT0gJ2xpZ2h0Ym94QmFja2Ryb3AnKSB7XG5cdFx0XHR0aGlzLnByb3BzLm9uQ2xvc2UoKTtcblx0XHR9XG5cdH1cblx0aGFuZGxlS2V5Ym9hcmRJbnB1dCAoZXZlbnQpIHtcblx0XHRpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzcpIHsgLy8gbGVmdFxuXHRcdFx0dGhpcy5nb3RvUHJldihldmVudCk7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9IGVsc2UgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM5KSB7IC8vIHJpZ2h0XG5cdFx0XHR0aGlzLmdvdG9OZXh0KGV2ZW50KTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0gZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMjcpIHsgLy8gZXNjXG5cdFx0XHR0aGlzLnByb3BzLm9uQ2xvc2UoKTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cblx0fVxuXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHQvLyBSRU5ERVJFUlNcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblx0cmVuZGVyQXJyb3dQcmV2ICgpIHtcblx0XHRpZiAodGhpcy5wcm9wcy5jdXJyZW50SW1hZ2UgPT09IDApIHJldHVybiBudWxsO1xuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxBcnJvd1xuXHRcdFx0XHRkaXJlY3Rpb249XCJsZWZ0XCJcblx0XHRcdFx0aWNvbj1cImFycm93TGVmdFwiXG5cdFx0XHRcdG9uQ2xpY2s9e3RoaXMuZ290b1ByZXZ9XG5cdFx0XHRcdHRpdGxlPXt0aGlzLnByb3BzLmxlZnRBcnJvd1RpdGxlfVxuXHRcdFx0XHR0eXBlPVwiYnV0dG9uXCJcblx0XHRcdC8+XG5cdFx0KTtcblx0fVxuXHRyZW5kZXJBcnJvd05leHQgKCkge1xuXHRcdGlmICh0aGlzLnByb3BzLmN1cnJlbnRJbWFnZSA9PT0gKHRoaXMucHJvcHMuaW1hZ2VzLmxlbmd0aCAtIDEpKSByZXR1cm4gbnVsbDtcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8QXJyb3dcblx0XHRcdFx0ZGlyZWN0aW9uPVwicmlnaHRcIlxuXHRcdFx0XHRpY29uPVwiYXJyb3dSaWdodFwiXG5cdFx0XHRcdG9uQ2xpY2s9e3RoaXMuZ290b05leHR9XG5cdFx0XHRcdHRpdGxlPXt0aGlzLnByb3BzLnJpZ2h0QXJyb3dUaXRsZX1cblx0XHRcdFx0dHlwZT1cImJ1dHRvblwiXG5cdFx0XHQvPlxuXHRcdCk7XG5cdH1cblx0cmVuZGVyRGlhbG9nICgpIHtcblx0XHRjb25zdCB7XG5cdFx0XHRiYWNrZHJvcENsb3Nlc01vZGFsLFxuXHRcdFx0Y3VzdG9tQ29udHJvbHMsXG5cdFx0XHRpc09wZW4sXG5cdFx0XHRvbkNsb3NlLFxuXHRcdFx0c2hvd0Nsb3NlQnV0dG9uLFxuXHRcdFx0c2hvd1RodW1ibmFpbHMsXG5cdFx0XHR3aWR0aCxcblx0XHR9ID0gdGhpcy5wcm9wcztcblxuXHRcdC8vIGlmICghaXNPcGVuKSByZXR1cm4gPHNwYW4ga2V5PVwiY2xvc2VkXCIgLz47XG5cdFx0aWYgKCFpc09wZW4pIHJldHVybiBudWxsO1xuXG5cdFx0bGV0IG9mZnNldFRodW1ibmFpbHMgPSAwO1xuXHRcdGlmIChzaG93VGh1bWJuYWlscykge1xuXHRcdFx0b2Zmc2V0VGh1bWJuYWlscyA9IHRoaXMudGhlbWUucGFnaW5hdGlvbi50aHVtYm5haWwuc2l6ZSArIHRoaXMudGhlbWUuY29udGFpbmVyLmd1dHRlci52ZXJ0aWNhbDtcblx0XHR9XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PENvbnRhaW5lclxuXHRcdFx0XHRrZXk9XCJvcGVuXCJcblx0XHRcdFx0b25DbGljaz17ISFiYWNrZHJvcENsb3Nlc01vZGFsICYmIHRoaXMuY2xvc2VCYWNrZHJvcH1cblx0XHRcdFx0b25Ub3VjaEVuZD17ISFiYWNrZHJvcENsb3Nlc01vZGFsICYmIHRoaXMuY2xvc2VCYWNrZHJvcH1cblx0XHRcdD5cblx0XHRcdFx0PENvbnRlbnQgc3R5bGU9e3sgbWFyZ2luQm90dG9tOiBvZmZzZXRUaHVtYm5haWxzLCBtYXhXaWR0aDogd2lkdGggfX0+XG5cdFx0XHRcdFx0PEhlYWRlclxuXHRcdFx0XHRcdFx0Y3VzdG9tQ29udHJvbHM9e2N1c3RvbUNvbnRyb2xzfVxuXHRcdFx0XHRcdFx0b25DbG9zZT17b25DbG9zZX1cblx0XHRcdFx0XHRcdHNob3dDbG9zZUJ1dHRvbj17c2hvd0Nsb3NlQnV0dG9ufVxuXHRcdFx0XHRcdFx0Y2xvc2VCdXR0b25UaXRsZT17dGhpcy5wcm9wcy5jbG9zZUJ1dHRvblRpdGxlfVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0e3RoaXMucmVuZGVySW1hZ2VzKCl9XG5cdFx0XHRcdDwvQ29udGVudD5cblx0XHRcdFx0e3RoaXMucmVuZGVyVGh1bWJuYWlscygpfVxuXHRcdFx0XHR7dGhpcy5yZW5kZXJBcnJvd1ByZXYoKX1cblx0XHRcdFx0e3RoaXMucmVuZGVyQXJyb3dOZXh0KCl9XG5cdFx0XHRcdDxTY3JvbGxMb2NrIC8+XG5cdFx0XHQ8L0NvbnRhaW5lcj5cblx0XHQpO1xuXHR9XG5cdHJlbmRlckltYWdlcyAoKSB7XG5cdFx0Y29uc3Qge1xuXHRcdFx0Y3VycmVudEltYWdlLFxuXHRcdFx0aW1hZ2VzLFxuXHRcdFx0aW1hZ2VDb3VudFNlcGFyYXRvcixcblx0XHRcdG9uQ2xpY2tJbWFnZSxcblx0XHRcdHNob3dJbWFnZUNvdW50LFxuXHRcdFx0c2hvd1RodW1ibmFpbHMsXG5cdFx0fSA9IHRoaXMucHJvcHM7XG5cblx0XHRpZiAoIWltYWdlcyB8fCAhaW1hZ2VzLmxlbmd0aCkgcmV0dXJuIG51bGw7XG5cblx0XHRjb25zdCBpbWFnZSA9IGltYWdlc1tjdXJyZW50SW1hZ2VdO1xuXG5cdFx0bGV0IHNyY3NldDtcblx0XHRsZXQgc2l6ZXM7XG5cblx0XHRpZiAoaW1hZ2Uuc3Jjc2V0KSB7XG5cdFx0XHRzcmNzZXQgPSBpbWFnZS5zcmNzZXQuam9pbigpO1xuXHRcdFx0c2l6ZXMgPSAnMTAwdncnO1xuXHRcdH1cblxuXHRcdGNvbnN0IHRodW1ibmFpbHNTaXplID0gc2hvd1RodW1ibmFpbHMgPyB0aGlzLnRoZW1lLnBhZ2luYXRpb24udGh1bWJuYWlsLnNpemUgOiAwO1xuXHRcdGNvbnN0IGhlaWdodE9mZnNldCA9IGAke3RoaXMudGhlbWUuaGVhZGVyLmhlaWdodCArIHRoaXMudGhlbWUuZm9vdGVyLmhlaWdodCArIHRodW1ibmFpbHNTaXplXG5cdFx0XHQrICh0aGlzLnRoZW1lLmNvbnRhaW5lci5ndXR0ZXIudmVydGljYWwpfXB4YDtcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8RmlndXJlPlxuXHRcdFx0XHR7Lypcblx0XHRcdFx0XHRSZS1pbXBsZW1lbnQgd2hlbiByZWFjdCB3YXJuaW5nIFwidW5rbm93biBwcm9wc1wiXG5cdFx0XHRcdFx0aHR0cHM6Ly9mYi5tZS9yZWFjdC11bmtub3duLXByb3AgaXMgcmVzb2x2ZWRcblx0XHRcdFx0XHQ8U3dpcGVhYmxlIG9uU3dpcGVkTGVmdD17dGhpcy5nb3RvTmV4dH0gb25Td2lwZWRSaWdodD17dGhpcy5nb3RvUHJldn0gLz5cblx0XHRcdFx0Ki99XG5cdFx0XHRcdDxJbWFnZVxuXHRcdFx0XHRcdG9uQ2xpY2s9eyEhb25DbGlja0ltYWdlICYmIG9uQ2xpY2tJbWFnZX1cblx0XHRcdFx0XHRzaXplcz17c2l6ZXN9XG5cdFx0XHRcdFx0YWx0PXtpbWFnZS5hbHR9XG5cdFx0XHRcdFx0c3JjPXtpbWFnZS5zcmN9XG5cdFx0XHRcdFx0c3JjU2V0PXtzcmNzZXR9XG5cdFx0XHRcdFx0c3R5bGU9e3tcblx0XHRcdFx0XHRcdGN1cnNvcjogdGhpcy5wcm9wcy5vbkNsaWNrSW1hZ2UgPyAncG9pbnRlcicgOiAnYXV0bycsXG5cdFx0XHRcdFx0XHRtYXhIZWlnaHQ6IGBjYWxjKDEwMHZoIC0gJHtoZWlnaHRPZmZzZXR9KWAsXG5cdFx0XHRcdFx0fX1cblx0XHRcdFx0Lz5cblx0XHRcdFx0PEZvb3RlclxuXHRcdFx0XHRcdGNhcHRpb249e2ltYWdlc1tjdXJyZW50SW1hZ2VdLmNhcHRpb259XG5cdFx0XHRcdFx0Y291bnRDdXJyZW50PXtjdXJyZW50SW1hZ2UgKyAxfVxuXHRcdFx0XHRcdGNvdW50U2VwYXJhdG9yPXtpbWFnZUNvdW50U2VwYXJhdG9yfVxuXHRcdFx0XHRcdGNvdW50VG90YWw9e2ltYWdlcy5sZW5ndGh9XG5cdFx0XHRcdFx0c2hvd0NvdW50PXtzaG93SW1hZ2VDb3VudH1cblx0XHRcdFx0Lz5cblx0XHRcdDwvRmlndXJlPlxuXHRcdCk7XG5cdH1cblx0cmVuZGVyVGh1bWJuYWlscyAoKSB7XG5cdFx0Y29uc3QgeyBpbWFnZXMsIGN1cnJlbnRJbWFnZSwgb25DbGlja1RodW1ibmFpbCwgc2hvd1RodW1ibmFpbHMsIHRodW1ibmFpbE9mZnNldCB9ID0gdGhpcy5wcm9wcztcblxuXHRcdGlmICghc2hvd1RodW1ibmFpbHMpIHJldHVybjtcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8UGFnaW5hdGVkVGh1bWJuYWlsc1xuXHRcdFx0XHRjdXJyZW50SW1hZ2U9e2N1cnJlbnRJbWFnZX1cblx0XHRcdFx0aW1hZ2VzPXtpbWFnZXN9XG5cdFx0XHRcdG9mZnNldD17dGh1bWJuYWlsT2Zmc2V0fVxuXHRcdFx0XHRvbkNsaWNrVGh1bWJuYWlsPXtvbkNsaWNrVGh1bWJuYWlsfVxuXHRcdFx0Lz5cblx0XHQpO1xuXHR9XG5cdHJlbmRlciAoKSB7XG5cdFx0Y29uc3QgeyB0aGVtZSB9ID0gdGhpcy5wcm9wcztcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8VGhlbWVQcm92aWRlciB0aGVtZT17ZGVlcE1lcmdlKGRlZmF1bHRUaGVtZSwgdGhlbWUpfT5cblx0XHRcdFx0PFRyYW5zaXRpb25Hcm91cD5cblx0XHRcdFx0XHQ8QW5pbWF0aW9uV3JhcHBlcj5cblx0XHRcdFx0XHRcdHt0aGlzLnJlbmRlckRpYWxvZygpfVxuXHRcdFx0XHRcdDwvQW5pbWF0aW9uV3JhcHBlcj5cblx0XHRcdFx0PC9UcmFuc2l0aW9uR3JvdXA+XG5cdFx0XHQ8L1RoZW1lUHJvdmlkZXI+XG5cdFx0KTtcblx0fVxufVxuXG5MaWdodGJveC5wcm9wVHlwZXMgPSB7XG5cdGJhY2tkcm9wQ2xvc2VzTW9kYWw6IFByb3BUeXBlcy5ib29sLFxuXHRjbG9zZUJ1dHRvblRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRjdXJyZW50SW1hZ2U6IFByb3BUeXBlcy5udW1iZXIsXG5cdGN1c3RvbUNvbnRyb2xzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMubm9kZSksXG5cdGVuYWJsZUtleWJvYXJkSW5wdXQ6IFByb3BUeXBlcy5ib29sLFxuXHRpbWFnZUNvdW50U2VwYXJhdG9yOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRpbWFnZXM6IFByb3BUeXBlcy5hcnJheU9mKFxuXHRcdFByb3BUeXBlcy5zaGFwZSh7XG5cdFx0XHRzcmM6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcblx0XHRcdHNyY3NldDogUHJvcFR5cGVzLmFycmF5LFxuXHRcdFx0Y2FwdGlvbjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcblx0XHRcdHRodW1ibmFpbDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHR9KVxuXHQpLmlzUmVxdWlyZWQsXG5cdGlzT3BlbjogUHJvcFR5cGVzLmJvb2wsXG5cdGxlZnRBcnJvd1RpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRvbkNsaWNrSW1hZ2U6IFByb3BUeXBlcy5mdW5jLFxuXHRvbkNsaWNrTmV4dDogUHJvcFR5cGVzLmZ1bmMsXG5cdG9uQ2xpY2tQcmV2OiBQcm9wVHlwZXMuZnVuYyxcblx0b25DbG9zZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblx0cHJlbG9hZE5leHRJbWFnZTogUHJvcFR5cGVzLmJvb2wsXG5cdHJpZ2h0QXJyb3dUaXRsZTogUHJvcFR5cGVzLnN0cmluZyxcblx0c2hvd0Nsb3NlQnV0dG9uOiBQcm9wVHlwZXMuYm9vbCxcblx0c2hvd0ltYWdlQ291bnQ6IFByb3BUeXBlcy5ib29sLFxuXHRzaG93VGh1bWJuYWlsczogUHJvcFR5cGVzLmJvb2wsXG5cdHRoZW1lOiBQcm9wVHlwZXMub2JqZWN0LFxuXHR0aHVtYm5haWxPZmZzZXQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdHdpZHRoOiBQcm9wVHlwZXMubnVtYmVyLFxufTtcbkxpZ2h0Ym94LmRlZmF1bHRQcm9wcyA9IHtcblx0Y2xvc2VCdXR0b25UaXRsZTogJ0Nsb3NlIChFc2MpJyxcblx0Y3VycmVudEltYWdlOiAwLFxuXHRlbmFibGVLZXlib2FyZElucHV0OiB0cnVlLFxuXHRpbWFnZUNvdW50U2VwYXJhdG9yOiAnIG9mICcsXG5cdGxlZnRBcnJvd1RpdGxlOiAnUHJldmlvdXMgKExlZnQgYXJyb3cga2V5KScsXG5cdG9uQ2xpY2tTaG93TmV4dEltYWdlOiB0cnVlLFxuXHRwcmVsb2FkTmV4dEltYWdlOiB0cnVlLFxuXHRyaWdodEFycm93VGl0bGU6ICdOZXh0IChSaWdodCBhcnJvdyBrZXkpJyxcblx0c2hvd0Nsb3NlQnV0dG9uOiB0cnVlLFxuXHRzaG93SW1hZ2VDb3VudDogdHJ1ZSxcblx0dGhlbWU6IHt9LFxuXHR0aHVtYm5haWxPZmZzZXQ6IDIsXG5cdHdpZHRoOiAxMDI0LFxufTtcbkxpZ2h0Ym94LmNoaWxkQ29udGV4dFR5cGVzID0ge1xuXHR0aGVtZTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxufTtcblxuY29uc3QgQ29udGVudCA9IGdsYW1vcm91cy5kaXYoe1xuXHRwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbn0pO1xuY29uc3QgRmlndXJlID0gZ2xhbW9yb3VzLmRpdih7XG5cdG1hcmdpbjogMCwgLy8gcmVtb3ZlIGJyb3dzZXIgZGVmYXVsdFxufSk7XG5jb25zdCBJbWFnZSA9IGdsYW1vcm91cy5pbWcoe1xuXHRkaXNwbGF5OiAnYmxvY2snLCAvLyByZW1vdmVzIGJyb3dzZXIgZGVmYXVsdCBndXR0ZXJcblx0aGVpZ2h0OiAnYXV0bycsXG5cdG1hcmdpbjogJzAgYXV0bycsIC8vIG1haW50YWluIGNlbnRlciBvbiB2ZXJ5IHNob3J0IHNjcmVlbnMgT1IgdmVyeSBuYXJyb3cgaW1hZ2Vcblx0bWF4V2lkdGg6ICcxMDAlJyxcblxuXHQvLyBkaXNhYmxlIHVzZXIgc2VsZWN0XG5cdFdlYmtpdFRvdWNoQ2FsbG91dDogJ25vbmUnLFxuXHR1c2VyU2VsZWN0OiAnbm9uZScsXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgTGlnaHRib3g7XG4iXX0=
