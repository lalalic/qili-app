import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Authentication from "components/authentication"
import { ApolloClient,ApolloProvider,createNetworkInterface} from 'react-apollo'

const Context=({children})=>(
	<MuiThemeProvider muiTheme={getMuiTheme()}>
		<ApolloProvider client={new ApolloClient({
                networkInterface:createNetworkInterface({uri:"http://localhost:8080/1/graphql"})
            })} children={children}/>
	</MuiThemeProvider>
)

storiesOf('Authentication', module)
	.add('UI', () =><Context><Authentication/></Context>)

import QiliApp from "qili-app"
storiesOf('qili app', module)
	.add('no app', ()=><QiliApp/>)
    .add('not tutorialized with tutoirals', ()=><QiliApp appId="test" tutorial={[{title:"test",media:"a.png"}]}/>)
    .add('tutorialized with tutoirals', ()=><QiliApp appId="test" tutorialized={true} tutorial={[{title:"test",media:"a.png"}]}/>)
	.add('no user', ()=><QiliApp appId="test"/>)
    .add('not login with user', ()=><QiliApp appId="test" user={{phone:"1233453343"}}/>)
    .add('logged-in', ()=><QiliApp appId="test" user={{phone:"1233453343", sessionToken:"123"}}/>)
    .add('hello qili', ()=><QiliApp
        appId="qiliAdmin"
        service="http://localhost:8080/1/graphql"
        />)
