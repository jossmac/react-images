require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _inlineStylePrefixerStatic = require('inline-style-prefixer/static');

var _inlineStylePrefixerStatic2 = _interopRequireDefault(_inlineStylePrefixerStatic);

var _util = require('./util');

/**
 * Generate CSS for a selector and some styles.
 *
 * This function handles the media queries, pseudo selectors, and descendant
 * styles that can be used in aphrodite styles.
 *
 * @param {string} selector: A base CSS selector for the styles to be generated
 *     with.
 * @param {Object} styleTypes: A list of properties of the return type of
 *     StyleSheet.create, e.g. [styles.red, styles.blue].
 * @param stringHandlers: See `generateCSSRuleset`
 * @param useImportant: See `generateCSSRuleset`
 *
 * To actually generate the CSS special-construct-less styles are passed to
 * `generateCSSRuleset`.
 *
 * For instance, a call to
 *
 *     generateCSSInner(".foo", {
 *       color: "red",
 *       "@media screen": {
 *         height: 20,
 *         ":hover": {
 *           backgroundColor: "black"
 *         }
 *       },
 *       ":active": {
 *         fontWeight: "bold",
 *         ">>bar": {
 *           _names: { "foo_bar": true },
 *           height: 10,
 *         }
 *       }
 *     });
 *
 * will make 5 calls to `generateCSSRuleset`:
 *
 *     generateCSSRuleset(".foo", { color: "red" }, ...)
 *     generateCSSRuleset(".foo:active", { fontWeight: "bold" }, ...)
 *     generateCSSRuleset(".foo:active .foo_bar", { height: 10 }, ...)
 *     // These 2 will be wrapped in @media screen {}
 *     generateCSSRuleset(".foo", { height: 20 }, ...)
 *     generateCSSRuleset(".foo:hover", { backgroundColor: "black" }, ...)
 */
var generateCSS = function generateCSS(selector, styleTypes, stringHandlers, useImportant) {
    var merged = styleTypes.reduce(_util.recursiveMerge);

    var declarations = {};
    var mediaQueries = {};
    var pseudoStyles = {};

    Object.keys(merged).forEach(function (key) {
        if (key[0] === ':') {
            pseudoStyles[key] = merged[key];
        } else if (key[0] === '@') {
            mediaQueries[key] = merged[key];
        } else {
            declarations[key] = merged[key];
        }
    });

    return generateCSSRuleset(selector, declarations, stringHandlers, useImportant) + Object.keys(pseudoStyles).map(function (pseudoSelector) {
        return generateCSSRuleset(selector + pseudoSelector, pseudoStyles[pseudoSelector], stringHandlers, useImportant);
    }).join("") + Object.keys(mediaQueries).map(function (mediaQuery) {
        var ruleset = generateCSS(selector, [mediaQueries[mediaQuery]], stringHandlers, useImportant);
        return mediaQuery + '{' + ruleset + '}';
    }).join("");
};

exports.generateCSS = generateCSS;
/**
 * Helper method of generateCSSRuleset to facilitate custom handling of certain
 * CSS properties. Used for e.g. font families.
 *
 * See generateCSSRuleset for usage and documentation of paramater types.
 */
var runStringHandlers = function runStringHandlers(declarations, stringHandlers) {
    var result = {};

    Object.keys(declarations).forEach(function (key) {
        // If a handler exists for this particular key, let it interpret
        // that value first before continuing
        if (stringHandlers && stringHandlers.hasOwnProperty(key)) {
            result[key] = stringHandlers[key](declarations[key]);
        } else {
            result[key] = declarations[key];
        }
    });

    return result;
};

/**
 * Generate a CSS ruleset with the selector and containing the declarations.
 *
 * This function assumes that the given declarations don't contain any special
 * children (such as media queries, pseudo-selectors, or descendant styles).
 *
 * Note that this method does not deal with nesting used for e.g.
 * psuedo-selectors or media queries. That responsibility is left to  the
 * `generateCSS` function.
 *
 * @param {string} selector: the selector associated with the ruleset
 * @param {Object} declarations: a map from camelCased CSS property name to CSS
 *     property value.
 * @param {Object.<string, function>} stringHandlers: a map from camelCased CSS
 *     property name to a function which will map the given value to the value
 *     that is output.
 * @param {bool} useImportant: A boolean saying whether to append "!important"
 *     to each of the CSS declarations.
 * @returns {string} A string of raw CSS.
 *
 * Examples:
 *
 *    generateCSSRuleset(".blah", { color: "red" })
 *    -> ".blah{color: red !important;}"
 *    generateCSSRuleset(".blah", { color: "red" }, {}, false)
 *    -> ".blah{color: red}"
 *    generateCSSRuleset(".blah", { color: "red" }, {color: c => c.toUpperCase})
 *    -> ".blah{color: RED}"
 *    generateCSSRuleset(".blah:hover", { color: "red" })
 *    -> ".blah:hover{color: red}"
 */
var generateCSSRuleset = function generateCSSRuleset(selector, declarations, stringHandlers, useImportant) {
    var handledDeclarations = runStringHandlers(declarations, stringHandlers);

    var prefixedDeclarations = (0, _inlineStylePrefixerStatic2['default'])(handledDeclarations);

    var prefixedRules = (0, _util.flatten)((0, _util.objectToPairs)(prefixedDeclarations).map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2);

        var key = _ref2[0];
        var value = _ref2[1];

        if (Array.isArray(value)) {
            var _ret = (function () {
                // inline-style-prefix-all returns an array when there should be
                // multiple rules, we will flatten to single rules

                var prefixedValues = [];
                var unprefixedValues = [];

                value.forEach(function (v) {
                    if (v.indexOf('-') === 0) {
                        prefixedValues.push(v);
                    } else {
                        unprefixedValues.push(v);
                    }
                });

                prefixedValues.sort();
                unprefixedValues.sort();

                return {
                    v: prefixedValues.concat(unprefixedValues).map(function (v) {
                        return [key, v];
                    })
                };
            })();

            if (typeof _ret === 'object') return _ret.v;
        }
        return [[key, value]];
    }));

    var rules = prefixedRules.map(function (_ref3) {
        var _ref32 = _slicedToArray(_ref3, 2);

        var key = _ref32[0];
        var value = _ref32[1];

        var stringValue = (0, _util.stringifyValue)(key, value);
        var ret = (0, _util.kebabifyStyleName)(key) + ':' + stringValue + ';';
        return useImportant === false ? ret : (0, _util.importantify)(ret);
    }).join("");

    if (rules) {
        return selector + '{' + rules + '}';
    } else {
        return "";
    }
};
exports.generateCSSRuleset = generateCSSRuleset;
},{"./util":5,"inline-style-prefixer/static":23}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _util = require('./util');

var _inject = require('./inject');

var StyleSheet = {
    create: function create(sheetDefinition) {
        return (0, _util.mapObj)(sheetDefinition, function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2);

            var key = _ref2[0];
            var val = _ref2[1];

            return [key, {
                // TODO(emily): Make a 'production' mode which doesn't prepend
                // the class name here, to make the generated CSS smaller.
                _name: key + '_' + (0, _util.hashObject)(val),
                _definition: val
            }];
        });
    },

    rehydrate: function rehydrate() {
        var renderedClassNames = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

        (0, _inject.addRenderedClassNames)(renderedClassNames);
    }
};

/**
 * Utilities for using Aphrodite server-side.
 */
var StyleSheetServer = {
    renderStatic: function renderStatic(renderFunc) {
        (0, _inject.reset)();
        (0, _inject.startBuffering)();
        var html = renderFunc();
        var cssContent = (0, _inject.flushToString)();

        return {
            html: html,
            css: {
                content: cssContent,
                renderedClassNames: (0, _inject.getRenderedClassNames)()
            }
        };
    }
};

/**
 * Utilities for using Aphrodite in tests.
 *
 * Not meant to be used in production.
 */
var StyleSheetTestUtils = {
    /**
     * Prevent styles from being injected into the DOM.
     *
     * This is useful in situations where you'd like to test rendering UI
     * components which use Aphrodite without any of the side-effects of
     * Aphrodite happening. Particularly useful for testing the output of
     * components when you have no DOM, e.g. testing in Node without a fake DOM.
     *
     * Should be paired with a subsequent call to
     * clearBufferAndResumeStyleInjection.
     */
    suppressStyleInjection: function suppressStyleInjection() {
        (0, _inject.reset)();
        (0, _inject.startBuffering)();
    },

    /**
     * Opposite method of preventStyleInject.
     */
    clearBufferAndResumeStyleInjection: function clearBufferAndResumeStyleInjection() {
        (0, _inject.reset)();
    }
};

var css = function css() {
    for (var _len = arguments.length, styleDefinitions = Array(_len), _key = 0; _key < _len; _key++) {
        styleDefinitions[_key] = arguments[_key];
    }

    var useImportant = true; // Append !important to all style definitions
    return (0, _inject.injectAndGetClassName)(useImportant, styleDefinitions);
};

exports['default'] = {
    StyleSheet: StyleSheet,
    StyleSheetServer: StyleSheetServer,
    StyleSheetTestUtils: StyleSheetTestUtils,
    css: css
};
module.exports = exports['default'];
},{"./inject":3,"./util":5}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _asap = require('asap');

var _asap2 = _interopRequireDefault(_asap);

var _generate = require('./generate');

var _util = require('./util');

// The current <style> tag we are inserting into, or null if we haven't
// inserted anything yet. We could find this each time using
// `document.querySelector("style[data-aphrodite"])`, but holding onto it is
// faster.
var styleTag = null;

// Inject a string of styles into a <style> tag in the head of the document. This
// will automatically create a style tag and then continue to use it for
// multiple injections. It will also use a style tag with the `data-aphrodite`
// tag on it if that exists in the DOM. This could be used for e.g. reusing the
// same style tag that server-side rendering inserts.
var injectStyleTag = function injectStyleTag(cssContents) {
    if (styleTag == null) {
        // Try to find a style tag with the `data-aphrodite` attribute first.
        styleTag = document.querySelector("style[data-aphrodite]");

        // If that doesn't work, generate a new style tag.
        if (styleTag == null) {
            // Taken from
            // http://stackoverflow.com/questions/524696/how-to-create-a-style-tag-with-javascript
            var head = document.head || document.getElementsByTagName('head')[0];
            styleTag = document.createElement('style');

            styleTag.type = 'text/css';
            styleTag.setAttribute("data-aphrodite", "");
            head.appendChild(styleTag);
        }
    }

    if (styleTag.styleSheet) {
        styleTag.styleSheet.cssText += cssContents;
    } else {
        styleTag.appendChild(document.createTextNode(cssContents));
    }
};

// Custom handlers for stringifying CSS values that have side effects
// (such as fontFamily, which can cause @font-face rules to be injected)
var stringHandlers = {
    // With fontFamily we look for objects that are passed in and interpret
    // them as @font-face rules that we need to inject. The value of fontFamily
    // can either be a string (as normal), an object (a single font face), or
    // an array of objects and strings.
    fontFamily: function fontFamily(val) {
        if (Array.isArray(val)) {
            return val.map(fontFamily).join(",");
        } else if (typeof val === "object") {
            injectStyleOnce(val.fontFamily, "@font-face", [val], false);
            return '"' + val.fontFamily + '"';
        } else {
            return val;
        }
    },

    // With animationName we look for an object that contains keyframes and
    // inject them as an `@keyframes` block, returning a uniquely generated
    // name. The keyframes object should look like
    //  animationName: {
    //    from: {
    //      left: 0,
    //      top: 0,
    //    },
    //    '50%': {
    //      left: 15,
    //      top: 5,
    //    },
    //    to: {
    //      left: 20,
    //      top: 20,
    //    }
    //  }
    // TODO(emily): `stringHandlers` doesn't let us rename the key, so I have
    // to use `animationName` here. Improve that so we can call this
    // `animation` instead of `animationName`.
    animationName: function animationName(val) {
        if (typeof val !== "object") {
            return val;
        }

        // Generate a unique name based on the hash of the object. We can't
        // just use the hash because the name can't start with a number.
        // TODO(emily): this probably makes debugging hard, allow a custom
        // name?
        var name = 'keyframe_' + (0, _util.hashObject)(val);

        // Since keyframes need 3 layers of nesting, we use `generateCSS` to
        // build the inner layers and wrap it in `@keyframes` ourselves.
        var finalVal = '@keyframes ' + name + '{';
        Object.keys(val).forEach(function (key) {
            finalVal += (0, _generate.generateCSS)(key, [val[key]], stringHandlers, false);
        });
        finalVal += '}';

        injectGeneratedCSSOnce(name, finalVal);

        return name;
    }
};

// This is a map from Aphrodite's generated class names to `true` (acting as a
// set of class names)
var alreadyInjected = {};

// This is the buffer of styles which have not yet been flushed.
var injectionBuffer = "";

// A flag to tell if we are already buffering styles. This could happen either
// because we scheduled a flush call already, so newly added styles will
// already be flushed, or because we are statically buffering on the server.
var isBuffering = false;

var injectGeneratedCSSOnce = function injectGeneratedCSSOnce(key, generatedCSS) {
    if (!alreadyInjected[key]) {
        if (!isBuffering) {
            // We should never be automatically buffering on the server (or any
            // place without a document), so guard against that.
            if (typeof document === "undefined") {
                throw new Error("Cannot automatically buffer without a document");
            }

            // If we're not already buffering, schedule a call to flush the
            // current styles.
            isBuffering = true;
            (0, _asap2['default'])(flushToStyleTag);
        }

        injectionBuffer += generatedCSS;
        alreadyInjected[key] = true;
    }
};

var injectStyleOnce = function injectStyleOnce(key, selector, definitions, useImportant) {
    if (!alreadyInjected[key]) {
        var generated = (0, _generate.generateCSS)(selector, definitions, stringHandlers, useImportant);

        injectGeneratedCSSOnce(key, generated);
    }
};

exports.injectStyleOnce = injectStyleOnce;
var reset = function reset() {
    injectionBuffer = "";
    alreadyInjected = {};
    isBuffering = false;
    styleTag = null;
};

exports.reset = reset;
var startBuffering = function startBuffering() {
    if (isBuffering) {
        throw new Error("Cannot buffer while already buffering");
    }
    isBuffering = true;
};

exports.startBuffering = startBuffering;
var flushToString = function flushToString() {
    isBuffering = false;
    var ret = injectionBuffer;
    injectionBuffer = "";
    return ret;
};

exports.flushToString = flushToString;
var flushToStyleTag = function flushToStyleTag() {
    var cssContent = flushToString();
    if (cssContent.length > 0) {
        injectStyleTag(cssContent);
    }
};

exports.flushToStyleTag = flushToStyleTag;
var getRenderedClassNames = function getRenderedClassNames() {
    return Object.keys(alreadyInjected);
};

exports.getRenderedClassNames = getRenderedClassNames;
var addRenderedClassNames = function addRenderedClassNames(classNames) {
    classNames.forEach(function (className) {
        alreadyInjected[className] = true;
    });
};

exports.addRenderedClassNames = addRenderedClassNames;
/**
 * Inject styles associated with the passed style definition objects, and return
 * an associated CSS class name.
 *
 * @param {boolean} useImportant If true, will append !important to generated
 *     CSS output. e.g. {color: red} -> "color: red !important".
 * @param {Object[]} styleDefinitions style definition objects as returned as
 *     properties of the return value of StyleSheet.create().
 */
var injectAndGetClassName = function injectAndGetClassName(useImportant, styleDefinitions) {
    // Filter out falsy values from the input, to allow for
    // `css(a, test && c)`
    var validDefinitions = styleDefinitions.filter(function (def) {
        return def;
    });

    // Break if there aren't any valid styles.
    if (validDefinitions.length === 0) {
        return "";
    }

    var className = validDefinitions.map(function (s) {
        return s._name;
    }).join("-o_O-");
    injectStyleOnce(className, '.' + className, validDefinitions.map(function (d) {
        return d._definition;
    }), useImportant);

    return className;
};
exports.injectAndGetClassName = injectAndGetClassName;
},{"./generate":1,"./util":5,"asap":7}],4:[function(require,module,exports){
// Module with the same interface as the core aphrodite module,
// except that styles injected do not automatically have !important
// appended to them.
//
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _inject = require('./inject');

var _indexJs = require('./index.js');

var css = function css() {
    for (var _len = arguments.length, styleDefinitions = Array(_len), _key = 0; _key < _len; _key++) {
        styleDefinitions[_key] = arguments[_key];
    }

    var useImportant = false; // Don't append !important to style definitions
    return (0, _inject.injectAndGetClassName)(useImportant, styleDefinitions);
};

exports.StyleSheet = _indexJs.StyleSheet;
exports.StyleSheetServer = _indexJs.StyleSheetServer;
exports.StyleSheetTestUtils = _indexJs.StyleSheetTestUtils;
exports.css = css;
},{"./index.js":2,"./inject":3}],5:[function(require,module,exports){
// {K1: V1, K2: V2, ...} -> [[K1, V1], [K2, V2]]
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var objectToPairs = function objectToPairs(obj) {
    return Object.keys(obj).map(function (key) {
        return [key, obj[key]];
    });
};

exports.objectToPairs = objectToPairs;
// [[K1, V1], [K2, V2]] -> {K1: V1, K2: V2, ...}
var pairsToObject = function pairsToObject(pairs) {
    var result = {};
    pairs.forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2);

        var key = _ref2[0];
        var val = _ref2[1];

        result[key] = val;
    });
    return result;
};

var mapObj = function mapObj(obj, fn) {
    return pairsToObject(objectToPairs(obj).map(fn));
};

exports.mapObj = mapObj;
// Flattens an array one level
// [[A], [B, C, [D]]] -> [A, B, C, [D]]
var flatten = function flatten(list) {
    return list.reduce(function (memo, x) {
        return memo.concat(x);
    }, []);
};

exports.flatten = flatten;
var UPPERCASE_RE = /([A-Z])/g;
var MS_RE = /^ms-/;

var kebabify = function kebabify(string) {
    return string.replace(UPPERCASE_RE, '-$1').toLowerCase();
};
var kebabifyStyleName = function kebabifyStyleName(string) {
    return kebabify(string).replace(MS_RE, '-ms-');
};

exports.kebabifyStyleName = kebabifyStyleName;
var recursiveMerge = function recursiveMerge(a, b) {
    // TODO(jlfwong): Handle malformed input where a and b are not the same
    // type.

    if (typeof a !== 'object') {
        return b;
    }

    var ret = _extends({}, a);

    Object.keys(b).forEach(function (key) {
        if (ret.hasOwnProperty(key)) {
            ret[key] = recursiveMerge(a[key], b[key]);
        } else {
            ret[key] = b[key];
        }
    });

    return ret;
};

exports.recursiveMerge = recursiveMerge;
/**
 * CSS properties which accept numbers but are not in units of "px".
 * Taken from React's CSSProperty.js
 */
var isUnitlessNumber = {
    animationIterationCount: true,
    borderImageOutset: true,
    borderImageSlice: true,
    borderImageWidth: true,
    boxFlex: true,
    boxFlexGroup: true,
    boxOrdinalGroup: true,
    columnCount: true,
    flex: true,
    flexGrow: true,
    flexPositive: true,
    flexShrink: true,
    flexNegative: true,
    flexOrder: true,
    gridRow: true,
    gridColumn: true,
    fontWeight: true,
    lineClamp: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    tabSize: true,
    widows: true,
    zIndex: true,
    zoom: true,

    // SVG-related properties
    fillOpacity: true,
    floodOpacity: true,
    stopOpacity: true,
    strokeDasharray: true,
    strokeDashoffset: true,
    strokeMiterlimit: true,
    strokeOpacity: true,
    strokeWidth: true
};

/**
 * Taken from React's CSSProperty.js
 *
 * @param {string} prefix vendor-specific prefix, eg: Webkit
 * @param {string} key style name, eg: transitionDuration
 * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
 * WebkitTransitionDuration
 */
function prefixKey(prefix, key) {
    return prefix + key.charAt(0).toUpperCase() + key.substring(1);
}

/**
 * Support style names that may come passed in prefixed by adding permutations
 * of vendor prefixes.
 * Taken from React's CSSProperty.js
 */
var prefixes = ['Webkit', 'ms', 'Moz', 'O'];

// Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
// infinite loop, because it iterates over the newly added props too.
// Taken from React's CSSProperty.js
Object.keys(isUnitlessNumber).forEach(function (prop) {
    prefixes.forEach(function (prefix) {
        isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
    });
});

var stringifyValue = function stringifyValue(key, prop) {
    if (typeof prop === "number") {
        if (isUnitlessNumber[key]) {
            return "" + prop;
        } else {
            return prop + "px";
        }
    } else {
        return prop;
    }
};

exports.stringifyValue = stringifyValue;
/**
 * JS Implementation of MurmurHash2
 *
 * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
 * @see http://github.com/garycourt/murmurhash-js
 * @author <a href="mailto:aappleby@gmail.com">Austin Appleby</a>
 * @see http://sites.google.com/site/murmurhash/
 *
 * @param {string} str ASCII only
 * @return {string} Base 36 encoded hash result
 */
function murmurhash2_32_gc(str) {
    var l = str.length;
    var h = l;
    var i = 0;
    var k = undefined;

    while (l >= 4) {
        k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;

        k = (k & 0xffff) * 0x5bd1e995 + (((k >>> 16) * 0x5bd1e995 & 0xffff) << 16);
        k ^= k >>> 24;
        k = (k & 0xffff) * 0x5bd1e995 + (((k >>> 16) * 0x5bd1e995 & 0xffff) << 16);

        h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16) ^ k;

        l -= 4;
        ++i;
    }

    switch (l) {
        case 3:
            h ^= (str.charCodeAt(i + 2) & 0xff) << 16;
        case 2:
            h ^= (str.charCodeAt(i + 1) & 0xff) << 8;
        case 1:
            h ^= str.charCodeAt(i) & 0xff;
            h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16);
    }

    h ^= h >>> 13;
    h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16);
    h ^= h >>> 15;

    return (h >>> 0).toString(36);
}

// Hash a javascript object using JSON.stringify. This is very fast, about 3
// microseconds on my computer for a sample object:
// http://jsperf.com/test-hashfnv32a-hash/5
//
// Note that this uses JSON.stringify to stringify the objects so in order for
// this to produce consistent hashes browsers need to have a consistent
// ordering of objects. Ben Alpert says that Facebook depends on this, so we
// can probably depend on this too.
var hashObject = function hashObject(object) {
    return murmurhash2_32_gc(JSON.stringify(object));
};

exports.hashObject = hashObject;
var IMPORTANT_RE = /^([^:]+:.*?)( !important)?;$/;

// Given a single style rule string like "a: b;", adds !important to generate
// "a: b !important;".
var importantify = function importantify(string) {
    return string.replace(IMPORTANT_RE, function (_, base, important) {
        return base + " !important;";
    });
};
exports.importantify = importantify;
},{}],6:[function(require,module,exports){
module.exports = require('./lib/no-important.js');

},{"./lib/no-important.js":4}],7:[function(require,module,exports){
"use strict";

// rawAsap provides everything we need except exception management.
var rawAsap = require("./raw");
// RawTasks are recycled to reduce GC churn.
var freeTasks = [];
// We queue errors to ensure they are thrown in right order (FIFO).
// Array-as-queue is good enough here, since we are just dealing with exceptions.
var pendingErrors = [];
var requestErrorThrow = rawAsap.makeRequestCallFromTimer(throwFirstError);

function throwFirstError() {
    if (pendingErrors.length) {
        throw pendingErrors.shift();
    }
}

/**
 * Calls a task as soon as possible after returning, in its own event, with priority
 * over other events like animation, reflow, and repaint. An error thrown from an
 * event will not interrupt, nor even substantially slow down the processing of
 * other events, but will be rather postponed to a lower priority event.
 * @param {{call}} task A callable object, typically a function that takes no
 * arguments.
 */
module.exports = asap;
function asap(task) {
    var rawTask;
    if (freeTasks.length) {
        rawTask = freeTasks.pop();
    } else {
        rawTask = new RawTask();
    }
    rawTask.task = task;
    rawAsap(rawTask);
}

// We wrap tasks with recyclable task objects.  A task object implements
// `call`, just like a function.
function RawTask() {
    this.task = null;
}

// The sole purpose of wrapping the task is to catch the exception and recycle
// the task object after its single use.
RawTask.prototype.call = function () {
    try {
        this.task.call();
    } catch (error) {
        if (asap.onerror) {
            // This hook exists purely for testing purposes.
            // Its name will be periodically randomized to break any code that
            // depends on its existence.
            asap.onerror(error);
        } else {
            // In a web browser, exceptions are not fatal. However, to avoid
            // slowing down the queue of pending tasks, we rethrow the error in a
            // lower priority turn.
            pendingErrors.push(error);
            requestErrorThrow();
        }
    } finally {
        this.task = null;
        freeTasks[freeTasks.length] = this;
    }
};

},{"./raw":8}],8:[function(require,module,exports){
(function (global){
"use strict";

// Use the fastest means possible to execute a task in its own turn, with
// priority over other events including IO, animation, reflow, and redraw
// events in browsers.
//
// An exception thrown by a task will permanently interrupt the processing of
// subsequent tasks. The higher level `asap` function ensures that if an
// exception is thrown by a task, that the task queue will continue flushing as
// soon as possible, but if you use `rawAsap` directly, you are responsible to
// either ensure that no exceptions are thrown from your task, or to manually
// call `rawAsap.requestFlush` if an exception is thrown.
module.exports = rawAsap;
function rawAsap(task) {
    if (!queue.length) {
        requestFlush();
        flushing = true;
    }
    // Equivalent to push, but avoids a function call.
    queue[queue.length] = task;
}

var queue = [];
// Once a flush has been requested, no further calls to `requestFlush` are
// necessary until the next `flush` completes.
var flushing = false;
// `requestFlush` is an implementation-specific method that attempts to kick
// off a `flush` event as quickly as possible. `flush` will attempt to exhaust
// the event queue before yielding to the browser's own event loop.
var requestFlush;
// The position of the next task to execute in the task queue. This is
// preserved between calls to `flush` so that it can be resumed if
// a task throws an exception.
var index = 0;
// If a task schedules additional tasks recursively, the task queue can grow
// unbounded. To prevent memory exhaustion, the task queue will periodically
// truncate already-completed tasks.
var capacity = 1024;

// The flush function processes all tasks that have been scheduled with
// `rawAsap` unless and until one of those tasks throws an exception.
// If a task throws an exception, `flush` ensures that its state will remain
// consistent and will resume where it left off when called again.
// However, `flush` does not make any arrangements to be called again if an
// exception is thrown.
function flush() {
    while (index < queue.length) {
        var currentIndex = index;
        // Advance the index before calling the task. This ensures that we will
        // begin flushing on the next task the task throws an error.
        index = index + 1;
        queue[currentIndex].call();
        // Prevent leaking memory for long chains of recursive calls to `asap`.
        // If we call `asap` within tasks scheduled by `asap`, the queue will
        // grow, but to avoid an O(n) walk for every task we execute, we don't
        // shift tasks off the queue after they have been executed.
        // Instead, we periodically shift 1024 tasks off the queue.
        if (index > capacity) {
            // Manually shift all values starting at the index back to the
            // beginning of the queue.
            for (var scan = 0, newLength = queue.length - index; scan < newLength; scan++) {
                queue[scan] = queue[scan + index];
            }
            queue.length -= index;
            index = 0;
        }
    }
    queue.length = 0;
    index = 0;
    flushing = false;
}

// `requestFlush` is implemented using a strategy based on data collected from
// every available SauceLabs Selenium web driver worker at time of writing.
// https://docs.google.com/spreadsheets/d/1mG-5UYGup5qxGdEMWkhP6BWCz053NUb2E1QoUTU16uA/edit#gid=783724593

// Safari 6 and 6.1 for desktop, iPad, and iPhone are the only browsers that
// have WebKitMutationObserver but not un-prefixed MutationObserver.
// Must use `global` instead of `window` to work in both frames and web
// workers. `global` is a provision of Browserify, Mr, Mrs, or Mop.
var BrowserMutationObserver = global.MutationObserver || global.WebKitMutationObserver;

// MutationObservers are desirable because they have high priority and work
// reliably everywhere they are implemented.
// They are implemented in all modern browsers.
//
// - Android 4-4.3
// - Chrome 26-34
// - Firefox 14-29
// - Internet Explorer 11
// - iPad Safari 6-7.1
// - iPhone Safari 7-7.1
// - Safari 6-7
if (typeof BrowserMutationObserver === "function") {
    requestFlush = makeRequestCallFromMutationObserver(flush);

// MessageChannels are desirable because they give direct access to the HTML
// task queue, are implemented in Internet Explorer 10, Safari 5.0-1, and Opera
// 11-12, and in web workers in many engines.
// Although message channels yield to any queued rendering and IO tasks, they
// would be better than imposing the 4ms delay of timers.
// However, they do not work reliably in Internet Explorer or Safari.

// Internet Explorer 10 is the only browser that has setImmediate but does
// not have MutationObservers.
// Although setImmediate yields to the browser's renderer, it would be
// preferrable to falling back to setTimeout since it does not have
// the minimum 4ms penalty.
// Unfortunately there appears to be a bug in Internet Explorer 10 Mobile (and
// Desktop to a lesser extent) that renders both setImmediate and
// MessageChannel useless for the purposes of ASAP.
// https://github.com/kriskowal/q/issues/396

// Timers are implemented universally.
// We fall back to timers in workers in most engines, and in foreground
// contexts in the following browsers.
// However, note that even this simple case requires nuances to operate in a
// broad spectrum of browsers.
//
// - Firefox 3-13
// - Internet Explorer 6-9
// - iPad Safari 4.3
// - Lynx 2.8.7
} else {
    requestFlush = makeRequestCallFromTimer(flush);
}

// `requestFlush` requests that the high priority event queue be flushed as
// soon as possible.
// This is useful to prevent an error thrown in a task from stalling the event
// queue if the exception handled by Node.js’s
// `process.on("uncaughtException")` or by a domain.
rawAsap.requestFlush = requestFlush;

// To request a high priority event, we induce a mutation observer by toggling
// the text of a text node between "1" and "-1".
function makeRequestCallFromMutationObserver(callback) {
    var toggle = 1;
    var observer = new BrowserMutationObserver(callback);
    var node = document.createTextNode("");
    observer.observe(node, {characterData: true});
    return function requestCall() {
        toggle = -toggle;
        node.data = toggle;
    };
}

// The message channel technique was discovered by Malte Ubl and was the
// original foundation for this library.
// http://www.nonblocking.io/2011/06/windownexttick.html

// Safari 6.0.5 (at least) intermittently fails to create message ports on a
// page's first load. Thankfully, this version of Safari supports
// MutationObservers, so we don't need to fall back in that case.

// function makeRequestCallFromMessageChannel(callback) {
//     var channel = new MessageChannel();
//     channel.port1.onmessage = callback;
//     return function requestCall() {
//         channel.port2.postMessage(0);
//     };
// }

// For reasons explained above, we are also unable to use `setImmediate`
// under any circumstances.
// Even if we were, there is another bug in Internet Explorer 10.
// It is not sufficient to assign `setImmediate` to `requestFlush` because
// `setImmediate` must be called *by name* and therefore must be wrapped in a
// closure.
// Never forget.

// function makeRequestCallFromSetImmediate(callback) {
//     return function requestCall() {
//         setImmediate(callback);
//     };
// }

// Safari 6.0 has a problem where timers will get lost while the user is
// scrolling. This problem does not impact ASAP because Safari 6.0 supports
// mutation observers, so that implementation is used instead.
// However, if we ever elect to use timers in Safari, the prevalent work-around
// is to add a scroll event listener that calls for a flush.

// `setTimeout` does not call the passed callback if the delay is less than
// approximately 7 in web workers in Firefox 8 through 18, and sometimes not
// even then.

function makeRequestCallFromTimer(callback) {
    return function requestCall() {
        // We dispatch a timeout with a specified delay of 0 for engines that
        // can reliably accommodate that request. This will usually be snapped
        // to a 4 milisecond delay, but once we're flushing, there's no delay
        // between events.
        var timeoutHandle = setTimeout(handleTimer, 0);
        // However, since this timer gets frequently dropped in Firefox
        // workers, we enlist an interval handle that will try to fire
        // an event 20 times per second until it succeeds.
        var intervalHandle = setInterval(handleTimer, 50);

        function handleTimer() {
            // Whichever timer succeeds will cancel both timers and
            // execute the callback.
            clearTimeout(timeoutHandle);
            clearInterval(intervalHandle);
            callback();
        }
    };
}

// This is for `asap.js` only.
// Its name will be periodically randomized to break any code that depends on
// its existence.
rawAsap.makeRequestCallFromTimer = makeRequestCallFromTimer;

// ASAP was originally a nextTick shim included in Q. This was factored out
// into this ASAP package. It was later adapted to RSVP which made further
// amendments. These decisions, particularly to marginalize MessageChannel and
// to capture the MutationObserver implementation in a closure, were integrated
// back into ASAP proper.
// https://github.com/tildeio/rsvp.js/blob/cddf7232546a9cf858524b75cde6f9edf72620a7/lib/rsvp/asap.js

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],9:[function(require,module,exports){
'use strict';

var uppercasePattern = /[A-Z]/g;
var msPattern = /^ms-/;

function hyphenateStyleName(string) {
    return string
        .replace(uppercasePattern, '-$&')
        .toLowerCase()
        .replace(msPattern, '-ms-');
}

module.exports = hyphenateStyleName;

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = calc;

var _joinPrefixedValue = require('../../utils/joinPrefixedValue');

var _joinPrefixedValue2 = _interopRequireDefault(_joinPrefixedValue);

var _isPrefixedValue = require('../../utils/isPrefixedValue');

var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function calc(property, value) {
  if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && value.indexOf('calc(') > -1) {
    return (0, _joinPrefixedValue2.default)(property, value, function (prefix, value) {
      return value.replace(/calc\(/g, prefix + 'calc(');
    });
  }
}
module.exports = exports['default'];
},{"../../utils/isPrefixedValue":21,"../../utils/joinPrefixedValue":22}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cursor;

var _joinPrefixedValue = require('../../utils/joinPrefixedValue');

var _joinPrefixedValue2 = _interopRequireDefault(_joinPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var values = {
  'zoom-in': true,
  'zoom-out': true,
  grab: true,
  grabbing: true
};

function cursor(property, value) {
  if (property === 'cursor' && values[value]) {
    return (0, _joinPrefixedValue2.default)(property, value);
  }
}
module.exports = exports['default'];
},{"../../utils/joinPrefixedValue":22}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flex;
var values = { flex: true, 'inline-flex': true };

function flex(property, value) {
  if (property === 'display' && values[value]) {
    return {
      display: ['-webkit-box', '-moz-box', '-ms-' + value + 'box', '-webkit-' + value, value]
    };
  }
}
module.exports = exports['default'];
},{}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flexboxIE;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var alternativeValues = {
  'space-around': 'distribute',
  'space-between': 'justify',
  'flex-start': 'start',
  'flex-end': 'end'
};
var alternativeProps = {
  alignContent: 'msFlexLinePack',
  alignSelf: 'msFlexItemAlign',
  alignItems: 'msFlexAlign',
  justifyContent: 'msFlexPack',
  order: 'msFlexOrder',
  flexGrow: 'msFlexPositive',
  flexShrink: 'msFlexNegative',
  flexBasis: 'msPreferredSize'
};

function flexboxIE(property, value) {
  if (alternativeProps[property]) {
    return _defineProperty({}, alternativeProps[property], alternativeValues[value] || value);
  }
}
module.exports = exports['default'];
},{}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flexboxOld;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var alternativeValues = {
  'space-around': 'justify',
  'space-between': 'justify',
  'flex-start': 'start',
  'flex-end': 'end',
  'wrap-reverse': 'multiple',
  wrap: 'multiple'
};

var alternativeProps = {
  alignItems: 'WebkitBoxAlign',
  justifyContent: 'WebkitBoxPack',
  flexWrap: 'WebkitBoxLines'
};

function flexboxOld(property, value) {
  if (property === 'flexDirection') {
    return {
      WebkitBoxOrient: value.indexOf('column') > -1 ? 'vertical' : 'horizontal',
      WebkitBoxDirection: value.indexOf('reverse') > -1 ? 'reverse' : 'normal'
    };
  }
  if (alternativeProps[property]) {
    return _defineProperty({}, alternativeProps[property], alternativeValues[value] || value);
  }
}
module.exports = exports['default'];
},{}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = gradient;

var _joinPrefixedValue = require('../../utils/joinPrefixedValue');

var _joinPrefixedValue2 = _interopRequireDefault(_joinPrefixedValue);

var _isPrefixedValue = require('../../utils/isPrefixedValue');

var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var values = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/;

function gradient(property, value) {
  if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && value.match(values) !== null) {
    return (0, _joinPrefixedValue2.default)(property, value);
  }
}
module.exports = exports['default'];
},{"../../utils/isPrefixedValue":21,"../../utils/joinPrefixedValue":22}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sizing;

var _joinPrefixedValue = require('../../utils/joinPrefixedValue');

var _joinPrefixedValue2 = _interopRequireDefault(_joinPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var properties = {
  maxHeight: true,
  maxWidth: true,
  width: true,
  height: true,
  columnWidth: true,
  minWidth: true,
  minHeight: true
};
var values = {
  'min-content': true,
  'max-content': true,
  'fill-available': true,
  'fit-content': true,
  'contain-floats': true
};

function sizing(property, value) {
  if (properties[property] && values[value]) {
    return (0, _joinPrefixedValue2.default)(property, value);
  }
}
module.exports = exports['default'];
},{"../../utils/joinPrefixedValue":22}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = transition;

var _hyphenateStyleName = require('hyphenate-style-name');

var _hyphenateStyleName2 = _interopRequireDefault(_hyphenateStyleName);

var _capitalizeString = require('../../utils/capitalizeString');

var _capitalizeString2 = _interopRequireDefault(_capitalizeString);

var _isPrefixedValue = require('../../utils/isPrefixedValue');

var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);

var _prefixProps = require('../prefixProps');

var _prefixProps2 = _interopRequireDefault(_prefixProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var properties = {
  transition: true,
  transitionProperty: true,
  WebkitTransition: true,
  WebkitTransitionProperty: true
};

function transition(property, value) {
  // also check for already prefixed transitions
  if (typeof value === 'string' && properties[property]) {
    var _ref2;

    var outputValue = prefixValue(value);
    var webkitOutput = outputValue.split(/,(?![^()]*(?:\([^()]*\))?\))/g).filter(function (value) {
      return value.match(/-moz-|-ms-/) === null;
    }).join(',');

    // if the property is already prefixed
    if (property.indexOf('Webkit') > -1) {
      return _defineProperty({}, property, webkitOutput);
    }

    return _ref2 = {}, _defineProperty(_ref2, 'Webkit' + (0, _capitalizeString2.default)(property), webkitOutput), _defineProperty(_ref2, property, outputValue), _ref2;
  }
}

function prefixValue(value) {
  if ((0, _isPrefixedValue2.default)(value)) {
    return value;
  }

  // only split multi values, not cubic beziers
  var multipleValues = value.split(/,(?![^()]*(?:\([^()]*\))?\))/g);

  // iterate each single value and check for transitioned properties
  // that need to be prefixed as well
  multipleValues.forEach(function (val, index) {
    multipleValues[index] = Object.keys(_prefixProps2.default).reduce(function (out, prefix) {
      var dashCasePrefix = '-' + prefix.toLowerCase() + '-';

      Object.keys(_prefixProps2.default[prefix]).forEach(function (prop) {
        var dashCaseProperty = (0, _hyphenateStyleName2.default)(prop);

        if (val.indexOf(dashCaseProperty) > -1 && dashCaseProperty !== 'order') {
          // join all prefixes and create a new value
          out = val.replace(dashCaseProperty, dashCasePrefix + dashCaseProperty) + ',' + out;
        }
      });
      return out;
    }, val);
  });

  return multipleValues.join(',');
}
module.exports = exports['default'];
},{"../../utils/capitalizeString":20,"../../utils/isPrefixedValue":21,"../prefixProps":19,"hyphenate-style-name":9}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prefixAll;

var _prefixProps = require('./prefixProps');

var _prefixProps2 = _interopRequireDefault(_prefixProps);

var _capitalizeString = require('../utils/capitalizeString');

var _capitalizeString2 = _interopRequireDefault(_capitalizeString);

var _calc = require('./plugins/calc');

var _calc2 = _interopRequireDefault(_calc);

var _cursor = require('./plugins/cursor');

var _cursor2 = _interopRequireDefault(_cursor);

var _flex = require('./plugins/flex');

var _flex2 = _interopRequireDefault(_flex);

var _sizing = require('./plugins/sizing');

var _sizing2 = _interopRequireDefault(_sizing);

var _gradient = require('./plugins/gradient');

var _gradient2 = _interopRequireDefault(_gradient);

var _transition = require('./plugins/transition');

var _transition2 = _interopRequireDefault(_transition);

var _flexboxIE = require('./plugins/flexboxIE');

var _flexboxIE2 = _interopRequireDefault(_flexboxIE);

var _flexboxOld = require('./plugins/flexboxOld');

var _flexboxOld2 = _interopRequireDefault(_flexboxOld);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// special flexbox specifications


var plugins = [_calc2.default, _cursor2.default, _sizing2.default, _gradient2.default, _transition2.default, _flexboxIE2.default, _flexboxOld2.default, _flex2.default];

/**
 * Returns a prefixed version of the style object using all vendor prefixes
 * @param {Object} styles - Style object that gets prefixed properties added
 * @returns {Object} - Style object with prefixed properties and values
 */
function prefixAll(styles) {
  Object.keys(styles).forEach(function (property) {
    var value = styles[property];
    if (value instanceof Object && !Array.isArray(value)) {
      // recurse through nested style objects
      styles[property] = prefixAll(value);
    } else {
      Object.keys(_prefixProps2.default).forEach(function (prefix) {
        var properties = _prefixProps2.default[prefix];
        // add prefixes if needed
        if (properties[property]) {
          styles[prefix + (0, _capitalizeString2.default)(property)] = value;
        }
      });
    }
  });

  Object.keys(styles).forEach(function (property) {
    [].concat(styles[property]).forEach(function (value, index) {
      // resolve every special plugins
      plugins.forEach(function (plugin) {
        return assignStyles(styles, plugin(property, value));
      });
    });
  });

  return styles;
}

function assignStyles(base) {
  var extend = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  Object.keys(extend).forEach(function (property) {
    var baseValue = base[property];
    if (Array.isArray(baseValue)) {
      [].concat(extend[property]).forEach(function (value) {
        var valueIndex = baseValue.indexOf(value);
        if (valueIndex > -1) {
          base[property].splice(valueIndex, 1);
        }
        base[property].push(value);
      });
    } else {
      base[property] = extend[property];
    }
  });
}
module.exports = exports['default'];
},{"../utils/capitalizeString":20,"./plugins/calc":10,"./plugins/cursor":11,"./plugins/flex":12,"./plugins/flexboxIE":13,"./plugins/flexboxOld":14,"./plugins/gradient":15,"./plugins/sizing":16,"./plugins/transition":17,"./prefixProps":19}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = { "Webkit": { "transform": true, "transformOrigin": true, "transformOriginX": true, "transformOriginY": true, "backfaceVisibility": true, "perspective": true, "perspectiveOrigin": true, "transformStyle": true, "transformOriginZ": true, "animation": true, "animationDelay": true, "animationDirection": true, "animationFillMode": true, "animationDuration": true, "animationIterationCount": true, "animationName": true, "animationPlayState": true, "animationTimingFunction": true, "appearance": true, "userSelect": true, "fontKerning": true, "textEmphasisPosition": true, "textEmphasis": true, "textEmphasisStyle": true, "textEmphasisColor": true, "boxDecorationBreak": true, "clipPath": true, "maskImage": true, "maskMode": true, "maskRepeat": true, "maskPosition": true, "maskClip": true, "maskOrigin": true, "maskSize": true, "maskComposite": true, "mask": true, "maskBorderSource": true, "maskBorderMode": true, "maskBorderSlice": true, "maskBorderWidth": true, "maskBorderOutset": true, "maskBorderRepeat": true, "maskBorder": true, "maskType": true, "textDecorationStyle": true, "textDecorationSkip": true, "textDecorationLine": true, "textDecorationColor": true, "filter": true, "fontFeatureSettings": true, "breakAfter": true, "breakBefore": true, "breakInside": true, "columnCount": true, "columnFill": true, "columnGap": true, "columnRule": true, "columnRuleColor": true, "columnRuleStyle": true, "columnRuleWidth": true, "columns": true, "columnSpan": true, "columnWidth": true, "flex": true, "flexBasis": true, "flexDirection": true, "flexGrow": true, "flexFlow": true, "flexShrink": true, "flexWrap": true, "alignContent": true, "alignItems": true, "alignSelf": true, "justifyContent": true, "order": true, "transition": true, "transitionDelay": true, "transitionDuration": true, "transitionProperty": true, "transitionTimingFunction": true, "backdropFilter": true, "scrollSnapType": true, "scrollSnapPointsX": true, "scrollSnapPointsY": true, "scrollSnapDestination": true, "scrollSnapCoordinate": true, "shapeImageThreshold": true, "shapeImageMargin": true, "shapeImageOutside": true, "hyphens": true, "flowInto": true, "flowFrom": true, "regionFragment": true, "textSizeAdjust": true, "borderImage": true, "borderImageOutset": true, "borderImageRepeat": true, "borderImageSlice": true, "borderImageSource": true, "borderImageWidth": true, "tabSize": true, "objectFit": true, "objectPosition": true }, "Moz": { "appearance": true, "userSelect": true, "boxSizing": true, "textAlignLast": true, "textDecorationStyle": true, "textDecorationSkip": true, "textDecorationLine": true, "textDecorationColor": true, "tabSize": true, "hyphens": true, "fontFeatureSettings": true, "breakAfter": true, "breakBefore": true, "breakInside": true, "columnCount": true, "columnFill": true, "columnGap": true, "columnRule": true, "columnRuleColor": true, "columnRuleStyle": true, "columnRuleWidth": true, "columns": true, "columnSpan": true, "columnWidth": true }, "ms": { "flex": true, "flexBasis": false, "flexDirection": true, "flexGrow": false, "flexFlow": true, "flexShrink": false, "flexWrap": true, "alignContent": false, "alignItems": false, "alignSelf": false, "justifyContent": false, "order": false, "transform": true, "transformOrigin": true, "transformOriginX": true, "transformOriginY": true, "userSelect": true, "wrapFlow": true, "wrapThrough": true, "wrapMargin": true, "scrollSnapType": true, "scrollSnapPointsX": true, "scrollSnapPointsY": true, "scrollSnapDestination": true, "scrollSnapCoordinate": true, "touchAction": true, "hyphens": true, "flowInto": true, "flowFrom": true, "breakBefore": true, "breakAfter": true, "breakInside": true, "regionFragment": true, "gridTemplateColumns": true, "gridTemplateRows": true, "gridTemplateAreas": true, "gridTemplate": true, "gridAutoColumns": true, "gridAutoRows": true, "gridAutoFlow": true, "grid": true, "gridRowStart": true, "gridColumnStart": true, "gridRowEnd": true, "gridRow": true, "gridColumn": true, "gridColumnEnd": true, "gridColumnGap": true, "gridRowGap": true, "gridArea": true, "gridGap": true, "textSizeAdjust": true } };
module.exports = exports["default"];
},{}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// helper to capitalize strings

exports.default = function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

module.exports = exports["default"];
},{}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (value) {
  if (Array.isArray(value)) value = value.join(',');

  return value.match(/-webkit-|-moz-|-ms-/) !== null;
};

module.exports = exports['default'];
},{}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// returns a style object with a single concated prefixed value string

exports.default = function (property, value) {
  var replacer = arguments.length <= 2 || arguments[2] === undefined ? function (prefix, value) {
    return prefix + value;
  } : arguments[2];
  return _defineProperty({}, property, ['-webkit-', '-moz-', ''].map(function (prefix) {
    return replacer(prefix, value);
  }));
};

module.exports = exports['default'];
},{}],23:[function(require,module,exports){
module.exports = require('./lib/static/prefixAll')

},{"./lib/static/prefixAll":18}],24:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _aphroditeNoImportant = require('aphrodite/no-important');

var _theme = require('./theme');

var _theme2 = _interopRequireDefault(_theme);

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function Arrow(_ref) {
	var direction = _ref.direction;
	var icon = _ref.icon;
	var onClick = _ref.onClick;

	var props = _objectWithoutProperties(_ref, ['direction', 'icon', 'onClick']);

	return _react2['default'].createElement(
		'button',
		_extends({
			type: 'button',
			className: (0, _aphroditeNoImportant.css)(classes.arrow, classes[direction]),
			onClick: onClick,
			onTouchEnd: onClick
		}, props),
		_react2['default'].createElement(_Icon2['default'], { type: icon })
	);
};

Arrow.propTypes = {
	direction: _react.PropTypes.oneOf(['left', 'right']),
	icon: _react.PropTypes.string,
	onClick: _react.PropTypes.func.isRequired
};

var classes = _aphroditeNoImportant.StyleSheet.create({
	arrow: {
		background: 'none',
		border: 'none',
		borderRadius: 4,
		cursor: 'pointer',
		height: _theme2['default'].arrow.height,
		marginTop: _theme2['default'].arrow.height / -2,
		outline: 'none',
		padding: 10,
		position: 'absolute',
		top: '50%',
		width: 40,

		// disable user select
		WebkitTouchCallout: 'none',
		userSelect: 'none',

		'@media (min-width: 500px)': {
			width: 70
		}
	},
	right: {
		right: _theme2['default'].container.gutter.horizontal
	},
	left: {
		left: _theme2['default'].container.gutter.horizontal
	}
});

module.exports = Arrow;

},{"./Icon":27,"./theme":34,"aphrodite/no-important":6,"react":undefined}],25:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _aphroditeNoImportant = require('aphrodite/no-important');

var _theme = require('./theme');

var _theme2 = _interopRequireDefault(_theme);

function Footer(_ref) {
	var caption = _ref.caption;
	var countCurrent = _ref.countCurrent;
	var countSeparator = _ref.countSeparator;
	var countTotal = _ref.countTotal;
	var showCount = _ref.showCount;

	var props = _objectWithoutProperties(_ref, ['caption', 'countCurrent', 'countSeparator', 'countTotal', 'showCount']);

	if (!caption && !showCount) return null;

	var imageCount = showCount ? _react2['default'].createElement(
		'div',
		{ className: (0, _aphroditeNoImportant.css)(classes.footerCount) },
		countCurrent,
		countSeparator,
		countTotal
	) : _react2['default'].createElement('span', null);

	return _react2['default'].createElement(
		'div',
		_extends({ className: (0, _aphroditeNoImportant.css)(classes.footer) }, props),
		caption ? _react2['default'].createElement(
			'figcaption',
			{ className: (0, _aphroditeNoImportant.css)(classes.footerCaption) },
			caption
		) : _react2['default'].createElement('span', null),
		imageCount
	);
};

Footer.propTypes = {
	caption: _react.PropTypes.string,
	countCurrent: _react.PropTypes.number,
	countSeparator: _react.PropTypes.string,
	countTotal: _react.PropTypes.number,
	showCount: _react.PropTypes.bool
};

var classes = _aphroditeNoImportant.StyleSheet.create({
	footer: {
		boxSizing: 'border-box',
		color: 'white',
		cursor: 'auto',
		display: 'flex',
		height: _theme2['default'].footer.height,
		justifyContent: 'space-between',
		left: 0,
		lineHeight: 1.3,
		paddingBottom: _theme2['default'].footer.gutter.vertical,
		paddingLeft: _theme2['default'].footer.gutter.horizontal,
		paddingRight: _theme2['default'].footer.gutter.horizontal,
		paddingTop: _theme2['default'].footer.gutter.vertical
	},
	footerCount: {
		color: _theme2['default'].footer.count.color,
		fontSize: _theme2['default'].footer.count.fontSize,
		paddingLeft: '1em' },
	// add a small gutter for the caption
	footerCaption: {
		flex: '1 1 0'
	}
});

module.exports = Footer;

},{"./theme":34,"aphrodite/no-important":6,"react":undefined}],26:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _aphroditeNoImportant = require('aphrodite/no-important');

var _theme = require('./theme');

var _theme2 = _interopRequireDefault(_theme);

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function Header(_ref) {
	var customControls = _ref.customControls;
	var onClose = _ref.onClose;
	var showCloseButton = _ref.showCloseButton;

	var props = _objectWithoutProperties(_ref, ['customControls', 'onClose', 'showCloseButton']);

	return _react2['default'].createElement(
		'div',
		_extends({ className: (0, _aphroditeNoImportant.css)(classes.header) }, props),
		customControls ? customControls : _react2['default'].createElement('span', null),
		!!showCloseButton && _react2['default'].createElement(
			'button',
			{
				title: 'Close (Esc)',
				className: (0, _aphroditeNoImportant.css)(classes.close),
				onClick: onClose
			},
			_react2['default'].createElement(_Icon2['default'], { type: 'close' })
		)
	);
};

Header.propTypes = {
	customControls: _react.PropTypes.array,
	onClose: _react.PropTypes.func.isRequired,
	showCloseButton: _react.PropTypes.bool
};

var classes = _aphroditeNoImportant.StyleSheet.create({
	header: {
		display: 'flex',
		justifyContent: 'space-between',
		height: _theme2['default'].header.height
	},
	close: {
		background: 'none',
		border: 'none',
		cursor: 'pointer',
		outline: 'none',
		position: 'relative',
		top: 0,
		verticalAlign: 'bottom',

		// increase hit area
		height: _theme2['default'].close.height + 20,
		marginRight: -10,
		padding: 10,
		width: _theme2['default'].close.width + 20
	}
});

module.exports = Header;

},{"./Icon":27,"./theme":34,"aphrodite/no-important":6,"react":undefined}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _icons = require('./icons');

var _icons2 = _interopRequireDefault(_icons);

var Icon = function Icon(_ref) {
	var type = _ref.type;

	var props = _objectWithoutProperties(_ref, ['type']);

	return _react2['default'].createElement('span', _extends({
		dangerouslySetInnerHTML: { __html: _icons2['default'][type] }
	}, props));
};

Icon.propTypes = {
	type: _react.PropTypes.oneOf(Object.keys(_icons2['default']))
};

exports['default'] = Icon;
module.exports = exports['default'];

},{"./icons":32,"react":undefined}],28:[function(require,module,exports){
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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _reactDom = require('react-dom');

var Portal = (function (_Component) {
	_inherits(Portal, _Component);

	function Portal() {
		_classCallCheck(this, Portal);

		_get(Object.getPrototypeOf(Portal.prototype), 'constructor', this).call(this);
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
			var styles = '\n\t\t\t\t.fade-enter { opacity: 0.01; }\n\t\t\t\t.fade-enter.fade-enter-active { opacity: 1; transition: opacity 200ms; }\n\t\t\t\t.fade-leave { opacity: 1; }\n\t\t\t\t.fade-leave.fade-leave-active { opacity: 0.01; transition: opacity 200ms; }\n\t\t';
			(0, _reactDom.render)(_react2['default'].createElement(
				'div',
				null,
				_react2['default'].createElement(
					'style',
					null,
					styles
				),
				_react2['default'].createElement(_reactAddonsCssTransitionGroup2['default'], _extends({
					transitionName: 'fade',
					transitionEnterTimeout: 200,
					transitionLeaveTimeout: 200
				}, this.props))
			), this.portalElement);
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

},{"react":undefined,"react-addons-css-transition-group":undefined,"react-dom":undefined}],29:[function(require,module,exports){
'use strict';

module.exports = '<svg fill="white" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 512 512" xml:space="preserve">' + '<path d="M213.7,256L213.7,256L213.7,256L380.9,81.9c4.2-4.3,4.1-11.4-0.2-15.8l-29.9-30.6c-4.3-4.4-11.3-4.5-15.5-0.2L131.1,247.9 c-2.2,2.2-3.2,5.2-3,8.1c-0.1,3,0.9,5.9,3,8.1l204.2,212.7c4.2,4.3,11.2,4.2,15.5-0.2l29.9-30.6c4.3-4.4,4.4-11.5,0.2-15.8 L213.7,256z"/>' + '</svg>';

},{}],30:[function(require,module,exports){
'use strict';

module.exports = '<svg fill="white" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 512 512" xml:space="preserve">' + '<path d="M298.3,256L298.3,256L298.3,256L131.1,81.9c-4.2-4.3-4.1-11.4,0.2-15.8l29.9-30.6c4.3-4.4,11.3-4.5,15.5-0.2l204.2,212.7 c2.2,2.2,3.2,5.2,3,8.1c0.1,3-0.9,5.9-3,8.1L176.7,476.8c-4.2,4.3-11.2,4.2-15.5-0.2L131.3,446c-4.3-4.4-4.4-11.5-0.2-15.8 L298.3,256z"/>' + '</svg>';

},{}],31:[function(require,module,exports){
'use strict';

module.exports = '<svg fill="white" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">' + '<path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4 L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1 c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1 c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z"/>' + '</svg>';

},{}],32:[function(require,module,exports){
'use strict';

module.exports = {
	arrowLeft: require('./arrowLeft'),
	arrowRight: require('./arrowRight'),
	close: require('./close')
};

},{"./arrowLeft":29,"./arrowRight":30,"./close":31}],33:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _theme = require('../theme');

var _theme2 = _interopRequireDefault(_theme);

var styles = {
	container: {
		alignItems: 'center',
		backgroundColor: _theme2['default'].container.background,
		boxSizing: 'border-box',
		display: 'flex',
		height: '100%',
		justifyContent: 'center',
		left: 0,
		paddingBottom: _theme2['default'].container.gutter.vertical,
		paddingLeft: _theme2['default'].container.gutter.horizontal,
		paddingRight: _theme2['default'].container.gutter.horizontal,
		paddingTop: _theme2['default'].container.gutter.vertical,
		position: 'fixed',
		top: 0,
		width: '100%',
		zIndex: _theme2['default'].container.zIndex
	},

	content: {
		position: 'relative'
	},

	// IMAGES
	image: {
		display: 'block', // removes browser default gutter beneath
		height: 'auto',
		margin: '0 auto', // maintain center on very short screens OR very narrow image
		maxWidth: '100%',

		// disable user select
		WebkitTouchCallout: 'none',
		userSelect: 'none'

	},
	figure: {
		// minHeight: 200,
		// minWidth: 300,
		margin: 0 }
};

// remove browser default
exports['default'] = styles;
module.exports = exports['default'];

},{"../theme":34}],34:[function(require,module,exports){
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
		vertical: 0
	},
	zIndex: 2001
};

// header
theme.header = {
	height: 40
};
theme.close = {
	height: 20,
	width: 20
};

// footer
theme.footer = {
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

// arrow
theme.arrow = {
	height: 120
};

module.exports = theme;

},{}],35:[function(require,module,exports){
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

},{}],36:[function(require,module,exports){
// Don't try and apply overflow/padding if the scroll is already blocked
'use strict';

var bodyBlocked = false;

var allowScroll = function allowScroll() {
	if (typeof window === 'undefined' || !bodyBlocked) return;

	//  FIXME iOS ignores overflow on body

	try {
		var target = document.body;

		target.style.paddingRight = '';
		target.style.overflowY = '';

		bodyBlocked = false;
	} catch (err) {
		console.error('Failed to find body element. Err:', err);
	}
};

var blockScroll = function blockScroll() {
	if (typeof window === 'undefined' || bodyBlocked) return;

	//  FIXME iOS ignores overflow on body

	try {
		var scrollBarWidth = window.innerWidth - document.body.clientWidth;

		var target = document.body;

		target.style.paddingRight = scrollBarWidth + 'px';
		target.style.overflowY = 'hidden';

		bodyBlocked = true;
	} catch (err) {
		console.error('Failed to find body element. Err:', err);
	}
};

module.exports = {
	allowScroll: allowScroll,
	blockScroll: blockScroll
};

},{}],37:[function(require,module,exports){
// Return true if window + document

'use strict';

module.exports = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

},{}],38:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _bindFunctions = require('./bindFunctions');

var _bindFunctions2 = _interopRequireDefault(_bindFunctions);

var _bodyScroll = require('./bodyScroll');

var _bodyScroll2 = _interopRequireDefault(_bodyScroll);

var _canUseDom = require('./canUseDom');

var _canUseDom2 = _interopRequireDefault(_canUseDom);

module.exports = {
	bindFunctions: _bindFunctions2['default'],
	bodyScroll: _bodyScroll2['default'],
	canUseDom: _canUseDom2['default']
};

},{"./bindFunctions":35,"./bodyScroll":36,"./canUseDom":37}],"react-images":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _aphroditeNoImportant = require('aphrodite/no-important');

// import Swipeable from 'react-swipeable';

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _theme = require('./theme');

var _theme2 = _interopRequireDefault(_theme);

var _Arrow = require('./Arrow');

var _Arrow2 = _interopRequireDefault(_Arrow);

var _Footer = require('./Footer');

var _Footer2 = _interopRequireDefault(_Footer);

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

var _Portal = require('./Portal');

var _Portal2 = _interopRequireDefault(_Portal);

var _stylesDefault = require('./styles/default');

var _stylesDefault2 = _interopRequireDefault(_stylesDefault);

var classes = _aphroditeNoImportant.StyleSheet.create(_stylesDefault2['default']);

var Lightbox = (function (_Component) {
	_inherits(Lightbox, _Component);

	_createClass(Lightbox, null, [{
		key: 'theme',
		value: function theme(themeStyles) {
			var extStyles = _extends({}, _stylesDefault2['default']);
			for (var key in extStyles) {
				if (key in themeStyles) {
					extStyles[key] = _extends({}, _stylesDefault2['default'][key], themeStyles[key]);
				}
			}
			return extStyles;
		}
	}]);

	function Lightbox() {
		_classCallCheck(this, Lightbox);

		_get(Object.getPrototypeOf(Lightbox.prototype), 'constructor', this).call(this);

		_utils2['default'].bindFunctions.call(this, ['gotoNext', 'gotoPrev', 'handleKeyboardInput']);
	}

	_createClass(Lightbox, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (!_utils2['default'].canUseDom) return;

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

			// add event listeners
			if (nextProps.enableKeyboardInput) {
				window.addEventListener('keydown', this.handleKeyboardInput);
			} else {
				window.removeEventListener('keydown', this.handleKeyboardInput);
			}

			// handle body scroll
			if (nextProps.isOpen) {
				_utils2['default'].bodyScroll.blockScroll();
			} else {
				_utils2['default'].bodyScroll.allowScroll();
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
		key: 'handleKeyboardInput',
		value: function handleKeyboardInput(event) {
			if (event.keyCode === 37) {
				this.gotoPrev(event);
				return true;
			} else if (event.keyCode === 39) {
				this.gotoNext(event);
				return true;
			} else if (event.keyCode === 27) {
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

			return _react2['default'].createElement(_Arrow2['default'], {
				direction: 'left',
				icon: 'arrowLeft',
				onClick: this.gotoPrev,
				title: 'Previous (Left arrow key)',
				type: 'button'
			});
		}
	}, {
		key: 'renderArrowNext',
		value: function renderArrowNext() {
			if (this.props.currentImage === this.props.images.length - 1) return null;

			return _react2['default'].createElement(_Arrow2['default'], {
				direction: 'right',
				icon: 'arrowRight',
				onClick: this.gotoNext,
				title: 'Previous (Right arrow key)',
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

			if (!isOpen) return null;

			return _react2['default'].createElement(
				'div',
				{
					key: 'dialog',
					className: (0, _aphroditeNoImportant.css)(classes.container),
					onClick: !!backdropClosesModal && onClose,
					onTouchEnd: !!backdropClosesModal && onClose
				},
				_react2['default'].createElement(
					'div',
					{ className: (0, _aphroditeNoImportant.css)(classes.content), style: { maxWidth: this.props.width } },
					_react2['default'].createElement(_Header2['default'], {
						customControls: customControls,
						onClose: onClose,
						showCloseButton: showCloseButton
					}),
					this.renderImages()
				),
				this.renderArrowPrev(),
				this.renderArrowNext()
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

			if (!images || !images.length) return null;

			var image = images[currentImage];

			var srcset = undefined;
			var sizes = undefined;
			var width = undefined;

			if (image.srcset) {
				srcset = image.srcset.join();
				sizes = '100vw';
			}

			return _react2['default'].createElement(
				'figure',
				{ className: (0, _aphroditeNoImportant.css)(classes.figure), style: { width: width } },
				_react2['default'].createElement('img', {
					className: (0, _aphroditeNoImportant.css)(classes.image),
					onClick: !!onClickImage && onClickImage,
					sizes: sizes,
					src: image.src,
					srcSet: srcset,
					style: {
						cursor: this.props.onClickImage ? 'pointer' : 'auto',
						maxHeight: 'calc(100vh - ' + (_theme2['default'].header.height + _theme2['default'].footer.height) + 'px)'
					}
				}),
				_react2['default'].createElement(_Footer2['default'], {
					caption: images[currentImage].caption,
					countCurrent: currentImage + 1,
					countSeparator: imageCountSeparator,
					countTotal: images.length,
					showCount: showImageCount
				})
			);
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2['default'].createElement(
				_Portal2['default'],
				null,
				this.renderDialog()
			);
		}
	}]);

	return Lightbox;
})(_react.Component);

Lightbox.displayName = 'Lightbox';

Lightbox.propTypes = {
	backdropClosesModal: _react.PropTypes.bool,
	currentImage: _react.PropTypes.number,
	customControls: _react.PropTypes.arrayOf(_react.PropTypes.node),
	enableKeyboardInput: _react.PropTypes.bool,
	imageCountSeparator: _react.PropTypes.string,
	images: _react.PropTypes.arrayOf(_react.PropTypes.shape({
		src: _react.PropTypes.string.isRequired,
		srcset: _react.PropTypes.array,
		caption: _react.PropTypes.string
	})).isRequired,
	isOpen: _react.PropTypes.bool,
	onClickImage: _react.PropTypes.func,
	onClickNext: _react.PropTypes.func,
	onClickPrev: _react.PropTypes.func,
	onClose: _react.PropTypes.func.isRequired,
	preloadNextImage: _react.PropTypes.bool,
	sheet: _react.PropTypes.object,
	showCloseButton: _react.PropTypes.bool,
	showImageCount: _react.PropTypes.bool,
	width: _react.PropTypes.number
};

Lightbox.defaultProps = {
	currentImage: 0,
	enableKeyboardInput: true,
	imageCountSeparator: ' of ',
	onClickShowNextImage: true,
	preloadNextImage: true,
	showCloseButton: true,
	showImageCount: true,
	width: 1024
};

exports['default'] = Lightbox;
module.exports = exports['default'];
/*
Re-implement when react warning "unknown props"
https://fb.me/react-unknown-prop is resolved
<Swipeable onSwipedLeft={this.gotoNext} onSwipedRight={this.gotoPrev} />
*/

},{"./Arrow":24,"./Footer":25,"./Header":26,"./Portal":28,"./styles/default":33,"./theme":34,"./utils":38,"aphrodite/no-important":6,"react":undefined}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYXBocm9kaXRlL2xpYi9nZW5lcmF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9hcGhyb2RpdGUvbGliL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2FwaHJvZGl0ZS9saWIvaW5qZWN0LmpzIiwibm9kZV9tb2R1bGVzL2FwaHJvZGl0ZS9saWIvbm8taW1wb3J0YW50LmpzIiwibm9kZV9tb2R1bGVzL2FwaHJvZGl0ZS9saWIvdXRpbC5qcyIsIm5vZGVfbW9kdWxlcy9hcGhyb2RpdGUvbm8taW1wb3J0YW50LmpzIiwibm9kZV9tb2R1bGVzL2FzYXAvYnJvd3Nlci1hc2FwLmpzIiwibm9kZV9tb2R1bGVzL2FzYXAvYnJvd3Nlci1yYXcuanMiLCJub2RlX21vZHVsZXMvaHlwaGVuYXRlLXN0eWxlLW5hbWUvaW5kZXguanMiLCJub2RlX21vZHVsZXMvaW5saW5lLXN0eWxlLXByZWZpeGVyL2xpYi9zdGF0aWMvcGx1Z2lucy9jYWxjLmpzIiwibm9kZV9tb2R1bGVzL2lubGluZS1zdHlsZS1wcmVmaXhlci9saWIvc3RhdGljL3BsdWdpbnMvY3Vyc29yLmpzIiwibm9kZV9tb2R1bGVzL2lubGluZS1zdHlsZS1wcmVmaXhlci9saWIvc3RhdGljL3BsdWdpbnMvZmxleC5qcyIsIm5vZGVfbW9kdWxlcy9pbmxpbmUtc3R5bGUtcHJlZml4ZXIvbGliL3N0YXRpYy9wbHVnaW5zL2ZsZXhib3hJRS5qcyIsIm5vZGVfbW9kdWxlcy9pbmxpbmUtc3R5bGUtcHJlZml4ZXIvbGliL3N0YXRpYy9wbHVnaW5zL2ZsZXhib3hPbGQuanMiLCJub2RlX21vZHVsZXMvaW5saW5lLXN0eWxlLXByZWZpeGVyL2xpYi9zdGF0aWMvcGx1Z2lucy9ncmFkaWVudC5qcyIsIm5vZGVfbW9kdWxlcy9pbmxpbmUtc3R5bGUtcHJlZml4ZXIvbGliL3N0YXRpYy9wbHVnaW5zL3NpemluZy5qcyIsIm5vZGVfbW9kdWxlcy9pbmxpbmUtc3R5bGUtcHJlZml4ZXIvbGliL3N0YXRpYy9wbHVnaW5zL3RyYW5zaXRpb24uanMiLCJub2RlX21vZHVsZXMvaW5saW5lLXN0eWxlLXByZWZpeGVyL2xpYi9zdGF0aWMvcHJlZml4QWxsLmpzIiwibm9kZV9tb2R1bGVzL2lubGluZS1zdHlsZS1wcmVmaXhlci9saWIvc3RhdGljL3ByZWZpeFByb3BzLmpzIiwibm9kZV9tb2R1bGVzL2lubGluZS1zdHlsZS1wcmVmaXhlci9saWIvdXRpbHMvY2FwaXRhbGl6ZVN0cmluZy5qcyIsIm5vZGVfbW9kdWxlcy9pbmxpbmUtc3R5bGUtcHJlZml4ZXIvbGliL3V0aWxzL2lzUHJlZml4ZWRWYWx1ZS5qcyIsIm5vZGVfbW9kdWxlcy9pbmxpbmUtc3R5bGUtcHJlZml4ZXIvbGliL3V0aWxzL2pvaW5QcmVmaXhlZFZhbHVlLmpzIiwibm9kZV9tb2R1bGVzL2lubGluZS1zdHlsZS1wcmVmaXhlci9zdGF0aWMuanMiLCIvVXNlcnMvZ3BvdGRldmluL3dlYi90aGlyZHBhcnR5L3JlYWN0LWltYWdlcy9zcmMvQXJyb3cuanMiLCIvVXNlcnMvZ3BvdGRldmluL3dlYi90aGlyZHBhcnR5L3JlYWN0LWltYWdlcy9zcmMvRm9vdGVyLmpzIiwiL1VzZXJzL2dwb3RkZXZpbi93ZWIvdGhpcmRwYXJ0eS9yZWFjdC1pbWFnZXMvc3JjL0hlYWRlci5qcyIsIi9Vc2Vycy9ncG90ZGV2aW4vd2ViL3RoaXJkcGFydHkvcmVhY3QtaW1hZ2VzL3NyYy9JY29uLmpzIiwiL1VzZXJzL2dwb3RkZXZpbi93ZWIvdGhpcmRwYXJ0eS9yZWFjdC1pbWFnZXMvc3JjL1BvcnRhbC5qcyIsIi9Vc2Vycy9ncG90ZGV2aW4vd2ViL3RoaXJkcGFydHkvcmVhY3QtaW1hZ2VzL3NyYy9pY29ucy9hcnJvd0xlZnQuanMiLCIvVXNlcnMvZ3BvdGRldmluL3dlYi90aGlyZHBhcnR5L3JlYWN0LWltYWdlcy9zcmMvaWNvbnMvYXJyb3dSaWdodC5qcyIsIi9Vc2Vycy9ncG90ZGV2aW4vd2ViL3RoaXJkcGFydHkvcmVhY3QtaW1hZ2VzL3NyYy9pY29ucy9jbG9zZS5qcyIsIi9Vc2Vycy9ncG90ZGV2aW4vd2ViL3RoaXJkcGFydHkvcmVhY3QtaW1hZ2VzL3NyYy9pY29ucy9pbmRleC5qcyIsIi9Vc2Vycy9ncG90ZGV2aW4vd2ViL3RoaXJkcGFydHkvcmVhY3QtaW1hZ2VzL3NyYy9zdHlsZXMvZGVmYXVsdC5qcyIsIi9Vc2Vycy9ncG90ZGV2aW4vd2ViL3RoaXJkcGFydHkvcmVhY3QtaW1hZ2VzL3NyYy90aGVtZS5qcyIsIi9Vc2Vycy9ncG90ZGV2aW4vd2ViL3RoaXJkcGFydHkvcmVhY3QtaW1hZ2VzL3NyYy91dGlscy9iaW5kRnVuY3Rpb25zLmpzIiwiL1VzZXJzL2dwb3RkZXZpbi93ZWIvdGhpcmRwYXJ0eS9yZWFjdC1pbWFnZXMvc3JjL3V0aWxzL2JvZHlTY3JvbGwuanMiLCIvVXNlcnMvZ3BvdGRldmluL3dlYi90aGlyZHBhcnR5L3JlYWN0LWltYWdlcy9zcmMvdXRpbHMvY2FuVXNlRG9tLmpzIiwiL1VzZXJzL2dwb3RkZXZpbi93ZWIvdGhpcmRwYXJ0eS9yZWFjdC1pbWFnZXMvc3JjL3V0aWxzL2luZGV4LmpzIiwiL1VzZXJzL2dwb3RkZXZpbi93ZWIvdGhpcmRwYXJ0eS9yZWFjdC1pbWFnZXMvc3JjL0xpZ2h0Ym94LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdE1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeE9BO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ2xFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDNU5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBOzs7Ozs7Ozs7O3FCQ0RpQyxPQUFPOzs7O29DQUNSLHdCQUF3Qjs7cUJBRXRDLFNBQVM7Ozs7b0JBQ1YsUUFBUTs7OztBQUV6QixTQUFTLEtBQUssQ0FBRSxJQUtmLEVBQUU7S0FKRixTQUFTLEdBRE0sSUFLZixDQUpBLFNBQVM7S0FDVCxJQUFJLEdBRlcsSUFLZixDQUhBLElBQUk7S0FDSixPQUFPLEdBSFEsSUFLZixDQUZBLE9BQU87O0tBQ0osS0FBSyw0QkFKTyxJQUtmOztBQUNBLFFBQ0M7OztBQUNDLE9BQUksRUFBQyxRQUFRO0FBQ2IsWUFBUyxFQUFFLCtCQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEFBQUM7QUFDbEQsVUFBTyxFQUFFLE9BQU8sQUFBQztBQUNqQixhQUFVLEVBQUUsT0FBTyxBQUFDO0tBQ2hCLEtBQUs7RUFFVCxzREFBTSxJQUFJLEVBQUUsSUFBSSxBQUFDLEdBQUc7RUFDWixDQUNSO0NBQ0YsQ0FBQzs7QUFFRixLQUFLLENBQUMsU0FBUyxHQUFHO0FBQ2pCLFVBQVMsRUFBRSxpQkFBVSxLQUFLLENBQUMsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDN0MsS0FBSSxFQUFFLGlCQUFVLE1BQU07QUFDdEIsUUFBTyxFQUFFLGlCQUFVLElBQUksQ0FBQyxVQUFVO0NBQ2xDLENBQUM7O0FBRUYsSUFBTSxPQUFPLEdBQUcsaUNBQVcsTUFBTSxDQUFDO0FBQ2pDLE1BQUssRUFBRTtBQUNOLFlBQVUsRUFBRSxNQUFNO0FBQ2xCLFFBQU0sRUFBRSxNQUFNO0FBQ2QsY0FBWSxFQUFFLENBQUM7QUFDZixRQUFNLEVBQUUsU0FBUztBQUNqQixRQUFNLEVBQUUsbUJBQU0sS0FBSyxDQUFDLE1BQU07QUFDMUIsV0FBUyxFQUFFLG1CQUFNLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQ2xDLFNBQU8sRUFBRSxNQUFNO0FBQ2YsU0FBTyxFQUFFLEVBQUU7QUFDWCxVQUFRLEVBQUUsVUFBVTtBQUNwQixLQUFHLEVBQUUsS0FBSztBQUNWLE9BQUssRUFBRSxFQUFFOzs7QUFHVCxvQkFBa0IsRUFBRSxNQUFNO0FBQzFCLFlBQVUsRUFBRSxNQUFNOztBQUVsQiw2QkFBMkIsRUFBRTtBQUM1QixRQUFLLEVBQUUsRUFBRTtHQUNUO0VBQ0Q7QUFDRCxNQUFLLEVBQUU7QUFDTixPQUFLLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVO0VBQ3hDO0FBQ0QsS0FBSSxFQUFFO0FBQ0wsTUFBSSxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVTtFQUN2QztDQUNELENBQUMsQ0FBQzs7QUFFSCxNQUFNLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQzs7Ozs7Ozs7Ozs7cUJDN0RVLE9BQU87Ozs7b0NBQ1Isd0JBQXdCOztxQkFDdEMsU0FBUzs7OztBQUUzQixTQUFTLE1BQU0sQ0FBRSxJQU9oQixFQUFFO0tBTkYsT0FBTyxHQURTLElBT2hCLENBTkEsT0FBTztLQUNQLFlBQVksR0FGSSxJQU9oQixDQUxBLFlBQVk7S0FDWixjQUFjLEdBSEUsSUFPaEIsQ0FKQSxjQUFjO0tBQ2QsVUFBVSxHQUpNLElBT2hCLENBSEEsVUFBVTtLQUNWLFNBQVMsR0FMTyxJQU9oQixDQUZBLFNBQVM7O0tBQ04sS0FBSyw0QkFOUSxJQU9oQjs7QUFDQSxLQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsU0FBUyxFQUFFLE9BQU8sSUFBSSxDQUFDOztBQUV4QyxLQUFNLFVBQVUsR0FBRyxTQUFTLEdBQzNCOztJQUFLLFNBQVMsRUFBRSwrQkFBSSxPQUFPLENBQUMsV0FBVyxDQUFDLEFBQUM7RUFDdkMsWUFBWTtFQUNaLGNBQWM7RUFDZCxVQUFVO0VBQ04sR0FDSiw4Q0FBUSxDQUFDOztBQUVaLFFBQ0M7O2FBQUssU0FBUyxFQUFFLCtCQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsQUFBQyxJQUFLLEtBQUs7RUFDNUMsT0FBTyxHQUNQOztLQUFZLFNBQVMsRUFBRSwrQkFBSSxPQUFPLENBQUMsYUFBYSxDQUFDLEFBQUM7R0FDaEQsT0FBTztHQUNJLEdBQ1YsOENBQVE7RUFDWCxVQUFVO0VBQ04sQ0FDTDtDQUNGLENBQUM7O0FBRUYsTUFBTSxDQUFDLFNBQVMsR0FBRztBQUNsQixRQUFPLEVBQUUsaUJBQVUsTUFBTTtBQUN6QixhQUFZLEVBQUUsaUJBQVUsTUFBTTtBQUM5QixlQUFjLEVBQUUsaUJBQVUsTUFBTTtBQUNoQyxXQUFVLEVBQUUsaUJBQVUsTUFBTTtBQUM1QixVQUFTLEVBQUUsaUJBQVUsSUFBSTtDQUN6QixDQUFDOztBQUVGLElBQU0sT0FBTyxHQUFHLGlDQUFXLE1BQU0sQ0FBQztBQUNqQyxPQUFNLEVBQUU7QUFDUCxXQUFTLEVBQUUsWUFBWTtBQUN2QixPQUFLLEVBQUUsT0FBTztBQUNkLFFBQU0sRUFBRSxNQUFNO0FBQ2QsU0FBTyxFQUFFLE1BQU07QUFDZixRQUFNLEVBQUUsbUJBQU0sTUFBTSxDQUFDLE1BQU07QUFDM0IsZ0JBQWMsRUFBRSxlQUFlO0FBQy9CLE1BQUksRUFBRSxDQUFDO0FBQ1AsWUFBVSxFQUFFLEdBQUc7QUFDZixlQUFhLEVBQUUsbUJBQU0sTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRO0FBQzNDLGFBQVcsRUFBRSxtQkFBTSxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVU7QUFDM0MsY0FBWSxFQUFFLG1CQUFNLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVTtBQUM1QyxZQUFVLEVBQUUsbUJBQU0sTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRO0VBQ3hDO0FBQ0QsWUFBVyxFQUFFO0FBQ1osT0FBSyxFQUFFLG1CQUFNLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSztBQUMvQixVQUFRLEVBQUUsbUJBQU0sTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO0FBQ3JDLGFBQVcsRUFBRSxLQUFLLEVBQ2xCOztBQUNELGNBQWEsRUFBRTtBQUNkLE1BQUksRUFBRSxPQUFPO0VBQ2I7Q0FDRCxDQUFDLENBQUM7O0FBRUgsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7Ozs7Ozs7Ozs7O3FCQ25FUyxPQUFPOzs7O29DQUNSLHdCQUF3Qjs7cUJBRXRDLFNBQVM7Ozs7b0JBQ1YsUUFBUTs7OztBQUV6QixTQUFTLE1BQU0sQ0FBRSxJQUtoQixFQUFFO0tBSkYsY0FBYyxHQURFLElBS2hCLENBSkEsY0FBYztLQUNkLE9BQU8sR0FGUyxJQUtoQixDQUhBLE9BQU87S0FDUCxlQUFlLEdBSEMsSUFLaEIsQ0FGQSxlQUFlOztLQUNaLEtBQUssNEJBSlEsSUFLaEI7O0FBQ0EsUUFDQzs7YUFBSyxTQUFTLEVBQUUsK0JBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxBQUFDLElBQUssS0FBSztFQUM1QyxjQUFjLEdBQUcsY0FBYyxHQUFHLDhDQUFRO0VBQzFDLENBQUMsQ0FBQyxlQUFlLElBQ2pCOzs7QUFDQyxTQUFLLEVBQUMsYUFBYTtBQUNuQixhQUFTLEVBQUUsK0JBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxBQUFDO0FBQzlCLFdBQU8sRUFBRSxPQUFPLEFBQUM7O0dBRWpCLHNEQUFNLElBQUksRUFBQyxPQUFPLEdBQUc7R0FDYixBQUNUO0VBQ0ksQ0FDTDtDQUNGLENBQUM7O0FBRUYsTUFBTSxDQUFDLFNBQVMsR0FBRztBQUNsQixlQUFjLEVBQUUsaUJBQVUsS0FBSztBQUMvQixRQUFPLEVBQUUsaUJBQVUsSUFBSSxDQUFDLFVBQVU7QUFDbEMsZ0JBQWUsRUFBRSxpQkFBVSxJQUFJO0NBQy9CLENBQUM7O0FBRUYsSUFBTSxPQUFPLEdBQUcsaUNBQVcsTUFBTSxDQUFDO0FBQ2pDLE9BQU0sRUFBRTtBQUNQLFNBQU8sRUFBRSxNQUFNO0FBQ2YsZ0JBQWMsRUFBRSxlQUFlO0FBQy9CLFFBQU0sRUFBRSxtQkFBTSxNQUFNLENBQUMsTUFBTTtFQUMzQjtBQUNELE1BQUssRUFBRTtBQUNOLFlBQVUsRUFBRSxNQUFNO0FBQ2xCLFFBQU0sRUFBRSxNQUFNO0FBQ2QsUUFBTSxFQUFFLFNBQVM7QUFDakIsU0FBTyxFQUFFLE1BQU07QUFDZixVQUFRLEVBQUUsVUFBVTtBQUNwQixLQUFHLEVBQUUsQ0FBQztBQUNOLGVBQWEsRUFBRSxRQUFROzs7QUFHdkIsUUFBTSxFQUFFLG1CQUFNLEtBQUssQ0FBQyxNQUFNLEdBQUcsRUFBRTtBQUMvQixhQUFXLEVBQUUsQ0FBQyxFQUFFO0FBQ2hCLFNBQU8sRUFBRSxFQUFFO0FBQ1gsT0FBSyxFQUFFLG1CQUFNLEtBQUssQ0FBQyxLQUFLLEdBQUcsRUFBRTtFQUM3QjtDQUNELENBQUMsQ0FBQzs7QUFFSCxNQUFNLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O3FCQ3pEUyxPQUFPOzs7O3FCQUN0QixTQUFTOzs7O0FBRTNCLElBQU0sSUFBSSxHQUFHLFNBQVAsSUFBSSxDQUFJLElBQWtCO0tBQWhCLElBQUksR0FBTixJQUFrQixDQUFoQixJQUFJOztLQUFLLEtBQUssNEJBQWhCLElBQWtCOztRQUMvQjtBQUNDLHlCQUF1QixFQUFFLEVBQUUsTUFBTSxFQUFFLG1CQUFNLElBQUksQ0FBQyxFQUFFLEFBQUM7SUFDN0MsS0FBSyxFQUNSO0NBQ0YsQ0FBQzs7QUFFRixJQUFJLENBQUMsU0FBUyxHQUFHO0FBQ2hCLEtBQUksRUFBRSxpQkFBVSxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksb0JBQU8sQ0FBQztDQUN6QyxDQUFDOztxQkFFYSxJQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FCQ2RjLE9BQU87Ozs7NkNBQ2pCLG1DQUFtQzs7Ozt3QkFDbkMsV0FBVzs7SUFFYixNQUFNO1dBQU4sTUFBTTs7QUFDZCxVQURRLE1BQU0sR0FDWDt3QkFESyxNQUFNOztBQUV6Qiw2QkFGbUIsTUFBTSw2Q0FFakI7QUFDUixNQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztFQUMxQjs7Y0FKbUIsTUFBTTs7U0FLUiw2QkFBRztBQUNwQixPQUFNLENBQUMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3hDLFdBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzdCLE9BQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZCLE9BQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0dBQzFCOzs7U0FDa0IsOEJBQUc7QUFDckIsT0FBTSxNQUFNLCtQQUtYLENBQUM7QUFDRix5QkFDQzs7O0lBQ0M7OztLQUFRLE1BQU07S0FBUztJQUN2QjtBQUNDLG1CQUFjLEVBQUMsTUFBTTtBQUNyQiwyQkFBc0IsRUFBRSxHQUFHLEFBQUM7QUFDNUIsMkJBQXNCLEVBQUUsR0FBRyxBQUFDO09BQ3hCLElBQUksQ0FBQyxLQUFLLEVBQ2I7SUFDRyxFQUNOLElBQUksQ0FBQyxhQUFhLENBQ2xCLENBQUM7R0FDRjs7O1NBQ29CLGdDQUFHO0FBQ3ZCLFdBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztHQUM5Qzs7O1NBQ00sa0JBQUc7QUFDVCxVQUFPLElBQUksQ0FBQztHQUNaOzs7UUFwQ21CLE1BQU07OztxQkFBTixNQUFNOzs7Ozs7QUNKM0IsTUFBTSxDQUFDLE9BQU8sR0FDYixzTUFBc00sR0FDbk0sc1FBQXNRLEdBQ3ZRLFFBQVEsQUFDVixDQUFDOzs7OztBQ0pGLE1BQU0sQ0FBQyxPQUFPLEdBQ2Isc01BQXNNLEdBQ25NLHFRQUFxUSxHQUN0USxRQUFRLEFBQ1YsQ0FBQzs7Ozs7QUNKRixNQUFNLENBQUMsT0FBTyxHQUNiLGlQQUFpUCxHQUM5Tyx3ZUFBd2UsR0FDemUsUUFBUSxBQUNWLENBQUM7Ozs7O0FDSkYsTUFBTSxDQUFDLE9BQU8sR0FBRztBQUNoQixVQUFTLEVBQUUsT0FBTyxDQUFDLGFBQWEsQ0FBQztBQUNqQyxXQUFVLEVBQUUsT0FBTyxDQUFDLGNBQWMsQ0FBQztBQUNuQyxNQUFLLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQztDQUN6QixDQUFDOzs7Ozs7Ozs7OztxQkNKZ0IsVUFBVTs7OztBQUU1QixJQUFNLE1BQU0sR0FBRztBQUNkLFVBQVMsRUFBRTtBQUNWLFlBQVUsRUFBRSxRQUFRO0FBQ3BCLGlCQUFlLEVBQUUsbUJBQU0sU0FBUyxDQUFDLFVBQVU7QUFDM0MsV0FBUyxFQUFFLFlBQVk7QUFDdkIsU0FBTyxFQUFFLE1BQU07QUFDZixRQUFNLEVBQUUsTUFBTTtBQUNkLGdCQUFjLEVBQUUsUUFBUTtBQUN4QixNQUFJLEVBQUUsQ0FBQztBQUNQLGVBQWEsRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVE7QUFDOUMsYUFBVyxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVTtBQUM5QyxjQUFZLEVBQUUsbUJBQU0sU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVO0FBQy9DLFlBQVUsRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVE7QUFDM0MsVUFBUSxFQUFFLE9BQU87QUFDakIsS0FBRyxFQUFFLENBQUM7QUFDTixPQUFLLEVBQUUsTUFBTTtBQUNiLFFBQU0sRUFBRSxtQkFBTSxTQUFTLENBQUMsTUFBTTtFQUM5Qjs7QUFFRCxRQUFPLEVBQUU7QUFDUixVQUFRLEVBQUUsVUFBVTtFQUNwQjs7O0FBR0QsTUFBSyxFQUFFO0FBQ04sU0FBTyxFQUFFLE9BQU87QUFDaEIsUUFBTSxFQUFFLE1BQU07QUFDZCxRQUFNLEVBQUUsUUFBUTtBQUNoQixVQUFRLEVBQUUsTUFBTTs7O0FBR2hCLG9CQUFrQixFQUFFLE1BQU07QUFDMUIsWUFBVSxFQUFFLE1BQU07O0VBRWxCO0FBQ0QsT0FBTSxFQUFFOzs7QUFHUCxRQUFNLEVBQUUsQ0FBQyxFQUNUO0NBQ0QsQ0FBQzs7O3FCQUVhLE1BQU07Ozs7Ozs7Ozs7QUN4Q3JCLElBQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQzs7O0FBR2pCLEtBQUssQ0FBQyxTQUFTLEdBQUc7QUFDakIsV0FBVSxFQUFFLG9CQUFvQjtBQUNoQyxPQUFNLEVBQUU7QUFDUCxZQUFVLEVBQUUsRUFBRTtBQUNkLFVBQVEsRUFBRSxDQUFDO0VBQ1g7QUFDRCxPQUFNLEVBQUUsSUFBSTtDQUNaLENBQUM7OztBQUdGLEtBQUssQ0FBQyxNQUFNLEdBQUc7QUFDZCxPQUFNLEVBQUUsRUFBRTtDQUNWLENBQUM7QUFDRixLQUFLLENBQUMsS0FBSyxHQUFHO0FBQ2IsT0FBTSxFQUFFLEVBQUU7QUFDVixNQUFLLEVBQUUsRUFBRTtDQUNULENBQUM7OztBQUdGLEtBQUssQ0FBQyxNQUFNLEdBQUc7QUFDZCxNQUFLLEVBQUU7QUFDTixPQUFLLEVBQUUsMkJBQTJCO0FBQ2xDLFVBQVEsRUFBRSxRQUFRO0VBQ2xCO0FBQ0QsT0FBTSxFQUFFLEVBQUU7QUFDVixPQUFNLEVBQUU7QUFDUCxZQUFVLEVBQUUsQ0FBQztBQUNiLFVBQVEsRUFBRSxDQUFDO0VBQ1g7Q0FDRCxDQUFDOzs7QUFHRixLQUFLLENBQUMsS0FBSyxHQUFHO0FBQ2IsT0FBTSxFQUFFLEdBQUc7Q0FDWCxDQUFDOztBQUdGLE1BQU0sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2hDdkIsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLGFBQWEsQ0FBRSxTQUFTLEVBQUU7OztBQUNuRCxVQUFTLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQztTQUFLLE1BQUssQ0FBQyxDQUFDLEdBQUcsTUFBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLE9BQU07RUFBQyxDQUFDLENBQUM7Q0FDdkQsQ0FBQzs7Ozs7O0FDYkYsSUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFDOztBQUV4QixJQUFNLFdBQVcsR0FBRyxTQUFkLFdBQVcsR0FBZTtBQUMvQixLQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVcsSUFBSSxDQUFDLFdBQVcsRUFBRSxPQUFPOzs7O0FBSTFELEtBQUk7QUFDSCxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDOztBQUU3QixRQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7QUFDL0IsUUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDOztBQUU1QixhQUFXLEdBQUcsS0FBSyxDQUFDO0VBQ3BCLENBQUMsT0FBTyxHQUFHLEVBQUU7QUFDYixTQUFPLENBQUMsS0FBSyxDQUFDLG1DQUFtQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0VBQ3hEO0NBQ0QsQ0FBQzs7QUFFRixJQUFNLFdBQVcsR0FBRyxTQUFkLFdBQVcsR0FBZTtBQUMvQixLQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVcsSUFBSSxXQUFXLEVBQUUsT0FBTzs7OztBQUl6RCxLQUFJO0FBQ0gsTUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQzs7QUFFckUsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQzs7QUFFN0IsUUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsY0FBYyxHQUFHLElBQUksQ0FBQztBQUNsRCxRQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7O0FBRWxDLGFBQVcsR0FBRyxJQUFJLENBQUM7RUFDbkIsQ0FBQyxPQUFPLEdBQUcsRUFBRTtBQUNiLFNBQU8sQ0FBQyxLQUFLLENBQUMsbUNBQW1DLEVBQUUsR0FBRyxDQUFDLENBQUM7RUFDeEQ7Q0FDRCxDQUFDOztBQUVGLE1BQU0sQ0FBQyxPQUFPLEdBQUc7QUFDaEIsWUFBVyxFQUFYLFdBQVc7QUFDWCxZQUFXLEVBQVgsV0FBVztDQUNYLENBQUM7Ozs7Ozs7QUN4Q0YsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLEVBQ2pCLE9BQU8sTUFBTSxLQUFLLFdBQVcsSUFDMUIsTUFBTSxDQUFDLFFBQVEsSUFDZixNQUFNLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQSxBQUNoQyxDQUFDOzs7Ozs7OzZCQ053QixpQkFBaUI7Ozs7MEJBQ3BCLGNBQWM7Ozs7eUJBQ2YsYUFBYTs7OztBQUVuQyxNQUFNLENBQUMsT0FBTyxHQUFHO0FBQ2hCLGNBQWEsNEJBQUE7QUFDYixXQUFVLHlCQUFBO0FBQ1YsVUFBUyx3QkFBQTtDQUNULENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxQkNSMEMsT0FBTzs7OztvQ0FDbkIsd0JBQXdCOzs7O3FCQUd0QyxTQUFTOzs7O3FCQUNULFNBQVM7Ozs7cUJBQ1QsU0FBUzs7OztzQkFDUixVQUFVOzs7O3NCQUNWLFVBQVU7Ozs7c0JBQ1YsVUFBVTs7Ozs2QkFFVixrQkFBa0I7Ozs7QUFFckMsSUFBTSxPQUFPLEdBQUcsaUNBQVcsTUFBTSw0QkFBUSxDQUFDOztJQUVwQyxRQUFRO1dBQVIsUUFBUTs7Y0FBUixRQUFROztTQUNBLGVBQUMsV0FBVyxFQUFFO0FBQzFCLE9BQU0sU0FBUyxHQUFHLFNBQWMsRUFBRSw2QkFBUyxDQUFDO0FBQzVDLFFBQUssSUFBTSxHQUFHLElBQUksU0FBUyxFQUFFO0FBQzVCLFFBQUksR0FBRyxJQUFJLFdBQVcsRUFBRTtBQUN2QixjQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsU0FBYyxFQUFFLEVBQUUsMkJBQU8sR0FBRyxDQUFDLEVBQUUsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDbEU7SUFDRDtBQUNELFVBQU8sU0FBUyxDQUFDO0dBQ2pCOzs7QUFDVyxVQVZQLFFBQVEsR0FVRTt3QkFWVixRQUFROztBQVdaLDZCQVhJLFFBQVEsNkNBV0o7O0FBRVIscUJBQU0sYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FDOUIsVUFBVSxFQUNWLFVBQVUsRUFDVixxQkFBcUIsQ0FDckIsQ0FBQyxDQUFDO0VBQ0g7O2NBbEJJLFFBQVE7O1NBbUJhLG1DQUFDLFNBQVMsRUFBRTtBQUNyQyxPQUFJLENBQUMsbUJBQU0sU0FBUyxFQUFFLE9BQU87OztBQUc3QixPQUFJLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRTtBQUMvQixRQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQztBQUM3QyxRQUFNLFNBQVMsR0FBRyxTQUFTLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztBQUM3QyxRQUFNLFNBQVMsR0FBRyxTQUFTLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztBQUM3QyxRQUFJLFlBQVksWUFBQSxDQUFDOztBQUVqQixRQUFJLFlBQVksSUFBSSxTQUFTLENBQUMsWUFBWSxHQUFHLFlBQVksRUFBRTtBQUMxRCxpQkFBWSxHQUFHLFNBQVMsQ0FBQztLQUN6QixNQUFNLElBQUksWUFBWSxJQUFJLFNBQVMsQ0FBQyxZQUFZLEdBQUcsWUFBWSxFQUFFO0FBQ2pFLGlCQUFZLEdBQUcsU0FBUyxDQUFDO0tBQ3pCOzs7O0FBSUQsUUFBSSxZQUFZLEVBQUU7QUFDakIsU0FBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNoQyxNQUFNO0FBQ04sU0FBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUM3QixTQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQzdCO0lBQ0Q7OztBQUdELE9BQUksU0FBUyxDQUFDLG1CQUFtQixFQUFFO0FBQ2xDLFVBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDN0QsTUFBTTtBQUNOLFVBQU0sQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDaEU7OztBQUdELE9BQUksU0FBUyxDQUFDLE1BQU0sRUFBRTtBQUNyQix1QkFBTSxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDL0IsTUFBTTtBQUNOLHVCQUFNLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMvQjtHQUNEOzs7Ozs7OztTQU1ZLHNCQUFDLEdBQUcsRUFBRTtBQUNsQixPQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzs7QUFFckMsT0FBSSxDQUFDLEtBQUssRUFBRSxPQUFPOztBQUVuQixPQUFNLEdBQUcsR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDOztBQUV4QixNQUFHLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUM7O0FBRXBCLE9BQUksS0FBSyxDQUFDLE1BQU0sRUFBRTtBQUNqQixPQUFHLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDakM7R0FDRDs7O1NBQ1Esa0JBQUMsS0FBSyxFQUFFO0FBQ2hCLE9BQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEtBQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQUFBQyxFQUFFLE9BQU87QUFDdkUsT0FBSSxLQUFLLEVBQUU7QUFDVixTQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDdkIsU0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3hCO0FBQ0QsT0FBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztHQUV6Qjs7O1NBQ1Esa0JBQUMsS0FBSyxFQUFFO0FBQ2hCLE9BQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEtBQUssQ0FBQyxFQUFFLE9BQU87QUFDMUMsT0FBSSxLQUFLLEVBQUU7QUFDVixTQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDdkIsU0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3hCO0FBQ0QsT0FBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztHQUV6Qjs7O1NBQ21CLDZCQUFDLEtBQUssRUFBRTtBQUMzQixPQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssRUFBRSxFQUFFO0FBQ3pCLFFBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDckIsV0FBTyxJQUFJLENBQUM7SUFDWixNQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxFQUFFLEVBQUU7QUFDaEMsUUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNyQixXQUFPLElBQUksQ0FBQztJQUNaLE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLEVBQUUsRUFBRTtBQUNoQyxRQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ3JCLFdBQU8sSUFBSSxDQUFDO0lBQ1o7QUFDRCxVQUFPLEtBQUssQ0FBQztHQUViOzs7Ozs7OztTQU1lLDJCQUFHO0FBQ2xCLE9BQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEtBQUssQ0FBQyxFQUFFLE9BQU8sSUFBSSxDQUFDOztBQUUvQyxVQUNDO0FBQ0MsYUFBUyxFQUFDLE1BQU07QUFDaEIsUUFBSSxFQUFDLFdBQVc7QUFDaEIsV0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLEFBQUM7QUFDdkIsU0FBSyxFQUFDLDJCQUEyQjtBQUNqQyxRQUFJLEVBQUMsUUFBUTtLQUNaLENBQ0Q7R0FDRjs7O1NBQ2UsMkJBQUc7QUFDbEIsT0FBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksS0FBTSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxBQUFDLEVBQUUsT0FBTyxJQUFJLENBQUM7O0FBRTVFLFVBQ0M7QUFDQyxhQUFTLEVBQUMsT0FBTztBQUNqQixRQUFJLEVBQUMsWUFBWTtBQUNqQixXQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsQUFBQztBQUN2QixTQUFLLEVBQUMsNEJBQTRCO0FBQ2xDLFFBQUksRUFBQyxRQUFRO0tBQ1osQ0FDRDtHQUNGOzs7U0FDWSx3QkFBRztnQkFPWCxJQUFJLENBQUMsS0FBSztPQUxiLG1CQUFtQixVQUFuQixtQkFBbUI7T0FDbkIsY0FBYyxVQUFkLGNBQWM7T0FDZCxNQUFNLFVBQU4sTUFBTTtPQUNOLE9BQU8sVUFBUCxPQUFPO09BQ1AsZUFBZSxVQUFmLGVBQWU7O0FBR2hCLE9BQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxJQUFJLENBQUM7O0FBRXpCLFVBQ0M7OztBQUNDLFFBQUcsRUFBQyxRQUFRO0FBQ1osY0FBUyxFQUFFLCtCQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsQUFBQztBQUNsQyxZQUFPLEVBQUUsQ0FBQyxDQUFDLG1CQUFtQixJQUFJLE9BQU8sQUFBQztBQUMxQyxlQUFVLEVBQUUsQ0FBQyxDQUFDLG1CQUFtQixJQUFJLE9BQU8sQUFBQzs7SUFFN0M7O09BQUssU0FBUyxFQUFFLCtCQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsQUFBQyxFQUFDLEtBQUssRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxBQUFDO0tBQzNFO0FBQ0Msb0JBQWMsRUFBRSxjQUFjLEFBQUM7QUFDL0IsYUFBTyxFQUFFLE9BQU8sQUFBQztBQUNqQixxQkFBZSxFQUFFLGVBQWUsQUFBQztPQUNoQztLQUNELElBQUksQ0FBQyxZQUFZLEVBQUU7S0FDZjtJQUNMLElBQUksQ0FBQyxlQUFlLEVBQUU7SUFDdEIsSUFBSSxDQUFDLGVBQWUsRUFBRTtJQUNsQixDQUNMO0dBQ0Y7OztTQUNZLHdCQUFHO2lCQU9YLElBQUksQ0FBQyxLQUFLO09BTGIsWUFBWSxXQUFaLFlBQVk7T0FDWixNQUFNLFdBQU4sTUFBTTtPQUNOLG1CQUFtQixXQUFuQixtQkFBbUI7T0FDbkIsWUFBWSxXQUFaLFlBQVk7T0FDWixjQUFjLFdBQWQsY0FBYzs7QUFHZixPQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxPQUFPLElBQUksQ0FBQzs7QUFFM0MsT0FBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDOztBQUVuQyxPQUFJLE1BQU0sWUFBQSxDQUFDO0FBQ1gsT0FBSSxLQUFLLFlBQUEsQ0FBQztBQUNWLE9BQUksS0FBSyxZQUFBLENBQUM7O0FBRVYsT0FBSSxLQUFLLENBQUMsTUFBTSxFQUFFO0FBQ2pCLFVBQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0FBQzdCLFNBQUssR0FBRyxPQUFPLENBQUM7SUFDaEI7O0FBRUQsVUFDQzs7TUFBUSxTQUFTLEVBQUUsK0JBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxBQUFDLEVBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFMLEtBQUssRUFBRSxBQUFDO0lBTXhEO0FBQ0MsY0FBUyxFQUFFLCtCQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsQUFBQztBQUM5QixZQUFPLEVBQUUsQ0FBQyxDQUFDLFlBQVksSUFBSSxZQUFZLEFBQUM7QUFDeEMsVUFBSyxFQUFFLEtBQUssQUFBQztBQUNiLFFBQUcsRUFBRSxLQUFLLENBQUMsR0FBRyxBQUFDO0FBQ2YsV0FBTSxFQUFFLE1BQU0sQUFBQztBQUNmLFVBQUssRUFBRTtBQUNOLFlBQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxTQUFTLEdBQUcsTUFBTTtBQUNwRCxlQUFTLHFCQUFrQixtQkFBTSxNQUFNLENBQUMsTUFBTSxHQUFHLG1CQUFNLE1BQU0sQ0FBQyxNQUFNLENBQUEsUUFBSztNQUN6RSxBQUFDO01BQ0Q7SUFDRjtBQUNDLFlBQU8sRUFBRSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxBQUFDO0FBQ3RDLGlCQUFZLEVBQUUsWUFBWSxHQUFHLENBQUMsQUFBQztBQUMvQixtQkFBYyxFQUFFLG1CQUFtQixBQUFDO0FBQ3BDLGVBQVUsRUFBRSxNQUFNLENBQUMsTUFBTSxBQUFDO0FBQzFCLGNBQVMsRUFBRSxjQUFjLEFBQUM7TUFDekI7SUFDTSxDQUNSO0dBQ0Y7OztTQUNNLGtCQUFHO0FBQ1QsVUFDQzs7O0lBQ0UsSUFBSSxDQUFDLFlBQVksRUFBRTtJQUNaLENBQ1I7R0FDRjs7O1FBbk9JLFFBQVE7OztBQXNPZCxRQUFRLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQzs7QUFFbEMsUUFBUSxDQUFDLFNBQVMsR0FBRztBQUNwQixvQkFBbUIsRUFBRSxpQkFBVSxJQUFJO0FBQ25DLGFBQVksRUFBRSxpQkFBVSxNQUFNO0FBQzlCLGVBQWMsRUFBRSxpQkFBVSxPQUFPLENBQUMsaUJBQVUsSUFBSSxDQUFDO0FBQ2pELG9CQUFtQixFQUFFLGlCQUFVLElBQUk7QUFDbkMsb0JBQW1CLEVBQUUsaUJBQVUsTUFBTTtBQUNyQyxPQUFNLEVBQUUsaUJBQVUsT0FBTyxDQUN4QixpQkFBVSxLQUFLLENBQUM7QUFDZixLQUFHLEVBQUUsaUJBQVUsTUFBTSxDQUFDLFVBQVU7QUFDaEMsUUFBTSxFQUFFLGlCQUFVLEtBQUs7QUFDdkIsU0FBTyxFQUFFLGlCQUFVLE1BQU07RUFDekIsQ0FBQyxDQUNGLENBQUMsVUFBVTtBQUNaLE9BQU0sRUFBRSxpQkFBVSxJQUFJO0FBQ3RCLGFBQVksRUFBRSxpQkFBVSxJQUFJO0FBQzVCLFlBQVcsRUFBRSxpQkFBVSxJQUFJO0FBQzNCLFlBQVcsRUFBRSxpQkFBVSxJQUFJO0FBQzNCLFFBQU8sRUFBRSxpQkFBVSxJQUFJLENBQUMsVUFBVTtBQUNsQyxpQkFBZ0IsRUFBRSxpQkFBVSxJQUFJO0FBQ2hDLE1BQUssRUFBRSxpQkFBVSxNQUFNO0FBQ3ZCLGdCQUFlLEVBQUUsaUJBQVUsSUFBSTtBQUMvQixlQUFjLEVBQUUsaUJBQVUsSUFBSTtBQUM5QixNQUFLLEVBQUUsaUJBQVUsTUFBTTtDQUN2QixDQUFDOztBQUVGLFFBQVEsQ0FBQyxZQUFZLEdBQUc7QUFDdkIsYUFBWSxFQUFFLENBQUM7QUFDZixvQkFBbUIsRUFBRSxJQUFJO0FBQ3pCLG9CQUFtQixFQUFFLE1BQU07QUFDM0IscUJBQW9CLEVBQUUsSUFBSTtBQUMxQixpQkFBZ0IsRUFBRSxJQUFJO0FBQ3RCLGdCQUFlLEVBQUUsSUFBSTtBQUNyQixlQUFjLEVBQUUsSUFBSTtBQUNwQixNQUFLLEVBQUUsSUFBSTtDQUNYLENBQUM7O3FCQUVhLFFBQVEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3NsaWNlZFRvQXJyYXkgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBzbGljZUl0ZXJhdG9yKGFyciwgaSkgeyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVsncmV0dXJuJ10pIF9pWydyZXR1cm4nXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH0gcmV0dXJuIGZ1bmN0aW9uIChhcnIsIGkpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgeyByZXR1cm4gYXJyOyB9IGVsc2UgaWYgKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkgeyByZXR1cm4gc2xpY2VJdGVyYXRvcihhcnIsIGkpOyB9IGVsc2UgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlJyk7IH0gfTsgfSkoKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG52YXIgX2lubGluZVN0eWxlUHJlZml4ZXJTdGF0aWMgPSByZXF1aXJlKCdpbmxpbmUtc3R5bGUtcHJlZml4ZXIvc3RhdGljJyk7XG5cbnZhciBfaW5saW5lU3R5bGVQcmVmaXhlclN0YXRpYzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmxpbmVTdHlsZVByZWZpeGVyU3RhdGljKTtcblxudmFyIF91dGlsID0gcmVxdWlyZSgnLi91dGlsJyk7XG5cbi8qKlxuICogR2VuZXJhdGUgQ1NTIGZvciBhIHNlbGVjdG9yIGFuZCBzb21lIHN0eWxlcy5cbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIGhhbmRsZXMgdGhlIG1lZGlhIHF1ZXJpZXMsIHBzZXVkbyBzZWxlY3RvcnMsIGFuZCBkZXNjZW5kYW50XG4gKiBzdHlsZXMgdGhhdCBjYW4gYmUgdXNlZCBpbiBhcGhyb2RpdGUgc3R5bGVzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvcjogQSBiYXNlIENTUyBzZWxlY3RvciBmb3IgdGhlIHN0eWxlcyB0byBiZSBnZW5lcmF0ZWRcbiAqICAgICB3aXRoLlxuICogQHBhcmFtIHtPYmplY3R9IHN0eWxlVHlwZXM6IEEgbGlzdCBvZiBwcm9wZXJ0aWVzIG9mIHRoZSByZXR1cm4gdHlwZSBvZlxuICogICAgIFN0eWxlU2hlZXQuY3JlYXRlLCBlLmcuIFtzdHlsZXMucmVkLCBzdHlsZXMuYmx1ZV0uXG4gKiBAcGFyYW0gc3RyaW5nSGFuZGxlcnM6IFNlZSBgZ2VuZXJhdGVDU1NSdWxlc2V0YFxuICogQHBhcmFtIHVzZUltcG9ydGFudDogU2VlIGBnZW5lcmF0ZUNTU1J1bGVzZXRgXG4gKlxuICogVG8gYWN0dWFsbHkgZ2VuZXJhdGUgdGhlIENTUyBzcGVjaWFsLWNvbnN0cnVjdC1sZXNzIHN0eWxlcyBhcmUgcGFzc2VkIHRvXG4gKiBgZ2VuZXJhdGVDU1NSdWxlc2V0YC5cbiAqXG4gKiBGb3IgaW5zdGFuY2UsIGEgY2FsbCB0b1xuICpcbiAqICAgICBnZW5lcmF0ZUNTU0lubmVyKFwiLmZvb1wiLCB7XG4gKiAgICAgICBjb2xvcjogXCJyZWRcIixcbiAqICAgICAgIFwiQG1lZGlhIHNjcmVlblwiOiB7XG4gKiAgICAgICAgIGhlaWdodDogMjAsXG4gKiAgICAgICAgIFwiOmhvdmVyXCI6IHtcbiAqICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwiYmxhY2tcIlxuICogICAgICAgICB9XG4gKiAgICAgICB9LFxuICogICAgICAgXCI6YWN0aXZlXCI6IHtcbiAqICAgICAgICAgZm9udFdlaWdodDogXCJib2xkXCIsXG4gKiAgICAgICAgIFwiPj5iYXJcIjoge1xuICogICAgICAgICAgIF9uYW1lczogeyBcImZvb19iYXJcIjogdHJ1ZSB9LFxuICogICAgICAgICAgIGhlaWdodDogMTAsXG4gKiAgICAgICAgIH1cbiAqICAgICAgIH1cbiAqICAgICB9KTtcbiAqXG4gKiB3aWxsIG1ha2UgNSBjYWxscyB0byBgZ2VuZXJhdGVDU1NSdWxlc2V0YDpcbiAqXG4gKiAgICAgZ2VuZXJhdGVDU1NSdWxlc2V0KFwiLmZvb1wiLCB7IGNvbG9yOiBcInJlZFwiIH0sIC4uLilcbiAqICAgICBnZW5lcmF0ZUNTU1J1bGVzZXQoXCIuZm9vOmFjdGl2ZVwiLCB7IGZvbnRXZWlnaHQ6IFwiYm9sZFwiIH0sIC4uLilcbiAqICAgICBnZW5lcmF0ZUNTU1J1bGVzZXQoXCIuZm9vOmFjdGl2ZSAuZm9vX2JhclwiLCB7IGhlaWdodDogMTAgfSwgLi4uKVxuICogICAgIC8vIFRoZXNlIDIgd2lsbCBiZSB3cmFwcGVkIGluIEBtZWRpYSBzY3JlZW4ge31cbiAqICAgICBnZW5lcmF0ZUNTU1J1bGVzZXQoXCIuZm9vXCIsIHsgaGVpZ2h0OiAyMCB9LCAuLi4pXG4gKiAgICAgZ2VuZXJhdGVDU1NSdWxlc2V0KFwiLmZvbzpob3ZlclwiLCB7IGJhY2tncm91bmRDb2xvcjogXCJibGFja1wiIH0sIC4uLilcbiAqL1xudmFyIGdlbmVyYXRlQ1NTID0gZnVuY3Rpb24gZ2VuZXJhdGVDU1Moc2VsZWN0b3IsIHN0eWxlVHlwZXMsIHN0cmluZ0hhbmRsZXJzLCB1c2VJbXBvcnRhbnQpIHtcbiAgICB2YXIgbWVyZ2VkID0gc3R5bGVUeXBlcy5yZWR1Y2UoX3V0aWwucmVjdXJzaXZlTWVyZ2UpO1xuXG4gICAgdmFyIGRlY2xhcmF0aW9ucyA9IHt9O1xuICAgIHZhciBtZWRpYVF1ZXJpZXMgPSB7fTtcbiAgICB2YXIgcHNldWRvU3R5bGVzID0ge307XG5cbiAgICBPYmplY3Qua2V5cyhtZXJnZWQpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBpZiAoa2V5WzBdID09PSAnOicpIHtcbiAgICAgICAgICAgIHBzZXVkb1N0eWxlc1trZXldID0gbWVyZ2VkW2tleV07XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5WzBdID09PSAnQCcpIHtcbiAgICAgICAgICAgIG1lZGlhUXVlcmllc1trZXldID0gbWVyZ2VkW2tleV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWNsYXJhdGlvbnNba2V5XSA9IG1lcmdlZFtrZXldO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZ2VuZXJhdGVDU1NSdWxlc2V0KHNlbGVjdG9yLCBkZWNsYXJhdGlvbnMsIHN0cmluZ0hhbmRsZXJzLCB1c2VJbXBvcnRhbnQpICsgT2JqZWN0LmtleXMocHNldWRvU3R5bGVzKS5tYXAoZnVuY3Rpb24gKHBzZXVkb1NlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiBnZW5lcmF0ZUNTU1J1bGVzZXQoc2VsZWN0b3IgKyBwc2V1ZG9TZWxlY3RvciwgcHNldWRvU3R5bGVzW3BzZXVkb1NlbGVjdG9yXSwgc3RyaW5nSGFuZGxlcnMsIHVzZUltcG9ydGFudCk7XG4gICAgfSkuam9pbihcIlwiKSArIE9iamVjdC5rZXlzKG1lZGlhUXVlcmllcykubWFwKGZ1bmN0aW9uIChtZWRpYVF1ZXJ5KSB7XG4gICAgICAgIHZhciBydWxlc2V0ID0gZ2VuZXJhdGVDU1Moc2VsZWN0b3IsIFttZWRpYVF1ZXJpZXNbbWVkaWFRdWVyeV1dLCBzdHJpbmdIYW5kbGVycywgdXNlSW1wb3J0YW50KTtcbiAgICAgICAgcmV0dXJuIG1lZGlhUXVlcnkgKyAneycgKyBydWxlc2V0ICsgJ30nO1xuICAgIH0pLmpvaW4oXCJcIik7XG59O1xuXG5leHBvcnRzLmdlbmVyYXRlQ1NTID0gZ2VuZXJhdGVDU1M7XG4vKipcbiAqIEhlbHBlciBtZXRob2Qgb2YgZ2VuZXJhdGVDU1NSdWxlc2V0IHRvIGZhY2lsaXRhdGUgY3VzdG9tIGhhbmRsaW5nIG9mIGNlcnRhaW5cbiAqIENTUyBwcm9wZXJ0aWVzLiBVc2VkIGZvciBlLmcuIGZvbnQgZmFtaWxpZXMuXG4gKlxuICogU2VlIGdlbmVyYXRlQ1NTUnVsZXNldCBmb3IgdXNhZ2UgYW5kIGRvY3VtZW50YXRpb24gb2YgcGFyYW1hdGVyIHR5cGVzLlxuICovXG52YXIgcnVuU3RyaW5nSGFuZGxlcnMgPSBmdW5jdGlvbiBydW5TdHJpbmdIYW5kbGVycyhkZWNsYXJhdGlvbnMsIHN0cmluZ0hhbmRsZXJzKSB7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuXG4gICAgT2JqZWN0LmtleXMoZGVjbGFyYXRpb25zKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgLy8gSWYgYSBoYW5kbGVyIGV4aXN0cyBmb3IgdGhpcyBwYXJ0aWN1bGFyIGtleSwgbGV0IGl0IGludGVycHJldFxuICAgICAgICAvLyB0aGF0IHZhbHVlIGZpcnN0IGJlZm9yZSBjb250aW51aW5nXG4gICAgICAgIGlmIChzdHJpbmdIYW5kbGVycyAmJiBzdHJpbmdIYW5kbGVycy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICByZXN1bHRba2V5XSA9IHN0cmluZ0hhbmRsZXJzW2tleV0oZGVjbGFyYXRpb25zW2tleV0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0W2tleV0gPSBkZWNsYXJhdGlvbnNba2V5XTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKlxuICogR2VuZXJhdGUgYSBDU1MgcnVsZXNldCB3aXRoIHRoZSBzZWxlY3RvciBhbmQgY29udGFpbmluZyB0aGUgZGVjbGFyYXRpb25zLlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gYXNzdW1lcyB0aGF0IHRoZSBnaXZlbiBkZWNsYXJhdGlvbnMgZG9uJ3QgY29udGFpbiBhbnkgc3BlY2lhbFxuICogY2hpbGRyZW4gKHN1Y2ggYXMgbWVkaWEgcXVlcmllcywgcHNldWRvLXNlbGVjdG9ycywgb3IgZGVzY2VuZGFudCBzdHlsZXMpLlxuICpcbiAqIE5vdGUgdGhhdCB0aGlzIG1ldGhvZCBkb2VzIG5vdCBkZWFsIHdpdGggbmVzdGluZyB1c2VkIGZvciBlLmcuXG4gKiBwc3VlZG8tc2VsZWN0b3JzIG9yIG1lZGlhIHF1ZXJpZXMuIFRoYXQgcmVzcG9uc2liaWxpdHkgaXMgbGVmdCB0byAgdGhlXG4gKiBgZ2VuZXJhdGVDU1NgIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvcjogdGhlIHNlbGVjdG9yIGFzc29jaWF0ZWQgd2l0aCB0aGUgcnVsZXNldFxuICogQHBhcmFtIHtPYmplY3R9IGRlY2xhcmF0aW9uczogYSBtYXAgZnJvbSBjYW1lbENhc2VkIENTUyBwcm9wZXJ0eSBuYW1lIHRvIENTU1xuICogICAgIHByb3BlcnR5IHZhbHVlLlxuICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywgZnVuY3Rpb24+fSBzdHJpbmdIYW5kbGVyczogYSBtYXAgZnJvbSBjYW1lbENhc2VkIENTU1xuICogICAgIHByb3BlcnR5IG5hbWUgdG8gYSBmdW5jdGlvbiB3aGljaCB3aWxsIG1hcCB0aGUgZ2l2ZW4gdmFsdWUgdG8gdGhlIHZhbHVlXG4gKiAgICAgdGhhdCBpcyBvdXRwdXQuXG4gKiBAcGFyYW0ge2Jvb2x9IHVzZUltcG9ydGFudDogQSBib29sZWFuIHNheWluZyB3aGV0aGVyIHRvIGFwcGVuZCBcIiFpbXBvcnRhbnRcIlxuICogICAgIHRvIGVhY2ggb2YgdGhlIENTUyBkZWNsYXJhdGlvbnMuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBBIHN0cmluZyBvZiByYXcgQ1NTLlxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICAgIGdlbmVyYXRlQ1NTUnVsZXNldChcIi5ibGFoXCIsIHsgY29sb3I6IFwicmVkXCIgfSlcbiAqICAgIC0+IFwiLmJsYWh7Y29sb3I6IHJlZCAhaW1wb3J0YW50O31cIlxuICogICAgZ2VuZXJhdGVDU1NSdWxlc2V0KFwiLmJsYWhcIiwgeyBjb2xvcjogXCJyZWRcIiB9LCB7fSwgZmFsc2UpXG4gKiAgICAtPiBcIi5ibGFoe2NvbG9yOiByZWR9XCJcbiAqICAgIGdlbmVyYXRlQ1NTUnVsZXNldChcIi5ibGFoXCIsIHsgY29sb3I6IFwicmVkXCIgfSwge2NvbG9yOiBjID0+IGMudG9VcHBlckNhc2V9KVxuICogICAgLT4gXCIuYmxhaHtjb2xvcjogUkVEfVwiXG4gKiAgICBnZW5lcmF0ZUNTU1J1bGVzZXQoXCIuYmxhaDpob3ZlclwiLCB7IGNvbG9yOiBcInJlZFwiIH0pXG4gKiAgICAtPiBcIi5ibGFoOmhvdmVye2NvbG9yOiByZWR9XCJcbiAqL1xudmFyIGdlbmVyYXRlQ1NTUnVsZXNldCA9IGZ1bmN0aW9uIGdlbmVyYXRlQ1NTUnVsZXNldChzZWxlY3RvciwgZGVjbGFyYXRpb25zLCBzdHJpbmdIYW5kbGVycywgdXNlSW1wb3J0YW50KSB7XG4gICAgdmFyIGhhbmRsZWREZWNsYXJhdGlvbnMgPSBydW5TdHJpbmdIYW5kbGVycyhkZWNsYXJhdGlvbnMsIHN0cmluZ0hhbmRsZXJzKTtcblxuICAgIHZhciBwcmVmaXhlZERlY2xhcmF0aW9ucyA9ICgwLCBfaW5saW5lU3R5bGVQcmVmaXhlclN0YXRpYzJbJ2RlZmF1bHQnXSkoaGFuZGxlZERlY2xhcmF0aW9ucyk7XG5cbiAgICB2YXIgcHJlZml4ZWRSdWxlcyA9ICgwLCBfdXRpbC5mbGF0dGVuKSgoMCwgX3V0aWwub2JqZWN0VG9QYWlycykocHJlZml4ZWREZWNsYXJhdGlvbnMpLm1hcChmdW5jdGlvbiAoX3JlZikge1xuICAgICAgICB2YXIgX3JlZjIgPSBfc2xpY2VkVG9BcnJheShfcmVmLCAyKTtcblxuICAgICAgICB2YXIga2V5ID0gX3JlZjJbMF07XG4gICAgICAgIHZhciB2YWx1ZSA9IF9yZWYyWzFdO1xuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgdmFyIF9yZXQgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIC8vIGlubGluZS1zdHlsZS1wcmVmaXgtYWxsIHJldHVybnMgYW4gYXJyYXkgd2hlbiB0aGVyZSBzaG91bGQgYmVcbiAgICAgICAgICAgICAgICAvLyBtdWx0aXBsZSBydWxlcywgd2Ugd2lsbCBmbGF0dGVuIHRvIHNpbmdsZSBydWxlc1xuXG4gICAgICAgICAgICAgICAgdmFyIHByZWZpeGVkVmFsdWVzID0gW107XG4gICAgICAgICAgICAgICAgdmFyIHVucHJlZml4ZWRWYWx1ZXMgPSBbXTtcblxuICAgICAgICAgICAgICAgIHZhbHVlLmZvckVhY2goZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHYuaW5kZXhPZignLScpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVmaXhlZFZhbHVlcy5wdXNoKHYpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdW5wcmVmaXhlZFZhbHVlcy5wdXNoKHYpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBwcmVmaXhlZFZhbHVlcy5zb3J0KCk7XG4gICAgICAgICAgICAgICAgdW5wcmVmaXhlZFZhbHVlcy5zb3J0KCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB2OiBwcmVmaXhlZFZhbHVlcy5jb25jYXQodW5wcmVmaXhlZFZhbHVlcykubWFwKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW2tleSwgdl07XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pKCk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgX3JldCA9PT0gJ29iamVjdCcpIHJldHVybiBfcmV0LnY7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtba2V5LCB2YWx1ZV1dO1xuICAgIH0pKTtcblxuICAgIHZhciBydWxlcyA9IHByZWZpeGVkUnVsZXMubWFwKGZ1bmN0aW9uIChfcmVmMykge1xuICAgICAgICB2YXIgX3JlZjMyID0gX3NsaWNlZFRvQXJyYXkoX3JlZjMsIDIpO1xuXG4gICAgICAgIHZhciBrZXkgPSBfcmVmMzJbMF07XG4gICAgICAgIHZhciB2YWx1ZSA9IF9yZWYzMlsxXTtcblxuICAgICAgICB2YXIgc3RyaW5nVmFsdWUgPSAoMCwgX3V0aWwuc3RyaW5naWZ5VmFsdWUpKGtleSwgdmFsdWUpO1xuICAgICAgICB2YXIgcmV0ID0gKDAsIF91dGlsLmtlYmFiaWZ5U3R5bGVOYW1lKShrZXkpICsgJzonICsgc3RyaW5nVmFsdWUgKyAnOyc7XG4gICAgICAgIHJldHVybiB1c2VJbXBvcnRhbnQgPT09IGZhbHNlID8gcmV0IDogKDAsIF91dGlsLmltcG9ydGFudGlmeSkocmV0KTtcbiAgICB9KS5qb2luKFwiXCIpO1xuXG4gICAgaWYgKHJ1bGVzKSB7XG4gICAgICAgIHJldHVybiBzZWxlY3RvciArICd7JyArIHJ1bGVzICsgJ30nO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cbn07XG5leHBvcnRzLmdlbmVyYXRlQ1NTUnVsZXNldCA9IGdlbmVyYXRlQ1NTUnVsZXNldDsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfc2xpY2VkVG9BcnJheSA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIHNsaWNlSXRlcmF0b3IoYXJyLCBpKSB7IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX2UgPSB1bmRlZmluZWQ7IHRyeSB7IGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pWydyZXR1cm4nXSkgX2lbJ3JldHVybiddKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfSByZXR1cm4gZnVuY3Rpb24gKGFyciwgaSkgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7IHJldHVybiBhcnI7IH0gZWxzZSBpZiAoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSB7IHJldHVybiBzbGljZUl0ZXJhdG9yKGFyciwgaSk7IH0gZWxzZSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UnKTsgfSB9OyB9KSgpO1xuXG52YXIgX3V0aWwgPSByZXF1aXJlKCcuL3V0aWwnKTtcblxudmFyIF9pbmplY3QgPSByZXF1aXJlKCcuL2luamVjdCcpO1xuXG52YXIgU3R5bGVTaGVldCA9IHtcbiAgICBjcmVhdGU6IGZ1bmN0aW9uIGNyZWF0ZShzaGVldERlZmluaXRpb24pIHtcbiAgICAgICAgcmV0dXJuICgwLCBfdXRpbC5tYXBPYmopKHNoZWV0RGVmaW5pdGlvbiwgZnVuY3Rpb24gKF9yZWYpIHtcbiAgICAgICAgICAgIHZhciBfcmVmMiA9IF9zbGljZWRUb0FycmF5KF9yZWYsIDIpO1xuXG4gICAgICAgICAgICB2YXIga2V5ID0gX3JlZjJbMF07XG4gICAgICAgICAgICB2YXIgdmFsID0gX3JlZjJbMV07XG5cbiAgICAgICAgICAgIHJldHVybiBba2V5LCB7XG4gICAgICAgICAgICAgICAgLy8gVE9ETyhlbWlseSk6IE1ha2UgYSAncHJvZHVjdGlvbicgbW9kZSB3aGljaCBkb2Vzbid0IHByZXBlbmRcbiAgICAgICAgICAgICAgICAvLyB0aGUgY2xhc3MgbmFtZSBoZXJlLCB0byBtYWtlIHRoZSBnZW5lcmF0ZWQgQ1NTIHNtYWxsZXIuXG4gICAgICAgICAgICAgICAgX25hbWU6IGtleSArICdfJyArICgwLCBfdXRpbC5oYXNoT2JqZWN0KSh2YWwpLFxuICAgICAgICAgICAgICAgIF9kZWZpbml0aW9uOiB2YWxcbiAgICAgICAgICAgIH1dO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgcmVoeWRyYXRlOiBmdW5jdGlvbiByZWh5ZHJhdGUoKSB7XG4gICAgICAgIHZhciByZW5kZXJlZENsYXNzTmFtZXMgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyBbXSA6IGFyZ3VtZW50c1swXTtcblxuICAgICAgICAoMCwgX2luamVjdC5hZGRSZW5kZXJlZENsYXNzTmFtZXMpKHJlbmRlcmVkQ2xhc3NOYW1lcyk7XG4gICAgfVxufTtcblxuLyoqXG4gKiBVdGlsaXRpZXMgZm9yIHVzaW5nIEFwaHJvZGl0ZSBzZXJ2ZXItc2lkZS5cbiAqL1xudmFyIFN0eWxlU2hlZXRTZXJ2ZXIgPSB7XG4gICAgcmVuZGVyU3RhdGljOiBmdW5jdGlvbiByZW5kZXJTdGF0aWMocmVuZGVyRnVuYykge1xuICAgICAgICAoMCwgX2luamVjdC5yZXNldCkoKTtcbiAgICAgICAgKDAsIF9pbmplY3Quc3RhcnRCdWZmZXJpbmcpKCk7XG4gICAgICAgIHZhciBodG1sID0gcmVuZGVyRnVuYygpO1xuICAgICAgICB2YXIgY3NzQ29udGVudCA9ICgwLCBfaW5qZWN0LmZsdXNoVG9TdHJpbmcpKCk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGh0bWw6IGh0bWwsXG4gICAgICAgICAgICBjc3M6IHtcbiAgICAgICAgICAgICAgICBjb250ZW50OiBjc3NDb250ZW50LFxuICAgICAgICAgICAgICAgIHJlbmRlcmVkQ2xhc3NOYW1lczogKDAsIF9pbmplY3QuZ2V0UmVuZGVyZWRDbGFzc05hbWVzKSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxufTtcblxuLyoqXG4gKiBVdGlsaXRpZXMgZm9yIHVzaW5nIEFwaHJvZGl0ZSBpbiB0ZXN0cy5cbiAqXG4gKiBOb3QgbWVhbnQgdG8gYmUgdXNlZCBpbiBwcm9kdWN0aW9uLlxuICovXG52YXIgU3R5bGVTaGVldFRlc3RVdGlscyA9IHtcbiAgICAvKipcbiAgICAgKiBQcmV2ZW50IHN0eWxlcyBmcm9tIGJlaW5nIGluamVjdGVkIGludG8gdGhlIERPTS5cbiAgICAgKlxuICAgICAqIFRoaXMgaXMgdXNlZnVsIGluIHNpdHVhdGlvbnMgd2hlcmUgeW91J2QgbGlrZSB0byB0ZXN0IHJlbmRlcmluZyBVSVxuICAgICAqIGNvbXBvbmVudHMgd2hpY2ggdXNlIEFwaHJvZGl0ZSB3aXRob3V0IGFueSBvZiB0aGUgc2lkZS1lZmZlY3RzIG9mXG4gICAgICogQXBocm9kaXRlIGhhcHBlbmluZy4gUGFydGljdWxhcmx5IHVzZWZ1bCBmb3IgdGVzdGluZyB0aGUgb3V0cHV0IG9mXG4gICAgICogY29tcG9uZW50cyB3aGVuIHlvdSBoYXZlIG5vIERPTSwgZS5nLiB0ZXN0aW5nIGluIE5vZGUgd2l0aG91dCBhIGZha2UgRE9NLlxuICAgICAqXG4gICAgICogU2hvdWxkIGJlIHBhaXJlZCB3aXRoIGEgc3Vic2VxdWVudCBjYWxsIHRvXG4gICAgICogY2xlYXJCdWZmZXJBbmRSZXN1bWVTdHlsZUluamVjdGlvbi5cbiAgICAgKi9cbiAgICBzdXBwcmVzc1N0eWxlSW5qZWN0aW9uOiBmdW5jdGlvbiBzdXBwcmVzc1N0eWxlSW5qZWN0aW9uKCkge1xuICAgICAgICAoMCwgX2luamVjdC5yZXNldCkoKTtcbiAgICAgICAgKDAsIF9pbmplY3Quc3RhcnRCdWZmZXJpbmcpKCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE9wcG9zaXRlIG1ldGhvZCBvZiBwcmV2ZW50U3R5bGVJbmplY3QuXG4gICAgICovXG4gICAgY2xlYXJCdWZmZXJBbmRSZXN1bWVTdHlsZUluamVjdGlvbjogZnVuY3Rpb24gY2xlYXJCdWZmZXJBbmRSZXN1bWVTdHlsZUluamVjdGlvbigpIHtcbiAgICAgICAgKDAsIF9pbmplY3QucmVzZXQpKCk7XG4gICAgfVxufTtcblxudmFyIGNzcyA9IGZ1bmN0aW9uIGNzcygpIHtcbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgc3R5bGVEZWZpbml0aW9ucyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICBzdHlsZURlZmluaXRpb25zW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIHZhciB1c2VJbXBvcnRhbnQgPSB0cnVlOyAvLyBBcHBlbmQgIWltcG9ydGFudCB0byBhbGwgc3R5bGUgZGVmaW5pdGlvbnNcbiAgICByZXR1cm4gKDAsIF9pbmplY3QuaW5qZWN0QW5kR2V0Q2xhc3NOYW1lKSh1c2VJbXBvcnRhbnQsIHN0eWxlRGVmaW5pdGlvbnMpO1xufTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0ge1xuICAgIFN0eWxlU2hlZXQ6IFN0eWxlU2hlZXQsXG4gICAgU3R5bGVTaGVldFNlcnZlcjogU3R5bGVTaGVldFNlcnZlcixcbiAgICBTdHlsZVNoZWV0VGVzdFV0aWxzOiBTdHlsZVNoZWV0VGVzdFV0aWxzLFxuICAgIGNzczogY3NzXG59O1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbnZhciBfYXNhcCA9IHJlcXVpcmUoJ2FzYXAnKTtcblxudmFyIF9hc2FwMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2FzYXApO1xuXG52YXIgX2dlbmVyYXRlID0gcmVxdWlyZSgnLi9nZW5lcmF0ZScpO1xuXG52YXIgX3V0aWwgPSByZXF1aXJlKCcuL3V0aWwnKTtcblxuLy8gVGhlIGN1cnJlbnQgPHN0eWxlPiB0YWcgd2UgYXJlIGluc2VydGluZyBpbnRvLCBvciBudWxsIGlmIHdlIGhhdmVuJ3Rcbi8vIGluc2VydGVkIGFueXRoaW5nIHlldC4gV2UgY291bGQgZmluZCB0aGlzIGVhY2ggdGltZSB1c2luZ1xuLy8gYGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJzdHlsZVtkYXRhLWFwaHJvZGl0ZVwiXSlgLCBidXQgaG9sZGluZyBvbnRvIGl0IGlzXG4vLyBmYXN0ZXIuXG52YXIgc3R5bGVUYWcgPSBudWxsO1xuXG4vLyBJbmplY3QgYSBzdHJpbmcgb2Ygc3R5bGVzIGludG8gYSA8c3R5bGU+IHRhZyBpbiB0aGUgaGVhZCBvZiB0aGUgZG9jdW1lbnQuIFRoaXNcbi8vIHdpbGwgYXV0b21hdGljYWxseSBjcmVhdGUgYSBzdHlsZSB0YWcgYW5kIHRoZW4gY29udGludWUgdG8gdXNlIGl0IGZvclxuLy8gbXVsdGlwbGUgaW5qZWN0aW9ucy4gSXQgd2lsbCBhbHNvIHVzZSBhIHN0eWxlIHRhZyB3aXRoIHRoZSBgZGF0YS1hcGhyb2RpdGVgXG4vLyB0YWcgb24gaXQgaWYgdGhhdCBleGlzdHMgaW4gdGhlIERPTS4gVGhpcyBjb3VsZCBiZSB1c2VkIGZvciBlLmcuIHJldXNpbmcgdGhlXG4vLyBzYW1lIHN0eWxlIHRhZyB0aGF0IHNlcnZlci1zaWRlIHJlbmRlcmluZyBpbnNlcnRzLlxudmFyIGluamVjdFN0eWxlVGFnID0gZnVuY3Rpb24gaW5qZWN0U3R5bGVUYWcoY3NzQ29udGVudHMpIHtcbiAgICBpZiAoc3R5bGVUYWcgPT0gbnVsbCkge1xuICAgICAgICAvLyBUcnkgdG8gZmluZCBhIHN0eWxlIHRhZyB3aXRoIHRoZSBgZGF0YS1hcGhyb2RpdGVgIGF0dHJpYnV0ZSBmaXJzdC5cbiAgICAgICAgc3R5bGVUYWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwic3R5bGVbZGF0YS1hcGhyb2RpdGVdXCIpO1xuXG4gICAgICAgIC8vIElmIHRoYXQgZG9lc24ndCB3b3JrLCBnZW5lcmF0ZSBhIG5ldyBzdHlsZSB0YWcuXG4gICAgICAgIGlmIChzdHlsZVRhZyA9PSBudWxsKSB7XG4gICAgICAgICAgICAvLyBUYWtlbiBmcm9tXG4gICAgICAgICAgICAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzUyNDY5Ni9ob3ctdG8tY3JlYXRlLWEtc3R5bGUtdGFnLXdpdGgtamF2YXNjcmlwdFxuICAgICAgICAgICAgdmFyIGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gICAgICAgICAgICBzdHlsZVRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5cbiAgICAgICAgICAgIHN0eWxlVGFnLnR5cGUgPSAndGV4dC9jc3MnO1xuICAgICAgICAgICAgc3R5bGVUYWcuc2V0QXR0cmlidXRlKFwiZGF0YS1hcGhyb2RpdGVcIiwgXCJcIik7XG4gICAgICAgICAgICBoZWFkLmFwcGVuZENoaWxkKHN0eWxlVGFnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzdHlsZVRhZy5zdHlsZVNoZWV0KSB7XG4gICAgICAgIHN0eWxlVGFnLnN0eWxlU2hlZXQuY3NzVGV4dCArPSBjc3NDb250ZW50cztcbiAgICB9IGVsc2Uge1xuICAgICAgICBzdHlsZVRhZy5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3NDb250ZW50cykpO1xuICAgIH1cbn07XG5cbi8vIEN1c3RvbSBoYW5kbGVycyBmb3Igc3RyaW5naWZ5aW5nIENTUyB2YWx1ZXMgdGhhdCBoYXZlIHNpZGUgZWZmZWN0c1xuLy8gKHN1Y2ggYXMgZm9udEZhbWlseSwgd2hpY2ggY2FuIGNhdXNlIEBmb250LWZhY2UgcnVsZXMgdG8gYmUgaW5qZWN0ZWQpXG52YXIgc3RyaW5nSGFuZGxlcnMgPSB7XG4gICAgLy8gV2l0aCBmb250RmFtaWx5IHdlIGxvb2sgZm9yIG9iamVjdHMgdGhhdCBhcmUgcGFzc2VkIGluIGFuZCBpbnRlcnByZXRcbiAgICAvLyB0aGVtIGFzIEBmb250LWZhY2UgcnVsZXMgdGhhdCB3ZSBuZWVkIHRvIGluamVjdC4gVGhlIHZhbHVlIG9mIGZvbnRGYW1pbHlcbiAgICAvLyBjYW4gZWl0aGVyIGJlIGEgc3RyaW5nIChhcyBub3JtYWwpLCBhbiBvYmplY3QgKGEgc2luZ2xlIGZvbnQgZmFjZSksIG9yXG4gICAgLy8gYW4gYXJyYXkgb2Ygb2JqZWN0cyBhbmQgc3RyaW5ncy5cbiAgICBmb250RmFtaWx5OiBmdW5jdGlvbiBmb250RmFtaWx5KHZhbCkge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsLm1hcChmb250RmFtaWx5KS5qb2luKFwiLFwiKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICBpbmplY3RTdHlsZU9uY2UodmFsLmZvbnRGYW1pbHksIFwiQGZvbnQtZmFjZVwiLCBbdmFsXSwgZmFsc2UpO1xuICAgICAgICAgICAgcmV0dXJuICdcIicgKyB2YWwuZm9udEZhbWlseSArICdcIic7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIFdpdGggYW5pbWF0aW9uTmFtZSB3ZSBsb29rIGZvciBhbiBvYmplY3QgdGhhdCBjb250YWlucyBrZXlmcmFtZXMgYW5kXG4gICAgLy8gaW5qZWN0IHRoZW0gYXMgYW4gYEBrZXlmcmFtZXNgIGJsb2NrLCByZXR1cm5pbmcgYSB1bmlxdWVseSBnZW5lcmF0ZWRcbiAgICAvLyBuYW1lLiBUaGUga2V5ZnJhbWVzIG9iamVjdCBzaG91bGQgbG9vayBsaWtlXG4gICAgLy8gIGFuaW1hdGlvbk5hbWU6IHtcbiAgICAvLyAgICBmcm9tOiB7XG4gICAgLy8gICAgICBsZWZ0OiAwLFxuICAgIC8vICAgICAgdG9wOiAwLFxuICAgIC8vICAgIH0sXG4gICAgLy8gICAgJzUwJSc6IHtcbiAgICAvLyAgICAgIGxlZnQ6IDE1LFxuICAgIC8vICAgICAgdG9wOiA1LFxuICAgIC8vICAgIH0sXG4gICAgLy8gICAgdG86IHtcbiAgICAvLyAgICAgIGxlZnQ6IDIwLFxuICAgIC8vICAgICAgdG9wOiAyMCxcbiAgICAvLyAgICB9XG4gICAgLy8gIH1cbiAgICAvLyBUT0RPKGVtaWx5KTogYHN0cmluZ0hhbmRsZXJzYCBkb2Vzbid0IGxldCB1cyByZW5hbWUgdGhlIGtleSwgc28gSSBoYXZlXG4gICAgLy8gdG8gdXNlIGBhbmltYXRpb25OYW1lYCBoZXJlLiBJbXByb3ZlIHRoYXQgc28gd2UgY2FuIGNhbGwgdGhpc1xuICAgIC8vIGBhbmltYXRpb25gIGluc3RlYWQgb2YgYGFuaW1hdGlvbk5hbWVgLlxuICAgIGFuaW1hdGlvbk5hbWU6IGZ1bmN0aW9uIGFuaW1hdGlvbk5hbWUodmFsKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gR2VuZXJhdGUgYSB1bmlxdWUgbmFtZSBiYXNlZCBvbiB0aGUgaGFzaCBvZiB0aGUgb2JqZWN0LiBXZSBjYW4ndFxuICAgICAgICAvLyBqdXN0IHVzZSB0aGUgaGFzaCBiZWNhdXNlIHRoZSBuYW1lIGNhbid0IHN0YXJ0IHdpdGggYSBudW1iZXIuXG4gICAgICAgIC8vIFRPRE8oZW1pbHkpOiB0aGlzIHByb2JhYmx5IG1ha2VzIGRlYnVnZ2luZyBoYXJkLCBhbGxvdyBhIGN1c3RvbVxuICAgICAgICAvLyBuYW1lP1xuICAgICAgICB2YXIgbmFtZSA9ICdrZXlmcmFtZV8nICsgKDAsIF91dGlsLmhhc2hPYmplY3QpKHZhbCk7XG5cbiAgICAgICAgLy8gU2luY2Uga2V5ZnJhbWVzIG5lZWQgMyBsYXllcnMgb2YgbmVzdGluZywgd2UgdXNlIGBnZW5lcmF0ZUNTU2AgdG9cbiAgICAgICAgLy8gYnVpbGQgdGhlIGlubmVyIGxheWVycyBhbmQgd3JhcCBpdCBpbiBgQGtleWZyYW1lc2Agb3Vyc2VsdmVzLlxuICAgICAgICB2YXIgZmluYWxWYWwgPSAnQGtleWZyYW1lcyAnICsgbmFtZSArICd7JztcbiAgICAgICAgT2JqZWN0LmtleXModmFsKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIGZpbmFsVmFsICs9ICgwLCBfZ2VuZXJhdGUuZ2VuZXJhdGVDU1MpKGtleSwgW3ZhbFtrZXldXSwgc3RyaW5nSGFuZGxlcnMsIGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGZpbmFsVmFsICs9ICd9JztcblxuICAgICAgICBpbmplY3RHZW5lcmF0ZWRDU1NPbmNlKG5hbWUsIGZpbmFsVmFsKTtcblxuICAgICAgICByZXR1cm4gbmFtZTtcbiAgICB9XG59O1xuXG4vLyBUaGlzIGlzIGEgbWFwIGZyb20gQXBocm9kaXRlJ3MgZ2VuZXJhdGVkIGNsYXNzIG5hbWVzIHRvIGB0cnVlYCAoYWN0aW5nIGFzIGFcbi8vIHNldCBvZiBjbGFzcyBuYW1lcylcbnZhciBhbHJlYWR5SW5qZWN0ZWQgPSB7fTtcblxuLy8gVGhpcyBpcyB0aGUgYnVmZmVyIG9mIHN0eWxlcyB3aGljaCBoYXZlIG5vdCB5ZXQgYmVlbiBmbHVzaGVkLlxudmFyIGluamVjdGlvbkJ1ZmZlciA9IFwiXCI7XG5cbi8vIEEgZmxhZyB0byB0ZWxsIGlmIHdlIGFyZSBhbHJlYWR5IGJ1ZmZlcmluZyBzdHlsZXMuIFRoaXMgY291bGQgaGFwcGVuIGVpdGhlclxuLy8gYmVjYXVzZSB3ZSBzY2hlZHVsZWQgYSBmbHVzaCBjYWxsIGFscmVhZHksIHNvIG5ld2x5IGFkZGVkIHN0eWxlcyB3aWxsXG4vLyBhbHJlYWR5IGJlIGZsdXNoZWQsIG9yIGJlY2F1c2Ugd2UgYXJlIHN0YXRpY2FsbHkgYnVmZmVyaW5nIG9uIHRoZSBzZXJ2ZXIuXG52YXIgaXNCdWZmZXJpbmcgPSBmYWxzZTtcblxudmFyIGluamVjdEdlbmVyYXRlZENTU09uY2UgPSBmdW5jdGlvbiBpbmplY3RHZW5lcmF0ZWRDU1NPbmNlKGtleSwgZ2VuZXJhdGVkQ1NTKSB7XG4gICAgaWYgKCFhbHJlYWR5SW5qZWN0ZWRba2V5XSkge1xuICAgICAgICBpZiAoIWlzQnVmZmVyaW5nKSB7XG4gICAgICAgICAgICAvLyBXZSBzaG91bGQgbmV2ZXIgYmUgYXV0b21hdGljYWxseSBidWZmZXJpbmcgb24gdGhlIHNlcnZlciAob3IgYW55XG4gICAgICAgICAgICAvLyBwbGFjZSB3aXRob3V0IGEgZG9jdW1lbnQpLCBzbyBndWFyZCBhZ2FpbnN0IHRoYXQuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGF1dG9tYXRpY2FsbHkgYnVmZmVyIHdpdGhvdXQgYSBkb2N1bWVudFwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gSWYgd2UncmUgbm90IGFscmVhZHkgYnVmZmVyaW5nLCBzY2hlZHVsZSBhIGNhbGwgdG8gZmx1c2ggdGhlXG4gICAgICAgICAgICAvLyBjdXJyZW50IHN0eWxlcy5cbiAgICAgICAgICAgIGlzQnVmZmVyaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICgwLCBfYXNhcDJbJ2RlZmF1bHQnXSkoZmx1c2hUb1N0eWxlVGFnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGluamVjdGlvbkJ1ZmZlciArPSBnZW5lcmF0ZWRDU1M7XG4gICAgICAgIGFscmVhZHlJbmplY3RlZFtrZXldID0gdHJ1ZTtcbiAgICB9XG59O1xuXG52YXIgaW5qZWN0U3R5bGVPbmNlID0gZnVuY3Rpb24gaW5qZWN0U3R5bGVPbmNlKGtleSwgc2VsZWN0b3IsIGRlZmluaXRpb25zLCB1c2VJbXBvcnRhbnQpIHtcbiAgICBpZiAoIWFscmVhZHlJbmplY3RlZFtrZXldKSB7XG4gICAgICAgIHZhciBnZW5lcmF0ZWQgPSAoMCwgX2dlbmVyYXRlLmdlbmVyYXRlQ1NTKShzZWxlY3RvciwgZGVmaW5pdGlvbnMsIHN0cmluZ0hhbmRsZXJzLCB1c2VJbXBvcnRhbnQpO1xuXG4gICAgICAgIGluamVjdEdlbmVyYXRlZENTU09uY2Uoa2V5LCBnZW5lcmF0ZWQpO1xuICAgIH1cbn07XG5cbmV4cG9ydHMuaW5qZWN0U3R5bGVPbmNlID0gaW5qZWN0U3R5bGVPbmNlO1xudmFyIHJlc2V0ID0gZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgaW5qZWN0aW9uQnVmZmVyID0gXCJcIjtcbiAgICBhbHJlYWR5SW5qZWN0ZWQgPSB7fTtcbiAgICBpc0J1ZmZlcmluZyA9IGZhbHNlO1xuICAgIHN0eWxlVGFnID0gbnVsbDtcbn07XG5cbmV4cG9ydHMucmVzZXQgPSByZXNldDtcbnZhciBzdGFydEJ1ZmZlcmluZyA9IGZ1bmN0aW9uIHN0YXJ0QnVmZmVyaW5nKCkge1xuICAgIGlmIChpc0J1ZmZlcmluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgYnVmZmVyIHdoaWxlIGFscmVhZHkgYnVmZmVyaW5nXCIpO1xuICAgIH1cbiAgICBpc0J1ZmZlcmluZyA9IHRydWU7XG59O1xuXG5leHBvcnRzLnN0YXJ0QnVmZmVyaW5nID0gc3RhcnRCdWZmZXJpbmc7XG52YXIgZmx1c2hUb1N0cmluZyA9IGZ1bmN0aW9uIGZsdXNoVG9TdHJpbmcoKSB7XG4gICAgaXNCdWZmZXJpbmcgPSBmYWxzZTtcbiAgICB2YXIgcmV0ID0gaW5qZWN0aW9uQnVmZmVyO1xuICAgIGluamVjdGlvbkJ1ZmZlciA9IFwiXCI7XG4gICAgcmV0dXJuIHJldDtcbn07XG5cbmV4cG9ydHMuZmx1c2hUb1N0cmluZyA9IGZsdXNoVG9TdHJpbmc7XG52YXIgZmx1c2hUb1N0eWxlVGFnID0gZnVuY3Rpb24gZmx1c2hUb1N0eWxlVGFnKCkge1xuICAgIHZhciBjc3NDb250ZW50ID0gZmx1c2hUb1N0cmluZygpO1xuICAgIGlmIChjc3NDb250ZW50Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgaW5qZWN0U3R5bGVUYWcoY3NzQ29udGVudCk7XG4gICAgfVxufTtcblxuZXhwb3J0cy5mbHVzaFRvU3R5bGVUYWcgPSBmbHVzaFRvU3R5bGVUYWc7XG52YXIgZ2V0UmVuZGVyZWRDbGFzc05hbWVzID0gZnVuY3Rpb24gZ2V0UmVuZGVyZWRDbGFzc05hbWVzKCkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhhbHJlYWR5SW5qZWN0ZWQpO1xufTtcblxuZXhwb3J0cy5nZXRSZW5kZXJlZENsYXNzTmFtZXMgPSBnZXRSZW5kZXJlZENsYXNzTmFtZXM7XG52YXIgYWRkUmVuZGVyZWRDbGFzc05hbWVzID0gZnVuY3Rpb24gYWRkUmVuZGVyZWRDbGFzc05hbWVzKGNsYXNzTmFtZXMpIHtcbiAgICBjbGFzc05hbWVzLmZvckVhY2goZnVuY3Rpb24gKGNsYXNzTmFtZSkge1xuICAgICAgICBhbHJlYWR5SW5qZWN0ZWRbY2xhc3NOYW1lXSA9IHRydWU7XG4gICAgfSk7XG59O1xuXG5leHBvcnRzLmFkZFJlbmRlcmVkQ2xhc3NOYW1lcyA9IGFkZFJlbmRlcmVkQ2xhc3NOYW1lcztcbi8qKlxuICogSW5qZWN0IHN0eWxlcyBhc3NvY2lhdGVkIHdpdGggdGhlIHBhc3NlZCBzdHlsZSBkZWZpbml0aW9uIG9iamVjdHMsIGFuZCByZXR1cm5cbiAqIGFuIGFzc29jaWF0ZWQgQ1NTIGNsYXNzIG5hbWUuXG4gKlxuICogQHBhcmFtIHtib29sZWFufSB1c2VJbXBvcnRhbnQgSWYgdHJ1ZSwgd2lsbCBhcHBlbmQgIWltcG9ydGFudCB0byBnZW5lcmF0ZWRcbiAqICAgICBDU1Mgb3V0cHV0LiBlLmcuIHtjb2xvcjogcmVkfSAtPiBcImNvbG9yOiByZWQgIWltcG9ydGFudFwiLlxuICogQHBhcmFtIHtPYmplY3RbXX0gc3R5bGVEZWZpbml0aW9ucyBzdHlsZSBkZWZpbml0aW9uIG9iamVjdHMgYXMgcmV0dXJuZWQgYXNcbiAqICAgICBwcm9wZXJ0aWVzIG9mIHRoZSByZXR1cm4gdmFsdWUgb2YgU3R5bGVTaGVldC5jcmVhdGUoKS5cbiAqL1xudmFyIGluamVjdEFuZEdldENsYXNzTmFtZSA9IGZ1bmN0aW9uIGluamVjdEFuZEdldENsYXNzTmFtZSh1c2VJbXBvcnRhbnQsIHN0eWxlRGVmaW5pdGlvbnMpIHtcbiAgICAvLyBGaWx0ZXIgb3V0IGZhbHN5IHZhbHVlcyBmcm9tIHRoZSBpbnB1dCwgdG8gYWxsb3cgZm9yXG4gICAgLy8gYGNzcyhhLCB0ZXN0ICYmIGMpYFxuICAgIHZhciB2YWxpZERlZmluaXRpb25zID0gc3R5bGVEZWZpbml0aW9ucy5maWx0ZXIoZnVuY3Rpb24gKGRlZikge1xuICAgICAgICByZXR1cm4gZGVmO1xuICAgIH0pO1xuXG4gICAgLy8gQnJlYWsgaWYgdGhlcmUgYXJlbid0IGFueSB2YWxpZCBzdHlsZXMuXG4gICAgaWYgKHZhbGlkRGVmaW5pdGlvbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cblxuICAgIHZhciBjbGFzc05hbWUgPSB2YWxpZERlZmluaXRpb25zLm1hcChmdW5jdGlvbiAocykge1xuICAgICAgICByZXR1cm4gcy5fbmFtZTtcbiAgICB9KS5qb2luKFwiLW9fTy1cIik7XG4gICAgaW5qZWN0U3R5bGVPbmNlKGNsYXNzTmFtZSwgJy4nICsgY2xhc3NOYW1lLCB2YWxpZERlZmluaXRpb25zLm1hcChmdW5jdGlvbiAoZCkge1xuICAgICAgICByZXR1cm4gZC5fZGVmaW5pdGlvbjtcbiAgICB9KSwgdXNlSW1wb3J0YW50KTtcblxuICAgIHJldHVybiBjbGFzc05hbWU7XG59O1xuZXhwb3J0cy5pbmplY3RBbmRHZXRDbGFzc05hbWUgPSBpbmplY3RBbmRHZXRDbGFzc05hbWU7IiwiLy8gTW9kdWxlIHdpdGggdGhlIHNhbWUgaW50ZXJmYWNlIGFzIHRoZSBjb3JlIGFwaHJvZGl0ZSBtb2R1bGUsXG4vLyBleGNlcHQgdGhhdCBzdHlsZXMgaW5qZWN0ZWQgZG8gbm90IGF1dG9tYXRpY2FsbHkgaGF2ZSAhaW1wb3J0YW50XG4vLyBhcHBlbmRlZCB0byB0aGVtLlxuLy9cbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9pbmplY3QgPSByZXF1aXJlKCcuL2luamVjdCcpO1xuXG52YXIgX2luZGV4SnMgPSByZXF1aXJlKCcuL2luZGV4LmpzJyk7XG5cbnZhciBjc3MgPSBmdW5jdGlvbiBjc3MoKSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIHN0eWxlRGVmaW5pdGlvbnMgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgc3R5bGVEZWZpbml0aW9uc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICB2YXIgdXNlSW1wb3J0YW50ID0gZmFsc2U7IC8vIERvbid0IGFwcGVuZCAhaW1wb3J0YW50IHRvIHN0eWxlIGRlZmluaXRpb25zXG4gICAgcmV0dXJuICgwLCBfaW5qZWN0LmluamVjdEFuZEdldENsYXNzTmFtZSkodXNlSW1wb3J0YW50LCBzdHlsZURlZmluaXRpb25zKTtcbn07XG5cbmV4cG9ydHMuU3R5bGVTaGVldCA9IF9pbmRleEpzLlN0eWxlU2hlZXQ7XG5leHBvcnRzLlN0eWxlU2hlZXRTZXJ2ZXIgPSBfaW5kZXhKcy5TdHlsZVNoZWV0U2VydmVyO1xuZXhwb3J0cy5TdHlsZVNoZWV0VGVzdFV0aWxzID0gX2luZGV4SnMuU3R5bGVTaGVldFRlc3RVdGlscztcbmV4cG9ydHMuY3NzID0gY3NzOyIsIi8vIHtLMTogVjEsIEsyOiBWMiwgLi4ufSAtPiBbW0sxLCBWMV0sIFtLMiwgVjJdXVxuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3NsaWNlZFRvQXJyYXkgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBzbGljZUl0ZXJhdG9yKGFyciwgaSkgeyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVsncmV0dXJuJ10pIF9pWydyZXR1cm4nXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH0gcmV0dXJuIGZ1bmN0aW9uIChhcnIsIGkpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgeyByZXR1cm4gYXJyOyB9IGVsc2UgaWYgKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkgeyByZXR1cm4gc2xpY2VJdGVyYXRvcihhcnIsIGkpOyB9IGVsc2UgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlJyk7IH0gfTsgfSkoKTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxudmFyIG9iamVjdFRvUGFpcnMgPSBmdW5jdGlvbiBvYmplY3RUb1BhaXJzKG9iaikge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmopLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHJldHVybiBba2V5LCBvYmpba2V5XV07XG4gICAgfSk7XG59O1xuXG5leHBvcnRzLm9iamVjdFRvUGFpcnMgPSBvYmplY3RUb1BhaXJzO1xuLy8gW1tLMSwgVjFdLCBbSzIsIFYyXV0gLT4ge0sxOiBWMSwgSzI6IFYyLCAuLi59XG52YXIgcGFpcnNUb09iamVjdCA9IGZ1bmN0aW9uIHBhaXJzVG9PYmplY3QocGFpcnMpIHtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgcGFpcnMuZm9yRWFjaChmdW5jdGlvbiAoX3JlZikge1xuICAgICAgICB2YXIgX3JlZjIgPSBfc2xpY2VkVG9BcnJheShfcmVmLCAyKTtcblxuICAgICAgICB2YXIga2V5ID0gX3JlZjJbMF07XG4gICAgICAgIHZhciB2YWwgPSBfcmVmMlsxXTtcblxuICAgICAgICByZXN1bHRba2V5XSA9IHZhbDtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblxudmFyIG1hcE9iaiA9IGZ1bmN0aW9uIG1hcE9iaihvYmosIGZuKSB7XG4gICAgcmV0dXJuIHBhaXJzVG9PYmplY3Qob2JqZWN0VG9QYWlycyhvYmopLm1hcChmbikpO1xufTtcblxuZXhwb3J0cy5tYXBPYmogPSBtYXBPYmo7XG4vLyBGbGF0dGVucyBhbiBhcnJheSBvbmUgbGV2ZWxcbi8vIFtbQV0sIFtCLCBDLCBbRF1dXSAtPiBbQSwgQiwgQywgW0RdXVxudmFyIGZsYXR0ZW4gPSBmdW5jdGlvbiBmbGF0dGVuKGxpc3QpIHtcbiAgICByZXR1cm4gbGlzdC5yZWR1Y2UoZnVuY3Rpb24gKG1lbW8sIHgpIHtcbiAgICAgICAgcmV0dXJuIG1lbW8uY29uY2F0KHgpO1xuICAgIH0sIFtdKTtcbn07XG5cbmV4cG9ydHMuZmxhdHRlbiA9IGZsYXR0ZW47XG52YXIgVVBQRVJDQVNFX1JFID0gLyhbQS1aXSkvZztcbnZhciBNU19SRSA9IC9ebXMtLztcblxudmFyIGtlYmFiaWZ5ID0gZnVuY3Rpb24ga2ViYWJpZnkoc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKFVQUEVSQ0FTRV9SRSwgJy0kMScpLnRvTG93ZXJDYXNlKCk7XG59O1xudmFyIGtlYmFiaWZ5U3R5bGVOYW1lID0gZnVuY3Rpb24ga2ViYWJpZnlTdHlsZU5hbWUoc3RyaW5nKSB7XG4gICAgcmV0dXJuIGtlYmFiaWZ5KHN0cmluZykucmVwbGFjZShNU19SRSwgJy1tcy0nKTtcbn07XG5cbmV4cG9ydHMua2ViYWJpZnlTdHlsZU5hbWUgPSBrZWJhYmlmeVN0eWxlTmFtZTtcbnZhciByZWN1cnNpdmVNZXJnZSA9IGZ1bmN0aW9uIHJlY3Vyc2l2ZU1lcmdlKGEsIGIpIHtcbiAgICAvLyBUT0RPKGpsZndvbmcpOiBIYW5kbGUgbWFsZm9ybWVkIGlucHV0IHdoZXJlIGEgYW5kIGIgYXJlIG5vdCB0aGUgc2FtZVxuICAgIC8vIHR5cGUuXG5cbiAgICBpZiAodHlwZW9mIGEgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBiO1xuICAgIH1cblxuICAgIHZhciByZXQgPSBfZXh0ZW5kcyh7fSwgYSk7XG5cbiAgICBPYmplY3Qua2V5cyhiKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgaWYgKHJldC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICByZXRba2V5XSA9IHJlY3Vyc2l2ZU1lcmdlKGFba2V5XSwgYltrZXldKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldFtrZXldID0gYltrZXldO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmV0O1xufTtcblxuZXhwb3J0cy5yZWN1cnNpdmVNZXJnZSA9IHJlY3Vyc2l2ZU1lcmdlO1xuLyoqXG4gKiBDU1MgcHJvcGVydGllcyB3aGljaCBhY2NlcHQgbnVtYmVycyBidXQgYXJlIG5vdCBpbiB1bml0cyBvZiBcInB4XCIuXG4gKiBUYWtlbiBmcm9tIFJlYWN0J3MgQ1NTUHJvcGVydHkuanNcbiAqL1xudmFyIGlzVW5pdGxlc3NOdW1iZXIgPSB7XG4gICAgYW5pbWF0aW9uSXRlcmF0aW9uQ291bnQ6IHRydWUsXG4gICAgYm9yZGVySW1hZ2VPdXRzZXQ6IHRydWUsXG4gICAgYm9yZGVySW1hZ2VTbGljZTogdHJ1ZSxcbiAgICBib3JkZXJJbWFnZVdpZHRoOiB0cnVlLFxuICAgIGJveEZsZXg6IHRydWUsXG4gICAgYm94RmxleEdyb3VwOiB0cnVlLFxuICAgIGJveE9yZGluYWxHcm91cDogdHJ1ZSxcbiAgICBjb2x1bW5Db3VudDogdHJ1ZSxcbiAgICBmbGV4OiB0cnVlLFxuICAgIGZsZXhHcm93OiB0cnVlLFxuICAgIGZsZXhQb3NpdGl2ZTogdHJ1ZSxcbiAgICBmbGV4U2hyaW5rOiB0cnVlLFxuICAgIGZsZXhOZWdhdGl2ZTogdHJ1ZSxcbiAgICBmbGV4T3JkZXI6IHRydWUsXG4gICAgZ3JpZFJvdzogdHJ1ZSxcbiAgICBncmlkQ29sdW1uOiB0cnVlLFxuICAgIGZvbnRXZWlnaHQ6IHRydWUsXG4gICAgbGluZUNsYW1wOiB0cnVlLFxuICAgIGxpbmVIZWlnaHQ6IHRydWUsXG4gICAgb3BhY2l0eTogdHJ1ZSxcbiAgICBvcmRlcjogdHJ1ZSxcbiAgICBvcnBoYW5zOiB0cnVlLFxuICAgIHRhYlNpemU6IHRydWUsXG4gICAgd2lkb3dzOiB0cnVlLFxuICAgIHpJbmRleDogdHJ1ZSxcbiAgICB6b29tOiB0cnVlLFxuXG4gICAgLy8gU1ZHLXJlbGF0ZWQgcHJvcGVydGllc1xuICAgIGZpbGxPcGFjaXR5OiB0cnVlLFxuICAgIGZsb29kT3BhY2l0eTogdHJ1ZSxcbiAgICBzdG9wT3BhY2l0eTogdHJ1ZSxcbiAgICBzdHJva2VEYXNoYXJyYXk6IHRydWUsXG4gICAgc3Ryb2tlRGFzaG9mZnNldDogdHJ1ZSxcbiAgICBzdHJva2VNaXRlcmxpbWl0OiB0cnVlLFxuICAgIHN0cm9rZU9wYWNpdHk6IHRydWUsXG4gICAgc3Ryb2tlV2lkdGg6IHRydWVcbn07XG5cbi8qKlxuICogVGFrZW4gZnJvbSBSZWFjdCdzIENTU1Byb3BlcnR5LmpzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHByZWZpeCB2ZW5kb3Itc3BlY2lmaWMgcHJlZml4LCBlZzogV2Via2l0XG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IHN0eWxlIG5hbWUsIGVnOiB0cmFuc2l0aW9uRHVyYXRpb25cbiAqIEByZXR1cm4ge3N0cmluZ30gc3R5bGUgbmFtZSBwcmVmaXhlZCB3aXRoIGBwcmVmaXhgLCBwcm9wZXJseSBjYW1lbENhc2VkLCBlZzpcbiAqIFdlYmtpdFRyYW5zaXRpb25EdXJhdGlvblxuICovXG5mdW5jdGlvbiBwcmVmaXhLZXkocHJlZml4LCBrZXkpIHtcbiAgICByZXR1cm4gcHJlZml4ICsga2V5LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsga2V5LnN1YnN0cmluZygxKTtcbn1cblxuLyoqXG4gKiBTdXBwb3J0IHN0eWxlIG5hbWVzIHRoYXQgbWF5IGNvbWUgcGFzc2VkIGluIHByZWZpeGVkIGJ5IGFkZGluZyBwZXJtdXRhdGlvbnNcbiAqIG9mIHZlbmRvciBwcmVmaXhlcy5cbiAqIFRha2VuIGZyb20gUmVhY3QncyBDU1NQcm9wZXJ0eS5qc1xuICovXG52YXIgcHJlZml4ZXMgPSBbJ1dlYmtpdCcsICdtcycsICdNb3onLCAnTyddO1xuXG4vLyBVc2luZyBPYmplY3Qua2V5cyBoZXJlLCBvciBlbHNlIHRoZSB2YW5pbGxhIGZvci1pbiBsb29wIG1ha2VzIElFOCBnbyBpbnRvIGFuXG4vLyBpbmZpbml0ZSBsb29wLCBiZWNhdXNlIGl0IGl0ZXJhdGVzIG92ZXIgdGhlIG5ld2x5IGFkZGVkIHByb3BzIHRvby5cbi8vIFRha2VuIGZyb20gUmVhY3QncyBDU1NQcm9wZXJ0eS5qc1xuT2JqZWN0LmtleXMoaXNVbml0bGVzc051bWJlcikuZm9yRWFjaChmdW5jdGlvbiAocHJvcCkge1xuICAgIHByZWZpeGVzLmZvckVhY2goZnVuY3Rpb24gKHByZWZpeCkge1xuICAgICAgICBpc1VuaXRsZXNzTnVtYmVyW3ByZWZpeEtleShwcmVmaXgsIHByb3ApXSA9IGlzVW5pdGxlc3NOdW1iZXJbcHJvcF07XG4gICAgfSk7XG59KTtcblxudmFyIHN0cmluZ2lmeVZhbHVlID0gZnVuY3Rpb24gc3RyaW5naWZ5VmFsdWUoa2V5LCBwcm9wKSB7XG4gICAgaWYgKHR5cGVvZiBwcm9wID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgIGlmIChpc1VuaXRsZXNzTnVtYmVyW2tleV0pIHtcbiAgICAgICAgICAgIHJldHVybiBcIlwiICsgcHJvcDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9wICsgXCJweFwiO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHByb3A7XG4gICAgfVxufTtcblxuZXhwb3J0cy5zdHJpbmdpZnlWYWx1ZSA9IHN0cmluZ2lmeVZhbHVlO1xuLyoqXG4gKiBKUyBJbXBsZW1lbnRhdGlvbiBvZiBNdXJtdXJIYXNoMlxuICpcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzpnYXJ5LmNvdXJ0QGdtYWlsLmNvbVwiPkdhcnkgQ291cnQ8L2E+XG4gKiBAc2VlIGh0dHA6Ly9naXRodWIuY29tL2dhcnljb3VydC9tdXJtdXJoYXNoLWpzXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86YWFwcGxlYnlAZ21haWwuY29tXCI+QXVzdGluIEFwcGxlYnk8L2E+XG4gKiBAc2VlIGh0dHA6Ly9zaXRlcy5nb29nbGUuY29tL3NpdGUvbXVybXVyaGFzaC9cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIEFTQ0lJIG9ubHlcbiAqIEByZXR1cm4ge3N0cmluZ30gQmFzZSAzNiBlbmNvZGVkIGhhc2ggcmVzdWx0XG4gKi9cbmZ1bmN0aW9uIG11cm11cmhhc2gyXzMyX2djKHN0cikge1xuICAgIHZhciBsID0gc3RyLmxlbmd0aDtcbiAgICB2YXIgaCA9IGw7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBrID0gdW5kZWZpbmVkO1xuXG4gICAgd2hpbGUgKGwgPj0gNCkge1xuICAgICAgICBrID0gc3RyLmNoYXJDb2RlQXQoaSkgJiAweGZmIHwgKHN0ci5jaGFyQ29kZUF0KCsraSkgJiAweGZmKSA8PCA4IHwgKHN0ci5jaGFyQ29kZUF0KCsraSkgJiAweGZmKSA8PCAxNiB8IChzdHIuY2hhckNvZGVBdCgrK2kpICYgMHhmZikgPDwgMjQ7XG5cbiAgICAgICAgayA9IChrICYgMHhmZmZmKSAqIDB4NWJkMWU5OTUgKyAoKChrID4+PiAxNikgKiAweDViZDFlOTk1ICYgMHhmZmZmKSA8PCAxNik7XG4gICAgICAgIGsgXj0gayA+Pj4gMjQ7XG4gICAgICAgIGsgPSAoayAmIDB4ZmZmZikgKiAweDViZDFlOTk1ICsgKCgoayA+Pj4gMTYpICogMHg1YmQxZTk5NSAmIDB4ZmZmZikgPDwgMTYpO1xuXG4gICAgICAgIGggPSAoaCAmIDB4ZmZmZikgKiAweDViZDFlOTk1ICsgKCgoaCA+Pj4gMTYpICogMHg1YmQxZTk5NSAmIDB4ZmZmZikgPDwgMTYpIF4gaztcblxuICAgICAgICBsIC09IDQ7XG4gICAgICAgICsraTtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKGwpIHtcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgaCBePSAoc3RyLmNoYXJDb2RlQXQoaSArIDIpICYgMHhmZikgPDwgMTY7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIGggXj0gKHN0ci5jaGFyQ29kZUF0KGkgKyAxKSAmIDB4ZmYpIDw8IDg7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIGggXj0gc3RyLmNoYXJDb2RlQXQoaSkgJiAweGZmO1xuICAgICAgICAgICAgaCA9IChoICYgMHhmZmZmKSAqIDB4NWJkMWU5OTUgKyAoKChoID4+PiAxNikgKiAweDViZDFlOTk1ICYgMHhmZmZmKSA8PCAxNik7XG4gICAgfVxuXG4gICAgaCBePSBoID4+PiAxMztcbiAgICBoID0gKGggJiAweGZmZmYpICogMHg1YmQxZTk5NSArICgoKGggPj4+IDE2KSAqIDB4NWJkMWU5OTUgJiAweGZmZmYpIDw8IDE2KTtcbiAgICBoIF49IGggPj4+IDE1O1xuXG4gICAgcmV0dXJuIChoID4+PiAwKS50b1N0cmluZygzNik7XG59XG5cbi8vIEhhc2ggYSBqYXZhc2NyaXB0IG9iamVjdCB1c2luZyBKU09OLnN0cmluZ2lmeS4gVGhpcyBpcyB2ZXJ5IGZhc3QsIGFib3V0IDNcbi8vIG1pY3Jvc2Vjb25kcyBvbiBteSBjb21wdXRlciBmb3IgYSBzYW1wbGUgb2JqZWN0OlxuLy8gaHR0cDovL2pzcGVyZi5jb20vdGVzdC1oYXNoZm52MzJhLWhhc2gvNVxuLy9cbi8vIE5vdGUgdGhhdCB0aGlzIHVzZXMgSlNPTi5zdHJpbmdpZnkgdG8gc3RyaW5naWZ5IHRoZSBvYmplY3RzIHNvIGluIG9yZGVyIGZvclxuLy8gdGhpcyB0byBwcm9kdWNlIGNvbnNpc3RlbnQgaGFzaGVzIGJyb3dzZXJzIG5lZWQgdG8gaGF2ZSBhIGNvbnNpc3RlbnRcbi8vIG9yZGVyaW5nIG9mIG9iamVjdHMuIEJlbiBBbHBlcnQgc2F5cyB0aGF0IEZhY2Vib29rIGRlcGVuZHMgb24gdGhpcywgc28gd2Vcbi8vIGNhbiBwcm9iYWJseSBkZXBlbmQgb24gdGhpcyB0b28uXG52YXIgaGFzaE9iamVjdCA9IGZ1bmN0aW9uIGhhc2hPYmplY3Qob2JqZWN0KSB7XG4gICAgcmV0dXJuIG11cm11cmhhc2gyXzMyX2djKEpTT04uc3RyaW5naWZ5KG9iamVjdCkpO1xufTtcblxuZXhwb3J0cy5oYXNoT2JqZWN0ID0gaGFzaE9iamVjdDtcbnZhciBJTVBPUlRBTlRfUkUgPSAvXihbXjpdKzouKj8pKCAhaW1wb3J0YW50KT87JC87XG5cbi8vIEdpdmVuIGEgc2luZ2xlIHN0eWxlIHJ1bGUgc3RyaW5nIGxpa2UgXCJhOiBiO1wiLCBhZGRzICFpbXBvcnRhbnQgdG8gZ2VuZXJhdGVcbi8vIFwiYTogYiAhaW1wb3J0YW50O1wiLlxudmFyIGltcG9ydGFudGlmeSA9IGZ1bmN0aW9uIGltcG9ydGFudGlmeShzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoSU1QT1JUQU5UX1JFLCBmdW5jdGlvbiAoXywgYmFzZSwgaW1wb3J0YW50KSB7XG4gICAgICAgIHJldHVybiBiYXNlICsgXCIgIWltcG9ydGFudDtcIjtcbiAgICB9KTtcbn07XG5leHBvcnRzLmltcG9ydGFudGlmeSA9IGltcG9ydGFudGlmeTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL25vLWltcG9ydGFudC5qcycpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vIHJhd0FzYXAgcHJvdmlkZXMgZXZlcnl0aGluZyB3ZSBuZWVkIGV4Y2VwdCBleGNlcHRpb24gbWFuYWdlbWVudC5cbnZhciByYXdBc2FwID0gcmVxdWlyZShcIi4vcmF3XCIpO1xuLy8gUmF3VGFza3MgYXJlIHJlY3ljbGVkIHRvIHJlZHVjZSBHQyBjaHVybi5cbnZhciBmcmVlVGFza3MgPSBbXTtcbi8vIFdlIHF1ZXVlIGVycm9ycyB0byBlbnN1cmUgdGhleSBhcmUgdGhyb3duIGluIHJpZ2h0IG9yZGVyIChGSUZPKS5cbi8vIEFycmF5LWFzLXF1ZXVlIGlzIGdvb2QgZW5vdWdoIGhlcmUsIHNpbmNlIHdlIGFyZSBqdXN0IGRlYWxpbmcgd2l0aCBleGNlcHRpb25zLlxudmFyIHBlbmRpbmdFcnJvcnMgPSBbXTtcbnZhciByZXF1ZXN0RXJyb3JUaHJvdyA9IHJhd0FzYXAubWFrZVJlcXVlc3RDYWxsRnJvbVRpbWVyKHRocm93Rmlyc3RFcnJvcik7XG5cbmZ1bmN0aW9uIHRocm93Rmlyc3RFcnJvcigpIHtcbiAgICBpZiAocGVuZGluZ0Vycm9ycy5sZW5ndGgpIHtcbiAgICAgICAgdGhyb3cgcGVuZGluZ0Vycm9ycy5zaGlmdCgpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBDYWxscyBhIHRhc2sgYXMgc29vbiBhcyBwb3NzaWJsZSBhZnRlciByZXR1cm5pbmcsIGluIGl0cyBvd24gZXZlbnQsIHdpdGggcHJpb3JpdHlcbiAqIG92ZXIgb3RoZXIgZXZlbnRzIGxpa2UgYW5pbWF0aW9uLCByZWZsb3csIGFuZCByZXBhaW50LiBBbiBlcnJvciB0aHJvd24gZnJvbSBhblxuICogZXZlbnQgd2lsbCBub3QgaW50ZXJydXB0LCBub3IgZXZlbiBzdWJzdGFudGlhbGx5IHNsb3cgZG93biB0aGUgcHJvY2Vzc2luZyBvZlxuICogb3RoZXIgZXZlbnRzLCBidXQgd2lsbCBiZSByYXRoZXIgcG9zdHBvbmVkIHRvIGEgbG93ZXIgcHJpb3JpdHkgZXZlbnQuXG4gKiBAcGFyYW0ge3tjYWxsfX0gdGFzayBBIGNhbGxhYmxlIG9iamVjdCwgdHlwaWNhbGx5IGEgZnVuY3Rpb24gdGhhdCB0YWtlcyBub1xuICogYXJndW1lbnRzLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGFzYXA7XG5mdW5jdGlvbiBhc2FwKHRhc2spIHtcbiAgICB2YXIgcmF3VGFzaztcbiAgICBpZiAoZnJlZVRhc2tzLmxlbmd0aCkge1xuICAgICAgICByYXdUYXNrID0gZnJlZVRhc2tzLnBvcCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJhd1Rhc2sgPSBuZXcgUmF3VGFzaygpO1xuICAgIH1cbiAgICByYXdUYXNrLnRhc2sgPSB0YXNrO1xuICAgIHJhd0FzYXAocmF3VGFzayk7XG59XG5cbi8vIFdlIHdyYXAgdGFza3Mgd2l0aCByZWN5Y2xhYmxlIHRhc2sgb2JqZWN0cy4gIEEgdGFzayBvYmplY3QgaW1wbGVtZW50c1xuLy8gYGNhbGxgLCBqdXN0IGxpa2UgYSBmdW5jdGlvbi5cbmZ1bmN0aW9uIFJhd1Rhc2soKSB7XG4gICAgdGhpcy50YXNrID0gbnVsbDtcbn1cblxuLy8gVGhlIHNvbGUgcHVycG9zZSBvZiB3cmFwcGluZyB0aGUgdGFzayBpcyB0byBjYXRjaCB0aGUgZXhjZXB0aW9uIGFuZCByZWN5Y2xlXG4vLyB0aGUgdGFzayBvYmplY3QgYWZ0ZXIgaXRzIHNpbmdsZSB1c2UuXG5SYXdUYXNrLnByb3RvdHlwZS5jYWxsID0gZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIHRoaXMudGFzay5jYWxsKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGFzYXAub25lcnJvcikge1xuICAgICAgICAgICAgLy8gVGhpcyBob29rIGV4aXN0cyBwdXJlbHkgZm9yIHRlc3RpbmcgcHVycG9zZXMuXG4gICAgICAgICAgICAvLyBJdHMgbmFtZSB3aWxsIGJlIHBlcmlvZGljYWxseSByYW5kb21pemVkIHRvIGJyZWFrIGFueSBjb2RlIHRoYXRcbiAgICAgICAgICAgIC8vIGRlcGVuZHMgb24gaXRzIGV4aXN0ZW5jZS5cbiAgICAgICAgICAgIGFzYXAub25lcnJvcihlcnJvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBJbiBhIHdlYiBicm93c2VyLCBleGNlcHRpb25zIGFyZSBub3QgZmF0YWwuIEhvd2V2ZXIsIHRvIGF2b2lkXG4gICAgICAgICAgICAvLyBzbG93aW5nIGRvd24gdGhlIHF1ZXVlIG9mIHBlbmRpbmcgdGFza3MsIHdlIHJldGhyb3cgdGhlIGVycm9yIGluIGFcbiAgICAgICAgICAgIC8vIGxvd2VyIHByaW9yaXR5IHR1cm4uXG4gICAgICAgICAgICBwZW5kaW5nRXJyb3JzLnB1c2goZXJyb3IpO1xuICAgICAgICAgICAgcmVxdWVzdEVycm9yVGhyb3coKTtcbiAgICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICAgIHRoaXMudGFzayA9IG51bGw7XG4gICAgICAgIGZyZWVUYXNrc1tmcmVlVGFza3MubGVuZ3RoXSA9IHRoaXM7XG4gICAgfVxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vLyBVc2UgdGhlIGZhc3Rlc3QgbWVhbnMgcG9zc2libGUgdG8gZXhlY3V0ZSBhIHRhc2sgaW4gaXRzIG93biB0dXJuLCB3aXRoXG4vLyBwcmlvcml0eSBvdmVyIG90aGVyIGV2ZW50cyBpbmNsdWRpbmcgSU8sIGFuaW1hdGlvbiwgcmVmbG93LCBhbmQgcmVkcmF3XG4vLyBldmVudHMgaW4gYnJvd3NlcnMuXG4vL1xuLy8gQW4gZXhjZXB0aW9uIHRocm93biBieSBhIHRhc2sgd2lsbCBwZXJtYW5lbnRseSBpbnRlcnJ1cHQgdGhlIHByb2Nlc3Npbmcgb2Zcbi8vIHN1YnNlcXVlbnQgdGFza3MuIFRoZSBoaWdoZXIgbGV2ZWwgYGFzYXBgIGZ1bmN0aW9uIGVuc3VyZXMgdGhhdCBpZiBhblxuLy8gZXhjZXB0aW9uIGlzIHRocm93biBieSBhIHRhc2ssIHRoYXQgdGhlIHRhc2sgcXVldWUgd2lsbCBjb250aW51ZSBmbHVzaGluZyBhc1xuLy8gc29vbiBhcyBwb3NzaWJsZSwgYnV0IGlmIHlvdSB1c2UgYHJhd0FzYXBgIGRpcmVjdGx5LCB5b3UgYXJlIHJlc3BvbnNpYmxlIHRvXG4vLyBlaXRoZXIgZW5zdXJlIHRoYXQgbm8gZXhjZXB0aW9ucyBhcmUgdGhyb3duIGZyb20geW91ciB0YXNrLCBvciB0byBtYW51YWxseVxuLy8gY2FsbCBgcmF3QXNhcC5yZXF1ZXN0Rmx1c2hgIGlmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24uXG5tb2R1bGUuZXhwb3J0cyA9IHJhd0FzYXA7XG5mdW5jdGlvbiByYXdBc2FwKHRhc2spIHtcbiAgICBpZiAoIXF1ZXVlLmxlbmd0aCkge1xuICAgICAgICByZXF1ZXN0Rmx1c2goKTtcbiAgICAgICAgZmx1c2hpbmcgPSB0cnVlO1xuICAgIH1cbiAgICAvLyBFcXVpdmFsZW50IHRvIHB1c2gsIGJ1dCBhdm9pZHMgYSBmdW5jdGlvbiBjYWxsLlxuICAgIHF1ZXVlW3F1ZXVlLmxlbmd0aF0gPSB0YXNrO1xufVxuXG52YXIgcXVldWUgPSBbXTtcbi8vIE9uY2UgYSBmbHVzaCBoYXMgYmVlbiByZXF1ZXN0ZWQsIG5vIGZ1cnRoZXIgY2FsbHMgdG8gYHJlcXVlc3RGbHVzaGAgYXJlXG4vLyBuZWNlc3NhcnkgdW50aWwgdGhlIG5leHQgYGZsdXNoYCBjb21wbGV0ZXMuXG52YXIgZmx1c2hpbmcgPSBmYWxzZTtcbi8vIGByZXF1ZXN0Rmx1c2hgIGlzIGFuIGltcGxlbWVudGF0aW9uLXNwZWNpZmljIG1ldGhvZCB0aGF0IGF0dGVtcHRzIHRvIGtpY2tcbi8vIG9mZiBhIGBmbHVzaGAgZXZlbnQgYXMgcXVpY2tseSBhcyBwb3NzaWJsZS4gYGZsdXNoYCB3aWxsIGF0dGVtcHQgdG8gZXhoYXVzdFxuLy8gdGhlIGV2ZW50IHF1ZXVlIGJlZm9yZSB5aWVsZGluZyB0byB0aGUgYnJvd3NlcidzIG93biBldmVudCBsb29wLlxudmFyIHJlcXVlc3RGbHVzaDtcbi8vIFRoZSBwb3NpdGlvbiBvZiB0aGUgbmV4dCB0YXNrIHRvIGV4ZWN1dGUgaW4gdGhlIHRhc2sgcXVldWUuIFRoaXMgaXNcbi8vIHByZXNlcnZlZCBiZXR3ZWVuIGNhbGxzIHRvIGBmbHVzaGAgc28gdGhhdCBpdCBjYW4gYmUgcmVzdW1lZCBpZlxuLy8gYSB0YXNrIHRocm93cyBhbiBleGNlcHRpb24uXG52YXIgaW5kZXggPSAwO1xuLy8gSWYgYSB0YXNrIHNjaGVkdWxlcyBhZGRpdGlvbmFsIHRhc2tzIHJlY3Vyc2l2ZWx5LCB0aGUgdGFzayBxdWV1ZSBjYW4gZ3Jvd1xuLy8gdW5ib3VuZGVkLiBUbyBwcmV2ZW50IG1lbW9yeSBleGhhdXN0aW9uLCB0aGUgdGFzayBxdWV1ZSB3aWxsIHBlcmlvZGljYWxseVxuLy8gdHJ1bmNhdGUgYWxyZWFkeS1jb21wbGV0ZWQgdGFza3MuXG52YXIgY2FwYWNpdHkgPSAxMDI0O1xuXG4vLyBUaGUgZmx1c2ggZnVuY3Rpb24gcHJvY2Vzc2VzIGFsbCB0YXNrcyB0aGF0IGhhdmUgYmVlbiBzY2hlZHVsZWQgd2l0aFxuLy8gYHJhd0FzYXBgIHVubGVzcyBhbmQgdW50aWwgb25lIG9mIHRob3NlIHRhc2tzIHRocm93cyBhbiBleGNlcHRpb24uXG4vLyBJZiBhIHRhc2sgdGhyb3dzIGFuIGV4Y2VwdGlvbiwgYGZsdXNoYCBlbnN1cmVzIHRoYXQgaXRzIHN0YXRlIHdpbGwgcmVtYWluXG4vLyBjb25zaXN0ZW50IGFuZCB3aWxsIHJlc3VtZSB3aGVyZSBpdCBsZWZ0IG9mZiB3aGVuIGNhbGxlZCBhZ2Fpbi5cbi8vIEhvd2V2ZXIsIGBmbHVzaGAgZG9lcyBub3QgbWFrZSBhbnkgYXJyYW5nZW1lbnRzIHRvIGJlIGNhbGxlZCBhZ2FpbiBpZiBhblxuLy8gZXhjZXB0aW9uIGlzIHRocm93bi5cbmZ1bmN0aW9uIGZsdXNoKCkge1xuICAgIHdoaWxlIChpbmRleCA8IHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICB2YXIgY3VycmVudEluZGV4ID0gaW5kZXg7XG4gICAgICAgIC8vIEFkdmFuY2UgdGhlIGluZGV4IGJlZm9yZSBjYWxsaW5nIHRoZSB0YXNrLiBUaGlzIGVuc3VyZXMgdGhhdCB3ZSB3aWxsXG4gICAgICAgIC8vIGJlZ2luIGZsdXNoaW5nIG9uIHRoZSBuZXh0IHRhc2sgdGhlIHRhc2sgdGhyb3dzIGFuIGVycm9yLlxuICAgICAgICBpbmRleCA9IGluZGV4ICsgMTtcbiAgICAgICAgcXVldWVbY3VycmVudEluZGV4XS5jYWxsKCk7XG4gICAgICAgIC8vIFByZXZlbnQgbGVha2luZyBtZW1vcnkgZm9yIGxvbmcgY2hhaW5zIG9mIHJlY3Vyc2l2ZSBjYWxscyB0byBgYXNhcGAuXG4gICAgICAgIC8vIElmIHdlIGNhbGwgYGFzYXBgIHdpdGhpbiB0YXNrcyBzY2hlZHVsZWQgYnkgYGFzYXBgLCB0aGUgcXVldWUgd2lsbFxuICAgICAgICAvLyBncm93LCBidXQgdG8gYXZvaWQgYW4gTyhuKSB3YWxrIGZvciBldmVyeSB0YXNrIHdlIGV4ZWN1dGUsIHdlIGRvbid0XG4gICAgICAgIC8vIHNoaWZ0IHRhc2tzIG9mZiB0aGUgcXVldWUgYWZ0ZXIgdGhleSBoYXZlIGJlZW4gZXhlY3V0ZWQuXG4gICAgICAgIC8vIEluc3RlYWQsIHdlIHBlcmlvZGljYWxseSBzaGlmdCAxMDI0IHRhc2tzIG9mZiB0aGUgcXVldWUuXG4gICAgICAgIGlmIChpbmRleCA+IGNhcGFjaXR5KSB7XG4gICAgICAgICAgICAvLyBNYW51YWxseSBzaGlmdCBhbGwgdmFsdWVzIHN0YXJ0aW5nIGF0IHRoZSBpbmRleCBiYWNrIHRvIHRoZVxuICAgICAgICAgICAgLy8gYmVnaW5uaW5nIG9mIHRoZSBxdWV1ZS5cbiAgICAgICAgICAgIGZvciAodmFyIHNjYW4gPSAwLCBuZXdMZW5ndGggPSBxdWV1ZS5sZW5ndGggLSBpbmRleDsgc2NhbiA8IG5ld0xlbmd0aDsgc2NhbisrKSB7XG4gICAgICAgICAgICAgICAgcXVldWVbc2Nhbl0gPSBxdWV1ZVtzY2FuICsgaW5kZXhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcXVldWUubGVuZ3RoIC09IGluZGV4O1xuICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLmxlbmd0aCA9IDA7XG4gICAgaW5kZXggPSAwO1xuICAgIGZsdXNoaW5nID0gZmFsc2U7XG59XG5cbi8vIGByZXF1ZXN0Rmx1c2hgIGlzIGltcGxlbWVudGVkIHVzaW5nIGEgc3RyYXRlZ3kgYmFzZWQgb24gZGF0YSBjb2xsZWN0ZWQgZnJvbVxuLy8gZXZlcnkgYXZhaWxhYmxlIFNhdWNlTGFicyBTZWxlbml1bSB3ZWIgZHJpdmVyIHdvcmtlciBhdCB0aW1lIG9mIHdyaXRpbmcuXG4vLyBodHRwczovL2RvY3MuZ29vZ2xlLmNvbS9zcHJlYWRzaGVldHMvZC8xbUctNVVZR3VwNXF4R2RFTVdraFA2QldDejA1M05VYjJFMVFvVVRVMTZ1QS9lZGl0I2dpZD03ODM3MjQ1OTNcblxuLy8gU2FmYXJpIDYgYW5kIDYuMSBmb3IgZGVza3RvcCwgaVBhZCwgYW5kIGlQaG9uZSBhcmUgdGhlIG9ubHkgYnJvd3NlcnMgdGhhdFxuLy8gaGF2ZSBXZWJLaXRNdXRhdGlvbk9ic2VydmVyIGJ1dCBub3QgdW4tcHJlZml4ZWQgTXV0YXRpb25PYnNlcnZlci5cbi8vIE11c3QgdXNlIGBnbG9iYWxgIGluc3RlYWQgb2YgYHdpbmRvd2AgdG8gd29yayBpbiBib3RoIGZyYW1lcyBhbmQgd2ViXG4vLyB3b3JrZXJzLiBgZ2xvYmFsYCBpcyBhIHByb3Zpc2lvbiBvZiBCcm93c2VyaWZ5LCBNciwgTXJzLCBvciBNb3AuXG52YXIgQnJvd3Nlck11dGF0aW9uT2JzZXJ2ZXIgPSBnbG9iYWwuTXV0YXRpb25PYnNlcnZlciB8fCBnbG9iYWwuV2ViS2l0TXV0YXRpb25PYnNlcnZlcjtcblxuLy8gTXV0YXRpb25PYnNlcnZlcnMgYXJlIGRlc2lyYWJsZSBiZWNhdXNlIHRoZXkgaGF2ZSBoaWdoIHByaW9yaXR5IGFuZCB3b3JrXG4vLyByZWxpYWJseSBldmVyeXdoZXJlIHRoZXkgYXJlIGltcGxlbWVudGVkLlxuLy8gVGhleSBhcmUgaW1wbGVtZW50ZWQgaW4gYWxsIG1vZGVybiBicm93c2Vycy5cbi8vXG4vLyAtIEFuZHJvaWQgNC00LjNcbi8vIC0gQ2hyb21lIDI2LTM0XG4vLyAtIEZpcmVmb3ggMTQtMjlcbi8vIC0gSW50ZXJuZXQgRXhwbG9yZXIgMTFcbi8vIC0gaVBhZCBTYWZhcmkgNi03LjFcbi8vIC0gaVBob25lIFNhZmFyaSA3LTcuMVxuLy8gLSBTYWZhcmkgNi03XG5pZiAodHlwZW9mIEJyb3dzZXJNdXRhdGlvbk9ic2VydmVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICByZXF1ZXN0Rmx1c2ggPSBtYWtlUmVxdWVzdENhbGxGcm9tTXV0YXRpb25PYnNlcnZlcihmbHVzaCk7XG5cbi8vIE1lc3NhZ2VDaGFubmVscyBhcmUgZGVzaXJhYmxlIGJlY2F1c2UgdGhleSBnaXZlIGRpcmVjdCBhY2Nlc3MgdG8gdGhlIEhUTUxcbi8vIHRhc2sgcXVldWUsIGFyZSBpbXBsZW1lbnRlZCBpbiBJbnRlcm5ldCBFeHBsb3JlciAxMCwgU2FmYXJpIDUuMC0xLCBhbmQgT3BlcmFcbi8vIDExLTEyLCBhbmQgaW4gd2ViIHdvcmtlcnMgaW4gbWFueSBlbmdpbmVzLlxuLy8gQWx0aG91Z2ggbWVzc2FnZSBjaGFubmVscyB5aWVsZCB0byBhbnkgcXVldWVkIHJlbmRlcmluZyBhbmQgSU8gdGFza3MsIHRoZXlcbi8vIHdvdWxkIGJlIGJldHRlciB0aGFuIGltcG9zaW5nIHRoZSA0bXMgZGVsYXkgb2YgdGltZXJzLlxuLy8gSG93ZXZlciwgdGhleSBkbyBub3Qgd29yayByZWxpYWJseSBpbiBJbnRlcm5ldCBFeHBsb3JlciBvciBTYWZhcmkuXG5cbi8vIEludGVybmV0IEV4cGxvcmVyIDEwIGlzIHRoZSBvbmx5IGJyb3dzZXIgdGhhdCBoYXMgc2V0SW1tZWRpYXRlIGJ1dCBkb2VzXG4vLyBub3QgaGF2ZSBNdXRhdGlvbk9ic2VydmVycy5cbi8vIEFsdGhvdWdoIHNldEltbWVkaWF0ZSB5aWVsZHMgdG8gdGhlIGJyb3dzZXIncyByZW5kZXJlciwgaXQgd291bGQgYmVcbi8vIHByZWZlcnJhYmxlIHRvIGZhbGxpbmcgYmFjayB0byBzZXRUaW1lb3V0IHNpbmNlIGl0IGRvZXMgbm90IGhhdmVcbi8vIHRoZSBtaW5pbXVtIDRtcyBwZW5hbHR5LlxuLy8gVW5mb3J0dW5hdGVseSB0aGVyZSBhcHBlYXJzIHRvIGJlIGEgYnVnIGluIEludGVybmV0IEV4cGxvcmVyIDEwIE1vYmlsZSAoYW5kXG4vLyBEZXNrdG9wIHRvIGEgbGVzc2VyIGV4dGVudCkgdGhhdCByZW5kZXJzIGJvdGggc2V0SW1tZWRpYXRlIGFuZFxuLy8gTWVzc2FnZUNoYW5uZWwgdXNlbGVzcyBmb3IgdGhlIHB1cnBvc2VzIG9mIEFTQVAuXG4vLyBodHRwczovL2dpdGh1Yi5jb20va3Jpc2tvd2FsL3EvaXNzdWVzLzM5NlxuXG4vLyBUaW1lcnMgYXJlIGltcGxlbWVudGVkIHVuaXZlcnNhbGx5LlxuLy8gV2UgZmFsbCBiYWNrIHRvIHRpbWVycyBpbiB3b3JrZXJzIGluIG1vc3QgZW5naW5lcywgYW5kIGluIGZvcmVncm91bmRcbi8vIGNvbnRleHRzIGluIHRoZSBmb2xsb3dpbmcgYnJvd3NlcnMuXG4vLyBIb3dldmVyLCBub3RlIHRoYXQgZXZlbiB0aGlzIHNpbXBsZSBjYXNlIHJlcXVpcmVzIG51YW5jZXMgdG8gb3BlcmF0ZSBpbiBhXG4vLyBicm9hZCBzcGVjdHJ1bSBvZiBicm93c2Vycy5cbi8vXG4vLyAtIEZpcmVmb3ggMy0xM1xuLy8gLSBJbnRlcm5ldCBFeHBsb3JlciA2LTlcbi8vIC0gaVBhZCBTYWZhcmkgNC4zXG4vLyAtIEx5bnggMi44Ljdcbn0gZWxzZSB7XG4gICAgcmVxdWVzdEZsdXNoID0gbWFrZVJlcXVlc3RDYWxsRnJvbVRpbWVyKGZsdXNoKTtcbn1cblxuLy8gYHJlcXVlc3RGbHVzaGAgcmVxdWVzdHMgdGhhdCB0aGUgaGlnaCBwcmlvcml0eSBldmVudCBxdWV1ZSBiZSBmbHVzaGVkIGFzXG4vLyBzb29uIGFzIHBvc3NpYmxlLlxuLy8gVGhpcyBpcyB1c2VmdWwgdG8gcHJldmVudCBhbiBlcnJvciB0aHJvd24gaW4gYSB0YXNrIGZyb20gc3RhbGxpbmcgdGhlIGV2ZW50XG4vLyBxdWV1ZSBpZiB0aGUgZXhjZXB0aW9uIGhhbmRsZWQgYnkgTm9kZS5qc+KAmXNcbi8vIGBwcm9jZXNzLm9uKFwidW5jYXVnaHRFeGNlcHRpb25cIilgIG9yIGJ5IGEgZG9tYWluLlxucmF3QXNhcC5yZXF1ZXN0Rmx1c2ggPSByZXF1ZXN0Rmx1c2g7XG5cbi8vIFRvIHJlcXVlc3QgYSBoaWdoIHByaW9yaXR5IGV2ZW50LCB3ZSBpbmR1Y2UgYSBtdXRhdGlvbiBvYnNlcnZlciBieSB0b2dnbGluZ1xuLy8gdGhlIHRleHQgb2YgYSB0ZXh0IG5vZGUgYmV0d2VlbiBcIjFcIiBhbmQgXCItMVwiLlxuZnVuY3Rpb24gbWFrZVJlcXVlc3RDYWxsRnJvbU11dGF0aW9uT2JzZXJ2ZXIoY2FsbGJhY2spIHtcbiAgICB2YXIgdG9nZ2xlID0gMTtcbiAgICB2YXIgb2JzZXJ2ZXIgPSBuZXcgQnJvd3Nlck11dGF0aW9uT2JzZXJ2ZXIoY2FsbGJhY2spO1xuICAgIHZhciBub2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJcIik7XG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZShub2RlLCB7Y2hhcmFjdGVyRGF0YTogdHJ1ZX0pO1xuICAgIHJldHVybiBmdW5jdGlvbiByZXF1ZXN0Q2FsbCgpIHtcbiAgICAgICAgdG9nZ2xlID0gLXRvZ2dsZTtcbiAgICAgICAgbm9kZS5kYXRhID0gdG9nZ2xlO1xuICAgIH07XG59XG5cbi8vIFRoZSBtZXNzYWdlIGNoYW5uZWwgdGVjaG5pcXVlIHdhcyBkaXNjb3ZlcmVkIGJ5IE1hbHRlIFVibCBhbmQgd2FzIHRoZVxuLy8gb3JpZ2luYWwgZm91bmRhdGlvbiBmb3IgdGhpcyBsaWJyYXJ5LlxuLy8gaHR0cDovL3d3dy5ub25ibG9ja2luZy5pby8yMDExLzA2L3dpbmRvd25leHR0aWNrLmh0bWxcblxuLy8gU2FmYXJpIDYuMC41IChhdCBsZWFzdCkgaW50ZXJtaXR0ZW50bHkgZmFpbHMgdG8gY3JlYXRlIG1lc3NhZ2UgcG9ydHMgb24gYVxuLy8gcGFnZSdzIGZpcnN0IGxvYWQuIFRoYW5rZnVsbHksIHRoaXMgdmVyc2lvbiBvZiBTYWZhcmkgc3VwcG9ydHNcbi8vIE11dGF0aW9uT2JzZXJ2ZXJzLCBzbyB3ZSBkb24ndCBuZWVkIHRvIGZhbGwgYmFjayBpbiB0aGF0IGNhc2UuXG5cbi8vIGZ1bmN0aW9uIG1ha2VSZXF1ZXN0Q2FsbEZyb21NZXNzYWdlQ2hhbm5lbChjYWxsYmFjaykge1xuLy8gICAgIHZhciBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4vLyAgICAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBjYWxsYmFjaztcbi8vICAgICByZXR1cm4gZnVuY3Rpb24gcmVxdWVzdENhbGwoKSB7XG4vLyAgICAgICAgIGNoYW5uZWwucG9ydDIucG9zdE1lc3NhZ2UoMCk7XG4vLyAgICAgfTtcbi8vIH1cblxuLy8gRm9yIHJlYXNvbnMgZXhwbGFpbmVkIGFib3ZlLCB3ZSBhcmUgYWxzbyB1bmFibGUgdG8gdXNlIGBzZXRJbW1lZGlhdGVgXG4vLyB1bmRlciBhbnkgY2lyY3Vtc3RhbmNlcy5cbi8vIEV2ZW4gaWYgd2Ugd2VyZSwgdGhlcmUgaXMgYW5vdGhlciBidWcgaW4gSW50ZXJuZXQgRXhwbG9yZXIgMTAuXG4vLyBJdCBpcyBub3Qgc3VmZmljaWVudCB0byBhc3NpZ24gYHNldEltbWVkaWF0ZWAgdG8gYHJlcXVlc3RGbHVzaGAgYmVjYXVzZVxuLy8gYHNldEltbWVkaWF0ZWAgbXVzdCBiZSBjYWxsZWQgKmJ5IG5hbWUqIGFuZCB0aGVyZWZvcmUgbXVzdCBiZSB3cmFwcGVkIGluIGFcbi8vIGNsb3N1cmUuXG4vLyBOZXZlciBmb3JnZXQuXG5cbi8vIGZ1bmN0aW9uIG1ha2VSZXF1ZXN0Q2FsbEZyb21TZXRJbW1lZGlhdGUoY2FsbGJhY2spIHtcbi8vICAgICByZXR1cm4gZnVuY3Rpb24gcmVxdWVzdENhbGwoKSB7XG4vLyAgICAgICAgIHNldEltbWVkaWF0ZShjYWxsYmFjayk7XG4vLyAgICAgfTtcbi8vIH1cblxuLy8gU2FmYXJpIDYuMCBoYXMgYSBwcm9ibGVtIHdoZXJlIHRpbWVycyB3aWxsIGdldCBsb3N0IHdoaWxlIHRoZSB1c2VyIGlzXG4vLyBzY3JvbGxpbmcuIFRoaXMgcHJvYmxlbSBkb2VzIG5vdCBpbXBhY3QgQVNBUCBiZWNhdXNlIFNhZmFyaSA2LjAgc3VwcG9ydHNcbi8vIG11dGF0aW9uIG9ic2VydmVycywgc28gdGhhdCBpbXBsZW1lbnRhdGlvbiBpcyB1c2VkIGluc3RlYWQuXG4vLyBIb3dldmVyLCBpZiB3ZSBldmVyIGVsZWN0IHRvIHVzZSB0aW1lcnMgaW4gU2FmYXJpLCB0aGUgcHJldmFsZW50IHdvcmstYXJvdW5kXG4vLyBpcyB0byBhZGQgYSBzY3JvbGwgZXZlbnQgbGlzdGVuZXIgdGhhdCBjYWxscyBmb3IgYSBmbHVzaC5cblxuLy8gYHNldFRpbWVvdXRgIGRvZXMgbm90IGNhbGwgdGhlIHBhc3NlZCBjYWxsYmFjayBpZiB0aGUgZGVsYXkgaXMgbGVzcyB0aGFuXG4vLyBhcHByb3hpbWF0ZWx5IDcgaW4gd2ViIHdvcmtlcnMgaW4gRmlyZWZveCA4IHRocm91Z2ggMTgsIGFuZCBzb21ldGltZXMgbm90XG4vLyBldmVuIHRoZW4uXG5cbmZ1bmN0aW9uIG1ha2VSZXF1ZXN0Q2FsbEZyb21UaW1lcihjYWxsYmFjaykge1xuICAgIHJldHVybiBmdW5jdGlvbiByZXF1ZXN0Q2FsbCgpIHtcbiAgICAgICAgLy8gV2UgZGlzcGF0Y2ggYSB0aW1lb3V0IHdpdGggYSBzcGVjaWZpZWQgZGVsYXkgb2YgMCBmb3IgZW5naW5lcyB0aGF0XG4gICAgICAgIC8vIGNhbiByZWxpYWJseSBhY2NvbW1vZGF0ZSB0aGF0IHJlcXVlc3QuIFRoaXMgd2lsbCB1c3VhbGx5IGJlIHNuYXBwZWRcbiAgICAgICAgLy8gdG8gYSA0IG1pbGlzZWNvbmQgZGVsYXksIGJ1dCBvbmNlIHdlJ3JlIGZsdXNoaW5nLCB0aGVyZSdzIG5vIGRlbGF5XG4gICAgICAgIC8vIGJldHdlZW4gZXZlbnRzLlxuICAgICAgICB2YXIgdGltZW91dEhhbmRsZSA9IHNldFRpbWVvdXQoaGFuZGxlVGltZXIsIDApO1xuICAgICAgICAvLyBIb3dldmVyLCBzaW5jZSB0aGlzIHRpbWVyIGdldHMgZnJlcXVlbnRseSBkcm9wcGVkIGluIEZpcmVmb3hcbiAgICAgICAgLy8gd29ya2Vycywgd2UgZW5saXN0IGFuIGludGVydmFsIGhhbmRsZSB0aGF0IHdpbGwgdHJ5IHRvIGZpcmVcbiAgICAgICAgLy8gYW4gZXZlbnQgMjAgdGltZXMgcGVyIHNlY29uZCB1bnRpbCBpdCBzdWNjZWVkcy5cbiAgICAgICAgdmFyIGludGVydmFsSGFuZGxlID0gc2V0SW50ZXJ2YWwoaGFuZGxlVGltZXIsIDUwKTtcblxuICAgICAgICBmdW5jdGlvbiBoYW5kbGVUaW1lcigpIHtcbiAgICAgICAgICAgIC8vIFdoaWNoZXZlciB0aW1lciBzdWNjZWVkcyB3aWxsIGNhbmNlbCBib3RoIHRpbWVycyBhbmRcbiAgICAgICAgICAgIC8vIGV4ZWN1dGUgdGhlIGNhbGxiYWNrLlxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRIYW5kbGUpO1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbEhhbmRsZSk7XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuLy8gVGhpcyBpcyBmb3IgYGFzYXAuanNgIG9ubHkuXG4vLyBJdHMgbmFtZSB3aWxsIGJlIHBlcmlvZGljYWxseSByYW5kb21pemVkIHRvIGJyZWFrIGFueSBjb2RlIHRoYXQgZGVwZW5kcyBvblxuLy8gaXRzIGV4aXN0ZW5jZS5cbnJhd0FzYXAubWFrZVJlcXVlc3RDYWxsRnJvbVRpbWVyID0gbWFrZVJlcXVlc3RDYWxsRnJvbVRpbWVyO1xuXG4vLyBBU0FQIHdhcyBvcmlnaW5hbGx5IGEgbmV4dFRpY2sgc2hpbSBpbmNsdWRlZCBpbiBRLiBUaGlzIHdhcyBmYWN0b3JlZCBvdXRcbi8vIGludG8gdGhpcyBBU0FQIHBhY2thZ2UuIEl0IHdhcyBsYXRlciBhZGFwdGVkIHRvIFJTVlAgd2hpY2ggbWFkZSBmdXJ0aGVyXG4vLyBhbWVuZG1lbnRzLiBUaGVzZSBkZWNpc2lvbnMsIHBhcnRpY3VsYXJseSB0byBtYXJnaW5hbGl6ZSBNZXNzYWdlQ2hhbm5lbCBhbmRcbi8vIHRvIGNhcHR1cmUgdGhlIE11dGF0aW9uT2JzZXJ2ZXIgaW1wbGVtZW50YXRpb24gaW4gYSBjbG9zdXJlLCB3ZXJlIGludGVncmF0ZWRcbi8vIGJhY2sgaW50byBBU0FQIHByb3Blci5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90aWxkZWlvL3JzdnAuanMvYmxvYi9jZGRmNzIzMjU0NmE5Y2Y4NTg1MjRiNzVjZGU2ZjllZGY3MjYyMGE3L2xpYi9yc3ZwL2FzYXAuanNcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHVwcGVyY2FzZVBhdHRlcm4gPSAvW0EtWl0vZztcbnZhciBtc1BhdHRlcm4gPSAvXm1zLS87XG5cbmZ1bmN0aW9uIGh5cGhlbmF0ZVN0eWxlTmFtZShzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nXG4gICAgICAgIC5yZXBsYWNlKHVwcGVyY2FzZVBhdHRlcm4sICctJCYnKVxuICAgICAgICAudG9Mb3dlckNhc2UoKVxuICAgICAgICAucmVwbGFjZShtc1BhdHRlcm4sICctbXMtJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaHlwaGVuYXRlU3R5bGVOYW1lO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gY2FsYztcblxudmFyIF9qb2luUHJlZml4ZWRWYWx1ZSA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL2pvaW5QcmVmaXhlZFZhbHVlJyk7XG5cbnZhciBfam9pblByZWZpeGVkVmFsdWUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfam9pblByZWZpeGVkVmFsdWUpO1xuXG52YXIgX2lzUHJlZml4ZWRWYWx1ZSA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL2lzUHJlZml4ZWRWYWx1ZScpO1xuXG52YXIgX2lzUHJlZml4ZWRWYWx1ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc1ByZWZpeGVkVmFsdWUpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBjYWxjKHByb3BlcnR5LCB2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiAhKDAsIF9pc1ByZWZpeGVkVmFsdWUyLmRlZmF1bHQpKHZhbHVlKSAmJiB2YWx1ZS5pbmRleE9mKCdjYWxjKCcpID4gLTEpIHtcbiAgICByZXR1cm4gKDAsIF9qb2luUHJlZml4ZWRWYWx1ZTIuZGVmYXVsdCkocHJvcGVydHksIHZhbHVlLCBmdW5jdGlvbiAocHJlZml4LCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoL2NhbGNcXCgvZywgcHJlZml4ICsgJ2NhbGMoJyk7XG4gICAgfSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGN1cnNvcjtcblxudmFyIF9qb2luUHJlZml4ZWRWYWx1ZSA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL2pvaW5QcmVmaXhlZFZhbHVlJyk7XG5cbnZhciBfam9pblByZWZpeGVkVmFsdWUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfam9pblByZWZpeGVkVmFsdWUpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgdmFsdWVzID0ge1xuICAnem9vbS1pbic6IHRydWUsXG4gICd6b29tLW91dCc6IHRydWUsXG4gIGdyYWI6IHRydWUsXG4gIGdyYWJiaW5nOiB0cnVlXG59O1xuXG5mdW5jdGlvbiBjdXJzb3IocHJvcGVydHksIHZhbHVlKSB7XG4gIGlmIChwcm9wZXJ0eSA9PT0gJ2N1cnNvcicgJiYgdmFsdWVzW3ZhbHVlXSkge1xuICAgIHJldHVybiAoMCwgX2pvaW5QcmVmaXhlZFZhbHVlMi5kZWZhdWx0KShwcm9wZXJ0eSwgdmFsdWUpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBmbGV4O1xudmFyIHZhbHVlcyA9IHsgZmxleDogdHJ1ZSwgJ2lubGluZS1mbGV4JzogdHJ1ZSB9O1xuXG5mdW5jdGlvbiBmbGV4KHByb3BlcnR5LCB2YWx1ZSkge1xuICBpZiAocHJvcGVydHkgPT09ICdkaXNwbGF5JyAmJiB2YWx1ZXNbdmFsdWVdKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGRpc3BsYXk6IFsnLXdlYmtpdC1ib3gnLCAnLW1vei1ib3gnLCAnLW1zLScgKyB2YWx1ZSArICdib3gnLCAnLXdlYmtpdC0nICsgdmFsdWUsIHZhbHVlXVxuICAgIH07XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGZsZXhib3hJRTtcblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkgeyBpZiAoa2V5IGluIG9iaikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pOyB9IGVsc2UgeyBvYmpba2V5XSA9IHZhbHVlOyB9IHJldHVybiBvYmo7IH1cblxudmFyIGFsdGVybmF0aXZlVmFsdWVzID0ge1xuICAnc3BhY2UtYXJvdW5kJzogJ2Rpc3RyaWJ1dGUnLFxuICAnc3BhY2UtYmV0d2Vlbic6ICdqdXN0aWZ5JyxcbiAgJ2ZsZXgtc3RhcnQnOiAnc3RhcnQnLFxuICAnZmxleC1lbmQnOiAnZW5kJ1xufTtcbnZhciBhbHRlcm5hdGl2ZVByb3BzID0ge1xuICBhbGlnbkNvbnRlbnQ6ICdtc0ZsZXhMaW5lUGFjaycsXG4gIGFsaWduU2VsZjogJ21zRmxleEl0ZW1BbGlnbicsXG4gIGFsaWduSXRlbXM6ICdtc0ZsZXhBbGlnbicsXG4gIGp1c3RpZnlDb250ZW50OiAnbXNGbGV4UGFjaycsXG4gIG9yZGVyOiAnbXNGbGV4T3JkZXInLFxuICBmbGV4R3JvdzogJ21zRmxleFBvc2l0aXZlJyxcbiAgZmxleFNocmluazogJ21zRmxleE5lZ2F0aXZlJyxcbiAgZmxleEJhc2lzOiAnbXNQcmVmZXJyZWRTaXplJ1xufTtcblxuZnVuY3Rpb24gZmxleGJveElFKHByb3BlcnR5LCB2YWx1ZSkge1xuICBpZiAoYWx0ZXJuYXRpdmVQcm9wc1twcm9wZXJ0eV0pIHtcbiAgICByZXR1cm4gX2RlZmluZVByb3BlcnR5KHt9LCBhbHRlcm5hdGl2ZVByb3BzW3Byb3BlcnR5XSwgYWx0ZXJuYXRpdmVWYWx1ZXNbdmFsdWVdIHx8IHZhbHVlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gZmxleGJveE9sZDtcblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkgeyBpZiAoa2V5IGluIG9iaikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pOyB9IGVsc2UgeyBvYmpba2V5XSA9IHZhbHVlOyB9IHJldHVybiBvYmo7IH1cblxudmFyIGFsdGVybmF0aXZlVmFsdWVzID0ge1xuICAnc3BhY2UtYXJvdW5kJzogJ2p1c3RpZnknLFxuICAnc3BhY2UtYmV0d2Vlbic6ICdqdXN0aWZ5JyxcbiAgJ2ZsZXgtc3RhcnQnOiAnc3RhcnQnLFxuICAnZmxleC1lbmQnOiAnZW5kJyxcbiAgJ3dyYXAtcmV2ZXJzZSc6ICdtdWx0aXBsZScsXG4gIHdyYXA6ICdtdWx0aXBsZSdcbn07XG5cbnZhciBhbHRlcm5hdGl2ZVByb3BzID0ge1xuICBhbGlnbkl0ZW1zOiAnV2Via2l0Qm94QWxpZ24nLFxuICBqdXN0aWZ5Q29udGVudDogJ1dlYmtpdEJveFBhY2snLFxuICBmbGV4V3JhcDogJ1dlYmtpdEJveExpbmVzJ1xufTtcblxuZnVuY3Rpb24gZmxleGJveE9sZChwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgaWYgKHByb3BlcnR5ID09PSAnZmxleERpcmVjdGlvbicpIHtcbiAgICByZXR1cm4ge1xuICAgICAgV2Via2l0Qm94T3JpZW50OiB2YWx1ZS5pbmRleE9mKCdjb2x1bW4nKSA+IC0xID8gJ3ZlcnRpY2FsJyA6ICdob3Jpem9udGFsJyxcbiAgICAgIFdlYmtpdEJveERpcmVjdGlvbjogdmFsdWUuaW5kZXhPZigncmV2ZXJzZScpID4gLTEgPyAncmV2ZXJzZScgOiAnbm9ybWFsJ1xuICAgIH07XG4gIH1cbiAgaWYgKGFsdGVybmF0aXZlUHJvcHNbcHJvcGVydHldKSB7XG4gICAgcmV0dXJuIF9kZWZpbmVQcm9wZXJ0eSh7fSwgYWx0ZXJuYXRpdmVQcm9wc1twcm9wZXJ0eV0sIGFsdGVybmF0aXZlVmFsdWVzW3ZhbHVlXSB8fCB2YWx1ZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGdyYWRpZW50O1xuXG52YXIgX2pvaW5QcmVmaXhlZFZhbHVlID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvam9pblByZWZpeGVkVmFsdWUnKTtcblxudmFyIF9qb2luUHJlZml4ZWRWYWx1ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9qb2luUHJlZml4ZWRWYWx1ZSk7XG5cbnZhciBfaXNQcmVmaXhlZFZhbHVlID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvaXNQcmVmaXhlZFZhbHVlJyk7XG5cbnZhciBfaXNQcmVmaXhlZFZhbHVlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzUHJlZml4ZWRWYWx1ZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciB2YWx1ZXMgPSAvbGluZWFyLWdyYWRpZW50fHJhZGlhbC1ncmFkaWVudHxyZXBlYXRpbmctbGluZWFyLWdyYWRpZW50fHJlcGVhdGluZy1yYWRpYWwtZ3JhZGllbnQvO1xuXG5mdW5jdGlvbiBncmFkaWVudChwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgISgwLCBfaXNQcmVmaXhlZFZhbHVlMi5kZWZhdWx0KSh2YWx1ZSkgJiYgdmFsdWUubWF0Y2godmFsdWVzKSAhPT0gbnVsbCkge1xuICAgIHJldHVybiAoMCwgX2pvaW5QcmVmaXhlZFZhbHVlMi5kZWZhdWx0KShwcm9wZXJ0eSwgdmFsdWUpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBzaXppbmc7XG5cbnZhciBfam9pblByZWZpeGVkVmFsdWUgPSByZXF1aXJlKCcuLi8uLi91dGlscy9qb2luUHJlZml4ZWRWYWx1ZScpO1xuXG52YXIgX2pvaW5QcmVmaXhlZFZhbHVlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2pvaW5QcmVmaXhlZFZhbHVlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIHByb3BlcnRpZXMgPSB7XG4gIG1heEhlaWdodDogdHJ1ZSxcbiAgbWF4V2lkdGg6IHRydWUsXG4gIHdpZHRoOiB0cnVlLFxuICBoZWlnaHQ6IHRydWUsXG4gIGNvbHVtbldpZHRoOiB0cnVlLFxuICBtaW5XaWR0aDogdHJ1ZSxcbiAgbWluSGVpZ2h0OiB0cnVlXG59O1xudmFyIHZhbHVlcyA9IHtcbiAgJ21pbi1jb250ZW50JzogdHJ1ZSxcbiAgJ21heC1jb250ZW50JzogdHJ1ZSxcbiAgJ2ZpbGwtYXZhaWxhYmxlJzogdHJ1ZSxcbiAgJ2ZpdC1jb250ZW50JzogdHJ1ZSxcbiAgJ2NvbnRhaW4tZmxvYXRzJzogdHJ1ZVxufTtcblxuZnVuY3Rpb24gc2l6aW5nKHByb3BlcnR5LCB2YWx1ZSkge1xuICBpZiAocHJvcGVydGllc1twcm9wZXJ0eV0gJiYgdmFsdWVzW3ZhbHVlXSkge1xuICAgIHJldHVybiAoMCwgX2pvaW5QcmVmaXhlZFZhbHVlMi5kZWZhdWx0KShwcm9wZXJ0eSwgdmFsdWUpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB0cmFuc2l0aW9uO1xuXG52YXIgX2h5cGhlbmF0ZVN0eWxlTmFtZSA9IHJlcXVpcmUoJ2h5cGhlbmF0ZS1zdHlsZS1uYW1lJyk7XG5cbnZhciBfaHlwaGVuYXRlU3R5bGVOYW1lMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2h5cGhlbmF0ZVN0eWxlTmFtZSk7XG5cbnZhciBfY2FwaXRhbGl6ZVN0cmluZyA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL2NhcGl0YWxpemVTdHJpbmcnKTtcblxudmFyIF9jYXBpdGFsaXplU3RyaW5nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NhcGl0YWxpemVTdHJpbmcpO1xuXG52YXIgX2lzUHJlZml4ZWRWYWx1ZSA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL2lzUHJlZml4ZWRWYWx1ZScpO1xuXG52YXIgX2lzUHJlZml4ZWRWYWx1ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc1ByZWZpeGVkVmFsdWUpO1xuXG52YXIgX3ByZWZpeFByb3BzID0gcmVxdWlyZSgnLi4vcHJlZml4UHJvcHMnKTtcblxudmFyIF9wcmVmaXhQcm9wczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wcmVmaXhQcm9wcyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHsgaWYgKGtleSBpbiBvYmopIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7IHZhbHVlOiB2YWx1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSB9KTsgfSBlbHNlIHsgb2JqW2tleV0gPSB2YWx1ZTsgfSByZXR1cm4gb2JqOyB9XG5cbnZhciBwcm9wZXJ0aWVzID0ge1xuICB0cmFuc2l0aW9uOiB0cnVlLFxuICB0cmFuc2l0aW9uUHJvcGVydHk6IHRydWUsXG4gIFdlYmtpdFRyYW5zaXRpb246IHRydWUsXG4gIFdlYmtpdFRyYW5zaXRpb25Qcm9wZXJ0eTogdHJ1ZVxufTtcblxuZnVuY3Rpb24gdHJhbnNpdGlvbihwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgLy8gYWxzbyBjaGVjayBmb3IgYWxyZWFkeSBwcmVmaXhlZCB0cmFuc2l0aW9uc1xuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiBwcm9wZXJ0aWVzW3Byb3BlcnR5XSkge1xuICAgIHZhciBfcmVmMjtcblxuICAgIHZhciBvdXRwdXRWYWx1ZSA9IHByZWZpeFZhbHVlKHZhbHVlKTtcbiAgICB2YXIgd2Via2l0T3V0cHV0ID0gb3V0cHV0VmFsdWUuc3BsaXQoLywoPyFbXigpXSooPzpcXChbXigpXSpcXCkpP1xcKSkvZykuZmlsdGVyKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIHZhbHVlLm1hdGNoKC8tbW96LXwtbXMtLykgPT09IG51bGw7XG4gICAgfSkuam9pbignLCcpO1xuXG4gICAgLy8gaWYgdGhlIHByb3BlcnR5IGlzIGFscmVhZHkgcHJlZml4ZWRcbiAgICBpZiAocHJvcGVydHkuaW5kZXhPZignV2Via2l0JykgPiAtMSkge1xuICAgICAgcmV0dXJuIF9kZWZpbmVQcm9wZXJ0eSh7fSwgcHJvcGVydHksIHdlYmtpdE91dHB1dCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIF9yZWYyID0ge30sIF9kZWZpbmVQcm9wZXJ0eShfcmVmMiwgJ1dlYmtpdCcgKyAoMCwgX2NhcGl0YWxpemVTdHJpbmcyLmRlZmF1bHQpKHByb3BlcnR5KSwgd2Via2l0T3V0cHV0KSwgX2RlZmluZVByb3BlcnR5KF9yZWYyLCBwcm9wZXJ0eSwgb3V0cHV0VmFsdWUpLCBfcmVmMjtcbiAgfVxufVxuXG5mdW5jdGlvbiBwcmVmaXhWYWx1ZSh2YWx1ZSkge1xuICBpZiAoKDAsIF9pc1ByZWZpeGVkVmFsdWUyLmRlZmF1bHQpKHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIC8vIG9ubHkgc3BsaXQgbXVsdGkgdmFsdWVzLCBub3QgY3ViaWMgYmV6aWVyc1xuICB2YXIgbXVsdGlwbGVWYWx1ZXMgPSB2YWx1ZS5zcGxpdCgvLCg/IVteKCldKig/OlxcKFteKCldKlxcKSk/XFwpKS9nKTtcblxuICAvLyBpdGVyYXRlIGVhY2ggc2luZ2xlIHZhbHVlIGFuZCBjaGVjayBmb3IgdHJhbnNpdGlvbmVkIHByb3BlcnRpZXNcbiAgLy8gdGhhdCBuZWVkIHRvIGJlIHByZWZpeGVkIGFzIHdlbGxcbiAgbXVsdGlwbGVWYWx1ZXMuZm9yRWFjaChmdW5jdGlvbiAodmFsLCBpbmRleCkge1xuICAgIG11bHRpcGxlVmFsdWVzW2luZGV4XSA9IE9iamVjdC5rZXlzKF9wcmVmaXhQcm9wczIuZGVmYXVsdCkucmVkdWNlKGZ1bmN0aW9uIChvdXQsIHByZWZpeCkge1xuICAgICAgdmFyIGRhc2hDYXNlUHJlZml4ID0gJy0nICsgcHJlZml4LnRvTG93ZXJDYXNlKCkgKyAnLSc7XG5cbiAgICAgIE9iamVjdC5rZXlzKF9wcmVmaXhQcm9wczIuZGVmYXVsdFtwcmVmaXhdKS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgICAgIHZhciBkYXNoQ2FzZVByb3BlcnR5ID0gKDAsIF9oeXBoZW5hdGVTdHlsZU5hbWUyLmRlZmF1bHQpKHByb3ApO1xuXG4gICAgICAgIGlmICh2YWwuaW5kZXhPZihkYXNoQ2FzZVByb3BlcnR5KSA+IC0xICYmIGRhc2hDYXNlUHJvcGVydHkgIT09ICdvcmRlcicpIHtcbiAgICAgICAgICAvLyBqb2luIGFsbCBwcmVmaXhlcyBhbmQgY3JlYXRlIGEgbmV3IHZhbHVlXG4gICAgICAgICAgb3V0ID0gdmFsLnJlcGxhY2UoZGFzaENhc2VQcm9wZXJ0eSwgZGFzaENhc2VQcmVmaXggKyBkYXNoQ2FzZVByb3BlcnR5KSArICcsJyArIG91dDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gb3V0O1xuICAgIH0sIHZhbCk7XG4gIH0pO1xuXG4gIHJldHVybiBtdWx0aXBsZVZhbHVlcy5qb2luKCcsJyk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBwcmVmaXhBbGw7XG5cbnZhciBfcHJlZml4UHJvcHMgPSByZXF1aXJlKCcuL3ByZWZpeFByb3BzJyk7XG5cbnZhciBfcHJlZml4UHJvcHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcHJlZml4UHJvcHMpO1xuXG52YXIgX2NhcGl0YWxpemVTdHJpbmcgPSByZXF1aXJlKCcuLi91dGlscy9jYXBpdGFsaXplU3RyaW5nJyk7XG5cbnZhciBfY2FwaXRhbGl6ZVN0cmluZzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jYXBpdGFsaXplU3RyaW5nKTtcblxudmFyIF9jYWxjID0gcmVxdWlyZSgnLi9wbHVnaW5zL2NhbGMnKTtcblxudmFyIF9jYWxjMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NhbGMpO1xuXG52YXIgX2N1cnNvciA9IHJlcXVpcmUoJy4vcGx1Z2lucy9jdXJzb3InKTtcblxudmFyIF9jdXJzb3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3Vyc29yKTtcblxudmFyIF9mbGV4ID0gcmVxdWlyZSgnLi9wbHVnaW5zL2ZsZXgnKTtcblxudmFyIF9mbGV4MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2ZsZXgpO1xuXG52YXIgX3NpemluZyA9IHJlcXVpcmUoJy4vcGx1Z2lucy9zaXppbmcnKTtcblxudmFyIF9zaXppbmcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc2l6aW5nKTtcblxudmFyIF9ncmFkaWVudCA9IHJlcXVpcmUoJy4vcGx1Z2lucy9ncmFkaWVudCcpO1xuXG52YXIgX2dyYWRpZW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dyYWRpZW50KTtcblxudmFyIF90cmFuc2l0aW9uID0gcmVxdWlyZSgnLi9wbHVnaW5zL3RyYW5zaXRpb24nKTtcblxudmFyIF90cmFuc2l0aW9uMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3RyYW5zaXRpb24pO1xuXG52YXIgX2ZsZXhib3hJRSA9IHJlcXVpcmUoJy4vcGx1Z2lucy9mbGV4Ym94SUUnKTtcblxudmFyIF9mbGV4Ym94SUUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZmxleGJveElFKTtcblxudmFyIF9mbGV4Ym94T2xkID0gcmVxdWlyZSgnLi9wbHVnaW5zL2ZsZXhib3hPbGQnKTtcblxudmFyIF9mbGV4Ym94T2xkMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2ZsZXhib3hPbGQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vLyBzcGVjaWFsIGZsZXhib3ggc3BlY2lmaWNhdGlvbnNcblxuXG52YXIgcGx1Z2lucyA9IFtfY2FsYzIuZGVmYXVsdCwgX2N1cnNvcjIuZGVmYXVsdCwgX3NpemluZzIuZGVmYXVsdCwgX2dyYWRpZW50Mi5kZWZhdWx0LCBfdHJhbnNpdGlvbjIuZGVmYXVsdCwgX2ZsZXhib3hJRTIuZGVmYXVsdCwgX2ZsZXhib3hPbGQyLmRlZmF1bHQsIF9mbGV4Mi5kZWZhdWx0XTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgcHJlZml4ZWQgdmVyc2lvbiBvZiB0aGUgc3R5bGUgb2JqZWN0IHVzaW5nIGFsbCB2ZW5kb3IgcHJlZml4ZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdHlsZXMgLSBTdHlsZSBvYmplY3QgdGhhdCBnZXRzIHByZWZpeGVkIHByb3BlcnRpZXMgYWRkZWRcbiAqIEByZXR1cm5zIHtPYmplY3R9IC0gU3R5bGUgb2JqZWN0IHdpdGggcHJlZml4ZWQgcHJvcGVydGllcyBhbmQgdmFsdWVzXG4gKi9cbmZ1bmN0aW9uIHByZWZpeEFsbChzdHlsZXMpIHtcbiAgT2JqZWN0LmtleXMoc3R5bGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgIHZhciB2YWx1ZSA9IHN0eWxlc1twcm9wZXJ0eV07XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgT2JqZWN0ICYmICFBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgLy8gcmVjdXJzZSB0aHJvdWdoIG5lc3RlZCBzdHlsZSBvYmplY3RzXG4gICAgICBzdHlsZXNbcHJvcGVydHldID0gcHJlZml4QWxsKHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgT2JqZWN0LmtleXMoX3ByZWZpeFByb3BzMi5kZWZhdWx0KS5mb3JFYWNoKGZ1bmN0aW9uIChwcmVmaXgpIHtcbiAgICAgICAgdmFyIHByb3BlcnRpZXMgPSBfcHJlZml4UHJvcHMyLmRlZmF1bHRbcHJlZml4XTtcbiAgICAgICAgLy8gYWRkIHByZWZpeGVzIGlmIG5lZWRlZFxuICAgICAgICBpZiAocHJvcGVydGllc1twcm9wZXJ0eV0pIHtcbiAgICAgICAgICBzdHlsZXNbcHJlZml4ICsgKDAsIF9jYXBpdGFsaXplU3RyaW5nMi5kZWZhdWx0KShwcm9wZXJ0eSldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG5cbiAgT2JqZWN0LmtleXMoc3R5bGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgIFtdLmNvbmNhdChzdHlsZXNbcHJvcGVydHldKS5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgpIHtcbiAgICAgIC8vIHJlc29sdmUgZXZlcnkgc3BlY2lhbCBwbHVnaW5zXG4gICAgICBwbHVnaW5zLmZvckVhY2goZnVuY3Rpb24gKHBsdWdpbikge1xuICAgICAgICByZXR1cm4gYXNzaWduU3R5bGVzKHN0eWxlcywgcGx1Z2luKHByb3BlcnR5LCB2YWx1ZSkpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiBzdHlsZXM7XG59XG5cbmZ1bmN0aW9uIGFzc2lnblN0eWxlcyhiYXNlKSB7XG4gIHZhciBleHRlbmQgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1sxXTtcblxuICBPYmplY3Qua2V5cyhleHRlbmQpLmZvckVhY2goZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gICAgdmFyIGJhc2VWYWx1ZSA9IGJhc2VbcHJvcGVydHldO1xuICAgIGlmIChBcnJheS5pc0FycmF5KGJhc2VWYWx1ZSkpIHtcbiAgICAgIFtdLmNvbmNhdChleHRlbmRbcHJvcGVydHldKS5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB2YXIgdmFsdWVJbmRleCA9IGJhc2VWYWx1ZS5pbmRleE9mKHZhbHVlKTtcbiAgICAgICAgaWYgKHZhbHVlSW5kZXggPiAtMSkge1xuICAgICAgICAgIGJhc2VbcHJvcGVydHldLnNwbGljZSh2YWx1ZUluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgICAgICBiYXNlW3Byb3BlcnR5XS5wdXNoKHZhbHVlKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBiYXNlW3Byb3BlcnR5XSA9IGV4dGVuZFtwcm9wZXJ0eV07XG4gICAgfVxuICB9KTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0geyBcIldlYmtpdFwiOiB7IFwidHJhbnNmb3JtXCI6IHRydWUsIFwidHJhbnNmb3JtT3JpZ2luXCI6IHRydWUsIFwidHJhbnNmb3JtT3JpZ2luWFwiOiB0cnVlLCBcInRyYW5zZm9ybU9yaWdpbllcIjogdHJ1ZSwgXCJiYWNrZmFjZVZpc2liaWxpdHlcIjogdHJ1ZSwgXCJwZXJzcGVjdGl2ZVwiOiB0cnVlLCBcInBlcnNwZWN0aXZlT3JpZ2luXCI6IHRydWUsIFwidHJhbnNmb3JtU3R5bGVcIjogdHJ1ZSwgXCJ0cmFuc2Zvcm1PcmlnaW5aXCI6IHRydWUsIFwiYW5pbWF0aW9uXCI6IHRydWUsIFwiYW5pbWF0aW9uRGVsYXlcIjogdHJ1ZSwgXCJhbmltYXRpb25EaXJlY3Rpb25cIjogdHJ1ZSwgXCJhbmltYXRpb25GaWxsTW9kZVwiOiB0cnVlLCBcImFuaW1hdGlvbkR1cmF0aW9uXCI6IHRydWUsIFwiYW5pbWF0aW9uSXRlcmF0aW9uQ291bnRcIjogdHJ1ZSwgXCJhbmltYXRpb25OYW1lXCI6IHRydWUsIFwiYW5pbWF0aW9uUGxheVN0YXRlXCI6IHRydWUsIFwiYW5pbWF0aW9uVGltaW5nRnVuY3Rpb25cIjogdHJ1ZSwgXCJhcHBlYXJhbmNlXCI6IHRydWUsIFwidXNlclNlbGVjdFwiOiB0cnVlLCBcImZvbnRLZXJuaW5nXCI6IHRydWUsIFwidGV4dEVtcGhhc2lzUG9zaXRpb25cIjogdHJ1ZSwgXCJ0ZXh0RW1waGFzaXNcIjogdHJ1ZSwgXCJ0ZXh0RW1waGFzaXNTdHlsZVwiOiB0cnVlLCBcInRleHRFbXBoYXNpc0NvbG9yXCI6IHRydWUsIFwiYm94RGVjb3JhdGlvbkJyZWFrXCI6IHRydWUsIFwiY2xpcFBhdGhcIjogdHJ1ZSwgXCJtYXNrSW1hZ2VcIjogdHJ1ZSwgXCJtYXNrTW9kZVwiOiB0cnVlLCBcIm1hc2tSZXBlYXRcIjogdHJ1ZSwgXCJtYXNrUG9zaXRpb25cIjogdHJ1ZSwgXCJtYXNrQ2xpcFwiOiB0cnVlLCBcIm1hc2tPcmlnaW5cIjogdHJ1ZSwgXCJtYXNrU2l6ZVwiOiB0cnVlLCBcIm1hc2tDb21wb3NpdGVcIjogdHJ1ZSwgXCJtYXNrXCI6IHRydWUsIFwibWFza0JvcmRlclNvdXJjZVwiOiB0cnVlLCBcIm1hc2tCb3JkZXJNb2RlXCI6IHRydWUsIFwibWFza0JvcmRlclNsaWNlXCI6IHRydWUsIFwibWFza0JvcmRlcldpZHRoXCI6IHRydWUsIFwibWFza0JvcmRlck91dHNldFwiOiB0cnVlLCBcIm1hc2tCb3JkZXJSZXBlYXRcIjogdHJ1ZSwgXCJtYXNrQm9yZGVyXCI6IHRydWUsIFwibWFza1R5cGVcIjogdHJ1ZSwgXCJ0ZXh0RGVjb3JhdGlvblN0eWxlXCI6IHRydWUsIFwidGV4dERlY29yYXRpb25Ta2lwXCI6IHRydWUsIFwidGV4dERlY29yYXRpb25MaW5lXCI6IHRydWUsIFwidGV4dERlY29yYXRpb25Db2xvclwiOiB0cnVlLCBcImZpbHRlclwiOiB0cnVlLCBcImZvbnRGZWF0dXJlU2V0dGluZ3NcIjogdHJ1ZSwgXCJicmVha0FmdGVyXCI6IHRydWUsIFwiYnJlYWtCZWZvcmVcIjogdHJ1ZSwgXCJicmVha0luc2lkZVwiOiB0cnVlLCBcImNvbHVtbkNvdW50XCI6IHRydWUsIFwiY29sdW1uRmlsbFwiOiB0cnVlLCBcImNvbHVtbkdhcFwiOiB0cnVlLCBcImNvbHVtblJ1bGVcIjogdHJ1ZSwgXCJjb2x1bW5SdWxlQ29sb3JcIjogdHJ1ZSwgXCJjb2x1bW5SdWxlU3R5bGVcIjogdHJ1ZSwgXCJjb2x1bW5SdWxlV2lkdGhcIjogdHJ1ZSwgXCJjb2x1bW5zXCI6IHRydWUsIFwiY29sdW1uU3BhblwiOiB0cnVlLCBcImNvbHVtbldpZHRoXCI6IHRydWUsIFwiZmxleFwiOiB0cnVlLCBcImZsZXhCYXNpc1wiOiB0cnVlLCBcImZsZXhEaXJlY3Rpb25cIjogdHJ1ZSwgXCJmbGV4R3Jvd1wiOiB0cnVlLCBcImZsZXhGbG93XCI6IHRydWUsIFwiZmxleFNocmlua1wiOiB0cnVlLCBcImZsZXhXcmFwXCI6IHRydWUsIFwiYWxpZ25Db250ZW50XCI6IHRydWUsIFwiYWxpZ25JdGVtc1wiOiB0cnVlLCBcImFsaWduU2VsZlwiOiB0cnVlLCBcImp1c3RpZnlDb250ZW50XCI6IHRydWUsIFwib3JkZXJcIjogdHJ1ZSwgXCJ0cmFuc2l0aW9uXCI6IHRydWUsIFwidHJhbnNpdGlvbkRlbGF5XCI6IHRydWUsIFwidHJhbnNpdGlvbkR1cmF0aW9uXCI6IHRydWUsIFwidHJhbnNpdGlvblByb3BlcnR5XCI6IHRydWUsIFwidHJhbnNpdGlvblRpbWluZ0Z1bmN0aW9uXCI6IHRydWUsIFwiYmFja2Ryb3BGaWx0ZXJcIjogdHJ1ZSwgXCJzY3JvbGxTbmFwVHlwZVwiOiB0cnVlLCBcInNjcm9sbFNuYXBQb2ludHNYXCI6IHRydWUsIFwic2Nyb2xsU25hcFBvaW50c1lcIjogdHJ1ZSwgXCJzY3JvbGxTbmFwRGVzdGluYXRpb25cIjogdHJ1ZSwgXCJzY3JvbGxTbmFwQ29vcmRpbmF0ZVwiOiB0cnVlLCBcInNoYXBlSW1hZ2VUaHJlc2hvbGRcIjogdHJ1ZSwgXCJzaGFwZUltYWdlTWFyZ2luXCI6IHRydWUsIFwic2hhcGVJbWFnZU91dHNpZGVcIjogdHJ1ZSwgXCJoeXBoZW5zXCI6IHRydWUsIFwiZmxvd0ludG9cIjogdHJ1ZSwgXCJmbG93RnJvbVwiOiB0cnVlLCBcInJlZ2lvbkZyYWdtZW50XCI6IHRydWUsIFwidGV4dFNpemVBZGp1c3RcIjogdHJ1ZSwgXCJib3JkZXJJbWFnZVwiOiB0cnVlLCBcImJvcmRlckltYWdlT3V0c2V0XCI6IHRydWUsIFwiYm9yZGVySW1hZ2VSZXBlYXRcIjogdHJ1ZSwgXCJib3JkZXJJbWFnZVNsaWNlXCI6IHRydWUsIFwiYm9yZGVySW1hZ2VTb3VyY2VcIjogdHJ1ZSwgXCJib3JkZXJJbWFnZVdpZHRoXCI6IHRydWUsIFwidGFiU2l6ZVwiOiB0cnVlLCBcIm9iamVjdEZpdFwiOiB0cnVlLCBcIm9iamVjdFBvc2l0aW9uXCI6IHRydWUgfSwgXCJNb3pcIjogeyBcImFwcGVhcmFuY2VcIjogdHJ1ZSwgXCJ1c2VyU2VsZWN0XCI6IHRydWUsIFwiYm94U2l6aW5nXCI6IHRydWUsIFwidGV4dEFsaWduTGFzdFwiOiB0cnVlLCBcInRleHREZWNvcmF0aW9uU3R5bGVcIjogdHJ1ZSwgXCJ0ZXh0RGVjb3JhdGlvblNraXBcIjogdHJ1ZSwgXCJ0ZXh0RGVjb3JhdGlvbkxpbmVcIjogdHJ1ZSwgXCJ0ZXh0RGVjb3JhdGlvbkNvbG9yXCI6IHRydWUsIFwidGFiU2l6ZVwiOiB0cnVlLCBcImh5cGhlbnNcIjogdHJ1ZSwgXCJmb250RmVhdHVyZVNldHRpbmdzXCI6IHRydWUsIFwiYnJlYWtBZnRlclwiOiB0cnVlLCBcImJyZWFrQmVmb3JlXCI6IHRydWUsIFwiYnJlYWtJbnNpZGVcIjogdHJ1ZSwgXCJjb2x1bW5Db3VudFwiOiB0cnVlLCBcImNvbHVtbkZpbGxcIjogdHJ1ZSwgXCJjb2x1bW5HYXBcIjogdHJ1ZSwgXCJjb2x1bW5SdWxlXCI6IHRydWUsIFwiY29sdW1uUnVsZUNvbG9yXCI6IHRydWUsIFwiY29sdW1uUnVsZVN0eWxlXCI6IHRydWUsIFwiY29sdW1uUnVsZVdpZHRoXCI6IHRydWUsIFwiY29sdW1uc1wiOiB0cnVlLCBcImNvbHVtblNwYW5cIjogdHJ1ZSwgXCJjb2x1bW5XaWR0aFwiOiB0cnVlIH0sIFwibXNcIjogeyBcImZsZXhcIjogdHJ1ZSwgXCJmbGV4QmFzaXNcIjogZmFsc2UsIFwiZmxleERpcmVjdGlvblwiOiB0cnVlLCBcImZsZXhHcm93XCI6IGZhbHNlLCBcImZsZXhGbG93XCI6IHRydWUsIFwiZmxleFNocmlua1wiOiBmYWxzZSwgXCJmbGV4V3JhcFwiOiB0cnVlLCBcImFsaWduQ29udGVudFwiOiBmYWxzZSwgXCJhbGlnbkl0ZW1zXCI6IGZhbHNlLCBcImFsaWduU2VsZlwiOiBmYWxzZSwgXCJqdXN0aWZ5Q29udGVudFwiOiBmYWxzZSwgXCJvcmRlclwiOiBmYWxzZSwgXCJ0cmFuc2Zvcm1cIjogdHJ1ZSwgXCJ0cmFuc2Zvcm1PcmlnaW5cIjogdHJ1ZSwgXCJ0cmFuc2Zvcm1PcmlnaW5YXCI6IHRydWUsIFwidHJhbnNmb3JtT3JpZ2luWVwiOiB0cnVlLCBcInVzZXJTZWxlY3RcIjogdHJ1ZSwgXCJ3cmFwRmxvd1wiOiB0cnVlLCBcIndyYXBUaHJvdWdoXCI6IHRydWUsIFwid3JhcE1hcmdpblwiOiB0cnVlLCBcInNjcm9sbFNuYXBUeXBlXCI6IHRydWUsIFwic2Nyb2xsU25hcFBvaW50c1hcIjogdHJ1ZSwgXCJzY3JvbGxTbmFwUG9pbnRzWVwiOiB0cnVlLCBcInNjcm9sbFNuYXBEZXN0aW5hdGlvblwiOiB0cnVlLCBcInNjcm9sbFNuYXBDb29yZGluYXRlXCI6IHRydWUsIFwidG91Y2hBY3Rpb25cIjogdHJ1ZSwgXCJoeXBoZW5zXCI6IHRydWUsIFwiZmxvd0ludG9cIjogdHJ1ZSwgXCJmbG93RnJvbVwiOiB0cnVlLCBcImJyZWFrQmVmb3JlXCI6IHRydWUsIFwiYnJlYWtBZnRlclwiOiB0cnVlLCBcImJyZWFrSW5zaWRlXCI6IHRydWUsIFwicmVnaW9uRnJhZ21lbnRcIjogdHJ1ZSwgXCJncmlkVGVtcGxhdGVDb2x1bW5zXCI6IHRydWUsIFwiZ3JpZFRlbXBsYXRlUm93c1wiOiB0cnVlLCBcImdyaWRUZW1wbGF0ZUFyZWFzXCI6IHRydWUsIFwiZ3JpZFRlbXBsYXRlXCI6IHRydWUsIFwiZ3JpZEF1dG9Db2x1bW5zXCI6IHRydWUsIFwiZ3JpZEF1dG9Sb3dzXCI6IHRydWUsIFwiZ3JpZEF1dG9GbG93XCI6IHRydWUsIFwiZ3JpZFwiOiB0cnVlLCBcImdyaWRSb3dTdGFydFwiOiB0cnVlLCBcImdyaWRDb2x1bW5TdGFydFwiOiB0cnVlLCBcImdyaWRSb3dFbmRcIjogdHJ1ZSwgXCJncmlkUm93XCI6IHRydWUsIFwiZ3JpZENvbHVtblwiOiB0cnVlLCBcImdyaWRDb2x1bW5FbmRcIjogdHJ1ZSwgXCJncmlkQ29sdW1uR2FwXCI6IHRydWUsIFwiZ3JpZFJvd0dhcFwiOiB0cnVlLCBcImdyaWRBcmVhXCI6IHRydWUsIFwiZ3JpZEdhcFwiOiB0cnVlLCBcInRleHRTaXplQWRqdXN0XCI6IHRydWUgfSB9O1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbi8vIGhlbHBlciB0byBjYXBpdGFsaXplIHN0cmluZ3NcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKHN0cikge1xuICByZXR1cm4gc3RyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyLnNsaWNlKDEpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHZhbHVlID0gdmFsdWUuam9pbignLCcpO1xuXG4gIHJldHVybiB2YWx1ZS5tYXRjaCgvLXdlYmtpdC18LW1vei18LW1zLS8pICE9PSBudWxsO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7IGlmIChrZXkgaW4gb2JqKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgeyB2YWx1ZTogdmFsdWUsIGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSk7IH0gZWxzZSB7IG9ialtrZXldID0gdmFsdWU7IH0gcmV0dXJuIG9iajsgfVxuXG4vLyByZXR1cm5zIGEgc3R5bGUgb2JqZWN0IHdpdGggYSBzaW5nbGUgY29uY2F0ZWQgcHJlZml4ZWQgdmFsdWUgc3RyaW5nXG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgdmFyIHJlcGxhY2VyID0gYXJndW1lbnRzLmxlbmd0aCA8PSAyIHx8IGFyZ3VtZW50c1syXSA9PT0gdW5kZWZpbmVkID8gZnVuY3Rpb24gKHByZWZpeCwgdmFsdWUpIHtcbiAgICByZXR1cm4gcHJlZml4ICsgdmFsdWU7XG4gIH0gOiBhcmd1bWVudHNbMl07XG4gIHJldHVybiBfZGVmaW5lUHJvcGVydHkoe30sIHByb3BlcnR5LCBbJy13ZWJraXQtJywgJy1tb3otJywgJyddLm1hcChmdW5jdGlvbiAocHJlZml4KSB7XG4gICAgcmV0dXJuIHJlcGxhY2VyKHByZWZpeCwgdmFsdWUpO1xuICB9KSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL3N0YXRpYy9wcmVmaXhBbGwnKVxuIiwiaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNzcywgU3R5bGVTaGVldCB9IGZyb20gJ2FwaHJvZGl0ZS9uby1pbXBvcnRhbnQnO1xuXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi90aGVtZSc7XG5pbXBvcnQgSWNvbiBmcm9tICcuL0ljb24nO1xuXG5mdW5jdGlvbiBBcnJvdyAoe1xuXHRkaXJlY3Rpb24sXG5cdGljb24sXG5cdG9uQ2xpY2ssXG5cdC4uLnByb3BzLFxufSkge1xuXHRyZXR1cm4gKFxuXHRcdDxidXR0b25cblx0XHRcdHR5cGU9XCJidXR0b25cIlxuXHRcdFx0Y2xhc3NOYW1lPXtjc3MoY2xhc3Nlcy5hcnJvdywgY2xhc3Nlc1tkaXJlY3Rpb25dKX1cblx0XHRcdG9uQ2xpY2s9e29uQ2xpY2t9XG5cdFx0XHRvblRvdWNoRW5kPXtvbkNsaWNrfVxuXHRcdFx0ey4uLnByb3BzfVxuXHRcdD5cblx0XHRcdDxJY29uIHR5cGU9e2ljb259IC8+XG5cdFx0PC9idXR0b24+XG5cdCk7XG59O1xuXG5BcnJvdy5wcm9wVHlwZXMgPSB7XG5cdGRpcmVjdGlvbjogUHJvcFR5cGVzLm9uZU9mKFsnbGVmdCcsICdyaWdodCddKSxcblx0aWNvbjogUHJvcFR5cGVzLnN0cmluZyxcblx0b25DbGljazogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG5cbmNvbnN0IGNsYXNzZXMgPSBTdHlsZVNoZWV0LmNyZWF0ZSh7XG5cdGFycm93OiB7XG5cdFx0YmFja2dyb3VuZDogJ25vbmUnLFxuXHRcdGJvcmRlcjogJ25vbmUnLFxuXHRcdGJvcmRlclJhZGl1czogNCxcblx0XHRjdXJzb3I6ICdwb2ludGVyJyxcblx0XHRoZWlnaHQ6IHRoZW1lLmFycm93LmhlaWdodCxcblx0XHRtYXJnaW5Ub3A6IHRoZW1lLmFycm93LmhlaWdodCAvIC0yLFxuXHRcdG91dGxpbmU6ICdub25lJyxcblx0XHRwYWRkaW5nOiAxMCxcblx0XHRwb3NpdGlvbjogJ2Fic29sdXRlJyxcblx0XHR0b3A6ICc1MCUnLFxuXHRcdHdpZHRoOiA0MCxcblxuXHRcdC8vIGRpc2FibGUgdXNlciBzZWxlY3Rcblx0XHRXZWJraXRUb3VjaENhbGxvdXQ6ICdub25lJyxcblx0XHR1c2VyU2VsZWN0OiAnbm9uZScsXG5cblx0XHQnQG1lZGlhIChtaW4td2lkdGg6IDUwMHB4KSc6IHtcblx0XHRcdHdpZHRoOiA3MCxcblx0XHR9LFxuXHR9LFxuXHRyaWdodDoge1xuXHRcdHJpZ2h0OiB0aGVtZS5jb250YWluZXIuZ3V0dGVyLmhvcml6b250YWwsXG5cdH0sXG5cdGxlZnQ6IHtcblx0XHRsZWZ0OiB0aGVtZS5jb250YWluZXIuZ3V0dGVyLmhvcml6b250YWwsXG5cdH0sXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBBcnJvdztcbiIsImltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjc3MsIFN0eWxlU2hlZXQgfSBmcm9tICdhcGhyb2RpdGUvbm8taW1wb3J0YW50JztcbmltcG9ydCB0aGVtZSBmcm9tICcuL3RoZW1lJztcblxuZnVuY3Rpb24gRm9vdGVyICh7XG5cdGNhcHRpb24sXG5cdGNvdW50Q3VycmVudCxcblx0Y291bnRTZXBhcmF0b3IsXG5cdGNvdW50VG90YWwsXG5cdHNob3dDb3VudCxcblx0Li4ucHJvcHMsXG59KSB7XG5cdGlmICghY2FwdGlvbiAmJiAhc2hvd0NvdW50KSByZXR1cm4gbnVsbDtcblxuXHRjb25zdCBpbWFnZUNvdW50ID0gc2hvd0NvdW50ID8gKFxuXHRcdDxkaXYgY2xhc3NOYW1lPXtjc3MoY2xhc3Nlcy5mb290ZXJDb3VudCl9PlxuXHRcdFx0e2NvdW50Q3VycmVudH1cblx0XHRcdHtjb3VudFNlcGFyYXRvcn1cblx0XHRcdHtjb3VudFRvdGFsfVxuXHRcdDwvZGl2Pilcblx0XHQ6IDxzcGFuIC8+O1xuXG5cdHJldHVybiAoXG5cdFx0PGRpdiBjbGFzc05hbWU9e2NzcyhjbGFzc2VzLmZvb3Rlcil9IHsuLi5wcm9wc30+XG5cdFx0XHR7Y2FwdGlvbiA/IChcblx0XHRcdFx0PGZpZ2NhcHRpb24gY2xhc3NOYW1lPXtjc3MoY2xhc3Nlcy5mb290ZXJDYXB0aW9uKX0+XG5cdFx0XHRcdFx0e2NhcHRpb259XG5cdFx0XHRcdDwvZmlnY2FwdGlvbj5cblx0XHRcdCkgOiA8c3BhbiAvPn1cblx0XHRcdHtpbWFnZUNvdW50fVxuXHRcdDwvZGl2PlxuXHQpO1xufTtcblxuRm9vdGVyLnByb3BUeXBlcyA9IHtcblx0Y2FwdGlvbjogUHJvcFR5cGVzLnN0cmluZyxcblx0Y291bnRDdXJyZW50OiBQcm9wVHlwZXMubnVtYmVyLFxuXHRjb3VudFNlcGFyYXRvcjogUHJvcFR5cGVzLnN0cmluZyxcblx0Y291bnRUb3RhbDogUHJvcFR5cGVzLm51bWJlcixcblx0c2hvd0NvdW50OiBQcm9wVHlwZXMuYm9vbCxcbn07XG5cbmNvbnN0IGNsYXNzZXMgPSBTdHlsZVNoZWV0LmNyZWF0ZSh7XG5cdGZvb3Rlcjoge1xuXHRcdGJveFNpemluZzogJ2JvcmRlci1ib3gnLFxuXHRcdGNvbG9yOiAnd2hpdGUnLFxuXHRcdGN1cnNvcjogJ2F1dG8nLFxuXHRcdGRpc3BsYXk6ICdmbGV4Jyxcblx0XHRoZWlnaHQ6IHRoZW1lLmZvb3Rlci5oZWlnaHQsXG5cdFx0anVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJyxcblx0XHRsZWZ0OiAwLFxuXHRcdGxpbmVIZWlnaHQ6IDEuMyxcblx0XHRwYWRkaW5nQm90dG9tOiB0aGVtZS5mb290ZXIuZ3V0dGVyLnZlcnRpY2FsLFxuXHRcdHBhZGRpbmdMZWZ0OiB0aGVtZS5mb290ZXIuZ3V0dGVyLmhvcml6b250YWwsXG5cdFx0cGFkZGluZ1JpZ2h0OiB0aGVtZS5mb290ZXIuZ3V0dGVyLmhvcml6b250YWwsXG5cdFx0cGFkZGluZ1RvcDogdGhlbWUuZm9vdGVyLmd1dHRlci52ZXJ0aWNhbCxcblx0fSxcblx0Zm9vdGVyQ291bnQ6IHtcblx0XHRjb2xvcjogdGhlbWUuZm9vdGVyLmNvdW50LmNvbG9yLFxuXHRcdGZvbnRTaXplOiB0aGVtZS5mb290ZXIuY291bnQuZm9udFNpemUsXG5cdFx0cGFkZGluZ0xlZnQ6ICcxZW0nLCAvLyBhZGQgYSBzbWFsbCBndXR0ZXIgZm9yIHRoZSBjYXB0aW9uXG5cdH0sXG5cdGZvb3RlckNhcHRpb246IHtcblx0XHRmbGV4OiAnMSAxIDAnLFxuXHR9LFxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRm9vdGVyO1xuIiwiaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNzcywgU3R5bGVTaGVldCB9IGZyb20gJ2FwaHJvZGl0ZS9uby1pbXBvcnRhbnQnO1xuXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi90aGVtZSc7XG5pbXBvcnQgSWNvbiBmcm9tICcuL0ljb24nO1xuXG5mdW5jdGlvbiBIZWFkZXIgKHtcblx0Y3VzdG9tQ29udHJvbHMsXG5cdG9uQ2xvc2UsXG5cdHNob3dDbG9zZUJ1dHRvbixcblx0Li4ucHJvcHMsXG59KSB7XG5cdHJldHVybiAoXG5cdFx0PGRpdiBjbGFzc05hbWU9e2NzcyhjbGFzc2VzLmhlYWRlcil9IHsuLi5wcm9wc30+XG5cdFx0XHR7Y3VzdG9tQ29udHJvbHMgPyBjdXN0b21Db250cm9scyA6IDxzcGFuIC8+fVxuXHRcdFx0eyEhc2hvd0Nsb3NlQnV0dG9uICYmIChcblx0XHRcdFx0PGJ1dHRvblxuXHRcdFx0XHRcdHRpdGxlPVwiQ2xvc2UgKEVzYylcIlxuXHRcdFx0XHRcdGNsYXNzTmFtZT17Y3NzKGNsYXNzZXMuY2xvc2UpfVxuXHRcdFx0XHRcdG9uQ2xpY2s9e29uQ2xvc2V9XG5cdFx0XHRcdD5cblx0XHRcdFx0XHQ8SWNvbiB0eXBlPVwiY2xvc2VcIiAvPlxuXHRcdFx0XHQ8L2J1dHRvbj5cblx0XHRcdCl9XG5cdFx0PC9kaXY+XG5cdCk7XG59O1xuXG5IZWFkZXIucHJvcFR5cGVzID0ge1xuXHRjdXN0b21Db250cm9sczogUHJvcFR5cGVzLmFycmF5LFxuXHRvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuXHRzaG93Q2xvc2VCdXR0b246IFByb3BUeXBlcy5ib29sLFxufTtcblxuY29uc3QgY2xhc3NlcyA9IFN0eWxlU2hlZXQuY3JlYXRlKHtcblx0aGVhZGVyOiB7XG5cdFx0ZGlzcGxheTogJ2ZsZXgnLFxuXHRcdGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsXG5cdFx0aGVpZ2h0OiB0aGVtZS5oZWFkZXIuaGVpZ2h0LFxuXHR9LFxuXHRjbG9zZToge1xuXHRcdGJhY2tncm91bmQ6ICdub25lJyxcblx0XHRib3JkZXI6ICdub25lJyxcblx0XHRjdXJzb3I6ICdwb2ludGVyJyxcblx0XHRvdXRsaW5lOiAnbm9uZScsXG5cdFx0cG9zaXRpb246ICdyZWxhdGl2ZScsXG5cdFx0dG9wOiAwLFxuXHRcdHZlcnRpY2FsQWxpZ246ICdib3R0b20nLFxuXG5cdFx0Ly8gaW5jcmVhc2UgaGl0IGFyZWFcblx0XHRoZWlnaHQ6IHRoZW1lLmNsb3NlLmhlaWdodCArIDIwLFxuXHRcdG1hcmdpblJpZ2h0OiAtMTAsXG5cdFx0cGFkZGluZzogMTAsXG5cdFx0d2lkdGg6IHRoZW1lLmNsb3NlLndpZHRoICsgMjAsXG5cdH0sXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBIZWFkZXI7XG4iLCJpbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGljb25zIGZyb20gJy4vaWNvbnMnO1xuXG5jb25zdCBJY29uID0gKHsgdHlwZSwgLi4ucHJvcHMgfSkgPT4gKFxuXHQ8c3BhblxuXHRcdGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogaWNvbnNbdHlwZV0gfX1cblx0XHR7Li4ucHJvcHN9XG5cdC8+XG4pO1xuXG5JY29uLnByb3BUeXBlcyA9IHtcblx0dHlwZTogUHJvcFR5cGVzLm9uZU9mKE9iamVjdC5rZXlzKGljb25zKSksXG59O1xuXG5leHBvcnQgZGVmYXVsdCBJY29uO1xuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBUcmFuc2l0aW9uIGZyb20gJ3JlYWN0LWFkZG9ucy1jc3MtdHJhbnNpdGlvbi1ncm91cCc7XG5pbXBvcnQgeyByZW5kZXIgfSBmcm9tICdyZWFjdC1kb20nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3J0YWwgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRjb25zdHJ1Y3RvciAoKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLnBvcnRhbEVsZW1lbnQgPSBudWxsO1xuXHR9XG5cdGNvbXBvbmVudERpZE1vdW50ICgpIHtcblx0XHRjb25zdCBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwKTtcblx0XHR0aGlzLnBvcnRhbEVsZW1lbnQgPSBwO1xuXHRcdHRoaXMuY29tcG9uZW50RGlkVXBkYXRlKCk7XG5cdH1cblx0Y29tcG9uZW50RGlkVXBkYXRlICgpIHtcblx0XHRjb25zdCBzdHlsZXMgPSBgXG5cdFx0XHRcdC5mYWRlLWVudGVyIHsgb3BhY2l0eTogMC4wMTsgfVxuXHRcdFx0XHQuZmFkZS1lbnRlci5mYWRlLWVudGVyLWFjdGl2ZSB7IG9wYWNpdHk6IDE7IHRyYW5zaXRpb246IG9wYWNpdHkgMjAwbXM7IH1cblx0XHRcdFx0LmZhZGUtbGVhdmUgeyBvcGFjaXR5OiAxOyB9XG5cdFx0XHRcdC5mYWRlLWxlYXZlLmZhZGUtbGVhdmUtYWN0aXZlIHsgb3BhY2l0eTogMC4wMTsgdHJhbnNpdGlvbjogb3BhY2l0eSAyMDBtczsgfVxuXHRcdGA7XG5cdFx0cmVuZGVyKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0PHN0eWxlPntzdHlsZXN9PC9zdHlsZT5cblx0XHRcdFx0PFRyYW5zaXRpb25cblx0XHRcdFx0XHR0cmFuc2l0aW9uTmFtZT1cImZhZGVcIlxuXHRcdFx0XHRcdHRyYW5zaXRpb25FbnRlclRpbWVvdXQ9ezIwMH1cblx0XHRcdFx0XHR0cmFuc2l0aW9uTGVhdmVUaW1lb3V0PXsyMDB9XG5cdFx0XHRcdFx0ey4uLnRoaXMucHJvcHN9XG5cdFx0XHRcdC8+XG5cdFx0XHQ8L2Rpdj4sXG5cdFx0XHR0aGlzLnBvcnRhbEVsZW1lbnRcblx0XHQpO1xuXHR9XG5cdGNvbXBvbmVudFdpbGxVbm1vdW50ICgpIHtcblx0XHRkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMucG9ydGFsRWxlbWVudCk7XG5cdH1cblx0cmVuZGVyICgpIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSAoXG5cdCc8c3ZnIGZpbGw9XCJ3aGl0ZVwiIHZlcnNpb249XCIxLjFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgeD1cIjBweFwiIHk9XCIwcHhcIiB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCIgeG1sOnNwYWNlPVwicHJlc2VydmVcIj4nXG5cdFx0KyAnPHBhdGggZD1cIk0yMTMuNywyNTZMMjEzLjcsMjU2TDIxMy43LDI1NkwzODAuOSw4MS45YzQuMi00LjMsNC4xLTExLjQtMC4yLTE1LjhsLTI5LjktMzAuNmMtNC4zLTQuNC0xMS4zLTQuNS0xNS41LTAuMkwxMzEuMSwyNDcuOSBjLTIuMiwyLjItMy4yLDUuMi0zLDguMWMtMC4xLDMsMC45LDUuOSwzLDguMWwyMDQuMiwyMTIuN2M0LjIsNC4zLDExLjIsNC4yLDE1LjUtMC4ybDI5LjktMzAuNmM0LjMtNC40LDQuNC0xMS41LDAuMi0xNS44IEwyMTMuNywyNTZ6XCIvPidcblx0KyAnPC9zdmc+J1xuKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gKFxuXHQnPHN2ZyBmaWxsPVwid2hpdGVcIiB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHg9XCIwcHhcIiB5PVwiMHB4XCIgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+J1xuXHRcdCsgJzxwYXRoIGQ9XCJNMjk4LjMsMjU2TDI5OC4zLDI1NkwyOTguMywyNTZMMTMxLjEsODEuOWMtNC4yLTQuMy00LjEtMTEuNCwwLjItMTUuOGwyOS45LTMwLjZjNC4zLTQuNCwxMS4zLTQuNSwxNS41LTAuMmwyMDQuMiwyMTIuNyBjMi4yLDIuMiwzLjIsNS4yLDMsOC4xYzAuMSwzLTAuOSw1LjktMyw4LjFMMTc2LjcsNDc2LjhjLTQuMiw0LjMtMTEuMiw0LjItMTUuNS0wLjJMMTMxLjMsNDQ2Yy00LjMtNC40LTQuNC0xMS41LTAuMi0xNS44IEwyOTguMywyNTZ6XCIvPidcblx0KyAnPC9zdmc+J1xuKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gKFxuXHQnPHN2ZyBmaWxsPVwid2hpdGVcIiB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHg9XCIwcHhcIiB5PVwiMHB4XCIgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiIHN0eWxlPVwiZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyO1wiIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+J1xuXHRcdCsgJzxwYXRoIGQ9XCJNNDQzLjYsMzg3LjFMMzEyLjQsMjU1LjRsMTMxLjUtMTMwYzUuNC01LjQsNS40LTE0LjIsMC0xOS42bC0zNy40LTM3LjZjLTIuNi0yLjYtNi4xLTQtOS44LTRjLTMuNywwLTcuMiwxLjUtOS44LDQgTDI1NiwxOTcuOEwxMjQuOSw2OC4zYy0yLjYtMi42LTYuMS00LTkuOC00Yy0zLjcsMC03LjIsMS41LTkuOCw0TDY4LDEwNS45Yy01LjQsNS40LTUuNCwxNC4yLDAsMTkuNmwxMzEuNSwxMzBMNjguNCwzODcuMSBjLTIuNiwyLjYtNC4xLDYuMS00LjEsOS44YzAsMy43LDEuNCw3LjIsNC4xLDkuOGwzNy40LDM3LjZjMi43LDIuNyw2LjIsNC4xLDkuOCw0LjFjMy41LDAsNy4xLTEuMyw5LjgtNC4xTDI1NiwzMTMuMWwxMzAuNywxMzEuMSBjMi43LDIuNyw2LjIsNC4xLDkuOCw0LjFjMy41LDAsNy4xLTEuMyw5LjgtNC4xbDM3LjQtMzcuNmMyLjYtMi42LDQuMS02LjEsNC4xLTkuOEM0NDcuNywzOTMuMiw0NDYuMiwzODkuNyw0NDMuNiwzODcuMXpcIi8+J1xuXHQrICc8L3N2Zz4nXG4pO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG5cdGFycm93TGVmdDogcmVxdWlyZSgnLi9hcnJvd0xlZnQnKSxcblx0YXJyb3dSaWdodDogcmVxdWlyZSgnLi9hcnJvd1JpZ2h0JyksXG5cdGNsb3NlOiByZXF1aXJlKCcuL2Nsb3NlJyksXG59O1xuIiwiaW1wb3J0IHRoZW1lIGZyb20gJy4uL3RoZW1lJztcblxuY29uc3Qgc3R5bGVzID0ge1xuXHRjb250YWluZXI6IHtcblx0XHRhbGlnbkl0ZW1zOiAnY2VudGVyJyxcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IHRoZW1lLmNvbnRhaW5lci5iYWNrZ3JvdW5kLFxuXHRcdGJveFNpemluZzogJ2JvcmRlci1ib3gnLFxuXHRcdGRpc3BsYXk6ICdmbGV4Jyxcblx0XHRoZWlnaHQ6ICcxMDAlJyxcblx0XHRqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG5cdFx0bGVmdDogMCxcblx0XHRwYWRkaW5nQm90dG9tOiB0aGVtZS5jb250YWluZXIuZ3V0dGVyLnZlcnRpY2FsLFxuXHRcdHBhZGRpbmdMZWZ0OiB0aGVtZS5jb250YWluZXIuZ3V0dGVyLmhvcml6b250YWwsXG5cdFx0cGFkZGluZ1JpZ2h0OiB0aGVtZS5jb250YWluZXIuZ3V0dGVyLmhvcml6b250YWwsXG5cdFx0cGFkZGluZ1RvcDogdGhlbWUuY29udGFpbmVyLmd1dHRlci52ZXJ0aWNhbCxcblx0XHRwb3NpdGlvbjogJ2ZpeGVkJyxcblx0XHR0b3A6IDAsXG5cdFx0d2lkdGg6ICcxMDAlJyxcblx0XHR6SW5kZXg6IHRoZW1lLmNvbnRhaW5lci56SW5kZXgsXG5cdH0sXG5cblx0Y29udGVudDoge1xuXHRcdHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuXHR9LFxuXG5cdC8vIElNQUdFU1xuXHRpbWFnZToge1xuXHRcdGRpc3BsYXk6ICdibG9jaycsIC8vIHJlbW92ZXMgYnJvd3NlciBkZWZhdWx0IGd1dHRlciBiZW5lYXRoXG5cdFx0aGVpZ2h0OiAnYXV0bycsXG5cdFx0bWFyZ2luOiAnMCBhdXRvJywgLy8gbWFpbnRhaW4gY2VudGVyIG9uIHZlcnkgc2hvcnQgc2NyZWVucyBPUiB2ZXJ5IG5hcnJvdyBpbWFnZVxuXHRcdG1heFdpZHRoOiAnMTAwJScsXG5cblx0XHQvLyBkaXNhYmxlIHVzZXIgc2VsZWN0XG5cdFx0V2Via2l0VG91Y2hDYWxsb3V0OiAnbm9uZScsXG5cdFx0dXNlclNlbGVjdDogJ25vbmUnLFxuXG5cdH0sXG5cdGZpZ3VyZToge1xuXHRcdC8vIG1pbkhlaWdodDogMjAwLFxuXHRcdC8vIG1pbldpZHRoOiAzMDAsXG5cdFx0bWFyZ2luOiAwLCAvLyByZW1vdmUgYnJvd3NlciBkZWZhdWx0XG5cdH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBzdHlsZXM7XG4iLCIvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIFRIRU1FXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuY29uc3QgdGhlbWUgPSB7fTtcblxuLy8gY29udGFpbmVyXG50aGVtZS5jb250YWluZXIgPSB7XG5cdGJhY2tncm91bmQ6ICdyZ2JhKDAsIDAsIDAsIDAuOCknLFxuXHRndXR0ZXI6IHtcblx0XHRob3Jpem9udGFsOiAxMCxcblx0XHR2ZXJ0aWNhbDogMCxcblx0fSxcblx0ekluZGV4OiAyMDAxLFxufTtcblxuLy8gaGVhZGVyXG50aGVtZS5oZWFkZXIgPSB7XG5cdGhlaWdodDogNDAsXG59O1xudGhlbWUuY2xvc2UgPSB7XG5cdGhlaWdodDogMjAsXG5cdHdpZHRoOiAyMCxcbn07XG5cbi8vIGZvb3RlclxudGhlbWUuZm9vdGVyID0ge1xuXHRjb3VudDoge1xuXHRcdGNvbG9yOiAncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjc1KScsXG5cdFx0Zm9udFNpemU6ICcwLjg1ZW0nLFxuXHR9LFxuXHRoZWlnaHQ6IDQwLFxuXHRndXR0ZXI6IHtcblx0XHRob3Jpem9udGFsOiAwLFxuXHRcdHZlcnRpY2FsOiA1LFxuXHR9LFxufTtcblxuLy8gYXJyb3dcbnRoZW1lLmFycm93ID0ge1xuXHRoZWlnaHQ6IDEyMCxcbn07XG5cblxubW9kdWxlLmV4cG9ydHMgPSB0aGVtZTtcbiIsIi8qKlxuXHRCaW5kIG11bHRpcGxlIGNvbXBvbmVudCBtZXRob2RzOlxuXG5cdCogQHBhcmFtIHt0aGlzfSBjb250ZXh0XG5cdCogQHBhcmFtIHtBcnJheX0gZnVuY3Rpb25zXG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0Li4uXG5cdFx0YmluZEZ1bmN0aW9ucy5jYWxsKHRoaXMsIFsnaGFuZGxlQ2xpY2snLCAnaGFuZGxlT3RoZXInXSk7XG5cdH1cbiovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYmluZEZ1bmN0aW9ucyAoZnVuY3Rpb25zKSB7XG5cdGZ1bmN0aW9ucy5mb3JFYWNoKGYgPT4gKHRoaXNbZl0gPSB0aGlzW2ZdLmJpbmQodGhpcykpKTtcbn07XG4iLCIvLyBEb24ndCB0cnkgYW5kIGFwcGx5IG92ZXJmbG93L3BhZGRpbmcgaWYgdGhlIHNjcm9sbCBpcyBhbHJlYWR5IGJsb2NrZWRcbmxldCBib2R5QmxvY2tlZCA9IGZhbHNlO1xuXG5jb25zdCBhbGxvd1Njcm9sbCA9IGZ1bmN0aW9uICgpIHtcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnIHx8ICFib2R5QmxvY2tlZCkgcmV0dXJuO1xuXG5cdC8vICBGSVhNRSBpT1MgaWdub3JlcyBvdmVyZmxvdyBvbiBib2R5XG5cblx0dHJ5IHtcblx0XHRjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5ib2R5O1xuXG5cdFx0dGFyZ2V0LnN0eWxlLnBhZGRpbmdSaWdodCA9ICcnO1xuXHRcdHRhcmdldC5zdHlsZS5vdmVyZmxvd1kgPSAnJztcblxuXHRcdGJvZHlCbG9ja2VkID0gZmFsc2U7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBmaW5kIGJvZHkgZWxlbWVudC4gRXJyOicsIGVycik7XG5cdH1cbn07XG5cbmNvbnN0IGJsb2NrU2Nyb2xsID0gZnVuY3Rpb24gKCkge1xuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgfHwgYm9keUJsb2NrZWQpIHJldHVybjtcblxuXHQvLyAgRklYTUUgaU9TIGlnbm9yZXMgb3ZlcmZsb3cgb24gYm9keVxuXG5cdHRyeSB7XG5cdFx0Y29uc3Qgc2Nyb2xsQmFyV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCAtIGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGg7XG5cblx0XHRjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5ib2R5O1xuXG5cdFx0dGFyZ2V0LnN0eWxlLnBhZGRpbmdSaWdodCA9IHNjcm9sbEJhcldpZHRoICsgJ3B4Jztcblx0XHR0YXJnZXQuc3R5bGUub3ZlcmZsb3dZID0gJ2hpZGRlbic7XG5cblx0XHRib2R5QmxvY2tlZCA9IHRydWU7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBmaW5kIGJvZHkgZWxlbWVudC4gRXJyOicsIGVycik7XG5cdH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRhbGxvd1Njcm9sbCxcblx0YmxvY2tTY3JvbGwsXG59O1xuIiwiLy8gUmV0dXJuIHRydWUgaWYgd2luZG93ICsgZG9jdW1lbnRcblxubW9kdWxlLmV4cG9ydHMgPSAhIShcblx0dHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcblx0JiYgd2luZG93LmRvY3VtZW50XG5cdCYmIHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50XG4pO1xuIiwiaW1wb3J0IGJpbmRGdW5jdGlvbnMgZnJvbSAnLi9iaW5kRnVuY3Rpb25zJztcbmltcG9ydCBib2R5U2Nyb2xsIGZyb20gJy4vYm9keVNjcm9sbCc7XG5pbXBvcnQgY2FuVXNlRG9tIGZyb20gJy4vY2FuVXNlRG9tJztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdGJpbmRGdW5jdGlvbnMsXG5cdGJvZHlTY3JvbGwsXG5cdGNhblVzZURvbSxcbn07XG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjc3MsIFN0eWxlU2hlZXQgfSBmcm9tICdhcGhyb2RpdGUvbm8taW1wb3J0YW50Jztcbi8vIGltcG9ydCBTd2lwZWFibGUgZnJvbSAncmVhY3Qtc3dpcGVhYmxlJztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHRoZW1lIGZyb20gJy4vdGhlbWUnO1xuaW1wb3J0IEFycm93IGZyb20gJy4vQXJyb3cnO1xuaW1wb3J0IEZvb3RlciBmcm9tICcuL0Zvb3Rlcic7XG5pbXBvcnQgSGVhZGVyIGZyb20gJy4vSGVhZGVyJztcbmltcG9ydCBQb3J0YWwgZnJvbSAnLi9Qb3J0YWwnO1xuXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4vc3R5bGVzL2RlZmF1bHQnO1xuXG5jb25zdCBjbGFzc2VzID0gU3R5bGVTaGVldC5jcmVhdGUoc3R5bGVzKTtcblxuY2xhc3MgTGlnaHRib3ggZXh0ZW5kcyBDb21wb25lbnQge1xuXHRzdGF0aWMgdGhlbWUgKHRoZW1lU3R5bGVzKSB7XG5cdFx0Y29uc3QgZXh0U3R5bGVzID0gT2JqZWN0LmFzc2lnbih7fSwgc3R5bGVzKTtcblx0XHRmb3IgKGNvbnN0IGtleSBpbiBleHRTdHlsZXMpIHtcblx0XHRcdGlmIChrZXkgaW4gdGhlbWVTdHlsZXMpIHtcblx0XHRcdFx0ZXh0U3R5bGVzW2tleV0gPSBPYmplY3QuYXNzaWduKHt9LCBzdHlsZXNba2V5XSwgdGhlbWVTdHlsZXNba2V5XSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBleHRTdHlsZXM7XG5cdH1cblx0Y29uc3RydWN0b3IgKCkge1xuXHRcdHN1cGVyKCk7XG5cblx0XHR1dGlscy5iaW5kRnVuY3Rpb25zLmNhbGwodGhpcywgW1xuXHRcdFx0J2dvdG9OZXh0Jyxcblx0XHRcdCdnb3RvUHJldicsXG5cdFx0XHQnaGFuZGxlS2V5Ym9hcmRJbnB1dCcsXG5cdFx0XSk7XG5cdH1cblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyAobmV4dFByb3BzKSB7XG5cdFx0aWYgKCF1dGlscy5jYW5Vc2VEb20pIHJldHVybjtcblxuXHRcdC8vIHByZWxvYWQgaW1hZ2VzXG5cdFx0aWYgKG5leHRQcm9wcy5wcmVsb2FkTmV4dEltYWdlKSB7XG5cdFx0XHRjb25zdCBjdXJyZW50SW5kZXggPSB0aGlzLnByb3BzLmN1cnJlbnRJbWFnZTtcblx0XHRcdGNvbnN0IG5leHRJbmRleCA9IG5leHRQcm9wcy5jdXJyZW50SW1hZ2UgKyAxO1xuXHRcdFx0Y29uc3QgcHJldkluZGV4ID0gbmV4dFByb3BzLmN1cnJlbnRJbWFnZSAtIDE7XG5cdFx0XHRsZXQgcHJlbG9hZEluZGV4O1xuXG5cdFx0XHRpZiAoY3VycmVudEluZGV4ICYmIG5leHRQcm9wcy5jdXJyZW50SW1hZ2UgPiBjdXJyZW50SW5kZXgpIHtcblx0XHRcdFx0cHJlbG9hZEluZGV4ID0gbmV4dEluZGV4O1xuXHRcdFx0fSBlbHNlIGlmIChjdXJyZW50SW5kZXggJiYgbmV4dFByb3BzLmN1cnJlbnRJbWFnZSA8IGN1cnJlbnRJbmRleCkge1xuXHRcdFx0XHRwcmVsb2FkSW5kZXggPSBwcmV2SW5kZXg7XG5cdFx0XHR9XG5cblx0XHRcdC8vIGlmIHdlIGtub3cgdGhlIHVzZXIncyBkaXJlY3Rpb24ganVzdCBnZXQgb25lIGltYWdlXG5cdFx0XHQvLyBvdGhlcndpc2UsIHRvIGJlIHNhZmUsIHdlIG5lZWQgdG8gZ3JhYiBvbmUgaW4gZWFjaCBkaXJlY3Rpb25cblx0XHRcdGlmIChwcmVsb2FkSW5kZXgpIHtcblx0XHRcdFx0dGhpcy5wcmVsb2FkSW1hZ2UocHJlbG9hZEluZGV4KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMucHJlbG9hZEltYWdlKHByZXZJbmRleCk7XG5cdFx0XHRcdHRoaXMucHJlbG9hZEltYWdlKG5leHRJbmRleCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gYWRkIGV2ZW50IGxpc3RlbmVyc1xuXHRcdGlmIChuZXh0UHJvcHMuZW5hYmxlS2V5Ym9hcmRJbnB1dCkge1xuXHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmhhbmRsZUtleWJvYXJkSW5wdXQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuaGFuZGxlS2V5Ym9hcmRJbnB1dCk7XG5cdFx0fVxuXG5cdFx0Ly8gaGFuZGxlIGJvZHkgc2Nyb2xsXG5cdFx0aWYgKG5leHRQcm9wcy5pc09wZW4pIHtcblx0XHRcdHV0aWxzLmJvZHlTY3JvbGwuYmxvY2tTY3JvbGwoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dXRpbHMuYm9keVNjcm9sbC5hbGxvd1Njcm9sbCgpO1xuXHRcdH1cblx0fVxuXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHQvLyBNRVRIT0RTXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cdHByZWxvYWRJbWFnZSAoaWR4KSB7XG5cdFx0Y29uc3QgaW1hZ2UgPSB0aGlzLnByb3BzLmltYWdlc1tpZHhdO1xuXG5cdFx0aWYgKCFpbWFnZSkgcmV0dXJuO1xuXG5cdFx0Y29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG5cblx0XHRpbWcuc3JjID0gaW1hZ2Uuc3JjO1xuXG5cdFx0aWYgKGltYWdlLnNyY3NldCkge1xuXHRcdFx0aW1nLnNyY3NldCA9IGltYWdlLnNyY3NldC5qb2luKCk7XG5cdFx0fVxuXHR9XG5cdGdvdG9OZXh0IChldmVudCkge1xuXHRcdGlmICh0aGlzLnByb3BzLmN1cnJlbnRJbWFnZSA9PT0gKHRoaXMucHJvcHMuaW1hZ2VzLmxlbmd0aCAtIDEpKSByZXR1cm47XG5cdFx0aWYgKGV2ZW50KSB7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0fVxuXHRcdHRoaXMucHJvcHMub25DbGlja05leHQoKTtcblxuXHR9XG5cdGdvdG9QcmV2IChldmVudCkge1xuXHRcdGlmICh0aGlzLnByb3BzLmN1cnJlbnRJbWFnZSA9PT0gMCkgcmV0dXJuO1xuXHRcdGlmIChldmVudCkge1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdH1cblx0XHR0aGlzLnByb3BzLm9uQ2xpY2tQcmV2KCk7XG5cblx0fVxuXHRoYW5kbGVLZXlib2FyZElucHV0IChldmVudCkge1xuXHRcdGlmIChldmVudC5rZXlDb2RlID09PSAzNykge1xuXHRcdFx0dGhpcy5nb3RvUHJldihldmVudCk7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9IGVsc2UgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM5KSB7XG5cdFx0XHR0aGlzLmdvdG9OZXh0KGV2ZW50KTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0gZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMjcpIHtcblx0XHRcdHRoaXMucHJvcHMub25DbG9zZSgpO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblxuXHR9XG5cblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdC8vIFJFTkRFUkVSU1xuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXHRyZW5kZXJBcnJvd1ByZXYgKCkge1xuXHRcdGlmICh0aGlzLnByb3BzLmN1cnJlbnRJbWFnZSA9PT0gMCkgcmV0dXJuIG51bGw7XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PEFycm93XG5cdFx0XHRcdGRpcmVjdGlvbj1cImxlZnRcIlxuXHRcdFx0XHRpY29uPVwiYXJyb3dMZWZ0XCJcblx0XHRcdFx0b25DbGljaz17dGhpcy5nb3RvUHJldn1cblx0XHRcdFx0dGl0bGU9XCJQcmV2aW91cyAoTGVmdCBhcnJvdyBrZXkpXCJcblx0XHRcdFx0dHlwZT1cImJ1dHRvblwiXG5cdFx0XHQvPlxuXHRcdCk7XG5cdH1cblx0cmVuZGVyQXJyb3dOZXh0ICgpIHtcblx0XHRpZiAodGhpcy5wcm9wcy5jdXJyZW50SW1hZ2UgPT09ICh0aGlzLnByb3BzLmltYWdlcy5sZW5ndGggLSAxKSkgcmV0dXJuIG51bGw7XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PEFycm93XG5cdFx0XHRcdGRpcmVjdGlvbj1cInJpZ2h0XCJcblx0XHRcdFx0aWNvbj1cImFycm93UmlnaHRcIlxuXHRcdFx0XHRvbkNsaWNrPXt0aGlzLmdvdG9OZXh0fVxuXHRcdFx0XHR0aXRsZT1cIlByZXZpb3VzIChSaWdodCBhcnJvdyBrZXkpXCJcblx0XHRcdFx0dHlwZT1cImJ1dHRvblwiXG5cdFx0XHQvPlxuXHRcdCk7XG5cdH1cblx0cmVuZGVyRGlhbG9nICgpIHtcblx0XHRjb25zdCB7XG5cdFx0XHRiYWNrZHJvcENsb3Nlc01vZGFsLFxuXHRcdFx0Y3VzdG9tQ29udHJvbHMsXG5cdFx0XHRpc09wZW4sXG5cdFx0XHRvbkNsb3NlLFxuXHRcdFx0c2hvd0Nsb3NlQnV0dG9uLFxuXHRcdH0gPSB0aGlzLnByb3BzO1xuXG5cdFx0aWYgKCFpc09wZW4pIHJldHVybiBudWxsO1xuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXZcblx0XHRcdFx0a2V5PVwiZGlhbG9nXCJcblx0XHRcdFx0Y2xhc3NOYW1lPXtjc3MoY2xhc3Nlcy5jb250YWluZXIpfVxuXHRcdFx0XHRvbkNsaWNrPXshIWJhY2tkcm9wQ2xvc2VzTW9kYWwgJiYgb25DbG9zZX1cblx0XHRcdFx0b25Ub3VjaEVuZD17ISFiYWNrZHJvcENsb3Nlc01vZGFsICYmIG9uQ2xvc2V9XG5cdFx0XHQ+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPXtjc3MoY2xhc3Nlcy5jb250ZW50KX0gc3R5bGU9e3sgbWF4V2lkdGg6IHRoaXMucHJvcHMud2lkdGggfX0+XG5cdFx0XHRcdFx0PEhlYWRlclxuXHRcdFx0XHRcdFx0Y3VzdG9tQ29udHJvbHM9e2N1c3RvbUNvbnRyb2xzfVxuXHRcdFx0XHRcdFx0b25DbG9zZT17b25DbG9zZX1cblx0XHRcdFx0XHRcdHNob3dDbG9zZUJ1dHRvbj17c2hvd0Nsb3NlQnV0dG9ufVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0e3RoaXMucmVuZGVySW1hZ2VzKCl9XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHR7dGhpcy5yZW5kZXJBcnJvd1ByZXYoKX1cblx0XHRcdFx0e3RoaXMucmVuZGVyQXJyb3dOZXh0KCl9XG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG5cdHJlbmRlckltYWdlcyAoKSB7XG5cdFx0Y29uc3Qge1xuXHRcdFx0Y3VycmVudEltYWdlLFxuXHRcdFx0aW1hZ2VzLFxuXHRcdFx0aW1hZ2VDb3VudFNlcGFyYXRvcixcblx0XHRcdG9uQ2xpY2tJbWFnZSxcblx0XHRcdHNob3dJbWFnZUNvdW50LFxuXHRcdH0gPSB0aGlzLnByb3BzO1xuXG5cdFx0aWYgKCFpbWFnZXMgfHwgIWltYWdlcy5sZW5ndGgpIHJldHVybiBudWxsO1xuXG5cdFx0Y29uc3QgaW1hZ2UgPSBpbWFnZXNbY3VycmVudEltYWdlXTtcblxuXHRcdGxldCBzcmNzZXQ7XG5cdFx0bGV0IHNpemVzO1xuXHRcdGxldCB3aWR0aDtcblxuXHRcdGlmIChpbWFnZS5zcmNzZXQpIHtcblx0XHRcdHNyY3NldCA9IGltYWdlLnNyY3NldC5qb2luKCk7XG5cdFx0XHRzaXplcyA9ICcxMDB2dyc7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxmaWd1cmUgY2xhc3NOYW1lPXtjc3MoY2xhc3Nlcy5maWd1cmUpfSBzdHlsZT17eyB3aWR0aCB9fT5cblx0XHRcdFx0ey8qXG5cdFx0XHRcdFx0UmUtaW1wbGVtZW50IHdoZW4gcmVhY3Qgd2FybmluZyBcInVua25vd24gcHJvcHNcIlxuXHRcdFx0XHRcdGh0dHBzOi8vZmIubWUvcmVhY3QtdW5rbm93bi1wcm9wIGlzIHJlc29sdmVkXG5cdFx0XHRcdFx0PFN3aXBlYWJsZSBvblN3aXBlZExlZnQ9e3RoaXMuZ290b05leHR9IG9uU3dpcGVkUmlnaHQ9e3RoaXMuZ290b1ByZXZ9IC8+XG5cdFx0XHRcdCovfVxuXHRcdFx0XHQ8aW1nXG5cdFx0XHRcdFx0Y2xhc3NOYW1lPXtjc3MoY2xhc3Nlcy5pbWFnZSl9XG5cdFx0XHRcdFx0b25DbGljaz17ISFvbkNsaWNrSW1hZ2UgJiYgb25DbGlja0ltYWdlfVxuXHRcdFx0XHRcdHNpemVzPXtzaXplc31cblx0XHRcdFx0XHRzcmM9e2ltYWdlLnNyY31cblx0XHRcdFx0XHRzcmNTZXQ9e3NyY3NldH1cblx0XHRcdFx0XHRzdHlsZT17e1xuXHRcdFx0XHRcdFx0Y3Vyc29yOiB0aGlzLnByb3BzLm9uQ2xpY2tJbWFnZSA/ICdwb2ludGVyJyA6ICdhdXRvJyxcblx0XHRcdFx0XHRcdG1heEhlaWdodDogYGNhbGMoMTAwdmggLSAke3RoZW1lLmhlYWRlci5oZWlnaHQgKyB0aGVtZS5mb290ZXIuaGVpZ2h0fXB4KWAsXG5cdFx0XHRcdFx0fX1cblx0XHRcdFx0Lz5cblx0XHRcdFx0PEZvb3RlclxuXHRcdFx0XHRcdGNhcHRpb249e2ltYWdlc1tjdXJyZW50SW1hZ2VdLmNhcHRpb259XG5cdFx0XHRcdFx0Y291bnRDdXJyZW50PXtjdXJyZW50SW1hZ2UgKyAxfVxuXHRcdFx0XHRcdGNvdW50U2VwYXJhdG9yPXtpbWFnZUNvdW50U2VwYXJhdG9yfVxuXHRcdFx0XHRcdGNvdW50VG90YWw9e2ltYWdlcy5sZW5ndGh9XG5cdFx0XHRcdFx0c2hvd0NvdW50PXtzaG93SW1hZ2VDb3VudH1cblx0XHRcdFx0Lz5cblx0XHRcdDwvZmlndXJlPlxuXHRcdCk7XG5cdH1cblx0cmVuZGVyICgpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PFBvcnRhbD5cblx0XHRcdFx0e3RoaXMucmVuZGVyRGlhbG9nKCl9XG5cdFx0XHQ8L1BvcnRhbD5cblx0XHQpO1xuXHR9XG59XG5cbkxpZ2h0Ym94LmRpc3BsYXlOYW1lID0gJ0xpZ2h0Ym94JztcblxuTGlnaHRib3gucHJvcFR5cGVzID0ge1xuXHRiYWNrZHJvcENsb3Nlc01vZGFsOiBQcm9wVHlwZXMuYm9vbCxcblx0Y3VycmVudEltYWdlOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRjdXN0b21Db250cm9sczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm5vZGUpLFxuXHRlbmFibGVLZXlib2FyZElucHV0OiBQcm9wVHlwZXMuYm9vbCxcblx0aW1hZ2VDb3VudFNlcGFyYXRvcjogUHJvcFR5cGVzLnN0cmluZyxcblx0aW1hZ2VzOiBQcm9wVHlwZXMuYXJyYXlPZihcblx0XHRQcm9wVHlwZXMuc2hhcGUoe1xuXHRcdFx0c3JjOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG5cdFx0XHRzcmNzZXQ6IFByb3BUeXBlcy5hcnJheSxcblx0XHRcdGNhcHRpb246IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0fSlcblx0KS5pc1JlcXVpcmVkLFxuXHRpc09wZW46IFByb3BUeXBlcy5ib29sLFxuXHRvbkNsaWNrSW1hZ2U6IFByb3BUeXBlcy5mdW5jLFxuXHRvbkNsaWNrTmV4dDogUHJvcFR5cGVzLmZ1bmMsXG5cdG9uQ2xpY2tQcmV2OiBQcm9wVHlwZXMuZnVuYyxcblx0b25DbG9zZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblx0cHJlbG9hZE5leHRJbWFnZTogUHJvcFR5cGVzLmJvb2wsXG5cdHNoZWV0OiBQcm9wVHlwZXMub2JqZWN0LFxuXHRzaG93Q2xvc2VCdXR0b246IFByb3BUeXBlcy5ib29sLFxuXHRzaG93SW1hZ2VDb3VudDogUHJvcFR5cGVzLmJvb2wsXG5cdHdpZHRoOiBQcm9wVHlwZXMubnVtYmVyLFxufTtcblxuTGlnaHRib3guZGVmYXVsdFByb3BzID0ge1xuXHRjdXJyZW50SW1hZ2U6IDAsXG5cdGVuYWJsZUtleWJvYXJkSW5wdXQ6IHRydWUsXG5cdGltYWdlQ291bnRTZXBhcmF0b3I6ICcgb2YgJyxcblx0b25DbGlja1Nob3dOZXh0SW1hZ2U6IHRydWUsXG5cdHByZWxvYWROZXh0SW1hZ2U6IHRydWUsXG5cdHNob3dDbG9zZUJ1dHRvbjogdHJ1ZSxcblx0c2hvd0ltYWdlQ291bnQ6IHRydWUsXG5cdHdpZHRoOiAxMDI0LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgTGlnaHRib3g7XG4iXX0=
