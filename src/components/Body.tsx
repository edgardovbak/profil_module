import * as React				            from 'react';
import { Link } 					        from 'react-router-dom';
import { connect }                          from 'react-redux';
// import {
//     Route,
//     Redirect,
// }                                           from 'react-router-dom';
import Sidebar                              from './Sidebar';
import Header                               from './Header';
import TestUserRoute                        from './TestUserRoute';
import OtherUser                            from './OtherUser';

class Body extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            open : false,
        },

        this.openMenu = this.openMenu.bind(this);
    }

    openMenu() {
        let menuState = !this.state.open;
        this.setState({         
            open: menuState
          }); 
    } 

    render() {
        console.log(this.props.children);
		return (
			<div className={this.state.open ? 'content_to_right open' : 'content_to_right'}>
                <Header />
                <Sidebar openMenu={this.props.openMenu}/>
                <div className="sn_overflow" onClick={this.props.openMenu} />
                <main className="sn_main">
                    <div className="sn_wrapp">
                        <Link to={'/user/:' + this.props.userName} > 
                            Go to user
                        </Link>
                        <br/>
                        <br/>
                        <Link to="/otherUser/seeAll" >
                            Go to Other User
                        </Link>
                        <br/>
                        <TestUserRoute/>
                        <OtherUser/>
                    </div>
                </main>
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
)(Body as any);
 