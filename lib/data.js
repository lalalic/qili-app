'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp2;

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

var _storage = require('material-ui/svg-icons/device/storage');

var _storage2 = _interopRequireDefault(_storage);

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

	function Data() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Data);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Data.__proto__ || Object.getPrototypeOf(Data)).call.apply(_ref, [this].concat(args))), _this), _this.state = { data: null, index: null, schema: null }, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Data, [{
		key: 'getData',
		value: function getData(col, app) {
			var state = {
				data: _app2.default.collectionData(col),
				index: _app2.default.collectionIndexes(col)
			};
			app && (state.schema = _app2.default.schema);

			this.setState(state);
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var name = this.props.params.name;

			this.getData(name, this.context.app);
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps, nextContext) {
			if (this.context.app != nextContext.app) this.getData(this.props.params.name, nextContext.app);else if (this.props.params.name != nextProps.params.name) this.getData(nextProps.params.name);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _state = this.state;
			var data = _state.data;
			var index = _state.index;
			var schema = _state.schema;
			var name = this.props.params.name;
			var _constructor = this.constructor;
			var IndexItem = _constructor.IndexItem;
			var Names = _constructor.Names;

			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					_materialUi.Tabs,
					null,
					_react2.default.createElement(
						_materialUi.Tab,
						{ label: name },
						_react2.default.createElement(List.Table, { className: 'data', model: data, key: name })
					),
					_react2.default.createElement(
						_materialUi.Tab,
						{ label: 'Indexes' },
						_react2.default.createElement(List, { model: index, template: IndexItem, key: name })
					)
				),
				_react2.default.createElement(CommandBar, { className: 'footbar',
					onSelect: function onSelect(cmd) {
						return _this2.onSelect(cmd);
					},
					items: [{ action: "Back" }, { action: "Upload Schema", label: "Schema", icon: _fileUpload2.default }, { action: "Upload Data", label: "Data:[colName].js", icon: _fileUpload2.default }, { action: "Collections", icon: _moreVert2.default, onSelect: function onSelect(a) {
							return _this2.refs.names.show();
						} }] }),
				_react2.default.createElement(Names, { ref: 'names', model: schema,
					onItemClick: function onItemClick(a) {
						_this2.refs.names.dismiss();
						_this2.context.router.push('data/' + a.name);
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
						_app2.default.setSchema(schema).then(function (a) {
							return _this3.setState({ schema: schema });
						});
					});
					break;
				case "Upload Data":
					fileSelector.selectJsonInJsFile().then(function (_ref3) {
						var data = _ref3.data;
						var name = _ref3.name;

						if (!data || data.length == 0) return;
						var kind = name.split(/[\/\\]/).pop().split('.')[0];
						_app2.default.collectionData(kind, data).then(function (a) {
							var path = 'data/' + kind;
							if (_this3.context.router.isActive(path)) _this3.setState({ data: _app2.default.collectionData(kind) });else _this3.context.router.push('data/' + kind);
						});
					});
					break;
			}
		}
	}]);

	return Data;
}(_react.Component);

Data.contextTypes = {
	router: _react2.default.PropTypes.object,
	app: _react2.default.PropTypes.object
};
Data.Names = (_temp2 = _class = function (_CommandBar$DialogCom) {
	_inherits(_class, _CommandBar$DialogCom);

	function _class() {
		_classCallCheck(this, _class);

		return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
	}

	_createClass(_class, [{
		key: 'renderContent',
		value: function renderContent() {
			return _react2.default.createElement(List, _extends({}, this.props, { template: this.constructor.NameItem }));
		}
	}]);

	return _class;
}(CommandBar.DialogCommand), _class.NameItem = function (_Component2) {
	_inherits(_class2, _Component2);

	function _class2() {
		_classCallCheck(this, _class2);

		return _possibleConstructorReturn(this, (_class2.__proto__ || Object.getPrototypeOf(_class2)).apply(this, arguments));
	}

	_createClass(_class2, [{
		key: 'render',
		value: function render() {
			var _props = this.props;
			var model = _props.model;

			var others = _objectWithoutProperties(_props, ['model']);

			return _react2.default.createElement(List.Item, _extends({ primaryText: model.name, leftIcon: _react2.default.createElement(_storage2.default, null) }, others));
		}
	}]);

	return _class2;
}(_react.Component), _temp2);

Data.IndexItem = function (_Component3) {
	_inherits(_class3, _Component3);

	function _class3() {
		_classCallCheck(this, _class3);

		return _possibleConstructorReturn(this, (_class3.__proto__ || Object.getPrototypeOf(_class3)).apply(this, arguments));
	}

	_createClass(_class3, [{
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


			return _react2.default.createElement(List.Item, { primaryText: name,
				secondaryText: '' + (unique ? 'unique ' : '') + (sparse ? 'sparse ' : '') + text });
		}
	}]);

	return _class3;
}(_react.Component);

exports.default = Data;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXRhLmpzIl0sIm5hbWVzIjpbIkxpc3QiLCJMb2FkaW5nIiwiRW1wdHkiLCJDb21tYW5kQmFyIiwiZmlsZVNlbGVjdG9yIiwiRGF0YSIsInN0YXRlIiwiZGF0YSIsImluZGV4Iiwic2NoZW1hIiwiY29sIiwiYXBwIiwiY29sbGVjdGlvbkRhdGEiLCJjb2xsZWN0aW9uSW5kZXhlcyIsInNldFN0YXRlIiwibmFtZSIsInByb3BzIiwicGFyYW1zIiwiZ2V0RGF0YSIsImNvbnRleHQiLCJuZXh0UHJvcHMiLCJuZXh0Q29udGV4dCIsImNvbnN0cnVjdG9yIiwiSW5kZXhJdGVtIiwiTmFtZXMiLCJvblNlbGVjdCIsImNtZCIsImFjdGlvbiIsImxhYmVsIiwiaWNvbiIsInJlZnMiLCJuYW1lcyIsInNob3ciLCJhIiwiZGlzbWlzcyIsInJvdXRlciIsInB1c2giLCJzZWxlY3RKc29uSW5Kc0ZpbGUiLCJ0aGVuIiwibGVuZ3RoIiwic2V0U2NoZW1hIiwia2luZCIsInNwbGl0IiwicG9wIiwicGF0aCIsImlzQWN0aXZlIiwiY29udGV4dFR5cGVzIiwiUHJvcFR5cGVzIiwib2JqZWN0IiwiTmFtZUl0ZW0iLCJEaWFsb2dDb21tYW5kIiwibW9kZWwiLCJvdGhlcnMiLCIkb3B0aW9uIiwiT2JqZWN0Iiwia2V5cyIsImZpbHRlciIsIm1hcCIsImpvaW4iLCJ1bmlxdWUiLCJzcGFyc2UiLCJ0ZXh0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVPQSxJLFFBQUFBLEk7SUFBTUMsTyxRQUFBQSxPO0lBQVNDLEssUUFBQUEsSztJQUFPQyxVLFFBQUFBLFU7SUFBWUMsWSxRQUFBQSxZOztJQUNwQkMsSTs7Ozs7Ozs7Ozs7Ozs7Z0xBQ2pCQyxLLEdBQU0sRUFBQ0MsTUFBSyxJQUFOLEVBQVlDLE9BQU0sSUFBbEIsRUFBd0JDLFFBQU8sSUFBL0IsRTs7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VUFBUSw4QkFBQyxJQUFELENBQU0sSUFBTixJQUFXLGFBQWEzQyxJQUF4QjtBQUNMLHlCQUFrQjRDLFNBQU8sU0FBUCxHQUFpQixFQUFuQyxLQUF3Q0MsU0FBTyxTQUFQLEdBQWlCLEVBQXpELElBQThEQyxJQUR6RCxHQUFSO0FBRUE7Ozs7OztrQkFqSGtCeEQsSSIsImZpbGUiOiJkYXRhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCdcbmltcG9ydCB7VXNlciwgVUl9IGZyb20gJy4nXG5pbXBvcnQgQXBwIGZyb20gXCIuL2RiL2FwcFwiXG5pbXBvcnQge1RhYnMsIFRhYn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5cbmltcG9ydCBVcGxvYWQgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9maWxlL2ZpbGUtdXBsb2FkXCJcbmltcG9ydCBNb3JlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbmF2aWdhdGlvbi9tb3JlLXZlcnRcIlxuaW1wb3J0IEljb25Db2wgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9kZXZpY2Uvc3RvcmFnZVwiXG5cbmNvbnN0IHtMaXN0LCBMb2FkaW5nLCBFbXB0eSwgQ29tbWFuZEJhciwgZmlsZVNlbGVjdG9yfT1VSVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0YSBleHRlbmRzIENvbXBvbmVudHtcbiAgICBzdGF0ZT17ZGF0YTpudWxsLCBpbmRleDpudWxsLCBzY2hlbWE6bnVsbH1cblx0XG5cdGdldERhdGEoY29sLCBhcHApe1xuXHRcdGxldCBzdGF0ZT17XG5cdFx0XHRkYXRhOkFwcC5jb2xsZWN0aW9uRGF0YShjb2wpLFxuXHRcdFx0aW5kZXg6QXBwLmNvbGxlY3Rpb25JbmRleGVzKGNvbClcblx0XHR9XG5cdFx0YXBwICYmIChzdGF0ZS5zY2hlbWE9QXBwLnNjaGVtYSk7XG5cdFx0XHRcblx0XHR0aGlzLnNldFN0YXRlKHN0YXRlKVxuXHR9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpe1xuXHRcdGxldCB7cGFyYW1zOntuYW1lfX09dGhpcy5wcm9wc1xuICAgICAgICB0aGlzLmdldERhdGEobmFtZSwgdGhpcy5jb250ZXh0LmFwcClcbiAgICB9XG5cdFxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcywgbmV4dENvbnRleHQpe1xuICAgICAgICBpZih0aGlzLmNvbnRleHQuYXBwIT1uZXh0Q29udGV4dC5hcHApXG5cdFx0XHR0aGlzLmdldERhdGEodGhpcy5wcm9wcy5wYXJhbXMubmFtZSwgbmV4dENvbnRleHQuYXBwKVxuXHRcdGVsc2UgaWYodGhpcy5wcm9wcy5wYXJhbXMubmFtZSE9bmV4dFByb3BzLnBhcmFtcy5uYW1lKVxuXHRcdFx0dGhpcy5nZXREYXRhKG5leHRQcm9wcy5wYXJhbXMubmFtZSlcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcblx0XHRsZXQge2RhdGEsIGluZGV4LCBzY2hlbWF9PXRoaXMuc3RhdGVcblx0XHRsZXQge25hbWV9PXRoaXMucHJvcHMucGFyYW1zXG5cdFx0Y29uc3Qge0luZGV4SXRlbSwgTmFtZXN9PXRoaXMuY29uc3RydWN0b3JcbiAgICAgICAgcmV0dXJuIChcblx0XHRcdDxkaXY+XG5cdFx0XHRcdDxUYWJzPlxuXHRcdFx0XHRcdDxUYWIgbGFiZWw9e25hbWV9PlxuXHRcdFx0XHRcdFx0PExpc3QuVGFibGUgY2xhc3NOYW1lPVwiZGF0YVwiIG1vZGVsPXtkYXRhfSBrZXk9e25hbWV9Lz5cblx0XHRcdFx0XHQ8L1RhYj5cblx0XHRcdFx0XHQ8VGFiIGxhYmVsPVwiSW5kZXhlc1wiPlxuXHRcdFx0XHRcdFx0ezxMaXN0IG1vZGVsPXtpbmRleH0gdGVtcGxhdGU9e0luZGV4SXRlbX0ga2V5PXtuYW1lfS8+fVxuXHRcdFx0XHRcdDwvVGFiPlxuXHRcdFx0XHQ8L1RhYnM+XG5cdFx0XHRcdDxDb21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxuXHRcdFx0XHRcdG9uU2VsZWN0PXtjbWQ9PnRoaXMub25TZWxlY3QoY21kKX1cblx0XHRcdFx0XHRpdGVtcz17W3thY3Rpb246XCJCYWNrXCJ9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcIlVwbG9hZCBTY2hlbWFcIiwgbGFiZWw6XCJTY2hlbWFcIiwgaWNvbjpVcGxvYWR9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcIlVwbG9hZCBEYXRhXCIsIGxhYmVsOlwiRGF0YTpbY29sTmFtZV0uanNcIiwgaWNvbjpVcGxvYWR9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcIkNvbGxlY3Rpb25zXCIsIGljb246TW9yZSwgb25TZWxlY3Q6YT0+dGhpcy5yZWZzLm5hbWVzLnNob3coKX1cblx0XHRcdFx0XHRcdF19Lz5cblx0XHRcdFx0XHRcdFxuICAgICAgICAgICAgICAgIHs8TmFtZXMgcmVmPVwibmFtZXNcIiBtb2RlbD17c2NoZW1hfVxuICAgICAgICAgICAgICAgICAgICBvbkl0ZW1DbGljaz17KGEpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnMubmFtZXMuZGlzbWlzcygpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLnB1c2goYGRhdGEvJHthLm5hbWV9YClcbiAgICAgICAgICAgICAgICAgICAgfX0vPn1cblx0XHRcdDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuICAgIG9uU2VsZWN0KGNtZCl7XG4gICAgICAgIHN3aXRjaChjbWQpe1xuXHRcdGNhc2UgXCJVcGxvYWQgU2NoZW1hXCI6XG5cdFx0XHRmaWxlU2VsZWN0b3Iuc2VsZWN0SnNvbkluSnNGaWxlKClcblx0XHRcdFx0LnRoZW4oKHtkYXRhOnNjaGVtYX0pPT57XG4gICAgICAgICAgICAgICAgICAgIGlmKCFzY2hlbWEgfHwgc2NoZW1hLmxlbmd0aD09MClcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRBcHAuc2V0U2NoZW1hKHNjaGVtYSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGE9PnRoaXMuc2V0U3RhdGUoe3NjaGVtYX0pKVxuXHRcdFx0XHR9KVxuXHRcdGJyZWFrXG5cdFx0Y2FzZSBcIlVwbG9hZCBEYXRhXCI6XG5cdFx0XHRmaWxlU2VsZWN0b3Iuc2VsZWN0SnNvbkluSnNGaWxlKClcblx0XHRcdFx0LnRoZW4oKHtkYXRhLG5hbWV9KT0+e1xuXHRcdFx0XHRcdGlmKCFkYXRhIHx8IGRhdGEubGVuZ3RoPT0wKVxuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdHZhciBraW5kPW5hbWUuc3BsaXQoL1tcXC9cXFxcXS8pLnBvcCgpLnNwbGl0KCcuJylbMF1cblx0XHRcdFx0XHRBcHAuY29sbGVjdGlvbkRhdGEoa2luZCwgZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGE9Pntcblx0XHRcdFx0XHRcdFx0bGV0IHBhdGg9YGRhdGEvJHtraW5kfWBcblx0XHRcdFx0XHRcdFx0aWYodGhpcy5jb250ZXh0LnJvdXRlci5pc0FjdGl2ZShwYXRoKSlcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKHtkYXRhOkFwcC5jb2xsZWN0aW9uRGF0YShraW5kKX0pXG5cdFx0XHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdFx0XHR0aGlzLmNvbnRleHQucm91dGVyLnB1c2goYGRhdGEvJHtraW5kfWApXG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9KVxuXHRcdGJyZWFrXG4gICAgICAgIH1cblx0fVxuXHRcblx0c3RhdGljIGNvbnRleHRUeXBlcz17XG5cdFx0cm91dGVyOlJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG5cdFx0YXBwOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0XG5cdH1cblx0XG5cdHN0YXRpYyBOYW1lcz1jbGFzcyAgZXh0ZW5kcyBDb21tYW5kQmFyLkRpYWxvZ0NvbW1hbmR7XG5cdFx0cmVuZGVyQ29udGVudCgpe1xuXHRcdFx0cmV0dXJuICg8TGlzdCB7Li4udGhpcy5wcm9wc30gdGVtcGxhdGU9e3RoaXMuY29uc3RydWN0b3IuTmFtZUl0ZW19Lz4pXG5cdFx0fVxuXHRcdFxuXHRcdHN0YXRpYyBOYW1lSXRlbT1jbGFzcyBleHRlbmRzIENvbXBvbmVudHtcblx0XHRcdHJlbmRlcigpe1xuXHRcdFx0XHRsZXQge21vZGVsLC4uLm90aGVyc309dGhpcy5wcm9wc1xuXHRcdFx0XHRyZXR1cm4gKDxMaXN0Lkl0ZW0gcHJpbWFyeVRleHQ9e21vZGVsLm5hbWV9IGxlZnRJY29uPXs8SWNvbkNvbC8+fSAgey4uLm90aGVyc30vPilcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0XG5cdHN0YXRpYyBJbmRleEl0ZW09Y2xhc3MgZXh0ZW5kcyBDb21wb25lbnR7XG5cdFx0cmVuZGVyKCl7XG5cdFx0XHRsZXQge21vZGVsfT10aGlzLnByb3BzLFxuXHRcdFx0XHR7JG9wdGlvbj17fX09bW9kZWwsXG5cdFx0XHRcdGtleXM9T2JqZWN0LmtleXMobW9kZWwpLmZpbHRlcigoYSk9PmEhPSckb3B0aW9uJyksXG5cdFx0XHRcdHRleHQ9a2V5cy5tYXAoKGEpPT5gICR7YX0ke21vZGVsW2FdPT0xID8gJyBhc2MnIDogJyBkZXNjJ31gKS5qb2luKCcsICcpLFxuXHRcdFx0XHR7dW5pcXVlLCBzcGFyc2UsIG5hbWU9a2V5cy5qb2luKCcsJyl9PSRvcHRpb247XG5cblx0XHRcdHJldHVybiAoPExpc3QuSXRlbSBwcmltYXJ5VGV4dD17bmFtZX0gXG5cdFx0XHRcdFx0XHRzZWNvbmRhcnlUZXh0PXtgJHt1bmlxdWU/J3VuaXF1ZSAnOicnfSR7c3BhcnNlPydzcGFyc2UgJzonJ30ke3RleHR9YH0vPilcblx0XHR9XG5cdH1cbn1cbiJdfQ==