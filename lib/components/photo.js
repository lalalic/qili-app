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

var _require = require("material-ui");

var Avatar = _require.Avatar;
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
                return React.createElement(Avatar, _extends({ src: url, style: style }, others));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3Bob3RvLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFJLFlBQU0sUUFBUSxPQUFSLENBQU47QUFDQSxJQUFDLFlBQVcsTUFBWCxTQUFEOztlQUNTLFFBQVEsYUFBUjs7QUFBVCxJQUFDLHdCQUFEO0FBQ0EsaUJBQVcsUUFBUSw4Q0FBUixDQUFYO0FBQ0EsYUFBTyxRQUFRLFlBQVIsQ0FBUDtBQUNBLGlCQUFXLFFBQVEsaUJBQVIsRUFBMkIsSUFBM0I7SUFFTTs7O0FBQ2pCLGFBRGlCLEtBQ2pCLENBQVksS0FBWixFQUFrQjs4QkFERCxPQUNDOzsyRUFERCxrQkFFUCxRQURROztZQUVULE1BQUssTUFBSyxLQUFMLENBQUwsSUFGUzs7QUFHZCxjQUFLLEtBQUwsR0FBVyxFQUFDLEtBQUksR0FBSixFQUFaLENBSGM7O0tBQWxCOztpQkFEaUI7O2lDQU1UO0FBQ0EsZ0JBQUMsTUFBSyxLQUFLLEtBQUwsQ0FBTCxHQUFELENBREE7eUJBRTRFLEtBQUssS0FBTCxDQUY1RTtnQkFFQyxxQkFGRDtnQkFFUSx1QkFGUjtnQkFFZ0IsMkJBRmhCO3NDQUUwQixNQUYxQjtnQkFFMEIscUNBQU0sa0JBRmhDO2dCQUVvQyxxQ0FGcEM7Z0JBRW1ELG1DQUZuRDs7Z0JBRW9FLHFIQUZwRTs7QUFHSixnQkFBSSxVQUFRLE9BQU8sVUFBVSxNQUFWLElBQW1CLFdBQTFCLEdBQXdDLEtBQUssU0FBTCxDQUFlLElBQWYsQ0FBb0IsSUFBcEIsQ0FBeEMsR0FBb0UsS0FBSyxXQUFMLENBQWlCLElBQWpCLENBQXNCLElBQXRCLENBQXBFLENBSFI7QUFJSixnQkFBRyxDQUFDLFFBQUQsRUFBVTtBQUNULHNCQUFNLEtBQU4sR0FBWSxLQUFaLENBRFM7QUFFVCxzQkFBTSxNQUFOLEdBQWEsTUFBYixDQUZTO2FBQWIsTUFHSztBQUNELHVCQUFPLE1BQVAsQ0FBYyxLQUFkLEVBQW9CLFFBQXBCLEVBREM7YUFITDs7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O0FBQ2YsV0FBTSxJQUFOO0FBQ0EsWUFBTyxJQUFQO0FBQ0EsZUFBVSxHQUFWO0FBQ0Esa0JBQWEsS0FBYjtBQUNBLGdCQUFXLEtBQVg7Q0FMSjs7QUFRQSxPQUFPLE1BQVAsSUFBZ0IsV0FBaEIsS0FDQSxNQUFNLFlBQU4sQ0FBbUIsYUFBbkIsR0FBaUM7QUFDekIsYUFBVSxFQUFWO0FBQ0EscUJBQWtCLE9BQU8sZUFBUCxDQUF1QixRQUF2QjtBQUNsQixnQkFBYSxPQUFPLGlCQUFQLENBQXlCLE1BQXpCO0FBQ2IsZUFBWSxLQUFaO0FBQ0Esa0JBQWMsT0FBTyxZQUFQLENBQW9CLElBQXBCO0FBQ2Qsb0JBQWdCLElBQWhCO0FBQ0Esc0JBQWtCLEtBQWxCO0NBUFIsQ0FEQSIsImZpbGUiOiJwaG90by5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBSZWFjdD1yZXF1aXJlKCdyZWFjdCcpLFxuICAgIHtDb21wb25lbnR9PVJlYWN0LFxuICAgIHtBdmF0YXJ9PXJlcXVpcmUoXCJtYXRlcmlhbC11aVwiKSxcbiAgICBJY29uQ2FtZXJhPXJlcXVpcmUoJ21hdGVyaWFsLXVpL2xpYi9zdmctaWNvbnMvaW1hZ2UvcGhvdG8tY2FtZXJhJyksXG4gICAgZGJGaWxlPXJlcXVpcmUoJy4uL2RiL2ZpbGUnKSxcbiAgICBzZWxlY3RGaWxlPXJlcXVpcmUoJy4vZmlsZS1zZWxlY3RvcicpLm1haW47XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBob3RvIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHZhciB7c3JjfT10aGlzLnByb3BzXG4gICAgICAgIHRoaXMuc3RhdGU9e3VybDpzcmN9XG4gICAgfVxuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIge3VybH09dGhpcy5zdGF0ZSxcbiAgICAgICAgICAgIHt3aWR0aCwgaGVpZ2h0LCBpY29uU2l6ZSwgc3R5bGU9e30sIGNhbWVyYU9wdGlvbnMsIG92ZXJ3cml0YWJsZSwgLi4ub3RoZXJzfT10aGlzLnByb3BzO1xuICAgICAgICB2YXIgb25QaG90bz10eXBlb2YobmF2aWdhdG9yLmNhbWVyYSkhPSd1bmRlZmluZWQnID8gdGhpcy50YWtlUGhvdG8uYmluZCh0aGlzKSA6IHRoaXMuc2VsZWN0UGhvdG8uYmluZCh0aGlzKVxuICAgICAgICBpZighaWNvblNpemUpe1xuICAgICAgICAgICAgc3R5bGUud2lkdGg9d2lkdGhcbiAgICAgICAgICAgIHN0eWxlLmhlaWdodD1oZWlnaHRcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHN0eWxlLGljb25TaXplKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYodXJsKXtcbiAgICAgICAgICAgIGlmKG92ZXJ3cml0YWJsZSlcbiAgICAgICAgICAgICAgICBvdGhlcnMub25DbGljaz10aGlzLnRha2VQaG90by5iaW5kKHRoaXMpXG4gICAgICAgICAgICByZXR1cm4gKDxBdmF0YXIgc3JjPXt1cmx9IHN0eWxlPXtzdHlsZX0gey4uLm90aGVyc30vPilcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB7aWNvblJhdGlvLCAuLi5sZWZ0c309b3RoZXJzLFxuICAgICAgICAgICAgdmlld1dpZHRoPU1hdGguZmxvb3IoTWF0aC5taW4oc3R5bGUud2lkdGgsIHN0eWxlLmhlaWdodCkqaWNvblJhdGlvKSxcbiAgICAgICAgICAgIHRvcD1NYXRoLmZsb29yKChzdHlsZS5oZWlnaHQtdmlld1dpZHRoKS8yKSxcbiAgICAgICAgICAgIGxlZnQ9TWF0aC5mbG9vcigoc3R5bGUud2lkdGgtdmlld1dpZHRoKS8yKTtcbiAgICAgICAgc3R5bGUud2lkdGg9c3R5bGUuaGVpZ2h0PXZpZXdXaWR0aFxuICAgICAgICBzdHlsZS5tYXJnaW49YCR7dG9wfXB4ICR7bGVmdH1weGBcbiAgICAgICAgcmV0dXJuICg8SWNvbkNhbWVyYSB7Li4ubGVmdHN9XG4gICAgICAgICAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICAgICAgICAgIGNvbG9yPVwibGlnaHRncmF5XCJcbiAgICAgICAgICAgICAgICBob3ZlckNvbG9yPVwibGlnaHRibHVlXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtvblBob3RvfS8+KVxuICAgIH1cblxuICAgIHNlbGVjdFBob3RvKCl7XG4gICAgICAgIHZhciB7b25QaG90bywgb25GYWlsLCB3aWR0aCwgaGVpZ2h0LCBhdXRvVXBsb2FkfT10aGlzLnByb3BzXG4gICAgICAgIHNlbGVjdEZpbGUoJ2ltYWdlJywgd2lkdGgsIGhlaWdodCkuXG4gICAgICAgICAgICB0aGVuKGZ1bmN0aW9uKHt1cmwsYmluYXJ5fSl7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dXJsOnVybH0pXG4gICAgICAgICAgICAgICAgaWYoYXV0b1VwbG9hZClcbiAgICAgICAgICAgICAgICAgICAgZGJGaWxlLnVwbG9hZChiaW5hcnkpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbih1cmwpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uUGhvdG8gJiYgb25QaG90byh1cmwpXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvblBob3RvICYmIG9uUGhvdG8odXJsKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSwgb25GYWlsKVxuICAgIH1cblxuICAgIHRha2VQaG90bygpe1xuICAgICAgICB2YXIge29uUGhvdG8sIG9uRmFpbCwgd2lkdGgsIGhlaWdodCwgY2FtZXJhT3B0aW9ucywgYXV0b1VwbG9hZH09dGhpcy5wcm9wc1xuICAgICAgICBjYW1lcmFPcHRpb25zLnRhcmdldFdpZHRoPXdpZHRoXG4gICAgICAgIGNhbWVyYU9wdGlvbnMudGFyZ2V0SGVpZ2h0PWhlaWdodFxuICAgICAgICBuYXZpZ2F0b3IuY2FtZXJhLmdldFBpY3R1cmUoZnVuY3Rpb24odXJsKXtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt1cmw6dXJsfSk7XG4gICAgICAgICAgICAgICAgaWYoYXV0b1VwbG9hZClcbiAgICAgICAgICAgICAgICAgICAgZGJGaWxlLnVwbG9hZCh1cmwpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbih1cmwpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uUGhvdG8gJiYgb25QaG90byh1cmwpXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvblBob3RvICYmIG9uUGhvdG8odXJsKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSwgb25GYWlsLCBjYW1lcmFPcHRpb25zKVxuICAgIH1cbn1cblxuUGhvdG8ucHJvcFR5cGVzPXtcbiAgICBjYW1lcmFPcHRpb25zOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgIG9uUGhvdG86IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIG9uRmFpbDogUmVhY3QuUHJvcFR5cGVzLmZ1bmNcbn1cblxuUGhvdG8uZGVmYXVsdFByb3BzPXtcbiAgICB3aWR0aDoxMDI0LFxuICAgIGhlaWdodDoxMDI0LFxuICAgIGljb25SYXRpbzowLjUsXG4gICAgb3ZlcndyaXRhYmxlOmZhbHNlLFxuICAgIGF1dG9VcGxvYWQ6ZmFsc2Vcbn1cblxudHlwZW9mKENhbWVyYSkhPSd1bmRlZmluZWQnICYmIChcblBob3RvLmRlZmF1bHRQcm9wcy5jYW1lcmFPcHRpb25zPXtcbiAgICAgICAgcXVhbGl0eSA6IDc1LFxuICAgICAgICBkZXN0aW5hdGlvblR5cGUgOiBDYW1lcmEuRGVzdGluYXRpb25UeXBlLkZJTEVfVVJJLFxuICAgICAgICBzb3VyY2VUeXBlIDogQ2FtZXJhLlBpY3R1cmVTb3VyY2VUeXBlLkNBTUVSQSxcbiAgICAgICAgYWxsb3dFZGl0IDogZmFsc2UsXG4gICAgICAgIGVuY29kaW5nVHlwZTogQ2FtZXJhLkVuY29kaW5nVHlwZS5KUEVHLFxuICAgICAgICBwb3BvdmVyT3B0aW9uczogbnVsbCxcbiAgICAgICAgc2F2ZVRvUGhvdG9BbGJ1bTogZmFsc2VcbiAgICB9KTtcbiJdfQ==