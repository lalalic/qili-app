import React, {Component} from 'react'

import {Avatar, Dialog, SvgIcon} from "material-ui"
import IconCamera from 'material-ui/svg-icons/image/photo-camera'
import {selectImageFile, upload,withGetToken} from 'components/file'

export class Photo extends Component{
    state={url:this.props.src}

    render(){
        const {url}=this.state
        const {width=24, height=24, cameraOptions, overwritable,onPhoto, autoUpload, getToken,...others}=this.props
        others.onClick=this.selectOrTakePhoto.bind(this)
        if(url){
            return (
                <SvgIcon  {...others} viewBox={`0 0 ${width} ${height}`}>
                    <image xlinkHref={url} height={height} width={width}/>
                </SvgIcon>
            )
        }

        return (<IconCamera {...others}
                color="lightgray"
                hoverColor="lightblue"/>)
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
