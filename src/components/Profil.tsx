import * as React				 	from 'react';
import { connect }              	from 'react-redux';
import Title 						from './Title';
import Skils 						from './Skils';
import About 						from './About';
import UserInfoListItem 			from './UserInfoListItem';
import { Link } 					from 'react-router-dom';

// save config 
const DATA = require('../config.json');

// default picture 
const defaultAvatar = require('../images/default_avater.svg');

class Profil extends React.Component<any, any> {
	
	render () {
		// phone number 
		let PhoneNumber;
		if ( !(this.props.user.Phone === '')) {
			PhoneNumber = (
			<UserInfoListItem
				name="Phone"
				infoType={0}
				value={this.props.user.Phone} 
			/>);
		} 

		return (
			<div className="profil">
				<div className="user" >
					<div className="user__avatar">
						<img 
							src={this.props.user.Avatar._deferred !== '' ? DATA.domain + this.props.user.Avatar._deferred : defaultAvatar} 
							alt={this.props.user.FullName}
						/>
					</div>
					<div className="user__global_info">
						<h2 className="sn_title sn_title--description">
							{this.props.user.FullName}
							<Link to="/edituser" className="sn_btn">
								Edit profile
							</Link>
						</h2>
						<div className="user__global_info__position">
							{this.props.user.JobTitle}
						</div>
						<div className="user__global_info__list">
							<div>
								<UserInfoListItem
									name="Email"
									infoType={1}
									value={this.props.user.Email} 
								/>
								<UserInfoListItem
									name="WorkPhone"
									infoType={0}
									value={this.props.user.WorkPhone} 
								/>
								
								{PhoneNumber}
			
								<UserInfoListItem
									name="Skype"
									infoType={1}
									value={this.props.user.Skype} 
								/>
								<UserInfoListItem
									name="Linkedin"
									infoType={1}
									value={this.props.user.Linkedin} 
								/>
								<UserInfoListItem
									name="GitHub"
									infoType={1}
									value={this.props.user.GitHub} 
								/>
							</div>
							<div>
								<UserInfoListItem
									name="Languages"
									infoType={0}
									value={this.props.user.Languages} 
								/>
								<UserInfoListItem
									name="Education"
									infoType={0}
									value={this.props.user.Education} 
								/>
								<UserInfoListItem
									name="BirthDate"
									infoType={2}
									value={this.props.user.BirthDate} 
								/>
							</div>
						</div>
					</div>
				</div>
				
				<Title name="Skils"/>
				<Skils skills={'' + this.props.user.Skills} />

				<Title name="About" />
				<About about={this.props.user.Description} />

			</div>
		);
	}
}

const mapStateToProps = (state: any, match: any) => {
	return {
	  userName : state.sensenet.session.user.userName,
	  user : state.user.user
	};
};

export default connect(
	mapStateToProps
)(Profil);
