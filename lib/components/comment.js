"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Inline = exports.CommentUI = exports.reducer = exports.ACTION = exports.DOMAIN = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _materialUi = require("material-ui");

var _reactRedux = require("react-redux");

var _TextField = require("material-ui/TextField");

var _TextField2 = _interopRequireDefault(_TextField);

var _Toolbar = require("material-ui/Toolbar");

var _IconButton = require("material-ui/IconButton");

var _IconButton2 = _interopRequireDefault(_IconButton);

var _colors = require("material-ui/styles/colors");

var _photoCamera = require("material-ui/svg-icons/image/photo-camera");

var _photoCamera2 = _interopRequireDefault(_photoCamera);

var _save = require("material-ui/svg-icons/content/save");

var _save2 = _interopRequireDefault(_save);

var _modeComment = require("material-ui/svg-icons/editor/mode-comment");

var _modeComment2 = _interopRequireDefault(_modeComment);

var _fileSelector = require("./file-selector");

var _service = require("../db/service");

var _commandBar = require("./command-bar");

var _commandBar2 = _interopRequireDefault(_commandBar);

var _user = require("../db/user");

var _user2 = _interopRequireDefault(_user);

var _comment = require("../db/comment");

var _comment2 = _interopRequireDefault(_comment);

var _file = require("../db/file");

var _file2 = _interopRequireDefault(_file);

var _empty = require("./empty");

var _empty2 = _interopRequireDefault(_empty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var DOMAIN = exports.DOMAIN = "COMMENT";
var ACTION = exports.ACTION = {
	FETCH: function FETCH(type, _id) {
		return function (dispatch) {
			return _comment2.default.of(type).find({ parent: _id }).fetch(function (data) {
				return dispatch({ type: "@@" + DOMAIN + "/fetched", payload: { data: data, type: type, _id: _id } });
			});
		};
	},

	CREATE: function CREATE(type, id, content) {
		var props = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
		return function (dispatch) {
			content = content.trim();
			if (content.length < 2) return Promise.reject();

			var user = _user2.default.current;
			var comment = _extends({}, props, {
				type: type,
				parent: id,
				thumbnail: user.thumbnail,
				content: content
			});
			return _comment2.default.of(type).upsert(comment).then(function (a) {
				return dispatch({ type: "@@" + DOMAIN + "/created", payload: a });
			});
		};
	}
};

var reducer = exports.reducer = function reducer() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var _ref = arguments[1];
	var type = _ref.type,
	    payload = _ref.payload;

	switch (type) {
		case "@@" + DOMAIN + "/CLEAR":
			return {};
		case "@@" + DOMAIN + "/fetched":
			return _extends({}, state, payload);
		case "@@" + DOMAIN + "/created":
			return _extends({}, state, { data: [].concat(_toConsumableArray(state.data || []), [payload]) });
	}
	return state;
};

var CommentUI = exports.CommentUI = function (_Component) {
	_inherits(CommentUI, _Component);

	function CommentUI() {
		var _ref2;

		var _temp, _this, _ret;

		_classCallCheck(this, CommentUI);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = CommentUI.__proto__ || Object.getPrototypeOf(CommentUI)).call.apply(_ref2, [this].concat(args))), _this), _this.state = { comment: "" }, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(CommentUI, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var _props = this.props,
			    dispatch = _props.dispatch,
			    _props$params = _props.params,
			    type = _props$params.type,
			    _id = _props$params._id;

			dispatch(ACTION.FETCH(type, _id));
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			this.props.dispatch({ type: "@@" + DOMAIN + "/CLEAR" });
		}
	}, {
		key: "render",
		value: function render() {
			var _this2 = this;

			var _props2 = this.props,
			    _props2$data = _props2.data,
			    data = _props2$data === undefined ? [] : _props2$data,
			    template = _props2.template,
			    dispatch = _props2.dispatch,
			    _props2$params = _props2.params,
			    type = _props2$params.type,
			    _id = _props2$params._id,
			    _props2$hint = _props2.hint,
			    hint = _props2$hint === undefined ? "说两句" : _props2$hint,
			    system = _props2.system;
			var height = this.context.muiTheme.page.height;
			var comment = this.state.comment;

			var create = function create() {
				return dispatch(ACTION.CREATE(type, _id, comment)).then(function (a) {
					return _this2.setState({ comment: "" });
				});
			};
			var save = {
				action: "Save",
				label: "发布",
				icon: _react2.default.createElement(_save2.default, null),
				onSelect: create
			};
			var photo = {
				action: "photo",
				label: "照片",
				icon: _react2.default.createElement(_photoCamera2.default, null),
				onSelect: function onSelect(e) {
					return (0, _fileSelector.select)().then(function (url) {
						return _file2.default.upload(url);
					}).then(function (url) {
						return dispatch(ACTION.CREATE(type, _id, url, { content_type: "photo" }));
					});
				}
			};

			var action = photo;

			if (comment.trim()) action = save;

			return _react2.default.createElement(
				"div",
				{ className: "comment", style: { minHeight: height, backgroundColor: _colors.cyan50 } },
				_react2.default.createElement(
					"div",
					null,
					data.map(function (a) {
						return _react2.default.createElement(template, { comment: a, key: a._id, system: system });
					})
				),
				_react2.default.createElement(_commandBar2.default, {
					className: "footbar centerinput",
					primary: "Save",
					items: [{ action: "Back" }, _react2.default.createElement("textarea", { placeholder: hint, value: comment,
						onKeyDown: function onKeyDown(_ref3) {
							var keyCode = _ref3.keyCode;
							return keyCode == 13 && create();
						},
						onChange: function onChange(e) {
							_this2.setState({ comment: e.target.value });
							e.preventDefault();
						} }), action]
				})
			);
		}
	}]);

	return CommentUI;
}(_react.Component);

CommentUI.contextTypes = {
	muiTheme: _react.PropTypes.object
};
CommentUI.defaultProps = {
	systemThumbnail: null,
	template: function template(_ref6) {
		var comment = _ref6.comment,
		    _ref6$system = _ref6.system,
		    system = _ref6$system === undefined ? {} : _ref6$system;

		var name = void 0,
		    left = void 0,
		    right = void 0,
		    text = void 0;
		var isOwner = comment.author._id == _user2.default.current._id;
		if (comment.system) {
			name = _react2.default.createElement(
				"span",
				{ style: { fontSize: 'x-small' } },
				system.name
			);
			left = _react2.default.createElement(_materialUi.Avatar, { src: system.thumbnail });
			right = _react2.default.createElement("span", null);
		} else if (isOwner) {
			left = _react2.default.createElement("span", null);
			right = _react2.default.createElement(_materialUi.Avatar, { src: _user2.default.current.thumbnail });
		} else {
			name = _react2.default.createElement(
				"span",
				{ style: { fontSize: 'x-small' } },
				comment.author.name
			);
			left = _react2.default.createElement(_materialUi.Avatar, { src: comment.thumbnail });
			right = _react2.default.createElement("span", null);
		}

		return _react2.default.createElement(
			"div",
			{ key: comment._id, className: "acomment", style: { padding: 5 } },
			_react2.default.createElement(
				"div",
				{ style: { width: 40, minHeight: 40, verticalAlign: "top" } },
				left
			),
			_react2.default.createElement(
				"div",
				{ style: { padding: 5, verticalAlign: "top" } },
				_react2.default.createElement(
					"div",
					null,
					name
				),
				_react2.default.createElement(
					"p",
					{ className: "content " + (!comment.system && isOwner ? "owner" : "") },
					function (content, type) {
						switch (type) {
							case "photo":
								return _react2.default.createElement("img", { src: content, style: { width: 150 } });
							default:
								return _react2.default.createElement(
									"span",
									null,
									content
								);
						}
					}(comment.content, comment.content_type)
				)
			),
			_react2.default.createElement(
				"div",
				{ style: { width: 40, minHeight: 40, verticalAlign: "top" } },
				right
			)
		);
	}
};

var Inline = exports.Inline = function (_Component2) {
	_inherits(Inline, _Component2);

	function Inline() {
		_classCallCheck(this, Inline);

		return _possibleConstructorReturn(this, (Inline.__proto__ || Object.getPrototypeOf(Inline)).apply(this, arguments));
	}

	_createClass(Inline, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var _props3 = this.props,
			    dispatch = _props3.dispatch,
			    _name = _props3.kind._name,
			    _id = _props3.model._id;

			dispatch(ACTION.FETCH(_name, _id));
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			this.props.dispatch({ type: "@@" + DOMAIN + "/CLEAR" });
		}
	}, {
		key: "render",
		value: function render() {
			var _props4 = this.props,
			    _props4$data = _props4.data,
			    data = _props4$data === undefined ? [] : _props4$data,
			    template = _props4.template,
			    emptyIcon = _props4.emptyIcon,
			    dispatch = _props4.dispatch,
			    _name = _props4.kind._name,
			    _id = _props4.model._id,
			    _props4$commentable = _props4.commentable,
			    commentable = _props4$commentable === undefined ? true : _props4$commentable,
			    _props4$hint = _props4.hint,
			    hint = _props4$hint === undefined ? "说两句" : _props4$hint,
			    empty = _props4.empty;


			var content = null;
			if (data.length) {
				content = _react2.default.createElement(
					"div",
					null,
					data.map(function (a) {
						return _react2.default.createElement(template, { comment: a, key: a._id });
					})
				);
			} else {
				content = _react2.default.createElement(_empty2.default, { text: empty || "当前还没有评论哦", icon: emptyIcon });
			}
			var editor = null;
			if (commentable) editor = _react2.default.createElement(Editor, { type: _name, _id: _id, dispatch: dispatch, hint: hint });
			return _react2.default.createElement(
				"div",
				{ className: "comment inline" },
				editor,
				content
			);
		}
	}]);

	return Inline;
}(_react.Component);

Inline.defaultProps = {
	template: CommentUI.defaultProps.template,
	emptyIcon: _react2.default.createElement(_modeComment2.default, null)
};

var Editor = function (_Component3) {
	_inherits(Editor, _Component3);

	function Editor() {
		var _ref4;

		var _temp2, _this4, _ret2;

		_classCallCheck(this, Editor);

		for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			args[_key2] = arguments[_key2];
		}

		return _ret2 = (_temp2 = (_this4 = _possibleConstructorReturn(this, (_ref4 = Editor.__proto__ || Object.getPrototypeOf(Editor)).call.apply(_ref4, [this].concat(args))), _this4), _this4.state = {
			comment: ""
		}, _temp2), _possibleConstructorReturn(_this4, _ret2);
	}

	_createClass(Editor, [{
		key: "render",
		value: function render() {
			var _this5 = this;

			var comment = this.state.comment;
			var hint = this.props.hint;

			var action = null;
			if (comment) {
				action = _react2.default.createElement(
					_IconButton2.default,
					{ onTouchTap: this.save.bind(this) },
					_react2.default.createElement(_save2.default, null)
				);
			} else {
				action = _react2.default.createElement(
					_IconButton2.default,
					{ onTouchTap: this.photo.bind(this) },
					_react2.default.createElement(_photoCamera2.default, null)
				);
			}
			return _react2.default.createElement(
				_Toolbar.Toolbar,
				{ noGutter: true, className: "grid",
					style: { backgroundColor: "transparent" } },
				_react2.default.createElement(
					_Toolbar.ToolbarGroup,
					{ style: { display: "table-cell", width: "100%" } },
					_react2.default.createElement(_TextField2.default, { value: comment,
						onChange: function onChange(e, comment) {
							return _this5.setState({ comment: comment });
						},
						onKeyDown: function onKeyDown(_ref5) {
							var keyCode = _ref5.keyCode;
							return keyCode == 13 && _this5.save();
						},
						hintText: hint,
						fullWidth: true })
				),
				_react2.default.createElement(
					_Toolbar.ToolbarGroup,
					{ style: { width: 40 } },
					action
				)
			);
		}
	}, {
		key: "save",
		value: function save() {
			var _this6 = this;

			var _props5 = this.props,
			    type = _props5.type,
			    _id = _props5._id,
			    dispatch = _props5.dispatch;
			var comment = this.state.comment;

			dispatch(ACTION.CREATE(type, _id, comment)).then(function (a) {
				return _this6.setState({ comment: "" });
			});
		}
	}, {
		key: "photo",
		value: function photo() {
			var _props6 = this.props,
			    type = _props6.type,
			    _id = _props6._id,
			    dispatch = _props6.dispatch;
			var comment = this.state.comment;

			(0, _fileSelector.select)().then(function (url) {
				return _file2.default.upload(url);
			}).then(function (url) {
				return dispatch(ACTION.CREATE(type, _id, url, { content_type: "photo" }));
			});
		}
	}]);

	return Editor;
}(_react.Component);

exports.default = Object.assign((0, _reactRedux.connect)(function (state) {
	return state.comment;
})(CommentUI), {
	reducer: reducer,
	Inline: (0, _reactRedux.connect)(function (state) {
		return state.comment;
	})(Inline)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1lbnQuanMiXSwibmFtZXMiOlsiRE9NQUlOIiwiQUNUSU9OIiwiRkVUQ0giLCJ0eXBlIiwiX2lkIiwib2YiLCJmaW5kIiwicGFyZW50IiwiZmV0Y2giLCJkaXNwYXRjaCIsInBheWxvYWQiLCJkYXRhIiwiQ1JFQVRFIiwiaWQiLCJjb250ZW50IiwicHJvcHMiLCJ0cmltIiwibGVuZ3RoIiwiUHJvbWlzZSIsInJlamVjdCIsInVzZXIiLCJjdXJyZW50IiwiY29tbWVudCIsInRodW1ibmFpbCIsInVwc2VydCIsInRoZW4iLCJhIiwicmVkdWNlciIsInN0YXRlIiwiQ29tbWVudFVJIiwicGFyYW1zIiwidGVtcGxhdGUiLCJoaW50Iiwic3lzdGVtIiwiaGVpZ2h0IiwiY29udGV4dCIsIm11aVRoZW1lIiwicGFnZSIsImNyZWF0ZSIsInNldFN0YXRlIiwic2F2ZSIsImFjdGlvbiIsImxhYmVsIiwiaWNvbiIsIm9uU2VsZWN0IiwicGhvdG8iLCJ1cGxvYWQiLCJ1cmwiLCJjb250ZW50X3R5cGUiLCJtaW5IZWlnaHQiLCJiYWNrZ3JvdW5kQ29sb3IiLCJtYXAiLCJjcmVhdGVFbGVtZW50Iiwia2V5Iiwia2V5Q29kZSIsImUiLCJ0YXJnZXQiLCJ2YWx1ZSIsInByZXZlbnREZWZhdWx0IiwiY29udGV4dFR5cGVzIiwib2JqZWN0IiwiZGVmYXVsdFByb3BzIiwic3lzdGVtVGh1bWJuYWlsIiwibmFtZSIsImxlZnQiLCJyaWdodCIsInRleHQiLCJpc093bmVyIiwiYXV0aG9yIiwiZm9udFNpemUiLCJwYWRkaW5nIiwid2lkdGgiLCJ2ZXJ0aWNhbEFsaWduIiwiSW5saW5lIiwiX25hbWUiLCJraW5kIiwibW9kZWwiLCJlbXB0eUljb24iLCJjb21tZW50YWJsZSIsImVtcHR5IiwiZWRpdG9yIiwiRWRpdG9yIiwiYmluZCIsImRpc3BsYXkiLCJPYmplY3QiLCJhc3NpZ24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7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RUcsSUFERixDQUNPO0FBQUEsV0FBRyxPQUFLYyxRQUFMLENBQWMsRUFBQ2pCLFNBQVEsRUFBVCxFQUFkLENBQUg7QUFBQSxJQURQO0FBRUE7OzswQkFFTTtBQUFBLGlCQUNxQixLQUFLUCxLQUQxQjtBQUFBLE9BQ0NaLElBREQsV0FDQ0EsSUFERDtBQUFBLE9BQ09DLEdBRFAsV0FDT0EsR0FEUDtBQUFBLE9BQ1dLLFFBRFgsV0FDV0EsUUFEWDtBQUFBLE9BRUNhLE9BRkQsR0FFVSxLQUFLTSxLQUZmLENBRUNOLE9BRkQ7O0FBR04sK0JBQ0VHLElBREYsQ0FDTztBQUFBLFdBQUssZUFBS3FCLE1BQUwsQ0FBWUMsR0FBWixDQUFMO0FBQUEsSUFEUCxFQUVFdEIsSUFGRixDQUVPO0FBQUEsV0FBS2hCLFNBQVNSLE9BQU9XLE1BQVAsQ0FBY1QsSUFBZCxFQUFtQkMsR0FBbkIsRUFBdUIyQyxHQUF2QixFQUEyQixFQUFDQyxjQUFhLE9BQWQsRUFBM0IsQ0FBVCxDQUFMO0FBQUEsSUFGUDtBQUdBOzs7Ozs7a0JBR2FvQyxPQUFPQyxNQUFQLENBQWMseUJBQVE7QUFBQSxRQUFPekQsTUFBTU4sT0FBYjtBQUFBLENBQVIsRUFBOEJPLFNBQTlCLENBQWQsRUFBdUQ7QUFDckVGLGlCQURxRTtBQUVyRThDLFNBQVEseUJBQVE7QUFBQSxTQUFPN0MsTUFBTU4sT0FBYjtBQUFBLEVBQVIsRUFBOEJtRCxNQUE5QjtBQUY2RCxDQUF2RCxDIiwiZmlsZSI6ImNvbW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtBdmF0YXIsIExpc3QsIExpc3RJdGVtfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxyXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXHJcblxyXG5pbXBvcnQgVGV4dEZpZWxkIGZyb20gJ21hdGVyaWFsLXVpL1RleHRGaWVsZCdcclxuaW1wb3J0IHtUb29sYmFyLCBUb29sYmFyR3JvdXB9IGZyb20gJ21hdGVyaWFsLXVpL1Rvb2xiYXInXHJcbmltcG9ydCBJY29uQnV0dG9uIGZyb20gJ21hdGVyaWFsLXVpL0ljb25CdXR0b24nXHJcblxyXG5pbXBvcnQge2N5YW41MCBhcyBiZ30gZnJvbSBcIm1hdGVyaWFsLXVpL3N0eWxlcy9jb2xvcnNcIlxyXG5pbXBvcnQgSWNvbkNhbWVyYSBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvaW1hZ2UvcGhvdG8tY2FtZXJhJ1xyXG5pbXBvcnQgSWNvblNhdmUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9jb250ZW50L3NhdmVcIlxyXG5pbXBvcnQgSWNvbkVtcHR5Q29tbWVudCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2VkaXRvci9tb2RlLWNvbW1lbnRcIlxyXG5cclxuaW1wb3J0IHtzZWxlY3QgYXMgc2VsZWN0SW1hZ2VGaWxlfSBmcm9tIFwiLi9maWxlLXNlbGVjdG9yXCJcclxuXHJcbmltcG9ydCB7U2VydmljZX0gZnJvbSAnLi4vZGIvc2VydmljZSdcclxuaW1wb3J0IENvbW1hbmRCYXIgZnJvbSAnLi9jb21tYW5kLWJhcidcclxuaW1wb3J0IFVzZXIgZnJvbSAnLi4vZGIvdXNlcidcclxuaW1wb3J0IENvbW1lbnQgZnJvbSAnLi4vZGIvY29tbWVudCdcclxuaW1wb3J0IEZpbGUgZnJvbSBcIi4uL2RiL2ZpbGVcIlxyXG5pbXBvcnQgRW1wdHkgZnJvbSBcIi4vZW1wdHlcIlxyXG5cclxuZXhwb3J0IGNvbnN0IERPTUFJTj1cIkNPTU1FTlRcIlxyXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcclxuICAgIEZFVENIOiAodHlwZSxfaWQpPT5kaXNwYXRjaD0+Q29tbWVudC5vZih0eXBlKS5maW5kKHtwYXJlbnQ6X2lkfSlcclxuICAgICAgICAgICAgLmZldGNoKGRhdGE9PmRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS9mZXRjaGVkYCxwYXlsb2FkOntkYXRhLHR5cGUsX2lkfX0pKVxyXG5cclxuICAgICxDUkVBVEU6ICh0eXBlLGlkLGNvbnRlbnQscHJvcHM9e30pPT5kaXNwYXRjaD0+e1xyXG5cdFx0Y29udGVudD1jb250ZW50LnRyaW0oKVxyXG5cdFx0aWYoY29udGVudC5sZW5ndGg8MilcclxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KClcclxuXHJcbiAgICAgICAgY29uc3QgdXNlcj1Vc2VyLmN1cnJlbnRcclxuICAgICAgICBjb25zdCBjb21tZW50PXtcclxuICAgICAgICAgICAgICAgIC4uLnByb3BzLFxyXG4gICAgICAgICAgICAgICAgdHlwZSxcclxuICAgICAgICAgICAgICAgIHBhcmVudDppZCxcclxuICAgICAgICAgICAgICAgIHRodW1ibmFpbDp1c2VyLnRodW1ibmFpbCxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6Y29udGVudFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIENvbW1lbnQub2YodHlwZSkudXBzZXJ0KGNvbW1lbnQpXHJcbiAgICAgICAgICAgIC50aGVuKGE9PmRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS9jcmVhdGVkYCxwYXlsb2FkOmF9KSlcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHJlZHVjZXI9KHN0YXRlPXt9LCB7dHlwZSwgcGF5bG9hZH0pPT57XHJcbiAgICBzd2l0Y2godHlwZSl7XHJcbiAgICBjYXNlIGBAQCR7RE9NQUlOfS9DTEVBUmA6XHJcbiAgICAgICAgcmV0dXJuIHt9XHJcbiAgICBjYXNlIGBAQCR7RE9NQUlOfS9mZXRjaGVkYDpcclxuICAgICAgICByZXR1cm4gey4uLnN0YXRlLCAuLi5wYXlsb2FkfVxyXG4gICAgY2FzZSBgQEAke0RPTUFJTn0vY3JlYXRlZGA6XHJcbiAgICAgICAgcmV0dXJuIHsuLi5zdGF0ZSwgZGF0YTpbLi4uKHN0YXRlLmRhdGF8fFtdKSxwYXlsb2FkXX1cclxuICAgIH1cclxuICAgIHJldHVybiBzdGF0ZVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ29tbWVudFVJIGV4dGVuZHMgQ29tcG9uZW50e1xyXG4gICAgc3RhdGU9e2NvbW1lbnQ6XCJcIn1cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCl7XHJcbiAgICAgICAgY29uc3Qge2Rpc3BhdGNoLHBhcmFtczp7dHlwZSxfaWR9fT10aGlzLnByb3BzXHJcbiAgICAgICAgZGlzcGF0Y2goQUNUSU9OLkZFVENIKHR5cGUsX2lkKSlcclxuICAgIH1cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5kaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vQ0xFQVJgfSlcclxuICAgIH1cclxuICAgIHJlbmRlcigpe1xyXG4gICAgICAgIGNvbnN0IHtkYXRhPVtdLHRlbXBsYXRlLGRpc3BhdGNoLHBhcmFtczp7dHlwZSxfaWR9LGhpbnQ9XCLor7TkuKTlj6VcIiwgc3lzdGVtfT10aGlzLnByb3BzXHJcblx0XHRjb25zdCB7bXVpVGhlbWU6e3BhZ2U6IHtoZWlnaHR9fX09dGhpcy5jb250ZXh0XHJcbiAgICAgICAgY29uc3Qge2NvbW1lbnR9PXRoaXMuc3RhdGVcclxuXHRcdGNvbnN0IGNyZWF0ZT0oKT0+ZGlzcGF0Y2goQUNUSU9OLkNSRUFURSh0eXBlLF9pZCwgY29tbWVudCkpLnRoZW4oYT0+dGhpcy5zZXRTdGF0ZSh7Y29tbWVudDpcIlwifSkpXHJcbiAgICAgICAgbGV0IHNhdmU9e1xyXG4gICAgICAgICAgICBhY3Rpb246XCJTYXZlXCIsXHJcbiAgICAgICAgICAgIGxhYmVsOlwi5Y+R5biDXCIsXHJcbiAgICAgICAgICAgIGljb246IDxJY29uU2F2ZS8+LFxyXG4gICAgICAgICAgICBvblNlbGVjdDpjcmVhdGVcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHBob3RvPXtcclxuICAgICAgICAgICAgYWN0aW9uOlwicGhvdG9cIixcclxuICAgICAgICAgICAgbGFiZWw6XCLnhafniYdcIixcclxuICAgICAgICAgICAgaWNvbjogPEljb25DYW1lcmEvPixcclxuICAgICAgICAgICAgb25TZWxlY3Q6ZT0+c2VsZWN0SW1hZ2VGaWxlKClcclxuICAgICAgICAgICAgICAgIC50aGVuKHVybD0+RmlsZS51cGxvYWQodXJsKSlcclxuICAgICAgICAgICAgICAgIC50aGVuKHVybD0+ZGlzcGF0Y2goQUNUSU9OLkNSRUFURSh0eXBlLF9pZCx1cmwse2NvbnRlbnRfdHlwZTpcInBob3RvXCJ9KSkpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYWN0aW9uPXBob3RvXHJcblxyXG4gICAgICAgIGlmKGNvbW1lbnQudHJpbSgpKVxyXG4gICAgICAgICAgICBhY3Rpb249c2F2ZVxyXG5cclxuXHRcdHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tbWVudFwiIHN0eWxlPXt7bWluSGVpZ2h0OmhlaWdodCwgYmFja2dyb3VuZENvbG9yOmJnfX0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIHtkYXRhLm1hcChhPT5SZWFjdC5jcmVhdGVFbGVtZW50KHRlbXBsYXRlLCB7Y29tbWVudDphLGtleTphLl9pZCwgc3lzdGVtfSkpfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgPENvbW1hbmRCYXJcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb290YmFyIGNlbnRlcmlucHV0XCJcclxuICAgICAgICAgICAgICAgICAgICBwcmltYXJ5PVwiU2F2ZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM9e1tcclxuXHRcdFx0XHRcdFx0XHR7YWN0aW9uOlwiQmFja1wifSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICg8dGV4dGFyZWEgcGxhY2Vob2xkZXI9e2hpbnR9IHZhbHVlPXtjb21tZW50fVxyXG5cdFx0XHRcdFx0XHRcdFx0b25LZXlEb3duPXsoe2tleUNvZGV9KT0+a2V5Q29kZT09MTMgJiYgY3JlYXRlKCl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2U9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y29tbWVudDplLnRhcmdldC52YWx1ZX0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19Lz4pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF19XHJcbiAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgIFx0XHQ8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xyXG5cdFx0bXVpVGhlbWU6IFByb3BUeXBlcy5vYmplY3RcclxuXHR9XHJcblxyXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcz17XHJcbiAgICAgICAgc3lzdGVtVGh1bWJuYWlsOm51bGwsXHJcbiAgICAgICAgdGVtcGxhdGU6ICh7Y29tbWVudCwgc3lzdGVtPXt9fSk9PntcclxuXHRcdFx0bGV0IG5hbWUsIGxlZnQsIHJpZ2h0LCB0ZXh0XHJcblx0XHRcdGNvbnN0IGlzT3duZXI9Y29tbWVudC5hdXRob3IuX2lkPT1Vc2VyLmN1cnJlbnQuX2lkXHJcbiAgICAgICAgICAgIGlmKGNvbW1lbnQuc3lzdGVtKXtcclxuICAgICAgICAgICAgICAgIG5hbWU9KDxzcGFuIHN0eWxlPXt7Zm9udFNpemU6J3gtc21hbGwnfX0+e3N5c3RlbS5uYW1lfTwvc3Bhbj4pXHJcblx0XHRcdFx0bGVmdD0oPEF2YXRhciBzcmM9e3N5c3RlbS50aHVtYm5haWx9Lz4pXHJcblx0XHRcdFx0cmlnaHQ9KDxzcGFuLz4pXHJcbiAgICAgICAgICAgIH1lbHNlIGlmKGlzT3duZXIpe1xyXG5cdFx0XHRcdGxlZnQ9KDxzcGFuLz4pXHJcblx0XHRcdFx0cmlnaHQ9KDxBdmF0YXIgc3JjPXtVc2VyLmN1cnJlbnQudGh1bWJuYWlsfS8+KVxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRuYW1lPSg8c3BhbiBzdHlsZT17e2ZvbnRTaXplOid4LXNtYWxsJ319Pntjb21tZW50LmF1dGhvci5uYW1lfTwvc3Bhbj4pXHJcblx0XHRcdFx0bGVmdD0oPEF2YXRhciBzcmM9e2NvbW1lbnQudGh1bWJuYWlsfS8+KVxyXG5cdFx0XHRcdHJpZ2h0PSg8c3Bhbi8+KVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdDxkaXYga2V5PXtjb21tZW50Ll9pZH0gY2xhc3NOYW1lPVwiYWNvbW1lbnRcIiBzdHlsZT17e3BhZGRpbmc6NX19PlxyXG5cdFx0XHRcdFx0PGRpdiBzdHlsZT17e3dpZHRoOjQwLG1pbkhlaWdodDo0MCx2ZXJ0aWNhbEFsaWduOlwidG9wXCJ9fT57bGVmdH08L2Rpdj5cclxuXHRcdFx0XHRcdDxkaXYgc3R5bGU9e3twYWRkaW5nOjUsdmVydGljYWxBbGlnbjpcInRvcFwifX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+e25hbWV9PC9kaXY+XHJcblx0XHRcdFx0XHRcdDxwIGNsYXNzTmFtZT17YGNvbnRlbnQgJHshY29tbWVudC5zeXN0ZW0mJmlzT3duZXI/XCJvd25lclwiOlwiXCJ9YH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICgoY29udGVudCx0eXBlKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCh0eXBlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwicGhvdG9cIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxpbWcgc3JjPXtjb250ZW50fSBzdHlsZT17e3dpZHRoOjE1MH19Lz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPHNwYW4+e2NvbnRlbnR9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKGNvbW1lbnQuY29udGVudCxjb21tZW50LmNvbnRlbnRfdHlwZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cdFx0XHRcdFx0XHQ8L3A+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7d2lkdGg6NDAsbWluSGVpZ2h0OjQwLHZlcnRpY2FsQWxpZ246XCJ0b3BcIn19PntyaWdodH08L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0KVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIElubGluZSBleHRlbmRzIENvbXBvbmVudHtcclxuXHRjb21wb25lbnREaWRNb3VudCgpe1xyXG4gICAgICAgIGNvbnN0IHtkaXNwYXRjaCxraW5kOntfbmFtZX0sbW9kZWw6e19pZH19PXRoaXMucHJvcHNcclxuICAgICAgICBkaXNwYXRjaChBQ1RJT04uRkVUQ0goX25hbWUsX2lkKSlcclxuICAgIH1cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5kaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vQ0xFQVJgfSlcclxuICAgIH1cclxuXHJcblx0cmVuZGVyKCl7XHJcblx0XHRjb25zdCB7ZGF0YT1bXSx0ZW1wbGF0ZSwgZW1wdHlJY29uLCBcclxuXHRcdFx0ZGlzcGF0Y2gsa2luZDp7X25hbWV9LG1vZGVsOntfaWR9LFxyXG5cdFx0XHRjb21tZW50YWJsZT10cnVlLFxyXG5cdFx0XHRoaW50PVwi6K+05Lik5Y+lXCIsIGVtcHR5fT10aGlzLnByb3BzXHJcblxyXG5cdFx0bGV0IGNvbnRlbnQ9bnVsbFxyXG5cdFx0aWYoZGF0YS5sZW5ndGgpe1xyXG5cdFx0XHRjb250ZW50PShcclxuXHRcdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdFx0e2RhdGEubWFwKGE9PlJlYWN0LmNyZWF0ZUVsZW1lbnQodGVtcGxhdGUsIHtjb21tZW50OmEsa2V5OmEuX2lkfSkpfVxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQpXHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0Y29udGVudD08RW1wdHkgdGV4dD17ZW1wdHl8fFwi5b2T5YmN6L+Y5rKh5pyJ6K+E6K665ZOmXCJ9IGljb249e2VtcHR5SWNvbn0vPlxyXG5cdFx0fVxyXG5cdFx0bGV0IGVkaXRvcj1udWxsXHJcblx0XHRpZihjb21tZW50YWJsZSlcclxuXHRcdFx0ZWRpdG9yPSg8RWRpdG9yIHR5cGU9e19uYW1lfSBfaWQ9e19pZH0gZGlzcGF0Y2g9e2Rpc3BhdGNofSBoaW50PXtoaW50fS8+KVxyXG5cdFx0cmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb21tZW50IGlubGluZVwiPlxyXG5cdFx0XHRcdHtlZGl0b3J9XHJcblx0XHRcdFx0e2NvbnRlbnR9XHJcbiAgICBcdFx0PC9kaXY+XHJcbiAgICAgICAgKVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XHJcblx0XHR0ZW1wbGF0ZTpDb21tZW50VUkuZGVmYXVsdFByb3BzLnRlbXBsYXRlLFxyXG5cdFx0ZW1wdHlJY29uOjxJY29uRW1wdHlDb21tZW50Lz5cclxuXHR9XHJcbn1cclxuXHJcblxyXG5jbGFzcyBFZGl0b3IgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0c3RhdGU9e1xyXG5cdFx0Y29tbWVudDpcIlwiXHJcblx0fVxyXG5cdHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge2NvbW1lbnR9PXRoaXMuc3RhdGVcclxuICAgICAgICBjb25zdCB7aGludH09dGhpcy5wcm9wc1xyXG5cdFx0bGV0IGFjdGlvbj1udWxsXHJcblx0XHRpZihjb21tZW50KXtcclxuXHRcdFx0YWN0aW9uPTxJY29uQnV0dG9uIG9uVG91Y2hUYXA9e3RoaXMuc2F2ZS5iaW5kKHRoaXMpfT48SWNvblNhdmUvPjwvSWNvbkJ1dHRvbj5cclxuXHRcdH1lbHNle1xyXG5cdFx0XHRhY3Rpb249PEljb25CdXR0b24gb25Ub3VjaFRhcD17dGhpcy5waG90by5iaW5kKHRoaXMpfT48SWNvbkNhbWVyYS8+PC9JY29uQnV0dG9uPlxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PFRvb2xiYXIgbm9HdXR0ZXI9e3RydWV9IGNsYXNzTmFtZT1cImdyaWRcIlxyXG5cdFx0XHRcdHN0eWxlPXt7YmFja2dyb3VuZENvbG9yOlwidHJhbnNwYXJlbnRcIn19PlxyXG5cdFx0XHRcdDxUb29sYmFyR3JvdXAgc3R5bGU9e3tkaXNwbGF5OlwidGFibGUtY2VsbFwiLHdpZHRoOlwiMTAwJVwifX0+XHJcblx0XHRcdFx0XHQ8VGV4dEZpZWxkIHZhbHVlPXtjb21tZW50fVxyXG5cdFx0XHRcdFx0XHRvbkNoYW5nZT17KGUsY29tbWVudCk9PnRoaXMuc2V0U3RhdGUoe2NvbW1lbnR9KX1cclxuXHRcdFx0XHRcdFx0b25LZXlEb3duPXsoe2tleUNvZGV9KT0+a2V5Q29kZT09MTMgJiYgdGhpcy5zYXZlKCl9XHJcblx0XHRcdFx0XHRcdGhpbnRUZXh0PXtoaW50fVxyXG5cdFx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9Lz5cclxuXHRcdFx0XHQ8L1Rvb2xiYXJHcm91cD5cclxuXHRcdFx0XHQ8VG9vbGJhckdyb3VwIHN0eWxlPXt7d2lkdGg6NDB9fT5cclxuXHRcdFx0XHRcdHthY3Rpb259XHJcblx0XHRcdFx0PC9Ub29sYmFyR3JvdXA+XHJcblx0XHRcdDwvVG9vbGJhcj5cclxuXHRcdClcclxuXHR9XHJcblxyXG5cdHNhdmUoKXtcclxuXHRcdGNvbnN0IHt0eXBlLCBfaWQsZGlzcGF0Y2h9PXRoaXMucHJvcHNcclxuXHRcdGNvbnN0IHtjb21tZW50fT10aGlzLnN0YXRlXHJcblx0XHRkaXNwYXRjaChBQ1RJT04uQ1JFQVRFKHR5cGUsX2lkLCBjb21tZW50KSlcclxuXHRcdFx0LnRoZW4oYT0+dGhpcy5zZXRTdGF0ZSh7Y29tbWVudDpcIlwifSkpXHJcblx0fVxyXG5cclxuXHRwaG90bygpe1xyXG5cdFx0Y29uc3Qge3R5cGUsIF9pZCxkaXNwYXRjaH09dGhpcy5wcm9wc1xyXG5cdFx0Y29uc3Qge2NvbW1lbnR9PXRoaXMuc3RhdGVcclxuXHRcdHNlbGVjdEltYWdlRmlsZSgpXHJcblx0XHRcdC50aGVuKHVybD0+RmlsZS51cGxvYWQodXJsKSlcclxuXHRcdFx0LnRoZW4odXJsPT5kaXNwYXRjaChBQ1RJT04uQ1JFQVRFKHR5cGUsX2lkLHVybCx7Y29udGVudF90eXBlOlwicGhvdG9cIn0pKSlcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24oY29ubmVjdChzdGF0ZT0+c3RhdGUuY29tbWVudCkoQ29tbWVudFVJKSx7XHJcblx0cmVkdWNlcixcclxuXHRJbmxpbmU6IGNvbm5lY3Qoc3RhdGU9PnN0YXRlLmNvbW1lbnQpKElubGluZSlcclxufSlcclxuIl19