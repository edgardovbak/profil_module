jest.unmock('../../index.tsx');
jest.unmock('redux-mock-store');
jest.unmock('../../components/Body');

import * as React 						        from 'react';
import Body, { BodyComponent } 					from '../../components/Body';
import Logo 							        from '../../components/Logo';
import { 
	configure, 
    shallow,
    mount, 
    ShallowWrapper, 
    ReactWrapper, 
    render } 							        from 'enzyme';
import * as Adapter 					        from 'enzyme-adapter-react-16';
import toJson 				      		        from 'enzyme-to-json';
import {
    withRouter,
    BrowserRouter as Router
}                                               from 'react-router-dom';
import * as createMockStore						from 'redux-mock-store';
import { Provider } 							from 'react-redux';

configure( {adapter: new Adapter()} );

const DATA = require('../../config.json');

describe('<Body /> mount rendering when data is added', () => {
    let store, 
        bodyMount: ReactWrapper<any, any>,
        bodyComponentShallow: ShallowWrapper<any, any>;
        
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
        bodyComponentShallow = shallow( (
            // <Router>
            //     <Provider store={store}>
                    <BodyComponent {...props} />
            //     </Provider>
            // </Router>
        )); 
	});   

    // test Snapshot 
	it('Match to snapshot', () => {
        expect(toJson(bodyMount)).toMatchSnapshot();
        expect(toJson(bodyComponentShallow)).toMatchSnapshot();
    });

    it('Match to snapshot with status flase', () => {
        bodyMount.setState({
            status: true
        });
        expect(toJson(bodyMount)).toMatchSnapshot();
    });

    // test Snapshot 
	it('Match to snapshot with status true', () => {
        bodyMount.setState({
            status: true
        }); 
        bodyMount.update();
        // console.log(bodyMount.html()); 
        expect(toJson(bodyMount)).toMatchSnapshot();
        
    });

    it('Test openMenu  ', () => {
		const fff = bodyMount.children()
		.children()
		.children()
        .children()
        .children()
        .children();
        bodyMount.setState({
            open: false
        });
        // console.log(bodyMount.state().status);
        const spy = jest.spyOn(fff.instance(), 'openMenu' as any);
		const ddd = (fff.instance() as any).openMenu();
        expect(spy).toHaveBeenCalledTimes(1);
        // console.log(bodyMount.state().open);
    });
    
});