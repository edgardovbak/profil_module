jest.unmock('../../index.tsx');
jest.unmock('redux-mock-store');

import * as React 							from 'react';
import SidebarUser, { SidebarUserComponent } from '../../components/SidebarUser';
import { 
	configure, 
    mount, 
    ReactWrapper, 
    shallow,
    ShallowWrapper } 						from 'enzyme';
import * as Adapter 						from 'enzyme-adapter-react-16';
import toJson 				      			from 'enzyme-to-json';
import * as createMockStore 				from 'redux-mock-store';
import { Provider } 						from 'react-redux';
import {
    BrowserRouter as Router
} 											from 'react-router-dom';										

const DATA = require('../../config.json');

configure( {adapter: new Adapter()} );

describe('<SidebarUser /> rendering', () => {
    let store, 
        sidebaruser: ReactWrapper<any, any>,
        sidebaruserComponent: ShallowWrapper<any, any>;
	let path = DATA.ims;
	const  options = {
		select : ['Name', 'DisplayName', 'JobTitle', 'Email', 'Skype'],
		query: 'TypeIs:User',
	};
	const mockStore = (createMockStore as any)();
	beforeEach( () => {
        store = mockStore({
			sensenet: {
				session: {
					user: {
                        userName: 'TestUser1',
                        fullName: 'Test User 1'
					}
				}
            },
            user: {
                user: {
                    AvatarImageRef: {
                        Path: 'something.png'
                    },
                    FullName: 'Somebody'
                }
            }
		});
        sidebaruser = mount(
            <Router>
                <Provider store={store}>
                    <SidebarUser /> 
                </Provider>
            </Router>
        ); 
        // sidebaruserComponent = shallow(
        //     <SidebarUserComponent 
        //         userName={'toto'}
        //         user={null}
        //         fullName={'toto to'}
        //     />
        // );
    }); 
	
	// test Snapshot 
	it('Match to snapshot', () => {
        expect(toJson(sidebaruser)).toMatchSnapshot();  
    });

    // it('Match to snapshot without avatar', () => {
    //     sidebaruserComponent.setState({
    //         usAvatar: 'someImage.png'
    //     });
    //     expect(toJson(sidebaruserComponent)).toMatchSnapshot();  
    // });
    
    it('Test props', () => {
        const sidebarChildren = sidebaruser.children().children().children().children();
        expect(sidebarChildren.props().fullName).toBe('Test User 1');
        expect(sidebarChildren.props().userName).toBe('TestUser1');
    });
});
 