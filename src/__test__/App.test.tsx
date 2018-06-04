jest.unmock('../index.tsx');
jest.unmock('redux-mock-store');
jest.unmock('../App');

import * as React 								from 'react';
import App 										from '../App';
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
import {
    BrowserRouter as Router
} 												from 'react-router-dom';
import { LoginState, Repository } 				from '@sensenet/client-core';
import { Actions, Reducers }                	from '@sensenet/redux';
import { JwtService } 							from '@sensenet/authentication-jwt';
import { mapStateToProps } 						from '../App';
import { Provider } 							from 'react-redux';

configure( {adapter: new Adapter()} );

const repository = new Repository({ repositoryUrl: 'https://dmsservice.demo.sensenet.com/' }, async () => jwtMockResponse);
const _jwtService = new JwtService(repository);

describe('<App /> shallow rendering', () => {
	let store, app: Cheerio, appmount: ShallowWrapper<any, any>;
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
			}
		});
		const props = {
			loginState:     'Unauthenticated',
			userName :      'Visitor'
		};
        app = render(
			<Router>
				<Provider store={store}>
					<App {...props}/>
				</Provider>
			</Router>);
		appmount = shallow(
			<Router>
				<Provider store={store}>
					<App {...props}/>
				</Provider>
			</Router>);
	}); 

	it('Contain one H1 element ', () => {
		expect(app.find('h1').length).toBe(0);
		
	});

	it('Match to snapshot', () => {
		expect(app).toMatchSnapshot();
	});

	it('User name from store is the same as in props', () => {
		expect(appmount.children().children().props().userName).toBe('Visitor');
	});

	it('Spy on form submit function', async () => {
		
		const lol = appmount.children().children();
		// console.log(toJson(lol.formSubmitHandler()));
		// jest.spyOn(lol.prototype, 'formSubmitHandler'); 
		// expect(App.prototype.formSubmitHandler).toHaveBeenCalledWith('abAB12');
	});
	
});