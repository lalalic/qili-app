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

Data.contextTypes = {
	router: _react2.default.PropTypes.object,
	app: _react2.default.PropTypes.object
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXRhLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRU87SUFBTTtJQUFTO0lBQU87SUFBWTs7SUFDcEI7Ozs7Ozs7Ozs7Ozs7O2dNQUNqQixRQUFNLEVBQUMsTUFBSyxJQUFMLEVBQVcsT0FBTSxJQUFOLEVBQVksUUFBTyxJQUFQOzs7Y0FEYjs7MEJBR1osS0FBSyxLQUFJO0FBQ2hCLE9BQUksUUFBTTtBQUNULFVBQUssY0FBSSxjQUFKLENBQW1CLEdBQW5CLENBQUw7QUFDQSxXQUFNLGNBQUksaUJBQUosQ0FBc0IsR0FBdEIsQ0FBTjtJQUZHLENBRFk7QUFLaEIsV0FBUSxNQUFNLE1BQU4sR0FBYSxjQUFJLE1BQUosQ0FBckIsQ0FMZ0I7O0FBT2hCLFFBQUssUUFBTCxDQUFjLEtBQWQsRUFQZ0I7Ozs7c0NBVUs7T0FDUixPQUFPLEtBQUssS0FBTCxDQUFmLE9BQVEsS0FEUTs7QUFFZixRQUFLLE9BQUwsQ0FBYSxJQUFiLEVBQW1CLEtBQUssT0FBTCxDQUFhLEdBQWIsQ0FBbkIsQ0FGZTs7Ozs0Q0FLSSxXQUFXLGFBQVk7QUFDMUMsT0FBRyxLQUFLLE9BQUwsQ0FBYSxHQUFiLElBQWtCLFlBQVksR0FBWixFQUMxQixLQUFLLE9BQUwsQ0FBYSxLQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCLElBQWxCLEVBQXdCLFlBQVksR0FBWixDQUFyQyxDQURLLEtBRUQsSUFBRyxLQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCLElBQWxCLElBQXdCLFVBQVUsTUFBVixDQUFpQixJQUFqQixFQUMvQixLQUFLLE9BQUwsQ0FBYSxVQUFVLE1BQVYsQ0FBaUIsSUFBakIsQ0FBYixDQURJOzs7OzJCQUlLOzs7Z0JBQ2dCLEtBQUssS0FBTCxDQURoQjtPQUNMLG1CQURLO09BQ0MscUJBREQ7T0FDUSx1QkFEUjtPQUVMLE9BQU0sS0FBSyxLQUFMLENBQVcsTUFBWCxDQUFOLEtBRks7c0JBR2UsS0FBSyxXQUFMLENBSGY7T0FHSCxtQ0FIRztPQUdRLDJCQUhSOztBQUlKLFVBQ0w7OztJQUNDOzs7S0FDQzs7UUFBSyxPQUFPLElBQVAsRUFBTDtNQUNDLDhCQUFDLEtBQUssS0FBTixJQUFZLFdBQVUsTUFBVixFQUFpQixPQUFPLElBQVAsRUFBYSxLQUFLLElBQUwsRUFBMUMsQ0FERDtNQUREO0tBSUM7O1FBQUssT0FBTSxTQUFOLEVBQUw7TUFDRSw4QkFBQyxJQUFELElBQU0sT0FBTyxLQUFQLEVBQWMsVUFBVSxTQUFWLEVBQXFCLEtBQUssSUFBTCxFQUF6QyxDQURGO01BSkQ7S0FERDtJQVNDLDhCQUFDLFVBQUQsSUFBWSxXQUFVLFNBQVY7QUFDWCxlQUFVO2FBQUssT0FBSyxRQUFMLENBQWMsR0FBZDtNQUFMO0FBQ1YsWUFBTyxDQUFDLEVBQUMsUUFBTyxNQUFQLEVBQUYsRUFDWSxFQUFDLFFBQU8sZUFBUCxFQUF3QixPQUFNLFFBQU4sRUFBZ0IsMEJBQXpDLEVBRFosRUFFWSxFQUFDLFFBQU8sYUFBUCxFQUFzQixPQUFNLG1CQUFOLEVBQTJCLDBCQUFsRCxFQUZaLEVBR1ksRUFBQyxRQUFPLGFBQVAsRUFBc0Isd0JBQXZCLEVBQWtDLFVBQVM7Y0FBRyxPQUFLLElBQUwsQ0FBVSxLQUFWLENBQWdCLElBQWhCO09BQUgsRUFIdkQsQ0FBUCxFQUZELENBVEQ7SUFpQmMsOEJBQUMsS0FBRCxJQUFPLEtBQUksT0FBSixFQUFZLE9BQU8sTUFBUDtBQUNoQixrQkFBYSxxQkFBQyxDQUFELEVBQUs7QUFDZCxhQUFLLElBQUwsQ0FBVSxLQUFWLENBQWdCLE9BQWhCLEdBRGM7QUFFZCxhQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLElBQXBCLFdBQWlDLEVBQUUsSUFBRixDQUFqQyxDQUZjO01BQUwsRUFEaEIsQ0FqQmQ7SUFESyxDQUpJOzs7OzJCQThCQyxLQUFJOzs7QUFDVCxXQUFPLEdBQVA7QUFDTixTQUFLLGVBQUw7QUFDQyxrQkFBYSxrQkFBYixHQUNFLElBREYsQ0FDTyxnQkFBaUI7VUFBVixjQUFMLEtBQWU7O0FBQ1AsVUFBRyxDQUFDLE1BQUQsSUFBVyxPQUFPLE1BQVAsSUFBZSxDQUFmLEVBQzVCLE9BRGM7QUFFZixvQkFBSSxTQUFKLENBQWMsTUFBZCxFQUNvQixJQURwQixDQUN5QjtjQUFHLE9BQUssUUFBTCxDQUFjLEVBQUMsY0FBRCxFQUFkO09BQUgsQ0FEekIsQ0FIc0I7TUFBakIsQ0FEUCxDQUREO0FBUUEsV0FSQTtBQURNLFNBVUQsYUFBTDtBQUNDLGtCQUFhLGtCQUFiLEdBQ0UsSUFERixDQUNPLGlCQUFlO1VBQWIsa0JBQWE7VUFBUixrQkFBUTs7QUFDcEIsVUFBRyxDQUFDLElBQUQsSUFBUyxLQUFLLE1BQUwsSUFBYSxDQUFiLEVBQ1gsT0FERDtBQUVBLFVBQUksT0FBSyxLQUFLLEtBQUwsQ0FBVyxRQUFYLEVBQXFCLEdBQXJCLEdBQTJCLEtBQTNCLENBQWlDLEdBQWpDLEVBQXNDLENBQXRDLENBQUwsQ0FIZ0I7QUFJcEIsb0JBQUksY0FBSixDQUFtQixJQUFuQixFQUF5QixJQUF6QixFQUNvQixJQURwQixDQUN5QixhQUFHO0FBQzFCLFdBQUksaUJBQWEsSUFBYixDQURzQjtBQUUxQixXQUFHLE9BQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsUUFBcEIsQ0FBNkIsSUFBN0IsQ0FBSCxFQUNDLE9BQUssUUFBTCxDQUFjLEVBQUMsTUFBSyxjQUFJLGNBQUosQ0FBbUIsSUFBbkIsQ0FBTCxFQUFmLEVBREQsS0FHQyxPQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLElBQXBCLFdBQWlDLElBQWpDLEVBSEQ7T0FGdUIsQ0FEekIsQ0FKb0I7TUFBZixDQURQLENBREQ7QUFlQSxXQWZBO0FBVk0sSUFEUzs7OztRQXZESTs7O0tBcUZiLGVBQWE7QUFDbkIsU0FBTyxnQkFBTSxTQUFOLENBQWdCLE1BQWhCO0FBQ1AsTUFBSyxnQkFBTSxTQUFOLENBQWdCLE1BQWhCOztBQXZGYyxLQTBGYjs7Ozs7Ozs7Ozs7a0NBQ1M7QUFDZCxVQUFRLDhCQUFDLElBQUQsZUFBVSxLQUFLLEtBQUwsSUFBWSxVQUFVLEtBQUssV0FBTCxDQUFpQixRQUFqQixHQUFoQyxDQUFSLENBRGM7Ozs7O0VBRFksV0FBVyxhQUFYLFVBS3BCOzs7Ozs7Ozs7OzsyQkFDRTtnQkFDZSxLQUFLLEtBQUwsQ0FEZjtPQUNGLHFCQURFOztPQUNPLHFEQURQOztBQUVQLFVBQVEsOEJBQUMsS0FBSyxJQUFOLGFBQVcsYUFBYSxNQUFNLElBQU4sRUFBWSxVQUFVLHNEQUFWLElBQTJCLE9BQS9ELENBQVIsQ0FGTzs7Ozs7OztBQWhHVSxLQXVHYjs7Ozs7Ozs7Ozs7MkJBQ0U7QUFDSCxPQUFDLFFBQU8sS0FBSyxLQUFMLENBQVAsS0FBRCxDQURHO3dCQUVPLE1BQVosUUFGSztBQUVOLE9BQUMseUNBQVEsbUJBQVQsQ0FGTTtBQUdOLGNBQUssT0FBTyxJQUFQLENBQVksS0FBWixFQUFtQixNQUFuQixDQUEwQixVQUFDLENBQUQ7V0FBSyxLQUFHLFNBQUg7SUFBTCxDQUEvQixDQUhNO0FBSU4sY0FBSyxLQUFLLEdBQUwsQ0FBUyxVQUFDLENBQUQ7aUJBQVMsS0FBSSxNQUFNLENBQU4sS0FBVSxDQUFWLEdBQWMsTUFBZCxHQUF1QixPQUF2QjtJQUFiLENBQVQsQ0FBd0QsSUFBeEQsQ0FBNkQsSUFBN0QsQ0FBTCxDQUpNO09BS0wsU0FBcUMsUUFBckMsT0FMSztPQUtHLFNBQTZCLFFBQTdCLE9BTEg7dUJBS2dDLFFBQXJCLEtBTFg7T0FLVyxxQ0FBSyxLQUFLLElBQUwsQ0FBVSxHQUFWLGtCQUxoQjs7O0FBT1AsVUFBUSw4QkFBQyxLQUFLLElBQU4sSUFBVyxhQUFhLElBQWI7QUFDaEIseUJBQWtCLFNBQU8sU0FBUCxHQUFpQixFQUFqQixLQUFzQixTQUFPLFNBQVAsR0FBaUIsRUFBakIsSUFBc0IsSUFBOUQsRUFESyxDQUFSLENBUE87Ozs7Ozs7a0JBeEdXIiwiZmlsZSI6ImRhdGEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtVc2VyLCBVSX0gZnJvbSAnLidcbmltcG9ydCBBcHAgZnJvbSBcIi4vZGIvYXBwXCJcbmltcG9ydCB7VGFicywgVGFifSBmcm9tICdtYXRlcmlhbC11aSdcblxuaW1wb3J0IFVwbG9hZCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ZpbGUvZmlsZS11cGxvYWRcIlxuaW1wb3J0IE1vcmUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9uYXZpZ2F0aW9uL21vcmUtdmVydFwiXG5pbXBvcnQgSWNvbkNvbCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2RldmljZS9zdG9yYWdlXCJcblxuY29uc3Qge0xpc3QsIExvYWRpbmcsIEVtcHR5LCBDb21tYW5kQmFyLCBmaWxlU2VsZWN0b3J9PVVJXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRhIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHN0YXRlPXtkYXRhOm51bGwsIGluZGV4Om51bGwsIHNjaGVtYTpudWxsfVxuXHRcblx0Z2V0RGF0YShjb2wsIGFwcCl7XG5cdFx0bGV0IHN0YXRlPXtcblx0XHRcdGRhdGE6QXBwLmNvbGxlY3Rpb25EYXRhKGNvbCksXG5cdFx0XHRpbmRleDpBcHAuY29sbGVjdGlvbkluZGV4ZXMoY29sKVxuXHRcdH1cblx0XHRhcHAgJiYgKHN0YXRlLnNjaGVtYT1BcHAuc2NoZW1hKTtcblx0XHRcdFxuXHRcdHRoaXMuc2V0U3RhdGUoc3RhdGUpXG5cdH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0bGV0IHtwYXJhbXM6e25hbWV9fT10aGlzLnByb3BzXG4gICAgICAgIHRoaXMuZ2V0RGF0YShuYW1lLCB0aGlzLmNvbnRleHQuYXBwKVxuICAgIH1cblx0XG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzLCBuZXh0Q29udGV4dCl7XG4gICAgICAgIGlmKHRoaXMuY29udGV4dC5hcHAhPW5leHRDb250ZXh0LmFwcClcblx0XHRcdHRoaXMuZ2V0RGF0YSh0aGlzLnByb3BzLnBhcmFtcy5uYW1lLCBuZXh0Q29udGV4dC5hcHApXG5cdFx0ZWxzZSBpZih0aGlzLnByb3BzLnBhcmFtcy5uYW1lIT1uZXh0UHJvcHMucGFyYW1zLm5hbWUpXG5cdFx0XHR0aGlzLmdldERhdGEobmV4dFByb3BzLnBhcmFtcy5uYW1lKVxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuXHRcdGxldCB7ZGF0YSwgaW5kZXgsIHNjaGVtYX09dGhpcy5zdGF0ZVxuXHRcdGxldCB7bmFtZX09dGhpcy5wcm9wcy5wYXJhbXNcblx0XHRjb25zdCB7SW5kZXhJdGVtLCBOYW1lc309dGhpcy5jb25zdHJ1Y3RvclxuICAgICAgICByZXR1cm4gKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0PFRhYnM+XG5cdFx0XHRcdFx0PFRhYiBsYWJlbD17bmFtZX0+XG5cdFx0XHRcdFx0XHQ8TGlzdC5UYWJsZSBjbGFzc05hbWU9XCJkYXRhXCIgbW9kZWw9e2RhdGF9IGtleT17bmFtZX0vPlxuXHRcdFx0XHRcdDwvVGFiPlxuXHRcdFx0XHRcdDxUYWIgbGFiZWw9XCJJbmRleGVzXCI+XG5cdFx0XHRcdFx0XHR7PExpc3QgbW9kZWw9e2luZGV4fSB0ZW1wbGF0ZT17SW5kZXhJdGVtfSBrZXk9e25hbWV9Lz59XG5cdFx0XHRcdFx0PC9UYWI+XG5cdFx0XHRcdDwvVGFicz5cblx0XHRcdFx0PENvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiXG5cdFx0XHRcdFx0b25TZWxlY3Q9e2NtZD0+dGhpcy5vblNlbGVjdChjbWQpfVxuXHRcdFx0XHRcdGl0ZW1zPXtbe2FjdGlvbjpcIkJhY2tcIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOlwiVXBsb2FkIFNjaGVtYVwiLCBsYWJlbDpcIlNjaGVtYVwiLCBpY29uOlVwbG9hZH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOlwiVXBsb2FkIERhdGFcIiwgbGFiZWw6XCJEYXRhOltjb2xOYW1lXS5qc1wiLCBpY29uOlVwbG9hZH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOlwiQ29sbGVjdGlvbnNcIiwgaWNvbjpNb3JlLCBvblNlbGVjdDphPT50aGlzLnJlZnMubmFtZXMuc2hvdygpfVxuXHRcdFx0XHRcdFx0XX0vPlxuXHRcdFx0XHRcdFx0XG4gICAgICAgICAgICAgICAgezxOYW1lcyByZWY9XCJuYW1lc1wiIG1vZGVsPXtzY2hlbWF9XG4gICAgICAgICAgICAgICAgICAgIG9uSXRlbUNsaWNrPXsoYSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcy5uYW1lcy5kaXNtaXNzKClcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChgZGF0YS8ke2EubmFtZX1gKVxuICAgICAgICAgICAgICAgICAgICB9fS8+fVxuXHRcdFx0PC9kaXY+XG4gICAgICAgIClcbiAgICB9XG4gICAgb25TZWxlY3QoY21kKXtcbiAgICAgICAgc3dpdGNoKGNtZCl7XG5cdFx0Y2FzZSBcIlVwbG9hZCBTY2hlbWFcIjpcblx0XHRcdGZpbGVTZWxlY3Rvci5zZWxlY3RKc29uSW5Kc0ZpbGUoKVxuXHRcdFx0XHQudGhlbigoe2RhdGE6c2NoZW1hfSk9PntcbiAgICAgICAgICAgICAgICAgICAgaWYoIXNjaGVtYSB8fCBzY2hlbWEubGVuZ3RoPT0wKVxuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdEFwcC5zZXRTY2hlbWEoc2NoZW1hKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oYT0+dGhpcy5zZXRTdGF0ZSh7c2NoZW1hfSkpXG5cdFx0XHRcdH0pXG5cdFx0YnJlYWtcblx0XHRjYXNlIFwiVXBsb2FkIERhdGFcIjpcblx0XHRcdGZpbGVTZWxlY3Rvci5zZWxlY3RKc29uSW5Kc0ZpbGUoKVxuXHRcdFx0XHQudGhlbigoe2RhdGEsbmFtZX0pPT57XG5cdFx0XHRcdFx0aWYoIWRhdGEgfHwgZGF0YS5sZW5ndGg9PTApXG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0dmFyIGtpbmQ9bmFtZS5zcGxpdCgvW1xcL1xcXFxdLykucG9wKCkuc3BsaXQoJy4nKVswXVxuXHRcdFx0XHRcdEFwcC5jb2xsZWN0aW9uRGF0YShraW5kLCBkYXRhKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oYT0+e1xuXHRcdFx0XHRcdFx0XHRsZXQgcGF0aD1gZGF0YS8ke2tpbmR9YFxuXHRcdFx0XHRcdFx0XHRpZih0aGlzLmNvbnRleHQucm91dGVyLmlzQWN0aXZlKHBhdGgpKVxuXHRcdFx0XHRcdFx0XHRcdHRoaXMuc2V0U3RhdGUoe2RhdGE6QXBwLmNvbGxlY3Rpb25EYXRhKGtpbmQpfSlcblx0XHRcdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0XHRcdHRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChgZGF0YS8ke2tpbmR9YClcblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdH0pXG5cdFx0YnJlYWtcbiAgICAgICAgfVxuXHR9XG5cdFxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcblx0XHRyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcblx0XHRhcHA6IFJlYWN0LlByb3BUeXBlcy5vYmplY3Rcblx0fVxuXHRcblx0c3RhdGljIE5hbWVzPWNsYXNzICBleHRlbmRzIENvbW1hbmRCYXIuRGlhbG9nQ29tbWFuZHtcblx0XHRyZW5kZXJDb250ZW50KCl7XG5cdFx0XHRyZXR1cm4gKDxMaXN0IHsuLi50aGlzLnByb3BzfSB0ZW1wbGF0ZT17dGhpcy5jb25zdHJ1Y3Rvci5OYW1lSXRlbX0vPilcblx0XHR9XG5cdFx0XG5cdFx0c3RhdGljIE5hbWVJdGVtPWNsYXNzIGV4dGVuZHMgQ29tcG9uZW50e1xuXHRcdFx0cmVuZGVyKCl7XG5cdFx0XHRcdGxldCB7bW9kZWwsLi4ub3RoZXJzfT10aGlzLnByb3BzXG5cdFx0XHRcdHJldHVybiAoPExpc3QuSXRlbSBwcmltYXJ5VGV4dD17bW9kZWwubmFtZX0gbGVmdEljb249ezxJY29uQ29sLz59ICB7Li4ub3RoZXJzfS8+KVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRcblx0c3RhdGljIEluZGV4SXRlbT1jbGFzcyBleHRlbmRzIENvbXBvbmVudHtcblx0XHRyZW5kZXIoKXtcblx0XHRcdGxldCB7bW9kZWx9PXRoaXMucHJvcHMsXG5cdFx0XHRcdHskb3B0aW9uPXt9fT1tb2RlbCxcblx0XHRcdFx0a2V5cz1PYmplY3Qua2V5cyhtb2RlbCkuZmlsdGVyKChhKT0+YSE9JyRvcHRpb24nKSxcblx0XHRcdFx0dGV4dD1rZXlzLm1hcCgoYSk9PmAgJHthfSR7bW9kZWxbYV09PTEgPyAnIGFzYycgOiAnIGRlc2MnfWApLmpvaW4oJywgJyksXG5cdFx0XHRcdHt1bmlxdWUsIHNwYXJzZSwgbmFtZT1rZXlzLmpvaW4oJywnKX09JG9wdGlvbjtcblxuXHRcdFx0cmV0dXJuICg8TGlzdC5JdGVtIHByaW1hcnlUZXh0PXtuYW1lfSBcblx0XHRcdFx0XHRcdHNlY29uZGFyeVRleHQ9e2Ake3VuaXF1ZT8ndW5pcXVlICc6Jyd9JHtzcGFyc2U/J3NwYXJzZSAnOicnfSR7dGV4dH1gfS8+KVxuXHRcdH1cblx0fVxufVxuIl19