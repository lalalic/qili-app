var React=require('react'),
    {Component}=React,
    {Paper,Menu}=require('material-ui');

export default class QuickAction extends Component{
    constructor(props){
        super(props)
        this.state={open:false}
    }
    toggle() {
      this.setState({ open: !this.state.open });
      return this;
    }
    close() {
      this.setState({ open: false });
      return this;
    }

    open() {
      this.setState({ open: true });
      return this;
    }
    _onMenuItemClick(e, key, payload) {
      if (this.props.onChange && this.props.selectedIndex !== key) {
        this.props.onChange(e, key, payload);
      }
    }
    render(){
        var classes="mui-overlay"
        if(this.state.open)
            classes+=' mui-is-shown';
        return (
            <div onTouchTap={this.close.bind(this)}
                style={{backgroundColor:'transparent'}}
                className={classes}>
                <Paper
                    style={this.props.style}
                    zDepth={2}
                    rounded={false}>
                    <Menu
                        ref="menuItems"
                        zDepth={0}
                        menuItems={this.props.actions}
                        selectedIndex={this._getSelectedIndex()}
                        onItemClick={this._onMenuItemClick} />
                </Paper>
            </div>
        );
    }
    _getSelectedIndex(){
        var currentApp=require('../db/app').current,
            actions=this.props.actions;
        if(currentApp){
            for(var i=0, name=currentApp.name, len=actions.length;i<len;i++)
                if(actions[i].text==name)
                    return i
        }
    }
}
