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

var _theme = require('../theme');

var _theme2 = _interopRequireDefault(_theme);

var _utils = require('../utils');

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function Arrow(_ref, _ref2) {
	var direction = _ref.direction;
	var icon = _ref.icon;
	var onClick = _ref.onClick;
	var size = _ref.size;

	var props = _objectWithoutProperties(_ref, ['direction', 'icon', 'onClick', 'size']);

	var theme = _ref2.theme;

	var classes = _aphroditeNoImportant.StyleSheet.create((0, _utils.deepMerge)(defaultStyles, theme));

	return _react2['default'].createElement(
		'button',
		_extends({
			type: 'button',
			className: (0, _aphroditeNoImportant.css)(classes.arrow, classes['arrow__direction__' + direction], size && classes['arrow__size__' + size]),
			onClick: onClick,
			onTouchEnd: onClick
		}, props),
		_react2['default'].createElement(_Icon2['default'], { fill: !!theme.arrow && theme.arrow.fill || _theme2['default'].arrow.fill, type: icon })
	);
};

Arrow.propTypes = {
	direction: _react.PropTypes.oneOf(['left', 'right']),
	icon: _react.PropTypes.string,
	onClick: _react.PropTypes.func.isRequired,
	size: _react.PropTypes.oneOf(['medium', 'small']).isRequired
};
Arrow.defaultProps = {
	size: 'medium'
};
Arrow.contextTypes = {
	theme: _react.PropTypes.object.isRequired
};

var defaultStyles = {
	arrow: {
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
	},

	// sizees
	arrow__size__medium: {
		height: _theme2['default'].arrow.height,
		marginTop: _theme2['default'].arrow.height / -2,
		width: 40,

		'@media (min-width: 768px)': {
			width: 70
		}
	},
	arrow__size__small: {
		height: _theme2['default'].thumbnail.size,
		marginTop: _theme2['default'].thumbnail.size / -2,
		width: 30,

		'@media (min-width: 500px)': {
			width: 40
		}
	},

	// direction
	arrow__direction__right: {
		right: _theme2['default'].container.gutter.horizontal
	},
	arrow__direction__left: {
		left: _theme2['default'].container.gutter.horizontal
	}
};

module.exports = Arrow;

},{"../theme":38,"../utils":42,"./Icon":28,"aphrodite/no-important":6,"react":undefined}],25:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _aphroditeNoImportant = require('aphrodite/no-important');

var _theme = require('../theme');

var _theme2 = _interopRequireDefault(_theme);

var _utils = require('../utils');

function Container(_ref, _ref2) {
	var props = _objectWithoutProperties(_ref, []);

	var theme = _ref2.theme;

	var classes = _aphroditeNoImportant.StyleSheet.create((0, _utils.deepMerge)(defaultStyles, theme));

	return _react2['default'].createElement('div', _extends({
		className: (0, _aphroditeNoImportant.css)(classes.container)
	}, props));
};

Container.contextTypes = {
	theme: _react.PropTypes.object.isRequired
};

var defaultStyles = {
	container: {
		//alignItems: 'center',
		backgroundColor: _theme2['default'].container.background,
		boxSizing: 'border-box',
		//display: 'flex',
		height: '100%',
		//justifyContent: 'center',
		left: 0,
		paddingBottom: _theme2['default'].container.gutter.vertical,
		paddingLeft: _theme2['default'].container.gutter.horizontal,
		paddingRight: _theme2['default'].container.gutter.horizontal,
		paddingTop: _theme2['default'].container.gutter.vertical,
		position: 'fixed',
		top: 0,
		width: '100%',
		zIndex: _theme2['default'].container.zIndex
	}
};

module.exports = Container;

},{"../theme":38,"../utils":42,"aphrodite/no-important":6,"react":undefined}],26:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _aphroditeNoImportant = require('aphrodite/no-important');

var _theme = require('../theme');

var _theme2 = _interopRequireDefault(_theme);

var _utils = require('../utils');

function Footer(_ref, _ref2) {
	var caption = _ref.caption;
	var countCurrent = _ref.countCurrent;
	var countSeparator = _ref.countSeparator;
	var countTotal = _ref.countTotal;
	var showCount = _ref.showCount;

	var props = _objectWithoutProperties(_ref, ['caption', 'countCurrent', 'countSeparator', 'countTotal', 'showCount']);

	var theme = _ref2.theme;

	if (!caption && !showCount) return null;

	var classes = _aphroditeNoImportant.StyleSheet.create((0, _utils.deepMerge)(defaultStyles, theme));

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
	caption: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
	countCurrent: _react.PropTypes.number,
	countSeparator: _react.PropTypes.string,
	countTotal: _react.PropTypes.number,
	showCount: _react.PropTypes.bool
};
Footer.contextTypes = {
	theme: _react.PropTypes.object.isRequired
};

var defaultStyles = {
	footer: {
		boxSizing: 'border-box',
		color: _theme2['default'].footer.color,
		cursor: 'auto',
		display: 'flex',
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
};

module.exports = Footer;

},{"../theme":38,"../utils":42,"aphrodite/no-important":6,"react":undefined}],27:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _aphroditeNoImportant = require('aphrodite/no-important');

var _theme = require('../theme');

var _theme2 = _interopRequireDefault(_theme);

var _utils = require('../utils');

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function Header(_ref, _ref2) {
	var customControls = _ref.customControls;
	var onClose = _ref.onClose;
	var showCloseButton = _ref.showCloseButton;

	var props = _objectWithoutProperties(_ref, ['customControls', 'onClose', 'showCloseButton']);

	var theme = _ref2.theme;

	var classes = _aphroditeNoImportant.StyleSheet.create((0, _utils.deepMerge)(defaultStyles, theme));

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
			_react2['default'].createElement(_Icon2['default'], { fill: !!theme.close && theme.close.fill || _theme2['default'].close.fill, type: 'close' })
		)
	);
};

Header.propTypes = {
	customControls: _react.PropTypes.array,
	onClose: _react.PropTypes.func.isRequired,
	showCloseButton: _react.PropTypes.bool
};
Header.contextTypes = {
	theme: _react.PropTypes.object.isRequired
};

var defaultStyles = {
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
};

module.exports = Header;

},{"../theme":38,"../utils":42,"./Icon":28,"aphrodite/no-important":6,"react":undefined}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _icons = require('../icons');

var _icons2 = _interopRequireDefault(_icons);

var Icon = function Icon(_ref) {
	var fill = _ref.fill;
	var type = _ref.type;

	var props = _objectWithoutProperties(_ref, ['fill', 'type']);

	var icon = _icons2['default'][type];

	return _react2['default'].createElement('span', _extends({
		dangerouslySetInnerHTML: { __html: icon(fill) }
	}, props));
};

Icon.propTypes = {
	fill: _react.PropTypes.string,
	type: _react.PropTypes.oneOf(Object.keys(_icons2['default']))
};
Icon.defaultProps = {
	fill: 'white'
};

exports['default'] = Icon;
module.exports = exports['default'];

},{"../icons":37,"react":undefined}],29:[function(require,module,exports){
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

var _aphroditeNoImportant = require('aphrodite/no-important');

var _Thumbnail = require('./Thumbnail');

var _Thumbnail2 = _interopRequireDefault(_Thumbnail);

var _Arrow = require('./Arrow');

var _Arrow2 = _interopRequireDefault(_Arrow);

var _theme = require('../theme');

var _theme2 = _interopRequireDefault(_theme);

var classes = _aphroditeNoImportant.StyleSheet.create({
	paginatedThumbnails: {
		bottom: _theme2['default'].container.gutter.vertical,
		height: _theme2['default'].thumbnail.size,
		padding: '0 50px',
		position: 'absolute',
		textAlign: 'center',
		whiteSpace: 'nowrap'
	}
});

var arrowStyles = {
	height: _theme2['default'].thumbnail.size + _theme2['default'].thumbnail.gutter * 2,
	width: 40
};

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
				style: arrowStyles,
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
				style: arrowStyles,
				title: 'Previous (Right arrow key)',
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
				'div',
				{ className: (0, _aphroditeNoImportant.css)(classes.paginatedThumbnails) },
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
	currentImage: _react.PropTypes.number,
	images: _react.PropTypes.array,
	offset: _react.PropTypes.number,
	onClickThumbnail: _react.PropTypes.func.isRequired
};
module.exports = exports['default'];

},{"../theme":38,"./Arrow":24,"./Thumbnail":33,"aphrodite/no-important":6,"react":undefined}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

// Pass the Lightbox context through to the Portal's descendents
// StackOverflow discussion http://goo.gl/oclrJ9

var PassContext = (function (_Component) {
	_inherits(PassContext, _Component);

	function PassContext() {
		_classCallCheck(this, PassContext);

		_get(Object.getPrototypeOf(PassContext.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(PassContext, [{
		key: 'getChildContext',
		value: function getChildContext() {
			return this.props.context;
		}
	}, {
		key: 'render',
		value: function render() {
			return _react.Children.only(this.props.children);
		}
	}]);

	return PassContext;
})(_react.Component);

;

PassContext.propTypes = {
	context: _react.PropTypes.object.isRequired
};
PassContext.childContextTypes = {
	theme: _react.PropTypes.object
};

exports['default'] = PassContext;
module.exports = exports['default'];

},{"react":undefined}],31:[function(require,module,exports){
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

var _PassContext = require('./PassContext');

var _PassContext2 = _interopRequireDefault(_PassContext);

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
			// Animate fade on mount/unmount
			var duration = 200;
			var styles = '\n\t\t\t\t.fade-enter { opacity: 0.01; }\n\t\t\t\t.fade-enter.fade-enter-active { opacity: 1; transition: opacity ' + duration + 'ms; }\n\t\t\t\t.fade-leave { opacity: 1; }\n\t\t\t\t.fade-leave.fade-leave-active { opacity: 0.01; transition: opacity ' + duration + 'ms; }\n\t\t';

			(0, _reactDom.render)(_react2['default'].createElement(
				_PassContext2['default'],
				{ context: this.context },
				_react2['default'].createElement(
					'div',
					null,
					_react2['default'].createElement(
						'style',
						null,
						styles
					),
					_react2['default'].createElement(_reactAddonsCssTransitionGroup2['default'], _extends({
						component: 'div',
						transitionName: 'fade',
						transitionEnterTimeout: duration,
						transitionLeaveTimeout: duration
					}, this.props))
				)
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

Portal.contextTypes = {
	theme: _react.PropTypes.object.isRequired
};
module.exports = exports['default'];

},{"./PassContext":30,"react":undefined,"react-addons-css-transition-group":undefined,"react-dom":undefined}],32:[function(require,module,exports){
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

var lockCount = 0;

var ScrollLock = (function (_Component) {
	_inherits(ScrollLock, _Component);

	function ScrollLock() {
		_classCallCheck(this, ScrollLock);

		_get(Object.getPrototypeOf(ScrollLock.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(ScrollLock, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			if (typeof window === 'undefined') return;

			lockCount++;
			if (lockCount > 1) return;

			//	FIXME iOS ignores overflow on body
			try {
				var scrollBarWidth = window.innerWidth - document.body.clientWidth;

				var target = document.body;

				target.style.paddingRight = scrollBarWidth + 'px';
				target.style.overflowY = 'hidden';
			} catch (err) {
				console.error('Failed to find body element. Err:', err);
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			if (typeof window === 'undefined' || lockCount === 0) return;

			lockCount--;
			if (lockCount > 0) return; // Still locked

			//	FIXME iOS ignores overflow on body
			try {
				var target = document.body;

				target.style.paddingRight = '';
				target.style.overflowY = '';
			} catch (err) {
				console.error('Failed to find body element. Err:', err);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			return null;
		}
	}]);

	return ScrollLock;
})(_react.Component);

exports['default'] = ScrollLock;
module.exports = exports['default'];

},{"react":undefined}],33:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _aphroditeNoImportant = require('aphrodite/no-important');

var _theme = require('../theme');

var _theme2 = _interopRequireDefault(_theme);

var _utils = require('../utils');

function Thumbnail(_ref, _ref2) {
	var index = _ref.index;
	var src = _ref.src;
	var thumbnail = _ref.thumbnail;
	var active = _ref.active;
	var onClick = _ref.onClick;
	var theme = _ref2.theme;

	var url = thumbnail ? thumbnail : src;
	var classes = _aphroditeNoImportant.StyleSheet.create((0, _utils.deepMerge)(defaultStyles, theme));

	return _react2['default'].createElement('div', {
		className: (0, _aphroditeNoImportant.css)(classes.thumbnail, active && classes.thumbnail__active),
		onClick: function (e) {
			e.preventDefault();
			e.stopPropagation();

			onClick(index);
		},
		style: { backgroundImage: 'url("' + url + '")' }
	});
}

Thumbnail.propTypes = {
	active: _react.PropTypes.bool,
	index: _react.PropTypes.number,
	onClick: _react.PropTypes.func.isRequired,
	src: _react.PropTypes.string,
	thumbnail: _react.PropTypes.string
};

Thumbnail.contextTypes = {
	theme: _react.PropTypes.object.isRequired
};

var defaultStyles = {
	thumbnail: {
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		borderRadius: 2,
		boxShadow: 'inset 0 0 0 1px hsla(0,0%,100%,.2)',
		cursor: 'pointer',
		display: 'inline-block',
		height: _theme2['default'].thumbnail.size,
		margin: _theme2['default'].thumbnail.gutter,
		overflow: 'hidden',
		width: _theme2['default'].thumbnail.size
	},
	thumbnail__active: {
		boxShadow: 'inset 0 0 0 2px ' + _theme2['default'].thumbnail.activeBorderColor
	}
};

exports['default'] = Thumbnail;
module.exports = exports['default'];

},{"../theme":38,"../utils":42,"aphrodite/no-important":6,"react":undefined}],34:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports["default"] = function (fill) {
	return "<svg fill=\"" + fill + "\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" width=\"100%\" height=\"100%\" viewBox=\"0 0 512 512\" xml:space=\"preserve\">\n\t\t<path d=\"M213.7,256L213.7,256L213.7,256L380.9,81.9c4.2-4.3,4.1-11.4-0.2-15.8l-29.9-30.6c-4.3-4.4-11.3-4.5-15.5-0.2L131.1,247.9 c-2.2,2.2-3.2,5.2-3,8.1c-0.1,3,0.9,5.9,3,8.1l204.2,212.7c4.2,4.3,11.2,4.2,15.5-0.2l29.9-30.6c4.3-4.4,4.4-11.5,0.2-15.8 L213.7,256z\"/>\n\t</svg>";
};

module.exports = exports["default"];

},{}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports["default"] = function (fill) {
	return "<svg fill=\"" + fill + "\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" width=\"100%\" height=\"100%\" viewBox=\"0 0 512 512\" xml:space=\"preserve\">\n\t\t<path d=\"M298.3,256L298.3,256L298.3,256L131.1,81.9c-4.2-4.3-4.1-11.4,0.2-15.8l29.9-30.6c4.3-4.4,11.3-4.5,15.5-0.2l204.2,212.7 c2.2,2.2,3.2,5.2,3,8.1c0.1,3-0.9,5.9-3,8.1L176.7,476.8c-4.2,4.3-11.2,4.2-15.5-0.2L131.3,446c-4.3-4.4-4.4-11.5-0.2-15.8 L298.3,256z\"/>\n\t</svg>";
};

module.exports = exports["default"];

},{}],36:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports["default"] = function (fill) {
	return "<svg fill=\"" + fill + "\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" width=\"100%\" height=\"100%\" viewBox=\"0 0 512 512\" style=\"enable-background:new 0 0 512 512;\" xml:space=\"preserve\">\n\t\t<path d=\"M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4 L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1 c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1 c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z\"/>\n\t</svg>";
};

module.exports = exports["default"];

},{}],37:[function(require,module,exports){
'use strict';

module.exports = {
	arrowLeft: require('./arrowLeft'),
	arrowRight: require('./arrowRight'),
	close: require('./close')
};

},{"./arrowLeft":34,"./arrowRight":35,"./close":36}],38:[function(require,module,exports){
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
	fill: 'white',
	height: 20,
	width: 20
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
theme.thumbnail = {
	activeBorderColor: 'white',
	size: 50,
	gutter: 2
};

// arrow
theme.arrow = {
	background: 'black',
	fill: 'white',
	height: 120
};

module.exports = theme;

},{}],39:[function(require,module,exports){
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

},{}],40:[function(require,module,exports){
// Return true if window + document

'use strict';

module.exports = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

},{}],41:[function(require,module,exports){
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

},{}],42:[function(require,module,exports){
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

},{"./bindFunctions":39,"./canUseDom":40,"./deepMerge":41}],"react-images":[function(require,module,exports){
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

var _aphroditeNoImportant = require('aphrodite/no-important');

var _reactSwipeable = require('react-swipeable');

var _reactSwipeable2 = _interopRequireDefault(_reactSwipeable);

var _reactMotion = require('react-motion');

var _theme = require('./theme');

var _theme2 = _interopRequireDefault(_theme);

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

var _componentsScrollLock = require('./components/ScrollLock');

var _componentsScrollLock2 = _interopRequireDefault(_componentsScrollLock);

var _utils = require('./utils');

var Lightbox = (function (_Component) {
	_inherits(Lightbox, _Component);

	function Lightbox() {
		_classCallCheck(this, Lightbox);

		_get(Object.getPrototypeOf(Lightbox.prototype), 'constructor', this).call(this);

		this.state = {
			swipeDeltaX: 0
		};

		_utils.bindFunctions.call(this, ['onClose', 'gotoNext', 'gotoPrev', 'onSwiping', 'onStopSwiping', 'handleKeyboardInput']);
	}

	_createClass(Lightbox, [{
		key: 'getChildContext',
		value: function getChildContext() {
			return {
				theme: this.props.theme
			};
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (!_utils.canUseDom) return;

			if (nextProps.currentImage !== this.props.currentImage) {
				this.resetSwipe();
			}

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
		key: 'onClose',
		value: function onClose(event) {
			if (event) {
				event.preventDefault();
				event.stopPropagation();
			}
			this.resetSwipe();
			this.props.onClose();
		}
	}, {
		key: 'gotoNext',
		value: function gotoNext(event) {
			if (this.isLastImage()) return;
			if (event) {
				event.preventDefault();
				event.stopPropagation();
			}
			this.props.onClickNext();
		}
	}, {
		key: 'gotoPrev',
		value: function gotoPrev(event) {
			if (this.isFirstImage()) return;
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
				this.onClose();
				return true;
			}
			return false;
		}
	}, {
		key: 'onSwiping',
		value: function onSwiping(event, deltaX, deltaY, absX, absY, velocity) {
			if (this.isFirstImage() && deltaX < 0 || this.isLastImage() && deltaX > 0) return;
			console.log('deltaX ' + deltaX + '  velocity ' + velocity);
			this.setState({
				swipeDeltaX: -deltaX
			});
		}
	}, {
		key: 'onStopSwiping',
		value: function onStopSwiping(event, x, y, isFlick, velocity) {
			if (event) {
				event.preventDefault();
				event.stopPropagation();
			}

			var quickSwipe = velocity > 0.7 && Math.abs(this.state.swipeDeltaX) > window.innerWidth * 0.3;

			var stayAtCurrentImage = !quickSwipe && Math.abs(this.state.swipeDeltaX) < window.innerWidth * 0.5;
			if (stayAtCurrentImage) {
				this.resetSwipe();
			} else if (this.state.swipeDeltaX < 0) {
				this.gotoNext();
			} else if (this.state.swipeDeltaX > 0) {
				this.gotoPrev();
			}
		}
	}, {
		key: 'resetSwipe',
		value: function resetSwipe() {
			this.setState({
				swipeDeltaX: 0
			});
		}
	}, {
		key: 'isFirstImage',
		value: function isFirstImage() {
			return this.props.currentImage === 0;
		}
	}, {
		key: 'isLastImage',
		value: function isLastImage() {
			return this.props.currentImage === this.props.images.length - 1;
		}
	}, {
		key: 'isImageVisible',
		value: function isImageVisible(imageIndex, deltaXWithContainerPadding) {
			var containerPadding = _theme2['default'].container.gutter.horizontal;
			var marginLeft = Math.abs(deltaXWithContainerPadding) - containerPadding;
			var visibleIndex = Math.floor(marginLeft / window.innerWidth);
			if (visibleIndex === imageIndex) {
				return true;
			}

			var isNextImageVisible = marginLeft - visibleIndex * window.innerWidth > 0;
			if (isNextImageVisible && imageIndex === visibleIndex + 1) {
				return true;
			} else {
				return false;
			}
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
				title: 'Previous (Left arrow key)',
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
				title: 'Previous (Right arrow key)',
				type: 'button'
			});
		}
	}, {
		key: 'renderDialog',
		value: function renderDialog() {
			var _this = this;

			var _props = this.props;
			var backdropClosesModal = _props.backdropClosesModal;
			var currentImage = _props.currentImage;
			var customControls = _props.customControls;
			var isOpen = _props.isOpen;
			var showCloseButton = _props.showCloseButton;
			var showThumbnails = _props.showThumbnails;
			var width = _props.width;
			var images = _props.images;

			if (!isOpen) return _react2['default'].createElement('span', { key: 'closed' });

			var offsetThumbnails = 0;
			if (showThumbnails) {
				offsetThumbnails = _theme2['default'].thumbnail.size + _theme2['default'].container.gutter.vertical;
			}

			var horizontalPadding = _theme2['default'].container.gutter.horizontal;

			var springConfig = { stiffness: 300, damping: 30 };
			var swipeDeltaX = this.state.swipeDeltaX;
			var motionStyle = { deltaX: (0, _reactMotion.spring)(-currentImage * window.innerWidth - horizontalPadding + swipeDeltaX, springConfig) };

			return _react2['default'].createElement(
				_componentsContainer2['default'],
				{
					key: 'open',
					onClick: !!backdropClosesModal && this.onClose,
					onTouchEnd: !!backdropClosesModal && this.onClose
				},
				_react2['default'].createElement(
					_reactSwipeable2['default'],
					{
						className: (0, _aphroditeNoImportant.css)(classes.swipeable),
						onSwiped: this.onStopSwiping,
						onSwiping: this.onSwiping
					},
					_react2['default'].createElement(
						_reactMotion.Motion,
						{ style: motionStyle },
						function (_ref) {
							var deltaX = _ref.deltaX;
							return _react2['default'].createElement(
								'div',
								{
									className: (0, _aphroditeNoImportant.css)(classes.swipeContainer),
									style: {
										width: window.innerWidth * images.length,
										transform: 'translate(' + deltaX + 'px, 0)',
										WebkitTransform: 'translate(' + deltaX + 'px, 0)'
									}
								},
								images.map(function (image, index) {
									return _react2['default'].createElement(
										'div',
										{
											key: index,
											className: (0, _aphroditeNoImportant.css)(classes.contentContainer),
											style: { width: window.innerWidth, paddingLeft: horizontalPadding, paddingRight: horizontalPadding }
										},
										_react2['default'].createElement(
											'div',
											{ className: (0, _aphroditeNoImportant.css)(classes.content), style: { marginBottom: offsetThumbnails, maxWidth: width } },
											_react2['default'].createElement(_componentsHeader2['default'], {
												customControls: customControls,
												onClose: _this.onClose,
												showCloseButton: showCloseButton
											}),
											_this.renderImage({ image: image, isVisible: _this.isImageVisible(index, deltaX) })
										)
									);
								})
							);
						}
					)
				),
				_react2['default'].createElement(
					'div',
					{ style: { display: 'flex', justifyContent: 'center' } },
					this.renderThumbnails(),
					this.renderArrowPrev(),
					this.renderArrowNext()
				),
				_react2['default'].createElement(_componentsScrollLock2['default'], null)
			);
		}
	}, {
		key: 'renderImage',
		value: function renderImage(_ref2) {
			var image = _ref2.image;
			var isVisible = _ref2.isVisible;
			var _props2 = this.props;
			var currentImage = _props2.currentImage;
			var images = _props2.images;
			var imageCountSeparator = _props2.imageCountSeparator;
			var onClickImage = _props2.onClickImage;
			var showImageCount = _props2.showImageCount;
			var showThumbnails = _props2.showThumbnails;

			if (!images || !images.length) return null;

			//const image = images[currentImage];

			var srcset = undefined;
			var sizes = undefined;

			if (image.srcset) {
				srcset = image.srcset.join();
				sizes = '100vw';
			}

			var thumbnailsSize = showThumbnails ? _theme2['default'].thumbnail.size : 0;
			var heightOffset = _theme2['default'].header.height + _theme2['default'].footer.height + thumbnailsSize + _theme2['default'].container.gutter.vertical + 'px';

			return _react2['default'].createElement(
				'figure',
				{ className: (0, _aphroditeNoImportant.css)(classes.figure) },
				_react2['default'].createElement('img', {
					className: (0, _aphroditeNoImportant.css)(classes.image),
					onClick: !!onClickImage && onClickImage,
					sizes: sizes,
					src: isVisible ? image.src : null,
					srcSet: isVisible ? srcset : null,
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
			return _react2['default'].createElement(
				_componentsPortal2['default'],
				null,
				this.renderDialog()
			);
		}
	}]);

	return Lightbox;
})(_react.Component);

Lightbox.propTypes = {
	backdropClosesModal: _react.PropTypes.bool,
	currentImage: _react.PropTypes.number,
	customControls: _react.PropTypes.arrayOf(_react.PropTypes.node),
	enableKeyboardInput: _react.PropTypes.bool,
	imageCountSeparator: _react.PropTypes.string,
	images: _react.PropTypes.arrayOf(_react.PropTypes.shape({
		src: _react.PropTypes.string.isRequired,
		srcset: _react.PropTypes.array,
		caption: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
		thumbnail: _react.PropTypes.string
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
	showThumbnails: _react.PropTypes.bool,
	theme: _react.PropTypes.object,
	thumbnailOffset: _react.PropTypes.number,
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
	theme: {},
	thumbnailOffset: 2,
	width: 1024
};
Lightbox.childContextTypes = {
	theme: _react.PropTypes.object.isRequired
};

var classes = _aphroditeNoImportant.StyleSheet.create({
	swipeable: {
		height: '100%'
	},
	swipeContainer: {
		display: 'flex',
		height: '100%',
		willChange: 'transform'
	},
	contentContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignSelf: 'center'
	},
	content: {
		position: 'relative'
	},
	figure: {
		margin: 0 },
	// remove browser default
	image: {
		display: 'block', // removes browser default gutter
		height: 'auto',
		margin: '0 auto', // maintain center on very short screens OR very narrow image
		maxWidth: '100%',

		// disable user select
		WebkitTouchCallout: 'none',
		userSelect: 'none'
	}
});

exports['default'] = Lightbox;
module.exports = exports['default'];

},{"./components/Arrow":24,"./components/Container":25,"./components/Footer":26,"./components/Header":27,"./components/PaginatedThumbnails":29,"./components/Portal":31,"./components/ScrollLock":32,"./theme":38,"./utils":42,"aphrodite/no-important":6,"react":undefined,"react-motion":undefined,"react-swipeable":undefined}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYXBocm9kaXRlL2xpYi9nZW5lcmF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9hcGhyb2RpdGUvbGliL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2FwaHJvZGl0ZS9saWIvaW5qZWN0LmpzIiwibm9kZV9tb2R1bGVzL2FwaHJvZGl0ZS9saWIvbm8taW1wb3J0YW50LmpzIiwibm9kZV9tb2R1bGVzL2FwaHJvZGl0ZS9saWIvdXRpbC5qcyIsIm5vZGVfbW9kdWxlcy9hcGhyb2RpdGUvbm8taW1wb3J0YW50LmpzIiwibm9kZV9tb2R1bGVzL2FzYXAvYnJvd3Nlci1hc2FwLmpzIiwibm9kZV9tb2R1bGVzL2FzYXAvYnJvd3Nlci1yYXcuanMiLCJub2RlX21vZHVsZXMvaHlwaGVuYXRlLXN0eWxlLW5hbWUvaW5kZXguanMiLCJub2RlX21vZHVsZXMvaW5saW5lLXN0eWxlLXByZWZpeGVyL2xpYi9zdGF0aWMvcGx1Z2lucy9jYWxjLmpzIiwibm9kZV9tb2R1bGVzL2lubGluZS1zdHlsZS1wcmVmaXhlci9saWIvc3RhdGljL3BsdWdpbnMvY3Vyc29yLmpzIiwibm9kZV9tb2R1bGVzL2lubGluZS1zdHlsZS1wcmVmaXhlci9saWIvc3RhdGljL3BsdWdpbnMvZmxleC5qcyIsIm5vZGVfbW9kdWxlcy9pbmxpbmUtc3R5bGUtcHJlZml4ZXIvbGliL3N0YXRpYy9wbHVnaW5zL2ZsZXhib3hJRS5qcyIsIm5vZGVfbW9kdWxlcy9pbmxpbmUtc3R5bGUtcHJlZml4ZXIvbGliL3N0YXRpYy9wbHVnaW5zL2ZsZXhib3hPbGQuanMiLCJub2RlX21vZHVsZXMvaW5saW5lLXN0eWxlLXByZWZpeGVyL2xpYi9zdGF0aWMvcGx1Z2lucy9ncmFkaWVudC5qcyIsIm5vZGVfbW9kdWxlcy9pbmxpbmUtc3R5bGUtcHJlZml4ZXIvbGliL3N0YXRpYy9wbHVnaW5zL3NpemluZy5qcyIsIm5vZGVfbW9kdWxlcy9pbmxpbmUtc3R5bGUtcHJlZml4ZXIvbGliL3N0YXRpYy9wbHVnaW5zL3RyYW5zaXRpb24uanMiLCJub2RlX21vZHVsZXMvaW5saW5lLXN0eWxlLXByZWZpeGVyL2xpYi9zdGF0aWMvcHJlZml4QWxsLmpzIiwibm9kZV9tb2R1bGVzL2lubGluZS1zdHlsZS1wcmVmaXhlci9saWIvc3RhdGljL3ByZWZpeFByb3BzLmpzIiwibm9kZV9tb2R1bGVzL2lubGluZS1zdHlsZS1wcmVmaXhlci9saWIvdXRpbHMvY2FwaXRhbGl6ZVN0cmluZy5qcyIsIm5vZGVfbW9kdWxlcy9pbmxpbmUtc3R5bGUtcHJlZml4ZXIvbGliL3V0aWxzL2lzUHJlZml4ZWRWYWx1ZS5qcyIsIm5vZGVfbW9kdWxlcy9pbmxpbmUtc3R5bGUtcHJlZml4ZXIvbGliL3V0aWxzL2pvaW5QcmVmaXhlZFZhbHVlLmpzIiwibm9kZV9tb2R1bGVzL2lubGluZS1zdHlsZS1wcmVmaXhlci9zdGF0aWMuanMiLCIvaG9tZS9qb2pvL1Byb2dyYW1taWVyZW4vcmVhY3Qvb3duLWdpdGh1Yi9yZWFjdC1pbWFnZXMvc3JjL2NvbXBvbmVudHMvQXJyb3cuanMiLCIvaG9tZS9qb2pvL1Byb2dyYW1taWVyZW4vcmVhY3Qvb3duLWdpdGh1Yi9yZWFjdC1pbWFnZXMvc3JjL2NvbXBvbmVudHMvQ29udGFpbmVyLmpzIiwiL2hvbWUvam9qby9Qcm9ncmFtbWllcmVuL3JlYWN0L293bi1naXRodWIvcmVhY3QtaW1hZ2VzL3NyYy9jb21wb25lbnRzL0Zvb3Rlci5qcyIsIi9ob21lL2pvam8vUHJvZ3JhbW1pZXJlbi9yZWFjdC9vd24tZ2l0aHViL3JlYWN0LWltYWdlcy9zcmMvY29tcG9uZW50cy9IZWFkZXIuanMiLCIvaG9tZS9qb2pvL1Byb2dyYW1taWVyZW4vcmVhY3Qvb3duLWdpdGh1Yi9yZWFjdC1pbWFnZXMvc3JjL2NvbXBvbmVudHMvSWNvbi5qcyIsIi9ob21lL2pvam8vUHJvZ3JhbW1pZXJlbi9yZWFjdC9vd24tZ2l0aHViL3JlYWN0LWltYWdlcy9zcmMvY29tcG9uZW50cy9QYWdpbmF0ZWRUaHVtYm5haWxzLmpzIiwiL2hvbWUvam9qby9Qcm9ncmFtbWllcmVuL3JlYWN0L293bi1naXRodWIvcmVhY3QtaW1hZ2VzL3NyYy9jb21wb25lbnRzL1Bhc3NDb250ZXh0LmpzIiwiL2hvbWUvam9qby9Qcm9ncmFtbWllcmVuL3JlYWN0L293bi1naXRodWIvcmVhY3QtaW1hZ2VzL3NyYy9jb21wb25lbnRzL1BvcnRhbC5qcyIsIi9ob21lL2pvam8vUHJvZ3JhbW1pZXJlbi9yZWFjdC9vd24tZ2l0aHViL3JlYWN0LWltYWdlcy9zcmMvY29tcG9uZW50cy9TY3JvbGxMb2NrLmpzIiwiL2hvbWUvam9qby9Qcm9ncmFtbWllcmVuL3JlYWN0L293bi1naXRodWIvcmVhY3QtaW1hZ2VzL3NyYy9jb21wb25lbnRzL1RodW1ibmFpbC5qcyIsIi9ob21lL2pvam8vUHJvZ3JhbW1pZXJlbi9yZWFjdC9vd24tZ2l0aHViL3JlYWN0LWltYWdlcy9zcmMvaWNvbnMvYXJyb3dMZWZ0LmpzIiwiL2hvbWUvam9qby9Qcm9ncmFtbWllcmVuL3JlYWN0L293bi1naXRodWIvcmVhY3QtaW1hZ2VzL3NyYy9pY29ucy9hcnJvd1JpZ2h0LmpzIiwiL2hvbWUvam9qby9Qcm9ncmFtbWllcmVuL3JlYWN0L293bi1naXRodWIvcmVhY3QtaW1hZ2VzL3NyYy9pY29ucy9jbG9zZS5qcyIsIi9ob21lL2pvam8vUHJvZ3JhbW1pZXJlbi9yZWFjdC9vd24tZ2l0aHViL3JlYWN0LWltYWdlcy9zcmMvaWNvbnMvaW5kZXguanMiLCIvaG9tZS9qb2pvL1Byb2dyYW1taWVyZW4vcmVhY3Qvb3duLWdpdGh1Yi9yZWFjdC1pbWFnZXMvc3JjL3RoZW1lLmpzIiwiL2hvbWUvam9qby9Qcm9ncmFtbWllcmVuL3JlYWN0L293bi1naXRodWIvcmVhY3QtaW1hZ2VzL3NyYy91dGlscy9iaW5kRnVuY3Rpb25zLmpzIiwiL2hvbWUvam9qby9Qcm9ncmFtbWllcmVuL3JlYWN0L293bi1naXRodWIvcmVhY3QtaW1hZ2VzL3NyYy91dGlscy9jYW5Vc2VEb20uanMiLCIvaG9tZS9qb2pvL1Byb2dyYW1taWVyZW4vcmVhY3Qvb3duLWdpdGh1Yi9yZWFjdC1pbWFnZXMvc3JjL3V0aWxzL2RlZXBNZXJnZS5qcyIsIi9ob21lL2pvam8vUHJvZ3JhbW1pZXJlbi9yZWFjdC9vd24tZ2l0aHViL3JlYWN0LWltYWdlcy9zcmMvdXRpbHMvaW5kZXguanMiLCIvaG9tZS9qb2pvL1Byb2dyYW1taWVyZW4vcmVhY3Qvb3duLWdpdGh1Yi9yZWFjdC1pbWFnZXMvc3JjL0xpZ2h0Ym94LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdE1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeE9BO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ2xFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDNU5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakZBO0FBQ0E7QUFDQTtB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QUU7QUFDTixTQUFPLEVBQUUsT0FBTztBQUNoQixRQUFNLEVBQUUsTUFBTTtBQUNkLFFBQU0sRUFBRSxRQUFRO0FBQ2hCLFVBQVEsRUFBRSxNQUFNOzs7QUFHaEIsb0JBQWtCLEVBQUUsTUFBTTtBQUMxQixZQUFVLEVBQUUsTUFBTTtFQUNsQjtDQUNELENBQUMsQ0FBQzs7cUJBRVksUUFBUSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfc2xpY2VkVG9BcnJheSA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIHNsaWNlSXRlcmF0b3IoYXJyLCBpKSB7IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX2UgPSB1bmRlZmluZWQ7IHRyeSB7IGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pWydyZXR1cm4nXSkgX2lbJ3JldHVybiddKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfSByZXR1cm4gZnVuY3Rpb24gKGFyciwgaSkgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7IHJldHVybiBhcnI7IH0gZWxzZSBpZiAoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSB7IHJldHVybiBzbGljZUl0ZXJhdG9yKGFyciwgaSk7IH0gZWxzZSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UnKTsgfSB9OyB9KSgpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbnZhciBfaW5saW5lU3R5bGVQcmVmaXhlclN0YXRpYyA9IHJlcXVpcmUoJ2lubGluZS1zdHlsZS1wcmVmaXhlci9zdGF0aWMnKTtcblxudmFyIF9pbmxpbmVTdHlsZVByZWZpeGVyU3RhdGljMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lubGluZVN0eWxlUHJlZml4ZXJTdGF0aWMpO1xuXG52YXIgX3V0aWwgPSByZXF1aXJlKCcuL3V0aWwnKTtcblxuLyoqXG4gKiBHZW5lcmF0ZSBDU1MgZm9yIGEgc2VsZWN0b3IgYW5kIHNvbWUgc3R5bGVzLlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gaGFuZGxlcyB0aGUgbWVkaWEgcXVlcmllcywgcHNldWRvIHNlbGVjdG9ycywgYW5kIGRlc2NlbmRhbnRcbiAqIHN0eWxlcyB0aGF0IGNhbiBiZSB1c2VkIGluIGFwaHJvZGl0ZSBzdHlsZXMuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yOiBBIGJhc2UgQ1NTIHNlbGVjdG9yIGZvciB0aGUgc3R5bGVzIHRvIGJlIGdlbmVyYXRlZFxuICogICAgIHdpdGguXG4gKiBAcGFyYW0ge09iamVjdH0gc3R5bGVUeXBlczogQSBsaXN0IG9mIHByb3BlcnRpZXMgb2YgdGhlIHJldHVybiB0eXBlIG9mXG4gKiAgICAgU3R5bGVTaGVldC5jcmVhdGUsIGUuZy4gW3N0eWxlcy5yZWQsIHN0eWxlcy5ibHVlXS5cbiAqIEBwYXJhbSBzdHJpbmdIYW5kbGVyczogU2VlIGBnZW5lcmF0ZUNTU1J1bGVzZXRgXG4gKiBAcGFyYW0gdXNlSW1wb3J0YW50OiBTZWUgYGdlbmVyYXRlQ1NTUnVsZXNldGBcbiAqXG4gKiBUbyBhY3R1YWxseSBnZW5lcmF0ZSB0aGUgQ1NTIHNwZWNpYWwtY29uc3RydWN0LWxlc3Mgc3R5bGVzIGFyZSBwYXNzZWQgdG9cbiAqIGBnZW5lcmF0ZUNTU1J1bGVzZXRgLlxuICpcbiAqIEZvciBpbnN0YW5jZSwgYSBjYWxsIHRvXG4gKlxuICogICAgIGdlbmVyYXRlQ1NTSW5uZXIoXCIuZm9vXCIsIHtcbiAqICAgICAgIGNvbG9yOiBcInJlZFwiLFxuICogICAgICAgXCJAbWVkaWEgc2NyZWVuXCI6IHtcbiAqICAgICAgICAgaGVpZ2h0OiAyMCxcbiAqICAgICAgICAgXCI6aG92ZXJcIjoge1xuICogICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogXCJibGFja1wiXG4gKiAgICAgICAgIH1cbiAqICAgICAgIH0sXG4gKiAgICAgICBcIjphY3RpdmVcIjoge1xuICogICAgICAgICBmb250V2VpZ2h0OiBcImJvbGRcIixcbiAqICAgICAgICAgXCI+PmJhclwiOiB7XG4gKiAgICAgICAgICAgX25hbWVzOiB7IFwiZm9vX2JhclwiOiB0cnVlIH0sXG4gKiAgICAgICAgICAgaGVpZ2h0OiAxMCxcbiAqICAgICAgICAgfVxuICogICAgICAgfVxuICogICAgIH0pO1xuICpcbiAqIHdpbGwgbWFrZSA1IGNhbGxzIHRvIGBnZW5lcmF0ZUNTU1J1bGVzZXRgOlxuICpcbiAqICAgICBnZW5lcmF0ZUNTU1J1bGVzZXQoXCIuZm9vXCIsIHsgY29sb3I6IFwicmVkXCIgfSwgLi4uKVxuICogICAgIGdlbmVyYXRlQ1NTUnVsZXNldChcIi5mb286YWN0aXZlXCIsIHsgZm9udFdlaWdodDogXCJib2xkXCIgfSwgLi4uKVxuICogICAgIGdlbmVyYXRlQ1NTUnVsZXNldChcIi5mb286YWN0aXZlIC5mb29fYmFyXCIsIHsgaGVpZ2h0OiAxMCB9LCAuLi4pXG4gKiAgICAgLy8gVGhlc2UgMiB3aWxsIGJlIHdyYXBwZWQgaW4gQG1lZGlhIHNjcmVlbiB7fVxuICogICAgIGdlbmVyYXRlQ1NTUnVsZXNldChcIi5mb29cIiwgeyBoZWlnaHQ6IDIwIH0sIC4uLilcbiAqICAgICBnZW5lcmF0ZUNTU1J1bGVzZXQoXCIuZm9vOmhvdmVyXCIsIHsgYmFja2dyb3VuZENvbG9yOiBcImJsYWNrXCIgfSwgLi4uKVxuICovXG52YXIgZ2VuZXJhdGVDU1MgPSBmdW5jdGlvbiBnZW5lcmF0ZUNTUyhzZWxlY3Rvciwgc3R5bGVUeXBlcywgc3RyaW5nSGFuZGxlcnMsIHVzZUltcG9ydGFudCkge1xuICAgIHZhciBtZXJnZWQgPSBzdHlsZVR5cGVzLnJlZHVjZShfdXRpbC5yZWN1cnNpdmVNZXJnZSk7XG5cbiAgICB2YXIgZGVjbGFyYXRpb25zID0ge307XG4gICAgdmFyIG1lZGlhUXVlcmllcyA9IHt9O1xuICAgIHZhciBwc2V1ZG9TdHlsZXMgPSB7fTtcblxuICAgIE9iamVjdC5rZXlzKG1lcmdlZCkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIGlmIChrZXlbMF0gPT09ICc6Jykge1xuICAgICAgICAgICAgcHNldWRvU3R5bGVzW2tleV0gPSBtZXJnZWRba2V5XTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXlbMF0gPT09ICdAJykge1xuICAgICAgICAgICAgbWVkaWFRdWVyaWVzW2tleV0gPSBtZXJnZWRba2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlY2xhcmF0aW9uc1trZXldID0gbWVyZ2VkW2tleV07XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBnZW5lcmF0ZUNTU1J1bGVzZXQoc2VsZWN0b3IsIGRlY2xhcmF0aW9ucywgc3RyaW5nSGFuZGxlcnMsIHVzZUltcG9ydGFudCkgKyBPYmplY3Qua2V5cyhwc2V1ZG9TdHlsZXMpLm1hcChmdW5jdGlvbiAocHNldWRvU2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIGdlbmVyYXRlQ1NTUnVsZXNldChzZWxlY3RvciArIHBzZXVkb1NlbGVjdG9yLCBwc2V1ZG9TdHlsZXNbcHNldWRvU2VsZWN0b3JdLCBzdHJpbmdIYW5kbGVycywgdXNlSW1wb3J0YW50KTtcbiAgICB9KS5qb2luKFwiXCIpICsgT2JqZWN0LmtleXMobWVkaWFRdWVyaWVzKS5tYXAoZnVuY3Rpb24gKG1lZGlhUXVlcnkpIHtcbiAgICAgICAgdmFyIHJ1bGVzZXQgPSBnZW5lcmF0ZUNTUyhzZWxlY3RvciwgW21lZGlhUXVlcmllc1ttZWRpYVF1ZXJ5XV0sIHN0cmluZ0hhbmRsZXJzLCB1c2VJbXBvcnRhbnQpO1xuICAgICAgICByZXR1cm4gbWVkaWFRdWVyeSArICd7JyArIHJ1bGVzZXQgKyAnfSc7XG4gICAgfSkuam9pbihcIlwiKTtcbn07XG5cbmV4cG9ydHMuZ2VuZXJhdGVDU1MgPSBnZW5lcmF0ZUNTUztcbi8qKlxuICogSGVscGVyIG1ldGhvZCBvZiBnZW5lcmF0ZUNTU1J1bGVzZXQgdG8gZmFjaWxpdGF0ZSBjdXN0b20gaGFuZGxpbmcgb2YgY2VydGFpblxuICogQ1NTIHByb3BlcnRpZXMuIFVzZWQgZm9yIGUuZy4gZm9udCBmYW1pbGllcy5cbiAqXG4gKiBTZWUgZ2VuZXJhdGVDU1NSdWxlc2V0IGZvciB1c2FnZSBhbmQgZG9jdW1lbnRhdGlvbiBvZiBwYXJhbWF0ZXIgdHlwZXMuXG4gKi9cbnZhciBydW5TdHJpbmdIYW5kbGVycyA9IGZ1bmN0aW9uIHJ1blN0cmluZ0hhbmRsZXJzKGRlY2xhcmF0aW9ucywgc3RyaW5nSGFuZGxlcnMpIHtcbiAgICB2YXIgcmVzdWx0ID0ge307XG5cbiAgICBPYmplY3Qua2V5cyhkZWNsYXJhdGlvbnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAvLyBJZiBhIGhhbmRsZXIgZXhpc3RzIGZvciB0aGlzIHBhcnRpY3VsYXIga2V5LCBsZXQgaXQgaW50ZXJwcmV0XG4gICAgICAgIC8vIHRoYXQgdmFsdWUgZmlyc3QgYmVmb3JlIGNvbnRpbnVpbmdcbiAgICAgICAgaWYgKHN0cmluZ0hhbmRsZXJzICYmIHN0cmluZ0hhbmRsZXJzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIHJlc3VsdFtrZXldID0gc3RyaW5nSGFuZGxlcnNba2V5XShkZWNsYXJhdGlvbnNba2V5XSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHRba2V5XSA9IGRlY2xhcmF0aW9uc1trZXldO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXG4gKiBHZW5lcmF0ZSBhIENTUyBydWxlc2V0IHdpdGggdGhlIHNlbGVjdG9yIGFuZCBjb250YWluaW5nIHRoZSBkZWNsYXJhdGlvbnMuXG4gKlxuICogVGhpcyBmdW5jdGlvbiBhc3N1bWVzIHRoYXQgdGhlIGdpdmVuIGRlY2xhcmF0aW9ucyBkb24ndCBjb250YWluIGFueSBzcGVjaWFsXG4gKiBjaGlsZHJlbiAoc3VjaCBhcyBtZWRpYSBxdWVyaWVzLCBwc2V1ZG8tc2VsZWN0b3JzLCBvciBkZXNjZW5kYW50IHN0eWxlcykuXG4gKlxuICogTm90ZSB0aGF0IHRoaXMgbWV0aG9kIGRvZXMgbm90IGRlYWwgd2l0aCBuZXN0aW5nIHVzZWQgZm9yIGUuZy5cbiAqIHBzdWVkby1zZWxlY3RvcnMgb3IgbWVkaWEgcXVlcmllcy4gVGhhdCByZXNwb25zaWJpbGl0eSBpcyBsZWZ0IHRvICB0aGVcbiAqIGBnZW5lcmF0ZUNTU2AgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yOiB0aGUgc2VsZWN0b3IgYXNzb2NpYXRlZCB3aXRoIHRoZSBydWxlc2V0XG4gKiBAcGFyYW0ge09iamVjdH0gZGVjbGFyYXRpb25zOiBhIG1hcCBmcm9tIGNhbWVsQ2FzZWQgQ1NTIHByb3BlcnR5IG5hbWUgdG8gQ1NTXG4gKiAgICAgcHJvcGVydHkgdmFsdWUuXG4gKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCBmdW5jdGlvbj59IHN0cmluZ0hhbmRsZXJzOiBhIG1hcCBmcm9tIGNhbWVsQ2FzZWQgQ1NTXG4gKiAgICAgcHJvcGVydHkgbmFtZSB0byBhIGZ1bmN0aW9uIHdoaWNoIHdpbGwgbWFwIHRoZSBnaXZlbiB2YWx1ZSB0byB0aGUgdmFsdWVcbiAqICAgICB0aGF0IGlzIG91dHB1dC5cbiAqIEBwYXJhbSB7Ym9vbH0gdXNlSW1wb3J0YW50OiBBIGJvb2xlYW4gc2F5aW5nIHdoZXRoZXIgdG8gYXBwZW5kIFwiIWltcG9ydGFudFwiXG4gKiAgICAgdG8gZWFjaCBvZiB0aGUgQ1NTIGRlY2xhcmF0aW9ucy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IEEgc3RyaW5nIG9mIHJhdyBDU1MuXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgZ2VuZXJhdGVDU1NSdWxlc2V0KFwiLmJsYWhcIiwgeyBjb2xvcjogXCJyZWRcIiB9KVxuICogICAgLT4gXCIuYmxhaHtjb2xvcjogcmVkICFpbXBvcnRhbnQ7fVwiXG4gKiAgICBnZW5lcmF0ZUNTU1J1bGVzZXQoXCIuYmxhaFwiLCB7IGNvbG9yOiBcInJlZFwiIH0sIHt9LCBmYWxzZSlcbiAqICAgIC0+IFwiLmJsYWh7Y29sb3I6IHJlZH1cIlxuICogICAgZ2VuZXJhdGVDU1NSdWxlc2V0KFwiLmJsYWhcIiwgeyBjb2xvcjogXCJyZWRcIiB9LCB7Y29sb3I6IGMgPT4gYy50b1VwcGVyQ2FzZX0pXG4gKiAgICAtPiBcIi5ibGFoe2NvbG9yOiBSRUR9XCJcbiAqICAgIGdlbmVyYXRlQ1NTUnVsZXNldChcIi5ibGFoOmhvdmVyXCIsIHsgY29sb3I6IFwicmVkXCIgfSlcbiAqICAgIC0+IFwiLmJsYWg6aG92ZXJ7Y29sb3I6IHJlZH1cIlxuICovXG52YXIgZ2VuZXJhdGVDU1NSdWxlc2V0ID0gZnVuY3Rpb24gZ2VuZXJhdGVDU1NSdWxlc2V0KHNlbGVjdG9yLCBkZWNsYXJhdGlvbnMsIHN0cmluZ0hhbmRsZXJzLCB1c2VJbXBvcnRhbnQpIHtcbiAgICB2YXIgaGFuZGxlZERlY2xhcmF0aW9ucyA9IHJ1blN0cmluZ0hhbmRsZXJzKGRlY2xhcmF0aW9ucywgc3RyaW5nSGFuZGxlcnMpO1xuXG4gICAgdmFyIHByZWZpeGVkRGVjbGFyYXRpb25zID0gKDAsIF9pbmxpbmVTdHlsZVByZWZpeGVyU3RhdGljMlsnZGVmYXVsdCddKShoYW5kbGVkRGVjbGFyYXRpb25zKTtcblxuICAgIHZhciBwcmVmaXhlZFJ1bGVzID0gKDAsIF91dGlsLmZsYXR0ZW4pKCgwLCBfdXRpbC5vYmplY3RUb1BhaXJzKShwcmVmaXhlZERlY2xhcmF0aW9ucykubWFwKGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgICAgIHZhciBfcmVmMiA9IF9zbGljZWRUb0FycmF5KF9yZWYsIDIpO1xuXG4gICAgICAgIHZhciBrZXkgPSBfcmVmMlswXTtcbiAgICAgICAgdmFyIHZhbHVlID0gX3JlZjJbMV07XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICB2YXIgX3JldCA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgLy8gaW5saW5lLXN0eWxlLXByZWZpeC1hbGwgcmV0dXJucyBhbiBhcnJheSB3aGVuIHRoZXJlIHNob3VsZCBiZVxuICAgICAgICAgICAgICAgIC8vIG11bHRpcGxlIHJ1bGVzLCB3ZSB3aWxsIGZsYXR0ZW4gdG8gc2luZ2xlIHJ1bGVzXG5cbiAgICAgICAgICAgICAgICB2YXIgcHJlZml4ZWRWYWx1ZXMgPSBbXTtcbiAgICAgICAgICAgICAgICB2YXIgdW5wcmVmaXhlZFZhbHVlcyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgdmFsdWUuZm9yRWFjaChmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgICAgICBpZiAodi5pbmRleE9mKCctJykgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZWZpeGVkVmFsdWVzLnB1c2godik7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1bnByZWZpeGVkVmFsdWVzLnB1c2godik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHByZWZpeGVkVmFsdWVzLnNvcnQoKTtcbiAgICAgICAgICAgICAgICB1bnByZWZpeGVkVmFsdWVzLnNvcnQoKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHY6IHByZWZpeGVkVmFsdWVzLmNvbmNhdCh1bnByZWZpeGVkVmFsdWVzKS5tYXAoZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBba2V5LCB2XTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSkoKTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBfcmV0ID09PSAnb2JqZWN0JykgcmV0dXJuIF9yZXQudjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW1trZXksIHZhbHVlXV07XG4gICAgfSkpO1xuXG4gICAgdmFyIHJ1bGVzID0gcHJlZml4ZWRSdWxlcy5tYXAoZnVuY3Rpb24gKF9yZWYzKSB7XG4gICAgICAgIHZhciBfcmVmMzIgPSBfc2xpY2VkVG9BcnJheShfcmVmMywgMik7XG5cbiAgICAgICAgdmFyIGtleSA9IF9yZWYzMlswXTtcbiAgICAgICAgdmFyIHZhbHVlID0gX3JlZjMyWzFdO1xuXG4gICAgICAgIHZhciBzdHJpbmdWYWx1ZSA9ICgwLCBfdXRpbC5zdHJpbmdpZnlWYWx1ZSkoa2V5LCB2YWx1ZSk7XG4gICAgICAgIHZhciByZXQgPSAoMCwgX3V0aWwua2ViYWJpZnlTdHlsZU5hbWUpKGtleSkgKyAnOicgKyBzdHJpbmdWYWx1ZSArICc7JztcbiAgICAgICAgcmV0dXJuIHVzZUltcG9ydGFudCA9PT0gZmFsc2UgPyByZXQgOiAoMCwgX3V0aWwuaW1wb3J0YW50aWZ5KShyZXQpO1xuICAgIH0pLmpvaW4oXCJcIik7XG5cbiAgICBpZiAocnVsZXMpIHtcbiAgICAgICAgcmV0dXJuIHNlbGVjdG9yICsgJ3snICsgcnVsZXMgKyAnfSc7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxufTtcbmV4cG9ydHMuZ2VuZXJhdGVDU1NSdWxlc2V0ID0gZ2VuZXJhdGVDU1NSdWxlc2V0OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9zbGljZWRUb0FycmF5ID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbJ3JldHVybiddKSBfaVsncmV0dXJuJ10oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9IHJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHsgcmV0dXJuIGFycjsgfSBlbHNlIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpIHsgcmV0dXJuIHNsaWNlSXRlcmF0b3IoYXJyLCBpKTsgfSBlbHNlIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZScpOyB9IH07IH0pKCk7XG5cbnZhciBfdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpO1xuXG52YXIgX2luamVjdCA9IHJlcXVpcmUoJy4vaW5qZWN0Jyk7XG5cbnZhciBTdHlsZVNoZWV0ID0ge1xuICAgIGNyZWF0ZTogZnVuY3Rpb24gY3JlYXRlKHNoZWV0RGVmaW5pdGlvbikge1xuICAgICAgICByZXR1cm4gKDAsIF91dGlsLm1hcE9iaikoc2hlZXREZWZpbml0aW9uLCBmdW5jdGlvbiAoX3JlZikge1xuICAgICAgICAgICAgdmFyIF9yZWYyID0gX3NsaWNlZFRvQXJyYXkoX3JlZiwgMik7XG5cbiAgICAgICAgICAgIHZhciBrZXkgPSBfcmVmMlswXTtcbiAgICAgICAgICAgIHZhciB2YWwgPSBfcmVmMlsxXTtcblxuICAgICAgICAgICAgcmV0dXJuIFtrZXksIHtcbiAgICAgICAgICAgICAgICAvLyBUT0RPKGVtaWx5KTogTWFrZSBhICdwcm9kdWN0aW9uJyBtb2RlIHdoaWNoIGRvZXNuJ3QgcHJlcGVuZFxuICAgICAgICAgICAgICAgIC8vIHRoZSBjbGFzcyBuYW1lIGhlcmUsIHRvIG1ha2UgdGhlIGdlbmVyYXRlZCBDU1Mgc21hbGxlci5cbiAgICAgICAgICAgICAgICBfbmFtZToga2V5ICsgJ18nICsgKDAsIF91dGlsLmhhc2hPYmplY3QpKHZhbCksXG4gICAgICAgICAgICAgICAgX2RlZmluaXRpb246IHZhbFxuICAgICAgICAgICAgfV07XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICByZWh5ZHJhdGU6IGZ1bmN0aW9uIHJlaHlkcmF0ZSgpIHtcbiAgICAgICAgdmFyIHJlbmRlcmVkQ2xhc3NOYW1lcyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IFtdIDogYXJndW1lbnRzWzBdO1xuXG4gICAgICAgICgwLCBfaW5qZWN0LmFkZFJlbmRlcmVkQ2xhc3NOYW1lcykocmVuZGVyZWRDbGFzc05hbWVzKTtcbiAgICB9XG59O1xuXG4vKipcbiAqIFV0aWxpdGllcyBmb3IgdXNpbmcgQXBocm9kaXRlIHNlcnZlci1zaWRlLlxuICovXG52YXIgU3R5bGVTaGVldFNlcnZlciA9IHtcbiAgICByZW5kZXJTdGF0aWM6IGZ1bmN0aW9uIHJlbmRlclN0YXRpYyhyZW5kZXJGdW5jKSB7XG4gICAgICAgICgwLCBfaW5qZWN0LnJlc2V0KSgpO1xuICAgICAgICAoMCwgX2luamVjdC5zdGFydEJ1ZmZlcmluZykoKTtcbiAgICAgICAgdmFyIGh0bWwgPSByZW5kZXJGdW5jKCk7XG4gICAgICAgIHZhciBjc3NDb250ZW50ID0gKDAsIF9pbmplY3QuZmx1c2hUb1N0cmluZykoKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaHRtbDogaHRtbCxcbiAgICAgICAgICAgIGNzczoge1xuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGNzc0NvbnRlbnQsXG4gICAgICAgICAgICAgICAgcmVuZGVyZWRDbGFzc05hbWVzOiAoMCwgX2luamVjdC5nZXRSZW5kZXJlZENsYXNzTmFtZXMpKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG59O1xuXG4vKipcbiAqIFV0aWxpdGllcyBmb3IgdXNpbmcgQXBocm9kaXRlIGluIHRlc3RzLlxuICpcbiAqIE5vdCBtZWFudCB0byBiZSB1c2VkIGluIHByb2R1Y3Rpb24uXG4gKi9cbnZhciBTdHlsZVNoZWV0VGVzdFV0aWxzID0ge1xuICAgIC8qKlxuICAgICAqIFByZXZlbnQgc3R5bGVzIGZyb20gYmVpbmcgaW5qZWN0ZWQgaW50byB0aGUgRE9NLlxuICAgICAqXG4gICAgICogVGhpcyBpcyB1c2VmdWwgaW4gc2l0dWF0aW9ucyB3aGVyZSB5b3UnZCBsaWtlIHRvIHRlc3QgcmVuZGVyaW5nIFVJXG4gICAgICogY29tcG9uZW50cyB3aGljaCB1c2UgQXBocm9kaXRlIHdpdGhvdXQgYW55IG9mIHRoZSBzaWRlLWVmZmVjdHMgb2ZcbiAgICAgKiBBcGhyb2RpdGUgaGFwcGVuaW5nLiBQYXJ0aWN1bGFybHkgdXNlZnVsIGZvciB0ZXN0aW5nIHRoZSBvdXRwdXQgb2ZcbiAgICAgKiBjb21wb25lbnRzIHdoZW4geW91IGhhdmUgbm8gRE9NLCBlLmcuIHRlc3RpbmcgaW4gTm9kZSB3aXRob3V0IGEgZmFrZSBET00uXG4gICAgICpcbiAgICAgKiBTaG91bGQgYmUgcGFpcmVkIHdpdGggYSBzdWJzZXF1ZW50IGNhbGwgdG9cbiAgICAgKiBjbGVhckJ1ZmZlckFuZFJlc3VtZVN0eWxlSW5qZWN0aW9uLlxuICAgICAqL1xuICAgIHN1cHByZXNzU3R5bGVJbmplY3Rpb246IGZ1bmN0aW9uIHN1cHByZXNzU3R5bGVJbmplY3Rpb24oKSB7XG4gICAgICAgICgwLCBfaW5qZWN0LnJlc2V0KSgpO1xuICAgICAgICAoMCwgX2luamVjdC5zdGFydEJ1ZmZlcmluZykoKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogT3Bwb3NpdGUgbWV0aG9kIG9mIHByZXZlbnRTdHlsZUluamVjdC5cbiAgICAgKi9cbiAgICBjbGVhckJ1ZmZlckFuZFJlc3VtZVN0eWxlSW5qZWN0aW9uOiBmdW5jdGlvbiBjbGVhckJ1ZmZlckFuZFJlc3VtZVN0eWxlSW5qZWN0aW9uKCkge1xuICAgICAgICAoMCwgX2luamVjdC5yZXNldCkoKTtcbiAgICB9XG59O1xuXG52YXIgY3NzID0gZnVuY3Rpb24gY3NzKCkge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBzdHlsZURlZmluaXRpb25zID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgIHN0eWxlRGVmaW5pdGlvbnNbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgdmFyIHVzZUltcG9ydGFudCA9IHRydWU7IC8vIEFwcGVuZCAhaW1wb3J0YW50IHRvIGFsbCBzdHlsZSBkZWZpbml0aW9uc1xuICAgIHJldHVybiAoMCwgX2luamVjdC5pbmplY3RBbmRHZXRDbGFzc05hbWUpKHVzZUltcG9ydGFudCwgc3R5bGVEZWZpbml0aW9ucyk7XG59O1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSB7XG4gICAgU3R5bGVTaGVldDogU3R5bGVTaGVldCxcbiAgICBTdHlsZVNoZWV0U2VydmVyOiBTdHlsZVNoZWV0U2VydmVyLFxuICAgIFN0eWxlU2hlZXRUZXN0VXRpbHM6IFN0eWxlU2hlZXRUZXN0VXRpbHMsXG4gICAgY3NzOiBjc3Ncbn07XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxudmFyIF9hc2FwID0gcmVxdWlyZSgnYXNhcCcpO1xuXG52YXIgX2FzYXAyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYXNhcCk7XG5cbnZhciBfZ2VuZXJhdGUgPSByZXF1aXJlKCcuL2dlbmVyYXRlJyk7XG5cbnZhciBfdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpO1xuXG4vLyBUaGUgY3VycmVudCA8c3R5bGU+IHRhZyB3ZSBhcmUgaW5zZXJ0aW5nIGludG8sIG9yIG51bGwgaWYgd2UgaGF2ZW4ndFxuLy8gaW5zZXJ0ZWQgYW55dGhpbmcgeWV0LiBXZSBjb3VsZCBmaW5kIHRoaXMgZWFjaCB0aW1lIHVzaW5nXG4vLyBgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInN0eWxlW2RhdGEtYXBocm9kaXRlXCJdKWAsIGJ1dCBob2xkaW5nIG9udG8gaXQgaXNcbi8vIGZhc3Rlci5cbnZhciBzdHlsZVRhZyA9IG51bGw7XG5cbi8vIEluamVjdCBhIHN0cmluZyBvZiBzdHlsZXMgaW50byBhIDxzdHlsZT4gdGFnIGluIHRoZSBoZWFkIG9mIHRoZSBkb2N1bWVudC4gVGhpc1xuLy8gd2lsbCBhdXRvbWF0aWNhbGx5IGNyZWF0ZSBhIHN0eWxlIHRhZyBhbmQgdGhlbiBjb250aW51ZSB0byB1c2UgaXQgZm9yXG4vLyBtdWx0aXBsZSBpbmplY3Rpb25zLiBJdCB3aWxsIGFsc28gdXNlIGEgc3R5bGUgdGFnIHdpdGggdGhlIGBkYXRhLWFwaHJvZGl0ZWBcbi8vIHRhZyBvbiBpdCBpZiB0aGF0IGV4aXN0cyBpbiB0aGUgRE9NLiBUaGlzIGNvdWxkIGJlIHVzZWQgZm9yIGUuZy4gcmV1c2luZyB0aGVcbi8vIHNhbWUgc3R5bGUgdGFnIHRoYXQgc2VydmVyLXNpZGUgcmVuZGVyaW5nIGluc2VydHMuXG52YXIgaW5qZWN0U3R5bGVUYWcgPSBmdW5jdGlvbiBpbmplY3RTdHlsZVRhZyhjc3NDb250ZW50cykge1xuICAgIGlmIChzdHlsZVRhZyA9PSBudWxsKSB7XG4gICAgICAgIC8vIFRyeSB0byBmaW5kIGEgc3R5bGUgdGFnIHdpdGggdGhlIGBkYXRhLWFwaHJvZGl0ZWAgYXR0cmlidXRlIGZpcnN0LlxuICAgICAgICBzdHlsZVRhZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJzdHlsZVtkYXRhLWFwaHJvZGl0ZV1cIik7XG5cbiAgICAgICAgLy8gSWYgdGhhdCBkb2Vzbid0IHdvcmssIGdlbmVyYXRlIGEgbmV3IHN0eWxlIHRhZy5cbiAgICAgICAgaWYgKHN0eWxlVGFnID09IG51bGwpIHtcbiAgICAgICAgICAgIC8vIFRha2VuIGZyb21cbiAgICAgICAgICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNTI0Njk2L2hvdy10by1jcmVhdGUtYS1zdHlsZS10YWctd2l0aC1qYXZhc2NyaXB0XG4gICAgICAgICAgICB2YXIgaGVhZCA9IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcbiAgICAgICAgICAgIHN0eWxlVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblxuICAgICAgICAgICAgc3R5bGVUYWcudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgICAgICAgICBzdHlsZVRhZy5zZXRBdHRyaWJ1dGUoXCJkYXRhLWFwaHJvZGl0ZVwiLCBcIlwiKTtcbiAgICAgICAgICAgIGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVUYWcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN0eWxlVGFnLnN0eWxlU2hlZXQpIHtcbiAgICAgICAgc3R5bGVUYWcuc3R5bGVTaGVldC5jc3NUZXh0ICs9IGNzc0NvbnRlbnRzO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHN0eWxlVGFnLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzc0NvbnRlbnRzKSk7XG4gICAgfVxufTtcblxuLy8gQ3VzdG9tIGhhbmRsZXJzIGZvciBzdHJpbmdpZnlpbmcgQ1NTIHZhbHVlcyB0aGF0IGhhdmUgc2lkZSBlZmZlY3RzXG4vLyAoc3VjaCBhcyBmb250RmFtaWx5LCB3aGljaCBjYW4gY2F1c2UgQGZvbnQtZmFjZSBydWxlcyB0byBiZSBpbmplY3RlZClcbnZhciBzdHJpbmdIYW5kbGVycyA9IHtcbiAgICAvLyBXaXRoIGZvbnRGYW1pbHkgd2UgbG9vayBmb3Igb2JqZWN0cyB0aGF0IGFyZSBwYXNzZWQgaW4gYW5kIGludGVycHJldFxuICAgIC8vIHRoZW0gYXMgQGZvbnQtZmFjZSBydWxlcyB0aGF0IHdlIG5lZWQgdG8gaW5qZWN0LiBUaGUgdmFsdWUgb2YgZm9udEZhbWlseVxuICAgIC8vIGNhbiBlaXRoZXIgYmUgYSBzdHJpbmcgKGFzIG5vcm1hbCksIGFuIG9iamVjdCAoYSBzaW5nbGUgZm9udCBmYWNlKSwgb3JcbiAgICAvLyBhbiBhcnJheSBvZiBvYmplY3RzIGFuZCBzdHJpbmdzLlxuICAgIGZvbnRGYW1pbHk6IGZ1bmN0aW9uIGZvbnRGYW1pbHkodmFsKSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbCkpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWwubWFwKGZvbnRGYW1pbHkpLmpvaW4oXCIsXCIpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgIGluamVjdFN0eWxlT25jZSh2YWwuZm9udEZhbWlseSwgXCJAZm9udC1mYWNlXCIsIFt2YWxdLCBmYWxzZSk7XG4gICAgICAgICAgICByZXR1cm4gJ1wiJyArIHZhbC5mb250RmFtaWx5ICsgJ1wiJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gV2l0aCBhbmltYXRpb25OYW1lIHdlIGxvb2sgZm9yIGFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIGtleWZyYW1lcyBhbmRcbiAgICAvLyBpbmplY3QgdGhlbSBhcyBhbiBgQGtleWZyYW1lc2AgYmxvY2ssIHJldHVybmluZyBhIHVuaXF1ZWx5IGdlbmVyYXRlZFxuICAgIC8vIG5hbWUuIFRoZSBrZXlmcmFtZXMgb2JqZWN0IHNob3VsZCBsb29rIGxpa2VcbiAgICAvLyAgYW5pbWF0aW9uTmFtZToge1xuICAgIC8vICAgIGZyb206IHtcbiAgICAvLyAgICAgIGxlZnQ6IDAsXG4gICAgLy8gICAgICB0b3A6IDAsXG4gICAgLy8gICAgfSxcbiAgICAvLyAgICAnNTAlJzoge1xuICAgIC8vICAgICAgbGVmdDogMTUsXG4gICAgLy8gICAgICB0b3A6IDUsXG4gICAgLy8gICAgfSxcbiAgICAvLyAgICB0bzoge1xuICAgIC8vICAgICAgbGVmdDogMjAsXG4gICAgLy8gICAgICB0b3A6IDIwLFxuICAgIC8vICAgIH1cbiAgICAvLyAgfVxuICAgIC8vIFRPRE8oZW1pbHkpOiBgc3RyaW5nSGFuZGxlcnNgIGRvZXNuJ3QgbGV0IHVzIHJlbmFtZSB0aGUga2V5LCBzbyBJIGhhdmVcbiAgICAvLyB0byB1c2UgYGFuaW1hdGlvbk5hbWVgIGhlcmUuIEltcHJvdmUgdGhhdCBzbyB3ZSBjYW4gY2FsbCB0aGlzXG4gICAgLy8gYGFuaW1hdGlvbmAgaW5zdGVhZCBvZiBgYW5pbWF0aW9uTmFtZWAuXG4gICAgYW5pbWF0aW9uTmFtZTogZnVuY3Rpb24gYW5pbWF0aW9uTmFtZSh2YWwpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWwgIT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBHZW5lcmF0ZSBhIHVuaXF1ZSBuYW1lIGJhc2VkIG9uIHRoZSBoYXNoIG9mIHRoZSBvYmplY3QuIFdlIGNhbid0XG4gICAgICAgIC8vIGp1c3QgdXNlIHRoZSBoYXNoIGJlY2F1c2UgdGhlIG5hbWUgY2FuJ3Qgc3RhcnQgd2l0aCBhIG51bWJlci5cbiAgICAgICAgLy8gVE9ETyhlbWlseSk6IHRoaXMgcHJvYmFibHkgbWFrZXMgZGVidWdnaW5nIGhhcmQsIGFsbG93IGEgY3VzdG9tXG4gICAgICAgIC8vIG5hbWU/XG4gICAgICAgIHZhciBuYW1lID0gJ2tleWZyYW1lXycgKyAoMCwgX3V0aWwuaGFzaE9iamVjdCkodmFsKTtcblxuICAgICAgICAvLyBTaW5jZSBrZXlmcmFtZXMgbmVlZCAzIGxheWVycyBvZiBuZXN0aW5nLCB3ZSB1c2UgYGdlbmVyYXRlQ1NTYCB0b1xuICAgICAgICAvLyBidWlsZCB0aGUgaW5uZXIgbGF5ZXJzIGFuZCB3cmFwIGl0IGluIGBAa2V5ZnJhbWVzYCBvdXJzZWx2ZXMuXG4gICAgICAgIHZhciBmaW5hbFZhbCA9ICdAa2V5ZnJhbWVzICcgKyBuYW1lICsgJ3snO1xuICAgICAgICBPYmplY3Qua2V5cyh2YWwpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgZmluYWxWYWwgKz0gKDAsIF9nZW5lcmF0ZS5nZW5lcmF0ZUNTUykoa2V5LCBbdmFsW2tleV1dLCBzdHJpbmdIYW5kbGVycywgZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICAgICAgZmluYWxWYWwgKz0gJ30nO1xuXG4gICAgICAgIGluamVjdEdlbmVyYXRlZENTU09uY2UobmFtZSwgZmluYWxWYWwpO1xuXG4gICAgICAgIHJldHVybiBuYW1lO1xuICAgIH1cbn07XG5cbi8vIFRoaXMgaXMgYSBtYXAgZnJvbSBBcGhyb2RpdGUncyBnZW5lcmF0ZWQgY2xhc3MgbmFtZXMgdG8gYHRydWVgIChhY3RpbmcgYXMgYVxuLy8gc2V0IG9mIGNsYXNzIG5hbWVzKVxudmFyIGFscmVhZHlJbmplY3RlZCA9IHt9O1xuXG4vLyBUaGlzIGlzIHRoZSBidWZmZXIgb2Ygc3R5bGVzIHdoaWNoIGhhdmUgbm90IHlldCBiZWVuIGZsdXNoZWQuXG52YXIgaW5qZWN0aW9uQnVmZmVyID0gXCJcIjtcblxuLy8gQSBmbGFnIHRvIHRlbGwgaWYgd2UgYXJlIGFscmVhZHkgYnVmZmVyaW5nIHN0eWxlcy4gVGhpcyBjb3VsZCBoYXBwZW4gZWl0aGVyXG4vLyBiZWNhdXNlIHdlIHNjaGVkdWxlZCBhIGZsdXNoIGNhbGwgYWxyZWFkeSwgc28gbmV3bHkgYWRkZWQgc3R5bGVzIHdpbGxcbi8vIGFscmVhZHkgYmUgZmx1c2hlZCwgb3IgYmVjYXVzZSB3ZSBhcmUgc3RhdGljYWxseSBidWZmZXJpbmcgb24gdGhlIHNlcnZlci5cbnZhciBpc0J1ZmZlcmluZyA9IGZhbHNlO1xuXG52YXIgaW5qZWN0R2VuZXJhdGVkQ1NTT25jZSA9IGZ1bmN0aW9uIGluamVjdEdlbmVyYXRlZENTU09uY2Uoa2V5LCBnZW5lcmF0ZWRDU1MpIHtcbiAgICBpZiAoIWFscmVhZHlJbmplY3RlZFtrZXldKSB7XG4gICAgICAgIGlmICghaXNCdWZmZXJpbmcpIHtcbiAgICAgICAgICAgIC8vIFdlIHNob3VsZCBuZXZlciBiZSBhdXRvbWF0aWNhbGx5IGJ1ZmZlcmluZyBvbiB0aGUgc2VydmVyIChvciBhbnlcbiAgICAgICAgICAgIC8vIHBsYWNlIHdpdGhvdXQgYSBkb2N1bWVudCksIHNvIGd1YXJkIGFnYWluc3QgdGhhdC5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgYXV0b21hdGljYWxseSBidWZmZXIgd2l0aG91dCBhIGRvY3VtZW50XCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBJZiB3ZSdyZSBub3QgYWxyZWFkeSBidWZmZXJpbmcsIHNjaGVkdWxlIGEgY2FsbCB0byBmbHVzaCB0aGVcbiAgICAgICAgICAgIC8vIGN1cnJlbnQgc3R5bGVzLlxuICAgICAgICAgICAgaXNCdWZmZXJpbmcgPSB0cnVlO1xuICAgICAgICAgICAgKDAsIF9hc2FwMlsnZGVmYXVsdCddKShmbHVzaFRvU3R5bGVUYWcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaW5qZWN0aW9uQnVmZmVyICs9IGdlbmVyYXRlZENTUztcbiAgICAgICAgYWxyZWFkeUluamVjdGVkW2tleV0gPSB0cnVlO1xuICAgIH1cbn07XG5cbnZhciBpbmplY3RTdHlsZU9uY2UgPSBmdW5jdGlvbiBpbmplY3RTdHlsZU9uY2Uoa2V5LCBzZWxlY3RvciwgZGVmaW5pdGlvbnMsIHVzZUltcG9ydGFudCkge1xuICAgIGlmICghYWxyZWFkeUluamVjdGVkW2tleV0pIHtcbiAgICAgICAgdmFyIGdlbmVyYXRlZCA9ICgwLCBfZ2VuZXJhdGUuZ2VuZXJhdGVDU1MpKHNlbGVjdG9yLCBkZWZpbml0aW9ucywgc3RyaW5nSGFuZGxlcnMsIHVzZUltcG9ydGFudCk7XG5cbiAgICAgICAgaW5qZWN0R2VuZXJhdGVkQ1NTT25jZShrZXksIGdlbmVyYXRlZCk7XG4gICAgfVxufTtcblxuZXhwb3J0cy5pbmplY3RTdHlsZU9uY2UgPSBpbmplY3RTdHlsZU9uY2U7XG52YXIgcmVzZXQgPSBmdW5jdGlvbiByZXNldCgpIHtcbiAgICBpbmplY3Rpb25CdWZmZXIgPSBcIlwiO1xuICAgIGFscmVhZHlJbmplY3RlZCA9IHt9O1xuICAgIGlzQnVmZmVyaW5nID0gZmFsc2U7XG4gICAgc3R5bGVUYWcgPSBudWxsO1xufTtcblxuZXhwb3J0cy5yZXNldCA9IHJlc2V0O1xudmFyIHN0YXJ0QnVmZmVyaW5nID0gZnVuY3Rpb24gc3RhcnRCdWZmZXJpbmcoKSB7XG4gICAgaWYgKGlzQnVmZmVyaW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBidWZmZXIgd2hpbGUgYWxyZWFkeSBidWZmZXJpbmdcIik7XG4gICAgfVxuICAgIGlzQnVmZmVyaW5nID0gdHJ1ZTtcbn07XG5cbmV4cG9ydHMuc3RhcnRCdWZmZXJpbmcgPSBzdGFydEJ1ZmZlcmluZztcbnZhciBmbHVzaFRvU3RyaW5nID0gZnVuY3Rpb24gZmx1c2hUb1N0cmluZygpIHtcbiAgICBpc0J1ZmZlcmluZyA9IGZhbHNlO1xuICAgIHZhciByZXQgPSBpbmplY3Rpb25CdWZmZXI7XG4gICAgaW5qZWN0aW9uQnVmZmVyID0gXCJcIjtcbiAgICByZXR1cm4gcmV0O1xufTtcblxuZXhwb3J0cy5mbHVzaFRvU3RyaW5nID0gZmx1c2hUb1N0cmluZztcbnZhciBmbHVzaFRvU3R5bGVUYWcgPSBmdW5jdGlvbiBmbHVzaFRvU3R5bGVUYWcoKSB7XG4gICAgdmFyIGNzc0NvbnRlbnQgPSBmbHVzaFRvU3RyaW5nKCk7XG4gICAgaWYgKGNzc0NvbnRlbnQubGVuZ3RoID4gMCkge1xuICAgICAgICBpbmplY3RTdHlsZVRhZyhjc3NDb250ZW50KTtcbiAgICB9XG59O1xuXG5leHBvcnRzLmZsdXNoVG9TdHlsZVRhZyA9IGZsdXNoVG9TdHlsZVRhZztcbnZhciBnZXRSZW5kZXJlZENsYXNzTmFtZXMgPSBmdW5jdGlvbiBnZXRSZW5kZXJlZENsYXNzTmFtZXMoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGFscmVhZHlJbmplY3RlZCk7XG59O1xuXG5leHBvcnRzLmdldFJlbmRlcmVkQ2xhc3NOYW1lcyA9IGdldFJlbmRlcmVkQ2xhc3NOYW1lcztcbnZhciBhZGRSZW5kZXJlZENsYXNzTmFtZXMgPSBmdW5jdGlvbiBhZGRSZW5kZXJlZENsYXNzTmFtZXMoY2xhc3NOYW1lcykge1xuICAgIGNsYXNzTmFtZXMuZm9yRWFjaChmdW5jdGlvbiAoY2xhc3NOYW1lKSB7XG4gICAgICAgIGFscmVhZHlJbmplY3RlZFtjbGFzc05hbWVdID0gdHJ1ZTtcbiAgICB9KTtcbn07XG5cbmV4cG9ydHMuYWRkUmVuZGVyZWRDbGFzc05hbWVzID0gYWRkUmVuZGVyZWRDbGFzc05hbWVzO1xuLyoqXG4gKiBJbmplY3Qgc3R5bGVzIGFzc29jaWF0ZWQgd2l0aCB0aGUgcGFzc2VkIHN0eWxlIGRlZmluaXRpb24gb2JqZWN0cywgYW5kIHJldHVyblxuICogYW4gYXNzb2NpYXRlZCBDU1MgY2xhc3MgbmFtZS5cbiAqXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHVzZUltcG9ydGFudCBJZiB0cnVlLCB3aWxsIGFwcGVuZCAhaW1wb3J0YW50IHRvIGdlbmVyYXRlZFxuICogICAgIENTUyBvdXRwdXQuIGUuZy4ge2NvbG9yOiByZWR9IC0+IFwiY29sb3I6IHJlZCAhaW1wb3J0YW50XCIuXG4gKiBAcGFyYW0ge09iamVjdFtdfSBzdHlsZURlZmluaXRpb25zIHN0eWxlIGRlZmluaXRpb24gb2JqZWN0cyBhcyByZXR1cm5lZCBhc1xuICogICAgIHByb3BlcnRpZXMgb2YgdGhlIHJldHVybiB2YWx1ZSBvZiBTdHlsZVNoZWV0LmNyZWF0ZSgpLlxuICovXG52YXIgaW5qZWN0QW5kR2V0Q2xhc3NOYW1lID0gZnVuY3Rpb24gaW5qZWN0QW5kR2V0Q2xhc3NOYW1lKHVzZUltcG9ydGFudCwgc3R5bGVEZWZpbml0aW9ucykge1xuICAgIC8vIEZpbHRlciBvdXQgZmFsc3kgdmFsdWVzIGZyb20gdGhlIGlucHV0LCB0byBhbGxvdyBmb3JcbiAgICAvLyBgY3NzKGEsIHRlc3QgJiYgYylgXG4gICAgdmFyIHZhbGlkRGVmaW5pdGlvbnMgPSBzdHlsZURlZmluaXRpb25zLmZpbHRlcihmdW5jdGlvbiAoZGVmKSB7XG4gICAgICAgIHJldHVybiBkZWY7XG4gICAgfSk7XG5cbiAgICAvLyBCcmVhayBpZiB0aGVyZSBhcmVuJ3QgYW55IHZhbGlkIHN0eWxlcy5cbiAgICBpZiAodmFsaWREZWZpbml0aW9ucy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxuXG4gICAgdmFyIGNsYXNzTmFtZSA9IHZhbGlkRGVmaW5pdGlvbnMubWFwKGZ1bmN0aW9uIChzKSB7XG4gICAgICAgIHJldHVybiBzLl9uYW1lO1xuICAgIH0pLmpvaW4oXCItb19PLVwiKTtcbiAgICBpbmplY3RTdHlsZU9uY2UoY2xhc3NOYW1lLCAnLicgKyBjbGFzc05hbWUsIHZhbGlkRGVmaW5pdGlvbnMubWFwKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIHJldHVybiBkLl9kZWZpbml0aW9uO1xuICAgIH0pLCB1c2VJbXBvcnRhbnQpO1xuXG4gICAgcmV0dXJuIGNsYXNzTmFtZTtcbn07XG5leHBvcnRzLmluamVjdEFuZEdldENsYXNzTmFtZSA9IGluamVjdEFuZEdldENsYXNzTmFtZTsiLCIvLyBNb2R1bGUgd2l0aCB0aGUgc2FtZSBpbnRlcmZhY2UgYXMgdGhlIGNvcmUgYXBocm9kaXRlIG1vZHVsZSxcbi8vIGV4Y2VwdCB0aGF0IHN0eWxlcyBpbmplY3RlZCBkbyBub3QgYXV0b21hdGljYWxseSBoYXZlICFpbXBvcnRhbnRcbi8vIGFwcGVuZGVkIHRvIHRoZW0uXG4vL1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2luamVjdCA9IHJlcXVpcmUoJy4vaW5qZWN0Jyk7XG5cbnZhciBfaW5kZXhKcyA9IHJlcXVpcmUoJy4vaW5kZXguanMnKTtcblxudmFyIGNzcyA9IGZ1bmN0aW9uIGNzcygpIHtcbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgc3R5bGVEZWZpbml0aW9ucyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICBzdHlsZURlZmluaXRpb25zW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIHZhciB1c2VJbXBvcnRhbnQgPSBmYWxzZTsgLy8gRG9uJ3QgYXBwZW5kICFpbXBvcnRhbnQgdG8gc3R5bGUgZGVmaW5pdGlvbnNcbiAgICByZXR1cm4gKDAsIF9pbmplY3QuaW5qZWN0QW5kR2V0Q2xhc3NOYW1lKSh1c2VJbXBvcnRhbnQsIHN0eWxlRGVmaW5pdGlvbnMpO1xufTtcblxuZXhwb3J0cy5TdHlsZVNoZWV0ID0gX2luZGV4SnMuU3R5bGVTaGVldDtcbmV4cG9ydHMuU3R5bGVTaGVldFNlcnZlciA9IF9pbmRleEpzLlN0eWxlU2hlZXRTZXJ2ZXI7XG5leHBvcnRzLlN0eWxlU2hlZXRUZXN0VXRpbHMgPSBfaW5kZXhKcy5TdHlsZVNoZWV0VGVzdFV0aWxzO1xuZXhwb3J0cy5jc3MgPSBjc3M7IiwiLy8ge0sxOiBWMSwgSzI6IFYyLCAuLi59IC0+IFtbSzEsIFYxXSwgW0syLCBWMl1dXG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfc2xpY2VkVG9BcnJheSA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIHNsaWNlSXRlcmF0b3IoYXJyLCBpKSB7IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX2UgPSB1bmRlZmluZWQ7IHRyeSB7IGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pWydyZXR1cm4nXSkgX2lbJ3JldHVybiddKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfSByZXR1cm4gZnVuY3Rpb24gKGFyciwgaSkgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7IHJldHVybiBhcnI7IH0gZWxzZSBpZiAoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSB7IHJldHVybiBzbGljZUl0ZXJhdG9yKGFyciwgaSk7IH0gZWxzZSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UnKTsgfSB9OyB9KSgpO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG52YXIgb2JqZWN0VG9QYWlycyA9IGZ1bmN0aW9uIG9iamVjdFRvUGFpcnMob2JqKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgcmV0dXJuIFtrZXksIG9ialtrZXldXTtcbiAgICB9KTtcbn07XG5cbmV4cG9ydHMub2JqZWN0VG9QYWlycyA9IG9iamVjdFRvUGFpcnM7XG4vLyBbW0sxLCBWMV0sIFtLMiwgVjJdXSAtPiB7SzE6IFYxLCBLMjogVjIsIC4uLn1cbnZhciBwYWlyc1RvT2JqZWN0ID0gZnVuY3Rpb24gcGFpcnNUb09iamVjdChwYWlycykge1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBwYWlycy5mb3JFYWNoKGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgICAgIHZhciBfcmVmMiA9IF9zbGljZWRUb0FycmF5KF9yZWYsIDIpO1xuXG4gICAgICAgIHZhciBrZXkgPSBfcmVmMlswXTtcbiAgICAgICAgdmFyIHZhbCA9IF9yZWYyWzFdO1xuXG4gICAgICAgIHJlc3VsdFtrZXldID0gdmFsO1xuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuXG52YXIgbWFwT2JqID0gZnVuY3Rpb24gbWFwT2JqKG9iaiwgZm4pIHtcbiAgICByZXR1cm4gcGFpcnNUb09iamVjdChvYmplY3RUb1BhaXJzKG9iaikubWFwKGZuKSk7XG59O1xuXG5leHBvcnRzLm1hcE9iaiA9IG1hcE9iajtcbi8vIEZsYXR0ZW5zIGFuIGFycmF5IG9uZSBsZXZlbFxuLy8gW1tBXSwgW0IsIEMsIFtEXV1dIC0+IFtBLCBCLCBDLCBbRF1dXG52YXIgZmxhdHRlbiA9IGZ1bmN0aW9uIGZsYXR0ZW4obGlzdCkge1xuICAgIHJldHVybiBsaXN0LnJlZHVjZShmdW5jdGlvbiAobWVtbywgeCkge1xuICAgICAgICByZXR1cm4gbWVtby5jb25jYXQoeCk7XG4gICAgfSwgW10pO1xufTtcblxuZXhwb3J0cy5mbGF0dGVuID0gZmxhdHRlbjtcbnZhciBVUFBFUkNBU0VfUkUgPSAvKFtBLVpdKS9nO1xudmFyIE1TX1JFID0gL15tcy0vO1xuXG52YXIga2ViYWJpZnkgPSBmdW5jdGlvbiBrZWJhYmlmeShzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoVVBQRVJDQVNFX1JFLCAnLSQxJykudG9Mb3dlckNhc2UoKTtcbn07XG52YXIga2ViYWJpZnlTdHlsZU5hbWUgPSBmdW5jdGlvbiBrZWJhYmlmeVN0eWxlTmFtZShzdHJpbmcpIHtcbiAgICByZXR1cm4ga2ViYWJpZnkoc3RyaW5nKS5yZXBsYWNlKE1TX1JFLCAnLW1zLScpO1xufTtcblxuZXhwb3J0cy5rZWJhYmlmeVN0eWxlTmFtZSA9IGtlYmFiaWZ5U3R5bGVOYW1lO1xudmFyIHJlY3Vyc2l2ZU1lcmdlID0gZnVuY3Rpb24gcmVjdXJzaXZlTWVyZ2UoYSwgYikge1xuICAgIC8vIFRPRE8oamxmd29uZyk6IEhhbmRsZSBtYWxmb3JtZWQgaW5wdXQgd2hlcmUgYSBhbmQgYiBhcmUgbm90IHRoZSBzYW1lXG4gICAgLy8gdHlwZS5cblxuICAgIGlmICh0eXBlb2YgYSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIGI7XG4gICAgfVxuXG4gICAgdmFyIHJldCA9IF9leHRlbmRzKHt9LCBhKTtcblxuICAgIE9iamVjdC5rZXlzKGIpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBpZiAocmV0Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIHJldFtrZXldID0gcmVjdXJzaXZlTWVyZ2UoYVtrZXldLCBiW2tleV0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0W2tleV0gPSBiW2tleV07XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiByZXQ7XG59O1xuXG5leHBvcnRzLnJlY3Vyc2l2ZU1lcmdlID0gcmVjdXJzaXZlTWVyZ2U7XG4vKipcbiAqIENTUyBwcm9wZXJ0aWVzIHdoaWNoIGFjY2VwdCBudW1iZXJzIGJ1dCBhcmUgbm90IGluIHVuaXRzIG9mIFwicHhcIi5cbiAqIFRha2VuIGZyb20gUmVhY3QncyBDU1NQcm9wZXJ0eS5qc1xuICovXG52YXIgaXNVbml0bGVzc051bWJlciA9IHtcbiAgICBhbmltYXRpb25JdGVyYXRpb25Db3VudDogdHJ1ZSxcbiAgICBib3JkZXJJbWFnZU91dHNldDogdHJ1ZSxcbiAgICBib3JkZXJJbWFnZVNsaWNlOiB0cnVlLFxuICAgIGJvcmRlckltYWdlV2lkdGg6IHRydWUsXG4gICAgYm94RmxleDogdHJ1ZSxcbiAgICBib3hGbGV4R3JvdXA6IHRydWUsXG4gICAgYm94T3JkaW5hbEdyb3VwOiB0cnVlLFxuICAgIGNvbHVtbkNvdW50OiB0cnVlLFxuICAgIGZsZXg6IHRydWUsXG4gICAgZmxleEdyb3c6IHRydWUsXG4gICAgZmxleFBvc2l0aXZlOiB0cnVlLFxuICAgIGZsZXhTaHJpbms6IHRydWUsXG4gICAgZmxleE5lZ2F0aXZlOiB0cnVlLFxuICAgIGZsZXhPcmRlcjogdHJ1ZSxcbiAgICBncmlkUm93OiB0cnVlLFxuICAgIGdyaWRDb2x1bW46IHRydWUsXG4gICAgZm9udFdlaWdodDogdHJ1ZSxcbiAgICBsaW5lQ2xhbXA6IHRydWUsXG4gICAgbGluZUhlaWdodDogdHJ1ZSxcbiAgICBvcGFjaXR5OiB0cnVlLFxuICAgIG9yZGVyOiB0cnVlLFxuICAgIG9ycGhhbnM6IHRydWUsXG4gICAgdGFiU2l6ZTogdHJ1ZSxcbiAgICB3aWRvd3M6IHRydWUsXG4gICAgekluZGV4OiB0cnVlLFxuICAgIHpvb206IHRydWUsXG5cbiAgICAvLyBTVkctcmVsYXRlZCBwcm9wZXJ0aWVzXG4gICAgZmlsbE9wYWNpdHk6IHRydWUsXG4gICAgZmxvb2RPcGFjaXR5OiB0cnVlLFxuICAgIHN0b3BPcGFjaXR5OiB0cnVlLFxuICAgIHN0cm9rZURhc2hhcnJheTogdHJ1ZSxcbiAgICBzdHJva2VEYXNob2Zmc2V0OiB0cnVlLFxuICAgIHN0cm9rZU1pdGVybGltaXQ6IHRydWUsXG4gICAgc3Ryb2tlT3BhY2l0eTogdHJ1ZSxcbiAgICBzdHJva2VXaWR0aDogdHJ1ZVxufTtcblxuLyoqXG4gKiBUYWtlbiBmcm9tIFJlYWN0J3MgQ1NTUHJvcGVydHkuanNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJlZml4IHZlbmRvci1zcGVjaWZpYyBwcmVmaXgsIGVnOiBXZWJraXRcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgc3R5bGUgbmFtZSwgZWc6IHRyYW5zaXRpb25EdXJhdGlvblxuICogQHJldHVybiB7c3RyaW5nfSBzdHlsZSBuYW1lIHByZWZpeGVkIHdpdGggYHByZWZpeGAsIHByb3Blcmx5IGNhbWVsQ2FzZWQsIGVnOlxuICogV2Via2l0VHJhbnNpdGlvbkR1cmF0aW9uXG4gKi9cbmZ1bmN0aW9uIHByZWZpeEtleShwcmVmaXgsIGtleSkge1xuICAgIHJldHVybiBwcmVmaXggKyBrZXkuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBrZXkuc3Vic3RyaW5nKDEpO1xufVxuXG4vKipcbiAqIFN1cHBvcnQgc3R5bGUgbmFtZXMgdGhhdCBtYXkgY29tZSBwYXNzZWQgaW4gcHJlZml4ZWQgYnkgYWRkaW5nIHBlcm11dGF0aW9uc1xuICogb2YgdmVuZG9yIHByZWZpeGVzLlxuICogVGFrZW4gZnJvbSBSZWFjdCdzIENTU1Byb3BlcnR5LmpzXG4gKi9cbnZhciBwcmVmaXhlcyA9IFsnV2Via2l0JywgJ21zJywgJ01veicsICdPJ107XG5cbi8vIFVzaW5nIE9iamVjdC5rZXlzIGhlcmUsIG9yIGVsc2UgdGhlIHZhbmlsbGEgZm9yLWluIGxvb3AgbWFrZXMgSUU4IGdvIGludG8gYW5cbi8vIGluZmluaXRlIGxvb3AsIGJlY2F1c2UgaXQgaXRlcmF0ZXMgb3ZlciB0aGUgbmV3bHkgYWRkZWQgcHJvcHMgdG9vLlxuLy8gVGFrZW4gZnJvbSBSZWFjdCdzIENTU1Byb3BlcnR5LmpzXG5PYmplY3Qua2V5cyhpc1VuaXRsZXNzTnVtYmVyKS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgcHJlZml4ZXMuZm9yRWFjaChmdW5jdGlvbiAocHJlZml4KSB7XG4gICAgICAgIGlzVW5pdGxlc3NOdW1iZXJbcHJlZml4S2V5KHByZWZpeCwgcHJvcCldID0gaXNVbml0bGVzc051bWJlcltwcm9wXTtcbiAgICB9KTtcbn0pO1xuXG52YXIgc3RyaW5naWZ5VmFsdWUgPSBmdW5jdGlvbiBzdHJpbmdpZnlWYWx1ZShrZXksIHByb3ApIHtcbiAgICBpZiAodHlwZW9mIHByb3AgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgaWYgKGlzVW5pdGxlc3NOdW1iZXJba2V5XSkge1xuICAgICAgICAgICAgcmV0dXJuIFwiXCIgKyBwcm9wO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHByb3AgKyBcInB4XCI7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcHJvcDtcbiAgICB9XG59O1xuXG5leHBvcnRzLnN0cmluZ2lmeVZhbHVlID0gc3RyaW5naWZ5VmFsdWU7XG4vKipcbiAqIEpTIEltcGxlbWVudGF0aW9uIG9mIE11cm11ckhhc2gyXG4gKlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOmdhcnkuY291cnRAZ21haWwuY29tXCI+R2FyeSBDb3VydDwvYT5cbiAqIEBzZWUgaHR0cDovL2dpdGh1Yi5jb20vZ2FyeWNvdXJ0L211cm11cmhhc2gtanNcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzphYXBwbGVieUBnbWFpbC5jb21cIj5BdXN0aW4gQXBwbGVieTwvYT5cbiAqIEBzZWUgaHR0cDovL3NpdGVzLmdvb2dsZS5jb20vc2l0ZS9tdXJtdXJoYXNoL1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgQVNDSUkgb25seVxuICogQHJldHVybiB7c3RyaW5nfSBCYXNlIDM2IGVuY29kZWQgaGFzaCByZXN1bHRcbiAqL1xuZnVuY3Rpb24gbXVybXVyaGFzaDJfMzJfZ2Moc3RyKSB7XG4gICAgdmFyIGwgPSBzdHIubGVuZ3RoO1xuICAgIHZhciBoID0gbDtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIGsgPSB1bmRlZmluZWQ7XG5cbiAgICB3aGlsZSAobCA+PSA0KSB7XG4gICAgICAgIGsgPSBzdHIuY2hhckNvZGVBdChpKSAmIDB4ZmYgfCAoc3RyLmNoYXJDb2RlQXQoKytpKSAmIDB4ZmYpIDw8IDggfCAoc3RyLmNoYXJDb2RlQXQoKytpKSAmIDB4ZmYpIDw8IDE2IHwgKHN0ci5jaGFyQ29kZUF0KCsraSkgJiAweGZmKSA8PCAyNDtcblxuICAgICAgICBrID0gKGsgJiAweGZmZmYpICogMHg1YmQxZTk5NSArICgoKGsgPj4+IDE2KSAqIDB4NWJkMWU5OTUgJiAweGZmZmYpIDw8IDE2KTtcbiAgICAgICAgayBePSBrID4+PiAyNDtcbiAgICAgICAgayA9IChrICYgMHhmZmZmKSAqIDB4NWJkMWU5OTUgKyAoKChrID4+PiAxNikgKiAweDViZDFlOTk1ICYgMHhmZmZmKSA8PCAxNik7XG5cbiAgICAgICAgaCA9IChoICYgMHhmZmZmKSAqIDB4NWJkMWU5OTUgKyAoKChoID4+PiAxNikgKiAweDViZDFlOTk1ICYgMHhmZmZmKSA8PCAxNikgXiBrO1xuXG4gICAgICAgIGwgLT0gNDtcbiAgICAgICAgKytpO1xuICAgIH1cblxuICAgIHN3aXRjaCAobCkge1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICBoIF49IChzdHIuY2hhckNvZGVBdChpICsgMikgJiAweGZmKSA8PCAxNjtcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgaCBePSAoc3RyLmNoYXJDb2RlQXQoaSArIDEpICYgMHhmZikgPDwgODtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgaCBePSBzdHIuY2hhckNvZGVBdChpKSAmIDB4ZmY7XG4gICAgICAgICAgICBoID0gKGggJiAweGZmZmYpICogMHg1YmQxZTk5NSArICgoKGggPj4+IDE2KSAqIDB4NWJkMWU5OTUgJiAweGZmZmYpIDw8IDE2KTtcbiAgICB9XG5cbiAgICBoIF49IGggPj4+IDEzO1xuICAgIGggPSAoaCAmIDB4ZmZmZikgKiAweDViZDFlOTk1ICsgKCgoaCA+Pj4gMTYpICogMHg1YmQxZTk5NSAmIDB4ZmZmZikgPDwgMTYpO1xuICAgIGggXj0gaCA+Pj4gMTU7XG5cbiAgICByZXR1cm4gKGggPj4+IDApLnRvU3RyaW5nKDM2KTtcbn1cblxuLy8gSGFzaCBhIGphdmFzY3JpcHQgb2JqZWN0IHVzaW5nIEpTT04uc3RyaW5naWZ5LiBUaGlzIGlzIHZlcnkgZmFzdCwgYWJvdXQgM1xuLy8gbWljcm9zZWNvbmRzIG9uIG15IGNvbXB1dGVyIGZvciBhIHNhbXBsZSBvYmplY3Q6XG4vLyBodHRwOi8vanNwZXJmLmNvbS90ZXN0LWhhc2hmbnYzMmEtaGFzaC81XG4vL1xuLy8gTm90ZSB0aGF0IHRoaXMgdXNlcyBKU09OLnN0cmluZ2lmeSB0byBzdHJpbmdpZnkgdGhlIG9iamVjdHMgc28gaW4gb3JkZXIgZm9yXG4vLyB0aGlzIHRvIHByb2R1Y2UgY29uc2lzdGVudCBoYXNoZXMgYnJvd3NlcnMgbmVlZCB0byBoYXZlIGEgY29uc2lzdGVudFxuLy8gb3JkZXJpbmcgb2Ygb2JqZWN0cy4gQmVuIEFscGVydCBzYXlzIHRoYXQgRmFjZWJvb2sgZGVwZW5kcyBvbiB0aGlzLCBzbyB3ZVxuLy8gY2FuIHByb2JhYmx5IGRlcGVuZCBvbiB0aGlzIHRvby5cbnZhciBoYXNoT2JqZWN0ID0gZnVuY3Rpb24gaGFzaE9iamVjdChvYmplY3QpIHtcbiAgICByZXR1cm4gbXVybXVyaGFzaDJfMzJfZ2MoSlNPTi5zdHJpbmdpZnkob2JqZWN0KSk7XG59O1xuXG5leHBvcnRzLmhhc2hPYmplY3QgPSBoYXNoT2JqZWN0O1xudmFyIElNUE9SVEFOVF9SRSA9IC9eKFteOl0rOi4qPykoICFpbXBvcnRhbnQpPzskLztcblxuLy8gR2l2ZW4gYSBzaW5nbGUgc3R5bGUgcnVsZSBzdHJpbmcgbGlrZSBcImE6IGI7XCIsIGFkZHMgIWltcG9ydGFudCB0byBnZW5lcmF0ZVxuLy8gXCJhOiBiICFpbXBvcnRhbnQ7XCIuXG52YXIgaW1wb3J0YW50aWZ5ID0gZnVuY3Rpb24gaW1wb3J0YW50aWZ5KHN0cmluZykge1xuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZShJTVBPUlRBTlRfUkUsIGZ1bmN0aW9uIChfLCBiYXNlLCBpbXBvcnRhbnQpIHtcbiAgICAgICAgcmV0dXJuIGJhc2UgKyBcIiAhaW1wb3J0YW50O1wiO1xuICAgIH0pO1xufTtcbmV4cG9ydHMuaW1wb3J0YW50aWZ5ID0gaW1wb3J0YW50aWZ5OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvbm8taW1wb3J0YW50LmpzJyk7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLy8gcmF3QXNhcCBwcm92aWRlcyBldmVyeXRoaW5nIHdlIG5lZWQgZXhjZXB0IGV4Y2VwdGlvbiBtYW5hZ2VtZW50LlxudmFyIHJhd0FzYXAgPSByZXF1aXJlKFwiLi9yYXdcIik7XG4vLyBSYXdUYXNrcyBhcmUgcmVjeWNsZWQgdG8gcmVkdWNlIEdDIGNodXJuLlxudmFyIGZyZWVUYXNrcyA9IFtdO1xuLy8gV2UgcXVldWUgZXJyb3JzIHRvIGVuc3VyZSB0aGV5IGFyZSB0aHJvd24gaW4gcmlnaHQgb3JkZXIgKEZJRk8pLlxuLy8gQXJyYXktYXMtcXVldWUgaXMgZ29vZCBlbm91Z2ggaGVyZSwgc2luY2Ugd2UgYXJlIGp1c3QgZGVhbGluZyB3aXRoIGV4Y2VwdGlvbnMuXG52YXIgcGVuZGluZ0Vycm9ycyA9IFtdO1xudmFyIHJlcXVlc3RFcnJvclRocm93ID0gcmF3QXNhcC5tYWtlUmVxdWVzdENhbGxGcm9tVGltZXIodGhyb3dGaXJzdEVycm9yKTtcblxuZnVuY3Rpb24gdGhyb3dGaXJzdEVycm9yKCkge1xuICAgIGlmIChwZW5kaW5nRXJyb3JzLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBwZW5kaW5nRXJyb3JzLnNoaWZ0KCk7XG4gICAgfVxufVxuXG4vKipcbiAqIENhbGxzIGEgdGFzayBhcyBzb29uIGFzIHBvc3NpYmxlIGFmdGVyIHJldHVybmluZywgaW4gaXRzIG93biBldmVudCwgd2l0aCBwcmlvcml0eVxuICogb3ZlciBvdGhlciBldmVudHMgbGlrZSBhbmltYXRpb24sIHJlZmxvdywgYW5kIHJlcGFpbnQuIEFuIGVycm9yIHRocm93biBmcm9tIGFuXG4gKiBldmVudCB3aWxsIG5vdCBpbnRlcnJ1cHQsIG5vciBldmVuIHN1YnN0YW50aWFsbHkgc2xvdyBkb3duIHRoZSBwcm9jZXNzaW5nIG9mXG4gKiBvdGhlciBldmVudHMsIGJ1dCB3aWxsIGJlIHJhdGhlciBwb3N0cG9uZWQgdG8gYSBsb3dlciBwcmlvcml0eSBldmVudC5cbiAqIEBwYXJhbSB7e2NhbGx9fSB0YXNrIEEgY2FsbGFibGUgb2JqZWN0LCB0eXBpY2FsbHkgYSBmdW5jdGlvbiB0aGF0IHRha2VzIG5vXG4gKiBhcmd1bWVudHMuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gYXNhcDtcbmZ1bmN0aW9uIGFzYXAodGFzaykge1xuICAgIHZhciByYXdUYXNrO1xuICAgIGlmIChmcmVlVGFza3MubGVuZ3RoKSB7XG4gICAgICAgIHJhd1Rhc2sgPSBmcmVlVGFza3MucG9wKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmF3VGFzayA9IG5ldyBSYXdUYXNrKCk7XG4gICAgfVxuICAgIHJhd1Rhc2sudGFzayA9IHRhc2s7XG4gICAgcmF3QXNhcChyYXdUYXNrKTtcbn1cblxuLy8gV2Ugd3JhcCB0YXNrcyB3aXRoIHJlY3ljbGFibGUgdGFzayBvYmplY3RzLiAgQSB0YXNrIG9iamVjdCBpbXBsZW1lbnRzXG4vLyBgY2FsbGAsIGp1c3QgbGlrZSBhIGZ1bmN0aW9uLlxuZnVuY3Rpb24gUmF3VGFzaygpIHtcbiAgICB0aGlzLnRhc2sgPSBudWxsO1xufVxuXG4vLyBUaGUgc29sZSBwdXJwb3NlIG9mIHdyYXBwaW5nIHRoZSB0YXNrIGlzIHRvIGNhdGNoIHRoZSBleGNlcHRpb24gYW5kIHJlY3ljbGVcbi8vIHRoZSB0YXNrIG9iamVjdCBhZnRlciBpdHMgc2luZ2xlIHVzZS5cblJhd1Rhc2sucHJvdG90eXBlLmNhbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgdGhpcy50YXNrLmNhbGwoKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoYXNhcC5vbmVycm9yKSB7XG4gICAgICAgICAgICAvLyBUaGlzIGhvb2sgZXhpc3RzIHB1cmVseSBmb3IgdGVzdGluZyBwdXJwb3Nlcy5cbiAgICAgICAgICAgIC8vIEl0cyBuYW1lIHdpbGwgYmUgcGVyaW9kaWNhbGx5IHJhbmRvbWl6ZWQgdG8gYnJlYWsgYW55IGNvZGUgdGhhdFxuICAgICAgICAgICAgLy8gZGVwZW5kcyBvbiBpdHMgZXhpc3RlbmNlLlxuICAgICAgICAgICAgYXNhcC5vbmVycm9yKGVycm9yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIEluIGEgd2ViIGJyb3dzZXIsIGV4Y2VwdGlvbnMgYXJlIG5vdCBmYXRhbC4gSG93ZXZlciwgdG8gYXZvaWRcbiAgICAgICAgICAgIC8vIHNsb3dpbmcgZG93biB0aGUgcXVldWUgb2YgcGVuZGluZyB0YXNrcywgd2UgcmV0aHJvdyB0aGUgZXJyb3IgaW4gYVxuICAgICAgICAgICAgLy8gbG93ZXIgcHJpb3JpdHkgdHVybi5cbiAgICAgICAgICAgIHBlbmRpbmdFcnJvcnMucHVzaChlcnJvcik7XG4gICAgICAgICAgICByZXF1ZXN0RXJyb3JUaHJvdygpO1xuICAgICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgICAgdGhpcy50YXNrID0gbnVsbDtcbiAgICAgICAgZnJlZVRhc2tzW2ZyZWVUYXNrcy5sZW5ndGhdID0gdGhpcztcbiAgICB9XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vIFVzZSB0aGUgZmFzdGVzdCBtZWFucyBwb3NzaWJsZSB0byBleGVjdXRlIGEgdGFzayBpbiBpdHMgb3duIHR1cm4sIHdpdGhcbi8vIHByaW9yaXR5IG92ZXIgb3RoZXIgZXZlbnRzIGluY2x1ZGluZyBJTywgYW5pbWF0aW9uLCByZWZsb3csIGFuZCByZWRyYXdcbi8vIGV2ZW50cyBpbiBicm93c2Vycy5cbi8vXG4vLyBBbiBleGNlcHRpb24gdGhyb3duIGJ5IGEgdGFzayB3aWxsIHBlcm1hbmVudGx5IGludGVycnVwdCB0aGUgcHJvY2Vzc2luZyBvZlxuLy8gc3Vic2VxdWVudCB0YXNrcy4gVGhlIGhpZ2hlciBsZXZlbCBgYXNhcGAgZnVuY3Rpb24gZW5zdXJlcyB0aGF0IGlmIGFuXG4vLyBleGNlcHRpb24gaXMgdGhyb3duIGJ5IGEgdGFzaywgdGhhdCB0aGUgdGFzayBxdWV1ZSB3aWxsIGNvbnRpbnVlIGZsdXNoaW5nIGFzXG4vLyBzb29uIGFzIHBvc3NpYmxlLCBidXQgaWYgeW91IHVzZSBgcmF3QXNhcGAgZGlyZWN0bHksIHlvdSBhcmUgcmVzcG9uc2libGUgdG9cbi8vIGVpdGhlciBlbnN1cmUgdGhhdCBubyBleGNlcHRpb25zIGFyZSB0aHJvd24gZnJvbSB5b3VyIHRhc2ssIG9yIHRvIG1hbnVhbGx5XG4vLyBjYWxsIGByYXdBc2FwLnJlcXVlc3RGbHVzaGAgaWYgYW4gZXhjZXB0aW9uIGlzIHRocm93bi5cbm1vZHVsZS5leHBvcnRzID0gcmF3QXNhcDtcbmZ1bmN0aW9uIHJhd0FzYXAodGFzaykge1xuICAgIGlmICghcXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHJlcXVlc3RGbHVzaCgpO1xuICAgICAgICBmbHVzaGluZyA9IHRydWU7XG4gICAgfVxuICAgIC8vIEVxdWl2YWxlbnQgdG8gcHVzaCwgYnV0IGF2b2lkcyBhIGZ1bmN0aW9uIGNhbGwuXG4gICAgcXVldWVbcXVldWUubGVuZ3RoXSA9IHRhc2s7XG59XG5cbnZhciBxdWV1ZSA9IFtdO1xuLy8gT25jZSBhIGZsdXNoIGhhcyBiZWVuIHJlcXVlc3RlZCwgbm8gZnVydGhlciBjYWxscyB0byBgcmVxdWVzdEZsdXNoYCBhcmVcbi8vIG5lY2Vzc2FyeSB1bnRpbCB0aGUgbmV4dCBgZmx1c2hgIGNvbXBsZXRlcy5cbnZhciBmbHVzaGluZyA9IGZhbHNlO1xuLy8gYHJlcXVlc3RGbHVzaGAgaXMgYW4gaW1wbGVtZW50YXRpb24tc3BlY2lmaWMgbWV0aG9kIHRoYXQgYXR0ZW1wdHMgdG8ga2lja1xuLy8gb2ZmIGEgYGZsdXNoYCBldmVudCBhcyBxdWlja2x5IGFzIHBvc3NpYmxlLiBgZmx1c2hgIHdpbGwgYXR0ZW1wdCB0byBleGhhdXN0XG4vLyB0aGUgZXZlbnQgcXVldWUgYmVmb3JlIHlpZWxkaW5nIHRvIHRoZSBicm93c2VyJ3Mgb3duIGV2ZW50IGxvb3AuXG52YXIgcmVxdWVzdEZsdXNoO1xuLy8gVGhlIHBvc2l0aW9uIG9mIHRoZSBuZXh0IHRhc2sgdG8gZXhlY3V0ZSBpbiB0aGUgdGFzayBxdWV1ZS4gVGhpcyBpc1xuLy8gcHJlc2VydmVkIGJldHdlZW4gY2FsbHMgdG8gYGZsdXNoYCBzbyB0aGF0IGl0IGNhbiBiZSByZXN1bWVkIGlmXG4vLyBhIHRhc2sgdGhyb3dzIGFuIGV4Y2VwdGlvbi5cbnZhciBpbmRleCA9IDA7XG4vLyBJZiBhIHRhc2sgc2NoZWR1bGVzIGFkZGl0aW9uYWwgdGFza3MgcmVjdXJzaXZlbHksIHRoZSB0YXNrIHF1ZXVlIGNhbiBncm93XG4vLyB1bmJvdW5kZWQuIFRvIHByZXZlbnQgbWVtb3J5IGV4aGF1c3Rpb24sIHRoZSB0YXNrIHF1ZXVlIHdpbGwgcGVyaW9kaWNhbGx5XG4vLyB0cnVuY2F0ZSBhbHJlYWR5LWNvbXBsZXRlZCB0YXNrcy5cbnZhciBjYXBhY2l0eSA9IDEwMjQ7XG5cbi8vIFRoZSBmbHVzaCBmdW5jdGlvbiBwcm9jZXNzZXMgYWxsIHRhc2tzIHRoYXQgaGF2ZSBiZWVuIHNjaGVkdWxlZCB3aXRoXG4vLyBgcmF3QXNhcGAgdW5sZXNzIGFuZCB1bnRpbCBvbmUgb2YgdGhvc2UgdGFza3MgdGhyb3dzIGFuIGV4Y2VwdGlvbi5cbi8vIElmIGEgdGFzayB0aHJvd3MgYW4gZXhjZXB0aW9uLCBgZmx1c2hgIGVuc3VyZXMgdGhhdCBpdHMgc3RhdGUgd2lsbCByZW1haW5cbi8vIGNvbnNpc3RlbnQgYW5kIHdpbGwgcmVzdW1lIHdoZXJlIGl0IGxlZnQgb2ZmIHdoZW4gY2FsbGVkIGFnYWluLlxuLy8gSG93ZXZlciwgYGZsdXNoYCBkb2VzIG5vdCBtYWtlIGFueSBhcnJhbmdlbWVudHMgdG8gYmUgY2FsbGVkIGFnYWluIGlmIGFuXG4vLyBleGNlcHRpb24gaXMgdGhyb3duLlxuZnVuY3Rpb24gZmx1c2goKSB7XG4gICAgd2hpbGUgKGluZGV4IDwgcXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHZhciBjdXJyZW50SW5kZXggPSBpbmRleDtcbiAgICAgICAgLy8gQWR2YW5jZSB0aGUgaW5kZXggYmVmb3JlIGNhbGxpbmcgdGhlIHRhc2suIFRoaXMgZW5zdXJlcyB0aGF0IHdlIHdpbGxcbiAgICAgICAgLy8gYmVnaW4gZmx1c2hpbmcgb24gdGhlIG5leHQgdGFzayB0aGUgdGFzayB0aHJvd3MgYW4gZXJyb3IuXG4gICAgICAgIGluZGV4ID0gaW5kZXggKyAxO1xuICAgICAgICBxdWV1ZVtjdXJyZW50SW5kZXhdLmNhbGwoKTtcbiAgICAgICAgLy8gUHJldmVudCBsZWFraW5nIG1lbW9yeSBmb3IgbG9uZyBjaGFpbnMgb2YgcmVjdXJzaXZlIGNhbGxzIHRvIGBhc2FwYC5cbiAgICAgICAgLy8gSWYgd2UgY2FsbCBgYXNhcGAgd2l0aGluIHRhc2tzIHNjaGVkdWxlZCBieSBgYXNhcGAsIHRoZSBxdWV1ZSB3aWxsXG4gICAgICAgIC8vIGdyb3csIGJ1dCB0byBhdm9pZCBhbiBPKG4pIHdhbGsgZm9yIGV2ZXJ5IHRhc2sgd2UgZXhlY3V0ZSwgd2UgZG9uJ3RcbiAgICAgICAgLy8gc2hpZnQgdGFza3Mgb2ZmIHRoZSBxdWV1ZSBhZnRlciB0aGV5IGhhdmUgYmVlbiBleGVjdXRlZC5cbiAgICAgICAgLy8gSW5zdGVhZCwgd2UgcGVyaW9kaWNhbGx5IHNoaWZ0IDEwMjQgdGFza3Mgb2ZmIHRoZSBxdWV1ZS5cbiAgICAgICAgaWYgKGluZGV4ID4gY2FwYWNpdHkpIHtcbiAgICAgICAgICAgIC8vIE1hbnVhbGx5IHNoaWZ0IGFsbCB2YWx1ZXMgc3RhcnRpbmcgYXQgdGhlIGluZGV4IGJhY2sgdG8gdGhlXG4gICAgICAgICAgICAvLyBiZWdpbm5pbmcgb2YgdGhlIHF1ZXVlLlxuICAgICAgICAgICAgZm9yICh2YXIgc2NhbiA9IDAsIG5ld0xlbmd0aCA9IHF1ZXVlLmxlbmd0aCAtIGluZGV4OyBzY2FuIDwgbmV3TGVuZ3RoOyBzY2FuKyspIHtcbiAgICAgICAgICAgICAgICBxdWV1ZVtzY2FuXSA9IHF1ZXVlW3NjYW4gKyBpbmRleF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBxdWV1ZS5sZW5ndGggLT0gaW5kZXg7XG4gICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUubGVuZ3RoID0gMDtcbiAgICBpbmRleCA9IDA7XG4gICAgZmx1c2hpbmcgPSBmYWxzZTtcbn1cblxuLy8gYHJlcXVlc3RGbHVzaGAgaXMgaW1wbGVtZW50ZWQgdXNpbmcgYSBzdHJhdGVneSBiYXNlZCBvbiBkYXRhIGNvbGxlY3RlZCBmcm9tXG4vLyBldmVyeSBhdmFpbGFibGUgU2F1Y2VMYWJzIFNlbGVuaXVtIHdlYiBkcml2ZXIgd29ya2VyIGF0IHRpbWUgb2Ygd3JpdGluZy5cbi8vIGh0dHBzOi8vZG9jcy5nb29nbGUuY29tL3NwcmVhZHNoZWV0cy9kLzFtRy01VVlHdXA1cXhHZEVNV2toUDZCV0N6MDUzTlViMkUxUW9VVFUxNnVBL2VkaXQjZ2lkPTc4MzcyNDU5M1xuXG4vLyBTYWZhcmkgNiBhbmQgNi4xIGZvciBkZXNrdG9wLCBpUGFkLCBhbmQgaVBob25lIGFyZSB0aGUgb25seSBicm93c2VycyB0aGF0XG4vLyBoYXZlIFdlYktpdE11dGF0aW9uT2JzZXJ2ZXIgYnV0IG5vdCB1bi1wcmVmaXhlZCBNdXRhdGlvbk9ic2VydmVyLlxuLy8gTXVzdCB1c2UgYGdsb2JhbGAgaW5zdGVhZCBvZiBgd2luZG93YCB0byB3b3JrIGluIGJvdGggZnJhbWVzIGFuZCB3ZWJcbi8vIHdvcmtlcnMuIGBnbG9iYWxgIGlzIGEgcHJvdmlzaW9uIG9mIEJyb3dzZXJpZnksIE1yLCBNcnMsIG9yIE1vcC5cbnZhciBCcm93c2VyTXV0YXRpb25PYnNlcnZlciA9IGdsb2JhbC5NdXRhdGlvbk9ic2VydmVyIHx8IGdsb2JhbC5XZWJLaXRNdXRhdGlvbk9ic2VydmVyO1xuXG4vLyBNdXRhdGlvbk9ic2VydmVycyBhcmUgZGVzaXJhYmxlIGJlY2F1c2UgdGhleSBoYXZlIGhpZ2ggcHJpb3JpdHkgYW5kIHdvcmtcbi8vIHJlbGlhYmx5IGV2ZXJ5d2hlcmUgdGhleSBhcmUgaW1wbGVtZW50ZWQuXG4vLyBUaGV5IGFyZSBpbXBsZW1lbnRlZCBpbiBhbGwgbW9kZXJuIGJyb3dzZXJzLlxuLy9cbi8vIC0gQW5kcm9pZCA0LTQuM1xuLy8gLSBDaHJvbWUgMjYtMzRcbi8vIC0gRmlyZWZveCAxNC0yOVxuLy8gLSBJbnRlcm5ldCBFeHBsb3JlciAxMVxuLy8gLSBpUGFkIFNhZmFyaSA2LTcuMVxuLy8gLSBpUGhvbmUgU2FmYXJpIDctNy4xXG4vLyAtIFNhZmFyaSA2LTdcbmlmICh0eXBlb2YgQnJvd3Nlck11dGF0aW9uT2JzZXJ2ZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHJlcXVlc3RGbHVzaCA9IG1ha2VSZXF1ZXN0Q2FsbEZyb21NdXRhdGlvbk9ic2VydmVyKGZsdXNoKTtcblxuLy8gTWVzc2FnZUNoYW5uZWxzIGFyZSBkZXNpcmFibGUgYmVjYXVzZSB0aGV5IGdpdmUgZGlyZWN0IGFjY2VzcyB0byB0aGUgSFRNTFxuLy8gdGFzayBxdWV1ZSwgYXJlIGltcGxlbWVudGVkIGluIEludGVybmV0IEV4cGxvcmVyIDEwLCBTYWZhcmkgNS4wLTEsIGFuZCBPcGVyYVxuLy8gMTEtMTIsIGFuZCBpbiB3ZWIgd29ya2VycyBpbiBtYW55IGVuZ2luZXMuXG4vLyBBbHRob3VnaCBtZXNzYWdlIGNoYW5uZWxzIHlpZWxkIHRvIGFueSBxdWV1ZWQgcmVuZGVyaW5nIGFuZCBJTyB0YXNrcywgdGhleVxuLy8gd291bGQgYmUgYmV0dGVyIHRoYW4gaW1wb3NpbmcgdGhlIDRtcyBkZWxheSBvZiB0aW1lcnMuXG4vLyBIb3dldmVyLCB0aGV5IGRvIG5vdCB3b3JrIHJlbGlhYmx5IGluIEludGVybmV0IEV4cGxvcmVyIG9yIFNhZmFyaS5cblxuLy8gSW50ZXJuZXQgRXhwbG9yZXIgMTAgaXMgdGhlIG9ubHkgYnJvd3NlciB0aGF0IGhhcyBzZXRJbW1lZGlhdGUgYnV0IGRvZXNcbi8vIG5vdCBoYXZlIE11dGF0aW9uT2JzZXJ2ZXJzLlxuLy8gQWx0aG91Z2ggc2V0SW1tZWRpYXRlIHlpZWxkcyB0byB0aGUgYnJvd3NlcidzIHJlbmRlcmVyLCBpdCB3b3VsZCBiZVxuLy8gcHJlZmVycmFibGUgdG8gZmFsbGluZyBiYWNrIHRvIHNldFRpbWVvdXQgc2luY2UgaXQgZG9lcyBub3QgaGF2ZVxuLy8gdGhlIG1pbmltdW0gNG1zIHBlbmFsdHkuXG4vLyBVbmZvcnR1bmF0ZWx5IHRoZXJlIGFwcGVhcnMgdG8gYmUgYSBidWcgaW4gSW50ZXJuZXQgRXhwbG9yZXIgMTAgTW9iaWxlIChhbmRcbi8vIERlc2t0b3AgdG8gYSBsZXNzZXIgZXh0ZW50KSB0aGF0IHJlbmRlcnMgYm90aCBzZXRJbW1lZGlhdGUgYW5kXG4vLyBNZXNzYWdlQ2hhbm5lbCB1c2VsZXNzIGZvciB0aGUgcHVycG9zZXMgb2YgQVNBUC5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9rcmlza293YWwvcS9pc3N1ZXMvMzk2XG5cbi8vIFRpbWVycyBhcmUgaW1wbGVtZW50ZWQgdW5pdmVyc2FsbHkuXG4vLyBXZSBmYWxsIGJhY2sgdG8gdGltZXJzIGluIHdvcmtlcnMgaW4gbW9zdCBlbmdpbmVzLCBhbmQgaW4gZm9yZWdyb3VuZFxuLy8gY29udGV4dHMgaW4gdGhlIGZvbGxvd2luZyBicm93c2Vycy5cbi8vIEhvd2V2ZXIsIG5vdGUgdGhhdCBldmVuIHRoaXMgc2ltcGxlIGNhc2UgcmVxdWlyZXMgbnVhbmNlcyB0byBvcGVyYXRlIGluIGFcbi8vIGJyb2FkIHNwZWN0cnVtIG9mIGJyb3dzZXJzLlxuLy9cbi8vIC0gRmlyZWZveCAzLTEzXG4vLyAtIEludGVybmV0IEV4cGxvcmVyIDYtOVxuLy8gLSBpUGFkIFNhZmFyaSA0LjNcbi8vIC0gTHlueCAyLjguN1xufSBlbHNlIHtcbiAgICByZXF1ZXN0Rmx1c2ggPSBtYWtlUmVxdWVzdENhbGxGcm9tVGltZXIoZmx1c2gpO1xufVxuXG4vLyBgcmVxdWVzdEZsdXNoYCByZXF1ZXN0cyB0aGF0IHRoZSBoaWdoIHByaW9yaXR5IGV2ZW50IHF1ZXVlIGJlIGZsdXNoZWQgYXNcbi8vIHNvb24gYXMgcG9zc2libGUuXG4vLyBUaGlzIGlzIHVzZWZ1bCB0byBwcmV2ZW50IGFuIGVycm9yIHRocm93biBpbiBhIHRhc2sgZnJvbSBzdGFsbGluZyB0aGUgZXZlbnRcbi8vIHF1ZXVlIGlmIHRoZSBleGNlcHRpb24gaGFuZGxlZCBieSBOb2RlLmpz4oCZc1xuLy8gYHByb2Nlc3Mub24oXCJ1bmNhdWdodEV4Y2VwdGlvblwiKWAgb3IgYnkgYSBkb21haW4uXG5yYXdBc2FwLnJlcXVlc3RGbHVzaCA9IHJlcXVlc3RGbHVzaDtcblxuLy8gVG8gcmVxdWVzdCBhIGhpZ2ggcHJpb3JpdHkgZXZlbnQsIHdlIGluZHVjZSBhIG11dGF0aW9uIG9ic2VydmVyIGJ5IHRvZ2dsaW5nXG4vLyB0aGUgdGV4dCBvZiBhIHRleHQgbm9kZSBiZXR3ZWVuIFwiMVwiIGFuZCBcIi0xXCIuXG5mdW5jdGlvbiBtYWtlUmVxdWVzdENhbGxGcm9tTXV0YXRpb25PYnNlcnZlcihjYWxsYmFjaykge1xuICAgIHZhciB0b2dnbGUgPSAxO1xuICAgIHZhciBvYnNlcnZlciA9IG5ldyBCcm93c2VyTXV0YXRpb25PYnNlcnZlcihjYWxsYmFjayk7XG4gICAgdmFyIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIlwiKTtcbiAgICBvYnNlcnZlci5vYnNlcnZlKG5vZGUsIHtjaGFyYWN0ZXJEYXRhOiB0cnVlfSk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHJlcXVlc3RDYWxsKCkge1xuICAgICAgICB0b2dnbGUgPSAtdG9nZ2xlO1xuICAgICAgICBub2RlLmRhdGEgPSB0b2dnbGU7XG4gICAgfTtcbn1cblxuLy8gVGhlIG1lc3NhZ2UgY2hhbm5lbCB0ZWNobmlxdWUgd2FzIGRpc2NvdmVyZWQgYnkgTWFsdGUgVWJsIGFuZCB3YXMgdGhlXG4vLyBvcmlnaW5hbCBmb3VuZGF0aW9uIGZvciB0aGlzIGxpYnJhcnkuXG4vLyBodHRwOi8vd3d3Lm5vbmJsb2NraW5nLmlvLzIwMTEvMDYvd2luZG93bmV4dHRpY2suaHRtbFxuXG4vLyBTYWZhcmkgNi4wLjUgKGF0IGxlYXN0KSBpbnRlcm1pdHRlbnRseSBmYWlscyB0byBjcmVhdGUgbWVzc2FnZSBwb3J0cyBvbiBhXG4vLyBwYWdlJ3MgZmlyc3QgbG9hZC4gVGhhbmtmdWxseSwgdGhpcyB2ZXJzaW9uIG9mIFNhZmFyaSBzdXBwb3J0c1xuLy8gTXV0YXRpb25PYnNlcnZlcnMsIHNvIHdlIGRvbid0IG5lZWQgdG8gZmFsbCBiYWNrIGluIHRoYXQgY2FzZS5cblxuLy8gZnVuY3Rpb24gbWFrZVJlcXVlc3RDYWxsRnJvbU1lc3NhZ2VDaGFubmVsKGNhbGxiYWNrKSB7XG4vLyAgICAgdmFyIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbi8vICAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGNhbGxiYWNrO1xuLy8gICAgIHJldHVybiBmdW5jdGlvbiByZXF1ZXN0Q2FsbCgpIHtcbi8vICAgICAgICAgY2hhbm5lbC5wb3J0Mi5wb3N0TWVzc2FnZSgwKTtcbi8vICAgICB9O1xuLy8gfVxuXG4vLyBGb3IgcmVhc29ucyBleHBsYWluZWQgYWJvdmUsIHdlIGFyZSBhbHNvIHVuYWJsZSB0byB1c2UgYHNldEltbWVkaWF0ZWBcbi8vIHVuZGVyIGFueSBjaXJjdW1zdGFuY2VzLlxuLy8gRXZlbiBpZiB3ZSB3ZXJlLCB0aGVyZSBpcyBhbm90aGVyIGJ1ZyBpbiBJbnRlcm5ldCBFeHBsb3JlciAxMC5cbi8vIEl0IGlzIG5vdCBzdWZmaWNpZW50IHRvIGFzc2lnbiBgc2V0SW1tZWRpYXRlYCB0byBgcmVxdWVzdEZsdXNoYCBiZWNhdXNlXG4vLyBgc2V0SW1tZWRpYXRlYCBtdXN0IGJlIGNhbGxlZCAqYnkgbmFtZSogYW5kIHRoZXJlZm9yZSBtdXN0IGJlIHdyYXBwZWQgaW4gYVxuLy8gY2xvc3VyZS5cbi8vIE5ldmVyIGZvcmdldC5cblxuLy8gZnVuY3Rpb24gbWFrZVJlcXVlc3RDYWxsRnJvbVNldEltbWVkaWF0ZShjYWxsYmFjaykge1xuLy8gICAgIHJldHVybiBmdW5jdGlvbiByZXF1ZXN0Q2FsbCgpIHtcbi8vICAgICAgICAgc2V0SW1tZWRpYXRlKGNhbGxiYWNrKTtcbi8vICAgICB9O1xuLy8gfVxuXG4vLyBTYWZhcmkgNi4wIGhhcyBhIHByb2JsZW0gd2hlcmUgdGltZXJzIHdpbGwgZ2V0IGxvc3Qgd2hpbGUgdGhlIHVzZXIgaXNcbi8vIHNjcm9sbGluZy4gVGhpcyBwcm9ibGVtIGRvZXMgbm90IGltcGFjdCBBU0FQIGJlY2F1c2UgU2FmYXJpIDYuMCBzdXBwb3J0c1xuLy8gbXV0YXRpb24gb2JzZXJ2ZXJzLCBzbyB0aGF0IGltcGxlbWVudGF0aW9uIGlzIHVzZWQgaW5zdGVhZC5cbi8vIEhvd2V2ZXIsIGlmIHdlIGV2ZXIgZWxlY3QgdG8gdXNlIHRpbWVycyBpbiBTYWZhcmksIHRoZSBwcmV2YWxlbnQgd29yay1hcm91bmRcbi8vIGlzIHRvIGFkZCBhIHNjcm9sbCBldmVudCBsaXN0ZW5lciB0aGF0IGNhbGxzIGZvciBhIGZsdXNoLlxuXG4vLyBgc2V0VGltZW91dGAgZG9lcyBub3QgY2FsbCB0aGUgcGFzc2VkIGNhbGxiYWNrIGlmIHRoZSBkZWxheSBpcyBsZXNzIHRoYW5cbi8vIGFwcHJveGltYXRlbHkgNyBpbiB3ZWIgd29ya2VycyBpbiBGaXJlZm94IDggdGhyb3VnaCAxOCwgYW5kIHNvbWV0aW1lcyBub3Rcbi8vIGV2ZW4gdGhlbi5cblxuZnVuY3Rpb24gbWFrZVJlcXVlc3RDYWxsRnJvbVRpbWVyKGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHJlcXVlc3RDYWxsKCkge1xuICAgICAgICAvLyBXZSBkaXNwYXRjaCBhIHRpbWVvdXQgd2l0aCBhIHNwZWNpZmllZCBkZWxheSBvZiAwIGZvciBlbmdpbmVzIHRoYXRcbiAgICAgICAgLy8gY2FuIHJlbGlhYmx5IGFjY29tbW9kYXRlIHRoYXQgcmVxdWVzdC4gVGhpcyB3aWxsIHVzdWFsbHkgYmUgc25hcHBlZFxuICAgICAgICAvLyB0byBhIDQgbWlsaXNlY29uZCBkZWxheSwgYnV0IG9uY2Ugd2UncmUgZmx1c2hpbmcsIHRoZXJlJ3Mgbm8gZGVsYXlcbiAgICAgICAgLy8gYmV0d2VlbiBldmVudHMuXG4gICAgICAgIHZhciB0aW1lb3V0SGFuZGxlID0gc2V0VGltZW91dChoYW5kbGVUaW1lciwgMCk7XG4gICAgICAgIC8vIEhvd2V2ZXIsIHNpbmNlIHRoaXMgdGltZXIgZ2V0cyBmcmVxdWVudGx5IGRyb3BwZWQgaW4gRmlyZWZveFxuICAgICAgICAvLyB3b3JrZXJzLCB3ZSBlbmxpc3QgYW4gaW50ZXJ2YWwgaGFuZGxlIHRoYXQgd2lsbCB0cnkgdG8gZmlyZVxuICAgICAgICAvLyBhbiBldmVudCAyMCB0aW1lcyBwZXIgc2Vjb25kIHVudGlsIGl0IHN1Y2NlZWRzLlxuICAgICAgICB2YXIgaW50ZXJ2YWxIYW5kbGUgPSBzZXRJbnRlcnZhbChoYW5kbGVUaW1lciwgNTApO1xuXG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZVRpbWVyKCkge1xuICAgICAgICAgICAgLy8gV2hpY2hldmVyIHRpbWVyIHN1Y2NlZWRzIHdpbGwgY2FuY2VsIGJvdGggdGltZXJzIGFuZFxuICAgICAgICAgICAgLy8gZXhlY3V0ZSB0aGUgY2FsbGJhY2suXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dEhhbmRsZSk7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsSGFuZGxlKTtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG4vLyBUaGlzIGlzIGZvciBgYXNhcC5qc2Agb25seS5cbi8vIEl0cyBuYW1lIHdpbGwgYmUgcGVyaW9kaWNhbGx5IHJhbmRvbWl6ZWQgdG8gYnJlYWsgYW55IGNvZGUgdGhhdCBkZXBlbmRzIG9uXG4vLyBpdHMgZXhpc3RlbmNlLlxucmF3QXNhcC5tYWtlUmVxdWVzdENhbGxGcm9tVGltZXIgPSBtYWtlUmVxdWVzdENhbGxGcm9tVGltZXI7XG5cbi8vIEFTQVAgd2FzIG9yaWdpbmFsbHkgYSBuZXh0VGljayBzaGltIGluY2x1ZGVkIGluIFEuIFRoaXMgd2FzIGZhY3RvcmVkIG91dFxuLy8gaW50byB0aGlzIEFTQVAgcGFja2FnZS4gSXQgd2FzIGxhdGVyIGFkYXB0ZWQgdG8gUlNWUCB3aGljaCBtYWRlIGZ1cnRoZXJcbi8vIGFtZW5kbWVudHMuIFRoZXNlIGRlY2lzaW9ucywgcGFydGljdWxhcmx5IHRvIG1hcmdpbmFsaXplIE1lc3NhZ2VDaGFubmVsIGFuZFxuLy8gdG8gY2FwdHVyZSB0aGUgTXV0YXRpb25PYnNlcnZlciBpbXBsZW1lbnRhdGlvbiBpbiBhIGNsb3N1cmUsIHdlcmUgaW50ZWdyYXRlZFxuLy8gYmFjayBpbnRvIEFTQVAgcHJvcGVyLlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3RpbGRlaW8vcnN2cC5qcy9ibG9iL2NkZGY3MjMyNTQ2YTljZjg1ODUyNGI3NWNkZTZmOWVkZjcyNjIwYTcvbGliL3JzdnAvYXNhcC5qc1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXBwZXJjYXNlUGF0dGVybiA9IC9bQS1aXS9nO1xudmFyIG1zUGF0dGVybiA9IC9ebXMtLztcblxuZnVuY3Rpb24gaHlwaGVuYXRlU3R5bGVOYW1lKHN0cmluZykge1xuICAgIHJldHVybiBzdHJpbmdcbiAgICAgICAgLnJlcGxhY2UodXBwZXJjYXNlUGF0dGVybiwgJy0kJicpXG4gICAgICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgICAgIC5yZXBsYWNlKG1zUGF0dGVybiwgJy1tcy0nKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBoeXBoZW5hdGVTdHlsZU5hbWU7XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBjYWxjO1xuXG52YXIgX2pvaW5QcmVmaXhlZFZhbHVlID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvam9pblByZWZpeGVkVmFsdWUnKTtcblxudmFyIF9qb2luUHJlZml4ZWRWYWx1ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9qb2luUHJlZml4ZWRWYWx1ZSk7XG5cbnZhciBfaXNQcmVmaXhlZFZhbHVlID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvaXNQcmVmaXhlZFZhbHVlJyk7XG5cbnZhciBfaXNQcmVmaXhlZFZhbHVlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzUHJlZml4ZWRWYWx1ZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIGNhbGMocHJvcGVydHksIHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmICEoMCwgX2lzUHJlZml4ZWRWYWx1ZTIuZGVmYXVsdCkodmFsdWUpICYmIHZhbHVlLmluZGV4T2YoJ2NhbGMoJykgPiAtMSkge1xuICAgIHJldHVybiAoMCwgX2pvaW5QcmVmaXhlZFZhbHVlMi5kZWZhdWx0KShwcm9wZXJ0eSwgdmFsdWUsIGZ1bmN0aW9uIChwcmVmaXgsIHZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWUucmVwbGFjZSgvY2FsY1xcKC9nLCBwcmVmaXggKyAnY2FsYygnKTtcbiAgICB9KTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gY3Vyc29yO1xuXG52YXIgX2pvaW5QcmVmaXhlZFZhbHVlID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvam9pblByZWZpeGVkVmFsdWUnKTtcblxudmFyIF9qb2luUHJlZml4ZWRWYWx1ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9qb2luUHJlZml4ZWRWYWx1ZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciB2YWx1ZXMgPSB7XG4gICd6b29tLWluJzogdHJ1ZSxcbiAgJ3pvb20tb3V0JzogdHJ1ZSxcbiAgZ3JhYjogdHJ1ZSxcbiAgZ3JhYmJpbmc6IHRydWVcbn07XG5cbmZ1bmN0aW9uIGN1cnNvcihwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgaWYgKHByb3BlcnR5ID09PSAnY3Vyc29yJyAmJiB2YWx1ZXNbdmFsdWVdKSB7XG4gICAgcmV0dXJuICgwLCBfam9pblByZWZpeGVkVmFsdWUyLmRlZmF1bHQpKHByb3BlcnR5LCB2YWx1ZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGZsZXg7XG52YXIgdmFsdWVzID0geyBmbGV4OiB0cnVlLCAnaW5saW5lLWZsZXgnOiB0cnVlIH07XG5cbmZ1bmN0aW9uIGZsZXgocHJvcGVydHksIHZhbHVlKSB7XG4gIGlmIChwcm9wZXJ0eSA9PT0gJ2Rpc3BsYXknICYmIHZhbHVlc1t2YWx1ZV0pIHtcbiAgICByZXR1cm4ge1xuICAgICAgZGlzcGxheTogWyctd2Via2l0LWJveCcsICctbW96LWJveCcsICctbXMtJyArIHZhbHVlICsgJ2JveCcsICctd2Via2l0LScgKyB2YWx1ZSwgdmFsdWVdXG4gICAgfTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gZmxleGJveElFO1xuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7IGlmIChrZXkgaW4gb2JqKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgeyB2YWx1ZTogdmFsdWUsIGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSk7IH0gZWxzZSB7IG9ialtrZXldID0gdmFsdWU7IH0gcmV0dXJuIG9iajsgfVxuXG52YXIgYWx0ZXJuYXRpdmVWYWx1ZXMgPSB7XG4gICdzcGFjZS1hcm91bmQnOiAnZGlzdHJpYnV0ZScsXG4gICdzcGFjZS1iZXR3ZWVuJzogJ2p1c3RpZnknLFxuICAnZmxleC1zdGFydCc6ICdzdGFydCcsXG4gICdmbGV4LWVuZCc6ICdlbmQnXG59O1xudmFyIGFsdGVybmF0aXZlUHJvcHMgPSB7XG4gIGFsaWduQ29udGVudDogJ21zRmxleExpbmVQYWNrJyxcbiAgYWxpZ25TZWxmOiAnbXNGbGV4SXRlbUFsaWduJyxcbiAgYWxpZ25JdGVtczogJ21zRmxleEFsaWduJyxcbiAganVzdGlmeUNvbnRlbnQ6ICdtc0ZsZXhQYWNrJyxcbiAgb3JkZXI6ICdtc0ZsZXhPcmRlcicsXG4gIGZsZXhHcm93OiAnbXNGbGV4UG9zaXRpdmUnLFxuICBmbGV4U2hyaW5rOiAnbXNGbGV4TmVnYXRpdmUnLFxuICBmbGV4QmFzaXM6ICdtc1ByZWZlcnJlZFNpemUnXG59O1xuXG5mdW5jdGlvbiBmbGV4Ym94SUUocHJvcGVydHksIHZhbHVlKSB7XG4gIGlmIChhbHRlcm5hdGl2ZVByb3BzW3Byb3BlcnR5XSkge1xuICAgIHJldHVybiBfZGVmaW5lUHJvcGVydHkoe30sIGFsdGVybmF0aXZlUHJvcHNbcHJvcGVydHldLCBhbHRlcm5hdGl2ZVZhbHVlc1t2YWx1ZV0gfHwgdmFsdWUpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBmbGV4Ym94T2xkO1xuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7IGlmIChrZXkgaW4gb2JqKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgeyB2YWx1ZTogdmFsdWUsIGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSk7IH0gZWxzZSB7IG9ialtrZXldID0gdmFsdWU7IH0gcmV0dXJuIG9iajsgfVxuXG52YXIgYWx0ZXJuYXRpdmVWYWx1ZXMgPSB7XG4gICdzcGFjZS1hcm91bmQnOiAnanVzdGlmeScsXG4gICdzcGFjZS1iZXR3ZWVuJzogJ2p1c3RpZnknLFxuICAnZmxleC1zdGFydCc6ICdzdGFydCcsXG4gICdmbGV4LWVuZCc6ICdlbmQnLFxuICAnd3JhcC1yZXZlcnNlJzogJ211bHRpcGxlJyxcbiAgd3JhcDogJ211bHRpcGxlJ1xufTtcblxudmFyIGFsdGVybmF0aXZlUHJvcHMgPSB7XG4gIGFsaWduSXRlbXM6ICdXZWJraXRCb3hBbGlnbicsXG4gIGp1c3RpZnlDb250ZW50OiAnV2Via2l0Qm94UGFjaycsXG4gIGZsZXhXcmFwOiAnV2Via2l0Qm94TGluZXMnXG59O1xuXG5mdW5jdGlvbiBmbGV4Ym94T2xkKHByb3BlcnR5LCB2YWx1ZSkge1xuICBpZiAocHJvcGVydHkgPT09ICdmbGV4RGlyZWN0aW9uJykge1xuICAgIHJldHVybiB7XG4gICAgICBXZWJraXRCb3hPcmllbnQ6IHZhbHVlLmluZGV4T2YoJ2NvbHVtbicpID4gLTEgPyAndmVydGljYWwnIDogJ2hvcml6b250YWwnLFxuICAgICAgV2Via2l0Qm94RGlyZWN0aW9uOiB2YWx1ZS5pbmRleE9mKCdyZXZlcnNlJykgPiAtMSA/ICdyZXZlcnNlJyA6ICdub3JtYWwnXG4gICAgfTtcbiAgfVxuICBpZiAoYWx0ZXJuYXRpdmVQcm9wc1twcm9wZXJ0eV0pIHtcbiAgICByZXR1cm4gX2RlZmluZVByb3BlcnR5KHt9LCBhbHRlcm5hdGl2ZVByb3BzW3Byb3BlcnR5XSwgYWx0ZXJuYXRpdmVWYWx1ZXNbdmFsdWVdIHx8IHZhbHVlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gZ3JhZGllbnQ7XG5cbnZhciBfam9pblByZWZpeGVkVmFsdWUgPSByZXF1aXJlKCcuLi8uLi91dGlscy9qb2luUHJlZml4ZWRWYWx1ZScpO1xuXG52YXIgX2pvaW5QcmVmaXhlZFZhbHVlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2pvaW5QcmVmaXhlZFZhbHVlKTtcblxudmFyIF9pc1ByZWZpeGVkVmFsdWUgPSByZXF1aXJlKCcuLi8uLi91dGlscy9pc1ByZWZpeGVkVmFsdWUnKTtcblxudmFyIF9pc1ByZWZpeGVkVmFsdWUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNQcmVmaXhlZFZhbHVlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIHZhbHVlcyA9IC9saW5lYXItZ3JhZGllbnR8cmFkaWFsLWdyYWRpZW50fHJlcGVhdGluZy1saW5lYXItZ3JhZGllbnR8cmVwZWF0aW5nLXJhZGlhbC1ncmFkaWVudC87XG5cbmZ1bmN0aW9uIGdyYWRpZW50KHByb3BlcnR5LCB2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiAhKDAsIF9pc1ByZWZpeGVkVmFsdWUyLmRlZmF1bHQpKHZhbHVlKSAmJiB2YWx1ZS5tYXRjaCh2YWx1ZXMpICE9PSBudWxsKSB7XG4gICAgcmV0dXJuICgwLCBfam9pblByZWZpeGVkVmFsdWUyLmRlZmF1bHQpKHByb3BlcnR5LCB2YWx1ZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHNpemluZztcblxudmFyIF9qb2luUHJlZml4ZWRWYWx1ZSA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL2pvaW5QcmVmaXhlZFZhbHVlJyk7XG5cbnZhciBfam9pblByZWZpeGVkVmFsdWUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfam9pblByZWZpeGVkVmFsdWUpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgcHJvcGVydGllcyA9IHtcbiAgbWF4SGVpZ2h0OiB0cnVlLFxuICBtYXhXaWR0aDogdHJ1ZSxcbiAgd2lkdGg6IHRydWUsXG4gIGhlaWdodDogdHJ1ZSxcbiAgY29sdW1uV2lkdGg6IHRydWUsXG4gIG1pbldpZHRoOiB0cnVlLFxuICBtaW5IZWlnaHQ6IHRydWVcbn07XG52YXIgdmFsdWVzID0ge1xuICAnbWluLWNvbnRlbnQnOiB0cnVlLFxuICAnbWF4LWNvbnRlbnQnOiB0cnVlLFxuICAnZmlsbC1hdmFpbGFibGUnOiB0cnVlLFxuICAnZml0LWNvbnRlbnQnOiB0cnVlLFxuICAnY29udGFpbi1mbG9hdHMnOiB0cnVlXG59O1xuXG5mdW5jdGlvbiBzaXppbmcocHJvcGVydHksIHZhbHVlKSB7XG4gIGlmIChwcm9wZXJ0aWVzW3Byb3BlcnR5XSAmJiB2YWx1ZXNbdmFsdWVdKSB7XG4gICAgcmV0dXJuICgwLCBfam9pblByZWZpeGVkVmFsdWUyLmRlZmF1bHQpKHByb3BlcnR5LCB2YWx1ZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHRyYW5zaXRpb247XG5cbnZhciBfaHlwaGVuYXRlU3R5bGVOYW1lID0gcmVxdWlyZSgnaHlwaGVuYXRlLXN0eWxlLW5hbWUnKTtcblxudmFyIF9oeXBoZW5hdGVTdHlsZU5hbWUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaHlwaGVuYXRlU3R5bGVOYW1lKTtcblxudmFyIF9jYXBpdGFsaXplU3RyaW5nID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvY2FwaXRhbGl6ZVN0cmluZycpO1xuXG52YXIgX2NhcGl0YWxpemVTdHJpbmcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2FwaXRhbGl6ZVN0cmluZyk7XG5cbnZhciBfaXNQcmVmaXhlZFZhbHVlID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvaXNQcmVmaXhlZFZhbHVlJyk7XG5cbnZhciBfaXNQcmVmaXhlZFZhbHVlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzUHJlZml4ZWRWYWx1ZSk7XG5cbnZhciBfcHJlZml4UHJvcHMgPSByZXF1aXJlKCcuLi9wcmVmaXhQcm9wcycpO1xuXG52YXIgX3ByZWZpeFByb3BzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3ByZWZpeFByb3BzKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkgeyBpZiAoa2V5IGluIG9iaikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pOyB9IGVsc2UgeyBvYmpba2V5XSA9IHZhbHVlOyB9IHJldHVybiBvYmo7IH1cblxudmFyIHByb3BlcnRpZXMgPSB7XG4gIHRyYW5zaXRpb246IHRydWUsXG4gIHRyYW5zaXRpb25Qcm9wZXJ0eTogdHJ1ZSxcbiAgV2Via2l0VHJhbnNpdGlvbjogdHJ1ZSxcbiAgV2Via2l0VHJhbnNpdGlvblByb3BlcnR5OiB0cnVlXG59O1xuXG5mdW5jdGlvbiB0cmFuc2l0aW9uKHByb3BlcnR5LCB2YWx1ZSkge1xuICAvLyBhbHNvIGNoZWNrIGZvciBhbHJlYWR5IHByZWZpeGVkIHRyYW5zaXRpb25zXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHByb3BlcnRpZXNbcHJvcGVydHldKSB7XG4gICAgdmFyIF9yZWYyO1xuXG4gICAgdmFyIG91dHB1dFZhbHVlID0gcHJlZml4VmFsdWUodmFsdWUpO1xuICAgIHZhciB3ZWJraXRPdXRwdXQgPSBvdXRwdXRWYWx1ZS5zcGxpdCgvLCg/IVteKCldKig/OlxcKFteKCldKlxcKSk/XFwpKS9nKS5maWx0ZXIoZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWUubWF0Y2goLy1tb3otfC1tcy0vKSA9PT0gbnVsbDtcbiAgICB9KS5qb2luKCcsJyk7XG5cbiAgICAvLyBpZiB0aGUgcHJvcGVydHkgaXMgYWxyZWFkeSBwcmVmaXhlZFxuICAgIGlmIChwcm9wZXJ0eS5pbmRleE9mKCdXZWJraXQnKSA+IC0xKSB7XG4gICAgICByZXR1cm4gX2RlZmluZVByb3BlcnR5KHt9LCBwcm9wZXJ0eSwgd2Via2l0T3V0cHV0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gX3JlZjIgPSB7fSwgX2RlZmluZVByb3BlcnR5KF9yZWYyLCAnV2Via2l0JyArICgwLCBfY2FwaXRhbGl6ZVN0cmluZzIuZGVmYXVsdCkocHJvcGVydHkpLCB3ZWJraXRPdXRwdXQpLCBfZGVmaW5lUHJvcGVydHkoX3JlZjIsIHByb3BlcnR5LCBvdXRwdXRWYWx1ZSksIF9yZWYyO1xuICB9XG59XG5cbmZ1bmN0aW9uIHByZWZpeFZhbHVlKHZhbHVlKSB7XG4gIGlmICgoMCwgX2lzUHJlZml4ZWRWYWx1ZTIuZGVmYXVsdCkodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgLy8gb25seSBzcGxpdCBtdWx0aSB2YWx1ZXMsIG5vdCBjdWJpYyBiZXppZXJzXG4gIHZhciBtdWx0aXBsZVZhbHVlcyA9IHZhbHVlLnNwbGl0KC8sKD8hW14oKV0qKD86XFwoW14oKV0qXFwpKT9cXCkpL2cpO1xuXG4gIC8vIGl0ZXJhdGUgZWFjaCBzaW5nbGUgdmFsdWUgYW5kIGNoZWNrIGZvciB0cmFuc2l0aW9uZWQgcHJvcGVydGllc1xuICAvLyB0aGF0IG5lZWQgdG8gYmUgcHJlZml4ZWQgYXMgd2VsbFxuICBtdWx0aXBsZVZhbHVlcy5mb3JFYWNoKGZ1bmN0aW9uICh2YWwsIGluZGV4KSB7XG4gICAgbXVsdGlwbGVWYWx1ZXNbaW5kZXhdID0gT2JqZWN0LmtleXMoX3ByZWZpeFByb3BzMi5kZWZhdWx0KS5yZWR1Y2UoZnVuY3Rpb24gKG91dCwgcHJlZml4KSB7XG4gICAgICB2YXIgZGFzaENhc2VQcmVmaXggPSAnLScgKyBwcmVmaXgudG9Mb3dlckNhc2UoKSArICctJztcblxuICAgICAgT2JqZWN0LmtleXMoX3ByZWZpeFByb3BzMi5kZWZhdWx0W3ByZWZpeF0pLmZvckVhY2goZnVuY3Rpb24gKHByb3ApIHtcbiAgICAgICAgdmFyIGRhc2hDYXNlUHJvcGVydHkgPSAoMCwgX2h5cGhlbmF0ZVN0eWxlTmFtZTIuZGVmYXVsdCkocHJvcCk7XG5cbiAgICAgICAgaWYgKHZhbC5pbmRleE9mKGRhc2hDYXNlUHJvcGVydHkpID4gLTEgJiYgZGFzaENhc2VQcm9wZXJ0eSAhPT0gJ29yZGVyJykge1xuICAgICAgICAgIC8vIGpvaW4gYWxsIHByZWZpeGVzIGFuZCBjcmVhdGUgYSBuZXcgdmFsdWVcbiAgICAgICAgICBvdXQgPSB2YWwucmVwbGFjZShkYXNoQ2FzZVByb3BlcnR5LCBkYXNoQ2FzZVByZWZpeCArIGRhc2hDYXNlUHJvcGVydHkpICsgJywnICsgb3V0O1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBvdXQ7XG4gICAgfSwgdmFsKTtcbiAgfSk7XG5cbiAgcmV0dXJuIG11bHRpcGxlVmFsdWVzLmpvaW4oJywnKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHByZWZpeEFsbDtcblxudmFyIF9wcmVmaXhQcm9wcyA9IHJlcXVpcmUoJy4vcHJlZml4UHJvcHMnKTtcblxudmFyIF9wcmVmaXhQcm9wczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wcmVmaXhQcm9wcyk7XG5cbnZhciBfY2FwaXRhbGl6ZVN0cmluZyA9IHJlcXVpcmUoJy4uL3V0aWxzL2NhcGl0YWxpemVTdHJpbmcnKTtcblxudmFyIF9jYXBpdGFsaXplU3RyaW5nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NhcGl0YWxpemVTdHJpbmcpO1xuXG52YXIgX2NhbGMgPSByZXF1aXJlKCcuL3BsdWdpbnMvY2FsYycpO1xuXG52YXIgX2NhbGMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2FsYyk7XG5cbnZhciBfY3Vyc29yID0gcmVxdWlyZSgnLi9wbHVnaW5zL2N1cnNvcicpO1xuXG52YXIgX2N1cnNvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jdXJzb3IpO1xuXG52YXIgX2ZsZXggPSByZXF1aXJlKCcuL3BsdWdpbnMvZmxleCcpO1xuXG52YXIgX2ZsZXgyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZmxleCk7XG5cbnZhciBfc2l6aW5nID0gcmVxdWlyZSgnLi9wbHVnaW5zL3NpemluZycpO1xuXG52YXIgX3NpemluZzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zaXppbmcpO1xuXG52YXIgX2dyYWRpZW50ID0gcmVxdWlyZSgnLi9wbHVnaW5zL2dyYWRpZW50Jyk7XG5cbnZhciBfZ3JhZGllbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ3JhZGllbnQpO1xuXG52YXIgX3RyYW5zaXRpb24gPSByZXF1aXJlKCcuL3BsdWdpbnMvdHJhbnNpdGlvbicpO1xuXG52YXIgX3RyYW5zaXRpb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdHJhbnNpdGlvbik7XG5cbnZhciBfZmxleGJveElFID0gcmVxdWlyZSgnLi9wbHVnaW5zL2ZsZXhib3hJRScpO1xuXG52YXIgX2ZsZXhib3hJRTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9mbGV4Ym94SUUpO1xuXG52YXIgX2ZsZXhib3hPbGQgPSByZXF1aXJlKCcuL3BsdWdpbnMvZmxleGJveE9sZCcpO1xuXG52YXIgX2ZsZXhib3hPbGQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZmxleGJveE9sZCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8vIHNwZWNpYWwgZmxleGJveCBzcGVjaWZpY2F0aW9uc1xuXG5cbnZhciBwbHVnaW5zID0gW19jYWxjMi5kZWZhdWx0LCBfY3Vyc29yMi5kZWZhdWx0LCBfc2l6aW5nMi5kZWZhdWx0LCBfZ3JhZGllbnQyLmRlZmF1bHQsIF90cmFuc2l0aW9uMi5kZWZhdWx0LCBfZmxleGJveElFMi5kZWZhdWx0LCBfZmxleGJveE9sZDIuZGVmYXVsdCwgX2ZsZXgyLmRlZmF1bHRdO1xuXG4vKipcbiAqIFJldHVybnMgYSBwcmVmaXhlZCB2ZXJzaW9uIG9mIHRoZSBzdHlsZSBvYmplY3QgdXNpbmcgYWxsIHZlbmRvciBwcmVmaXhlc1xuICogQHBhcmFtIHtPYmplY3R9IHN0eWxlcyAtIFN0eWxlIG9iamVjdCB0aGF0IGdldHMgcHJlZml4ZWQgcHJvcGVydGllcyBhZGRlZFxuICogQHJldHVybnMge09iamVjdH0gLSBTdHlsZSBvYmplY3Qgd2l0aCBwcmVmaXhlZCBwcm9wZXJ0aWVzIGFuZCB2YWx1ZXNcbiAqL1xuZnVuY3Rpb24gcHJlZml4QWxsKHN0eWxlcykge1xuICBPYmplY3Qua2V5cyhzdHlsZXMpLmZvckVhY2goZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gICAgdmFyIHZhbHVlID0gc3R5bGVzW3Byb3BlcnR5XTtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBPYmplY3QgJiYgIUFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAvLyByZWN1cnNlIHRocm91Z2ggbmVzdGVkIHN0eWxlIG9iamVjdHNcbiAgICAgIHN0eWxlc1twcm9wZXJ0eV0gPSBwcmVmaXhBbGwodmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBPYmplY3Qua2V5cyhfcHJlZml4UHJvcHMyLmRlZmF1bHQpLmZvckVhY2goZnVuY3Rpb24gKHByZWZpeCkge1xuICAgICAgICB2YXIgcHJvcGVydGllcyA9IF9wcmVmaXhQcm9wczIuZGVmYXVsdFtwcmVmaXhdO1xuICAgICAgICAvLyBhZGQgcHJlZml4ZXMgaWYgbmVlZGVkXG4gICAgICAgIGlmIChwcm9wZXJ0aWVzW3Byb3BlcnR5XSkge1xuICAgICAgICAgIHN0eWxlc1twcmVmaXggKyAoMCwgX2NhcGl0YWxpemVTdHJpbmcyLmRlZmF1bHQpKHByb3BlcnR5KV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9KTtcblxuICBPYmplY3Qua2V5cyhzdHlsZXMpLmZvckVhY2goZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gICAgW10uY29uY2F0KHN0eWxlc1twcm9wZXJ0eV0pLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBpbmRleCkge1xuICAgICAgLy8gcmVzb2x2ZSBldmVyeSBzcGVjaWFsIHBsdWdpbnNcbiAgICAgIHBsdWdpbnMuZm9yRWFjaChmdW5jdGlvbiAocGx1Z2luKSB7XG4gICAgICAgIHJldHVybiBhc3NpZ25TdHlsZXMoc3R5bGVzLCBwbHVnaW4ocHJvcGVydHksIHZhbHVlKSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgcmV0dXJuIHN0eWxlcztcbn1cblxuZnVuY3Rpb24gYXNzaWduU3R5bGVzKGJhc2UpIHtcbiAgdmFyIGV4dGVuZCA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzFdO1xuXG4gIE9iamVjdC5rZXlzKGV4dGVuZCkuZm9yRWFjaChmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICB2YXIgYmFzZVZhbHVlID0gYmFzZVtwcm9wZXJ0eV07XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYmFzZVZhbHVlKSkge1xuICAgICAgW10uY29uY2F0KGV4dGVuZFtwcm9wZXJ0eV0pLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHZhciB2YWx1ZUluZGV4ID0gYmFzZVZhbHVlLmluZGV4T2YodmFsdWUpO1xuICAgICAgICBpZiAodmFsdWVJbmRleCA+IC0xKSB7XG4gICAgICAgICAgYmFzZVtwcm9wZXJ0eV0uc3BsaWNlKHZhbHVlSW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgICAgIGJhc2VbcHJvcGVydHldLnB1c2godmFsdWUpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJhc2VbcHJvcGVydHldID0gZXh0ZW5kW3Byb3BlcnR5XTtcbiAgICB9XG4gIH0pO1xufVxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB7IFwiV2Via2l0XCI6IHsgXCJ0cmFuc2Zvcm1cIjogdHJ1ZSwgXCJ0cmFuc2Zvcm1PcmlnaW5cIjogdHJ1ZSwgXCJ0cmFuc2Zvcm1PcmlnaW5YXCI6IHRydWUsIFwidHJhbnNmb3JtT3JpZ2luWVwiOiB0cnVlLCBcImJhY2tmYWNlVmlzaWJpbGl0eVwiOiB0cnVlLCBcInBlcnNwZWN0aXZlXCI6IHRydWUsIFwicGVyc3BlY3RpdmVPcmlnaW5cIjogdHJ1ZSwgXCJ0cmFuc2Zvcm1TdHlsZVwiOiB0cnVlLCBcInRyYW5zZm9ybU9yaWdpblpcIjogdHJ1ZSwgXCJhbmltYXRpb25cIjogdHJ1ZSwgXCJhbmltYXRpb25EZWxheVwiOiB0cnVlLCBcImFuaW1hdGlvbkRpcmVjdGlvblwiOiB0cnVlLCBcImFuaW1hdGlvbkZpbGxNb2RlXCI6IHRydWUsIFwiYW5pbWF0aW9uRHVyYXRpb25cIjogdHJ1ZSwgXCJhbmltYXRpb25JdGVyYXRpb25Db3VudFwiOiB0cnVlLCBcImFuaW1hdGlvbk5hbWVcIjogdHJ1ZSwgXCJhbmltYXRpb25QbGF5U3RhdGVcIjogdHJ1ZSwgXCJhbmltYXRpb25UaW1pbmdGdW5jdGlvblwiOiB0cnVlLCBcImFwcGVhcmFuY2VcIjogdHJ1ZSwgXCJ1c2VyU2VsZWN0XCI6IHRydWUsIFwiZm9udEtlcm5pbmdcIjogdHJ1ZSwgXCJ0ZXh0RW1waGFzaXNQb3NpdGlvblwiOiB0cnVlLCBcInRleHRFbXBoYXNpc1wiOiB0cnVlLCBcInRleHRFbXBoYXNpc1N0eWxlXCI6IHRydWUsIFwidGV4dEVtcGhhc2lzQ29sb3JcIjogdHJ1ZSwgXCJib3hEZWNvcmF0aW9uQnJlYWtcIjogdHJ1ZSwgXCJjbGlwUGF0aFwiOiB0cnVlLCBcIm1hc2tJbWFnZVwiOiB0cnVlLCBcIm1hc2tNb2RlXCI6IHRydWUsIFwibWFza1JlcGVhdFwiOiB0cnVlLCBcIm1hc2tQb3NpdGlvblwiOiB0cnVlLCBcIm1hc2tDbGlwXCI6IHRydWUsIFwibWFza09yaWdpblwiOiB0cnVlLCBcIm1hc2tTaXplXCI6IHRydWUsIFwibWFza0NvbXBvc2l0ZVwiOiB0cnVlLCBcIm1hc2tcIjogdHJ1ZSwgXCJtYXNrQm9yZGVyU291cmNlXCI6IHRydWUsIFwibWFza0JvcmRlck1vZGVcIjogdHJ1ZSwgXCJtYXNrQm9yZGVyU2xpY2VcIjogdHJ1ZSwgXCJtYXNrQm9yZGVyV2lkdGhcIjogdHJ1ZSwgXCJtYXNrQm9yZGVyT3V0c2V0XCI6IHRydWUsIFwibWFza0JvcmRlclJlcGVhdFwiOiB0cnVlLCBcIm1hc2tCb3JkZXJcIjogdHJ1ZSwgXCJtYXNrVHlwZVwiOiB0cnVlLCBcInRleHREZWNvcmF0aW9uU3R5bGVcIjogdHJ1ZSwgXCJ0ZXh0RGVjb3JhdGlvblNraXBcIjogdHJ1ZSwgXCJ0ZXh0RGVjb3JhdGlvbkxpbmVcIjogdHJ1ZSwgXCJ0ZXh0RGVjb3JhdGlvbkNvbG9yXCI6IHRydWUsIFwiZmlsdGVyXCI6IHRydWUsIFwiZm9udEZlYXR1cmVTZXR0aW5nc1wiOiB0cnVlLCBcImJyZWFrQWZ0ZXJcIjogdHJ1ZSwgXCJicmVha0JlZm9yZVwiOiB0cnVlLCBcImJyZWFrSW5zaWRlXCI6IHRydWUsIFwiY29sdW1uQ291bnRcIjogdHJ1ZSwgXCJjb2x1bW5GaWxsXCI6IHRydWUsIFwiY29sdW1uR2FwXCI6IHRydWUsIFwiY29sdW1uUnVsZVwiOiB0cnVlLCBcImNvbHVtblJ1bGVDb2xvclwiOiB0cnVlLCBcImNvbHVtblJ1bGVTdHlsZVwiOiB0cnVlLCBcImNvbHVtblJ1bGVXaWR0aFwiOiB0cnVlLCBcImNvbHVtbnNcIjogdHJ1ZSwgXCJjb2x1bW5TcGFuXCI6IHRydWUsIFwiY29sdW1uV2lkdGhcIjogdHJ1ZSwgXCJmbGV4XCI6IHRydWUsIFwiZmxleEJhc2lzXCI6IHRydWUsIFwiZmxleERpcmVjdGlvblwiOiB0cnVlLCBcImZsZXhHcm93XCI6IHRydWUsIFwiZmxleEZsb3dcIjogdHJ1ZSwgXCJmbGV4U2hyaW5rXCI6IHRydWUsIFwiZmxleFdyYXBcIjogdHJ1ZSwgXCJhbGlnbkNvbnRlbnRcIjogdHJ1ZSwgXCJhbGlnbkl0ZW1zXCI6IHRydWUsIFwiYWxpZ25TZWxmXCI6IHRydWUsIFwianVzdGlmeUNvbnRlbnRcIjogdHJ1ZSwgXCJvcmRlclwiOiB0cnVlLCBcInRyYW5zaXRpb25cIjogdHJ1ZSwgXCJ0cmFuc2l0aW9uRGVsYXlcIjogdHJ1ZSwgXCJ0cmFuc2l0aW9uRHVyYXRpb25cIjogdHJ1ZSwgXCJ0cmFuc2l0aW9uUHJvcGVydHlcIjogdHJ1ZSwgXCJ0cmFuc2l0aW9uVGltaW5nRnVuY3Rpb25cIjogdHJ1ZSwgXCJiYWNrZHJvcEZpbHRlclwiOiB0cnVlLCBcInNjcm9sbFNuYXBUeXBlXCI6IHRydWUsIFwic2Nyb2xsU25hcFBvaW50c1hcIjogdHJ1ZSwgXCJzY3JvbGxTbmFwUG9pbnRzWVwiOiB0cnVlLCBcInNjcm9sbFNuYXBEZXN0aW5hdGlvblwiOiB0cnVlLCBcInNjcm9sbFNuYXBDb29yZGluYXRlXCI6IHRydWUsIFwic2hhcGVJbWFnZVRocmVzaG9sZFwiOiB0cnVlLCBcInNoYXBlSW1hZ2VNYXJnaW5cIjogdHJ1ZSwgXCJzaGFwZUltYWdlT3V0c2lkZVwiOiB0cnVlLCBcImh5cGhlbnNcIjogdHJ1ZSwgXCJmbG93SW50b1wiOiB0cnVlLCBcImZsb3dGcm9tXCI6IHRydWUsIFwicmVnaW9uRnJhZ21lbnRcIjogdHJ1ZSwgXCJ0ZXh0U2l6ZUFkanVzdFwiOiB0cnVlLCBcImJvcmRlckltYWdlXCI6IHRydWUsIFwiYm9yZGVySW1hZ2VPdXRzZXRcIjogdHJ1ZSwgXCJib3JkZXJJbWFnZVJlcGVhdFwiOiB0cnVlLCBcImJvcmRlckltYWdlU2xpY2VcIjogdHJ1ZSwgXCJib3JkZXJJbWFnZVNvdXJjZVwiOiB0cnVlLCBcImJvcmRlckltYWdlV2lkdGhcIjogdHJ1ZSwgXCJ0YWJTaXplXCI6IHRydWUsIFwib2JqZWN0Rml0XCI6IHRydWUsIFwib2JqZWN0UG9zaXRpb25cIjogdHJ1ZSB9LCBcIk1velwiOiB7IFwiYXBwZWFyYW5jZVwiOiB0cnVlLCBcInVzZXJTZWxlY3RcIjogdHJ1ZSwgXCJib3hTaXppbmdcIjogdHJ1ZSwgXCJ0ZXh0QWxpZ25MYXN0XCI6IHRydWUsIFwidGV4dERlY29yYXRpb25TdHlsZVwiOiB0cnVlLCBcInRleHREZWNvcmF0aW9uU2tpcFwiOiB0cnVlLCBcInRleHREZWNvcmF0aW9uTGluZVwiOiB0cnVlLCBcInRleHREZWNvcmF0aW9uQ29sb3JcIjogdHJ1ZSwgXCJ0YWJTaXplXCI6IHRydWUsIFwiaHlwaGVuc1wiOiB0cnVlLCBcImZvbnRGZWF0dXJlU2V0dGluZ3NcIjogdHJ1ZSwgXCJicmVha0FmdGVyXCI6IHRydWUsIFwiYnJlYWtCZWZvcmVcIjogdHJ1ZSwgXCJicmVha0luc2lkZVwiOiB0cnVlLCBcImNvbHVtbkNvdW50XCI6IHRydWUsIFwiY29sdW1uRmlsbFwiOiB0cnVlLCBcImNvbHVtbkdhcFwiOiB0cnVlLCBcImNvbHVtblJ1bGVcIjogdHJ1ZSwgXCJjb2x1bW5SdWxlQ29sb3JcIjogdHJ1ZSwgXCJjb2x1bW5SdWxlU3R5bGVcIjogdHJ1ZSwgXCJjb2x1bW5SdWxlV2lkdGhcIjogdHJ1ZSwgXCJjb2x1bW5zXCI6IHRydWUsIFwiY29sdW1uU3BhblwiOiB0cnVlLCBcImNvbHVtbldpZHRoXCI6IHRydWUgfSwgXCJtc1wiOiB7IFwiZmxleFwiOiB0cnVlLCBcImZsZXhCYXNpc1wiOiBmYWxzZSwgXCJmbGV4RGlyZWN0aW9uXCI6IHRydWUsIFwiZmxleEdyb3dcIjogZmFsc2UsIFwiZmxleEZsb3dcIjogdHJ1ZSwgXCJmbGV4U2hyaW5rXCI6IGZhbHNlLCBcImZsZXhXcmFwXCI6IHRydWUsIFwiYWxpZ25Db250ZW50XCI6IGZhbHNlLCBcImFsaWduSXRlbXNcIjogZmFsc2UsIFwiYWxpZ25TZWxmXCI6IGZhbHNlLCBcImp1c3RpZnlDb250ZW50XCI6IGZhbHNlLCBcIm9yZGVyXCI6IGZhbHNlLCBcInRyYW5zZm9ybVwiOiB0cnVlLCBcInRyYW5zZm9ybU9yaWdpblwiOiB0cnVlLCBcInRyYW5zZm9ybU9yaWdpblhcIjogdHJ1ZSwgXCJ0cmFuc2Zvcm1PcmlnaW5ZXCI6IHRydWUsIFwidXNlclNlbGVjdFwiOiB0cnVlLCBcIndyYXBGbG93XCI6IHRydWUsIFwid3JhcFRocm91Z2hcIjogdHJ1ZSwgXCJ3cmFwTWFyZ2luXCI6IHRydWUsIFwic2Nyb2xsU25hcFR5cGVcIjogdHJ1ZSwgXCJzY3JvbGxTbmFwUG9pbnRzWFwiOiB0cnVlLCBcInNjcm9sbFNuYXBQb2ludHNZXCI6IHRydWUsIFwic2Nyb2xsU25hcERlc3RpbmF0aW9uXCI6IHRydWUsIFwic2Nyb2xsU25hcENvb3JkaW5hdGVcIjogdHJ1ZSwgXCJ0b3VjaEFjdGlvblwiOiB0cnVlLCBcImh5cGhlbnNcIjogdHJ1ZSwgXCJmbG93SW50b1wiOiB0cnVlLCBcImZsb3dGcm9tXCI6IHRydWUsIFwiYnJlYWtCZWZvcmVcIjogdHJ1ZSwgXCJicmVha0FmdGVyXCI6IHRydWUsIFwiYnJlYWtJbnNpZGVcIjogdHJ1ZSwgXCJyZWdpb25GcmFnbWVudFwiOiB0cnVlLCBcImdyaWRUZW1wbGF0ZUNvbHVtbnNcIjogdHJ1ZSwgXCJncmlkVGVtcGxhdGVSb3dzXCI6IHRydWUsIFwiZ3JpZFRlbXBsYXRlQXJlYXNcIjogdHJ1ZSwgXCJncmlkVGVtcGxhdGVcIjogdHJ1ZSwgXCJncmlkQXV0b0NvbHVtbnNcIjogdHJ1ZSwgXCJncmlkQXV0b1Jvd3NcIjogdHJ1ZSwgXCJncmlkQXV0b0Zsb3dcIjogdHJ1ZSwgXCJncmlkXCI6IHRydWUsIFwiZ3JpZFJvd1N0YXJ0XCI6IHRydWUsIFwiZ3JpZENvbHVtblN0YXJ0XCI6IHRydWUsIFwiZ3JpZFJvd0VuZFwiOiB0cnVlLCBcImdyaWRSb3dcIjogdHJ1ZSwgXCJncmlkQ29sdW1uXCI6IHRydWUsIFwiZ3JpZENvbHVtbkVuZFwiOiB0cnVlLCBcImdyaWRDb2x1bW5HYXBcIjogdHJ1ZSwgXCJncmlkUm93R2FwXCI6IHRydWUsIFwiZ3JpZEFyZWFcIjogdHJ1ZSwgXCJncmlkR2FwXCI6IHRydWUsIFwidGV4dFNpemVBZGp1c3RcIjogdHJ1ZSB9IH07XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuLy8gaGVscGVyIHRvIGNhcGl0YWxpemUgc3RyaW5nc1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoc3RyKSB7XG4gIHJldHVybiBzdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkgdmFsdWUgPSB2YWx1ZS5qb2luKCcsJyk7XG5cbiAgcmV0dXJuIHZhbHVlLm1hdGNoKC8td2Via2l0LXwtbW96LXwtbXMtLykgIT09IG51bGw7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHsgaWYgKGtleSBpbiBvYmopIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7IHZhbHVlOiB2YWx1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSB9KTsgfSBlbHNlIHsgb2JqW2tleV0gPSB2YWx1ZTsgfSByZXR1cm4gb2JqOyB9XG5cbi8vIHJldHVybnMgYSBzdHlsZSBvYmplY3Qgd2l0aCBhIHNpbmdsZSBjb25jYXRlZCBwcmVmaXhlZCB2YWx1ZSBzdHJpbmdcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKHByb3BlcnR5LCB2YWx1ZSkge1xuICB2YXIgcmVwbGFjZXIgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDIgfHwgYXJndW1lbnRzWzJdID09PSB1bmRlZmluZWQgPyBmdW5jdGlvbiAocHJlZml4LCB2YWx1ZSkge1xuICAgIHJldHVybiBwcmVmaXggKyB2YWx1ZTtcbiAgfSA6IGFyZ3VtZW50c1syXTtcbiAgcmV0dXJuIF9kZWZpbmVQcm9wZXJ0eSh7fSwgcHJvcGVydHksIFsnLXdlYmtpdC0nLCAnLW1vei0nLCAnJ10ubWFwKGZ1bmN0aW9uIChwcmVmaXgpIHtcbiAgICByZXR1cm4gcmVwbGFjZXIocHJlZml4LCB2YWx1ZSk7XG4gIH0pKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvc3RhdGljL3ByZWZpeEFsbCcpXG4iLCJpbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY3NzLCBTdHlsZVNoZWV0IH0gZnJvbSAnYXBocm9kaXRlL25vLWltcG9ydGFudCc7XG5cbmltcG9ydCBkZWZhdWx0cyBmcm9tICcuLi90aGVtZSc7XG5pbXBvcnQgeyBkZWVwTWVyZ2UgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgSWNvbiBmcm9tICcuL0ljb24nO1xuXG5mdW5jdGlvbiBBcnJvdyAoe1xuXHRkaXJlY3Rpb24sXG5cdGljb24sXG5cdG9uQ2xpY2ssXG5cdHNpemUsXG5cdC4uLnByb3BzLFxufSxcbntcblx0dGhlbWUsXG59KSB7XG5cdGNvbnN0IGNsYXNzZXMgPSBTdHlsZVNoZWV0LmNyZWF0ZShkZWVwTWVyZ2UoZGVmYXVsdFN0eWxlcywgdGhlbWUpKTtcblxuXHRyZXR1cm4gKFxuXHRcdDxidXR0b25cblx0XHRcdHR5cGU9XCJidXR0b25cIlxuXHRcdFx0Y2xhc3NOYW1lPXtjc3MoY2xhc3Nlcy5hcnJvdywgY2xhc3Nlc1snYXJyb3dfX2RpcmVjdGlvbl9fJyArIGRpcmVjdGlvbl0sIHNpemUgJiYgY2xhc3Nlc1snYXJyb3dfX3NpemVfXycgKyBzaXplXSl9XG5cdFx0XHRvbkNsaWNrPXtvbkNsaWNrfVxuXHRcdFx0b25Ub3VjaEVuZD17b25DbGlja31cblx0XHRcdHsuLi5wcm9wc31cblx0XHQ+XG5cdFx0XHQ8SWNvbiBmaWxsPXshIXRoZW1lLmFycm93ICYmIHRoZW1lLmFycm93LmZpbGwgfHwgZGVmYXVsdHMuYXJyb3cuZmlsbH0gdHlwZT17aWNvbn0gLz5cblx0XHQ8L2J1dHRvbj5cblx0KTtcbn07XG5cbkFycm93LnByb3BUeXBlcyA9IHtcblx0ZGlyZWN0aW9uOiBQcm9wVHlwZXMub25lT2YoWydsZWZ0JywgJ3JpZ2h0J10pLFxuXHRpY29uOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuXHRzaXplOiBQcm9wVHlwZXMub25lT2YoWydtZWRpdW0nLCAnc21hbGwnXSkuaXNSZXF1aXJlZCxcbn07XG5BcnJvdy5kZWZhdWx0UHJvcHMgPSB7XG5cdHNpemU6ICdtZWRpdW0nLFxufTtcbkFycm93LmNvbnRleHRUeXBlcyA9IHtcblx0dGhlbWU6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbn07XG5cbmNvbnN0IGRlZmF1bHRTdHlsZXMgPSB7XG5cdGFycm93OiB7XG5cdFx0YmFja2dyb3VuZDogJ25vbmUnLFxuXHRcdGJvcmRlcjogJ25vbmUnLFxuXHRcdGJvcmRlclJhZGl1czogNCxcblx0XHRjdXJzb3I6ICdwb2ludGVyJyxcblx0XHRvdXRsaW5lOiAnbm9uZScsXG5cdFx0cGFkZGluZzogMTAsIC8vIGluY3JlYXNlIGhpdCBhcmVhXG5cdFx0cG9zaXRpb246ICdhYnNvbHV0ZScsXG5cdFx0dG9wOiAnNTAlJyxcblxuXHRcdC8vIGRpc2FibGUgdXNlciBzZWxlY3Rcblx0XHRXZWJraXRUb3VjaENhbGxvdXQ6ICdub25lJyxcblx0XHR1c2VyU2VsZWN0OiAnbm9uZScsXG5cdH0sXG5cblx0Ly8gc2l6ZWVzXG5cdGFycm93X19zaXplX19tZWRpdW06IHtcblx0XHRoZWlnaHQ6IGRlZmF1bHRzLmFycm93LmhlaWdodCxcblx0XHRtYXJnaW5Ub3A6IGRlZmF1bHRzLmFycm93LmhlaWdodCAvIC0yLFxuXHRcdHdpZHRoOiA0MCxcblxuXHRcdCdAbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpJzoge1xuXHRcdFx0d2lkdGg6IDcwLFxuXHRcdH0sXG5cdH0sXG5cdGFycm93X19zaXplX19zbWFsbDoge1xuXHRcdGhlaWdodDogZGVmYXVsdHMudGh1bWJuYWlsLnNpemUsXG5cdFx0bWFyZ2luVG9wOiBkZWZhdWx0cy50aHVtYm5haWwuc2l6ZSAvIC0yLFxuXHRcdHdpZHRoOiAzMCxcblxuXHRcdCdAbWVkaWEgKG1pbi13aWR0aDogNTAwcHgpJzoge1xuXHRcdFx0d2lkdGg6IDQwLFxuXHRcdH0sXG5cdH0sXG5cblx0Ly8gZGlyZWN0aW9uXG5cdGFycm93X19kaXJlY3Rpb25fX3JpZ2h0OiB7XG5cdFx0cmlnaHQ6IGRlZmF1bHRzLmNvbnRhaW5lci5ndXR0ZXIuaG9yaXpvbnRhbCxcblx0fSxcblx0YXJyb3dfX2RpcmVjdGlvbl9fbGVmdDoge1xuXHRcdGxlZnQ6IGRlZmF1bHRzLmNvbnRhaW5lci5ndXR0ZXIuaG9yaXpvbnRhbCxcblx0fSxcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQXJyb3c7XG4iLCJpbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY3NzLCBTdHlsZVNoZWV0IH0gZnJvbSAnYXBocm9kaXRlL25vLWltcG9ydGFudCc7XG5cbmltcG9ydCBkZWZhdWx0cyBmcm9tICcuLi90aGVtZSc7XG5pbXBvcnQgeyBkZWVwTWVyZ2UgfSBmcm9tICcuLi91dGlscyc7XG5cbmZ1bmN0aW9uIENvbnRhaW5lciAoeyAuLi5wcm9wcyB9LCB7IHRoZW1lIH0pIHtcblx0Y29uc3QgY2xhc3NlcyA9IFN0eWxlU2hlZXQuY3JlYXRlKGRlZXBNZXJnZShkZWZhdWx0U3R5bGVzLCB0aGVtZSkpO1xuXG5cdHJldHVybiAoXG5cdFx0PGRpdlxuXHRcdFx0Y2xhc3NOYW1lPXtjc3MoY2xhc3Nlcy5jb250YWluZXIpfVxuXHRcdFx0ey4uLnByb3BzfVxuXHRcdC8+XG5cdCk7XG59O1xuXG5Db250YWluZXIuY29udGV4dFR5cGVzID0ge1xuXHR0aGVtZTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxufTtcblxuY29uc3QgZGVmYXVsdFN0eWxlcyA9IHtcblx0Y29udGFpbmVyOiB7XG5cdFx0Ly9hbGlnbkl0ZW1zOiAnY2VudGVyJyxcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IGRlZmF1bHRzLmNvbnRhaW5lci5iYWNrZ3JvdW5kLFxuXHRcdGJveFNpemluZzogJ2JvcmRlci1ib3gnLFxuXHRcdC8vZGlzcGxheTogJ2ZsZXgnLFxuXHRcdGhlaWdodDogJzEwMCUnLFxuXHRcdC8vanVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuXHRcdGxlZnQ6IDAsXG5cdFx0cGFkZGluZ0JvdHRvbTogZGVmYXVsdHMuY29udGFpbmVyLmd1dHRlci52ZXJ0aWNhbCxcblx0XHRwYWRkaW5nTGVmdDogZGVmYXVsdHMuY29udGFpbmVyLmd1dHRlci5ob3Jpem9udGFsLFxuXHRcdHBhZGRpbmdSaWdodDogZGVmYXVsdHMuY29udGFpbmVyLmd1dHRlci5ob3Jpem9udGFsLFxuXHRcdHBhZGRpbmdUb3A6IGRlZmF1bHRzLmNvbnRhaW5lci5ndXR0ZXIudmVydGljYWwsXG5cdFx0cG9zaXRpb246ICdmaXhlZCcsXG5cdFx0dG9wOiAwLFxuXHRcdHdpZHRoOiAnMTAwJScsXG5cdFx0ekluZGV4OiBkZWZhdWx0cy5jb250YWluZXIuekluZGV4LFxuXHR9LFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDb250YWluZXI7XG4iLCJpbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY3NzLCBTdHlsZVNoZWV0IH0gZnJvbSAnYXBocm9kaXRlL25vLWltcG9ydGFudCc7XG5pbXBvcnQgZGVmYXVsdHMgZnJvbSAnLi4vdGhlbWUnO1xuaW1wb3J0IHsgZGVlcE1lcmdlIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5mdW5jdGlvbiBGb290ZXIgKHtcblx0Y2FwdGlvbixcblx0Y291bnRDdXJyZW50LFxuXHRjb3VudFNlcGFyYXRvcixcblx0Y291bnRUb3RhbCxcblx0c2hvd0NvdW50LFxuXHQuLi5wcm9wcyxcbn0sIHtcblx0dGhlbWUsXG59KSB7XG5cdGlmICghY2FwdGlvbiAmJiAhc2hvd0NvdW50KSByZXR1cm4gbnVsbDtcblxuXHRjb25zdCBjbGFzc2VzID0gU3R5bGVTaGVldC5jcmVhdGUoZGVlcE1lcmdlKGRlZmF1bHRTdHlsZXMsIHRoZW1lKSk7XG5cblx0Y29uc3QgaW1hZ2VDb3VudCA9IHNob3dDb3VudCA/IChcblx0XHQ8ZGl2IGNsYXNzTmFtZT17Y3NzKGNsYXNzZXMuZm9vdGVyQ291bnQpfT5cblx0XHRcdHtjb3VudEN1cnJlbnR9XG5cdFx0XHR7Y291bnRTZXBhcmF0b3J9XG5cdFx0XHR7Y291bnRUb3RhbH1cblx0XHQ8L2Rpdj4pXG5cdFx0OiA8c3BhbiAvPjtcblxuXHRyZXR1cm4gKFxuXHRcdDxkaXYgY2xhc3NOYW1lPXtjc3MoY2xhc3Nlcy5mb290ZXIpfSB7Li4ucHJvcHN9PlxuXHRcdFx0e2NhcHRpb24gPyAoXG5cdFx0XHRcdDxmaWdjYXB0aW9uIGNsYXNzTmFtZT17Y3NzKGNsYXNzZXMuZm9vdGVyQ2FwdGlvbil9PlxuXHRcdFx0XHRcdHtjYXB0aW9ufVxuXHRcdFx0XHQ8L2ZpZ2NhcHRpb24+XG5cdFx0XHQpIDogPHNwYW4gLz59XG5cdFx0XHR7aW1hZ2VDb3VudH1cblx0XHQ8L2Rpdj5cblx0KTtcbn07XG5cbkZvb3Rlci5wcm9wVHlwZXMgPSB7XG5cdGNhcHRpb246IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5lbGVtZW50XSksXG5cdGNvdW50Q3VycmVudDogUHJvcFR5cGVzLm51bWJlcixcblx0Y291bnRTZXBhcmF0b3I6IFByb3BUeXBlcy5zdHJpbmcsXG5cdGNvdW50VG90YWw6IFByb3BUeXBlcy5udW1iZXIsXG5cdHNob3dDb3VudDogUHJvcFR5cGVzLmJvb2wsXG59O1xuRm9vdGVyLmNvbnRleHRUeXBlcyA9IHtcblx0dGhlbWU6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbn07XG5cbmNvbnN0IGRlZmF1bHRTdHlsZXMgPSB7XG5cdGZvb3Rlcjoge1xuXHRcdGJveFNpemluZzogJ2JvcmRlci1ib3gnLFxuXHRcdGNvbG9yOiBkZWZhdWx0cy5mb290ZXIuY29sb3IsXG5cdFx0Y3Vyc29yOiAnYXV0bycsXG5cdFx0ZGlzcGxheTogJ2ZsZXgnLFxuXHRcdGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsXG5cdFx0bGVmdDogMCxcblx0XHRsaW5lSGVpZ2h0OiAxLjMsXG5cdFx0cGFkZGluZ0JvdHRvbTogZGVmYXVsdHMuZm9vdGVyLmd1dHRlci52ZXJ0aWNhbCxcblx0XHRwYWRkaW5nTGVmdDogZGVmYXVsdHMuZm9vdGVyLmd1dHRlci5ob3Jpem9udGFsLFxuXHRcdHBhZGRpbmdSaWdodDogZGVmYXVsdHMuZm9vdGVyLmd1dHRlci5ob3Jpem9udGFsLFxuXHRcdHBhZGRpbmdUb3A6IGRlZmF1bHRzLmZvb3Rlci5ndXR0ZXIudmVydGljYWwsXG5cdH0sXG5cdGZvb3RlckNvdW50OiB7XG5cdFx0Y29sb3I6IGRlZmF1bHRzLmZvb3Rlci5jb3VudC5jb2xvcixcblx0XHRmb250U2l6ZTogZGVmYXVsdHMuZm9vdGVyLmNvdW50LmZvbnRTaXplLFxuXHRcdHBhZGRpbmdMZWZ0OiAnMWVtJywgLy8gYWRkIGEgc21hbGwgZ3V0dGVyIGZvciB0aGUgY2FwdGlvblxuXHR9LFxuXHRmb290ZXJDYXB0aW9uOiB7XG5cdFx0ZmxleDogJzEgMSAwJyxcblx0fSxcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRm9vdGVyO1xuIiwiaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNzcywgU3R5bGVTaGVldCB9IGZyb20gJ2FwaHJvZGl0ZS9uby1pbXBvcnRhbnQnO1xuXG5pbXBvcnQgZGVmYXVsdHMgZnJvbSAnLi4vdGhlbWUnO1xuaW1wb3J0IHsgZGVlcE1lcmdlIH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IEljb24gZnJvbSAnLi9JY29uJztcblxuZnVuY3Rpb24gSGVhZGVyICh7XG5cdGN1c3RvbUNvbnRyb2xzLFxuXHRvbkNsb3NlLFxuXHRzaG93Q2xvc2VCdXR0b24sXG5cdC4uLnByb3BzLFxufSwge1xuXHR0aGVtZSxcbn0pIHtcblx0Y29uc3QgY2xhc3NlcyA9IFN0eWxlU2hlZXQuY3JlYXRlKGRlZXBNZXJnZShkZWZhdWx0U3R5bGVzLCB0aGVtZSkpO1xuXG5cdHJldHVybiAoXG5cdFx0PGRpdiBjbGFzc05hbWU9e2NzcyhjbGFzc2VzLmhlYWRlcil9IHsuLi5wcm9wc30+XG5cdFx0XHR7Y3VzdG9tQ29udHJvbHMgPyBjdXN0b21Db250cm9scyA6IDxzcGFuIC8+fVxuXHRcdFx0eyEhc2hvd0Nsb3NlQnV0dG9uICYmIChcblx0XHRcdFx0PGJ1dHRvblxuXHRcdFx0XHRcdHRpdGxlPVwiQ2xvc2UgKEVzYylcIlxuXHRcdFx0XHRcdGNsYXNzTmFtZT17Y3NzKGNsYXNzZXMuY2xvc2UpfVxuXHRcdFx0XHRcdG9uQ2xpY2s9e29uQ2xvc2V9XG5cdFx0XHRcdD5cblx0XHRcdFx0XHQ8SWNvbiBmaWxsPXshIXRoZW1lLmNsb3NlICYmIHRoZW1lLmNsb3NlLmZpbGwgfHwgZGVmYXVsdHMuY2xvc2UuZmlsbH0gdHlwZT1cImNsb3NlXCIgLz5cblx0XHRcdFx0PC9idXR0b24+XG5cdFx0XHQpfVxuXHRcdDwvZGl2PlxuXHQpO1xufTtcblxuSGVhZGVyLnByb3BUeXBlcyA9IHtcblx0Y3VzdG9tQ29udHJvbHM6IFByb3BUeXBlcy5hcnJheSxcblx0b25DbG9zZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblx0c2hvd0Nsb3NlQnV0dG9uOiBQcm9wVHlwZXMuYm9vbCxcbn07XG5IZWFkZXIuY29udGV4dFR5cGVzID0ge1xuXHR0aGVtZTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxufTtcblxuY29uc3QgZGVmYXVsdFN0eWxlcyA9IHtcblx0aGVhZGVyOiB7XG5cdFx0ZGlzcGxheTogJ2ZsZXgnLFxuXHRcdGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsXG5cdFx0aGVpZ2h0OiBkZWZhdWx0cy5oZWFkZXIuaGVpZ2h0LFxuXHR9LFxuXHRjbG9zZToge1xuXHRcdGJhY2tncm91bmQ6ICdub25lJyxcblx0XHRib3JkZXI6ICdub25lJyxcblx0XHRjdXJzb3I6ICdwb2ludGVyJyxcblx0XHRvdXRsaW5lOiAnbm9uZScsXG5cdFx0cG9zaXRpb246ICdyZWxhdGl2ZScsXG5cdFx0dG9wOiAwLFxuXHRcdHZlcnRpY2FsQWxpZ246ICdib3R0b20nLFxuXG5cdFx0Ly8gaW5jcmVhc2UgaGl0IGFyZWFcblx0XHRoZWlnaHQ6IGRlZmF1bHRzLmNsb3NlLmhlaWdodCArIDIwLFxuXHRcdG1hcmdpblJpZ2h0OiAtMTAsXG5cdFx0cGFkZGluZzogMTAsXG5cdFx0d2lkdGg6IGRlZmF1bHRzLmNsb3NlLndpZHRoICsgMjAsXG5cdH0sXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEhlYWRlcjtcbiIsImltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgaWNvbnMgZnJvbSAnLi4vaWNvbnMnO1xuXG5jb25zdCBJY29uID0gKHsgZmlsbCwgdHlwZSwgLi4ucHJvcHMgfSkgPT4ge1xuXHRjb25zdCBpY29uID0gaWNvbnNbdHlwZV07XG5cblx0cmV0dXJuIChcblx0XHQ8c3BhblxuXHRcdFx0ZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3sgX19odG1sOiBpY29uKGZpbGwpIH19XG5cdFx0XHR7Li4ucHJvcHN9XG5cdFx0Lz5cblx0KTtcbn07XG5cbkljb24ucHJvcFR5cGVzID0ge1xuXHRmaWxsOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHR0eXBlOiBQcm9wVHlwZXMub25lT2YoT2JqZWN0LmtleXMoaWNvbnMpKSxcbn07XG5JY29uLmRlZmF1bHRQcm9wcyA9IHtcblx0ZmlsbDogJ3doaXRlJyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEljb247XG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjc3MsIFN0eWxlU2hlZXQgfSBmcm9tICdhcGhyb2RpdGUvbm8taW1wb3J0YW50JztcblxuaW1wb3J0IFRodW1ibmFpbCBmcm9tICcuL1RodW1ibmFpbCc7XG5pbXBvcnQgQXJyb3cgZnJvbSAnLi9BcnJvdyc7XG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vdGhlbWUnO1xuXG5jb25zdCBjbGFzc2VzID0gU3R5bGVTaGVldC5jcmVhdGUoe1xuXHRwYWdpbmF0ZWRUaHVtYm5haWxzOiB7XG5cdFx0Ym90dG9tOiB0aGVtZS5jb250YWluZXIuZ3V0dGVyLnZlcnRpY2FsLFxuXHRcdGhlaWdodDogdGhlbWUudGh1bWJuYWlsLnNpemUsXG5cdFx0cGFkZGluZzogJzAgNTBweCcsXG5cdFx0cG9zaXRpb246ICdhYnNvbHV0ZScsXG5cdFx0dGV4dEFsaWduOiAnY2VudGVyJyxcblx0XHR3aGl0ZVNwYWNlOiAnbm93cmFwJyxcblx0fSxcbn0pO1xuXG5jb25zdCBhcnJvd1N0eWxlcyA9IHtcblx0aGVpZ2h0OiB0aGVtZS50aHVtYm5haWwuc2l6ZSArICh0aGVtZS50aHVtYm5haWwuZ3V0dGVyICogMiksXG5cdHdpZHRoOiA0MCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhZ2luYXRlZFRodW1ibmFpbHMgZXh0ZW5kcyBDb21wb25lbnQge1xuXHRjb25zdHJ1Y3RvciAocHJvcHMpIHtcblx0XHRzdXBlcihwcm9wcyk7XG5cblx0XHR0aGlzLnN0YXRlID0ge1xuXHRcdFx0aGFzQ3VzdG9tUGFnZTogZmFsc2UsXG5cdFx0fTtcblxuXHRcdHRoaXMuZ290b1ByZXYgPSB0aGlzLmdvdG9QcmV2LmJpbmQodGhpcyk7XG5cdFx0dGhpcy5nb3RvTmV4dCA9IHRoaXMuZ290b05leHQuYmluZCh0aGlzKTtcblx0fVxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIChuZXh0UHJvcHMpIHtcblx0XHQvLyBDb21wb25lbnQgc2hvdWxkIGJlIGNvbnRyb2xsZWQsIGZsdXNoIHN0YXRlIHdoZW4gY3VycmVudEltYWdlIGNoYW5nZXNcblx0XHRpZiAobmV4dFByb3BzLmN1cnJlbnRJbWFnZSAhPT0gdGhpcy5wcm9wcy5jdXJyZW50SW1hZ2UpIHtcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0XHRoYXNDdXN0b21QYWdlOiBmYWxzZSxcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHQvLyBNRVRIT0RTXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cdGdldEZpcnN0ICgpIHtcblx0XHRjb25zdCB7IGN1cnJlbnRJbWFnZSwgb2Zmc2V0IH0gPSB0aGlzLnByb3BzO1xuXHRcdGlmICh0aGlzLnN0YXRlLmhhc0N1c3RvbVBhZ2UpIHtcblx0XHRcdHJldHVybiB0aGlzLmNsYW1wRmlyc3QodGhpcy5zdGF0ZS5maXJzdCk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLmNsYW1wRmlyc3QoY3VycmVudEltYWdlIC0gb2Zmc2V0KTtcblx0fVxuXHRzZXRGaXJzdCAoZXZlbnQsIG5ld0ZpcnN0KSB7XG5cdFx0Y29uc3QgeyBmaXJzdCB9ID0gdGhpcy5zdGF0ZTtcblxuXHRcdGlmIChldmVudCkge1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdH1cblxuXHRcdGlmIChmaXJzdCA9PT0gbmV3Rmlyc3QpIHJldHVybjtcblxuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0aGFzQ3VzdG9tUGFnZTogdHJ1ZSxcblx0XHRcdGZpcnN0OiBuZXdGaXJzdCxcblx0XHR9KTtcblx0fVxuXHRnb3RvUHJldiAoZXZlbnQpIHtcblx0XHR0aGlzLnNldEZpcnN0KGV2ZW50LCB0aGlzLmdldEZpcnN0KCkgLSB0aGlzLnByb3BzLm9mZnNldCk7XG5cdH1cblx0Z290b05leHQgKGV2ZW50KSB7XG5cdFx0dGhpcy5zZXRGaXJzdChldmVudCwgdGhpcy5nZXRGaXJzdCgpICsgdGhpcy5wcm9wcy5vZmZzZXQpO1xuXHR9XG5cdGNsYW1wRmlyc3QgKHZhbHVlKSB7XG5cdFx0Y29uc3QgeyBpbWFnZXMsIG9mZnNldCB9ID0gdGhpcy5wcm9wcztcblxuXHRcdGNvbnN0IHRvdGFsQ291bnQgPSAyICogb2Zmc2V0ICsgMTsgLy8gc2hvdyAkb2Zmc2V0IGV4dHJhIHRodW1ibmFpbHMgb24gZWFjaCBzaWRlXG5cblx0XHRpZiAodmFsdWUgPCAwKSB7XG5cdFx0XHRyZXR1cm4gMDtcblx0XHR9IGVsc2UgaWYgKHZhbHVlICsgdG90YWxDb3VudCA+IGltYWdlcy5sZW5ndGgpIHsgLy8gVG9vIGZhclxuXHRcdFx0cmV0dXJuIGltYWdlcy5sZW5ndGggLSB0b3RhbENvdW50O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0fVxuXHR9XG5cblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdC8vIFJFTkRFUkVSU1xuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXHRyZW5kZXJBcnJvd1ByZXYgKCkge1xuXHRcdGlmICh0aGlzLmdldEZpcnN0KCkgPD0gMCkgcmV0dXJuIG51bGw7XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PEFycm93XG5cdFx0XHRcdGRpcmVjdGlvbj1cImxlZnRcIlxuXHRcdFx0XHRzaXplPVwic21hbGxcIlxuXHRcdFx0XHRpY29uPVwiYXJyb3dMZWZ0XCJcblx0XHRcdFx0b25DbGljaz17dGhpcy5nb3RvUHJldn1cblx0XHRcdFx0c3R5bGU9e2Fycm93U3R5bGVzfVxuXHRcdFx0XHR0aXRsZT1cIlByZXZpb3VzIChMZWZ0IGFycm93IGtleSlcIlxuXHRcdFx0XHR0eXBlPVwiYnV0dG9uXCJcblx0XHRcdC8+XG5cdFx0KTtcblx0fVxuXHRyZW5kZXJBcnJvd05leHQgKCkge1xuXHRcdGNvbnN0IHsgb2Zmc2V0LCBpbWFnZXMgfSA9IHRoaXMucHJvcHM7XG5cdFx0Y29uc3QgdG90YWxDb3VudCA9IDIgKiBvZmZzZXQgKyAxO1xuXHRcdGlmICh0aGlzLmdldEZpcnN0KCkgKyB0b3RhbENvdW50ID49IGltYWdlcy5sZW5ndGgpIHJldHVybiBudWxsO1xuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxBcnJvd1xuXHRcdFx0XHRkaXJlY3Rpb249XCJyaWdodFwiXG5cdFx0XHRcdHNpemU9XCJzbWFsbFwiXG5cdFx0XHRcdGljb249XCJhcnJvd1JpZ2h0XCJcblx0XHRcdFx0b25DbGljaz17dGhpcy5nb3RvTmV4dH1cblx0XHRcdFx0c3R5bGU9e2Fycm93U3R5bGVzfVxuXHRcdFx0XHR0aXRsZT1cIlByZXZpb3VzIChSaWdodCBhcnJvdyBrZXkpXCJcblx0XHRcdFx0dHlwZT1cImJ1dHRvblwiXG5cdFx0XHQvPlxuXHRcdCk7XG5cdH1cblx0cmVuZGVyICgpIHtcblx0XHRjb25zdCB7IGltYWdlcywgY3VycmVudEltYWdlLCBvbkNsaWNrVGh1bWJuYWlsLCBvZmZzZXQgfSA9IHRoaXMucHJvcHM7XG5cblx0XHRjb25zdCB0b3RhbENvdW50ID0gMiAqIG9mZnNldCArIDE7IC8vIHNob3cgJG9mZnNldCBleHRyYSB0aHVtYm5haWxzIG9uIGVhY2ggc2lkZVxuXHRcdGxldCB0aHVtYm5haWxzID0gW107XG5cdFx0bGV0IGJhc2VPZmZzZXQgPSAwO1xuXHRcdGlmIChpbWFnZXMubGVuZ3RoIDw9IHRvdGFsQ291bnQpIHtcblx0XHRcdHRodW1ibmFpbHMgPSBpbWFnZXM7XG5cdFx0fSBlbHNlIHsgLy8gVHJ5IHRvIGNlbnRlciBjdXJyZW50IGltYWdlIGluIGxpc3Rcblx0XHRcdGJhc2VPZmZzZXQgPSB0aGlzLmdldEZpcnN0KCk7XG5cdFx0XHR0aHVtYm5haWxzID0gaW1hZ2VzLnNsaWNlKGJhc2VPZmZzZXQsIGJhc2VPZmZzZXQgKyB0b3RhbENvdW50KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9e2NzcyhjbGFzc2VzLnBhZ2luYXRlZFRodW1ibmFpbHMpfT5cblx0XHRcdFx0e3RoaXMucmVuZGVyQXJyb3dQcmV2KCl9XG5cdFx0XHRcdHt0aHVtYm5haWxzLm1hcCgoaW1nLCBpZHgpID0+IChcblx0XHRcdFx0XHQ8VGh1bWJuYWlsIGtleT17YmFzZU9mZnNldCArIGlkeH1cblx0XHRcdFx0XHRcdHsuLi5pbWd9XG5cdFx0XHRcdFx0XHRpbmRleD17YmFzZU9mZnNldCArIGlkeH1cblx0XHRcdFx0XHRcdG9uQ2xpY2s9e29uQ2xpY2tUaHVtYm5haWx9XG5cdFx0XHRcdFx0XHRhY3RpdmU9e2Jhc2VPZmZzZXQgKyBpZHggPT09IGN1cnJlbnRJbWFnZX0gLz5cblx0XHRcdFx0KSl9XG5cdFx0XHRcdHt0aGlzLnJlbmRlckFycm93TmV4dCgpfVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufVxuXG5QYWdpbmF0ZWRUaHVtYm5haWxzLnByb3BUeXBlcyA9IHtcblx0Y3VycmVudEltYWdlOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRpbWFnZXM6IFByb3BUeXBlcy5hcnJheSxcblx0b2Zmc2V0OiBQcm9wVHlwZXMubnVtYmVyLFxuXHRvbkNsaWNrVGh1bWJuYWlsOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxufTtcbiIsImltcG9ydCB7IENoaWxkcmVuLCBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcblxuLy8gUGFzcyB0aGUgTGlnaHRib3ggY29udGV4dCB0aHJvdWdoIHRvIHRoZSBQb3J0YWwncyBkZXNjZW5kZW50c1xuLy8gU3RhY2tPdmVyZmxvdyBkaXNjdXNzaW9uIGh0dHA6Ly9nb28uZ2wvb2Nscko5XG5cbmNsYXNzIFBhc3NDb250ZXh0IGV4dGVuZHMgQ29tcG9uZW50IHtcblx0Z2V0Q2hpbGRDb250ZXh0ICgpIHtcblx0XHRyZXR1cm4gdGhpcy5wcm9wcy5jb250ZXh0O1xuXHR9XG5cdHJlbmRlciAoKSB7XG5cdFx0cmV0dXJuIENoaWxkcmVuLm9ubHkodGhpcy5wcm9wcy5jaGlsZHJlbik7XG5cdH1cbn07XG5cblBhc3NDb250ZXh0LnByb3BUeXBlcyA9IHtcblx0Y29udGV4dDogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxufTtcblBhc3NDb250ZXh0LmNoaWxkQ29udGV4dFR5cGVzID0ge1xuXHR0aGVtZTogUHJvcFR5cGVzLm9iamVjdCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFBhc3NDb250ZXh0O1xuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFRyYW5zaXRpb24gZnJvbSAncmVhY3QtYWRkb25zLWNzcy10cmFuc2l0aW9uLWdyb3VwJztcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgUGFzc0NvbnRleHQgZnJvbSAnLi9QYXNzQ29udGV4dCc7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9ydGFsIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0Y29uc3RydWN0b3IgKCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5wb3J0YWxFbGVtZW50ID0gbnVsbDtcblx0fVxuXHRjb21wb25lbnREaWRNb3VudCAoKSB7XG5cdFx0Y29uc3QgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocCk7XG5cdFx0dGhpcy5wb3J0YWxFbGVtZW50ID0gcDtcblx0XHR0aGlzLmNvbXBvbmVudERpZFVwZGF0ZSgpO1xuXHR9XG5cdGNvbXBvbmVudERpZFVwZGF0ZSAoKSB7XG5cdFx0Ly8gQW5pbWF0ZSBmYWRlIG9uIG1vdW50L3VubW91bnRcblx0XHRjb25zdCBkdXJhdGlvbiA9IDIwMDtcblx0XHRjb25zdCBzdHlsZXMgPSBgXG5cdFx0XHRcdC5mYWRlLWVudGVyIHsgb3BhY2l0eTogMC4wMTsgfVxuXHRcdFx0XHQuZmFkZS1lbnRlci5mYWRlLWVudGVyLWFjdGl2ZSB7IG9wYWNpdHk6IDE7IHRyYW5zaXRpb246IG9wYWNpdHkgJHtkdXJhdGlvbn1tczsgfVxuXHRcdFx0XHQuZmFkZS1sZWF2ZSB7IG9wYWNpdHk6IDE7IH1cblx0XHRcdFx0LmZhZGUtbGVhdmUuZmFkZS1sZWF2ZS1hY3RpdmUgeyBvcGFjaXR5OiAwLjAxOyB0cmFuc2l0aW9uOiBvcGFjaXR5ICR7ZHVyYXRpb259bXM7IH1cblx0XHRgO1xuXG5cdFx0cmVuZGVyKFxuXHRcdFx0PFBhc3NDb250ZXh0IGNvbnRleHQ9e3RoaXMuY29udGV4dH0+XG5cdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0PHN0eWxlPntzdHlsZXN9PC9zdHlsZT5cblx0XHRcdFx0XHQ8VHJhbnNpdGlvblxuXHRcdFx0XHRcdFx0Y29tcG9uZW50PVwiZGl2XCJcblx0XHRcdFx0XHRcdHRyYW5zaXRpb25OYW1lPVwiZmFkZVwiXG5cdFx0XHRcdFx0XHR0cmFuc2l0aW9uRW50ZXJUaW1lb3V0PXtkdXJhdGlvbn1cblx0XHRcdFx0XHRcdHRyYW5zaXRpb25MZWF2ZVRpbWVvdXQ9e2R1cmF0aW9ufVxuXHRcdFx0XHRcdFx0ey4uLnRoaXMucHJvcHN9XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L1Bhc3NDb250ZXh0Pixcblx0XHRcdHRoaXMucG9ydGFsRWxlbWVudFxuXHRcdCk7XG5cdH1cblx0Y29tcG9uZW50V2lsbFVubW91bnQgKCkge1xuXHRcdGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy5wb3J0YWxFbGVtZW50KTtcblx0fVxuXHRyZW5kZXIgKCkge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG59XG5cblBvcnRhbC5jb250ZXh0VHlwZXMgPSB7XG5cdHRoZW1lOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG59O1xuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcblxubGV0IGxvY2tDb3VudCA9IDA7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjcm9sbExvY2sgZXh0ZW5kcyBDb21wb25lbnQge1xuXG5cdGNvbXBvbmVudFdpbGxNb3VudCAoKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSByZXR1cm47XG5cblx0XHRsb2NrQ291bnQrKztcblx0XHRpZiAobG9ja0NvdW50ID4gMSkgcmV0dXJuO1xuXG5cdFx0Ly9cdEZJWE1FIGlPUyBpZ25vcmVzIG92ZXJmbG93IG9uIGJvZHlcblx0XHR0cnkge1xuXHRcdFx0Y29uc3Qgc2Nyb2xsQmFyV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCAtIGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGg7XG5cblx0XHRcdGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmJvZHk7XG5cblx0XHRcdHRhcmdldC5zdHlsZS5wYWRkaW5nUmlnaHQgPSBzY3JvbGxCYXJXaWR0aCArICdweCc7XG5cdFx0XHR0YXJnZXQuc3R5bGUub3ZlcmZsb3dZID0gJ2hpZGRlbic7XG5cdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gZmluZCBib2R5IGVsZW1lbnQuIEVycjonLCBlcnIpO1xuXHRcdH1cblx0fVxuXG5cdGNvbXBvbmVudFdpbGxVbm1vdW50ICgpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgfHwgbG9ja0NvdW50ID09PSAwKSByZXR1cm47XG5cblx0XHRsb2NrQ291bnQtLTtcblx0XHRpZiAobG9ja0NvdW50ID4gMCkgcmV0dXJuOyAvLyBTdGlsbCBsb2NrZWRcblxuXHRcdC8vXHRGSVhNRSBpT1MgaWdub3JlcyBvdmVyZmxvdyBvbiBib2R5XG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmJvZHk7XG5cblx0XHRcdHRhcmdldC5zdHlsZS5wYWRkaW5nUmlnaHQgPSAnJztcblx0XHRcdHRhcmdldC5zdHlsZS5vdmVyZmxvd1kgPSAnJztcblxuXHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0Y29uc29sZS5lcnJvcignRmFpbGVkIHRvIGZpbmQgYm9keSBlbGVtZW50LiBFcnI6JywgZXJyKTtcblx0XHR9XG5cdH1cblxuXHRyZW5kZXIgKCkge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG59XG4iLCJpbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY3NzLCBTdHlsZVNoZWV0IH0gZnJvbSAnYXBocm9kaXRlL25vLWltcG9ydGFudCc7XG5cbmltcG9ydCBkZWZhdWx0cyBmcm9tICcuLi90aGVtZSc7XG5pbXBvcnQgeyBkZWVwTWVyZ2UgfSBmcm9tICcuLi91dGlscyc7XG5cbmZ1bmN0aW9uIFRodW1ibmFpbCAoeyBpbmRleCwgc3JjLCB0aHVtYm5haWwsIGFjdGl2ZSwgb25DbGljayB9LCB7IHRoZW1lIH0pIHtcblx0Y29uc3QgdXJsID0gdGh1bWJuYWlsID8gdGh1bWJuYWlsIDogc3JjO1xuXHRjb25zdCBjbGFzc2VzID0gU3R5bGVTaGVldC5jcmVhdGUoZGVlcE1lcmdlKGRlZmF1bHRTdHlsZXMsIHRoZW1lKSk7XG5cblx0cmV0dXJuIChcblx0XHQ8ZGl2XG5cdFx0XHRjbGFzc05hbWU9e2NzcyhjbGFzc2VzLnRodW1ibmFpbCwgYWN0aXZlICYmIGNsYXNzZXMudGh1bWJuYWlsX19hY3RpdmUpfVxuXHRcdFx0b25DbGljaz17KGUpID0+IHtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cdFx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKClcblx0XHRcdFx0XG5cdFx0XHRcdG9uQ2xpY2soaW5kZXgpXG5cdFx0XHR9fVxuXHRcdFx0c3R5bGU9e3sgYmFja2dyb3VuZEltYWdlOiAndXJsKFwiJyArIHVybCArICdcIiknIH19XG5cdFx0Lz5cblx0KTtcbn1cblxuVGh1bWJuYWlsLnByb3BUeXBlcyA9IHtcblx0YWN0aXZlOiBQcm9wVHlwZXMuYm9vbCxcblx0aW5kZXg6IFByb3BUeXBlcy5udW1iZXIsXG5cdG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG5cdHNyYzogUHJvcFR5cGVzLnN0cmluZyxcblx0dGh1bWJuYWlsOiBQcm9wVHlwZXMuc3RyaW5nLFxufTtcblxuVGh1bWJuYWlsLmNvbnRleHRUeXBlcyA9IHtcblx0dGhlbWU6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbn07XG5cbmNvbnN0IGRlZmF1bHRTdHlsZXMgPSB7XG5cdHRodW1ibmFpbDoge1xuXHRcdGJhY2tncm91bmRQb3NpdGlvbjogJ2NlbnRlcicsXG5cdFx0YmFja2dyb3VuZFNpemU6ICdjb3ZlcicsXG5cdFx0Ym9yZGVyUmFkaXVzOiAyLFxuXHRcdGJveFNoYWRvdzogJ2luc2V0IDAgMCAwIDFweCBoc2xhKDAsMCUsMTAwJSwuMiknLFxuXHRcdGN1cnNvcjogJ3BvaW50ZXInLFxuXHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuXHRcdGhlaWdodDogZGVmYXVsdHMudGh1bWJuYWlsLnNpemUsXG5cdFx0bWFyZ2luOiBkZWZhdWx0cy50aHVtYm5haWwuZ3V0dGVyLFxuXHRcdG92ZXJmbG93OiAnaGlkZGVuJyxcblx0XHR3aWR0aDogZGVmYXVsdHMudGh1bWJuYWlsLnNpemUsXG5cdH0sXG5cdHRodW1ibmFpbF9fYWN0aXZlOiB7XG5cdFx0Ym94U2hhZG93OiBgaW5zZXQgMCAwIDAgMnB4ICR7ZGVmYXVsdHMudGh1bWJuYWlsLmFjdGl2ZUJvcmRlckNvbG9yfWAsXG5cdH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBUaHVtYm5haWw7XG4iLCJleHBvcnQgZGVmYXVsdCAoZmlsbCkgPT4gKFxuXHRgPHN2ZyBmaWxsPVwiJHtmaWxsfVwiIHZlcnNpb249XCIxLjFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgeD1cIjBweFwiIHk9XCIwcHhcIiB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCIgeG1sOnNwYWNlPVwicHJlc2VydmVcIj5cblx0XHQ8cGF0aCBkPVwiTTIxMy43LDI1NkwyMTMuNywyNTZMMjEzLjcsMjU2TDM4MC45LDgxLjljNC4yLTQuMyw0LjEtMTEuNC0wLjItMTUuOGwtMjkuOS0zMC42Yy00LjMtNC40LTExLjMtNC41LTE1LjUtMC4yTDEzMS4xLDI0Ny45IGMtMi4yLDIuMi0zLjIsNS4yLTMsOC4xYy0wLjEsMywwLjksNS45LDMsOC4xbDIwNC4yLDIxMi43YzQuMiw0LjMsMTEuMiw0LjIsMTUuNS0wLjJsMjkuOS0zMC42YzQuMy00LjQsNC40LTExLjUsMC4yLTE1LjggTDIxMy43LDI1NnpcIi8+XG5cdDwvc3ZnPmBcbik7XG4iLCJleHBvcnQgZGVmYXVsdCAoZmlsbCkgPT4gKFxuXHRgPHN2ZyBmaWxsPVwiJHtmaWxsfVwiIHZlcnNpb249XCIxLjFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgeD1cIjBweFwiIHk9XCIwcHhcIiB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCIgeG1sOnNwYWNlPVwicHJlc2VydmVcIj5cblx0XHQ8cGF0aCBkPVwiTTI5OC4zLDI1NkwyOTguMywyNTZMMjk4LjMsMjU2TDEzMS4xLDgxLjljLTQuMi00LjMtNC4xLTExLjQsMC4yLTE1LjhsMjkuOS0zMC42YzQuMy00LjQsMTEuMy00LjUsMTUuNS0wLjJsMjA0LjIsMjEyLjcgYzIuMiwyLjIsMy4yLDUuMiwzLDguMWMwLjEsMy0wLjksNS45LTMsOC4xTDE3Ni43LDQ3Ni44Yy00LjIsNC4zLTExLjIsNC4yLTE1LjUtMC4yTDEzMS4zLDQ0NmMtNC4zLTQuNC00LjQtMTEuNS0wLjItMTUuOCBMMjk4LjMsMjU2elwiLz5cblx0PC9zdmc+YFxuKTtcbiIsImV4cG9ydCBkZWZhdWx0IChmaWxsKSA9PiAoXG5cdGA8c3ZnIGZpbGw9XCIke2ZpbGx9XCIgdmVyc2lvbj1cIjEuMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB4PVwiMHB4XCIgeT1cIjBweFwiIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIiBzdHlsZT1cImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjtcIiB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiPlxuXHRcdDxwYXRoIGQ9XCJNNDQzLjYsMzg3LjFMMzEyLjQsMjU1LjRsMTMxLjUtMTMwYzUuNC01LjQsNS40LTE0LjIsMC0xOS42bC0zNy40LTM3LjZjLTIuNi0yLjYtNi4xLTQtOS44LTRjLTMuNywwLTcuMiwxLjUtOS44LDQgTDI1NiwxOTcuOEwxMjQuOSw2OC4zYy0yLjYtMi42LTYuMS00LTkuOC00Yy0zLjcsMC03LjIsMS41LTkuOCw0TDY4LDEwNS45Yy01LjQsNS40LTUuNCwxNC4yLDAsMTkuNmwxMzEuNSwxMzBMNjguNCwzODcuMSBjLTIuNiwyLjYtNC4xLDYuMS00LjEsOS44YzAsMy43LDEuNCw3LjIsNC4xLDkuOGwzNy40LDM3LjZjMi43LDIuNyw2LjIsNC4xLDkuOCw0LjFjMy41LDAsNy4xLTEuMyw5LjgtNC4xTDI1NiwzMTMuMWwxMzAuNywxMzEuMSBjMi43LDIuNyw2LjIsNC4xLDkuOCw0LjFjMy41LDAsNy4xLTEuMyw5LjgtNC4xbDM3LjQtMzcuNmMyLjYtMi42LDQuMS02LjEsNC4xLTkuOEM0NDcuNywzOTMuMiw0NDYuMiwzODkuNyw0NDMuNiwzODcuMXpcIi8+XG5cdDwvc3ZnPmBcbik7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcblx0YXJyb3dMZWZ0OiByZXF1aXJlKCcuL2Fycm93TGVmdCcpLFxuXHRhcnJvd1JpZ2h0OiByZXF1aXJlKCcuL2Fycm93UmlnaHQnKSxcblx0Y2xvc2U6IHJlcXVpcmUoJy4vY2xvc2UnKSxcbn07XG4iLCIvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIFRIRU1FXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuY29uc3QgdGhlbWUgPSB7fTtcblxuLy8gY29udGFpbmVyXG50aGVtZS5jb250YWluZXIgPSB7XG5cdGJhY2tncm91bmQ6ICdyZ2JhKDAsIDAsIDAsIDAuOCknLFxuXHRndXR0ZXI6IHtcblx0XHRob3Jpem9udGFsOiAxMCxcblx0XHR2ZXJ0aWNhbDogMTAsXG5cdH0sXG5cdHpJbmRleDogMjAwMSxcbn07XG5cbi8vIGhlYWRlclxudGhlbWUuaGVhZGVyID0ge1xuXHRoZWlnaHQ6IDQwLFxufTtcbnRoZW1lLmNsb3NlID0ge1xuXHRmaWxsOiAnd2hpdGUnLFxuXHRoZWlnaHQ6IDIwLFxuXHR3aWR0aDogMjAsXG59O1xuXG4vLyBmb290ZXJcbnRoZW1lLmZvb3RlciA9IHtcblx0Y29sb3I6ICd3aGl0ZScsXG5cdGNvdW50OiB7XG5cdFx0Y29sb3I6ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNzUpJyxcblx0XHRmb250U2l6ZTogJzAuODVlbScsXG5cdH0sXG5cdGhlaWdodDogNDAsXG5cdGd1dHRlcjoge1xuXHRcdGhvcml6b250YWw6IDAsXG5cdFx0dmVydGljYWw6IDUsXG5cdH0sXG59O1xuXG4vLyB0aHVtYm5haWxzXG50aGVtZS50aHVtYm5haWwgPSB7XG5cdGFjdGl2ZUJvcmRlckNvbG9yOiAnd2hpdGUnLFxuXHRzaXplOiA1MCxcblx0Z3V0dGVyOiAyLFxufTtcblxuLy8gYXJyb3dcbnRoZW1lLmFycm93ID0ge1xuXHRiYWNrZ3JvdW5kOiAnYmxhY2snLFxuXHRmaWxsOiAnd2hpdGUnLFxuXHRoZWlnaHQ6IDEyMCxcbn07XG5cblxubW9kdWxlLmV4cG9ydHMgPSB0aGVtZTtcbiIsIi8qKlxuXHRCaW5kIG11bHRpcGxlIGNvbXBvbmVudCBtZXRob2RzOlxuXG5cdCogQHBhcmFtIHt0aGlzfSBjb250ZXh0XG5cdCogQHBhcmFtIHtBcnJheX0gZnVuY3Rpb25zXG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0Li4uXG5cdFx0YmluZEZ1bmN0aW9ucy5jYWxsKHRoaXMsIFsnaGFuZGxlQ2xpY2snLCAnaGFuZGxlT3RoZXInXSk7XG5cdH1cbiovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYmluZEZ1bmN0aW9ucyAoZnVuY3Rpb25zKSB7XG5cdGZ1bmN0aW9ucy5mb3JFYWNoKGYgPT4gKHRoaXNbZl0gPSB0aGlzW2ZdLmJpbmQodGhpcykpKTtcbn07XG4iLCIvLyBSZXR1cm4gdHJ1ZSBpZiB3aW5kb3cgKyBkb2N1bWVudFxuXG5tb2R1bGUuZXhwb3J0cyA9ICEhKFxuXHR0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuXHQmJiB3aW5kb3cuZG9jdW1lbnRcblx0JiYgd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnRcbik7XG4iLCJmdW5jdGlvbiBkZWVwTWVyZ2UgKHRhcmdldCwgc291cmNlID0ge30pIHtcblx0Y29uc3QgZXh0ZW5kZWQgPSBPYmplY3QuYXNzaWduKHt9LCB0YXJnZXQpO1xuXG5cdE9iamVjdC5rZXlzKHNvdXJjZSkuZm9yRWFjaCgoa2V5KSA9PiB7XG5cdFx0aWYgKHR5cGVvZiBzb3VyY2Vba2V5XSAhPT0gJ29iamVjdCcgfHwgIXNvdXJjZVtrZXldKSB7XG5cdFx0XHRleHRlbmRlZFtrZXldID0gc291cmNlW2tleV07XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmICghdGFyZ2V0W2tleV0pIHtcblx0XHRcdFx0ZXh0ZW5kZWRba2V5XSA9IHNvdXJjZVtrZXldO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZXh0ZW5kZWRba2V5XSA9IGRlZXBNZXJnZSh0YXJnZXRba2V5XSwgc291cmNlW2tleV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG5cblx0cmV0dXJuIGV4dGVuZGVkO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRlZXBNZXJnZTtcbiIsImltcG9ydCBiaW5kRnVuY3Rpb25zIGZyb20gJy4vYmluZEZ1bmN0aW9ucyc7XG5pbXBvcnQgY2FuVXNlRG9tIGZyb20gJy4vY2FuVXNlRG9tJztcbmltcG9ydCBkZWVwTWVyZ2UgZnJvbSAnLi9kZWVwTWVyZ2UnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0YmluZEZ1bmN0aW9ucyxcblx0Y2FuVXNlRG9tLFxuXHRkZWVwTWVyZ2UsXG59O1xuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY3NzLCBTdHlsZVNoZWV0IH0gZnJvbSAnYXBocm9kaXRlL25vLWltcG9ydGFudCc7XG5pbXBvcnQgU3dpcGVhYmxlIGZyb20gJ3JlYWN0LXN3aXBlYWJsZSc7XG5pbXBvcnQge01vdGlvbiwgc3ByaW5nfSBmcm9tICdyZWFjdC1tb3Rpb24nO1xuXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi90aGVtZSc7XG5pbXBvcnQgQXJyb3cgZnJvbSAnLi9jb21wb25lbnRzL0Fycm93JztcbmltcG9ydCBDb250YWluZXIgZnJvbSAnLi9jb21wb25lbnRzL0NvbnRhaW5lcic7XG5pbXBvcnQgRm9vdGVyIGZyb20gJy4vY29tcG9uZW50cy9Gb290ZXInO1xuaW1wb3J0IEhlYWRlciBmcm9tICcuL2NvbXBvbmVudHMvSGVhZGVyJztcbmltcG9ydCBQYWdpbmF0ZWRUaHVtYm5haWxzIGZyb20gJy4vY29tcG9uZW50cy9QYWdpbmF0ZWRUaHVtYm5haWxzJztcbmltcG9ydCBQb3J0YWwgZnJvbSAnLi9jb21wb25lbnRzL1BvcnRhbCc7XG5pbXBvcnQgU2Nyb2xsTG9jayBmcm9tICcuL2NvbXBvbmVudHMvU2Nyb2xsTG9jayc7XG5cbmltcG9ydCB7IGJpbmRGdW5jdGlvbnMsIGNhblVzZURvbSB9IGZyb20gJy4vdXRpbHMnO1xuXG5jbGFzcyBMaWdodGJveCBleHRlbmRzIENvbXBvbmVudCB7XG5cdGNvbnN0cnVjdG9yICgpIHtcblx0XHRzdXBlcigpO1xuXG5cdFx0dGhpcy5zdGF0ZSA9IHtcblx0XHRcdHN3aXBlRGVsdGFYOiAwXG5cdFx0fVxuXG5cdFx0YmluZEZ1bmN0aW9ucy5jYWxsKHRoaXMsIFtcbiAgICAgICdvbkNsb3NlJyxcblx0XHRcdCdnb3RvTmV4dCcsXG5cdFx0XHQnZ290b1ByZXYnLFxuXHRcdFx0J29uU3dpcGluZycsXG5cdFx0XHQnb25TdG9wU3dpcGluZycsXG5cdFx0XHQnaGFuZGxlS2V5Ym9hcmRJbnB1dCcsXG5cdFx0XSk7XG5cdH1cblx0Z2V0Q2hpbGRDb250ZXh0ICgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0dGhlbWU6IHRoaXMucHJvcHMudGhlbWUsXG5cdFx0fTtcblx0fVxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIChuZXh0UHJvcHMpIHtcblx0XHRpZiAoIWNhblVzZURvbSkgcmV0dXJuO1xuXG5cdFx0aWYgKG5leHRQcm9wcy5jdXJyZW50SW1hZ2UgIT09IHRoaXMucHJvcHMuY3VycmVudEltYWdlKSB7XG5cdFx0XHR0aGlzLnJlc2V0U3dpcGUoKTtcblx0XHR9XG5cblx0XHQvLyBwcmVsb2FkIGltYWdlc1xuXHRcdGlmIChuZXh0UHJvcHMucHJlbG9hZE5leHRJbWFnZSkge1xuXHRcdFx0Y29uc3QgY3VycmVudEluZGV4ID0gdGhpcy5wcm9wcy5jdXJyZW50SW1hZ2U7XG5cdFx0XHRjb25zdCBuZXh0SW5kZXggPSBuZXh0UHJvcHMuY3VycmVudEltYWdlICsgMTtcblx0XHRcdGNvbnN0IHByZXZJbmRleCA9IG5leHRQcm9wcy5jdXJyZW50SW1hZ2UgLSAxO1xuXHRcdFx0bGV0IHByZWxvYWRJbmRleDtcblxuXHRcdFx0aWYgKGN1cnJlbnRJbmRleCAmJiBuZXh0UHJvcHMuY3VycmVudEltYWdlID4gY3VycmVudEluZGV4KSB7XG5cdFx0XHRcdHByZWxvYWRJbmRleCA9IG5leHRJbmRleDtcblx0XHRcdH0gZWxzZSBpZiAoY3VycmVudEluZGV4ICYmIG5leHRQcm9wcy5jdXJyZW50SW1hZ2UgPCBjdXJyZW50SW5kZXgpIHtcblx0XHRcdFx0cHJlbG9hZEluZGV4ID0gcHJldkluZGV4O1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBpZiB3ZSBrbm93IHRoZSB1c2VyJ3MgZGlyZWN0aW9uIGp1c3QgZ2V0IG9uZSBpbWFnZVxuXHRcdFx0Ly8gb3RoZXJ3aXNlLCB0byBiZSBzYWZlLCB3ZSBuZWVkIHRvIGdyYWIgb25lIGluIGVhY2ggZGlyZWN0aW9uXG5cdFx0XHRpZiAocHJlbG9hZEluZGV4KSB7XG5cdFx0XHRcdHRoaXMucHJlbG9hZEltYWdlKHByZWxvYWRJbmRleCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLnByZWxvYWRJbWFnZShwcmV2SW5kZXgpO1xuXHRcdFx0XHR0aGlzLnByZWxvYWRJbWFnZShuZXh0SW5kZXgpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIGFkZCBldmVudCBsaXN0ZW5lcnNcblx0XHRpZiAobmV4dFByb3BzLmVuYWJsZUtleWJvYXJkSW5wdXQpIHtcblx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5oYW5kbGVLZXlib2FyZElucHV0KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmhhbmRsZUtleWJvYXJkSW5wdXQpO1xuXHRcdH1cblx0fVxuXHRjb21wb25lbnRXaWxsVW5tb3VudCAoKSB7XG5cdFx0aWYgKHRoaXMucHJvcHMuZW5hYmxlS2V5Ym9hcmRJbnB1dCkge1xuXHRcdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmhhbmRsZUtleWJvYXJkSW5wdXQpO1xuXHRcdH1cblx0fVxuXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHQvLyBNRVRIT0RTXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cdHByZWxvYWRJbWFnZSAoaWR4KSB7XG5cdFx0Y29uc3QgaW1hZ2UgPSB0aGlzLnByb3BzLmltYWdlc1tpZHhdO1xuXG5cdFx0aWYgKCFpbWFnZSkgcmV0dXJuO1xuXG5cdFx0Y29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG5cblx0XHRpbWcuc3JjID0gaW1hZ2Uuc3JjO1xuXG5cdFx0aWYgKGltYWdlLnNyY3NldCkge1xuXHRcdFx0aW1nLnNyY3NldCA9IGltYWdlLnNyY3NldC5qb2luKCk7XG5cdFx0fVxuXHR9XG4gIG9uQ2xvc2UgKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICAgIHRoaXMucmVzZXRTd2lwZSgpO1xuICAgIHRoaXMucHJvcHMub25DbG9zZSgpO1xuICB9XG5cdGdvdG9OZXh0IChldmVudCkge1xuXHRcdGlmICh0aGlzLmlzTGFzdEltYWdlKCkpIHJldHVybjtcblx0XHRpZiAoZXZlbnQpIHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHR9XG5cdFx0dGhpcy5wcm9wcy5vbkNsaWNrTmV4dCgpO1xuXG5cdH1cblx0Z290b1ByZXYgKGV2ZW50KSB7XG5cdFx0aWYgKHRoaXMuaXNGaXJzdEltYWdlKCkpIHJldHVybjtcblx0XHRpZiAoZXZlbnQpIHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHR9XG5cdFx0dGhpcy5wcm9wcy5vbkNsaWNrUHJldigpO1xuXG5cdH1cblx0aGFuZGxlS2V5Ym9hcmRJbnB1dCAoZXZlbnQpIHtcblx0XHRpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzcpIHtcblx0XHRcdHRoaXMuZ290b1ByZXYoZXZlbnQpO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSBlbHNlIGlmIChldmVudC5rZXlDb2RlID09PSAzOSkge1xuXHRcdFx0dGhpcy5nb3RvTmV4dChldmVudCk7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9IGVsc2UgaWYgKGV2ZW50LmtleUNvZGUgPT09IDI3KSB7XG5cdFx0XHR0aGlzLm9uQ2xvc2UoKTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cblx0fVxuXHRvblN3aXBpbmcgKGV2ZW50LCBkZWx0YVgsIGRlbHRhWSwgYWJzWCwgYWJzWSwgdmVsb2NpdHkpIHtcblx0XHRpZiAoICh0aGlzLmlzRmlyc3RJbWFnZSgpICYmIGRlbHRhWCA8IDApIHx8ICh0aGlzLmlzTGFzdEltYWdlKCkgJiYgZGVsdGFYID4gMCkgKSByZXR1cm47XG4gICAgY29uc29sZS5sb2coJ2RlbHRhWCAnICsgZGVsdGFYICsgJyAgdmVsb2NpdHkgJyArIHZlbG9jaXR5KTtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdHN3aXBlRGVsdGFYOiAtZGVsdGFYXG5cdFx0fSk7XG5cblx0fVxuXHRvblN0b3BTd2lwaW5nIChldmVudCwgeCwgeSwgaXNGbGljaywgdmVsb2NpdHkpIHtcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICBjb25zdCBxdWlja1N3aXBlID0gdmVsb2NpdHkgPiAwLjcgJiYgTWF0aC5hYnModGhpcy5zdGF0ZS5zd2lwZURlbHRhWCkgPiB3aW5kb3cuaW5uZXJXaWR0aCAqIDAuMztcblxuICAgIGNvbnN0IHN0YXlBdEN1cnJlbnRJbWFnZSA9ICFxdWlja1N3aXBlICYmIE1hdGguYWJzKHRoaXMuc3RhdGUuc3dpcGVEZWx0YVgpIDwgd2luZG93LmlubmVyV2lkdGggKiAwLjU7XG4gICAgaWYgKHN0YXlBdEN1cnJlbnRJbWFnZSkge1xuICAgICAgdGhpcy5yZXNldFN3aXBlKCk7XG4gICAgfWVsc2UgaWYgKHRoaXMuc3RhdGUuc3dpcGVEZWx0YVggPCAwKSB7XG4gICAgICB0aGlzLmdvdG9OZXh0KCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnN0YXRlLnN3aXBlRGVsdGFYID4gMCkge1xuICAgICAgdGhpcy5nb3RvUHJldigpO1xuICAgIH1cblxuXHR9XG4gIHJlc2V0U3dpcGUgKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc3dpcGVEZWx0YVg6IDBcbiAgICB9KVxuICB9XG5cblx0aXNGaXJzdEltYWdlKCkge1xuXHRcdHJldHVybiB0aGlzLnByb3BzLmN1cnJlbnRJbWFnZSA9PT0gMDtcblxuXHR9XG5cdGlzTGFzdEltYWdlICgpIHtcblx0XHRyZXR1cm4gdGhpcy5wcm9wcy5jdXJyZW50SW1hZ2UgPT09ICh0aGlzLnByb3BzLmltYWdlcy5sZW5ndGggLSAxKTtcblxuXHR9XG4gIGlzSW1hZ2VWaXNpYmxlIChpbWFnZUluZGV4LCBkZWx0YVhXaXRoQ29udGFpbmVyUGFkZGluZykge1xuICAgIGNvbnN0IGNvbnRhaW5lclBhZGRpbmcgPSB0aGVtZS5jb250YWluZXIuZ3V0dGVyLmhvcml6b250YWw7XG4gICAgY29uc3QgbWFyZ2luTGVmdCA9IE1hdGguYWJzKGRlbHRhWFdpdGhDb250YWluZXJQYWRkaW5nKSAtIGNvbnRhaW5lclBhZGRpbmc7XG4gICAgY29uc3QgdmlzaWJsZUluZGV4ID0gTWF0aC5mbG9vcihtYXJnaW5MZWZ0IC8gd2luZG93LmlubmVyV2lkdGgpO1xuICAgIGlmICh2aXNpYmxlSW5kZXggPT09IGltYWdlSW5kZXgpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGNvbnN0IGlzTmV4dEltYWdlVmlzaWJsZSA9IG1hcmdpbkxlZnQgLSB2aXNpYmxlSW5kZXggKiB3aW5kb3cuaW5uZXJXaWR0aCA+IDA7XG4gICAgaWYgKGlzTmV4dEltYWdlVmlzaWJsZSAmJiBpbWFnZUluZGV4ID09PSB2aXNpYmxlSW5kZXggKyAxKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHQvLyBSRU5ERVJFUlNcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblx0cmVuZGVyQXJyb3dQcmV2ICgpIHtcblx0XHRpZiAodGhpcy5wcm9wcy5jdXJyZW50SW1hZ2UgPT09IDApIHJldHVybiBudWxsO1xuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxBcnJvd1xuXHRcdFx0XHRkaXJlY3Rpb249XCJsZWZ0XCJcblx0XHRcdFx0aWNvbj1cImFycm93TGVmdFwiXG5cdFx0XHRcdG9uQ2xpY2s9e3RoaXMuZ290b1ByZXZ9XG5cdFx0XHRcdHRpdGxlPVwiUHJldmlvdXMgKExlZnQgYXJyb3cga2V5KVwiXG5cdFx0XHRcdHR5cGU9XCJidXR0b25cIlxuXHRcdFx0Lz5cblx0XHQpO1xuXHR9XG5cdHJlbmRlckFycm93TmV4dCAoKSB7XG5cdFx0aWYgKHRoaXMucHJvcHMuY3VycmVudEltYWdlID09PSAodGhpcy5wcm9wcy5pbWFnZXMubGVuZ3RoIC0gMSkpIHJldHVybiBudWxsO1xuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxBcnJvd1xuXHRcdFx0XHRkaXJlY3Rpb249XCJyaWdodFwiXG5cdFx0XHRcdGljb249XCJhcnJvd1JpZ2h0XCJcblx0XHRcdFx0b25DbGljaz17dGhpcy5nb3RvTmV4dH1cblx0XHRcdFx0dGl0bGU9XCJQcmV2aW91cyAoUmlnaHQgYXJyb3cga2V5KVwiXG5cdFx0XHRcdHR5cGU9XCJidXR0b25cIlxuXHRcdFx0Lz5cblx0XHQpO1xuXHR9XG5cdHJlbmRlckRpYWxvZyAoKSB7XG5cdFx0Y29uc3Qge1xuXHRcdFx0YmFja2Ryb3BDbG9zZXNNb2RhbCxcbiAgICAgIGN1cnJlbnRJbWFnZSxcbiAgICAgIGN1c3RvbUNvbnRyb2xzLFxuXHRcdFx0aXNPcGVuLFxuXHRcdFx0c2hvd0Nsb3NlQnV0dG9uLFxuXHRcdFx0c2hvd1RodW1ibmFpbHMsXG5cdFx0XHR3aWR0aCxcbiAgICAgIGltYWdlcyxcblx0XHR9ID0gdGhpcy5wcm9wcztcblxuXHRcdGlmICghaXNPcGVuKSByZXR1cm4gPHNwYW4ga2V5PVwiY2xvc2VkXCIgLz47XG5cblx0XHRsZXQgb2Zmc2V0VGh1bWJuYWlscyA9IDA7XG5cdFx0aWYgKHNob3dUaHVtYm5haWxzKSB7XG5cdFx0XHRvZmZzZXRUaHVtYm5haWxzID0gdGhlbWUudGh1bWJuYWlsLnNpemUgKyB0aGVtZS5jb250YWluZXIuZ3V0dGVyLnZlcnRpY2FsO1xuXHRcdH1cblxuICAgIGNvbnN0IGhvcml6b250YWxQYWRkaW5nID0gdGhlbWUuY29udGFpbmVyLmd1dHRlci5ob3Jpem9udGFsO1xuXG4gICAgY29uc3Qgc3ByaW5nQ29uZmlnID0geyBzdGlmZm5lc3M6IDMwMCwgZGFtcGluZzogMzAgfTtcbiAgICBjb25zdCBzd2lwZURlbHRhWCA9IHRoaXMuc3RhdGUuc3dpcGVEZWx0YVg7XG4gICAgY29uc3QgbW90aW9uU3R5bGUgPSB7IGRlbHRhWDogc3ByaW5nKC1jdXJyZW50SW1hZ2UgKiB3aW5kb3cuaW5uZXJXaWR0aCAtIGhvcml6b250YWxQYWRkaW5nICsgc3dpcGVEZWx0YVgsIHNwcmluZ0NvbmZpZykgfTtcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8Q29udGFpbmVyXG5cdFx0XHRcdGtleT1cIm9wZW5cIlxuXHRcdFx0XHRvbkNsaWNrPXshIWJhY2tkcm9wQ2xvc2VzTW9kYWwgJiYgdGhpcy5vbkNsb3NlfVxuXHRcdFx0XHRvblRvdWNoRW5kPXshIWJhY2tkcm9wQ2xvc2VzTW9kYWwgJiYgdGhpcy5vbkNsb3NlfVxuXHRcdFx0PlxuICAgICAgICA8U3dpcGVhYmxlXG4gICAgICAgICAgY2xhc3NOYW1lPXtjc3MoY2xhc3Nlcy5zd2lwZWFibGUpfVxuICAgICAgICAgIG9uU3dpcGVkPXt0aGlzLm9uU3RvcFN3aXBpbmd9XG4gICAgICAgICAgb25Td2lwaW5nPXt0aGlzLm9uU3dpcGluZ31cbiAgICAgICAgPlxuICAgICAgICAgIDxNb3Rpb24gc3R5bGU9e21vdGlvblN0eWxlfT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgKHsgZGVsdGFYIH0pID0+IChcbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NzcyhjbGFzc2VzLnN3aXBlQ29udGFpbmVyKX1cbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCAqIGltYWdlcy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZSgke2RlbHRhWH1weCwgMClgLFxuICAgICAgICAgICAgICAgICAgICBXZWJraXRUcmFuc2Zvcm06IGB0cmFuc2xhdGUoJHtkZWx0YVh9cHgsIDApYFxuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGltYWdlcy5tYXAoKGltYWdlLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NzcyhjbGFzc2VzLmNvbnRlbnRDb250YWluZXIpfVxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgd2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLCBwYWRkaW5nTGVmdDogaG9yaXpvbnRhbFBhZGRpbmcsIHBhZGRpbmdSaWdodDogaG9yaXpvbnRhbFBhZGRpbmcgfX1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y3NzKGNsYXNzZXMuY29udGVudCl9IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogb2Zmc2V0VGh1bWJuYWlscywgbWF4V2lkdGg6IHdpZHRoIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8SGVhZGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ29udHJvbHM9e2N1c3RvbUNvbnRyb2xzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xvc2U9e3RoaXMub25DbG9zZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93Q2xvc2VCdXR0b249e3Nob3dDbG9zZUJ1dHRvbn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVySW1hZ2UoeyBpbWFnZSwgaXNWaXNpYmxlOiB0aGlzLmlzSW1hZ2VWaXNpYmxlKGluZGV4LCBkZWx0YVgpIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICkpXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICA8L01vdGlvbj5cbiAgICAgICAgPC9Td2lwZWFibGU+XG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicgfX0+XG4gICAgICAgICAge3RoaXMucmVuZGVyVGh1bWJuYWlscygpfVxuICAgICAgICAgIHt0aGlzLnJlbmRlckFycm93UHJldigpfVxuICAgICAgICAgIHt0aGlzLnJlbmRlckFycm93TmV4dCgpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPFNjcm9sbExvY2sgLz5cblx0XHRcdDwvQ29udGFpbmVyPlxuXHRcdCk7XG5cdH1cblx0cmVuZGVySW1hZ2UgKHsgaW1hZ2UsIGlzVmlzaWJsZSB9KSB7XG5cdFx0Y29uc3Qge1xuXHRcdFx0Y3VycmVudEltYWdlLFxuXHRcdFx0aW1hZ2VzLFxuXHRcdFx0aW1hZ2VDb3VudFNlcGFyYXRvcixcblx0XHRcdG9uQ2xpY2tJbWFnZSxcblx0XHRcdHNob3dJbWFnZUNvdW50LFxuXHRcdFx0c2hvd1RodW1ibmFpbHMsXG5cdFx0fSA9IHRoaXMucHJvcHM7XG5cblx0XHRpZiAoIWltYWdlcyB8fCAhaW1hZ2VzLmxlbmd0aCkgcmV0dXJuIG51bGw7XG5cblx0XHQvL2NvbnN0IGltYWdlID0gaW1hZ2VzW2N1cnJlbnRJbWFnZV07XG5cblx0XHRsZXQgc3Jjc2V0O1xuXHRcdGxldCBzaXplcztcblxuXHRcdGlmIChpbWFnZS5zcmNzZXQpIHtcblx0XHRcdHNyY3NldCA9IGltYWdlLnNyY3NldC5qb2luKCk7XG5cdFx0XHRzaXplcyA9ICcxMDB2dyc7XG5cdFx0fVxuXG5cdFx0Y29uc3QgdGh1bWJuYWlsc1NpemUgPSBzaG93VGh1bWJuYWlscyA/IHRoZW1lLnRodW1ibmFpbC5zaXplIDogMDtcblx0XHRjb25zdCBoZWlnaHRPZmZzZXQgPSBgJHt0aGVtZS5oZWFkZXIuaGVpZ2h0ICsgdGhlbWUuZm9vdGVyLmhlaWdodCArIHRodW1ibmFpbHNTaXplICsgKHRoZW1lLmNvbnRhaW5lci5ndXR0ZXIudmVydGljYWwpfXB4YDtcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZmlndXJlIGNsYXNzTmFtZT17Y3NzKGNsYXNzZXMuZmlndXJlKX0+XG5cdFx0XHRcdDxpbWdcblx0XHRcdFx0XHRjbGFzc05hbWU9e2NzcyhjbGFzc2VzLmltYWdlKX1cblx0XHRcdFx0XHRvbkNsaWNrPXshIW9uQ2xpY2tJbWFnZSAmJiBvbkNsaWNrSW1hZ2V9XG5cdFx0XHRcdFx0c2l6ZXM9e3NpemVzfVxuXHRcdFx0XHRcdHNyYz17aXNWaXNpYmxlID8gaW1hZ2Uuc3JjIDogbnVsbH1cblx0XHRcdFx0XHRzcmNTZXQ9e2lzVmlzaWJsZSA/IHNyY3NldCA6IG51bGx9XG5cdFx0XHRcdFx0c3R5bGU9e3tcblx0XHRcdFx0XHRcdGN1cnNvcjogdGhpcy5wcm9wcy5vbkNsaWNrSW1hZ2UgPyAncG9pbnRlcicgOiAnYXV0bycsXG5cdFx0XHRcdFx0XHRtYXhIZWlnaHQ6IGBjYWxjKDEwMHZoIC0gJHtoZWlnaHRPZmZzZXR9KWAsXG5cdFx0XHRcdFx0fX1cblx0XHRcdFx0Lz5cblx0XHRcdFx0PEZvb3RlclxuXHRcdFx0XHRcdGNhcHRpb249e2ltYWdlc1tjdXJyZW50SW1hZ2VdLmNhcHRpb259XG5cdFx0XHRcdFx0Y291bnRDdXJyZW50PXtjdXJyZW50SW1hZ2UgKyAxfVxuXHRcdFx0XHRcdGNvdW50U2VwYXJhdG9yPXtpbWFnZUNvdW50U2VwYXJhdG9yfVxuXHRcdFx0XHRcdGNvdW50VG90YWw9e2ltYWdlcy5sZW5ndGh9XG5cdFx0XHRcdFx0c2hvd0NvdW50PXtzaG93SW1hZ2VDb3VudH1cblx0XHRcdFx0Lz5cblx0XHRcdDwvZmlndXJlPlxuXHRcdCk7XG5cdH1cblx0cmVuZGVyVGh1bWJuYWlscyAoKSB7XG5cdFx0Y29uc3QgeyBpbWFnZXMsIGN1cnJlbnRJbWFnZSwgb25DbGlja1RodW1ibmFpbCwgc2hvd1RodW1ibmFpbHMsIHRodW1ibmFpbE9mZnNldCB9ID0gdGhpcy5wcm9wcztcblxuXHRcdGlmICghc2hvd1RodW1ibmFpbHMpIHJldHVybjtcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8UGFnaW5hdGVkVGh1bWJuYWlsc1xuXHRcdFx0XHRjdXJyZW50SW1hZ2U9e2N1cnJlbnRJbWFnZX1cblx0XHRcdFx0aW1hZ2VzPXtpbWFnZXN9XG5cdFx0XHRcdG9mZnNldD17dGh1bWJuYWlsT2Zmc2V0fVxuXHRcdFx0XHRvbkNsaWNrVGh1bWJuYWlsPXtvbkNsaWNrVGh1bWJuYWlsfVxuXHRcdFx0Lz5cblx0XHQpO1xuXHR9XG5cdHJlbmRlciAoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxQb3J0YWw+XG5cdFx0XHRcdHt0aGlzLnJlbmRlckRpYWxvZygpfVxuXHRcdFx0PC9Qb3J0YWw+XG5cdFx0KTtcblx0fVxufVxuXG5MaWdodGJveC5wcm9wVHlwZXMgPSB7XG5cdGJhY2tkcm9wQ2xvc2VzTW9kYWw6IFByb3BUeXBlcy5ib29sLFxuXHRjdXJyZW50SW1hZ2U6IFByb3BUeXBlcy5udW1iZXIsXG5cdGN1c3RvbUNvbnRyb2xzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMubm9kZSksXG5cdGVuYWJsZUtleWJvYXJkSW5wdXQ6IFByb3BUeXBlcy5ib29sLFxuXHRpbWFnZUNvdW50U2VwYXJhdG9yOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRpbWFnZXM6IFByb3BUeXBlcy5hcnJheU9mKFxuXHRcdFByb3BUeXBlcy5zaGFwZSh7XG5cdFx0XHRzcmM6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcblx0XHRcdHNyY3NldDogUHJvcFR5cGVzLmFycmF5LFxuXHRcdFx0Y2FwdGlvbjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcblx0XHRcdHRodW1ibmFpbDogUHJvcFR5cGVzLnN0cmluZyxcblx0XHR9KVxuXHQpLmlzUmVxdWlyZWQsXG5cdGlzT3BlbjogUHJvcFR5cGVzLmJvb2wsXG5cdG9uQ2xpY2tJbWFnZTogUHJvcFR5cGVzLmZ1bmMsXG5cdG9uQ2xpY2tOZXh0OiBQcm9wVHlwZXMuZnVuYyxcblx0b25DbGlja1ByZXY6IFByb3BUeXBlcy5mdW5jLFxuXHRvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuXHRwcmVsb2FkTmV4dEltYWdlOiBQcm9wVHlwZXMuYm9vbCxcblx0c2hlZXQ6IFByb3BUeXBlcy5vYmplY3QsXG5cdHNob3dDbG9zZUJ1dHRvbjogUHJvcFR5cGVzLmJvb2wsXG5cdHNob3dJbWFnZUNvdW50OiBQcm9wVHlwZXMuYm9vbCxcblx0c2hvd1RodW1ibmFpbHM6IFByb3BUeXBlcy5ib29sLFxuXHR0aGVtZTogUHJvcFR5cGVzLm9iamVjdCxcblx0dGh1bWJuYWlsT2Zmc2V0OiBQcm9wVHlwZXMubnVtYmVyLFxuXHR3aWR0aDogUHJvcFR5cGVzLm51bWJlcixcbn07XG5MaWdodGJveC5kZWZhdWx0UHJvcHMgPSB7XG5cdGN1cnJlbnRJbWFnZTogMCxcblx0ZW5hYmxlS2V5Ym9hcmRJbnB1dDogdHJ1ZSxcblx0aW1hZ2VDb3VudFNlcGFyYXRvcjogJyBvZiAnLFxuXHRvbkNsaWNrU2hvd05leHRJbWFnZTogdHJ1ZSxcblx0cHJlbG9hZE5leHRJbWFnZTogdHJ1ZSxcblx0c2hvd0Nsb3NlQnV0dG9uOiB0cnVlLFxuXHRzaG93SW1hZ2VDb3VudDogdHJ1ZSxcblx0dGhlbWU6IHt9LFxuXHR0aHVtYm5haWxPZmZzZXQ6IDIsXG5cdHdpZHRoOiAxMDI0LFxufTtcbkxpZ2h0Ym94LmNoaWxkQ29udGV4dFR5cGVzID0ge1xuXHR0aGVtZTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxufTtcblxuY29uc3QgY2xhc3NlcyA9IFN0eWxlU2hlZXQuY3JlYXRlKHtcbiAgc3dpcGVhYmxlOiB7XG4gICAgaGVpZ2h0OiAnMTAwJSdcbiAgfSxcbiAgc3dpcGVDb250YWluZXI6IHtcbiAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgd2lsbENoYW5nZTogJ3RyYW5zZm9ybSdcbiAgfSxcbiAgY29udGVudENvbnRhaW5lcjoge1xuICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG4gICAgYWxpZ25TZWxmOiAnY2VudGVyJ1xuICB9LFxuICBjb250ZW50OiB7XG5cdFx0cG9zaXRpb246ICdyZWxhdGl2ZScsXG5cdH0sXG5cdGZpZ3VyZToge1xuXHRcdG1hcmdpbjogMCwgLy8gcmVtb3ZlIGJyb3dzZXIgZGVmYXVsdFxuXHR9LFxuXHRpbWFnZToge1xuXHRcdGRpc3BsYXk6ICdibG9jaycsIC8vIHJlbW92ZXMgYnJvd3NlciBkZWZhdWx0IGd1dHRlclxuXHRcdGhlaWdodDogJ2F1dG8nLFxuXHRcdG1hcmdpbjogJzAgYXV0bycsIC8vIG1haW50YWluIGNlbnRlciBvbiB2ZXJ5IHNob3J0IHNjcmVlbnMgT1IgdmVyeSBuYXJyb3cgaW1hZ2Vcblx0XHRtYXhXaWR0aDogJzEwMCUnLFxuXG5cdFx0Ly8gZGlzYWJsZSB1c2VyIHNlbGVjdFxuXHRcdFdlYmtpdFRvdWNoQ2FsbG91dDogJ25vbmUnLFxuXHRcdHVzZXJTZWxlY3Q6ICdub25lJyxcblx0fSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBMaWdodGJveDtcbiJdfQ==
