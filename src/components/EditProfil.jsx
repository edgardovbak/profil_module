import React, { Component } 		from 'react';
import { connect }              	from 'react-redux';
import UserAvatar 					from './UserAvatar';
import { Link } 					from 'react-router-dom';

class EditProfil extends Component {
	constructor(props) {
        super(props);

        this.onSaveChanges = this.onSaveChanges.bind(this);
	}

	

	onSaveChanges(userInfo) {
        this.props.saveChanges("Loldon Freeman");
    }
	
	render () {

		return (
			<div className="profil">
				<div className="user" >
					<UserAvatar />
					<div className="user__global_info">
						<fieldset>
							<legend>User name</legend>
							<input id="userName" type="text" placeholder="User name" defaultValue={this.props.user.FullName} />
						</fieldset>
						<fieldset>
							<legend>Position</legend>
							<input id="userPosition" type="text" placeholder="Position"  defaultValue={this.props.user.JobTitle} />
						</fieldset>
						<fieldset>
							<legend>User Info</legend>
							<div className="user__edit_global_info">
								<div className="user__edit_global_info__item">
									<label htmlFor="">Email</label>
									<input id="" type="text" placeholder="Email" defaultValue={this.props.user.Email}/>
								</div>
								<div className="user__edit_global_info__item">
									<label htmlFor="">Languages</label>
									<input id="" type="text" placeholder="Languages" defaultValue={this.props.user.Languages}/>
								</div>
								<div className="user__edit_global_info__item">
									<label htmlFor="">Phone</label>
									<input id="" type="text" placeholder="Phone" defaultValue={this.props.user.Phone}/>
								</div>
								<div className="user__edit_global_info__item">
									<label htmlFor="">BirthDate</label>
									<input id="" type="text" placeholder="Phone" defaultValue={this.props.user.BirthDate}/>
								</div>
								<div className="user__edit_global_info__item">
									<label htmlFor="">Education</label>
									<input id="" type="text" placeholder="Phone" defaultValue={this.props.user.Education}/>
								</div>
							</div>
						</fieldset>
					</div>
				</div>

				<fieldset>
					<legend>About</legend>
					<textarea id="userAbout" rows="10" cols="80" defaultValue={this.props.user.Description}>

					</textarea>
				</fieldset>

				<Link to={"user/"+this.props.user.Name} className="sn_btn" onClick={this.onSaveChanges}>
					Save Changes
				</Link>
			</div>
		)
	}
};

const mapStateToProps = (state, match) => {
	return {
	  user : state.user.user
	};
  };

export default connect(
	mapStateToProps,
	{
		saveChanges:  (userInfo) => ({ type: 'SET_USER_INFO', payload: userInfo })
	}
)(EditProfil);
