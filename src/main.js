require('../style/index.less')
import React, {Component, PropTypes} from "react"
import {Router, Route, IndexRoute, hashHistory, Redirect, IndexRedirect, Link} from "react-router"
import {FloatingActionButton, AppBar, IconButton} from 'material-ui'
import {combineReducers} from "redux"

import {compose, withProps} from "recompose"

import {QiliApp, compact} from '.'
import Profile from "ui/user-profile"
import Logo from 'icons/logo'

const QiliAdmin=compose(
	withProps(props=>({
		appId:"qiliAdmin",
		service: "http://localhost:8080/1/graphql",
		user:{token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWI5YWVjOWQ3OTEwYzA0MGNjYjg5ZjkiLCJpYXQiOjE1MDU1NTQ5NTAsImV4cCI6MTUzNzExMjU1MH0.2H4BggNNnwJtjluN4zfeLT88UCV6fJejeBDNmil2zfk"},
	})),

)(QiliApp)


QiliApp.render(<QiliAdmin><Profile/></QiliAdmin>)
