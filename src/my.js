import React from "react"
import Account from "./components/account"
import App from "./db/app"

export default class extends Account{
	more(){
		return (
			<List.Item 
				primaryText="Create QiLi app"
				initiallyOpen={true}
				autoGenerateNestedIndicator={false}
				onTouchTap={a=>this.context.router.push("app")}
				leftIcon={<IconAdd/>}
				nestedItems={
					App.all.map(a=>{
						return (
							<List.Item primaryText={a.name} key={`${a._id}`}
								leftIcon={<span/>}
								rightIcon={<IconItem/>}
								onClick={()=>this.context.router.push(`app/${(App.current=a).name}`)}/>
						)
					})
				}
			/>)
	}
	static contextTypes={
		router:React.PropTypes.object
	}
}