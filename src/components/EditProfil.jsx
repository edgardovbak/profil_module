import React, { Component } from 'react';
import Avatar from './Avatar';

class EditProfil extends Component {
	render () {

		let user_info = this.props.user.infoList.map((info, index) =>
			<div key={index} className="user__edit_global_info__item">
				<label htmlFor="">{info.name}</label>
				<input id="" type="text" placeholder={info.name} defaultValue={info.value}/>
			</div>
		);

		return (
			<div className="profil">
				<div className="user" >
					<Avatar />
					<div className="user__global_info">
						<fieldset>
							<legend>User name</legend>
							<input id="userName" type="text" placeholder="User name" defaultValue={this.props.user.name} />
						</fieldset>
						<fieldset>
							<legend>Position</legend>
							<input id="userPosition" type="text" placeholder="Position"  defaultValue={this.props.user.position} />
						</fieldset>
						<fieldset>
							<legend>User Info</legend>
							<div className="user__edit_global_info">
								{user_info}
							</div>
						</fieldset>
					</div>
				</div>

				<fieldset>
					<legend>{this.props.user.aboutTitle}</legend>
					<textarea id="userAbout" rows="10" cols="80" defaultValue={this.props.user.about}>

					</textarea>
				</fieldset>


				<button className="btn" onClick={this.props.action} >
					Save Changes
				</button>
			</div>
		)
	}
};

export default EditProfil;
