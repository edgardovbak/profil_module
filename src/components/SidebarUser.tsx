import * as React							from 'react';
import { connect }             				from 'react-redux';
import { Link } 							from 'react-router-dom';

const DATA = require('../config.json');

interface Props {
	userName: string;
	user: any;
	fullName: string;
}

export class SidebarUserComponent extends React.Component<Props, any> {
	constructor(props: any) {
        super(props);
        this.state = {
            usName : this.props.fullName,
            usAvatar: '',
		};
		
		this.isEmpty = this.isEmpty.bind(this);
	}
	
	isEmpty = (obj: object) => {
		for (var key in obj) {
			if ( obj.hasOwnProperty(key) ) {
				return false;
			}
		}
		return true;
	}
	
	render () {
		let imageSrc = !this.props.user.AvatarImageRef ? 'empty' : this.props.user.AvatarImageRef.Path ;
			return (
				<Link to={'/user/' + this.props.userName} >
					<div className="sn_sidebar__user">
					{ this.isEmpty(this.props.user) ? 
						(
							<span className="sn_sidebar__user__avatar--default">
								<i className="fi flaticon-user" />
							</span>
						)
					: 
						(
							<img src={DATA.domain + imageSrc} alt={this.props.user.FullName} className="sn_sidebar__user__avatar"/>
						)
					}
						<div className="sn_sidebar__user__name">
							{this.isEmpty(this.props.user) ? this.state.usName : this.props.user.FullName}
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
		user: 				state.user.user
	};
};

export default connect(
	mapStateToProps
)(SidebarUserComponent as any);
