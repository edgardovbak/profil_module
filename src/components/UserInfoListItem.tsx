import * as React				from 'react';
// import * as Timestamp 			from 'react-timestamp';

class UserInfoListItem extends React.Component<any, any> {

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
				userValue = (
					<select>
						<option selected={true} value={this.props.value}>{this.props.value}</option> 
					</select>
				);
				break;
		
			default:
				break;
		}

		return (
			<div className="user__global_info__list__item">
				<div className="user__global_info__list__item--name">
					{this.props.name} :
				</div>
				<div className="user__global_info__list__item--value">
					{userValue}
				</div>
			</div>
		);
	}
}

export default UserInfoListItem;
