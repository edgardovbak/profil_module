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
	let store;
	let editprofileShallow: ShallowWrapper<any, any>;
	let editProfilComponentShallow: ShallowWrapper<any, any>;
	let editProfilComponentShallowWtoutData: ShallowWrapper<any, any>;
	let editprofileMount: ReactWrapper<any, any>;
	const mockStore = (createMockStore as any)();
	beforeEach( () => {
		let updateUserSN: EditProfilComponent['props']['updateUserSN'] = async () => {
            return {
                    entities: {},
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
                    entities: {},
                    result: {}
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
			<EditProfilComponent 
				updateUserSN={updateUserSN}
				saveChanges={saveChanges}
				updateUserAvatar={updateUserAvatar}
				user={user}
			/>
		); 
		editProfilComponentShallowWtoutData = shallow(
			<EditProfilComponent 
				updateUserSN={updateUserSN}
				saveChanges={saveChanges}
				updateUserAvatar={updateUserAvatar}
				user={null}
			/>
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
	});

	// test Snapshot  
	it('Match to snapshot', () => {
		editProfilComponentShallowWtoutData.setState({
			imageIsChanged: {
				isChanged: true
			}
		});
		expect(toJson(editProfilComponentShallowWtoutData)).toMatchSnapshot();
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
		
});
