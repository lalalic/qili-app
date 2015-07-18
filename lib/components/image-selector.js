var instance,
    Promise=require('apromise'),
    IMAGE_DATA_SCHEME_LEN="data:image/jpeg;base64,".length,
    input,_imgSizer;

export default function main(width, height){
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

    var p=new Promise(),
        needResize=width||height,
        size=Math.max(width,height);

    input.onchange=function(){
        var file=this.files[0];
        if(file==null)
            return;

        var reader=new FileReader();
        reader.onload=function(){
            this.value=""
            var data=reader.result
            if(needResize)
                data=resize(data, size)
            p.resolve({url:data, binary:toBinary(data)})
        }.bind(this);

        reader.onerror=function(){
            p.reject(reader.error)
        }

        reader.readAsDataURL(file)
    }
    setTimeout(()=>input.click(), 100)
    return p
}


function resize(dataUrl, size){
    var ctx=_imgSizer.getContext('2d'),
        img=new Image();
    img.src=dataUrl;
    var wh=img.width/img.height;
    _imgSizer.width = wh>=1 ? (size<img.width ? size : img.width) : (size<img.height ? Math.floor(size*wh) : img.width);
    _imgSizer.height = wh<1 ? (size<img.height ? size : img.height) : (size<img.width ? Math.floor(size/wh) : img.height);
    _imgSizer.style.width=_imgSizer.width+"px"
    _imgSizer.style.height=_imgSizer.height+"px"
    ctx.drawImage(img,0,0,img.width,img.height,0,0,_imgSizer.width, _imgSizer.height);
    return _imgSizer.toDataURL("image/jpeg")
}

function toBinary(dataUrl){
    return atob(dataUrl.substr(IMAGE_DATA_SCHEME_LEN))
}
