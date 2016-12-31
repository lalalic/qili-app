'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUi = require('material-ui');

var _photoCamera = require('material-ui/svg-icons/image/photo-camera');

var _photoCamera2 = _interopRequireDefault(_photoCamera);

var _file = require('../db/file');

var _file2 = _interopRequireDefault(_file);

var _fileSelector = require('./file-selector');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Photo = function (_Component) {
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
            var _this2 = this;

            var url = this.state.url,
                _props = this.props,
                width = _props.width,
                height = _props.height,
                iconSize = _props.iconSize,
                _props$style = _props.style,
                style = _props$style === undefined ? {} : _props$style,
                cameraOptions = _props.cameraOptions,
                overwritable = _props.overwritable,
                iconRatio = _props.iconRatio,
                onPhoto = _props.onPhoto,
                autoUpload = _props.autoUpload,
                others = _objectWithoutProperties(_props, ['width', 'height', 'iconSize', 'style', 'cameraOptions', 'overwritable', 'iconRatio', 'onPhoto', 'autoUpload']);

            if (!iconSize) {
                style.width = width;
                style.height = height;
            } else {
                Object.assign(style, iconSize);
            }

            if (url) {
                if (overwritable) others.onClick = this.doPhoto.bind(this);
                return _react2.default.createElement(_materialUi.Avatar, _extends({}, others, { src: url, style: style }));
            }

            var viewWidth = Math.floor(Math.min(style.width, style.height) * iconRatio),
                top = Math.floor((style.height - viewWidth) / 2),
                left = Math.floor((style.width - viewWidth) / 2);
            style.width = style.height = viewWidth;
            style.margin = top + 'px ' + left + 'px';
            return _react2.default.createElement(_photoCamera2.default, _extends({}, others, {
                style: style,
                color: 'lightgray',
                hoverColor: 'lightblue',
                onClick: function onClick(e) {
                    return _this2.doPhoto();
                } }));
        }
    }, {
        key: 'doPhoto',
        value: function doPhoto() {
            typeof navigator.camera != 'undefined' ? this.takePhoto() : this.selectPhoto();
        }
    }, {
        key: 'selectPhoto',
        value: function selectPhoto() {
            var _this3 = this;

            var _props2 = this.props,
                onPhoto = _props2.onPhoto,
                onFail = _props2.onFail,
                width = _props2.width,
                height = _props2.height,
                autoUpload = _props2.autoUpload;

            (0, _fileSelector.selectImageFile)(width, height).then(function (_ref2) {
                var url = _ref2.url,
                    binary = _ref2.binary;

                _this3.setState({ url: url });
                if (autoUpload) {
                    _file2.default.upload(url).then(function (url) {
                        onPhoto && onPhoto(url);
                    });
                } else {
                    onPhoto && onPhoto(url);
                }
            }, onFail);
        }
    }, {
        key: 'takePhoto',
        value: function takePhoto() {
            var _this4 = this;

            var _props3 = this.props,
                onPhoto = _props3.onPhoto,
                onFail = _props3.onFail,
                width = _props3.width,
                height = _props3.height,
                cameraOptions = _props3.cameraOptions,
                autoUpload = _props3.autoUpload;

            cameraOptions.targetWidth = width;
            cameraOptions.targetHeight = height;
            navigator.camera.getPicture(function (url) {
                _this4.setState({ url: url });
                if (autoUpload) {
                    _file2.default.upload(url).then(function (url) {
                        onPhoto && onPhoto(url);
                    });
                } else {
                    onPhoto && onPhoto(url);
                }
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
    iconRatio: 0.5,
    overwritable: false,
    autoUpload: true,
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
exports.default = Photo;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3Bob3RvLmpzIl0sIm5hbWVzIjpbIlBob3RvIiwic3RhdGUiLCJ1cmwiLCJwcm9wcyIsInNyYyIsIndpZHRoIiwiaGVpZ2h0IiwiaWNvblNpemUiLCJzdHlsZSIsImNhbWVyYU9wdGlvbnMiLCJvdmVyd3JpdGFibGUiLCJpY29uUmF0aW8iLCJvblBob3RvIiwiYXV0b1VwbG9hZCIsIm90aGVycyIsIk9iamVjdCIsImFzc2lnbiIsIm9uQ2xpY2siLCJkb1Bob3RvIiwiYmluZCIsInZpZXdXaWR0aCIsIk1hdGgiLCJmbG9vciIsIm1pbiIsInRvcCIsImxlZnQiLCJtYXJnaW4iLCJuYXZpZ2F0b3IiLCJjYW1lcmEiLCJ0YWtlUGhvdG8iLCJzZWxlY3RQaG90byIsIm9uRmFpbCIsInRoZW4iLCJiaW5hcnkiLCJzZXRTdGF0ZSIsInVwbG9hZCIsInRhcmdldFdpZHRoIiwidGFyZ2V0SGVpZ2h0IiwiZ2V0UGljdHVyZSIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsIm9iamVjdCIsImZ1bmMiLCJkZWZhdWx0UHJvcHMiLCJDYW1lcmEiLCJxdWFsaXR5IiwiZGVzdGluYXRpb25UeXBlIiwiRGVzdGluYXRpb25UeXBlIiwiRklMRV9VUkkiLCJzb3VyY2VUeXBlIiwiUGljdHVyZVNvdXJjZVR5cGUiLCJDQU1FUkEiLCJhbGxvd0VkaXQiLCJlbmNvZGluZ1R5cGUiLCJFbmNvZGluZ1R5cGUiLCJKUEVHIiwicG9wb3Zlck9wdGlvbnMiLCJzYXZlVG9QaG90b0FsYnVtIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7d0xBQ2pCQyxLLEdBQU0sRUFBQ0MsS0FBSSxNQUFLQyxLQUFMLENBQVdDLEdBQWhCLEU7Ozs7O2lDQUVFO0FBQUE7O0FBQ0EsZ0JBQUNGLEdBQUQsR0FBTSxLQUFLRCxLQUFYLENBQUNDLEdBQUQ7QUFB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eUJBQWtCRixPQUFPRyxlQUFQLENBQXVCQyxRQUZFO0FBRzNDQyxvQkFBYUwsT0FBT00saUJBQVAsQ0FBeUJDLE1BSEs7QUFJM0NDLG1CQUFZLElBSitCO0FBSzNDQyxzQkFBY1QsT0FBT1UsWUFBUCxDQUFvQkMsSUFMUztBQU0zQ0Msd0JBQWdCLElBTjJCO0FBTzNDQywwQkFBa0I7QUFQeUIsS0FBOUIsR0FRWjtBQWRtQixDO2tCQWhGSHpELEsiLCJmaWxlIjoicGhvdG8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtBdmF0YXIsIERpYWxvZ30gZnJvbSBcIm1hdGVyaWFsLXVpXCJcbmltcG9ydCBJY29uQ2FtZXJhIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9pbWFnZS9waG90by1jYW1lcmEnXG5pbXBvcnQgZGJGaWxlIGZyb20gJy4uL2RiL2ZpbGUnXG5pbXBvcnQge3NlbGVjdEltYWdlRmlsZX0gZnJvbSAnLi9maWxlLXNlbGVjdG9yJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQaG90byBleHRlbmRzIENvbXBvbmVudHtcbiAgICBzdGF0ZT17dXJsOnRoaXMucHJvcHMuc3JjfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciB7dXJsfT10aGlzLnN0YXRlLFxuICAgICAgICAgICAge3dpZHRoLCBoZWlnaHQsIGljb25TaXplLCBzdHlsZT17fSxcblx0XHRcdFx0Y2FtZXJhT3B0aW9ucywgb3ZlcndyaXRhYmxlLGljb25SYXRpbyxcblx0XHRcdFx0b25QaG90bywgYXV0b1VwbG9hZCxcblx0XHRcdFx0Li4ub3RoZXJzfT10aGlzLnByb3BzO1xuICAgICAgICBpZighaWNvblNpemUpe1xuICAgICAgICAgICAgc3R5bGUud2lkdGg9d2lkdGhcbiAgICAgICAgICAgIHN0eWxlLmhlaWdodD1oZWlnaHRcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHN0eWxlLGljb25TaXplKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYodXJsKXtcbiAgICAgICAgICAgIGlmKG92ZXJ3cml0YWJsZSlcbiAgICAgICAgICAgICAgICBvdGhlcnMub25DbGljaz10aGlzLmRvUGhvdG8uYmluZCh0aGlzKVxuICAgICAgICAgICAgcmV0dXJuICg8QXZhdGFyICB7Li4ub3RoZXJzfSBzcmM9e3VybH0gc3R5bGU9e3N0eWxlfS8+KVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHZpZXdXaWR0aD1NYXRoLmZsb29yKE1hdGgubWluKHN0eWxlLndpZHRoLCBzdHlsZS5oZWlnaHQpKmljb25SYXRpbyksXG4gICAgICAgICAgICB0b3A9TWF0aC5mbG9vcigoc3R5bGUuaGVpZ2h0LXZpZXdXaWR0aCkvMiksXG4gICAgICAgICAgICBsZWZ0PU1hdGguZmxvb3IoKHN0eWxlLndpZHRoLXZpZXdXaWR0aCkvMik7XG4gICAgICAgIHN0eWxlLndpZHRoPXN0eWxlLmhlaWdodD12aWV3V2lkdGhcbiAgICAgICAgc3R5bGUubWFyZ2luPWAke3RvcH1weCAke2xlZnR9cHhgXG4gICAgICAgIHJldHVybiAoPEljb25DYW1lcmEgey4uLm90aGVyc31cbiAgICAgICAgICAgICAgICBzdHlsZT17c3R5bGV9XG4gICAgICAgICAgICAgICAgY29sb3I9XCJsaWdodGdyYXlcIlxuICAgICAgICAgICAgICAgIGhvdmVyQ29sb3I9XCJsaWdodGJsdWVcIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2U9PnRoaXMuZG9QaG90bygpfS8+KVxuICAgIH1cblxuICAgIGRvUGhvdG8oKXtcbiAgICAgICAgdHlwZW9mKG5hdmlnYXRvci5jYW1lcmEpIT0ndW5kZWZpbmVkJyA/IHRoaXMudGFrZVBob3RvKCkgOiB0aGlzLnNlbGVjdFBob3RvKClcbiAgICB9XG5cbiAgICBzZWxlY3RQaG90bygpe1xuICAgICAgICB2YXIge29uUGhvdG8sIG9uRmFpbCwgd2lkdGgsIGhlaWdodCwgYXV0b1VwbG9hZH09dGhpcy5wcm9wc1xuICAgICAgICBzZWxlY3RJbWFnZUZpbGUod2lkdGgsIGhlaWdodCkuXG4gICAgICAgICAgICB0aGVuKCh7dXJsLGJpbmFyeX0pPT57XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dXJsfSlcbiAgICAgICAgICAgICAgICBpZihhdXRvVXBsb2FkKXtcbiAgICAgICAgICAgICAgICAgICAgZGJGaWxlLnVwbG9hZCh1cmwpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbih1cmw9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblBob3RvICYmIG9uUGhvdG8odXJsKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG9uUGhvdG8gJiYgb25QaG90byh1cmwpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgb25GYWlsKVxuICAgIH1cblxuICAgIHRha2VQaG90bygpe1xuICAgICAgICB2YXIge29uUGhvdG8sIG9uRmFpbCwgd2lkdGgsIGhlaWdodCwgY2FtZXJhT3B0aW9ucywgYXV0b1VwbG9hZH09dGhpcy5wcm9wc1xuICAgICAgICBjYW1lcmFPcHRpb25zLnRhcmdldFdpZHRoPXdpZHRoXG4gICAgICAgIGNhbWVyYU9wdGlvbnMudGFyZ2V0SGVpZ2h0PWhlaWdodFxuICAgICAgICBuYXZpZ2F0b3IuY2FtZXJhLmdldFBpY3R1cmUodXJsPT57XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dXJsfSlcbiAgICAgICAgICAgICAgICBpZihhdXRvVXBsb2FkKXtcbiAgICAgICAgICAgICAgICAgICAgZGJGaWxlLnVwbG9hZCh1cmwpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbih1cmw9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblBob3RvICYmIG9uUGhvdG8odXJsKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvblBob3RvICYmIG9uUGhvdG8odXJsKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIG9uRmFpbCwgY2FtZXJhT3B0aW9ucylcbiAgICB9XG5cbiAgICBnZXRWYWx1ZSgpe1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS51cmxcbiAgICB9XG4gICAgc3RhdGljIHByb3BUeXBlcz17XG4gICAgICAgIGNhbWVyYU9wdGlvbnM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIG9uUGhvdG86IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvbkZhaWw6IFJlYWN0LlByb3BUeXBlcy5mdW5jXG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcz17XG4gICAgICAgIHdpZHRoOjEwMjQsXG4gICAgICAgIGhlaWdodDoxMDI0LFxuICAgICAgICBpY29uUmF0aW86MC41LFxuICAgICAgICBvdmVyd3JpdGFibGU6ZmFsc2UsXG4gICAgICAgIGF1dG9VcGxvYWQ6dHJ1ZSxcblx0XHRjYW1lcmFPcHRpb25zOiB0eXBlb2YoQ2FtZXJhKSE9J3VuZGVmaW5lZCcgPyB7XG5cdFx0XHRcdHF1YWxpdHkgOiA3NSxcblx0XHRcdFx0ZGVzdGluYXRpb25UeXBlIDogQ2FtZXJhLkRlc3RpbmF0aW9uVHlwZS5GSUxFX1VSSSxcblx0XHRcdFx0c291cmNlVHlwZSA6IENhbWVyYS5QaWN0dXJlU291cmNlVHlwZS5DQU1FUkEsXG5cdFx0XHRcdGFsbG93RWRpdCA6IHRydWUsXG5cdFx0XHRcdGVuY29kaW5nVHlwZTogQ2FtZXJhLkVuY29kaW5nVHlwZS5KUEVHLFxuXHRcdFx0XHRwb3BvdmVyT3B0aW9uczogbnVsbCxcblx0XHRcdFx0c2F2ZVRvUGhvdG9BbGJ1bTogZmFsc2Vcblx0XHRcdH06e31cbiAgICB9XG5cbn1cblxuIl19