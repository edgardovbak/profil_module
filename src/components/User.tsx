import * as React							from 'react';
import { connect }             				from 'react-redux';
import { Link } 							from 'react-router-dom';

const DATA = require('../config.json');

interface Props {
	userName: string;
	user: any;
	userAvatar: string;
	fullName: string;
}

class User extends React.Component<Props, any> {

	isEmpty(myObject: any) {
		for (var key in myObject) {
			if (myObject.hasOwnProperty(key)) {
				return false;
			}
		}
		return true;
	}
	
	render () {

		let usName = this.props.fullName;
		let usAvatar = this.props.userAvatar;
		if ( !this.isEmpty(this.props.user) ) {
			usName = this.props.user.user.FullName;
			usAvatar = this.props.user.user.Avatar._deferred;
			console.log(usAvatar);
		} 
		
		return (
			<Link to={'/user/:' + this.props.userName} >
				<div className="sn_sidebar__user">
				{ usAvatar !== '' ? 
					(<img src={DATA.domain + usAvatar} alt={usName} className="sn_sidebar__user__avatar"/>)
				: 
					(
						<span className="sn_sidebar__user__avatar--default">
							<i className="fi flaticon-user" />
						</span>
					)
				}
					<div className="sn_sidebar__user__name">
						{usName}
					</div>
				</div>
			</Link>
		);
	}
}

const mapStateToProps = (state: any) => {
	return {
		userAvatar: 		'', // state.user.user.Avatar._deferred,
		userName: 			state.sensenet.session.user.userName, // state.user.user.FullName,
		fullName: 			state.sensenet.session.user.fullName, 
		user: 				state.user
	};
};

export default connect(
	mapStateToProps
)(User as any);
