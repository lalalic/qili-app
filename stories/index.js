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
	.add('min', ()=><QiliApp appId="qiliAdmin"/>)