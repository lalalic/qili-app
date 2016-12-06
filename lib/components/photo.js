'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUi = require('material-ui');

var _photoCamera = require('material-ui/svg-icons/image/photo-camera');

var _photoCamera2 = _interopRequireDefault(_photoCamera);

var _file = require('../db/file');

var _file2 = _interopRequireDefault(_file);

var _fileSelector = require('./file-selector');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Photo = function (_Component) {
    (0, _inherits3.default)(Photo, _Component);

    function Photo() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Photo);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Photo.__proto__ || (0, _getPrototypeOf2.default)(Photo)).call.apply(_ref, [this].concat(args))), _this), _this.state = { url: _this.props.src }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Photo, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var url = this.state.url;
            var _props = this.props;
            var width = _props.width;
            var height = _props.height;
            var iconSize = _props.iconSize;
            var _props$style = _props.style;
            var style = _props$style === undefined ? {} : _props$style;
            var cameraOptions = _props.cameraOptions;
            var overwritable = _props.overwritable;
            var iconRatio = _props.iconRatio;
            var onPhoto = _props.onPhoto;
            var autoUpload = _props.autoUpload;
            var others = (0, _objectWithoutProperties3.default)(_props, ['width', 'height', 'iconSize', 'style', 'cameraOptions', 'overwritable', 'iconRatio', 'onPhoto', 'autoUpload']);

            if (!iconSize) {
                style.width = width;
                style.height = height;
            } else {
                (0, _assign2.default)(style, iconSize);
            }

            if (url) {
                if (overwritable) others.onClick = this.takePhoto.bind(this);
                return _react2.default.createElement(_materialUi.Avatar, (0, _extends3.default)({}, others, { src: url, style: style }));
            }

            var viewWidth = Math.floor(Math.min(style.width, style.height) * iconRatio),
                top = Math.floor((style.height - viewWidth) / 2),
                left = Math.floor((style.width - viewWidth) / 2);
            style.width = style.height = viewWidth;
            style.margin = top + 'px ' + left + 'px';
            return _react2.default.createElement(_photoCamera2.default, (0, _extends3.default)({}, others, {
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

            var _props2 = this.props;
            var onPhoto = _props2.onPhoto;
            var onFail = _props2.onFail;
            var width = _props2.width;
            var height = _props2.height;
            var autoUpload = _props2.autoUpload;

            (0, _fileSelector.selectImageFile)(width, height).then(function (_ref2) {
                var url = _ref2.url;
                var binary = _ref2.binary;

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

            var _props3 = this.props;
            var onPhoto = _props3.onPhoto;
            var onFail = _props3.onFail;
            var width = _props3.width;
            var height = _props3.height;
            var cameraOptions = _props3.cameraOptions;
            var autoUpload = _props3.autoUpload;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3Bob3RvLmpzIl0sIm5hbWVzIjpbIlBob3RvIiwic3RhdGUiLCJ1cmwiLCJwcm9wcyIsInNyYyIsIndpZHRoIiwiaGVpZ2h0IiwiaWNvblNpemUiLCJzdHlsZSIsImNhbWVyYU9wdGlvbnMiLCJvdmVyd3JpdGFibGUiLCJpY29uUmF0aW8iLCJvblBob3RvIiwiYXV0b1VwbG9hZCIsIm90aGVycyIsIm9uQ2xpY2siLCJ0YWtlUGhvdG8iLCJiaW5kIiwidmlld1dpZHRoIiwiTWF0aCIsImZsb29yIiwibWluIiwidG9wIiwibGVmdCIsIm1hcmdpbiIsImRvUGhvdG8iLCJuYXZpZ2F0b3IiLCJjYW1lcmEiLCJzZWxlY3RQaG90byIsIm9uRmFpbCIsInRoZW4iLCJiaW5hcnkiLCJzZXRTdGF0ZSIsInVwbG9hZCIsInRhcmdldFdpZHRoIiwidGFyZ2V0SGVpZ2h0IiwiZ2V0UGljdHVyZSIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsIm9iamVjdCIsImZ1bmMiLCJkZWZhdWx0UHJvcHMiLCJDYW1lcmEiLCJxdWFsaXR5IiwiZGVzdGluYXRpb25UeXBlIiwiRGVzdGluYXRpb25UeXBlIiwiRklMRV9VUkkiLCJzb3VyY2VUeXBlIiwiUGljdHVyZVNvdXJjZVR5cGUiLCJDQU1FUkEiLCJhbGxvd0VkaXQiLCJlbmNvZGluZ1R5cGUiLCJFbmNvZGluZ1R5cGUiLCJKUEVHIiwicG9wb3Zlck9wdGlvbnMiLCJzYXZlVG9QaG90b0FsYnVtIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7Ozs4TUFDakJDLEssR0FBTSxFQUFDQyxLQUFJLE1BQUtDLEtBQUwsQ0FBV0MsR0FBaEIsRTs7Ozs7aUNBRUU7QUFBQTs7QUFDQSxnQkFBQ0YsR0FBRCxHQUFNLEtBQUtELEtBQVgsQ0FBQ0MsR0FBRDtB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aUM7QUFDekJrQyxhQUFVLEVBRGU7QUFFekJDLHFCQUFrQkYsT0FBT0csZUFBUCxDQUF1QkMsUUFGaEI7QUFHekJDLGdCQUFhTCxPQUFPTSxpQkFBUCxDQUF5QkMsTUFIYjtBQUl6QkMsZUFBWSxLQUphO0FBS3pCQyxrQkFBY1QsT0FBT1UsWUFBUCxDQUFvQkMsSUFMVDtBQU16QkMsb0JBQWdCLElBTlM7QUFPekJDLHNCQUFrQjtBQVBPLENBRGpDIiwiZmlsZSI6InBob3RvLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCdcbmltcG9ydCB7QXZhdGFyfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxuaW1wb3J0IEljb25DYW1lcmEgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ltYWdlL3Bob3RvLWNhbWVyYSdcbmltcG9ydCBkYkZpbGUgZnJvbSAnLi4vZGIvZmlsZSdcbmltcG9ydCB7c2VsZWN0SW1hZ2VGaWxlfSBmcm9tICcuL2ZpbGUtc2VsZWN0b3InXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBob3RvIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHN0YXRlPXt1cmw6dGhpcy5wcm9wcy5zcmN9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIHt1cmx9PXRoaXMuc3RhdGUsXG4gICAgICAgICAgICB7d2lkdGgsIGhlaWdodCwgaWNvblNpemUsIHN0eWxlPXt9LFxuXHRcdFx0XHRjYW1lcmFPcHRpb25zLCBvdmVyd3JpdGFibGUsaWNvblJhdGlvLFxuXHRcdFx0XHRvblBob3RvLCBhdXRvVXBsb2FkLFxuXHRcdFx0XHQuLi5vdGhlcnN9PXRoaXMucHJvcHM7XG4gICAgICAgIGlmKCFpY29uU2l6ZSl7XG4gICAgICAgICAgICBzdHlsZS53aWR0aD13aWR0aFxuICAgICAgICAgICAgc3R5bGUuaGVpZ2h0PWhlaWdodFxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oc3R5bGUsaWNvblNpemUpXG4gICAgICAgIH1cblxuICAgICAgICBpZih1cmwpe1xuICAgICAgICAgICAgaWYob3ZlcndyaXRhYmxlKVxuICAgICAgICAgICAgICAgIG90aGVycy5vbkNsaWNrPXRoaXMudGFrZVBob3RvLmJpbmQodGhpcylcbiAgICAgICAgICAgIHJldHVybiAoPEF2YXRhciAgey4uLm90aGVyc30gc3JjPXt1cmx9IHN0eWxlPXtzdHlsZX0vPilcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB2aWV3V2lkdGg9TWF0aC5mbG9vcihNYXRoLm1pbihzdHlsZS53aWR0aCwgc3R5bGUuaGVpZ2h0KSppY29uUmF0aW8pLFxuICAgICAgICAgICAgdG9wPU1hdGguZmxvb3IoKHN0eWxlLmhlaWdodC12aWV3V2lkdGgpLzIpLFxuICAgICAgICAgICAgbGVmdD1NYXRoLmZsb29yKChzdHlsZS53aWR0aC12aWV3V2lkdGgpLzIpO1xuICAgICAgICBzdHlsZS53aWR0aD1zdHlsZS5oZWlnaHQ9dmlld1dpZHRoXG4gICAgICAgIHN0eWxlLm1hcmdpbj1gJHt0b3B9cHggJHtsZWZ0fXB4YFxuICAgICAgICByZXR1cm4gKDxJY29uQ2FtZXJhIHsuLi5vdGhlcnN9XG4gICAgICAgICAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICAgICAgICAgIGNvbG9yPVwibGlnaHRncmF5XCJcbiAgICAgICAgICAgICAgICBob3ZlckNvbG9yPVwibGlnaHRibHVlXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtlPT50aGlzLmRvUGhvdG8oKX0vPilcbiAgICB9XG5cbiAgICBkb1Bob3RvKCl7XG4gICAgICAgIHR5cGVvZihuYXZpZ2F0b3IuY2FtZXJhKSE9J3VuZGVmaW5lZCcgPyB0aGlzLnRha2VQaG90bygpIDogdGhpcy5zZWxlY3RQaG90bygpXG4gICAgfVxuXG4gICAgc2VsZWN0UGhvdG8oKXtcbiAgICAgICAgdmFyIHtvblBob3RvLCBvbkZhaWwsIHdpZHRoLCBoZWlnaHQsIGF1dG9VcGxvYWR9PXRoaXMucHJvcHNcbiAgICAgICAgc2VsZWN0SW1hZ2VGaWxlKHdpZHRoLCBoZWlnaHQpLlxuICAgICAgICAgICAgdGhlbigoe3VybCxiaW5hcnl9KT0+e1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3VybH0pXG4gICAgICAgICAgICAgICAgaWYoYXV0b1VwbG9hZCl7XG4gICAgICAgICAgICAgICAgICAgIGRiRmlsZS51cGxvYWQoYmluYXJ5KVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4odXJsPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25QaG90byAmJiBvblBob3RvKHVybClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvblBob3RvICYmIG9uUGhvdG8odXJsKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIG9uRmFpbClcbiAgICB9XG5cbiAgICB0YWtlUGhvdG8oKXtcbiAgICAgICAgdmFyIHtvblBob3RvLCBvbkZhaWwsIHdpZHRoLCBoZWlnaHQsIGNhbWVyYU9wdGlvbnMsIGF1dG9VcGxvYWR9PXRoaXMucHJvcHNcbiAgICAgICAgY2FtZXJhT3B0aW9ucy50YXJnZXRXaWR0aD13aWR0aFxuICAgICAgICBjYW1lcmFPcHRpb25zLnRhcmdldEhlaWdodD1oZWlnaHRcbiAgICAgICAgbmF2aWdhdG9yLmNhbWVyYS5nZXRQaWN0dXJlKHVybD0+e1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3VybH0pXG4gICAgICAgICAgICAgICAgaWYoYXV0b1VwbG9hZCl7XG4gICAgICAgICAgICAgICAgICAgIGRiRmlsZS51cGxvYWQodXJsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4odXJsPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25QaG90byAmJiBvblBob3RvKHVybClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb25QaG90byAmJiBvblBob3RvKHVybClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBvbkZhaWwsIGNhbWVyYU9wdGlvbnMpXG4gICAgfVxuXG4gICAgZ2V0VmFsdWUoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUudXJsXG4gICAgfVxuICAgIHN0YXRpYyBwcm9wVHlwZXM9e1xuICAgICAgICBjYW1lcmFPcHRpb25zOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBvblBob3RvOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25GYWlsOiBSZWFjdC5Qcm9wVHlwZXMuZnVuY1xuICAgIH1cblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xuICAgICAgICB3aWR0aDoxMDI0LFxuICAgICAgICBoZWlnaHQ6MTAyNCxcbiAgICAgICAgaWNvblJhdGlvOjAuNSxcbiAgICAgICAgb3ZlcndyaXRhYmxlOmZhbHNlLFxuICAgICAgICBhdXRvVXBsb2FkOnRydWVcbiAgICB9XG5cbn1cblxudHlwZW9mKENhbWVyYSkhPSd1bmRlZmluZWQnICYmIChcblBob3RvLmRlZmF1bHRQcm9wcy5jYW1lcmFPcHRpb25zPXtcbiAgICAgICAgcXVhbGl0eSA6IDc1LFxuICAgICAgICBkZXN0aW5hdGlvblR5cGUgOiBDYW1lcmEuRGVzdGluYXRpb25UeXBlLkZJTEVfVVJJLFxuICAgICAgICBzb3VyY2VUeXBlIDogQ2FtZXJhLlBpY3R1cmVTb3VyY2VUeXBlLkNBTUVSQSxcbiAgICAgICAgYWxsb3dFZGl0IDogZmFsc2UsXG4gICAgICAgIGVuY29kaW5nVHlwZTogQ2FtZXJhLkVuY29kaW5nVHlwZS5KUEVHLFxuICAgICAgICBwb3BvdmVyT3B0aW9uczogbnVsbCxcbiAgICAgICAgc2F2ZVRvUGhvdG9BbGJ1bTogZmFsc2VcbiAgICB9KTtcbiJdfQ==