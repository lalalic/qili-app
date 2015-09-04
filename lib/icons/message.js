var React=require('react'),
    {Component}=React,
    {SvgIcon}=require('material-ui');


export class Info extends Component{
    render(){
        return (
            <SvgIcon {...this.props}>
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"/>
            </SvgIcon>
        )
    }
}

export class Warning extends Component{
    render(){
        return (
            <SvgIcon {...this.props}>
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
            </SvgIcon>
        )
    }
}

export class Error extends Component{
    render(){
        return (
            <SvgIcon {...this.props}>
                <path d="M0 0h24v24H0V0z" fill="none"/>
                <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
            </SvgIcon>
        )
    }
}

export class Http extends Component{
    render(){
        return (
            <SvgIcon {...this.props}>
                <path d="M4.5 11h-2V9H1v6h1.5v-2.5h2V15H6V9H4.5v2zm2.5-.5h1.5V15H10v-4.5h1.5V9H7v1.5zm5.5 0H14V15h1.5v-4.5H17V9h-4.5v1.5zm9-1.5H18v6h1.5v-2h2c.8 0 1.5-.7 1.5-1.5v-1c0-.8-.7-1.5-1.5-1.5zm0 2.5h-2v-1h2v1z"/>
                <path d="M24 24H0V0h24v24z" fill="none"/>
            </SvgIcon>
        )
    }
}

export class All extends Component{
    render(){
        return (
            <SvgIcon {...this.props}>
                <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                <path d="M0 0h24v24H0z" fill="none"/>
            </SvgIcon>
        )
    }
}
