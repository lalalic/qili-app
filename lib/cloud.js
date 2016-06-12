'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('.');

var _app = require('./db/app');

var _app2 = _interopRequireDefault(_app);

var _fileUpload = require('material-ui/svg-icons/file/file-upload');

var _fileUpload2 = _interopRequireDefault(_fileUpload);

var _save = require('material-ui/svg-icons/content/save');

var _save2 = _interopRequireDefault(_save);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CommandBar = _.UI.CommandBar;
var fileSelector = _.UI.fileSelector;

var Cloud = function (_Component) {
    _inherits(Cloud, _Component);

    function Cloud(props) {
        _classCallCheck(this, Cloud);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Cloud).apply(this, arguments));

        _this.state = { cloudCode: _this.props.app.cloudCode };
        return _this;
    }

    _createClass(Cloud, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement('textarea', { ref: 'cloudCode',
                    value: this.state.cloudCode,
                    onBlur: function onBlur(e) {
                        return _this2.setState({ cloudCode: e.target.value });
                    },
                    placeholder: 'Cloud code',
                    style: { position: 'absolute', height: '100%', top: 0, lineHeight: '2em',
                        margin: 0, width: '100%', padding: 10, paddingBottom: 51, border: 0 } }),
                _react2.default.createElement(CommandBar, { className: 'footbar',
                    onSelect: function onSelect(cmd) {
                        return _this2.onSelect(cmd);
                    },
                    items: [{ action: "Back" }, { action: "Upload", icon: _fileUpload2.default }, { action: "Save", icon: _save2.default }] })
            );
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps) {
            if (this.props.app != newProps.app) this.setState({ cloudCode: newProps.app.cloudCode });
        }
    }, {
        key: 'onSelect',
        value: function onSelect(cmd) {
            var _this3 = this;

            var self = this,
                app = this.props.app;
            switch (cmd) {
                case 'Upload':
                    fileSelector.selectTextFile().then(function (_ref) {
                        var cloudCode = _ref.data;

                        _this3.setState({ cloudCode: cloudCode });
                        _this3.onSelect('Save');
                    });
                    break;
                case 'Save':
                    var value = this.state.cloudCode;
                    if (value == app.cloudCode) return;
                    app.cloudCode = this.checkCode(value);
                    _app2.default.upsert(app);
                    break;
            }
        }
    }, {
        key: 'checkCode',
        value: function checkCode(code) {
            //@TODO
            return code;
        }
    }]);

    return Cloud;
}(_react.Component);

exports.default = Cloud;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jbG91ZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFTztJQUFZOztJQUVFOzs7QUFDakIsYUFEaUIsS0FDakIsQ0FBWSxLQUFaLEVBQWtCOzhCQURELE9BQ0M7OzJFQURELG1CQUVKLFlBREs7O0FBRWQsY0FBSyxLQUFMLEdBQVcsRUFBQyxXQUFVLE1BQUssS0FBTCxDQUFXLEdBQVgsQ0FBZSxTQUFmLEVBQXRCLENBRmM7O0tBQWxCOztpQkFEaUI7O2lDQUtUOzs7QUFDSixtQkFDSTs7O2dCQUNJLDRDQUFVLEtBQUksV0FBSjtBQUNOLDJCQUFPLEtBQUssS0FBTCxDQUFXLFNBQVg7QUFDUCw0QkFBUSxnQkFBQyxDQUFEOytCQUFLLE9BQUssUUFBTCxDQUFjLEVBQUMsV0FBVSxFQUFFLE1BQUYsQ0FBUyxLQUFULEVBQXpCO3FCQUFMO0FBQ1IsaUNBQVksWUFBWjtBQUNBLDJCQUFPLEVBQUMsVUFBUyxVQUFULEVBQXFCLFFBQVEsTUFBUixFQUFnQixLQUFJLENBQUosRUFBTSxZQUFXLEtBQVg7QUFDL0MsZ0NBQU8sQ0FBUCxFQUFTLE9BQU0sTUFBTixFQUFjLFNBQVEsRUFBUixFQUFZLGVBQWMsRUFBZCxFQUFpQixRQUFPLENBQVAsRUFEeEQsRUFKSixDQURKO2dCQU9JLDhCQUFDLFVBQUQsSUFBWSxXQUFVLFNBQVY7QUFDUiw4QkFBVTsrQkFBSyxPQUFLLFFBQUwsQ0FBYyxHQUFkO3FCQUFMO0FBQ1YsMkJBQU8sQ0FDSCxFQUFDLFFBQU8sTUFBUCxFQURFLEVBRUgsRUFBQyxRQUFPLFFBQVAsRUFBaUIsMEJBQWxCLEVBRkcsRUFHSCxFQUFDLFFBQU8sTUFBUCxFQUFjLG9CQUFmLEVBSEcsQ0FBUCxFQUZKLENBUEo7YUFESixDQURJOzs7O2tEQW1Ca0IsVUFBUztBQUMvQixnQkFBRyxLQUFLLEtBQUwsQ0FBVyxHQUFYLElBQWdCLFNBQVMsR0FBVCxFQUNmLEtBQUssUUFBTCxDQUFjLEVBQUMsV0FBVSxTQUFTLEdBQVQsQ0FBYSxTQUFiLEVBQXpCLEVBREo7Ozs7aUNBSUssS0FBSTs7O0FBQ2YsZ0JBQUksT0FBSyxJQUFMO2dCQUFXLE1BQUksS0FBSyxLQUFMLENBQVcsR0FBWCxDQURKO0FBRVQsb0JBQU8sR0FBUDtBQUNBLHFCQUFLLFFBQUw7QUFDTCxpQ0FBYSxjQUFiLEdBQThCLElBQTlCLENBQW1DLGdCQUFvQjs0QkFBYixpQkFBTCxLQUFrQjs7QUFDMUMsK0JBQUssUUFBTCxDQUFjLEVBQUMsb0JBQUQsRUFBZCxFQUQwQztBQUUxQywrQkFBSyxRQUFMLENBQWMsTUFBZCxFQUYwQztxQkFBcEIsQ0FBbkMsQ0FESztBQUtBLDBCQUxBO0FBREEscUJBT0ssTUFBTDtBQUNMLHdCQUFJLFFBQU0sS0FBSyxLQUFMLENBQVcsU0FBWCxDQURMO0FBRUwsd0JBQUcsU0FBTyxJQUFJLFNBQUosRUFDVCxPQUREO0FBRUEsd0JBQUksU0FBSixHQUFjLEtBQUssU0FBTCxDQUFlLEtBQWYsQ0FBZCxDQUpLO0FBS0wsa0NBQUksTUFBSixDQUFXLEdBQVgsRUFMSztBQU1BLDBCQU5BO0FBUEEsYUFGUzs7OztrQ0FtQkgsTUFBSzs7QUFFWCxtQkFBTyxJQUFQLENBRlc7Ozs7V0FoREUiLCJmaWxlIjoiY2xvdWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge1VJfSBmcm9tICcuJ1xuaW1wb3J0IEFwcCBmcm9tICcuL2RiL2FwcCdcblxuaW1wb3J0IFVwbG9hZCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ZpbGUvZmlsZS11cGxvYWRcIlxuaW1wb3J0IFNhdmUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9jb250ZW50L3NhdmVcIlxuXG5jb25zdCB7Q29tbWFuZEJhciwgZmlsZVNlbGVjdG9yfT1VSVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDbG91ZCBleHRlbmRzIENvbXBvbmVudHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cylcbiAgICAgICAgdGhpcy5zdGF0ZT17Y2xvdWRDb2RlOnRoaXMucHJvcHMuYXBwLmNsb3VkQ29kZX1cbiAgICB9XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHJldHVybihcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPHRleHRhcmVhIHJlZj1cImNsb3VkQ29kZVwiXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLmNsb3VkQ29kZX1cbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXsoZSk9PnRoaXMuc2V0U3RhdGUoe2Nsb3VkQ29kZTplLnRhcmdldC52YWx1ZX0pfVxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkNsb3VkIGNvZGVcIlxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e3Bvc2l0aW9uOidhYnNvbHV0ZScsIGhlaWdodDogJzEwMCUnLCB0b3A6MCxsaW5lSGVpZ2h0OicyZW0nLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luOjAsd2lkdGg6JzEwMCUnLCBwYWRkaW5nOjEwLCBwYWRkaW5nQm90dG9tOjUxLGJvcmRlcjowfX0vPlxuICAgICAgICAgICAgICAgIDxDb21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxuICAgICAgICAgICAgICAgICAgICBvblNlbGVjdD17Y21kPT50aGlzLm9uU2VsZWN0KGNtZCl9XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zPXtbXG4gICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOlwiQmFja1wifSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJVcGxvYWRcIiwgaWNvbjpVcGxvYWR9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcIlNhdmVcIixpY29uOlNhdmV9XX0vPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5ld1Byb3BzKXtcbiAgICAgICAgaWYodGhpcy5wcm9wcy5hcHAhPW5ld1Byb3BzLmFwcClcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2Nsb3VkQ29kZTpuZXdQcm9wcy5hcHAuY2xvdWRDb2RlfSlcbiAgICB9XG5cbiAgICBvblNlbGVjdChjbWQpe1xuXHRcdHZhciBzZWxmPXRoaXMsIGFwcD10aGlzLnByb3BzLmFwcFxuICAgICAgICBzd2l0Y2goY21kKXtcbiAgICAgICAgY2FzZSAnVXBsb2FkJzpcblx0XHRcdGZpbGVTZWxlY3Rvci5zZWxlY3RUZXh0RmlsZSgpLnRoZW4oKHtkYXRhOmNsb3VkQ29kZX0pPT57XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y2xvdWRDb2RlfSlcbiAgICAgICAgICAgICAgICB0aGlzLm9uU2VsZWN0KCdTYXZlJylcbiAgICAgICAgICAgIH0pXG4gICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgJ1NhdmUnOlxuXHRcdFx0dmFyIHZhbHVlPXRoaXMuc3RhdGUuY2xvdWRDb2RlXG5cdFx0XHRpZih2YWx1ZT09YXBwLmNsb3VkQ29kZSlcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0YXBwLmNsb3VkQ29kZT10aGlzLmNoZWNrQ29kZSh2YWx1ZSlcblx0XHRcdEFwcC51cHNlcnQoYXBwKVxuICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hlY2tDb2RlKGNvZGUpe1xuICAgICAgICAvL0BUT0RPXG4gICAgICAgIHJldHVybiBjb2RlXG4gICAgfVxufVxuIl19