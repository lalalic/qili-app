import {Service} from './service'

export default class File extends Service.BuiltIn{
    static get _name(){
        return 'files'
	}

    static upload(data,type="image",props, url="http://up.qiniu.com"){
        return new Promise((resolve, reject)=>{
            this._getToken().then((token)=>{
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
                xhr.send(data)
            })
        })
    }

    static _getToken(){
        return this.ajax({
            method:'get',
            url:'http://qili2.com/1/files/token'
        }).then((data)=>data.token)
    }
}
