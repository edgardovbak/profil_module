jest.unmock('../../index.tsx');
jest.unmock('redux-mock-store');

import * as React 								from 'react';
import OtherUser, { OtherUserComponent } 		from '../../components/OtherUser';

import { 
	configure, 
	shallow,
	mount, 
	render,
	ShallowWrapper, 
	ReactWrapper } 								from 'enzyme';
import * as Adapter 							from 'enzyme-adapter-react-16';
import toJson 				      				from 'enzyme-to-json';
import * as createMockStore 					from 'redux-mock-store';
import { Actions }                          	from '@sensenet/redux';
import { Provider } 							from 'react-redux';
import { BrowserRouter as Router } 				from 'react-router-dom';

const DATA = require('../../config.json');

configure( {adapter: new Adapter()} );

describe('<OtherUser /> rendering', () => {
	let store, 
		otheruserMount: ReactWrapper<any, any>,
		otheruserRender: Cheerio,
		otherUserComponentMount: ReactWrapper<any, any>;
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
						userName: 'TestUser1'
					}
				}
			}
		});
		let getUsers: OtherUserComponent['props']['getUsers'] = async () => {
            return {
                    entities: {},
                    result: {
						value: {
							entities: {
								entities: {
									3892: {
										'Id': 3892,
										'Email': '/Root/Sites/Profil/Menu/MenuItem1',
										'Name': 'MenuItem1',
										'JobTitle': 'ProfilMenuItem',
										'Skype': 'flaticon-pirate',
										'DisplayName': 'Menu Item 1'
									  },
									  3891: {
										'Id': 3892,
										'Email': '/Root/Sites/Profil/Menu/MenuItem1',
										'Name': 'MenuItem1',
										'JobTitle': 'ProfilMenuItem',
										'Skype': 'flaticon-pirate',
										'DisplayName': 'Menu Item 2'
									  },
									  3893: {
										'Id': 3892,
										'Email': '/Root/Sites/Profil/Menu/MenuItem1',
										'Name': 'MenuItem1',
										'JobTitle': 'ProfilMenuItem',
										'Skype': 'flaticon-pirate',
										'DisplayName': 'Menu Item 3'
									  }
								}
							}
						}
					}
            };
        };
		otheruserMount = mount(
			<OtherUser store={store}/> 
		);  
		otheruserRender = render(<OtherUser store={store}/> ); 
		otherUserComponentMount = mount(
			<Router>
				<OtherUserComponent getUsers={getUsers}/> 
			</Router>
		);  
    }); 
	
	// test Snapshot 
	it('Match to snapshot', () => {
		expect(otheruserRender).toMatchSnapshot();
	});

	// test Snapshot 
	it('Match to snapshot', () => {
		otheruserMount.setState({
			users: null
		});

		expect(otheruserRender).toMatchSnapshot();
	});

	it('Props name value should be the same as in store', () => {
        expect(otheruserMount.children().props().userName).toBe('TestUser1');
	});
	 
	it('Get all users action type', () => {
		const getUsers = otheruserMount.children().props().getUsers(path, options);
		expect(getUsers.type).toEqual('FETCH_CONTENT');
	}); 

	it(`on a React component that loads data into state in componentDidMount`, async () => {
		let wrapper = otheruserMount.children();
		const spy = jest.spyOn(wrapper.instance(), 'componentDidMount');
		const ddd = wrapper.instance().componentDidMount();
		expect(spy).toHaveBeenCalledTimes(1);
	});
}); 
 