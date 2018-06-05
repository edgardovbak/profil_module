import * as React 						  	from 'react';
import NoMatch 							    from '../../components/NoMatch';
import { 
	configure, 
		mount } 							from 'enzyme';
import * as Adapter 					  	from 'enzyme-adapter-react-16';
import toJson 				      			from 'enzyme-to-json';
import {
    BrowserRouter as Router
} 												from 'react-router-dom';

configure( {adapter: new Adapter()} );

describe('<NoMatch /> shallow rendering', () => {
		
	const nomatch = mount(
		<Router>
			<NoMatch />
		</Router>
		); 
		
	// test Snapshot 
	it('Match to snapshot', () => {
		expect(toJson(nomatch)).toMatchSnapshot();
	});
		
});
 