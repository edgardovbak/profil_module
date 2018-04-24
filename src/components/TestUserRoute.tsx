import * as React				            from 'react';
import { Link } 					        from 'react-router-dom';
import { connect }                          from 'react-redux';

class TestUserRoute extends React.Component<any, any> {

    render() {

        console.log(this.props);

		return (
			<div>
				test user with routing
                <br/>
                {/* {this.props.match.params.user} */}
                <br/>
                <br/>
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
)(TestUserRoute as any);
 