import React, { Component } 	from 'react';
import { connect }              from 'react-redux';
import Title 					from './Title';
import Avatar 					from './Avatar';
import UserInfoList 			from './UserInfoList';
import Skils 					from './Skils';
import About 					from './About';

class Profil extends Component {
	render () {
		return (
			<div className="profil">
				<div className="user" >
					<Avatar />
					<div className="user__global_info">
						<h2 className="title title--description">
							{this.props.userName}
							<button className="btn" onClick={this.props.action} >
								Edit profile
							</button>
						</h2>
						<div className="user__global_info__position">
							lol
						</div>
						<UserInfoList />
					</div>
				</div>

				<Title name="gff"/>
				<Skils />

				<Title name="klk" />
				<About about="gfhgfhgfh" />


				<Title name="dfgd" />
			</div>
		)
	}
};

const mapStateToProps = (state, match) => {
	return {
	  userName : state.sensenet.session.user.userName,
	  userAvatar : '',
	};
  };

export default connect(
	mapStateToProps,
{})(Profil);