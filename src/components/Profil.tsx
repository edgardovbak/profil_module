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
import Achievement							from './Achievement';

const Timestamp = require('react-timestamp');

// save config 
const DATA = require('../config.json');

// default picture 
const defaultAvatar = require('../images/default_avatar.svg');

interface State {
    user: 			any;
	isDataFetched: 	boolean;  
	userName: 		string;  
	isForbidden:	boolean;
	isCurrentUser:	boolean;
	noAchevement: 	boolean;
}

interface Props {
    getUserInfo: 	Function;
    addToState: 	Function;
	userName: 		string;
	currentUser: 	any;
	match:			any;
}

export class ProfilComponent extends React.Component<Props, State> {
	constructor(props: Props) {
        super(props);
        this.state = {
			// detect when user info is downloaded
			isDataFetched: false,
			// get user name from url ( :UserName )
			userName: this.props.match.params.user,
			// edit action is forbidden
			isForbidden: true,
			// value for all users
			user: null,
			// detect if current user open the page
			isCurrentUser: false,
			noAchevement: false
		};
	}

	async getUserByName (name: string) {
		// get the user name from url 
        let path = PathHelper.joinPaths(DATA.ims, name);
		// get the current user info
		let userGet = await this.props.getUserInfo(path, {
            select : ['Name', 'DisplayName', 'Skills', 'WorkPhone', 'Skype', 'Linkedin', 'Actions',
                    'GitHub', 'JobTitle', 'Email', 'FullName', 'Description', 'Languages', 'Phone', 
					'Gender', 'BirthDate', 'Education', 'AvatarImageRef/Path', 'Achievement/Name',
					'Achievement/Description', 'Achievement/BackgroundcolorColor', 'Achievement/BorderColorIcon', 
					'Achievement/BorderColorAchievement', 'Achievement/AchievementImageRef/Path', 'Achievement/TextColor'],
			expand : ['Actions', 'AvatarImageRef', 'Achievement', 'Achievement/AchievementImageRef']
		});
		this.setState({ 
			isDataFetched: true,
			user: userGet.value.d,
			noAchevement: userGet.value.d.Achievement === null ? true : false
		});
		// check if current user have permission to edit user
		let editAction = this.state.user.Actions.find(function (obj: any) { return obj.Name === 'Edit'; });
		if ( editAction !== undefined) {
			this.setState({ 
				isForbidden: editAction.Forbidden
			});
		}
		// if curent user its on own page then save info to state
		if ( !this.state.isForbidden ) {
			this.props.addToState(userGet.value.d);
			this.setState({ 
				isCurrentUser: true,
				noAchevement: userGet.value.d.Achievement === null ? true : false
			});
		}
	}
	
	// run before component is rendered
	componentDidMount  () {
		if ( this.state.isForbidden ) {
			this.getUserByName(this.state.userName);
		} 
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
		}
		let skillsList = this.state.isCurrentUser ? this.props.currentUser.Skills : this.state.user.Skills;
		return (
			<div className="profil">
				<div className="user" >
					<div className="user__avatar">
						{this.state.isCurrentUser ? (
							<img 
								src={!this.props.currentUser.AvatarImageRef ? defaultAvatar : DATA.domain + this.props.currentUser.AvatarImageRef.Path} 
								alt={this.props.currentUser.FullName}
							/>
						) 
						: (
							<img 
								src={!this.state.user.AvatarImageRef ? defaultAvatar : DATA.domain + this.state.user.AvatarImageRef.Path} 
								alt={this.state.user.FullName}
							/>
						) }
						
					</div>
					<div className="user__global_info">
						<h2 className="sn_title sn_title--description">
							{this.state.isCurrentUser ?  this.props.currentUser.FullName : this.state.user.FullName}
							{this.state.isForbidden ? ''  :
								(<Link to="/edituser" className="sn_btn">
									Edit profile
								</Link>)
							}
							
						</h2>
						<div className="user__global_info__position">
							{this.state.isCurrentUser ?  this.props.currentUser.JobTitle : this.state.user.JobTitle}
						</div>
						<div className="user__global_info__list">
							<div>
								<UserInfoListItem
									name="Email"
									infoType={1}
									value={this.state.isCurrentUser ?  this.props.currentUser.Email : this.state.user.Email}
								/>
								<UserInfoListItem
									name="WorkPhone"
									infoType={0}
									value={this.state.isCurrentUser ?  this.props.currentUser.WorkPhone : this.state.user.WorkPhone}
								/>
								{this.state.user.Phone !== '' ? (
									<UserInfoListItem
										name="Phone"
										infoType={0}
										value={this.state.user.Phone} 
									/>)
								: '' }
								<UserInfoListItem
									name="Skype"
									infoType={1}
									value={this.state.isCurrentUser ?  this.props.currentUser.Skype : this.state.user.Skype}
								/>
								<UserInfoListItem
									name="Linkedin"
									infoType={1}
									value={this.state.isCurrentUser ?  this.props.currentUser.Linkedin : this.state.user.Linkedin}
								/>
								<UserInfoListItem
									name="GitHub"
									infoType={1}
									value={this.state.isCurrentUser ?  this.props.currentUser.GitHub : this.state.user.GitHub} 
								/>
							</div>
							<div>
								<UserInfoListItem
									name="Languages"
									infoType={0}
									value={this.state.isCurrentUser ?  this.props.currentUser.Languages : this.state.user.Languages}
								/>
								<UserInfoListItem
									name="Education"
									infoType={0}
									value={this.state.isCurrentUser ?  this.props.currentUser.Education : this.state.user.Education}
								/>
								<UserInfoListItem
									name="Birthdate"
									infoType={1}
									value={this.state.isCurrentUser ?  <Timestamp time={this.props.currentUser.BirthDate} format="full" /> : <Timestamp time={this.state.user.BirthDate} format="full" />}
								/>
							</div>
						</div>
					</div>
				</div>
				
				<Title name="Skils"/>
				<Skils skills={'' + skillsList} />

				<Title name="About" />
				<About about={this.state.isCurrentUser ?  this.props.currentUser.Description : this.state.user.Description} />
									
				{ this.state.noAchevement ? '' : 
					(<Title name="Achievement" pathTo={'/ahievement/' + this.props.match.params.user}/>)
				}	
				{ this.state.noAchevement ? '' : 
					(<Achievement achievement={this.state.user.Achievement}/>)
				}			
			
			</div>
		);
	}
}

const mapStateToProps = (state: any, match: any) => {
	return {
		userName : state.sensenet.session.user.userName,
		currentUser: state.user.user
	};
};

export default connect(
	mapStateToProps,
	(dispatch) => ({
        getUserInfo:    (path: string, options: any) => dispatch(Actions.loadContent( path, options )),
        addToState:     (userInfo: any) => dispatch({ type: 'UPDATE_LOGINED_USER', payload: userInfo }),
    })
)(ProfilComponent as any);
