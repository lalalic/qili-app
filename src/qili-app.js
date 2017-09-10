import React, {Component, PropTypes} from "react"
import { ApolloClient,ApolloProvider,createNetworkInterface} from 'react-apollo'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'


export class QiliApp extends Component{
    render(){
        const {theme}=this.props
        return (
            <MuiThemeProvider muiTheme={theme}>
                <ApolloProvider client={this.apolloClient}>

                </ApolloProvider>
            </MuiThemeProvider>
        )
    }

    get apolloClient(){
        const {service:uri}=this.props
        let networkInterface=createNetworkInterface({
            uri
        })
        return new ApolloClient({
            networkInterface
        })
    }
    static defaultProps={
		service:"http://qili2.com/1/",
		theme:getMuiTheme(lightBaseTheme,{
			footbar:{
				height: 50
			},
			page:{
				width: window.innerWidth > 960 ? 960 : window.innerWidth
				,height:window.innerHeight
			}
		}),
		init(){},
		tutorial:[],
		project:{}
	}

	static propsTypes={
		service: PropTypes.string.isRequired,
		appId:PropTypes.string.isRequired,
		theme: PropTypes.object.isRequired,
		init:PropTypes.func,
		tutorial:PropTypes.array,
		title: PropTypes.string,
		project: PropTypes.object
	}
}
