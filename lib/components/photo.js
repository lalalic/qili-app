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
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, Photo);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Photo)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = { url: _this.props.src }, _temp), _possibleConstructorReturn(_this, _ret);
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

            (0, _fileSelector.selectImageFile)(width, height).then(function (_ref) {
                var url = _ref.url;
                var binary = _ref.binary;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3Bob3RvLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7Ozs7Ozt1TUFDakIsUUFBTSxFQUFDLEtBQUksTUFBSyxLQUFMLENBQVcsR0FBWDs7O2lCQURNOztpQ0FHVDs7O0FBQ0EsZ0JBQUMsTUFBSyxLQUFLLEtBQUwsQ0FBTCxHQUFELENBREE7eUJBS0csS0FBSyxLQUFMLENBTEg7Z0JBRUMscUJBRkQ7Z0JBRVEsdUJBRlI7Z0JBRWdCLDJCQUZoQjtzQ0FFMEIsTUFGMUI7Z0JBRTBCLHFDQUFNLGtCQUZoQztnQkFHUixxQ0FIUTtnQkFHTyxtQ0FIUDtnQkFJUix5QkFKUTtnQkFJQywrQkFKRDs7Z0JBS0wsOElBTEs7O0FBTUosZ0JBQUcsQ0FBQyxRQUFELEVBQVU7QUFDVCxzQkFBTSxLQUFOLEdBQVksS0FBWixDQURTO0FBRVQsc0JBQU0sTUFBTixHQUFhLE1BQWIsQ0FGUzthQUFiLE1BR0s7QUFDRCx1QkFBTyxNQUFQLENBQWMsS0FBZCxFQUFvQixRQUFwQixFQURDO2FBSEw7O0FBT0EsZ0JBQUcsR0FBSCxFQUFPO0FBQ0gsb0JBQUcsWUFBSCxFQUNJLE9BQU8sT0FBUCxHQUFlLEtBQUssU0FBTCxDQUFlLElBQWYsQ0FBb0IsSUFBcEIsQ0FBZixDQURKO0FBRUEsdUJBQVEsNkRBQVEsS0FBSyxHQUFMLEVBQVUsT0FBTyxLQUFQLElBQWtCLE9BQXBDLENBQVIsQ0FIRzthQUFQOztnQkFNSyxZQUFxQixPQUFyQixVQW5CRDtBQW1CQSxnQkFBZSxpQ0FBTyxzQkFBdEIsQ0FuQkE7QUFvQkEsNEJBQVUsS0FBSyxLQUFMLENBQVcsS0FBSyxHQUFMLENBQVMsTUFBTSxLQUFOLEVBQWEsTUFBTSxNQUFOLENBQXRCLEdBQW9DLFNBQXBDLENBQXJCLENBcEJBO0FBcUJBLHNCQUFJLEtBQUssS0FBTCxD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UFIsQ0FEQSIsImZpbGUiOiJwaG90by5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnXG5pbXBvcnQge0F2YXRhcn0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcbmltcG9ydCBJY29uQ2FtZXJhIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9pbWFnZS9waG90by1jYW1lcmEnXG5pbXBvcnQgZGJGaWxlIGZyb20gJy4uL2RiL2ZpbGUnXG5pbXBvcnQge3NlbGVjdEltYWdlRmlsZX0gZnJvbSAnLi9maWxlLXNlbGVjdG9yJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQaG90byBleHRlbmRzIENvbXBvbmVudHtcbiAgICBzdGF0ZT17dXJsOnRoaXMucHJvcHMuc3JjfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciB7dXJsfT10aGlzLnN0YXRlLFxuICAgICAgICAgICAge3dpZHRoLCBoZWlnaHQsIGljb25TaXplLCBzdHlsZT17fSwgXG5cdFx0XHRcdGNhbWVyYU9wdGlvbnMsIG92ZXJ3cml0YWJsZSwgXG5cdFx0XHRcdG9uUGhvdG8sIGF1dG9VcGxvYWQsXG5cdFx0XHRcdC4uLm90aGVyc309dGhpcy5wcm9wcztcbiAgICAgICAgaWYoIWljb25TaXplKXtcbiAgICAgICAgICAgIHN0eWxlLndpZHRoPXdpZHRoXG4gICAgICAgICAgICBzdHlsZS5oZWlnaHQ9aGVpZ2h0XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihzdHlsZSxpY29uU2l6ZSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHVybCl7XG4gICAgICAgICAgICBpZihvdmVyd3JpdGFibGUpXG4gICAgICAgICAgICAgICAgb3RoZXJzLm9uQ2xpY2s9dGhpcy50YWtlUGhvdG8uYmluZCh0aGlzKVxuICAgICAgICAgICAgcmV0dXJuICg8QXZhdGFyIHNyYz17dXJsfSBzdHlsZT17c3R5bGV9IHsuLi5vdGhlcnN9Lz4pXG4gICAgICAgIH1cblxuICAgICAgICB2YXIge2ljb25SYXRpbywgLi4ubGVmdHN9PW90aGVycyxcbiAgICAgICAgICAgIHZpZXdXaWR0aD1NYXRoLmZsb29yKE1hdGgubWluKHN0eWxlLndpZHRoLCBzdHlsZS5oZWlnaHQpKmljb25SYXRpbyksXG4gICAgICAgICAgICB0b3A9TWF0aC5mbG9vcigoc3R5bGUuaGVpZ2h0LXZpZXdXaWR0aCkvMiksXG4gICAgICAgICAgICBsZWZ0PU1hdGguZmxvb3IoKHN0eWxlLndpZHRoLXZpZXdXaWR0aCkvMik7XG4gICAgICAgIHN0eWxlLndpZHRoPXN0eWxlLmhlaWdodD12aWV3V2lkdGhcbiAgICAgICAgc3R5bGUubWFyZ2luPWAke3RvcH1weCAke2xlZnR9cHhgXG4gICAgICAgIHJldHVybiAoPEljb25DYW1lcmEgey4uLmxlZnRzfVxuICAgICAgICAgICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgICAgICAgICAgICBjb2xvcj1cImxpZ2h0Z3JheVwiXG4gICAgICAgICAgICAgICAgaG92ZXJDb2xvcj1cImxpZ2h0Ymx1ZVwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17ZT0+dGhpcy5kb1Bob3RvKCl9Lz4pXG4gICAgfVxuXG4gICAgZG9QaG90bygpe1xuICAgICAgICB0eXBlb2YobmF2aWdhdG9yLmNhbWVyYSkhPSd1bmRlZmluZWQnID8gdGhpcy50YWtlUGhvdG8oKSA6IHRoaXMuc2VsZWN0UGhvdG8oKVxuICAgIH1cblxuICAgIHNlbGVjdFBob3RvKCl7XG4gICAgICAgIHZhciB7b25QaG90bywgb25GYWlsLCB3aWR0aCwgaGVpZ2h0LCBhdXRvVXBsb2FkfT10aGlzLnByb3BzXG4gICAgICAgIHNlbGVjdEltYWdlRmlsZSh3aWR0aCwgaGVpZ2h0KS5cbiAgICAgICAgICAgIHRoZW4oKHt1cmwsYmluYXJ5fSk9PntcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt1cmx9KVxuICAgICAgICAgICAgICAgIGlmKGF1dG9VcGxvYWQpe1xuICAgICAgICAgICAgICAgICAgICBkYkZpbGUudXBsb2FkKGJpbmFyeSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKHVybD0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uUGhvdG8gJiYgb25QaG90byh1cmwpXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb25QaG90byAmJiBvblBob3RvKHVybClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBvbkZhaWwpXG4gICAgfVxuXG4gICAgdGFrZVBob3RvKCl7XG4gICAgICAgIHZhciB7b25QaG90bywgb25GYWlsLCB3aWR0aCwgaGVpZ2h0LCBjYW1lcmFPcHRpb25zLCBhdXRvVXBsb2FkfT10aGlzLnByb3BzXG4gICAgICAgIGNhbWVyYU9wdGlvbnMudGFyZ2V0V2lkdGg9d2lkdGhcbiAgICAgICAgY2FtZXJhT3B0aW9ucy50YXJnZXRIZWlnaHQ9aGVpZ2h0XG4gICAgICAgIG5hdmlnYXRvci5jYW1lcmEuZ2V0UGljdHVyZSh1cmw9PntcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt1cmx9KVxuICAgICAgICAgICAgICAgIGlmKGF1dG9VcGxvYWQpe1xuICAgICAgICAgICAgICAgICAgICBkYkZpbGUudXBsb2FkKHVybClcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKHVybD0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uUGhvdG8gJiYgb25QaG90byh1cmwpXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG9uUGhvdG8gJiYgb25QaG90byh1cmwpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgb25GYWlsLCBjYW1lcmFPcHRpb25zKVxuICAgIH1cblxuICAgIGdldFZhbHVlKCl7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLnVybFxuICAgIH1cbiAgICBzdGF0aWMgcHJvcFR5cGVzPXtcbiAgICAgICAgY2FtZXJhT3B0aW9uczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgb25QaG90bzogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG9uRmFpbDogUmVhY3QuUHJvcFR5cGVzLmZ1bmNcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzPXtcbiAgICAgICAgd2lkdGg6MTAyNCxcbiAgICAgICAgaGVpZ2h0OjEwMjQsXG4gICAgICAgIGljb25SYXRpbzowLjUsXG4gICAgICAgIG92ZXJ3cml0YWJsZTpmYWxzZSxcbiAgICAgICAgYXV0b1VwbG9hZDp0cnVlXG4gICAgfVxuXG59XG5cbnR5cGVvZihDYW1lcmEpIT0ndW5kZWZpbmVkJyAmJiAoXG5QaG90by5kZWZhdWx0UHJvcHMuY2FtZXJhT3B0aW9ucz17XG4gICAgICAgIHF1YWxpdHkgOiA3NSxcbiAgICAgICAgZGVzdGluYXRpb25UeXBlIDogQ2FtZXJhLkRlc3RpbmF0aW9uVHlwZS5GSUxFX1VSSSxcbiAgICAgICAgc291cmNlVHlwZSA6IENhbWVyYS5QaWN0dXJlU291cmNlVHlwZS5DQU1FUkEsXG4gICAgICAgIGFsbG93RWRpdCA6IGZhbHNlLFxuICAgICAgICBlbmNvZGluZ1R5cGU6IENhbWVyYS5FbmNvZGluZ1R5cGUuSlBFRyxcbiAgICAgICAgcG9wb3Zlck9wdGlvbnM6IG51bGwsXG4gICAgICAgIHNhdmVUb1Bob3RvQWxidW06IGZhbHNlXG4gICAgfSk7XG4iXX0=