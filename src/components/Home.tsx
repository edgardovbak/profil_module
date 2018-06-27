import * as React				            from 'react';
import { PathHelper }                       from '@sensenet/client-utils';
import { connect }                          from 'react-redux';
import { Actions }                          from '@sensenet/redux';
import { KnowledgeBaseArticleV2 }           from '../type/KnowledgeBaseArticle_v_2';
import { IODataParams }                     from '@sensenet/client-core';
import Loader                               from './Loader';

const DATA = require('../config.json');

export interface Props {
	getHomeContent: 		(path: string, options: IODataParams<KnowledgeBaseArticleV2>) => Promise<{
		action: any;
		value: any;
	}>;
}

export class HomeComponent extends React.Component<Props, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            isDataFetched: false,
            articles: {},
        };
    }

    async componentDidMount  () {
        let path = PathHelper.joinPaths(DATA.home);
		// get the current user info
		let userGet = await this.props.getHomeContent(path, {
            query: 'TypeIs:KnowledgeBaseArticle_v_2',
		});
        
        this.setState({ 
            isDataFetched : true,
            articles: userGet.value.entities.entities
        });
    }
    
    render() {
        if ( !this.state.isDataFetched ) {
            return (<Loader/>);
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
)(HomeComponent as any);
 