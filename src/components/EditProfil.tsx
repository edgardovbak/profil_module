import * as React							from 'react';
import { connect }              			from 'react-redux';
import UserAvatar 							from './UserAvatar';
import { Link } 							from 'react-router-dom';
import { Actions }                			from '@sensenet/redux';
import { PathHelper }                       from '@sensenet/client-utils';

// save config 
const DATA = require('../config.json');
const atob = require('atob');

// const defaultAvatar = require('../images/default_avater.svg');

export interface Props {
	updateUser: 		Function;
	saveChanges:  		Function;
	updateUserAvatar:	Function;
	user: 				any;
}

class EditProfil extends React.Component<Props, any> {

	constructor(props: any) {
		super(props);
		this.state = {
			imageIsChanged: {
				newImage: false,
				// detect image changes
				isChanged: false,
				imageBase64: '',
			},
		};
		this.b64toBlob = this.b64toBlob.bind(this);
	}

	b64toBlob(b64Data: any, contentType: any, sliceSize: any) {
		contentType = contentType || '';
		sliceSize = sliceSize || 512;

		// let byteCharacters = atob(b64Data);
		let byteArrays = [];
		var byteCharacters = atob(b64Data);

		for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
			let slice = byteCharacters.slice(offset, offset + sliceSize);

			let byteNumbers = new Array(slice.length);
			for (let i = 0; i < slice.length; i++) {
				byteNumbers[i] = slice.charCodeAt(i);
			}

			let byteArray = new Uint8Array(byteNumbers);
			
			byteArrays.push(byteArray);
		}

		let blob: Blob = new Blob(byteArrays, { type: contentType });
		let nFile = new File([blob], 'lol.png', { type: contentType });
		console.log(nFile);
		// return blob;
		return nFile;
	}

	onUpdateImageChanges = (val: any) => {
		this.setState({
			imageIsChanged: {
				newImage: val.newImage,
				isChanged: val.isChanged,
				imageBase64: val.imageSrc,
			}
		});
		console.log(this.state.imageIsChanged.imageBase64);
	}

	render () {
		// *********************************************
		// user info 
		let FullNameInput: 			HTMLInputElement;
		let JobTitleInput: 			HTMLInputElement;
		let EmailInput: 			HTMLInputElement;
		let LanguagesInput: 		HTMLInputElement;
		let PhoneInput: 			HTMLInputElement;
		let BirthDateInput: 		HTMLInputElement;
		let EducationInput: 		HTMLInputElement;
		let DescriptionInput: 		HTMLTextAreaElement;
		// *********************************************

		let userUpdate: any;

		// let image = '';
		// if ( this.state.imageIsChanged.newImage && this.state.imageIsChanged.isChanged ) {
		// 	image = this.state.imageIsChanged.imageSource;
		// }

		const onSaveChanges = (e: any) => {
			let user = {
				FullName: 		FullNameInput.value,
				JobTitle: 		JobTitleInput.value,
				Email: 			EmailInput.value,
				Languages: 		LanguagesInput.value,
				Phone: 			PhoneInput.value,
				BirthDate: 		BirthDateInput.value,
				Education: 		EducationInput.value,
				Description: 	DescriptionInput.value,
				// ImageData:		image,
			};
			
			// update user info in sensenet app
			let path = PathHelper.joinPaths(DATA.ims, this.props.user.Name);
			this.props.saveChanges(user);
			userUpdate = this.props.updateUser(path, user);
			
			userUpdate.then( (result: any) => {
				console.log('Update success');
			});
	
			userUpdate.catch((err: any) => {
				console.log('Error success');
			});

			// Split the base64 string in data and contentType
			let block = this.state.imageIsChanged.imageBase64.split(';');
			// Get the content type of the image
			let contentType = block[0].split(':')[1]; // In this case "image/gif"
			// get the real base64 content of the file
			let realData = block[1].split(',')[1]; // In this case "R0lGODlhPQBEAPeoAJosM....",

			let imageBlob = this.b64toBlob(realData, contentType, 512);
			console.log(imageBlob);
			
			this.props.updateUserAvatar('/Root/Sites/Profil/Avatar', imageBlob, 'Image');
			// console.log(imageBlob);
		};

		return (
			<div className="profil">
				<div className="user" >
					<UserAvatar 
						onUpdate={this.onUpdateImageChanges}
					/>
					<div className="user__global_info">
						<fieldset>
							<legend>User name</legend>
							<input 
								id="userName" 
								type="text" 
								ref={(input) => FullNameInput = input as HTMLInputElement} 
								placeholder="User name" 
								defaultValue={this.props.user.FullName}
								required={true}
							/>
						</fieldset>
						<fieldset>
							<legend>Position</legend>
							<input 
								id="userPosition" 
								type="text" 
								ref={(input) => JobTitleInput = input as HTMLInputElement} 
								placeholder="Position"  
								defaultValue={this.props.user.JobTitle}
								required={true}
							/>
						</fieldset>
						<fieldset>
							<legend>User Info</legend>
							<div className="user__edit_global_info">
								<div className="user__edit_global_info__item">
									<label htmlFor="">Email</label>
									<input 
										id="" 
										type="text" 
										ref={(input) => EmailInput = input as HTMLInputElement} 
										placeholder="Email" 
										defaultValue={this.props.user.Email}
										required={true}
									/>
								</div>
								<div className="user__edit_global_info__item">
									<label htmlFor="">Languages</label>
									<input 
										id="" 
										type="text" 
										ref={(input) => LanguagesInput = input as HTMLInputElement} 
										placeholder="Languages" 
										defaultValue={this.props.user.Languages}
									/>
								</div>
								<div className="user__edit_global_info__item">
									<label htmlFor="">Phone</label>
									<input 
										id="" 
										type="text" 
										ref={(input) => PhoneInput = input as HTMLInputElement} 
										placeholder="Phone" 
										defaultValue={this.props.user.Phone}
									/>
								</div>
								<div className="user__edit_global_info__item">
									<label htmlFor="">BirthDate</label>
									<input 
										id="" 
										type="text" 
										ref={(input) => BirthDateInput = input as HTMLInputElement} 
										placeholder="BirthDate" 
										defaultValue={this.props.user.BirthDate}
									/>
								</div>
								<div className="user__edit_global_info__item">
									<label htmlFor="">Education</label>
									<input 
										id="" 
										type="text" 
										ref={(input) => EducationInput = input as HTMLInputElement} 
										placeholder="Education" 
										defaultValue={this.props.user.Education}
									/>
								</div>
							</div>
						</fieldset>
					</div>
				</div>

				<fieldset>
					<legend>About</legend>
					<textarea id="userAbout" ref={(input) => {DescriptionInput = input as HTMLTextAreaElement; }} defaultValue={this.props.user.Description} />
				</fieldset>

				{/* <button className="sn_btn" onClick={e => { onSaveChanges(e); }}>
					Save Changes
				</button> */}
				
				<Link to={'user:' + this.props.user.Name} className="sn_btn" onClick={e => { onSaveChanges(e); }}>
					Save Changes
				</Link>
			</div>
		);
	}
}

const mapStateToProps = (state: any, match: any) => {
	return {
	  user : 			state.user.user,
	  userAvatar :  	state.user.user.Avatar._deferred,
	};
  };

export default connect(
	mapStateToProps,
	(dispatch) => ({
		saveChanges:  			(userInfo: any) => dispatch({ type: 'SET_USER_INFO', payload: userInfo }),
		updateUser:    			(path: string, options: any) => dispatch(Actions.updateContent( path, options )),
		updateUserAvatar:  		(parentPath: string, file: any, contentType: string) => dispatch(Actions.uploadRequest( parentPath, file, contentType)),
	})
)(EditProfil);
