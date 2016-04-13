var instance,
    IMAGE_DATA_SCHEME_LEN="data:image/jpeg;base64,".length,
    input,_imgSizer;

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
        setTimeout(()=>input.click(), 100)
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

main.toBinary=(dataUrl)=>atob(dataUrl.substr(IMAGE_DATA_SCHEME_LEN))

module.exports={//for testable
    main,
    toBinary:main.toBinary,
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
    }
}
