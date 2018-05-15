import * as React 						from 'react';
import MenuItem 				        from '../../components/MenuItem';
import { 
	configure, 
    shallow,
    mount } 							from 'enzyme';
import * as Adapter 					from 'enzyme-adapter-react-16';
import toJson 				      		from 'enzyme-to-json';

configure( {adapter: new Adapter()} );

describe('<MenuItem /> shallow rendering', () => {
    const menuItem = shallow(<MenuItem pathTo="/" name="home" icon="fi "/>);
    // test Snapshot 
	it('Match to snapshot', () => {
		expect(toJson(menuItem)).toMatchSnapshot();
    });
});
 