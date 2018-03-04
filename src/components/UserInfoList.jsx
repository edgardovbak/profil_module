import React, { Component } from 'react';
import UserInfoListItem from './UserInfoListItem';


class UserInfoList extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render () {
		return (
			<div className="user__global_info__list">
				<div>
					<UserInfoListItem
						name="ghdfgdf" />
				</div>
				<div>
					<UserInfoListItem
						name="sdfsdfsd" />
				</div>
			</div>
		)
	}
};

export default UserInfoList;
