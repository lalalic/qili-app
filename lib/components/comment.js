"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Comment = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _graphql;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _recompose = require("recompose");

var _recompose2 = require("../tools/recompose");

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

var _file = require("./file");

var _file2 = _interopRequireDefault(_file);

var _commandBar = require("./command-bar");

var _commandBar2 = _interopRequireDefault(_commandBar);

var _empty = require("./empty");

var _empty2 = _interopRequireDefault(_empty);

var _reactRelay = require("react-relay");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var Comment = exports.Comment = function (_Component) {
	_inherits(Comment, _Component);

	function Comment() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Comment);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Comment.__proto__ || Object.getPrototypeOf(Comment)).call.apply(_ref, [this].concat(args))), _this), _this.first = true, _this.state = { comment: "" }, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Comment, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			if (this.end && this.first) {
				this.end.scrollIntoView({ behavior: "smooth" });
				this.first = false;
			}
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

			var _props = this.props,
			    data = _props.data,
			    commentText = _props.commentText,
			    commentPhoto = _props.commentPhoto,
			    template = _props.template,
			    loadMore = _props.loadMore,
			    _props$hint = _props.hint,
			    hint = _props$hint === undefined ? "说两句" : _props$hint,
			    system = _props.system,
			    minHeight = _props.minHeight;
			var comment = this.state.comment;

			var create = function create() {
				return commentText({ content: comment }).then(function (a) {
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
				onSelect: commentPhoto
			};

			var action = photo;

			if (comment.trim()) action = save;

			return _react2.default.createElement(
				"div",
				{ className: "comment", style: { minHeight: minHeight, backgroundColor: _colors.cyan50 } },
				_react2.default.createElement(
					_pullToRefresh2.default,
					{ onRefresh: loadMore },
					data.reduce(function (state, a, i) {
						var createdAt = new Date(a.createdAt);
						var comments = state.comments,
						    last = state.last;

						var props = { comment: a, key: i, system: system };
						if (!last || createdAt.getTime() - last.getTime() > 1000 * 60) {
							props.time = createdAt;
						}
						comments.push(_react2.default.createElement(template, props));
						state.last = createdAt;
						return state;
					}, { comments: [] }).comments
				),
				_react2.default.createElement(_commandBar2.default, {
					className: "footbar centerinput",
					primary: "Save",
					items: [{ action: "Back" }, _react2.default.createElement("textarea", { placeholder: hint, value: comment,
						onKeyDown: function onKeyDown(_ref2) {
							var keyCode = _ref2.keyCode;
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

	return Comment;
}(_react.Component);

Comment.propTypes = {
	data: _propTypes2.default.arrayOf(_propTypes2.default.object).isRequired,
	commentText: _propTypes2.default.func,
	commentPhoto: _propTypes2.default.func,
	loadMore: _propTypes2.default.func,
	minHeight: _propTypes2.default.number
};
Comment.contextTypes = {
	muiTheme: _propTypes2.default.object
};
Comment.defaultProps = {
	template: function template(_ref8) {
		var comment = _ref8.comment,
		    _ref8$system = _ref8.system,
		    system = _ref8$system === undefined ? {} : _ref8$system,
		    time = _ref8.time;

		var name = void 0,
		    left = void 0,
		    right = void 0,
		    text = void 0;
		if (comment.system) {
			name = _react2.default.createElement(
				"span",
				{ style: { fontSize: 'x-small' } },
				system.name
			);
			left = _react2.default.createElement(_materialUi.Avatar, { src: system.thumbnail });
			right = _react2.default.createElement("span", null);
		} else if (comment.isOwner) {
			left = _react2.default.createElement("span", null);
			right = _react2.default.createElement(_materialUi.Avatar, { src: comment.author.thumbnail });
		} else {
			name = _react2.default.createElement(
				"span",
				{ style: { fontSize: 'x-small' } },
				comment.author.name
			);
			left = _react2.default.createElement(_materialUi.Avatar, { src: comment.author.thumbnail });
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
						{ className: "content " + (!comment.system && comment.isOwner ? "owner" : "") },
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
						}(comment.content, comment.type)
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
exports.default = (0, _recompose.compose)((0, _recompose2.withMutation)(function (_ref3, data, client) {
	var parent = _ref3.parent,
	    connection = _ref3.connection;
	return {
		promise: true,
		variables: { parent: parent },
		mutation: _graphql || (_graphql = function _graphql() {
			return require("./__generated__/comment_create_Mutation.graphql");
		}),
		updater: function updater(store, data) {
			client.connection(store, connection, { parent: parent }).append(data.comment);
		}
	};
}), _file2.default.withGetToken, (0, _recompose.getContext)({ muiTheme: _propTypes2.default.object }), (0, _recompose.mapProps)(function (_ref4) {
	var muiTheme = _ref4.muiTheme,
	    minHeight = _ref4.minHeight,
	    mutate = _ref4.mutate,
	    data = _ref4.data,
	    relay = _ref4.relay,
	    hint = _ref4.hint,
	    system = _ref4.system,
	    template = _ref4.template,
	    getToken = _ref4.getToken;
	return {
		hint: hint, system: system, template: template,
		data: data ? data.comments.edges.map(function (_ref5) {
			var node = _ref5.node;
			return node;
		}) : [],
		commentText: function commentText(_ref6) {
			var content = _ref6.content;

			return mutate({ content: content });
		},
		commentPhoto: function commentPhoto() {
			return _file2.default.selectImageFile().then(function (data) {
				return getToken().then(function (_ref7) {
					var id = _ref7.id,
					    token = _ref7.token;
					return _file2.default.upload(data, { id: parent, key: "comments:" + id + "/a.jpg" }, token).then(function (url) {
						return mutate({ content: url, type: "photo", id: id });
					});
				});
			});
		},
		loadMore: function loadMore(ok) {
			if (relay.hasMore() && !relay.isLoading()) {
				relay.loadMore(10, function (e) {
					ok();
					if (e) {
						console.error(e);
					}
				});
			}
		},

		minHeight: minHeight || muiTheme.page.height
	};
}))(Comment);