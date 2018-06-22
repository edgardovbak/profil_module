import * as React 						  		from 'react';
import EditProfil 							    from '../../components/EditProfil';
import { EditProfilComponent } 					from '../../components/EditProfil';
import { 
	configure, 
		shallow,
		mount, 
		ShallowWrapper, 
		ReactWrapper } 							from 'enzyme';
import * as Adapter 					  		from 'enzyme-adapter-react-16';
import toJson 				      				from 'enzyme-to-json';
import * as createMockStore						from 'redux-mock-store';
import { Provider } 							from 'react-redux';
import {
    BrowserRouter as Router
} 												from 'react-router-dom';
import { PathHelper } 							from '@sensenet/client-utils';

configure( {adapter: new Adapter()} );

const DATA = require('../../config.json');

describe('<EditProfil /> shallow rendering', () => {
	let store, storeUserEmpty;
	let editprofileShallow: ShallowWrapper<any, any>;
	let editProfilComponentShallow: ShallowWrapper<any, any>;
	let editProfilComponentShallowEmpty: ShallowWrapper<any, any>;
	let editprofileMount: ReactWrapper<any, any>;
	const mockStore = (createMockStore as any)();
	beforeEach( () => {
		let updateUserSN: EditProfilComponent['props']['updateUserSN'] = async () => {
            return {
				action: {},
				result: {}
            };
		};
		let saveChanges: EditProfilComponent['props']['saveChanges'] = async () => {
            return {
				entities: {},
				result: {}
            };
		};
		let updateUserAvatar: EditProfilComponent['props']['updateUserAvatar'] = async () => {
            return {
				action: {},
				value: {}
            };
        };
        store = mockStore({
			sensenet: {
				session: {
					loginState: 'Unauthenticated',
					user: {
						userName: 'Visitor'
					}
				}
            },
			user: {
				user: {
					Id: 12312,
					FullName: 		'adasdasdasd',
					JobTitle: 		'adasdasdasd',
					Email: 			'adasdasdasd',
					Languages: 		'adasdasdasd',
					Phone: 			'adasdasdasd',
					BirthDate: 		'adasdasdasd',
					Education: 		'adasdasdasd',
					Description: 	'adasdasdasd',
				}
			}
		});

		storeUserEmpty = mockStore({
			sensenet: {
				session: {
					loginState: 'Unauthenticated',
					user: {
						userName: 'Visitor'
					}
				}
            },
			user: null
		});
		const user = {
			Id: 12312,
			FullName: 		'adasdasdasd',
			JobTitle: 		'adasdasdasd',
			Email: 			'adasdasdasd',
			Languages: 		'adasdasdasd',
			Phone: 			'adasdasdasd',
			BirthDate: 		'adasdasdasd',
			Education: 		'adasdasdasd',
			Description: 	'adasdasdasd',
		};
		editprofileShallow = shallow(
			<Provider store={store}>
				<EditProfil/>
			</Provider>); 
		editProfilComponentShallow = shallow(
			<Provider store={store}>
				<EditProfilComponent 
					updateUserSN={updateUserSN}
					saveChanges={saveChanges}
					updateUserAvatar={updateUserAvatar}
					user={user}
				/>
			</Provider>
		); 
		editProfilComponentShallowEmpty = shallow(
			<Provider store={storeUserEmpty}>
				<EditProfilComponent 
					updateUserSN={updateUserSN}
					saveChanges={saveChanges}
					updateUserAvatar={updateUserAvatar}
					user={null}
				/>
			</Provider>
		); 
		editprofileMount = mount(
			<Router>
				<Provider store={store}>
					<EditProfil/>
				</Provider>
			</Router>);
	});
	// test Snapshot  
	it('Match to snapshot', () => {
		expect(toJson(editprofileMount)).toMatchSnapshot();
		expect(toJson(editProfilComponentShallow)).toMatchSnapshot();
		expect(toJson(editProfilComponentShallowEmpty)).toMatchSnapshot();
	});

	it('Test saveChanges  ', () => {
		let userWithAvatar = {
			// !important user id
			Id: 			3211,
			AvatarImageRef: 'adasdasda'
		};
		const fff = editprofileMount
		.children()
		.children()
		.children()
		.children();
		const saveChanges = fff.props().saveChanges(userWithAvatar);
		expect(saveChanges.type).toEqual('SET_USER_INFO');
		expect(saveChanges.payload).toEqual(userWithAvatar);
	});

	it('Test updateUserSN  ', () => {
		let userWithAvatar = {
			// !important user id
			Id: 			3211,
			AvatarImageRef: 'adasdasda'
		};
		const fff = editprofileMount.children()
		.children()
		.children()
		.children();
		let pathToUser = PathHelper.joinPaths(DATA.ims, 'Freeman');
		const getUsers = fff.props().updateUserSN(pathToUser, userWithAvatar);
		expect(getUsers.type).toEqual('UPDATE_CONTENT');
	});

	it('test onUpdateImageChanges', () => {
		
		const fff = editprofileMount
		.children()
		.children()
		.children()
		.children();
		const spy = jest.spyOn(fff.instance(), 'onUpdateImageChanges'  as any);
		const ddd = (fff.instance() as any).onUpdateImageChanges('lol');
		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toBeCalledWith('lol');
	});

	it('Test updateUserAvatar  ', () => {
		let userWithAvatar = {
			// !important user id
			Id: 			3211,
			AvatarImageRef: 'adasdasda'
		};
		const fff = editprofileMount
		.children()
		.children()
		.children()
		.children();
		const getUsers = fff.props().updateUserAvatar(DATA.avatar, 'freeman', 'Image');
		expect(getUsers.type).toEqual('UPLOAD_CONTENT');
	});
 
	it('test onSaveChanges', () => {
		const fff = editprofileMount
		.children()
		.children()
		.children()
		.children();
		const spy = jest.spyOn((fff.instance() as any), 'onSaveChanges');
		const ddd = (fff.instance() as any).onSaveChanges();
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('test changeHandler ', () => {
		
		const fff = editprofileMount
		.children()
		.children()
		.children()
		.children();
		const spy = jest.spyOn(fff.instance(), 'changeHandler'  as any);
		let eventItems = [
			{e: {target: {name: 'userName', value: 'Loldon Freeman'}}},
			{e: {target: {name: 'userPosition', value: 'Epic Developer'}}},
			{e: {target: {name: 'userEmail', value: 'loldon@mail.ru'}}},
			{e: {target: {name: 'userLanguages', value: 'Ingles'}}},
			{e: {target: {name: 'userPhone', value: '+123124233'}}},
			{e: {target: {name: 'userBirthDate', value: '0000.00.00'}}},
			{e: {target: {name: 'userEducation', value: 'Stupid'}}},
			{e: {target: {name: 'userAbout', value: 'Nothing'}}},
			{e: {target: {name: 'Nowhere', value: ''}}},
		];
		for (let index = 0; index < eventItems.length - 1; index++) {
			const ddd = (fff.instance() as any).changeHandler(eventItems[index].e);
			expect(spy).toBeCalledWith(eventItems[index].e);
			expect(fff.instance().state[eventItems[index].e.target.name]).toBe(eventItems[index].e.target.value);
		}
		
	});
		
});
