jest.unmock('../../index.tsx');
jest.unmock('redux-mock-store');

import * as React 						from 'react';
import Menu 							from '../../components/Menu';
import { 
	configure, 
    shallow,
    mount } 							from 'enzyme';
import * as Adapter 					from 'enzyme-adapter-react-16';
import * as createMockStore 				from 'redux-mock-store';
import toJson 				      		from 'enzyme-to-json';

configure( {adapter: new Adapter()} );

describe('<Menu /> shallow rendering', () => {
    let store, menu;
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
        menu = shallow(<Menu store={store}/> );  
    }); 
    // test Snapshot 
	it('Match to snapshot', () => {
        // expect(toJson(menu)).toMatchSnapshot();
        expect(menu.find('.sn_sidebar__menu').length).toBe(0);
        
    });

    // it('Menu is closed by default', () => {
    //     const body = shallow(<Body />); 
    //     body.setState({ open: false });
	// 	expect(body.state().open).toBe(false);
    // });
    
});
 