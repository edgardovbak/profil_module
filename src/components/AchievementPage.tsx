import * as React				    from 'react';
import Loader                       from './Loader';
import { connect }                  from 'react-redux';
import { PathHelper }               from '@sensenet/client-utils';
import { Actions }                  from '@sensenet/redux';

// save config 
const DATA = require('../config.json');

interface ImageRef {
    Path: string;
}

interface Achievement {
    Name: string;
    Description?:  string;
    BackgroundcolorColor: string;
    BorderColorIcon?:  string;
    BorderColorAchievement?:  string;
    AchievementImageRef?: ImageRef;
    TextColor: string;
}
 
interface Props {
    achievement: [Achievement];
    getUserAchievement: Function;
    match:			any;
}

interface State {
	isDataFetched: 	boolean;  
	achievement: 	[Achievement];
}

class AchievementPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
			// detect when user info is downloaded
			isDataFetched: false,
			achievement: [
                {
                    BackgroundcolorColor: '#000',
                    Name: 'No Achievements',
                    BorderColorAchievement: '#a4a4a4',
                    TextColor: '#fff',
                    AchievementImageRef: {
                        Path: 'devil on the strits '
                    }
                }
            ],
		};
	}

    // run before component is rendered
	async componentDidMount () {
		// get the user name from url 
        let path = PathHelper.joinPaths(DATA.ims, this.props.match.params.user);
		// get the user Achievement info
		let getAchievement = await this.props.getUserAchievement(path, {
            select : ['Achievement/Name', 'Achievement/Description', 'Achievement/BackgroundcolorColor', 'Achievement/BorderColorIcon', 
					'Achievement/BorderColorAchievement', 'Achievement/AchievementImageRef/Path', 'Achievement/TextColor'],
			expand : ['Achievement', 'Achievement/AchievementImageRef']
        });
        console.log(getAchievement.value.d.Achievement);
        this.setState({ 
			isDataFetched: true,
			achievement: getAchievement.value.d.Achievement
        });
	}

    render() {
        // if user is not updated then show loader
        if ( !this.state.isDataFetched && (this.state.achievement === undefined ) ) {
            return (<Loader/>);
        }
        console.log(this.state.achievement);
        return (
            <div>
                <h1>Achievement</h1>
                <div className="achievement_page">
                    {this.state.achievement.map((item: any, key: any) => {
                        return (
                            <div 
                                key={key}
                                className="achievement_item--square"
                                title={item.Description}
                                style={{
                                    'backgroundColor': item.BackgroundcolorColor,
                                    'border': '3px solid ' + item.BorderColorAchievement,
                                    'color' : item.TextColor
                                }}
                            >   
                                <img 
                                    src={DATA.domain + item.AchievementImageRef.Path} 
                                    alt={item.Name}
                                    style={{
                                        'border': '3px solid ' + item.BorderColorIcon,
                                    }}
                                />
                                {item.Name}
                            </div>
                        );
                    })}
                </div>
            </div>
        ); 
    }
}

const mapStateToProps = (state: any, match: any) => {
	return {
		achievement : state.user.user.Achievement,
	};
};

export default connect(
    mapStateToProps,
    (dispatch) => ({
        getUserAchievement:    (path: string, options: any) => dispatch(Actions.loadContent( path, options )),
    })
)(AchievementPage as any);
 