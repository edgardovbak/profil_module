import * as React 						  	from 'react';
import Usermanagement ,
		{ UsermanagementComponent }			from '../../components/Usermanagement';
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

describe('<Usermanagement /> shallow rendering', () => {
	let store;
	let umMount: ReactWrapper<any, any>;
	let umcMount: ReactWrapper<any, any>;
    let umShallow: ShallowWrapper<any, any>;
    let umMount2: ReactWrapper<any, any>;
	let umcMount2: ReactWrapper<any, any>; 
	let umShallow2: ShallowWrapper<any, any>;

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
        const props = {
            match: {
                params: {
                    guid: 'some GUI - d'
                }
            },
            actionType: false
        };
        const props2 = {
            match: {
                params: {
                    guid: 'some GUI - d'
                }
            },
            actionType: true
        };
		umMount = mount(
			<Provider store={store}>
				<Usermanagement {...props} />
			</Provider>); 
		umcMount = mount(
			<Provider store={store}>
				<Usermanagement  {...props} />
			</Provider>); 
		umShallow = shallow(
			<Provider store={store}>
				<Usermanagement {...props} />
            </Provider>); 
        umMount2 = mount(
			<Provider store={store}>
				<Usermanagement {...props2} />
			</Provider>); 
		umcMount2 = mount(
			<Provider store={store}>
				<Usermanagement  {...props2} />
			</Provider>); 
		umShallow2 = shallow(
			<Provider store={store}>
				<Usermanagement {...props2} />
			</Provider>); 
	});
		
	// test Snapshot 
	it('Match to snapshot', () => {
		expect(toJson(umMount)).toMatchSnapshot();
		expect(toJson(umcMount)).toMatchSnapshot();
    });

    // test Snapshot 
	it('Match to snapshot', () => {
		expect(toJson(umMount2)).toMatchSnapshot();
		expect(toJson(umcMount2)).toMatchSnapshot();
    });
    
    it('test changeHandler ', () => {
		
		const fff = umMount
		.children()
		.children();
		const spy = jest.spyOn(fff.instance(), 'changeHandler'  as any);
		let eventItems = [
			{e: {target: {name: 'NewPasssword', value: 'Loldon Freeman', state: 'newPass'}}},
			{e: {target: {name: 'RepeatPasssword', value: 'Epic Developer', state: 'repeaPass'}}},
            {e: {target: {name: 'OldPasssword', value: 'loldon@mail.ru', state: 'oldPass'}}},
            {e: {target: {name: 'Nothing', value: '', state: ''}}},
		];
		for (let index = 0; index < eventItems.length - 1; index++) {
			const ddd = (fff.instance() as any).changeHandler(eventItems[index].e);
			expect(spy).toBeCalledWith(eventItems[index].e);
			expect(fff.instance().state[eventItems[index].e.target.state]).toBe(eventItems[index].e.target.value);
		}
		
    });
    
    it('test blurHandler ', () => {
		
		const fff = umMount
		.children()
		.children();
        const spy = jest.spyOn(fff.instance(), 'blurHandler'  as any);
        (fff.instance() as any).blurHandler();
		expect(spy).toHaveBeenCalledTimes(1);
    });
    
    it('test clickHandler ', () => {
		
		const fff = umMount
		.children()
		.children();
        const spy = jest.spyOn(fff.instance(), 'clickHandler'  as any);
        (fff.instance() as any).clickHandler();
		expect(spy).toHaveBeenCalledTimes(1);
    });
    
    it('test clickHandler ', () => {
		
		const fff = umMount2
		.children()
		.children();
        const spy = jest.spyOn(fff.instance(), 'clickHandler'  as any);
        (fff.instance() as any).clickHandler();
		expect(spy).toHaveBeenCalledTimes(1);
	});
		 
});
 