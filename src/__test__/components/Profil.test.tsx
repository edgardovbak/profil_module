jest.unmock('../../index.tsx');
jest.unmock('redux-mock-store');
jest.unmock('../../components/Profil');

import * as React 								from 'react';
import Profil, { ProfilComponent } 				from '../../components/Profil';
import { 
	configure, 
	shallow,
	mount, 
	render, 
	ReactWrapper,
	ShallowWrapper } 							from 'enzyme';
import * as Adapter 							from 'enzyme-adapter-react-16';
import toJson 				      				from 'enzyme-to-json';
import * as createMockStore						from 'redux-mock-store';
import { LoginState, Repository } 				from '@sensenet/client-core';
import { Actions, Reducers }                	from '@sensenet/redux';
import { JwtService } 							from '@sensenet/authentication-jwt';
import { PathHelper }                       	from '@sensenet/client-utils';
import { Provider } 							from 'react-redux';
import { promiseMiddleware }                    from '@sensenet/redux-promise-middleware';

const DATA = require('../../config.json');

configure( {adapter: new Adapter()} );

const contentMockResponse = {
	ok: true,
	status: 200,
	json: async () => {
		return {
			d: {
				entities: {},
				result: {
					Phone: '2131231212',
					FullName: 'loldon freeman',
					AvatarImageRef: '',
					JobTitle: 'job',
					Email: 'email',
					WorkPhone: '1233123',
					Skype: 'asddasd',
					Linkedin: 'asdasdasfas',
					GitHub: 'adasdsd',
					Languages: 'asdasdasd',
					Education: 'asdasdasd',
					BirthDate: '123123',
					Description: 'adas dasd asf asf ',
					Actions: {
						1: {
							Name: 'Edit'
						}
					}
				},
			},
		};
	},
} as Response;

describe('<Profil /> rendering', () => {
	let store, storewithUser,
		profilRender: Cheerio, 
		profilShallow: ShallowWrapper<any, any>,
		profilWithUserMount: ReactWrapper<any, any>,
		profilMount: ReactWrapper<any, any>;
	const mockStore = (createMockStore as any)();
	beforeEach( () => {
        store = mockStore({
			sensenet: {
				session: {
					loginState: 'Unauthenticated',
					user: {
						userName: 'Visitor'
					}
				}
            },
            user: {}
		});

		storewithUser = mockStore({
			sensenet: {
				session: {
					loginState: 'Unauthenticated',
					user: {
						userName: 'Visitor'
					}
				}
            },
            user: {
				Phone: '',
				FullName: 'loldon freeman',
				AvatarImageRef: '',
				JobTitle: 'job',
				Email: 'email',
				WorkPhone: '1233123',
				Skype: 'asddasd',
				Linkedin: 'asdasdasfas',
				GitHub: 'adasdsd',
				Languages: 'asdasdasd',
				Education: 'asdasdasd',
				BirthDate: '123123',
				Description: 'adas dasd asf asf ',
				Actions: [
					{Nmae: 'Delete'},
					{Nmae: 'NotDelete'},
					{Nmae: 'AlmostDelete'},
					{Nmae: 'Edit'}
				]
			}
		});
		const props = {
			loginState:     'Unauthenticated',
            userName :      'Visitor',
            match: {
                params: {
                    user: 'loldon'
                }
			},
		};
        profilRender = render(
			<Profil {...props} store={store}/>);

		profilWithUserMount = mount(
			<Profil {...props} store={storewithUser}/>);
		profilShallow = shallow(
			<Profil {...props} store={store}/>);
	}); 

	it('Match to snapshot', () => {
		expect(profilShallow).toMatchSnapshot();

	});

	it('Test componentDidMount', () => {
		const spy = jest.spyOn(profilWithUserMount.children().instance(), 'componentDidMount');
		const ddd = profilWithUserMount.children().instance().componentDidMount();
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('Test componentWillReceiveProps', () => {
		const nextProps = {
			match: {
				params: {
					user: 'loldon1'
				}
			}
		};
		profilWithUserMount.setState({
			userName: 'loldon'
		});
		const nextContext = {};
		const spy = jest.spyOn(profilWithUserMount.children().instance(), 'componentWillReceiveProps');
		const ddd = profilWithUserMount.children().instance().componentWillReceiveProps(nextProps , nextContext);
		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toBeCalledWith({
			match: {
				params: {
					user: 'loldon1'
				}
			}
		}, {});
	});

	it('Test addToState ', () => {
		const user =  {
			Phone: '2131231212',
			FullName: 'loldon freeman',
			AvatarImageRef: '',
			JobTitle: 'job',
			Email: 'email',
			WorkPhone: '1233123',
			Skype: 'asddasd',
			Linkedin: 'asdasdasfas',
			GitHub: 'adasdsd',
			Languages: 'asdasdasd',
			Education: 'asdasdasd',
			BirthDate: '123123',
			Description: 'adas dasd asf asf '
		};
		const getUsers = profilWithUserMount.children().props().addToState(user);
		expect(getUsers.type).toEqual('UPDATE_LOGINED_USER');
		expect(getUsers.payload).toEqual(user);
	});

	it('Test getUserInfo ', () => {
		let path = PathHelper.joinPaths(DATA.ims, 'loldon');
		const getUsers = profilWithUserMount.children().props().getUserInfo(path, {
            select : ['Name', 'DisplayName', 'Skills', 'WorkPhone', 'Skype', 'Linkedin', 'Actions',
                    'GitHub', 'JobTitle', 'Email', 'FullName', 'Description', 'Languages', 'Phone', 
					'Gender', 'BirthDate', 'Education', 'AvatarImageRef/Path'],
			expand : ['Actions', 'AvatarImageRef']
		});
		expect(getUsers.type).toEqual('LOAD_CONTENT');	
	});

	it('Match to snapshot else path ', (done) => {
		profilWithUserMount.setState({
			isDataFetched: true,
			isForbidden: false,
			user: {
				Phone: '',
				FullName: 'loldon freeman',
				AvatarImageRef: '',
				JobTitle: 'job',
				Email: 'email',
				WorkPhone: '1233123',
				Skype: 'asddasd',
				Linkedin: 'asdasdasfas',
				GitHub: 'adasdsd',
				Languages: 'asdasdasd',
				Education: 'asdasdasd',
				BirthDate: '123123',
				Description: 'adas dasd asf asf ',
				Actions: [
					{Nmae: 'Delete'},
					{Nmae: 'NotDelete'},
					{Nmae: 'AlmostDelete'},
					{Nmae: 'Edit'}
				]
			}
		}, () => {
			console.log(profilWithUserMount.state());
			expect(profilShallow).toMatchSnapshot();	
			done();
		});
	});
	
});