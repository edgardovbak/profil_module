import * as React 						  	from 'react';
import Title 							    from '../../components/Title';
import { 
	configure, 
		shallow,
		mount } 							from 'enzyme';
import * as Adapter 					  	from 'enzyme-adapter-react-16';
import toJson 				      			from 'enzyme-to-json';

configure( {adapter: new Adapter()} );

describe('<NoMatch /> shallow rendering', () => {
		
	const title = mount(<Title />); 
		
	// test Snapshot 
	it('Match to snapshot', () => {
		expect(toJson(title)).toMatchSnapshot();
	});

	// test Snapshot 
	it('Have <h2> tag', () => {
		let tagH2 = title.find('h2');
		expect(tagH2.length).toBe(1);
	});
		
});
