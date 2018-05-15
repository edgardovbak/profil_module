import * as React 						from 'react';
import App 								from '../App';
import { 
	configure, 
	shallow } 							from 'enzyme';
import * as Adapter 					from 'enzyme-adapter-react-16';
import toJson 				      		from 'enzyme-to-json';

configure( {adapter: new Adapter()} );

describe('<App /> shallow rendering', () => {
	const wrapper = shallow(<App />);
	it('Contain one H1 element ', () => {
		expect(wrapper.find('h1').length).toBe(0);
		
	});
	it('Match to snapshot', () => {
		const tree = shallow(<App />);
		expect(toJson(tree)).toMatchSnapshot();
	});

	// it('On button click change h1 text', () => {
	// 	const button = wrapper.find('button');
	// 	expect(wrapper.find('button').length).toBe(1);
	// 	expect(wrapper.find('h1').text()).toBe('No');
	// 	button.simulate('click');
	// 	expect(wrapper.find('h1').text()).toBe('Yes');
	// });

	// it('On input element change text', () => {
	// 	const input = wrapper.find('input');
	// 	expect(wrapper.find('input').length).toBe(1);
	// 	expect(wrapper.find('h2').text()).toBe('');
	// 	input.simulate('change', {target: { value: 'Loldon'}});
	// 	expect(wrapper.find('h2').text()).toBe('Loldon');
	// });

	// it('Update class name with setState', () => {
	// 	expect(wrapper.find('.blue').length).toBe(1);
	// 	expect(wrapper.find('.red').length).toBe(0);
	// 	wrapper.setState({ mainColor: 'red' });
	// 	expect(wrapper.find('.blue').length).toBe(0);
	// 	expect(wrapper.find('.red').length).toBe(1);
	// });

	// it('calls ComponentDidMouint', () => {
	// 	jest.spyOn(App.prototype, 'componentDidMount');
	// 	expect(App.prototype.componentDidMount.call.length).toBe(1);
	// });
});
