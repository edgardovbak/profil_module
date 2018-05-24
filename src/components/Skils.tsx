import * as React				from 'react';

class Skils extends React.Component<any, any> {

	render() {
		let slillsList = this.props.skills.split(';').map((skill: string) =>
			(
				<li className="skils__item" key={skill.toString()}>
					<span className="btn_link">{skill.toString()}</span>
				</li>
			)
		);

		return (
			<ul className="skils">
				{slillsList}
			</ul>
		);
	}
}

export default Skils;
