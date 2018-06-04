jest.unmock('../../index.tsx');
jest.unmock('redux-mock-store');
jest.unmock('../../components/Body');

import * as React 						        from 'react';
import Body 							        from '../../components/Body';
import Logo 							        from '../../components/Logo';
import { 
	configure, 
    shallow,
    mount, 
    ShallowWrapper, 
    ReactWrapper, 
    render } 							    from 'enzyme';
import * as Adapter 					        from 'enzyme-adapter-react-16';
import toJson 				      		        from 'enzyme-to-json';
import {
    withRouter,
    BrowserRouter as Router
}                                               from 'react-router-dom';
import * as createMockStore						from 'redux-mock-store';
import { Provider } 							from 'react-redux';

configure( {adapter: new Adapter()} );

describe('<Body /> shallow rendering', () => {
    let store, body;
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
        body = shallow( (
            <Router>
                <Provider store={store}>
                <   Body />
                </Provider>
            </Router>)); 
	}); 

    // test Snapshot 
	it('Match to snapshot', () => {
		expect(toJson(body)).toMatchSnapshot();
    });
});

describe('<Body /> mount rendering when data is added', () => {
    let store, 
        body: ShallowWrapper<any, any>, 
        bodyMount: ReactWrapper<any, any>;
        
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
        bodyMount = mount( (
            <Router>
                <Provider store={store}>
                    <Body {...props} />
                </Provider>
            </Router>)); 
	});   

    // test Snapshot 
	it('Match to snapshot', () => {
        bodyMount.setState({
            isDataFetched: true,
            status: false
        });  
        expect(toJson(bodyMount)).toMatchSnapshot();
    });

    it('Test openMenu  ', () => {
		const fff = bodyMount
		.children()
		.children()
		.children()
        .children();
        fff.setState({
            open: false
        });
        const spy = jest.spyOn(fff.instance(), 'openMenu' as any);
		const ddd = (fff.instance() as any).openMenu();
		expect(spy).toHaveBeenCalledTimes(1);
	});

});