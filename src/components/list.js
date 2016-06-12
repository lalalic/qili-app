import React, {Component} from "react"
import AsyncComponent from "./async"
import {List,Divider,ListItem} from 'material-ui'
import {Table} from 'reactable'




export default class Main extends AsyncComponent{
    renderContent(loadingOrError){
        var {children=[], template, onItemClick, ...others}=this.props,
            {data}=this.state,i=0;

        if(!Array.isArray(children))
            children=[children];

        Array.isArray(data) && data.forEach((model)=>{
            let props={
                    model,
                    key:(model._id||i++),
                    onClick:()=>{
                        onItemClick && onItemClick(model)
                    }
                },
                el=React.createElement(template,props);
            children.push(el)
		});

        return (
            <div>
                {loadingOrError}
                <List {...others}>
                    {children}
                </List>
            </div>
        )

    }
	
	static Table=class extends AsyncComponent{
		renderContent(loadingOrError){
			var {data}=this.state,
				{rowData=data, model, ...others}=this.props;

			return (
				<div>
					{loadingOrError}
					<Table data={rowData} {...others}/>
				</div>
			)//Table must be in a container
		}
	}
	
	static Divider=Divider
	
	static Item=ListItem
	
	static defaultProps={
		template:class extends Component{
			render(){
				var {model, ...others}=this.props;
				return (<ListItem key={model._id} {...others}>{model.name||model.title||model._id}</ListItem>)
			}
		},
		empty: null,
		loading: null
	}

	
}

