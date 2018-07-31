import * as React				    from 'react';
import { connect }                  from 'react-redux';

interface Skills {
    name: string;
    used: boolean;
    equal: boolean;
}

interface Stats {
    skills: Skills[];
    used: string[];
}

export interface Props {
	usedSkills: any;
}

class SkilllsEdit extends React.Component<Props, Stats> {

    constructor(props: Props) {
        super(props);
        this.state = {
            skills: [   {name: 'lol', used: false, equal: false}, 
                        {name: 'epic', used: false, equal: false},
                        {name: 'json', used: false, equal: false},
                        {name: 'something', used: false, equal: false},
                        {name: 'water magic', used: false, equal: false},
                        {name: '007', used: false, equal: false},
                        {name: 'react', used: false, equal: false},
                        {name: 'redux', used: false, equal: false},
                        {name: 'git', used: false, equal: false},
                        {name: 'c#', used: false, equal: false},
                        {name: 'html5', used: false, equal: false}],
            used : this.props.usedSkills,
        },

        this.handleClickUsedSkills =        this.handleClickUsedSkills.bind(this);
        this.handleClickAvailableSkills =   this.handleClickAvailableSkills.bind(this);
        this.handleChange =                 this.handleChange.bind(this);
        this.keyPress =                     this.keyPress.bind(this);
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

    public keyPress = (e: any) => {
        if ( e.keyCode === 13) {
           // find entered value in skill list
           let updateSkills = this.state.skills;
           let result = this.state.skills.find(function (obj: any) { 
                if (obj.name === e.target.value ) {
                    let index = updateSkills.indexOf(obj);
                    updateSkills[index].used = true;
                    return true;
                }  else {
                    return false;
                }
            });
            if ( !result ) {
                updateSkills.push({
                    name: e.target.value,
                    equal: false,
                    used: true
                });
            }
            this.setState({
                skills: updateSkills
            });
        }
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
                    <input type="text" onChange={this.handleChange} onKeyDown={this.keyPress}/>
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
                    {availableSkills}
                </div>  
			</div>
		);
	}
}

const mapStateToProps = (state: any, match: any) => {
	return {
        usedSkills : 			state.user.user.Skills.split(';'),
	};
};

export default connect(
	mapStateToProps,
	{}
)(SkilllsEdit);