
import * as React				            from 'react';
import { Link } 					        from 'react-router-dom';
import { connect }                          from 'react-redux';
import { Actions, 
    // Reducers 
}                                           from '@sensenet/redux';
// import { PathHelper }                       from '@sensenet/client-utils';

// save config 
const DATA = require('../config.json');

interface Props {
    getUsers: Function;
}

interface Stats {
    users: any;
    isDataFetched: boolean;    
}

class OtherUser extends React.Component<Props, Stats> {

    constructor(props: Props) {
        super(props);
        this.state = {
            users: null,
            isDataFetched: false
        };
    }

    componentDidMount  () {
        let path = DATA.ims;
        const  options = {
            select : ['Name', 'DisplayName', 'JobTitle', 'Email', 'Skype'],
        };
        let users = this.props.getUsers(path, options);

        users.then( (result: any) => {
            console.log(result);
            this.setState({
                isDataFetched : true,
                users: result.value.entities.entities
            });
        });

        users.catch((err: any) => {
            console.log(err);
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
                    <Link to={'/user/:' + usersList[key].Name} >
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
				test OtherUser with routing
                <br/>
                <br/>
                {AllUsers}
                <Link to="/" >
                    Back Home
                </Link>
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
)(OtherUser as any);
 