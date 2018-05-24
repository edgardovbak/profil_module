jest.unmock('../../index.tsx');
jest.unmock('redux-mock-store');

import * as React 						  	from 'react';
import UserAvatar 							from '../../components/UserAvatar';
import { 
	    configure, 
		shallow,
		mount } 							from 'enzyme';
import * as Adapter 					  	from 'enzyme-adapter-react-16';
import toJson 				      			from 'enzyme-to-json';
import * as createMockStore 				from 'redux-mock-store';

configure( {adapter: new Adapter()} );

describe('<NoMatch /> shallow rendering', () => {
		
	let store, useravatar;
	const mockStore = createMockStore();
	beforeEach( () => {
        store = mockStore({
			user: {
                
            }
		});
		const props = {
			loginState:     'Unauthenticated',
			userName :      'Visitor'
		};
        useravatar = shallow(
            <UserAvatar store={store}/>
        );
	}); 
		
	// test Snapshot 
	it('Match to snapshot', () => {
		expect(toJson(useravatar)).toMatchSnapshot();
	});
		
});
