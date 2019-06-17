'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSource = getSource;
exports.getThumbnail = getThumbnail;
function getSource(_ref) {
  var data = _ref.data,
      isFullscreen = _ref.isFullscreen;
  var _data$source = data.source,
      source = _data$source === undefined ? data.src : _data$source;

  if (typeof source === 'string') return source;

  return isFullscreen ? source.fullscreen : source.regular;
}

function getThumbnail(_ref2) {
  var data = _ref2.data;
  var source = data.source;


  if (typeof source === 'string') return source;

  return source.thumbnail;
}