import {compose,withProps, getContext, setDisplayName, wrapDisplayName,createEagerFactory}  from "recompose"
import {createFragmentContainer} from "react-relay"


export const withFragment=options=>BaseComponent=>{
	const factory=createEagerFactory(BaseComponent)
	
	const WithFragment=createFragmentContainer(props=>factory(props),options)
	if (process.env.NODE_ENV !== 'production') {
		return setDisplayName(wrapDisplayName(BaseComponent, 'withFragment'))(WithFragment)
	}
	return WithFragment
}

export default withFragment