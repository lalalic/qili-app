'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('.');

var _app = require('./db/app');

var _app2 = _interopRequireDefault(_app);

var _materialUi = require('material-ui');

var _fileUpload = require('material-ui/svg-icons/file/file-upload');

var _fileUpload2 = _interopRequireDefault(_fileUpload);

var _moreVert = require('material-ui/svg-icons/navigation/more-vert');

var _moreVert2 = _interopRequireDefault(_moreVert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var List = _.UI.List;
var Loading = _.UI.Loading;
var Empty = _.UI.Empty;
var CommandBar = _.UI.CommandBar;
var fileSelector = _.UI.fileSelector;

var Data = function (_Component) {
  _inherits(Data, _Component);

  function Data(props) {
    _classCallCheck(this, Data);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Data).call(this, props));

    _this.state = { col: null };
    return _this;
  }

  _createClass(Data, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _ref = this.props.params || {};

      var collectionName = _ref.name;


      this.setState({
        schema: _app2.default.schema,
        col: collectionName,
        data: _app2.default.collectionData(collectionName),
        index: _app2.default.collectionIndexes(collectionName)
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.app != nextProps.app) this.setState({
        schema: _app2.default.schema,
        data: _app2.default.collectionData(this.state.col),
        index: _app2.default.collectionIndexes(this.state.col)
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state;
      var colName = _state.col;
      var data = _state.data;
      var index = _state.index;
      var schema = _state.schema;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _materialUi.Tabs,
          null,
          _react2.default.createElement(
            _materialUi.Tab,
            { label: colName },
            _react2.default.createElement(List.Table, { className: 'data', model: data, key: colName })
          ),
          _react2.default.createElement(
            _materialUi.Tab,
            { label: 'Indexes' },
            _react2.default.createElement(List, { model: index, template: IndexItem, key: colName })
          )
        ),
        _react2.default.createElement(CommandBar, { className: 'footbar', style: { textAlign: 'left' },
          onSelect: function onSelect(cmd) {
            return _this2.onSelect(cmd);
          },
          items: [{ action: "Back" }, { action: "Upload Schema", label: "Schema", icon: _fileUpload2.default }, { action: "Upload Data", label: "Data", icon: _fileUpload2.default }, { action: "Collection", icon: _moreVert2.default, onSelect: function onSelect() {
              return _this2.refs.names.show();
            } }] }),
        _react2.default.createElement(Names, { ref: 'names', model: schema,
          onItemClick: function onItemClick(a) {
            _this2.refs.names.dismiss();
            _this2.setState({
              col: a.name,
              data: _app2.default.collectionData(a.name),
              index: _app2.default.collectionIndexes(a.name)
            });
            _this2.context.router.replace('data/' + a.name);
          } })
      );
    }
  }, {
    key: 'onSelect',
    value: function onSelect(cmd) {
      var _this3 = this;

      switch (cmd) {
        case "Upload Schema":
          fileSelector.selectJsonInJsFile().then(function (_ref2) {
            var schema = _ref2.data;

            if (!schema || schema.length == 0) return;
            _app2.default.setSchema(schema).then(function () {
              return _this3.forceUpdate();
            });
          });
          break;
        case "Upload Data":
          fileSelector.selectJsonInJsFile().then(function (_ref3) {
            var data = _ref3.data;
            var name = _ref3.name;

            if (!data || data.length == 0) return;
            var kind = name.split(/[\/\\]/).pop().split('.')[0];
            _app2.default.collectionData(kind, data).then(function () {
              return _this3.forceUpdate();
            });
          });
          break;
      }
    }
  }]);

  return Data;
}(_react.Component);

exports.default = Data;


Data.contextTypes = { router: _react2.default.PropTypes.object };

var IndexItem = function (_Component2) {
  _inherits(IndexItem, _Component2);

  function IndexItem() {
    _classCallCheck(this, IndexItem);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(IndexItem).apply(this, arguments));
  }

  _createClass(IndexItem, [{
    key: 'render',
    value: function render() {
      var model = this.props.model;
      var _model$$option = model.$option;
      var $option = _model$$option === undefined ? {} : _model$$option;
      var keys = Object.keys(model).filter(function (a) {
        return a != '$option';
      });
      var text = keys.map(function (a) {
        return ' ' + a + (model[a] == 1 ? ' asc' : ' desc');
      }).join(', ');
      var unique = $option.unique;
      var sparse = $option.sparse;
      var _$option$name = $option.name;
      var name = _$option$name === undefined ? keys.join(',') : _$option$name;


      return _react2.default.createElement(List.Item, { primaryText: name, secondaryText: '' + (unique ? 'unique ' : '') + (sparse ? 'sparse ' : '') + text });
    }
  }]);

  return IndexItem;
}(_react.Component);

var Names = function (_CommandBar$DialogCom) {
  _inherits(Names, _CommandBar$DialogCom);

  function Names() {
    _classCallCheck(this, Names);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Names).apply(this, arguments));
  }

  _createClass(Names, [{
    key: 'renderContent',
    value: function renderContent() {
      return _react2.default.createElement(List, _extends({}, this.props, { template: NameItem }));
    }
  }]);

  return Names;
}(CommandBar.DialogCommand);

var NameItem = function (_Component3) {
  _inherits(NameItem, _Component3);

  function NameItem() {
    _classCallCheck(this, NameItem);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(NameItem).apply(this, arguments));
  }

  _createClass(NameItem, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var model = _props.model;

      var others = _objectWithoutProperties(_props, ['model']);

      return _react2.default.createElement(List.Item, _extends({ primaryText: model.name, leftIcon: _react2.default.createElement('span', null) }, others));
    }
  }]);

  return NameItem;
}(_react.Component);

Data.NameItem = NameItem;
Data.IndexItem = IndexItem;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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QVYsR0FBYyxNQUFkLEdBQXVCLE9BQXZCO09BQWIsQ0FBVCxDQUF3RCxJQUF4RCxDQUE2RCxJQUE3RCxDQUFMLENBSk07VUFLTCxTQUFxQyxRQUFyQyxPQUxLO1VBS0csU0FBNkIsUUFBN0IsT0FMSDswQkFLZ0MsUUFBckIsS0FMWDtVQUtXLHFDQUFLLEtBQUssSUFBTCxDQUFVLEdBQVYsa0JBTGhCOzs7QUFPUCxhQUFRLDhCQUFDLEtBQUssSUFBTixJQUFXLGFBQWEsSUFBYixFQUFtQixxQkFBa0IsU0FBTyxTQUFQLEdBQWlCLEVBQWpCLEtBQXNCLFNBQU8sU0FBUCxHQUFpQixFQUFqQixJQUFzQixJQUE5RCxFQUE5QixDQUFSLENBUE87Ozs7U0FESDs7O0lBV0E7Ozs7Ozs7Ozs7O29DQUNhO0FBQ1gsYUFBUSw4QkFBQyxJQUFELGVBQVUsS0FBSyxLQUFMLElBQVksVUFBVSxRQUFWLEdBQXRCLENBQVIsQ0FEVzs7OztTQURiO0VBQWMsV0FBVyxhQUFYOztJQU1kOzs7Ozs7Ozs7Ozs2QkFDRzttQkFDYyxLQUFLLEtBQUwsQ0FEZDtVQUNILHFCQURHOztVQUNNLHFEQUROOztBQUVQLGFBQ0MsOEJBQUMsS0FBSyxJQUFOLGFBQVcsYUFBYSxNQUFNLElBQU4sRUFBWSxVQUFVLDJDQUFWLElBQXdCLE9BQTVELENBREQsQ0FGTzs7OztTQURIOzs7QUFVTixLQUFLLFFBQUwsR0FBYyxRQUFkO0FBQ0EsS0FBSyxTQUFMLEdBQWUsU0FBZiIsImZpbGUiOiJkYXRhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCdcbmltcG9ydCB7VXNlciwgVUl9IGZyb20gJy4nXG5pbXBvcnQgQXBwIGZyb20gXCIuL2RiL2FwcFwiXG5pbXBvcnQge1RhYnMsIFRhYn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5cbmltcG9ydCBVcGxvYWQgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9maWxlL2ZpbGUtdXBsb2FkXCJcbmltcG9ydCBNb3JlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbmF2aWdhdGlvbi9tb3JlLXZlcnRcIlxuXG5jb25zdCB7TGlzdCwgTG9hZGluZywgRW1wdHksIENvbW1hbmRCYXIsIGZpbGVTZWxlY3Rvcn09VUlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhdGEgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZT17Y29sOm51bGx9XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCl7XG4gICAgICAgIHZhciB7bmFtZTpjb2xsZWN0aW9uTmFtZX09dGhpcy5wcm9wcy5wYXJhbXN8fHt9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBzY2hlbWE6QXBwLnNjaGVtYSxcbiAgICAgICAgICAgIGNvbDpjb2xsZWN0aW9uTmFtZSxcbiAgICAgICAgICAgIGRhdGE6QXBwLmNvbGxlY3Rpb25EYXRhKGNvbGxlY3Rpb25OYW1lKSxcbiAgICAgICAgICAgIGluZGV4OkFwcC5jb2xsZWN0aW9uSW5kZXhlcyhjb2xsZWN0aW9uTmFtZSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcyl7XG4gICAgICAgIGlmKHRoaXMucHJvcHMuYXBwIT1uZXh0UHJvcHMuYXBwKVxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgc2NoZW1hOkFwcC5zY2hlbWEsXG4gICAgICAgICAgICAgICAgZGF0YTpBcHAuY29sbGVjdGlvbkRhdGEodGhpcy5zdGF0ZS5jb2wpLFxuICAgICAgICAgICAgICAgIGluZGV4OkFwcC5jb2xsZWN0aW9uSW5kZXhlcyh0aGlzLnN0YXRlLmNvbClcbiAgICAgICAgICAgIH0pXG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG5cdFx0dmFyIHtjb2w6Y29sTmFtZSwgZGF0YSwgaW5kZXgsIHNjaGVtYX09dGhpcy5zdGF0ZVxuICAgICAgICByZXR1cm4gKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0PFRhYnM+XG5cdFx0XHRcdFx0PFRhYiBsYWJlbD17Y29sTmFtZX0+XG5cdFx0XHRcdFx0XHQ8TGlzdC5UYWJsZSBjbGFzc05hbWU9XCJkYXRhXCIgbW9kZWw9e2RhdGF9IGtleT17Y29sTmFtZX0vPlxuXHRcdFx0XHRcdDwvVGFiPlxuXHRcdFx0XHRcdDxUYWIgbGFiZWw9XCJJbmRleGVzXCI+XG5cdFx0XHRcdFx0XHR7PExpc3QgbW9kZWw9e2luZGV4fSB0ZW1wbGF0ZT17SW5kZXhJdGVtfSBrZXk9e2NvbE5hbWV9Lz59XG5cdFx0XHRcdFx0PC9UYWI+XG5cdFx0XHRcdDwvVGFicz5cblx0XHRcdFx0PENvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiIHN0eWxlPXt7dGV4dEFsaWduOidsZWZ0J319XG5cdFx0XHRcdFx0b25TZWxlY3Q9e2NtZD0+dGhpcy5vblNlbGVjdChjbWQpfVxuXHRcdFx0XHRcdGl0ZW1zPXtbXG4gICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOlwiQmFja1wifSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJVcGxvYWQgU2NoZW1hXCIsIGxhYmVsOlwiU2NoZW1hXCIsIGljb246VXBsb2FkfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJVcGxvYWQgRGF0YVwiLCBsYWJlbDpcIkRhdGFcIiwgaWNvbjpVcGxvYWR9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcIkNvbGxlY3Rpb25cIiwgaWNvbjpNb3JlLCBvblNlbGVjdDooKT0+dGhpcy5yZWZzLm5hbWVzLnNob3coKX1cblx0XHRcdFx0XHRcdF19Lz5cbiAgICAgICAgICAgICAgICB7PE5hbWVzIHJlZj1cIm5hbWVzXCIgbW9kZWw9e3NjaGVtYX1cbiAgICAgICAgICAgICAgICAgICAgb25JdGVtQ2xpY2s9eyhhKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZzLm5hbWVzLmRpc21pc3MoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbDphLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTpBcHAuY29sbGVjdGlvbkRhdGEoYS5uYW1lKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleDpBcHAuY29sbGVjdGlvbkluZGV4ZXMoYS5uYW1lKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIucmVwbGFjZShgZGF0YS8ke2EubmFtZX1gKVxuICAgICAgICAgICAgICAgICAgICB9fS8+fVxuXHRcdFx0PC9kaXY+XG4gICAgICAgIClcbiAgICB9XG4gICAgb25TZWxlY3QoY21kKXtcbiAgICAgICAgc3dpdGNoKGNtZCl7XG5cdFx0Y2FzZSBcIlVwbG9hZCBTY2hlbWFcIjpcblx0XHRcdGZpbGVTZWxlY3Rvci5zZWxlY3RKc29uSW5Kc0ZpbGUoKVxuXHRcdFx0XHQudGhlbigoe2RhdGE6c2NoZW1hfSk9PntcbiAgICAgICAgICAgICAgICAgICAgaWYoIXNjaGVtYSB8fCBzY2hlbWEubGVuZ3RoPT0wKVxuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdEFwcC5zZXRTY2hlbWEoc2NoZW1hKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCk9PnRoaXMuZm9yY2VVcGRhdGUoKSlcblx0XHRcdFx0fSlcblx0XHRicmVha1xuXHRcdGNhc2UgXCJVcGxvYWQgRGF0YVwiOlxuXHRcdFx0ZmlsZVNlbGVjdG9yLnNlbGVjdEpzb25JbkpzRmlsZSgpXG5cdFx0XHRcdC50aGVuKCh7ZGF0YSxuYW1lfSk9Pntcblx0XHRcdFx0XHRpZighZGF0YSB8fCBkYXRhLmxlbmd0aD09MClcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR2YXIga2luZD1uYW1lLnNwbGl0KC9bXFwvXFxcXF0vKS5wb3AoKS5zcGxpdCgnLicpWzBdXG5cdFx0XHRcdFx0QXBwLmNvbGxlY3Rpb25EYXRhKGtpbmQsIGRhdGEpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKT0+dGhpcy5mb3JjZVVwZGF0ZSgpKVxuXHRcdFx0XHR9KVxuXHRcdGJyZWFrXG4gICAgICAgIH1cblx0fVxufVxuXG5EYXRhLmNvbnRleHRUeXBlcz17cm91dGVyOlJlYWN0LlByb3BUeXBlcy5vYmplY3R9XG5cbmNsYXNzIEluZGV4SXRlbSBleHRlbmRzIENvbXBvbmVudHtcblx0cmVuZGVyKCl7XG5cdFx0dmFyIHttb2RlbH09dGhpcy5wcm9wcyxcblx0XHRcdHskb3B0aW9uPXt9fT1tb2RlbCxcblx0XHRcdGtleXM9T2JqZWN0LmtleXMobW9kZWwpLmZpbHRlcigoYSk9PmEhPSckb3B0aW9uJyksXG5cdFx0XHR0ZXh0PWtleXMubWFwKChhKT0+YCAke2F9JHttb2RlbFthXT09MSA/ICcgYXNjJyA6ICcgZGVzYyd9YCkuam9pbignLCAnKSxcblx0XHRcdHt1bmlxdWUsIHNwYXJzZSwgbmFtZT1rZXlzLmpvaW4oJywnKX09JG9wdGlvbjtcblxuXHRcdHJldHVybiAoPExpc3QuSXRlbSBwcmltYXJ5VGV4dD17bmFtZX0gc2Vjb25kYXJ5VGV4dD17YCR7dW5pcXVlPyd1bmlxdWUgJzonJ30ke3NwYXJzZT8nc3BhcnNlICc6Jyd9JHt0ZXh0fWB9Lz4pXG5cdH1cbn1cbmNsYXNzIE5hbWVzIGV4dGVuZHMgQ29tbWFuZEJhci5EaWFsb2dDb21tYW5ke1xuICAgIHJlbmRlckNvbnRlbnQoKXtcbiAgICAgICAgcmV0dXJuICg8TGlzdCB7Li4udGhpcy5wcm9wc30gdGVtcGxhdGU9e05hbWVJdGVtfS8+KVxuICAgIH1cbn1cblxuY2xhc3MgTmFtZUl0ZW0gZXh0ZW5kcyBDb21wb25lbnR7XG5cdHJlbmRlcigpe1xuXHRcdHZhcnttb2RlbCwuLi5vdGhlcnN9PXRoaXMucHJvcHNcblx0XHRyZXR1cm4gKFxuXHRcdFx0PExpc3QuSXRlbSBwcmltYXJ5VGV4dD17bW9kZWwubmFtZX0gbGVmdEljb249ezxzcGFuLz59ICB7Li4ub3RoZXJzfS8+XG5cdFx0KVxuXHR9XG59XG5cblxuRGF0YS5OYW1lSXRlbT1OYW1lSXRlbVxuRGF0YS5JbmRleEl0ZW09SW5kZXhJdGVtXG4iXX0=