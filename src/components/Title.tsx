import * as React				from 'react';
import { Link } from 'react-router-dom';

interface Props {
	name: string;
	pathTo?: string;
}

class Title extends React.Component<Props, any> {

	render () {
		return (
			<h2 className="sn_title">
				{this.props.name}
				{ !this.props.pathTo ? '' : (
					<Link to={this.props.pathTo}>See all</Link>
				)}
			</h2>
		);
	}
}

export default Title;
