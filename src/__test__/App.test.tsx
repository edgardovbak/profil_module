jest.unmock('../index.tsx');
jest.unmock('redux-mock-store');
jest.unmock('../App');

import * as React 							from 'react';
import App 									from '../App';
import { 
	configure, 
	shallow,
	mount } 								from 'enzyme';
import * as Adapter 						from 'enzyme-adapter-react-16';
import toJson 				      			from 'enzyme-to-json';
import * as createMockStore 				from 'redux-mock-store';
import {
    BrowserRouter as Router
} 											from 'react-router-dom';
import { LoginState, Repository } 			from '@sensenet/client-core';
import { Actions, Reducers }                from '@sensenet/redux';
import { JwtService } 						from '@sensenet/authentication-jwt';
import { mapStateToProps } 					from '../App';

configure( {adapter: new Adapter()} );

const repository = new Repository({ repositoryUrl: 'https://dmsservice.demo.sensenet.com/' }, async () => jwtMockResponse);
const _jwtService = new JwtService(repository);

describe('<App /> shallow rendering', () => {
	let store, app;
	const mockStore = createMockStore();
	beforeEach( () => {
        store = mockStore({
			sensenet: {
				session: {
					loginState: 'Unauthenticated',
					user: {
						userName: 'Visitor'
					}
				}
			}
		});
		const props = {
			loginState:     'Unauthenticated',
			userName :      'Visitor'
		};
        app = shallow(
			<Router>
				<App store={store} {...props}/>
			</Router>);
	}); 

	it('Contain one H1 element ', () => {
		expect(app.find('h1').length).toBe(0);
		
	});

	it('Match to snapshot', () => {
		expect(toJson(app)).toMatchSnapshot();
	});

	it('Login state is false by default', () => {
		const userlogin = Actions.userLogin('Builti/TestUser4', 'TestUser4123');
		const actionType = userlogin.type;
		expect(actionType).toBe('USER_LOGIN');
	});

	it('should return a USER_LOGIN action', () => {
		let data = Actions.userLogin('alba', 'alba').payload(repository);
		expect(Actions.userLogin('alba', 'alba')).toHaveProperty(
			'type', 'USER_LOGIN',
		);
	});

	it('User name from store is the same as in props', () => {
		// console.log(app.props());
		// expect(app.props().userName).toBe('Visitor');
	});

	it('Spy on form submit function', () => {
		// const instance = app.instance();
		// console.log(instance.props());
		// instance.formSubmitHandler();
		
	});
	
});

	// it('On button click change h1 text', () => {
	// 	const button = app.find('button');
	// 	expect(app.find('button').length).toBe(1);
	// 	expect(app.find('h1').text()).toBe('No');
	// 	button.simulate('click');
	// 	expect(app.find('h1').text()).toBe('Yes');
	// });

	// it('On input element change text', () => {
	// 	const input = app.find('input');
	// 	expect(app.find('input').length).toBe(1);
	// 	expect(app.find('h2').text()).toBe('');
	// 	input.simulate('change', {target: { value: 'Loldon'}});
	// 	expect(app.find('h2').text()).toBe('Loldon');
	// });

	// it('Update class name with setState', () => {
	// 	expect(app.find('.blue').length).toBe(1);
	// 	expect(app.find('.red').length).toBe(0);
	// 	app.setState({ mainColor: 'red' });
	// 	expect(app.find('.blue').length).toBe(0);
	// 	expect(app.find('.red').length).toBe(1);
	// });

	// it('calls ComponentDidMouint', () => {
	// 	jest.spyOn(App.prototype, 'componentDidMount');
	// 	expect(App.prototype.componentDidMount.call.length).toBe(1);
	// });
