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
		var _Object$getPrototypeO;

		var _temp, _this, _ret;

		_classCallCheck(this, Data);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Data)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = { data: null, index: null, schema: null }, _temp), _possibleConstructorReturn(_this, _ret);
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
			var _props = this.props;
			var name = _props.params.name;
			var app = _props.app;

			this.getData(name, app);
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (this.props.app != nextProps.app) this.getData(this.props.params.name, nextProps.app);else if (this.props.params.name != nextProps.params.name) this.getData(nextProps.params.name);
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
					items: [{ action: "Upload Schema", label: "Schema", icon: _fileUpload2.default }, { action: "Upload Data", label: "Data:[colName].js", icon: _fileUpload2.default }, { action: "Collections", icon: _moreVert2.default, onSelect: function onSelect(a) {
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
					fileSelector.selectJsonInJsFile().then(function (_ref) {
						var schema = _ref.data;

						if (!schema || schema.length == 0) return;
						_app2.default.setSchema(schema).then(function (a) {
							return _this3.setState({ schema: schema });
						});
					});
					break;
				case "Upload Data":
					fileSelector.selectJsonInJsFile().then(function (_ref2) {
						var data = _ref2.data;
						var name = _ref2.name;

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

Data.contextTypes = { router: _react2.default.PropTypes.object };
Data.Names = (_temp2 = _class = function (_CommandBar$DialogCom) {
	_inherits(_class, _CommandBar$DialogCom);

	function _class() {
		_classCallCheck(this, _class);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
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

		return _possibleConstructorReturn(this, Object.getPrototypeOf(_class2).apply(this, arguments));
	}

	_createClass(_class2, [{
		key: 'render',
		value: function render() {
			var _props2 = this.props;
			var model = _props2.model;

			var others = _objectWithoutProperties(_props2, ['model']);

			return _react2.default.createElement(List.Item, _extends({ primaryText: model.name, leftIcon: _react2.default.createElement(_storage2.default, null) }, others));
		}
	}]);

	return _class2;
}(_react.Component), _temp2);

Data.IndexItem = function (_Component3) {
	_inherits(_class3, _Component3);

	function _class3() {
		_classCallCheck(this, _class3);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(_class3).apply(this, arguments));
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
//# sourceMappingURL=data:application/json;base64,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UixDQURjOzs7OztFQURZLFdBQVcsYUFBWCxVQUtwQjs7Ozs7Ozs7Ozs7MkJBQ0U7aUJBQ2UsS0FBSyxLQUFMLENBRGY7T0FDRixzQkFERTs7T0FDTyxzREFEUDs7QUFFUCxVQUFRLDhCQUFDLEtBQUssSUFBTixhQUFXLGFBQWEsTUFBTSxJQUFOLEVBQVksVUFBVSxzREFBVixJQUEyQixPQUEvRCxDQUFSLENBRk87Ozs7Ozs7QUE3RlUsS0FvR2I7Ozs7Ozs7Ozs7OzJCQUNFO0FBQ0gsT0FBQyxRQUFPLEtBQUssS0FBTCxDQUFQLEtBQUQsQ0FERzt3QkFFTyxNQUFaLFFBRks7QUFFTixPQUFDLHlDQUFRLG1CQUFULENBRk07QUFHTixjQUFLLE9BQU8sSUFBUCxDQUFZLEtBQVosRUFBbUIsTUFBbkIsQ0FBMEIsVUFBQyxDQUFEO1dBQUssS0FBRyxTQUFIO0lBQUwsQ0FBL0IsQ0FITTtBQUlOLGNBQUssS0FBSyxHQUFMLENBQVMsVUFBQyxDQUFEO2lCQUFTLEtBQUksTUFBTSxDQUFOLEtBQVUsQ0FBVixHQUFjLE1BQWQsR0FBdUIsT0FBdkI7SUFBYixDQUFULENBQXdELElBQXhELENBQTZELElBQTdELENBQUwsQ0FKTTtPQUtMLFNBQXFDLFFBQXJDLE9BTEs7T0FLRyxTQUE2QixRQUE3QixPQUxIO3VCQUtnQyxRQUFyQixLQUxYO09BS1cscUNBQUssS0FBSyxJQUFMLENBQVUsR0FBVixrQkFMaEI7OztBQU9QLFVBQVEsOEJBQUMsS0FBSyxJQUFOLElBQVcsYUFBYSxJQUFiO0FBQ2hCLHlCQUFrQixTQUFPLFNBQVAsR0FBaUIsRUFBakIsS0FBc0IsU0FBTyxTQUFQLEdBQWlCLEVBQWpCLElBQXNCLElBQTlELEVBREssQ0FBUixDQVBPOzs7Ozs7O2tCQXJHVyIsImZpbGUiOiJkYXRhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCdcbmltcG9ydCB7VXNlciwgVUl9IGZyb20gJy4nXG5pbXBvcnQgQXBwIGZyb20gXCIuL2RiL2FwcFwiXG5pbXBvcnQge1RhYnMsIFRhYn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5cbmltcG9ydCBVcGxvYWQgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9maWxlL2ZpbGUtdXBsb2FkXCJcbmltcG9ydCBNb3JlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbmF2aWdhdGlvbi9tb3JlLXZlcnRcIlxuaW1wb3J0IEljb25Db2wgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9kZXZpY2Uvc3RvcmFnZVwiXG5cbmNvbnN0IHtMaXN0LCBMb2FkaW5nLCBFbXB0eSwgQ29tbWFuZEJhciwgZmlsZVNlbGVjdG9yfT1VSVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0YSBleHRlbmRzIENvbXBvbmVudHtcbiAgICBzdGF0ZT17ZGF0YTpudWxsLCBpbmRleDpudWxsLCBzY2hlbWE6bnVsbH1cblx0XG5cdGdldERhdGEoY29sLCBhcHApe1xuXHRcdGxldCBzdGF0ZT17XG5cdFx0XHRkYXRhOkFwcC5jb2xsZWN0aW9uRGF0YShjb2wpLFxuXHRcdFx0aW5kZXg6QXBwLmNvbGxlY3Rpb25JbmRleGVzKGNvbClcblx0XHR9XG5cdFx0YXBwICYmIChzdGF0ZS5zY2hlbWE9QXBwLnNjaGVtYSk7XG5cdFx0XHRcblx0XHR0aGlzLnNldFN0YXRlKHN0YXRlKVxuXHR9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpe1xuXHRcdGxldCB7cGFyYW1zOntuYW1lfSwgYXBwfT10aGlzLnByb3BzXG4gICAgICAgIHRoaXMuZ2V0RGF0YShuYW1lLCBhcHApXG4gICAgfVxuXHRcblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpe1xuICAgICAgICBpZih0aGlzLnByb3BzLmFwcCE9bmV4dFByb3BzLmFwcClcblx0XHRcdHRoaXMuZ2V0RGF0YSh0aGlzLnByb3BzLnBhcmFtcy5uYW1lLCBuZXh0UHJvcHMuYXBwKVxuXHRcdGVsc2UgaWYodGhpcy5wcm9wcy5wYXJhbXMubmFtZSE9bmV4dFByb3BzLnBhcmFtcy5uYW1lKVxuXHRcdFx0dGhpcy5nZXREYXRhKG5leHRQcm9wcy5wYXJhbXMubmFtZSlcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcblx0XHRsZXQge2RhdGEsIGluZGV4LCBzY2hlbWF9PXRoaXMuc3RhdGVcblx0XHRsZXQge25hbWV9PXRoaXMucHJvcHMucGFyYW1zXG5cdFx0Y29uc3Qge0luZGV4SXRlbSwgTmFtZXN9PXRoaXMuY29uc3RydWN0b3JcbiAgICAgICAgcmV0dXJuIChcblx0XHRcdDxkaXY+XG5cdFx0XHRcdDxUYWJzPlxuXHRcdFx0XHRcdDxUYWIgbGFiZWw9e25hbWV9PlxuXHRcdFx0XHRcdFx0PExpc3QuVGFibGUgY2xhc3NOYW1lPVwiZGF0YVwiIG1vZGVsPXtkYXRhfSBrZXk9e25hbWV9Lz5cblx0XHRcdFx0XHQ8L1RhYj5cblx0XHRcdFx0XHQ8VGFiIGxhYmVsPVwiSW5kZXhlc1wiPlxuXHRcdFx0XHRcdFx0ezxMaXN0IG1vZGVsPXtpbmRleH0gdGVtcGxhdGU9e0luZGV4SXRlbX0ga2V5PXtuYW1lfS8+fVxuXHRcdFx0XHRcdDwvVGFiPlxuXHRcdFx0XHQ8L1RhYnM+XG5cdFx0XHRcdDxDb21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxuXHRcdFx0XHRcdG9uU2VsZWN0PXtjbWQ9PnRoaXMub25TZWxlY3QoY21kKX1cblx0XHRcdFx0XHRpdGVtcz17W1xuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcIlVwbG9hZCBTY2hlbWFcIiwgbGFiZWw6XCJTY2hlbWFcIiwgaWNvbjpVcGxvYWR9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcIlVwbG9hZCBEYXRhXCIsIGxhYmVsOlwiRGF0YTpbY29sTmFtZV0uanNcIiwgaWNvbjpVcGxvYWR9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcIkNvbGxlY3Rpb25zXCIsIGljb246TW9yZSwgb25TZWxlY3Q6YT0+dGhpcy5yZWZzLm5hbWVzLnNob3coKX1cblx0XHRcdFx0XHRcdF19Lz5cblx0XHRcdFx0XHRcdFxuICAgICAgICAgICAgICAgIHs8TmFtZXMgcmVmPVwibmFtZXNcIiBtb2RlbD17c2NoZW1hfVxuICAgICAgICAgICAgICAgICAgICBvbkl0ZW1DbGljaz17KGEpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnMubmFtZXMuZGlzbWlzcygpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLnB1c2goYGRhdGEvJHthLm5hbWV9YClcbiAgICAgICAgICAgICAgICAgICAgfX0vPn1cblx0XHRcdDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuICAgIG9uU2VsZWN0KGNtZCl7XG4gICAgICAgIHN3aXRjaChjbWQpe1xuXHRcdGNhc2UgXCJVcGxvYWQgU2NoZW1hXCI6XG5cdFx0XHRmaWxlU2VsZWN0b3Iuc2VsZWN0SnNvbkluSnNGaWxlKClcblx0XHRcdFx0LnRoZW4oKHtkYXRhOnNjaGVtYX0pPT57XG4gICAgICAgICAgICAgICAgICAgIGlmKCFzY2hlbWEgfHwgc2NoZW1hLmxlbmd0aD09MClcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRBcHAuc2V0U2NoZW1hKHNjaGVtYSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGE9PnRoaXMuc2V0U3RhdGUoe3NjaGVtYX0pKVxuXHRcdFx0XHR9KVxuXHRcdGJyZWFrXG5cdFx0Y2FzZSBcIlVwbG9hZCBEYXRhXCI6XG5cdFx0XHRmaWxlU2VsZWN0b3Iuc2VsZWN0SnNvbkluSnNGaWxlKClcblx0XHRcdFx0LnRoZW4oKHtkYXRhLG5hbWV9KT0+e1xuXHRcdFx0XHRcdGlmKCFkYXRhIHx8IGRhdGEubGVuZ3RoPT0wKVxuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdHZhciBraW5kPW5hbWUuc3BsaXQoL1tcXC9cXFxcXS8pLnBvcCgpLnNwbGl0KCcuJylbMF1cblx0XHRcdFx0XHRBcHAuY29sbGVjdGlvbkRhdGEoa2luZCwgZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGE9Pntcblx0XHRcdFx0XHRcdFx0bGV0IHBhdGg9YGRhdGEvJHtraW5kfWBcblx0XHRcdFx0XHRcdFx0aWYodGhpcy5jb250ZXh0LnJvdXRlci5pc0FjdGl2ZShwYXRoKSlcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKHtkYXRhOkFwcC5jb2xsZWN0aW9uRGF0YShraW5kKX0pXG5cdFx0XHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdFx0XHR0aGlzLmNvbnRleHQucm91dGVyLnB1c2goYGRhdGEvJHtraW5kfWApXG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9KVxuXHRcdGJyZWFrXG4gICAgICAgIH1cblx0fVxuXHRcblx0c3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOlJlYWN0LlByb3BUeXBlcy5vYmplY3R9XG5cdFxuXHRzdGF0aWMgTmFtZXM9Y2xhc3MgIGV4dGVuZHMgQ29tbWFuZEJhci5EaWFsb2dDb21tYW5ke1xuXHRcdHJlbmRlckNvbnRlbnQoKXtcblx0XHRcdHJldHVybiAoPExpc3Qgey4uLnRoaXMucHJvcHN9IHRlbXBsYXRlPXt0aGlzLmNvbnN0cnVjdG9yLk5hbWVJdGVtfS8+KVxuXHRcdH1cblx0XHRcblx0XHRzdGF0aWMgTmFtZUl0ZW09Y2xhc3MgZXh0ZW5kcyBDb21wb25lbnR7XG5cdFx0XHRyZW5kZXIoKXtcblx0XHRcdFx0bGV0IHttb2RlbCwuLi5vdGhlcnN9PXRoaXMucHJvcHNcblx0XHRcdFx0cmV0dXJuICg8TGlzdC5JdGVtIHByaW1hcnlUZXh0PXttb2RlbC5uYW1lfSBsZWZ0SWNvbj17PEljb25Db2wvPn0gIHsuLi5vdGhlcnN9Lz4pXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdFxuXHRzdGF0aWMgSW5kZXhJdGVtPWNsYXNzIGV4dGVuZHMgQ29tcG9uZW50e1xuXHRcdHJlbmRlcigpe1xuXHRcdFx0bGV0IHttb2RlbH09dGhpcy5wcm9wcyxcblx0XHRcdFx0eyRvcHRpb249e319PW1vZGVsLFxuXHRcdFx0XHRrZXlzPU9iamVjdC5rZXlzKG1vZGVsKS5maWx0ZXIoKGEpPT5hIT0nJG9wdGlvbicpLFxuXHRcdFx0XHR0ZXh0PWtleXMubWFwKChhKT0+YCAke2F9JHttb2RlbFthXT09MSA/ICcgYXNjJyA6ICcgZGVzYyd9YCkuam9pbignLCAnKSxcblx0XHRcdFx0e3VuaXF1ZSwgc3BhcnNlLCBuYW1lPWtleXMuam9pbignLCcpfT0kb3B0aW9uO1xuXG5cdFx0XHRyZXR1cm4gKDxMaXN0Lkl0ZW0gcHJpbWFyeVRleHQ9e25hbWV9IFxuXHRcdFx0XHRcdFx0c2Vjb25kYXJ5VGV4dD17YCR7dW5pcXVlPyd1bmlxdWUgJzonJ30ke3NwYXJzZT8nc3BhcnNlICc6Jyd9JHt0ZXh0fWB9Lz4pXG5cdFx0fVxuXHR9XG59XG4iXX0=