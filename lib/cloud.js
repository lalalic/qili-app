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
                    onChange: function onChange(e) {
                        return _this2.setState({ cloudCode: e.target.value });
                    },
                    placeholder: 'Cloud code',
                    style: { position: 'absolute', height: '100%', top: 0, lineHeight: '2em',
                        margin: 0, width: '100%', padding: 10, paddingBottom: 51, border: 0 } }),
                _react2.default.createElement(CommandBar, { className: 'footbar',
                    onSelect: this.onSelect.bind(this),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jbG91ZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFTztJQUFZOztJQUVFOzs7QUFDakIsYUFEaUIsS0FDakIsQ0FBWSxLQUFaLEVBQWtCOzhCQURELE9BQ0M7OzJFQURELG1CQUVKLFlBREs7O0FBRWQsY0FBSyxLQUFMLEdBQVcsRUFBQyxXQUFVLE1BQUssS0FBTCxDQUFXLEdBQVgsQ0FBZSxTQUFmLEVBQXRCLENBRmM7O0tBQWxCOztpQkFEaUI7O2lDQUtUOzs7QUFDSixtQkFDSTs7O2dCQUNJLDRDQUFVLEtBQUksV0FBSjtBQUNOLDJCQUFPLEtBQUssS0FBTCxDQUFXLFNBQVg7QUFDUCw4QkFBVSxrQkFBQyxDQUFEOytCQUFLLE9BQUssUUFBTCxDQUFjLEVBQUMsV0FBVSxFQUFFLE1BQUYsQ0FBUyxLQUFULEVBQXpCO3FCQUFMO0FBQ1YsaUNBQVksWUFBWjtBQUNBLDJCQUFPLEVBQUMsVUFBUyxVQUFULEVBQXFCLFFBQVEsTUFBUixFQUFnQixLQUFJLENBQUosRUFBTSxZQUFXLEtBQVg7QUFDL0MsZ0NBQU8sQ0FBUCxFQUFTLE9BQU0sTUFBTixFQUFjLFNBQVEsRUFBUixFQUFZLGVBQWMsRUFBZCxFQUFpQixRQUFPLENBQVAsRUFEeEQsRUFKSixDQURKO2dCQU9JLDhCQUFDLFVBQUQsSUFBWSxXQUFVLFNBQVY7QUFDUiw4QkFBVSxLQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1CLElBQW5CLENBQVY7QUFDQSwyQkFBTyxDQUNILEVBQUMsUUFBTyxNQUFQLEVBREUsRUFFSCxFQUFDLFFBQU8sUUFBUCxFQUFpQiwwQkFBbEIsRUFGRyxFQUdILEVBQUMsUUFBTyxNQUFQLEVBQWMsb0JBQWYsRUFIRyxDQUFQLEVBRkosQ0FQSjthQURKLENBREk7Ozs7a0RBbUJrQixVQUFTO0FBQy9CLGdCQUFHLEtBQUssS0FBTCxDQUFXLEdBQVgsSUFBZ0IsU0FBUyxHQUFULEVBQ2YsS0FBSyxRQUFMLENBQWMsRUFBQyxXQUFVLFNBQVMsR0FBVCxDQUFhLFNBQWIsRUFBekIsRUFESjs7OztpQ0FJSyxLQUFJOzs7QUFDZixnQkFBSSxPQUFLLElBQUw7Z0JBQVcsTUFBSSxLQUFLLEtBQUwsQ0FBVyxHQUFYLENBREo7QUFFVCxvQkFBTyxHQUFQO0FBQ0EscUJBQUssUUFBTDtBQUNMLGlDQUFhLGNBQWIsR0FBOEIsSUFBOUIsQ0FBbUMsZ0JBQW9COzRCQUFiLGlCQUFMLEtBQWtCOztBQUMxQywrQkFBSyxRQUFMLENBQWMsRUFBQyxvQkFBRCxFQUFkLEVBRDBDO0FBRTFDLCtCQUFLLFFBQUwsQ0FBYyxNQUFkLEVBRjBDO3FCQUFwQixDQUFuQyxDQURLO0FBS0EsMEJBTEE7QUFEQSxxQkFPSyxNQUFMO0FBQ0wsd0JBQUksUUFBTSxLQUFLLEtBQUwsQ0FBVyxTQUFYLENBREw7QUFFTCx3QkFBRyxTQUFPLElBQUksU0FBSixFQUNULE9BREQ7QUFFQSx3QkFBSSxTQUFKLEdBQWMsS0FBSyxTQUFMLENBQWUsS0FBZixDQUFkLENBSks7QUFLTCxrQ0FBSSxNQUFKLENBQVcsR0FBWCxFQUxLO0FBTUEsMEJBTkE7QUFQQSxhQUZTOzs7O2tDQW1CSCxNQUFLOztBQUVYLG1CQUFPLElBQVAsQ0FGVzs7OztXQWhERSIsImZpbGUiOiJjbG91ZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7VUl9IGZyb20gJy4nXG5pbXBvcnQgQXBwIGZyb20gJy4vZGIvYXBwJ1xuXG5pbXBvcnQgVXBsb2FkIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZmlsZS9maWxlLXVwbG9hZFwiXG5pbXBvcnQgU2F2ZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2NvbnRlbnQvc2F2ZVwiXG5cbmNvbnN0IHtDb21tYW5kQmFyLCBmaWxlU2VsZWN0b3J9PVVJXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENsb3VkIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKVxuICAgICAgICB0aGlzLnN0YXRlPXtjbG91ZENvZGU6dGhpcy5wcm9wcy5hcHAuY2xvdWRDb2RlfVxuICAgIH1cbiAgICByZW5kZXIoKXtcbiAgICAgICAgcmV0dXJuKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8dGV4dGFyZWEgcmVmPVwiY2xvdWRDb2RlXCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuY2xvdWRDb2RlfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpPT50aGlzLnNldFN0YXRlKHtjbG91ZENvZGU6ZS50YXJnZXQudmFsdWV9KX1cbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJDbG91ZCBjb2RlXCJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3twb3NpdGlvbjonYWJzb2x1dGUnLCBoZWlnaHQ6ICcxMDAlJywgdG9wOjAsbGluZUhlaWdodDonMmVtJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbjowLHdpZHRoOicxMDAlJywgcGFkZGluZzoxMCwgcGFkZGluZ0JvdHRvbTo1MSxib3JkZXI6MH19Lz5cbiAgICAgICAgICAgICAgICA8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCJcbiAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q9e3RoaXMub25TZWxlY3QuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgaXRlbXM9e1tcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJCYWNrXCJ9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcIlVwbG9hZFwiLCBpY29uOlVwbG9hZH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOlwiU2F2ZVwiLGljb246U2F2ZX1dfS8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV3UHJvcHMpe1xuICAgICAgICBpZih0aGlzLnByb3BzLmFwcCE9bmV3UHJvcHMuYXBwKVxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y2xvdWRDb2RlOm5ld1Byb3BzLmFwcC5jbG91ZENvZGV9KVxuICAgIH1cblxuICAgIG9uU2VsZWN0KGNtZCl7XG5cdFx0dmFyIHNlbGY9dGhpcywgYXBwPXRoaXMucHJvcHMuYXBwXG4gICAgICAgIHN3aXRjaChjbWQpe1xuICAgICAgICBjYXNlICdVcGxvYWQnOlxuXHRcdFx0ZmlsZVNlbGVjdG9yLnNlbGVjdFRleHRGaWxlKCkudGhlbigoe2RhdGE6Y2xvdWRDb2RlfSk9PntcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtjbG91ZENvZGV9KVxuICAgICAgICAgICAgICAgIHRoaXMub25TZWxlY3QoJ1NhdmUnKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAnU2F2ZSc6XG5cdFx0XHR2YXIgdmFsdWU9dGhpcy5zdGF0ZS5jbG91ZENvZGVcblx0XHRcdGlmKHZhbHVlPT1hcHAuY2xvdWRDb2RlKVxuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHRhcHAuY2xvdWRDb2RlPXRoaXMuY2hlY2tDb2RlKHZhbHVlKVxuXHRcdFx0QXBwLnVwc2VydChhcHApXG4gICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGVja0NvZGUoY29kZSl7XG4gICAgICAgIC8vQFRPRE9cbiAgICAgICAgcmV0dXJuIGNvZGVcbiAgICB9XG59XG4iXX0=