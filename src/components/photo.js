import React, {Component} from 'react'
import PropTypes from "prop-types"

import {Avatar, Dialog, SvgIcon,IconButton} from "material-ui"
import IconCamera from 'material-ui/svg-icons/image/photo-camera'
import IconFile from 'material-ui/svg-icons/device/sd-storage'
import {selectImageFile, upload,withGetToken} from 'components/file'

export class Photo extends Component{
    state={url:this.props.src, toSelectWay:false}
    render(){
        const {url,toSelectWay}=this.state
        const {size=24, cameraOptions, overwritable,onPhoto, 
			autoUpload, getToken, src, onClick, ...others}=this.props
        others.onClick=onClick || this.toSelectWay.bind(this)
		others.style={...others.style,width:size,height:size}


		let pic=null,toSelectWayr=null
		if(toSelectWay){
            const style={
                button:{
                    width:96,
                    height:96,
                    padding:24
                },
                icon:{
                    width:60,
                    height:60
                }
            }
            toSelectWayr=(
				<Dialog
					titleStyle={{display:'hidden'}}
					open={true}
					modal={false}
					onRequestClose={()=>this.setState({toSelectWay:false})}
				    >
                    <center className="grid">
                        <IconButton
                            iconStyle={style.icon}
                            style={style.button}
                            onClick={()=>this.selectPhoto()}>
                            <IconFile/>
                        </IconButton>
                        <IconButton
                            iconStyle={style.icon}
                            style={style.button}
                            onClick={()=>this.takePhoto()}>
                            <IconCamera/>
                        </IconButton>
                    </center>
                </Dialog>
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
				{toSelectWayr}
			</span>
		)
    }

    toSelectWay(e){
		e.stopPropagation()
        if(this.context.is.app){
			this.setState({toSelectWay:true})
		}else{
			this.selectPhoto()
		}
		return false
    }

	handlePhoto(url){
		this.setState({toSelectWay:false})
		const {onPhoto,autoUpload,getToken}=this.props
		this.setState({url})
		if(autoUpload){
			upload(url,autoUpload,getToken)
				.then(url=>onPhoto && onPhoto(url))
		}else {
			onPhoto && onPhoto(url, (id,key,token)=>upload(url,{id,key},token||getToken))
		}
	}

    selectPhoto(){
		if(this.context.is.app){
			this.takePhoto(Camera.PictureSourceType.PHOTOLIBRARY)
			return 
		}
			
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
	static contextTypes={
		is: PropTypes.object,
	}
    static propTypes={
        cameraOptions: PropTypes.object,
        onPhoto: PropTypes.func,
        onFail: PropTypes.func,
		getToken: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
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
