import * as React 						  	from 'react';
import Home ,
		{ HomeComponent }					from '../../components/Home';
import { 
	configure, 
		shallow,
		mount, 
		ReactWrapper, 
		ShallowWrapper } 					from 'enzyme';
import * as createMockStore					from 'redux-mock-store';
import * as Adapter 					  	from 'enzyme-adapter-react-16';
import toJson 				      			from 'enzyme-to-json';
import { Provider } from 'react-redux';

configure( {adapter: new Adapter()} );

describe('<Home /> shallow rendering', () => {
	let store;
	let homeMount: ReactWrapper<any, any>;
	let homeComponentMount: ReactWrapper<any, any>;
	let homeShallow: ShallowWrapper<any, any>;

	const mockStore = (createMockStore as any)();
	beforeEach( () => {
		let getHomeContent: HomeComponent['props']['getHomeContent'] = async () => {
            return {
				action: {},
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
		homeMount = mount(
			<Provider store={store}>
				<Home/>
			</Provider>); 
		homeComponentMount = mount(
			<Provider store={store}>
				<Home 
					getHomeContent={getHomeContent}
				/>
			</Provider>); 
		homeShallow = shallow(
			<Provider store={store}>
				<Home 
					getHomeContent={getHomeContent}
				/>
			</Provider>); 
	});
		
	// test Snapshot 
	it('Match to snapshot', () => {
		expect(toJson(homeMount)).toMatchSnapshot();
		expect(toJson(homeComponentMount)).toMatchSnapshot();
	});

	// test Snapshot 
	it('Match to snapshot', () => {
		homeShallow.setState({
			isDataFetched: false
		});
		expect(toJson(homeShallow)).toMatchSnapshot();
	});

	it('Test componentDidMount', () => {
		const spy = jest.spyOn(homeMount.children().instance(), 'componentDidMount');
		const ddd = homeMount.children().instance().componentDidMount();
		expect(spy).toHaveBeenCalledTimes(1);
	});
		 
});
 