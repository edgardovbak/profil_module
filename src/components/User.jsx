import React, { Component } 		from 'react';
import { connect }              from 'react-redux';
import default_avater 					from '../images/default_avater.svg';

class User extends Component {
	constructor(props) {
		super(props);
		this.state = {
			avatar : "images/user.png",
		};
	}

	render () {
		return (
			<div className="sidebar__user">
				<img src={default_avater} alt="" className="sidebar__user__avatar"/>
				<div className="sidebar__user__name">
					{this.props.userName}
				</div>
			</div>
		);
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
{})(User);