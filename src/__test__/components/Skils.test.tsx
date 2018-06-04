import * as React 						  	from 'react';
import Skils 							    from '../../components/Skils';
import { 
	configure, 
		shallow,
		mount } 							from 'enzyme';
import * as Adapter 					  	from 'enzyme-adapter-react-16';
import toJson 				      			from 'enzyme-to-json';

configure( {adapter: new Adapter()} );

describe('<Skils /> shallow rendering', () => {

    const props = {
        skills: 'item1;item2;item3;item4'
    };
		
	const skills = shallow(<Skils {...props}/>); 
		
	// test Snapshot 
	it('Match to snapshot', () => {
		expect(toJson(skills)).toMatchSnapshot();
	});
		
});
 