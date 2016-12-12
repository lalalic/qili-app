import React, {Component, PropTypes} from "react"
import {List, ListItem, Divider, Dialog, TextField, AppBar,RaisedButton,IconButton, RadioButtonGroup, RadioButton} from "material-ui"
import NavigationBack from "material-ui/svg-icons/hardware/keyboard-arrow-left"


export class InfoForm extends Component{
	state={editing:0}
	render(){
		const {children, ...others}=this.props
		const {editing}=this.state
		let editor=null, len=children.length
		if(editing){
			const {onEdit,hintText,value,primaryText,type, options,TheEditor=Editor[type]}=children[editing-1].props
			const {page}=this.context.muiTheme
			editor=(<TheEditor page={page}
				{...{onEdit,hintText,value,primaryText,options}} 
				onCancel={e=>this.setState({editing:0})}/>
			)
		}
		return (
			<div>
				<List {...others}>
				{
					children.map((child,i)=>{
						const {type:elementType, props:{onEdit,hintText,value, primaryText, type="input", options,...others}}=child
						if(elementType==Field){
							others.primaryText=primaryText
							if(value)
								others.rightIcon=(<Value value={value}/>)
							if(onEdit)
								others.onClick=e=>this.setState({editing:i+1})
							return <ListItem {...others} key={i}/>
						}else
							return React.cloneElement(child,{key:i})
					}).reduce((state,a,i)=>{
						state.push(a)
						if(i+1!=len)
							state.push(<Divider key={`_${i}`}/>)
						return state
					},[])
				}
				</List>
				{editor}
			</div>
		)
	}
	
	static contextTypes={
		muiTheme: PropTypes.object
	}
}

const Value=({value,style={}})=>(<span style={{...style,color:"lightgray", width:"auto"}}>{value}</span>)

export const Field=()=>null

const Editor={
	input({onEdit, onCancel, hintText,value,primaryText, page}){
		let props={}
		if(hintText){
			props={
				floatingLabelFixed:true,
				floatingLabelText:hintText
			}
		}
		let refEditor
		return (
			<Dialog open={true} 
				onRequestClose={onCancel}
				title={<Title {...{onEdit:a=>onEdit(refEditor.getValue()), onCancel, primaryText, isChange:!!value}}/>}>
				<TextField ref={a=>refEditor=a} {...props} fullWidth={true} defaultValue={value}/>
			</Dialog>
		)
	}
	,single({onEdit, onCancel, hintText,value,primaryText, page, options, len=options.length}){
		return (
			<Dialog open={true} 
				onRequestClose={onCancel}
				title={primaryText}>
				<RadioButtonGroup name={primaryText} 
					valueSelected={value}
					labelPosition="left" 
					onChange={(e,value)=>{
						onEdit(value)
						onCancel()
					}}>
				{
					options.map((opt,i)=>{
						let value,label
						if(typeof(opt)=='object'){
							value=opt.value
							label=opt.label||value
						}else{
							value=label=opt
						}
						return (
							<RadioButton key={i}
								value={value}
								label={label}
								/>
						)
					})
				}
				</RadioButtonGroup>
			</Dialog>
		)
	}
	,multiple(){
		
	}
	,date(){
		
	}
}

const Title=({onEdit, onCancel, primaryText, isChange})=>(
	<AppBar title={`${isChange ? "更改" :""}${primaryText}`} 
		iconElementLeft={<IconButton onClick={onCancel}><NavigationBack/></IconButton>}
		iconElementRight={<RaisedButton label="保存" onClick={onEdit} primary={true}/>}
		/>
)