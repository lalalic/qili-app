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
			return _comment2.default.of(type).find({ parent: _id }, { sort: [["createdAt", "desc"]], limit: 20 }).fetch(function (data) {
				return dispatch({ type: "@@" + DOMAIN + "/fetched", payload: { data: data.reverse(), type: type, _id: _id } });
			});
		};
	},
	FETCH_MORE: function FETCH_MORE() {
		return function (dispatch, getState) {
			return Promise.resolve();
		};
	},
	FETCH_REFRESH: function FETCH_REFRESH() {
		return function (dispatch, getState) {
			return Promise.resolve();
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

function smartFormat(d) {
	var now = new Date();
	switch (d.relative(now)) {
		case 0:
			return d.format("HH:mm");
		case -1:
			return d.format("昨天 HH:mm");
		default:
			if (now.getFullYear() == d.getFullYear()) return d.format("MM月DD日 HH:mm");else return d.format("YYYY年MM月DD日 HH:mm");
	}
}

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
			this.end.scrollIntoView({ behavior: "smooth" });
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			this.props.dispatch({ type: "@@" + DOMAIN + "/CLEAR" });
		}
	}, {
		key: "componentDidUpdate",
		value: function componentDidUpdate(prevProps, prevState) {
			var _prevProps$prev = prevProps.prev,
			    prev = _prevProps$prev === undefined ? [{}] : _prevProps$prev;
			var _props$data = this.props.data,
			    data = _props$data === undefined ? [{}] : _props$data;

			if (prev[0]._id !== data[0]._id) {
				this.end.scrollIntoView({ behavior: "smooth" });
			}
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
					data.reduce(function (state, a) {
						var comments = state.comments,
						    last = state.last;

						var props = { comment: a, key: a._id, system: system };
						if (!last || a.createdAt.getTime() - last.getTime() > 1000 * 60) {
							props.time = a.createdAt;
						}
						comments.push(_react2.default.createElement(template, props));
						state.last = a.createdAt;
						return state;
					}, { comments: [] }).comments
				),
				_react2.default.createElement("div", { ref: function ref(el) {
						return _this2.end = el;
					} }),
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
		    system = _ref6$system === undefined ? {} : _ref6$system,
		    time = _ref6.time;

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

		var timing = null;
		if (time) {
			timing = _react2.default.createElement(
				"center",
				null,
				_react2.default.createElement(
					"span",
					{ style: { backgroundColor: "lightgray", fontSize: 'x-small', padding: 2, borderRadius: 2 } },
					smartFormat(time)
				)
			);
		}

		return _react2.default.createElement(
			"div",
			null,
			timing,
			_react2.default.createElement(
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
			this.end.scrollIntoView({ behavior: "smooth" });
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			this.props.dispatch({ type: "@@" + DOMAIN + "/CLEAR" });
		}
	}, {
		key: "componentDidUpdate",
		value: function componentDidUpdate(prevProps, prevState) {
			var _prevProps$prev2 = prevProps.prev,
			    prev = _prevProps$prev2 === undefined ? [{}] : _prevProps$prev2;
			var _props$data2 = this.props.data,
			    data = _props$data2 === undefined ? [{}] : _props$data2;

			if (prev[0]._id !== data[0]._id) {
				this.end.scrollIntoView({ behavior: "smooth" });
			}
		}
	}, {
		key: "render",
		value: function render() {
			var _this4 = this;

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
				content,
				_react2.default.createElement("div", { ref: function ref(el) {
						return _this4.end = el;
					} })
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

		var _temp2, _this5, _ret2;

		_classCallCheck(this, Editor);

		for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			args[_key2] = arguments[_key2];
		}

		return _ret2 = (_temp2 = (_this5 = _possibleConstructorReturn(this, (_ref4 = Editor.__proto__ || Object.getPrototypeOf(Editor)).call.apply(_ref4, [this].concat(args))), _this5), _this5.state = {
			comment: ""
		}, _temp2), _possibleConstructorReturn(_this5, _ret2);
	}

	_createClass(Editor, [{
		key: "render",
		value: function render() {
			var _this6 = this;

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
							return _this6.setState({ comment: comment });
						},
						onKeyDown: function onKeyDown(_ref5) {
							var keyCode = _ref5.keyCode;
							return keyCode == 13 && _this6.save();
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
			var _this7 = this;

			var _props5 = this.props,
			    type = _props5.type,
			    _id = _props5._id,
			    dispatch = _props5.dispatch;
			var comment = this.state.comment;

			dispatch(ACTION.CREATE(type, _id, comment)).then(function (a) {
				return _this7.setState({ comment: "" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1lbnQuanMiXSwibmFtZXMiOlsiRE9NQUlOIiwiQUNUSU9OIiwiRkVUQ0giLCJ0eXBlIiwiX2lkIiwib2YiLCJmaW5kIiwicGFyZW50Iiwic29ydCIsImxpbWl0IiwiZmV0Y2giLCJkaXNwYXRjaCIsInBheWxvYWQiLCJkYXRhIiwicmV2ZXJzZSIsIkZFVENIX01PUkUiLCJnZXRTdGF0ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwiRkVUQ0hfUkVGUkVTSCIsIkNSRUFURSIsImlkIiwiY29udGVudCIsInByb3BzIiwidHJpbSIsImxlbmd0aCIsInJlamVjdCIsInVzZXIiLCJjdXJyZW50IiwiY29tbWVudCIsInRodW1ibmFpbCIsInVwc2VydCIsInRoZW4iLCJhIiwicmVkdWNlciIsInN0YXRlIiwic21hcnRGb3JtYXQiLCJkIiwibm93IiwiRGF0ZSIsInJlbGF0aXZlIiwiZm9ybWF0IiwiZ2V0RnVsbFllYXIiLCJDb21tZW50VUkiLCJwYXJhbXMiLCJlbmQiLCJzY3JvbGxJbnRvVmlldyIsImJlaGF2aW9yIiwicHJldlByb3BzIiwicHJldlN0YXRlIiwicHJldiIsInRlbXBsYXRlIiwiaGludCIsInN5c3RlbSIsImhlaWdodCIsImNvbnRleHQiLCJtdWlUaGVtZSIsInBhZ2UiLCJjcmVhdGUiLCJzZXRTdGF0ZSIsInNhdmUiLCJhY3Rpb24iLCJsYWJlbCIsImljb24iLCJvblNlbGVjdCIsInBob3RvIiwidXBsb2FkIiwidXJsIiwiY29udGVudF90eXBlIiwibWluSGVpZ2h0IiwiYmFja2dyb3VuZENvbG9yIiwicmVkdWNlIiwiY29tbWVudHMiLCJsYXN0Iiwia2V5IiwiY3JlYXRlZEF0IiwiZ2V0VGltZSIsInRpbWUiLCJwdXNoIiwiY3JlYXRlRWxlbWVudCIsImVsIiwia2V5Q29kZSIsImUiLCJ0YXJnZXQiLCJ2YWx1ZSIsInByZXZlbnREZWZhdWx0IiwiY29udGV4dFR5cGVzIiwib2JqZWN0IiwiZGVmYXVsdFByb3BzIiwic3lzdGVtVGh1bWJuYWlsIiwibmFtZSIsImxlZnQiLCJyaWdodCIsInRleHQiLCJpc093bmVyIiwiYXV0aG9yIiwiZm9udFNpemUiLCJ0aW1pbmciLCJwYWRkaW5nIiwiYm9yZGVyUmFkaXVzIiwid2lkdGgiLCJ2ZXJ0aWNhbEFsaWduIiwiSW5saW5lIiwiX25hbWUiLCJraW5kIiwibW9kZWwiLCJlbXB0eUljb24iLCJjb21tZW50YWJsZSIsImVtcHR5IiwibWFwIiwiZWRpdG9yIiwiRWRpdG9yIiwiYmluZCIsImRpc3BsYXkiLCJPYmplY3QiLCJhc3NpZ24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7QUFFQTs7OztBQUNBOztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUFFTyxJQUFNQSwwQkFBTyxTQUFiO0FBQ0EsSUFBTUMsMEJBQU87QUFDaEJDLFFBQU8sZUFBQ0MsSUFBRCxFQUFNQyxHQUFOO0FBQUEsU0FBWTtBQUFBLFVBQVUsa0JBQVFDLEVBQVIsQ0FBV0YsSUFBWCxFQUFpQkcsSUFBakIsQ0FBc0IsRUFBQ0MsUUFBT0gsR0FBUixFQUF0QixFQUFvQyxFQUFDSSxNQUFLLENBQUMsQ0FBQyxXQUFELEVBQWEsTUFBYixDQUFELENBQU4sRUFBOEJDLE9BQU0sRUFBcEMsRUFBcEMsRUFDcEJDLEtBRG9CLENBQ2Q7QUFBQSxXQUFNQyxTQUFTLEVBQUNSLGFBQVVILE1BQVYsYUFBRCxFQUE0QlksU0FBUSxFQUFDQyxNQUFNQSxLQUFLQyxPQUFMLEVBQVAsRUFBc0JYLFVBQXRCLEVBQTJCQyxRQUEzQixFQUFwQyxFQUFULENBQU47QUFBQSxJQURjLENBQVY7QUFBQSxHQUFaO0FBQUEsRUFEUztBQUdsQlcsYUFBWTtBQUFBLFNBQUksVUFBQ0osUUFBRCxFQUFVSyxRQUFWLEVBQXFCO0FBQ3JDLFVBQU9DLFFBQVFDLE9BQVIsRUFBUDtBQUNBLEdBRlk7QUFBQSxFQUhNO0FBTWxCQyxnQkFBZTtBQUFBLFNBQUksVUFBQ1IsUUFBRCxFQUFVSyxRQUFWLEVBQXFCO0FBQ3hDLFVBQU9DLFFBQVFDLE9BQVIsRUFBUDtBQUNBLEdBRmU7QUFBQSxFQU5HO0FBU2ZFLFNBQVEsZ0JBQUNqQixJQUFELEVBQU1rQixFQUFOLEVBQVNDLE9BQVQ7QUFBQSxNQUFpQkMsS0FBakIsdUVBQXVCLEVBQXZCO0FBQUEsU0FBNEIsb0JBQVU7QUFDakRELGFBQVFBLFFBQVFFLElBQVIsRUFBUjtBQUNBLE9BQUdGLFFBQVFHLE1BQVIsR0FBZSxDQUFsQixFQUNDLE9BQU9SLFFBQVFTLE1BQVIsRUFBUDs7QUFFSyxPQUFNQyxPQUFLLGVBQUtDLE9BQWhCO0FBQ0EsT0FBTUMsdUJBQ0tOLEtBREw7QUFFRXBCLGNBRkY7QUFHRUksWUFBT2MsRUFIVDtBQUlFUyxlQUFVSCxLQUFLRyxTQUpqQjtBQUtFUixhQUFRQTtBQUxWLEtBQU47QUFPQSxVQUFPLGtCQUFRakIsRUFBUixDQUFXRixJQUFYLEVBQWlCNEIsTUFBakIsQ0FBd0JGLE9BQXhCLEVBQ0ZHLElBREUsQ0FDRztBQUFBLFdBQUdyQixTQUFTLEVBQUNSLGFBQVVILE1BQVYsYUFBRCxFQUE0QlksU0FBUXFCLENBQXBDLEVBQVQsQ0FBSDtBQUFBLElBREgsQ0FBUDtBQUVILEdBZlE7QUFBQTtBQVRPLENBQWI7O0FBMkJBLElBQU1DLDRCQUFRLFNBQVJBLE9BQVEsR0FBNkI7QUFBQSxLQUE1QkMsS0FBNEIsdUVBQXRCLEVBQXNCO0FBQUE7QUFBQSxLQUFqQmhDLElBQWlCLFFBQWpCQSxJQUFpQjtBQUFBLEtBQVhTLE9BQVcsUUFBWEEsT0FBVzs7QUFDOUMsU0FBT1QsSUFBUDtBQUNBLGNBQVVILE1BQVY7QUFDSSxVQUFPLEVBQVA7QUFDSixjQUFVQSxNQUFWO0FBQ0ksdUJBQVdtQyxLQUFYLEVBQXFCdkIsT0FBckI7QUFDSixjQUFVWixNQUFWO0FBQ0ksdUJBQVdtQyxLQUFYLElBQWtCdEIsbUNBQVVzQixNQUFNdEIsSUFBTixJQUFZLEVBQXRCLElBQTJCRCxPQUEzQixFQUFsQjtBQU5KO0FBUUEsUUFBT3VCLEtBQVA7QUFDSCxDQVZNOztBQVlQLFNBQVNDLFdBQVQsQ0FBcUJDLENBQXJCLEVBQXVCO0FBQ3RCLEtBQUlDLE1BQUksSUFBSUMsSUFBSixFQUFSO0FBQ0EsU0FBT0YsRUFBRUcsUUFBRixDQUFXRixHQUFYLENBQVA7QUFDQSxPQUFLLENBQUw7QUFDQyxVQUFPRCxFQUFFSSxNQUFGLENBQVMsT0FBVCxDQUFQO0FBQ0QsT0FBSyxDQUFDLENBQU47QUFDQyxVQUFPSixFQUFFSSxNQUFGLENBQVMsVUFBVCxDQUFQO0FBQ0Q7QUFDQyxPQUFHSCxJQUFJSSxXQUFKLE1BQW1CTCxFQUFFSyxXQUFGLEVBQXRCLEVBQ0MsT0FBT0wsRUFBRUksTUFBRixDQUFTLGNBQVQsQ0FBUCxDQURELEtBR0MsT0FBT0osRUFBRUksTUFBRixDQUFTLG1CQUFULENBQVA7QUFURjtBQVdBOztJQUVZRSxTLFdBQUFBLFM7Ozs7Ozs7Ozs7Ozs7OzRMQUNUUixLLEdBQU0sRUFBQ04sU0FBUSxFQUFULEU7Ozs7O3NDQUNhO0FBQUEsZ0JBQ29CLEtBQUtOLEtBRHpCO0FBQUEsT0FDUlosUUFEUSxVQUNSQSxRQURRO0FBQUEsOEJBQ0NpQyxNQUREO0FBQUEsT0FDU3pDLElBRFQsaUJBQ1NBLElBRFQ7QUFBQSxPQUNjQyxHQURkLGlCQUNjQSxHQURkOztBQUVmTyxZQUFTVixPQUFPQyxLQUFQLENBQWFDLElBQWIsRUFBa0JDLEdBQWxCLENBQVQ7QUFDTixRQUFLeUMsR0FBTCxDQUFTQyxjQUFULENBQXdCLEVBQUVDLFVBQVUsUUFBWixFQUF4QjtBQUNHOzs7eUNBQ3FCO0FBQ2xCLFFBQUt4QixLQUFMLENBQVdaLFFBQVgsQ0FBb0IsRUFBQ1IsYUFBVUgsTUFBVixXQUFELEVBQXBCO0FBQ0g7OztxQ0FDZWdELFMsRUFBV0MsUyxFQUFVO0FBQUEseUJBQ3JCRCxTQURxQixDQUNoQ0UsSUFEZ0M7QUFBQSxPQUNoQ0EsSUFEZ0MsbUNBQzNCLENBQUMsRUFBRCxDQUQyQjtBQUFBLHFCQUVyQixLQUFLM0IsS0FGZ0IsQ0FFaENWLElBRmdDO0FBQUEsT0FFaENBLElBRmdDLCtCQUUzQixDQUFDLEVBQUQsQ0FGMkI7O0FBR3ZDLE9BQUdxQyxLQUFLLENBQUwsRUFBUTlDLEdBQVIsS0FBY1MsS0FBSyxDQUFMLEVBQVFULEdBQXpCLEVBQTZCO0FBQzVCLFNBQUt5QyxHQUFMLENBQVNDLGNBQVQsQ0FBd0IsRUFBRUMsVUFBVSxRQUFaLEVBQXhCO0FBQ0E7QUFDRDs7OzJCQUNVO0FBQUE7O0FBQUEsaUJBQ21FLEtBQUt4QixLQUR4RTtBQUFBLDhCQUNHVixJQURIO0FBQUEsT0FDR0EsSUFESCxnQ0FDUSxFQURSO0FBQUEsT0FDV3NDLFFBRFgsV0FDV0EsUUFEWDtBQUFBLE9BQ29CeEMsUUFEcEIsV0FDb0JBLFFBRHBCO0FBQUEsZ0NBQzZCaUMsTUFEN0I7QUFBQSxPQUNxQ3pDLElBRHJDLGtCQUNxQ0EsSUFEckM7QUFBQSxPQUMwQ0MsR0FEMUMsa0JBQzBDQSxHQUQxQztBQUFBLDhCQUMrQ2dELElBRC9DO0FBQUEsT0FDK0NBLElBRC9DLGdDQUNvRCxLQURwRDtBQUFBLE9BQzJEQyxNQUQzRCxXQUMyREEsTUFEM0Q7QUFBQSxPQUVjQyxNQUZkLEdBRXdCLEtBQUtDLE9BRjdCLENBRUhDLFFBRkcsQ0FFT0MsSUFGUCxDQUVjSCxNQUZkO0FBQUEsT0FHR3pCLE9BSEgsR0FHWSxLQUFLTSxLQUhqQixDQUdHTixPQUhIOztBQUlWLE9BQU02QixTQUFPLFNBQVBBLE1BQU87QUFBQSxXQUFJL0MsU0FBU1YsT0FBT21CLE1BQVAsQ0FBY2pCLElBQWQsRUFBbUJDLEdBQW5CLEVBQXdCeUIsT0FBeEIsQ0FBVCxFQUEyQ0csSUFBM0MsQ0FBZ0Q7QUFBQSxZQUFHLE9BQUsyQixRQUFMLENBQWMsRUFBQzlCLFNBQVEsRUFBVCxFQUFkLENBQUg7QUFBQSxLQUFoRCxDQUFKO0FBQUEsSUFBYjtBQUNNLE9BQUkrQixPQUFLO0FBQ0xDLFlBQU8sTUFERjtBQUVMQyxXQUFNLElBRkQ7QUFHTEMsVUFBTSxtREFIRDtBQUlMQyxjQUFTTjtBQUpKLElBQVQ7QUFNQSxPQUFJTyxRQUFNO0FBQ05KLFlBQU8sT0FERDtBQUVOQyxXQUFNLElBRkE7QUFHTkMsVUFBTSwwREFIQTtBQUlOQyxjQUFTO0FBQUEsWUFBRyw0QkFDUGhDLElBRE8sQ0FDRjtBQUFBLGFBQUssZUFBS2tDLE1BQUwsQ0FBWUMsR0FBWixDQUFMO0FBQUEsTUFERSxFQUVQbkMsSUFGTyxDQUVGO0FBQUEsYUFBS3JCLFNBQVNWLE9BQU9tQixNQUFQLENBQWNqQixJQUFkLEVBQW1CQyxHQUFuQixFQUF1QitELEdBQXZCLEVBQTJCLEVBQUNDLGNBQWEsT0FBZCxFQUEzQixDQUFULENBQUw7QUFBQSxNQUZFLENBQUg7QUFBQTtBQUpILElBQVY7O0FBU0EsT0FBSVAsU0FBT0ksS0FBWDs7QUFFQSxPQUFHcEMsUUFBUUwsSUFBUixFQUFILEVBQ0lxQyxTQUFPRCxJQUFQOztBQUVWLFVBQ1U7QUFBQTtBQUFBLE1BQUssV0FBVSxTQUFmLEVBQXlCLE9BQU8sRUFBQ1MsV0FBVWYsTUFBWCxFQUFtQmdCLCtCQUFuQixFQUFoQztBQUNJO0FBQUE7QUFBQTtBQUNLekQsVUFBSzBELE1BQUwsQ0FBWSxVQUFDcEMsS0FBRCxFQUFPRixDQUFQLEVBQVc7QUFBQSxVQUNoQ3VDLFFBRGdDLEdBQ2pCckMsS0FEaUIsQ0FDaENxQyxRQURnQztBQUFBLFVBQ3ZCQyxJQUR1QixHQUNqQnRDLEtBRGlCLENBQ3ZCc0MsSUFEdUI7O0FBRXJDLFVBQUlsRCxRQUFNLEVBQUNNLFNBQVFJLENBQVQsRUFBV3lDLEtBQUl6QyxFQUFFN0IsR0FBakIsRUFBc0JpRCxjQUF0QixFQUFWO0FBQ0EsVUFBRyxDQUFDb0IsSUFBRCxJQUFVeEMsRUFBRTBDLFNBQUYsQ0FBWUMsT0FBWixLQUFzQkgsS0FBS0csT0FBTCxFQUF2QixHQUF1QyxPQUFLLEVBQXhELEVBQTJEO0FBQzFEckQsYUFBTXNELElBQU4sR0FBVzVDLEVBQUUwQyxTQUFiO0FBQ0E7QUFDREgsZUFBU00sSUFBVCxDQUFjLGdCQUFNQyxhQUFOLENBQW9CNUIsUUFBcEIsRUFBOEI1QixLQUE5QixDQUFkO0FBQ0FZLFlBQU1zQyxJQUFOLEdBQVd4QyxFQUFFMEMsU0FBYjtBQUNBLGFBQU94QyxLQUFQO0FBQ0EsTUFUYyxFQVNiLEVBQUNxQyxVQUFTLEVBQVYsRUFUYSxFQVNFQTtBQVZQLEtBREo7QUFjUiwyQ0FBSyxLQUFLO0FBQUEsYUFBSSxPQUFLM0IsR0FBTCxHQUFTbUMsRUFBYjtBQUFBLE1BQVYsR0FkUTtBQWdCSTtBQUNJLGdCQUFVLHFCQURkO0FBRUksY0FBUSxNQUZaO0FBR0ksWUFBTyxDQUNwQixFQUFDbkIsUUFBTyxNQUFSLEVBRG9CLEVBRUUsNENBQVUsYUFBYVQsSUFBdkIsRUFBNkIsT0FBT3ZCLE9BQXBDO0FBQ3JCLGlCQUFXO0FBQUEsV0FBRW9ELE9BQUYsU0FBRUEsT0FBRjtBQUFBLGNBQWFBLFdBQVMsRUFBVCxJQUFldkIsUUFBNUI7QUFBQSxPQURVO0FBRUcsZ0JBQVUscUJBQUc7QUFDVCxjQUFLQyxRQUFMLENBQWMsRUFBQzlCLFNBQVFxRCxFQUFFQyxNQUFGLENBQVNDLEtBQWxCLEVBQWQ7QUFDQUYsU0FBRUcsY0FBRjtBQUNILE9BTEosR0FGRixFQVFDeEIsTUFSRDtBQUhYO0FBaEJKLElBRFY7QUFpQ0c7Ozs7OztBQTNFUWxCLFMsQ0E2RUwyQyxZLEdBQWE7QUFDbkI5QixXQUFVLGlCQUFVK0I7QUFERCxDO0FBN0VSNUMsUyxDQWlGRjZDLFksR0FBYTtBQUNoQkMsa0JBQWdCLElBREE7QUFFaEJ0QyxXQUFVLHlCQUE4QjtBQUFBLE1BQTVCdEIsT0FBNEIsU0FBNUJBLE9BQTRCO0FBQUEsMkJBQW5Cd0IsTUFBbUI7QUFBQSxNQUFuQkEsTUFBbUIsZ0NBQVosRUFBWTtBQUFBLE1BQVJ3QixJQUFRLFNBQVJBLElBQVE7O0FBQzdDLE1BQUlhLGFBQUo7QUFBQSxNQUFVQyxhQUFWO0FBQUEsTUFBZ0JDLGNBQWhCO0FBQUEsTUFBdUJDLGFBQXZCO0FBQ0EsTUFBTUMsVUFBUWpFLFFBQVFrRSxNQUFSLENBQWUzRixHQUFmLElBQW9CLGVBQUt3QixPQUFMLENBQWF4QixHQUEvQztBQUNTLE1BQUd5QixRQUFRd0IsTUFBWCxFQUFrQjtBQUNkcUMsVUFBTTtBQUFBO0FBQUEsTUFBTSxPQUFPLEVBQUNNLFVBQVMsU0FBVixFQUFiO0FBQW9DM0MsV0FBT3FDO0FBQTNDLElBQU47QUFDWkMsVUFBTSxvREFBUSxLQUFLdEMsT0FBT3ZCLFNBQXBCLEdBQU47QUFDQThELFdBQU8sMkNBQVA7QUFDUyxHQUpELE1BSU0sSUFBR0UsT0FBSCxFQUFXO0FBQ3pCSCxVQUFNLDJDQUFOO0FBQ0FDLFdBQU8sb0RBQVEsS0FBSyxlQUFLaEUsT0FBTCxDQUFhRSxTQUExQixHQUFQO0FBQ0EsR0FIYyxNQUdWO0FBQ0o0RCxVQUFNO0FBQUE7QUFBQSxNQUFNLE9BQU8sRUFBQ00sVUFBUyxTQUFWLEVBQWI7QUFBb0NuRSxZQUFRa0UsTUFBUixDQUFlTDtBQUFuRCxJQUFOO0FBQ0FDLFVBQU0sb0RBQVEsS0FBSzlELFFBQVFDLFNBQXJCLEdBQU47QUFDQThELFdBQU8sMkNBQVA7QUFDQTs7QUFFRCxNQUFJSyxTQUFPLElBQVg7QUFDQSxNQUFHcEIsSUFBSCxFQUFRO0FBQ1BvQixZQUNDO0FBQUE7QUFBQTtBQUNDO0FBQUE7QUFBQSxPQUFNLE9BQU8sRUFBQzNCLGlCQUFnQixXQUFqQixFQUE2QjBCLFVBQVMsU0FBdEMsRUFBZ0RFLFNBQVEsQ0FBeEQsRUFBMERDLGNBQWEsQ0FBdkUsRUFBYjtBQUNFL0QsaUJBQVl5QyxJQUFaO0FBREY7QUFERCxJQUREO0FBTUE7O0FBRUQsU0FDQztBQUFBO0FBQUE7QUFDRW9CLFNBREY7QUFFQztBQUFBO0FBQUEsTUFBSyxLQUFLcEUsUUFBUXpCLEdBQWxCLEVBQXVCLFdBQVUsVUFBakMsRUFBNEMsT0FBTyxFQUFDOEYsU0FBUSxDQUFULEVBQW5EO0FBQ0M7QUFBQTtBQUFBLE9BQUssT0FBTyxFQUFDRSxPQUFNLEVBQVAsRUFBVS9CLFdBQVUsRUFBcEIsRUFBdUJnQyxlQUFjLEtBQXJDLEVBQVo7QUFBMERWO0FBQTFELEtBREQ7QUFFQztBQUFBO0FBQUEsT0FBSyxPQUFPLEVBQUNPLFNBQVEsQ0FBVCxFQUFXRyxlQUFjLEtBQXpCLEVBQVo7QUFDQztBQUFBO0FBQUE7QUFBTVg7QUFBTixNQUREO0FBRUM7QUFBQTtBQUFBLFFBQUcseUJBQXNCLENBQUM3RCxRQUFRd0IsTUFBVCxJQUFpQnlDLE9BQWpCLEdBQXlCLE9BQXpCLEdBQWlDLEVBQXZELENBQUg7QUFFRSxnQkFBQ3hFLE9BQUQsRUFBU25CLElBQVQsRUFBZ0I7QUFDaEIsZUFBT0EsSUFBUDtBQUNBLGFBQUssT0FBTDtBQUNDLGdCQUFPLHVDQUFLLEtBQUttQixPQUFWLEVBQW1CLE9BQU8sRUFBQzhFLE9BQU0sR0FBUCxFQUExQixHQUFQO0FBQ0Q7QUFDQyxnQkFBTztBQUFBO0FBQUE7QUFBTzlFO0FBQVAsVUFBUDtBQUpEO0FBTUEsT0FQRCxDQU9HTyxRQUFRUCxPQVBYLEVBT21CTyxRQUFRdUMsWUFQM0I7QUFGRDtBQUZELEtBRkQ7QUFpQkM7QUFBQTtBQUFBLE9BQUssT0FBTyxFQUFDZ0MsT0FBTSxFQUFQLEVBQVUvQixXQUFVLEVBQXBCLEVBQXVCZ0MsZUFBYyxLQUFyQyxFQUFaO0FBQTBEVDtBQUExRDtBQWpCRDtBQUZELEdBREQ7QUF3QkE7QUFwRHFCLEM7O0lBd0RYVSxNLFdBQUFBLE07Ozs7Ozs7Ozs7O3NDQUNPO0FBQUEsaUJBQzhCLEtBQUsvRSxLQURuQztBQUFBLE9BQ0xaLFFBREssV0FDTEEsUUFESztBQUFBLE9BQ1U0RixLQURWLFdBQ0lDLElBREosQ0FDVUQsS0FEVjtBQUFBLE9BQ3dCbkcsR0FEeEIsV0FDaUJxRyxLQURqQixDQUN3QnJHLEdBRHhCOztBQUVaTyxZQUFTVixPQUFPQyxLQUFQLENBQWFxRyxLQUFiLEVBQW1CbkcsR0FBbkIsQ0FBVDtBQUNOLFFBQUt5QyxHQUFMLENBQVNDLGNBQVQsQ0FBd0IsRUFBRUMsVUFBVSxRQUFaLEVBQXhCO0FBQ0c7Ozt5Q0FDcUI7QUFDbEIsUUFBS3hCLEtBQUwsQ0FBV1osUUFBWCxDQUFvQixFQUFDUixhQUFVSCxNQUFWLFdBQUQsRUFBcEI7QUFDSDs7O3FDQUVlZ0QsUyxFQUFXQyxTLEVBQVU7QUFBQSwwQkFDckJELFNBRHFCLENBQ2hDRSxJQURnQztBQUFBLE9BQ2hDQSxJQURnQyxvQ0FDM0IsQ0FBQyxFQUFELENBRDJCO0FBQUEsc0JBRXJCLEtBQUszQixLQUZnQixDQUVoQ1YsSUFGZ0M7QUFBQSxPQUVoQ0EsSUFGZ0MsZ0NBRTNCLENBQUMsRUFBRCxDQUYyQjs7QUFHdkMsT0FBR3FDLEtBQUssQ0FBTCxFQUFROUMsR0FBUixLQUFjUyxLQUFLLENBQUwsRUFBUVQsR0FBekIsRUFBNkI7QUFDNUIsU0FBS3lDLEdBQUwsQ0FBU0MsY0FBVCxDQUF3QixFQUFFQyxVQUFVLFFBQVosRUFBeEI7QUFDQTtBQUNEOzs7MkJBQ087QUFBQTs7QUFBQSxpQkFJYSxLQUFLeEIsS0FKbEI7QUFBQSw4QkFDQVYsSUFEQTtBQUFBLE9BQ0FBLElBREEsZ0NBQ0ssRUFETDtBQUFBLE9BQ1FzQyxRQURSLFdBQ1FBLFFBRFI7QUFBQSxPQUNrQnVELFNBRGxCLFdBQ2tCQSxTQURsQjtBQUFBLE9BRU4vRixRQUZNLFdBRU5BLFFBRk07QUFBQSxPQUVTNEYsS0FGVCxXQUVHQyxJQUZILENBRVNELEtBRlQ7QUFBQSxPQUV1Qm5HLEdBRnZCLFdBRWdCcUcsS0FGaEIsQ0FFdUJyRyxHQUZ2QjtBQUFBLHFDQUdOdUcsV0FITTtBQUFBLE9BR05BLFdBSE0sdUNBR00sSUFITjtBQUFBLDhCQUlOdkQsSUFKTTtBQUFBLE9BSU5BLElBSk0sZ0NBSUQsS0FKQztBQUFBLE9BSU13RCxLQUpOLFdBSU1BLEtBSk47OztBQU1QLE9BQUl0RixVQUFRLElBQVo7QUFDQSxPQUFHVCxLQUFLWSxNQUFSLEVBQWU7QUFDZEgsY0FDQztBQUFBO0FBQUE7QUFDRVQsVUFBS2dHLEdBQUwsQ0FBUztBQUFBLGFBQUcsZ0JBQU05QixhQUFOLENBQW9CNUIsUUFBcEIsRUFBOEIsRUFBQ3RCLFNBQVFJLENBQVQsRUFBV3lDLEtBQUl6QyxFQUFFN0IsR0FBakIsRUFBOUIsQ0FBSDtBQUFBLE1BQVQ7QUFERixLQUREO0FBS0EsSUFORCxNQU1LO0FBQ0prQixjQUFRLGlEQUFPLE1BQU1zRixTQUFPLFVBQXBCLEVBQWdDLE1BQU1GLFNBQXRDLEdBQVI7QUFDQTtBQUNELE9BQUlJLFNBQU8sSUFBWDtBQUNBLE9BQUdILFdBQUgsRUFDQ0csU0FBUSw4QkFBQyxNQUFELElBQVEsTUFBTVAsS0FBZCxFQUFxQixLQUFLbkcsR0FBMUIsRUFBK0IsVUFBVU8sUUFBekMsRUFBbUQsTUFBTXlDLElBQXpELEdBQVI7QUFDRCxVQUNVO0FBQUE7QUFBQSxNQUFLLFdBQVUsZ0JBQWY7QUFDUDBELFVBRE87QUFFUHhGLFdBRk87QUFHUiwyQ0FBSyxLQUFLO0FBQUEsYUFBSSxPQUFLdUIsR0FBTCxHQUFTbUMsRUFBYjtBQUFBLE1BQVY7QUFIUSxJQURWO0FBT0E7Ozs7OztBQTNDV3NCLE0sQ0E2Q0xkLFksR0FBYTtBQUNuQnJDLFdBQVNSLFVBQVU2QyxZQUFWLENBQXVCckMsUUFEYjtBQUVuQnVELFlBQVU7QUFGUyxDOztJQU9mSyxNOzs7Ozs7Ozs7Ozs7OzsyTEFDTDVFLEssR0FBTTtBQUNMTixZQUFRO0FBREgsRzs7Ozs7MkJBR0U7QUFBQTs7QUFBQSxPQUNBQSxPQURBLEdBQ1MsS0FBS00sS0FEZCxDQUNBTixPQURBO0FBQUEsT0FFTXVCLElBRk4sR0FFWSxLQUFLN0IsS0FGakIsQ0FFTTZCLElBRk47O0FBR1AsT0FBSVMsU0FBTyxJQUFYO0FBQ0EsT0FBR2hDLE9BQUgsRUFBVztBQUNWZ0MsYUFBTztBQUFBO0FBQUEsT0FBWSxZQUFZLEtBQUtELElBQUwsQ0FBVW9ELElBQVYsQ0FBZSxJQUFmLENBQXhCO0FBQThDO0FBQTlDLEtBQVA7QUFDQSxJQUZELE1BRUs7QUFDSm5ELGFBQU87QUFBQTtBQUFBLE9BQVksWUFBWSxLQUFLSSxLQUFMLENBQVcrQyxJQUFYLENBQWdCLElBQWhCLENBQXhCO0FBQStDO0FBQS9DLEtBQVA7QUFDQTtBQUNELFVBQ0M7QUFBQTtBQUFBLE1BQVMsVUFBVSxJQUFuQixFQUF5QixXQUFVLE1BQW5DO0FBQ0MsWUFBTyxFQUFDMUMsaUJBQWdCLGFBQWpCLEVBRFI7QUFFQztBQUFBO0FBQUEsT0FBYyxPQUFPLEVBQUMyQyxTQUFRLFlBQVQsRUFBc0JiLE9BQU0sTUFBNUIsRUFBckI7QUFDQywwREFBVyxPQUFPdkUsT0FBbEI7QUFDQyxnQkFBVSxrQkFBQ3FELENBQUQsRUFBR3JELE9BQUg7QUFBQSxjQUFhLE9BQUs4QixRQUFMLENBQWMsRUFBQzlCLGdCQUFELEVBQWQsQ0FBYjtBQUFBLE9BRFg7QUFFQyxpQkFBVztBQUFBLFdBQUVvRCxPQUFGLFNBQUVBLE9BQUY7QUFBQSxjQUFhQSxXQUFTLEVBQVQsSUFBZSxPQUFLckIsSUFBTCxFQUE1QjtBQUFBLE9BRlo7QUFHQyxnQkFBVVIsSUFIWDtBQUlDLGlCQUFXLElBSlo7QUFERCxLQUZEO0FBU0M7QUFBQTtBQUFBLE9BQWMsT0FBTyxFQUFDZ0QsT0FBTSxFQUFQLEVBQXJCO0FBQ0V2QztBQURGO0FBVEQsSUFERDtBQWVBOzs7eUJBRUs7QUFBQTs7QUFBQSxpQkFDc0IsS0FBS3RDLEtBRDNCO0FBQUEsT0FDRXBCLElBREYsV0FDRUEsSUFERjtBQUFBLE9BQ1FDLEdBRFIsV0FDUUEsR0FEUjtBQUFBLE9BQ1lPLFFBRFosV0FDWUEsUUFEWjtBQUFBLE9BRUVrQixPQUZGLEdBRVcsS0FBS00sS0FGaEIsQ0FFRU4sT0FGRjs7QUFHTGxCLFlBQVNWLE9BQU9tQixNQUFQLENBQWNqQixJQUFkLEVBQW1CQyxHQUFuQixFQUF3QnlCLE9BQXhCLENBQVQsRUFDRUcsSUFERixDQUNPO0FBQUEsV0FBRyxPQUFLMkIsUUFBTCxDQUFjLEVBQUM5QixTQUFRLEVBQVQsRUFBZCxDQUFIO0FBQUEsSUFEUDtBQUVBOzs7MEJBRU07QUFBQSxpQkFDcUIsS0FBS04sS0FEMUI7QUFBQSxPQUNDcEIsSUFERCxXQUNDQSxJQUREO0FBQUEsT0FDT0MsR0FEUCxXQUNPQSxHQURQO0FBQUEsT0FDV08sUUFEWCxXQUNXQSxRQURYO0FBQUEsT0FFQ2tCLE9BRkQsR0FFVSxLQUFLTSxLQUZmLENBRUNOLE9BRkQ7O0FBR04sK0JBQ0VHLElBREYsQ0FDTztBQUFBLFdBQUssZUFBS2tDLE1BQUwsQ0FBWUMsR0FBWixDQUFMO0FBQUEsSUFEUCxFQUVFbkMsSUFGRixDQUVPO0FBQUEsV0FBS3JCLFNBQVNWLE9BQU9tQixNQUFQLENBQWNqQixJQUFkLEVBQW1CQyxHQUFuQixFQUF1QitELEdBQXZCLEVBQTJCLEVBQUNDLGNBQWEsT0FBZCxFQUEzQixDQUFULENBQUw7QUFBQSxJQUZQO0FBR0E7Ozs7OztrQkFHYThDLE9BQU9DLE1BQVAsQ0FBYyx5QkFBUTtBQUFBLFFBQU9oRixNQUFNTixPQUFiO0FBQUEsQ0FBUixFQUE4QmMsU0FBOUIsQ0FBZCxFQUF1RDtBQUNyRVQsaUJBRHFFO0FBRXJFb0UsU0FBUSx5QkFBUTtBQUFBLFNBQU9uRSxNQUFNTixPQUFiO0FBQUEsRUFBUixFQUE4QnlFLE1BQTlCO0FBRjZELENBQXZELEMiLCJmaWxlIjoiY29tbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge0F2YXRhciwgTGlzdCwgTGlzdEl0ZW19IGZyb20gXCJtYXRlcmlhbC11aVwiXHJcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcclxuXHJcbmltcG9ydCBUZXh0RmllbGQgZnJvbSAnbWF0ZXJpYWwtdWkvVGV4dEZpZWxkJ1xyXG5pbXBvcnQge1Rvb2xiYXIsIFRvb2xiYXJHcm91cH0gZnJvbSAnbWF0ZXJpYWwtdWkvVG9vbGJhcidcclxuaW1wb3J0IEljb25CdXR0b24gZnJvbSAnbWF0ZXJpYWwtdWkvSWNvbkJ1dHRvbidcclxuXHJcbmltcG9ydCB7Y3lhbjUwIGFzIGJnfSBmcm9tIFwibWF0ZXJpYWwtdWkvc3R5bGVzL2NvbG9yc1wiXHJcbmltcG9ydCBJY29uQ2FtZXJhIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9pbWFnZS9waG90by1jYW1lcmEnXHJcbmltcG9ydCBJY29uU2F2ZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2NvbnRlbnQvc2F2ZVwiXHJcbmltcG9ydCBJY29uRW1wdHlDb21tZW50IGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZWRpdG9yL21vZGUtY29tbWVudFwiXHJcblxyXG5pbXBvcnQge3NlbGVjdCBhcyBzZWxlY3RJbWFnZUZpbGV9IGZyb20gXCIuL2ZpbGUtc2VsZWN0b3JcIlxyXG5cclxuaW1wb3J0IHtTZXJ2aWNlfSBmcm9tICcuLi9kYi9zZXJ2aWNlJ1xyXG5pbXBvcnQgQ29tbWFuZEJhciBmcm9tICcuL2NvbW1hbmQtYmFyJ1xyXG5pbXBvcnQgVXNlciBmcm9tICcuLi9kYi91c2VyJ1xyXG5pbXBvcnQgQ29tbWVudCBmcm9tICcuLi9kYi9jb21tZW50J1xyXG5pbXBvcnQgRmlsZSBmcm9tIFwiLi4vZGIvZmlsZVwiXHJcbmltcG9ydCBFbXB0eSBmcm9tIFwiLi9lbXB0eVwiXHJcblxyXG5leHBvcnQgY29uc3QgRE9NQUlOPVwiQ09NTUVOVFwiXHJcbmV4cG9ydCBjb25zdCBBQ1RJT049e1xyXG4gICAgRkVUQ0g6ICh0eXBlLF9pZCk9PmRpc3BhdGNoPT5Db21tZW50Lm9mKHR5cGUpLmZpbmQoe3BhcmVudDpfaWR9LCB7c29ydDpbW1wiY3JlYXRlZEF0XCIsXCJkZXNjXCJdXSwgbGltaXQ6MjB9KVxyXG4gICAgICAgICAgICAuZmV0Y2goZGF0YT0+ZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L2ZldGNoZWRgLHBheWxvYWQ6e2RhdGE6IGRhdGEucmV2ZXJzZSgpLHR5cGUsX2lkfX0pKVxyXG5cdCxGRVRDSF9NT1JFOiAoKT0+KGRpc3BhdGNoLGdldFN0YXRlKT0+e1xyXG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXHJcblx0fVxyXG5cdCxGRVRDSF9SRUZSRVNIOiAoKT0+KGRpc3BhdGNoLGdldFN0YXRlKT0+e1xyXG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXHJcblx0fVxyXG4gICAgLENSRUFURTogKHR5cGUsaWQsY29udGVudCxwcm9wcz17fSk9PmRpc3BhdGNoPT57XHJcblx0XHRjb250ZW50PWNvbnRlbnQudHJpbSgpXHJcblx0XHRpZihjb250ZW50Lmxlbmd0aDwyKVxyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoKVxyXG5cclxuICAgICAgICBjb25zdCB1c2VyPVVzZXIuY3VycmVudFxyXG4gICAgICAgIGNvbnN0IGNvbW1lbnQ9e1xyXG4gICAgICAgICAgICAgICAgLi4ucHJvcHMsXHJcbiAgICAgICAgICAgICAgICB0eXBlLFxyXG4gICAgICAgICAgICAgICAgcGFyZW50OmlkLFxyXG4gICAgICAgICAgICAgICAgdGh1bWJuYWlsOnVzZXIudGh1bWJuYWlsLFxyXG4gICAgICAgICAgICAgICAgY29udGVudDpjb250ZW50XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICByZXR1cm4gQ29tbWVudC5vZih0eXBlKS51cHNlcnQoY29tbWVudClcclxuICAgICAgICAgICAgLnRoZW4oYT0+ZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L2NyZWF0ZWRgLHBheWxvYWQ6YX0pKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcmVkdWNlcj0oc3RhdGU9e30sIHt0eXBlLCBwYXlsb2FkfSk9PntcclxuICAgIHN3aXRjaCh0eXBlKXtcclxuICAgIGNhc2UgYEBAJHtET01BSU59L0NMRUFSYDpcclxuICAgICAgICByZXR1cm4ge31cclxuICAgIGNhc2UgYEBAJHtET01BSU59L2ZldGNoZWRgOlxyXG4gICAgICAgIHJldHVybiB7Li4uc3RhdGUsIC4uLnBheWxvYWR9XHJcbiAgICBjYXNlIGBAQCR7RE9NQUlOfS9jcmVhdGVkYDpcclxuICAgICAgICByZXR1cm4gey4uLnN0YXRlLCBkYXRhOlsuLi4oc3RhdGUuZGF0YXx8W10pLCBwYXlsb2FkXX1cclxuICAgIH1cclxuICAgIHJldHVybiBzdGF0ZVxyXG59XHJcblxyXG5mdW5jdGlvbiBzbWFydEZvcm1hdChkKXtcclxuXHRsZXQgbm93PW5ldyBEYXRlKClcclxuXHRzd2l0Y2goZC5yZWxhdGl2ZShub3cpKXtcclxuXHRjYXNlIDA6XHJcblx0XHRyZXR1cm4gZC5mb3JtYXQoXCJISDptbVwiKVxyXG5cdGNhc2UgLTE6XHJcblx0XHRyZXR1cm4gZC5mb3JtYXQoXCLmmKjlpKkgSEg6bW1cIilcclxuXHRkZWZhdWx0OlxyXG5cdFx0aWYobm93LmdldEZ1bGxZZWFyKCk9PWQuZ2V0RnVsbFllYXIoKSlcclxuXHRcdFx0cmV0dXJuIGQuZm9ybWF0KFwiTU3mnIhEROaXpSBISDptbVwiKVxyXG5cdFx0ZWxzZVxyXG5cdFx0XHRyZXR1cm4gZC5mb3JtYXQoXCJZWVlZ5bm0TU3mnIhEROaXpSBISDptbVwiKVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENvbW1lbnRVSSBleHRlbmRzIENvbXBvbmVudHtcclxuICAgIHN0YXRlPXtjb21tZW50OlwiXCJ9XHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpe1xyXG4gICAgICAgIGNvbnN0IHtkaXNwYXRjaCxwYXJhbXM6e3R5cGUsX2lkfX09dGhpcy5wcm9wc1xyXG4gICAgICAgIGRpc3BhdGNoKEFDVElPTi5GRVRDSCh0eXBlLF9pZCkpXHJcblx0XHR0aGlzLmVuZC5zY3JvbGxJbnRvVmlldyh7IGJlaGF2aW9yOiBcInNtb290aFwiIH0pO1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKXtcclxuICAgICAgICB0aGlzLnByb3BzLmRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS9DTEVBUmB9KVxyXG4gICAgfVxyXG5cdGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSl7XHJcblx0XHRjb25zdCB7cHJldj1be31dfT1wcmV2UHJvcHNcclxuXHRcdGNvbnN0IHtkYXRhPVt7fV19PXRoaXMucHJvcHNcclxuXHRcdGlmKHByZXZbMF0uX2lkIT09ZGF0YVswXS5faWQpe1xyXG5cdFx0XHR0aGlzLmVuZC5zY3JvbGxJbnRvVmlldyh7IGJlaGF2aW9yOiBcInNtb290aFwiIH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuICAgIHJlbmRlcigpe1xyXG4gICAgICAgIGNvbnN0IHtkYXRhPVtdLHRlbXBsYXRlLGRpc3BhdGNoLHBhcmFtczp7dHlwZSxfaWR9LGhpbnQ9XCLor7TkuKTlj6VcIiwgc3lzdGVtfT10aGlzLnByb3BzXHJcblx0XHRjb25zdCB7bXVpVGhlbWU6e3BhZ2U6IHtoZWlnaHR9fX09dGhpcy5jb250ZXh0XHJcbiAgICAgICAgY29uc3Qge2NvbW1lbnR9PXRoaXMuc3RhdGVcclxuXHRcdGNvbnN0IGNyZWF0ZT0oKT0+ZGlzcGF0Y2goQUNUSU9OLkNSRUFURSh0eXBlLF9pZCwgY29tbWVudCkpLnRoZW4oYT0+dGhpcy5zZXRTdGF0ZSh7Y29tbWVudDpcIlwifSkpXHJcbiAgICAgICAgbGV0IHNhdmU9e1xyXG4gICAgICAgICAgICBhY3Rpb246XCJTYXZlXCIsXHJcbiAgICAgICAgICAgIGxhYmVsOlwi5Y+R5biDXCIsXHJcbiAgICAgICAgICAgIGljb246IDxJY29uU2F2ZS8+LFxyXG4gICAgICAgICAgICBvblNlbGVjdDpjcmVhdGVcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHBob3RvPXtcclxuICAgICAgICAgICAgYWN0aW9uOlwicGhvdG9cIixcclxuICAgICAgICAgICAgbGFiZWw6XCLnhafniYdcIixcclxuICAgICAgICAgICAgaWNvbjogPEljb25DYW1lcmEvPixcclxuICAgICAgICAgICAgb25TZWxlY3Q6ZT0+c2VsZWN0SW1hZ2VGaWxlKClcclxuICAgICAgICAgICAgICAgIC50aGVuKHVybD0+RmlsZS51cGxvYWQodXJsKSlcclxuICAgICAgICAgICAgICAgIC50aGVuKHVybD0+ZGlzcGF0Y2goQUNUSU9OLkNSRUFURSh0eXBlLF9pZCx1cmwse2NvbnRlbnRfdHlwZTpcInBob3RvXCJ9KSkpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYWN0aW9uPXBob3RvXHJcblxyXG4gICAgICAgIGlmKGNvbW1lbnQudHJpbSgpKVxyXG4gICAgICAgICAgICBhY3Rpb249c2F2ZVxyXG5cclxuXHRcdHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tbWVudFwiIHN0eWxlPXt7bWluSGVpZ2h0OmhlaWdodCwgYmFja2dyb3VuZENvbG9yOmJnfX0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIHtkYXRhLnJlZHVjZSgoc3RhdGUsYSk9PntcclxuXHRcdFx0XHRcdFx0XHRsZXQge2NvbW1lbnRzLGxhc3R9PXN0YXRlXHJcblx0XHRcdFx0XHRcdFx0bGV0IHByb3BzPXtjb21tZW50OmEsa2V5OmEuX2lkLCBzeXN0ZW19XHJcblx0XHRcdFx0XHRcdFx0aWYoIWxhc3QgfHwgKGEuY3JlYXRlZEF0LmdldFRpbWUoKS1sYXN0LmdldFRpbWUoKSk+MTAwMCo2MCl7XHJcblx0XHRcdFx0XHRcdFx0XHRwcm9wcy50aW1lPWEuY3JlYXRlZEF0XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdGNvbW1lbnRzLnB1c2goUmVhY3QuY3JlYXRlRWxlbWVudCh0ZW1wbGF0ZSwgcHJvcHMpKVxyXG5cdFx0XHRcdFx0XHRcdHN0YXRlLmxhc3Q9YS5jcmVhdGVkQXRcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gc3RhdGVcclxuXHRcdFx0XHRcdFx0fSx7Y29tbWVudHM6W119KS5jb21tZW50c1x0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0fVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblx0XHRcdFx0PGRpdiByZWY9e2VsPT50aGlzLmVuZD1lbH0vPlxyXG5cclxuICAgICAgICAgICAgICAgIDxDb21tYW5kQmFyXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9vdGJhciBjZW50ZXJpbnB1dFwiXHJcbiAgICAgICAgICAgICAgICAgICAgcHJpbWFyeT1cIlNhdmVcIlxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zPXtbXHJcblx0XHRcdFx0XHRcdFx0e2FjdGlvbjpcIkJhY2tcIn0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoPHRleHRhcmVhIHBsYWNlaG9sZGVyPXtoaW50fSB2YWx1ZT17Y29tbWVudH1cclxuXHRcdFx0XHRcdFx0XHRcdG9uS2V5RG93bj17KHtrZXlDb2RlfSk9PmtleUNvZGU9PTEzICYmIGNyZWF0ZSgpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtlPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2NvbW1lbnQ6ZS50YXJnZXQudmFsdWV9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fS8+KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdfVxyXG4gICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICBcdFx0PC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcclxuXHRcdG11aVRoZW1lOiBQcm9wVHlwZXMub2JqZWN0XHJcblx0fVxyXG5cclxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xyXG4gICAgICAgIHN5c3RlbVRodW1ibmFpbDpudWxsLFxyXG4gICAgICAgIHRlbXBsYXRlOiAoe2NvbW1lbnQsIHN5c3RlbT17fSwgdGltZX0pPT57XHJcblx0XHRcdGxldCBuYW1lLCBsZWZ0LCByaWdodCwgdGV4dFxyXG5cdFx0XHRjb25zdCBpc093bmVyPWNvbW1lbnQuYXV0aG9yLl9pZD09VXNlci5jdXJyZW50Ll9pZFxyXG4gICAgICAgICAgICBpZihjb21tZW50LnN5c3RlbSl7XHJcbiAgICAgICAgICAgICAgICBuYW1lPSg8c3BhbiBzdHlsZT17e2ZvbnRTaXplOid4LXNtYWxsJ319PntzeXN0ZW0ubmFtZX08L3NwYW4+KVxyXG5cdFx0XHRcdGxlZnQ9KDxBdmF0YXIgc3JjPXtzeXN0ZW0udGh1bWJuYWlsfS8+KVxyXG5cdFx0XHRcdHJpZ2h0PSg8c3Bhbi8+KVxyXG4gICAgICAgICAgICB9ZWxzZSBpZihpc093bmVyKXtcclxuXHRcdFx0XHRsZWZ0PSg8c3Bhbi8+KVxyXG5cdFx0XHRcdHJpZ2h0PSg8QXZhdGFyIHNyYz17VXNlci5jdXJyZW50LnRodW1ibmFpbH0vPilcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0bmFtZT0oPHNwYW4gc3R5bGU9e3tmb250U2l6ZToneC1zbWFsbCd9fT57Y29tbWVudC5hdXRob3IubmFtZX08L3NwYW4+KVxyXG5cdFx0XHRcdGxlZnQ9KDxBdmF0YXIgc3JjPXtjb21tZW50LnRodW1ibmFpbH0vPilcclxuXHRcdFx0XHRyaWdodD0oPHNwYW4vPilcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0bGV0IHRpbWluZz1udWxsXHJcblx0XHRcdGlmKHRpbWUpe1xyXG5cdFx0XHRcdHRpbWluZz0oXHJcblx0XHRcdFx0XHQ8Y2VudGVyPlxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBzdHlsZT17e2JhY2tncm91bmRDb2xvcjpcImxpZ2h0Z3JheVwiLGZvbnRTaXplOid4LXNtYWxsJyxwYWRkaW5nOjIsYm9yZGVyUmFkaXVzOjJ9fT5cclxuXHRcdFx0XHRcdFx0XHR7c21hcnRGb3JtYXQodGltZSl9XHJcblx0XHRcdFx0XHRcdDwvc3Bhbj5cclxuXHRcdFx0XHRcdDwvY2VudGVyPilcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIChcclxuXHRcdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdFx0e3RpbWluZ31cclxuXHRcdFx0XHRcdDxkaXYga2V5PXtjb21tZW50Ll9pZH0gY2xhc3NOYW1lPVwiYWNvbW1lbnRcIiBzdHlsZT17e3BhZGRpbmc6NX19PlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IHN0eWxlPXt7d2lkdGg6NDAsbWluSGVpZ2h0OjQwLHZlcnRpY2FsQWxpZ246XCJ0b3BcIn19PntsZWZ0fTwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IHN0eWxlPXt7cGFkZGluZzo1LHZlcnRpY2FsQWxpZ246XCJ0b3BcIn19PlxyXG5cdFx0XHRcdFx0XHRcdDxkaXY+e25hbWV9PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0PHAgY2xhc3NOYW1lPXtgY29udGVudCAkeyFjb21tZW50LnN5c3RlbSYmaXNPd25lcj9cIm93bmVyXCI6XCJcIn1gfT5cclxuXHRcdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0XHQoKGNvbnRlbnQsdHlwZSk9PntcclxuXHRcdFx0XHRcdFx0XHRcdFx0c3dpdGNoKHR5cGUpe1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRjYXNlIFwicGhvdG9cIjpcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gPGltZyBzcmM9e2NvbnRlbnR9IHN0eWxlPXt7d2lkdGg6MTUwfX0vPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiA8c3Bhbj57Y29udGVudH08L3NwYW4+XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdH0pKGNvbW1lbnQuY29udGVudCxjb21tZW50LmNvbnRlbnRfdHlwZSlcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0PC9wPlxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PGRpdiBzdHlsZT17e3dpZHRoOjQwLG1pbkhlaWdodDo0MCx2ZXJ0aWNhbEFsaWduOlwidG9wXCJ9fT57cmlnaHR9PC9kaXY+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0KVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIElubGluZSBleHRlbmRzIENvbXBvbmVudHtcclxuXHRjb21wb25lbnREaWRNb3VudCgpe1xyXG4gICAgICAgIGNvbnN0IHtkaXNwYXRjaCxraW5kOntfbmFtZX0sbW9kZWw6e19pZH19PXRoaXMucHJvcHNcclxuICAgICAgICBkaXNwYXRjaChBQ1RJT04uRkVUQ0goX25hbWUsX2lkKSlcclxuXHRcdHRoaXMuZW5kLnNjcm9sbEludG9WaWV3KHsgYmVoYXZpb3I6IFwic21vb3RoXCIgfSk7XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpe1xyXG4gICAgICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L0NMRUFSYH0pXHJcbiAgICB9XHJcblx0XHJcblx0Y29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKXtcclxuXHRcdGNvbnN0IHtwcmV2PVt7fV19PXByZXZQcm9wc1xyXG5cdFx0Y29uc3Qge2RhdGE9W3t9XX09dGhpcy5wcm9wc1xyXG5cdFx0aWYocHJldlswXS5faWQhPT1kYXRhWzBdLl9pZCl7XHJcblx0XHRcdHRoaXMuZW5kLnNjcm9sbEludG9WaWV3KHsgYmVoYXZpb3I6IFwic21vb3RoXCIgfSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge2RhdGE9W10sdGVtcGxhdGUsIGVtcHR5SWNvbiwgXHJcblx0XHRcdGRpc3BhdGNoLGtpbmQ6e19uYW1lfSxtb2RlbDp7X2lkfSxcclxuXHRcdFx0Y29tbWVudGFibGU9dHJ1ZSxcclxuXHRcdFx0aGludD1cIuivtOS4pOWPpVwiLCBlbXB0eX09dGhpcy5wcm9wc1xyXG5cclxuXHRcdGxldCBjb250ZW50PW51bGxcclxuXHRcdGlmKGRhdGEubGVuZ3RoKXtcclxuXHRcdFx0Y29udGVudD0oXHJcblx0XHRcdFx0PGRpdj5cclxuXHRcdFx0XHRcdHtkYXRhLm1hcChhPT5SZWFjdC5jcmVhdGVFbGVtZW50KHRlbXBsYXRlLCB7Y29tbWVudDphLGtleTphLl9pZH0pKX1cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0KVxyXG5cdFx0fWVsc2V7XHJcblx0XHRcdGNvbnRlbnQ9PEVtcHR5IHRleHQ9e2VtcHR5fHxcIuW9k+WJjei/mOayoeacieivhOiuuuWTplwifSBpY29uPXtlbXB0eUljb259Lz5cclxuXHRcdH1cclxuXHRcdGxldCBlZGl0b3I9bnVsbFxyXG5cdFx0aWYoY29tbWVudGFibGUpXHJcblx0XHRcdGVkaXRvcj0oPEVkaXRvciB0eXBlPXtfbmFtZX0gX2lkPXtfaWR9IGRpc3BhdGNoPXtkaXNwYXRjaH0gaGludD17aGludH0vPilcclxuXHRcdHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tbWVudCBpbmxpbmVcIj5cclxuXHRcdFx0XHR7ZWRpdG9yfVxyXG5cdFx0XHRcdHtjb250ZW50fVxyXG5cdFx0XHRcdDxkaXYgcmVmPXtlbD0+dGhpcy5lbmQ9ZWx9Lz5cclxuICAgIFx0XHQ8L2Rpdj5cclxuICAgICAgICApXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtcclxuXHRcdHRlbXBsYXRlOkNvbW1lbnRVSS5kZWZhdWx0UHJvcHMudGVtcGxhdGUsXHJcblx0XHRlbXB0eUljb246PEljb25FbXB0eUNvbW1lbnQvPlxyXG5cdH1cclxufVxyXG5cclxuXHJcbmNsYXNzIEVkaXRvciBleHRlbmRzIENvbXBvbmVudHtcclxuXHRzdGF0ZT17XHJcblx0XHRjb21tZW50OlwiXCJcclxuXHR9XHJcblx0cmVuZGVyKCl7XHJcblx0XHRjb25zdCB7Y29tbWVudH09dGhpcy5zdGF0ZVxyXG4gICAgICAgIGNvbnN0IHtoaW50fT10aGlzLnByb3BzXHJcblx0XHRsZXQgYWN0aW9uPW51bGxcclxuXHRcdGlmKGNvbW1lbnQpe1xyXG5cdFx0XHRhY3Rpb249PEljb25CdXR0b24gb25Ub3VjaFRhcD17dGhpcy5zYXZlLmJpbmQodGhpcyl9PjxJY29uU2F2ZS8+PC9JY29uQnV0dG9uPlxyXG5cdFx0fWVsc2V7XHJcblx0XHRcdGFjdGlvbj08SWNvbkJ1dHRvbiBvblRvdWNoVGFwPXt0aGlzLnBob3RvLmJpbmQodGhpcyl9PjxJY29uQ2FtZXJhLz48L0ljb25CdXR0b24+XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8VG9vbGJhciBub0d1dHRlcj17dHJ1ZX0gY2xhc3NOYW1lPVwiZ3JpZFwiXHJcblx0XHRcdFx0c3R5bGU9e3tiYWNrZ3JvdW5kQ29sb3I6XCJ0cmFuc3BhcmVudFwifX0+XHJcblx0XHRcdFx0PFRvb2xiYXJHcm91cCBzdHlsZT17e2Rpc3BsYXk6XCJ0YWJsZS1jZWxsXCIsd2lkdGg6XCIxMDAlXCJ9fT5cclxuXHRcdFx0XHRcdDxUZXh0RmllbGQgdmFsdWU9e2NvbW1lbnR9XHJcblx0XHRcdFx0XHRcdG9uQ2hhbmdlPXsoZSxjb21tZW50KT0+dGhpcy5zZXRTdGF0ZSh7Y29tbWVudH0pfVxyXG5cdFx0XHRcdFx0XHRvbktleURvd249eyh7a2V5Q29kZX0pPT5rZXlDb2RlPT0xMyAmJiB0aGlzLnNhdmUoKX1cclxuXHRcdFx0XHRcdFx0aGludFRleHQ9e2hpbnR9XHJcblx0XHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX0vPlxyXG5cdFx0XHRcdDwvVG9vbGJhckdyb3VwPlxyXG5cdFx0XHRcdDxUb29sYmFyR3JvdXAgc3R5bGU9e3t3aWR0aDo0MH19PlxyXG5cdFx0XHRcdFx0e2FjdGlvbn1cclxuXHRcdFx0XHQ8L1Rvb2xiYXJHcm91cD5cclxuXHRcdFx0PC9Ub29sYmFyPlxyXG5cdFx0KVxyXG5cdH1cclxuXHJcblx0c2F2ZSgpe1xyXG5cdFx0Y29uc3Qge3R5cGUsIF9pZCxkaXNwYXRjaH09dGhpcy5wcm9wc1xyXG5cdFx0Y29uc3Qge2NvbW1lbnR9PXRoaXMuc3RhdGVcclxuXHRcdGRpc3BhdGNoKEFDVElPTi5DUkVBVEUodHlwZSxfaWQsIGNvbW1lbnQpKVxyXG5cdFx0XHQudGhlbihhPT50aGlzLnNldFN0YXRlKHtjb21tZW50OlwiXCJ9KSlcclxuXHR9XHJcblxyXG5cdHBob3RvKCl7XHJcblx0XHRjb25zdCB7dHlwZSwgX2lkLGRpc3BhdGNofT10aGlzLnByb3BzXHJcblx0XHRjb25zdCB7Y29tbWVudH09dGhpcy5zdGF0ZVxyXG5cdFx0c2VsZWN0SW1hZ2VGaWxlKClcclxuXHRcdFx0LnRoZW4odXJsPT5GaWxlLnVwbG9hZCh1cmwpKVxyXG5cdFx0XHQudGhlbih1cmw9PmRpc3BhdGNoKEFDVElPTi5DUkVBVEUodHlwZSxfaWQsdXJsLHtjb250ZW50X3R5cGU6XCJwaG90b1wifSkpKVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihjb25uZWN0KHN0YXRlPT5zdGF0ZS5jb21tZW50KShDb21tZW50VUkpLHtcclxuXHRyZWR1Y2VyLFxyXG5cdElubGluZTogY29ubmVjdChzdGF0ZT0+c3RhdGUuY29tbWVudCkoSW5saW5lKVxyXG59KVxyXG4iXX0=