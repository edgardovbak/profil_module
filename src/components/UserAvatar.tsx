import * as React							from 'react';
import { connect }              			from 'react-redux';

// save config 
const DATA = require('../config.json');
// default image 
const defaultAvatar = require('../images/default_avater.svg');

class UserAvatar extends React.Component<any, any> {

	render () { 

		let picture = defaultAvatar;
		if ( this.props.userAvatar !== '' ) {
			picture = DATA.domain + this.props.userAvatar;
		}
 
		return (
			<div className="user__avatar">
				<img src={picture} alt={this.props.userName}/>
			</div>
		);
	}
}

const mapStateToProps = (state: any) => {
	return {
		userAvatar :  	'', // state.user.user.Avatar._deferred,
		userName : 		state.user.user.FullName
	};
};

export default connect(
	mapStateToProps
)(UserAvatar);
