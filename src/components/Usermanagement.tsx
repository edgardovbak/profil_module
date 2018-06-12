import * as React				 	from 'react';
import Title                        from './Title';
import                              axios from 'axios';

interface State {
    newPass: string;
    repeaPass: string;
    notEqual: boolean;
}

const DATA = require('../config.json');

export class Usermanagement extends React.Component<any, State> {
	constructor(prop: any) {
        super(prop);
        this.state = {
            newPass: '',
            repeaPass: '',
            notEqual: false
        };
        
        this.clickHandler = this.clickHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.blurHandler = this.blurHandler.bind(this);
    }
    
    clickHandler = () => {
        let actionName = this.props.match.params.action;
        let guid = this.props.match.params.guid;
        console.log(actionName);
        console.log(guid);
        const passChange = {
            UserPsw: this.state.newPass,
            UserId: guid
          };
        axios.post(DATA.odataDomain + '/Root/Sites/Profil(\'ForgottenPassword\')/BisonProfileSetUserPassword', passChange)
        .then(res => {
            console.log(res);
            console.log(res.data);
        });
        console.log(actionName + ' ' + guid);
    }

    blurHandler = () => {
        if ( this.state.newPass !== this.state.repeaPass ) {
            this.setState({
                notEqual: true
            });
        } else {
            this.setState({
                notEqual: false
            });
        }
    }
    
    changeHandler = (e: any) => {
        let name = e.target.name;
        switch (name) {
            case 'NewPasssword':
                this.setState({
                    newPass: e.target.value
                });
                break;
            case 'RepeatPasssword':
                this.setState({
                    repeaPass: e.target.value
                });
                break;
            default:
                break;
        }
	}
	
	public render () {
		return (
			<div className="sn_change_password">
                <Title name="Forgotten password" />
                <label htmlFor="NewPasssword">Enter New password</label>
                <input 
                    type="password" 
                    id="NewPasssword"
                    name="NewPasssword"
                    autoComplete="nope"
                    onChange={this.changeHandler}
                    onBlur={this.blurHandler}
                    required={true}
                />
                <label htmlFor="RepeatPasssword">Repeat password</label>
                <input 
                    type="password" 
                    id="RepeatPasssword" 
                    name="RepeatPasssword"
                    autoComplete="nope"
                    onChange={this.changeHandler}
                    onBlur={this.blurHandler}
                    required={true}
                />
                <p>
                    {this.state.notEqual ? 
                        'Passwords are not equal' 
                    : 
                        ''
                    }
                </p>
                <button 
                    className="sn_btn"
                    onClick={this.clickHandler}
                    disabled={this.state.notEqual}
                >
                    Change Password
                </button>
			</div>
		);
	}
}

export default Usermanagement;
