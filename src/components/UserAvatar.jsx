import React, { Component } 				from 'react';
import default_avatar 						from '../images/default_avater.svg';
import { connect }              			from 'react-redux';
import DATA                                 from '../config.json';

class UserAvatar extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render () { 

		
		let picture = default_avatar;
		if ( this.props.userAvatar !== "" ) {
			
			picture = DATA.domain + this.props.userAvatar
		}

		

		return (
			<div className="user__avatar">
				<img src={picture} alt={this.props.userName}/>
			</div>
		)
	}
};

const mapStateToProps = (state) => {
	return {
		userAvatar :  	state.userImage.userImageSRC,
		userName : 		state.user.user.FullName
	};
};

export default connect(
	mapStateToProps
)(UserAvatar);
