import React, { Component } from 'react';

class UserInfoListItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name : "List"
		};
	}

	render () {
		let userValue;
		if (this.props.link) {
			userValue = (
				<a href="/">
					{this.props.value}
				</a>
			);
		} else {
			userValue = this.props.value;
		}

		return (
			<div className="user__global_info__list__item">
				<div>
					{this.props.name} :
				</div>
				<div>
					{userValue}
				</div>
			</div>
		)
	}
};

export default UserInfoListItem;
