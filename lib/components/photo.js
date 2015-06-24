var React=require('react/addons'),
    {Component}=React,
    IconCamera=require('../icons/camera');

export default class Photo extends Component{
    constructor(props){
        super(props)
        this.state={url:null}
    }
    render(){
        var {url}=this.state,
            {src, width, height, style, cameraOptions, ...others}=this.props;

        style=style||{};
        style.width=width
        style.height=height

        if(src && url)
            return (<img src={url||url}
                    style={style} {...others}/>)
        else{
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
                    onClick={this.takePhoto.bind(this)}/>)
        }
    }

    takePhoto(){
        if(typeof(navigator.camera)=='undefined')
            return

        var {onPhoto, onFail, width, height, cameraOptions}=this.props
        cameraOptions.targetWidth=width
        cameraOptions.targetHeight=height
        navigator.camera.getPicture(function(url){
                this.setState({url:url});
                onPhoto && onPhoto(url);
            }.bind(this), onFail, cameraOptions)
    }

    get value(){
        return this.state.url
    }
    set value(url){
        this.setState({url:url})
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
    iconRatio:0.5
}

typeof(Camera)!='undefined' && (
Photo.defaultProps.cameraOptions={
        quality : 75,
        destinationType : Camera.DestinationType.DATA_URL,
        sourceType : Camera.PictureSourceType.CAMERA,
        allowEdit : false,
        encodingType: Camera.EncodingType.JPEG,
        popoverOptions: null,
        saveToPhotoAlbum: false
    });
