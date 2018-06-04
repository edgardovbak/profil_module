jest.unmock('../../index.tsx');
jest.unmock('redux-mock-store');

import * as React 							from 'react';
import SidebarUser 							from '../../components/SidebarUser';
import { 
	configure, 
	shallow,
    mount,
    render } 								from 'enzyme';
import * as Adapter 						from 'enzyme-adapter-react-16';
import toJson 				      			from 'enzyme-to-json';
import * as createMockStore 				from 'redux-mock-store';
import { Actions }                          from '@sensenet/redux';
import {
    BrowserRouter as Router
} 											from 'react-router-dom';

const initialState = {};
const DATA = require('../../config.json');

configure( {adapter: new Adapter()} );

describe('<SidebarUser /> shallow rendering', () => {
	let store, sidebaruser, sidebaruserRender, wrapper;
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
        sidebaruser = shallow(<SidebarUser store={store}/> ); 
        sidebaruserRender = render(
            <Router>
                <SidebarUser store={store}/> 
            </Router>
        ); 
        sidebaruser.setState({
            usName : sidebaruser.props().fullName,
            usAvatar: '',
        });
    }); 
	
	// test Snapshot 
	it('Match to snapshot', () => {
		expect(toJson(sidebaruser)).toMatchSnapshot();
    });
    
    it('Test props', () => {
        expect(sidebaruser.props().fullName).toBe('Test User 1');
        expect(sidebaruser.props().userName).toBe('TestUser1');
    });

    it('Test state', () => {
        expect(sidebaruser.state().usName).toBe('Test User 1');
        expect(sidebaruser.state().usAvatar).toBe('');
    });
});

describe('<SidebarUser /> shallow rendering', () => {
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
			user: {
                fullName: 'Test User 2'
            }
		});
        sidebaruser = shallow(<SidebarUser store={store}/> );  
    }); 
	
    // test Snapshot 
    it('Match to snapshot', () => {
		expect(sidebaruser).toMatchSnapshot();
    });
    
	it('Test function', () => {
        expect(sidebaruser.isEmpty({})).toBe(false);
        expect(sidebaruser.isEmpty({ user: 'one'})).toBe(false);
    });
});
 