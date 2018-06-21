(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "@babel/runtime/core-js/symbol/iterator", "@babel/runtime/core-js/symbol", "@babel/runtime/core-js/object/define-property", "@babel/runtime/core-js/object/get-prototype-of", "@babel/runtime/core-js/object/create", "@babel/runtime/core-js/object/set-prototype-of", "@babel/runtime/core-js/promise", "@babel/runtime/regenerator", "@babel/runtime/core-js/object/assign", "regenerator-runtime/runtime", "./API", "./RESTModel"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("@babel/runtime/core-js/symbol/iterator"), require("@babel/runtime/core-js/symbol"), require("@babel/runtime/core-js/object/define-property"), require("@babel/runtime/core-js/object/get-prototype-of"), require("@babel/runtime/core-js/object/create"), require("@babel/runtime/core-js/object/set-prototype-of"), require("@babel/runtime/core-js/promise"), require("@babel/runtime/regenerator"), require("@babel/runtime/core-js/object/assign"), require("regenerator-runtime/runtime"), require("./API"), require("./RESTModel"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.iterator, global.symbol, global.defineProperty, global.getPrototypeOf, global.create, global.setPrototypeOf, global.promise, global.regenerator, global.assign, global.runtime, global.API, global.RESTModel);
    global.Request = mod.exports;
  }
})(this, function (_exports, _iterator, _symbol, _defineProperty2, _getPrototypeOf2, _create, _setPrototypeOf2, _promise, _regenerator, _assign, _runtime, _API, _RESTModel2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _iterator = _interopRequireDefault(_iterator);
  _symbol = _interopRequireDefault(_symbol);
  _defineProperty2 = _interopRequireDefault(_defineProperty2);
  _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf2);
  _create = _interopRequireDefault(_create);
  _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf2);
  _promise = _interopRequireDefault(_promise);
  _regenerator = _interopRequireDefault(_regenerator);
  _assign = _interopRequireDefault(_assign);
  _API = _interopRequireDefault(_API);
  _RESTModel2 = _interopRequireDefault(_RESTModel2);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _typeof(obj) { if (typeof _symbol.default === "function" && typeof _iterator.default === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof _symbol.default === "function" && obj.constructor === _symbol.default && obj !== _symbol.default.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new _promise.default(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { _promise.default.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; (0, _defineProperty2.default)(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf(o) { _getPrototypeOf = _setPrototypeOf2.default ? _getPrototypeOf2.default : function _getPrototypeOf(o) { return o.__proto__ || (0, _getPrototypeOf2.default)(o); }; return _getPrototypeOf(o); }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = (0, _create.default)(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = _setPrototypeOf2.default || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _defineProperty(obj, key, value) { if (key in obj) { (0, _defineProperty2.default)(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  var Request =
  /*#__PURE__*/
  function (_RESTModel) {
    _inherits(Request, _RESTModel);

    function Request() {
      _classCallCheck(this, Request);

      return _possibleConstructorReturn(this, _getPrototypeOf(Request).apply(this, arguments));
    }

    _createClass(Request, [{
      key: "execute",
      value: function () {
        var _execute = _asyncToGenerator(
        /*#__PURE__*/
        _regenerator.default.mark(function _callee(option, token) {
          var request;
          return _regenerator.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return _API.default.Call("POST", "/API/Request/".concat(this._id, "/").concat(option), {
                    token: token
                  });

                case 2:
                  request = _context.sent;
                  (0, _assign.default)(this.document, request);
                  return _context.abrupt("return", this);

                case 5:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        return function execute(_x, _x2) {
          return _execute.apply(this, arguments);
        };
      }()
    }, {
      key: "to",
      get: function get() {
        return this.getField("to");
      },
      set: function set(value) {
        this.setField("to", value);
      }
    }, {
      key: "from",
      get: function get() {
        return this.getField("from");
      },
      set: function set(value) {
        this.setField("from", value);
      }
    }, {
      key: "status",
      get: function get() {
        return this.getField("status");
      },
      set: function set(value) {
        this.setField("status", value);
      }
    }, {
      key: "options",
      get: function get() {
        return this.getField("options");
      },
      set: function set(value) {
        this.setField("options", value);
      }
    }, {
      key: "type",
      get: function get() {
        return this.getField("type");
      },
      set: function set(value) {
        this.setField("type", value);
      }
    }, {
      key: "userData",
      get: function get() {
        return this.getField("userData");
      },
      set: function set(value) {
        this.setField("userData", value);
      }
    }, {
      key: "emailSent",
      get: function get() {
        return this.getField("emailSent");
      },
      set: function set(value) {
        this.setField("emailSent", value);
      }
    }], [{
      key: "createBandOwnershipRequest",
      value: function createBandOwnershipRequest(band, from, to, token) {
        var _this = this;

        return new _promise.default(function (resolve, reject) {
          var _this2 = this;

          _newArrowCheck(this, _this);

          _API.default.Call("POST", "/API/Request", {
            from: from,
            to: to,
            type: "BandOwnership",
            userData: {
              bandId: band
            },
            token: token
          }).then(function (data) {
            _newArrowCheck(this, _this2);

            resolve(new Request(data));
          }.bind(this), reject);
        }.bind(this));
      }
    }, {
      key: "createVenueOwnershipRequest",
      value: function createVenueOwnershipRequest(venue, from, to, token) {
        var _this3 = this;

        return new _promise.default(function (resolve, reject) {
          var _this4 = this;

          _newArrowCheck(this, _this3);

          _API.default.Call("POST", "/API/Request", {
            from: from,
            to: to,
            type: "VenueOwnership",
            userData: {
              venueId: venue
            },
            token: token
          }).then(function (data) {
            _newArrowCheck(this, _this4);

            resolve(new Request(data));
          }.bind(this), reject);
        }.bind(this));
      }
    }, {
      key: "createGigNegotiation",
      value: function createGigNegotiation(gig, from, to, token) {
        var _this5 = this;

        return new _promise.default(function (resolve, reject) {
          var _this6 = this;

          _newArrowCheck(this, _this5);

          _API.default.Call("POST", "/API/Request", {
            from: from,
            to: to,
            type: "GigNegotiation",
            userData: {
              gigId: gig
            },
            token: token
          }).then(function (data) {
            _newArrowCheck(this, _this6);

            resolve(new Request(data));
          }.bind(this), reject);
        }.bind(this));
      }
    }, {
      key: "getAllOwned",
      value: function getAllOwned(token) {
        return _RESTModel2.default.findMany(Request, null, token);
      }
    }, {
      key: "findById",
      value: function findById(id, token) {
        return _RESTModel2.default.findById(Request, id, token);
      }
    }]);

    return Request;
  }(_RESTModel2.default);

  _exports.default = Request;

  _defineProperty(Request, "ModelName", "Request");
});