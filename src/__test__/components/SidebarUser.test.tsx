jest.unmock('../../index.tsx');
jest.unmock('redux-mock-store');

import * as React 							from 'react';
import SidebarUser 							from '../../components/SidebarUser';
import { 
	configure, 
    mount } 								from 'enzyme';
import * as Adapter 						from 'enzyme-adapter-react-16';
import toJson 				      			from 'enzyme-to-json';
import * as createMockStore 				from 'redux-mock-store';
import { Provider } 						from 'react-redux';
import {
    BrowserRouter as Router
} 											from 'react-router-dom';										

const DATA = require('../../config.json');

configure( {adapter: new Adapter()} );

describe('<SidebarUser /> rendering', () => {
	let store, sidebaruser;
	let path = DATA.ims;
	const  options = {
		select : ['Name', 'DisplayName', 'JobTitle', 'Email', 'Skype'],
		query: 'TypeIs:User',
	};
	const mockStore = (createMockStore as any)();
	beforeEach( () => {
        store = mockStore({
			sensenet: {
				session: {
					user: {
                        userName: 'TestUser1',
                        fullName: 'Test User 1'
					}
				}
            },
            user: null
		});
        sidebaruser = mount(
            <Router>
                <Provider store={store}>
                    <SidebarUser /> 
                </Provider>
            </Router>
        ); 
    }); 
	
	// test Snapshot 
	it('Match to snapshot', () => {
        expect(toJson(sidebaruser)).toMatchSnapshot();
        sidebaruser.setState({
            usAvatar: 'not_empty'
        });
        expect(toJson(sidebaruser)).toMatchSnapshot();
    });
    
    it('Test props', () => {
        const sidebarChildren = sidebaruser.children().children().children().children();
        expect(sidebarChildren.props().fullName).toBe('Test User 1');
        expect(sidebarChildren.props().userName).toBe('TestUser1');
    });
});
