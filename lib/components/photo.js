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
                if (overwritable) others.onClick = this.doPhoto.bind(this);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3Bob3RvLmpzIl0sIm5hbWVzIjpbIlBob3RvIiwic3RhdGUiLCJ1cmwiLCJwcm9wcyIsInNyYyIsIndpZHRoIiwiaGVpZ2h0IiwiaWNvblNpemUiLCJzdHlsZSIsImNhbWVyYU9wdGlvbnMiLCJvdmVyd3JpdGFibGUiLCJpY29uUmF0aW8iLCJvblBob3RvIiwiYXV0b1VwbG9hZCIsIm90aGVycyIsIm9uQ2xpY2siLCJkb1Bob3RvIiwiYmluZCIsInZpZXdXaWR0aCIsIk1hdGgiLCJmbG9vciIsIm1pbiIsInRvcCIsImxlZnQiLCJtYXJnaW4iLCJuYXZpZ2F0b3IiLCJjYW1lcmEiLCJ0YWtlUGhvdG8iLCJzZWxlY3RQaG90byIsIm9uRmFpbCIsInRoZW4iLCJiaW5hcnkiLCJzZXRTdGF0ZSIsInVwbG9hZCIsInRhcmdldFdpZHRoIiwidGFyZ2V0SGVpZ2h0IiwiZ2V0UGljdHVyZSIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsIm9iamVjdCIsImZ1bmMiLCJkZWZhdWx0UHJvcHMiLCJDYW1lcmEiLCJxdWFsaXR5IiwiZGVzdGluYXRpb25UeXBlIiwiRGVzdGluYXRpb25UeXBlIiwiRklMRV9VUkkiLCJzb3VyY2VUeXBlIiwiUGljdHVyZVNvdXJjZVR5cGUiLCJDQU1FUkEiLCJhbGxvd0VkaXQiLCJlbmNvZGluZ1R5cGUiLCJFbmNvZGluZ1R5cGUiLCJKUEVHIiwicG9wb3Zlck9wdGlvbnMiLCJzYXZlVG9QaG90b0FsYnVtIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7Ozs4TUFDakJDLEssR0FBTSxFQUFDQyxLQUFJLE1BQUtDLEtBQUwsQ0FBV0MsR0FBaEIsRTs7Ozs7aUNBRUU7QUFBQTs7QUFDQSxnQkFBQ0YsR0FBRCxHQUFNLEtBQUtELEtBQVgsQ0FBQ0MsR0FBRDtB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T0csZUFBUCxDQUF1QkMsUUFGRTtBQUczQ0Msb0JBQWFMLE9BQU9NLGlCQUFQLENBQXlCQyxNQUhLO0FBSTNDQyxtQkFBWSxJQUorQjtBQUszQ0Msc0JBQWNULE9BQU9VLFlBQVAsQ0FBb0JDLElBTFM7QUFNM0NDLHdCQUFnQixJQU4yQjtBQU8zQ0MsMEJBQWtCO0FBUHlCLEtBQTlCLEdBUVo7QUFkbUIsQztrQkFoRkh2RCxLIiwiZmlsZSI6InBob3RvLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCdcbmltcG9ydCB7QXZhdGFyLCBEaWFsb2d9IGZyb20gXCJtYXRlcmlhbC11aVwiXG5pbXBvcnQgSWNvbkNhbWVyYSBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvaW1hZ2UvcGhvdG8tY2FtZXJhJ1xuaW1wb3J0IGRiRmlsZSBmcm9tICcuLi9kYi9maWxlJ1xuaW1wb3J0IHtzZWxlY3RJbWFnZUZpbGV9IGZyb20gJy4vZmlsZS1zZWxlY3RvcidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGhvdG8gZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgc3RhdGU9e3VybDp0aGlzLnByb3BzLnNyY31cblxuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIge3VybH09dGhpcy5zdGF0ZSxcbiAgICAgICAgICAgIHt3aWR0aCwgaGVpZ2h0LCBpY29uU2l6ZSwgc3R5bGU9e30sXG5cdFx0XHRcdGNhbWVyYU9wdGlvbnMsIG92ZXJ3cml0YWJsZSxpY29uUmF0aW8sXG5cdFx0XHRcdG9uUGhvdG8sIGF1dG9VcGxvYWQsXG5cdFx0XHRcdC4uLm90aGVyc309dGhpcy5wcm9wcztcbiAgICAgICAgaWYoIWljb25TaXplKXtcbiAgICAgICAgICAgIHN0eWxlLndpZHRoPXdpZHRoXG4gICAgICAgICAgICBzdHlsZS5oZWlnaHQ9aGVpZ2h0XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihzdHlsZSxpY29uU2l6ZSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHVybCl7XG4gICAgICAgICAgICBpZihvdmVyd3JpdGFibGUpXG4gICAgICAgICAgICAgICAgb3RoZXJzLm9uQ2xpY2s9dGhpcy5kb1Bob3RvLmJpbmQodGhpcylcbiAgICAgICAgICAgIHJldHVybiAoPEF2YXRhciAgey4uLm90aGVyc30gc3JjPXt1cmx9IHN0eWxlPXtzdHlsZX0vPilcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB2aWV3V2lkdGg9TWF0aC5mbG9vcihNYXRoLm1pbihzdHlsZS53aWR0aCwgc3R5bGUuaGVpZ2h0KSppY29uUmF0aW8pLFxuICAgICAgICAgICAgdG9wPU1hdGguZmxvb3IoKHN0eWxlLmhlaWdodC12aWV3V2lkdGgpLzIpLFxuICAgICAgICAgICAgbGVmdD1NYXRoLmZsb29yKChzdHlsZS53aWR0aC12aWV3V2lkdGgpLzIpO1xuICAgICAgICBzdHlsZS53aWR0aD1zdHlsZS5oZWlnaHQ9dmlld1dpZHRoXG4gICAgICAgIHN0eWxlLm1hcmdpbj1gJHt0b3B9cHggJHtsZWZ0fXB4YFxuICAgICAgICByZXR1cm4gKDxJY29uQ2FtZXJhIHsuLi5vdGhlcnN9XG4gICAgICAgICAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICAgICAgICAgIGNvbG9yPVwibGlnaHRncmF5XCJcbiAgICAgICAgICAgICAgICBob3ZlckNvbG9yPVwibGlnaHRibHVlXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtlPT50aGlzLmRvUGhvdG8oKX0vPilcbiAgICB9XG5cbiAgICBkb1Bob3RvKCl7XG4gICAgICAgIHR5cGVvZihuYXZpZ2F0b3IuY2FtZXJhKSE9J3VuZGVmaW5lZCcgPyB0aGlzLnRha2VQaG90bygpIDogdGhpcy5zZWxlY3RQaG90bygpXG4gICAgfVxuXG4gICAgc2VsZWN0UGhvdG8oKXtcbiAgICAgICAgdmFyIHtvblBob3RvLCBvbkZhaWwsIHdpZHRoLCBoZWlnaHQsIGF1dG9VcGxvYWR9PXRoaXMucHJvcHNcbiAgICAgICAgc2VsZWN0SW1hZ2VGaWxlKHdpZHRoLCBoZWlnaHQpLlxuICAgICAgICAgICAgdGhlbigoe3VybCxiaW5hcnl9KT0+e1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3VybH0pXG4gICAgICAgICAgICAgICAgaWYoYXV0b1VwbG9hZCl7XG4gICAgICAgICAgICAgICAgICAgIGRiRmlsZS51cGxvYWQodXJsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4odXJsPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25QaG90byAmJiBvblBob3RvKHVybClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvblBob3RvICYmIG9uUGhvdG8odXJsKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIG9uRmFpbClcbiAgICB9XG5cbiAgICB0YWtlUGhvdG8oKXtcbiAgICAgICAgdmFyIHtvblBob3RvLCBvbkZhaWwsIHdpZHRoLCBoZWlnaHQsIGNhbWVyYU9wdGlvbnMsIGF1dG9VcGxvYWR9PXRoaXMucHJvcHNcbiAgICAgICAgY2FtZXJhT3B0aW9ucy50YXJnZXRXaWR0aD13aWR0aFxuICAgICAgICBjYW1lcmFPcHRpb25zLnRhcmdldEhlaWdodD1oZWlnaHRcbiAgICAgICAgbmF2aWdhdG9yLmNhbWVyYS5nZXRQaWN0dXJlKHVybD0+e1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3VybH0pXG4gICAgICAgICAgICAgICAgaWYoYXV0b1VwbG9hZCl7XG4gICAgICAgICAgICAgICAgICAgIGRiRmlsZS51cGxvYWQodXJsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4odXJsPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25QaG90byAmJiBvblBob3RvKHVybClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb25QaG90byAmJiBvblBob3RvKHVybClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBvbkZhaWwsIGNhbWVyYU9wdGlvbnMpXG4gICAgfVxuXG4gICAgZ2V0VmFsdWUoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUudXJsXG4gICAgfVxuICAgIHN0YXRpYyBwcm9wVHlwZXM9e1xuICAgICAgICBjYW1lcmFPcHRpb25zOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBvblBob3RvOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25GYWlsOiBSZWFjdC5Qcm9wVHlwZXMuZnVuY1xuICAgIH1cblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xuICAgICAgICB3aWR0aDoxMDI0LFxuICAgICAgICBoZWlnaHQ6MTAyNCxcbiAgICAgICAgaWNvblJhdGlvOjAuNSxcbiAgICAgICAgb3ZlcndyaXRhYmxlOmZhbHNlLFxuICAgICAgICBhdXRvVXBsb2FkOnRydWUsXG5cdFx0Y2FtZXJhT3B0aW9uczogdHlwZW9mKENhbWVyYSkhPSd1bmRlZmluZWQnID8ge1xuXHRcdFx0XHRxdWFsaXR5IDogNzUsXG5cdFx0XHRcdGRlc3RpbmF0aW9uVHlwZSA6IENhbWVyYS5EZXN0aW5hdGlvblR5cGUuRklMRV9VUkksXG5cdFx0XHRcdHNvdXJjZVR5cGUgOiBDYW1lcmEuUGljdHVyZVNvdXJjZVR5cGUuQ0FNRVJBLFxuXHRcdFx0XHRhbGxvd0VkaXQgOiB0cnVlLFxuXHRcdFx0XHRlbmNvZGluZ1R5cGU6IENhbWVyYS5FbmNvZGluZ1R5cGUuSlBFRyxcblx0XHRcdFx0cG9wb3Zlck9wdGlvbnM6IG51bGwsXG5cdFx0XHRcdHNhdmVUb1Bob3RvQWxidW06IGZhbHNlXG5cdFx0XHR9Ont9XG4gICAgfVxuXG59XG5cbiJdfQ==