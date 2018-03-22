import React, { Component } from 'react';

class Header extends Component {
	render () {
		return (
			<header className="sn_header">
				<div className="sn_wrapp">
					<div className="sn_header__search">
						<input type="text" />
						<button>
							<i className="fi flaticon-magnifier"></i>
						</button>
					</div>
				</div>
			</header>
		);
	}
};

export default Header;
