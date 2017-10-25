import React, {Component} from 'react'

import {Avatar, Dialog} from "material-ui"
import IconCamera from 'material-ui/svg-icons/image/photo-camera'
import {selectImageFile, upload,withGetToken} from 'components/file'

export class Photo extends Component{
    state={url:this.props.src}

    render(){
        var {url}=this.state,
            {width, height, iconSize, style={},
				cameraOptions, overwritable,iconRatio,
				onPhoto, autoUpload, getToken,
				...others}=this.props;
        if(!iconSize){
            style.width=width
            style.height=height
        }else{
            Object.assign(style,iconSize)
        }

        if(url){
            if(overwritable)
                others.onClick=this.selectOrTakePhoto.bind(this)
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
                onClick={this.selectOrTakePhoto.bind(this)}/>)
    }

    selectOrTakePhoto(e){
		e.stopPropagation()
        if(typeof(navigator.camera)!='undefined'){
			this.takePhoto()
		}else{
			this.selectPhoto()
		}
		return false
    }
	
	handlePhoto(url){
		const {onPhoto,autoUpload,getToken}=this.props
		this.setState({url})
		if(autoUpload){
			upload(url,autoUpload,getToken)
				.then(url=>onPhoto && onPhoto(url))
		}else {
			onPhoto && onPhoto(url)
		}
	}

    selectPhoto(){
        const {onFail, width, height}=this.props
        selectImageFile(width, height).
            then(({url,binary})=>this.handlePhoto(url), onFail)
    }

    takePhoto(){
        const {onFail, width, height, cameraOptions}=this.props
        cameraOptions.targetWidth=width
        cameraOptions.targetHeight=height
        navigator.camera.getPicture(url=>this.handlePhoto(url), onFail, cameraOptions)
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
        autoUpload:false,
		cameraOptions: typeof(Camera)!='undefined' ? {
				quality : 75,
				destinationType : Camera.DestinationType.FILE_URI,
				sourceType : Camera.PictureSourceType.CAMERA,
				allowEdit : true,
				encodingType: Camera.EncodingType.JPEG,
				popoverOptions: null,
				saveToPhotoAlbum: false
			}:{}
    }
}

export default withGetToken(Photo)
