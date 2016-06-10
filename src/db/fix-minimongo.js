/**

options:{
    cacheFind(true),
    cacheOne(true),
    interim(true),
    useLocalOnRemoteError (only when interim=false)
    shortcut(false)
}
HybridDb:{
    addCollection(name, options, success(), error(err)): LocalDB and remoteDb must already have same name collection
        *1. auto add same name collections on localDb, remoteDb, and HybridDb
    removeCollection(name,success()):not remove same name collection of either localCol or remoteCol

    upload(success(),error(err)):
}
HybridDb.Collection:{
    upsert(docs, bases, success, error):it only upsert on localDb
        * overwrite it to upsert to remoteDb
            * then cacheOne it
    remove(id, success, eror):it only removes on localCol
    find(selector, options).fetch(success, error):
    findOne(selector,options, success, error):
    upload(success,error):
}

localDb.Collection{
    ...
    seed(docs,success, error): no then cache
    cacheOne(doc, success, error): no or "cached" only
    cache(docs, selector, options, success, error): same with above

    pendingUpserts(success, error):
    resolveUpserts(docs, success, error): "upserted" only
        > same with that in db, then update status only as "cached"
        > not same, then update base only, and status leaves as "upserted"
    pendingRemoves(success, error):
    resolveRemove():
}

MOST important:
Qili server is not fully aligned with minimongo about
: It can also be used with a simple server that just OVERWRITE documents COMPLETELY on upsert
    >createdAt and updatedAt
    >author
    >_id

so qili-app doesn't support local upsert
*/
import {HybridDb, utils} from 'minimongo'

var _fixed=false
export default function fix(db){
    if(_fixed)
        return;
    var tempColName='_'+Date.now()

    var localDb=db.localDb,
        remoteDb=db.remoteDb;

    (function(_addCollection){
        HybridDb.prototype.addCollection=function(name, opt){
            if(!this.localDb[name])
                this.localDb.addCollection(name)

            if(!this.remoteDb[name])
                this.remoteDb.addCollection(name,opt)

            return _addCollection.apply(this,arguments)
        }
    })(HybridDb.prototype.addCollection);

    (function(){
        db.addCollection(tempColName)
        let HybridCollection=db[tempColName].constructor,
            LocalCollection=localDb[tempColName].constructor,
            RemoteCollection=remoteDb[tempColName].constructor;

        HybridCollection.prototype.upsert=function(doc,base,success,error){
            if(typeof(base)=='function'){
                base=null
                success=arguments[1]
                error=arguments[2]
            }
            return new Promise((resolve, reject)=>{
                var fail=(e)=>{
                    error && error(e)
                    reject(e)
                }
                this.remoteCol.upsert(doc,base,(result)=>{
                    result=Object.assign(doc,result)
                    this.localCol.cacheOne(result, ()=>{
                        success&&success(result)
                        resolve(result)
                    },fail)
                },fail)
            })
        }

        //no client id
        utils.createUid=()=>undefined

        HybridCollection.prototype.remove=function(id,success,error){
            return new Promise((resolve, reject)=>{
                    var fail=(e)=>{
                        error && error(e)
                        reject(e)
                    }
                    this.remoteCol.remove(id,()=>{
                        this.localCol.resolveRemove(id,()=>{
                            success&&success()
                            resolve()
                        },fail)
                    },fail)
            })
        }

        HybridCollection.prototype.upload=function(){
            throw new Error('Not support')
        }

        ;(function(find){
            //don't call success when local interim find without results
            HybridCollection.prototype.find=function(selector,options={}){
                var finder=find.call(this,selector,options),
                    interim=Object.assign({},this.options,options).interim
                if(!interim)
                    return finder

                var fetcher=finder.fetch,
                    time=0, called=false
                return {
                    fetch: function(success, error){
                        fetcher((docs)=>{
                            time++
                            if(time==1 && docs.length==0){
                                //@HACK: modify local Data to make always call success with remote result
                                docs[0]={_neverHasThis:tempColName}
                                return
                            }

                            success(docs)
                        },error)
                    }
                }
            }
        })(HybridCollection.prototype.find);

        (function(find){//qili server return {results:[...]}
            RemoteCollection.prototype.find=function(selector,options={}){
                var fetcher=find.call(this,selector,options).fetch
                return {
                    fetch: function(success,error){
                        fetcher((data)=>{
                            success && success(typeof(data.results)!='undefined' ? data.results : data)
                        },error)
                    }
                }
            }
        })(RemoteCollection.prototype.find);

        db.removeCollection(tempColName)
        localDb.removeCollection(tempColName)
        remoteDb.removeCollection(tempColName)
    })();
    _fixed=true
}
