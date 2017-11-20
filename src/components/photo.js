import React, {Component} from 'react'
import PropTypes from "prop-types"

import {Avatar, Dialog, SvgIcon,FlatButton} from "material-ui"
import IconCamera from 'material-ui/svg-icons/image/photo-camera'
import IconFile from 'material-ui/svg-icons/device/sd-storage'
import {selectImageFile, upload,withGetToken} from 'components/file'

export class Photo extends Component{
    state={url:this.props.src, selectOrTake:false}
    render(){
        const {url,selectOrTake}=this.state
        const {size=24, cameraOptions, overwritable,onPhoto, autoUpload, getToken, src,...others}=this.props
        others.onClick=this.selectOrTakePhoto.bind(this)
		others.style={...others.style,width:size,height:size}
		
		let pic=null,selectOrTaker=null
		if(selectOrTake){
			selectOrTaker=(
				<Dialog
					contentStyle={{width:150}}
					titleStyle={{height:0}}
					open={true}
					modal={false}
					actions={[
						<FlatButton
						label="选择"
						primary={true}
						icon={<IconFile sizee={60}/>}
						onClick={()=>this.take(Camera.PictureSourceType.PHOTOLIBRARY)}
					  />,
					  <FlatButton
						label="照相"
						primary={true}
						icon={<IconCamera size={60}/>}
						onClick={()=>this.take(Camera.PictureSourceType.CAMERA)}
					  />
					]}
					onRequestClose={()=>this.setState({selectOrTake:false})}
				/>
			)
		}
		
		
        if(url){
            pic=(
                <SvgIcon  {...others} viewBox={`0 0 ${size} ${size}`}>
                    <image xlinkHref={url} height={size} width={size}/>
                </SvgIcon>
            )
        }else
			pic=(<IconCamera {...others} color="lightgray"  hoverColor="lightblue"/>)
		
		return (
			<span>
				{pic}
				{selectOrTaker}
			</span>
		)
    }

    selectOrTakePhoto(e){
		e.stopPropagation()
        if(typeof(navigator.camera)!='undefined'){
			this.setState({selectOrTake:true})
		}else{
			this.selectPhoto()
		}
		return false
    }

	handlePhoto(url){
		this.setState({selectOrTake:false})
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

    takePhoto(sourceType=Camera.PictureSourceType.CAMERA){
        const {onFail, width, height, cameraOptions}=this.props
        cameraOptions.targetWidth=width
        cameraOptions.targetHeight=height
		cameraOptions.sourceType=sourceType
        navigator.camera.getPicture(url=>this.handlePhoto(url), onFail, cameraOptions)
    }

    getValue(){
        return this.state.url
    }
    static propTypes={
        cameraOptions: PropTypes.object,
        onPhoto: PropTypes.func,
        onFail: PropTypes.func
    }

    static defaultProps={
        width:1024,
        height:1024,
        autoUpload:false,
		cameraOptions: typeof(Camera)!='undefined' ? {
				quality : 75,
				destinationType : Camera.DestinationType.FILE_URI,
				sourceType : Camera.PictureSourceType.CAMERA,//PHOTOLIBRARY
				allowEdit : true,
				encodingType: Camera.EncodingType.JPEG,
				popoverOptions: null,
				saveToPhotoAlbum: false
			}:{}
    }
}

export default withGetToken(Photo)
