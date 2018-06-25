import * as React 						  	from 'react';
import About 							    from '../../components/About';
import { 
	configure, 
		shallow,
		mount } 							from 'enzyme';
import * as Adapter 					  	from 'enzyme-adapter-react-16';
import toJson 				      			from 'enzyme-to-json';

configure( {adapter: new Adapter()} );

describe('<About /> shallow rendering', () => {
		
	const about = mount(<About />); 
		
	// test Snapshot 
	it('Match to snapshot', () => {
		expect(toJson(about)).toMatchSnapshot();
	});

	it('Contain one text element ', () => {
		expect(about.find('.about').length).toBe(1);
	});
		 
});
 