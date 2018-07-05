import * as React				    from 'react';
import Loader                       from './Loader';

// save config 
const DATA = require('../config.json');

interface ImageRef {
    Path: string;
}

interface Achievement {
    Name: string;
    Description:  string;
    BackgroundcolorColor: string;
    BorderColorIcon:  string;
    BorderColorAchievement:  string;
    AchievementImageRef: ImageRef;
}
 
interface Props {
    achievement: [Achievement];
}

class AchievementItem extends React.Component<Props, any> {
    render() {
        // if user is not updated then show loader
		if ( this.props.achievement === undefined || this.props.achievement === null) {
			return (<Loader/>);
        }
            
		return (
            <div className="achievement">
                {this.props.achievement.map((item: any, key: any) => {
                    return (
                        <div 
                            key={key}
                            className="achievement_item"
                            title={item.Name}
                            style={{
                                'backgroundColor': item.BackgroundcolorColor,
                                'border': '3px solid ' + item.BorderColorAchievement,
                                'backgroundImage': 'url(' + DATA.domain + item.AchievementImageRef.Path + ')',
                            }}
                        />
                    );
                })}
            </div>
		); 
	}
}

export default AchievementItem as any;
