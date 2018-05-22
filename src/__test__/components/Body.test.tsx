import * as React 						from 'react';
import Body 							from '../../components/Body';
import { 
	configure, 
    shallow,
    mount } 							from 'enzyme';
import * as Adapter 					from 'enzyme-adapter-react-16';
import toJson 				      		from 'enzyme-to-json';
import {
    Route,
    Redirect,
    Switch,
    withRouter,
    BrowserRouter as Router
}                                           from 'react-router-dom';

configure( {adapter: new Adapter()} );

describe('<Body /> shallow rendering', () => {
    const body = shallow( (
        <Router>
            <Body />
        </Router>)); 
    // test Snapshot 
	it('Match to snapshot', () => {
        // uconst body = shallow(<Body />); 
		expect(toJson(body)).toMatchSnapshot();
    });

    it('Menu is closed by default', () => {
        const openMenu = body.find('.content_to_right open');
        expect(openMenu.length).toBe(0);
		// expect(body.state().open).toBe(false);
    });
    
});
 