import * as React				            from 'react';
import { PathHelper }                       from '@sensenet/client-utils';
import { connect }                          from 'react-redux';
import { Actions } from '@sensenet/redux';

const DATA = require('../config.json');

class Home extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            isDataFetched: true,
            articles: {},
        };
    }

    componentDidMount  () {
        let path = PathHelper.joinPaths(DATA.home);
		// get the current user info
		let userGet = this.props.getHomeContent(path, {
            query: 'TypeIs:KnowledgeBaseArticle_v_2',
		});
        
        userGet.then( (result: any) => {
				this.setState({ 
                    isDataFetched : true,
					articles: result.value.entities.entities
				});
        });

        userGet.catch((err: any) => {
            console.log(err);
		});
    }
    
    render() {
        if ( !this.state.isDataFetched ) {
            return null;
		}
        
        let homePageItems = this.state.articles;
        const homePage = Object.keys(homePageItems).map( (key: any) => 
            (
                <div key={key}>
                    <h2>{homePageItems[key].DisplayName}</h2>
                    <div>{homePageItems[key].Description}</div>
                </div>
            )
        );

		return (
			<div className="about">
				<h1>Home Page</h1>
                {homePage}
			</div>
		);
	}
}

const mapStateToProps = (state: any, match: any) => {
    return {
    };
};

export default connect(
    mapStateToProps,
    (dispatch) => ({
        getHomeContent:    (path: string, options: any) => dispatch(Actions.requestContent( path, options )),
    })
)(Home as any);
 