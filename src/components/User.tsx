import * as React							from 'react';
import { connect }             				from 'react-redux';
import { Link } 							from 'react-router-dom';

const DATA = require('../config.json');

class User extends React.Component<any, any> {

	render () {
		return (
			<Link to={'/user:' + this.props.userName} >
				<div className="sn_sidebar__user">
				{ this.props.userAvatar !== '' ? 
					(<img src={DATA.domain + this.props.userAvatar} alt={this.props.userName} className="sn_sidebar__user__avatar"/>)
				: 
					(
						<span className="sn_sidebar__user__avatar--default">
							<i className="fi flaticon-user" />
						</span>
					)
				}
					<div className="sn_sidebar__user__name">
						{this.props.userFullName}
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
		userFullName: 		state.sensenet.session.user.fullName
	};
};

export default connect(
	mapStateToProps
)(User);
