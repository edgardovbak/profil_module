jest.unmock('../../index.tsx');
jest.unmock('redux-mock-store');

import * as React 						        from 'react';
import Menu 							        from '../../components/Menu';
import { MenuComponent }                        from '../../components/Menu';
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
import { LoginState, IODataCollectionResponse } from '@sensenet/client-core';
import { promiseMiddleware }                    from '@sensenet/redux-promise-middleware';
import { Folder }                               from '@sensenet/default-content-types';
import {
    BrowserRouter as Router
}                                               from 'react-router-dom';
const  options = {
    select : ['Name', 'IconName', 'Id', 'Path', 'DisplayName']
};
configure( {adapter: new Adapter()} );
describe('<Menu /> shallow rendering with user data', () => {
    let menuComponent: ReactWrapper<any, any>;
    let menu: ReactWrapper<any, any>;
   
	beforeEach( () => {
        let getMenuItems: MenuComponent['props']['getMenuItems'] = async () => {
            return {
                value: {
                    entities: {
                        entities: {
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
                        result: {}
                    },
                    result: {}
                }
            };
        };

        menuComponent = mount(
            <Router>
                <MenuComponent getMenuItems={getMenuItems} userLoginState="alma"/> 
            </Router>
        );   

        menu = mount(
            <Router>
                <MenuComponent getMenuItems={getMenuItems} userLoginState="alma"/> 
            </Router>
        );   
    }); 
    // test Snapshot 
	it('Match to snapshot', () => {
        expect(toJson(menuComponent)).toMatchSnapshot();
    });

    it('Menu have sidebar class', () => {
        let menuContent = menu.children().children();
        expect(menuContent.find('.sn_sidebar__menu').length).toBe(0);
    });

    it('call ComponentDidMouint', () => {
        jest.spyOn(Menu.prototype, 'componentDidMount');
        expect(Menu.prototype.componentDidMount.call.length).toBe(1);
    });
    
});
 