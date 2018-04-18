'use strict';

function __$styleInject(css) {
    if (!css) return;

    if (typeof window == 'undefined') return;
    var style = document.createElement('style');
    style.setAttribute('media', 'screen');

    style.innerHTML = css;
    document.head.appendChild(style);
    return css;
}

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var materialUi = require('material-ui');
var reactRedux = require('react-redux');
var reactRelay = require('react-relay');
var recompose = require('recompose');
var IconAlert = _interopDefault(require('material-ui/svg-icons/alert/error'));
var PropTypes = _interopDefault(require('prop-types'));
var relayRuntime = require('relay-runtime');
var FloatingActionButton = _interopDefault(require('material-ui/FloatingActionButton'));
var IconArrowLeft = _interopDefault(require('material-ui/svg-icons/hardware/keyboard-arrow-left'));
require('material-ui/AppBar');
var IconButton = _interopDefault(require('material-ui/IconButton'));
var IconClose = _interopDefault(require('material-ui/svg-icons/navigation/close'));
var colors = require('material-ui/styles/colors');
var isEmail = _interopDefault(require('is-valid-email'));
var materialAutoRotatingCarousel = require('material-auto-rotating-carousel');
var MediaQuery = _interopDefault(require('react-responsive'));
require('babel-polyfill');
var reactDom = require('react-dom');
require('lodash.merge');
var reduxPersist = require('redux-persist');
var redux = require('redux');
var thunk = _interopDefault(require('redux-thunk'));
var MuiThemeProvider = _interopDefault(require('material-ui/styles/MuiThemeProvider'));
var getMuiTheme = _interopDefault(require('material-ui/styles/getMuiTheme'));
var LightBaseTheme = _interopDefault(require('material-ui/styles/baseThemes/lightBaseTheme'));
var CircularProgress = _interopDefault(require('material-ui/CircularProgress'));
var Snackbar = _interopDefault(require('material-ui/Snackbar'));
require('material-ui/svg-icons/file/cloud-off');
var supportTap = _interopDefault(require('react-tap-event-plugin'));

var index = __$styleInject("@import \"~codemirror/lib/codemirror.css\";\n@import \"~graphiql/graphiql.css\";\n* {\n  box-sizing: border-box;\n  outline: none;\n  margin: 0px;\n  padding: 0px;\n  border: 0px;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  user-select: none;\n}\nsvg {\n  box-sizing: initial;\n}\n::-webkit-scrollbar {\n  width: 0px;\n}\n.grid {\n  display: table;\n  table-layout: fixed;\n  width: 100%;\n}\n.grid > * {\n  display: table-cell;\n}\nfigure {\n  text-align: center;\n  background-color: black;\n}\nfigure img {\n  max-width: 100%;\n  max-height: 250px;\n  width: auto;\n}\n.inset {\n  padding: 5px;\n}\n.footbar {\n  position: fixed;\n  bottom: 0px;\n  background-color: white;\n  height: 50px;\n  z-index: 10;\n}\n.footbar a {\n  text-decoration: none;\n  color: inherit;\n}\n.withFootbar {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  z-index: 2;\n}\n.withFootbar > :last-child {\n  padding-bottom: 60px;\n}\n.form {\n  margin: 10px auto;\n  padding: 5px;\n}\n.commands {\n  display: table;\n  table-layout: fixed;\n  width: 100%;\n  z-index: 9;\n  text-align: center;\n  color: lightblue;\n}\n.commands > * {\n  display: table-cell;\n}\n.commands svg {\n  fill: lightblue!important;\n}\n.commands .primary {\n  color: green;\n  font-weight: bold;\n}\n.commands .primary svg {\n  fill: green!important;\n}\n.commands.centerinput > :first-child,\n.commands.centerinput > :last-child {\n  width: 50px;\n}\n.commands.centerinput > :nth-child(2) {\n  vertical-align: bottom;\n  padding: 2px 10px;\n}\n.commands.centerinput > :nth-child(2) input,\n.commands.centerinput > :nth-child(2) textarea {\n  width: 100%;\n  height: 100%;\n  margin: 0px;\n  padding: 2px;\n  border-width: 0px;\n  border-bottom: 1px solid lightgray;\n  text-align: center;\n}\n.messager {\n  position: fixed;\n  bottom: 10px;\n  right: 10px;\n  padding: 10px;\n  background-color: black;\n  color: white;\n}\n.messager:empty {\n  display: hidden;\n}\n.messager.error {\n  color: red;\n}\n.hide {\n  display: none;\n}\n.empty {\n  text-align: center;\n  padding: 200px 50px;\n}\n.empty svg {\n  width: 150px!important;\n  height: 150px!important;\n  fill: lightgray!important;\n}\n.empty p {\n  color: lightgray;\n  font-size: x-large;\n  line-height: 1.5;\n}\n.empty a {\n  text-decoration: none;\n  color: lightgray;\n}\n.dialog-command .overlay {\n  position: absolute;\n  top: -50px;\n  z-index: 10;\n  opacity: 0.7;\n  background-color: black;\n  width: 100%;\n}\n.dialog-command .layout {\n  position: absolute;\n  bottom: 50px;\n  width: 100%;\n  z-index: 11;\n}\n.dialog-command .layout .content {\n  background-color: lightgray;\n  width: 100%;\n  padding: 10px;\n  margin: 0 auto;\n}\n.dialog-command .layout .content > * {\n  background-color: white;\n}\n.comment {\n  background-color: lightgray;\n}\n.comment.inline {\n  background-color: white;\n}\n.comment .acomment {\n  display: table;\n  table-layout: fixed;\n  width: 100%;\n}\n.comment .acomment > * {\n  display: table-cell;\n}\n.comment .content {\n  border-radius: 3px;\n  background-color: white;\n  padding: 5px;\n  float: left;\n  margin: 2px;\n}\n.comment .content.owner {\n  background-color: lightgreen;\n  float: right;\n}\narticle figure:empty {\n  display: none;\n}\narticle img {\n  width: 100%;\n  clear: both;\n}\narticle header {\n  height: 100px;\n  background-color: darkorange;\n}\narticle header h1 {\n  padding: 5px;\n  line-height: 40px;\n}\narticle header h1,\narticle header a,\narticle header p {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n}\narticle header a {\n  text-decoration: none;\n}\narticle header p {\n  padding: 5px;\n  font-size: small;\n  text-align: right;\n  line-height: 15px;\n}\narticle section {\n  padding: 5px;\n}\narticle details {\n  padding: 5px;\n  border-bottom: 1px dotted lightgray;\n}\narticle details summary {\n  padding: 5px;\n  background-color: #eee;\n  border-radius: 5px;\n}\narticle details summary ~ div {\n  padding: 5px 10px;\n}\narticle details summary ~ div p {\n  padding: 5px 0px;\n}\narticle details summary ~ div h1 {\n  line-height: 3em;\n}\narticle details:last-child {\n  border-bottom: none;\n}\n.sticky {\n  position: fixed!important;\n  z-index: 10;\n}\n.sticky.top {\n  top: 10px !important;\n}\n.sticky.top.right {\n  right: 10px !important;\n}\n@media screen and (min-width: 960px) {\n  .sticky.top.right {\n    right: calc(100%/2 -  960px /2 +  10px) !important;\n  }\n}\n.sticky.top.right._2 {\n  top: 80px !important;\n}\n.sticky.top.right._3 {\n  top: 100px !important;\n}\n.sticky.top.left {\n  left: 10px !important;\n}\n@media screen and (min-width: 960px) {\n  .sticky.top.left {\n    left: calc(100%/2 -  960px /2 +  10px) !important;\n  }\n}\n.sticky.top.left._2 {\n  top: 80px !important;\n}\n.sticky.top.left._3 {\n  top: 100px !important;\n}\n.sticky.bottom {\n  bottom: 10px !important;\n}\n.sticky.bottom.right {\n  right: 10px !important;\n}\n@media screen and (min-width: 960px) {\n  .sticky.bottom.right {\n    right: calc(100%/2 -  960px /2 +  10px) !important;\n  }\n}\n.sticky.bottom.right._2 {\n  bottom: 80px !important;\n}\n.sticky.bottom.right._3 {\n  bottom: 100px !important;\n}\n.sticky.bottom.left {\n  left: 10px !important;\n}\n@media screen and (min-width: 960px) {\n  .sticky.bottom.left {\n    left: calc(100%/2 -  960px /2 +  10px) !important;\n  }\n}\n.sticky.bottom.left._2 {\n  bottom: 80px !important;\n}\n.sticky.bottom.left._3 {\n  bottom: 100px !important;\n}\n.sticky.full {\n  left: calc(100%/2 -  960px /2 +  0) !important;\n  width: 100%;\n  height: calc(100% -  50px) !important;\n}\n@media screen and (min-width: 960px) {\n  .sticky.full {\n    width: 960px;\n  }\n}\n.spinner {\n  width: 56px;\n  height: 56px;\n  margin: 0px;\n  z-index: 10;\n  background-color: #333;\n  border-radius: 100%;\n}\n.spinner.loading {\n  -webkit-animation: sk-scaleout 1s infinite ease-in-out;\n  animation: sk-scaleout 1s infinite ease-in-out;\n}\n.spinner.hide {\n  visibility: hidden;\n  -webkit-animation: initial;\n  animation: initial;\n}\n@-webkit-keyframes sk-scaleout {\n  0% {\n    -webkit-transform: scale(0);\n  }\n  100% {\n    -webkit-transform: scale(1);\n    opacity: 0;\n  }\n}\n@keyframes sk-scaleout {\n  0% {\n    -webkit-transform: scale(0);\n    transform: scale(0);\n  }\n  100% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    opacity: 0;\n  }\n}\n.li {\n  margin: 10px;\n  border-radius: 10px;\n  background-color: white;\n  height: 120px;\n  overflow: hidden;\n  position: relative;\n  border-bottom: 1px solid lightgray;\n  padding: 10px;\n  text-overflow: ellipsis;\n}\n.li .title {\n  font-size: larger;\n  line-height: 25px;\n  max-height: 50px;\n  overflow: hidden;\n  font-weight: bold;\n  text-align: left;\n}\n.li .summary {\n  font-size: small;\n  color: gray;\n  line-height: 15px;\n  max-height: 30px;\n  overflow: hidden;\n  text-align: left;\n}\n.li .more {\n  font-size: small;\n  color: gray;\n  line-height: 15px;\n  max-height: 15px;\n  bottom: 5px;\n  position: absolute;\n}\n.li .more > * {\n  display: inline-block;\n}\n.li .more > :first-child {\n  padding-right: 10px;\n}\n.li .photos {\n  text-align: center;\n}\n.li .photos img {\n  max-height: 100px;\n  max-width: 100%;\n  min-width: 120px;\n  padding: 0px 2px;\n}\n.li.photo1 .layout {\n  display: table;\n  table-layout: fixed;\n  width: 100%;\n}\n.li.photo1 .layout > * {\n  display: table-cell;\n}\n.li.photo1 .layout > :last-child {\n  width: 33.3%;\n  vertical-align: top;\n}\n.li.photo1 .layout > :first-child {\n  vertical-align: top;\n}\n.li.photo1 .title {\n  max-height: 75px;\n}\n.li.photo3 {\n  height: 160px;\n}\n.li.photo3 .photos {\n  display: table;\n  table-layout: fixed;\n  width: 100%;\n}\n.li.photo3 .photos > * {\n  display: table-cell;\n}\n.li.photo3 .photos > * {\n  vertical-align: middle;\n  text-align: center;\n  width: 33.3%;\n}\n.li.photo3 .photos > :last-child {\n  text-align: right;\n}\n.li.photo3 .photos > :first-child {\n  text-align: left;\n}\n.li.photo3 .title {\n  max-height: 25px;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n@media screen and (min-width: 960px) {\n  body {\n    background-color: lightgray;\n  }\n  body #app {\n    width: 960px !important;\n    margin: 0px auto!important;\n    background-color: white;\n  }\n  body #container {\n    width: 100%;\n    background-color: white;\n  }\n  body #app > div {\n    width: 960px !important;\n    height: 100%;\n  }\n  body .footbar {\n    width: 960px !important;\n  }\n  body .dialog-command .layout .content {\n    width: 960px !important;\n  }\n}\n.tutorial {\n  display: -webkit-box;\n  display: -moz-box;\n  display: box;\n  -webkit-box-orient: horizontal;\n  -moz-box-orient: horizontal;\n  box-orient: horizontal;\n}\n.tutorial .page {\n  width: 100%;\n  text-align: center;\n  vertical-align: middle;\n}\n.tutorial .page img {\n  max-width: 80%;\n  max-height: 80%;\n}\n.snackbar {\n  line-height: 30px;\n  background-color: black;\n  color: white;\n  padding: 10px;\n  min-width: 300px;\n  opacity: 0.85;\n  z-index: 10;\n}\n.snackbar.sticky.bottom {\n  bottom: 1px!important;\n}\n");

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var jsx = function () {
  var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7;
  return function createRawReactElement(type, props, key, children) {
    var defaultProps = type && type.defaultProps;
    var childrenLength = arguments.length - 3;

    if (!props && childrenLength !== 0) {
      props = {};
    }

    if (props && defaultProps) {
      for (var propName in defaultProps) {
        if (props[propName] === void 0) {
          props[propName] = defaultProps[propName];
        }
      }
    } else if (!props) {
      props = defaultProps || {};
    }

    if (childrenLength === 1) {
      props.children = children;
    } else if (childrenLength > 1) {
      var childArray = Array(childrenLength);

      for (var i = 0; i < childrenLength; i++) {
        childArray[i] = arguments[i + 3];
      }

      props.children = childArray;
    }

    return {
      $$typeof: REACT_ELEMENT_TYPE,
      type: type,
      key: key === undefined ? null : '' + key,
      ref: null,
      props: props,
      _owner: null
    };
  };
}();

var asyncIterator = function (iterable) {
  if (typeof Symbol === "function") {
    if (Symbol.asyncIterator) {
      var method = iterable[Symbol.asyncIterator];
      if (method != null) return method.call(iterable);
    }

    if (Symbol.iterator) {
      return iterable[Symbol.iterator]();
    }
  }

  throw new TypeError("Object is not async iterable");
};

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();

var asyncGeneratorDelegate = function (inner, awaitWrap) {
  var iter = {},
      waiting = false;

  function pump(key, value) {
    waiting = true;
    value = new Promise(function (resolve) {
      resolve(inner[key](value));
    });
    return {
      done: false,
      value: awaitWrap(value)
    };
  }

  

  if (typeof Symbol === "function" && Symbol.iterator) {
    iter[Symbol.iterator] = function () {
      return this;
    };
  }

  iter.next = function (value) {
    if (waiting) {
      waiting = false;
      return value;
    }

    return pump("next", value);
  };

  if (typeof inner.throw === "function") {
    iter.throw = function (value) {
      if (waiting) {
        waiting = false;
        throw value;
      }

      return pump("throw", value);
    };
  }

  if (typeof inner.return === "function") {
    iter.return = function (value) {
      return pump("return", value);
    };
  }

  return iter;
};

var asyncToGenerator = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var defineEnumerableProperties = function (obj, descs) {
  for (var key in descs) {
    var desc = descs[key];
    desc.configurable = desc.enumerable = true;
    if ("value" in desc) desc.writable = true;
    Object.defineProperty(obj, key, desc);
  }

  return obj;
};

var defaults = function (obj, defaults) {
  var keys = Object.getOwnPropertyNames(defaults);

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var value = Object.getOwnPropertyDescriptor(defaults, key);

    if (value && value.configurable && obj[key] === undefined) {
      Object.defineProperty(obj, key, value);
    }
  }

  return obj;
};

var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var _instanceof = function (left, right) {
  if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
    return right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
};

var interopRequireDefault = function (obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
};

var interopRequireWildcard = function (obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }

    newObj.default = obj;
    return newObj;
  }
};

var newArrowCheck = function (innerThis, boundThis) {
  if (innerThis !== boundThis) {
    throw new TypeError("Cannot instantiate an arrow function");
  }
};

var objectDestructuringEmpty = function (obj) {
  if (obj == null) throw new TypeError("Cannot destructure undefined");
};

var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var selfGlobal = typeof global === "undefined" ? self : global;

var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var slicedToArrayLoose = function (arr, i) {
  if (Array.isArray(arr)) {
    return arr;
  } else if (Symbol.iterator in Object(arr)) {
    var _arr = [];

    for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
      _arr.push(_step.value);

      if (i && _arr.length === i) break;
    }

    return _arr;
  } else {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }
};

var taggedTemplateLiteral = function (strings, raw) {
  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
};

var taggedTemplateLiteralLoose = function (strings, raw) {
  strings.raw = raw;
  return strings;
};

var temporalRef = function (val, name, undef) {
  if (val === undef) {
    throw new ReferenceError(name + " is not defined - temporal dead zone");
  } else {
    return val;
  }
};

var temporalUndefined = {};

var toArray = function (arr) {
  return Array.isArray(arr) ? arr : Array.from(arr);
};

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var Logo = function (_Component) {
  inherits(Logo, _Component);

  function Logo() {
    classCallCheck(this, Logo);
    return possibleConstructorReturn(this, (Logo.__proto__ || Object.getPrototypeOf(Logo)).apply(this, arguments));
  }

  createClass(Logo, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$drawStyle = _props.drawStyle,
          drawStyle = _props$drawStyle === undefined ? {} : _props$drawStyle,
          others = objectWithoutProperties(_props, ['drawStyle']);

      var _Object$assign = Object.assign({
        fill: "none",
        stroke: "rgb(200,200,200)",
        strokeWidth: 1,
        fontSize: 5
      }, drawStyle),
          _Object$assign$textSt = _Object$assign.textStroke,
          textStroke = _Object$assign$textSt === undefined ? "lightgray" : _Object$assign$textSt,
          otherDrawStyle = objectWithoutProperties(_Object$assign, ['textStroke']);

      return React__default.createElement(
        materialUi.SvgIcon,
        others,
        React__default.createElement(
          'g',
          otherDrawStyle,
          React__default.createElement('path', { d: 'M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 1.23 12.95 1 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.97 3.26 6 5.01 6 7h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z' })
        )
      );
    }
  }]);
  return Logo;
}(React.Component);

var Empty = (function (_ref) {
    var _ref$icon = _ref.icon,
        icon = _ref$icon === undefined ? React__default.createElement(Logo, null) : _ref$icon,
        _ref$text = _ref.text,
        text = _ref$text === undefined ? 'Empty' : _ref$text,
        children = _ref.children,
        others = objectWithoutProperties(_ref, ['icon', 'text', 'children']);
    return React__default.createElement(
        'div',
        _extends({ className: 'empty' }, others),
        icon,
        React__default.createElement(
            'div',
            null,
            children || text
        )
    );
});

var Wrapper = function (_PureComponent) {
	inherits(Wrapper, _PureComponent);

	function Wrapper() {
		classCallCheck(this, Wrapper);
		return possibleConstructorReturn(this, (Wrapper.__proto__ || Object.getPrototypeOf(Wrapper)).apply(this, arguments));
	}

	createClass(Wrapper, [{
		key: "componentWillMount",
		value: function componentWillMount() {
			this.props.handle();
		}
	}, {
		key: "render",
		value: function render() {
			return React__default.Children.only(this.props.children);
		}
	}]);
	return Wrapper;
}(React.PureComponent);

var withQuery = function withQuery(option) {
	return function (BaseComponent) {
		var factory = recompose.createEagerFactory(reactRelay.QueryRenderer);
		var WithQuery = recompose.compose(recompose.getContext({ client: React.PropTypes.object }), reactRedux.connect())(function (_ref) {
			var environment = _ref.client,
			    dispatch = _ref.dispatch,
			    others = objectWithoutProperties(_ref, ["client", "dispatch"]);

			var _ref2 = typeof option == "function" ? option(others) : option,
			    query = _ref2.query,
			    onSuccess = _ref2.onSuccess,
			    onError = _ref2.onError,
			    more = objectWithoutProperties(_ref2, ["query", "onSuccess", "onError"]);
			//////hack: make variables default undefined as undefined


			query().query.argumentDefinitions.forEach(function (def) {
				if (def.defaultValue === null) {
					def.defaultValue = undefined;
				}
			});

			return factory(_extends({
				render: function render(_ref3) {
					var error = _ref3.error,
					    props = _ref3.props;

					if (props) {
						return React__default.createElement(
							Wrapper,
							{ handle: function handle() {
									return onSuccess && onSuccess(props, dispatch);
								} },
							React__default.createElement(BaseComponent, _extends({}, others, props, { data: props }))
						);
					} else if (error) {
						return React__default.createElement(
							Wrapper,
							{ handle: function handle() {
									return onError && onError(error, dispatch);
								} },
							React__default.createElement(
								Empty,
								{ icon: React__default.createElement(IconAlert, { color: "red" }) },
								"error: ",
								error.toString()
							)
						);
					} else {
						return null;
					}
				},

				environment: environment,
				query: query
			}, more));
		});

		if (process.env.NODE_ENV !== 'production') {
			return recompose.setDisplayName(recompose.wrapDisplayName(BaseComponent, 'withQuery'))(WithQuery);
		}
		return WithQuery;
	};
};

var withFragment = function withFragment(options) {
	return function (BaseComponent) {
		var WithFragment = null;
		if (isPagination(options)) {
			WithFragment = recompose.getContext({ pagination: PropTypes.any })(function (_ref) {
				var pagination = _ref.pagination,
				    props = objectWithoutProperties(_ref, ["pagination"]);

				var _ref2 = typeof pagination == "function" ? pagination(props) : pagination,
				    query = _ref2.query,
				    variables = _ref2.variables,
				    direction = _ref2.direction,
				    _getVariables = _ref2.getVariables,
				    getConnectionFromProps = _ref2.getConnectionFromProps,
				    getFragmentVariables = _ref2.getFragmentVariables;

				var factory = recompose.createEagerFactory(reactRelay.createPaginationContainer(BaseComponent, options, {
					getVariables: function getVariables(props, _ref3) {
						var count = _ref3.count,
						    cursor = _ref3.cursor;

						if (_getVariables) return _getVariables.apply(undefined, arguments);
						return _extends({}, variables, {
							count: count,
							cursor: cursor
						});
					},

					direction: direction,
					getConnectionFromProps: getConnectionFromProps,
					getFragmentVariables: getFragmentVariables,
					query: query
				}));
				return factory(props);
			});
		} else {
			var factory = recompose.createEagerFactory(BaseComponent);
			WithFragment = reactRelay.createFragmentContainer(function (props) {
				return factory(props);
			}, options);
		}

		if (process.env.NODE_ENV !== 'production') {
			return recompose.setDisplayName(recompose.wrapDisplayName(BaseComponent, 'withFragment'))(WithFragment);
		}
		return WithFragment;
	};
};

function isPagination(gql) {
	var _gql$Object$keys$ = gql[Object.keys(gql)[0]](),
	    metadata = _gql$Object$keys$.metadata;

	return metadata && metadata.connection && metadata.connection.length > 0;
}

var trim = function trim(o) {
	return Object.keys(o).reduce(function (o, k) {
		if (o[k] === null) {
			o[k] = undefined;
		} else if (_typeof(o[k]) == "object") {
			trim(o[k]);
		}
		return o;
	}, o);
};

function spreadResponse(res, spread, props) {
	var values = res;
	if (typeof spread == "function") {
		values = spread(res, props);
	} else if (typeof spread == "string") {
		values = res[spread];
	} else if (spread !== false) {
		var keys = Object.keys(res);
		if (keys.length == 1) {
			var v = res[keys[0]];
			if ((typeof v === "undefined" ? "undefined" : _typeof(v)) == "object") {
				values = v;
			}
		}
	}
	return values;
}

var isDate = function isDate(date) {
	return date && typeof date.getMonth === 'function';
};

/**
 * options:
 * all commitMutation options
 * spread?: to spread response on element
 *		>function(response, props): return {} to be spread
 * 		>string : response[spread]
 * 		>false: no spread
 * 		>any other: spread response[Object.keys(response)[0]] only when keys.length==1
 * patch4?: ID, auto update cache store for node[patch4]
 * patchData?: {}, only when patch4 specified
 * 		: spread it to node[patch4] in cache store
 * 		: spread input parameter of mutate to node[patch4]
 * shouldPatch(res): false will not patch, default function is all resonse are not null
 * promise?: boolean, mutate() return promise
 */

var withMutation = function withMutation(option) {
	return function (BaseComponent) {
		var factory = recompose.createEagerFactory(BaseComponent);
		var WithMutation = recompose.getContext({
			client: PropTypes.object,
			showMessage: PropTypes.func,
			loading: PropTypes.func
		})(function (_ref) {
			var environment = _ref.client,
			    showMessage = _ref.showMessage,
			    loading = _ref.loading,
			    others = objectWithoutProperties(_ref, ["client", "showMessage", "loading"]);

			var _ref2 = typeof option == "function" ? option(others, {}, environment) : option,
			    _ref2$name = _ref2.name,
			    name = _ref2$name === undefined ? "mutate" : _ref2$name,
			    mutation = _ref2.mutation;

			//////hack: make variables default undefined as undefined


			mutation().query.argumentDefinitions.forEach(function (def) {
				if (def.defaultValue === null) def.defaultValue = undefined;
			});

			function mutate(data) {
				loading(true);

				var _ref3 = typeof option == "function" ? option(others, data, environment) : option,
				    spread = _ref3.spread,
				    variables = _ref3.variables,
				    patch4 = _ref3.patch4,
				    patchData = _ref3.patchData,
				    shouldPatch = _ref3.shouldPatch,
				    delete4 = _ref3.delete4,
				    _ref3$dateFields = _ref3.dateFields,
				    dateFields = _ref3$dateFields === undefined ? [] : _ref3$dateFields,
				    mutation = objectWithoutProperties(_ref3, ["spread", "variables", "patch4", "patchData", "shouldPatch", "delete4", "dateFields"]);

				var smart = {};
				if (patch4) {
					var updater = function updater(id, data) {
						return function (store, res) {
							if (res) {
								//updater only
								if (shouldPatch && !shouldPatch(res)) {
									return;
								}
							}
							var entity = store.get(id);
							if (entity) {
								Object.keys(data).forEach(function (k) {
									entity.setValue(isDate(data[k]) ? data[k].toISOString() : data[k], k);
								});
							}
						};
					};
					smart.updater = smart.optimisticUpdater = updater(patch4, patchData || data);
				} else if (delete4) {
					smart.updater = smart.optimisticUpdater = function (store) {
						store.delete(delete4);
					};
				}

				return new Promise(function (resolve, reject) {
					reactRelay.commitMutation(environment, _extends({
						variables: _extends({}, variables, data)
					}, smart, mutation, {
						onError: reject,
						onCompleted: function onCompleted(res, error) {
							loading(false);
							if (error) {
								reject(error);
							} else {
								showMessage("Successful!");
								resolve(spreadResponse(res, spread, others));
							}
						}
					}));
				});
			}
			return factory(_extends({}, others, defineProperty({}, name, mutate)));
		});

		if (process.env.NODE_ENV !== 'production') {
			return recompose.setDisplayName(recompose.wrapDisplayName(BaseComponent, 'withMutation'))(WithMutation);
		}

		return WithMutation;
	};
};

var source = new relayRuntime.RecordSource();
var store = new relayRuntime.Store(source);
var handlerProvider = null;
var environments = {};
var NoService = new Error("Network error");

function createEnvironment(props) {
	var user = props.user,
	    appId = props.appId,
	    supportOffline = props.supportOffline,
	    network = props.network,
	    showMessage = props.showMessage,
	    loading = props.loading,
	    isDev = props.isDev;

	var token = user ? user.token : null;
	var key = appId + "-" + !!token;
	if (environments[key]) return environments[key];

	if (supportOffline) {
		supportOffline.user = user;
	}

	function handleErrors(errors) {
		var _errors$reduce = errors.reduce(function (state, a) {
			state.message.add(a.message);
			state.stack.add(a.stack);
			return state;
		}, { message: new Set(), stack: new Set() }),
		    message = _errors$reduce.message,
		    stack = _errors$reduce.stack;

		if (isDev) {
			showMessage({ message: Array.from(message).join("|"), level: "error" });
			console.error("Server Error\r\n" + Array.from(stack).join("\r\n"));
		} else {
			showMessage({ message: Array.from(message).join("|"), level: "warn" });
		}
	}

	function fetcherOnline(opt) {
		if (supportOffline) supportOffline.setSource(source);

		var service = props.service,
		    report = props.optics;

		return fetch(service, _extends({
			method: 'POST'
		}, opt, {
			headers: _extends({
				'content-type': 'application/json',
				"X-Application-ID": appId,
				"X-Session-Token": token
			}, opt ? opt.headers : null)
		})).then(function (res) {
			if (!res.ok) {
				throw new Error(res.statusText);
			}
			return res.json();
		}).then(function (res) {
			if (res.errors) handleErrors(res.errors, showMessage);

			if (res.extensions) report(res.extensions.report);

			return res;
		});
	}

	function fetchQueryOnline(operation, variables, cacheConfig, uploadables) {
		return fetcherOnline({
			body: JSON.stringify({
				query: isDev === true ? operation.text : undefined, // GraphQL text from input
				id: isDev === true ? undefined : operation.name,
				variables: variables
			})
		}).catch(function (e) {

			network("offline");

			if (supportOffline) return fetchQueryOffline(operation, variables, cacheConfig, uploadables);

			return e;
		});
	}

	function fetchQueryOffline(operation, variables, cacheConfig, uploadables) {
		supportOffline.unsetSource(source);
		return supportOffline.runQL(operation.text, variables).then(function (res) {
			if (res.errors) handleErrors(res.errors, showMessage);

			if (isDev) {
				console.dir({
					query: operation.text,
					variables: variables,
					result: res
				});
			}
			return res;
		});
	}

	function fetchQuery() {
		var _arguments = arguments;

		loading(true);
		return function () {
			if (network() == "online") return fetchQueryOnline.apply(undefined, _arguments);else if (supportOffline) return fetchQueryOffline.apply(undefined, _arguments);else return Promise.resolve(NoService);
		}().catch(function (e) {
			loading(false);
			showMessage({ message: e.message, level: "error" });
			return e;
		}).then(function (res) {
			loading(false);
			return res;
		});
	}

	return Object.assign(new relayRuntime.Environment({
		handlerProvider: handlerProvider,
		network: relayRuntime.Network.create(fetchQuery),
		store: store
	}), {
		fetcher: function fetcher(req) {
			var _arguments2 = arguments;

			loading(true);
			return function () {
				if (network() == "online") {
					return fetcherOnline.apply(undefined, _arguments2);
				} else if (supportOffline) {
					var _JSON$parse = JSON.parse(req.body),
					    query = _JSON$parse.query,
					    variables = _JSON$parse.variables;

					return supportOffline.runQL(query, variables).then(function (result) {
						if (isDev) {
							console.dir({
								query: query,
								variables: variables,
								result: result
							});
						}
						return result;
					});
				} else {
					return Promise.resolve(NoService);
				}
			}().catch(function (e) {
				loading(false);
				showMessage({ message: e.message, level: "error" });
				return e;
			}).then(function (res) {
				loading(false);
				return res;
			});
		},
		runQL: function runQL(query, variables) {
			loading(true);
			return function () {
				if (network() == "online") {
					return fetcherOnline({ body: JSON.stringify(query) });
				} else if (supportOffline) {
					return supportOffline.runQL(query, variables).then(function (result) {
						if (isDev) {
							console.dir({
								query: query,
								variables: variables,
								result: result
							});
						}
						return result;
					});
				} else {
					return Promise.resolve(NoService);
				}
			}().catch(function (e) {
				loading(false);
				showMessage({ message: e.message, level: "error" });
				return e;
			}).then(function (res) {
				loading(false);
				return res;
			});
		}
	});
}

var withGraphqlClient = function withGraphqlClient() {
	var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	return function (BaseComponent) {
		var factory = recompose.createEagerFactory(recompose.withContext({
			client: PropTypes.object,
			optics: PropTypes.func
		}, function (_ref) {
			var client = _ref.client,
			    optics = _ref.optics,
			    store = _ref.store;
			return {
				client: client,
				optics: optics
			};
		})(BaseComponent));

		var WithGraphqlClient = function WithGraphqlClient(props) {
			var environment = props.client;

			var clientOpts = typeof options == "function" ? options(props) : options;
			if (!environment) {
				environment = createEnvironment(_extends({}, props, clientOpts));
				environment.get = function (id) {
					var store = this.getStore();
					return store.getSource().get(id);
				};

				environment.getAll = function (type) {
					var store = this.getStore();
					var source = store.getSource();
					var ex = type[0].toLowerCase() + type.substr(1) + 's';
					return source.getRecordIDs().filter(function (id) {
						return id.startsWith(ex);
					}).map(function (id) {
						return source.get(id);
					}).filter(function (a) {
						return !!a;
					});
				};

				environment.connection = function (store, key, filter) {
					var id = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "client:root";

					var record = store.get(id);
					var connection = relayRuntime.ConnectionHandler.getConnection(record, key, filter);
					var type = function type(node) {
						var typeComments = node.id.split(":")[0];
						var TypeComment = typeComments[0].toUpperCase() + typeComments.substr(1, typeComments.length - 2);
						return TypeComment + 'Edge';
					};
					return {
						append: function append(node) {
							var edge = relayRuntime.ConnectionHandler.createEdge(store, connection, store.get(node.id), type(node));
							relayRuntime.ConnectionHandler.insertEdgeAfter(connection, edge);
						},
						prepend: function prepend(node) {
							var edge = relayRuntime.ConnectionHandler.createEdge(store, connection, store.get(node.id), type(node));
							relayRuntime.ConnectionHandler.insertEdgeBefore(connection, edge);
						}
					};
				};
			} else if (typeof environment == "function") {
				environment = environment(props);
			}
			return factory(_extends({ client: environment }, props));
		};

		if (process.env.NODE_ENV !== 'production') {
			return recompose.setDisplayName(recompose.wrapDisplayName(BaseComponent, 'withGraphqlClient'))(WithGraphqlClient);
		}

		return WithGraphqlClient;
	};
};

var withPagination = function withPagination(options) {
    return function (BaseComponent) {
        var factory = recompose.createEagerFactory(recompose.withContext({ pagination: PropTypes.any }, function () {
            return { pagination: options };
        })(BaseComponent));

        var WithPagination = withQuery(options)(function (props) {
            return factory(props);
        });

        if (process.env.NODE_ENV !== 'production') {
            return recompose.setDisplayName(recompose.wrapDisplayName(BaseComponent, 'withPagination'))(WithPagination);
        }

        return WithPagination;
    };
};

var withInit = function withInit(options) {
	return function (BaseComponent) {
		var factory = recompose.createEagerFactory(BaseComponent);

		var Init = withQuery(options)(function (_ref) {
			var children = _ref.children;
			return React__default.createElement(
				"div",
				null,
				children
			);
		});

		var WithInit = function WithInit(_ref2) {
			var children = _ref2.children,
			    others = objectWithoutProperties(_ref2, ["children"]);
			return React__default.createElement(
				BaseComponent,
				others,
				React__default.createElement(
					Init,
					null,
					children
				)
			);
		};

		if (process.env.NODE_ENV !== 'production') {
			return recompose.setDisplayName(recompose.wrapDisplayName(BaseComponent, 'WithInit'))(WithInit);
		}

		return WithInit;
	};
};

Object.assign(Date.prototype, {
	toDate: function toDate() {
		var d = new Date(this.getTime());
		d.setHours(0, 0, 0, 0);
		return d;
	},
	isSameDate: function isSameDate(d) {
		return this.relative(d) == 0;
	},
	relative: function relative(d) {
		return Math.floor((this.toDate().getTime() - d.toDate().getTime()) / (24 * 60 * 60 * 1000));
	},
	relativeDate: function relativeDate(days) {
		return new Date(this.getTime() + 24 * 60 * 60 * 1000 * days);
	},
	isFuture: function isFuture() {
		return this.relative(new Date()) > 0;
	},
	format: function format() {
		var tmpl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "y-M-d";

		var value = {
			y: this.getFullYear(),
			M: this.getMonth() + 1,
			d: this.getDate(),
			h: this.getHours(),
			m: this.getMinutes(),
			s: this.getSeconds()
		};
		return tmpl.replace(/([ymdhs])+/ig, function (match, type) {
			return value[type != 'M' ? type.toLowerCase() : type] || "";
		});
	},
	smartFormat: function smartFormat() {
		var reToday = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "HH:mm";
		var reThisYear = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "MM月DD日";
		var reYearsAgo = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "YYYY年MM月DD日";

		var now = new Date();
		return this.format(this.isSameDate(now) ? reToday : this.getFullYear() == now.getFullYear() ? reThisYear : reYearsAgo);
	},
	getWeek: function getWeek() {
		var date = new Date(this.getTime());
		date.setHours(0, 0, 0, 0);
		// Thursday in current week decides the year.
		date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
		// January 4 is always in week 1.
		var week1 = new Date(date.getFullYear(), 0, 4);
		// Adjust to Thursday in week 1 and count number of weeks from date to week1.
		return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
	}
});

var Performance = recompose.withState("open", "setOpen", false)(function (_ref) {
	var report = _ref.report,
	    open = _ref.open,
	    setOpen = _ref.setOpen,
	    _ref$total = _ref.total,
	    total = _ref$total === undefined ? parseInt(report["/"] / 1000) : _ref$total,
	    _ref$threshold = _ref.threshold,
	    threshold = _ref$threshold === undefined ? 2 : _ref$threshold;
	return React__default.createElement(
		"div",
		{ style: { backgroundColor: "white" } },
		React__default.createElement(
			"div",
			{ className: "sticky top right _2" },
			React__default.createElement(
				FloatingActionButton,
				{ secondary: total >= threshold,
					onClick: function onClick() {
						return setOpen(true);
					},
					mini: true,
					backgroundColor: "lightgray"
				},
				React__default.createElement(IconArrowLeft, null)
			)
		),
		React__default.createElement(
			materialUi.Dialog,
			{ open: open, onRequestClose: function onRequestClose() {
					return setOpen(false);
				},
				contentStyle: { width: "100%" } },
			React__default.createElement(
				"table",
				{ style: { width: "100%", border: 1 } },
				React__default.createElement(
					"caption",
					null,
					"total:",
					total,
					"ms"
				),
				React__default.createElement(
					"tbody",
					null,
					React__default.createElement(
						"tr",
						null,
						React__default.createElement(
							"th",
							null,
							"path"
						),
						React__default.createElement(
							"th",
							null,
							"start(us)"
						),
						React__default.createElement(
							"th",
							null,
							"used time(us)"
						)
					),
					Object.keys(report).filter(function (a) {
						return a !== "/" && a !== "toJSON";
					}).map(function (k) {
						return report[k].map(function (_ref2, i) {
							var at = _ref2.at,
							    by = _ref2.by;
							return React__default.createElement(
								"tr",
								{ key: k + "_" + i },
								React__default.createElement(
									"td",
									null,
									k
								),
								React__default.createElement(
									"td",
									null,
									at
								),
								React__default.createElement(
									"td",
									null,
									by
								)
							);
						});
					}).reduce(function (collected, a) {
						a.forEach(function (b) {
							return collected.push(b);
						});
						return collected;
					}, [])
				)
			)
		)
	);
});

var Performance$1 = reactRedux.connect(function (state) {
	return { report: state.qili.optics };
})(function (_ref3) {
	var report = _ref3.report;
	return report && report["/"] ? React__default.createElement(Performance, { report: report }) : null;
});

var _templateObject = taggedTemplateLiteral(["\n\t\t\t\t\t\t\tquery file_token_Query($key:String){\n\t\t\t\t\t\t\t\ttoken:file_upload_token(key:$key){\n\t\t\t\t\t\t\t\t\ttoken\n\t\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t"], ["\n\t\t\t\t\t\t\tquery file_token_Query($key:String){\n\t\t\t\t\t\t\t\ttoken:file_upload_token(key:$key){\n\t\t\t\t\t\t\t\t\ttoken\n\t\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t"]),
    _templateObject2 = taggedTemplateLiteral(["\n    \t\tmutation file_create_Mutation($_id:String!,$host:ID!,$bucket:String,$size:Int,$crc:Int,$mimeType:String,$imageInfo:JSON){\n    \t\t\tfile_create(_id:$_id,host:$host,bucket:$bucket,size:$size,crc:$crc,mimeType:$mimeType,imageInfo:$imageInfo){\n    \t\t\t\turl\n    \t\t\t}\n    \t\t}\n    \t"], ["\n    \t\tmutation file_create_Mutation($_id:String!,$host:ID!,$bucket:String,$size:Int,$crc:Int,$mimeType:String,$imageInfo:JSON){\n    \t\t\tfile_create(_id:$_id,host:$host,bucket:$bucket,size:$size,crc:$crc,mimeType:$mimeType,imageInfo:$imageInfo){\n    \t\t\t\turl\n    \t\t\t}\n    \t\t}\n    \t"]);
var IMAGE_DATA_SCHEME_LEN = "data:image/jpeg;base64,".length;
var instance, input, _imgSizer;

function main() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "json";
  var width = arguments[1];
  var height = arguments[2];

  //return Promise.as("http://ts2.mm.bing.net/th?id=JN.tzKlieg4w8eYJfDBkEHoAw&pid=15.1")

  if (input == null) {
    input = document.createElement('input');
    input.type = "file";
    _imgSizer = document.createElement('canvas');
    _imgSizer.style.position = input.style.position = 'absolute';
    _imgSizer.style.left = input.style.left = '-9999px';

    document.body.appendChild(input);
    document.body.appendChild(_imgSizer);
  }

  return new Promise(function (resolve, reject) {
    var needResize = width || height,
        size = Math.max(width, height);

    input.onchange = function () {
      var file = this.files[0];
      if (file == null) return;

      if (type == 'raw') {
        resolve(file);
        this.value = "";
        return;
      }

      var name = file.name,
          reader = new FileReader();
      reader.onload = function () {
        this.value = "";
        var data = reader.result;
        switch (type) {
          case 'image':
            if (needResize) {
              var img = new Image();
              img.src = data;
              img.onload = function () {
                return resolve({ url: resize(data, size, img), name: name });
              };
              img.onerror = function () {
                return resolve({ url: data, name: name });
              };
            } else resolve({ url: data, name: name });
            break;
          case 'json':
            resolve({ data: JSON.parse(data), name: name });
            break;
          case 'jsonInJs':
            resolve({ data: data && new Function("", "return " + data)(), name: name });
            break;
          default:
            resolve({ data: data, name: name });
        }
      }.bind(this);

      reader.onerror = function () {
        reject(reader.error);
      };

      switch (type) {
        case 'image':
          reader.readAsDataURL(file);
          break;
        default:
          reader.readAsText(file);
      }
    };

    input.click();
  });
}

function resize(dataUrl, size, img) {
  var ctx = _imgSizer.getContext('2d');
  var wh = img.width / img.height;
  _imgSizer.width = wh >= 1 ? size < img.width ? size : img.width : size < img.height ? Math.floor(size * wh) : img.width;
  _imgSizer.height = wh < 1 ? size < img.height ? size : img.height : size < img.width ? Math.floor(size / wh) : img.height;
  _imgSizer.style.width = _imgSizer.width + "px";
  _imgSizer.style.height = _imgSizer.height + "px";
  ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, _imgSizer.width, _imgSizer.height);
  return _imgSizer.toDataURL("image/jpeg");
}

function dataAsBlob(data) {
  return new Promise(function (resolve, reject) {
    switch (typeof data === "undefined" ? "undefined" : _typeof(data)) {
      case 'string':
        if (data.startsWith("file:")) {
          window.resolveLocalFileSystemURL(data, function (entry) {
            return entry.file(function (file) {
              var reader = new FileReader();
              reader.onload = function (e) {
                return resolve(new Blob([new Uint8Array(reader.result)], { type: file.type }));
              };
              reader.readAsArrayBuffer(file);
            }, reject);
          }, reject);
        } else if (data.startsWith("data:")) {
          resolve(module.exports.toBlob(data));
        } else {
          fetch(data).then(function (res) {
            return res.blob();
          }).then(resolve, reject);
        }
        break;
      default:
        resolve(data);
    }
  });
}

var File = { //for testable
  main: main,
  selectJsonFile: function selectJsonFile() {
    return main("json");
  },
  selectJsonInJsFile: function selectJsonInJsFile() {
    return main("jsonInJs");
  },
  selectImageFile: function selectImageFile(width, height) {
    return main.apply(undefined, ["image"].concat(Array.prototype.slice.call(arguments)));
  },
  selectTextFile: function selectTextFile() {
    return main("text");
  },
  select: function select() {
    return main.apply(undefined, ["raw"].concat(Array.prototype.slice.call(arguments)));
  },
  toBlob: function toBlob(data) {
    var contentType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "image/*";
    var sliceSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 512;

    var byteCharacters = atob(data.substr(IMAGE_DATA_SCHEME_LEN));
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  },

  root: null, //injected later
  upload: function upload(data, props, token) {
    var url = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "http://up.qiniu.com";

    return new Promise(function (resolve, reject) {
      props = props || {};
      if (!props.id || !props.key) {
        reject("upload must have id and key in props");
      }
      if (module.exports.root) {
        props = _extends({}, props, { key: module.exports.root + "/" + props.id + "/" + props.key });
      }
      props['x:id'] = props.id;
      delete props.id;

      if (props.key) props.key = props.key.replace(':', '/');

      var getToken = function getToken() {
        if (typeof token == "string") {
          return Promise.resolve(token);
        } else {
          return token({ key: props.key }).then(function (_ref) {
            var token = _ref.token;
            return token;
          });
        }
      };

      getToken().then(function (token) {
        dataAsBlob(data).then(function (data) {
          var formData = new FormData();
          formData.append('file', data);
          formData.append('token', token);
          Object.keys(props).forEach(function (a) {
            return formData.append(a, props[a]);
          });

          var xhr = new XMLHttpRequest();
          xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
              if (xhr.status >= 200 && xhr.status < 300) resolve(JSON.parse(xhr.responseText).data.file_create.url);else reject(xhr.responseText);
            }
          };

          xhr.open('POST', url, true);
          xhr.send(formData);
        });
      });
    });
  },


  withGetToken: recompose.compose(recompose.getContext({ client: PropTypes.object }), recompose.mapProps(function (_ref2) {
    var client = _ref2.client,
        others = objectWithoutProperties(_ref2, ["client"]);
    return _extends({}, others, {
      getToken: function getToken(key) {
        key = typeof key == "string" ? { key: key } : key;
        return client.runQL({
          id: "file_token_Query",
          variables: key,
          query: graphql(_templateObject)().text
        }).then(function (_ref3) {
          var token = _ref3.data.token;
          return token;
        });
      }
    });
  })),

  withFileCreate: withMutation({
    name: "createFile",
    promise: true,
    mutation: graphql(_templateObject2)
  })
};

var FullPage = function FullPage(_ref, _ref2) {
	var style = _ref.style,
	    children = _ref.children;
	var _ref2$theme = _ref2.theme,
	    page = _ref2$theme.page,
	    zIndex = _ref2$theme.zIndex;
	return React__default.createElement(
		"div",
		{
			className: "sticky full",
			style: _extends({ background: "white" }, style, page, { zIndex: zIndex.dialog, top: 0 }) },
		children
	);
};

FullPage.contextTypes = {
	theme: PropTypes.object
};

var NoNetwork = function NoNetwork(_ref) {
	var onClose = _ref.onClose;
	return React__default.createElement(
		"div",
		{ style: { padding: 20, fontSize: 12 } },
		React__default.createElement(
			"h1",
			null,
			"\u672A\u80FD\u94FE\u63A5\u5230\u4E92\u8054\u7F51"
		),
		React__default.createElement(
			"p",
			null,
			"\u60A8\u7684\u8BBE\u5907\u672A\u542F\u7528\u79FB\u52A8\u7F51\u7EDC\u6216\u65E0\u7EBF\u5C40\u57DF\u7F51"
		),
		React__default.createElement("hr", { style: { border: "1px solid lightgray", margin: "5px 0px" } }),
		React__default.createElement(
			"p",
			null,
			"\u5982\u9700\u8981\u8FDE\u63A5\u5230\u4E92\u8054\u7F51\uFF0C\u8BF7\u53C2\u8003\u4EE5\u4E0B\u51E0\u70B9:"
		),
		React__default.createElement(
			"ul",
			null,
			React__default.createElement(
				"li",
				null,
				"\u68C0\u67E5\u624B\u673A\u4E2D\u7684\u65E0\u7EBF\u5C40\u57DF\u7F51\u8BBE\u7F6E\uFF0C\u67E5\u770B\u662F\u5426\u6709\u53EF\u4ECB\u5165\u7684\u65E0\u7EBF\u5C40\u57DF\u7F51\u4FE1\u53F7"
			),
			React__default.createElement(
				"li",
				null,
				"\u68C0\u67E5\u624B\u673A\u662F\u5426\u5DF2\u63A5\u5165\u79FB\u52A8\u7F51\u7EDC\uFF0C\u5E76\u4E14\u624B\u673A\u6CA1\u6709\u88AB\u505C\u673A"
			)
		),
		React__default.createElement(
			"p",
			null,
			"\u5982\u679C\u60A8\u5DF2\u4ECB\u63A5\u65E0\u7EBF\u5C40\u57DF\u7F51:"
		),
		React__default.createElement(
			"ul",
			null,
			React__default.createElement(
				"li",
				null,
				"\u8BF7\u68C0\u67E5\u60A8\u6240\u8FDE\u63A5\u7684\u65E0\u7EBF\u5C40\u57DF\u7F51\u70ED\u70B9\u662F\u5426\u5DF2\u63A5\u5165\u4E92\u8054\u7F51\uFF0C\u6216\u8BE5\u70ED\u70B9\u662F\u5426\u5DF2\u5141\u8BB8\u4F60\u7684\u8BBE\u5907\u8BBF\u95EE\u4E92\u8054\u7F51"
			)
		)
	);
};

var NoNetworkBanner = function (_Component) {
	inherits(NoNetworkBanner, _Component);

	function NoNetworkBanner() {
		var _ref2;

		var _temp, _this, _ret;

		classCallCheck(this, NoNetworkBanner);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref2 = NoNetworkBanner.__proto__ || Object.getPrototypeOf(NoNetworkBanner)).call.apply(_ref2, [this].concat(args))), _this), _this.state = { detailed: false }, _temp), possibleConstructorReturn(_this, _ret);
	}

	createClass(NoNetworkBanner, [{
		key: "render",
		value: function render() {
			var _this2 = this;

			var detailed = this.state.detailed;

			var noNetwork = null;
			if (detailed) {
				noNetwork = React__default.createElement(
					FullPage,
					null,
					React__default.createElement(
						"div",
						{ style: { display: "flex", flexDirection: "row", background: "black" } },
						React__default.createElement(
							"div",
							{ style: { flex: 1 } },
							React__default.createElement(
								IconButton,
								{ onClick: function onClick(e) {
										return _this2.setState({ detailed: false });
									} },
								React__default.createElement(IconClose, {
									color: "white" })
							)
						),
						React__default.createElement(
							"div",
							{ style: {
									flex: "1 100%", height: 48,
									lineHeight: "48px", fontSize: "small",
									color: "white"
								} },
							"\u7F51\u7EDC\u8FDE\u63A5\u4E0D\u53EF\u7528"
						)
					),
					React__default.createElement(NoNetwork, null)
				);
			}
			return React__default.createElement(
				"div",
				null,
				React__default.createElement(
					"div",
					{ onClick: function onClick(e) {
							return _this2.setState({ detailed: true });
						},
						style: { display: "flex", flexDirection: "row", background: colors.red100 } },
					React__default.createElement(
						"div",
						{ style: { flex: 1 } },
						React__default.createElement(
							IconButton,
							null,
							React__default.createElement(IconAlert, null)
						)
					),
					React__default.createElement(
						"div",
						{ style: { flex: "1 100%", height: 48, lineHeight: "48px", fontSize: "small" } },
						"\u7F51\u7EDC\u8FDE\u63A5\u4E0D\u53EF\u7528"
					)
				),
				noNetwork
			);
		}
	}]);
	return NoNetworkBanner;
}(React.Component);

var withNotification = function withNotification() {
	var Base = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
		return null;
	};
	return recompose.compose(reactRedux.connect(function (_ref3) {
		var networkStatus = _ref3.qili.networkStatus;
		return { networkStatus: networkStatus };
	}))(function (_ref4) {
		var networkStatus = _ref4.networkStatus,
		    props = objectWithoutProperties(_ref4, ["networkStatus"]);
		return React__default.createElement(
			"div",
			null,
			networkStatus == "offline" ? React__default.createElement(NoNetworkBanner, null) : null,
			React__default.createElement(Base, props)
		);
	});
};
var Notification = withNotification();

var notSupport = function notSupport(Base) {
	var OfflineUI = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : NoNetwork;
	return recompose.compose(reactRedux.connect(function (_ref5) {
		var networkStatus = _ref5.qili.networkStatus;
		return { networkStatus: networkStatus };
	}), recompose.branch(function (_ref6) {
		var networkStatus = _ref6.networkStatus;
		return networkStatus == "offline";
	}, recompose.renderComponent(OfflineUI)))(Base);
};

var _templateObject$1 = taggedTemplateLiteral(["\n\t\t\tmutation authentication_requestToken_Mutation($contact:String!){\n\t\t\t\trequestToken(contact:$contact)\n\t\t\t}\n\t\t"], ["\n\t\t\tmutation authentication_requestToken_Mutation($contact:String!){\n\t\t\t\trequestToken(contact:$contact)\n\t\t\t}\n\t\t"]),
    _templateObject2$1 = taggedTemplateLiteral(["\n\t\t\tmutation authentication_login_Mutation($contact:String!, $token: String!, $name: String){\n\t\t\t\tlogin(contact:$contact, token:$token, name: $name){\n\t\t\t\t\tid\n\t\t\t\t\ttoken\n\t\t\t\t}\n\t\t\t}\n\t\t"], ["\n\t\t\tmutation authentication_login_Mutation($contact:String!, $token: String!, $name: String){\n\t\t\t\tlogin(contact:$contact, token:$token, name: $name){\n\t\t\t\t\tid\n\t\t\t\t\ttoken\n\t\t\t\t}\n\t\t\t}\n\t\t"]);

var ENTER = 13;
var isPhone = function isPhone(v) {
	return (/^(\+\d{2})?\d{11}$/g.test(v)
	);
};

var Authentication = function (_Component) {
	inherits(Authentication, _Component);

	function Authentication() {
		var _ref;

		var _temp, _this, _ret;

		classCallCheck(this, Authentication);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = Authentication.__proto__ || Object.getPrototypeOf(Authentication)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
			tick: null,
			error: null,
			exists: true,
			errName: null
		}, _temp), possibleConstructorReturn(_this, _ret);
	}

	createClass(Authentication, [{
		key: "tick",
		value: function tick() {
			var _this2 = this;

			var i = 60,
			    doTick = void 0;
			this._t = setInterval(doTick = function doTick() {
				if (i == 0) {
					clearInterval(_this2._t);
					_this2.setState({ tick: 0 });
				} else _this2.setState({ tick: i-- });
			}, 1000);

			doTick();
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			if (this._t) clearInterval(this._t);
		}
	}, {
		key: "requestCode",
		value: function requestCode() {
			var _this3 = this;

			var _props = this.props,
			    contact = _props.contact,
			    setToken = _props.setToken,
			    requestToken = _props.requestToken;

			if (contact) {
				this.setState({ error: null, errName: null, exists: true });
				setToken("");
				requestToken({ contact: contact }).then(function (exists) {
					_this3.tick();
					_this3.setState({ exists: exists });
				}).catch(function (e) {
					return _this3.setState({ error: e.message });
				});
			}
		}
	}, {
		key: "login",
		value: function login() {
			var _this4 = this;

			var _props2 = this.props,
			    contact = _props2.contact,
			    token = _props2.token,
			    name = _props2.name,
			    success = _props2.success,
			    onSuccess = _props2.onSuccess,
			    login = _props2.login;
			var exists = this.state.exists;

			if (contact && (name || exists) && token) {
				this.setState({ error: undefined });
				login({ contact: contact, token: token, name: name }).then(function (user) {
					return (onSuccess || success)(user);
				}).catch(function (e) {
					return _this4.setState({ error: e.message });
				});
			}
		}
	}, {
		key: "render",
		value: function render() {
			var _this5 = this;

			var _props3 = this.props,
			    contact = _props3.contact,
			    setContact = _props3.setContact,
			    token = _props3.token,
			    setToken = _props3.setToken,
			    name = _props3.name,
			    setName = _props3.setName,
			    success = _props3.success,
			    onSuccess = _props3.onSuccess;
			var login = this.props.login;
			var _state = this.state,
			    tick = _state.tick,
			    error = _state.error,
			    errName = _state.errName,
			    exists = _state.exists;

			var btnRequest = void 0,
			    btnLogin = void 0,
			    inputName = void 0;
			if (contact) {
				if (tick) {
					btnRequest = React__default.createElement(materialUi.FlatButton, { label: tick, disabled: true });
				} else {
					btnRequest = React__default.createElement(materialUi.FlatButton, { label: tick === 0 ? "重新申请" : "申请验证码",
						onClick: this.requestCode.bind(this) });
				}

				if (!exists) {
					inputName = React__default.createElement(materialUi.TextField, {
						fullWidth: true,
						floatingLabelText: "\u65B0\u7528\u6237\u540D\u79F0/\u6635\u79F0",
						errorText: errName,
						onChange: function onChange(_ref2) {
							var value = _ref2.target.value;

							setName(value);
						}
					});
				}

				if ((name || exists) && token) {
					btnLogin = React__default.createElement(materialUi.FlatButton, {
						label: "\u767B\u5F55",
						primary: true,
						onClick: this.login.bind(this)
					});
				}
			}

			return React__default.createElement(
				"div",
				null,
				React__default.createElement(
					"div",
					{ style: { display: "table", tableLayout: "fixed", width: "100%" } },
					React__default.createElement(
						"div",
						{ style: { display: "table-cell" } },
						React__default.createElement(materialUi.TextField, {
							fullWidth: true,
							floatingLabelText: "\u624B\u673A\u53F7/Email",
							disabled: !!tick,
							errorText: contact && !token ? error : null,
							onChange: function onChange(_ref3) {
								var value = _ref3.target.value;
								return setContact(_this5.validate(value));
							},
							onKeyDown: function onKeyDown(e) {
								return e.keyCode == ENTER && _this5.requestCode();
							}
						})
					),
					React__default.createElement(
						"div",
						{ style: { display: "table-cell", textAlign: "right", width: !!btnRequest ? "8em" : 0 } },
						btnRequest
					)
				),
				React__default.createElement(materialUi.TextField, {
					value: token,
					fullWidth: true,
					floatingLabelText: "\u9A8C\u8BC1\u7801",
					errorText: contact && token ? error : null,
					onChange: function onChange(_ref4) {
						var value = _ref4.target.value;
						return setToken(value);
					},
					onKeyDown: function onKeyDown(e) {
						return e.keyCode == ENTER && _this5.login();
					}
				}),
				inputName,
				React__default.createElement(
					"center",
					null,
					btnLogin
				)
			);
		}
	}, {
		key: "validate",
		value: function validate(v) {
			return isEmail(v) || isPhone(v) ? v : undefined;
		}
	}]);
	return Authentication;
}(React.Component);

Authentication.propTypes = {
	onSuccess: PropTypes.func
};
var Authentication$1 = recompose.compose(recompose.withState("done", "success"), recompose.branch(function (_ref5) {
	var done = _ref5.done;
	return done;
}, recompose.renderComponent(function () {
	return React__default.createElement(
		"span",
		null,
		"\u6210\u529F"
	);
})), recompose.withState("contact", "setContact"), recompose.withState("token", "setToken", ""), recompose.withState("name", "setName"), notSupport, withMutation({
	name: "requestToken",
	promise: true,
	mutation: reactRelay.graphql(_templateObject$1)
}), withMutation({
	name: "login",
	promise: true,
	mutation: reactRelay.graphql(_templateObject2$1)
}))(Authentication);

var Tutorial = function Tutorial(_ref) {
	var _ref$slides = _ref.slides,
	    slides = _ref$slides === undefined ? [] : _ref$slides,
	    onEnd = _ref.onEnd,
	    _ref$landscape = _ref.landscape,
	    landscape = _ref$landscape === undefined ? false : _ref$landscape;
	return React__default.createElement(
		"div",
		null,
		React__default.createElement(
			MediaQuery,
			{ orientation: "landscape" },
			function (match) {
				return match && (landscape = true) && null;
			}
		),
		React__default.createElement(
			materialAutoRotatingCarousel.AutoRotatingCarousel,
			{ open: true,
				label: "\u5F00\u59CB\u4F53\u9A8C",
				landscape: landscape,
				mobile: typeof cordova != 'undefined',
				onStart: onEnd },
			slides.map(function (a, i) {
				if (React__default.isValidElement(a)) return a;

				if (typeof a == 'string') a = { media: a };

				if (typeof a.media == "string") a.media = React__default.createElement("img", { src: a.media });

				return React__default.createElement(materialAutoRotatingCarousel.Slide, _extends({ key: i }, _extends({ title: "", subtitle: "" }, a)));
			})
		)
	);
};

var CountDown = function (_Component) {
	inherits(CountDown, _Component);

	function CountDown() {
		var _ref;

		var _temp, _this, _ret;

		classCallCheck(this, CountDown);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = CountDown.__proto__ || Object.getPrototypeOf(CountDown)).call.apply(_ref, [this].concat(args))), _this), _this.state = { n: _this.props.n || 60 }, _temp), possibleConstructorReturn(_this, _ret);
	}

	createClass(CountDown, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this2 = this;

			this.timer = setInterval(function () {
				_this2.setState(function (_ref2) {
					var n = _ref2.n;

					n--;
					if (n == 0) {
						clearInterval(_this2.timer);
						_this2.props.onEnd();
					}
					if (n >= 0) return { n: n };
				});
			}, 1000);
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			clearInterval(this.timer);
		}
	}, {
		key: "render",
		value: function render() {
			return React__default.createElement(
				"span",
				null,
				this.state.n
			);
		}
	}]);
	return CountDown;
}(React.Component);

CountDown.propTypes = {
	n: PropTypes.number,
	onEnd: PropTypes.func.isRequired
};

var SplashAD = function SplashAD(_ref, _ref2) {
	var _ref2$theme$page = _ref2.theme.page,
	    width = _ref2$theme$page.width,
	    height = _ref2$theme$page.height;
	var url = _ref.url,
	    children = _ref.children,
	    props = objectWithoutProperties(_ref, ["url", "children"]);
	return React__default.createElement(
		FullPage,
		{ style: {
				backgroundColor: "transparent",
				backgroundImage: url ? url + "?width=" + width + "&height=" + height : undefined
			} },
		React__default.createElement(
			"div",
			{ className: "sticky top right",
				onClick: props.onEnd,
				style: {
					minWidth: "5em",
					textAlign: "center",
					padding: 5,
					backgroundColor: "black",
					opacity: 0.3,
					color: "white",
					borderRadius: 5
				} },
			React__default.createElement(CountDown, _extends({ n: 3 }, props)),
			"s \u8DF3\u8FC7"
		)
	);
};
SplashAD.contextTypes = {
	theme: PropTypes.object
};

var THEME = getMuiTheme(LightBaseTheme, {
	footbar: {
		height: 50
	},
	page: {
		width: window.innerWidth > 960 ? 960 : window.innerWidth,
		height: window.innerHeight
	}
});

var DOMAIN = "qili";

var ACTION = {
	CHECK_VERSION: function CHECK_VERSION(homepage, currentVersion) {
		return function (dispatch) {
			fetch(homepage + "/app.apk.version").then(function (res) {
				return res.text();
			}).then(function (version) {
				return dispatch({ type: "@@" + DOMAIN + "/LASTEST_VERSION", payload: ver });
			}).catch(function (e) {
				return e;
			});
		};
	},
	CURRENT_USER: function CURRENT_USER(user) {
		return {
			type: "@@" + DOMAIN + "/USER_CHANGED",
			payload: user
		};
	},
	TUTORIALIZED: { type: "@@" + DOMAIN + "/TUTORIALIZED" },
	LOGOUT: { type: "@@" + DOMAIN + "/LOGOUT" },
	LOADING: function LOADING(payload) {
		return { type: "@@" + DOMAIN + "/LOADING", payload: payload };
	},
	MESSAGE: function MESSAGE(payload) {
		return {
			type: "@@" + DOMAIN + "/MESSAGE",
			payload: typeof payload == "string" ? { message: payload } : payload
		};
	},
	AD_DONE: { type: "@@" + DOMAIN + "/ADDONE" },
	READY: { type: "@@" + DOMAIN + "/INITED" },
	REPORT: function REPORT(report) {
		return { type: "@@" + DOMAIN + "/OPTICS", payload: report };
	},
	ONLINE: function ONLINE() {
		return { type: "@@" + DOMAIN + "/ONLINE" };
	},
	OFFLINE: function OFFLINE() {
		return { type: "@@" + DOMAIN + "/OFFLINE" };
	}
};

var REDUCER = function REDUCER() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { networkStatus: "online" };
	var _ref = arguments[1];
	var type = _ref.type,
	    payload = _ref.payload;

	switch (type) {
		case "@@" + DOMAIN + "/OPTICS":
			return _extends({}, state, { optics: _extends({ toJSON: function toJSON() {
						return undefined;
					} }, payload) });
		case "@@" + DOMAIN + "/INITED":
			return _extends({}, state, { inited: { toJSON: function toJSON() {
						return undefined;
					} } });
		case "@@" + DOMAIN + "/ADDONE":
			return _extends({}, state, { AD: { toJSON: function toJSON() {
						return undefined;
					} } });
		case "@@" + DOMAIN + "/USER_CHANGED":
			return _extends({}, state, { user: payload });
		case "@@" + DOMAIN + "/TUTORIALIZED":
			return _extends({}, state, { tutorialized: true });
		case "@@" + DOMAIN + "/LOGOUT":
			return _extends({}, state, { user: _extends({}, state.user, { token: undefined }) });
		case "@@" + DOMAIN + "/LASTEST_VERSION":
			return _extends({}, state, { latestVersion: payload });
		case "@@" + DOMAIN + "/LOADING":
			return _extends({}, state, { loading: !!payload });
		case "@@" + DOMAIN + "/MESSAGE":
			return _extends({}, state, { message: payload });
		case "@@" + DOMAIN + "/OFFLINE":
			return _extends({}, state, { networkStatus: "offline" });
		case "@@" + DOMAIN + "/ONLINE":
			return _extends({}, state, { networkStatus: "online" });
	}

	return state;
};

var UI = function UI(_ref2) {
	var muiTheme = _ref2.muiTheme,
	    _ref2$children = _ref2.children,
	    children = _ref2$children === undefined ? "hello Qili!" : _ref2$children;
	return React__default.createElement(
		MuiThemeProvider,
		{ muiTheme: muiTheme },
		React__default.createElement(
			"div",
			{ className: "withFootbar" },
			React__default.createElement(
				"div",
				{ id: "container", style: { overflowY: "scroll" } },
				children
			)
		)
	);
};

var Loading = reactRedux.connect(function (state) {
	return { loading: !!state[DOMAIN].loading };
})(function (_ref3) {
	var loading = _ref3.loading;
	return React__default.createElement(
		"div",
		{ className: "sticky top right", style: { zIndex: 1000 } },
		React__default.createElement(CircularProgress, { style: { display: loading ? undefined : "none" } })
	);
});

var Message = reactRedux.connect(function (state) {
	return _extends({ level: "info" }, state[DOMAIN].message);
})(function (_ref4) {
	var level = _ref4.level,
	    message = _ref4.message,
	    dispatch = _ref4.dispatch,
	    _ref4$duration = _ref4.duration,
	    duration = _ref4$duration === undefined ? level == "info" ? 1000 : 3000 : _ref4$duration;
	return React__default.createElement(Snackbar, {
		open: !!message,
		contentStyle: { color: level == "info" ? "white" : "red" },
		message: message || "",
		autoHideDuration: duration,
		onRequestClose: function onRequestClose(e) {
			return dispatch(ACTION.MESSAGE());
		}
	});
});

var QiliApp = function (_Component) {
	inherits(QiliApp, _Component);

	function QiliApp() {
		classCallCheck(this, QiliApp);
		return possibleConstructorReturn(this, (QiliApp.__proto__ || Object.getPrototypeOf(QiliApp)).apply(this, arguments));
	}

	createClass(QiliApp, [{
		key: "render",
		value: function render() {
			var _props = this.props,
			    theme = _props.theme,
			    store = _props.store,
			    children = _props.children,
			    isDev = _props.isDev,
			    _props$notifyOffline = _props.notifyOffline,
			    notifyOffline = _props$notifyOffline === undefined ? true : _props$notifyOffline;

			return React__default.createElement(
				reactRedux.Provider,
				{ store: store },
				React__default.createElement(
					UI,
					{ muiTheme: theme },
					notifyOffline ? React__default.createElement(Notification, null) : null,
					children,
					React__default.createElement(Loading, null),
					React__default.createElement(Message, null),
					isDev ? React__default.createElement(Performance$1, null) : null
				)
			);
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			var _props2 = this.props,
			    title = _props2.title,
			    checkVersion = _props2.checkVersion;

			if (title) {
				document.title = title;
			}
			checkVersion();
		}
	}]);
	return QiliApp;
}(React.Component);

QiliApp.propsTypes = {
	theme: PropTypes.object.isRequired,
	store: PropTypes.object.isRequired,
	checkVersion: PropTypes.func.isRequired,
	title: PropTypes.string,
	notifyOffline: PropTypes.bool
};
var index$1 = recompose.compose(recompose.setDisplayName("QiliApp"), recompose.setPropTypes({
	appId: PropTypes.string.isRequired,
	service: PropTypes.string,
	store: PropTypes.object,
	theme: PropTypes.object,
	offlineTheme: PropTypes.object,
	tutorial: PropTypes.arrayOf(PropTypes.string),
	project: PropTypes.object,
	isDev: PropTypes.bool,
	notifyOffline: PropTypes.bool,
	supportOffline: PropTypes.object
}), recompose.setStatic("render", function (app) {
	var container = document.getElementById('app');
	if (!container) {
		container = document.createElement('div');
		container.id = 'app';
		document.body.appendChild(container);
	}

	var style = document.createElement("style");
	document.getElementsByTagName("head")[0].appendChild(style);

	function size() {
		style.innerHTML = ".page{min-height:" + window.innerHeight + "px}";
		container.style.height = window.innerHeight + 'px';
		THEME.page.height = window.innerHeight;
	}

	size();
	supportTap();
	window.addEventListener("resize", size);

	return reactDom.render(app, container);
}), recompose.defaultProps({
	service: "http://qili2.com/1/graphql",
	theme: THEME
}), recompose.branch(function (_ref5) {
	var appId = _ref5.appId;
	return !appId;
}, recompose.renderComponent(function (_ref6) {
	var theme = _ref6.theme;
	return React__default.createElement(
		UI,
		{ muiTheme: theme },
		React__default.createElement(
			Empty,
			{ icon: null },
			React__default.createElement(
				"ol",
				{ style: { textAlign: "left" } },
				React__default.createElement(
					"li",
					null,
					"\u5728app.qili.com\u4E0A\u521B\u5EFA\u4E00\u4E2A\u5E94\u7528\uFF0C\u83B7\u53D6AppId"
				),
				React__default.createElement(
					"li",
					null,
					"\u521B\u5EFA\u4E00\u4E2AReact Component",
					React__default.createElement(
						"pre",
						null,
						"\n\t\timport React from \"react\"\n\t\timport QiliApp from \"qili-app\"\n\t\tconst MyApp=()=>(\n\t\t\t<QiliApp appId=\"xxxx\">\n\t\t\t\thello qili!\n\t\t\t</QiliApp>\n\t\t)\n\t\tQiliApp.render(<MyApp/>)\n\t\t\t\t\t\t"
					)
				),
				React__default.createElement(
					"li",
					null,
					"Have fun"
				)
			)
		)
	);
})), recompose.withProps(function (_ref7) {
	var store = _ref7.store,
	    reducers = _ref7.reducers,
	    appId = _ref7.appId,
	    project = _ref7.project,
	    isDev = _ref7.isDev;

	File.root = appId;
	if (!store) {
		var composeEnhancers = process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || recompose.compose;
		store = redux.createStore(redux.combineReducers(_extends(defineProperty({}, DOMAIN, REDUCER), reducers)), composeEnhancers(redux.applyMiddleware(thunk), reduxPersist.autoRehydrate()));

		reduxPersist.persistStore(store, { keyPrefix: appId + ":" }, function () {
			store.dispatch(ACTION.ONLINE());
			store.dispatch(ACTION.READY);
		});

		var dispatch = store.dispatch.bind(store);

		var props = {
			store: store,
			checkVersion: function checkVersion() {
				project && dispatch(ACTION.CHECK_VERSION(project.homepage, project.version));
			},
			tutorialize: function tutorialize() {
				dispatch(ACTION.TUTORIALIZED);
			},
			setUser: function setUser(user) {
				dispatch(ACTION.CURRENT_USER(user));
			},
			loading: function loading(a) {
				//dispatch(ACTION.LOADING(a))
			},
			showMessage: function showMessage(m) {
				dispatch(ACTION.MESSAGE(m));
			},
			doneAD: function doneAD() {
				dispatch(ACTION.AD_DONE);
			},
			optics: function optics(report) {
				if (isDev) dispatch(ACTION.REPORT(report));
			},
			network: function network(status) {
				switch (status) {
					case "online":
						dispatch(ACTION.ONLINE());
						break;
					case "offline":
						dispatch(ACTION.OFFLINE());
						break;
					default:
						return store.getState().qili.networkStatus;

				}
			}
		};

		window.addEventListener('online', function () {
			return props.network("online");
		});
		window.addEventListener('offline', function () {
			return props.network("offline");
		});

		return props;
	}
}), recompose.withContext({
	is: PropTypes.object,
	project: PropTypes.object,
	loading: PropTypes.func,
	showMessage: PropTypes.func,
	theme: PropTypes.object,
	optics: PropTypes.func
}, function (_ref8) {
	var project = _ref8.project,
	    loading = _ref8.loading,
	    showMessage = _ref8.showMessage,
	    theme = _ref8.theme,
	    optics = _ref8.optics;
	return {
		is: {
			app: typeof cordova !== "undefined"
		},
		project: project,
		loading: loading,
		showMessage: showMessage,
		theme: theme,
		optics: optics
	};
}), reactRedux.connect(function (_ref9) {
	var _ref9$qili = _ref9.qili,
	    inited = _ref9$qili.inited,
	    AD = _ref9$qili.AD,
	    tutorialized = _ref9$qili.tutorialized;

	var props = {};
	if (inited != undefined) props.inited = inited;
	if (AD != undefined) props.AD = AD;
	if (tutorialized != undefined) props.tutorialized = tutorialized;
	return props;
}), recompose.branch(function (_ref10) {
	var tutorialized = _ref10.tutorialized,
	    _ref10$tutorial = _ref10.tutorial,
	    tutorial = _ref10$tutorial === undefined ? [] : _ref10$tutorial;
	return !tutorialized && tutorial.length;
}, recompose.renderComponent(function (_ref11) {
	var tutorial = _ref11.tutorial,
	    tutorialize = _ref11.tutorialize,
	    theme = _ref11.theme,
	    store = _ref11.store;
	return React__default.createElement(
		reactRedux.Provider,
		{ store: store },
		React__default.createElement(
			UI,
			{ muiTheme: theme },
			React__default.createElement(Tutorial, { slides: tutorial, onEnd: tutorialize })
		)
	);
})), recompose.branch(function (_ref12) {
	var AD = _ref12.AD,
	    adUrl = _ref12.adUrl;
	return !AD && adUrl;
}, recompose.renderComponent(function (_ref13) {
	var doneAD = _ref13.doneAD,
	    adUrl = _ref13.adUrl;
	return React__default.createElement(SplashAD, { url: adUrl, onEnd: doneAD });
})), recompose.branch(function (_ref14) {
	var inited = _ref14.inited;
	return !inited;
}, recompose.renderNothing), reactRedux.connect(function (_ref15) {
	var user = _ref15.qili.user;
	return user !== undefined ? { user: user } : {};
}), withGraphqlClient(), recompose.branch(function (_ref16) {
	var user = _ref16.user;
	return !user || !user.token;
}, recompose.renderComponent(function (_ref17) {
	var theme = _ref17.theme,
	    store = _ref17.store,
	    setUser = _ref17.setUser;
	return React__default.createElement(
		reactRedux.Provider,
		{ store: store },
		React__default.createElement(
			UI,
			{ muiTheme: theme },
			React__default.createElement(
				"div",
				{ style: { margin: 10 } },
				React__default.createElement(Authentication$1, { onSuccess: setUser })
			),
			React__default.createElement(Loading, null),
			React__default.createElement(Message, null)
		)
	);
})), recompose.mapProps(function (_ref18) {
	var title = _ref18.title,
	    theme = _ref18.theme,
	    checkVersion = _ref18.checkVersion,
	    store = _ref18.store,
	    children = _ref18.children,
	    isDev = _ref18.isDev,
	    notifyOffline = _ref18.notifyOffline,
	    supportOffline = _ref18.supportOffline;
	return { title: title, theme: theme, checkVersion: checkVersion, store: store, children: children, isDev: isDev, notifyOffline: notifyOffline, supportOffline: supportOffline };
}), recompose.pure)(QiliApp);

exports.THEME = THEME;
exports.DOMAIN = DOMAIN;
exports.ACTION = ACTION;
exports.REDUCER = REDUCER;
exports.QiliApp = QiliApp;
exports.default = index$1;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbInNyYy9jb21wb25lbnRzL2xvZ28uanMiLCJzcmMvY29tcG9uZW50cy9lbXB0eS5qcyIsInNyYy90b29scy9yZWxheS93aXRoUXVlcnkuanMiLCJzcmMvdG9vbHMvcmVsYXkvd2l0aEZyYWdtZW50LmpzIiwic3JjL3Rvb2xzL3NwcmVhZC1yZXNwb25zZS5qcyIsInNyYy90b29scy9yZWxheS93aXRoTXV0YXRpb24uanMiLCJzcmMvdG9vbHMvcmVsYXkvZW52aXJvbm1lbnQuanMiLCJzcmMvdG9vbHMvcmVsYXkvd2l0aEdyYXBocWxDbGllbnQuanMiLCJzcmMvdG9vbHMvcmVsYXkvd2l0aFBhZ2luYXRpb24uanMiLCJzcmMvdG9vbHMvd2l0aEluaXQuanMiLCJzcmMvdG9vbHMvZGF0ZS5qcyIsInNyYy9jb21wb25lbnRzL3BlcmZvcm1hbmNlLmpzIiwic3JjL2NvbXBvbmVudHMvZmlsZS5qcyIsInNyYy9jb21wb25lbnRzL2Z1bGwtcGFnZS5qcyIsInNyYy9jb21wb25lbnRzL29mZmxpbmUuanMiLCJzcmMvY29tcG9uZW50cy9hdXRoZW50aWNhdGlvbi5qcyIsInNyYy9jb21wb25lbnRzL3R1dG9yaWFsLmpzIiwic3JjL2NvbXBvbmVudHMvY291bnQtZG93bi5qcyIsInNyYy9jb21wb25lbnRzL3NwbGFzaC1hZC5qcyIsInNyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQge1N2Z0ljb259IGZyb20gJ21hdGVyaWFsLXVpJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9nbyBleHRlbmRzIENvbXBvbmVudHtcclxuICByZW5kZXIoKSB7XHJcbiAgICAgIHZhciB7ZHJhd1N0eWxlPXt9LCAuLi5vdGhlcnN9PXRoaXMucHJvcHNcclxuICAgICAgdmFyIHt0ZXh0U3Ryb2tlPVwibGlnaHRncmF5XCIsIC4uLm90aGVyRHJhd1N0eWxlfT1PYmplY3QuYXNzaWduKHtcclxuICAgICAgICAgICAgICBmaWxsOlwibm9uZVwiLFxyXG4gICAgICAgICAgICAgIHN0cm9rZTpcInJnYigyMDAsMjAwLDIwMClcIixcclxuICAgICAgICAgICAgICBzdHJva2VXaWR0aDoxLFxyXG4gICAgICAgICAgICAgIGZvbnRTaXplOjVcclxuICAgICAgICAgIH0sZHJhd1N0eWxlKVxyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxTdmdJY29uIHsuLi5vdGhlcnN9PlxyXG4gICAgICAgIDxnIHsuLi5vdGhlckRyYXdTdHlsZX0+XHJcblx0XHRcdDxwYXRoIGQ9XCJNNiAxOGMwIC41NS40NSAxIDEgMWgxdjMuNWMwIC44My42NyAxLjUgMS41IDEuNXMxLjUtLjY3IDEuNS0xLjVWMTloMnYzLjVjMCAuODMuNjcgMS41IDEuNSAxLjVzMS41LS42NyAxLjUtMS41VjE5aDFjLjU1IDAgMS0uNDUgMS0xVjhINnYxMHpNMy41IDhDMi42NyA4IDIgOC42NyAyIDkuNXY3YzAgLjgzLjY3IDEuNSAxLjUgMS41UzUgMTcuMzMgNSAxNi41di03QzUgOC42NyA0LjMzIDggMy41IDh6bTE3IDBjLS44MyAwLTEuNS42Ny0xLjUgMS41djdjMCAuODMuNjcgMS41IDEuNSAxLjVzMS41LS42NyAxLjUtMS41di03YzAtLjgzLS42Ny0xLjUtMS41LTEuNXptLTQuOTctNS44NGwxLjMtMS4zYy4yLS4yLjItLjUxIDAtLjcxLS4yLS4yLS41MS0uMi0uNzEgMGwtMS40OCAxLjQ4QzEzLjg1IDEuMjMgMTIuOTUgMSAxMiAxYy0uOTYgMC0xLjg2LjIzLTIuNjYuNjNMNy44NS4xNWMtLjItLjItLjUxLS4yLS43MSAwLS4yLjItLjIuNTEgMCAuNzFsMS4zMSAxLjMxQzYuOTcgMy4yNiA2IDUuMDEgNiA3aDEyYzAtMS45OS0uOTctMy43NS0yLjQ3LTQuODR6TTEwIDVIOVY0aDF2MXptNSAwaC0xVjRoMXYxelwiLz5cclxuICAgICAgICA8L2c+XHJcbiAgICA8L1N2Z0ljb24+XHJcbiAgICApXHJcbiAgfVxyXG59IiwiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCdcclxuaW1wb3J0IEljb25Mb2dvIGZyb20gXCIuL2xvZ29cIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgKHtpY29uPTxJY29uTG9nby8+LCB0ZXh0PSdFbXB0eScsIGNoaWxkcmVuLCAuLi5vdGhlcnN9KT0+KFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJlbXB0eVwiIHsuLi5vdGhlcnN9PlxyXG4gICAgICAgIHtpY29ufVxyXG4gICAgICAgIDxkaXY+e2NoaWxkcmVufHx0ZXh0fTwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbikiLCJpbXBvcnQgUmVhY3QsIHtQdXJlQ29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcclxuaW1wb3J0IHtRdWVyeVJlbmRlcmVyfSBmcm9tIFwicmVhY3QtcmVsYXlcIlxyXG5pbXBvcnQge2NvbXBvc2UsIGNyZWF0ZUVhZ2VyRmFjdG9yeSwgc2V0RGlzcGxheU5hbWUsIHdyYXBEaXNwbGF5TmFtZSwgZ2V0Q29udGV4dH0gZnJvbSBcInJlY29tcG9zZVwiXHJcblxyXG5pbXBvcnQgRW1wdHkgZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvZW1wdHlcIlxyXG5pbXBvcnQgSWNvbkVycm9yIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWxlcnQvZXJyb3JcIlxyXG5cclxuY2xhc3MgV3JhcHBlciBleHRlbmRzIFB1cmVDb21wb25lbnR7XHJcblx0Y29tcG9uZW50V2lsbE1vdW50KCl7XHJcblx0XHR0aGlzLnByb3BzLmhhbmRsZSgpXHJcblx0fVxyXG5cdHJlbmRlcigpe1xyXG5cdFx0cmV0dXJuIFJlYWN0LkNoaWxkcmVuLm9ubHkodGhpcy5wcm9wcy5jaGlsZHJlbilcclxuXHR9XHJcbn1cclxuZXhwb3J0IGNvbnN0IHdpdGhRdWVyeT1vcHRpb249PkJhc2VDb21wb25lbnQ9PntcclxuXHRjb25zdCBmYWN0b3J5PWNyZWF0ZUVhZ2VyRmFjdG9yeShRdWVyeVJlbmRlcmVyKVxyXG5cdGNvbnN0IFdpdGhRdWVyeT1jb21wb3NlKFxyXG5cdFx0XHRnZXRDb250ZXh0KHtjbGllbnQ6UHJvcFR5cGVzLm9iamVjdH0pLFxyXG5cdFx0XHRjb25uZWN0KCksXHJcblx0XHQpKCh7Y2xpZW50OmVudmlyb25tZW50LGRpc3BhdGNoLC4uLm90aGVyc30pPT57XHJcblx0XHRcdGNvbnN0IHtxdWVyeSwgb25TdWNjZXNzLCBvbkVycm9yLCAuLi5tb3JlfT10eXBlb2Yob3B0aW9uKT09XCJmdW5jdGlvblwiID8gb3B0aW9uKG90aGVycykgOiBvcHRpb25cclxuXHRcdFx0Ly8vLy8vaGFjazogbWFrZSB2YXJpYWJsZXMgZGVmYXVsdCB1bmRlZmluZWQgYXMgdW5kZWZpbmVkXHJcblx0XHRcdHF1ZXJ5KCkucXVlcnkuYXJndW1lbnREZWZpbml0aW9ucy5mb3JFYWNoKGRlZj0+e1xyXG5cdFx0XHRcdGlmKGRlZi5kZWZhdWx0VmFsdWU9PT1udWxsKXtcclxuXHRcdFx0XHRcdGRlZi5kZWZhdWx0VmFsdWU9dW5kZWZpbmVkXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cclxuXHRcdFx0cmV0dXJuIGZhY3Rvcnkoe1xyXG5cdFx0XHRcdHJlbmRlcih7ZXJyb3IsIHByb3BzfSl7XHJcblx0XHRcdFx0XHRpZihwcm9wcyl7XHJcblx0XHRcdFx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0XHRcdFx0PFdyYXBwZXIgaGFuZGxlPXsoKT0+b25TdWNjZXNzICYmIG9uU3VjY2Vzcyhwcm9wcyxkaXNwYXRjaCl9PlxyXG5cdFx0XHRcdFx0XHRcdFx0PEJhc2VDb21wb25lbnQgey4uLm90aGVyc30gey4uLnByb3BzfSBkYXRhPXtwcm9wc30vPlxyXG5cdFx0XHRcdFx0XHRcdDwvV3JhcHBlcj5cclxuXHRcdFx0XHRcdFx0KVxyXG5cdFx0XHRcdFx0fWVsc2UgaWYoZXJyb3Ipe1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdFx0XHRcdDxXcmFwcGVyIGhhbmRsZT17KCk9Pm9uRXJyb3IgJiYgb25FcnJvcihlcnJvcixkaXNwYXRjaCl9PlxyXG5cdFx0XHRcdFx0XHRcdFx0PEVtcHR5IGljb249ezxJY29uRXJyb3IgY29sb3I9XCJyZWRcIi8+fT5lcnJvcjoge2Vycm9yLnRvU3RyaW5nKCl9PC9FbXB0eT5cclxuXHRcdFx0XHRcdFx0XHQ8L1dyYXBwZXI+XHJcblx0XHRcdFx0XHRcdClcclxuXHRcdFx0XHRcdH1lbHNlIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIG51bGxcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGVudmlyb25tZW50LFxyXG5cdFx0XHRcdHF1ZXJ5LFxyXG5cdFx0XHRcdC4uLm1vcmUsXHJcblx0XHRcdFx0fSlcclxuXHRcdH0pXHJcblxyXG5cdGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XHJcblx0XHRyZXR1cm4gc2V0RGlzcGxheU5hbWUod3JhcERpc3BsYXlOYW1lKEJhc2VDb21wb25lbnQsICd3aXRoUXVlcnknKSkoV2l0aFF1ZXJ5KVxyXG5cdH1cclxuXHRyZXR1cm4gV2l0aFF1ZXJ5XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHdpdGhRdWVyeVxyXG4iLCJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIlxyXG5pbXBvcnQge2NvbXBvc2Usd2l0aFByb3BzLCBnZXRDb250ZXh0LCBzZXREaXNwbGF5TmFtZSwgd3JhcERpc3BsYXlOYW1lLGNyZWF0ZUVhZ2VyRmFjdG9yeX0gIGZyb20gXCJyZWNvbXBvc2VcIlxyXG5pbXBvcnQge2NyZWF0ZUZyYWdtZW50Q29udGFpbmVyLCBjcmVhdGVQYWdpbmF0aW9uQ29udGFpbmVyfSBmcm9tIFwicmVhY3QtcmVsYXlcIlxyXG5cclxuZXhwb3J0IGNvbnN0IHdpdGhGcmFnbWVudD1vcHRpb25zPT5CYXNlQ29tcG9uZW50PT57XHJcblx0bGV0IFdpdGhGcmFnbWVudD1udWxsXHJcblx0aWYoaXNQYWdpbmF0aW9uKG9wdGlvbnMpKXtcclxuXHRcdFdpdGhGcmFnbWVudD1nZXRDb250ZXh0KHtwYWdpbmF0aW9uOlByb3BUeXBlcy5hbnl9KSgoe3BhZ2luYXRpb24sIC4uLnByb3BzfSk9PntcclxuXHRcdFx0bGV0IHtxdWVyeSx2YXJpYWJsZXMsIGRpcmVjdGlvbixnZXRWYXJpYWJsZXMsIGdldENvbm5lY3Rpb25Gcm9tUHJvcHMsIGdldEZyYWdtZW50VmFyaWFibGVzfT10eXBlb2YocGFnaW5hdGlvbik9PVwiZnVuY3Rpb25cIiA/IHBhZ2luYXRpb24ocHJvcHMpIDogcGFnaW5hdGlvblxyXG5cdFx0XHRsZXQgZmFjdG9yeT1jcmVhdGVFYWdlckZhY3RvcnkoY3JlYXRlUGFnaW5hdGlvbkNvbnRhaW5lcihCYXNlQ29tcG9uZW50LCBvcHRpb25zLCB7XHJcblx0XHRcdFx0Z2V0VmFyaWFibGVzKHByb3BzLHtjb3VudCxjdXJzb3J9KXtcclxuXHRcdFx0XHRcdGlmKGdldFZhcmlhYmxlcylcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGdldFZhcmlhYmxlcyguLi5hcmd1bWVudHMpXHJcblx0XHRcdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdFx0XHQuLi52YXJpYWJsZXMsXHJcblx0XHRcdFx0XHRcdGNvdW50LFxyXG5cdFx0XHRcdFx0XHRjdXJzb3IsXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRkaXJlY3Rpb24sXHJcblx0XHRcdFx0Z2V0Q29ubmVjdGlvbkZyb21Qcm9wcyxcclxuXHRcdFx0XHRnZXRGcmFnbWVudFZhcmlhYmxlcyxcclxuXHRcdFx0XHRxdWVyeSxcclxuXHRcdFx0fSkpXHJcblx0XHRcdHJldHVybiBmYWN0b3J5KHByb3BzKVxyXG5cdFx0fSlcclxuXHR9ZWxzZXtcclxuXHRcdGxldCBmYWN0b3J5PWNyZWF0ZUVhZ2VyRmFjdG9yeShCYXNlQ29tcG9uZW50KVxyXG5cdFx0V2l0aEZyYWdtZW50PWNyZWF0ZUZyYWdtZW50Q29udGFpbmVyKHByb3BzPT5mYWN0b3J5KHByb3BzKSxvcHRpb25zKVxyXG5cdH1cclxuXHJcblx0aWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcclxuXHRcdHJldHVybiBzZXREaXNwbGF5TmFtZSh3cmFwRGlzcGxheU5hbWUoQmFzZUNvbXBvbmVudCwgJ3dpdGhGcmFnbWVudCcpKShXaXRoRnJhZ21lbnQpXHJcblx0fVxyXG5cdHJldHVybiBXaXRoRnJhZ21lbnRcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgd2l0aEZyYWdtZW50XHJcblxyXG5cclxuZnVuY3Rpb24gaXNQYWdpbmF0aW9uKGdxbCl7XHJcblx0bGV0IHttZXRhZGF0YX09Z3FsW09iamVjdC5rZXlzKGdxbClbMF1dKClcclxuXHRyZXR1cm4gbWV0YWRhdGEgJiYgbWV0YWRhdGEuY29ubmVjdGlvbiAmJiBtZXRhZGF0YS5jb25uZWN0aW9uLmxlbmd0aD4wXHJcbn1cclxuXHJcbmNvbnN0IHRyaW09bz0+T2JqZWN0LmtleXMobykucmVkdWNlKChvLGspPT57XHJcbiAgaWYob1trXT09PW51bGwpe1xyXG5cdCAgb1trXT11bmRlZmluZWRcclxuICB9ZWxzZSBpZih0eXBlb2Yob1trXSk9PVwib2JqZWN0XCIpe1xyXG5cdCAgdHJpbShvW2tdKVxyXG4gIH1cclxuICByZXR1cm4gb1xyXG59LG8pXHJcbiIsImV4cG9ydCBmdW5jdGlvbiBzcHJlYWRSZXNwb25zZShyZXMsIHNwcmVhZCwgcHJvcHMpe1xyXG5cdGxldCB2YWx1ZXM9cmVzXHJcblx0aWYodHlwZW9mKHNwcmVhZCk9PVwiZnVuY3Rpb25cIil7XHJcblx0XHR2YWx1ZXM9c3ByZWFkKHJlcywgcHJvcHMpXHJcblx0fWVsc2UgaWYodHlwZW9mKHNwcmVhZCk9PVwic3RyaW5nXCIpe1xyXG5cdFx0dmFsdWVzPXJlc1tzcHJlYWRdXHJcblx0fWVsc2UgaWYoc3ByZWFkIT09ZmFsc2Upe1xyXG5cdFx0bGV0IGtleXM9T2JqZWN0LmtleXMocmVzKVxyXG5cdFx0aWYoa2V5cy5sZW5ndGg9PTEpe1xyXG5cdFx0XHRsZXQgdj1yZXNba2V5c1swXV1cclxuXHRcdFx0aWYodHlwZW9mKHYpPT1cIm9iamVjdFwiKXtcclxuXHRcdFx0XHR2YWx1ZXM9dlx0XHRcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHRyZXR1cm4gdmFsdWVzXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHNwcmVhZFJlc3BvbnNlIiwiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCJcclxuaW1wb3J0IHtjb21wb3NlLHdpdGhQcm9wcywgZ2V0Q29udGV4dCwgc2V0RGlzcGxheU5hbWUsIHdyYXBEaXNwbGF5TmFtZSxjcmVhdGVFYWdlckZhY3RvcnkgfSBmcm9tIFwicmVjb21wb3NlXCJcclxuaW1wb3J0IHtjb21taXRNdXRhdGlvbn0gZnJvbSBcInJlYWN0LXJlbGF5XCJcclxuXHJcbmltcG9ydCBzcHJlYWRSZXNwb25zZSBmcm9tIFwiLi4vc3ByZWFkLXJlc3BvbnNlXCJcclxuXHJcbmNvbnN0IGlzRGF0ZT1kYXRlPT5kYXRlICYmIHR5cGVvZiBkYXRlLmdldE1vbnRoID09PSAnZnVuY3Rpb24nXHJcblxyXG4vKipcclxuICogb3B0aW9uczpcclxuICogYWxsIGNvbW1pdE11dGF0aW9uIG9wdGlvbnNcclxuICogc3ByZWFkPzogdG8gc3ByZWFkIHJlc3BvbnNlIG9uIGVsZW1lbnRcclxuICpcdFx0PmZ1bmN0aW9uKHJlc3BvbnNlLCBwcm9wcyk6IHJldHVybiB7fSB0byBiZSBzcHJlYWRcclxuICogXHRcdD5zdHJpbmcgOiByZXNwb25zZVtzcHJlYWRdXHJcbiAqIFx0XHQ+ZmFsc2U6IG5vIHNwcmVhZFxyXG4gKiBcdFx0PmFueSBvdGhlcjogc3ByZWFkIHJlc3BvbnNlW09iamVjdC5rZXlzKHJlc3BvbnNlKVswXV0gb25seSB3aGVuIGtleXMubGVuZ3RoPT0xXHJcbiAqIHBhdGNoND86IElELCBhdXRvIHVwZGF0ZSBjYWNoZSBzdG9yZSBmb3Igbm9kZVtwYXRjaDRdXHJcbiAqIHBhdGNoRGF0YT86IHt9LCBvbmx5IHdoZW4gcGF0Y2g0IHNwZWNpZmllZFxyXG4gKiBcdFx0OiBzcHJlYWQgaXQgdG8gbm9kZVtwYXRjaDRdIGluIGNhY2hlIHN0b3JlXHJcbiAqIFx0XHQ6IHNwcmVhZCBpbnB1dCBwYXJhbWV0ZXIgb2YgbXV0YXRlIHRvIG5vZGVbcGF0Y2g0XVxyXG4gKiBzaG91bGRQYXRjaChyZXMpOiBmYWxzZSB3aWxsIG5vdCBwYXRjaCwgZGVmYXVsdCBmdW5jdGlvbiBpcyBhbGwgcmVzb25zZSBhcmUgbm90IG51bGxcclxuICogcHJvbWlzZT86IGJvb2xlYW4sIG11dGF0ZSgpIHJldHVybiBwcm9taXNlXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNvbnN0IHdpdGhNdXRhdGlvbj1vcHRpb249PkJhc2VDb21wb25lbnQ9PntcclxuXHRjb25zdCBmYWN0b3J5PWNyZWF0ZUVhZ2VyRmFjdG9yeShCYXNlQ29tcG9uZW50KVxyXG5cdGNvbnN0IFdpdGhNdXRhdGlvbj1nZXRDb250ZXh0KHtcclxuXHRcdFx0Y2xpZW50OlByb3BUeXBlcy5vYmplY3QsXHJcblx0XHRcdHNob3dNZXNzYWdlOiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdFx0bG9hZGluZzogUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHR9KShcclxuXHRcdCh7Y2xpZW50OmVudmlyb25tZW50LCBzaG93TWVzc2FnZSwgbG9hZGluZywuLi5vdGhlcnN9KT0+e1xyXG5cdFx0XHRjb25zdCB7bmFtZT1cIm11dGF0ZVwiLG11dGF0aW9ufT10eXBlb2Yob3B0aW9uKT09XCJmdW5jdGlvblwiID8gb3B0aW9uKG90aGVycywge30sZW52aXJvbm1lbnQpIDogb3B0aW9uXHJcblxyXG5cdFx0XHQvLy8vLy9oYWNrOiBtYWtlIHZhcmlhYmxlcyBkZWZhdWx0IHVuZGVmaW5lZCBhcyB1bmRlZmluZWRcclxuXHRcdFx0bXV0YXRpb24oKS5xdWVyeS5hcmd1bWVudERlZmluaXRpb25zLmZvckVhY2goZGVmPT57XHJcblx0XHRcdFx0aWYoZGVmLmRlZmF1bHRWYWx1ZT09PW51bGwpXHJcblx0XHRcdFx0XHRkZWYuZGVmYXVsdFZhbHVlPXVuZGVmaW5lZFxyXG5cdFx0XHR9KVxyXG5cclxuXHRcdFx0ZnVuY3Rpb24gbXV0YXRlKGRhdGEpe1xyXG5cdFx0XHRcdGxvYWRpbmcodHJ1ZSlcclxuXHRcdFx0XHRjb25zdCB7c3ByZWFkLCB2YXJpYWJsZXMsIFxyXG5cdFx0XHRcdFx0cGF0Y2g0LCBwYXRjaERhdGEsc2hvdWxkUGF0Y2gsXHJcblx0XHRcdFx0XHRkZWxldGU0LFxyXG5cdFx0XHRcdFx0ZGF0ZUZpZWxkcz1bXSxcclxuXHRcdFx0XHRcdC4uLm11dGF0aW9ufT10eXBlb2Yob3B0aW9uKT09XCJmdW5jdGlvblwiID8gb3B0aW9uKG90aGVycywgZGF0YSwgZW52aXJvbm1lbnQpIDogb3B0aW9uXHJcblx0XHRcdFx0bGV0IHNtYXJ0PXt9XHJcblx0XHRcdFx0aWYocGF0Y2g0KXtcclxuXHRcdFx0XHRcdGNvbnN0IHVwZGF0ZXI9KGlkLGRhdGEpPT4oc3RvcmUscmVzKT0+e1xyXG5cdFx0XHRcdFx0XHRpZihyZXMpey8vdXBkYXRlciBvbmx5XHJcblx0XHRcdFx0XHRcdFx0aWYoc2hvdWxkUGF0Y2ggJiYgIXNob3VsZFBhdGNoKHJlcykpe1xyXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuXHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGxldCBlbnRpdHk9c3RvcmUuZ2V0KGlkKVxyXG5cdFx0XHRcdFx0XHRpZihlbnRpdHkpe1xyXG5cdFx0XHRcdFx0XHRcdE9iamVjdC5rZXlzKGRhdGEpXHJcblx0XHRcdFx0XHRcdFx0XHQuZm9yRWFjaChrPT57XHJcblx0XHRcdFx0XHRcdFx0XHRcdGVudGl0eS5zZXRWYWx1ZShpc0RhdGUoZGF0YVtrXSkgPyBkYXRhW2tdLnRvSVNPU3RyaW5nKCkgOiBkYXRhW2tdLGspXHJcblx0XHRcdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRzbWFydC51cGRhdGVyPXNtYXJ0Lm9wdGltaXN0aWNVcGRhdGVyPXVwZGF0ZXIocGF0Y2g0LCBwYXRjaERhdGF8fGRhdGEpXHJcblx0XHRcdFx0fWVsc2UgaWYoZGVsZXRlNCl7XHJcblx0XHRcdFx0XHRzbWFydC51cGRhdGVyPXNtYXJ0Lm9wdGltaXN0aWNVcGRhdGVyPXN0b3JlPT57XHJcblx0XHRcdFx0XHRcdHN0b3JlLmRlbGV0ZShkZWxldGU0KVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XHJcblx0XHRcdFx0XHRjb21taXRNdXRhdGlvbihlbnZpcm9ubWVudCx7XHJcblx0XHRcdFx0XHRcdHZhcmlhYmxlczp7Li4udmFyaWFibGVzLC4uLmRhdGF9LFxyXG5cdFx0XHRcdFx0XHQuLi5zbWFydCxcclxuXHRcdFx0XHRcdFx0Li4ubXV0YXRpb24sXHJcblx0XHRcdFx0XHRcdG9uRXJyb3I6IHJlamVjdCxcclxuXHRcdFx0XHRcdFx0b25Db21wbGV0ZWQocmVzLCBlcnJvcil7XHJcblx0XHRcdFx0XHRcdFx0bG9hZGluZyhmYWxzZSlcclxuXHRcdFx0XHRcdFx0XHRpZihlcnJvcil7XHJcblx0XHRcdFx0XHRcdFx0XHRyZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRcdFx0XHRzaG93TWVzc2FnZShcIlN1Y2Nlc3NmdWwhXCIpXHJcblx0XHRcdFx0XHRcdFx0XHRyZXNvbHZlKHNwcmVhZFJlc3BvbnNlKHJlcywgc3ByZWFkLCBvdGhlcnMpKVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fSxcclxuXHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGZhY3Rvcnkoey4uLm90aGVycywgW25hbWVdOm11dGF0ZX0pXHJcblx0XHR9XHJcblx0KVxyXG5cclxuXHRpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xyXG5cdFx0cmV0dXJuIHNldERpc3BsYXlOYW1lKHdyYXBEaXNwbGF5TmFtZShCYXNlQ29tcG9uZW50LCAnd2l0aE11dGF0aW9uJykpKFdpdGhNdXRhdGlvbilcclxuXHR9XHJcblxyXG5cdHJldHVybiBXaXRoTXV0YXRpb25cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgd2l0aE11dGF0aW9uXHJcbiIsImltcG9ydCB7RW52aXJvbm1lbnQsIE5ldHdvcmssIFJlY29yZFNvdXJjZSwgIFN0b3JlfSBmcm9tICdyZWxheS1ydW50aW1lJ1xyXG5cclxuY29uc3Qgc291cmNlPW5ldyBSZWNvcmRTb3VyY2UoKVxyXG5jb25zdCBzdG9yZSA9IG5ldyBTdG9yZShzb3VyY2UpO1xyXG5jb25zdCBoYW5kbGVyUHJvdmlkZXIgPSBudWxsO1xyXG5jb25zdCBlbnZpcm9ubWVudHM9e31cclxuY29uc3QgTm9TZXJ2aWNlPW5ldyBFcnJvcihcIk5ldHdvcmsgZXJyb3JcIilcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUVudmlyb25tZW50KHByb3BzKXtcclxuXHRsZXQge3VzZXIsIGFwcElkLCBzdXBwb3J0T2ZmbGluZSwgbmV0d29yaywgc2hvd01lc3NhZ2UsIGxvYWRpbmcsIGlzRGV2fT1wcm9wc1xyXG5cdGNvbnN0IHRva2VuPXVzZXIgPyB1c2VyLnRva2VuIDogbnVsbFxyXG5cdGxldCBrZXk9YCR7YXBwSWR9LSR7ISF0b2tlbn1gXHJcblx0aWYoZW52aXJvbm1lbnRzW2tleV0pXHJcblx0XHRyZXR1cm4gZW52aXJvbm1lbnRzW2tleV1cclxuXHJcblx0aWYoc3VwcG9ydE9mZmxpbmUpe1xyXG5cdFx0c3VwcG9ydE9mZmxpbmUudXNlcj11c2VyXHJcblx0fVxyXG5cdFxyXG5cdGZ1bmN0aW9uIGhhbmRsZUVycm9ycyhlcnJvcnMpe1xyXG5cdFx0bGV0IHttZXNzYWdlLHN0YWNrfT1lcnJvcnMucmVkdWNlKChzdGF0ZSxhKT0+e1xyXG5cdFx0XHRzdGF0ZS5tZXNzYWdlLmFkZChhLm1lc3NhZ2UpXHJcblx0XHRcdHN0YXRlLnN0YWNrLmFkZChhLnN0YWNrKVxyXG5cdFx0XHRyZXR1cm4gc3RhdGVcclxuXHRcdH0sIHttZXNzYWdlOm5ldyBTZXQoKSwgc3RhY2s6bmV3IFNldCgpfSlcclxuXHRcdGlmKGlzRGV2KXtcclxuXHRcdFx0c2hvd01lc3NhZ2Uoe21lc3NhZ2U6QXJyYXkuZnJvbShtZXNzYWdlKS5qb2luKFwifFwiKSxsZXZlbDpcImVycm9yXCJ9KVxyXG5cdFx0XHRjb25zb2xlLmVycm9yKFwiU2VydmVyIEVycm9yXFxyXFxuXCIrQXJyYXkuZnJvbShzdGFjaykuam9pbihcIlxcclxcblwiKSlcclxuXHRcdH1lbHNle1xyXG5cdFx0XHRzaG93TWVzc2FnZSh7bWVzc2FnZTpBcnJheS5mcm9tKG1lc3NhZ2UpLmpvaW4oXCJ8XCIpLGxldmVsOlwid2FyblwifSlcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdFxyXG5cdGZ1bmN0aW9uIGZldGNoZXJPbmxpbmUob3B0KXtcclxuXHRcdGlmKHN1cHBvcnRPZmZsaW5lKVxyXG5cdFx0XHRzdXBwb3J0T2ZmbGluZS5zZXRTb3VyY2Uoc291cmNlKVxyXG5cclxuXHRcdGNvbnN0IHtzZXJ2aWNlLG9wdGljczpyZXBvcnR9PXByb3BzXHJcblx0XHRyZXR1cm4gZmV0Y2goc2VydmljZSx7XHJcblx0XHRcdG1ldGhvZDogJ1BPU1QnLFxyXG5cdFx0XHQuLi5vcHQsXHJcblx0XHRcdGhlYWRlcnM6IHtcclxuXHRcdFx0XHQnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG5cdFx0XHRcdFwiWC1BcHBsaWNhdGlvbi1JRFwiOiBhcHBJZCxcclxuXHRcdFx0XHRcIlgtU2Vzc2lvbi1Ub2tlblwiOiB0b2tlbixcclxuXHRcdFx0XHQuLi4ob3B0P29wdC5oZWFkZXJzOm51bGwpXHJcblx0XHRcdH0sXHJcblx0XHR9KVxyXG5cdFx0LnRoZW4ocmVzPT57XHJcblx0XHRcdGlmKCFyZXMub2spe1xyXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihyZXMuc3RhdHVzVGV4dClcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gcmVzLmpzb24oKVxyXG5cdFx0fSlcclxuXHRcdC50aGVuKHJlcz0+e1xyXG5cdFx0XHRpZihyZXMuZXJyb3JzKVxyXG5cdFx0XHRcdGhhbmRsZUVycm9ycyhyZXMuZXJyb3JzLCBzaG93TWVzc2FnZSlcclxuXHJcblx0XHRcdGlmKHJlcy5leHRlbnNpb25zKVxyXG5cdFx0XHRcdHJlcG9ydChyZXMuZXh0ZW5zaW9ucy5yZXBvcnQpXHJcblxyXG5cdFx0XHRyZXR1cm4gcmVzXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZmV0Y2hRdWVyeU9ubGluZShvcGVyYXRpb24sIHZhcmlhYmxlcywgY2FjaGVDb25maWcsdXBsb2FkYWJsZXMpe1xyXG5cdFx0cmV0dXJuIGZldGNoZXJPbmxpbmUoe1xyXG5cdFx0XHRib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcblx0XHRcdFx0cXVlcnk6IGlzRGV2PT09dHJ1ZSA/IG9wZXJhdGlvbi50ZXh0IDogdW5kZWZpbmVkLCAvLyBHcmFwaFFMIHRleHQgZnJvbSBpbnB1dFxyXG5cdFx0XHRcdGlkOiBpc0Rldj09PXRydWUgPyB1bmRlZmluZWQgOiBvcGVyYXRpb24ubmFtZSxcclxuXHRcdFx0XHR2YXJpYWJsZXMsXHJcblx0XHRcdH0pLFxyXG5cdFx0fSlcclxuXHRcdC5jYXRjaChlPT57XHJcblx0XHRcdFxyXG5cdFx0XHRuZXR3b3JrKFwib2ZmbGluZVwiKVxyXG5cclxuXHRcdFx0aWYoc3VwcG9ydE9mZmxpbmUpXHJcblx0XHRcdFx0cmV0dXJuIGZldGNoUXVlcnlPZmZsaW5lKG9wZXJhdGlvbiwgdmFyaWFibGVzLCBjYWNoZUNvbmZpZyx1cGxvYWRhYmxlcylcclxuXHRcdFx0XHJcblx0XHRcdHJldHVybiBlXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZmV0Y2hRdWVyeU9mZmxpbmUob3BlcmF0aW9uLCB2YXJpYWJsZXMsIGNhY2hlQ29uZmlnLHVwbG9hZGFibGVzKXtcclxuXHRcdHN1cHBvcnRPZmZsaW5lLnVuc2V0U291cmNlKHNvdXJjZSlcclxuXHRcdHJldHVybiBzdXBwb3J0T2ZmbGluZS5ydW5RTChvcGVyYXRpb24udGV4dCwgdmFyaWFibGVzKVxyXG5cdFx0XHQudGhlbihyZXM9PntcclxuXHRcdFx0XHRpZihyZXMuZXJyb3JzKVxyXG5cdFx0XHRcdFx0aGFuZGxlRXJyb3JzKHJlcy5lcnJvcnMsIHNob3dNZXNzYWdlKVxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGlmKGlzRGV2KXtcclxuXHRcdFx0XHRcdGNvbnNvbGUuZGlyKHtcclxuXHRcdFx0XHRcdFx0cXVlcnk6b3BlcmF0aW9uLnRleHQsXHJcblx0XHRcdFx0XHRcdHZhcmlhYmxlcyxcclxuXHRcdFx0XHRcdFx0cmVzdWx0OnJlc1xyXG5cdFx0XHRcdFx0fSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIHJlc1xyXG5cdFx0XHR9KVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZmV0Y2hRdWVyeSgpe1xyXG5cdFx0bG9hZGluZyh0cnVlKVxyXG5cdFx0cmV0dXJuICgoKT0+e1xyXG5cdFx0XHRpZihuZXR3b3JrKCk9PVwib25saW5lXCIpXHJcblx0XHRcdFx0cmV0dXJuIGZldGNoUXVlcnlPbmxpbmUoLi4uYXJndW1lbnRzKVxyXG5cdFx0XHRlbHNlIGlmKHN1cHBvcnRPZmZsaW5lKVxyXG5cdFx0XHRcdHJldHVybiBmZXRjaFF1ZXJ5T2ZmbGluZSguLi5hcmd1bWVudHMpXHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKE5vU2VydmljZSlcclxuXHRcdH0pKCkuY2F0Y2goZT0+e1xyXG5cdFx0XHRsb2FkaW5nKGZhbHNlKVxyXG5cdFx0XHRzaG93TWVzc2FnZSh7bWVzc2FnZTplLm1lc3NhZ2UsIGxldmVsOlwiZXJyb3JcIn0pXHJcblx0XHRcdHJldHVybiBlXHJcblx0XHR9KS50aGVuKHJlcz0+e1xyXG5cdFx0XHRsb2FkaW5nKGZhbHNlKVxyXG5cdFx0XHRyZXR1cm4gcmVzXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblxyXG5cdHJldHVybiBPYmplY3QuYXNzaWduKG5ldyBFbnZpcm9ubWVudCh7XHJcblx0XHRoYW5kbGVyUHJvdmlkZXIsXHJcblx0XHRuZXR3b3JrOk5ldHdvcmsuY3JlYXRlKGZldGNoUXVlcnkpLFxyXG5cdFx0c3RvcmUsXHJcblx0fSkse1xyXG5cdFx0ZmV0Y2hlcihyZXEpe1xyXG5cdFx0XHRsb2FkaW5nKHRydWUpXHJcblx0XHRcdHJldHVybiAoKCk9PntcclxuXHRcdFx0XHRpZihuZXR3b3JrKCk9PVwib25saW5lXCIpe1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZldGNoZXJPbmxpbmUoLi4uYXJndW1lbnRzKVxyXG5cdFx0XHRcdH1lbHNlIGlmKHN1cHBvcnRPZmZsaW5lKXtcclxuXHRcdFx0XHRcdGxldCB7cXVlcnksIHZhcmlhYmxlc309SlNPTi5wYXJzZShyZXEuYm9keSlcclxuXHRcdFx0XHRcdHJldHVybiBzdXBwb3J0T2ZmbGluZS5ydW5RTChxdWVyeSwgdmFyaWFibGVzKVxyXG5cdFx0XHRcdFx0XHQudGhlbihyZXN1bHQ9PntcclxuXHRcdFx0XHRcdFx0XHRpZihpc0Rldil7XHJcblx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmRpcih7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHF1ZXJ5LFxyXG5cdFx0XHRcdFx0XHRcdFx0XHR2YXJpYWJsZXMsXHJcblx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdFxyXG5cdFx0XHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlc3VsdFxyXG5cdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShOb1NlcnZpY2UpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KSgpLmNhdGNoKGU9PntcclxuXHRcdFx0XHRsb2FkaW5nKGZhbHNlKVxyXG5cdFx0XHRcdHNob3dNZXNzYWdlKHttZXNzYWdlOmUubWVzc2FnZSwgbGV2ZWw6XCJlcnJvclwifSlcclxuXHRcdFx0XHRyZXR1cm4gZVxyXG5cdFx0XHR9KS50aGVuKHJlcz0+e1xyXG5cdFx0XHRcdGxvYWRpbmcoZmFsc2UpXHJcblx0XHRcdFx0cmV0dXJuIHJlc1xyXG5cdFx0XHR9KVxyXG5cdFx0fSxcclxuXHRcdHJ1blFMKHF1ZXJ5LCB2YXJpYWJsZXMpe1xyXG5cdFx0XHRsb2FkaW5nKHRydWUpXHJcblx0XHRcdHJldHVybiAoKCk9PntcclxuXHRcdFx0XHRpZihuZXR3b3JrKCk9PVwib25saW5lXCIpe1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZldGNoZXJPbmxpbmUoe2JvZHk6SlNPTi5zdHJpbmdpZnkocXVlcnkpfSlcclxuXHRcdFx0XHR9ZWxzZSBpZihzdXBwb3J0T2ZmbGluZSl7XHJcblx0XHRcdFx0XHRyZXR1cm4gc3VwcG9ydE9mZmxpbmUucnVuUUwocXVlcnksIHZhcmlhYmxlcylcclxuXHRcdFx0XHRcdFx0LnRoZW4ocmVzdWx0PT57XHJcblx0XHRcdFx0XHRcdFx0aWYoaXNEZXYpe1xyXG5cdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5kaXIoe1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRxdWVyeSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0dmFyaWFibGVzLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHRcclxuXHRcdFx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdHJldHVybiByZXN1bHRcclxuXHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHR9ZWxzZSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKE5vU2VydmljZSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pKCkuY2F0Y2goZT0+e1xyXG5cdFx0XHRcdGxvYWRpbmcoZmFsc2UpXHJcblx0XHRcdFx0c2hvd01lc3NhZ2Uoe21lc3NhZ2U6ZS5tZXNzYWdlLCBsZXZlbDpcImVycm9yXCJ9KVxyXG5cdFx0XHRcdHJldHVybiBlXHJcblx0XHRcdH0pLnRoZW4ocmVzPT57XHJcblx0XHRcdFx0bG9hZGluZyhmYWxzZSlcclxuXHRcdFx0XHRyZXR1cm4gcmVzXHJcblx0XHRcdH0pXHJcblx0XHR9XHJcblx0fSk7XHJcbn0iLCJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIlxyXG5pbXBvcnQge2NvbXBvc2UsIHdpdGhDb250ZXh0LCBzZXREaXNwbGF5TmFtZSwgd3JhcERpc3BsYXlOYW1lLGNyZWF0ZUVhZ2VyRmFjdG9yeX0gZnJvbSBcInJlY29tcG9zZVwiXHJcbmltcG9ydCB7Q29ubmVjdGlvbkhhbmRsZXJ9IGZyb20gXCJyZWxheS1ydW50aW1lXCJcclxuaW1wb3J0IGNyZWF0ZUVudmlyb25tZW50IGZyb20gXCIuL2Vudmlyb25tZW50XCJcclxuXHJcbmV4cG9ydCBjb25zdCB3aXRoR3JhcGhxbENsaWVudD0ob3B0aW9ucz17fSk9PkJhc2VDb21wb25lbnQ9PntcclxuXHRjb25zdCBmYWN0b3J5PWNyZWF0ZUVhZ2VyRmFjdG9yeShcclxuXHRcdFx0d2l0aENvbnRleHQoe1xyXG5cdFx0XHRcdFx0Y2xpZW50OiBQcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0XHRcdFx0b3B0aWNzOiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdCh7Y2xpZW50LG9wdGljcyxzdG9yZX0pPT4oe1xyXG5cdFx0XHRcdFx0Y2xpZW50LFxyXG5cdFx0XHRcdFx0b3B0aWNzXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0KSgoQmFzZUNvbXBvbmVudCkpXHJcblx0XHQpXHJcblxyXG5cdGNvbnN0IFdpdGhHcmFwaHFsQ2xpZW50PXByb3BzPT57XHJcblx0XHRsZXQge2NsaWVudDplbnZpcm9ubWVudH09cHJvcHNcclxuXHRcdGxldCBjbGllbnRPcHRzPXR5cGVvZihvcHRpb25zKT09XCJmdW5jdGlvblwiID8gb3B0aW9ucyhwcm9wcykgOiBvcHRpb25zXHJcblx0XHRpZighZW52aXJvbm1lbnQpe1xyXG5cdFx0XHRlbnZpcm9ubWVudD1jcmVhdGVFbnZpcm9ubWVudCh7Li4ucHJvcHMsLi4uY2xpZW50T3B0c30pXHJcblx0XHRcdGVudmlyb25tZW50LmdldD1mdW5jdGlvbihpZCl7XHJcblx0XHRcdFx0bGV0IHN0b3JlPXRoaXMuZ2V0U3RvcmUoKVxyXG5cdFx0XHRcdHJldHVybiBzdG9yZS5nZXRTb3VyY2UoKS5nZXQoaWQpXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGVudmlyb25tZW50LmdldEFsbD1mdW5jdGlvbih0eXBlKXtcclxuXHRcdFx0XHRsZXQgc3RvcmU9dGhpcy5nZXRTdG9yZSgpXHJcblx0XHRcdFx0bGV0IHNvdXJjZT1zdG9yZS5nZXRTb3VyY2UoKVxyXG5cdFx0XHRcdGxldCBleD10eXBlWzBdLnRvTG93ZXJDYXNlKCkrdHlwZS5zdWJzdHIoMSkrJ3MnXHJcblx0XHRcdFx0cmV0dXJuIHNvdXJjZS5nZXRSZWNvcmRJRHMoKVxyXG5cdFx0XHRcdFx0LmZpbHRlcihpZD0+aWQuc3RhcnRzV2l0aChleCkpXHJcblx0XHRcdFx0XHQubWFwKGlkPT5zb3VyY2UuZ2V0KGlkKSlcclxuXHRcdFx0XHRcdC5maWx0ZXIoYT0+ISFhKVxyXG5cdFx0XHR9XHJcblxyXG5cclxuXHRcdFx0ZW52aXJvbm1lbnQuY29ubmVjdGlvbj1mdW5jdGlvbihzdG9yZSxrZXksZmlsdGVyLGlkPVwiY2xpZW50OnJvb3RcIil7XHJcblx0XHRcdFx0Y29uc3QgcmVjb3JkPXN0b3JlLmdldChpZClcclxuXHRcdFx0XHRjb25zdCBjb25uZWN0aW9uPUNvbm5lY3Rpb25IYW5kbGVyLmdldENvbm5lY3Rpb24ocmVjb3JkLGtleSxmaWx0ZXIpXHJcblx0XHRcdFx0Y29uc3QgdHlwZT1ub2RlPT57XHJcblx0XHRcdFx0XHRsZXQgdHlwZUNvbW1lbnRzPW5vZGUuaWQuc3BsaXQoXCI6XCIpWzBdXHJcblx0XHRcdFx0XHRsZXQgVHlwZUNvbW1lbnQ9dHlwZUNvbW1lbnRzWzBdLnRvVXBwZXJDYXNlKCkrdHlwZUNvbW1lbnRzLnN1YnN0cigxLHR5cGVDb21tZW50cy5sZW5ndGgtMilcclxuXHRcdFx0XHRcdHJldHVybiBUeXBlQ29tbWVudCsnRWRnZSdcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRcdGFwcGVuZChub2RlKXtcclxuXHRcdFx0XHRcdFx0bGV0IGVkZ2U9Q29ubmVjdGlvbkhhbmRsZXIuY3JlYXRlRWRnZShzdG9yZSxjb25uZWN0aW9uLHN0b3JlLmdldChub2RlLmlkKSx0eXBlKG5vZGUpKVxyXG5cdFx0XHRcdFx0XHRDb25uZWN0aW9uSGFuZGxlci5pbnNlcnRFZGdlQWZ0ZXIoY29ubmVjdGlvbixlZGdlKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdHByZXBlbmQobm9kZSl7XHJcblx0XHRcdFx0XHRcdGxldCBlZGdlPUNvbm5lY3Rpb25IYW5kbGVyLmNyZWF0ZUVkZ2Uoc3RvcmUsY29ubmVjdGlvbixzdG9yZS5nZXQobm9kZS5pZCksdHlwZShub2RlKSlcclxuXHRcdFx0XHRcdFx0Q29ubmVjdGlvbkhhbmRsZXIuaW5zZXJ0RWRnZUJlZm9yZShjb25uZWN0aW9uLGVkZ2UpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0fVxyXG5cdFx0fWVsc2UgaWYodHlwZW9mKGVudmlyb25tZW50KT09XCJmdW5jdGlvblwiKXtcclxuXHRcdFx0ZW52aXJvbm1lbnQ9ZW52aXJvbm1lbnQocHJvcHMpXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZmFjdG9yeSh7Y2xpZW50OmVudmlyb25tZW50LC4uLnByb3BzfSlcclxuXHR9XHJcblxyXG5cdGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XHJcblx0XHRyZXR1cm4gc2V0RGlzcGxheU5hbWUod3JhcERpc3BsYXlOYW1lKEJhc2VDb21wb25lbnQsICd3aXRoR3JhcGhxbENsaWVudCcpKShXaXRoR3JhcGhxbENsaWVudClcclxuXHR9XHJcblxyXG5cdHJldHVybiBXaXRoR3JhcGhxbENsaWVudFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB3aXRoR3JhcGhxbENsaWVudFxyXG4iLCJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIlxyXG5pbXBvcnQge2NvbXBvc2UsIGNyZWF0ZUVhZ2VyRmFjdG9yeSwgd2l0aENvbnRleHQsIHNldERpc3BsYXlOYW1lLCB3cmFwRGlzcGxheU5hbWUsIGdldENvbnRleHR9IGZyb20gXCJyZWNvbXBvc2VcIlxyXG5pbXBvcnQgd2l0aFF1ZXJ5IGZyb20gXCIuL3dpdGhRdWVyeVwiXHJcbmltcG9ydCB3aXRoRnJhZ21lbnQgZnJvbSBcIi4vd2l0aEZyYWdtZW50XCJcclxuXHJcbmltcG9ydCB7Y3JlYXRlUGFnaW5hdGlvbkNvbnRhaW5lcn0gZnJvbSBcInJlYWN0LXJlbGF5XCJcclxuXHJcblxyXG5leHBvcnQgY29uc3Qgd2l0aFBhZ2luYXRpb249KG9wdGlvbnMpPT5CYXNlQ29tcG9uZW50PT57XHJcbiAgICBjb25zdCBmYWN0b3J5PWNyZWF0ZUVhZ2VyRmFjdG9yeShcclxuICAgICAgICAgICAgd2l0aENvbnRleHQoXHJcbiAgICAgICAgICAgICAgICB7cGFnaW5hdGlvbjpQcm9wVHlwZXMuYW55fSxcclxuICAgICAgICAgICAgICAgICgpPT4oe3BhZ2luYXRpb246b3B0aW9uc30pXHJcbiAgICAgICAgICAgICkoQmFzZUNvbXBvbmVudCkpXHJcblxyXG4gICAgY29uc3QgV2l0aFBhZ2luYXRpb249d2l0aFF1ZXJ5KG9wdGlvbnMpKHByb3BzPT5mYWN0b3J5KHByb3BzKSlcclxuXHJcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xyXG5cdFx0cmV0dXJuIHNldERpc3BsYXlOYW1lKHdyYXBEaXNwbGF5TmFtZShCYXNlQ29tcG9uZW50LCAnd2l0aFBhZ2luYXRpb24nKSkoV2l0aFBhZ2luYXRpb24pXHJcblx0fVxyXG5cclxuICAgIHJldHVybiBXaXRoUGFnaW5hdGlvblxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgd2l0aFBhZ2luYXRpb25cclxuIiwiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCJcclxuaW1wb3J0IHtjb21wb3NlLCBjcmVhdGVFYWdlckZhY3RvcnksIHNldERpc3BsYXlOYW1lLCB3cmFwRGlzcGxheU5hbWUsfSBmcm9tIFwicmVjb21wb3NlXCJcclxuaW1wb3J0IHt3aXRoUXVlcnl9IGZyb20gXCIuL3JlbGF5L3dpdGhRdWVyeVwiXHJcblxyXG5leHBvcnQgY29uc3Qgd2l0aEluaXQ9b3B0aW9ucz0+QmFzZUNvbXBvbmVudD0+e1xyXG5cdGxldCBmYWN0b3J5PWNyZWF0ZUVhZ2VyRmFjdG9yeShCYXNlQ29tcG9uZW50KVxyXG5cdFxyXG5cdGNvbnN0IEluaXQ9d2l0aFF1ZXJ5KG9wdGlvbnMpKCh7Y2hpbGRyZW59KT0+PGRpdj57Y2hpbGRyZW59PC9kaXY+KVxyXG5cdFx0XHJcblx0Y29uc3QgV2l0aEluaXQ9KHtjaGlsZHJlbiwuLi5vdGhlcnN9KT0+KFxyXG5cdFx0PEJhc2VDb21wb25lbnQgey4uLm90aGVyc30+XHJcblx0XHRcdDxJbml0PlxyXG5cdFx0XHRcdHtjaGlsZHJlbn1cclxuXHRcdFx0PC9Jbml0PlxyXG5cdFx0PC9CYXNlQ29tcG9uZW50PlxyXG5cdClcclxuXHRcclxuXHRpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xyXG5cdFx0cmV0dXJuIHNldERpc3BsYXlOYW1lKHdyYXBEaXNwbGF5TmFtZShCYXNlQ29tcG9uZW50LCAnV2l0aEluaXQnKSkoV2l0aEluaXQpXHJcblx0fVxyXG5cdFxyXG5cdHJldHVybiBXaXRoSW5pdFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB3aXRoSW5pdCIsIk9iamVjdC5hc3NpZ24oRGF0ZS5wcm90b3R5cGUse1xyXG5cdHRvRGF0ZSgpe1xyXG5cdFx0bGV0IGQ9bmV3IERhdGUodGhpcy5nZXRUaW1lKCkpXHJcblx0XHRkLnNldEhvdXJzKDAsMCwwLDApXHJcblx0XHRyZXR1cm4gZFxyXG5cdH0sXHJcblx0aXNTYW1lRGF0ZShkKXtcclxuXHRcdHJldHVybiB0aGlzLnJlbGF0aXZlKGQpPT0wXHJcblx0fSxcclxuXHRyZWxhdGl2ZShkKXtcclxuXHRcdHJldHVybiBNYXRoLmZsb29yKCh0aGlzLnRvRGF0ZSgpLmdldFRpbWUoKS1kLnRvRGF0ZSgpLmdldFRpbWUoKSkvKDI0KjYwKjYwKjEwMDApKVxyXG5cdH0sXHJcblx0cmVsYXRpdmVEYXRlKGRheXMpe1xyXG5cdFx0cmV0dXJuIG5ldyBEYXRlKHRoaXMuZ2V0VGltZSgpKzI0KjYwKjYwKjEwMDAqZGF5cylcclxuXHR9LFxyXG5cdGlzRnV0dXJlKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5yZWxhdGl2ZShuZXcgRGF0ZSgpKT4wXHJcblx0fSxcclxuXHRmb3JtYXQodG1wbD1cInktTS1kXCIpe1xyXG5cdFx0bGV0IHZhbHVlPXtcclxuXHRcdFx0eTp0aGlzLmdldEZ1bGxZZWFyKCksXHJcblx0XHRcdE06dGhpcy5nZXRNb250aCgpKzEsXHJcblx0XHRcdGQ6dGhpcy5nZXREYXRlKCksXHJcblx0XHRcdGg6dGhpcy5nZXRIb3VycygpLFxyXG5cdFx0XHRtOnRoaXMuZ2V0TWludXRlcygpLFxyXG5cdFx0XHRzOnRoaXMuZ2V0U2Vjb25kcygpXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdG1wbC5yZXBsYWNlKC8oW3ltZGhzXSkrL2lnLCBmdW5jdGlvbihtYXRjaCx0eXBlKXtcclxuXHRcdFx0cmV0dXJuIHZhbHVlW3R5cGUhPSdNJyA/IHR5cGUudG9Mb3dlckNhc2UoKSA6IHR5cGVdIHx8IFwiXCJcclxuXHRcdH0pXHJcblx0fSxcclxuXHRzbWFydEZvcm1hdChyZVRvZGF5PVwiSEg6bW1cIiwgcmVUaGlzWWVhcj1cIk1N5pyIRETml6VcIiwgcmVZZWFyc0Fnbz1cIllZWVnlubRNTeaciERE5pelXCIpe1xyXG5cdFx0bGV0IG5vdz1uZXcgRGF0ZSgpXHJcblx0XHRyZXR1cm4gdGhpcy5mb3JtYXQodGhpcy5pc1NhbWVEYXRlKG5vdykgPyByZVRvZGF5IDpcclxuXHRcdFx0XHRcdFx0XHR0aGlzLmdldEZ1bGxZZWFyKCk9PW5vdy5nZXRGdWxsWWVhcigpID8gcmVUaGlzWWVhciA6IHJlWWVhcnNBZ28pXHJcblx0fSxcclxuXHRnZXRXZWVrKCl7XHJcblx0XHR2YXIgZGF0ZSA9IG5ldyBEYXRlKHRoaXMuZ2V0VGltZSgpKVxyXG5cdFx0ZGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKTtcclxuXHRcdC8vIFRodXJzZGF5IGluIGN1cnJlbnQgd2VlayBkZWNpZGVzIHRoZSB5ZWFyLlxyXG5cdFx0ZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpICsgMyAtIChkYXRlLmdldERheSgpICsgNikgJSA3KTtcclxuXHRcdC8vIEphbnVhcnkgNCBpcyBhbHdheXMgaW4gd2VlayAxLlxyXG5cdFx0dmFyIHdlZWsxID0gbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCAwLCA0KTtcclxuXHRcdC8vIEFkanVzdCB0byBUaHVyc2RheSBpbiB3ZWVrIDEgYW5kIGNvdW50IG51bWJlciBvZiB3ZWVrcyBmcm9tIGRhdGUgdG8gd2VlazEuXHJcblx0XHRyZXR1cm4gMSArIE1hdGgucm91bmQoKChkYXRlLmdldFRpbWUoKSAtIHdlZWsxLmdldFRpbWUoKSkgLyA4NjQwMDAwMFxyXG5cdFx0XHRcdFx0XHQtIDMgKyAod2VlazEuZ2V0RGF5KCkgKyA2KSAlIDcpIC8gNyk7XHJcblx0fVxyXG59KSIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXHJcbmltcG9ydCB7d2l0aFN0YXRlfSBmcm9tIFwicmVjb21wb3NlXCJcclxuXHJcbmltcG9ydCB7RGlhbG9nfSBmcm9tICdtYXRlcmlhbC11aSdcclxuaW1wb3J0IEZsb2F0aW5nQWN0aW9uQnV0dG9uIGZyb20gJ21hdGVyaWFsLXVpL0Zsb2F0aW5nQWN0aW9uQnV0dG9uJ1xyXG5pbXBvcnQgSWNvbkFycm93TGVmdCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2hhcmR3YXJlL2tleWJvYXJkLWFycm93LWxlZnRcIlxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBQZXJmb3JtYW5jZT13aXRoU3RhdGUoXCJvcGVuXCIsXCJzZXRPcGVuXCIsZmFsc2UpKFxyXG4oe3JlcG9ydCxvcGVuLCBzZXRPcGVuLCB0b3RhbD1wYXJzZUludChyZXBvcnRbXCIvXCJdLzEwMDApLHRocmVzaG9sZD0yfSk9PihcclxuXHQ8ZGl2IHN0eWxlPXt7YmFja2dyb3VuZENvbG9yOlwid2hpdGVcIn19PlxyXG5cdFx0PGRpdiBjbGFzc05hbWU9XCJzdGlja3kgdG9wIHJpZ2h0IF8yXCI+XHJcblx0XHRcdDxGbG9hdGluZ0FjdGlvbkJ1dHRvbiBzZWNvbmRhcnk9e3RvdGFsPj10aHJlc2hvbGR9IFxyXG5cdFx0XHRcdG9uQ2xpY2s9eygpPT5zZXRPcGVuKHRydWUpfVxyXG5cdFx0XHRcdG1pbmk9e3RydWV9IFxyXG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcj1cImxpZ2h0Z3JheVwiXHJcblx0XHRcdFx0PlxyXG5cdFx0XHRcdDxJY29uQXJyb3dMZWZ0Lz5cclxuXHRcdFx0PC9GbG9hdGluZ0FjdGlvbkJ1dHRvbj5cclxuXHRcdDwvZGl2PlxyXG5cdFx0PERpYWxvZyBvcGVuPXtvcGVufSBvblJlcXVlc3RDbG9zZT17KCk9PnNldE9wZW4oZmFsc2UpfSBcclxuXHRcdFx0Y29udGVudFN0eWxlPXt7d2lkdGg6XCIxMDAlXCJ9fT5cclxuXHRcdFx0PHRhYmxlIHN0eWxlPXt7d2lkdGg6XCIxMDAlXCIsYm9yZGVyOjF9fSA+XHJcblx0XHRcdFx0PGNhcHRpb24+dG90YWw6e3RvdGFsfW1zPC9jYXB0aW9uPlxyXG5cdFx0XHRcdDx0Ym9keT5cclxuXHRcdFx0XHRcdDx0cj48dGg+cGF0aDwvdGg+PHRoPnN0YXJ0KHVzKTwvdGg+PHRoPnVzZWQgdGltZSh1cyk8L3RoPjwvdHI+XHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0T2JqZWN0LmtleXMocmVwb3J0KVxyXG5cdFx0XHRcdFx0LmZpbHRlcihhPT4oYSE9PVwiL1wiJiZhIT09XCJ0b0pTT05cIikpXHJcblx0XHRcdFx0XHQubWFwKGs9PnJlcG9ydFtrXS5tYXAoKHthdCxieX0saSk9Pjx0ciBrZXk9e2Ake2t9XyR7aX1gfT48dGQ+e2t9PC90ZD48dGQ+e2F0fTwvdGQ+PHRkPntieX08L3RkPjwvdHI+KSlcclxuXHRcdFx0XHRcdC5yZWR1Y2UoKGNvbGxlY3RlZCxhKT0+e1xyXG5cdFx0XHRcdFx0XHRhLmZvckVhY2goYj0+Y29sbGVjdGVkLnB1c2goYikpXHJcblx0XHRcdFx0XHRcdHJldHVybiBjb2xsZWN0ZWRcclxuXHRcdFx0XHRcdH0sW10pXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdDwvdGJvZHk+XHJcblx0XHRcdDwvdGFibGU+XHJcblx0XHQ8L0RpYWxvZz5cclxuXHQ8L2Rpdj5cclxuKSlcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3Qoc3RhdGU9Pih7cmVwb3J0OnN0YXRlLnFpbGkub3B0aWNzfSkpKFxyXG5cdCh7cmVwb3J0fSk9PiByZXBvcnQmJnJlcG9ydFtcIi9cIl0gPyA8UGVyZm9ybWFuY2UgcmVwb3J0PXtyZXBvcnR9Lz4gOiBudWxsXHJcbikiLCJpbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCJcclxuaW1wb3J0IHtjb21wb3NlLCBnZXRDb250ZXh0LCBtYXBQcm9wc30gZnJvbSBcInJlY29tcG9zZVwiXHJcbmltcG9ydCB7d2l0aE11dGF0aW9ufSBmcm9tIFwiLi4vdG9vbHMvcmVjb21wb3NlXCJcclxuY29uc3QgSU1BR0VfREFUQV9TQ0hFTUVfTEVOPVwiZGF0YTppbWFnZS9qcGVnO2Jhc2U2NCxcIi5sZW5ndGhcclxudmFyIGluc3RhbmNlLGlucHV0LF9pbWdTaXplcjtcclxuXHJcbmZ1bmN0aW9uIG1haW4odHlwZT1cImpzb25cIiwgd2lkdGgsIGhlaWdodCl7XHJcbiAgICAvL3JldHVybiBQcm9taXNlLmFzKFwiaHR0cDovL3RzMi5tbS5iaW5nLm5ldC90aD9pZD1KTi50ektsaWVnNHc4ZVlKZkRCa0VIb0F3JnBpZD0xNS4xXCIpXHJcblxyXG4gICAgaWYoaW5wdXQ9PW51bGwpe1xyXG4gICAgICAgIGlucHV0PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcclxuICAgICAgICBpbnB1dC50eXBlPVwiZmlsZVwiXHJcbiAgICAgICAgX2ltZ1NpemVyPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXHJcbiAgICAgICAgX2ltZ1NpemVyLnN0eWxlLnBvc2l0aW9uPWlucHV0LnN0eWxlLnBvc2l0aW9uPSdhYnNvbHV0ZSdcclxuICAgICAgICBfaW1nU2l6ZXIuc3R5bGUubGVmdD1pbnB1dC5zdHlsZS5sZWZ0PSctOTk5OXB4J1xyXG5cclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGlucHV0KVxyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoX2ltZ1NpemVyKVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpPT57XHJcbiAgICAgICAgdmFyIG5lZWRSZXNpemU9d2lkdGh8fGhlaWdodCxcclxuICAgICAgICAgICAgc2l6ZT1NYXRoLm1heCh3aWR0aCxoZWlnaHQpO1xyXG5cclxuICAgICAgICBpbnB1dC5vbmNoYW5nZT1mdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB2YXIgZmlsZT10aGlzLmZpbGVzWzBdO1xyXG4gICAgICAgICAgICBpZihmaWxlPT1udWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgaWYodHlwZT09J3Jhdycpe1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShmaWxlKVxyXG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZT1cIlwiXHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciBuYW1lPWZpbGUubmFtZSxcclxuICAgIFx0XHRcdHJlYWRlcj1uZXcgRmlsZVJlYWRlcigpO1xyXG4gICAgICAgICAgICByZWFkZXIub25sb2FkPWZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlPVwiXCJcclxuICAgICAgICAgICAgICAgIHZhciBkYXRhPXJlYWRlci5yZXN1bHRcclxuICAgICAgICAgICAgICAgIHN3aXRjaCh0eXBlKXtcclxuICAgIFx0XHRcdGNhc2UgJ2ltYWdlJzpcclxuICAgIFx0XHRcdFx0aWYobmVlZFJlc2l6ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbWc9bmV3IEltYWdlKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW1nLnNyYz1kYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGltZy5vbmxvYWQ9KCk9PnJlc29sdmUoe3VybDpyZXNpemUoZGF0YSwgc2l6ZSwgaW1nKSxuYW1lfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW1nLm9uZXJyb3I9KCk9PnJlc29sdmUoe3VybDpkYXRhLG5hbWV9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlXHJcbiAgICBcdFx0XHRcdCAgICByZXNvbHZlKHt1cmw6ZGF0YSwgbmFtZX0pXHJcbiAgICBcdFx0XHRcdGJyZWFrXHJcbiAgICBcdFx0XHRjYXNlICdqc29uJzpcclxuICAgIFx0XHRcdFx0cmVzb2x2ZSh7ZGF0YTpKU09OLnBhcnNlKGRhdGEpLCBuYW1lfSlcclxuICAgIFx0XHRcdFx0YnJlYWtcclxuICAgIFx0XHRcdGNhc2UgJ2pzb25JbkpzJzpcclxuICAgIFx0XHRcdFx0cmVzb2x2ZSh7ZGF0YTogZGF0YSAmJiBuZXcgRnVuY3Rpb24oXCJcIixcInJldHVybiBcIitkYXRhKSgpLCBuYW1lfSlcclxuICAgIFx0XHRcdFx0YnJlYWtcclxuICAgIFx0XHRcdGRlZmF1bHQ6XHJcbiAgICBcdFx0XHRcdHJlc29sdmUoe2RhdGEsbmFtZX0pXHJcbiAgICBcdFx0XHR9XHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgIHJlYWRlci5vbmVycm9yPWZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICByZWplY3QocmVhZGVyLmVycm9yKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgXHRcdHN3aXRjaCh0eXBlKXtcclxuICAgIFx0XHRjYXNlICdpbWFnZSc6XHJcbiAgICBcdFx0XHRyZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKVxyXG4gICAgXHRcdFx0YnJlYWtcclxuICAgIFx0XHRkZWZhdWx0OlxyXG4gICAgXHRcdFx0cmVhZGVyLnJlYWRBc1RleHQoZmlsZSlcclxuICAgIFx0XHR9XHJcbiAgICAgICAgfVxyXG5cclxuXHRcdGlucHV0LmNsaWNrKClcclxuICAgIH0pXHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiByZXNpemUoZGF0YVVybCwgc2l6ZSwgaW1nKXtcclxuICAgIHZhciBjdHg9X2ltZ1NpemVyLmdldENvbnRleHQoJzJkJylcclxuICAgIHZhciB3aD1pbWcud2lkdGgvaW1nLmhlaWdodDtcclxuICAgIF9pbWdTaXplci53aWR0aCA9IHdoPj0xID8gKHNpemU8aW1nLndpZHRoID8gc2l6ZSA6IGltZy53aWR0aCkgOiAoc2l6ZTxpbWcuaGVpZ2h0ID8gTWF0aC5mbG9vcihzaXplKndoKSA6IGltZy53aWR0aCk7XHJcbiAgICBfaW1nU2l6ZXIuaGVpZ2h0ID0gd2g8MSA/IChzaXplPGltZy5oZWlnaHQgPyBzaXplIDogaW1nLmhlaWdodCkgOiAoc2l6ZTxpbWcud2lkdGggPyBNYXRoLmZsb29yKHNpemUvd2gpIDogaW1nLmhlaWdodCk7XHJcbiAgICBfaW1nU2l6ZXIuc3R5bGUud2lkdGg9X2ltZ1NpemVyLndpZHRoK1wicHhcIlxyXG4gICAgX2ltZ1NpemVyLnN0eWxlLmhlaWdodD1faW1nU2l6ZXIuaGVpZ2h0K1wicHhcIlxyXG4gICAgY3R4LmRyYXdJbWFnZShpbWcsMCwwLGltZy53aWR0aCxpbWcuaGVpZ2h0LDAsMCxfaW1nU2l6ZXIud2lkdGgsIF9pbWdTaXplci5oZWlnaHQpO1xyXG4gICAgcmV0dXJuIF9pbWdTaXplci50b0RhdGFVUkwoXCJpbWFnZS9qcGVnXCIpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRhdGFBc0Jsb2IoZGF0YSl7XHJcblx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PntcclxuXHRcdHN3aXRjaCh0eXBlb2YoZGF0YSkpe1xyXG5cdFx0Y2FzZSAnc3RyaW5nJzpcclxuXHRcdFx0aWYoZGF0YS5zdGFydHNXaXRoKFwiZmlsZTpcIikpe1xyXG5cdFx0XHRcdHdpbmRvdy5yZXNvbHZlTG9jYWxGaWxlU3lzdGVtVVJMKGRhdGEsIGVudHJ5PT5lbnRyeS5maWxlKGZpbGU9PntcclxuXHRcdFx0XHRcdGxldCByZWFkZXI9bmV3IEZpbGVSZWFkZXIoKVxyXG5cdFx0XHRcdFx0cmVhZGVyLm9ubG9hZD1lPT5yZXNvbHZlKG5ldyBCbG9iKFtuZXcgVWludDhBcnJheShyZWFkZXIucmVzdWx0KV0se3R5cGU6ZmlsZS50eXBlfSkpXHJcblx0XHRcdFx0XHRyZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoZmlsZSlcclxuXHRcdFx0XHR9LHJlamVjdCksIHJlamVjdClcclxuXHRcdFx0fWVsc2UgaWYoZGF0YS5zdGFydHNXaXRoKFwiZGF0YTpcIikpe1xyXG5cdFx0XHRcdHJlc29sdmUobW9kdWxlLmV4cG9ydHMudG9CbG9iKGRhdGEpKVxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRmZXRjaChkYXRhKS50aGVuKHJlcz0+cmVzLmJsb2IoKSkudGhlbihyZXNvbHZlLHJlamVjdClcclxuXHRcdFx0fVxyXG5cdFx0YnJlYWtcclxuXHRcdGRlZmF1bHQ6XHJcblx0XHRcdHJlc29sdmUoZGF0YSlcclxuXHRcdH1cclxuXHR9KVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7Ly9mb3IgdGVzdGFibGVcclxuICAgIG1haW4sXHJcbiAgICBzZWxlY3RKc29uRmlsZSgpe1xyXG4gICAgICAgIHJldHVybiBtYWluKFwianNvblwiKVxyXG4gICAgfSxcclxuICAgIHNlbGVjdEpzb25JbkpzRmlsZSgpe1xyXG4gICAgICAgIHJldHVybiBtYWluKFwianNvbkluSnNcIilcclxuICAgIH0sXHJcbiAgICBzZWxlY3RJbWFnZUZpbGUod2lkdGgsaGVpZ2h0KXtcclxuICAgICAgICByZXR1cm4gbWFpbihcImltYWdlXCIsLi4uYXJndW1lbnRzKVxyXG4gICAgfSxcclxuICAgIHNlbGVjdFRleHRGaWxlKCl7XHJcbiAgICAgICAgcmV0dXJuIG1haW4oXCJ0ZXh0XCIpXHJcbiAgICB9LFxyXG4gICAgc2VsZWN0KCl7XHJcbiAgICAgICAgcmV0dXJuIG1haW4oXCJyYXdcIiwuLi5hcmd1bWVudHMpXHJcbiAgICB9LFxyXG5cdHRvQmxvYihkYXRhLGNvbnRlbnRUeXBlPVwiaW1hZ2UvKlwiLCBzbGljZVNpemU9NTEyKXtcclxuXHRcdHZhciBieXRlQ2hhcmFjdGVycyA9IGF0b2IoZGF0YS5zdWJzdHIoSU1BR0VfREFUQV9TQ0hFTUVfTEVOKSlcclxuXHRcdHZhciBieXRlQXJyYXlzID0gW107XHJcblxyXG5cdFx0Zm9yICh2YXIgb2Zmc2V0ID0gMDsgb2Zmc2V0IDwgYnl0ZUNoYXJhY3RlcnMubGVuZ3RoOyBvZmZzZXQgKz0gc2xpY2VTaXplKSB7XHJcblx0XHRcdHZhciBzbGljZSA9IGJ5dGVDaGFyYWN0ZXJzLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgc2xpY2VTaXplKTtcclxuXHJcblx0XHRcdHZhciBieXRlTnVtYmVycyA9IG5ldyBBcnJheShzbGljZS5sZW5ndGgpO1xyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHNsaWNlLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0Ynl0ZU51bWJlcnNbaV0gPSBzbGljZS5jaGFyQ29kZUF0KGkpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgYnl0ZUFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYnl0ZU51bWJlcnMpO1xyXG5cclxuXHRcdFx0Ynl0ZUFycmF5cy5wdXNoKGJ5dGVBcnJheSk7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIGJsb2IgPSBuZXcgQmxvYihieXRlQXJyYXlzLCB7dHlwZTogY29udGVudFR5cGV9KTtcclxuXHRcdHJldHVybiBibG9iO1xyXG5cdH0sXHJcbiAgICByb290Om51bGwsLy9pbmplY3RlZCBsYXRlclxyXG4gICAgdXBsb2FkKGRhdGEsIHByb3BzLCB0b2tlbiwgdXJsPVwiaHR0cDovL3VwLnFpbml1LmNvbVwiKXtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PntcclxuICAgICAgICAgICAgcHJvcHM9cHJvcHN8fHt9XHJcbiAgICAgICAgICAgIGlmKCFwcm9wcy5pZCB8fCAhcHJvcHMua2V5KXtcclxuICAgICAgICAgICAgICAgIHJlamVjdChcInVwbG9hZCBtdXN0IGhhdmUgaWQgYW5kIGtleSBpbiBwcm9wc1wiKVxyXG4gICAgICAgICAgICB9XHJcblx0XHRcdGlmKG1vZHVsZS5leHBvcnRzLnJvb3Qpe1xyXG4gICAgICAgICAgICAgICAgcHJvcHM9ey4uLnByb3BzLGtleTpgJHttb2R1bGUuZXhwb3J0cy5yb290fS8ke3Byb3BzLmlkfS8ke3Byb3BzLmtleX1gfVxyXG4gICAgICAgICAgICB9XHJcblx0XHRcdHByb3BzWyd4OmlkJ109cHJvcHMuaWRcclxuXHRcdFx0ZGVsZXRlICBwcm9wcy5pZFxyXG5cdFx0XHRcclxuXHRcdFx0aWYocHJvcHMua2V5KVxyXG5cdFx0XHRcdHByb3BzLmtleT1wcm9wcy5rZXkucmVwbGFjZSgnOicsJy8nKVxyXG5cclxuXHRcdFx0Y29uc3QgZ2V0VG9rZW49KCk9PntcclxuXHRcdFx0XHRpZih0eXBlb2YodG9rZW4pPT1cInN0cmluZ1wiKXtcclxuXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUodG9rZW4pXHJcblx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRyZXR1cm4gdG9rZW4oe2tleTpwcm9wcy5rZXl9KS50aGVuKCh7dG9rZW59KT0+dG9rZW4pXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRnZXRUb2tlbigpLnRoZW4odG9rZW49PntcclxuXHRcdFx0XHRkYXRhQXNCbG9iKGRhdGEpLnRoZW4oZGF0YT0+e1xyXG5cdFx0XHRcdFx0dmFyIGZvcm1EYXRhPW5ldyBGb3JtRGF0YSgpXHJcblx0XHRcdFx0XHRmb3JtRGF0YS5hcHBlbmQoJ2ZpbGUnLGRhdGEpXHJcblx0XHRcdFx0XHRmb3JtRGF0YS5hcHBlbmQoJ3Rva2VuJyx0b2tlbilcclxuXHRcdFx0XHRcdE9iamVjdC5rZXlzKHByb3BzKVxyXG5cdFx0XHRcdFx0XHQuZm9yRWFjaChhPT5mb3JtRGF0YS5hcHBlbmQoYSxwcm9wc1thXSkpXHJcblxyXG5cdFx0XHRcdFx0dmFyIHhocj1uZXcgWE1MSHR0cFJlcXVlc3QoKVxyXG5cdFx0XHRcdFx0eGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdFx0aWYgKHhoci5yZWFkeVN0YXRlID09PSA0KSB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKHhoci5zdGF0dXMgPj0gMjAwICYmIHhoci5zdGF0dXMgPCAzMDApXHJcblx0XHRcdFx0XHRcdFx0XHRyZXNvbHZlKEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCkuZGF0YS5maWxlX2NyZWF0ZS51cmwpXHJcblx0XHRcdFx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0XHRcdFx0cmVqZWN0KHhoci5yZXNwb25zZVRleHQpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0eGhyLm9wZW4oJ1BPU1QnLHVybCx0cnVlKVxyXG5cdFx0XHRcdFx0eGhyLnNlbmQoZm9ybURhdGEpXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSlcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHRcclxuICAgIHdpdGhHZXRUb2tlbjpjb21wb3NlKFxyXG5cdFx0Z2V0Q29udGV4dCh7Y2xpZW50OlByb3BUeXBlcy5vYmplY3R9KSxcclxuXHRcdG1hcFByb3BzKCh7Y2xpZW50LC4uLm90aGVyc30pPT4oe1xyXG5cdFx0XHQuLi5vdGhlcnMsXHJcblx0XHRcdGdldFRva2VuKGtleSl7XHJcblx0XHRcdFx0a2V5PXR5cGVvZihrZXkpPT1cInN0cmluZ1wiID8ge2tleX0gOiBrZXlcclxuXHRcdFx0XHRyZXR1cm4gY2xpZW50LnJ1blFMKHtcclxuXHRcdFx0XHRcdFx0aWQ6XCJmaWxlX3Rva2VuX1F1ZXJ5XCIsXHJcblx0XHRcdFx0XHRcdHZhcmlhYmxlczprZXksXHJcblx0XHRcdFx0XHRcdHF1ZXJ5OiAoZ3JhcGhxbGBcclxuXHRcdFx0XHRcdFx0XHRxdWVyeSBmaWxlX3Rva2VuX1F1ZXJ5KCRrZXk6U3RyaW5nKXtcclxuXHRcdFx0XHRcdFx0XHRcdHRva2VuOmZpbGVfdXBsb2FkX3Rva2VuKGtleToka2V5KXtcclxuXHRcdFx0XHRcdFx0XHRcdFx0dG9rZW5cclxuXHRcdFx0XHRcdFx0XHRcdFx0aWRcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGApKCkudGV4dFxyXG5cdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdC50aGVuKCh7ZGF0YTp7dG9rZW59fSk9PnRva2VuKVxyXG5cdFx0XHR9XHJcblx0XHR9KSlcclxuXHQpLFxyXG5cdFxyXG5cdHdpdGhGaWxlQ3JlYXRlOiB3aXRoTXV0YXRpb24oe1xyXG4gICAgICAgIG5hbWU6XCJjcmVhdGVGaWxlXCIsXHJcbiAgICAgICAgcHJvbWlzZTp0cnVlLFxyXG4gICAgICAgIG11dGF0aW9uOmdyYXBocWxgXHJcbiAgICBcdFx0bXV0YXRpb24gZmlsZV9jcmVhdGVfTXV0YXRpb24oJF9pZDpTdHJpbmchLCRob3N0OklEISwkYnVja2V0OlN0cmluZywkc2l6ZTpJbnQsJGNyYzpJbnQsJG1pbWVUeXBlOlN0cmluZywkaW1hZ2VJbmZvOkpTT04pe1xyXG4gICAgXHRcdFx0ZmlsZV9jcmVhdGUoX2lkOiRfaWQsaG9zdDokaG9zdCxidWNrZXQ6JGJ1Y2tldCxzaXplOiRzaXplLGNyYzokY3JjLG1pbWVUeXBlOiRtaW1lVHlwZSxpbWFnZUluZm86JGltYWdlSW5mbyl7XHJcbiAgICBcdFx0XHRcdHVybFxyXG4gICAgXHRcdFx0fVxyXG4gICAgXHRcdH1cclxuICAgIFx0YFxyXG4gICAgfSlcclxufVxyXG4iLCJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIlxyXG5cclxuZXhwb3J0IGNvbnN0IEZ1bGxQYWdlPSh7c3R5bGUsY2hpbGRyZW59LHt0aGVtZTp7cGFnZSx6SW5kZXh9fSk9PihcclxuXHQ8ZGl2IFxyXG5cdFx0Y2xhc3NOYW1lPVwic3RpY2t5IGZ1bGxcIlxyXG5cdFx0c3R5bGU9e3tiYWNrZ3JvdW5kOlwid2hpdGVcIiwgLi4uc3R5bGUsLi4ucGFnZSx6SW5kZXg6ekluZGV4LmRpYWxvZywgdG9wOjB9fT5cclxuXHRcdHtjaGlsZHJlbn1cclxuXHQ8L2Rpdj5cclxuKVxyXG5cclxuRnVsbFBhZ2UuY29udGV4dFR5cGVzPXtcclxuICAgIHRoZW1lOiBQcm9wVHlwZXMub2JqZWN0XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEZ1bGxQYWdlXHJcbiIsImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtjb21wb3NlLCBicmFuY2gsIHJlbmRlckNvbXBvbmVudH0gZnJvbSBcInJlY29tcG9zZVwiXHJcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcclxuaW1wb3J0IEFwcEJhciBmcm9tICdtYXRlcmlhbC11aS9BcHBCYXInO1xyXG5pbXBvcnQgSWNvbkJ1dHRvbiBmcm9tICdtYXRlcmlhbC11aS9JY29uQnV0dG9uJztcclxuaW1wb3J0IEljb25DbG9zZSBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvbmF2aWdhdGlvbi9jbG9zZSc7XHJcbmltcG9ydCBJY29uQWxlcnQgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FsZXJ0L2Vycm9yJztcclxuaW1wb3J0IHtyZWQxMDB9IGZyb20gXCJtYXRlcmlhbC11aS9zdHlsZXMvY29sb3JzXCJcclxuXHJcbmltcG9ydCBGdWxsUGFnZSBmcm9tIFwiLi9mdWxsLXBhZ2VcIlxyXG5cclxuZXhwb3J0IGNvbnN0IE5vTmV0d29yaz0oe29uQ2xvc2V9KT0+KFxyXG5cdDxkaXYgc3R5bGU9e3twYWRkaW5nOjIwLCBmb250U2l6ZToxMn19PlxyXG5cdFx0PGgxPuacquiDvemTvuaOpeWIsOS6kuiBlOe9kTwvaDE+XHJcblx0XHQ8cD7mgqjnmoTorr7lpIfmnKrlkK/nlKjnp7vliqjnvZHnu5zmiJbml6Dnur/lsYDln5/nvZE8L3A+XHJcblx0XHQ8aHIgc3R5bGU9e3tib3JkZXI6XCIxcHggc29saWQgbGlnaHRncmF5XCIsbWFyZ2luOlwiNXB4IDBweFwifX0vPlxyXG5cdFx0PHA+5aaC6ZyA6KaB6L+e5o6l5Yiw5LqS6IGU572R77yM6K+35Y+C6ICD5Lul5LiL5Yeg54K5OjwvcD5cclxuXHRcdDx1bD5cclxuXHRcdFx0PGxpPuajgOafpeaJi+acuuS4reeahOaXoOe6v+WxgOWfn+e9keiuvue9ru+8jOafpeeci+aYr+WQpuacieWPr+S7i+WFpeeahOaXoOe6v+WxgOWfn+e9keS/oeWPtzwvbGk+XHJcblx0XHRcdDxsaT7mo4Dmn6XmiYvmnLrmmK/lkKblt7LmjqXlhaXnp7vliqjnvZHnu5zvvIzlubbkuJTmiYvmnLrmsqHmnInooqvlgZzmnLo8L2xpPlxyXG5cdFx0PC91bD5cclxuXHRcdDxwPuWmguaenOaCqOW3suS7i+aOpeaXoOe6v+WxgOWfn+e9kTo8L3A+XHJcblx0XHQ8dWw+XHJcblx0XHRcdDxsaT7or7fmo4Dmn6XmgqjmiYDov57mjqXnmoTml6Dnur/lsYDln5/nvZHng63ngrnmmK/lkKblt7LmjqXlhaXkupLogZTnvZHvvIzmiJbor6Xng63ngrnmmK/lkKblt7LlhYHorrjkvaDnmoTorr7lpIforr/pl67kupLogZTnvZE8L2xpPlxyXG5cdFx0PC91bD5cclxuXHQ8L2Rpdj5cclxuKVxyXG5cclxuY2xhc3MgTm9OZXR3b3JrQmFubmVyIGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHN0YXRlPXtkZXRhaWxlZDpmYWxzZX1cclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHtkZXRhaWxlZH09dGhpcy5zdGF0ZVxyXG5cdFx0bGV0IG5vTmV0d29yaz1udWxsXHJcblx0XHRpZihkZXRhaWxlZCl7XHJcblx0XHRcdG5vTmV0d29yaz0oXHJcblx0XHRcdFx0PEZ1bGxQYWdlPlxyXG5cdFx0XHRcdFx0PGRpdiBzdHlsZT17e2Rpc3BsYXk6XCJmbGV4XCIsZmxleERpcmVjdGlvbjpcInJvd1wiLCAgYmFja2dyb3VuZDpcImJsYWNrXCJ9fT5cclxuXHRcdFx0XHRcdFx0PGRpdiBzdHlsZT17e2ZsZXg6MX19PlxyXG5cdFx0XHRcdFx0XHRcdDxJY29uQnV0dG9uIG9uQ2xpY2s9e2U9PnRoaXMuc2V0U3RhdGUoe2RldGFpbGVkOmZhbHNlfSl9PlxyXG5cdFx0XHRcdFx0XHRcdFx0PEljb25DbG9zZSBcclxuXHRcdFx0XHRcdFx0XHRcdFx0Y29sb3I9XCJ3aGl0ZVwiLz5cclxuXHRcdFx0XHRcdFx0XHQ8L0ljb25CdXR0b24+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IHN0eWxlPXt7XHJcblx0XHRcdFx0XHRcdFx0XHRmbGV4OlwiMSAxMDAlXCIsaGVpZ2h0OjQ4LFxyXG5cdFx0XHRcdFx0XHRcdFx0bGluZUhlaWdodDpcIjQ4cHhcIixmb250U2l6ZTpcInNtYWxsXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRjb2xvcjpcIndoaXRlXCJcclxuXHRcdFx0XHRcdFx0XHRcdH19PlxyXG5cdFx0XHRcdFx0XHRcdOe9kee7nOi/nuaOpeS4jeWPr+eUqFxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PE5vTmV0d29yay8+XHJcblx0XHRcdFx0PC9GdWxsUGFnZT5cdFxyXG5cdFx0XHQpXHRcdFx0XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gIChcclxuXHRcdFx0PGRpdj5cclxuXHRcdFx0XHQ8ZGl2IG9uQ2xpY2s9e2U9PnRoaXMuc2V0U3RhdGUoe2RldGFpbGVkOnRydWV9KX1cclxuXHRcdFx0XHRcdHN0eWxlPXt7ZGlzcGxheTpcImZsZXhcIixmbGV4RGlyZWN0aW9uOlwicm93XCIsICBiYWNrZ3JvdW5kOnJlZDEwMH19PlxyXG5cdFx0XHRcdFx0PGRpdiBzdHlsZT17e2ZsZXg6MX19PlxyXG5cdFx0XHRcdFx0XHQ8SWNvbkJ1dHRvbj5cclxuXHRcdFx0XHRcdFx0XHQ8SWNvbkFsZXJ0Lz5cclxuXHRcdFx0XHRcdFx0PC9JY29uQnV0dG9uPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IHN0eWxlPXt7ZmxleDpcIjEgMTAwJVwiLGhlaWdodDo0OCxsaW5lSGVpZ2h0OlwiNDhweFwiLGZvbnRTaXplOlwic21hbGxcIn19PlxyXG5cdFx0XHRcdFx0XHTnvZHnu5zov57mjqXkuI3lj6/nlKhcclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdHtub05ldHdvcmt9XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KVxyXG5cdH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCB3aXRoTm90aWZpY2F0aW9uPShCYXNlPSgpPT5udWxsKT0+Y29tcG9zZShcclxuXHRjb25uZWN0KCh7cWlsaTp7bmV0d29ya1N0YXR1c319KT0+KHtuZXR3b3JrU3RhdHVzfSkpLFxyXG4pKCh7bmV0d29ya1N0YXR1cywgLi4ucHJvcHN9KT0+KFxyXG5cdDxkaXY+XHJcblx0XHR7bmV0d29ya1N0YXR1cz09XCJvZmZsaW5lXCIgPyA8Tm9OZXR3b3JrQmFubmVyLz4gOiBudWxsfVxyXG5cdFx0PEJhc2Ugey4uLnByb3BzfS8+XHJcblx0PC9kaXY+XHJcbikpXHJcblxyXG5leHBvcnQgY29uc3QgTm90aWZpY2F0aW9uPXdpdGhOb3RpZmljYXRpb24oKVxyXG5cclxuZXhwb3J0IGNvbnN0IG5vdFN1cHBvcnQ9KEJhc2UsT2ZmbGluZVVJPU5vTmV0d29yayk9PmNvbXBvc2UoXHJcblx0Y29ubmVjdCgoe3FpbGk6e25ldHdvcmtTdGF0dXN9fSk9Pih7bmV0d29ya1N0YXR1c30pKSxcclxuXHRicmFuY2goKHtuZXR3b3JrU3RhdHVzfSk9Pm5ldHdvcmtTdGF0dXM9PVwib2ZmbGluZVwiLCByZW5kZXJDb21wb25lbnQoT2ZmbGluZVVJKSlcclxuKShCYXNlKSIsImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiXHJcbmltcG9ydCB7RmxhdEJ1dHRvbixUZXh0RmllbGR9IGZyb20gXCJtYXRlcmlhbC11aVwiXHJcbmltcG9ydCBpc0VtYWlsIGZyb20gXCJpcy12YWxpZC1lbWFpbFwiXHJcbmltcG9ydCB7Y29tcG9zZSwgd2l0aFN0YXRlLCB3aXRoUHJvcHMsIGJyYW5jaCxyZW5kZXJDb21wb25lbnQsZGVmYXVsdFByb3BzfSBmcm9tIFwicmVjb21wb3NlXCJcclxuaW1wb3J0IHtncmFwaHFsLCB3aXRoTXV0YXRpb259IGZyb20gXCIuLi90b29scy9yZWNvbXBvc2VcIlxyXG5pbXBvcnQgKiBhcyBvZmZsaW5lIGZyb20gXCIuL29mZmxpbmVcIlxyXG5cclxuY29uc3QgRU5URVI9MTNcclxuY29uc3QgaXNQaG9uZT12PT4oL14oXFwrXFxkezJ9KT9cXGR7MTF9JC9nKS50ZXN0KHYpXHJcblxyXG5leHBvcnQgY2xhc3MgQXV0aGVudGljYXRpb24gZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0c3RhdGljIHByb3BUeXBlcz17XHJcblx0XHRvblN1Y2Nlc3M6IFByb3BUeXBlcy5mdW5jXHJcblx0fVxyXG5cdHN0YXRlPXtcclxuICAgICAgICB0aWNrOm51bGwsXHJcbiAgICAgICAgZXJyb3I6bnVsbCxcclxuICAgICAgICBleGlzdHM6dHJ1ZSxcclxuXHRcdGVyck5hbWU6bnVsbFxyXG4gICAgfVxyXG5cclxuICAgIHRpY2soKXtcclxuICAgICAgICBsZXQgaT02MCwgZG9UaWNrO1xyXG4gICAgICAgIHRoaXMuX3Q9c2V0SW50ZXJ2YWwoZG9UaWNrPSgpPT57XHJcbiAgICAgICAgICAgIGlmKGk9PTApe1xyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl90KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dGljazogMH0pXHJcbiAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt0aWNrOmktLX0pXHJcbiAgICAgICAgfSwxMDAwKTtcclxuXHJcbiAgICAgICAgZG9UaWNrKClcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpe1xyXG4gICAgICAgIGlmKHRoaXMuX3QpXHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5fdClcclxuICAgIH1cclxuXHJcblx0cmVxdWVzdENvZGUoKXtcclxuXHRcdGNvbnN0IHtjb250YWN0LCBzZXRUb2tlbixyZXF1ZXN0VG9rZW59PXRoaXMucHJvcHNcclxuXHRcdGlmKGNvbnRhY3Qpe1xyXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtlcnJvcjpudWxsLGVyck5hbWU6bnVsbCxleGlzdHM6dHJ1ZX0pXHJcblx0XHRcdHNldFRva2VuKFwiXCIpXHJcblx0XHRcdHJlcXVlc3RUb2tlbih7Y29udGFjdH0pXHJcblx0XHRcdFx0LnRoZW4oZXhpc3RzPT57XHJcblx0XHRcdFx0XHR0aGlzLnRpY2soKVxyXG5cdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7ZXhpc3RzfSlcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdC5jYXRjaChlPT50aGlzLnNldFN0YXRlKHtlcnJvcjplLm1lc3NhZ2V9KSlcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGxvZ2luKCl7XHJcblx0XHRjb25zdCB7Y29udGFjdCwgdG9rZW4sIG5hbWUsIHN1Y2Nlc3MsIG9uU3VjY2Vzcyxsb2dpbn09dGhpcy5wcm9wc1xyXG5cdFx0Y29uc3Qge2V4aXN0c309dGhpcy5zdGF0ZVxyXG5cdFx0aWYoY29udGFjdCAmJiAobmFtZSB8fCBleGlzdHMpICYmIHRva2VuKXtcclxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7ZXJyb3I6dW5kZWZpbmVkfSlcclxuXHRcdFx0bG9naW4oe2NvbnRhY3QsIHRva2VuLCBuYW1lfSlcclxuXHRcdFx0XHQudGhlbih1c2VyPT4ob25TdWNjZXNzfHxzdWNjZXNzKSh1c2VyKSlcclxuXHRcdFx0XHQuY2F0Y2goZT0+dGhpcy5zZXRTdGF0ZSh7ZXJyb3I6ZS5tZXNzYWdlfSkpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZW5kZXIoKXtcclxuICAgICAgICBjb25zdCB7Y29udGFjdCwgc2V0Q29udGFjdCwgdG9rZW4sIHNldFRva2VuLCBuYW1lLCBzZXROYW1lLCBzdWNjZXNzLCBvblN1Y2Nlc3N9PXRoaXMucHJvcHNcclxuXHRcdGNvbnN0IHtsb2dpbn09dGhpcy5wcm9wc1xyXG5cclxuXHRcdGNvbnN0IHt0aWNrLGVycm9yLGVyck5hbWUsZXhpc3RzfT10aGlzLnN0YXRlXHJcblx0XHRsZXQgYnRuUmVxdWVzdCwgYnRuTG9naW4sIGlucHV0TmFtZVxyXG5cdFx0aWYoY29udGFjdCl7XHJcbiAgICAgICAgICAgIGlmKHRpY2spe1xyXG4gICAgICAgICAgICAgICAgYnRuUmVxdWVzdD0oPEZsYXRCdXR0b24gbGFiZWw9e3RpY2t9IGRpc2FibGVkPXt0cnVlfS8+KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYnRuUmVxdWVzdD0oPEZsYXRCdXR0b24gbGFiZWw9e3RpY2s9PT0wID8gXCLph43mlrDnlLPor7dcIiA6IFwi55Sz6K+36aqM6K+B56CBXCJ9XHJcblx0XHRcdFx0XHRcdFx0b25DbGljaz17dGhpcy5yZXF1ZXN0Q29kZS5iaW5kKHRoaXMpfS8+KVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cdFx0XHRpZighZXhpc3RzKXtcclxuXHRcdFx0XHRpbnB1dE5hbWU9KDxUZXh0RmllbGRcclxuXHRcdFx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XHJcblx0XHRcdFx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCLmlrDnlKjmiLflkI3np7Av5pi156ewXCJcclxuXHRcdFx0XHRcdFx0XHRlcnJvclRleHQ9e2Vyck5hbWV9XHJcblx0XHRcdFx0XHRcdFx0b25DaGFuZ2U9eyh7dGFyZ2V0Ont2YWx1ZX19KT0+e1xyXG5cdFx0XHRcdFx0XHRcdFx0c2V0TmFtZSh2YWx1ZSlcclxuXHRcdFx0XHRcdFx0XHR9fVxyXG5cdFx0XHRcdFx0XHRcdC8+KVxyXG5cdFx0XHR9XHJcblxyXG4gICAgICAgICAgICBpZigobmFtZSB8fCBleGlzdHMpICYmIHRva2VuKXtcclxuXHRcdFx0XHRidG5Mb2dpbj0oPEZsYXRCdXR0b25cclxuXHRcdFx0XHRcdFx0XHRsYWJlbD1cIueZu+W9lVwiXHJcblx0XHRcdFx0XHRcdFx0cHJpbWFyeT17dHJ1ZX1cclxuXHRcdFx0XHRcdFx0XHRvbkNsaWNrPXt0aGlzLmxvZ2luLmJpbmQodGhpcyl9XHJcblx0XHRcdFx0XHRcdFx0Lz4pXHJcblx0XHRcdH1cclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuXHRcdFx0PGRpdj5cclxuXHRcdFx0XHQ8ZGl2IHN0eWxlPXt7ZGlzcGxheTpcInRhYmxlXCIsdGFibGVMYXlvdXQ6XCJmaXhlZFwiLHdpZHRoOlwiMTAwJVwifX0+XHJcblx0XHRcdFx0XHQ8ZGl2IHN0eWxlPXt7ZGlzcGxheTpcInRhYmxlLWNlbGxcIn19PlxyXG5cdFx0XHRcdFx0XHQ8VGV4dEZpZWxkXHJcblx0XHRcdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxyXG5cdFx0XHRcdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0PVwi5omL5py65Y+3L0VtYWlsXCJcclxuXHRcdFx0XHRcdFx0XHRkaXNhYmxlZD17ISF0aWNrfVxyXG5cdFx0XHRcdFx0XHRcdGVycm9yVGV4dD17Y29udGFjdCYmIXRva2VuID8gZXJyb3IgOiBudWxsfVxyXG5cdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXsoe3RhcmdldDp7dmFsdWV9fSk9PnNldENvbnRhY3QodGhpcy52YWxpZGF0ZSh2YWx1ZSkpfVxyXG5cdFx0XHRcdFx0XHRcdG9uS2V5RG93bj17ZT0+ZS5rZXlDb2RlPT1FTlRFUiAmJiB0aGlzLnJlcXVlc3RDb2RlKCl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IHN0eWxlPXt7ZGlzcGxheTpcInRhYmxlLWNlbGxcIiwgdGV4dEFsaWduOlwicmlnaHRcIiwgd2lkdGg6ICEhYnRuUmVxdWVzdCA/IFwiOGVtXCIgOiAwfX0+XHJcblx0XHRcdFx0XHRcdHtidG5SZXF1ZXN0fVxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblxyXG5cdFx0XHRcdDxUZXh0RmllbGRcclxuXHRcdFx0XHRcdHZhbHVlPXt0b2tlbn1cclxuICAgICAgICAgICAgICAgICAgICBmdWxsV2lkdGg9e3RydWV9XHJcbiAgICAgICAgICAgICAgICAgICAgZmxvYXRpbmdMYWJlbFRleHQ9XCLpqozor4HnoIFcIlxyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yVGV4dD17Y29udGFjdCYmdG9rZW4gPyBlcnJvciA6IG51bGx9XHJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyh7dGFyZ2V0Ont2YWx1ZX19KT0+c2V0VG9rZW4odmFsdWUpfVxyXG5cdFx0XHRcdFx0b25LZXlEb3duPXtlPT5lLmtleUNvZGU9PUVOVEVSICYmIHRoaXMubG9naW4oKX1cclxuICAgICAgICAgICAgICAgICAgICAvPlxyXG5cclxuXHRcdFx0XHR7aW5wdXROYW1lfVxyXG5cclxuXHRcdFx0XHQ8Y2VudGVyPlxyXG4gICAgICAgICAgICAgICAgICAgIHtidG5Mb2dpbn1cclxuICAgICAgICAgICAgICAgIDwvY2VudGVyPlxyXG5cdFx0XHQ8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgdmFsaWRhdGUodil7XHJcbiAgICAgICAgcmV0dXJuIChpc0VtYWlsKHYpIHx8IGlzUGhvbmUodikpID8gdiA6IHVuZGVmaW5lZFxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb21wb3NlKFxyXG5cdHdpdGhTdGF0ZShcImRvbmVcIixcInN1Y2Nlc3NcIiksXHJcblx0YnJhbmNoKCh7ZG9uZX0pPT5kb25lLHJlbmRlckNvbXBvbmVudCgoKT0+PHNwYW4+5oiQ5YqfPC9zcGFuPikpLFxyXG5cdHdpdGhTdGF0ZShcImNvbnRhY3RcIixcInNldENvbnRhY3RcIiksXHJcblx0d2l0aFN0YXRlKFwidG9rZW5cIixcInNldFRva2VuXCIsXCJcIiksXHJcblx0d2l0aFN0YXRlKFwibmFtZVwiLFwic2V0TmFtZVwiKSxcclxuXHRvZmZsaW5lLm5vdFN1cHBvcnQsXHJcblx0d2l0aE11dGF0aW9uKHtcclxuXHRcdG5hbWU6IFwicmVxdWVzdFRva2VuXCIsXHJcblx0XHRwcm9taXNlOnRydWUsXHJcblx0XHRtdXRhdGlvbjogZ3JhcGhxbGBcclxuXHRcdFx0bXV0YXRpb24gYXV0aGVudGljYXRpb25fcmVxdWVzdFRva2VuX011dGF0aW9uKCRjb250YWN0OlN0cmluZyEpe1xyXG5cdFx0XHRcdHJlcXVlc3RUb2tlbihjb250YWN0OiRjb250YWN0KVxyXG5cdFx0XHR9XHJcblx0XHRgXHJcblx0fSksXHJcblx0d2l0aE11dGF0aW9uKHtcclxuXHRcdG5hbWU6IFwibG9naW5cIixcclxuXHRcdHByb21pc2U6dHJ1ZSxcclxuXHRcdG11dGF0aW9uOiBncmFwaHFsYFxyXG5cdFx0XHRtdXRhdGlvbiBhdXRoZW50aWNhdGlvbl9sb2dpbl9NdXRhdGlvbigkY29udGFjdDpTdHJpbmchLCAkdG9rZW46IFN0cmluZyEsICRuYW1lOiBTdHJpbmcpe1xyXG5cdFx0XHRcdGxvZ2luKGNvbnRhY3Q6JGNvbnRhY3QsIHRva2VuOiR0b2tlbiwgbmFtZTogJG5hbWUpe1xyXG5cdFx0XHRcdFx0aWRcclxuXHRcdFx0XHRcdHRva2VuXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRgXHJcblx0fSlcclxuKShBdXRoZW50aWNhdGlvbilcclxuIiwiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tIFwicmVhY3RcIlxyXG5cclxuaW1wb3J0IHsgQXV0b1JvdGF0aW5nQ2Fyb3VzZWwsIFNsaWRlIH0gZnJvbSAnbWF0ZXJpYWwtYXV0by1yb3RhdGluZy1jYXJvdXNlbCdcclxuaW1wb3J0IE1lZGlhUXVlcnkgZnJvbSBcInJlYWN0LXJlc3BvbnNpdmVcIlxyXG5leHBvcnQgY29uc3QgVHV0b3JpYWw9KHtzbGlkZXM9W10sIG9uRW5kLCBsYW5kc2NhcGU9ZmFsc2V9KT0+KFxyXG5cdDxkaXY+XHJcblx0XHQ8TWVkaWFRdWVyeSBvcmllbnRhdGlvbj1cImxhbmRzY2FwZVwiPlxyXG5cdFx0e21hdGNoPT5tYXRjaCAmJiAobGFuZHNjYXBlPXRydWUpICYmIG51bGx9XHJcblx0XHQ8L01lZGlhUXVlcnk+XHJcblx0XHQ8QXV0b1JvdGF0aW5nQ2Fyb3VzZWwgb3Blbj17dHJ1ZX1cclxuXHRcdFx0bGFiZWw9XCLlvIDlp4vkvZPpqoxcIlxyXG5cdFx0XHRsYW5kc2NhcGU9e2xhbmRzY2FwZX1cclxuXHRcdFx0bW9iaWxlPXt0eXBlb2YoY29yZG92YSkhPSd1bmRlZmluZWQnfVxyXG5cdFx0XHRvblN0YXJ0PXtvbkVuZH0+XHJcblx0XHRcdHtcclxuXHRcdFx0XHRzbGlkZXMubWFwKChhLGkpPT57XHJcblx0XHRcdFx0XHRpZihSZWFjdC5pc1ZhbGlkRWxlbWVudChhKSlcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGFcclxuXHJcblx0XHRcdFx0XHRpZih0eXBlb2YoYSk9PSdzdHJpbmcnKVxyXG5cdFx0XHRcdFx0XHRhPXttZWRpYTphfVxyXG5cclxuXHRcdFx0XHRcdGlmKHR5cGVvZihhLm1lZGlhKT09XCJzdHJpbmdcIilcclxuXHRcdFx0XHRcdFx0YS5tZWRpYT08aW1nIHNyYz17YS5tZWRpYX0vPlxyXG5cclxuXHRcdFx0XHRcdHJldHVybiA8U2xpZGUga2V5PXtpfSB7Li4ue3RpdGxlOlwiXCIsIHN1YnRpdGxlOlwiXCIsLi4uYX19Lz5cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9XHJcblx0XHQ8L0F1dG9Sb3RhdGluZ0Nhcm91c2VsPlxyXG5cdDwvZGl2PlxyXG4pXHJcblxyXG5leHBvcnQgZGVmYXVsdCBUdXRvcmlhbFxyXG4iLCJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIlxyXG5cclxuZXhwb3J0IGNsYXNzIENvdW50RG93biBleHRlbmRzIENvbXBvbmVudHtcclxuXHRzdGF0aWMgcHJvcFR5cGVzPXtcclxuXHRcdG46IFByb3BUeXBlcy5udW1iZXIsXHJcblx0XHRvbkVuZDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuXHR9XHJcblx0XHJcblx0c3RhdGU9e246dGhpcy5wcm9wcy5ufHw2MH1cclxuXHRcclxuXHRjb21wb25lbnREaWRNb3VudCgpe1xyXG5cdFx0dGhpcy50aW1lcj1zZXRJbnRlcnZhbCgoKT0+e1xyXG5cdFx0XHR0aGlzLnNldFN0YXRlKCh7bn0pPT57XHJcblx0XHRcdFx0bi0tXHJcblx0XHRcdFx0aWYobj09MCl7XHJcblx0XHRcdFx0XHRjbGVhckludGVydmFsKHRoaXMudGltZXIpXHJcblx0XHRcdFx0XHR0aGlzLnByb3BzLm9uRW5kKClcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYobj49MClcclxuXHRcdFx0XHRcdHJldHVybiB7bn1cclxuXHRcdFx0fSlcclxuXHRcdH0sMTAwMClcclxuXHR9XHJcblx0Y29tcG9uZW50V2lsbFVubW91bnQoKXtcclxuXHRcdGNsZWFySW50ZXJ2YWwodGhpcy50aW1lcilcclxuXHR9XHJcblx0cmVuZGVyKCl7XHJcblx0XHRyZXR1cm4gKDxzcGFuPnt0aGlzLnN0YXRlLm59PC9zcGFuPilcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvdW50RG93biIsImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiXHJcbmltcG9ydCBDb3VudERvd24gZnJvbSBcIi4vY291bnQtZG93blwiXHJcbmltcG9ydCBGdWxsUGFnZSAgZnJvbSBcIi4vZnVsbC1wYWdlXCJcclxuXHJcbmV4cG9ydCBjb25zdCBTcGxhc2hBRD0oe3VybCwgY2hpbGRyZW4sIC4uLnByb3BzfSwge3RoZW1lOntwYWdlOnt3aWR0aCxoZWlnaHR9fX0pPT4oXHJcblx0PEZ1bGxQYWdlIHN0eWxlPXt7XHJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6XCJ0cmFuc3BhcmVudFwiLFxyXG5cdFx0YmFja2dyb3VuZEltYWdlOiB1cmwgPyBgJHt1cmx9P3dpZHRoPSR7d2lkdGh9JmhlaWdodD0ke2hlaWdodH1gIDogdW5kZWZpbmVkLFxyXG5cdH19PlxyXG5cdFx0PGRpdiBjbGFzc05hbWU9XCJzdGlja3kgdG9wIHJpZ2h0XCIgXHJcblx0XHRcdG9uQ2xpY2s9e3Byb3BzLm9uRW5kfVxyXG5cdFx0XHRzdHlsZT17e1xyXG5cdFx0XHRcdG1pbldpZHRoOlwiNWVtXCIsXHJcblx0XHRcdFx0dGV4dEFsaWduOlwiY2VudGVyXCIsXHJcblx0XHRcdFx0cGFkZGluZzo1LFxyXG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjpcImJsYWNrXCIsXHJcblx0XHRcdFx0b3BhY2l0eTowLjMsXHJcblx0XHRcdFx0Y29sb3I6XCJ3aGl0ZVwiLFxyXG5cdFx0XHRcdGJvcmRlclJhZGl1czo1LFxyXG5cdFx0XHR9fT48Q291bnREb3duIG49ezN9IHsuLi5wcm9wc30vPnMg6Lez6L+HPC9kaXY+XHJcblx0PC9GdWxsUGFnZT5cclxuKVxyXG5cclxuU3BsYXNoQUQuY29udGV4dFR5cGVzPXtcclxuXHR0aGVtZTogUHJvcFR5cGVzLm9iamVjdFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTcGxhc2hBRCIsImltcG9ydCBcImJhYmVsLXBvbHlmaWxsXCIgXHJcbmltcG9ydCBcIi4vc3R5bGUvaW5kZXgubGVzc1wiXHJcbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tIFwicHJvcC10eXBlc1wiXHJcbmltcG9ydCB7cmVuZGVyfSBmcm9tIFwicmVhY3QtZG9tXCJcclxuaW1wb3J0IG1lcmdlIGZyb20gXCJsb2Rhc2gubWVyZ2VcIlxyXG5pbXBvcnQge3BlcnNpc3RTdG9yZSwgYXV0b1JlaHlkcmF0ZX0gZnJvbSAncmVkdXgtcGVyc2lzdCdcclxuXHJcbmltcG9ydCB7Y29tcG9zZSwgcHVyZSx3aXRoU3RhdGUsYnJhbmNoLHJlbmRlckNvbXBvbmVudCwgcmVuZGVyTm90aGluZyxcclxuXHRcdHNldERpc3BsYXlOYW1lLFxyXG5cdFx0d2l0aFByb3BzLCBkZWZhdWx0UHJvcHMsIHdpdGhDb250ZXh0LCBzZXRTdGF0aWMsIHNldFByb3BUeXBlcywgbWFwUHJvcHN9IGZyb20gXCJyZWNvbXBvc2VcIlxyXG5pbXBvcnQge3dpdGhHcmFwaHFsQ2xpZW50fSBmcm9tIFwiLi90b29scy9yZWNvbXBvc2VcIlxyXG5cclxuaW1wb3J0IHtjcmVhdGVTdG9yZSwgYXBwbHlNaWRkbGV3YXJlLCBjb21iaW5lUmVkdWNlcnN9IGZyb20gXCJyZWR1eFwiXHJcblxyXG5pbXBvcnQge2Nvbm5lY3QsIFByb3ZpZGVyfSBmcm9tIFwicmVhY3QtcmVkdXhcIlxyXG5pbXBvcnQgdGh1bmsgZnJvbSAncmVkdXgtdGh1bmsnXHJcblxyXG5pbXBvcnQgTXVpVGhlbWVQcm92aWRlciBmcm9tICdtYXRlcmlhbC11aS9zdHlsZXMvTXVpVGhlbWVQcm92aWRlcidcclxuaW1wb3J0IGdldE11aVRoZW1lIGZyb20gJ21hdGVyaWFsLXVpL3N0eWxlcy9nZXRNdWlUaGVtZSdcclxuaW1wb3J0IExpZ2h0QmFzZVRoZW1lIGZyb20gJ21hdGVyaWFsLXVpL3N0eWxlcy9iYXNlVGhlbWVzL2xpZ2h0QmFzZVRoZW1lJ1xyXG5pbXBvcnQgQ2lyY3VsYXJQcm9ncmVzcyBmcm9tICdtYXRlcmlhbC11aS9DaXJjdWxhclByb2dyZXNzJ1xyXG5pbXBvcnQgU25hY2tiYXIgZnJvbSAnbWF0ZXJpYWwtdWkvU25hY2tiYXInXHJcbmltcG9ydCBJY29uT2ZmbGluZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ZpbGUvY2xvdWQtb2ZmXCJcclxuXHJcbmltcG9ydCBzdXBwb3J0VGFwIGZyb20gJ3JlYWN0LXRhcC1ldmVudC1wbHVnaW4nXHJcbmltcG9ydCAqIGFzIGRhdGUgZnJvbSBcIi4vdG9vbHMvZGF0ZVwiXHJcblxyXG5pbXBvcnQgUGVyZm9ybWFuY2UgZnJvbSBcIi4vY29tcG9uZW50cy9wZXJmb3JtYW5jZVwiXHJcbmltcG9ydCBGaWxlIGZyb20gXCIuL2NvbXBvbmVudHMvZmlsZVwiXHJcbmltcG9ydCBBdXRoZW50aWNhdGlvbiBmcm9tIFwiLi9jb21wb25lbnRzL2F1dGhlbnRpY2F0aW9uXCJcclxuaW1wb3J0IFR1dG9yaWFsIGZyb20gXCIuL2NvbXBvbmVudHMvdHV0b3JpYWxcIlxyXG5pbXBvcnQgRW1wdHkgZnJvbSBcIi4vY29tcG9uZW50cy9lbXB0eVwiXHJcbmltcG9ydCBTcGxhc2hBRCBmcm9tIFwiLi9jb21wb25lbnRzL3NwbGFzaC1hZFwiXHJcbmltcG9ydCAqIGFzIG9mZmxpbmUgZnJvbSBcIi4vY29tcG9uZW50cy9vZmZsaW5lXCJcclxuXHJcbmV4cG9ydCBjb25zdCBUSEVNRT1nZXRNdWlUaGVtZShMaWdodEJhc2VUaGVtZSx7XHJcblx0Zm9vdGJhcjp7XHJcblx0XHRoZWlnaHQ6IDUwXHJcblx0fSxcclxuXHRwYWdlOntcclxuXHRcdHdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCA+IDk2MCA/IDk2MCA6IHdpbmRvdy5pbm5lcldpZHRoLFxyXG5cdFx0aGVpZ2h0OndpbmRvdy5pbm5lckhlaWdodFxyXG5cdH1cclxufSlcclxuXHJcbmV4cG9ydCBjb25zdCBET01BSU49XCJxaWxpXCJcclxuXHJcbmV4cG9ydCBjb25zdCBBQ1RJT049e1xyXG5cdENIRUNLX1ZFUlNJT046KGhvbWVwYWdlLGN1cnJlbnRWZXJzaW9uKT0+ZGlzcGF0Y2g9PntcclxuXHRcdGZldGNoKGAke2hvbWVwYWdlfS9hcHAuYXBrLnZlcnNpb25gKVxyXG5cdFx0XHQudGhlbihyZXM9PnJlcy50ZXh0KCkpXHJcblx0XHRcdC50aGVuKHZlcnNpb249PmRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS9MQVNURVNUX1ZFUlNJT05gLCBwYXlsb2FkOnZlcn0pKVxyXG5cdFx0XHQuY2F0Y2goZT0+ZSlcclxuXHR9LFxyXG5cdENVUlJFTlRfVVNFUjp1c2VyPT4oe1xyXG4gICAgICAgIHR5cGU6YEBAJHtET01BSU59L1VTRVJfQ0hBTkdFRGBcclxuXHRcdCxwYXlsb2FkOnVzZXJcclxuXHR9KSxcclxuXHRUVVRPUklBTElaRUQ6KHt0eXBlOmBAQCR7RE9NQUlOfS9UVVRPUklBTElaRURgfSksXHJcblx0TE9HT1VUOih7dHlwZTpgQEAke0RPTUFJTn0vTE9HT1VUYH0pLFxyXG5cdExPQURJTkc6IHBheWxvYWQ9Pih7dHlwZTpgQEAke0RPTUFJTn0vTE9BRElOR2AscGF5bG9hZH0pLFxyXG5cdE1FU1NBR0U6IHBheWxvYWQ9Pih7XHJcblx0XHR0eXBlOmBAQCR7RE9NQUlOfS9NRVNTQUdFYCxcclxuXHRcdHBheWxvYWQ6IHR5cGVvZihwYXlsb2FkKT09XCJzdHJpbmdcIiA/IHttZXNzYWdlOnBheWxvYWR9OnBheWxvYWRcclxuXHR9KSxcclxuXHRBRF9ET05FOiAoe3R5cGU6YEBAJHtET01BSU59L0FERE9ORWB9KSxcclxuXHRSRUFEWTooe3R5cGU6YEBAJHtET01BSU59L0lOSVRFRGB9KSxcclxuXHRSRVBPUlQ6IHJlcG9ydD0+KHt0eXBlOmBAQCR7RE9NQUlOfS9PUFRJQ1NgLHBheWxvYWQ6cmVwb3J0fSksXHJcblx0T05MSU5FOiAoKT0+KHt0eXBlOmBAQCR7RE9NQUlOfS9PTkxJTkVgfSksXHJcblx0T0ZGTElORTogKCk9Pih7dHlwZTpgQEAke0RPTUFJTn0vT0ZGTElORWB9KSxcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IFJFRFVDRVI9KHN0YXRlPXtuZXR3b3JrU3RhdHVzOlwib25saW5lXCJ9LHt0eXBlLHBheWxvYWR9KT0+e1xyXG5cdHN3aXRjaCh0eXBlKXtcclxuXHRjYXNlIGBAQCR7RE9NQUlOfS9PUFRJQ1NgOlxyXG5cdFx0cmV0dXJuIHsuLi5zdGF0ZSwgb3B0aWNzOnt0b0pTT046KCk9PnVuZGVmaW5lZCwuLi5wYXlsb2FkfX1cclxuXHRjYXNlIGBAQCR7RE9NQUlOfS9JTklURURgOlxyXG5cdFx0cmV0dXJuIHsuLi5zdGF0ZSwgaW5pdGVkOnt0b0pTT046KCk9PnVuZGVmaW5lZH19XHJcblx0Y2FzZSBgQEAke0RPTUFJTn0vQURET05FYDpcclxuXHRcdHJldHVybiB7Li4uc3RhdGUsIEFEOnt0b0pTT046KCk9PnVuZGVmaW5lZH19XHJcblx0Y2FzZSBgQEAke0RPTUFJTn0vVVNFUl9DSEFOR0VEYDpcclxuXHRcdHJldHVybiB7Li4uc3RhdGUsdXNlcjpwYXlsb2FkfVxyXG5cdGNhc2UgYEBAJHtET01BSU59L1RVVE9SSUFMSVpFRGA6XHJcblx0XHRyZXR1cm4gey4uLnN0YXRlLHR1dG9yaWFsaXplZDp0cnVlfVxyXG5cdGNhc2UgYEBAJHtET01BSU59L0xPR09VVGA6XHJcblx0XHRyZXR1cm4gey4uLnN0YXRlLCB1c2VyOnsuLi5zdGF0ZS51c2VyLCB0b2tlbjp1bmRlZmluZWR9fVxyXG5cdGNhc2UgYEBAJHtET01BSU59L0xBU1RFU1RfVkVSU0lPTmA6XHJcblx0XHRyZXR1cm4gey4uLnN0YXRlLGxhdGVzdFZlcnNpb246cGF5bG9hZH1cclxuXHRjYXNlIGBAQCR7RE9NQUlOfS9MT0FESU5HYDpcclxuXHRcdHJldHVybiB7Li4uc3RhdGUsbG9hZGluZzohIXBheWxvYWR9XHJcblx0Y2FzZSBgQEAke0RPTUFJTn0vTUVTU0FHRWA6XHJcblx0XHRyZXR1cm4gey4uLnN0YXRlLCBtZXNzYWdlOnBheWxvYWR9XHJcblx0Y2FzZSBgQEAke0RPTUFJTn0vT0ZGTElORWA6XHJcblx0XHRyZXR1cm4gey4uLnN0YXRlLCBuZXR3b3JrU3RhdHVzOlwib2ZmbGluZVwifVxyXG5cdGNhc2UgYEBAJHtET01BSU59L09OTElORWA6XHJcblx0XHRyZXR1cm4gey4uLnN0YXRlLCBuZXR3b3JrU3RhdHVzOlwib25saW5lXCJ9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gc3RhdGVcclxufVxyXG5cclxuY29uc3QgVUk9KHttdWlUaGVtZSxjaGlsZHJlbj1cImhlbGxvIFFpbGkhXCJ9KT0+KFxyXG5cdDxNdWlUaGVtZVByb3ZpZGVyIG11aVRoZW1lPXttdWlUaGVtZX0+XHJcblx0XHQ8ZGl2IGNsYXNzTmFtZT1cIndpdGhGb290YmFyXCI+XHJcblx0XHRcdDxkaXYgaWQ9XCJjb250YWluZXJcIiBzdHlsZT17e292ZXJmbG93WTpcInNjcm9sbFwifX0+XHJcblx0XHRcdHtjaGlsZHJlbn1cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQ8L2Rpdj5cclxuXHQ8L011aVRoZW1lUHJvdmlkZXI+XHJcbilcclxuXHJcbmNvbnN0IExvYWRpbmc9Y29ubmVjdChzdGF0ZT0+KHtsb2FkaW5nOiEhc3RhdGVbRE9NQUlOXS5sb2FkaW5nfSkpKCh7bG9hZGluZ30pPT4oXHJcblx0PGRpdiBjbGFzc05hbWU9XCJzdGlja3kgdG9wIHJpZ2h0XCIgc3R5bGU9e3t6SW5kZXg6MTAwMH19PlxyXG5cdFx0PENpcmN1bGFyUHJvZ3Jlc3Mgc3R5bGU9e3tkaXNwbGF5OiBsb2FkaW5nID8gdW5kZWZpbmVkIDogXCJub25lXCJ9fS8+XHJcblx0PC9kaXY+XHJcbikpXHJcblxyXG5jb25zdCBNZXNzYWdlPWNvbm5lY3Qoc3RhdGU9Pih7bGV2ZWw6XCJpbmZvXCIsLi4uc3RhdGVbRE9NQUlOXS5tZXNzYWdlfSkpKFxyXG5cdCh7bGV2ZWwsbWVzc2FnZSxkaXNwYXRjaCxkdXJhdGlvbj0obGV2ZWw9PVwiaW5mb1wiID8gMTAwMCA6IDMwMDApfSk9PihcclxuXHQ8U25hY2tiYXJcclxuICAgICAgICAgIG9wZW49eyEhbWVzc2FnZX1cclxuXHRcdCAgY29udGVudFN0eWxlPXt7Y29sb3I6IGxldmVsPT1cImluZm9cIiA/IFwid2hpdGVcIiA6IFwicmVkXCJ9fVxyXG4gICAgICAgICAgbWVzc2FnZT17bWVzc2FnZXx8XCJcIn1cclxuICAgICAgICAgIGF1dG9IaWRlRHVyYXRpb249e2R1cmF0aW9ufVxyXG4gICAgICAgICAgb25SZXF1ZXN0Q2xvc2U9e2U9PmRpc3BhdGNoKEFDVElPTi5NRVNTQUdFKCkpfVxyXG4gICAgICAgIC8+XHJcbikpXHJcblxyXG5leHBvcnQgY2xhc3MgUWlsaUFwcCBleHRlbmRzIENvbXBvbmVudHtcclxuXHRyZW5kZXIoKXtcclxuXHRcdGxldCB7dGhlbWUsIHN0b3JlLCBjaGlsZHJlbixpc0Rldiwgbm90aWZ5T2ZmbGluZT10cnVlfT10aGlzLnByb3BzXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cclxuXHRcdFx0XHQ8VUkgbXVpVGhlbWU9e3RoZW1lfT5cclxuXHRcdFx0XHRcdHtub3RpZnlPZmZsaW5lID8gPG9mZmxpbmUuTm90aWZpY2F0aW9uLz4gOiBudWxsfVxyXG5cdFx0XHRcdFx0e2NoaWxkcmVufVxyXG5cdFx0XHRcdFx0PExvYWRpbmcvPlxyXG5cdFx0XHRcdFx0PE1lc3NhZ2UvPlxyXG5cdFx0XHRcdFx0e2lzRGV2ID8gPFBlcmZvcm1hbmNlLz4gOiBudWxsfVxyXG5cdFx0XHRcdCA8L1VJPlxyXG5cdFx0XHQ8L1Byb3ZpZGVyPlxyXG5cdFx0KVxyXG5cdH1cclxuXHJcblx0Y29tcG9uZW50RGlkTW91bnQoKXtcclxuXHRcdGNvbnN0IHt0aXRsZSwgY2hlY2tWZXJzaW9ufT10aGlzLnByb3BzXHJcblx0XHRpZih0aXRsZSl7XHJcblx0XHRcdGRvY3VtZW50LnRpdGxlPXRpdGxlXHJcblx0XHR9XHJcblx0XHRjaGVja1ZlcnNpb24oKVxyXG5cdH1cclxuXHJcblx0c3RhdGljIHByb3BzVHlwZXM9e1xyXG5cdFx0dGhlbWU6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcclxuXHRcdHN0b3JlOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXHJcblx0XHRjaGVja1ZlcnNpb246IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcblx0XHR0aXRsZTogUHJvcFR5cGVzLnN0cmluZyxcclxuXHRcdG5vdGlmeU9mZmxpbmU6IFByb3BUeXBlcy5ib29sLFxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29tcG9zZShcclxuXHRzZXREaXNwbGF5TmFtZShcIlFpbGlBcHBcIiksXHJcblx0c2V0UHJvcFR5cGVzKHtcclxuXHRcdGFwcElkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcblx0XHRzZXJ2aWNlOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0c3RvcmU6IFByb3BUeXBlcy5vYmplY3QsXHJcblx0XHR0aGVtZTogUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdG9mZmxpbmVUaGVtZTogUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdHR1dG9yaWFsOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcclxuXHRcdHByb2plY3Q6IFByb3BUeXBlcy5vYmplY3QsXHJcblx0XHRpc0RldjogUHJvcFR5cGVzLmJvb2wsXHJcblx0XHRub3RpZnlPZmZsaW5lOiBQcm9wVHlwZXMuYm9vbCxcclxuXHRcdHN1cHBvcnRPZmZsaW5lOiBQcm9wVHlwZXMub2JqZWN0LFxyXG5cdH0pLFxyXG5cclxuXHRzZXRTdGF0aWMoXCJyZW5kZXJcIiwgKGFwcCk9PntcclxuXHRcdGxldCBjb250YWluZXI9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpXHJcblx0XHRpZighY29udGFpbmVyKXtcclxuXHRcdFx0Y29udGFpbmVyPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcblx0XHRcdGNvbnRhaW5lci5pZD0nYXBwJ1xyXG5cdFx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcilcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgc3R5bGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpXHJcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF0uYXBwZW5kQ2hpbGQoc3R5bGUpXHJcblx0XHRcclxuXHRcdGZ1bmN0aW9uIHNpemUoKXtcclxuXHRcdFx0c3R5bGUuaW5uZXJIVE1MPVwiLnBhZ2V7bWluLWhlaWdodDpcIit3aW5kb3cuaW5uZXJIZWlnaHQrXCJweH1cIlxyXG5cdFx0XHRjb250YWluZXIuc3R5bGUuaGVpZ2h0PXdpbmRvdy5pbm5lckhlaWdodCsncHgnXHJcblx0XHRcdFRIRU1FLnBhZ2UuaGVpZ2h0PXdpbmRvdy5pbm5lckhlaWdodFxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRzaXplKClcclxuXHRcdHN1cHBvcnRUYXAoKVxyXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgc2l6ZSlcclxuXHJcblx0XHRyZXR1cm4gcmVuZGVyKGFwcCxjb250YWluZXIpXHJcblx0fSksXHJcblxyXG5cdGRlZmF1bHRQcm9wcyh7XHJcblx0XHRzZXJ2aWNlOlwiaHR0cDovL3FpbGkyLmNvbS8xL2dyYXBocWxcIixcclxuXHRcdHRoZW1lOlRIRU1FXHJcblx0fSksXHJcblxyXG5cdGJyYW5jaCgoe2FwcElkfSk9PiFhcHBJZCxyZW5kZXJDb21wb25lbnQoKHt0aGVtZX0pPT5cclxuXHRcdDxVSSBtdWlUaGVtZT17dGhlbWV9PlxyXG5cdFx0XHQ8RW1wdHkgaWNvbj17bnVsbH0+XHJcblx0XHRcdFx0PG9sICBzdHlsZT17e3RleHRBbGlnbjpcImxlZnRcIn19PlxyXG5cdFx0XHRcdFx0PGxpPuWcqGFwcC5xaWxpLmNvbeS4iuWIm+W7uuS4gOS4quW6lOeUqO+8jOiOt+WPlkFwcElkPC9saT5cclxuXHRcdFx0XHRcdDxsaT7liJvlu7rkuIDkuKpSZWFjdCBDb21wb25lbnRcclxuXHRcdFx0XHRcdFx0PHByZT5cclxuXHRcdFx0XHRcdFx0e2BcclxuXHRcdGltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxyXG5cdFx0aW1wb3J0IFFpbGlBcHAgZnJvbSBcInFpbGktYXBwXCJcclxuXHRcdGNvbnN0IE15QXBwPSgpPT4oXHJcblx0XHRcdDxRaWxpQXBwIGFwcElkPVwieHh4eFwiPlxyXG5cdFx0XHRcdGhlbGxvIHFpbGkhXHJcblx0XHRcdDwvUWlsaUFwcD5cclxuXHRcdClcclxuXHRcdFFpbGlBcHAucmVuZGVyKDxNeUFwcC8+KVxyXG5cdFx0XHRcdFx0XHRgfVxyXG5cdFx0XHRcdFx0XHQ8L3ByZT5cclxuXHRcdFx0XHRcdDwvbGk+XHJcblx0XHRcdFx0XHQ8bGk+SGF2ZSBmdW48L2xpPlxyXG5cdFx0XHRcdDwvb2w+XHJcblx0XHRcdDwvRW1wdHk+XHJcblx0XHQ8L1VJPlxyXG5cdCkpLFxyXG5cclxuXHR3aXRoUHJvcHMoKHtzdG9yZSxyZWR1Y2VycyxhcHBJZCxwcm9qZWN0LGlzRGV2fSk9PntcclxuXHRcdEZpbGUucm9vdD1hcHBJZFxyXG5cdFx0aWYoIXN0b3JlKXtcclxuXHRcdFx0Y29uc3QgY29tcG9zZUVuaGFuY2VycyA9IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgd2luZG93Ll9fUkVEVVhfREVWVE9PTFNfRVhURU5TSU9OX0NPTVBPU0VfXyB8fCBjb21wb3NlO1xyXG5cdFx0XHRzdG9yZT1jcmVhdGVTdG9yZShcclxuXHRcdFx0XHRjb21iaW5lUmVkdWNlcnMoe1tET01BSU5dOlJFRFVDRVIsLi4ucmVkdWNlcnN9KSxcclxuXHRcdFx0XHRjb21wb3NlRW5oYW5jZXJzKGFwcGx5TWlkZGxld2FyZSh0aHVuayksYXV0b1JlaHlkcmF0ZSgpKVxyXG5cdFx0XHQpXHJcblxyXG5cdFx0XHRwZXJzaXN0U3RvcmUoc3RvcmUse2tleVByZWZpeDpgJHthcHBJZH06YH0sICgpPT57XHJcblx0XHRcdFx0c3RvcmUuZGlzcGF0Y2goQUNUSU9OLk9OTElORSgpKVxyXG5cdFx0XHRcdHN0b3JlLmRpc3BhdGNoKEFDVElPTi5SRUFEWSlcclxuXHRcdFx0fSlcclxuXHJcblx0XHRcdGNvbnN0IGRpc3BhdGNoPXN0b3JlLmRpc3BhdGNoLmJpbmQoc3RvcmUpXHJcblxyXG5cdFx0XHRjb25zdCBwcm9wcz17XHJcblx0XHRcdFx0c3RvcmUsXHJcblx0XHRcdFx0Y2hlY2tWZXJzaW9uKCl7XHJcblx0XHRcdFx0XHRwcm9qZWN0ICYmIGRpc3BhdGNoKEFDVElPTi5DSEVDS19WRVJTSU9OKHByb2plY3QuaG9tZXBhZ2UsIHByb2plY3QudmVyc2lvbikpXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR0dXRvcmlhbGl6ZSgpe1xyXG5cdFx0XHRcdFx0ZGlzcGF0Y2goQUNUSU9OLlRVVE9SSUFMSVpFRClcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHNldFVzZXIodXNlcil7XHJcblx0XHRcdFx0XHRkaXNwYXRjaChBQ1RJT04uQ1VSUkVOVF9VU0VSKHVzZXIpKVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0bG9hZGluZyhhKXtcclxuXHRcdFx0XHRcdC8vZGlzcGF0Y2goQUNUSU9OLkxPQURJTkcoYSkpXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRzaG93TWVzc2FnZShtKXtcclxuXHRcdFx0XHRcdGRpc3BhdGNoKEFDVElPTi5NRVNTQUdFKG0pKVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0ZG9uZUFEKCl7XHJcblx0XHRcdFx0XHRkaXNwYXRjaChBQ1RJT04uQURfRE9ORSlcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdG9wdGljcyhyZXBvcnQpe1xyXG5cdFx0XHRcdFx0aWYoaXNEZXYpXHJcblx0XHRcdFx0XHRcdGRpc3BhdGNoKEFDVElPTi5SRVBPUlQocmVwb3J0KSlcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdG5ldHdvcmsoc3RhdHVzKXtcclxuXHRcdFx0XHRcdHN3aXRjaChzdGF0dXMpe1xyXG5cdFx0XHRcdFx0XHRjYXNlICBcIm9ubGluZVwiOlxyXG5cdFx0XHRcdFx0XHRcdGRpc3BhdGNoKEFDVElPTi5PTkxJTkUoKSlcclxuXHRcdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRcdFx0Y2FzZSAgXCJvZmZsaW5lXCI6XHJcblx0XHRcdFx0XHRcdFx0ZGlzcGF0Y2goQUNUSU9OLk9GRkxJTkUoKSlcclxuXHRcdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gc3RvcmUuZ2V0U3RhdGUoKS5xaWxpLm5ldHdvcmtTdGF0dXNcclxuXHRcdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvbmxpbmUnLCAgKCk9PnByb3BzLm5ldHdvcmsoXCJvbmxpbmVcIikpXHJcblx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvZmZsaW5lJywgKCk9PnByb3BzLm5ldHdvcmsoXCJvZmZsaW5lXCIpKVxyXG5cdFx0XHRcclxuXHRcdFx0cmV0dXJuIHByb3BzXHJcblx0XHR9XHJcblx0fSksXHJcblx0d2l0aENvbnRleHQoe1xyXG5cdFx0XHRpczogUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdFx0cHJvamVjdDogUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdFx0bG9hZGluZzogUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHRcdHNob3dNZXNzYWdlOiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdFx0dGhlbWU6IFByb3BUeXBlcy5vYmplY3QsXHJcblx0XHRcdG9wdGljczogUHJvcFR5cGVzLmZ1bmMsXHJcblx0XHR9LFxyXG5cdFx0KHtwcm9qZWN0LGxvYWRpbmcsc2hvd01lc3NhZ2UsdGhlbWUsb3B0aWNzfSk9Pih7XHJcblx0XHRcdGlzOntcclxuXHRcdFx0XHRhcHA6IHR5cGVvZihjb3Jkb3ZhKSE9PVwidW5kZWZpbmVkXCJcclxuXHRcdFx0fSxcclxuXHRcdFx0cHJvamVjdCxcclxuXHRcdFx0bG9hZGluZyxcclxuXHRcdFx0c2hvd01lc3NhZ2UsXHJcblx0XHRcdHRoZW1lLFxyXG5cdFx0XHRvcHRpY3NcclxuXHRcdH0pXHJcblx0KSxcclxuXHJcblx0Y29ubmVjdCgoe3FpbGk6e2luaXRlZCxBRCx0dXRvcmlhbGl6ZWR9fSk9PntcclxuXHRcdGxldCBwcm9wcz17fVxyXG5cdFx0aWYoaW5pdGVkIT11bmRlZmluZWQpXHJcblx0XHRcdHByb3BzLmluaXRlZD1pbml0ZWRcclxuXHRcdGlmKEFEIT11bmRlZmluZWQpXHJcblx0XHRcdHByb3BzLkFEPUFEXHJcblx0XHRpZih0dXRvcmlhbGl6ZWQhPXVuZGVmaW5lZClcclxuXHRcdFx0cHJvcHMudHV0b3JpYWxpemVkPXR1dG9yaWFsaXplZFxyXG5cdFx0cmV0dXJuIHByb3BzXHJcblx0fSksXHJcblxyXG5cdGJyYW5jaCgoe3R1dG9yaWFsaXplZCx0dXRvcmlhbD1bXX0pPT4hdHV0b3JpYWxpemVkJiZ0dXRvcmlhbC5sZW5ndGgsXHJcblx0XHRyZW5kZXJDb21wb25lbnQoKHt0dXRvcmlhbCx0dXRvcmlhbGl6ZSx0aGVtZSxzdG9yZSwgfSk9PlxyXG5cdFx0XHQ8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cclxuXHRcdFx0XHQ8VUkgbXVpVGhlbWU9e3RoZW1lfT5cclxuXHRcdFx0XHRcdDxUdXRvcmlhbCBzbGlkZXM9e3R1dG9yaWFsfSBvbkVuZD17dHV0b3JpYWxpemV9Lz5cclxuXHRcdFx0XHQgPC9VST5cclxuXHRcdFx0PC9Qcm92aWRlcj5cclxuXHQpKSxcclxuXHJcblx0YnJhbmNoKCh7QUQsIGFkVXJsfSk9PiFBRCAmJiBhZFVybCxyZW5kZXJDb21wb25lbnQoKHtkb25lQUQsIGFkVXJsfSk9PjxTcGxhc2hBRCB1cmw9e2FkVXJsfSBvbkVuZD17ZG9uZUFEfS8+KSksXHJcblxyXG5cdGJyYW5jaCgoe2luaXRlZH0pPT4haW5pdGVkLCByZW5kZXJOb3RoaW5nKSxcclxuXHJcblx0Y29ubmVjdCgoe3FpbGk6e3VzZXJ9fSk9Pih1c2VyIT09dW5kZWZpbmVkID8ge3VzZXJ9IDoge30pKSxcclxuXHJcblx0d2l0aEdyYXBocWxDbGllbnQoKSxcclxuXHJcblx0YnJhbmNoKCh7dXNlcn0pPT4hdXNlcnx8IXVzZXIudG9rZW4scmVuZGVyQ29tcG9uZW50KCh7dGhlbWUsIHN0b3JlLCBzZXRVc2VyfSk9PlxyXG5cdFx0PFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+XHJcblx0XHRcdDxVSSBtdWlUaGVtZT17dGhlbWV9PlxyXG5cdFx0XHRcdDxkaXYgc3R5bGU9e3ttYXJnaW46MTB9fT5cclxuXHRcdFx0XHRcdDxBdXRoZW50aWNhdGlvbiBvblN1Y2Nlc3M9e3NldFVzZXJ9Lz5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8TG9hZGluZy8+XHJcblx0XHRcdFx0PE1lc3NhZ2UvPlxyXG5cdFx0XHQgPC9VST5cclxuXHRcdDwvUHJvdmlkZXI+XHJcblx0KSksXHJcblx0XHJcblx0bWFwUHJvcHMoKHt0aXRsZSx0aGVtZSxjaGVja1ZlcnNpb24sc3RvcmUsY2hpbGRyZW4saXNEZXYsbm90aWZ5T2ZmbGluZSwgc3VwcG9ydE9mZmxpbmV9KT0+KFxyXG5cdFx0e3RpdGxlLHRoZW1lLGNoZWNrVmVyc2lvbixzdG9yZSxjaGlsZHJlbixpc0Rldixub3RpZnlPZmZsaW5lLHN1cHBvcnRPZmZsaW5lfVxyXG5cdCkpLFxyXG5cdHB1cmUsXHJcbikoUWlsaUFwcClcclxuIl0sIm5hbWVzIjpbIkxvZ28iLCJwcm9wcyIsImRyYXdTdHlsZSIsIm90aGVycyIsIk9iamVjdCIsImFzc2lnbiIsInRleHRTdHJva2UiLCJvdGhlckRyYXdTdHlsZSIsIlJlYWN0IiwiQ29tcG9uZW50IiwiaWNvbiIsIkljb25Mb2dvIiwidGV4dCIsImNoaWxkcmVuIiwiV3JhcHBlciIsImhhbmRsZSIsIkNoaWxkcmVuIiwib25seSIsIlB1cmVDb21wb25lbnQiLCJ3aXRoUXVlcnkiLCJmYWN0b3J5IiwiY3JlYXRlRWFnZXJGYWN0b3J5IiwiUXVlcnlSZW5kZXJlciIsIldpdGhRdWVyeSIsImNvbXBvc2UiLCJnZXRDb250ZXh0IiwiY2xpZW50IiwiUHJvcFR5cGVzIiwib2JqZWN0IiwiY29ubmVjdCIsImVudmlyb25tZW50IiwiZGlzcGF0Y2giLCJvcHRpb24iLCJxdWVyeSIsIm9uU3VjY2VzcyIsIm9uRXJyb3IiLCJtb3JlIiwiYXJndW1lbnREZWZpbml0aW9ucyIsImZvckVhY2giLCJkZWYiLCJkZWZhdWx0VmFsdWUiLCJ1bmRlZmluZWQiLCJlcnJvciIsIkljb25FcnJvciIsInRvU3RyaW5nIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwic2V0RGlzcGxheU5hbWUiLCJ3cmFwRGlzcGxheU5hbWUiLCJCYXNlQ29tcG9uZW50Iiwid2l0aEZyYWdtZW50IiwiV2l0aEZyYWdtZW50IiwiaXNQYWdpbmF0aW9uIiwib3B0aW9ucyIsInBhZ2luYXRpb24iLCJhbnkiLCJ2YXJpYWJsZXMiLCJkaXJlY3Rpb24iLCJnZXRWYXJpYWJsZXMiLCJnZXRDb25uZWN0aW9uRnJvbVByb3BzIiwiZ2V0RnJhZ21lbnRWYXJpYWJsZXMiLCJjcmVhdGVQYWdpbmF0aW9uQ29udGFpbmVyIiwiY291bnQiLCJjdXJzb3IiLCJhcmd1bWVudHMiLCJjcmVhdGVGcmFnbWVudENvbnRhaW5lciIsImdxbCIsImtleXMiLCJtZXRhZGF0YSIsImNvbm5lY3Rpb24iLCJsZW5ndGgiLCJ0cmltIiwibyIsInJlZHVjZSIsImsiLCJiYWJlbEhlbHBlcnMudHlwZW9mIiwic3ByZWFkUmVzcG9uc2UiLCJyZXMiLCJzcHJlYWQiLCJ2YWx1ZXMiLCJ2IiwiaXNEYXRlIiwiZGF0ZSIsImdldE1vbnRoIiwid2l0aE11dGF0aW9uIiwiV2l0aE11dGF0aW9uIiwiZnVuYyIsInNob3dNZXNzYWdlIiwibG9hZGluZyIsIm5hbWUiLCJtdXRhdGlvbiIsIm11dGF0ZSIsImRhdGEiLCJwYXRjaDQiLCJwYXRjaERhdGEiLCJzaG91bGRQYXRjaCIsImRlbGV0ZTQiLCJkYXRlRmllbGRzIiwic21hcnQiLCJ1cGRhdGVyIiwiaWQiLCJzdG9yZSIsImVudGl0eSIsImdldCIsInNldFZhbHVlIiwidG9JU09TdHJpbmciLCJvcHRpbWlzdGljVXBkYXRlciIsImRlbGV0ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwic291cmNlIiwiUmVjb3JkU291cmNlIiwiU3RvcmUiLCJoYW5kbGVyUHJvdmlkZXIiLCJlbnZpcm9ubWVudHMiLCJOb1NlcnZpY2UiLCJFcnJvciIsImNyZWF0ZUVudmlyb25tZW50IiwidXNlciIsImFwcElkIiwic3VwcG9ydE9mZmxpbmUiLCJuZXR3b3JrIiwiaXNEZXYiLCJ0b2tlbiIsImtleSIsImhhbmRsZUVycm9ycyIsImVycm9ycyIsInN0YXRlIiwiYSIsIm1lc3NhZ2UiLCJhZGQiLCJzdGFjayIsIlNldCIsIkFycmF5IiwiZnJvbSIsImpvaW4iLCJsZXZlbCIsImZldGNoZXJPbmxpbmUiLCJvcHQiLCJzZXRTb3VyY2UiLCJzZXJ2aWNlIiwicmVwb3J0Iiwib3B0aWNzIiwiZmV0Y2giLCJoZWFkZXJzIiwidGhlbiIsIm9rIiwic3RhdHVzVGV4dCIsImpzb24iLCJleHRlbnNpb25zIiwiZmV0Y2hRdWVyeU9ubGluZSIsIm9wZXJhdGlvbiIsImNhY2hlQ29uZmlnIiwidXBsb2FkYWJsZXMiLCJKU09OIiwic3RyaW5naWZ5IiwiY2F0Y2giLCJmZXRjaFF1ZXJ5T2ZmbGluZSIsImUiLCJ1bnNldFNvdXJjZSIsInJ1blFMIiwiZGlyIiwiZmV0Y2hRdWVyeSIsIkVudmlyb25tZW50IiwiTmV0d29yayIsImNyZWF0ZSIsInJlcSIsInBhcnNlIiwiYm9keSIsInJlc3VsdCIsIndpdGhHcmFwaHFsQ2xpZW50Iiwid2l0aENvbnRleHQiLCJXaXRoR3JhcGhxbENsaWVudCIsImNsaWVudE9wdHMiLCJnZXRTdG9yZSIsImdldFNvdXJjZSIsImdldEFsbCIsInR5cGUiLCJleCIsInRvTG93ZXJDYXNlIiwic3Vic3RyIiwiZ2V0UmVjb3JkSURzIiwiZmlsdGVyIiwic3RhcnRzV2l0aCIsIm1hcCIsInJlY29yZCIsIkNvbm5lY3Rpb25IYW5kbGVyIiwiZ2V0Q29ubmVjdGlvbiIsInR5cGVDb21tZW50cyIsIm5vZGUiLCJzcGxpdCIsIlR5cGVDb21tZW50IiwidG9VcHBlckNhc2UiLCJlZGdlIiwiY3JlYXRlRWRnZSIsImluc2VydEVkZ2VBZnRlciIsImluc2VydEVkZ2VCZWZvcmUiLCJ3aXRoUGFnaW5hdGlvbiIsIldpdGhQYWdpbmF0aW9uIiwid2l0aEluaXQiLCJJbml0IiwiV2l0aEluaXQiLCJEYXRlIiwicHJvdG90eXBlIiwiZCIsImdldFRpbWUiLCJzZXRIb3VycyIsInJlbGF0aXZlIiwiTWF0aCIsImZsb29yIiwidG9EYXRlIiwiZGF5cyIsInRtcGwiLCJ2YWx1ZSIsImdldEZ1bGxZZWFyIiwiZ2V0RGF0ZSIsImdldEhvdXJzIiwiZ2V0TWludXRlcyIsImdldFNlY29uZHMiLCJyZXBsYWNlIiwibWF0Y2giLCJyZVRvZGF5IiwicmVUaGlzWWVhciIsInJlWWVhcnNBZ28iLCJub3ciLCJmb3JtYXQiLCJpc1NhbWVEYXRlIiwic2V0RGF0ZSIsImdldERheSIsIndlZWsxIiwicm91bmQiLCJQZXJmb3JtYW5jZSIsIndpdGhTdGF0ZSIsIm9wZW4iLCJzZXRPcGVuIiwidG90YWwiLCJwYXJzZUludCIsInRocmVzaG9sZCIsImJhY2tncm91bmRDb2xvciIsIndpZHRoIiwiYm9yZGVyIiwiaSIsImF0IiwiYnkiLCJjb2xsZWN0ZWQiLCJwdXNoIiwiYiIsInFpbGkiLCJJTUFHRV9EQVRBX1NDSEVNRV9MRU4iLCJpbnN0YW5jZSIsImlucHV0IiwiX2ltZ1NpemVyIiwibWFpbiIsImhlaWdodCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInN0eWxlIiwicG9zaXRpb24iLCJsZWZ0IiwiYXBwZW5kQ2hpbGQiLCJuZWVkUmVzaXplIiwic2l6ZSIsIm1heCIsIm9uY2hhbmdlIiwiZmlsZSIsImZpbGVzIiwicmVhZGVyIiwiRmlsZVJlYWRlciIsIm9ubG9hZCIsImltZyIsIkltYWdlIiwic3JjIiwidXJsIiwicmVzaXplIiwib25lcnJvciIsIkZ1bmN0aW9uIiwiYmluZCIsInJlYWRBc0RhdGFVUkwiLCJyZWFkQXNUZXh0IiwiY2xpY2siLCJkYXRhVXJsIiwiY3R4Iiwid2giLCJkcmF3SW1hZ2UiLCJ0b0RhdGFVUkwiLCJkYXRhQXNCbG9iIiwicmVzb2x2ZUxvY2FsRmlsZVN5c3RlbVVSTCIsImVudHJ5IiwiQmxvYiIsIlVpbnQ4QXJyYXkiLCJyZWFkQXNBcnJheUJ1ZmZlciIsIm1vZHVsZSIsImV4cG9ydHMiLCJ0b0Jsb2IiLCJibG9iIiwiY29udGVudFR5cGUiLCJzbGljZVNpemUiLCJieXRlQ2hhcmFjdGVycyIsImF0b2IiLCJieXRlQXJyYXlzIiwib2Zmc2V0Iiwic2xpY2UiLCJieXRlTnVtYmVycyIsImNoYXJDb2RlQXQiLCJieXRlQXJyYXkiLCJyb290IiwiZ2V0VG9rZW4iLCJmb3JtRGF0YSIsIkZvcm1EYXRhIiwiYXBwZW5kIiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicmVzcG9uc2VUZXh0IiwiZmlsZV9jcmVhdGUiLCJzZW5kIiwibWFwUHJvcHMiLCJncmFwaHFsIiwiRnVsbFBhZ2UiLCJ0aGVtZSIsInBhZ2UiLCJ6SW5kZXgiLCJiYWNrZ3JvdW5kIiwiZGlhbG9nIiwidG9wIiwiY29udGV4dFR5cGVzIiwiTm9OZXR3b3JrIiwib25DbG9zZSIsInBhZGRpbmciLCJmb250U2l6ZSIsIm1hcmdpbiIsIk5vTmV0d29ya0Jhbm5lciIsImRldGFpbGVkIiwibm9OZXR3b3JrIiwiZGlzcGxheSIsImZsZXhEaXJlY3Rpb24iLCJmbGV4Iiwic2V0U3RhdGUiLCJyZWQxMDAiLCJsaW5lSGVpZ2h0Iiwid2l0aE5vdGlmaWNhdGlvbiIsIkJhc2UiLCJuZXR3b3JrU3RhdHVzIiwiTm90aWZpY2F0aW9uIiwibm90U3VwcG9ydCIsIk9mZmxpbmVVSSIsImJyYW5jaCIsInJlbmRlckNvbXBvbmVudCIsIkVOVEVSIiwiaXNQaG9uZSIsInRlc3QiLCJBdXRoZW50aWNhdGlvbiIsImRvVGljayIsIl90Iiwic2V0SW50ZXJ2YWwiLCJ0aWNrIiwiY2xlYXJJbnRlcnZhbCIsImNvbnRhY3QiLCJzZXRUb2tlbiIsInJlcXVlc3RUb2tlbiIsImVyck5hbWUiLCJleGlzdHMiLCJzdWNjZXNzIiwibG9naW4iLCJzZXRDb250YWN0Iiwic2V0TmFtZSIsImJ0blJlcXVlc3QiLCJidG5Mb2dpbiIsImlucHV0TmFtZSIsIkZsYXRCdXR0b24iLCJyZXF1ZXN0Q29kZSIsIlRleHRGaWVsZCIsInRhcmdldCIsInRhYmxlTGF5b3V0IiwidmFsaWRhdGUiLCJrZXlDb2RlIiwidGV4dEFsaWduIiwiaXNFbWFpbCIsInByb3BUeXBlcyIsImRvbmUiLCJvZmZsaW5lIiwiVHV0b3JpYWwiLCJzbGlkZXMiLCJvbkVuZCIsImxhbmRzY2FwZSIsImNvcmRvdmEiLCJpc1ZhbGlkRWxlbWVudCIsIm1lZGlhIiwiU2xpZGUiLCJ0aXRsZSIsInN1YnRpdGxlIiwiQ291bnREb3duIiwibiIsInRpbWVyIiwibnVtYmVyIiwiaXNSZXF1aXJlZCIsIlNwbGFzaEFEIiwiVEhFTUUiLCJnZXRNdWlUaGVtZSIsIkxpZ2h0QmFzZVRoZW1lIiwid2luZG93IiwiaW5uZXJXaWR0aCIsImlubmVySGVpZ2h0IiwiRE9NQUlOIiwiQUNUSU9OIiwiaG9tZXBhZ2UiLCJjdXJyZW50VmVyc2lvbiIsInBheWxvYWQiLCJ2ZXIiLCJSRURVQ0VSIiwidG9KU09OIiwiaW5pdGVkIiwiQUQiLCJ0dXRvcmlhbGl6ZWQiLCJsYXRlc3RWZXJzaW9uIiwiVUkiLCJtdWlUaGVtZSIsIm92ZXJmbG93WSIsIkxvYWRpbmciLCJNZXNzYWdlIiwiZHVyYXRpb24iLCJjb2xvciIsIk1FU1NBR0UiLCJRaWxpQXBwIiwibm90aWZ5T2ZmbGluZSIsIm9mZmxpbmUuTm90aWZpY2F0aW9uIiwiY2hlY2tWZXJzaW9uIiwicHJvcHNUeXBlcyIsInN0cmluZyIsImJvb2wiLCJzZXRQcm9wVHlwZXMiLCJhcnJheU9mIiwic2V0U3RhdGljIiwiYXBwIiwiY29udGFpbmVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImlubmVySFRNTCIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW5kZXIiLCJkZWZhdWx0UHJvcHMiLCJ3aXRoUHJvcHMiLCJyZWR1Y2VycyIsInByb2plY3QiLCJjb21wb3NlRW5oYW5jZXJzIiwiX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fQ09NUE9TRV9fIiwiY3JlYXRlU3RvcmUiLCJjb21iaW5lUmVkdWNlcnMiLCJhcHBseU1pZGRsZXdhcmUiLCJ0aHVuayIsImF1dG9SZWh5ZHJhdGUiLCJrZXlQcmVmaXgiLCJPTkxJTkUiLCJSRUFEWSIsIkNIRUNLX1ZFUlNJT04iLCJ2ZXJzaW9uIiwiVFVUT1JJQUxJWkVEIiwiQ1VSUkVOVF9VU0VSIiwibSIsIkFEX0RPTkUiLCJSRVBPUlQiLCJPRkZMSU5FIiwiZ2V0U3RhdGUiLCJ0dXRvcmlhbCIsInR1dG9yaWFsaXplIiwiYWRVcmwiLCJkb25lQUQiLCJyZW5kZXJOb3RoaW5nIiwic2V0VXNlciIsInB1cmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7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
