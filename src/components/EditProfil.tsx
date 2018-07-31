import * as React							from 'react';
import { connect }              			from 'react-redux';
import UserAvatar 							from './UserAvatar';
import { Link } 							from 'react-router-dom';
import { Actions }                			from '@sensenet/redux';
// import { PathHelper }                       from '@sensenet/client-utils';
import { CSTUser } 							from '../type/CSTUser';
import Loader 								from './Loader';

// for datepicker 
import * as moment 							from 'moment';
import DatePicker 							from 'react-datepicker';
import { Moment } 							from 'moment';
import 										'react-datepicker/dist/react-datepicker.css';

import SkilllsEdit                          from './SkilllsEdit';

// save config 
const DATA = require('../config.json');

export interface Props {
	updateUserSN: 		(path: string, options: CSTUser) => Promise<{
		action: any;
		result: any;
	}>;
	saveChanges:  		(userInfo: CSTUser) => Promise<{
		entities: any;
		result: any;
	}>;
	updateUserAvatar:	(parentPath: string, file: any, contentType?: any) => Promise<{
		action: any;
		value: any;
	}>;
	user: any;
}

export interface ImageUpdate {
	isChanged?: boolean;
	newImage?: any;
}

export interface State {
	imageIsChanged: ImageUpdate;
	userName: string;
	userPosition: string;
	userEmail: string;
	userLanguages: string;
	userPhone: string;
	userBirthDate: Moment;
	userEducation: string;
	userAbout: string;
}

export class EditProfilComponent extends React.Component<Props, State> {

	constructor(props: any) {
		super(props);
		this.state = {
			imageIsChanged: {
				isChanged: false,
				newImage: ''
			},
			userName: this.props.user.FullName,
			userPosition: this.props.user.JobTitle,
			userEmail: this.props.user.Email,
			userLanguages: this.props.user.Languages,
			userPhone: this.props.user.Phone,
			userBirthDate: moment(this.props.user.BirthDate),
			userEducation: this.props.user.Education,
			userAbout: this.props.user.Description
		};
		this.onSaveChanges = 		this.onSaveChanges.bind(this);
		this.changeHandler = 		this.changeHandler.bind(this);
	}

	// get value about user avatar
	// newImage : avatar is changed
	onUpdateImageChanges = (val: any) => {
		this.setState({
			imageIsChanged: val
		});
	}

	public changeHandler = (e: any) => {
		// save birthDate changes
		if ( e._isAMomentObject === true) {
			this.setState({
				userBirthDate: e
			});
		} else {
			switch (e.target.name) {
				case 'userName':
					this.setState({
						userName: e.target.value
					});
					break;
				case 'userPosition':
					this.setState({
						userPosition: e.target.value
					});
					break;
				case 'userEmail':
					this.setState({
						userEmail: e.target.value
					});
					break;
				case 'userLanguages':
					this.setState({
						userLanguages: e.target.value
					});
					break;
				case 'userPhone':
					this.setState({
						userPhone: e.target.value
					});
					break;
				case 'userEducation':
					this.setState({
						userEducation: e.target.value
					});
					break;
				case 'userAbout':
					this.setState({
						userAbout: e.target.value
					});
					break;
				default:
					break;
			}
		}
	}

	public async onSaveChanges(e: any) {
		let imageRef;
		// if image was changed then 
		if ( this.state.imageIsChanged.isChanged) {
			// firs save picture in sn
			let avatarUpdate = await this.props.updateUserAvatar(DATA.avatar, this.state.imageIsChanged.newImage, 'Image');
			
			imageRef = avatarUpdate.value.Path;
		} else {
			imageRef = '';
		}
		// get all changed fields
		let user = {
			// !important user id
			Id: 			this.props.user.Id,
			Name: 			this.props.user.Name,
			Path:			this.props.user.Path,
			Type: 			'User',
			FullName: 		this.state.userName,
			JobTitle: 		this.state.userPosition,
			Email: 			this.state.userEmail,
			Languages: 		this.state.userLanguages,
			Phone: 			this.state.userPhone,
			BirthDate: 		this.state.userBirthDate.utc().format(),
			Education: 		this.state.userEducation,
			Description: 	this.state.userAbout,
			AvatarImageRef: imageRef
			
		} as CSTUser;
		// and update user info in sensenet app
		console.log(user);
		let path = DATA.ims + '(\'' + this.props.user.Name + '\')';
		let userUpdate = await this.props.updateUserSN(path, user);
		if ( userUpdate.action.type === 'UPDATE_CONTENT_SUCCESS') {
			console.log('success');	
			let up = await this.props.saveChanges(user);
			console.log(up);	
		}
	}

	render () {
		// if user is empty or not downloaded
		if ( !this.props.user ) {
			return (<Loader/>);
		} else {

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
									name="userName" 
									type="text" 
									placeholder="User name" 
									defaultValue={this.props.user.FullName}
									required={true}
									onChange={this.changeHandler}
								/>
							</fieldset>
							<fieldset>
								<legend>Position</legend>
								<input 
									name="userPosition" 
									type="text" 
									placeholder="Position"  
									defaultValue={this.props.user.JobTitle}
									required={true}
									onChange={this.changeHandler}
								/>
							</fieldset>
							<fieldset>
								<legend>User Info</legend>
								<div className="user__edit_global_info">
									<div className="user__edit_global_info__item">
										<label htmlFor="">Email</label>
										<input 
											name="userEmail" 
											type="text" 
											placeholder="Email" 
											defaultValue={this.props.user.Email}
											required={true}
											onChange={this.changeHandler}
										/>
									</div>
									<div className="user__edit_global_info__item">
										<label htmlFor="">Languages</label>
										<input 
											name="userLanguages" 
											type="text" 
											placeholder="Languages" 
											defaultValue={this.props.user.Languages}
											onChange={this.changeHandler}
										/>
									</div>
									<div className="user__edit_global_info__item">
										<label htmlFor="">Phone</label>
										<input 
											name="userPhone" 
											type="number" 
											placeholder="Phone" 
											defaultValue={this.props.user.Phone}
											onChange={this.changeHandler}
										/>
									</div>
									<div className="user__edit_global_info__item">
										<label htmlFor="">BirthDate</label>
										<DatePicker
											selected={this.state.userBirthDate}
											onChange={this.changeHandler}
											placeholderText="Click to select a date"
											className="user__edit_global_info--datepicker"
											locale="en-gb"
											showMonthDropdown={true}
											showYearDropdown={true}
											dateFormatCalendar="MMMM"
											scrollableYearDropdown={true}
											yearDropdownItemNumber={45}
										/>
									</div>
									<div className="user__edit_global_info__item">
										<label htmlFor="">Education</label>
										<input 
											name="userEducation" 
											type="text" 
											placeholder="Education" 
											defaultValue={this.props.user.Education}
											onChange={this.changeHandler}
										/>
									</div>
								</div>
							</fieldset>
						</div>
					</div>

					<fieldset>
						<legend>About</legend>
						<textarea name="userAbout" defaultValue={this.props.user.Description} onChange={this.changeHandler}/>
					</fieldset>

					<fieldset>
						<legend>Skills</legend>
						<SkilllsEdit />
					</fieldset>
					
					<Link to={'user/' + this.props.user.Name} className="sn_btn" onClick={e => { this.onSaveChanges(e); }}>
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
		saveChanges:  			(userInfo: CSTUser) => dispatch({ type: 'SET_USER_INFO', payload: userInfo }),
		// seva to sensenet
		updateUserSN:    		(path: string, options: CSTUser) => dispatch(Actions.updateContent( path, options )),
		// save image to Avatar folder
		updateUserAvatar:  		(parentPath: string, file: any, contentType: string) => dispatch(Actions.uploadRequest( parentPath, file, contentType)),
	})
)(EditProfilComponent);
