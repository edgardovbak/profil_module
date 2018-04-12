import * as React							from 'react';
import { connect }              			from 'react-redux';
import AvatarEditor 						from 'react-avatar-editor';
import Dropzone 							from 'react-dropzone';

// save config 
const DATA = require('../config.json');

// default picture 
const defaultAvatar = require('../images/default_avater.svg');

export interface Props {
	userAvatar: string;
	onUpdate: Function;
}

interface ImageUpdates {
    newImage?: 	boolean;
	isChanged?: boolean;
	imageSrc?:	any;
}

export interface State {
	image: 			string;
	allowZoomOut: 	boolean;
	position: 		object;
	scale: 			number;
	rotate: 		number;
	borderRadius: 	number;
	width: 			number;
	height: 		number;
	uploadImage: 	ImageUpdates;
}

class UserAvatar extends React.Component<Props, State> {

	editor: AvatarEditor;

	constructor(props: Props) {
		super(props);
		this.state = {
			// image resource
			image: this.props.userAvatar !== '' ? DATA.domain + this.props.userAvatar : defaultAvatar,
			allowZoomOut: false,
			// image start position
			position: { x: 0.5, y: 0.5 },
			// image default scale
			scale: 1,
			// image default rotate
			rotate: 0,
			// fixed border radius on preview
			borderRadius: 300,
			// fix image width
			width: 300,
			// fix image height
			height: 300,
			// user update image
			uploadImage: {
				newImage: false,
				// detect image changes
				isChanged: false,
				imageSrc: '',
			}
		};

		this.imageChange = this.imageChange.bind(this);
		this.loadSuccess = this.loadSuccess.bind(this);
	}

	// add new image
	handleNewImage = (e: any) => {
		this.setState({ image: e.target.files[0] });
	}

	// zoom picture
	handleScale = (e: any) => {
		const scale = parseFloat(e.target.value);
		this.setState({ scale });
	}

	// rotate picture
	handleRotate = (e: any) => {
		this.setState({ rotate: parseFloat(e.target.value) });
	}

	// drag and drop image 
	handleDrop = (acceptedFiles: any) => {
		this.setState({ image: acceptedFiles[0] });
	}

	// avatar editor callback functions
	loadSuccess(imgInfo: any) {
		this.setState({ uploadImage : {
			newImage: true,
			imageSrc: imgInfo
		}});
		this.props.onUpdate(this.state.uploadImage);
	}

	// rotate picture
	imageReady = (e: any) => {
		console.log(this.editor);
	}
	// detect image changes
	imageChange() {
		this.setState({ uploadImage : {
			isChanged: true,
			imageSrc: this.editor.getImageScaledToCanvas().toDataURL()
		}});
		this.props.onUpdate(this.state.uploadImage);
	}

	setEditorRef = (editor: any) => {
		 if (editor) {
			this.editor = editor;
		}
	}

	render () {
 
		return (
			<div className="user__avatar">
				<Dropzone
					onDrop={this.handleDrop}
					disableClick={true}
					multiple={false}
					style={{marginBottom: '35px' }}
				>
					<div>
						<AvatarEditor
							image={this.state.image}
							width={this.state.width}
							height={this.state.height}
							color={[0, 0, 0, 0.6]} 
							scale={this.state.scale}
							rotate={this.state.rotate}
							borderRadius={this.state.borderRadius}
							onImageChange={this.imageChange}
							ref={(ref) => this.setEditorRef(ref)}
							onImageReady={this.imageReady}
							onLoadSuccess={this.loadSuccess}
							onDropFile={this.loadSuccess}
						/>
					</div>
				</Dropzone>
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
		);
	}
}

const mapStateToProps = (state: any) => {
	// console.log(state.user.user.Avatar._deferred);
	return {
		userAvatar : state.user.user.Avatar._deferred
	};
};

export default connect(
	mapStateToProps
)(UserAvatar);
