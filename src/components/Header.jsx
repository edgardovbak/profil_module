import React, { Component } from 'react';

class Header extends Component {
	render () {
		return (
			<header className="header">
				<div className="wrapp">
					<div className="header__search">
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
