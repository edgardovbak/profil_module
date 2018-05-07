import * as React							from 'react';
import { connect }              			from 'react-redux';
import AvatarEditor 						from 'react-avatar-editor';
import Loader 								from './Loader';
import Dropzone 							from 'react-dropzone';
import 'cropperjs/dist/cropper.css';

// save config 
const DATA = require('../config.json');

// save config 
const atob = require('atob');

// default picture 
// const defaultAvatar = require('../images/default_avater.svg');

export interface Props {
	userAvatar: string;
	onUpdate: Function;
}

export interface Point {
	x: number;
	y: number;
}

export interface IsChangedType {
	isChanged?: boolean;
	// imageSrc?:	any;
	// changedImg?: any;
	newImage?: any;
}

export interface State {
	rotate: number;
	image: any;
	allowZoomOut: boolean;
	position: Point;
	scale: number;
	borderRadius: number;
	preview: any;
	width: number;
	height: number;
	imageUpdates: IsChangedType;
}

class UserAvatar extends React.Component<Props, State> {

	editor: AvatarEditor;

	constructor(props: Props) {
		super(props);
		this.state = {
			image: DATA.domain + this.props.userAvatar,
			allowZoomOut: false,
			position: { x: 0.5, y: 0.5 },
			scale: 1,
			rotate: 0,
			borderRadius: 0,
			preview: null,
			width: 250,
			height: 250,
			imageUpdates: {
				newImage: undefined,
				isChanged: false,
			}
		};
		this.useDefaultImage = 	this.useDefaultImage.bind(this);
		this.handleRotate = 	this.handleRotate.bind(this);
		this.handleSave = 		this.handleSave.bind(this);
		this.b64toBlob = 		this.b64toBlob.bind(this);
		this.makeid = 			this.makeid.bind(this);
		this.imageChange = 		this.imageChange.bind(this);
		this.loadSuccess = 		this.loadSuccess.bind(this);
	}

	// generate random names
	makeid = () => {
		let text = '';
		let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		for (let index = 0; index < 7; index++) {
			text += possible.charAt(Math.floor( Math.random() * possible.length) );
		}
		return text;
	}

	b64toBlob = (b64Data: string = '', sliceSize?: number) => {
		sliceSize = sliceSize || 512;
		
		if ( b64Data !== null) {
			let block = b64Data.split(';');
			let dataType = block[0].split(':')[1];
			let realData = block[1].split(',')[1];
			let filename = this.makeid() + '.' + dataType.split('/')[1];

			let byteCharacters = atob(realData);
			let byteArrays = [];

			for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
				let slice = byteCharacters.slice(offset, offset + sliceSize);

				let byteNumbers = new Array(slice.length);
				for (let i = 0; i < slice.length; i++) {
					byteNumbers[i] = slice.charCodeAt(i);
				}

				let byteArray = new Uint8Array(byteNumbers);

				byteArrays.push(byteArray);
			}
			let blob = new Blob(byteArrays, {type: dataType});
			let newAvatar = new File([blob], filename);
			return newAvatar;
		} else {
			return '';
		}
	}

	// set image to gefault 
	useDefaultImage() {
		this.setState({ image: this.props.userAvatar });
		// this.cropper.reset();
	}

	// rotate image to right 
	handleRotate = (e: any) => {
		this.setState({
			rotate: parseFloat(e.target.value),
		});
	}

	// set cropper to the references
	setEditorRef = (editor: any) => {
		if (editor) {
		   this.editor = editor;
	   	}
	}

	handleDrop = (acceptedFiles: any) => {
		this.setState({ image: acceptedFiles[0] });
	}

	handleScale = (e: any) => {
		const scale = parseFloat(e.target.value);
		this.setState({ scale });
	}

	imageChange = () => {
		this.setState({ 
			imageUpdates : {
				isChanged: true,
		}});
		
	}	

	imageReady = (e: any) => {
		// console.log(this.editor.getImage().toDataURL());
	}

	handleNewImage = (e: any) => {
		let img = new Image(),
			canvas = document.createElement('canvas'),
			ctx = canvas.getContext('2d');

		let reader = new FileReader();
		reader.readAsDataURL(e.target.files[0]);
		reader.onload = function () {
			img.src = reader.result;
		};
		img.crossOrigin = 'anonymous';
		var that = this;
		img.onload = () => {
			canvas.width = img.width;
			canvas.height = img.height;
			!ctx ? console.log('error') : ctx.drawImage(img, 0, 0);
			let base64URL = canvas.toDataURL();
			that.setState({ image: base64URL});
		};
	}

	loadSuccess(imgInfo: any) {
		this.setState({ imageUpdates : {
			isChanged: true,
		}});
	}

	handleSave = () => {
		let imageFile = this.b64toBlob(this.editor.getImageScaledToCanvas().toDataURL());
		console.log(this.editor.getImageScaledToCanvas().toDataURL());
		this.setState({ imageUpdates : {
			isChanged: true,
			newImage: imageFile
		}}, () => {
			this.props.onUpdate(this.state.imageUpdates);
			console.log(this.state.imageUpdates);
		});
	}

	render () {
		// if user is not updated then show loader
		if ( !this.props.userAvatar ) {
			return (<Loader/>);
		} else {
			// console.log(this.state.imageUpdates);
			return (
				<div className="user__avatar">
					<div className="user__avatar--blocks">
						<div>
							<h2>Original Image</h2>
							<Dropzone
								onDrop={this.handleDrop}
								disableClick={true}
								multiple={false}
								style={{marginBottom: '35px' }}
							>	
								<div>
									<AvatarEditor
										ref={(ref: any) => this.setEditorRef(ref)}
										image={this.state.image}
										width={this.state.width}
										height={this.state.height}
										borderRadius={this.state.borderRadius}
										color={[0, 0, 0, 0.6]} // RGBA
										rotate={this.state.rotate}
										scale={this.state.scale}
										onImageReady={this.imageReady}
										onLoadSuccess={this.loadSuccess}
										onDropFile={this.loadSuccess}
										onImageChange={this.imageChange}
									/>
								</div>
							</Dropzone>
							<div>
								<button
									name="save"
									onClick={this.handleSave}
								>
									Save Avatar
								</button>
							</div>
							<div>
								<label htmlFor="newImage">New File:</label>
        						<input name="newImage" id="newImage" type="file" onChange={this.handleNewImage} />
							</div>
							<div>
								<label htmlFor="scale">Zoom:</label>
								<input 
									name="scale"
									id="scale"
									type="range"
									onChange={this.handleScale}
									min="0"
									max="2"
									step="0.01"
									defaultValue="1"
								/>
							</div>
							<div>
								<label htmlFor="rotate">Rotate:</label>
								<input 
									name="rotate"
									id="rotate"
									type="range"
									onChange={this.handleRotate}
									min="0"
									max="360"
									step="0.1"
									defaultValue="0"
								/>
							</div>
						</div>
						
					</div>	
				</div>
			);
		}
	}
}

const mapStateToProps = (state: any) => {
	return {
		userAvatar : state.user.user.AvatarImageRef.Path
	};
};

export default connect(
	mapStateToProps
)(UserAvatar);
