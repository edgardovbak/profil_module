import * as React 								from 'react';
import Logo, { LogoComponent } 					from '../../components/Logo';
import { 
	configure, 
	shallow,
	mount } 									from 'enzyme';
import * as Adapter 							from 'enzyme-adapter-react-16';
import toJson 				      				from 'enzyme-to-json';
import {
	BrowserRouter as Router
} 												from 'react-router-dom';

configure( {adapter: new Adapter()} );

describe('<Logo /> shallow rendering', () => {
		const props = {
			openMenu: () => {
				return 'success';
			}
		};

		const logo = mount(
			<Router>
				<Logo {...props}/>
			</Router>
		); 

		const logoShallow = shallow(
			<Router>
				<Logo {...props}/>
			</Router>
		); 
		
		// test Snapshot 
	it('Match to snapshot', () => {
		expect(toJson(logo)).toMatchSnapshot();
		expect(toJson(logoShallow)).toMatchSnapshot();
	});

	it('Contain one menu element ', () => {
		expect(logo.find('.sn_menu').length).toBe(1);
	});

	it('Contain one img element ', () => {
		expect(logo.find('img').length).toBe(1);
	});

	it('Test clickHandler  ', () => {
		const clickHandler = jest.spyOn(logo.children().children().instance() as any, 'clickHandler');
		(logo.children().children().instance() as any).clickHandler();
		expect(clickHandler).toHaveBeenCalledTimes(1);
	});
});
 