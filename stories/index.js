require("../style/index.less")

import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {QueryRenderer, graphql as gql} from 'react-relay'

import Authentication from "components/authentication"
storiesOf('Authentication', module)
	.addDecorator(story=>(
		<MuiThemeProvider muiTheme={getMuiTheme()}>
			{story()}
		</MuiThemeProvider>
	))
	.add('UI', () =><Authentication/>)
	
/*
import QiliApp from "../src/qili-app"
storiesOf('qili app', module)
	.add('no app', ()=><QiliApp/>)
    .add('not tutorialized with tutoirals', ()=><QiliApp appId="test" tutorial={[{title:"test",media:"a.png"}]}/>)
    .add('tutorialized with tutoirals', ()=><QiliApp appId="test" tutorialized={true} tutorial={[{title:"test",media:"a.png"}]}/>)
	.add('no user', ()=><QiliApp appId="test"/>)
    .add('not login with user', ()=><QiliApp appId="test" user={{phone:"1233453343"}}/>)
    .add('logged-in', ()=><QiliApp appId="test" user={{phone:"1233453343", token:"123"}}/>)
    .add('features', ()=><QiliApp appId="qiliAdmin" service="http://localhost:8080/1/graphql"/>)

const Qili=story=>(
	<QiliApp
		appId="qiliAdmin"
		service="http://localhost:8080/1/graphql"
		user={{token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWI5YWVjOWQ3OTEwYzA0MGNjYjg5ZjkiLCJpYXQiOjE1MDU1NTQ5NTAsImV4cCI6MTUzNzExMjU1MH0.2H4BggNNnwJtjluN4zfeLT88UCV6fJejeBDNmil2zfk"}}>
		{story()}
	</QiliApp>
)

import ConnectedProfile, {Profile} from "ui/user-profile"
storiesOf('profile', module)
	.addDecorator(Qili)
	.add('ui', ()=><Profile/>)
/*
*/
