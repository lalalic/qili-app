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

var selectFile = _fileSelector.main.selectFile;

var Photo = function (_Component) {
    _inherits(Photo, _Component);

    function Photo(props) {
        _classCallCheck(this, Photo);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Photo).call(this, props));

        var src = _this.props.src;

        _this.state = { url: src };
        return _this;
    }

    _createClass(Photo, [{
        key: 'render',
        value: function render() {
            var url = this.state.url;
            var _props = this.props;
            var width = _props.width;
            var height = _props.height;
            var iconSize = _props.iconSize;
            var _props$style = _props.style;
            var style = _props$style === undefined ? {} : _props$style;
            var cameraOptions = _props.cameraOptions;
            var overwritable = _props.overwritable;

            var others = _objectWithoutProperties(_props, ['width', 'height', 'iconSize', 'style', 'cameraOptions', 'overwritable']);

            var onPhoto = typeof navigator.camera != 'undefined' ? this.takePhoto.bind(this) : this.selectPhoto.bind(this);
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
                onClick: onPhoto }));
        }
    }, {
        key: 'selectPhoto',
        value: function selectPhoto() {
            var _props2 = this.props;
            var onPhoto = _props2.onPhoto;
            var onFail = _props2.onFail;
            var width = _props2.width;
            var height = _props2.height;
            var autoUpload = _props2.autoUpload;

            selectFile('image', width, height).then(function (_ref) {
                var url = _ref.url;
                var binary = _ref.binary;

                this.setState({ url: url });
                if (autoUpload) _file2.default.upload(binary).then(function (url) {
                    onPhoto && onPhoto(url);
                });else {
                    onPhoto && onPhoto(url);
                }
            }.bind(this), onFail);
        }
    }, {
        key: 'takePhoto',
        value: function takePhoto() {
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
                this.setState({ url: url });
                if (autoUpload) _file2.default.upload(url).then(function (url) {
                    onPhoto && onPhoto(url);
                });else {
                    onPhoto && onPhoto(url);
                }
            }.bind(this), onFail, cameraOptions);
        }
    }]);

    return Photo;
}(_react.Component);

exports.default = Photo;


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
    autoUpload: false
};

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3Bob3RvLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ087O0lBRWM7OztBQUNqQixhQURpQixLQUNqQixDQUFZLEtBQVosRUFBa0I7OEJBREQsT0FDQzs7MkVBREQsa0JBRVAsUUFEUTs7WUFFVCxNQUFLLE1BQUssS0FBTCxDQUFMLElBRlM7O0FBR2QsY0FBSyxLQUFMLEdBQVcsRUFBQyxLQUFJLEdBQUosRUFBWixDQUhjOztLQUFsQjs7aUJBRGlCOztpQ0FNVDtBQUNBLGdCQUFDLE1BQUssS0FBSyxLQUFMLENBQUwsR0FBRCxDQURBO3lCQUU0RSxLQUFLLEtBQUwsQ0FGNUU7Z0JBRUMscUJBRkQ7Z0JBRVEsdUJBRlI7Z0JBRWdCLDJCQUZoQjtzQ0FFMEIsTUFGMUI7Z0JBRTBCLHFDQUFNLGtCQUZoQztnQkFFb0MscUNBRnBDO2dCQUVtRCxtQ0FGbkQ7O2dCQUVvRSxxSEFGcEU7O0FBR0osZ0JBQUksVUFBUSxPQUFPLFVBQVUsTUFBVixJQUFtQixXQUExQixHQUF3QyxLQUFLLFNBQUwsQ0FBZSxJQUFmLENBQW9CLElBQXBCLENBQXhDLEdBQW9FLEtBQUssV0FBTCxDQUFpQixJQUFqQixDQUFzQixJQUF0QixDQUFwRSxDQUhSO0FBSUosZ0JBQUcsQ0FBQyxRQUFELEVBQVU7QUFDVCxzQkFBTSxLQUFOLEdBQVksS0FBWixDQURTO0FBRVQsc0JBQU0sTUFBTixHQUFhLE1BQWIsQ0FGUzthQUFiLE1BR0s7QUFDRCx1QkFBTyxNQUFQLENBQWMsS0FBZCxFQUFvQixRQUFwQixFQURDO2FBSEw7O0FBT0EsZ0JBQUcsR0FBSCxFQUFPO0FBQ0gsb0JBQUcsWUFBSCxFQUNJLE9BQU8sT0FBUCxHQUFlLEtBQUssU0FBTCxDQUFlLElBQWYsQ0FBb0IsSUFBcEIsQ0FBZixDQURKO0FBRUEsdUJBQVEsNkRBQVEsS0FBSyxHQUFM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QUFVLEVBQVY7QUFDQSxxQkFBa0IsT0FBTyxlQUFQLENBQXVCLFFBQXZCO0FBQ2xCLGdCQUFhLE9BQU8saUJBQVAsQ0FBeUIsTUFBekI7QUFDYixlQUFZLEtBQVo7QUFDQSxrQkFBYyxPQUFPLFlBQVAsQ0FBb0IsSUFBcEI7QUFDZCxvQkFBZ0IsSUFBaEI7QUFDQSxzQkFBa0IsS0FBbEI7Q0FQUixDQURBIiwiZmlsZSI6InBob3RvLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCdcbmltcG9ydCB7QXZhdGFyfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxuaW1wb3J0IEljb25DYW1lcmEgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ltYWdlL3Bob3RvLWNhbWVyYSdcbmltcG9ydCBkYkZpbGUgZnJvbSAnLi4vZGIvZmlsZSdcbmltcG9ydCB7bWFpbn0gZnJvbSAnLi9maWxlLXNlbGVjdG9yJ1xuY29uc3Qge3NlbGVjdEZpbGV9PW1haW5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGhvdG8gZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdmFyIHtzcmN9PXRoaXMucHJvcHNcbiAgICAgICAgdGhpcy5zdGF0ZT17dXJsOnNyY31cbiAgICB9XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciB7dXJsfT10aGlzLnN0YXRlLFxuICAgICAgICAgICAge3dpZHRoLCBoZWlnaHQsIGljb25TaXplLCBzdHlsZT17fSwgY2FtZXJhT3B0aW9ucywgb3ZlcndyaXRhYmxlLCAuLi5vdGhlcnN9PXRoaXMucHJvcHM7XG4gICAgICAgIHZhciBvblBob3RvPXR5cGVvZihuYXZpZ2F0b3IuY2FtZXJhKSE9J3VuZGVmaW5lZCcgPyB0aGlzLnRha2VQaG90by5iaW5kKHRoaXMpIDogdGhpcy5zZWxlY3RQaG90by5iaW5kKHRoaXMpXG4gICAgICAgIGlmKCFpY29uU2l6ZSl7XG4gICAgICAgICAgICBzdHlsZS53aWR0aD13aWR0aFxuICAgICAgICAgICAgc3R5bGUuaGVpZ2h0PWhlaWdodFxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oc3R5bGUsaWNvblNpemUpXG4gICAgICAgIH1cblxuICAgICAgICBpZih1cmwpe1xuICAgICAgICAgICAgaWYob3ZlcndyaXRhYmxlKVxuICAgICAgICAgICAgICAgIG90aGVycy5vbkNsaWNrPXRoaXMudGFrZVBob3RvLmJpbmQodGhpcylcbiAgICAgICAgICAgIHJldHVybiAoPEF2YXRhciBzcmM9e3VybH0gc3R5bGU9e3N0eWxlfSB7Li4ub3RoZXJzfS8+KVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHtpY29uUmF0aW8sIC4uLmxlZnRzfT1vdGhlcnMsXG4gICAgICAgICAgICB2aWV3V2lkdGg9TWF0aC5mbG9vcihNYXRoLm1pbihzdHlsZS53aWR0aCwgc3R5bGUuaGVpZ2h0KSppY29uUmF0aW8pLFxuICAgICAgICAgICAgdG9wPU1hdGguZmxvb3IoKHN0eWxlLmhlaWdodC12aWV3V2lkdGgpLzIpLFxuICAgICAgICAgICAgbGVmdD1NYXRoLmZsb29yKChzdHlsZS53aWR0aC12aWV3V2lkdGgpLzIpO1xuICAgICAgICBzdHlsZS53aWR0aD1zdHlsZS5oZWlnaHQ9dmlld1dpZHRoXG4gICAgICAgIHN0eWxlLm1hcmdpbj1gJHt0b3B9cHggJHtsZWZ0fXB4YFxuICAgICAgICByZXR1cm4gKDxJY29uQ2FtZXJhIHsuLi5sZWZ0c31cbiAgICAgICAgICAgICAgICBzdHlsZT17c3R5bGV9XG4gICAgICAgICAgICAgICAgY29sb3I9XCJsaWdodGdyYXlcIlxuICAgICAgICAgICAgICAgIGhvdmVyQ29sb3I9XCJsaWdodGJsdWVcIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e29uUGhvdG99Lz4pXG4gICAgfVxuXG4gICAgc2VsZWN0UGhvdG8oKXtcbiAgICAgICAgdmFyIHtvblBob3RvLCBvbkZhaWwsIHdpZHRoLCBoZWlnaHQsIGF1dG9VcGxvYWR9PXRoaXMucHJvcHNcbiAgICAgICAgc2VsZWN0RmlsZSgnaW1hZ2UnLCB3aWR0aCwgaGVpZ2h0KS5cbiAgICAgICAgICAgIHRoZW4oZnVuY3Rpb24oe3VybCxiaW5hcnl9KXtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt1cmw6dXJsfSlcbiAgICAgICAgICAgICAgICBpZihhdXRvVXBsb2FkKVxuICAgICAgICAgICAgICAgICAgICBkYkZpbGUudXBsb2FkKGJpbmFyeSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHVybCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25QaG90byAmJiBvblBob3RvKHVybClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG9uUGhvdG8gJiYgb25QaG90byh1cmwpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpLCBvbkZhaWwpXG4gICAgfVxuXG4gICAgdGFrZVBob3RvKCl7XG4gICAgICAgIHZhciB7b25QaG90bywgb25GYWlsLCB3aWR0aCwgaGVpZ2h0LCBjYW1lcmFPcHRpb25zLCBhdXRvVXBsb2FkfT10aGlzLnByb3BzXG4gICAgICAgIGNhbWVyYU9wdGlvbnMudGFyZ2V0V2lkdGg9d2lkdGhcbiAgICAgICAgY2FtZXJhT3B0aW9ucy50YXJnZXRIZWlnaHQ9aGVpZ2h0XG4gICAgICAgIG5hdmlnYXRvci5jYW1lcmEuZ2V0UGljdHVyZShmdW5jdGlvbih1cmwpe1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3VybDp1cmx9KTtcbiAgICAgICAgICAgICAgICBpZihhdXRvVXBsb2FkKVxuICAgICAgICAgICAgICAgICAgICBkYkZpbGUudXBsb2FkKHVybClcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHVybCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25QaG90byAmJiBvblBob3RvKHVybClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG9uUGhvdG8gJiYgb25QaG90byh1cmwpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpLCBvbkZhaWwsIGNhbWVyYU9wdGlvbnMpXG4gICAgfVxufVxuXG5QaG90by5wcm9wVHlwZXM9e1xuICAgIGNhbWVyYU9wdGlvbnM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG4gICAgb25QaG90bzogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25GYWlsOiBSZWFjdC5Qcm9wVHlwZXMuZnVuY1xufVxuXG5QaG90by5kZWZhdWx0UHJvcHM9e1xuICAgIHdpZHRoOjEwMjQsXG4gICAgaGVpZ2h0OjEwMjQsXG4gICAgaWNvblJhdGlvOjAuNSxcbiAgICBvdmVyd3JpdGFibGU6ZmFsc2UsXG4gICAgYXV0b1VwbG9hZDpmYWxzZVxufVxuXG50eXBlb2YoQ2FtZXJhKSE9J3VuZGVmaW5lZCcgJiYgKFxuUGhvdG8uZGVmYXVsdFByb3BzLmNhbWVyYU9wdGlvbnM9e1xuICAgICAgICBxdWFsaXR5IDogNzUsXG4gICAgICAgIGRlc3RpbmF0aW9uVHlwZSA6IENhbWVyYS5EZXN0aW5hdGlvblR5cGUuRklMRV9VUkksXG4gICAgICAgIHNvdXJjZVR5cGUgOiBDYW1lcmEuUGljdHVyZVNvdXJjZVR5cGUuQ0FNRVJBLFxuICAgICAgICBhbGxvd0VkaXQgOiBmYWxzZSxcbiAgICAgICAgZW5jb2RpbmdUeXBlOiBDYW1lcmEuRW5jb2RpbmdUeXBlLkpQRUcsXG4gICAgICAgIHBvcG92ZXJPcHRpb25zOiBudWxsLFxuICAgICAgICBzYXZlVG9QaG90b0FsYnVtOiBmYWxzZVxuICAgIH0pO1xuIl19