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
                onPhoto = _props.onPhoto,
                autoUpload = _props.autoUpload,
                others = _objectWithoutProperties(_props, ['width', 'height', 'iconSize', 'style', 'cameraOptions', 'overwritable', 'onPhoto', 'autoUpload']);

            if (!iconSize) {
                style.width = width;
                style.height = height;
            } else {
                Object.assign(style, iconSize);
            }

            if (url) {
                if (overwritable) others.onClick = this.takePhoto.bind(this);
                return _react2.default.createElement(_materialUi.Avatar, _extends({ src: url, style: style }, others));
            }

            var iconRatio = others.iconRatio,
                lefts = _objectWithoutProperties(others, ['iconRatio']),
                viewWidth = Math.floor(Math.min(style.width, style.height) * iconRatio),
                top = Math.floor((style.height - viewWidth) / 2),
                left = Math.floor((style.width - viewWidth) / 2);

            style.width = style.height = viewWidth;
            style.margin = top + 'px ' + left + 'px';
            return _react2.default.createElement(_photoCamera2.default, _extends({}, lefts, {
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
                    _file2.default.upload(binary).then(function (url) {
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
    autoUpload: true
};
exports.default = Photo;


typeof Camera != 'undefined' && (Photo.defaultProps.cameraOptions = {
    quality: 75,
    destinationType: Camera.DestinationType.FILE_URI,
    sourceType: Camera.PictureSourceType.CAMERA,
    allowEdit: false,
    encodingType: Camera.EncodingType.JPEG,
    popoverOptions: null,
    saveToPhotoAlbum: false
});
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3Bob3RvLmpzIl0sIm5hbWVzIjpbIlBob3RvIiwic3RhdGUiLCJ1cmwiLCJwcm9wcyIsInNyYyIsIndpZHRoIiwiaGVpZ2h0IiwiaWNvblNpemUiLCJzdHlsZSIsImNhbWVyYU9wdGlvbnMiLCJvdmVyd3JpdGFibGUiLCJvblBob3RvIiwiYXV0b1VwbG9hZCIsIm90aGVycyIsIk9iamVjdCIsImFzc2lnbiIsIm9uQ2xpY2siLCJ0YWtlUGhvdG8iLCJiaW5kIiwiaWNvblJhdGlvIiwibGVmdHMiLCJ2aWV3V2lkdGgiLCJNYXRoIiwiZmxvb3IiLCJtaW4iLCJ0b3AiLCJsZWZ0IiwibWFyZ2luIiwiZG9QaG90byIsIm5hdmlnYXRvciIsImNhbWVyYSIsInNlbGVjdFBob3RvIiwib25GYWlsIiwidGhlbiIsImJpbmFyeSIsInNldFN0YXRlIiwidXBsb2FkIiwidGFyZ2V0V2lkdGgiLCJ0YXJnZXRIZWlnaHQiLCJnZXRQaWN0dXJlIiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwib2JqZWN0IiwiZnVuYyIsImRlZmF1bHRQcm9wcyIsIkNhbWVyYSIsInF1YWxpdHkiLCJkZXN0aW5hdGlvblR5cGUiLCJEZXN0aW5hdGlvblR5cGUiLCJGSUxFX1VSSSIsInNvdXJjZVR5cGUiLCJQaWN0dXJlU291cmNlVHlwZSIsIkNBTUVSQSIsImFsbG93RWRpdCIsImVuY29kaW5nVHlwZSIsIkVuY29kaW5nVHlwZSIsIkpQRUciLCJwb3BvdmVyT3B0aW9ucyIsInNhdmVUb1Bob3RvQWxidW0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7Ozt3TEFDakJDLEssR0FBTSxFQUFDQyxLQUFJLE1BQUtDLEtBQUwsQ0FBV0MsR0FBaEIsRTs7Ozs7aUNBRUU7QUFBQTs7QUFDQSxnQkFBQ0YsR0FBRCxHQUFNLEtBQUtELEtBQVgsQ0FBQ0Ms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Skc7QUFLaEJFLGdCQUFXO0FBTEssQztrQkFqRkhaLEs7OztBQTJGckIsT0FBTzZDLE1BQVAsSUFBZ0IsV0FBaEIsS0FDQTdDLE1BQU00QyxZQUFOLENBQW1CbkMsYUFBbkIsR0FBaUM7QUFDekJxQyxhQUFVLEVBRGU7QUFFekJDLHFCQUFrQkYsT0FBT0csZUFBUCxDQUF1QkMsUUFGaEI7QUFHekJDLGdCQUFhTCxPQUFPTSxpQkFBUCxDQUF5QkMsTUFIYjtBQUl6QkMsZUFBWSxLQUphO0FBS3pCQyxrQkFBY1QsT0FBT1UsWUFBUCxDQUFvQkMsSUFMVDtBQU16QkMsb0JBQWdCLElBTlM7QUFPekJDLHNCQUFrQjtBQVBPLENBRGpDIiwiZmlsZSI6InBob3RvLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCdcbmltcG9ydCB7QXZhdGFyfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxuaW1wb3J0IEljb25DYW1lcmEgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ltYWdlL3Bob3RvLWNhbWVyYSdcbmltcG9ydCBkYkZpbGUgZnJvbSAnLi4vZGIvZmlsZSdcbmltcG9ydCB7c2VsZWN0SW1hZ2VGaWxlfSBmcm9tICcuL2ZpbGUtc2VsZWN0b3InXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBob3RvIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHN0YXRlPXt1cmw6dGhpcy5wcm9wcy5zcmN9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIHt1cmx9PXRoaXMuc3RhdGUsXG4gICAgICAgICAgICB7d2lkdGgsIGhlaWdodCwgaWNvblNpemUsIHN0eWxlPXt9LCBcblx0XHRcdFx0Y2FtZXJhT3B0aW9ucywgb3ZlcndyaXRhYmxlLCBcblx0XHRcdFx0b25QaG90bywgYXV0b1VwbG9hZCxcblx0XHRcdFx0Li4ub3RoZXJzfT10aGlzLnByb3BzO1xuICAgICAgICBpZighaWNvblNpemUpe1xuICAgICAgICAgICAgc3R5bGUud2lkdGg9d2lkdGhcbiAgICAgICAgICAgIHN0eWxlLmhlaWdodD1oZWlnaHRcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHN0eWxlLGljb25TaXplKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYodXJsKXtcbiAgICAgICAgICAgIGlmKG92ZXJ3cml0YWJsZSlcbiAgICAgICAgICAgICAgICBvdGhlcnMub25DbGljaz10aGlzLnRha2VQaG90by5iaW5kKHRoaXMpXG4gICAgICAgICAgICByZXR1cm4gKDxBdmF0YXIgc3JjPXt1cmx9IHN0eWxlPXtzdHlsZX0gey4uLm90aGVyc30vPilcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB7aWNvblJhdGlvLCAuLi5sZWZ0c309b3RoZXJzLFxuICAgICAgICAgICAgdmlld1dpZHRoPU1hdGguZmxvb3IoTWF0aC5taW4oc3R5bGUud2lkdGgsIHN0eWxlLmhlaWdodCkqaWNvblJhdGlvKSxcbiAgICAgICAgICAgIHRvcD1NYXRoLmZsb29yKChzdHlsZS5oZWlnaHQtdmlld1dpZHRoKS8yKSxcbiAgICAgICAgICAgIGxlZnQ9TWF0aC5mbG9vcigoc3R5bGUud2lkdGgtdmlld1dpZHRoKS8yKTtcbiAgICAgICAgc3R5bGUud2lkdGg9c3R5bGUuaGVpZ2h0PXZpZXdXaWR0aFxuICAgICAgICBzdHlsZS5tYXJnaW49YCR7dG9wfXB4ICR7bGVmdH1weGBcbiAgICAgICAgcmV0dXJuICg8SWNvbkNhbWVyYSB7Li4ubGVmdHN9XG4gICAgICAgICAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICAgICAgICAgIGNvbG9yPVwibGlnaHRncmF5XCJcbiAgICAgICAgICAgICAgICBob3ZlckNvbG9yPVwibGlnaHRibHVlXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtlPT50aGlzLmRvUGhvdG8oKX0vPilcbiAgICB9XG5cbiAgICBkb1Bob3RvKCl7XG4gICAgICAgIHR5cGVvZihuYXZpZ2F0b3IuY2FtZXJhKSE9J3VuZGVmaW5lZCcgPyB0aGlzLnRha2VQaG90bygpIDogdGhpcy5zZWxlY3RQaG90bygpXG4gICAgfVxuXG4gICAgc2VsZWN0UGhvdG8oKXtcbiAgICAgICAgdmFyIHtvblBob3RvLCBvbkZhaWwsIHdpZHRoLCBoZWlnaHQsIGF1dG9VcGxvYWR9PXRoaXMucHJvcHNcbiAgICAgICAgc2VsZWN0SW1hZ2VGaWxlKHdpZHRoLCBoZWlnaHQpLlxuICAgICAgICAgICAgdGhlbigoe3VybCxiaW5hcnl9KT0+e1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3VybH0pXG4gICAgICAgICAgICAgICAgaWYoYXV0b1VwbG9hZCl7XG4gICAgICAgICAgICAgICAgICAgIGRiRmlsZS51cGxvYWQoYmluYXJ5KVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4odXJsPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25QaG90byAmJiBvblBob3RvKHVybClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvblBob3RvICYmIG9uUGhvdG8odXJsKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIG9uRmFpbClcbiAgICB9XG5cbiAgICB0YWtlUGhvdG8oKXtcbiAgICAgICAgdmFyIHtvblBob3RvLCBvbkZhaWwsIHdpZHRoLCBoZWlnaHQsIGNhbWVyYU9wdGlvbnMsIGF1dG9VcGxvYWR9PXRoaXMucHJvcHNcbiAgICAgICAgY2FtZXJhT3B0aW9ucy50YXJnZXRXaWR0aD13aWR0aFxuICAgICAgICBjYW1lcmFPcHRpb25zLnRhcmdldEhlaWdodD1oZWlnaHRcbiAgICAgICAgbmF2aWdhdG9yLmNhbWVyYS5nZXRQaWN0dXJlKHVybD0+e1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3VybH0pXG4gICAgICAgICAgICAgICAgaWYoYXV0b1VwbG9hZCl7XG4gICAgICAgICAgICAgICAgICAgIGRiRmlsZS51cGxvYWQodXJsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4odXJsPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25QaG90byAmJiBvblBob3RvKHVybClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb25QaG90byAmJiBvblBob3RvKHVybClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBvbkZhaWwsIGNhbWVyYU9wdGlvbnMpXG4gICAgfVxuXG4gICAgZ2V0VmFsdWUoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUudXJsXG4gICAgfVxuICAgIHN0YXRpYyBwcm9wVHlwZXM9e1xuICAgICAgICBjYW1lcmFPcHRpb25zOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBvblBob3RvOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25GYWlsOiBSZWFjdC5Qcm9wVHlwZXMuZnVuY1xuICAgIH1cblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xuICAgICAgICB3aWR0aDoxMDI0LFxuICAgICAgICBoZWlnaHQ6MTAyNCxcbiAgICAgICAgaWNvblJhdGlvOjAuNSxcbiAgICAgICAgb3ZlcndyaXRhYmxlOmZhbHNlLFxuICAgICAgICBhdXRvVXBsb2FkOnRydWVcbiAgICB9XG5cbn1cblxudHlwZW9mKENhbWVyYSkhPSd1bmRlZmluZWQnICYmIChcblBob3RvLmRlZmF1bHRQcm9wcy5jYW1lcmFPcHRpb25zPXtcbiAgICAgICAgcXVhbGl0eSA6IDc1LFxuICAgICAgICBkZXN0aW5hdGlvblR5cGUgOiBDYW1lcmEuRGVzdGluYXRpb25UeXBlLkZJTEVfVVJJLFxuICAgICAgICBzb3VyY2VUeXBlIDogQ2FtZXJhLlBpY3R1cmVTb3VyY2VUeXBlLkNBTUVSQSxcbiAgICAgICAgYWxsb3dFZGl0IDogZmFsc2UsXG4gICAgICAgIGVuY29kaW5nVHlwZTogQ2FtZXJhLkVuY29kaW5nVHlwZS5KUEVHLFxuICAgICAgICBwb3BvdmVyT3B0aW9uczogbnVsbCxcbiAgICAgICAgc2F2ZVRvUGhvdG9BbGJ1bTogZmFsc2VcbiAgICB9KTtcbiJdfQ==