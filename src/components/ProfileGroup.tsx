import * as React from 'react';
import { connect } from 'react-redux';
import { Actions } from '@sensenet/redux';

interface Props {
	getUserTeam: Function;
}

export class ProfileGroupComponent extends React.Component<Props, any> {
	constructor(props: Props) {
		super(props);
	}

	getTeams = async () => {
		let teams = await this.props.getUserTeam('/Root/Sites/Profil/Teams', {
			select: ['Name', 'DisplayName', 'Members'],
			expand: ['Members']
		});
		if (teams != null) {
			console.log(teams);
		}
	}

	componentDidMount() {
		this.getTeams();
	}

	render() {
		return (
			<div className="profilegroup">
				Group
			</div>
		);
	}
}

const mapStateToProps = (state: any, match: any) => {
	return {};
};

export default connect(
	mapStateToProps,
	(dispatch) => ({
		getUserTeam: (path: string, options: any) => dispatch(Actions.loadContent(path, options))
	})
)(ProfileGroupComponent as any);
