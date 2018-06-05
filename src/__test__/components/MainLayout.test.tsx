import * as React 						  	from 'react';
import MainLayout 							from '../../components/MainLayout';
import { 
	configure, 
		mount } 							from 'enzyme';
import * as Adapter 					  	from 'enzyme-adapter-react-16';
import toJson 				      			from 'enzyme-to-json';

configure( {adapter: new Adapter()} );

describe('<MainLayout /> shallow rendering', () => {
		
	const mainLayout = mount(<MainLayout />); 
		
	// test Snapshot 
	it('Match to snapshot', () => {
		expect(toJson(mainLayout)).toMatchSnapshot();
	});
		
});
 