(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["prop-types"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("prop-types"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.propTypes);
    global.Band = mod.exports;
  }
})(this, function (_propTypes) {
  "use strict";

  _propTypes = _interopRequireDefault(_propTypes);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  module.exports = _propTypes.default.shape({
    _id: _propTypes.default.string.isRequired,
    dateCreated: _propTypes.default.object.isRequired,
    dateModified: _propTypes.default.object.isRequired,
    name: _propTypes.default.string.isRequired,
    website: _propTypes.default.string,
    email: _propTypes.default.string,
    cityName: _propTypes.default.string,
    cityPlaceID: _propTypes.default.string,
    description: _propTypes.default.string,
    icon: _propTypes.default.string,
    photos: _propTypes.default.arrayOf(_propTypes.default.string),
    owners: _propTypes.default.arrayOf(_propTypes.default.string),
    facebook: _propTypes.default.string,
    twitter: _propTypes.default.string,
    google: _propTypes.default.string,
    metadata: _propTypes.default.string,
    facebookPageId: _propTypes.default.string,
    facebookPageName: _propTypes.default.string,
    facebookPageToken: _propTypes.default.string
  });
});