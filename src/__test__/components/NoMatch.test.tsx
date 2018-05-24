import * as React 						  	from 'react';
import NoMatch 							    from '../../components/NoMatch';
import { 
	configure, 
		shallow,
		mount } 							from 'enzyme';
import * as Adapter 					  	from 'enzyme-adapter-react-16';
import toJson 				      			from 'enzyme-to-json';

configure( {adapter: new Adapter()} );

describe('<NoMatch /> shallow rendering', () => {
		
	const nomatch = shallow(<NoMatch />); 
		
	// test Snapshot 
	it('Match to snapshot', () => {
		expect(toJson(nomatch)).toMatchSnapshot();
	});
		
});
