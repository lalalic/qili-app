import {Service} from './service'
import {toBlob} from "../components/file-selector"

export default class File extends Service.BuiltIn{
    static get _name(){
        return 'files'
	}

    static upload(data,props,url="http://up.qiniu.com"){
        return new Promise((resolve, reject)=>{
			this._getToken().then(token=>dataAsBlob(data).then(data=>{
                var formData=new FormData()
                formData.append('file',data)
                formData.append('token',token)
                for(var a in props)
                    formData.append(a,props[a])

                var xhr=new XMLHttpRequest()
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status >= 200 && xhr.status < 300)
                            resolve(JSON.parse(xhr.responseText).url)
                        else
                            reject(xhr.responseText);
                    }
                }

                xhr.open('POST',url,true)
                xhr.send(formData)
            }))
        })
    }

    static _getToken(){
        return this.ajax({
            method:'get',
            url:'http://qili2.com/1/files/token'
        }).then((data)=>data.token)
    }
}

function dataAsBlob(data){
	return new Promise((resolve,reject)=>{
		switch(typeof(data)){
		case 'string':
			if(data.startsWith("file://")){
				window.resolveLocalFileSystemURL(data, entry=>entry.file(file=>{
					let reader=new FileReader()
					reader.onload=e=>resolve(new Blob([new Uint8Array(reader.result)],{type:file.type}))
					reader.readAsArrayBuffer(file)
				},reject), reject)
			}else if(data.startsWith("data:image/jpeg;base64,")){
				resolve(toBlob(data))
			}else
				resolve(data)
		break
		default:
			resolve(data)
		}
	})
}
