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

    var _this$props$params = _this.props.params;
    var params = _this$props$params === undefined ? {} : _this$props$params;
    var _params$name = params.name;
    var collectionName = _params$name === undefined ? _.User._name : _params$name;


    _this.state = { col: collectionName };
    return _this;
  }

  _createClass(Data, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var collectionName = this.state.col;

      this._data = _app2.default.collectionData(collectionName);
      this._index = _app2.default.collectionIndexes(collectionName);
      this._schema = _app2.default.schema;
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (this.props.app != nextProps.app) {
        this._data = _app2.default.collectionData(this.state.col);
        this._index = _app2.default.collectionIndexes(this.state.col);
        this._schema = _app2.default.schema;
        return true;
      }

      var nextCol = nextState.col;var col = this.state.col;

      if (nextCol != col) {
        this._data = _app2.default.collectionData(nextCol);
        this._index = _app2.default.collectionIndexes(nextCol);
        return true;
      }
      return false;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var colName = this.state.col;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _materialUi.Tabs,
          null,
          _react2.default.createElement(
            _materialUi.Tab,
            { label: colName },
            _react2.default.createElement(List.Table, { className: 'data', model: this._data, key: colName })
          ),
          _react2.default.createElement(
            _materialUi.Tab,
            { label: 'Indexes' },
            _react2.default.createElement(List, { model: this._index, template: IndexItem, key: colName })
          )
        ),
        _react2.default.createElement(CommandBar, { className: 'footbar', style: { textAlign: 'left' },
          onSelect: this.onSelect.bind(this),
          items: [{ action: "Back" }, { action: "Upload Schema", label: "Schema", icon: _fileUpload2.default }, { action: "Upload Data", label: "Data", icon: _fileUpload2.default }, { action: "Collection", icon: _moreVert2.default, onSelect: function onSelect() {
              return _this2.refs.names.show();
            } }] })
      );
    }
  }, {
    key: 'onSelect',
    value: function onSelect(cmd) {
      var _this3 = this;

      switch (cmd) {
        case "Upload Schema":
          fileSelector.selectJsonInJsFile().then(function (_ref) {
            var schema = _ref.data;

            if (!schema || schema.length == 0) return;
            _app2.default.setSchema(schema).then(function () {
              return _this3.forceUpdate();
            });
          });
          break;
        case "Upload Data":
          fileSelector.selectJsonInJsFile().then(function (_ref2) {
            var data = _ref2.data;
            var name = _ref2.name;

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
//# sourceMappingURL=data:application/json;base64,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LENBQVYsR0FBYyxNQUFkLEdBQXVCLE9BQXZCO09BQWIsQ0FBVCxDQUF3RCxJQUF4RCxDQUE2RCxJQUE3RCxDQUFMLENBSk07VUFLTCxTQUFxQyxRQUFyQyxPQUxLO1VBS0csU0FBNkIsUUFBN0IsT0FMSDswQkFLZ0MsUUFBckIsS0FMWDtVQUtXLHFDQUFLLEtBQUssSUFBTCxDQUFVLEdBQVYsa0JBTGhCOzs7QUFPUCxhQUFRLDhCQUFDLEtBQUssSUFBTixJQUFXLGFBQWEsSUFBYixFQUFtQixxQkFBa0IsU0FBTyxTQUFQLEdBQWlCLEVBQWpCLEtBQXNCLFNBQU8sU0FBUCxHQUFpQixFQUFqQixJQUFzQixJQUE5RCxFQUE5QixDQUFSLENBUE87Ozs7U0FESDs7O0lBV0E7Ozs7Ozs7Ozs7O29DQUNhO0FBQ1gsYUFBUSw4QkFBQyxJQUFELGVBQVUsS0FBSyxLQUFMLElBQVksVUFBVSxRQUFWLEdBQXRCLENBQVIsQ0FEVzs7OztTQURiO0VBQWMsV0FBVyxhQUFYOztJQU1kOzs7Ozs7Ozs7Ozs2QkFDRzttQkFDYyxLQUFLLEtBQUwsQ0FEZDtVQUNILHFCQURHOztVQUNNLHFEQUROOztBQUVQLGFBQ0MsOEJBQUMsS0FBSyxJQUFOLGFBQVcsYUFBYSxNQUFNLElBQU4sRUFBWSxVQUFVLDJDQUFWLElBQXdCLE9BQTVELENBREQsQ0FGTzs7OztTQURIOzs7QUFVTixLQUFLLFFBQUwsR0FBYyxRQUFkO0FBQ0EsS0FBSyxTQUFMLEdBQWUsU0FBZiIsImZpbGUiOiJkYXRhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCdcbmltcG9ydCB7VXNlciwgVUl9IGZyb20gJy4nXG5pbXBvcnQgQXBwIGZyb20gXCIuL2RiL2FwcFwiXG5pbXBvcnQge1RhYnMsIFRhYn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5cbmltcG9ydCBVcGxvYWQgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9maWxlL2ZpbGUtdXBsb2FkXCJcbmltcG9ydCBNb3JlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbmF2aWdhdGlvbi9tb3JlLXZlcnRcIlxuXG5jb25zdCB7TGlzdCwgTG9hZGluZywgRW1wdHksIENvbW1hbmRCYXIsIGZpbGVTZWxlY3Rvcn09VUlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhdGEgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdmFyIHtwYXJhbXM9e319PXRoaXMucHJvcHMsXG4gICAgICAgICAgICB7bmFtZTpjb2xsZWN0aW9uTmFtZT1Vc2VyLl9uYW1lfT1wYXJhbXM7XG5cbiAgICAgICAgdGhpcy5zdGF0ZT17Y29sOmNvbGxlY3Rpb25OYW1lfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCl7XG4gICAgICAgIHZhciB7Y29sOmNvbGxlY3Rpb25OYW1lfT10aGlzLnN0YXRlXG4gICAgICAgIHRoaXMuX2RhdGE9IEFwcC5jb2xsZWN0aW9uRGF0YShjb2xsZWN0aW9uTmFtZSlcbiAgICAgICAgdGhpcy5faW5kZXg9QXBwLmNvbGxlY3Rpb25JbmRleGVzKGNvbGxlY3Rpb25OYW1lKVxuICAgICAgICB0aGlzLl9zY2hlbWE9QXBwLnNjaGVtYVxuICAgIH1cblxuICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSl7XG4gICAgICAgIGlmKHRoaXMucHJvcHMuYXBwIT1uZXh0UHJvcHMuYXBwKXtcbiAgICAgICAgICAgIHRoaXMuX2RhdGE9IEFwcC5jb2xsZWN0aW9uRGF0YSh0aGlzLnN0YXRlLmNvbClcbiAgICAgICAgICAgIHRoaXMuX2luZGV4PUFwcC5jb2xsZWN0aW9uSW5kZXhlcyh0aGlzLnN0YXRlLmNvbClcbiAgICAgICAgICAgIHRoaXMuX3NjaGVtYT1BcHAuc2NoZW1hXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHtjb2w6bmV4dENvbH09bmV4dFN0YXRlLCB7Y29sfT10aGlzLnN0YXRlXG4gICAgICAgIGlmKG5leHRDb2whPWNvbCl7XG4gICAgICAgICAgICB0aGlzLl9kYXRhPSBBcHAuY29sbGVjdGlvbkRhdGEobmV4dENvbClcbiAgICAgICAgICAgIHRoaXMuX2luZGV4PUFwcC5jb2xsZWN0aW9uSW5kZXhlcyhuZXh0Q29sKVxuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcblx0XHR2YXIge2NvbDpjb2xOYW1lfT10aGlzLnN0YXRlXG4gICAgICAgIHJldHVybiAoXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHQ8VGFicz5cblx0XHRcdFx0XHQ8VGFiIGxhYmVsPXtjb2xOYW1lfT5cblx0XHRcdFx0XHRcdDxMaXN0LlRhYmxlIGNsYXNzTmFtZT1cImRhdGFcIiBtb2RlbD17dGhpcy5fZGF0YX0ga2V5PXtjb2xOYW1lfS8+XG5cdFx0XHRcdFx0PC9UYWI+XG5cdFx0XHRcdFx0PFRhYiBsYWJlbD1cIkluZGV4ZXNcIj5cblx0XHRcdFx0XHRcdHs8TGlzdCBtb2RlbD17dGhpcy5faW5kZXh9IHRlbXBsYXRlPXtJbmRleEl0ZW19IGtleT17Y29sTmFtZX0vPn1cblx0XHRcdFx0XHQ8L1RhYj5cblx0XHRcdFx0PC9UYWJzPlxuXHRcdFx0XHQ8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCIgc3R5bGU9e3t0ZXh0QWxpZ246J2xlZnQnfX1cblx0XHRcdFx0XHRvblNlbGVjdD17dGhpcy5vblNlbGVjdC5iaW5kKHRoaXMpfVxuXHRcdFx0XHRcdGl0ZW1zPXtbXG4gICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOlwiQmFja1wifSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJVcGxvYWQgU2NoZW1hXCIsIGxhYmVsOlwiU2NoZW1hXCIsIGljb246VXBsb2FkfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJVcGxvYWQgRGF0YVwiLCBsYWJlbDpcIkRhdGFcIiwgaWNvbjpVcGxvYWR9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcIkNvbGxlY3Rpb25cIiwgaWNvbjpNb3JlLCBvblNlbGVjdDooKT0+dGhpcy5yZWZzLm5hbWVzLnNob3coKX1cblx0XHRcdFx0XHRcdF19Lz5cbiAgICAgICAgICAgICAgICB7Lyo8TmFtZXMgcmVmPVwibmFtZXNcIiBtb2RlbD17dGhpcy5fc2NoZW1hfVxuICAgICAgICAgICAgICAgICAgICBvbkl0ZW1DbGljaz17KGEpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnMubmFtZXMuZGlzbWlzcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y29sOmEubmFtZX0pXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLnJlcGxhY2UoYGRhdGEvJHthLm5hbWV9YClcbiAgICAgICAgICAgICAgICAgICAgfX0vPiovfVxuXHRcdFx0PC9kaXY+XG4gICAgICAgIClcbiAgICB9XG4gICAgb25TZWxlY3QoY21kKXtcbiAgICAgICAgc3dpdGNoKGNtZCl7XG5cdFx0Y2FzZSBcIlVwbG9hZCBTY2hlbWFcIjpcblx0XHRcdGZpbGVTZWxlY3Rvci5zZWxlY3RKc29uSW5Kc0ZpbGUoKVxuXHRcdFx0XHQudGhlbigoe2RhdGE6c2NoZW1hfSk9PntcbiAgICAgICAgICAgICAgICAgICAgaWYoIXNjaGVtYSB8fCBzY2hlbWEubGVuZ3RoPT0wKVxuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdEFwcC5zZXRTY2hlbWEoc2NoZW1hKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCk9PnRoaXMuZm9yY2VVcGRhdGUoKSlcblx0XHRcdFx0fSlcblx0XHRicmVha1xuXHRcdGNhc2UgXCJVcGxvYWQgRGF0YVwiOlxuXHRcdFx0ZmlsZVNlbGVjdG9yLnNlbGVjdEpzb25JbkpzRmlsZSgpXG5cdFx0XHRcdC50aGVuKCh7ZGF0YSxuYW1lfSk9Pntcblx0XHRcdFx0XHRpZighZGF0YSB8fCBkYXRhLmxlbmd0aD09MClcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR2YXIga2luZD1uYW1lLnNwbGl0KC9bXFwvXFxcXF0vKS5wb3AoKS5zcGxpdCgnLicpWzBdXG5cdFx0XHRcdFx0QXBwLmNvbGxlY3Rpb25EYXRhKGtpbmQsIGRhdGEpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKT0+dGhpcy5mb3JjZVVwZGF0ZSgpKVxuXHRcdFx0XHR9KVxuXHRcdGJyZWFrXG4gICAgICAgIH1cblx0fVxufVxuXG5EYXRhLmNvbnRleHRUeXBlcz17cm91dGVyOlJlYWN0LlByb3BUeXBlcy5vYmplY3R9XG5cbmNsYXNzIEluZGV4SXRlbSBleHRlbmRzIENvbXBvbmVudHtcblx0cmVuZGVyKCl7XG5cdFx0dmFyIHttb2RlbH09dGhpcy5wcm9wcyxcblx0XHRcdHskb3B0aW9uPXt9fT1tb2RlbCxcblx0XHRcdGtleXM9T2JqZWN0LmtleXMobW9kZWwpLmZpbHRlcigoYSk9PmEhPSckb3B0aW9uJyksXG5cdFx0XHR0ZXh0PWtleXMubWFwKChhKT0+YCAke2F9JHttb2RlbFthXT09MSA/ICcgYXNjJyA6ICcgZGVzYyd9YCkuam9pbignLCAnKSxcblx0XHRcdHt1bmlxdWUsIHNwYXJzZSwgbmFtZT1rZXlzLmpvaW4oJywnKX09JG9wdGlvbjtcblxuXHRcdHJldHVybiAoPExpc3QuSXRlbSBwcmltYXJ5VGV4dD17bmFtZX0gc2Vjb25kYXJ5VGV4dD17YCR7dW5pcXVlPyd1bmlxdWUgJzonJ30ke3NwYXJzZT8nc3BhcnNlICc6Jyd9JHt0ZXh0fWB9Lz4pXG5cdH1cbn1cbmNsYXNzIE5hbWVzIGV4dGVuZHMgQ29tbWFuZEJhci5EaWFsb2dDb21tYW5ke1xuICAgIHJlbmRlckNvbnRlbnQoKXtcbiAgICAgICAgcmV0dXJuICg8TGlzdCB7Li4udGhpcy5wcm9wc30gdGVtcGxhdGU9e05hbWVJdGVtfS8+KVxuICAgIH1cbn1cblxuY2xhc3MgTmFtZUl0ZW0gZXh0ZW5kcyBDb21wb25lbnR7XG5cdHJlbmRlcigpe1xuXHRcdHZhcnttb2RlbCwuLi5vdGhlcnN9PXRoaXMucHJvcHNcblx0XHRyZXR1cm4gKFxuXHRcdFx0PExpc3QuSXRlbSBwcmltYXJ5VGV4dD17bW9kZWwubmFtZX0gbGVmdEljb249ezxzcGFuLz59ICB7Li4ub3RoZXJzfS8+XG5cdFx0KVxuXHR9XG59XG5cblxuRGF0YS5OYW1lSXRlbT1OYW1lSXRlbVxuRGF0YS5JbmRleEl0ZW09SW5kZXhJdGVtXG4iXX0=