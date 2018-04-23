export const compact=(o,...keys)=>o ? keys.reduce((a,k)=>(a[k]=o[k],a),{}) : {}

export default compact