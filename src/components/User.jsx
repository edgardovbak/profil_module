import React, { Component } 				from 'react';
import { connect }             				from 'react-redux';
import default_avatar 						from '../images/default_avater.svg';
import { Link } 							from 'react-router-dom';
import DATA                                 from '../config.json';

class User extends Component {

	render () {

		return (
			<Link to={"/user/"+this.props.userName} >
				<div className="sn_sidebar__user">
				{ this.props.userAvatar !== "" ? 
					(<img src={DATA.domain + this.props.userAvatar} alt={this.props.userName} className="sn_sidebar__user__avatar"/>)
				: 
					(<span className="sn_sidebar__user__avatar--default">
						<i className="fi flaticon-user"></i>
					</span>)
				}
					<div className="sn_sidebar__user__name">
						{this.props.userName}
					</div>
				</div>
			</Link>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		userAvatar : 	state.userImage.userImageSRC,
		userName : 		state.sensenet.session.user.userName,
	};
};

export default connect(
	mapStateToProps
)(User);
