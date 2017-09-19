import {toClass}  from "recompose"
import {createFragmentContainer} from "react-relay"


export const withFragment=options=>BaseComponent=>
	createFragmentContainer(toClass(BaseComponent),options)

export default withFragment