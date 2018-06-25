import * as React 						from 'react';
import Loader 							from '../../components/Loader';
import { 
	configure, 
    shallow,
    mount } 							from 'enzyme';
import * as Adapter 					from 'enzyme-adapter-react-16';
import toJson 				      		from 'enzyme-to-json';

configure( {adapter: new Adapter()} );

describe('<Loader /> shallow rendering', () => {
    
    const loader = shallow(<Loader />); 
    
    // test Snapshot 
	it('Match to snapshot', () => {
		expect(toJson(loader)).toMatchSnapshot();
    });
    
});
 