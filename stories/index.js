import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const theme=getMuiTheme()
const MaterialUI=({children})=>(<MuiThemeProvider muiTheme={theme} children={children}/>)

import Authentication from "components/authentication"
import { ApolloClient,ApolloProvider,createNetworkInterface} from 'react-apollo'

storiesOf('Authentication', module)
  .add('UI', () => (
      <MaterialUI>
        <ApolloProvider client={new ApolloClient({
                networkInterface:createNetworkInterface({uri:"http://localhost:8080/1/graphql"})
            })}>
            <Authentication/>
        </ApolloProvider>
      </MaterialUI>
  ))
