'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var Component = React.Component;
var IconCamera = require('material-ui/lib/svg-icons/image/photo-camera');
var dbFile = require('../db/file');
var selectFile = require('./file-selector').main;
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
                return React.createElement('img', _extends({ src: url, style: style }, others));
            }

            var iconRatio = others.iconRatio;
            var lefts = _objectWithoutProperties(others, ['iconRatio']);
            var viewWidth = Math.floor(Math.min(style.width, style.height) * iconRatio);
            var top = Math.floor((style.height - viewWidth) / 2);
            var left = Math.floor((style.width - viewWidth) / 2);
            style.width = style.height = viewWidth;
            style.margin = top + 'px ' + left + 'px';
            return React.createElement(IconCamera, _extends({}, lefts, {
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
                if (autoUpload) dbFile.upload(binary).then(function (url) {
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
                if (autoUpload) dbFile.upload(url).then(function (url) {
                    onPhoto && onPhoto(url);
                });else {
                    onPhoto && onPhoto(url);
                }
            }.bind(this), onFail, cameraOptions);
        }
    }]);

    return Photo;
}(Component);

exports.default = Photo;


Photo.propTypes = {
    cameraOptions: React.PropTypes.object,
    onPhoto: React.PropTypes.func,
    onFail: React.PropTypes.func
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3Bob3RvLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFJLFlBQU0sUUFBUSxPQUFSLENBQU47QUFDQSxJQUFDLFlBQVcsTUFBWCxTQUFEO0FBQ0EsaUJBQVcsUUFBUSw4Q0FBUixDQUFYO0FBQ0EsYUFBTyxRQUFRLFlBQVIsQ0FBUDtBQUNBLGlCQUFXLFFBQVEsaUJBQVIsRUFBMkIsSUFBM0I7SUFFTTs7O0FBQ2pCLGFBRGlCLEtBQ2pCLENBQVksS0FBWixFQUFrQjs4QkFERCxPQUNDOzsyRUFERCxrQkFFUCxRQURROztZQUVULE1BQUssTUFBSyxLQUFMLENBQUwsSUFGUzs7QUFHZCxjQUFLLEtBQUwsR0FBVyxFQUFDLEtBQUksR0FBSixFQUFaLENBSGM7O0tBQWxCOztpQkFEaUI7O2lDQU1UO0FBQ0EsZ0JBQUMsTUFBSyxLQUFLLEtBQUwsQ0FBTCxHQUFELENBREE7eUJBRTRFLEtBQUssS0FBTCxDQUY1RTtnQkFFQyxxQkFGRDtnQkFFUSx1QkFGUjtnQkFFZ0IsMkJBRmhCO3NDQUUwQixNQUYxQjtnQkFFMEIscUNBQU0sa0JBRmhDO2dCQUVvQyxxQ0FGcEM7Z0JBRW1ELG1DQUZuRDs7Z0JBRW9FLHFIQUZwRTs7QUFHSixnQkFBSSxVQUFRLE9BQU8sVUFBVSxNQUFWLElBQW1CLFdBQTFCLEdBQXdDLEtBQUssU0FBTCxDQUFlLElBQWYsQ0FBb0IsSUFBcEIsQ0FBeEMsR0FBb0UsS0FBSyxXQUFMLENBQWlCLElBQWpCLENBQXNCLElBQXRCLENBQXBFLENBSFI7QUFJSixnQkFBRyxDQUFDLFFBQUQsRUFBVTtBQUNULHNCQUFNLEtBQU4sR0FBWSxLQUFaLENBRFM7QUFFVCxzQkFBTSxNQUFOLEdBQWEsTUFBYixDQUZTO2FBQWIsTUFHSztBQUNELHVCQUFPLE1BQVAsQ0FBYyxLQUFkLEVBQW9CLFFBQXBCLEVBREM7YUFITDs7QUFPQSxnQkFBRyxHQUFILEVBQU87QUFDSCxvQkFBRyxZ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QVY7QUFDQSxrQkFBYSxLQUFiO0FBQ0EsZ0JBQVcsS0FBWDtDQUxKOztBQVFBLE9BQU8sTUFBUCxJQUFnQixXQUFoQixLQUNBLE1BQU0sWUFBTixDQUFtQixhQUFuQixHQUFpQztBQUN6QixhQUFVLEVBQVY7QUFDQSxxQkFBa0IsT0FBTyxlQUFQLENBQXVCLFFBQXZCO0FBQ2xCLGdCQUFhLE9BQU8saUJBQVAsQ0FBeUIsTUFBekI7QUFDYixlQUFZLEtBQVo7QUFDQSxrQkFBYyxPQUFPLFlBQVAsQ0FBb0IsSUFBcEI7QUFDZCxvQkFBZ0IsSUFBaEI7QUFDQSxzQkFBa0IsS0FBbEI7Q0FQUixDQURBIiwiZmlsZSI6InBob3RvLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIFJlYWN0PXJlcXVpcmUoJ3JlYWN0JyksXG4gICAge0NvbXBvbmVudH09UmVhY3QsXG4gICAgSWNvbkNhbWVyYT1yZXF1aXJlKCdtYXRlcmlhbC11aS9saWIvc3ZnLWljb25zL2ltYWdlL3Bob3RvLWNhbWVyYScpLFxuICAgIGRiRmlsZT1yZXF1aXJlKCcuLi9kYi9maWxlJyksXG4gICAgc2VsZWN0RmlsZT1yZXF1aXJlKCcuL2ZpbGUtc2VsZWN0b3InKS5tYWluO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQaG90byBleHRlbmRzIENvbXBvbmVudHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB2YXIge3NyY309dGhpcy5wcm9wc1xuICAgICAgICB0aGlzLnN0YXRlPXt1cmw6c3JjfVxuICAgIH1cbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIHt1cmx9PXRoaXMuc3RhdGUsXG4gICAgICAgICAgICB7d2lkdGgsIGhlaWdodCwgaWNvblNpemUsIHN0eWxlPXt9LCBjYW1lcmFPcHRpb25zLCBvdmVyd3JpdGFibGUsIC4uLm90aGVyc309dGhpcy5wcm9wcztcbiAgICAgICAgdmFyIG9uUGhvdG89dHlwZW9mKG5hdmlnYXRvci5jYW1lcmEpIT0ndW5kZWZpbmVkJyA/IHRoaXMudGFrZVBob3RvLmJpbmQodGhpcykgOiB0aGlzLnNlbGVjdFBob3RvLmJpbmQodGhpcylcbiAgICAgICAgaWYoIWljb25TaXplKXtcbiAgICAgICAgICAgIHN0eWxlLndpZHRoPXdpZHRoXG4gICAgICAgICAgICBzdHlsZS5oZWlnaHQ9aGVpZ2h0XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihzdHlsZSxpY29uU2l6ZSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHVybCl7XG4gICAgICAgICAgICBpZihvdmVyd3JpdGFibGUpXG4gICAgICAgICAgICAgICAgb3RoZXJzLm9uQ2xpY2s9dGhpcy50YWtlUGhvdG8uYmluZCh0aGlzKVxuICAgICAgICAgICAgcmV0dXJuICg8aW1nIHNyYz17dXJsfSBzdHlsZT17c3R5bGV9IHsuLi5vdGhlcnN9Lz4pXG4gICAgICAgIH1cblxuICAgICAgICB2YXIge2ljb25SYXRpbywgLi4ubGVmdHN9PW90aGVycyxcbiAgICAgICAgICAgIHZpZXdXaWR0aD1NYXRoLmZsb29yKE1hdGgubWluKHN0eWxlLndpZHRoLCBzdHlsZS5oZWlnaHQpKmljb25SYXRpbyksXG4gICAgICAgICAgICB0b3A9TWF0aC5mbG9vcigoc3R5bGUuaGVpZ2h0LXZpZXdXaWR0aCkvMiksXG4gICAgICAgICAgICBsZWZ0PU1hdGguZmxvb3IoKHN0eWxlLndpZHRoLXZpZXdXaWR0aCkvMik7XG4gICAgICAgIHN0eWxlLndpZHRoPXN0eWxlLmhlaWdodD12aWV3V2lkdGhcbiAgICAgICAgc3R5bGUubWFyZ2luPWAke3RvcH1weCAke2xlZnR9cHhgXG4gICAgICAgIHJldHVybiAoPEljb25DYW1lcmEgey4uLmxlZnRzfVxuICAgICAgICAgICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgICAgICAgICAgICBjb2xvcj1cImxpZ2h0Z3JheVwiXG4gICAgICAgICAgICAgICAgaG92ZXJDb2xvcj1cImxpZ2h0Ymx1ZVwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17b25QaG90b30vPilcbiAgICB9XG5cbiAgICBzZWxlY3RQaG90bygpe1xuICAgICAgICB2YXIge29uUGhvdG8sIG9uRmFpbCwgd2lkdGgsIGhlaWdodCwgYXV0b1VwbG9hZH09dGhpcy5wcm9wc1xuICAgICAgICBzZWxlY3RGaWxlKCdpbWFnZScsIHdpZHRoLCBoZWlnaHQpLlxuICAgICAgICAgICAgdGhlbihmdW5jdGlvbih7dXJsLGJpbmFyeX0pe1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3VybDp1cmx9KVxuICAgICAgICAgICAgICAgIGlmKGF1dG9VcGxvYWQpXG4gICAgICAgICAgICAgICAgICAgIGRiRmlsZS51cGxvYWQoYmluYXJ5KVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24odXJsKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblBob3RvICYmIG9uUGhvdG8odXJsKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb25QaG90byAmJiBvblBob3RvKHVybClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LmJpbmQodGhpcyksIG9uRmFpbClcbiAgICB9XG5cbiAgICB0YWtlUGhvdG8oKXtcbiAgICAgICAgdmFyIHtvblBob3RvLCBvbkZhaWwsIHdpZHRoLCBoZWlnaHQsIGNhbWVyYU9wdGlvbnMsIGF1dG9VcGxvYWR9PXRoaXMucHJvcHNcbiAgICAgICAgY2FtZXJhT3B0aW9ucy50YXJnZXRXaWR0aD13aWR0aFxuICAgICAgICBjYW1lcmFPcHRpb25zLnRhcmdldEhlaWdodD1oZWlnaHRcbiAgICAgICAgbmF2aWdhdG9yLmNhbWVyYS5nZXRQaWN0dXJlKGZ1bmN0aW9uKHVybCl7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dXJsOnVybH0pO1xuICAgICAgICAgICAgICAgIGlmKGF1dG9VcGxvYWQpXG4gICAgICAgICAgICAgICAgICAgIGRiRmlsZS51cGxvYWQodXJsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24odXJsKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblBob3RvICYmIG9uUGhvdG8odXJsKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb25QaG90byAmJiBvblBob3RvKHVybClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LmJpbmQodGhpcyksIG9uRmFpbCwgY2FtZXJhT3B0aW9ucylcbiAgICB9XG59XG5cblBob3RvLnByb3BUeXBlcz17XG4gICAgY2FtZXJhT3B0aW9uczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcbiAgICBvblBob3RvOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICBvbkZhaWw6IFJlYWN0LlByb3BUeXBlcy5mdW5jXG59XG5cblBob3RvLmRlZmF1bHRQcm9wcz17XG4gICAgd2lkdGg6MTAyNCxcbiAgICBoZWlnaHQ6MTAyNCxcbiAgICBpY29uUmF0aW86MC41LFxuICAgIG92ZXJ3cml0YWJsZTpmYWxzZSxcbiAgICBhdXRvVXBsb2FkOmZhbHNlXG59XG5cbnR5cGVvZihDYW1lcmEpIT0ndW5kZWZpbmVkJyAmJiAoXG5QaG90by5kZWZhdWx0UHJvcHMuY2FtZXJhT3B0aW9ucz17XG4gICAgICAgIHF1YWxpdHkgOiA3NSxcbiAgICAgICAgZGVzdGluYXRpb25UeXBlIDogQ2FtZXJhLkRlc3RpbmF0aW9uVHlwZS5GSUxFX1VSSSxcbiAgICAgICAgc291cmNlVHlwZSA6IENhbWVyYS5QaWN0dXJlU291cmNlVHlwZS5DQU1FUkEsXG4gICAgICAgIGFsbG93RWRpdCA6IGZhbHNlLFxuICAgICAgICBlbmNvZGluZ1R5cGU6IENhbWVyYS5FbmNvZGluZ1R5cGUuSlBFRyxcbiAgICAgICAgcG9wb3Zlck9wdGlvbnM6IG51bGwsXG4gICAgICAgIHNhdmVUb1Bob3RvQWxidW06IGZhbHNlXG4gICAgfSk7XG4iXX0=