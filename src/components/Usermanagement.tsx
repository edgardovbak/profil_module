import * as React				 	from 'react';
import Title                        from './Title';
import axios                        from 'axios';
import { connect }                  from 'react-redux';

interface ParamList {
    guid: string;
}

interface Params {
    params: ParamList;
}

interface Props {
    pageTitle: string;
    match: Params;
    actionType: boolean; // false - forrgot, true - change password
    userId: number;
    history: any;
}

interface State {
    newPass: string;
    repeaPass: string;
    notEqual: boolean;
    oldPass: string;
}

const DATA = require('../config.json');

export class Usermanagement extends React.Component<Props, State> {
	constructor(prop: Props) {
        super(prop);
        this.state = {
            newPass: '',
            repeaPass: '',
            oldPass: '',
            notEqual: false
        };
        
        this.clickHandler = this.clickHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.blurHandler = this.blurHandler.bind(this);
    }
    
    clickHandler = () => {
        let guid = this.props.match.params.guid;
        let passChange;
        if ( this.props.actionType ) {
            console.log(this.props.userId);
            passChange = {
                UserPsw: this.state.newPass,
                UserId: this.props.userId,
                OldPsw: this.state.oldPass
            };
        } else {
            passChange = {
                UserPsw: this.state.newPass,
                UserId: guid
            };
        }
        axios.post(DATA.odataDomain + '/Root/Sites/Profil(\'ForgottenPassword\')/BisonProfileSetUserPassword', passChange)
        .then(res => {
            console.log(res);
            this.props.history.push('/login');
        });
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
            case 'OldPasssword':
                this.setState({
                    oldPass: e.target.value
                });
                break;
            default:
                break;
        }
	}
	
	public render () {
		return (
			<div className="sn_change_password">
                <Title name={this.props.pageTitle} />
                {this.props.actionType ? 
                    (   
                        <div>
                            <label htmlFor="OldPasssword">Enter old password</label>
                            <input 
                                type="password" 
                                id="OldPasssword"
                                name="OldPasssword"
                                autoComplete="nope"
                                onChange={this.changeHandler}
                                onBlur={this.blurHandler}
                                required={true}
                            />
                        </div>
                    )
                : '' }
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

export const mapStateToProps = (state: any, match: any) => {
    return {
        userId :      state.user.user.Id,
    };
};

export default connect(
    mapStateToProps,
)(Usermanagement as any);