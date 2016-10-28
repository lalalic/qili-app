'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Data = exports.REDUCER = exports.ACTION = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _materialUi = require('material-ui');

var _reactable = require('reactable');

var _ = require('.');

var _app = require('./db/app');

var _app2 = _interopRequireDefault(_app);

var _fileUpload = require('material-ui/svg-icons/file/file-upload');

var _fileUpload2 = _interopRequireDefault(_fileUpload);

var _moreVert = require('material-ui/svg-icons/navigation/more-vert');

var _moreVert2 = _interopRequireDefault(_moreVert);

var _storage = require('material-ui/svg-icons/device/storage');

var _storage2 = _interopRequireDefault(_storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CommandBar = _.UI.CommandBar,
    fileSelector = _.UI.fileSelector;
var DialogCommand = CommandBar.DialogCommand;


var DOMAIN = "data";
var ACTION = exports.ACTION = {
	FETCH: function FETCH(name, schema) {
		return function (dispatch) {
			return Promise.all([_app2.default.collectionData(name), _app2.default.collectionIndexes(name), schema]).then(function (_ref) {
				var _ref2 = _slicedToArray(_ref, 3),
				    data = _ref2[0],
				    index = _ref2[1],
				    schema = _ref2[2];

				return dispatch({ type: '@@' + DOMAIN + '/fetched', payload: { data: data, index: index, schema: schema } });
			});
		};
	},

	UPLOAD_DATA: function UPLOAD_DATA(a) {
		return function (dispatch) {
			return fileSelector.selectJsonInJsFile().then(function (_ref3) {
				var data = _ref3.data,
				    name = _ref3.name;

				if (data && data.length) {
					var _ret = function () {
						var kind = name.split(/[\/\\]/).pop().split('.')[0];
						return {
							v: _app2.default.collectionData(kind, data).then(function (a) {
								return kind;
							})
						};
					}();

					if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
				}
			});
		};
	},

	UPLOAD_SCHEMA: function UPLOAD_SCHEMA(A) {
		return function (dispatch) {
			return fileSelector.selectJsonInJsFile().then(function (_ref4) {
				var schema = _ref4.data;

				if (schema && schema.length) {
					return _app2.default.setSchema(schema).then(function (a) {
						return dispatch({ type: '@@' + DOMAIN + '/schema', payload: schema });
					});
				}
			});
		};
	}
};

var REDUCER = exports.REDUCER = _defineProperty({}, DOMAIN, function () {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { data: [], index: [], schema: [], app: null };
	var _ref5 = arguments[1];
	var type = _ref5.type,
	    payload = _ref5.payload;

	switch (type) {
		case '@@' + DOMAIN + '/fetched':
			payload.schema = payload.schema || state.schema;
			return Object.assign({}, state, payload);

		case '@@' + DOMAIN + '/schema':
			return Object.assign({}, state, { schema: payload });

		case '@@main/APP_CHANGED':
			return { data: [], index: [], schema: [], app: payload.app._id };
	}
	return state;
});

var Data = exports.Data = (0, _reactRedux.connect)(function (state) {
	return state[DOMAIN];
})(function (_Component) {
	_inherits(_class, _Component);

	function _class() {
		_classCallCheck(this, _class);

		return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
	}

	_createClass(_class, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _props = this.props,
			    name = _props.params.name,
			    dispatch = _props.dispatch;

			dispatch(ACTION.FETCH(name, _app2.default.schema));
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(next) {
			if (next.app != this.props.app) next.dispatch(ACTION.FETCH(next.params.name, _app2.default.schema));else if (next.params.name != this.props.params.name) next.dispatch(ACTION.FETCH(next.params.name));
		}
	}, {
		key: 'render',
		value: function render() {
			var _props2 = this.props,
			    data = _props2.data,
			    index = _props2.index,
			    schema = _props2.schema,
			    name = _props2.params.name,
			    dispatch = _props2.dispatch,
			    router = _props2.router;
			var _constructor = this.constructor,
			    IndexItem = _constructor.IndexItem,
			    Names = _constructor.Names;

			var indexData = index.map(function (col) {
				Object.keys(col).filter(function (a) {
					return a != '$option';
				});
			});
			var refNames = void 0;
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					_materialUi.Tabs,
					null,
					_react2.default.createElement(
						_materialUi.Tab,
						{ label: name },
						_react2.default.createElement(_reactable.Table, { data: data })
					),
					_react2.default.createElement(
						_materialUi.Tab,
						{ label: 'Indexes' },
						_react2.default.createElement(_reactable.Table, { data: index })
					)
				),
				_react2.default.createElement(
					DialogCommand,
					{ ref: function ref(a) {
							return refNames = a;
						} },
					_react2.default.createElement(
						_materialUi.List,
						null,
						schema.map(function (_ref6) {
							var name = _ref6.name;
							return _react2.default.createElement(_materialUi.ListItem, { primaryText: name, leftIcon: _react2.default.createElement(_storage2.default, null),
								onClick: function onClick(e) {
									refNames.dismiss();
									router.push('/data/' + name);
								} });
						})
					)
				),
				_react2.default.createElement(CommandBar, { className: 'footbar',
					items: [{ action: "Back" }, { action: "Upload Schema", label: "Schema", icon: _fileUpload2.default,
						onSelect: function onSelect(e) {
							return dispatch(ACTION.UPLOAD_SCHEMA());
						}
					}, { action: "Upload Data", label: "Data:[colName].js", icon: _fileUpload2.default,
						onSelect: function onSelect(e) {
							return dispatch(ACTION.UPLOAD_DATA()).then(function (colName) {
								return colName && router.replace('/data/' + colName);
							});
						}
					}, { action: "Collections", icon: _moreVert2.default,
						onSelect: function onSelect(e) {
							return refNames.show();
						}
					}] })
			);
		}
	}]);

	return _class;
}(_react.Component));

exports.default = Object.assign(Data, { ACTION: ACTION, REDUCER: REDUCER });

/*




export default class Data extends Component{
    state={data:null, index:null, schema:null}
	
	getData(col, app){
		let state={
			data:App.collectionData(col),
			index:App.collectionIndexes(col)
		}
		app && (state.schema=App.schema);
			
		this.setState(state)
	}

    componentDidMount(){
		let {params:{name}}=this.props
        this.getData(name, this.context.app)
    }
	
	componentWillReceiveProps(nextProps, nextContext){
        if(this.context.app!=nextContext.app)
			this.getData(this.props.params.name, nextContext.app)
		else if(this.props.params.name!=nextProps.params.name)
			this.getData(nextProps.params.name)
    }

    render(){
		let {data, index, schema}=this.state
		let {name}=this.props.params
		const {IndexItem, Names}=this.constructor
        return (
			<div>
				<Tabs>
					<Tab label={name}>
						<List.Table className="data" model={data} key={name}/>
					</Tab>
					<Tab label="Indexes">
						{<List model={index} template={IndexItem} key={name}/>}
					</Tab>
				</Tabs>
				<CommandBar className="footbar"
					onSelect={cmd=>this.onSelect(cmd)}
					items={[{action:"Back"},
                        {action:"Upload Schema", label:"Schema", icon:Upload},
                        {action:"Upload Data", label:"Data:[colName].js", icon:Upload},
                        {action:"Collections", icon:More, onSelect:a=>this.refs.names.show()}
						]}/>
						
                {<Names ref="names" model={schema}
                    onItemClick={(a)=>{
                        this.refs.names.dismiss()
                        this.context.router.push(`data/${a.name}`)
                    }}/>}
			</div>
        )
    }
    onSelect(cmd){
        switch(cmd){
		case "Upload Schema":
			fileSelector.selectJsonInJsFile()
				.then(({data:schema})=>{
                    if(!schema || schema.length==0)
						return;
					App.setSchema(schema)
                        .then(a=>this.setState({schema}))
				})
		break
		case "Upload Data":
			fileSelector.selectJsonInJsFile()
				.then(({data,name})=>{
					if(!data || data.length==0)
						return;
					var kind=name.split(/[\/\\]/).pop().split('.')[0]
					App.collectionData(kind, data)
                        .then(a=>{
							let path=`data/${kind}`
							if(this.context.router.isActive(path))
								this.setState({data:App.collectionData(kind)})
							else
								this.context.router.push(`data/${kind}`)
						})
				})
		break
        }
	}
	
	static contextTypes={
		router:React.PropTypes.object,
		app: React.PropTypes.object
	}
	
	static Names=class  extends CommandBar.DialogCommand{
		renderContent(){
			return (<List {...this.props} template={this.constructor.NameItem}/>)
		}
		
		static NameItem=class extends Component{
			render(){
				let {model,...others}=this.props
				return (<List.Item primaryText={model.name} leftIcon={<IconCol/>}  {...others}/>)
			}
		}
	}
	
	static IndexItem=class extends Component{
		render(){
			let {model}=this.props,
				{$option={}}=model,
				keys=Object.keys(model).filter((a)=>a!='$option'),
				text=keys.map((a)=>` ${a}${model[a]==1 ? ' asc' : ' desc'}`).join(', '),
				{unique, sparse, name=keys.join(',')}=$option;

			return (<List.Item primaryText={name} 
						secondaryText={`${unique?'unique ':''}${sparse?'sparse ':''}${text}`}/>)
		}
	}
}
*/
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXRhLmpzIl0sIm5hbWVzIjpbIkNvbW1hbmRCYXIiLCJmaWxlU2VsZWN0b3IiLCJEaWFsb2dDb21tYW5kIiwiRE9NQUlOIiwiQUNUSU9OIiwiRkVUQ0giLCJuYW1lIiwic2NoZW1hIiwiUHJvbWlzZSIsImFsbCIsImNvbGxlY3Rpb25EYXRhIiwiY29sbGVjdGlvbkluZGV4ZXMiLCJ0aGVuIiwiZGF0YSIsImluZGV4IiwiZGlzcGF0Y2giLCJ0eXBlIiwicGF5bG9hZCIsIlVQTE9BRF9EQVRBIiwic2VsZWN0SnNvbkluSnNGaWxlIiwibGVuZ3RoIiwia2luZCIsInNwbGl0IiwicG9wIiwiVVBMT0FEX1NDSEVNQSIsInNldFNjaGVtYSIsIlJFRFVDRVIiLCJzdGF0ZSIsImFwcCIsIk9iamVjdCIsImFzc2lnbiIsIl9pZCIsIkRhdGEiLCJwcm9wcyIsInBhcmFtcyIsIm5leHQiLCJyb3V0ZXIiLCJjb25zdHJ1Y3RvciIsIkluZGV4SXRlbSIsIk5hbWVzIiwiaW5kZXhEYXRhIiwibWFwIiwia2V5cyIsImNvbCIsImZpbHRlciIsImEiLCJyZWZOYW1lcyIsImRpc21pc3MiLCJwdXNoIiwiYWN0aW9uIiwibGFiZWwiLCJpY29uIiwib25TZWxlY3QiLCJjb2xOYW1lIiwicmVwbGFjZSIsInNob3ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVPQSxVLFFBQUFBLFU7SUFBWUMsWSxRQUFBQSxZO0lBQ1pDLGEsR0FBZUYsVSxDQUFmRSxhOzs7QUFFUCxJQUFNQyxTQUFPLE1BQWI7QUFDTyxJQUFNQywwQkFBTztBQUNuQkMsUUFBTSxlQUFDQyxJQUFELEVBQU1DLE1BQU47QUFBQSxTQUFlO0FBQUEsVUFBVUMsUUFBUUMsR0FBUixDQUFZLENBQUMsY0FBSUMsY0FBSixDQUFtQkosSUFBbkIsQ0FBRCxFQUEwQixjQUFJ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O0FBeEJELElBREQ7QUF3Q0E7QUE3RGdCOztBQUFBO0FBQUEsb0JBQVg7O2tCQWlFUTFCLE9BQU9DLE1BQVAsQ0FBY0UsSUFBZCxFQUFtQixFQUFDNUIsY0FBRCxFQUFTc0IsZ0JBQVQsRUFBbkIsQzs7QUFFZiIsImZpbGUiOiJkYXRhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCdcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcbmltcG9ydCB7VGFicywgVGFiLCBMaXN0LCBMaXN0SXRlbX0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQge1RhYmxlfSBmcm9tICdyZWFjdGFibGUnXG5cbmltcG9ydCB7VXNlciwgVUl9IGZyb20gJy4nXG5pbXBvcnQgQXBwIGZyb20gXCIuL2RiL2FwcFwiXG5cbmltcG9ydCBVcGxvYWQgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9maWxlL2ZpbGUtdXBsb2FkXCJcbmltcG9ydCBNb3JlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbmF2aWdhdGlvbi9tb3JlLXZlcnRcIlxuaW1wb3J0IEljb25Db2wgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9kZXZpY2Uvc3RvcmFnZVwiXG5cbmNvbnN0IHtDb21tYW5kQmFyLCBmaWxlU2VsZWN0b3J9PVVJXG5jb25zdCB7RGlhbG9nQ29tbWFuZH09Q29tbWFuZEJhclxuXG5jb25zdCBET01BSU49XCJkYXRhXCJcbmV4cG9ydCBjb25zdCBBQ1RJT049e1xuXHRGRVRDSDoobmFtZSxzY2hlbWEpPT5kaXNwYXRjaD0+UHJvbWlzZS5hbGwoW0FwcC5jb2xsZWN0aW9uRGF0YShuYW1lKSxBcHAuY29sbGVjdGlvbkluZGV4ZXMobmFtZSksc2NoZW1hXSlcblx0XHRcdC50aGVuKChbZGF0YSxpbmRleCxzY2hlbWFdKT0+ZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L2ZldGNoZWRgLHBheWxvYWQ6e2RhdGEsaW5kZXgsc2NoZW1hfX0pKVxuXHRcblx0LFVQTE9BRF9EQVRBOmE9PmRpc3BhdGNoPT5maWxlU2VsZWN0b3Iuc2VsZWN0SnNvbkluSnNGaWxlKClcblx0XHRcdFx0LnRoZW4oKHtkYXRhLG5hbWV9KT0+e1xuXHRcdFx0XHRcdGlmKGRhdGEgJiYgZGF0YS5sZW5ndGgpe1xuXHRcdFx0XHRcdFx0bGV0IGtpbmQ9bmFtZS5zcGxpdCgvW1xcL1xcXFxdLykucG9wKCkuc3BsaXQoJy4nKVswXVxuXHRcdFx0XHRcdFx0cmV0dXJuIEFwcC5jb2xsZWN0aW9uRGF0YShraW5kLCBkYXRhKS50aGVuKGE9PmtpbmQpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXG5cdCxVUExPQURfU0NIRU1BOkE9PmRpc3BhdGNoPT5maWxlU2VsZWN0b3Iuc2VsZWN0SnNvbkluSnNGaWxlKClcblx0XHRcdFx0LnRoZW4oKHtkYXRhOnNjaGVtYX0pPT57XG4gICAgICAgICAgICAgICAgICAgIGlmKHNjaGVtYSAmJiBzY2hlbWEubGVuZ3RoKXtcblx0XHRcdFx0XHRcdHJldHVybiBBcHAuc2V0U2NoZW1hKHNjaGVtYSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGE9PmRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS9zY2hlbWFgLHBheWxvYWQ6c2NoZW1hfSkpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxufVxuXG5leHBvcnQgY29uc3QgUkVEVUNFUj17XG5cdFtET01BSU5dOihzdGF0ZT17ZGF0YTpbXSxpbmRleDpbXSxzY2hlbWE6W10sYXBwOm51bGx9LHt0eXBlLHBheWxvYWR9KT0+e1xuXHRcdHN3aXRjaCh0eXBlKXtcblx0XHRjYXNlIGBAQCR7RE9NQUlOfS9mZXRjaGVkYDpcblx0XHRcdHBheWxvYWQuc2NoZW1hPXBheWxvYWQuc2NoZW1hfHxzdGF0ZS5zY2hlbWFcblx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LHN0YXRlLHBheWxvYWQpXG5cdFx0XHRcblx0XHRjYXNlIGBAQCR7RE9NQUlOfS9zY2hlbWFgOlxuXHRcdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse3NjaGVtYTpwYXlsb2FkfSlcblx0XHRcdFxuXHRcdGNhc2UgYEBAbWFpbi9BUFBfQ0hBTkdFRGA6XG5cdFx0XHRyZXR1cm4ge2RhdGE6W10saW5kZXg6W10sc2NoZW1hOltdLGFwcDpwYXlsb2FkLmFwcC5faWR9XG5cdFx0fVxuXHRcdHJldHVybiBzdGF0ZVxuXHR9XG59XG5cbmV4cG9ydCBjb25zdCBEYXRhPWNvbm5lY3Qoc3RhdGU9PihzdGF0ZVtET01BSU5dKSkoXG5jbGFzcyBleHRlbmRzIENvbXBvbmVudHtcblx0Y29tcG9uZW50RGlkTW91bnQoKXtcblx0XHRjb25zdCB7cGFyYW1zOntuYW1lfSwgZGlzcGF0Y2h9PXRoaXMucHJvcHNcblx0XHRkaXNwYXRjaChBQ1RJT04uRkVUQ0gobmFtZSxBcHAuc2NoZW1hKSlcblx0fVxuXHRcblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0KXtcblx0XHRpZihuZXh0LmFwcCE9dGhpcy5wcm9wcy5hcHApXG5cdFx0XHRuZXh0LmRpc3BhdGNoKEFDVElPTi5GRVRDSChuZXh0LnBhcmFtcy5uYW1lLEFwcC5zY2hlbWEpKVxuXHRcdGVsc2UgaWYobmV4dC5wYXJhbXMubmFtZSE9dGhpcy5wcm9wcy5wYXJhbXMubmFtZSlcblx0XHRcdG5leHQuZGlzcGF0Y2goQUNUSU9OLkZFVENIKG5leHQucGFyYW1zLm5hbWUpKVxuXHR9XG5cdFxuXHRyZW5kZXIoKXtcblx0XHRjb25zdCB7ZGF0YSwgaW5kZXgsIHNjaGVtYSwgcGFyYW1zOntuYW1lfSxkaXNwYXRjaCxyb3V0ZXJ9PXRoaXMucHJvcHNcblx0XHRjb25zdCB7SW5kZXhJdGVtLCBOYW1lc309dGhpcy5jb25zdHJ1Y3RvclxuXHRcdGNvbnN0IGluZGV4RGF0YT1pbmRleC5tYXAoY29sPT57XG5cdFx0XHRPYmplY3Qua2V5cyhjb2wpLmZpbHRlcihhPT5hIT0nJG9wdGlvbicpXG5cdFx0fSlcblx0XHRsZXQgcmVmTmFtZXNcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0PFRhYnM+XG5cdFx0XHRcdFx0PFRhYiBsYWJlbD17bmFtZX0+XG5cdFx0XHRcdFx0XHQ8VGFibGUgZGF0YT17ZGF0YX0vPlxuXHRcdFx0XHRcdDwvVGFiPlxuXHRcdFx0XHRcdDxUYWIgbGFiZWw9XCJJbmRleGVzXCI+XG5cdFx0XHRcdFx0XHQ8VGFibGUgZGF0YT17aW5kZXh9Lz5cblx0XHRcdFx0XHQ8L1RhYj5cblx0XHRcdFx0PC9UYWJzPlxuXHRcdFx0XHRcblx0XHRcdFx0PERpYWxvZ0NvbW1hbmQgcmVmPXthPT5yZWZOYW1lcz1hfT5cblx0XHRcdFx0XHQ8TGlzdD5cblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRzY2hlbWEubWFwKCh7bmFtZX0pPT4oXG5cdFx0XHRcdFx0XHRcdDxMaXN0SXRlbSBwcmltYXJ5VGV4dD17bmFtZX0gbGVmdEljb249ezxJY29uQ29sLz59IFxuXHRcdFx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9Pntcblx0XHRcdFx0XHRcdFx0XHRcdHJlZk5hbWVzLmRpc21pc3MoKVxuXHRcdFx0XHRcdFx0XHRcdFx0cm91dGVyLnB1c2goYC9kYXRhLyR7bmFtZX1gKVxuXHRcdFx0XHRcdFx0XHRcdH19Lz5cblx0XHRcdFx0XHRcdCkpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdDwvTGlzdD5cblx0XHRcdFx0PC9EaWFsb2dDb21tYW5kPlxuXHRcdFx0XHRcblx0XHRcdFx0PENvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiXG5cdFx0XHRcdFx0aXRlbXM9e1t7YWN0aW9uOlwiQmFja1wifSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJVcGxvYWQgU2NoZW1hXCIsIGxhYmVsOlwiU2NoZW1hXCIsIGljb246VXBsb2FkXG5cdFx0XHRcdFx0XHRcdCxvblNlbGVjdDplPT5kaXNwYXRjaChBQ1RJT04uVVBMT0FEX1NDSEVNQSgpKVxuXHRcdFx0XHRcdFx0fVxuICAgICAgICAgICAgICAgICAgICAgICAgLHthY3Rpb246XCJVcGxvYWQgRGF0YVwiLCBsYWJlbDpcIkRhdGE6W2NvbE5hbWVdLmpzXCIsIGljb246VXBsb2FkXG5cdFx0XHRcdFx0XHRcdCxvblNlbGVjdDplPT5kaXNwYXRjaChBQ1RJT04uVVBMT0FEX0RBVEEoKSlcblx0XHRcdFx0XHRcdFx0XHQudGhlbihjb2xOYW1lPT4gY29sTmFtZSAmJiByb3V0ZXIucmVwbGFjZShgL2RhdGEvJHtjb2xOYW1lfWApKVxuXHRcdFx0XHRcdFx0fVxuICAgICAgICAgICAgICAgICAgICAgICAgLHthY3Rpb246XCJDb2xsZWN0aW9uc1wiLCBpY29uOk1vcmVcblx0XHRcdFx0XHRcdFx0LG9uU2VsZWN0OmU9PnJlZk5hbWVzLnNob3coKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XX0vPlxuXHRcdFx0PC9kaXY+XG4gICAgICAgIClcblx0fVxuXHRcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24oRGF0YSx7QUNUSU9OLCBSRURVQ0VSfSlcblxuLypcblxuXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0YSBleHRlbmRzIENvbXBvbmVudHtcbiAgICBzdGF0ZT17ZGF0YTpudWxsLCBpbmRleDpudWxsLCBzY2hlbWE6bnVsbH1cblx0XG5cdGdldERhdGEoY29sLCBhcHApe1xuXHRcdGxldCBzdGF0ZT17XG5cdFx0XHRkYXRhOkFwcC5jb2xsZWN0aW9uRGF0YShjb2wpLFxuXHRcdFx0aW5kZXg6QXBwLmNvbGxlY3Rpb25JbmRleGVzKGNvbClcblx0XHR9XG5cdFx0YXBwICYmIChzdGF0ZS5zY2hlbWE9QXBwLnNjaGVtYSk7XG5cdFx0XHRcblx0XHR0aGlzLnNldFN0YXRlKHN0YXRlKVxuXHR9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpe1xuXHRcdGxldCB7cGFyYW1zOntuYW1lfX09dGhpcy5wcm9wc1xuICAgICAgICB0aGlzLmdldERhdGEobmFtZSwgdGhpcy5jb250ZXh0LmFwcClcbiAgICB9XG5cdFxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcywgbmV4dENvbnRleHQpe1xuICAgICAgICBpZih0aGlzLmNvbnRleHQuYXBwIT1uZXh0Q29udGV4dC5hcHApXG5cdFx0XHR0aGlzLmdldERhdGEodGhpcy5wcm9wcy5wYXJhbXMubmFtZSwgbmV4dENvbnRleHQuYXBwKVxuXHRcdGVsc2UgaWYodGhpcy5wcm9wcy5wYXJhbXMubmFtZSE9bmV4dFByb3BzLnBhcmFtcy5uYW1lKVxuXHRcdFx0dGhpcy5nZXREYXRhKG5leHRQcm9wcy5wYXJhbXMubmFtZSlcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcblx0XHRsZXQge2RhdGEsIGluZGV4LCBzY2hlbWF9PXRoaXMuc3RhdGVcblx0XHRsZXQge25hbWV9PXRoaXMucHJvcHMucGFyYW1zXG5cdFx0Y29uc3Qge0luZGV4SXRlbSwgTmFtZXN9PXRoaXMuY29uc3RydWN0b3JcbiAgICAgICAgcmV0dXJuIChcblx0XHRcdDxkaXY+XG5cdFx0XHRcdDxUYWJzPlxuXHRcdFx0XHRcdDxUYWIgbGFiZWw9e25hbWV9PlxuXHRcdFx0XHRcdFx0PExpc3QuVGFibGUgY2xhc3NOYW1lPVwiZGF0YVwiIG1vZGVsPXtkYXRhfSBrZXk9e25hbWV9Lz5cblx0XHRcdFx0XHQ8L1RhYj5cblx0XHRcdFx0XHQ8VGFiIGxhYmVsPVwiSW5kZXhlc1wiPlxuXHRcdFx0XHRcdFx0ezxMaXN0IG1vZGVsPXtpbmRleH0gdGVtcGxhdGU9e0luZGV4SXRlbX0ga2V5PXtuYW1lfS8+fVxuXHRcdFx0XHRcdDwvVGFiPlxuXHRcdFx0XHQ8L1RhYnM+XG5cdFx0XHRcdDxDb21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxuXHRcdFx0XHRcdG9uU2VsZWN0PXtjbWQ9PnRoaXMub25TZWxlY3QoY21kKX1cblx0XHRcdFx0XHRpdGVtcz17W3thY3Rpb246XCJCYWNrXCJ9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcIlVwbG9hZCBTY2hlbWFcIiwgbGFiZWw6XCJTY2hlbWFcIiwgaWNvbjpVcGxvYWR9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcIlVwbG9hZCBEYXRhXCIsIGxhYmVsOlwiRGF0YTpbY29sTmFtZV0uanNcIiwgaWNvbjpVcGxvYWR9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcIkNvbGxlY3Rpb25zXCIsIGljb246TW9yZSwgb25TZWxlY3Q6YT0+dGhpcy5yZWZzLm5hbWVzLnNob3coKX1cblx0XHRcdFx0XHRcdF19Lz5cblx0XHRcdFx0XHRcdFxuICAgICAgICAgICAgICAgIHs8TmFtZXMgcmVmPVwibmFtZXNcIiBtb2RlbD17c2NoZW1hfVxuICAgICAgICAgICAgICAgICAgICBvbkl0ZW1DbGljaz17KGEpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnMubmFtZXMuZGlzbWlzcygpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLnB1c2goYGRhdGEvJHthLm5hbWV9YClcbiAgICAgICAgICAgICAgICAgICAgfX0vPn1cblx0XHRcdDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuICAgIG9uU2VsZWN0KGNtZCl7XG4gICAgICAgIHN3aXRjaChjbWQpe1xuXHRcdGNhc2UgXCJVcGxvYWQgU2NoZW1hXCI6XG5cdFx0XHRmaWxlU2VsZWN0b3Iuc2VsZWN0SnNvbkluSnNGaWxlKClcblx0XHRcdFx0LnRoZW4oKHtkYXRhOnNjaGVtYX0pPT57XG4gICAgICAgICAgICAgICAgICAgIGlmKCFzY2hlbWEgfHwgc2NoZW1hLmxlbmd0aD09MClcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRBcHAuc2V0U2NoZW1hKHNjaGVtYSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGE9PnRoaXMuc2V0U3RhdGUoe3NjaGVtYX0pKVxuXHRcdFx0XHR9KVxuXHRcdGJyZWFrXG5cdFx0Y2FzZSBcIlVwbG9hZCBEYXRhXCI6XG5cdFx0XHRmaWxlU2VsZWN0b3Iuc2VsZWN0SnNvbkluSnNGaWxlKClcblx0XHRcdFx0LnRoZW4oKHtkYXRhLG5hbWV9KT0+e1xuXHRcdFx0XHRcdGlmKCFkYXRhIHx8IGRhdGEubGVuZ3RoPT0wKVxuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdHZhciBraW5kPW5hbWUuc3BsaXQoL1tcXC9cXFxcXS8pLnBvcCgpLnNwbGl0KCcuJylbMF1cblx0XHRcdFx0XHRBcHAuY29sbGVjdGlvbkRhdGEoa2luZCwgZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGE9Pntcblx0XHRcdFx0XHRcdFx0bGV0IHBhdGg9YGRhdGEvJHtraW5kfWBcblx0XHRcdFx0XHRcdFx0aWYodGhpcy5jb250ZXh0LnJvdXRlci5pc0FjdGl2ZShwYXRoKSlcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnNldFN0YXRlKHtkYXRhOkFwcC5jb2xsZWN0aW9uRGF0YShraW5kKX0pXG5cdFx0XHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdFx0XHR0aGlzLmNvbnRleHQucm91dGVyLnB1c2goYGRhdGEvJHtraW5kfWApXG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9KVxuXHRcdGJyZWFrXG4gICAgICAgIH1cblx0fVxuXHRcblx0c3RhdGljIGNvbnRleHRUeXBlcz17XG5cdFx0cm91dGVyOlJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG5cdFx0YXBwOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0XG5cdH1cblx0XG5cdHN0YXRpYyBOYW1lcz1jbGFzcyAgZXh0ZW5kcyBDb21tYW5kQmFyLkRpYWxvZ0NvbW1hbmR7XG5cdFx0cmVuZGVyQ29udGVudCgpe1xuXHRcdFx0cmV0dXJuICg8TGlzdCB7Li4udGhpcy5wcm9wc30gdGVtcGxhdGU9e3RoaXMuY29uc3RydWN0b3IuTmFtZUl0ZW19Lz4pXG5cdFx0fVxuXHRcdFxuXHRcdHN0YXRpYyBOYW1lSXRlbT1jbGFzcyBleHRlbmRzIENvbXBvbmVudHtcblx0XHRcdHJlbmRlcigpe1xuXHRcdFx0XHRsZXQge21vZGVsLC4uLm90aGVyc309dGhpcy5wcm9wc1xuXHRcdFx0XHRyZXR1cm4gKDxMaXN0Lkl0ZW0gcHJpbWFyeVRleHQ9e21vZGVsLm5hbWV9IGxlZnRJY29uPXs8SWNvbkNvbC8+fSAgey4uLm90aGVyc30vPilcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0XG5cdHN0YXRpYyBJbmRleEl0ZW09Y2xhc3MgZXh0ZW5kcyBDb21wb25lbnR7XG5cdFx0cmVuZGVyKCl7XG5cdFx0XHRsZXQge21vZGVsfT10aGlzLnByb3BzLFxuXHRcdFx0XHR7JG9wdGlvbj17fX09bW9kZWwsXG5cdFx0XHRcdGtleXM9T2JqZWN0LmtleXMobW9kZWwpLmZpbHRlcigoYSk9PmEhPSckb3B0aW9uJyksXG5cdFx0XHRcdHRleHQ9a2V5cy5tYXAoKGEpPT5gICR7YX0ke21vZGVsW2FdPT0xID8gJyBhc2MnIDogJyBkZXNjJ31gKS5qb2luKCcsICcpLFxuXHRcdFx0XHR7dW5pcXVlLCBzcGFyc2UsIG5hbWU9a2V5cy5qb2luKCcsJyl9PSRvcHRpb247XG5cblx0XHRcdHJldHVybiAoPExpc3QuSXRlbSBwcmltYXJ5VGV4dD17bmFtZX0gXG5cdFx0XHRcdFx0XHRzZWNvbmRhcnlUZXh0PXtgJHt1bmlxdWU/J3VuaXF1ZSAnOicnfSR7c3BhcnNlPydzcGFyc2UgJzonJ30ke3RleHR9YH0vPilcblx0XHR9XG5cdH1cbn1cbiovIl19