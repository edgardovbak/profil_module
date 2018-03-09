import React, { Component } from 'react';
import Timestamp 			from 'react-timestamp';

class UserInfoListItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name : "List"
		};
	}

	render () {
		let userValue;
		switch (this.props.infoType) {
			case 0:
				userValue = this.props.value;
				break;
			
			case 1:
				userValue = (
					<a href="/">
						{this.props.value}
					</a>
				);
				break;

			case 2:
				userValue = <Timestamp time={this.props.value} utc={false} format='date' precision={2}/>;
				break;
		
			default:
				break;
		}
		// if (this.props.infoType) {
		// 	userValue = (
		// 		<a href="/">
		// 			{this.props.value}
		// 		</a>
		// 	);
		// } else {
		// 	userValue = this.props.value;
		// }

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
