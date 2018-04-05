import * as React				from 'react';

class About extends React.Component<any, any> {
    render() {

		return (
			<div className="about">
				{this.props.about}
			</div>
		);
	}
}

export default About;
 