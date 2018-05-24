import * as React							from 'react';
import { connect }             				from 'react-redux';
import { Link } 							from 'react-router-dom';

const DATA = require('../config.json');

interface Props {
	userName: string;
	user: any;
	fullName: string;
}

class SidebarUser extends React.Component<Props, any> {
	constructor(props: any) {
        super(props);
        this.state = {
            usName : this.props.fullName,
            usAvatar: '',
        },

        this.isEmpty = this.isEmpty.bind(this);
    }

	isEmpty(myObject: any) {
		for (var key in myObject) {
			if (myObject.hasOwnProperty(key)) {
				return false;
			}
		}
		return true;
	}
	
	render () {

		if ( !this.isEmpty(this.props.user) && this.props.user.user.AvatarImageRef ) {
			this.setState({
				usName: this.props.user.user.FullName,
				usAvatar: this.props.user.user.AvatarImageRef.Path
			});
		} 
		
		return (
			<Link to={'/user/:' + this.props.userName} >
				<div className="sn_sidebar__user">
				{ this.state.usAvatar !== '' ? 
					(<img src={DATA.domain + this.state.usAvatar} alt={this.state.usName} className="sn_sidebar__user__avatar"/>)
				: 
					(
						<span className="sn_sidebar__user__avatar--default">
							<i className="fi flaticon-user" />
						</span>
					)
				}
					<div className="sn_sidebar__user__name">
						{this.state.usName}
					</div>
				</div>
			</Link>
		);
	}
}

const mapStateToProps = (state: any) => {
	return {
		userName: 			state.sensenet.session.user.userName, // state.user.user.FullName,
		fullName: 			state.sensenet.session.user.fullName, 
		user: 				state.user
	};
};

export default connect(
	mapStateToProps
)(SidebarUser as any);
