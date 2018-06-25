import * as React				 	    from 'react';
import Title                            from './Title';
import { connect }                      from 'react-redux';
import { updatePass }                   from '../reducers/users';
import { User }                         from '@sensenet/default-content-types';
import { IODataParams }                 from '@sensenet/client-core';
import { Actions }                      from '@sensenet/redux';

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
    updatePassword: Function;
    userLogout: Function;
    isPassUpdated: boolean;
}

interface State {
    newPass: string;
    repeaPass: string;
    notEqual: boolean;
    oldPass: string;
}

export interface ChangePasswordBody {
    UserPsw: string;
    OldPsw: string;
}

// const DATA = require('../config.json');

export class UsermanagementComponent extends React.Component<Props, State> {
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
            passChange = {
                UserPsw: this.state.newPass,
                // UserId: this.props.userId,
                OldPsw: this.state.oldPass
            };
        } else {
            passChange = {
                UserPsw: this.state.newPass,
                UserId: guid
            };
        }
        this.props.updatePassword('/Root/Sites/Profil(\'ForgottenPassword\')', {},  passChange);
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

        if ( this.props.isPassUpdated) {
            this.props.userLogout();
            this.props.history.push('/login');
        }
        
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
        userId :        state.user.user.Id,
        isPassUpdated:  state.user.isPassUpdated
    };
};

export default connect(
    mapStateToProps,
    (dispatch) => ({
        updatePassword:       (path: string, options: IODataParams<User>, body: ChangePasswordBody) => dispatch(updatePass( path, options, body )),
        userLogout:             () => dispatch( Actions.userLogout())
    })
)(Usermanagement as any);

