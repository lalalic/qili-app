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
			this.end.scrollIntoView({ behavior: "smooth" });
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
			this.end.scrollIntoView({ behavior: "smooth" });
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			this.props.dispatch({ type: "@@" + DOMAIN + "/CLEAR" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1lbnQuanMiXSwibmFtZXMiOlsiRE9NQUlOIiwiQUNUSU9OIiwiRkVUQ0giLCJ0eXBlIiwiX2lkIiwib2YiLCJmaW5kIiwicGFyZW50Iiwic29ydCIsImxpbWl0IiwiZmV0Y2giLCJkaXNwYXRjaCIsInBheWxvYWQiLCJkYXRhIiwicmV2ZXJzZSIsIkNSRUFURSIsImlkIiwiY29udGVudCIsInByb3BzIiwidHJpbSIsImxlbmd0aCIsIlByb21pc2UiLCJyZWplY3QiLCJ1c2VyIiwiY3VycmVudCIsImNvbW1lbnQiLCJ0aHVtYm5haWwiLCJ1cHNlcnQiLCJ0aGVuIiwiYSIsInJlZHVjZXIiLCJzdGF0ZSIsIkNvbW1lbnRVSSIsInBhcmFtcyIsImVuZCIsInNjcm9sbEludG9WaWV3IiwiYmVoYXZpb3IiLCJ0ZW1wbGF0ZSIsImhpbnQiLCJzeXN0ZW0iLCJoZWlnaHQiLCJjb250ZXh0IiwibXVpVGhlbWUiLCJwYWdlIiwiY3JlYXRlIiwic2V0U3RhdGUiLCJzYXZlIiwiYWN0aW9uIiwibGFiZWwiLCJpY29uIiwib25TZWxlY3QiLCJwaG90byIsInVwbG9hZCIsInVybCIsImNvbnRlbnRfdHlwZSIsIm1pbkhlaWdodCIsImJhY2tncm91bmRDb2xvciIsIm1hcCIsImNyZWF0ZUVsZW1lbnQiLCJrZXkiLCJlbCIsImtleUNvZGUiLCJlIiwidGFyZ2V0IiwidmFsdWUiLCJwcmV2ZW50RGVmYXVsdCIsImNvbnRleHRUeXBlcyIsIm9iamVjdCIsImRlZmF1bHRQcm9wcyIsInN5c3RlbVRodW1ibmFpbCIsIm5hbWUiLCJsZWZ0IiwicmlnaHQiLCJ0ZXh0IiwiaXNPd25lciIsImF1dGhvciIsImZvbnRTaXplIiwicGFkZGluZyIsIndpZHRoIiwidmVydGljYWxBbGlnbiIsIklubGluZSIsIl9uYW1lIiwia2luZCIsIm1vZGVsIiwiZW1wdHlJY29uIiwiY29tbWVudGFibGUiLCJlbXB0eSIsImVkaXRvciIsIkVkaXRvciIsImJp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QUFPN0QsTUFBTU4sT0FBYjtBQUFBLENBQVIsRUFBOEJPLFNBQTlCLENBQWQsRUFBdUQ7QUFDckVGLGlCQURxRTtBQUVyRWtELFNBQVEseUJBQVE7QUFBQSxTQUFPakQsTUFBTU4sT0FBYjtBQUFBLEVBQVIsRUFBOEJ1RCxNQUE5QjtBQUY2RCxDQUF2RCxDIiwiZmlsZSI6ImNvbW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtBdmF0YXIsIExpc3QsIExpc3RJdGVtfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxyXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXHJcblxyXG5pbXBvcnQgVGV4dEZpZWxkIGZyb20gJ21hdGVyaWFsLXVpL1RleHRGaWVsZCdcclxuaW1wb3J0IHtUb29sYmFyLCBUb29sYmFyR3JvdXB9IGZyb20gJ21hdGVyaWFsLXVpL1Rvb2xiYXInXHJcbmltcG9ydCBJY29uQnV0dG9uIGZyb20gJ21hdGVyaWFsLXVpL0ljb25CdXR0b24nXHJcblxyXG5pbXBvcnQge2N5YW41MCBhcyBiZ30gZnJvbSBcIm1hdGVyaWFsLXVpL3N0eWxlcy9jb2xvcnNcIlxyXG5pbXBvcnQgSWNvbkNhbWVyYSBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvaW1hZ2UvcGhvdG8tY2FtZXJhJ1xyXG5pbXBvcnQgSWNvblNhdmUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9jb250ZW50L3NhdmVcIlxyXG5pbXBvcnQgSWNvbkVtcHR5Q29tbWVudCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2VkaXRvci9tb2RlLWNvbW1lbnRcIlxyXG5cclxuaW1wb3J0IHtzZWxlY3QgYXMgc2VsZWN0SW1hZ2VGaWxlfSBmcm9tIFwiLi9maWxlLXNlbGVjdG9yXCJcclxuXHJcbmltcG9ydCB7U2VydmljZX0gZnJvbSAnLi4vZGIvc2VydmljZSdcclxuaW1wb3J0IENvbW1hbmRCYXIgZnJvbSAnLi9jb21tYW5kLWJhcidcclxuaW1wb3J0IFVzZXIgZnJvbSAnLi4vZGIvdXNlcidcclxuaW1wb3J0IENvbW1lbnQgZnJvbSAnLi4vZGIvY29tbWVudCdcclxuaW1wb3J0IEZpbGUgZnJvbSBcIi4uL2RiL2ZpbGVcIlxyXG5pbXBvcnQgRW1wdHkgZnJvbSBcIi4vZW1wdHlcIlxyXG5cclxuZXhwb3J0IGNvbnN0IERPTUFJTj1cIkNPTU1FTlRcIlxyXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcclxuICAgIEZFVENIOiAodHlwZSxfaWQpPT5kaXNwYXRjaD0+Q29tbWVudC5vZih0eXBlKS5maW5kKHtwYXJlbnQ6X2lkfSwge3NvcnQ6W1tcImNyZWF0ZWRBdFwiLFwiZGVzY1wiXV0sIGxpbWl0OjIwfSlcclxuICAgICAgICAgICAgLmZldGNoKGRhdGE9PmRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS9mZXRjaGVkYCxwYXlsb2FkOntkYXRhOiBkYXRhLnJldmVyc2UoKSx0eXBlLF9pZH19KSlcclxuXHJcbiAgICAsQ1JFQVRFOiAodHlwZSxpZCxjb250ZW50LHByb3BzPXt9KT0+ZGlzcGF0Y2g9PntcclxuXHRcdGNvbnRlbnQ9Y29udGVudC50cmltKClcclxuXHRcdGlmKGNvbnRlbnQubGVuZ3RoPDIpXHJcblx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdCgpXHJcblxyXG4gICAgICAgIGNvbnN0IHVzZXI9VXNlci5jdXJyZW50XHJcbiAgICAgICAgY29uc3QgY29tbWVudD17XHJcbiAgICAgICAgICAgICAgICAuLi5wcm9wcyxcclxuICAgICAgICAgICAgICAgIHR5cGUsXHJcbiAgICAgICAgICAgICAgICBwYXJlbnQ6aWQsXHJcbiAgICAgICAgICAgICAgICB0aHVtYm5haWw6dXNlci50aHVtYm5haWwsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50OmNvbnRlbnRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBDb21tZW50Lm9mKHR5cGUpLnVwc2VydChjb21tZW50KVxyXG4gICAgICAgICAgICAudGhlbihhPT5kaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vY3JlYXRlZGAscGF5bG9hZDphfSkpXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCByZWR1Y2VyPShzdGF0ZT17fSwge3R5cGUsIHBheWxvYWR9KT0+e1xyXG4gICAgc3dpdGNoKHR5cGUpe1xyXG4gICAgY2FzZSBgQEAke0RPTUFJTn0vQ0xFQVJgOlxyXG4gICAgICAgIHJldHVybiB7fVxyXG4gICAgY2FzZSBgQEAke0RPTUFJTn0vZmV0Y2hlZGA6XHJcbiAgICAgICAgcmV0dXJuIHsuLi5zdGF0ZSwgLi4ucGF5bG9hZH1cclxuICAgIGNhc2UgYEBAJHtET01BSU59L2NyZWF0ZWRgOlxyXG4gICAgICAgIHJldHVybiB7Li4uc3RhdGUsIGRhdGE6Wy4uLihzdGF0ZS5kYXRhfHxbXSksIHBheWxvYWRdfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN0YXRlXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDb21tZW50VUkgZXh0ZW5kcyBDb21wb25lbnR7XHJcbiAgICBzdGF0ZT17Y29tbWVudDpcIlwifVxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKXtcclxuICAgICAgICBjb25zdCB7ZGlzcGF0Y2gscGFyYW1zOnt0eXBlLF9pZH19PXRoaXMucHJvcHNcclxuICAgICAgICBkaXNwYXRjaChBQ1RJT04uRkVUQ0godHlwZSxfaWQpKVxyXG5cdFx0dGhpcy5lbmQuc2Nyb2xsSW50b1ZpZXcoeyBiZWhhdmlvcjogXCJzbW9vdGhcIiB9KTtcclxuICAgIH1cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5kaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vQ0xFQVJgfSlcclxuICAgIH1cclxuICAgIHJlbmRlcigpe1xyXG4gICAgICAgIGNvbnN0IHtkYXRhPVtdLHRlbXBsYXRlLGRpc3BhdGNoLHBhcmFtczp7dHlwZSxfaWR9LGhpbnQ9XCLor7TkuKTlj6VcIiwgc3lzdGVtfT10aGlzLnByb3BzXHJcblx0XHRjb25zdCB7bXVpVGhlbWU6e3BhZ2U6IHtoZWlnaHR9fX09dGhpcy5jb250ZXh0XHJcbiAgICAgICAgY29uc3Qge2NvbW1lbnR9PXRoaXMuc3RhdGVcclxuXHRcdGNvbnN0IGNyZWF0ZT0oKT0+ZGlzcGF0Y2goQUNUSU9OLkNSRUFURSh0eXBlLF9pZCwgY29tbWVudCkpLnRoZW4oYT0+dGhpcy5zZXRTdGF0ZSh7Y29tbWVudDpcIlwifSkpXHJcbiAgICAgICAgbGV0IHNhdmU9e1xyXG4gICAgICAgICAgICBhY3Rpb246XCJTYXZlXCIsXHJcbiAgICAgICAgICAgIGxhYmVsOlwi5Y+R5biDXCIsXHJcbiAgICAgICAgICAgIGljb246IDxJY29uU2F2ZS8+LFxyXG4gICAgICAgICAgICBvblNlbGVjdDpjcmVhdGVcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHBob3RvPXtcclxuICAgICAgICAgICAgYWN0aW9uOlwicGhvdG9cIixcclxuICAgICAgICAgICAgbGFiZWw6XCLnhafniYdcIixcclxuICAgICAgICAgICAgaWNvbjogPEljb25DYW1lcmEvPixcclxuICAgICAgICAgICAgb25TZWxlY3Q6ZT0+c2VsZWN0SW1hZ2VGaWxlKClcclxuICAgICAgICAgICAgICAgIC50aGVuKHVybD0+RmlsZS51cGxvYWQodXJsKSlcclxuICAgICAgICAgICAgICAgIC50aGVuKHVybD0+ZGlzcGF0Y2goQUNUSU9OLkNSRUFURSh0eXBlLF9pZCx1cmwse2NvbnRlbnRfdHlwZTpcInBob3RvXCJ9KSkpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYWN0aW9uPXBob3RvXHJcblxyXG4gICAgICAgIGlmKGNvbW1lbnQudHJpbSgpKVxyXG4gICAgICAgICAgICBhY3Rpb249c2F2ZVxyXG5cclxuXHRcdHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tbWVudFwiIHN0eWxlPXt7bWluSGVpZ2h0OmhlaWdodCwgYmFja2dyb3VuZENvbG9yOmJnfX0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIHtkYXRhLm1hcChhPT5SZWFjdC5jcmVhdGVFbGVtZW50KHRlbXBsYXRlLCB7Y29tbWVudDphLGtleTphLl9pZCwgc3lzdGVtfSkpfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblx0XHRcdFx0PGRpdiByZWY9e2VsPT50aGlzLmVuZD1lbH0vPlxyXG5cclxuICAgICAgICAgICAgICAgIDxDb21tYW5kQmFyXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9vdGJhciBjZW50ZXJpbnB1dFwiXHJcbiAgICAgICAgICAgICAgICAgICAgcHJpbWFyeT1cIlNhdmVcIlxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zPXtbXHJcblx0XHRcdFx0XHRcdFx0e2FjdGlvbjpcIkJhY2tcIn0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoPHRleHRhcmVhIHBsYWNlaG9sZGVyPXtoaW50fSB2YWx1ZT17Y29tbWVudH1cclxuXHRcdFx0XHRcdFx0XHRcdG9uS2V5RG93bj17KHtrZXlDb2RlfSk9PmtleUNvZGU9PTEzICYmIGNyZWF0ZSgpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtlPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2NvbW1lbnQ6ZS50YXJnZXQudmFsdWV9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fS8+KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdfVxyXG4gICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICBcdFx0PC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcclxuXHRcdG11aVRoZW1lOiBQcm9wVHlwZXMub2JqZWN0XHJcblx0fVxyXG5cclxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xyXG4gICAgICAgIHN5c3RlbVRodW1ibmFpbDpudWxsLFxyXG4gICAgICAgIHRlbXBsYXRlOiAoe2NvbW1lbnQsIHN5c3RlbT17fX0pPT57XHJcblx0XHRcdGxldCBuYW1lLCBsZWZ0LCByaWdodCwgdGV4dFxyXG5cdFx0XHRjb25zdCBpc093bmVyPWNvbW1lbnQuYXV0aG9yLl9pZD09VXNlci5jdXJyZW50Ll9pZFxyXG4gICAgICAgICAgICBpZihjb21tZW50LnN5c3RlbSl7XHJcbiAgICAgICAgICAgICAgICBuYW1lPSg8c3BhbiBzdHlsZT17e2ZvbnRTaXplOid4LXNtYWxsJ319PntzeXN0ZW0ubmFtZX08L3NwYW4+KVxyXG5cdFx0XHRcdGxlZnQ9KDxBdmF0YXIgc3JjPXtzeXN0ZW0udGh1bWJuYWlsfS8+KVxyXG5cdFx0XHRcdHJpZ2h0PSg8c3Bhbi8+KVxyXG4gICAgICAgICAgICB9ZWxzZSBpZihpc093bmVyKXtcclxuXHRcdFx0XHRsZWZ0PSg8c3Bhbi8+KVxyXG5cdFx0XHRcdHJpZ2h0PSg8QXZhdGFyIHNyYz17VXNlci5jdXJyZW50LnRodW1ibmFpbH0vPilcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0bmFtZT0oPHNwYW4gc3R5bGU9e3tmb250U2l6ZToneC1zbWFsbCd9fT57Y29tbWVudC5hdXRob3IubmFtZX08L3NwYW4+KVxyXG5cdFx0XHRcdGxlZnQ9KDxBdmF0YXIgc3JjPXtjb21tZW50LnRodW1ibmFpbH0vPilcclxuXHRcdFx0XHRyaWdodD0oPHNwYW4vPilcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIChcclxuXHRcdFx0XHQ8ZGl2IGtleT17Y29tbWVudC5faWR9IGNsYXNzTmFtZT1cImFjb21tZW50XCIgc3R5bGU9e3twYWRkaW5nOjV9fT5cclxuXHRcdFx0XHRcdDxkaXYgc3R5bGU9e3t3aWR0aDo0MCxtaW5IZWlnaHQ6NDAsdmVydGljYWxBbGlnbjpcInRvcFwifX0+e2xlZnR9PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IHN0eWxlPXt7cGFkZGluZzo1LHZlcnRpY2FsQWxpZ246XCJ0b3BcIn19PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PntuYW1lfTwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8cCBjbGFzc05hbWU9e2Bjb250ZW50ICR7IWNvbW1lbnQuc3lzdGVtJiZpc093bmVyP1wib3duZXJcIjpcIlwifWB9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKGNvbnRlbnQsdHlwZSk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2godHlwZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInBob3RvXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8aW1nIHNyYz17Y29udGVudH0gc3R5bGU9e3t3aWR0aDoxNTB9fS8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxzcGFuPntjb250ZW50fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KShjb21tZW50LmNvbnRlbnQsY29tbWVudC5jb250ZW50X3R5cGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHRcdFx0XHRcdFx0PC9wPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e3dpZHRoOjQwLG1pbkhlaWdodDo0MCx2ZXJ0aWNhbEFsaWduOlwidG9wXCJ9fT57cmlnaHR9PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdClcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBJbmxpbmUgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0Y29tcG9uZW50RGlkTW91bnQoKXtcclxuICAgICAgICBjb25zdCB7ZGlzcGF0Y2gsa2luZDp7X25hbWV9LG1vZGVsOntfaWR9fT10aGlzLnByb3BzXHJcbiAgICAgICAgZGlzcGF0Y2goQUNUSU9OLkZFVENIKF9uYW1lLF9pZCkpXHJcblx0XHR0aGlzLmVuZC5zY3JvbGxJbnRvVmlldyh7IGJlaGF2aW9yOiBcInNtb290aFwiIH0pO1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKXtcclxuICAgICAgICB0aGlzLnByb3BzLmRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS9DTEVBUmB9KVxyXG4gICAgfVxyXG5cclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHtkYXRhPVtdLHRlbXBsYXRlLCBlbXB0eUljb24sIFxyXG5cdFx0XHRkaXNwYXRjaCxraW5kOntfbmFtZX0sbW9kZWw6e19pZH0sXHJcblx0XHRcdGNvbW1lbnRhYmxlPXRydWUsXHJcblx0XHRcdGhpbnQ9XCLor7TkuKTlj6VcIiwgZW1wdHl9PXRoaXMucHJvcHNcclxuXHJcblx0XHRsZXQgY29udGVudD1udWxsXHJcblx0XHRpZihkYXRhLmxlbmd0aCl7XHJcblx0XHRcdGNvbnRlbnQ9KFxyXG5cdFx0XHRcdDxkaXY+XHJcblx0XHRcdFx0XHR7ZGF0YS5tYXAoYT0+UmVhY3QuY3JlYXRlRWxlbWVudCh0ZW1wbGF0ZSwge2NvbW1lbnQ6YSxrZXk6YS5faWR9KSl9XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdClcclxuXHRcdH1lbHNle1xyXG5cdFx0XHRjb250ZW50PTxFbXB0eSB0ZXh0PXtlbXB0eXx8XCLlvZPliY3ov5jmsqHmnInor4Torrrlk6ZcIn0gaWNvbj17ZW1wdHlJY29ufS8+XHJcblx0XHR9XHJcblx0XHRsZXQgZWRpdG9yPW51bGxcclxuXHRcdGlmKGNvbW1lbnRhYmxlKVxyXG5cdFx0XHRlZGl0b3I9KDxFZGl0b3IgdHlwZT17X25hbWV9IF9pZD17X2lkfSBkaXNwYXRjaD17ZGlzcGF0Y2h9IGhpbnQ9e2hpbnR9Lz4pXHJcblx0XHRyZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbW1lbnQgaW5saW5lXCI+XHJcblx0XHRcdFx0e2VkaXRvcn1cclxuXHRcdFx0XHR7Y29udGVudH1cclxuXHRcdFx0XHQ8ZGl2IHJlZj17ZWw9PnRoaXMuZW5kPWVsfS8+XHJcbiAgICBcdFx0PC9kaXY+XHJcbiAgICAgICAgKVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XHJcblx0XHR0ZW1wbGF0ZTpDb21tZW50VUkuZGVmYXVsdFByb3BzLnRlbXBsYXRlLFxyXG5cdFx0ZW1wdHlJY29uOjxJY29uRW1wdHlDb21tZW50Lz5cclxuXHR9XHJcbn1cclxuXHJcblxyXG5jbGFzcyBFZGl0b3IgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0c3RhdGU9e1xyXG5cdFx0Y29tbWVudDpcIlwiXHJcblx0fVxyXG5cdHJlbmRlcigpe1xyXG5cdFx0Y29uc3Qge2NvbW1lbnR9PXRoaXMuc3RhdGVcclxuICAgICAgICBjb25zdCB7aGludH09dGhpcy5wcm9wc1xyXG5cdFx0bGV0IGFjdGlvbj1udWxsXHJcblx0XHRpZihjb21tZW50KXtcclxuXHRcdFx0YWN0aW9uPTxJY29uQnV0dG9uIG9uVG91Y2hUYXA9e3RoaXMuc2F2ZS5iaW5kKHRoaXMpfT48SWNvblNhdmUvPjwvSWNvbkJ1dHRvbj5cclxuXHRcdH1lbHNle1xyXG5cdFx0XHRhY3Rpb249PEljb25CdXR0b24gb25Ub3VjaFRhcD17dGhpcy5waG90by5iaW5kKHRoaXMpfT48SWNvbkNhbWVyYS8+PC9JY29uQnV0dG9uPlxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PFRvb2xiYXIgbm9HdXR0ZXI9e3RydWV9IGNsYXNzTmFtZT1cImdyaWRcIlxyXG5cdFx0XHRcdHN0eWxlPXt7YmFja2dyb3VuZENvbG9yOlwidHJhbnNwYXJlbnRcIn19PlxyXG5cdFx0XHRcdDxUb29sYmFyR3JvdXAgc3R5bGU9e3tkaXNwbGF5OlwidGFibGUtY2VsbFwiLHdpZHRoOlwiMTAwJVwifX0+XHJcblx0XHRcdFx0XHQ8VGV4dEZpZWxkIHZhbHVlPXtjb21tZW50fVxyXG5cdFx0XHRcdFx0XHRvbkNoYW5nZT17KGUsY29tbWVudCk9PnRoaXMuc2V0U3RhdGUoe2NvbW1lbnR9KX1cclxuXHRcdFx0XHRcdFx0b25LZXlEb3duPXsoe2tleUNvZGV9KT0+a2V5Q29kZT09MTMgJiYgdGhpcy5zYXZlKCl9XHJcblx0XHRcdFx0XHRcdGhpbnRUZXh0PXtoaW50fVxyXG5cdFx0XHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9Lz5cclxuXHRcdFx0XHQ8L1Rvb2xiYXJHcm91cD5cclxuXHRcdFx0XHQ8VG9vbGJhckdyb3VwIHN0eWxlPXt7d2lkdGg6NDB9fT5cclxuXHRcdFx0XHRcdHthY3Rpb259XHJcblx0XHRcdFx0PC9Ub29sYmFyR3JvdXA+XHJcblx0XHRcdDwvVG9vbGJhcj5cclxuXHRcdClcclxuXHR9XHJcblxyXG5cdHNhdmUoKXtcclxuXHRcdGNvbnN0IHt0eXBlLCBfaWQsZGlzcGF0Y2h9PXRoaXMucHJvcHNcclxuXHRcdGNvbnN0IHtjb21tZW50fT10aGlzLnN0YXRlXHJcblx0XHRkaXNwYXRjaChBQ1RJT04uQ1JFQVRFKHR5cGUsX2lkLCBjb21tZW50KSlcclxuXHRcdFx0LnRoZW4oYT0+dGhpcy5zZXRTdGF0ZSh7Y29tbWVudDpcIlwifSkpXHJcblx0fVxyXG5cclxuXHRwaG90bygpe1xyXG5cdFx0Y29uc3Qge3R5cGUsIF9pZCxkaXNwYXRjaH09dGhpcy5wcm9wc1xyXG5cdFx0Y29uc3Qge2NvbW1lbnR9PXRoaXMuc3RhdGVcclxuXHRcdHNlbGVjdEltYWdlRmlsZSgpXHJcblx0XHRcdC50aGVuKHVybD0+RmlsZS51cGxvYWQodXJsKSlcclxuXHRcdFx0LnRoZW4odXJsPT5kaXNwYXRjaChBQ1RJT04uQ1JFQVRFKHR5cGUsX2lkLHVybCx7Y29udGVudF90eXBlOlwicGhvdG9cIn0pKSlcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24oY29ubmVjdChzdGF0ZT0+c3RhdGUuY29tbWVudCkoQ29tbWVudFVJKSx7XHJcblx0cmVkdWNlcixcclxuXHRJbmxpbmU6IGNvbm5lY3Qoc3RhdGU9PnN0YXRlLmNvbW1lbnQpKElubGluZSlcclxufSlcclxuIl19