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
	let store, app: Cheerio, appmount: ReactWrapper<any, any>;
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
		appmount = mount(
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
		const appChiltren = appmount.children()
		.children()
		.children()
		.children()
		.children()
		.children();
		expect(appChiltren.props().userName).toBe('Visitor');
	});

	it('Spy on form submit function', async () => {
		const appChiltren = appmount.children()
		.children()
		.children()
		.children()
		.children()
		.children();
		// console.log(toJson(appChiltren));
		const spy = jest.spyOn(appChiltren.instance() as any, 'formSubmitHandler');
		const ddd = (appChiltren.instance() as any).formSubmitHandler({}, 'someEamil', '**********'); 
		expect(spy).toHaveBeenCalledWith({}, 'someEamil', '**********');
	});
	
});