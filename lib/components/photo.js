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
            var _this2 = this;

            var _props2 = this.props;
            var onPhoto = _props2.onPhoto;
            var onFail = _props2.onFail;
            var width = _props2.width;
            var height = _props2.height;
            var autoUpload = _props2.autoUpload;

            (0, _fileSelector.selectImageFile)(width, height).then(function (_ref) {
                var url = _ref.url;
                var binary = _ref.binary;

                _this2.setState({ url: url });
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
            var _this3 = this;

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
                _this3.setState({ url: url });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3Bob3RvLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7Ozs7Ozt1TUFDakIsUUFBTSxFQUFDLEtBQUksTUFBSyxLQUFMLENBQVcsR0FBWDs7O2lCQURNOztpQ0FHVDtBQUNBLGdCQUFDLE1BQUssS0FBSyxLQUFMLENBQUwsR0FBRCxDQURBO3lCQUU0RSxLQUFLLEtBQUwsQ0FGNUU7Z0JBRUMscUJBRkQ7Z0JBRVEsdUJBRlI7Z0JBRWdCLDJCQUZoQjtzQ0FFMEIsTUFGMUI7Z0JBRTBCLHFDQUFNLGtCQUZoQztnQkFFb0MscUNBRnBDO2dCQUVtRCxtQ0FGbkQ7O2dCQUVvRSxxSEFGcEU7O0FBR0osZ0JBQUksVUFBUSxPQUFPLFVBQVUsTUFBVixJQUFtQixXQUExQixHQUF3QyxLQUFLLFNBQUwsQ0FBZSxJQUFmLENBQW9CLElBQXBCLENBQXhDLEdBQW9FLEtBQUssV0FBTCxDQUFpQixJQUFqQixDQUFzQixJQUF0QixDQUFwRSxDQUhSO0FBSUosZ0JBQUcsQ0FBQyxRQUFELEVBQVU7QUFDVCxzQkFBTSxLQUFOLEdBQVksS0FBWixDQURTO0FBRVQsc0JBQU0sTUFBTixHQUFhLE1BQWIsQ0FGUzthQUFiLE1BR0s7QUFDRCx1QkFBTyxNQUFQLENBQWMsS0FBZCxFQUFvQixRQUFwQixFQURDO2FBSEw7O0FBT0EsZ0JBQUcsR0FBSCxFQUFPO0FBQ0gsb0JBQUcsWUFBSCxFQUNJLE9BQU8sT0FBUCxHQUFlLEtBQUssU0FBTCxDQUFlLElBQWYsQ0FBb0IsSUFBcEIsQ0FBZixDQURKO0FBRUEsdUJBQVEsNkRBQVEsS0FBSyxHQUFMLEVBQVUsT0FBTyxLQUFQLElBQWtCLE9BQXBDLENBQVIsQ0FIRzthQUFQOztnQkFNSyxZQUFxQixPQUFyQixVQWpCRDtBQWlCQSxnQkFBZSxpQ0FBTyxzQkFBdEIsQ0FqQkE7QUFrQkEsNEJBQVUsS0FBSyxLQUFMLENBQVcsS0FBSyxHQUFMLENBQVMsTUFBTSxLQUFOLEVBQWEsTUFBTSxNQUFOLENBQXRCLEdBQW9DLFNBQXBDLENBQXJCLENBbEJBO0FBbUJBLHNCQUFJLEtBQUssS0FBTCxDQUFXLENBQUMsTUFBTSxNQUFOLEdBQWEsU0FBYixDQUFELEdBQXlCLENBQXpCLENBQWYsQ0FuQkE7QUFvQkEsdUJBQUssS0FBSyxLQUFMLENBQVcsQ0FBQyxNQUFNLEtBQU4sR0FBWSxTQUFaLENBQUQsR0FBd0IsQ0FBeEIsQ0FBaEIsQ0FwQkE7QUFxQkosa0JBQU0sS0FBTixHQUFZLE1BQU0sTUFBTixHQUFhLFNBQWIsQ0FyQlI7QUFzQkosa0JBQU0sTUFBTixHQUFnQixjQUFTLFdBQXpCLENBdEJJO0FBdUJKLG1CQUFRLGtFQUFnQjtBQUNoQix1QkFBTyxLQUFQO0FBQ0EsdUJBQU0sV0FBTjtBQUNBLDRCQUFXLFdBQVg7QUFDQSx5QkFBUyxPQUFULEdBSkEsQ0FBUixDQXZCSTs7OztzQ0E4Qks7OzswQkFDd0MsS0FBSyxLQUFMLENBRHhDO2dCQUNKLDBCQURJO2dCQUNLLHdCQURMO2dCQUNhLHNCQURiO2dCQUNvQix3QkFEcEI7Z0JBQzRCLGdDQUQ1Qjs7QUFFVCwrQ0FBZ0IsS0FBaEIsRUFBdUIsTUFBdkIsRUFDSSxJQURKLENBQ1MsZ0JBQWdCO29CQUFkLGVBQWM7b0JBQVYscUJBQVU7O0FBQ2pCLHVCQUFLLFFBQUwsQ0FBYyxFQUFDLFFBQUQsRUFBZCxFQURpQjtBQUVqQixvQkFBRyxVQUFILEVBQWM7QUFDVixtQ0FBTyxNQUFQLENBQWMsTUFBZCxFQUNLLElBREwsQ0FDVSxlQUFLO0FBQ1AsbUNBQVcsUUFBUSxHQUFSLENBQVgsQ0FETztxQkFBTCxDQURWLENBRFU7aUJBQWQsTUFLTTtBQUNGLCtCQUFXLFFBQVEsR0FBUixDQUFYLENBREU7aUJBTE47YUFGQyxFQVVGLE1BWFAsRUFGUzs7OztvQ0FnQkY7OzswQkFDeUQsS0FBSyxLQUFMLENBRHpEO2dCQUNGLDBCQURFO2dCQUNPLHdCQURQO2dCQUNlLHNCQURmO2dCQUNzQix3QkFEdEI7Z0JBQzhCLHNDQUQ5QjtnQkFDNkMsZ0NBRDdDOztBQUVQLDBCQUFjLFdBQWQsR0FBMEIsS0FBMUIsQ0FGTztBQUdQLDBCQUFjLFlBQWQsR0FBMkIsTUFBM0IsQ0FITztBQUlQLHNCQUFVLE1BQVYsQ0FBaUIsVUFBakIsQ0FBNEIsZUFBSztBQUN6Qix1QkFBSyxRQUFMLENBQWMsRUFBQyxRQUFELEVBQWQsRUFEeUI7QUFFekIsb0JBQUcsVUFBSCxFQUFjO0FBQ1YsbUNBQU8sTUFBUCxDQUFjLEdBQWQsRUFDSyxJQURMLENBQ1UsZUFBSztBQUNQLG1DQUFXLFFBQVEsR0FBUixDQUFYLENBRE87cUJBQUwsQ0FEVixDQURVO2lCQUFkLE1BS087QUFDSCwrQkFBVyxRQUFRLEdBQVIsQ0FBWCxDQURHO2lCQUxQO2FBRm9CLEVBVXJCLE1BVlAsRUFVZSxhQVZmLEVBSk87Ozs7bUNBaUJEO0FBQ04sbUJBQU8sS0FBSyxLQUFMLENBQVcsR0FBWCxDQUREOzs7O1dBbEVPOzs7TUFxRVYsWUFBVTtBQUNiLG1CQUFlLGdCQUFNLFNBQU4sQ0FBZ0IsTUFBaEI7QUFDZixhQUFTLGdCQUFNLFNBQU4sQ0FBZ0IsSUFBaEI7QUFDVCxZQUFRLGdCQUFNLFNBQU4sQ0FBZ0IsSUFBaEI7O0FBeEVLLE1BMkVWLGVBQWE7QUFDaEIsV0FBTSxJQUFOO0FBQ0EsWUFBTyxJQUFQO0FBQ0EsZUFBVSxHQUFWO0FBQ0Esa0JBQWEsS0FBYjtBQUNBLGdCQUFXLElBQVg7O2tCQWhGYTs7O0FBcUZyQixPQUFPLE1BQVAsSUFBZ0IsV0FBaEIsS0FDQSxNQUFNLFlBQU4sQ0FBbUIsYUFBbkIsR0FBaUM7QUFDekIsYUFBVSxFQUFWO0FBQ0EscUJBQWtCLE9BQU8sZUFBUCxDQUF1QixRQUF2QjtBQUNsQixnQkFBYSxPQUFPLGlCQUFQLENBQXlCLE1BQXpCO0FBQ2IsZUFBWSxLQUFaO0FBQ0Esa0JBQWMsT0FBTyxZQUFQLENBQW9CLElBQXBCO0FBQ2Qsb0JBQWdCLElBQWhCO0FBQ0Esc0JBQWtCLEtBQWxCO0NBUFIsQ0FEQSIsImZpbGUiOiJwaG90by5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnXG5pbXBvcnQge0F2YXRhcn0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcbmltcG9ydCBJY29uQ2FtZXJhIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9pbWFnZS9waG90by1jYW1lcmEnXG5pbXBvcnQgZGJGaWxlIGZyb20gJy4uL2RiL2ZpbGUnXG5pbXBvcnQge3NlbGVjdEltYWdlRmlsZX0gZnJvbSAnLi9maWxlLXNlbGVjdG9yJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQaG90byBleHRlbmRzIENvbXBvbmVudHtcbiAgICBzdGF0ZT17dXJsOnRoaXMucHJvcHMuc3JjfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciB7dXJsfT10aGlzLnN0YXRlLFxuICAgICAgICAgICAge3dpZHRoLCBoZWlnaHQsIGljb25TaXplLCBzdHlsZT17fSwgY2FtZXJhT3B0aW9ucywgb3ZlcndyaXRhYmxlLCAuLi5vdGhlcnN9PXRoaXMucHJvcHM7XG4gICAgICAgIHZhciBvblBob3RvPXR5cGVvZihuYXZpZ2F0b3IuY2FtZXJhKSE9J3VuZGVmaW5lZCcgPyB0aGlzLnRha2VQaG90by5iaW5kKHRoaXMpIDogdGhpcy5zZWxlY3RQaG90by5iaW5kKHRoaXMpXG4gICAgICAgIGlmKCFpY29uU2l6ZSl7XG4gICAgICAgICAgICBzdHlsZS53aWR0aD13aWR0aFxuICAgICAgICAgICAgc3R5bGUuaGVpZ2h0PWhlaWdodFxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oc3R5bGUsaWNvblNpemUpXG4gICAgICAgIH1cblxuICAgICAgICBpZih1cmwpe1xuICAgICAgICAgICAgaWYob3ZlcndyaXRhYmxlKVxuICAgICAgICAgICAgICAgIG90aGVycy5vbkNsaWNrPXRoaXMudGFrZVBob3RvLmJpbmQodGhpcylcbiAgICAgICAgICAgIHJldHVybiAoPEF2YXRhciBzcmM9e3VybH0gc3R5bGU9e3N0eWxlfSB7Li4ub3RoZXJzfS8+KVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHtpY29uUmF0aW8sIC4uLmxlZnRzfT1vdGhlcnMsXG4gICAgICAgICAgICB2aWV3V2lkdGg9TWF0aC5mbG9vcihNYXRoLm1pbihzdHlsZS53aWR0aCwgc3R5bGUuaGVpZ2h0KSppY29uUmF0aW8pLFxuICAgICAgICAgICAgdG9wPU1hdGguZmxvb3IoKHN0eWxlLmhlaWdodC12aWV3V2lkdGgpLzIpLFxuICAgICAgICAgICAgbGVmdD1NYXRoLmZsb29yKChzdHlsZS53aWR0aC12aWV3V2lkdGgpLzIpO1xuICAgICAgICBzdHlsZS53aWR0aD1zdHlsZS5oZWlnaHQ9dmlld1dpZHRoXG4gICAgICAgIHN0eWxlLm1hcmdpbj1gJHt0b3B9cHggJHtsZWZ0fXB4YFxuICAgICAgICByZXR1cm4gKDxJY29uQ2FtZXJhIHsuLi5sZWZ0c31cbiAgICAgICAgICAgICAgICBzdHlsZT17c3R5bGV9XG4gICAgICAgICAgICAgICAgY29sb3I9XCJsaWdodGdyYXlcIlxuICAgICAgICAgICAgICAgIGhvdmVyQ29sb3I9XCJsaWdodGJsdWVcIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e29uUGhvdG99Lz4pXG4gICAgfVxuXG4gICAgc2VsZWN0UGhvdG8oKXtcbiAgICAgICAgdmFyIHtvblBob3RvLCBvbkZhaWwsIHdpZHRoLCBoZWlnaHQsIGF1dG9VcGxvYWR9PXRoaXMucHJvcHNcbiAgICAgICAgc2VsZWN0SW1hZ2VGaWxlKHdpZHRoLCBoZWlnaHQpLlxuICAgICAgICAgICAgdGhlbigoe3VybCxiaW5hcnl9KT0+e1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3VybH0pXG4gICAgICAgICAgICAgICAgaWYoYXV0b1VwbG9hZCl7XG4gICAgICAgICAgICAgICAgICAgIGRiRmlsZS51cGxvYWQoYmluYXJ5KVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4odXJsPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25QaG90byAmJiBvblBob3RvKHVybClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvblBob3RvICYmIG9uUGhvdG8odXJsKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIG9uRmFpbClcbiAgICB9XG5cbiAgICB0YWtlUGhvdG8oKXtcbiAgICAgICAgdmFyIHtvblBob3RvLCBvbkZhaWwsIHdpZHRoLCBoZWlnaHQsIGNhbWVyYU9wdGlvbnMsIGF1dG9VcGxvYWR9PXRoaXMucHJvcHNcbiAgICAgICAgY2FtZXJhT3B0aW9ucy50YXJnZXRXaWR0aD13aWR0aFxuICAgICAgICBjYW1lcmFPcHRpb25zLnRhcmdldEhlaWdodD1oZWlnaHRcbiAgICAgICAgbmF2aWdhdG9yLmNhbWVyYS5nZXRQaWN0dXJlKHVybD0+e1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3VybH0pXG4gICAgICAgICAgICAgICAgaWYoYXV0b1VwbG9hZCl7XG4gICAgICAgICAgICAgICAgICAgIGRiRmlsZS51cGxvYWQodXJsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4odXJsPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25QaG90byAmJiBvblBob3RvKHVybClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb25QaG90byAmJiBvblBob3RvKHVybClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBvbkZhaWwsIGNhbWVyYU9wdGlvbnMpXG4gICAgfVxuXG4gICAgZ2V0VmFsdWUoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUudXJsXG4gICAgfVxuICAgIHN0YXRpYyBwcm9wVHlwZXM9e1xuICAgICAgICBjYW1lcmFPcHRpb25zOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuICAgICAgICBvblBob3RvOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgb25GYWlsOiBSZWFjdC5Qcm9wVHlwZXMuZnVuY1xuICAgIH1cblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xuICAgICAgICB3aWR0aDoxMDI0LFxuICAgICAgICBoZWlnaHQ6MTAyNCxcbiAgICAgICAgaWNvblJhdGlvOjAuNSxcbiAgICAgICAgb3ZlcndyaXRhYmxlOmZhbHNlLFxuICAgICAgICBhdXRvVXBsb2FkOnRydWVcbiAgICB9XG5cbn1cblxudHlwZW9mKENhbWVyYSkhPSd1bmRlZmluZWQnICYmIChcblBob3RvLmRlZmF1bHRQcm9wcy5jYW1lcmFPcHRpb25zPXtcbiAgICAgICAgcXVhbGl0eSA6IDc1LFxuICAgICAgICBkZXN0aW5hdGlvblR5cGUgOiBDYW1lcmEuRGVzdGluYXRpb25UeXBlLkZJTEVfVVJJLFxuICAgICAgICBzb3VyY2VUeXBlIDogQ2FtZXJhLlBpY3R1cmVTb3VyY2VUeXBlLkNBTUVSQSxcbiAgICAgICAgYWxsb3dFZGl0IDogZmFsc2UsXG4gICAgICAgIGVuY29kaW5nVHlwZTogQ2FtZXJhLkVuY29kaW5nVHlwZS5KUEVHLFxuICAgICAgICBwb3BvdmVyT3B0aW9uczogbnVsbCxcbiAgICAgICAgc2F2ZVRvUGhvdG9BbGJ1bTogZmFsc2VcbiAgICB9KTtcbiJdfQ==