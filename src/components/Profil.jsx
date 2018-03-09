import React, { Component } 		from 'react';
import { connect }              	from 'react-redux';
import Title 						from './Title';
import Avatar 						from './Avatar';
import Skils 						from './Skils';
import About 						from './About';
import UserInfoListItem 			from './UserInfoListItem';
import { Link } 					from 'react-router-dom'

class Profil extends Component {
	render () {
		console.log(this.props.user);
		return (
			<div className="profil">
				<div className="user" >
					<Avatar />
					<div className="user__global_info">
						<h2 className="title title--description">
							{this.props.user.FullName}
							<Link to="/edituser" className="btn">
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
									value={this.props.user.Email} />
								<UserInfoListItem
									name="Phone"
									infoType={0}
									value={this.props.user.Phone} />
							</div>
							<div>
								<UserInfoListItem
									name="Languages"
									infoType={0}
									value={this.props.user.Languages} />
								<UserInfoListItem
									name="Education"
									infoType={0}
									value={this.props.user.Education} />
								<UserInfoListItem
									name="BirthDate"
									infoType={2}
									value={this.props.user.BirthDate} />
							</div>
						</div>
					</div>
				</div>

				<Title name="Skils"/>
				<Skils skills={""+this.props.user.Skills}/>

				<Title name="About" />
				<About about={this.props.user.Description} />


				<Title name="dfgd" />
			</div>
		)
	}
};

const mapStateToProps = (state, match) => {
	return {
	  userName : state.sensenet.session.user.userName,
	  userAvatar : '',
	  user : state.user.user
	};
  };

export default connect(
	mapStateToProps,
{})(Profil);
