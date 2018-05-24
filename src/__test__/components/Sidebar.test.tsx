import * as React 						  	from 'react';
import Sidebar 							    from '../../components/Sidebar';
import { 
	configure, 
		shallow,
		mount } 							from 'enzyme';
import * as Adapter 					  	from 'enzyme-adapter-react-16';
import toJson 				      			from 'enzyme-to-json';

configure( {adapter: new Adapter()} );

describe('<NoMatch /> shallow rendering', () => {
		
	const sidebar = shallow(<Sidebar />); 
		
	// test Snapshot 
	it('Match to snapshot', () => {
		expect(toJson(sidebar)).toMatchSnapshot();
	});
		
});
