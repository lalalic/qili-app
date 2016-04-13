'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fileUpload = require('material-ui/lib/svg-icons/file/file-upload');

var _fileUpload2 = _interopRequireDefault(_fileUpload);

var _moreVert = require('material-ui/lib/svg-icons/navigation/more-vert');

var _moreVert2 = _interopRequireDefault(_moreVert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');

var _require = require('.');

var Component = _require.Component;
var User = _require.User;
var _require$UI = _require.UI;
var List = _require$UI.List;
var Loading = _require$UI.Loading;
var Empty = _require$UI.Empty;
var CommandBar = _require$UI.CommandBar;
var fileSelector = _require$UI.fileSelector;
var App = require("./db/app");

var _require2 = require('material-ui');

var Tabs = _require2.Tabs;
var Tab = _require2.Tab;

var Data = function (_Component) {
  _inherits(Data, _Component);

  function Data(props) {
    _classCallCheck(this, Data);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Data).call(this, props));

    var _this$props$params = _this.props.params;
    var params = _this$props$params === undefined ? {} : _this$props$params;
    var _params$name = params.name;
    var collectionName = _params$name === undefined ? User._name : _params$name;


    _this.state = { col: collectionName };
    _this._data = App.collectionData(collectionName);
    _this._index = App.collectionIndexes(collectionName);
    _this._schema = App.schema;
    return _this;
  }

  _createClass(Data, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (this.props.app != nextProps.app) {
        this._data = App.collectionData(this.state.col);
        this._index = App.collectionIndexes(this.state.col);
        this._schema = App.schema;
        return true;
      }

      var nextCol = nextState.col;var col = this.state.col;

      if (nextCol != col) {
        this._data = App.collectionData(nextCol);
        this._index = App.collectionIndexes(nextCol);
        return true;
      }
      return false;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var colName = this.state.col;

      return React.createElement(
        'div',
        null,
        React.createElement(
          Tabs,
          null,
          React.createElement(
            Tab,
            { label: colName },
            React.createElement(List.Table, { className: 'data', model: this._data, key: colName })
          ),
          React.createElement(
            Tab,
            { label: 'Indexes' },
            React.createElement(List, { model: this._index, template: IndexItem, key: colName })
          )
        ),
        React.createElement(CommandBar, { className: 'footbar', style: { textAlign: 'left' },
          onSelect: this.onSelect.bind(this),
          items: [{ action: "Back" }, { action: "Upload Schema", label: "Schema", icon: _fileUpload2.default }, { action: "Upload Data", label: "Data", icon: _fileUpload2.default }, { action: "Collection", icon: _moreVert2.default, onSelect: function onSelect() {
              return _this2.refs.names.show();
            } }] }),
        React.createElement(Names, { ref: 'names', model: this._schema,
          onItemClick: function onItemClick(a) {
            _this2.refs.names.dismiss();
            _this2.setState({ col: a.name });
            _this2.context.router.replaceWith("data", { name: a.name });
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
            App.setSchema(schema).then(function () {
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
            App.collectionData(kind, data).then(function () {
              return _this3.forceUpdate();
            });
          });
          break;
      }
    }
  }]);

  return Data;
}(Component);

exports.default = Data;


Data.contextTypes = { router: React.PropTypes.func };

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


      return React.createElement(List.Item, { primaryText: name, secondaryText: '' + (unique ? 'unique ' : '') + (sparse ? 'sparse ' : '') + text });
    }
  }]);

  return IndexItem;
}(Component);

var Names = function (_CommandBar$DialogCom) {
  _inherits(Names, _CommandBar$DialogCom);

  function Names() {
    _classCallCheck(this, Names);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Names).apply(this, arguments));
  }

  _createClass(Names, [{
    key: 'renderContent',
    value: function renderContent() {
      return React.createElement(List, _extends({}, this.props, { template: NameItem }));
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

      return React.createElement(List.Item, _extends({ primaryText: model.name, leftIcon: React.createElement('span', null) }, others));
    }
  }]);

  return NameItem;
}(Component);

Data.NameItem = NameItem;
Data.IndexItem = IndexItem;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXRhLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFLQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztBQU5JLFlBQU0sUUFBUSxPQUFSLENBQU47O2VBQ3dFLFFBQVEsR0FBUjs7SUFBdkU7SUFBVzsyQkFBTTtJQUFLO0lBQU07SUFBUztJQUFPO0FBQTdDLElBQXlELHVDQUF6RDtBQUNBLFVBQUksUUFBUSxVQUFSLENBQUo7O2dCQUNZLFFBQVEsYUFBUjs7SUFBWDtJQUFNOztJQUtVOzs7QUFDakIsV0FEaUIsSUFDakIsQ0FBWSxLQUFaLEVBQWtCOzBCQURELE1BQ0M7O3VFQURELGlCQUVQLFFBRFE7OzZCQUVFLE1BQUssS0FBTCxDQUFYLE9BRlM7QUFFVixRQUFDLDRDQUFPLHVCQUFSLENBRlU7dUJBR3VCLE9BQWhDLEtBSFM7UUFHSiw4Q0FBZSxLQUFLLEtBQUwsZ0JBSFg7OztBQUtkLFVBQUssS0FBTCxHQUFXLEVBQUMsS0FBSSxjQUFKLEVBQVosQ0FMYztBQU1kLFVBQUssS0FBTCxHQUFZLElBQUksY0FBSixDQUFtQixjQUFuQixDQUFaLENBTmM7QUFPZCxVQUFLLE1BQUwsR0FBWSxJQUFJLGlCQUFKLENBQXNCLGNBQXRCLENBQVosQ0FQYztBQVFkLFVBQUssT0FBTCxHQUFhLElBQUksTUFBSixDQVJDOztHQUFsQjs7ZUFEaUI7OzBDQVlLLFdBQVcsV0FBVTtBQUN2QyxVQUFHLEtBQUssS0FBTCxDQUFXLEdBQVgsSUFBZ0IsVUFBVSxHQUFWLEVBQWM7QUFDN0IsYUFBSyxLQUFMLEdBQVksSUFBSSxjQUFKLENBQW1CLEtBQUssS0FBTCxDQUFXLEdBQVgsQ0FBL0IsQ0FENkI7QUFFN0IsYUFBSyxNQUFMLEdBQVksSUFBSSxpQkFBSixDQUFzQixLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWxDLENBRjZCO0FBRzdCLGFBQUssT0FBTCxHQUFhLElBQUksTUFBSixDQUhnQjtBQUk3QixlQUFPLElBQVAsQ0FKNkI7T0FBakM7O0FBT0ksVUFBSyxVQUFTLFVBQWIsR0FBRCxDQVJtQyxJQVFULE1BQUssS0FBSyxLQUFMLENBQUwsSUFSUzs7QUFTdkMsVUFBRyxXQUFTLEdBQVQsRUFBYTtBQUNaLGFBQUssS0FBTCxHQUFZLElBQUksY0FBSixDQUFtQixPQUFuQixDQUFaLENBRFk7QUFFWixhQUFLLE1BQUwsR0FBWSxJQUFJLGlCQUFKLENBQXNCLE9BQXRCLENBQVosQ0FGWTtBQUdaLGVBQU8sSUFBUCxDQUhZO09BQWhCO0FBS0EsYUFBTyxLQUFQLENBZHVDOzs7OzZCQWlCbkM7OztVQUNELFVBQVMsS0FBSyxLQUFMLENBQWIsSUFESzs7QUFFSixhQUNMOzs7UUFDQztBQUFDLGNBQUQ7O1VBQ0M7QUFBQyxlQUFEO2NBQUssT0FBTyxPQUFQLEVBQUw7WUFDQyxvQkFBQyxLQUFLLEtBQU4sSUFBWSxXQUFVLE1BQVYsRUFBaUIsT0FBTyxLQUFLLEtBQUwsRUFBWSxLQUFLLE9BQUwsRUFBaEQsQ0FERDtXQUREO1VBSUM7QUFBQyxlQUFEO2NBQUssT0FBTSxTQUFOLEVBQUw7WUFDRSxvQkFBQyxJQUFELElBQU0sT0FBTyxLQUFLLE1BQUwsRUFBYSxVQUFVLFNBQVYsRUFBcUIsS0FBSyxPQUFMLEVBQS9DLENBREY7V0FKRDtTQUREO1FBU0Msb0JBQUMsVUFBRCxJQUFZLFdBQVUsU0FBVixFQUFvQixPQUFPLEVBQUMsV0FBVSxNQUFWLEVBQVI7QUFDL0Isb0JBQVUsS0FBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixJQUFuQixDQUFWO0FBQ0EsaUJBQU8sQ0FDWSxFQUFDLFFBQU8sTUFBUCxFQURiLEVBRVksRUFBQyxRQUFPLGVBQVAsRUFBd0IsT0FBTSxRQUFOLEVBQWdCLDBCQUF6QyxFQUZaLEVBR1ksRUFBQyxRQUFPLGFBQVAsRUFBc0IsT0FBTSxNQUFOLEVBQWMsMEJBQXJDLEVBSFosRUFJWSxFQUFDLFFBQU8sWUFBUCxFQUFxQix3QkFBdEIsRUFBaUMsVUFBUztxQkFBSSxPQUFLLElBQUwsQ0FBVSxLQUFWLENBQWdCLElBQWhCO2FBQUosRUFKdEQsQ0FBUCxFQUZELENBVEQ7UUFpQmEsb0JBQUMsS0FBRCxJQUFPLEtBQUksT0FBSixFQUFZLE9BQU8sS0FBSyxPQUFMO0FBQ3RCLHVCQUFhLHFCQUFDLENBQUQsRUFBSztBQUNkLG1CQUFLLElBQUwsQ0FBVSxLQUFWLENBQWdCLE9BQWhCLEdBRGM7QUFFZCxtQkFBSyxRQUFMLENBQWMsRUFBQyxLQUFJLEVBQUUsSUFBRixFQUFuQixFQUZjO0FBR2QsbUJBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsV0FBcEIsQ0FBZ0MsTUFBaEMsRUFBdUMsRUFBQyxNQUFLLEVBQUUsSUFBRixFQUE3QyxFQUhjO1dBQUwsRUFEakIsQ0FqQmI7T0FESyxDQUZJOzs7OzZCQTZCQyxLQUFJOzs7QUFDVCxjQUFPLEdBQVA7QUFDTixhQUFLLGVBQUw7QUFDQyx1QkFBYSxrQkFBYixHQUNFLElBREYsQ0FDTyxnQkFBaUI7Z0JBQVYsY0FBTCxLQUFlOztBQUNQLGdCQUFHLENBQUMsTUFBRCxJQUFXLE9BQU8sTUFBUCxJQUFlLENBQWYsRUFDNUIsT0FEYztBQUVmLGdCQUFJLFNBQUosQ0FBYyxNQUFkLEVBQ29CLElBRHBCLENBQ3lCO3FCQUFJLE9BQUssV0FBTDthQUFKLENBRHpCLENBSHNCO1dBQWpCLENBRFAsQ0FERDtBQVFBLGdCQVJBO0FBRE0sYUFVRCxhQUFMO0FBQ0MsdUJBQWEsa0JBQWIsR0FDRSxJQURGLENBQ08saUJBQWU7Z0JBQWIsa0JBQWE7Z0JBQVIsa0JBQVE7O0FBQ3BCLGdCQUFHLENBQUMsSUFBRCxJQUFTLEtBQUssTUFBTCxJQUFhLENBQWIsRUFDWCxPQUREO0FBRUEsZ0JBQUksT0FBSyxLQUFLLEtBQUwsQ0FBVyxRQUFYLEVBQXFCLEdBQXJCLEdBQTJCLEtBQTNCLENBQWlDLEdBQWpDLEVBQXNDLENBQXRDLENBQUwsQ0FIZ0I7QUFJcEIsZ0JBQUksY0FBSixDQUFtQixJQUFuQixFQUF5QixJQUF6QixFQUNvQixJQURwQixDQUN5QjtxQkFBSSxPQUFLLFdBQUw7YUFBSixDQUR6QixDQUpvQjtXQUFmLENBRFAsQ0FERDtBQVNBLGdCQVRBO0FBVk0sT0FEUzs7OztTQTFESTtFQUFhOztrQkFBYjs7O0FBbUZyQixLQUFLLFlBQUwsR0FBa0IsRUFBQyxRQUFPLE1BQU0sU0FBTixDQUFnQixJQUFoQixFQUExQjs7SUFFTTs7Ozs7Ozs7Ozs7NkJBQ0c7QUFDSCxVQUFDLFFBQU8sS0FBSyxLQUFMLENBQVAsS0FBRCxDQURHOzJCQUVPLE1BQVosUUFGSztBQUVOLFVBQUMseUNBQVEsbUJBQVQsQ0FGTTtBQUdOLGlCQUFLLE9BQU8sSUFBUCxDQUFZLEtBQVosRUFBbUIsTUFBbkIsQ0FBMEIsVUFBQyxDQUFEO2VBQUssS0FBRyxTQUFIO09BQUwsQ0FBL0IsQ0FITTtBQUlOLGlCQUFLLEtBQUssR0FBTCxDQUFTLFVBQUMsQ0FBRDtxQkFBUyxLQUFJLE1BQU0sQ0FBTixLQUFVLENBQVYsR0FBYyxNQUFkLEdBQXVCLE9BQXZCO09BQWIsQ0FBVCxDQUF3RCxJQUF4RCxDQUE2RCxJQUE3RCxDQUFMLENBSk07VUFLTCxTQUFxQyxRQUFyQyxPQUxLO1VBS0csU0FBNkIsUUFBN0IsT0FMSDswQkFLZ0MsUUFBckIsS0FMWDtVQUtXLHFDQUFLLEtBQUssSUFBTCxDQUFVLEdBQVYsa0JBTGhCOzs7QUFPUCxhQUFRLG9CQUFDLEtBQUssSUFBTixJQUFXLGFBQWEsSUFBYixFQUFtQixxQkFBa0IsU0FBTyxTQUFQLEdBQWlCLEVBQWpCLEtBQXNCLFNBQU8sU0FBUCxHQUFpQixFQUFqQixJQUFzQixJQUE5RCxFQUE5QixDQUFSLENBUE87Ozs7U0FESDtFQUFrQjs7SUFXbEI7Ozs7Ozs7Ozs7O29DQUNhO0FBQ1gsYUFBUSxvQkFBQyxJQUFELGVBQVUsS0FBSyxLQUFMLElBQVksVUFBVSxRQUFWLEdBQXRCLENBQVIsQ0FEVzs7OztTQURiO0VBQWMsV0FBVyxhQUFYOztJQU1kOzs7Ozs7Ozs7Ozs2QkFDRzttQkFDYyxLQUFLLEtBQUwsQ0FEZDtVQUNILHFCQURHOztVQUNNLHFEQUROOztBQUVQLGFBQ0Msb0JBQUMsS0FBSyxJQUFOLGFBQVcsYUFBYSxNQUFNLElBQU4sRUFBWSxVQUFVLGlDQUFWLElBQXdCLE9BQTVELENBREQsQ0FGTzs7OztTQURIO0VBQWlCOztBQVV2QixLQUFLLFFBQUwsR0FBYyxRQUFkO0FBQ0EsS0FBSyxTQUFMLEdBQWUsU0FBZiIsImZpbGUiOiJkYXRhLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIFJlYWN0PXJlcXVpcmUoJ3JlYWN0JyksXG4gICAge0NvbXBvbmVudCwgVXNlciwgVUk6IHtMaXN0LCBMb2FkaW5nLCBFbXB0eSwgQ29tbWFuZEJhciwgZmlsZVNlbGVjdG9yfX09cmVxdWlyZSgnLicpLFxuICAgIEFwcD1yZXF1aXJlKFwiLi9kYi9hcHBcIiksXG4gICAge1RhYnMsIFRhYn09cmVxdWlyZSgnbWF0ZXJpYWwtdWknKTtcblxuaW1wb3J0IFVwbG9hZCBmcm9tIFwibWF0ZXJpYWwtdWkvbGliL3N2Zy1pY29ucy9maWxlL2ZpbGUtdXBsb2FkXCJcbmltcG9ydCBNb3JlIGZyb20gXCJtYXRlcmlhbC11aS9saWIvc3ZnLWljb25zL25hdmlnYXRpb24vbW9yZS12ZXJ0XCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0YSBleHRlbmRzIENvbXBvbmVudHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB2YXIge3BhcmFtcz17fX09dGhpcy5wcm9wcyxcbiAgICAgICAgICAgIHtuYW1lOmNvbGxlY3Rpb25OYW1lPVVzZXIuX25hbWV9PXBhcmFtcztcblxuICAgICAgICB0aGlzLnN0YXRlPXtjb2w6Y29sbGVjdGlvbk5hbWV9XG4gICAgICAgIHRoaXMuX2RhdGE9IEFwcC5jb2xsZWN0aW9uRGF0YShjb2xsZWN0aW9uTmFtZSlcbiAgICAgICAgdGhpcy5faW5kZXg9QXBwLmNvbGxlY3Rpb25JbmRleGVzKGNvbGxlY3Rpb25OYW1lKVxuICAgICAgICB0aGlzLl9zY2hlbWE9QXBwLnNjaGVtYVxuICAgIH1cblxuICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSl7XG4gICAgICAgIGlmKHRoaXMucHJvcHMuYXBwIT1uZXh0UHJvcHMuYXBwKXtcbiAgICAgICAgICAgIHRoaXMuX2RhdGE9IEFwcC5jb2xsZWN0aW9uRGF0YSh0aGlzLnN0YXRlLmNvbClcbiAgICAgICAgICAgIHRoaXMuX2luZGV4PUFwcC5jb2xsZWN0aW9uSW5kZXhlcyh0aGlzLnN0YXRlLmNvbClcbiAgICAgICAgICAgIHRoaXMuX3NjaGVtYT1BcHAuc2NoZW1hXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHtjb2w6bmV4dENvbH09bmV4dFN0YXRlLCB7Y29sfT10aGlzLnN0YXRlXG4gICAgICAgIGlmKG5leHRDb2whPWNvbCl7XG4gICAgICAgICAgICB0aGlzLl9kYXRhPSBBcHAuY29sbGVjdGlvbkRhdGEobmV4dENvbClcbiAgICAgICAgICAgIHRoaXMuX2luZGV4PUFwcC5jb2xsZWN0aW9uSW5kZXhlcyhuZXh0Q29sKVxuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcblx0XHR2YXIge2NvbDpjb2xOYW1lfT10aGlzLnN0YXRlXG4gICAgICAgIHJldHVybiAoXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHQ8VGFicz5cblx0XHRcdFx0XHQ8VGFiIGxhYmVsPXtjb2xOYW1lfT5cblx0XHRcdFx0XHRcdDxMaXN0LlRhYmxlIGNsYXNzTmFtZT1cImRhdGFcIiBtb2RlbD17dGhpcy5fZGF0YX0ga2V5PXtjb2xOYW1lfS8+XG5cdFx0XHRcdFx0PC9UYWI+XG5cdFx0XHRcdFx0PFRhYiBsYWJlbD1cIkluZGV4ZXNcIj5cblx0XHRcdFx0XHRcdHs8TGlzdCBtb2RlbD17dGhpcy5faW5kZXh9IHRlbXBsYXRlPXtJbmRleEl0ZW19IGtleT17Y29sTmFtZX0vPn1cblx0XHRcdFx0XHQ8L1RhYj5cblx0XHRcdFx0PC9UYWJzPlxuXHRcdFx0XHQ8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCIgc3R5bGU9e3t0ZXh0QWxpZ246J2xlZnQnfX1cblx0XHRcdFx0XHRvblNlbGVjdD17dGhpcy5vblNlbGVjdC5iaW5kKHRoaXMpfVxuXHRcdFx0XHRcdGl0ZW1zPXtbXG4gICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOlwiQmFja1wifSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJVcGxvYWQgU2NoZW1hXCIsIGxhYmVsOlwiU2NoZW1hXCIsIGljb246VXBsb2FkfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJVcGxvYWQgRGF0YVwiLCBsYWJlbDpcIkRhdGFcIiwgaWNvbjpVcGxvYWR9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcIkNvbGxlY3Rpb25cIiwgaWNvbjpNb3JlLCBvblNlbGVjdDooKT0+dGhpcy5yZWZzLm5hbWVzLnNob3coKX1cblx0XHRcdFx0XHRcdF19Lz5cbiAgICAgICAgICAgICAgICA8TmFtZXMgcmVmPVwibmFtZXNcIiBtb2RlbD17dGhpcy5fc2NoZW1hfVxuICAgICAgICAgICAgICAgICAgICBvbkl0ZW1DbGljaz17KGEpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnMubmFtZXMuZGlzbWlzcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y29sOmEubmFtZX0pXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLnJlcGxhY2VXaXRoKFwiZGF0YVwiLHtuYW1lOmEubmFtZX0pXG4gICAgICAgICAgICAgICAgICAgIH19Lz5cblx0XHRcdDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuICAgIG9uU2VsZWN0KGNtZCl7XG4gICAgICAgIHN3aXRjaChjbWQpe1xuXHRcdGNhc2UgXCJVcGxvYWQgU2NoZW1hXCI6XG5cdFx0XHRmaWxlU2VsZWN0b3Iuc2VsZWN0SnNvbkluSnNGaWxlKClcblx0XHRcdFx0LnRoZW4oKHtkYXRhOnNjaGVtYX0pPT57XG4gICAgICAgICAgICAgICAgICAgIGlmKCFzY2hlbWEgfHwgc2NoZW1hLmxlbmd0aD09MClcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRBcHAuc2V0U2NoZW1hKHNjaGVtYSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpPT50aGlzLmZvcmNlVXBkYXRlKCkpXG5cdFx0XHRcdH0pXG5cdFx0YnJlYWtcblx0XHRjYXNlIFwiVXBsb2FkIERhdGFcIjpcblx0XHRcdGZpbGVTZWxlY3Rvci5zZWxlY3RKc29uSW5Kc0ZpbGUoKVxuXHRcdFx0XHQudGhlbigoe2RhdGEsbmFtZX0pPT57XG5cdFx0XHRcdFx0aWYoIWRhdGEgfHwgZGF0YS5sZW5ndGg9PTApXG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0dmFyIGtpbmQ9bmFtZS5zcGxpdCgvW1xcL1xcXFxdLykucG9wKCkuc3BsaXQoJy4nKVswXVxuXHRcdFx0XHRcdEFwcC5jb2xsZWN0aW9uRGF0YShraW5kLCBkYXRhKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCk9PnRoaXMuZm9yY2VVcGRhdGUoKSlcblx0XHRcdFx0fSlcblx0XHRicmVha1xuICAgICAgICB9XG5cdH1cbn1cblxuRGF0YS5jb250ZXh0VHlwZXM9e3JvdXRlcjpSZWFjdC5Qcm9wVHlwZXMuZnVuY31cblxuY2xhc3MgSW5kZXhJdGVtIGV4dGVuZHMgQ29tcG9uZW50e1xuXHRyZW5kZXIoKXtcblx0XHR2YXIge21vZGVsfT10aGlzLnByb3BzLFxuXHRcdFx0eyRvcHRpb249e319PW1vZGVsLFxuXHRcdFx0a2V5cz1PYmplY3Qua2V5cyhtb2RlbCkuZmlsdGVyKChhKT0+YSE9JyRvcHRpb24nKSxcblx0XHRcdHRleHQ9a2V5cy5tYXAoKGEpPT5gICR7YX0ke21vZGVsW2FdPT0xID8gJyBhc2MnIDogJyBkZXNjJ31gKS5qb2luKCcsICcpLFxuXHRcdFx0e3VuaXF1ZSwgc3BhcnNlLCBuYW1lPWtleXMuam9pbignLCcpfT0kb3B0aW9uO1xuXG5cdFx0cmV0dXJuICg8TGlzdC5JdGVtIHByaW1hcnlUZXh0PXtuYW1lfSBzZWNvbmRhcnlUZXh0PXtgJHt1bmlxdWU/J3VuaXF1ZSAnOicnfSR7c3BhcnNlPydzcGFyc2UgJzonJ30ke3RleHR9YH0vPilcblx0fVxufVxuY2xhc3MgTmFtZXMgZXh0ZW5kcyBDb21tYW5kQmFyLkRpYWxvZ0NvbW1hbmR7XG4gICAgcmVuZGVyQ29udGVudCgpe1xuICAgICAgICByZXR1cm4gKDxMaXN0IHsuLi50aGlzLnByb3BzfSB0ZW1wbGF0ZT17TmFtZUl0ZW19Lz4pXG4gICAgfVxufVxuXG5jbGFzcyBOYW1lSXRlbSBleHRlbmRzIENvbXBvbmVudHtcblx0cmVuZGVyKCl7XG5cdFx0dmFye21vZGVsLC4uLm90aGVyc309dGhpcy5wcm9wc1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8TGlzdC5JdGVtIHByaW1hcnlUZXh0PXttb2RlbC5uYW1lfSBsZWZ0SWNvbj17PHNwYW4vPn0gIHsuLi5vdGhlcnN9Lz5cblx0XHQpXG5cdH1cbn1cblxuXG5EYXRhLk5hbWVJdGVtPU5hbWVJdGVtXG5EYXRhLkluZGV4SXRlbT1JbmRleEl0ZW1cbiJdfQ==