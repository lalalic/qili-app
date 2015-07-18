var React=require('react/addons'),
    {Component}=React,
    IconCamera=require('../icons/camera'),
    dbFile=require('../db/file');

export default class Photo extends Component{
    constructor(props){
        super(props)
        var {src}=this.props
        this.state={url:src}
    }
    render(){
        var {url}=this.state,
            {width, height, style={}, cameraOptions, overwritable, ...others}=this.props;
        var onPhoto=typeof(navigator.camera)!='undefined' ? this.takePhoto.bind(this) : this.selectPhoto.bind(this)
        style.width=width
        style.height=height

        if(url){
            if(overwritable)
                others.onClick=this.takePhoto.bind(this)
            return (<img src={url} style={style} {...others}/>)
        }

        var {iconRatio, ...lefts}=others,
            viewWidth=Math.floor(Math.min(width, height)*iconRatio),
            top=Math.floor((height-viewWidth)/2),
            left=Math.floor((width-viewWidth)/2);
        style.width=style.height=viewWidth
        style.margin=`${top}px ${left}px`
        return (<IconCamera {...lefts}
                style={style}
                color="lightgray"
                hoverColor="lightblue"
                onClick={onPhoto}/>)
    }

    selectPhoto(){
        var {onPhoto, onFail, width, height, autoUpload}=this.props
        require('./image-selector')(width, height).
            then(function({url,binary}){
                this.setState({url:url})
                if(autoUpload)
                    dbFile.upload(binary)
                        .then(function(url){
                            onPhoto && onPhoto(url)
                        })
                else {
                    onPhoto && onPhoto(url)
                }
            }.bind(this), onFail)
    }

    takePhoto(){
        var {onPhoto, onFail, width, height, cameraOptions, autoUpload}=this.props
        cameraOptions.targetWidth=width
        cameraOptions.targetHeight=height
        navigator.camera.getPicture(function(url){
                this.setState({url:url});
                if(autoUpload)
                    dbFile.upload(url)
                        .then(function(url){
                            onPhoto && onPhoto(url)
                        })
                else {
                    onPhoto && onPhoto(url)
                }
            }.bind(this), onFail, cameraOptions)
    }
}

Photo.propTypes={
    cameraOptions: React.PropTypes.object,
    onPhoto: React.PropTypes.func,
    onFail: React.PropTypes.func
}

Photo.defaultProps={
    width:100,
    height:100,
    iconRatio:0.5,
    overwritable:false,
    autoUpload:false
}

typeof(Camera)!='undefined' && (
Photo.defaultProps.cameraOptions={
        quality : 75,
        destinationType : Camera.DestinationType.FILE_URI,
        sourceType : Camera.PictureSourceType.CAMERA,
        allowEdit : false,
        encodingType: Camera.EncodingType.JPEG,
        popoverOptions: null,
        saveToPhotoAlbum: false
    });
