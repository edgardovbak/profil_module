
import * as React				            from 'react';
import { Link } 					        from 'react-router-dom';
import { connect }                          from 'react-redux';
import { Actions, 
    // Reducers 
}                                           from '@sensenet/redux';
import { IODataParams }                     from '@sensenet/client-core';
import { User }                             from '@sensenet/default-content-types';
// import { PathHelper }                       from '@sensenet/client-utils';
// save config 
const DATA = require('../config.json');

interface Props {
    getUsers: (path: string, options: IODataParams<User>) => Promise<{
        entities: any;
        result: any;
    }>;
}

interface Stats {
    users: any;
    isDataFetched: boolean;    
}

export class OtherUserComponent extends React.Component<Props, Stats> {

    constructor(props: Props) {
        super(props);
        this.state = {
            users: null,
            isDataFetched: false
        };
    }

    public async componentDidMount  () {
        let path = DATA.ims;
        const  options = {
            select : ['Name', 'DisplayName', 'JobTitle', 'Email', 'Skype'],
            query: 'TypeIs:User',
        } as IODataParams<User>;
        let users = await this.props.getUsers(path, options);
        this.setState({
            isDataFetched : true,
            users: users.result.value.entities.entities
        });
    }

    render() {
        if ( !this.state.isDataFetched ) {
            return null;
        }
        let usersList = this.state.users;
        const AllUsers = Object.keys(usersList).map( (key: any) => 
            (
                <div key={key}>
                    Name: 
                    <Link to={'/user/' + usersList[key].Name} >
                        {usersList[key].Name}
                    </Link>
                    <br/>
                    Email: {usersList[key].Email}
                    <br/>
                    Position: {usersList[key].JobTitle}
                    <br/>
                    <br/>
                </div>
            )
        );
        
		return (
            
			<div>
				<h1>All User</h1>
                <br/>
                <br/>
                {AllUsers}
			</div>
		);
	}
} 

const mapStateToProps = (state: any, match: any) => {
    return {
        userName :      state.sensenet.session.user.userName,
    };
};

export default connect(
    mapStateToProps,
    (dispatch) => ({
        getUsers:    (path: string, options: any) => dispatch(Actions.requestContent( path, options )),
    })
)(OtherUserComponent as any);
 