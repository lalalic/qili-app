import React,{Component} from "react"

export class Pagination extends Component{
    render(){
        const {relay, loadMore, pageInfo, count, url=()=>'', labelPrev="prev", labelNext="next"}=this.props
        var link
        if(pageInfo){
            const {hasNextPage, hasPreviousPage, startCursor, endCursor}=pageInfo
            return (
                <div className="pagination">
                    {hasPreviousPage && (link=url(this.props,startCursor,"backward")) && (<a className="prev" href={link}>{labelPrev}</a>)}
                    {hasNextPage && (link=url(this.props,endCursor)) && (<a className="next" href={link}>{labelNext}</a>)}
                </div>
            )
        }else if(relay && relay.hasMore()){
            return (
                <div className="pagination">
                    <a className="next" onClick={e=>{loadMore(count)}}>{labelNext}</a>
                </div>
            )
        }
            
        return null
    }
}