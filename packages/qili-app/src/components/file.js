import PropTypes from "prop-types"
import {compose, getContext,mapProps} from "recompose"
import {connect} from "react-redux"
import {withMutation} from "../tools/recompose"
const IMAGE_DATA_SCHEME_LEN="data:image/jpeg;base64,".length
var instance,input,_imgSizer;

function main(type="json", width, height){
    //return Promise.as("http://ts2.mm.bing.net/th?id=JN.tzKlieg4w8eYJfDBkEHoAw&pid=15.1")

    if(input==null){
        input=document.createElement('input')
        input.type="file"
        _imgSizer=document.createElement('canvas')
        _imgSizer.style.position=input.style.position='absolute'
        _imgSizer.style.left=input.style.left='-9999px'

        document.body.appendChild(input)
        document.body.appendChild(_imgSizer)
    }

    return new Promise((resolve,reject)=>{
        var needResize=width||height,
            size=Math.max(width,height);

        input.onchange=function(){
            var file=this.files[0];
            if(file==null)
                return;

            if(type=='raw'){
                resolve(file)
                this.value=""
                return
            }


            var name=file.name,
    			reader=new FileReader();
            reader.onload=function(){
                this.value=""
                var data=reader.result
                switch(type){
    			case 'image':
    				if(needResize){
                        let img=new Image()
                        img.src=data
                        img.onload=()=>resolve({url:resize(data, size, img),name})
                        img.onerror=()=>resolve({url:data,name})
                    }else
    				    resolve({url:data, name})
    				break
    			case 'json':
    				resolve({data:JSON.parse(data), name})
    				break
    			case 'jsonInJs':
    				resolve({data: data && new Function("","return "+data)(), name})
    				break
    			default:
    				resolve({data,name})
    			}
            }.bind(this);

            reader.onerror=function(){
                reject(reader.error)
            }

    		switch(type){
    		case 'image':
    			reader.readAsDataURL(file)
    			break
    		default:
    			reader.readAsText(file)
    		}
        }

		input.click()
    })
}


function resize(dataUrl, size, img){
    var ctx=_imgSizer.getContext('2d')
    var wh=img.width/img.height;
    _imgSizer.width = wh>=1 ? (size<img.width ? size : img.width) : (size<img.height ? Math.floor(size*wh) : img.width);
    _imgSizer.height = wh<1 ? (size<img.height ? size : img.height) : (size<img.width ? Math.floor(size/wh) : img.height);
    _imgSizer.style.width=_imgSizer.width+"px"
    _imgSizer.style.height=_imgSizer.height+"px"
    ctx.drawImage(img,0,0,img.width,img.height,0,0,_imgSizer.width, _imgSizer.height);
    return _imgSizer.toDataURL("image/jpeg")
}

function dataAsBlob(data){
	return new Promise((resolve,reject)=>{
		switch(typeof(data)){
		case 'string':
			if(data.startsWith("file:")){
				window.resolveLocalFileSystemURL(data, entry=>entry.file(file=>{
					let reader=new FileReader()
					reader.onload=e=>resolve(new Blob([new Uint8Array(reader.result)],{type:file.type}))
					reader.readAsArrayBuffer(file)
				},reject), reject)
			}else if(data.startsWith("data:")){
				resolve(FileModule.toBlob(data))
			}else{
				fetch(data).then(res=>res.blob()).then(resolve,reject)
			}
		break
		default:
			resolve(data)
		}
	})
}

const FileModule={//for testable
    main,
    selectJsonFile(){
        return main("json")
    },
    selectJsonInJsFile(){
        return main("jsonInJs")
    },
    selectImageFile(width,height){
        return main("image",...arguments)
    },
    selectTextFile(){
        return main("text")
    },
    select(){
        return main("raw",...arguments)
    },
	toBlob(data,contentType="image/*", sliceSize=512){
		var byteCharacters = atob(data.substr(IMAGE_DATA_SCHEME_LEN))
		var byteArrays = [];

		for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
			var slice = byteCharacters.slice(offset, offset + sliceSize);

			var byteNumbers = new Array(slice.length);
			for (var i = 0; i < slice.length; i++) {
				byteNumbers[i] = slice.charCodeAt(i);
			}

			var byteArray = new Uint8Array(byteNumbers);

			byteArrays.push(byteArray);
		}

		var blob = new Blob(byteArrays, {type: contentType});
		return blob;
	},

    root:"<appId>",//replaced later
	
	uploadPathPolicy(host,user,path){
		path=path||`${host ? user : ""}/${Date.now()}`
		return `${FileModule.root}/${host||user}/${path}`
			.replace(/[:]/g,"/")
			.replace("//","/")
	},

	withUpload:compose(
		getContext({client:PropTypes.object}),
        connect(state=>({__user:state.qili.user.id})),
		mapProps(({client,__user,dispatch,...others})=>({
            ...others,
			upload(data,host,path,props={}){
                props={...props,"x:id":host||__user}
                props.key=FileModule.uploadPathPolicy(host,__user,path)

                return client
                    .runQL({
                        id:"file_token_Query",
                        variables:{key:props.key},
                        query:graphql`query file_token_Query($key:String){
                            token:file_upload_token(key:$key){
                                token
                                id
                            }
                        }`,
                    })
                    .then(({data:{token:{token}}})=>upload(data,props,token))
			}
		}))
	),

	withGetMultiUpload: compose(
		getContext({client:PropTypes.object}),
        connect(state=>({__user:state.qili.user.id})),
		mapProps(({client,__user,dispatch, ...others})=>{
            return {
                ...others,
    			getBatchUpload(){
    				return client
    					.runQL({
    						id:"file_token_Query",
    					})
                        .then(({data:{token:{token,id:_id}}})=>({
                            _id,
                            upload(data,host, path,props={}){
                                props={...props,"x:id":host||__user}
                                props.key=FileModule.uploadPathPolicy(host,__user,path)
                                return upload(data,props,token)
                			}
                        }))
    			}
            }

		})
	),
}


function upload(data,props={},token,url="http://up.qiniu.com"){
    return new Promise((resolve,reject)=>
		dataAsBlob(data).then(data=>{
            let formData=new FormData()
			formData.append('file',data)
			formData.append('token',token)
            if(props){
				Object.keys(props)
					.forEach(a=>formData.append(a,props[a]))
			}

			var xhr=new XMLHttpRequest()
			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4) {
					if (xhr.status >= 200 && xhr.status < 300){
						let url=JSON.parse(xhr.responseText).data.file_create.url
						resolve({id,url})
					}else
						reject(xhr.responseText);
				}
			}

			xhr.open('POST',url,true)
			xhr.send(formData)
		})
	)
}

const withFileCreate=withMutation({
	name:"createFile",
	promise:true,
	mutation:graphql`
		mutation file_create_Mutation($_id:String!,$host:ID!,$bucket:String,$size:Int,$crc:Int,$mimeType:String,$imageInfo:JSON){
			file_create(_id:$_id,host:$host,bucket:$bucket,size:$size,crc:$crc,mimeType:$mimeType,imageInfo:$imageInfo){
				url
			}
		}
	`
})

export default FileModule
