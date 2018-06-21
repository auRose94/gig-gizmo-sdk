"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _propTypes.default.shape({
  _id: _propTypes.default.string.isRequired,
  dateCreated: _propTypes.default.object.isRequired,
  dateModified: _propTypes.default.object.isRequired,
  users: _propTypes.default.arrayOf(_propTypes.default.string.isRequired),
  events: _propTypes.default.arrayOf(_propTypes.default.shape({
    user: _propTypes.default.string.isRequired,
    message: _propTypes.default.string.isRequired,
    dateTimePosted: _propTypes.default.string.isRequired
  }))
});

exports.default = _default;