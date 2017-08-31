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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3Bob3RvLmpzIl0sIm5hbWVzIjpbIlBob3RvIiwic3RhdGUiLCJ1cmwiLCJwcm9wcyIsInNyYyIsIndpZHRoIiwiaGVpZ2h0IiwiaWNvblNpemUiLCJzdHlsZSIsImNhbWVyYU9wdGlvbnMiLCJvdmVyd3JpdGFibGUiLCJpY29uUmF0aW8iLCJvblBob3RvIiwiYXV0b1VwbG9hZCIsIm90aGVycyIsIk9iamVjdCIsImFzc2lnbiIsIm9uQ2xpY2siLCJkb1Bob3RvIiwiYmluZCIsInZpZXdXaWR0aCIsIk1hdGgiLCJmbG9vciIsIm1pbiIsInRvcCIsImxlZnQiLCJtYXJnaW4iLCJuYXZpZ2F0b3IiLCJjYW1lcmEiLCJ0YWtlUGhvdG8iLCJzZWxlY3RQaG90byIsIm9uRmFpbCIsInRoZW4iLCJiaW5hcnkiLCJzZXRTdGF0ZSIsInVwbG9hZCIsInRhcmdldFdpZHRoIiwidGFyZ2V0SGVpZ2h0IiwiZ2V0UGljdHVyZSIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsIm9iamVjdCIsImZ1bmMiLCJkZWZhdWx0UHJvcHMiLCJDYW1lcmEiLCJxdWFsaXR5IiwiZGVzdGluYXRpb25UeXBlIiwiRGVzdGluYXRpb25UeXBlIiwiRklMRV9VUkkiLCJzb3VyY2VUeXBlIiwiUGljdHVyZVNvdXJjZVR5cGUiLCJDQU1FUkEiLCJhbGxvd0VkaXQiLCJlbmNvZGluZ1R5cGUiLCJFbmNvZGluZ1R5cGUiLCJKUEVHIiwicG9wb3Zlck9wdGlvbnMiLCJzYXZlVG9QaG90b0FsYnVtIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7d0xBQ2pCQyxLLEdBQU0sRUFBQ0MsS0FBSSxNQUFLQyxLQUFMLENBQVdDLEdBQWhCLEU7Ozs7O2lDQUVFO0FBQUE7O0FBQ0EsZ0JBQUNGLEdBQUQsR0FBTSxLQUFLRCxLQUFYLENBQUNDLEdBQUQ7QUFB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eUJBQWtCRixPQUFPRyxlQUFQLENBQXVCQyxRQUZFO0FBRzNDQyxvQkFBYUwsT0FBT00saUJBQVAsQ0FBeUJDLE1BSEs7QUFJM0NDLG1CQUFZLElBSitCO0FBSzNDQyxzQkFBY1QsT0FBT1UsWUFBUCxDQUFvQkMsSUFMUztBQU0zQ0Msd0JBQWdCLElBTjJCO0FBTzNDQywwQkFBa0I7QUFQeUIsS0FBOUIsR0FRWjtBQWRtQixDO2tCQWhGSHpELEsiLCJmaWxlIjoicGhvdG8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQge0F2YXRhciwgRGlhbG9nfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxyXG5pbXBvcnQgSWNvbkNhbWVyYSBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvaW1hZ2UvcGhvdG8tY2FtZXJhJ1xyXG5pbXBvcnQgZGJGaWxlIGZyb20gJy4uL2RiL2ZpbGUnXHJcbmltcG9ydCB7c2VsZWN0SW1hZ2VGaWxlfSBmcm9tICcuL2ZpbGUtc2VsZWN0b3InXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQaG90byBleHRlbmRzIENvbXBvbmVudHtcclxuICAgIHN0YXRlPXt1cmw6dGhpcy5wcm9wcy5zcmN9XHJcblxyXG4gICAgcmVuZGVyKCl7XHJcbiAgICAgICAgdmFyIHt1cmx9PXRoaXMuc3RhdGUsXHJcbiAgICAgICAgICAgIHt3aWR0aCwgaGVpZ2h0LCBpY29uU2l6ZSwgc3R5bGU9e30sXHJcblx0XHRcdFx0Y2FtZXJhT3B0aW9ucywgb3ZlcndyaXRhYmxlLGljb25SYXRpbyxcclxuXHRcdFx0XHRvblBob3RvLCBhdXRvVXBsb2FkLFxyXG5cdFx0XHRcdC4uLm90aGVyc309dGhpcy5wcm9wcztcclxuICAgICAgICBpZighaWNvblNpemUpe1xyXG4gICAgICAgICAgICBzdHlsZS53aWR0aD13aWR0aFxyXG4gICAgICAgICAgICBzdHlsZS5oZWlnaHQ9aGVpZ2h0XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oc3R5bGUsaWNvblNpemUpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih1cmwpe1xyXG4gICAgICAgICAgICBpZihvdmVyd3JpdGFibGUpXHJcbiAgICAgICAgICAgICAgICBvdGhlcnMub25DbGljaz10aGlzLmRvUGhvdG8uYmluZCh0aGlzKVxyXG4gICAgICAgICAgICByZXR1cm4gKDxBdmF0YXIgIHsuLi5vdGhlcnN9IHNyYz17dXJsfSBzdHlsZT17c3R5bGV9Lz4pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgdmlld1dpZHRoPU1hdGguZmxvb3IoTWF0aC5taW4oc3R5bGUud2lkdGgsIHN0eWxlLmhlaWdodCkqaWNvblJhdGlvKSxcclxuICAgICAgICAgICAgdG9wPU1hdGguZmxvb3IoKHN0eWxlLmhlaWdodC12aWV3V2lkdGgpLzIpLFxyXG4gICAgICAgICAgICBsZWZ0PU1hdGguZmxvb3IoKHN0eWxlLndpZHRoLXZpZXdXaWR0aCkvMik7XHJcbiAgICAgICAgc3R5bGUud2lkdGg9c3R5bGUuaGVpZ2h0PXZpZXdXaWR0aFxyXG4gICAgICAgIHN0eWxlLm1hcmdpbj1gJHt0b3B9cHggJHtsZWZ0fXB4YFxyXG4gICAgICAgIHJldHVybiAoPEljb25DYW1lcmEgey4uLm90aGVyc31cclxuICAgICAgICAgICAgICAgIHN0eWxlPXtzdHlsZX1cclxuICAgICAgICAgICAgICAgIGNvbG9yPVwibGlnaHRncmF5XCJcclxuICAgICAgICAgICAgICAgIGhvdmVyQ29sb3I9XCJsaWdodGJsdWVcIlxyXG4gICAgICAgICAgICAgICAgb25DbGljaz17ZT0+dGhpcy5kb1Bob3RvKCl9Lz4pXHJcbiAgICB9XHJcblxyXG4gICAgZG9QaG90bygpe1xyXG4gICAgICAgIHR5cGVvZihuYXZpZ2F0b3IuY2FtZXJhKSE9J3VuZGVmaW5lZCcgPyB0aGlzLnRha2VQaG90bygpIDogdGhpcy5zZWxlY3RQaG90bygpXHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0UGhvdG8oKXtcclxuICAgICAgICB2YXIge29uUGhvdG8sIG9uRmFpbCwgd2lkdGgsIGhlaWdodCwgYXV0b1VwbG9hZH09dGhpcy5wcm9wc1xyXG4gICAgICAgIHNlbGVjdEltYWdlRmlsZSh3aWR0aCwgaGVpZ2h0KS5cclxuICAgICAgICAgICAgdGhlbigoe3VybCxiaW5hcnl9KT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dXJsfSlcclxuICAgICAgICAgICAgICAgIGlmKGF1dG9VcGxvYWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGRiRmlsZS51cGxvYWQodXJsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbih1cmw9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uUGhvdG8gJiYgb25QaG90byh1cmwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb25QaG90byAmJiBvblBob3RvKHVybClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgb25GYWlsKVxyXG4gICAgfVxyXG5cclxuICAgIHRha2VQaG90bygpe1xyXG4gICAgICAgIHZhciB7b25QaG90bywgb25GYWlsLCB3aWR0aCwgaGVpZ2h0LCBjYW1lcmFPcHRpb25zLCBhdXRvVXBsb2FkfT10aGlzLnByb3BzXHJcbiAgICAgICAgY2FtZXJhT3B0aW9ucy50YXJnZXRXaWR0aD13aWR0aFxyXG4gICAgICAgIGNhbWVyYU9wdGlvbnMudGFyZ2V0SGVpZ2h0PWhlaWdodFxyXG4gICAgICAgIG5hdmlnYXRvci5jYW1lcmEuZ2V0UGljdHVyZSh1cmw9PntcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3VybH0pXHJcbiAgICAgICAgICAgICAgICBpZihhdXRvVXBsb2FkKXtcclxuICAgICAgICAgICAgICAgICAgICBkYkZpbGUudXBsb2FkKHVybClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4odXJsPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblBob3RvICYmIG9uUGhvdG8odXJsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBvblBob3RvICYmIG9uUGhvdG8odXJsKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBvbkZhaWwsIGNhbWVyYU9wdGlvbnMpXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VmFsdWUoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS51cmxcclxuICAgIH1cclxuICAgIHN0YXRpYyBwcm9wVHlwZXM9e1xyXG4gICAgICAgIGNhbWVyYU9wdGlvbnM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXHJcbiAgICAgICAgb25QaG90bzogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICAgICAgb25GYWlsOiBSZWFjdC5Qcm9wVHlwZXMuZnVuY1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xyXG4gICAgICAgIHdpZHRoOjEwMjQsXHJcbiAgICAgICAgaGVpZ2h0OjEwMjQsXHJcbiAgICAgICAgaWNvblJhdGlvOjAuNSxcclxuICAgICAgICBvdmVyd3JpdGFibGU6ZmFsc2UsXHJcbiAgICAgICAgYXV0b1VwbG9hZDp0cnVlLFxyXG5cdFx0Y2FtZXJhT3B0aW9uczogdHlwZW9mKENhbWVyYSkhPSd1bmRlZmluZWQnID8ge1xyXG5cdFx0XHRcdHF1YWxpdHkgOiA3NSxcclxuXHRcdFx0XHRkZXN0aW5hdGlvblR5cGUgOiBDYW1lcmEuRGVzdGluYXRpb25UeXBlLkZJTEVfVVJJLFxyXG5cdFx0XHRcdHNvdXJjZVR5cGUgOiBDYW1lcmEuUGljdHVyZVNvdXJjZVR5cGUuQ0FNRVJBLFxyXG5cdFx0XHRcdGFsbG93RWRpdCA6IHRydWUsXHJcblx0XHRcdFx0ZW5jb2RpbmdUeXBlOiBDYW1lcmEuRW5jb2RpbmdUeXBlLkpQRUcsXHJcblx0XHRcdFx0cG9wb3Zlck9wdGlvbnM6IG51bGwsXHJcblx0XHRcdFx0c2F2ZVRvUGhvdG9BbGJ1bTogZmFsc2VcclxuXHRcdFx0fTp7fVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuIl19