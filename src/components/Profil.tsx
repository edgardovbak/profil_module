import * as React				 			from 'react';
import { connect }              			from 'react-redux';
import { Actions }                			from '@sensenet/redux';
import { Link } 							from 'react-router-dom';
import { PathHelper }                       from '@sensenet/client-utils';
import Title 								from './Title';
import Skils 								from './Skils';
import About 								from './About';
import Loader 								from './Loader';
import UserInfoListItem 					from './UserInfoListItem';

// save config 
const DATA = require('../config.json');

// default picture 
const defaultAvatar = require('../images/default_avater.svg');

interface State {
    user: 			any;
	isDataFetched: 	boolean;  
	userName: 		string;  
}

interface Props {
    getUserInfo: 	Function;
    addToState: 	Function;
	userName: 		string;
	user: 			any;
	match:			any;
}

class Profil extends React.Component<Props, State> {

	constructor(props: Props) {
        super(props);
        this.state = {
            user: null,
			isDataFetched: false,
			userName: this.props.match.params.user
		};
		
		this.getUserByName = this.getUserByName.bind(this);
	}

	getUserByName = (name: string) => {
		// get the user name from url 
		let uName = name.substr(1);
        let path = PathHelper.joinPaths(DATA.ims, uName);
		// get the current user info
		let userGet = this.props.getUserInfo(path, {
            select : ['Name', 'DisplayName', 'Skills', 'WorkPhone', 'Skype', 'Linkedin', 'Actions',
                    'GitHub', 'JobTitle', 'Email', 'FullName', 'Description', 'Languages', 'Phone', 
					'Gender', 'BirthDate', 'Education', 'Avatar', 'ImageRef', 'ImageData'],
			expand : ['Actions']
        });
        
        userGet.then( (result: any) => {
            this.setState({ 
				isDataFetched: true,
				user: result.value.d
			});
            this.props.addToState(result.value.d);
        });

        userGet.catch((err: any) => {
            console.log(err);
        });
	}
	
	// run before component is rendered
	componentDidMount  () {
        this.getUserByName(this.state.userName);
	}
	
	// run when parameter in url is changed
	componentWillReceiveProps(nextProps: any) {
		if (nextProps.match.params.user !== this.state.userName) {
		  this.setState({ userName: nextProps.match.params.user });
		  this.getUserByName(nextProps.match.params.user);
		}
	}
	
	render () {

		// if user is not updated then show loader
		if ( !this.state.isDataFetched ) {
			return (<Loader/>);
		} else {
			// phone number 
			let PhoneNumber;
			if ( !(this.state.user.Phone === '')) {
				PhoneNumber = (
				<UserInfoListItem
					name="Phone"
					infoType={0}
					value={this.state.user.Phone} 
				/>);
			} 
			
			return (
				<div className="profil">
					<div className="user" >
						<div className="user__avatar">
							<img 
								src={this.state.user.Avatar._deferred !== '' ? DATA.domain + this.state.user.Avatar._deferred : defaultAvatar} 
								alt={this.state.user.FullName}
							/>
						</div>
						<div className="user__global_info">
							<h2 className="sn_title sn_title--description">
								{this.state.user.FullName}
								<Link to="/edituser" className="sn_btn">
									Edit profile
								</Link>
							</h2>
							<div className="user__global_info__position">
								{this.state.user.JobTitle}
							</div>
							<div className="user__global_info__list">
								<div>
									<UserInfoListItem
										name="Email"
										infoType={1}
										value={this.state.user.Email} 
									/>
									<UserInfoListItem
										name="WorkPhone"
										infoType={0}
										value={this.state.user.WorkPhone} 
									/>
									
									{PhoneNumber}
				
									<UserInfoListItem
										name="Skype"
										infoType={1}
										value={this.state.user.Skype} 
									/>
									<UserInfoListItem
										name="Linkedin"
										infoType={1}
										value={this.state.user.Linkedin} 
									/>
									<UserInfoListItem
										name="GitHub"
										infoType={1}
										value={this.state.user.GitHub} 
									/>
								</div>
								<div>
									<UserInfoListItem
										name="Languages"
										infoType={0}
										value={this.state.user.Languages} 
									/>
									<UserInfoListItem
										name="Education"
										infoType={0}
										value={this.state.user.Education} 
									/>
									<UserInfoListItem
										name="BirthDate"
										infoType={2}
										value={this.state.user.BirthDate} 
									/>
								</div>
							</div>
						</div>
					</div>
					
					<Title name="Skils"/>
					<Skils skills={'' + this.state.user.Skills} />

					<Title name="About" />
					<About about={this.state.user.Description} />

				</div>
			);
		}
	}
}

const mapStateToProps = (state: any, match: any) => {
	return {
	  userName : state.sensenet.session.user.userName,
	};
};

export default connect(
	mapStateToProps,
	(dispatch) => ({
        getUserInfo:    (path: string, options: any) => dispatch(Actions.loadContent( path, options )),
        addToState:     (userInfo: any) => dispatch({ type: 'UPDATE_LOGINED_USER', payload: userInfo }),
    })
)(Profil as any);
