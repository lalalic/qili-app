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
            var onPhoto = _props.onPhoto;
            var autoUpload = _props.autoUpload;
            var others = (0, _objectWithoutProperties3.default)(_props, ['width', 'height', 'iconSize', 'style', 'cameraOptions', 'overwritable', 'onPhoto', 'autoUpload']);

            if (!iconSize) {
                style.width = width;
                style.height = height;
            } else {
                (0, _assign2.default)(style, iconSize);
            }

            if (url) {
                if (overwritable) others.onClick = this.takePhoto.bind(this);
                return _react2.default.createElement(_materialUi.Avatar, (0, _extends3.default)({ src: url, style: style }, others));
            }

            var iconRatio = others.iconRatio;
            var lefts = (0, _objectWithoutProperties3.default)(others, ['iconRatio']);
            var viewWidth = Math.floor(Math.min(style.width, style.height) * iconRatio);
            var top = Math.floor((style.height - viewWidth) / 2);
            var left = Math.floor((style.width - viewWidth) / 2);
            style.width = style.height = viewWidth;
            style.margin = top + 'px ' + left + 'px';
            return _react2.default.createElement(_photoCamera2.default, (0, _extends3.default)({}, lefts, {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3Bob3RvLmpzIl0sIm5hbWVzIjpbIlBob3RvIiwic3RhdGUiLCJ1cmwiLCJwcm9wcyIsInNyYyIsIndpZHRoIiwiaGVpZ2h0IiwiaWNvblNpemUiLCJzdHlsZSIsImNhbWVyYU9wdGlvbnMiLCJvdmVyd3JpdGFibGUiLCJvblBob3RvIiwiYXV0b1VwbG9hZCIsIm90aGVycyIsIm9uQ2xpY2siLCJ0YWtlUGhvdG8iLCJiaW5kIiwiaWNvblJhdGlvIiwibGVmdHMiLCJNYXRoIiwiZmxvb3IiLCJtaW4iLCJ2aWV3V2lkdGgiLCJtYXJnaW4iLCJ0b3AiLCJsZWZ0IiwiZG9QaG90byIsIm5hdmlnYXRvciIsImNhbWVyYSIsInNlbGVjdFBob3RvIiwib25GYWlsIiwidGhlbiIsImJpbmFyeSIsInNldFN0YXRlIiwidXBsb2FkIiwidGFyZ2V0V2lkdGgiLCJ0YXJnZXRIZWlnaHQiLCJnZXRQaWN0dXJlIiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwib2JqZWN0IiwiZnVuYyIsImRlZmF1bHRQcm9wcyIsIkNhbWVyYSIsInF1YWxpdHkiLCJkZXN0aW5hdGlvblR5cGUiLCJEZXN0aW5hdGlvblR5cGUiLCJGSUxFX1VSSSIsInNvdXJjZVR5cGUiLCJQaWN0dXJlU291cmNlVHlwZSIsIkNBTUVSQSIsImFsbG93RWRpdCIsImVuY29kaW5nVHlwZSIsIkVuY29kaW5nVHlwZSIsIkpQRUciLCJwb3BvdmVyT3B0aW9ucyIsInNhdmVUb1Bob3RvQWxidW0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7OzhNQUNqQkMsSyxHQUFNLEVBQUNDLEtBQUksTUFBS0MsS0FBTCxDQUFXQyxHQUFoQixFOzs7OztpQ0FFRTtBQUFBOztBQUNBLGdCQUFDRixHQUFELEdBQU0sS0FBS0QsS0FBWCxDQUFD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QWhCLEtBQ0EzQyxNQUFNMEMsWUFBTixDQUFtQmpDLGFBQW5CLEdBQWlDO0FBQ3pCbUMsYUFBVSxFQURlO0FBRXpCQyxxQkFBa0JGLE9BQU9HLGVBQVAsQ0FBdUJDLFFBRmhCO0FBR3pCQyxnQkFBYUwsT0FBT00saUJBQVAsQ0FBeUJDLE1BSGI7QUFJekJDLGVBQVksS0FKYTtBQUt6QkMsa0JBQWNULE9BQU9VLFlBQVAsQ0FBb0JDLElBTFQ7QUFNekJDLG9CQUFnQixJQU5TO0FBT3pCQyxzQkFBa0I7QUFQTyxDQURqQyIsImZpbGUiOiJwaG90by5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnXG5pbXBvcnQge0F2YXRhcn0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcbmltcG9ydCBJY29uQ2FtZXJhIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9pbWFnZS9waG90by1jYW1lcmEnXG5pbXBvcnQgZGJGaWxlIGZyb20gJy4uL2RiL2ZpbGUnXG5pbXBvcnQge3NlbGVjdEltYWdlRmlsZX0gZnJvbSAnLi9maWxlLXNlbGVjdG9yJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQaG90byBleHRlbmRzIENvbXBvbmVudHtcbiAgICBzdGF0ZT17dXJsOnRoaXMucHJvcHMuc3JjfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciB7dXJsfT10aGlzLnN0YXRlLFxuICAgICAgICAgICAge3dpZHRoLCBoZWlnaHQsIGljb25TaXplLCBzdHlsZT17fSwgXG5cdFx0XHRcdGNhbWVyYU9wdGlvbnMsIG92ZXJ3cml0YWJsZSwgXG5cdFx0XHRcdG9uUGhvdG8sIGF1dG9VcGxvYWQsXG5cdFx0XHRcdC4uLm90aGVyc309dGhpcy5wcm9wcztcbiAgICAgICAgaWYoIWljb25TaXplKXtcbiAgICAgICAgICAgIHN0eWxlLndpZHRoPXdpZHRoXG4gICAgICAgICAgICBzdHlsZS5oZWlnaHQ9aGVpZ2h0XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihzdHlsZSxpY29uU2l6ZSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHVybCl7XG4gICAgICAgICAgICBpZihvdmVyd3JpdGFibGUpXG4gICAgICAgICAgICAgICAgb3RoZXJzLm9uQ2xpY2s9dGhpcy50YWtlUGhvdG8uYmluZCh0aGlzKVxuICAgICAgICAgICAgcmV0dXJuICg8QXZhdGFyIHNyYz17dXJsfSBzdHlsZT17c3R5bGV9IHsuLi5vdGhlcnN9Lz4pXG4gICAgICAgIH1cblxuICAgICAgICB2YXIge2ljb25SYXRpbywgLi4ubGVmdHN9PW90aGVycyxcbiAgICAgICAgICAgIHZpZXdXaWR0aD1NYXRoLmZsb29yKE1hdGgubWluKHN0eWxlLndpZHRoLCBzdHlsZS5oZWlnaHQpKmljb25SYXRpbyksXG4gICAgICAgICAgICB0b3A9TWF0aC5mbG9vcigoc3R5bGUuaGVpZ2h0LXZpZXdXaWR0aCkvMiksXG4gICAgICAgICAgICBsZWZ0PU1hdGguZmxvb3IoKHN0eWxlLndpZHRoLXZpZXdXaWR0aCkvMik7XG4gICAgICAgIHN0eWxlLndpZHRoPXN0eWxlLmhlaWdodD12aWV3V2lkdGhcbiAgICAgICAgc3R5bGUubWFyZ2luPWAke3RvcH1weCAke2xlZnR9cHhgXG4gICAgICAgIHJldHVybiAoPEljb25DYW1lcmEgey4uLmxlZnRzfVxuICAgICAgICAgICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgICAgICAgICAgICBjb2xvcj1cImxpZ2h0Z3JheVwiXG4gICAgICAgICAgICAgICAgaG92ZXJDb2xvcj1cImxpZ2h0Ymx1ZVwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17ZT0+dGhpcy5kb1Bob3RvKCl9Lz4pXG4gICAgfVxuXG4gICAgZG9QaG90bygpe1xuICAgICAgICB0eXBlb2YobmF2aWdhdG9yLmNhbWVyYSkhPSd1bmRlZmluZWQnID8gdGhpcy50YWtlUGhvdG8oKSA6IHRoaXMuc2VsZWN0UGhvdG8oKVxuICAgIH1cblxuICAgIHNlbGVjdFBob3RvKCl7XG4gICAgICAgIHZhciB7b25QaG90bywgb25GYWlsLCB3aWR0aCwgaGVpZ2h0LCBhdXRvVXBsb2FkfT10aGlzLnByb3BzXG4gICAgICAgIHNlbGVjdEltYWdlRmlsZSh3aWR0aCwgaGVpZ2h0KS5cbiAgICAgICAgICAgIHRoZW4oKHt1cmwsYmluYXJ5fSk9PntcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt1cmx9KVxuICAgICAgICAgICAgICAgIGlmKGF1dG9VcGxvYWQpe1xuICAgICAgICAgICAgICAgICAgICBkYkZpbGUudXBsb2FkKGJpbmFyeSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKHVybD0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uUGhvdG8gJiYgb25QaG90byh1cmwpXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb25QaG90byAmJiBvblBob3RvKHVybClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBvbkZhaWwpXG4gICAgfVxuXG4gICAgdGFrZVBob3RvKCl7XG4gICAgICAgIHZhciB7b25QaG90bywgb25GYWlsLCB3aWR0aCwgaGVpZ2h0LCBjYW1lcmFPcHRpb25zLCBhdXRvVXBsb2FkfT10aGlzLnByb3BzXG4gICAgICAgIGNhbWVyYU9wdGlvbnMudGFyZ2V0V2lkdGg9d2lkdGhcbiAgICAgICAgY2FtZXJhT3B0aW9ucy50YXJnZXRIZWlnaHQ9aGVpZ2h0XG4gICAgICAgIG5hdmlnYXRvci5jYW1lcmEuZ2V0UGljdHVyZSh1cmw9PntcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt1cmx9KVxuICAgICAgICAgICAgICAgIGlmKGF1dG9VcGxvYWQpe1xuICAgICAgICAgICAgICAgICAgICBkYkZpbGUudXBsb2FkKHVybClcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKHVybD0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uUGhvdG8gJiYgb25QaG90byh1cmwpXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG9uUGhvdG8gJiYgb25QaG90byh1cmwpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgb25GYWlsLCBjYW1lcmFPcHRpb25zKVxuICAgIH1cblxuICAgIGdldFZhbHVlKCl7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLnVybFxuICAgIH1cbiAgICBzdGF0aWMgcHJvcFR5cGVzPXtcbiAgICAgICAgY2FtZXJhT3B0aW9uczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgb25QaG90bzogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uRmFpbDogUmVhY3QuUHJvcFR5cGVzLmZ1bmNcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzPXtcbiAgICAgICAgd2lkdGg6MTAyNCxcbiAgICAgICAgaGVpZ2h0OjEwMjQsXG4gICAgICAgIGljb25SYXRpbzowLjUsXG4gICAgICAgIG92ZXJ3cml0YWJsZTpmYWxzZSxcbiAgICAgICAgYXV0b1VwbG9hZDp0cnVlXG4gICAgfVxuXG59XG5cbnR5cGVvZihDYW1lcmEpIT0ndW5kZWZpbmVkJyAmJiAoXG5QaG90by5kZWZhdWx0UHJvcHMuY2FtZXJhT3B0aW9ucz17XG4gICAgICAgIHF1YWxpdHkgOiA3NSxcbiAgICAgICAgZGVzdGluYXRpb25UeXBlIDogQ2FtZXJhLkRlc3RpbmF0aW9uVHlwZS5GSUxFX1VSSSxcbiAgICAgICAgc291cmNlVHlwZSA6IENhbWVyYS5QaWN0dXJlU291cmNlVHlwZS5DQU1FUkEsXG4gICAgICAgIGFsbG93RWRpdCA6IGZhbHNlLFxuICAgICAgICBlbmNvZGluZ1R5cGU6IENhbWVyYS5FbmNvZGluZ1R5cGUuSlBFRyxcbiAgICAgICAgcG9wb3Zlck9wdGlvbnM6IG51bGwsXG4gICAgICAgIHNhdmVUb1Bob3RvQWxidW06IGZhbHNlXG4gICAgfSk7XG4iXX0=