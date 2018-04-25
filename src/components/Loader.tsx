import * as React				from 'react';

class Loader extends React.Component<any, any> {
    render() {

		return (
			<div className="loader">
				<div className="leftEye"/>
				<div className="rightEye"/>
				<div className="mouth"/>
			</div>
			
		);
	}
}

export default Loader;
 