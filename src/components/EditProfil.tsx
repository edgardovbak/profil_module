import * as React							from 'react';
import { connect }              			from 'react-redux';
import UserAvatar 							from './UserAvatar';
import { Link } 							from 'react-router-dom';
import { Actions }                			from '@sensenet/redux';
import { PathHelper }                       from '@sensenet/client-utils';
import { CSTUser } 							from '../type/CSTUser';
import Loader 								from './Loader';

// save config 
const DATA = require('../config.json');

export interface Props {
	updateUserSN: 		Function;
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

		if ( !this.props.user ) {
			return (<Loader/>);

		} else {
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

			const onSaveChanges = (e: any) => {
				// if image was changed then 
				if ( this.state.imageIsChanged.isChanged) {
					// firs save picture in sn
					let avatarUpdate = this.props.updateUserAvatar(DATA.avatar, this.state.imageIsChanged.newImage, 'Image');
					// after picture is saved colect the modyfied fields 
					avatarUpdate.then( (result: any) => {
						console.log(result.value.Path);
						// update user avatar fild
						let userWithAvatar = {
							// !important user id
							Id: 			this.props.user.Id,
							AvatarImageRef: result.value.Path
						} as CSTUser;
						// path to current user
						let pathToUser = PathHelper.joinPaths(DATA.ims, this.props.user.Name);
						// update user info in sensenet
						let updateUserSNResponse = this.props.updateUserSN(pathToUser, userWithAvatar);
						updateUserSNResponse.then( (Updateresult: any) => {
							// update user info in redux
							this.props.saveChanges(userWithAvatar);
						});
					});
			
					avatarUpdate.catch((err: any) => {
						console.log(err);
					});
				}
				
				// get all changed fields
				let user = {
					// !important user id
					Id: 			this.props.user.Id,
					FullName: 		FullNameInput.value,
					JobTitle: 		JobTitleInput.value,
					Email: 			EmailInput.value,
					Languages: 		LanguagesInput.value,
					Phone: 			PhoneInput.value,
					BirthDate: 		BirthDateInput.value,
					Education: 		EducationInput.value,
					Description: 	DescriptionInput.value,
					
				} as CSTUser;

				// and update user info in sensenet app
				let path = PathHelper.joinPaths(DATA.ims, this.props.user.Name);
				userUpdate = this.props.updateUserSN(path, user);
				
				userUpdate.then( (Updateresult: any) => {
					// if update in sn is soccess then save changes in redux
					this.props.saveChanges(user);
				});
		
				userUpdate.catch((err: any) => {
					// else show error
					console.log(err);
				});
				
			};

			return (
				
				<div className="profil">

					<div className="user" >
						<UserAvatar 
							onUpdate={this.onUpdateImageChanges}
						/>
						<div className="user__global_info">
							<h2>User Info</h2>
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
					
					<Link to={'user/:' + this.props.user.Name} className="sn_btn" onClick={e => { onSaveChanges(e); }}>
						Save Changes
					</Link>
				</div>
			);
		}
	}
}

const mapStateToProps = (state: any, match: any) => {
	return {
	  user : 			state.user.user,
	};
};

export default connect(
	mapStateToProps,
	(dispatch) => ({
		// save to redux
		saveChanges:  			(userInfo: any) => dispatch({ type: 'SET_USER_INFO', payload: userInfo }),
		// seva to sensenet
		updateUserSN:    		(path: string, options: CSTUser) => dispatch(Actions.updateContent( path, options )),
		// save image to Avatar folder
		updateUserAvatar:  		(parentPath: any, file: any, contentType: string) => dispatch(Actions.uploadRequest( parentPath, file, contentType)),
	})
)(EditProfil);
