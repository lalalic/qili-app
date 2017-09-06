"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Inline = exports.CommentUI = exports.reducer = exports.ACTION = exports.DOMAIN = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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

var _pullToRefresh = require("pull-to-refresh2");

var _pullToRefresh2 = _interopRequireDefault(_pullToRefresh);

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
	FETCH_MORE: function FETCH_MORE(ok) {
		return function (dispatch, getState) {
			var state = getState();
			var _state$comment = state.comment,
			    type = _state$comment.type,
			    _id = _state$comment._id,
			    _state$comment$data = _state$comment.data;
			_state$comment$data = _state$comment$data === undefined ? [] : _state$comment$data;

			var _state$comment$data2 = _slicedToArray(_state$comment$data, 1),
			    first = _state$comment$data2[0];

			var query = { parent: _id };
			if (first) {
				query.createdAt = { $lt: first.createdAt };
			}

			_comment2.default.of(type).find(query, { sort: [["createdAt", "desc"]], limit: 20 }).fetch(function (data) {
				dispatch({ type: "@@" + DOMAIN + "/fetched_more", payload: { data: data.reverse() } });
				ok();
			});
		};
	},
	FETCH_REFRESH: function FETCH_REFRESH(ok) {
		return function (dispatch, getState) {
			var state = getState();
			var _state$comment2 = state.comment,
			    type = _state$comment2.type,
			    _id = _state$comment2._id,
			    _state$comment2$data = _state$comment2.data,
			    data = _state$comment2$data === undefined ? [] : _state$comment2$data;

			var last = data[data.length - 1];
			var query = { parent: _id };
			if (last) {
				query.createdAt = { $gt: last.createdAt };
			}

			_comment2.default.of(type).find(query).fetch(function (data) {
				dispatch({ type: "@@" + DOMAIN + "/fetched_refresh", payload: { data: data } });
				ok();
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
		case "@@" + DOMAIN + "/fetched_more":
			return _extends({}, state, { data: [].concat(_toConsumableArray(payload.data), _toConsumableArray(state.data)) });
		case "@@" + DOMAIN + "/fetched_refresh":
			return _extends({}, state, { data: [].concat(_toConsumableArray(state.data), _toConsumableArray(payload.data)) });
		case "@@" + DOMAIN + "/created":
			return _extends({}, state, { data: [].concat(_toConsumableArray(state.data), [payload]) });
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

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = CommentUI.__proto__ || Object.getPrototypeOf(CommentUI)).call.apply(_ref2, [this].concat(args))), _this), _this.state = { comment: "" }, _this.first = true, _temp), _possibleConstructorReturn(_this, _ret);
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
			if (this.end && this.first) {
				this.end.scrollIntoView({ behavior: "smooth" });
				this.first = false;
			}
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			this.props.dispatch({ type: "@@" + DOMAIN + "/CLEAR" });
		}
	}, {
		key: "componentDidUpdate",
		value: function componentDidUpdate(prevProps, prevState) {
			if (this.end && this.first) {
				this.end.scrollIntoView({ behavior: "smooth" });
				this.first = false;
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

			var elEnd = null;
			if (data.length && this.first) {
				elEnd = _react2.default.createElement("div", { ref: function ref(el) {
						return _this2.end = el;
					} });
			}

			return _react2.default.createElement(
				"div",
				{ className: "comment", style: { minHeight: height, backgroundColor: _colors.cyan50 } },
				_react2.default.createElement(
					_pullToRefresh2.default,
					{
						onRefresh: function onRefresh(ok) {
							return dispatch(ACTION.FETCH_MORE(ok));
						},
						onMore: function onMore(ok) {
							return dispatch(ACTION.FETCH_REFRESH(ok));
						}
					},
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
					_pullToRefresh2.default,
					{
						onRefresh: function onRefresh(ok) {
							return dispatch(ACTION.FETCH_MORE(ok));
						},
						onMore: function onMore(ok) {
							return dispatch(ACTION.FETCH_REFRESH(ok));
						}
					},
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1lbnQuanMiXSwibmFtZXMiOlsiRE9NQUlOIiwiQUNUSU9OIiwiRkVUQ0giLCJ0eXBlIiwiX2lkIiwib2YiLCJmaW5kIiwicGFyZW50Iiwic29ydCIsImxpbWl0IiwiZmV0Y2giLCJkaXNwYXRjaCIsInBheWxvYWQiLCJkYXRhIiwicmV2ZXJzZSIsIkZFVENIX01PUkUiLCJnZXRTdGF0ZSIsInN0YXRlIiwiY29tbWVudCIsImZpcnN0IiwicXVlcnkiLCJjcmVhdGVkQXQiLCIkbHQiLCJvayIsIkZFVENIX1JFRlJFU0giLCJsYXN0IiwibGVuZ3RoIiwiJGd0IiwiQ1JFQVRFIiwiaWQiLCJjb250ZW50IiwicHJvcHMiLCJ0cmltIiwiUHJvbWlzZSIsInJlamVjdCIsInVzZXIiLCJjdXJyZW50IiwidGh1bWJuYWlsIiwidXBzZXJ0IiwidGhlbiIsImEiLCJyZWR1Y2VyIiwic21hcnRGb3JtYXQiLCJkIiwibm93IiwiRGF0ZSIsInJlbGF0aXZlIiwiZm9ybWF0IiwiZ2V0RnVsbFllYXIiLCJDb21tZW50VUkiLCJwYXJhbXMiLCJlbmQiLCJzY3JvbGxJbnRvVmlldyIsImJlaGF2aW9yIiwicHJldlByb3BzIiwicHJldlN0YXRlIiwidGVtcGxhdGUiLCJoaW50Iiwic3lzdGVtIiwiaGVpZ2h0IiwiY29udGV4dCIsIm11aVRoZW1lIiwicGFnZSIsImNyZWF0ZSIsInNldFN0YXRlIiwic2F2ZSIsImFjdGlvbiIsImxhYmVsIiwiaWNvbiIsIm9uU2VsZWN0IiwicGhvdG8iLCJ1cGxvYWQiLCJ1cmwiLCJjb250ZW50X3R5cGUiLCJlbEVuZCIsImVsIiwibWluSGVpZ2h0IiwiYmFja2dyb3VuZENvbG9yIiwicmVkdWNlIiwiY29tbWVudHMiLCJrZXkiLCJnZXRUaW1lIiwidGltZSIsInB1c2giLCJjcmVhdGVFbGVtZW50Iiwia2V5Q29kZSIsImUiLCJ0YXJnZXQiLCJ2YWx1ZSIsInByZXZlbnREZWZhdWx0IiwiY29udGV4dFR5cGVzIiwib2JqZWN0IiwiZGVmYXVsdFByb3BzIiwic3lzdGVtVGh1bWJuYWlsIiwibmFtZSIsImxlZnQiLCJyaWdodCIsInRleHQiLCJpc093bmVyIiwiYXV0aG9yIiwiZm9udFNpemUiLCJ0aW1pbmciLCJwYWRkaW5nIiwiYm9yZGVyUmFkaXVzIiwid2lkdGgiLCJ2ZXJ0aWNhbEFsaWduIiwiSW5saW5lIiwiX25hbWUiLCJraW5kIiwibW9kZWwiLCJwcmV2IiwiZW1wdHlJY29uIiwiY29tbWVudGFibGUiLCJlbXB0eSIsIm1hcCIsImVkaXRvciIsIkVkaXRvciIsImJpbmQiLCJkaXNwbGF5IiwiT2JqZWN0IiwiYXNzaWduIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7QUFFQTs7OztBQUNBOztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFFQTs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztBQUVPLElBQU1BLDBCQUFPLFNBQWI7QUFDQSxJQUFNQywwQkFBTztBQUNoQkMsUUFBTyxlQUFDQyxJQUFELEVBQU1DLEdBQU47QUFBQSxTQUFZO0FBQUEsVUFBVSxrQkFBUUMsRUFBUixDQUFXRixJQUFYLEVBQWlCRyxJQUFqQixDQUFzQixFQUFDQyxRQUFPSCxHQUFSLEVBQXRCLEVBQW9DLEVBQUNJLE1BQUssQ0FBQyxDQUFDLFdBQUQsRUFBYSxNQUFiLENBQUQsQ0FBTixFQUE4QkMsT0FBTSxFQUFwQyxFQUFwQyxFQUNwQkMsS0FEb0IsQ0FDZDtBQUFBLFdBQU1DLFNBQVMsRUFBQ1IsYUFBVUgsTUFBVixhQUFELEVBQTRCWSxTQUFRLEVBQUNDLE1BQU1BLEtBQUtDLE9BQUwsRUFBUCxFQUFzQlgsVUFBdEIsRUFBMkJDLFFBQTNCLEVBQXBDLEVBQVQsQ0FBTjtBQUFBLElBRGMsQ0FBVjtBQUFBLEdBQVo7QUFBQSxFQURTO0FBR2xCVyxhQUFZO0FBQUEsU0FBSSxVQUFDSixR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O0FBQUEsUUFBT3ZHLE1BQU1DLE9BQWI7QUFBQSxDQUFSLEVBQThCK0IsU0FBOUIsQ0FBZCxFQUF1RDtBQUNyRVIsaUJBRHFFO0FBRXJFaUUsU0FBUSx5QkFBUTtBQUFBLFNBQU96RixNQUFNQyxPQUFiO0FBQUEsRUFBUixFQUE4QndGLE1BQTlCO0FBRjZELENBQXZELEMiLCJmaWxlIjoiY29tbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge0F2YXRhciwgTGlzdCwgTGlzdEl0ZW19IGZyb20gXCJtYXRlcmlhbC11aVwiXHJcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcclxuXHJcbmltcG9ydCBUZXh0RmllbGQgZnJvbSAnbWF0ZXJpYWwtdWkvVGV4dEZpZWxkJ1xyXG5pbXBvcnQge1Rvb2xiYXIsIFRvb2xiYXJHcm91cH0gZnJvbSAnbWF0ZXJpYWwtdWkvVG9vbGJhcidcclxuaW1wb3J0IEljb25CdXR0b24gZnJvbSAnbWF0ZXJpYWwtdWkvSWNvbkJ1dHRvbidcclxuXHJcbmltcG9ydCB7Y3lhbjUwIGFzIGJnfSBmcm9tIFwibWF0ZXJpYWwtdWkvc3R5bGVzL2NvbG9yc1wiXHJcbmltcG9ydCBJY29uQ2FtZXJhIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9pbWFnZS9waG90by1jYW1lcmEnXHJcbmltcG9ydCBJY29uU2F2ZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2NvbnRlbnQvc2F2ZVwiXHJcbmltcG9ydCBJY29uRW1wdHlDb21tZW50IGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZWRpdG9yL21vZGUtY29tbWVudFwiXHJcblxyXG5pbXBvcnQgUHVsbFRvUmVmcmVzaCBmcm9tIFwicHVsbC10by1yZWZyZXNoMlwiXHJcblxyXG5pbXBvcnQge3NlbGVjdCBhcyBzZWxlY3RJbWFnZUZpbGV9IGZyb20gXCIuL2ZpbGUtc2VsZWN0b3JcIlxyXG5cclxuaW1wb3J0IHtTZXJ2aWNlfSBmcm9tICcuLi9kYi9zZXJ2aWNlJ1xyXG5pbXBvcnQgQ29tbWFuZEJhciBmcm9tICcuL2NvbW1hbmQtYmFyJ1xyXG5pbXBvcnQgVXNlciBmcm9tICcuLi9kYi91c2VyJ1xyXG5pbXBvcnQgQ29tbWVudCBmcm9tICcuLi9kYi9jb21tZW50J1xyXG5pbXBvcnQgRmlsZSBmcm9tIFwiLi4vZGIvZmlsZVwiXHJcbmltcG9ydCBFbXB0eSBmcm9tIFwiLi9lbXB0eVwiXHJcblxyXG5leHBvcnQgY29uc3QgRE9NQUlOPVwiQ09NTUVOVFwiXHJcbmV4cG9ydCBjb25zdCBBQ1RJT049e1xyXG4gICAgRkVUQ0g6ICh0eXBlLF9pZCk9PmRpc3BhdGNoPT5Db21tZW50Lm9mKHR5cGUpLmZpbmQoe3BhcmVudDpfaWR9LCB7c29ydDpbW1wiY3JlYXRlZEF0XCIsXCJkZXNjXCJdXSwgbGltaXQ6MjB9KVxyXG4gICAgICAgICAgICAuZmV0Y2goZGF0YT0+ZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L2ZldGNoZWRgLHBheWxvYWQ6e2RhdGE6IGRhdGEucmV2ZXJzZSgpLHR5cGUsX2lkfX0pKVxyXG5cdCxGRVRDSF9NT1JFOiBvaz0+KGRpc3BhdGNoLGdldFN0YXRlKT0+e1xyXG5cdFx0Y29uc3Qgc3RhdGU9Z2V0U3RhdGUoKVxyXG5cdFx0Y29uc3Qge3R5cGUsX2lkLCBkYXRhOltmaXJzdF09W119PXN0YXRlLmNvbW1lbnRcclxuXHRcdGxldCBxdWVyeT17cGFyZW50Ol9pZH1cclxuXHRcdGlmKGZpcnN0KXtcclxuXHRcdFx0cXVlcnkuY3JlYXRlZEF0PXskbHQ6Zmlyc3QuY3JlYXRlZEF0fVxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRDb21tZW50Lm9mKHR5cGUpXHJcblx0XHRcdC5maW5kKHF1ZXJ5LCB7c29ydDpbW1wiY3JlYXRlZEF0XCIsXCJkZXNjXCJdXSwgbGltaXQ6MjB9KVxyXG5cdFx0XHQuZmV0Y2goZGF0YT0+e1xyXG5cdFx0XHRcdGRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS9mZXRjaGVkX21vcmVgLHBheWxvYWQ6e2RhdGE6IGRhdGEucmV2ZXJzZSgpfX0pXHJcblx0XHRcdFx0b2soKVxyXG5cdFx0XHR9KVxyXG5cdH1cclxuXHQsRkVUQ0hfUkVGUkVTSDogb2s9PihkaXNwYXRjaCxnZXRTdGF0ZSk9PntcclxuXHRcdGNvbnN0IHN0YXRlPWdldFN0YXRlKClcclxuXHRcdGNvbnN0IHt0eXBlLF9pZCwgZGF0YT1bXX09c3RhdGUuY29tbWVudFxyXG5cdFx0bGV0IGxhc3Q9ZGF0YVtkYXRhLmxlbmd0aC0xXVxyXG5cdFx0bGV0IHF1ZXJ5PXtwYXJlbnQ6X2lkfVxyXG5cdFx0aWYobGFzdCl7XHJcblx0XHRcdHF1ZXJ5LmNyZWF0ZWRBdD17JGd0Omxhc3QuY3JlYXRlZEF0fVxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRDb21tZW50Lm9mKHR5cGUpXHJcblx0XHRcdC5maW5kKHF1ZXJ5KVxyXG5cdFx0XHQuZmV0Y2goZGF0YT0+e1xyXG5cdFx0XHRcdGRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS9mZXRjaGVkX3JlZnJlc2hgLHBheWxvYWQ6e2RhdGF9fSlcclxuXHRcdFx0XHRvaygpXHJcblx0XHRcdH0pXHJcblx0fVxyXG4gICAgLENSRUFURTogKHR5cGUsaWQsY29udGVudCxwcm9wcz17fSk9PmRpc3BhdGNoPT57XHJcblx0XHRjb250ZW50PWNvbnRlbnQudHJpbSgpXHJcblx0XHRpZihjb250ZW50Lmxlbmd0aDwyKVxyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoKVxyXG5cclxuICAgICAgICBjb25zdCB1c2VyPVVzZXIuY3VycmVudFxyXG4gICAgICAgIGNvbnN0IGNvbW1lbnQ9e1xyXG4gICAgICAgICAgICAgICAgLi4ucHJvcHMsXHJcbiAgICAgICAgICAgICAgICB0eXBlLFxyXG4gICAgICAgICAgICAgICAgcGFyZW50OmlkLFxyXG4gICAgICAgICAgICAgICAgdGh1bWJuYWlsOnVzZXIudGh1bWJuYWlsLFxyXG4gICAgICAgICAgICAgICAgY29udGVudDpjb250ZW50XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICByZXR1cm4gQ29tbWVudC5vZih0eXBlKS51cHNlcnQoY29tbWVudClcclxuICAgICAgICAgICAgLnRoZW4oYT0+ZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L2NyZWF0ZWRgLHBheWxvYWQ6YX0pKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcmVkdWNlcj0oc3RhdGU9e30sIHt0eXBlLCBwYXlsb2FkfSk9PntcclxuICAgIHN3aXRjaCh0eXBlKXtcclxuICAgIGNhc2UgYEBAJHtET01BSU59L0NMRUFSYDpcclxuICAgICAgICByZXR1cm4ge31cclxuICAgIGNhc2UgYEBAJHtET01BSU59L2ZldGNoZWRgOlxyXG5cdFx0cmV0dXJuIHsuLi5zdGF0ZSwgLi4ucGF5bG9hZH1cclxuICAgIGNhc2UgYEBAJHtET01BSU59L2ZldGNoZWRfbW9yZWA6XHJcblx0XHRyZXR1cm4gey4uLnN0YXRlLCBkYXRhOiBbLi4ucGF5bG9hZC5kYXRhLCAuLi5zdGF0ZS5kYXRhXX1cclxuICAgIGNhc2UgYEBAJHtET01BSU59L2ZldGNoZWRfcmVmcmVzaGA6XHJcblx0XHRyZXR1cm4gey4uLnN0YXRlLCBkYXRhOiBbLi4uc3RhdGUuZGF0YSwgLi4ucGF5bG9hZC5kYXRhXX1cclxuICAgIGNhc2UgYEBAJHtET01BSU59L2NyZWF0ZWRgOlxyXG4gICAgICAgIHJldHVybiB7Li4uc3RhdGUsIGRhdGE6Wy4uLnN0YXRlLmRhdGEsIHBheWxvYWRdfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN0YXRlXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNtYXJ0Rm9ybWF0KGQpe1xyXG5cdGxldCBub3c9bmV3IERhdGUoKVxyXG5cdHN3aXRjaChkLnJlbGF0aXZlKG5vdykpe1xyXG5cdGNhc2UgMDpcclxuXHRcdHJldHVybiBkLmZvcm1hdChcIkhIOm1tXCIpXHJcblx0Y2FzZSAtMTpcclxuXHRcdHJldHVybiBkLmZvcm1hdChcIuaYqOWkqSBISDptbVwiKVxyXG5cdGRlZmF1bHQ6XHJcblx0XHRpZihub3cuZ2V0RnVsbFllYXIoKT09ZC5nZXRGdWxsWWVhcigpKVxyXG5cdFx0XHRyZXR1cm4gZC5mb3JtYXQoXCJNTeaciERE5pelIEhIOm1tXCIpXHJcblx0XHRlbHNlXHJcblx0XHRcdHJldHVybiBkLmZvcm1hdChcIllZWVnlubRNTeaciERE5pelIEhIOm1tXCIpXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ29tbWVudFVJIGV4dGVuZHMgQ29tcG9uZW50e1xyXG4gICAgc3RhdGU9e2NvbW1lbnQ6XCJcIn1cclxuXHRmaXJzdD10cnVlXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpe1xyXG4gICAgICAgIGNvbnN0IHtkaXNwYXRjaCxwYXJhbXM6e3R5cGUsX2lkfX09dGhpcy5wcm9wc1xyXG4gICAgICAgIGRpc3BhdGNoKEFDVElPTi5GRVRDSCh0eXBlLF9pZCkpXHJcblx0XHRpZih0aGlzLmVuZCAmJiB0aGlzLmZpcnN0KXtcclxuXHRcdFx0dGhpcy5lbmQuc2Nyb2xsSW50b1ZpZXcoeyBiZWhhdmlvcjogXCJzbW9vdGhcIiB9KVxyXG5cdFx0XHR0aGlzLmZpcnN0PWZhbHNlXHJcblx0XHR9XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpe1xyXG4gICAgICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L0NMRUFSYH0pXHJcbiAgICB9XHJcblx0Y29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKXtcclxuXHRcdGlmKHRoaXMuZW5kICYmIHRoaXMuZmlyc3Qpe1xyXG5cdFx0XHR0aGlzLmVuZC5zY3JvbGxJbnRvVmlldyh7IGJlaGF2aW9yOiBcInNtb290aFwiIH0pXHJcblx0XHRcdHRoaXMuZmlyc3Q9ZmFsc2VcclxuXHRcdH1cclxuXHR9XHJcbiAgICByZW5kZXIoKXtcclxuICAgICAgICBjb25zdCB7ZGF0YT1bXSx0ZW1wbGF0ZSxkaXNwYXRjaCxwYXJhbXM6e3R5cGUsX2lkfSxoaW50PVwi6K+05Lik5Y+lXCIsIHN5c3RlbX09dGhpcy5wcm9wc1xyXG5cdFx0Y29uc3Qge211aVRoZW1lOntwYWdlOiB7aGVpZ2h0fX19PXRoaXMuY29udGV4dFxyXG4gICAgICAgIGNvbnN0IHtjb21tZW50fT10aGlzLnN0YXRlXHJcblx0XHRjb25zdCBjcmVhdGU9KCk9PmRpc3BhdGNoKEFDVElPTi5DUkVBVEUodHlwZSxfaWQsIGNvbW1lbnQpKS50aGVuKGE9PnRoaXMuc2V0U3RhdGUoe2NvbW1lbnQ6XCJcIn0pKVxyXG4gICAgICAgIGxldCBzYXZlPXtcclxuICAgICAgICAgICAgYWN0aW9uOlwiU2F2ZVwiLFxyXG4gICAgICAgICAgICBsYWJlbDpcIuWPkeW4g1wiLFxyXG4gICAgICAgICAgICBpY29uOiA8SWNvblNhdmUvPixcclxuICAgICAgICAgICAgb25TZWxlY3Q6Y3JlYXRlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBwaG90bz17XHJcbiAgICAgICAgICAgIGFjdGlvbjpcInBob3RvXCIsXHJcbiAgICAgICAgICAgIGxhYmVsOlwi54Wn54mHXCIsXHJcbiAgICAgICAgICAgIGljb246IDxJY29uQ2FtZXJhLz4sXHJcbiAgICAgICAgICAgIG9uU2VsZWN0OmU9PnNlbGVjdEltYWdlRmlsZSgpXHJcbiAgICAgICAgICAgICAgICAudGhlbih1cmw9PkZpbGUudXBsb2FkKHVybCkpXHJcbiAgICAgICAgICAgICAgICAudGhlbih1cmw9PmRpc3BhdGNoKEFDVElPTi5DUkVBVEUodHlwZSxfaWQsdXJsLHtjb250ZW50X3R5cGU6XCJwaG90b1wifSkpKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGFjdGlvbj1waG90b1xyXG5cclxuICAgICAgICBpZihjb21tZW50LnRyaW0oKSlcclxuICAgICAgICAgICAgYWN0aW9uPXNhdmVcclxuXHRcdFxyXG5cdFx0bGV0IGVsRW5kPW51bGxcclxuXHRcdGlmKGRhdGEubGVuZ3RoICYmIHRoaXMuZmlyc3Qpe1xyXG5cdFx0XHRlbEVuZD0oPGRpdiByZWY9e2VsPT50aGlzLmVuZD1lbH0vPilcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbW1lbnRcIiBzdHlsZT17e21pbkhlaWdodDpoZWlnaHQsIGJhY2tncm91bmRDb2xvcjpiZ319PlxyXG4gICAgICAgICAgICAgICAgPFB1bGxUb1JlZnJlc2hcclxuXHRcdFx0XHRcdG9uUmVmcmVzaD17b2s9PmRpc3BhdGNoKEFDVElPTi5GRVRDSF9NT1JFKG9rKSl9XHJcblx0XHRcdFx0XHRvbk1vcmU9e29rPT5kaXNwYXRjaChBQ1RJT04uRkVUQ0hfUkVGUkVTSChvaykpfVxyXG5cdFx0XHRcdFx0PlxyXG4gICAgICAgICAgICAgICAgICAgIHtkYXRhLnJlZHVjZSgoc3RhdGUsYSk9PntcclxuXHRcdFx0XHRcdFx0XHRsZXQge2NvbW1lbnRzLGxhc3R9PXN0YXRlXHJcblx0XHRcdFx0XHRcdFx0bGV0IHByb3BzPXtjb21tZW50OmEsa2V5OmEuX2lkLCBzeXN0ZW19XHJcblx0XHRcdFx0XHRcdFx0aWYoIWxhc3QgfHwgKGEuY3JlYXRlZEF0LmdldFRpbWUoKS1sYXN0LmdldFRpbWUoKSk+MTAwMCo2MCl7XHJcblx0XHRcdFx0XHRcdFx0XHRwcm9wcy50aW1lPWEuY3JlYXRlZEF0XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdGNvbW1lbnRzLnB1c2goUmVhY3QuY3JlYXRlRWxlbWVudCh0ZW1wbGF0ZSwgcHJvcHMpKVxyXG5cdFx0XHRcdFx0XHRcdHN0YXRlLmxhc3Q9YS5jcmVhdGVkQXRcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gc3RhdGVcclxuXHRcdFx0XHRcdFx0fSx7Y29tbWVudHM6W119KS5jb21tZW50c1x0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0fVxyXG4gICAgICAgICAgICAgICAgPC9QdWxsVG9SZWZyZXNoPlxyXG5cdFx0XHRcdFxyXG5cclxuICAgICAgICAgICAgICAgIDxDb21tYW5kQmFyXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9vdGJhciBjZW50ZXJpbnB1dFwiXHJcbiAgICAgICAgICAgICAgICAgICAgcHJpbWFyeT1cIlNhdmVcIlxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zPXtbXHJcblx0XHRcdFx0XHRcdFx0e2FjdGlvbjpcIkJhY2tcIn0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoPHRleHRhcmVhIHBsYWNlaG9sZGVyPXtoaW50fSB2YWx1ZT17Y29tbWVudH1cclxuXHRcdFx0XHRcdFx0XHRcdG9uS2V5RG93bj17KHtrZXlDb2RlfSk9PmtleUNvZGU9PTEzICYmIGNyZWF0ZSgpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtlPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2NvbW1lbnQ6ZS50YXJnZXQudmFsdWV9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fS8+KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdfVxyXG4gICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICBcdFx0PC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcclxuXHRcdG11aVRoZW1lOiBQcm9wVHlwZXMub2JqZWN0XHJcblx0fVxyXG5cclxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xyXG4gICAgICAgIHN5c3RlbVRodW1ibmFpbDpudWxsLFxyXG4gICAgICAgIHRlbXBsYXRlOiAoe2NvbW1lbnQsIHN5c3RlbT17fSwgdGltZX0pPT57XHJcblx0XHRcdGxldCBuYW1lLCBsZWZ0LCByaWdodCwgdGV4dFxyXG5cdFx0XHRjb25zdCBpc093bmVyPWNvbW1lbnQuYXV0aG9yLl9pZD09VXNlci5jdXJyZW50Ll9pZFxyXG4gICAgICAgICAgICBpZihjb21tZW50LnN5c3RlbSl7XHJcbiAgICAgICAgICAgICAgICBuYW1lPSg8c3BhbiBzdHlsZT17e2ZvbnRTaXplOid4LXNtYWxsJ319PntzeXN0ZW0ubmFtZX08L3NwYW4+KVxyXG5cdFx0XHRcdGxlZnQ9KDxBdmF0YXIgc3JjPXtzeXN0ZW0udGh1bWJuYWlsfS8+KVxyXG5cdFx0XHRcdHJpZ2h0PSg8c3Bhbi8+KVxyXG4gICAgICAgICAgICB9ZWxzZSBpZihpc093bmVyKXtcclxuXHRcdFx0XHRsZWZ0PSg8c3Bhbi8+KVxyXG5cdFx0XHRcdHJpZ2h0PSg8QXZhdGFyIHNyYz17VXNlci5jdXJyZW50LnRodW1ibmFpbH0vPilcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0bmFtZT0oPHNwYW4gc3R5bGU9e3tmb250U2l6ZToneC1zbWFsbCd9fT57Y29tbWVudC5hdXRob3IubmFtZX08L3NwYW4+KVxyXG5cdFx0XHRcdGxlZnQ9KDxBdmF0YXIgc3JjPXtjb21tZW50LnRodW1ibmFpbH0vPilcclxuXHRcdFx0XHRyaWdodD0oPHNwYW4vPilcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0bGV0IHRpbWluZz1udWxsXHJcblx0XHRcdGlmKHRpbWUpe1xyXG5cdFx0XHRcdHRpbWluZz0oXHJcblx0XHRcdFx0XHQ8Y2VudGVyPlxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBzdHlsZT17e2JhY2tncm91bmRDb2xvcjpcImxpZ2h0Z3JheVwiLGZvbnRTaXplOid4LXNtYWxsJyxwYWRkaW5nOjIsYm9yZGVyUmFkaXVzOjJ9fT5cclxuXHRcdFx0XHRcdFx0XHR7c21hcnRGb3JtYXQodGltZSl9XHJcblx0XHRcdFx0XHRcdDwvc3Bhbj5cclxuXHRcdFx0XHRcdDwvY2VudGVyPilcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIChcclxuXHRcdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdFx0e3RpbWluZ31cclxuXHRcdFx0XHRcdDxkaXYga2V5PXtjb21tZW50Ll9pZH0gY2xhc3NOYW1lPVwiYWNvbW1lbnRcIiBzdHlsZT17e3BhZGRpbmc6NX19PlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IHN0eWxlPXt7d2lkdGg6NDAsbWluSGVpZ2h0OjQwLHZlcnRpY2FsQWxpZ246XCJ0b3BcIn19PntsZWZ0fTwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IHN0eWxlPXt7cGFkZGluZzo1LHZlcnRpY2FsQWxpZ246XCJ0b3BcIn19PlxyXG5cdFx0XHRcdFx0XHRcdDxkaXY+e25hbWV9PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0PHAgY2xhc3NOYW1lPXtgY29udGVudCAkeyFjb21tZW50LnN5c3RlbSYmaXNPd25lcj9cIm93bmVyXCI6XCJcIn1gfT5cclxuXHRcdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0XHQoKGNvbnRlbnQsdHlwZSk9PntcclxuXHRcdFx0XHRcdFx0XHRcdFx0c3dpdGNoKHR5cGUpe1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRjYXNlIFwicGhvdG9cIjpcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gPGltZyBzcmM9e2NvbnRlbnR9IHN0eWxlPXt7d2lkdGg6MTUwfX0vPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiA8c3Bhbj57Y29udGVudH08L3NwYW4+XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdH0pKGNvbW1lbnQuY29udGVudCxjb21tZW50LmNvbnRlbnRfdHlwZSlcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0PC9wPlxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PGRpdiBzdHlsZT17e3dpZHRoOjQwLG1pbkhlaWdodDo0MCx2ZXJ0aWNhbEFsaWduOlwidG9wXCJ9fT57cmlnaHR9PC9kaXY+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0KVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIElubGluZSBleHRlbmRzIENvbXBvbmVudHtcclxuXHRjb21wb25lbnREaWRNb3VudCgpe1xyXG4gICAgICAgIGNvbnN0IHtkaXNwYXRjaCxraW5kOntfbmFtZX0sbW9kZWw6e19pZH19PXRoaXMucHJvcHNcclxuICAgICAgICBkaXNwYXRjaChBQ1RJT04uRkVUQ0goX25hbWUsX2lkKSlcclxuXHRcdHRoaXMuZW5kLnNjcm9sbEludG9WaWV3KHsgYmVoYXZpb3I6IFwic21vb3RoXCIgfSk7XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpe1xyXG4gICAgICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L0NMRUFSYH0pXHJcbiAgICB9XHJcblx0XHJcblx0Y29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKXtcclxuXHRcdGNvbnN0IHtwcmV2PVt7fV19PXByZXZQcm9wc1xyXG5cdFx0Y29uc3Qge2RhdGE9W3t9XX09dGhpcy5wcm9wc1xyXG5cdFx0aWYocHJldlswXS5faWQhPT1kYXRhWzBdLl9pZCl7XHJcblx0XHRcdHRoaXMuZW5kLnNjcm9sbEludG9WaWV3KHsgYmVoYXZpb3I6IFwic21vb3RoXCIgfSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge2RhdGE9W10sdGVtcGxhdGUsIGVtcHR5SWNvbiwgXHJcblx0XHRcdGRpc3BhdGNoLGtpbmQ6e19uYW1lfSxtb2RlbDp7X2lkfSxcclxuXHRcdFx0Y29tbWVudGFibGU9dHJ1ZSxcclxuXHRcdFx0aGludD1cIuivtOS4pOWPpVwiLCBlbXB0eX09dGhpcy5wcm9wc1xyXG5cclxuXHRcdGxldCBjb250ZW50PW51bGxcclxuXHRcdGlmKGRhdGEubGVuZ3RoKXtcclxuXHRcdFx0Y29udGVudD0oXHJcblx0XHRcdFx0PFB1bGxUb1JlZnJlc2hcclxuXHRcdFx0XHRcdG9uUmVmcmVzaD17b2s9PmRpc3BhdGNoKEFDVElPTi5GRVRDSF9NT1JFKG9rKSl9XHJcblx0XHRcdFx0XHRvbk1vcmU9e29rPT5kaXNwYXRjaChBQ1RJT04uRkVUQ0hfUkVGUkVTSChvaykpfVxyXG5cdFx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0e2RhdGEubWFwKGE9PlJlYWN0LmNyZWF0ZUVsZW1lbnQodGVtcGxhdGUsIHtjb21tZW50OmEsa2V5OmEuX2lkfSkpfVxyXG5cdFx0XHRcdDwvUHVsbFRvUmVmcmVzaD5cclxuXHRcdFx0KVxyXG5cdFx0fWVsc2V7XHJcblx0XHRcdGNvbnRlbnQ9PEVtcHR5IHRleHQ9e2VtcHR5fHxcIuW9k+WJjei/mOayoeacieivhOiuuuWTplwifSBpY29uPXtlbXB0eUljb259Lz5cclxuXHRcdH1cclxuXHRcdGxldCBlZGl0b3I9bnVsbFxyXG5cdFx0aWYoY29tbWVudGFibGUpXHJcblx0XHRcdGVkaXRvcj0oPEVkaXRvciB0eXBlPXtfbmFtZX0gX2lkPXtfaWR9IGRpc3BhdGNoPXtkaXNwYXRjaH0gaGludD17aGludH0vPilcclxuXHRcdHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tbWVudCBpbmxpbmVcIj5cclxuXHRcdFx0XHR7ZWRpdG9yfVxyXG5cdFx0XHRcdHtjb250ZW50fVxyXG5cdFx0XHRcdDxkaXYgcmVmPXtlbD0+dGhpcy5lbmQ9ZWx9Lz5cclxuICAgIFx0XHQ8L2Rpdj5cclxuICAgICAgICApXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtcclxuXHRcdHRlbXBsYXRlOkNvbW1lbnRVSS5kZWZhdWx0UHJvcHMudGVtcGxhdGUsXHJcblx0XHRlbXB0eUljb246PEljb25FbXB0eUNvbW1lbnQvPlxyXG5cdH1cclxufVxyXG5cclxuXHJcbmNsYXNzIEVkaXRvciBleHRlbmRzIENvbXBvbmVudHtcclxuXHRzdGF0ZT17XHJcblx0XHRjb21tZW50OlwiXCJcclxuXHR9XHJcblx0cmVuZGVyKCl7XHJcblx0XHRjb25zdCB7Y29tbWVudH09dGhpcy5zdGF0ZVxyXG4gICAgICAgIGNvbnN0IHtoaW50fT10aGlzLnByb3BzXHJcblx0XHRsZXQgYWN0aW9uPW51bGxcclxuXHRcdGlmKGNvbW1lbnQpe1xyXG5cdFx0XHRhY3Rpb249PEljb25CdXR0b24gb25Ub3VjaFRhcD17dGhpcy5zYXZlLmJpbmQodGhpcyl9PjxJY29uU2F2ZS8+PC9JY29uQnV0dG9uPlxyXG5cdFx0fWVsc2V7XHJcblx0XHRcdGFjdGlvbj08SWNvbkJ1dHRvbiBvblRvdWNoVGFwPXt0aGlzLnBob3RvLmJpbmQodGhpcyl9PjxJY29uQ2FtZXJhLz48L0ljb25CdXR0b24+XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8VG9vbGJhciBub0d1dHRlcj17dHJ1ZX0gY2xhc3NOYW1lPVwiZ3JpZFwiXHJcblx0XHRcdFx0c3R5bGU9e3tiYWNrZ3JvdW5kQ29sb3I6XCJ0cmFuc3BhcmVudFwifX0+XHJcblx0XHRcdFx0PFRvb2xiYXJHcm91cCBzdHlsZT17e2Rpc3BsYXk6XCJ0YWJsZS1jZWxsXCIsd2lkdGg6XCIxMDAlXCJ9fT5cclxuXHRcdFx0XHRcdDxUZXh0RmllbGQgdmFsdWU9e2NvbW1lbnR9XHJcblx0XHRcdFx0XHRcdG9uQ2hhbmdlPXsoZSxjb21tZW50KT0+dGhpcy5zZXRTdGF0ZSh7Y29tbWVudH0pfVxyXG5cdFx0XHRcdFx0XHRvbktleURvd249eyh7a2V5Q29kZX0pPT5rZXlDb2RlPT0xMyAmJiB0aGlzLnNhdmUoKX1cclxuXHRcdFx0XHRcdFx0aGludFRleHQ9e2hpbnR9XHJcblx0XHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX0vPlxyXG5cdFx0XHRcdDwvVG9vbGJhckdyb3VwPlxyXG5cdFx0XHRcdDxUb29sYmFyR3JvdXAgc3R5bGU9e3t3aWR0aDo0MH19PlxyXG5cdFx0XHRcdFx0e2FjdGlvbn1cclxuXHRcdFx0XHQ8L1Rvb2xiYXJHcm91cD5cclxuXHRcdFx0PC9Ub29sYmFyPlxyXG5cdFx0KVxyXG5cdH1cclxuXHJcblx0c2F2ZSgpe1xyXG5cdFx0Y29uc3Qge3R5cGUsIF9pZCxkaXNwYXRjaH09dGhpcy5wcm9wc1xyXG5cdFx0Y29uc3Qge2NvbW1lbnR9PXRoaXMuc3RhdGVcclxuXHRcdGRpc3BhdGNoKEFDVElPTi5DUkVBVEUodHlwZSxfaWQsIGNvbW1lbnQpKVxyXG5cdFx0XHQudGhlbihhPT50aGlzLnNldFN0YXRlKHtjb21tZW50OlwiXCJ9KSlcclxuXHR9XHJcblxyXG5cdHBob3RvKCl7XHJcblx0XHRjb25zdCB7dHlwZSwgX2lkLGRpc3BhdGNofT10aGlzLnByb3BzXHJcblx0XHRjb25zdCB7Y29tbWVudH09dGhpcy5zdGF0ZVxyXG5cdFx0c2VsZWN0SW1hZ2VGaWxlKClcclxuXHRcdFx0LnRoZW4odXJsPT5GaWxlLnVwbG9hZCh1cmwpKVxyXG5cdFx0XHQudGhlbih1cmw9PmRpc3BhdGNoKEFDVElPTi5DUkVBVEUodHlwZSxfaWQsdXJsLHtjb250ZW50X3R5cGU6XCJwaG90b1wifSkpKVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihjb25uZWN0KHN0YXRlPT5zdGF0ZS5jb21tZW50KShDb21tZW50VUkpLHtcclxuXHRyZWR1Y2VyLFxyXG5cdElubGluZTogY29ubmVjdChzdGF0ZT0+c3RhdGUuY29tbWVudCkoSW5saW5lKVxyXG59KVxyXG4iXX0=