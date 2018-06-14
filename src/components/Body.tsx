import * as React				            from 'react';
import { connect }                          from 'react-redux';
import Sidebar                              from './Sidebar';
import Header                               from './Header';
import {
    Route,
    // Redirect,
    Switch,
    withRouter
}                                           from 'react-router-dom';
import { LoginState }                       from '@sensenet/client-core';
// import { PathHelper }                       from '@sensenet/client-utils';
import OtherUser                            from './OtherUser';
import Profil                               from './Profil';
import EditProfil                           from './EditProfil';
import Usermanagement                       from './Usermanagement';

// const DATA = require('../config.json');

export class BodyComponent extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            open : false,
            isDataFetched: true,
            articles: {},
            status: this.props.userLoginState !== LoginState.Authenticated
        },

        this.openMenu = this.openMenu.bind(this);
    }

    public openMenu = () => {
        let menuState = !this.state.open;
        
        this.setState({         
            open: menuState
        }); 
    }

    // componentDidMount  () {
    //     let path = PathHelper.joinPaths(DATA.home);
	// 	// get the current user info
	// 	let userGet = this.props.getHomeContent(path, {
    //         query: 'TypeIs:KnowledgeBaseArticle_v_2',
	// 	});
        
    //     userGet.then( (result: any) => {
	// 			this.setState({ 
    //                 isDataFetched : true,
	// 				articles: result.value.entities.entities
	// 			});
    //     });

    //     userGet.catch((err: any) => {
    //         console.log(err);
	// 	});
	// }

    public render() {
        // if ( !this.state.isDataFetched ) {
        //     return null;
		// }
        
        // let homePageItems = this.state.articles;
        // const homePage = Object.keys(homePageItems).map( (key: any) => 
        //     (
        //         <div key={key}>
        //             <h2>{homePageItems[key].DisplayName}</h2>
        //             <div>{homePageItems[key].Description}</div>
        //         </div>
        //     )
        // );

		return (
                <div className={this.state.open ? 'content_to_right open' : 'content_to_right'}>
                    <Header />
                    <Sidebar openMenu={this.openMenu}/>
                    <div className="sn_overflow" onClick={this.props.openMenu} />
                    <main className="sn_main">
                        <div className="sn_wrapp">
                            {/* <h1>Home Page</h1>
                            {homePage} */}
                            <Switch>
                                <Route 
                                    exact={true}
                                    path="/otherUser"  
                                    // render={(routerProps) => {
                                    //     return this.state.status ?
                                    //     <Redirect key="login" to="/login" />
                                    //     : <OtherUser {...routerProps} />;
                                    // }} 
                                    render={(routerProps) => {
                                        return <OtherUser {...routerProps} />;
                                    }} 
                                />
                                <Route 
                                    exact={true}
                                    path="/user/:user"
                                    // render={(routerProps) => {
                                    //     return this.state.status ?
                                    //     <Redirect key="login" to="/login" />
                                    //     : <Profil {...routerProps} />;
                                    // }} 
                                    render={(routerProps) => {
                                        return <Profil {...routerProps} />;
                                    }} 
                                    userName={this.props.userName}
                                />
                                <Route 
                                    exact={true}
                                    path="/editUser"  
                                    // render={(routerProps) => {
                                    //     return this.state.status ?
                                    //     <Redirect key="login" to="/login" />
                                    //     : <EditProfil {...routerProps} />;
                                    // }} 
                                    render={(routerProps) => {
                                        return <EditProfil {...routerProps} />;
                                    }} 
                                />
                                <Route  
                                    path="/Usermanagement/:action/:guid" 
                                    key="usermanagement"
                                    component={Usermanagement}
                                />
                                <Route 
                                    exact={true}
                                    path="/changePass"  
                                    // render={(routerProps) => {
                                    //     return this.state.status ?
                                    //     <Redirect key="login" to="/login" />
                                    //     : <Usermanagement {...routerProps} />;
                                    // }} 
                                    render={(routerProps) => {
                                        return <Usermanagement {...routerProps} />;
                                    }} 
                                />
                            </Switch> 
                        </div>
                    </main>
                </div>
		);
	}
}

const mapStateToProps = (state: any, match: any) => {
    return {
        userName :              state.sensenet.session.user.userName,
        userLoginState: 		state.sensenet.session.loginState, // state.user.user.FullName,
    };
};

export default withRouter(connect(
    mapStateToProps,
    // (dispatch) => ({
    //     getHomeContent:    (path: string, options: any) => dispatch(Actions.requestContent( path, options )),
    // })
)(BodyComponent as any));
 