import React, {Component} from 'react'
import {Avatar} from "material-ui"
import IconCamera from 'material-ui/svg-icons/image/photo-camera'
import dbFile from '../db/file'
import {selectImageFile} from './file-selector'

export default class Photo extends Component{
    state={url:this.props.src}

    render(){
        var {url}=this.state,
            {width, height, iconSize, style={},
				cameraOptions, overwritable,iconRatio,
				onPhoto, autoUpload,
				...others}=this.props;
        if(!iconSize){
            style.width=width
            style.height=height
        }else{
            Object.assign(style,iconSize)
        }

        if(url){
            if(overwritable)
                others.onClick=this.doPhoto.bind(this)
            return (<Avatar  {...others} src={url} style={style}/>)
        }

        var viewWidth=Math.floor(Math.min(style.width, style.height)*iconRatio),
            top=Math.floor((style.height-viewWidth)/2),
            left=Math.floor((style.width-viewWidth)/2);
        style.width=style.height=viewWidth
        style.margin=`${top}px ${left}px`
        return (<IconCamera {...others}
                style={style}
                color="lightgray"
                hoverColor="lightblue"
                onClick={e=>this.doPhoto()}/>)
    }

    doPhoto(){
        typeof(navigator.camera)!='undefined' ? this.takePhoto() : this.selectPhoto()
    }

    selectPhoto(){
        var {onPhoto, onFail, width, height, autoUpload}=this.props
        selectImageFile(width, height).
            then(({url,binary})=>{
                this.setState({url})
                if(autoUpload){
                    dbFile.upload(url)
                        .then(url=>{
                            onPhoto && onPhoto(url)
                        })
                }else {
                    onPhoto && onPhoto(url)
                }
            }, onFail)
    }

    takePhoto(){
        var {onPhoto, onFail, width, height, cameraOptions, autoUpload}=this.props
        cameraOptions.targetWidth=width
        cameraOptions.targetHeight=height
        navigator.camera.getPicture(url=>{
                this.setState({url})
                if(autoUpload){
                    dbFile.upload(url)
                        .then(url=>{
                            onPhoto && onPhoto(url)
                        })
                } else {
                    onPhoto && onPhoto(url)
                }
            }, onFail, cameraOptions)
    }

    getValue(){
        return this.state.url
    }
    static propTypes={
        cameraOptions: React.PropTypes.object,
        onPhoto: React.PropTypes.func,
        onFail: React.PropTypes.func
    }

    static defaultProps={
        width:1024,
        height:1024,
        iconRatio:0.5,
        overwritable:false,
        autoUpload:true,
		cameraOptions: typeof(Camera)!='undefined' ? {
				quality : 75,
				destinationType : Camera.DestinationType.FILE_URI,
				sourceType : Camera.PictureSourceType.CAMERA,
				allowEdit : false,
				encodingType: Camera.EncodingType.JPEG,
				popoverOptions: null,
				saveToPhotoAlbum: false
			}:{}
    }

}


