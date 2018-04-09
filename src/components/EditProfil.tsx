import * as React					from 'react';
import { connect }              	from 'react-redux';
import UserAvatar 					from './UserAvatar';
import { Link } 					from 'react-router-dom';

class EditProfil extends React.Component<any, any> {

	private FullName: 		HTMLInputElement;
	private JobTitle: 		HTMLInputElement;
	private Email: 			HTMLInputElement;
	private Languages: 		HTMLInputElement;
	private Phone: 			HTMLInputElement;
	private BirthDate: 		HTMLInputElement;
	private Education: 		HTMLInputElement;
	private Description: 	HTMLInputElement;

	constructor(props: any) {
		// @ts-ignore
		super(props);

		this.onSaveChanges = this.onSaveChanges.bind(this);
	}

	onSaveChanges(userInfo: any) {
        this.props.saveChanges('Loldon Freeman');
    }
	
	render () {

		console.log(this.FullName);
		console.log(this.JobTitle);
		console.log(this.Email);
		console.log(this.Languages);
		console.log(this.Phone);
		console.log(this.BirthDate);
		console.log(this.Education);
		console.log(this.Description);

		return (
			<div className="profil">
				<div className="user" >
					<UserAvatar />
					<div className="user__global_info">
						<fieldset>
							<legend>User name</legend>
							<input id="userName" type="text" ref={(input) => { this.FullName = input as any; }} placeholder="User name" defaultValue={this.props.user.FullName} />
						</fieldset>
						<fieldset>
							<legend>Position</legend>
							<input id="userPosition" type="text" ref={(input) => { this.JobTitle = input as any; }} placeholder="Position"  defaultValue={this.props.user.JobTitle} />
						</fieldset>
						<fieldset>
							<legend>User Info</legend>
							<div className="user__edit_global_info">
								<div className="user__edit_global_info__item">
									<label htmlFor="">Email</label>
									<input id="" type="text" ref={(input) => { this.Email = input as any; }} placeholder="Email" defaultValue={this.props.user.Email}/>
								</div>
								<div className="user__edit_global_info__item">
									<label htmlFor="">Languages</label>
									<input id="" type="text" ref={(input) => { this.Languages = input as any; }} placeholder="Languages" defaultValue={this.props.user.Languages}/>
								</div>
								<div className="user__edit_global_info__item">
									<label htmlFor="">Phone</label>
									<input id="" type="text" ref={(input) => { this.Phone = input as any; }} placeholder="Phone" defaultValue={this.props.user.Phone}/>
								</div>
								<div className="user__edit_global_info__item">
									<label htmlFor="">BirthDate</label>
									<input id="" type="text" ref={(input) => { this.BirthDate = input as any; }} placeholder="Phone" defaultValue={this.props.user.BirthDate}/>
								</div>
								<div className="user__edit_global_info__item">
									<label htmlFor="">Education</label>
									<input id="" type="text" ref={(input) => { this.Education = input as any; }} placeholder="Phone" defaultValue={this.props.user.Education}/>
								</div>
							</div>
						</fieldset>
					</div>
				</div>

				<fieldset>
					<legend>About</legend>
					<textarea id="userAbout" ref={(input) => { this.Description = input as any; }} defaultValue={this.props.user.Description} />
				</fieldset>

				<Link to={'user/' + this.props.user.Name} className="sn_btn" onClick={this.onSaveChanges}>
					Save Changes
				</Link>
			</div>
		);
	}
}

const mapStateToProps = (state: any, match: any) => {
	return {
	  user : state.user.user
	};
  };

export default connect(
	mapStateToProps,
	{
		saveChanges:  (userInfo: any) => ({ type: 'SET_USER_INFO', payload: userInfo })
	}
)(EditProfil);
