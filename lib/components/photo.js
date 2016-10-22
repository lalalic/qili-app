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

            var url = this.state.url;
            var _props = this.props;
            var width = _props.width;
            var height = _props.height;
            var iconSize = _props.iconSize;
            var _props$style = _props.style;
            var style = _props$style === undefined ? {} : _props$style;
            var cameraOptions = _props.cameraOptions;
            var overwritable = _props.overwritable;
            var onPhoto = _props.onPhoto;
            var autoUpload = _props.autoUpload;

            var others = _objectWithoutProperties(_props, ['width', 'height', 'iconSize', 'style', 'cameraOptions', 'overwritable', 'onPhoto', 'autoUpload']);

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

            var iconRatio = others.iconRatio;
            var lefts = _objectWithoutProperties(others, ['iconRatio']);
            var viewWidth = Math.floor(Math.min(style.width, style.height) * iconRatio);
            var top = Math.floor((style.height - viewWidth) / 2);
            var left = Math.floor((style.width - viewWidth) / 2);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3Bob3RvLmpzIl0sIm5hbWVzIjpbIlBob3RvIiwic3RhdGUiLCJ1cmwiLCJwcm9wcyIsInNyYyIsIndpZHRoIiwiaGVpZ2h0IiwiaWNvblNpemUiLCJzdHlsZSIsImNhbWVyYU9wdGlvbnMiLCJvdmVyd3JpdGFibGUiLCJvblBob3RvIiwiYXV0b1VwbG9hZCIsIm90aGVycyIsIk9iamVjdCIsImFzc2lnbiIsIm9uQ2xpY2siLCJ0YWtlUGhvdG8iLCJiaW5kIiwiaWNvblJhdGlvIiwibGVmdHMiLCJNYXRoIiwiZmxvb3IiLCJtaW4iLCJ2aWV3V2lkdGgiLCJtYXJnaW4iLCJ0b3AiLCJsZWZ0IiwiZG9QaG90byIsIm5hdmlnYXRvciIsImNhbWVyYSIsInNlbGVjdFBob3RvIiwib25GYWlsIiwidGhlbiIsImJpbmFyeSIsInNldFN0YXRlIiwidXBsb2FkIiwidGFyZ2V0V2lkdGgiLCJ0YXJnZXRIZWlnaHQiLCJnZXRQaWN0dXJlIiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwib2JqZWN0IiwiZnVuYyIsImRlZmF1bHRQcm9wcyIsIkNhbWVyYSIsInF1YWxpdHkiLCJkZXN0aW5hdGlvblR5cGUiLCJEZXN0aW5hdGlvblR5cGUiLCJGSUxFX1VSSSIsInNvdXJjZVR5cGUiLCJQaWN0dXJlU291cmNlVHlwZSIsIkNBTUVSQSIsImFsbG93RWRpdCIsImVuY29kaW5nVHlwZSIsIkVuY29kaW5nVHlwZSIsIkpQRUciLCJwb3BvdmVyT3B0aW9ucyIsInNhdmVUb1Bob3RvQWxidW0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7Ozt3TEFDakJDLEssR0FBTSxFQUFDQyxLQUFJLE1BQUtDLEtBQUwsQ0FBV0MsR0FBaEIsRTs7Ozs7aUNBRUU7QUFBQTs7QUFDQSxnQkFBQ0YsR0FBRCxHQUFNLEtBQUtELEtBQVgsQ0FBQ0Ms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NkMsTUFBUCxJQUFnQixXQUFoQixLQUNBN0MsTUFBTTRDLFlBQU4sQ0FBbUJuQyxhQUFuQixHQUFpQztBQUN6QnFDLGFBQVUsRUFEZTtBQUV6QkMscUJBQWtCRixPQUFPRyxlQUFQLENBQXVCQyxRQUZoQjtBQUd6QkMsZ0JBQWFMLE9BQU9NLGlCQUFQLENBQXlCQyxNQUhiO0FBSXpCQyxlQUFZLEtBSmE7QUFLekJDLGtCQUFjVCxPQUFPVSxZQUFQLENBQW9CQyxJQUxUO0FBTXpCQyxvQkFBZ0IsSUFOUztBQU96QkMsc0JBQWtCO0FBUE8sQ0FEakMiLCJmaWxlIjoicGhvdG8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtBdmF0YXJ9IGZyb20gXCJtYXRlcmlhbC11aVwiXG5pbXBvcnQgSWNvbkNhbWVyYSBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvaW1hZ2UvcGhvdG8tY2FtZXJhJ1xuaW1wb3J0IGRiRmlsZSBmcm9tICcuLi9kYi9maWxlJ1xuaW1wb3J0IHtzZWxlY3RJbWFnZUZpbGV9IGZyb20gJy4vZmlsZS1zZWxlY3RvcidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGhvdG8gZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgc3RhdGU9e3VybDp0aGlzLnByb3BzLnNyY31cblxuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIge3VybH09dGhpcy5zdGF0ZSxcbiAgICAgICAgICAgIHt3aWR0aCwgaGVpZ2h0LCBpY29uU2l6ZSwgc3R5bGU9e30sIFxuXHRcdFx0XHRjYW1lcmFPcHRpb25zLCBvdmVyd3JpdGFibGUsIFxuXHRcdFx0XHRvblBob3RvLCBhdXRvVXBsb2FkLFxuXHRcdFx0XHQuLi5vdGhlcnN9PXRoaXMucHJvcHM7XG4gICAgICAgIGlmKCFpY29uU2l6ZSl7XG4gICAgICAgICAgICBzdHlsZS53aWR0aD13aWR0aFxuICAgICAgICAgICAgc3R5bGUuaGVpZ2h0PWhlaWdodFxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oc3R5bGUsaWNvblNpemUpXG4gICAgICAgIH1cblxuICAgICAgICBpZih1cmwpe1xuICAgICAgICAgICAgaWYob3ZlcndyaXRhYmxlKVxuICAgICAgICAgICAgICAgIG90aGVycy5vbkNsaWNrPXRoaXMudGFrZVBob3RvLmJpbmQodGhpcylcbiAgICAgICAgICAgIHJldHVybiAoPEF2YXRhciBzcmM9e3VybH0gc3R5bGU9e3N0eWxlfSB7Li4ub3RoZXJzfS8+KVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHtpY29uUmF0aW8sIC4uLmxlZnRzfT1vdGhlcnMsXG4gICAgICAgICAgICB2aWV3V2lkdGg9TWF0aC5mbG9vcihNYXRoLm1pbihzdHlsZS53aWR0aCwgc3R5bGUuaGVpZ2h0KSppY29uUmF0aW8pLFxuICAgICAgICAgICAgdG9wPU1hdGguZmxvb3IoKHN0eWxlLmhlaWdodC12aWV3V2lkdGgpLzIpLFxuICAgICAgICAgICAgbGVmdD1NYXRoLmZsb29yKChzdHlsZS53aWR0aC12aWV3V2lkdGgpLzIpO1xuICAgICAgICBzdHlsZS53aWR0aD1zdHlsZS5oZWlnaHQ9dmlld1dpZHRoXG4gICAgICAgIHN0eWxlLm1hcmdpbj1gJHt0b3B9cHggJHtsZWZ0fXB4YFxuICAgICAgICByZXR1cm4gKDxJY29uQ2FtZXJhIHsuLi5sZWZ0c31cbiAgICAgICAgICAgICAgICBzdHlsZT17c3R5bGV9XG4gICAgICAgICAgICAgICAgY29sb3I9XCJsaWdodGdyYXlcIlxuICAgICAgICAgICAgICAgIGhvdmVyQ29sb3I9XCJsaWdodGJsdWVcIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2U9PnRoaXMuZG9QaG90bygpfS8+KVxuICAgIH1cblxuICAgIGRvUGhvdG8oKXtcbiAgICAgICAgdHlwZW9mKG5hdmlnYXRvci5jYW1lcmEpIT0ndW5kZWZpbmVkJyA/IHRoaXMudGFrZVBob3RvKCkgOiB0aGlzLnNlbGVjdFBob3RvKClcbiAgICB9XG5cbiAgICBzZWxlY3RQaG90bygpe1xuICAgICAgICB2YXIge29uUGhvdG8sIG9uRmFpbCwgd2lkdGgsIGhlaWdodCwgYXV0b1VwbG9hZH09dGhpcy5wcm9wc1xuICAgICAgICBzZWxlY3RJbWFnZUZpbGUod2lkdGgsIGhlaWdodCkuXG4gICAgICAgICAgICB0aGVuKCh7dXJsLGJpbmFyeX0pPT57XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dXJsfSlcbiAgICAgICAgICAgICAgICBpZihhdXRvVXBsb2FkKXtcbiAgICAgICAgICAgICAgICAgICAgZGJGaWxlLnVwbG9hZChiaW5hcnkpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbih1cmw9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblBob3RvICYmIG9uUGhvdG8odXJsKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG9uUGhvdG8gJiYgb25QaG90byh1cmwpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgb25GYWlsKVxuICAgIH1cblxuICAgIHRha2VQaG90bygpe1xuICAgICAgICB2YXIge29uUGhvdG8sIG9uRmFpbCwgd2lkdGgsIGhlaWdodCwgY2FtZXJhT3B0aW9ucywgYXV0b1VwbG9hZH09dGhpcy5wcm9wc1xuICAgICAgICBjYW1lcmFPcHRpb25zLnRhcmdldFdpZHRoPXdpZHRoXG4gICAgICAgIGNhbWVyYU9wdGlvbnMudGFyZ2V0SGVpZ2h0PWhlaWdodFxuICAgICAgICBuYXZpZ2F0b3IuY2FtZXJhLmdldFBpY3R1cmUodXJsPT57XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dXJsfSlcbiAgICAgICAgICAgICAgICBpZihhdXRvVXBsb2FkKXtcbiAgICAgICAgICAgICAgICAgICAgZGJGaWxlLnVwbG9hZCh1cmwpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbih1cmw9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblBob3RvICYmIG9uUGhvdG8odXJsKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvblBob3RvICYmIG9uUGhvdG8odXJsKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIG9uRmFpbCwgY2FtZXJhT3B0aW9ucylcbiAgICB9XG5cbiAgICBnZXRWYWx1ZSgpe1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS51cmxcbiAgICB9XG4gICAgc3RhdGljIHByb3BUeXBlcz17XG4gICAgICAgIGNhbWVyYU9wdGlvbnM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIG9uUGhvdG86IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBvbkZhaWw6IFJlYWN0LlByb3BUeXBlcy5mdW5jXG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcz17XG4gICAgICAgIHdpZHRoOjEwMjQsXG4gICAgICAgIGhlaWdodDoxMDI0LFxuICAgICAgICBpY29uUmF0aW86MC41LFxuICAgICAgICBvdmVyd3JpdGFibGU6ZmFsc2UsXG4gICAgICAgIGF1dG9VcGxvYWQ6dHJ1ZVxuICAgIH1cblxufVxuXG50eXBlb2YoQ2FtZXJhKSE9J3VuZGVmaW5lZCcgJiYgKFxuUGhvdG8uZGVmYXVsdFByb3BzLmNhbWVyYU9wdGlvbnM9e1xuICAgICAgICBxdWFsaXR5IDogNzUsXG4gICAgICAgIGRlc3RpbmF0aW9uVHlwZSA6IENhbWVyYS5EZXN0aW5hdGlvblR5cGUuRklMRV9VUkksXG4gICAgICAgIHNvdXJjZVR5cGUgOiBDYW1lcmEuUGljdHVyZVNvdXJjZVR5cGUuQ0FNRVJBLFxuICAgICAgICBhbGxvd0VkaXQgOiBmYWxzZSxcbiAgICAgICAgZW5jb2RpbmdUeXBlOiBDYW1lcmEuRW5jb2RpbmdUeXBlLkpQRUcsXG4gICAgICAgIHBvcG92ZXJPcHRpb25zOiBudWxsLFxuICAgICAgICBzYXZlVG9QaG90b0FsYnVtOiBmYWxzZVxuICAgIH0pO1xuIl19