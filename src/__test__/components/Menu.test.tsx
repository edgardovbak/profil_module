jest.unmock('../../index.tsx');
jest.unmock('redux-mock-store');

import * as React 						        from 'react';
import Menu 							        from '../../components/Menu';
import { 
	configure, 
    shallow,
    mount,
    render, 
    ReactWrapper, 
    ShallowWrapper } 							from 'enzyme';
import * as Adapter 					        from 'enzyme-adapter-react-16';
import * as createMockStore 				    from 'redux-mock-store';
import toJson 				      		        from 'enzyme-to-json';
import { Actions
}                                               from '@sensenet/redux';
import { LoginState }                           from '@sensenet/client-core';
import { Provider } 							from 'react-redux';
import { Repository }                           from '@sensenet/client-core';
import { JwtService }                           from '@sensenet/authentication-jwt';
import { promiseMiddleware }                    from '@sensenet/redux-promise-middleware';

const DATA = require('../../config.json');
let path = DATA.domain + DATA.menu;
const  options = {
    select : ['Name', 'IconName', 'Id', 'Path', 'DisplayName']
};
configure( {adapter: new Adapter()} );
describe('<Menu /> shallow rendering with user data', () => {
    let store, menu: ReactWrapper<any, any>;
    let _store;
    let repo;
    let _jwtService;
    const contentMockResponse = {
        ok: true,
        status: 200,
        json: async () => {
            return {
                d: {
                    entities: {},
                    result: {
                        3892: {
                          'Id': 3892,
                          'Path': '/Root/Sites/Profil/Menu/MenuItem1',
                          'Name': 'MenuItem1',
                          'Type': 'ProfilMenuItem',
                          'IconName': 'flaticon-pirate',
                          'DisplayName': 'Menu Item 1'
                        },
                        3891: {
                          'Id': 3891,
                          'Path': '/Root/Sites/Profil/Menu/MenuItem100',
                          'Name': 'MenuItem100',
                          'Type': 'ProfilMenuItem',
                          'IconName': 'flaticon-island',
                          'DisplayName': 'Menu Item 100'
                        },
                        3893: {
                          'Id': 3893,
                          'Path': '/Root/Sites/Profil/Menu/Menu Item 2',
                          'Name': 'Menu Item 2',
                          'Type': 'ProfilMenuItem',
                          'IconName': 'flaticon-youtube',
                          'DisplayName': 'Menu Item 2'
                        }
                    },
                },
            };
        },
    } as Response;
    
	beforeEach( () => {
        repo = new Repository({ repositoryUrl: DATA.domain}, async () => contentMockResponse);
        _jwtService = new JwtService(repo);
        const mockStore = (createMockStore as any)([promiseMiddleware(repo)]);
        store = mockStore({
			sensenet: {
				session: {
					user: {
						userName: 'TestUser1'
                    },
                    loginState: 'Authorized'
				}
			}
		});
        menu = mount(
            <Provider store={store}>
                <Menu /> 
            </Provider>
        );   
    }); 
    // test Snapshot 
	it('Match to snapshot', () => {
        expect(toJson(menu)).toMatchSnapshot();
    });

    let data;
    let dataWithoutOptions;
    
    beforeEach(async (done) => {
        let menuContent = menu.children().children();
        // data = await menuContent.props().getMenuItems(DATA.menu, options);
        // console.log(menuContent.props().getMenuItems(DATA.menu, options));
    });
    // it('should return mockdata', () => {
    //     let menuContent = menu.children().children();
    //     console.log(menuContent.props().getMenuItems(DATA.menu, options));
    //     expect(data).toBe({ entities: {}, result: [] });
    // });

    // it('Menu have sidebar class', () => {
    //     let menuContent = menu.children().children();
    //     expect(menuContent.find('.sn_sidebar__menu').length).toBe(0);
    // });

    // it('call ComponentDidMouint', () => {
    //     jest.spyOn(Menu.prototype, 'componentDidMount');
    //     expect(Menu.prototype.componentDidMount.call.length).toBe(1);
    // });

    // it('Props state value should be the same as in store', () => {
    //     let menuContent = menu.children().children();
    //     expect(menuContent.props().userLoginState).toBe('Authorized');
	// });
    
});
 