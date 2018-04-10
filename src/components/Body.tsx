import * as React				from 'react';
import Sidebar                              from './Sidebar';
import Header                               from './Header';

class Body extends React.Component<any, any> {
    render() {

		return (
			<div>
                <Header />
                <Sidebar openMenu={this.props.openMenu}/>
                <div className="sn_overflow" onClick={this.props.openMenu} />
            </div>
		);
	}
}

export default Body;
 