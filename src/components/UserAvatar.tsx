import * as React							from 'react';
import { connect }              			from 'react-redux';
// import AvatarEditor 						from 'react-avatar-editor';
import Loader 								from './Loader';
// import Dropzone 							from 'react-dropzone';
import 'cropperjs/dist/cropper.css';

// save config 
const DATA = require('../config.json');

// save config 
const atob = require('atob');

export interface Props {
	onUpdate: Function;
	user: any;
}

export interface Point {
	x: number;
	y: number;
}

export interface IsChangedType {
	isChanged?: boolean;
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

export class UserAvatarComponent extends React.Component<Props, State> {

	// editor: AvatarEditor;

	constructor(props: Props) {
		super(props);
		this.state = {
			image: !this.props.user ? 
					DATA.domain + DATA.avatar + '/user.png' 
					: (
						!this.props.user.AvatarImageRef ? 
						DATA.domain + DATA.avatar + '/user.png' 
						:
						DATA.domain + this.props.user.AvatarImageRef.Path
					),
			allowZoomOut: false,
			position: { x: 0.5, y: 0.5 },
			scale: 1,
			rotate: 0,
			borderRadius: 300,
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
		// this.handleSave = 		this.handleSave.bind(this);
		this.b64toBlob = 		this.b64toBlob.bind(this);
		this.makeid = 			this.makeid.bind(this);
		this.imageChange = 		this.imageChange.bind(this);
	}

	// generate random names
	public makeid = () => {
		let text = '';
		let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		for (let index = 0; index < 7; index++) {
			text += possible.charAt(Math.floor( Math.random() * possible.length) );
		}
		return text;
	}

	// convert base64 to file
	public b64toBlob = (b64Data: string = '', sliceSize?: number) => {
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
	public useDefaultImage() {
		this.setState({ image: !this.props.user ? 
			DATA.domain + DATA.avatar + '/user.png' 
			: (
				!this.props.user.AvatarImageRef ? 
				DATA.domain + DATA.avatar + '/user.png' 
				:
				DATA.domain + this.props.user.AvatarImageRef.Path
			) });
	}

	// rotate image to right 
	public handleRotate = (e: any) => {
		this.setState({
			rotate: parseFloat(e.target.value),
		});
	}

	// set cropper to the references
	// public setEditorRef = (editor: any) => {
	// 	if (editor) {
	// 	   this.editor = editor;
	//    	}
	// }

	// add image with dropp
	public handleDrop = (acceptedFiles: any) => {
		this.setState({ image: acceptedFiles[0] });
	}

	// get zoom value fron range
	public handleScale = (e: any) => {
		const scale = parseFloat(e.target.value);
		this.setState({ scale });
	}

	// detect all changes on image ( zoom, rotate )
	public imageChange = () => {
		this.setState({ 
			imageUpdates : {
				isChanged: true,
		}});
	}	

	// add nev image
	public handleNewImage = (e: any) => {
		let imgSrc;
		let reader = new FileReader();
		let that = this;
		reader.readAsDataURL(e.target.files[0]);
		reader.onload = function () {
			// get uploaded image 
			imgSrc = reader.result;
			that.setState({ image: imgSrc});
		};
	}

	// save changes
	// public handleSave = () => {
	// 	// is image is changed (add new, zoom, rotate)
	// 	if ( this.state.imageUpdates.isChanged) {
	// 		// convert to file
	// 		let imageFile = this.b64toBlob(this.editor.getImageScaledToCanvas().toDataURL());

	// 		this.setState({ imageUpdates : {
	// 			isChanged: true,
	// 			newImage: imageFile
	// 		}}, () => {
	// 			// add to EdutProfile component
	// 			this.props.onUpdate(this.state.imageUpdates);
	// 		});
	// 	}
	// }

	public render () {
		// if user is not updated then show loader
		if ( !this.props.user ) {
			return (<Loader/>);
		} else {
			return (
				<div className="user__avatar">
					<div className="user__avatar--blocks">
						<div>
							<h2>Avatar Editor</h2>
								<div>
									{/* <AvatarEditor
										ref={(ref: any) => this.setEditorRef(ref)}
										image={this.state.image}
										width={this.state.width}
										height={this.state.height}
										borderRadius={this.state.borderRadius}
										color={[0, 0, 0, 0.6]} // RGBA
										rotate={this.state.rotate}
										scale={this.state.scale}
										onImageChange={this.imageChange}
									/> */}
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
							<div>
								<br/>
								<button
									name="save"
									// onClick={this.handleSave}
									className="sn_btn"
								>
									Save Avatar
								</button>
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
		user : state.user.user
	};
};

export default connect(
	mapStateToProps
)(UserAvatarComponent);
