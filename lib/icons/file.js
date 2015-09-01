var React=require('react'),
    {Component}=React,
    {SvgIcon}=require('material-ui');

export class Upload extends Component{
    render(){
        return (
            <SvgIcon {...this.props}>
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/>
            </SvgIcon>
        )
    }
}

export class Download extends Component{
    render(){
        return (
            <SvgIcon {...this.props}>
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
            </SvgIcon>
        )
    }
}

export class Save extends Component{
    render(){
        return (
            <SvgIcon {...this.props}>
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
            </SvgIcon>
        )
    }
}
