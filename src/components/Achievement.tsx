import * as React					from 'react';
import AchievementItem          	from './AchievementItem';

class Achievement extends React.Component<any, any> {
    render() {

		return (
			<div>
                <AchievementItem achievement={this.props.achievement}/>
			</div>
		);
	}
}

export default Achievement;
 