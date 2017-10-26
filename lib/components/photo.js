'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Photo = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUi = require('material-ui');

var _photoCamera = require('material-ui/svg-icons/image/photo-camera');

var _photoCamera2 = _interopRequireDefault(_photoCamera);

var _file = require('./file');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Photo = exports.Photo = function (_Component) {
    _inherits(Photo, _Component);

    function Photo() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Photo);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Photo.__proto__ || Object.getPrototypeOf(Photo)).call.apply(_ref, [this].concat(args))), _this), _this.state = { url: _this.props.src }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Photo, [{
        key: 'render',
        value: function render() {
            var url = this.state.url;

            var _props = this.props,
                _props$size = _props.size,
                size = _props$size === undefined ? 24 : _props$size,
                cameraOptions = _props.cameraOptions,
                overwritable = _props.overwritable,
                onPhoto = _props.onPhoto,
                autoUpload = _props.autoUpload,
                getToken = _props.getToken,
                src = _props.src,
                others = _objectWithoutProperties(_props, ['size', 'cameraOptions', 'overwritable', 'onPhoto', 'autoUpload', 'getToken', 'src']);

            others.onClick = this.selectOrTakePhoto.bind(this);
            others.style = _extends({}, others.style, { width: size, height: size });

            if (url) {
                return _react2.default.createElement(
                    _materialUi.SvgIcon,
                    _extends({}, others, { viewBox: '0 0 ' + size + ' ' + size }),
                    _react2.default.createElement('image', { xlinkHref: url, height: size, width: size })
                );
            }

            return _react2.default.createElement(_photoCamera2.default, _extends({}, others, { color: 'lightgray', hoverColor: 'lightblue' }));
        }
    }, {
        key: 'selectOrTakePhoto',
        value: function selectOrTakePhoto(e) {
            e.stopPropagation();
            if (typeof navigator.camera != 'undefined') {
                this.takePhoto();
            } else {
                this.selectPhoto();
            }
            return false;
        }
    }, {
        key: 'handlePhoto',
        value: function handlePhoto(url) {
            var _props2 = this.props,
                onPhoto = _props2.onPhoto,
                autoUpload = _props2.autoUpload,
                getToken = _props2.getToken;

            this.setState({ url: url });
            if (autoUpload) {
                (0, _file.upload)(url, autoUpload, getToken).then(function (url) {
                    return onPhoto && onPhoto(url);
                });
            } else {
                onPhoto && onPhoto(url);
            }
        }
    }, {
        key: 'selectPhoto',
        value: function selectPhoto() {
            var _this2 = this;

            var _props3 = this.props,
                onFail = _props3.onFail,
                width = _props3.width,
                height = _props3.height;

            (0, _file.selectImageFile)(width, height).then(function (_ref2) {
                var url = _ref2.url,
                    binary = _ref2.binary;
                return _this2.handlePhoto(url);
            }, onFail);
        }
    }, {
        key: 'takePhoto',
        value: function takePhoto() {
            var _this3 = this;

            var _props4 = this.props,
                onFail = _props4.onFail,
                width = _props4.width,
                height = _props4.height,
                cameraOptions = _props4.cameraOptions;

            cameraOptions.targetWidth = width;
            cameraOptions.targetHeight = height;
            navigator.camera.getPicture(function (url) {
                return _this3.handlePhoto(url);
            }, onFail, cameraOptions);
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            return this.state.url;
        }
    }]);

    return Photo;
}(_react.Component);

Photo.propTypes = {
    cameraOptions: _react2.default.PropTypes.object,
    onPhoto: _react2.default.PropTypes.func,
    onFail: _react2.default.PropTypes.func
};
Photo.defaultProps = {
    width: 1024,
    height: 1024,
    autoUpload: false,
    cameraOptions: typeof Camera != 'undefined' ? {
        quality: 75,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        popoverOptions: null,
        saveToPhotoAlbum: false
    } : {}
};
exports.default = (0, _file.withGetToken)(Photo);