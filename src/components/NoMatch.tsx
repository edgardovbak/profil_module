import * as React				            from 'react';
import { Link } 							from 'react-router-dom';

class NoMatch extends React.Component<any, any> {
    render() {

		return (
			<div className="no_mathc">
				<h1>
                    404 
                </h1>
                <p>
                    Not found
                </p>
                <Link to="/"> 
					Back to home
				</Link>
			</div>
		);
	}
}
 
export default NoMatch;
 