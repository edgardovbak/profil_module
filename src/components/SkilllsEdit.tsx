import * as React				from 'react';

interface Skills {
    name: string;
    used: boolean;
    equal: boolean;
}

interface Stats {
    skills: Skills[];
    used: string[];
}

class SkilllsEdit extends React.Component<any, Stats> {

    constructor(props: any) {
        super(props);
        this.state = {
            skills: [   {name: 'lol', used: false, equal: false}, 
                        {name: 'epic', used: false, equal: false},
                        {name: 'json', used: false, equal: false},
                        {name: 'something', used: false, equal: false},
                        {name: 'water magic', used: false, equal: false},
                        {name: '007', used: false, equal: false}],
            used : ['json', 'something', 'water magic'],
        },

        this.handleClickUsedSkills =        this.handleClickUsedSkills.bind(this);
        this.handleClickAvailableSkills =   this.handleClickAvailableSkills.bind(this);
        this.handleChange =                 this.handleChange.bind(this);
    }

    componentDidMount () {
        let skillsList: Skills[] = this.state.skills;
        this.state.skills.map( ( item: Skills, key: number) => {
            // console.log(key);
            if ( this.state.used.indexOf(item.name) >= 0) {
                skillsList[key].used = true;
            } 
        }); 
        this.setState({
            skills: skillsList
        });
        // console.log(skillsList);
    }

    public handleClickUsedSkills = (e:  any) => {
        let skillsList: Skills[] = this.state.skills;
        let index = e.currentTarget.dataset.key;
        skillsList[index].used = false;
        this.setState({
            skills: skillsList
        });
    }

    public handleClickAvailableSkills = (e:  any) => {
        let skillsList: Skills[] = this.state.skills;
        let index = e.currentTarget.dataset.key;
        skillsList[index].used = true;
        this.setState({
            skills: skillsList
        });
    }

    public handleChange = (e:  any) => {
        // console.log(e.target.value);
        let skillsList: Skills[] = this.state.skills;
        if ( e.target.value !== '') {
            this.state.skills.map( ( item: Skills, key: number) => {
                if ( item.name.indexOf(e.target.value) >= 0) {
                    // console.log(skillsList[key]);
                    skillsList[key].equal = true;
                } 
            }); 
        } else {
            this.state.skills.map( ( item: Skills, key: number) => {
                skillsList[key].equal = false;
            }); 
        }
        this.setState({
            skills: skillsList
        });
    }

    render() {

        let usedSkills = this.state.skills.map( (item: Skills, key: number) => {
            if (item.used) {
                return (<div className="skills_list__selected__item" key={key} data-key={key} onClick={this.handleClickUsedSkills}>{item.name}</div>);
            }
            return null;
        });

        let availableSkills = this.state.skills.map( (item: Skills, key: number) => {
            let used: string = '';
            let equal: string = '';
            if (item.equal) {
                equal = ' equal ';
            } 
            if (item.used) {
                used = ' used ';
            } 
            return (<div className={'skills_list__available__item ' + used + equal} key={key} data-key={key} onClick={this.handleClickAvailableSkills}>{item.name}</div>);
        });

		return (
			<div className="skills_list">
				<p>Selected skils</p>
                <div className="skills_list__selected">
                    {usedSkills}
                </div>  
                <p>
                    <small>
                        Click on skill to remove it
                    </small>
                </p>
                <hr/>
                <div className="skills_list__input">
                    <p>Writwe skill Name</p>
                    <input type="text" onChange={this.handleChange}/>
                    <p>
                        <small>
                            Write skill name to serch or add new <br/>
                            to add new skill write the name and press enter
                        </small>
                    </p>
                </div>
                <hr/>
                <p>Available skills</p>
                <div className="skills_list__available">
                    <div className="skills_list__available__item used">Jquery</div>
                    {availableSkills}
                </div>  
			</div>
		);
	}
}

export default SkilllsEdit;
 