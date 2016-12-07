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
                others = (0, _objectWithoutProperties3.default)(_props, ['width', 'height', 'iconSize', 'style', 'cameraOptions', 'overwritable', 'iconRatio', 'onPhoto', 'autoUpload']);

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
        allowEdit: false,
        encodingType: Camera.EncodingType.JPEG,
        popoverOptions: null,
        saveToPhotoAlbum: false
    } : {}
};
exports.default = Photo;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3Bob3RvLmpzIl0sIm5hbWVzIjpbIlBob3RvIiwic3RhdGUiLCJ1cmwiLCJwcm9wcyIsInNyYyIsIndpZHRoIiwiaGVpZ2h0IiwiaWNvblNpemUiLCJzdHlsZSIsImNhbWVyYU9wdGlvbnMiLCJvdmVyd3JpdGFibGUiLCJpY29uUmF0aW8iLCJvblBob3RvIiwiYXV0b1VwbG9hZCIsIm90aGVycyIsIm9uQ2xpY2siLCJkb1Bob3RvIiwiYmluZCIsInZpZXdXaWR0aCIsIk1hdGgiLCJmbG9vciIsIm1pbiIsInRvcCIsImxlZnQiLCJtYXJnaW4iLCJuYXZpZ2F0b3IiLCJjYW1lcmEiLCJ0YWtlUGhvdG8iLCJzZWxlY3RQaG90byIsIm9uRmFpbCIsInRoZW4iLCJiaW5hcnkiLCJzZXRTdGF0ZSIsInVwbG9hZCIsInRhcmdldFdpZHRoIiwidGFyZ2V0SGVpZ2h0IiwiZ2V0UGljdHVyZSIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsIm9iamVjdCIsImZ1bmMiLCJkZWZhdWx0UHJvcHMiLCJDYW1lcmEiLCJxdWFsaXR5IiwiZGVzdGluYXRpb25UeXBlIiwiRGVzdGluYXRpb25UeXBlIiwiRklMRV9VUkkiLCJzb3VyY2VUeXBlIiwiUGljdHVyZVNvdXJjZVR5cGUiLCJDQU1FUkEiLCJhbGxvd0VkaXQiLCJlbmNvZGluZ1R5cGUiLCJFbmNvZGluZ1R5cGUiLCJKUEVHIiwicG9wb3Zlck9wdGlvbnMiLCJzYXZlVG9QaG90b0FsYnVtIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7Ozs4TUFDakJDLEssR0FBTSxFQUFDQyxLQUFJLE1BQUtDLEtBQUwsQ0FBV0MsR0FBaEIsRTs7Ozs7aUNBRUU7QUFBQTs7QUFDQSxnQkFBQ0YsR0FBRCxHQUFNLEtBQUtELEtBQVgsQ0FBQ0MsR0FBRDtB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T0csZUFBUCxDQUF1QkMsUUFGRTtBQUczQ0Msb0JBQWFMLE9BQU9NLGlCQUFQLENBQXlCQyxNQUhLO0FBSTNDQyxtQkFBWSxLQUorQjtBQUszQ0Msc0JBQWNULE9BQU9VLFlBQVAsQ0FBb0JDLElBTFM7QUFNM0NDLHdCQUFnQixJQU4yQjtBQU8zQ0MsMEJBQWtCO0FBUHlCLEtBQTlCLEdBUVo7QUFkbUIsQztrQkFoRkh2RCxLIiwiZmlsZSI6InBob3RvLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCdcbmltcG9ydCB7QXZhdGFyfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxuaW1wb3J0IEljb25DYW1lcmEgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ltYWdlL3Bob3RvLWNhbWVyYSdcbmltcG9ydCBkYkZpbGUgZnJvbSAnLi4vZGIvZmlsZSdcbmltcG9ydCB7c2VsZWN0SW1hZ2VGaWxlfSBmcm9tICcuL2ZpbGUtc2VsZWN0b3InXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBob3RvIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHN0YXRlPXt1cmw6dGhpcy5wcm9wcy5zcmN9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIHt1cmx9PXRoaXMuc3RhdGUsXG4gICAgICAgICAgICB7d2lkdGgsIGhlaWdodCwgaWNvblNpemUsIHN0eWxlPXt9LFxuXHRcdFx0XHRjYW1lcmFPcHRpb25zLCBvdmVyd3JpdGFibGUsaWNvblJhdGlvLFxuXHRcdFx0XHRvblBob3RvLCBhdXRvVXBsb2FkLFxuXHRcdFx0XHQuLi5vdGhlcnN9PXRoaXMucHJvcHM7XG4gICAgICAgIGlmKCFpY29uU2l6ZSl7XG4gICAgICAgICAgICBzdHlsZS53aWR0aD13aWR0aFxuICAgICAgICAgICAgc3R5bGUuaGVpZ2h0PWhlaWdodFxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oc3R5bGUsaWNvblNpemUpXG4gICAgICAgIH1cblxuICAgICAgICBpZih1cmwpe1xuICAgICAgICAgICAgaWYob3ZlcndyaXRhYmxlKVxuICAgICAgICAgICAgICAgIG90aGVycy5vbkNsaWNrPXRoaXMuZG9QaG90by5iaW5kKHRoaXMpXG4gICAgICAgICAgICByZXR1cm4gKDxBdmF0YXIgIHsuLi5vdGhlcnN9IHNyYz17dXJsfSBzdHlsZT17c3R5bGV9Lz4pXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdmlld1dpZHRoPU1hdGguZmxvb3IoTWF0aC5taW4oc3R5bGUud2lkdGgsIHN0eWxlLmhlaWdodCkqaWNvblJhdGlvKSxcbiAgICAgICAgICAgIHRvcD1NYXRoLmZsb29yKChzdHlsZS5oZWlnaHQtdmlld1dpZHRoKS8yKSxcbiAgICAgICAgICAgIGxlZnQ9TWF0aC5mbG9vcigoc3R5bGUud2lkdGgtdmlld1dpZHRoKS8yKTtcbiAgICAgICAgc3R5bGUud2lkdGg9c3R5bGUuaGVpZ2h0PXZpZXdXaWR0aFxuICAgICAgICBzdHlsZS5tYXJnaW49YCR7dG9wfXB4ICR7bGVmdH1weGBcbiAgICAgICAgcmV0dXJuICg8SWNvbkNhbWVyYSB7Li4ub3RoZXJzfVxuICAgICAgICAgICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgICAgICAgICAgICBjb2xvcj1cImxpZ2h0Z3JheVwiXG4gICAgICAgICAgICAgICAgaG92ZXJDb2xvcj1cImxpZ2h0Ymx1ZVwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17ZT0+dGhpcy5kb1Bob3RvKCl9Lz4pXG4gICAgfVxuXG4gICAgZG9QaG90bygpe1xuICAgICAgICB0eXBlb2YobmF2aWdhdG9yLmNhbWVyYSkhPSd1bmRlZmluZWQnID8gdGhpcy50YWtlUGhvdG8oKSA6IHRoaXMuc2VsZWN0UGhvdG8oKVxuICAgIH1cblxuICAgIHNlbGVjdFBob3RvKCl7XG4gICAgICAgIHZhciB7b25QaG90bywgb25GYWlsLCB3aWR0aCwgaGVpZ2h0LCBhdXRvVXBsb2FkfT10aGlzLnByb3BzXG4gICAgICAgIHNlbGVjdEltYWdlRmlsZSh3aWR0aCwgaGVpZ2h0KS5cbiAgICAgICAgICAgIHRoZW4oKHt1cmwsYmluYXJ5fSk9PntcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt1cmx9KVxuICAgICAgICAgICAgICAgIGlmKGF1dG9VcGxvYWQpe1xuICAgICAgICAgICAgICAgICAgICBkYkZpbGUudXBsb2FkKHVybClcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKHVybD0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uUGhvdG8gJiYgb25QaG90byh1cmwpXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb25QaG90byAmJiBvblBob3RvKHVybClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBvbkZhaWwpXG4gICAgfVxuXG4gICAgdGFrZVBob3RvKCl7XG4gICAgICAgIHZhciB7b25QaG90bywgb25GYWlsLCB3aWR0aCwgaGVpZ2h0LCBjYW1lcmFPcHRpb25zLCBhdXRvVXBsb2FkfT10aGlzLnByb3BzXG4gICAgICAgIGNhbWVyYU9wdGlvbnMudGFyZ2V0V2lkdGg9d2lkdGhcbiAgICAgICAgY2FtZXJhT3B0aW9ucy50YXJnZXRIZWlnaHQ9aGVpZ2h0XG4gICAgICAgIG5hdmlnYXRvci5jYW1lcmEuZ2V0UGljdHVyZSh1cmw9PntcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt1cmx9KVxuICAgICAgICAgICAgICAgIGlmKGF1dG9VcGxvYWQpe1xuICAgICAgICAgICAgICAgICAgICBkYkZpbGUudXBsb2FkKHVybClcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKHVybD0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uUGhvdG8gJiYgb25QaG90byh1cmwpXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG9uUGhvdG8gJiYgb25QaG90byh1cmwpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgb25GYWlsLCBjYW1lcmFPcHRpb25zKVxuICAgIH1cblxuICAgIGdldFZhbHVlKCl7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLnVybFxuICAgIH1cbiAgICBzdGF0aWMgcHJvcFR5cGVzPXtcbiAgICAgICAgY2FtZXJhT3B0aW9uczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgb25QaG90bzogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uRmFpbDogUmVhY3QuUHJvcFR5cGVzLmZ1bmNcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzPXtcbiAgICAgICAgd2lkdGg6MTAyNCxcbiAgICAgICAgaGVpZ2h0OjEwMjQsXG4gICAgICAgIGljb25SYXRpbzowLjUsXG4gICAgICAgIG92ZXJ3cml0YWJsZTpmYWxzZSxcbiAgICAgICAgYXV0b1VwbG9hZDp0cnVlLFxuXHRcdGNhbWVyYU9wdGlvbnM6IHR5cGVvZihDYW1lcmEpIT0ndW5kZWZpbmVkJyA/IHtcblx0XHRcdFx0cXVhbGl0eSA6IDc1LFxuXHRcdFx0XHRkZXN0aW5hdGlvblR5cGUgOiBDYW1lcmEuRGVzdGluYXRpb25UeXBlLkZJTEVfVVJJLFxuXHRcdFx0XHRzb3VyY2VUeXBlIDogQ2FtZXJhLlBpY3R1cmVTb3VyY2VUeXBlLkNBTUVSQSxcblx0XHRcdFx0YWxsb3dFZGl0IDogZmFsc2UsXG5cdFx0XHRcdGVuY29kaW5nVHlwZTogQ2FtZXJhLkVuY29kaW5nVHlwZS5KUEVHLFxuXHRcdFx0XHRwb3BvdmVyT3B0aW9uczogbnVsbCxcblx0XHRcdFx0c2F2ZVRvUGhvdG9BbGJ1bTogZmFsc2Vcblx0XHRcdH06e31cbiAgICB9XG5cbn1cblxuXG4iXX0=