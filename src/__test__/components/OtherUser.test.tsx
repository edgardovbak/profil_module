jest.unmock('../../index.tsx');
jest.unmock('redux-mock-store');

import * as React 							from 'react';
import OtherUser 							from '../../components/OtherUser';
import { 
	configure, 
	shallow,
	mount } 								from 'enzyme';
import * as Adapter 						from 'enzyme-adapter-react-16';
import toJson 				      			from 'enzyme-to-json';
import * as createMockStore 				from 'redux-mock-store';
import { Actions }                          from '@sensenet/redux';

const initialState = {};
const DATA = require('../../config.json');

configure( {adapter: new Adapter()} );

describe('<Menu /> shallow rendering', () => {
	let store, otheruser;
	let path = DATA.ims;
	const  options = {
		select : ['Name', 'DisplayName', 'JobTitle', 'Email', 'Skype'],
		query: 'TypeIs:User',
	};
	const mockStore = createMockStore();
	beforeEach( () => {
        store = mockStore({
			sensenet: {
				session: {
					user: {
						userName: 'TestUser1'
					}
				}
			}
		});
        otheruser = shallow(<OtherUser store={store}/> );  
    }); 
	
	// test Snapshot 
	it('Match to snapshot', () => {
		expect(toJson(otheruser)).toMatchSnapshot();
	});

	it('Props name value should be the same as in store', () => {
        expect(otheruser.props().userName).toBe('TestUser1');
	});
	 
	it('Get all users action type', () => {
		const getUsers = otheruser.props().getUsers(path, options);
		expect(getUsers.type).toEqual('FETCH_CONTENT');
	});

	// it('Get all users action type', () => {
	// 	const getUsers = otheruser.props().getUsers(path, options);
	// 	store.dispatch(otheruser.props().getUsers(path, options));
	// 	console.log(store.getActions()[0]);
	// });
});
 