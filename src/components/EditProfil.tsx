import * as React							from 'react';
import { connect }              			from 'react-redux';
import UserAvatar 							from './UserAvatar';
import { Link } 							from 'react-router-dom';
import { Actions }                			from '@sensenet/redux';
import { PathHelper }                       from '@sensenet/client-utils';
import { User } 							from '@sensenet/default-content-types';
// import { IODataParams } 					from '@sensenet/client-core/dist/Models/IODataParams';

// save config 
const DATA = require('../config.json');

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
			imageIsChanged: ''
		};
	}

	onUpdateImageChanges = (val: any) => {
		this.setState({
			imageIsChanged: val
		});
	}

	render () {
		console.log(this.state.imageIsChanged);
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
				Id: 			this.props.user.Id,
				FullName: 		FullNameInput.value,
				JobTitle: 		JobTitleInput.value,
				Email: 			EmailInput.value,
				Languages: 		LanguagesInput.value,
				Phone: 			PhoneInput.value,
				BirthDate: 		BirthDateInput.value,
				Education: 		EducationInput.value,
				Description: 	DescriptionInput.value,
				ImageRef: 	 	5736
			} as User;

			// console.log(this.state.imageIsChanged.name);

			// update user info in sensenet app
			let path = PathHelper.joinPaths(DATA.ims, this.props.user.Name);
			
			userUpdate = this.props.updateUser(path, user);
			
			userUpdate.then( (result: any) => {
				console.log('Update success');
			});
	
			userUpdate.catch((err: any) => {
				console.log('Error success');
			});

			this.props.updateUserAvatar('/Root/Sites/Profil/Avatar', this.state.imageIsChanged, 'Image');

			// this.props.saveChanges(user);
			
		};

		return (
			<div className="profil">

				<UserAvatar 
					onUpdate={this.onUpdateImageChanges}
				/>

				<div className="user" >
					
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
		// saveChanges:  			(userInfo: any) => dispatch({ type: 'SET_USER_INFO', payload: userInfo }),
		updateUser:    			(path: string, options: User) => dispatch(Actions.updateContent( path, options )),
		updateUserAvatar:  		(parentPath: string, file: any, contentType: string) => dispatch(Actions.uploadRequest( parentPath, file, contentType)),
	})
)(EditProfil);
