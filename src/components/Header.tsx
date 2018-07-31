import * as React						from 'react';
import { connect }                      from 'react-redux';
import { IODataParams } 				from '@sensenet/client-core';
import { User } 						from '@sensenet/default-content-types';
import { search } 						from '../reducers/users';

interface Props {
    search: Function;
}

class Header extends React.Component<any, any> {

	constructor(props: Props) {
        super(props);
        this.state = {},

        this.handleChange =        this.handleChange.bind(this);
	}
	
    public handleChange = (e:  any) => {
		if ( e.target.value.length > 2 ) {
			console.log(e.target.value);
		}
	}
	
	render () {
		return (
			<header className="sn_header">
				<div className="sn_wrapp">
					<div className="sn_header__search">
						<input type="text"  onChange={this.handleChange}/>
						<button>
							<i className="fi flaticon-magnifier" />
						</button>
					</div>
				</div>
			</header>
		);
	}
}

export const mapStateToProps = (state: any, match: any) => {
    return {};
};

export default connect(
    mapStateToProps,
    (dispatch) => ({
        search:       (path: string, options: IODataParams<User>) => dispatch(search( path, options )),
    })
)(Header as any);