import * as React 						from 'react';
import Logo 							from '../../components/Logo';
import { 
	configure, 
    shallow,
    mount } 							from 'enzyme';
import * as Adapter 					from 'enzyme-adapter-react-16';
import toJson 				      		from 'enzyme-to-json';

configure( {adapter: new Adapter()} );

describe('<Logo /> shallow rendering', () => {
    
    const logo = shallow(<Logo />); 
    
    // test Snapshot 
	it('Match to snapshot', () => {
		expect(toJson(logo)).toMatchSnapshot();
    });

    it('Contain one menu element ', () => {
		expect(logo.find('.sn_menu').length).toBe(1);
    });

    it('Contain one img element ', () => {
		expect(logo.find('img').length).toBe(1);
    });
    
});
