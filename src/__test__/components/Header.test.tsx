import * as React 						from 'react';
import Header 							from '../../components/Header';
import { 
	configure, 
    shallow,
    mount } 							from 'enzyme';
import * as Adapter 					from 'enzyme-adapter-react-16';
import toJson 				      		from 'enzyme-to-json';

configure( {adapter: new Adapter()} );

describe('<Header /> shallow rendering', () => {
    
    const header = shallow(<Header />); 
    
    // test Snapshot 
	it('Match to snapshot', () => {
		expect(toJson(header)).toMatchSnapshot();
    });
    
});
