require('../style/index.less')
import React, {Component, PropTypes} from "react"
import {Router, Route, IndexRoute, hashHistory, Redirect, IndexRedirect, Link} from "react-router"
import {FloatingActionButton, AppBar, IconButton} from 'material-ui'
import {combineReducers} from "redux"

import {compose, withProps, withContext, getContext, setStatic} from "recompose"

import {QiliApp, compact} from '.'
import Profile from "ui/user-profile"
import Logo from 'icons/logo'
const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJyb290IiwidXNlcm5hbWUiOiJyb290IiwiaWF0IjoxNTA1Njk3MzMwLCJleHAiOjE1MzcyNTQ5MzB9.cCM0hCo-o_2asA8FyfI2lkz1pI7-DO0v-OSZHmayTts"
const QiliAdmin=compose(
	withProps(props=>({
		appId:"qiliAdmin",
		service: "http://localhost:8080/1/graphql",
		user:{token},
	})),
)(QiliApp)

const Text=compose(
	getContext({
		environment:PropTypes.object
	}),
	setStatic("contextTypes", {
		environment:PropTypes.object
	}),
)((props, {environment})=><div>hello{environment.toString()}</div>)

QiliApp.render(<QiliAdmin><Profile/></QiliAdmin>)
