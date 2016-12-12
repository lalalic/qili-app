import React, {Component, PropTypes} from "react"
import {List, ListItem, Divider, Dialog, DatePicker,
		AppBar,RaisedButton,IconButton,
		RadioButtonGroup, RadioButton} from "material-ui"
import NavigationBack from "material-ui/svg-icons/hardware/keyboard-arrow-left"

import TextField from "./text-field"
import FullPage from "./full-page"


export class InfoForm extends Component{
	state={editing:0}
	render(){
		let {children, ...others}=this.props
		children=React.Children.toArray(children)
		const {editing}=this.state
		let editor=null, len=children.length
		if(editing){
			const {onEdit,hintText,value,primaryText,type="input", options,children:customizedEditor}=children[editing-1].props
			let TheEditor=Editor[customizedEditor ? "customized" : type]
			editor=(<TheEditor
				{...{onEdit,hintText,value,primaryText,options,children:customizedEditor}}
				onCancel={e=>this.setState({editing:0})}/>
			)
		}
		return (
			<div>
				<List {...others}>
				{
					children.map((child,i)=>{
						const {type:elementType, props:{onEdit,hintText,value, primaryText, type="input", options,children, ...others}}=child
						if(elementType==Field){
							others.primaryText=primaryText
							if(value){
								let display=value
								switch(type){
								case "single":
									display=options.reduce((found,a)=>{
										if(found!=null)
											return found
										if(a==value)
											return a
										else if(typeof(a)=="object" && a.value==value)
											return a.label||a.value
										return found
									},null)
								break
								case "multiple":
									display=(value||[]).map(a=>{
										let f=options.find(o=>a==o||a==o.value)
										return typeof(f)=="object" ? f.label||f.value : f
									}).join(",")
								break
								case "date":
									display=value ? value.format() : ""
								break
								}
								others.rightIcon=(<Value value={display}/>)
							}
							if(onEdit || children)
								others.onClick=e=>this.setState({editing:i+1})
							return <ListItem {...others} key={i}/>
						}else
							return React.cloneElement(child,{key:i})
					}).reduce((state,a,i)=>{
						state.push(a)
						if(i+1!=len && a.type==ListItem)
							state.push(<Divider key={`_${i}`}/>)
						return state
					},[])
				}
				</List>
				{editor}
			</div>
		)
	}
}

const Value=({value,style={}})=>(
	<span style={{...style,color:"lightgray", width:"auto"}}>
	{value}
	</span>
)

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
			<FullPage>
				<Title {...{onEdit:a=>{
						let p=onEdit(refEditor.getValue())
						if(p && p.then)
							p.then(onCancel, e=>refEditor.errorText=e)
						else
							onCancel()
					}, onCancel, primaryText, isChange:!!value}}/>
				<div style={{padding:5}}>
					<TextField ref={a=>refEditor=a} {...props}
						name={primaryText} fullWidth={true} defaultValue={value}/>
				</div>
			</FullPage>
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
	,multiple({onEdit, onCancel, hintText,value:v1=[],primaryText, options, page, selecteds=[...v1]}){
		return (
			<Dialog open={true}
				onRequestClose={onCancel}
				title={<Title {...{onEdit:a=>onEdit(selecteds), onCancel, primaryText, isChange:!!value}}/>}>
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
							<Checkbox key={i}
								onCheck={(e,checked)=>{
									if(!checked)
										selected.splice(selected.indexOf(value),1)
									else
										selected.push(value)
								}}
								label={label}
								valueLink={value}
								defaultChecked={v1.indexOf(value)!=-1}
								labelPosition="left"
								/>
						)
					})
				}
			</Dialog>
		)
	}
	,date({onEdit, onCancel, hintText,value,primaryText, page}){
		let props={}
		if(hintText){
			props={
				floatingLabelFixed:true,
				floatingLabelText:hintText
			}
		}
		let refEditor
		return (
			<FullPage>
				<Title {...{onEdit:a=>{
						let p=onEdit(refEditor.getDate())
						if(p && p.then)
							p.then(onCancel, e=>refEditor.errorText=e)
						else
							onCancel()
					}, onCancel, primaryText, isChange:!!value}}/>
					<div style={{padding:5}}>
						<DatePicker ref={a=>refEditor=a} autoOk={true} name={primaryText} {...props} fullWidth={true}
							defaultDate={value}/>
					</div>
			</FullPage>
		)
	}
	,customized({onEdit, onCancel, hintText,value,primaryText, children, page}){
		return (
			<FullPage>
				<Title {...{onEdit:a=>{
						let p=onEdit()
						if(p && p.then)
							p.then(onCancel)
						else
							onCancel()
					}, onCancel, primaryText, isChange:!!value}}/>
				{children}
			</FullPage>
		)
	}
}

const Title=({onEdit, onCancel, primaryText, isChange})=>(
	<AppBar title={`${isChange ? "更改" :""}${primaryText}`}
		iconElementLeft={<IconButton onClick={onCancel}><NavigationBack/></IconButton>}
		iconElementRight={<RaisedButton label="保存" onClick={onEdit} primary={true}/>}
		/>
)
