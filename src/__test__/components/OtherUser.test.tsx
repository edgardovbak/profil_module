jest.unmock('../../index.tsx');
jest.unmock('redux-mock-store');

import * as React 							from 'react';
import OtherUser 							from '../../components/OtherUser';
import { 
	configure, 
	shallow,
	mount, 
	render,
	ShallowWrapper } 						from 'enzyme';
import * as Adapter 						from 'enzyme-adapter-react-16';
import toJson 				      			from 'enzyme-to-json';
import * as createMockStore 				from 'redux-mock-store';
import { Actions }                          from '@sensenet/redux';

const initialState = {};
const DATA = require('../../config.json');

configure( {adapter: new Adapter()} );

describe('<Menu /> shallow rendering', () => {
	let store, otheruser: ShallowWrapper<any, any>, otheruserRender: Cheerio;
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
		otheruser = shallow(<OtherUser store={store}/> );  
		otheruserRender = render(<OtherUser store={store}/> ); 
    }); 
	
	// test Snapshot 
	it('Match to snapshot', () => {
		expect(otheruserRender).toMatchSnapshot();
	});

	// test Snapshot 
	it('Match to snapshot', () => {
		otheruser.setState({
			users: [{
				Name: 'some Name',
				Email: 'email',
				JobTitle: 'Mothing'
			},
			{
				Name: 'some Name2',
				Email: 'email2',
				JobTitle: 'Mothing2'
			}]
		});
		expect(otheruserRender).toMatchSnapshot();
	});

	it('Props name value should be the same as in store', () => {
        expect(otheruser.props().userName).toBe('TestUser1');
	});
	 
	it('Get all users action type', () => {
		const getUsers = otheruser.props().getUsers(path, options);
		expect(getUsers.type).toEqual('FETCH_CONTENT');
	});

	test(`on a React component that loads data into state in componentDidMount`, async () => {
		const wrapper: ShallowWrapper<any, any> = shallow(<OtherUser  store={store}/>);

		const spy = jest.spyOn(wrapper.instance(), 'componentDidMount');
		const ddd = wrapper.instance().componentDidMount();
		expect(spy).toHaveBeenCalledTimes(1);
	});
}); 
 