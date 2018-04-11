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
}

class UserAvatar extends React.Component<Props, any> {
	constructor(props: Props) {
		super(props);
		this.state = {
			image: this.props.userAvatar !== '' ? DATA.domain + this.props.userAvatar : defaultAvatar,
			allowZoomOut: false,
			position: { x: 0.5, y: 0.5 },
			scale: 1,
			rotate: 0,
			borderRadius: 300,
			preview: null,
			width: 300,
			height: 300,
		};
	}

	// save croped image
	handleSave = () => {
		// const img = this.editor.getImageScaledToCanvas().toDataURL()
		// const rect = this.editor.getCroppingRect()

		console.log(123);
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
	logCallback(e: any) {
		console.log('callback', e);
		console.log(e.target);
	}

	render () {

		let editorR: any;

		console.log(this.refs.editor);
		console.log(editorR);
 
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
							position={this.state.position}
							borderRadius={this.state.borderRadius}
							
							ref={(editor) => editorR = editor}

							onLoadFailure={this.logCallback.bind(this, 'onLoadFailed')}

							onLoadSuccess={this.logCallback.bind(this, 'onLoadSuccess')}
							  
							onImageReady={this.logCallback.bind(this, 'onImageReady')}
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
	console.log(state.user.user.Avatar._deferred);
	return {
		userAvatar : state.user.user.Avatar._deferred
	};
};

export default connect(
	mapStateToProps
)(UserAvatar);
