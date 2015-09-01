var React=require('react'),
    {Component}=React,
    {SvgIcon}=require('material-ui');

export class Before extends Component{
    render(){
        return (
            <SvgIcon {...this.props}>
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
            </SvgIcon>
        )
    }
}

export class Next extends Component{
    render(){
        return (
            <SvgIcon {...this.props}>
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
            </SvgIcon>
        )
    }
}

export class Home extends Component{
    render(){
        return (
            <SvgIcon {...this.props}>
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
            </SvgIcon>
        )
    }
}
