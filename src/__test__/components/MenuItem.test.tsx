import * as React 						from 'react';
import MenuItem 				        from '../../components/MenuItem';
import { 
	configure, 
    shallow,
    mount } 							from 'enzyme';
import * as Adapter 					from 'enzyme-adapter-react-16';
import toJson 				      		from 'enzyme-to-json';

configure( {adapter: new Adapter()} );

describe('<MenuItem /> shallow rendering', () => {
    const menuItem = shallow(<MenuItem pathTo="/" name="home" icon="fi "/>);
    // test Snapshot 
	it('Match to snapshot', () => {
		expect(toJson(menuItem)).toMatchSnapshot();
    });

    it('Menu item have a name', () => {
		expect(menuItem.find('.sn_sidebar__menu__item__name').text()).toBe('home');
    });

    it('Menu item have a icon', () => {
        let haveIcon;
        menuItem.find('.sn_sidebar__menu__item__icon i').filterWhere((item) => {
            haveIcon = item.hasClass('fi ');
            return item.hasClass('fi ');
        });
        expect(haveIcon).toBe(true);
    });

    it('Click event', () => {
        expect(menuItem.state().isClicked).toBe(false);
        menuItem.simulate('click');
        expect(menuItem.state().isClicked).toBe(true);
    });

    it('Test path in href attribute', () => {
        const menuItem1 = shallow(<MenuItem pathTo="/home" name="home" icon="fi "/>);
        expect(menuItem1.state().path).toBe('/home');
        const menuItem2 = shallow(<MenuItem pathTo={null} name="home" icon="fi "/>);
        expect(menuItem2.state().path).toBe('/');
    });
 
    it('test handleClick', () => {
		const spy = jest.spyOn((menuItem.instance() as any), 'handleClick');
		const ddd = (menuItem.instance() as any).handleClick();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(menuItem.state().isClicked).toBe(true);
	}); 
}); 
 