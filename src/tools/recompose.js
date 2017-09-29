export {withQuery} from "tools/relay/withQuery"
export {withFragment} from "tools/relay/withFragment"
export {withMutation} from "tools/relay/withMutation"
export {withGraphqlClient} from "tools/relay/withGraphqlClient"
export {withPagination} from "tools/relay/withPagination"
export {graphql} from  "react-relay"

export {withInit} from "tools/withInit"
import {withMutation} from "tools/relay/withMutation"
export const setPhoto=variables=>withMutation((props,data)=>{
	let vars=typeof(variables)=="function" ? variables(props,data) : variables
	vars={
		id:props.id,
		...data,
		...vars,
	}
	return {
		name:"setPhoto",
		variables:vars,
		patch4:vars.id,
		mutation:graphql`
			mutation recompose_setPhoto_Mutation($url:String!, $id:ID!, $field:String="photo"){
				file_link(url:$url, id:$id, field:$field)
			}
		`
	}
})
