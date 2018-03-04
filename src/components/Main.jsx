import React, { Component } from 'react';
import Profil from './Profil';
import EditProfil from './EditProfil';

class Main extends Component {

	constructor(props) {
		super(props);

		this.editPage = this.editPage.bind(this);
		this.saveChanges = this.saveChanges.bind(this);

		this.state = {
			editPage : false
		};
	}

	saveChanges() {
		this.setState({
            editPage: false
        });
	}

	editPage() {
		this.setState({
            editPage: true
        });
	}

	render() {

		return (
			<main className="main">
				<div className="wrapp">
				{ !this.state.editPage ?
					(<Profil user={this.props.user} action={this.editPage}/>)
				:
					(<EditProfil user={this.props.user} action={this.saveChanges}/>)
				}
				</div>
			</main>
		)
	}
};

export default Main;
