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
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props$params = this.props.params;
      var params = _props$params === undefined ? {} : _props$params;
      var collectionName = params.name;


      this._data = _app2.default.collectionData(collectionName);
      this._index = _app2.default.collectionIndexes(collectionName);
      this._schema = _app2.default.schema;
      this.setState({ col: collectionName });
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
            } }] }),
        _react2.default.createElement(Names, { ref: 'names', model: this._schema,
          onItemClick: function onItemClick(a) {
            _this2.refs.names.dismiss();
            _this2.setState({ col: a.name });
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
//# sourceMappingURL=data:application/json;base64,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anMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtVc2VyLCBVSX0gZnJvbSAnLidcbmltcG9ydCBBcHAgZnJvbSBcIi4vZGIvYXBwXCJcbmltcG9ydCB7VGFicywgVGFifSBmcm9tICdtYXRlcmlhbC11aSdcblxuaW1wb3J0IFVwbG9hZCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ZpbGUvZmlsZS11cGxvYWRcIlxuaW1wb3J0IE1vcmUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9uYXZpZ2F0aW9uL21vcmUtdmVydFwiXG5cbmNvbnN0IHtMaXN0LCBMb2FkaW5nLCBFbXB0eSwgQ29tbWFuZEJhciwgZmlsZVNlbGVjdG9yfT1VSVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0YSBleHRlbmRzIENvbXBvbmVudHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlPXtjb2w6bnVsbH1cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpe1xuICAgICAgICB2YXIge3BhcmFtcz17fX09dGhpcy5wcm9wcyxcbiAgICAgICAgICAgIHtuYW1lOmNvbGxlY3Rpb25OYW1lfT1wYXJhbXNcblx0XHRcdFxuICAgICAgICB0aGlzLl9kYXRhPSBBcHAuY29sbGVjdGlvbkRhdGEoY29sbGVjdGlvbk5hbWUpXG4gICAgICAgIHRoaXMuX2luZGV4PUFwcC5jb2xsZWN0aW9uSW5kZXhlcyhjb2xsZWN0aW9uTmFtZSlcbiAgICAgICAgdGhpcy5fc2NoZW1hPUFwcC5zY2hlbWFcblx0XHR0aGlzLnNldFN0YXRlKHtjb2w6Y29sbGVjdGlvbk5hbWV9KVxuICAgIH1cblxuICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSl7XG4gICAgICAgIGlmKHRoaXMucHJvcHMuYXBwIT1uZXh0UHJvcHMuYXBwKXtcbiAgICAgICAgICAgIHRoaXMuX2RhdGE9IEFwcC5jb2xsZWN0aW9uRGF0YSh0aGlzLnN0YXRlLmNvbClcbiAgICAgICAgICAgIHRoaXMuX2luZGV4PUFwcC5jb2xsZWN0aW9uSW5kZXhlcyh0aGlzLnN0YXRlLmNvbClcbiAgICAgICAgICAgIHRoaXMuX3NjaGVtYT1BcHAuc2NoZW1hXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHtjb2w6bmV4dENvbH09bmV4dFN0YXRlLCB7Y29sfT10aGlzLnN0YXRlXG4gICAgICAgIGlmKG5leHRDb2whPWNvbCl7XG4gICAgICAgICAgICB0aGlzLl9kYXRhPSBBcHAuY29sbGVjdGlvbkRhdGEobmV4dENvbClcbiAgICAgICAgICAgIHRoaXMuX2luZGV4PUFwcC5jb2xsZWN0aW9uSW5kZXhlcyhuZXh0Q29sKVxuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcblx0XHR2YXIge2NvbDpjb2xOYW1lfT10aGlzLnN0YXRlXG4gICAgICAgIHJldHVybiAoXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHQ8VGFicz5cblx0XHRcdFx0XHQ8VGFiIGxhYmVsPXtjb2xOYW1lfT5cblx0XHRcdFx0XHRcdDxMaXN0LlRhYmxlIGNsYXNzTmFtZT1cImRhdGFcIiBtb2RlbD17dGhpcy5fZGF0YX0ga2V5PXtjb2xOYW1lfS8+XG5cdFx0XHRcdFx0PC9UYWI+XG5cdFx0XHRcdFx0PFRhYiBsYWJlbD1cIkluZGV4ZXNcIj5cblx0XHRcdFx0XHRcdHs8TGlzdCBtb2RlbD17dGhpcy5faW5kZXh9IHRlbXBsYXRlPXtJbmRleEl0ZW19IGtleT17Y29sTmFtZX0vPn1cblx0XHRcdFx0XHQ8L1RhYj5cblx0XHRcdFx0PC9UYWJzPlxuXHRcdFx0XHQ8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCIgc3R5bGU9e3t0ZXh0QWxpZ246J2xlZnQnfX1cblx0XHRcdFx0XHRvblNlbGVjdD17dGhpcy5vblNlbGVjdC5iaW5kKHRoaXMpfVxuXHRcdFx0XHRcdGl0ZW1zPXtbXG4gICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOlwiQmFja1wifSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJVcGxvYWQgU2NoZW1hXCIsIGxhYmVsOlwiU2NoZW1hXCIsIGljb246VXBsb2FkfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJVcGxvYWQgRGF0YVwiLCBsYWJlbDpcIkRhdGFcIiwgaWNvbjpVcGxvYWR9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcIkNvbGxlY3Rpb25cIiwgaWNvbjpNb3JlLCBvblNlbGVjdDooKT0+dGhpcy5yZWZzLm5hbWVzLnNob3coKX1cblx0XHRcdFx0XHRcdF19Lz5cbiAgICAgICAgICAgICAgICB7PE5hbWVzIHJlZj1cIm5hbWVzXCIgbW9kZWw9e3RoaXMuX3NjaGVtYX1cbiAgICAgICAgICAgICAgICAgICAgb25JdGVtQ2xpY2s9eyhhKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZzLm5hbWVzLmRpc21pc3MoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2NvbDphLm5hbWV9KVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LnJvdXRlci5yZXBsYWNlKGBkYXRhLyR7YS5uYW1lfWApXG4gICAgICAgICAgICAgICAgICAgIH19Lz59XG5cdFx0XHQ8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbiAgICBvblNlbGVjdChjbWQpe1xuICAgICAgICBzd2l0Y2goY21kKXtcblx0XHRjYXNlIFwiVXBsb2FkIFNjaGVtYVwiOlxuXHRcdFx0ZmlsZVNlbGVjdG9yLnNlbGVjdEpzb25JbkpzRmlsZSgpXG5cdFx0XHRcdC50aGVuKCh7ZGF0YTpzY2hlbWF9KT0+e1xuICAgICAgICAgICAgICAgICAgICBpZighc2NoZW1hIHx8IHNjaGVtYS5sZW5ndGg9PTApXG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0QXBwLnNldFNjaGVtYShzY2hlbWEpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKT0+dGhpcy5mb3JjZVVwZGF0ZSgpKVxuXHRcdFx0XHR9KVxuXHRcdGJyZWFrXG5cdFx0Y2FzZSBcIlVwbG9hZCBEYXRhXCI6XG5cdFx0XHRmaWxlU2VsZWN0b3Iuc2VsZWN0SnNvbkluSnNGaWxlKClcblx0XHRcdFx0LnRoZW4oKHtkYXRhLG5hbWV9KT0+e1xuXHRcdFx0XHRcdGlmKCFkYXRhIHx8IGRhdGEubGVuZ3RoPT0wKVxuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdHZhciBraW5kPW5hbWUuc3BsaXQoL1tcXC9cXFxcXS8pLnBvcCgpLnNwbGl0KCcuJylbMF1cblx0XHRcdFx0XHRBcHAuY29sbGVjdGlvbkRhdGEoa2luZCwgZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpPT50aGlzLmZvcmNlVXBkYXRlKCkpXG5cdFx0XHRcdH0pXG5cdFx0YnJlYWtcbiAgICAgICAgfVxuXHR9XG59IFxuXG5EYXRhLmNvbnRleHRUeXBlcz17cm91dGVyOlJlYWN0LlByb3BUeXBlcy5vYmplY3R9XG5cbmNsYXNzIEluZGV4SXRlbSBleHRlbmRzIENvbXBvbmVudHtcblx0cmVuZGVyKCl7XG5cdFx0dmFyIHttb2RlbH09dGhpcy5wcm9wcyxcblx0XHRcdHskb3B0aW9uPXt9fT1tb2RlbCxcblx0XHRcdGtleXM9T2JqZWN0LmtleXMobW9kZWwpLmZpbHRlcigoYSk9PmEhPSckb3B0aW9uJyksXG5cdFx0XHR0ZXh0PWtleXMubWFwKChhKT0+YCAke2F9JHttb2RlbFthXT09MSA/ICcgYXNjJyA6ICcgZGVzYyd9YCkuam9pbignLCAnKSxcblx0XHRcdHt1bmlxdWUsIHNwYXJzZSwgbmFtZT1rZXlzLmpvaW4oJywnKX09JG9wdGlvbjtcblxuXHRcdHJldHVybiAoPExpc3QuSXRlbSBwcmltYXJ5VGV4dD17bmFtZX0gc2Vjb25kYXJ5VGV4dD17YCR7dW5pcXVlPyd1bmlxdWUgJzonJ30ke3NwYXJzZT8nc3BhcnNlICc6Jyd9JHt0ZXh0fWB9Lz4pXG5cdH1cbn1cbmNsYXNzIE5hbWVzIGV4dGVuZHMgQ29tbWFuZEJhci5EaWFsb2dDb21tYW5ke1xuICAgIHJlbmRlckNvbnRlbnQoKXtcbiAgICAgICAgcmV0dXJuICg8TGlzdCB7Li4udGhpcy5wcm9wc30gdGVtcGxhdGU9e05hbWVJdGVtfS8+KVxuICAgIH1cbn1cblxuY2xhc3MgTmFtZUl0ZW0gZXh0ZW5kcyBDb21wb25lbnR7XG5cdHJlbmRlcigpe1xuXHRcdHZhcnttb2RlbCwuLi5vdGhlcnN9PXRoaXMucHJvcHNcblx0XHRyZXR1cm4gKFxuXHRcdFx0PExpc3QuSXRlbSBwcmltYXJ5VGV4dD17bW9kZWwubmFtZX0gbGVmdEljb249ezxzcGFuLz59ICB7Li4ub3RoZXJzfS8+XG5cdFx0KVxuXHR9XG59XG5cblxuRGF0YS5OYW1lSXRlbT1OYW1lSXRlbVxuRGF0YS5JbmRleEl0ZW09SW5kZXhJdGVtXG4iXX0=