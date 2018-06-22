import * as React 						  	from 'react';
import ForgottenPass,
		{ ForgottenPassComponent }			from '../../components/ForgottenPass';
import { 
	configure, 
		shallow,
		mount } 							from 'enzyme';
import * as Adapter 					  	from 'enzyme-adapter-react-16';
import toJson 				      			from 'enzyme-to-json';

configure( {adapter: new Adapter()} );

describe('<ForgottenPass /> shallow rendering', () => {
		
	const forgottenPass = mount(<ForgottenPass />); 
		
	// test Snapshot 
	it('Match to snapshot', () => {
		expect(toJson(forgottenPass)).toMatchSnapshot();
	});

	it('Test handleChange', () => {
		const fff = forgottenPass;
		const spy = jest.spyOn((fff.instance() as any), 'handleChange');
		let e = {
			target: {
				value: 'email@test.test'
			}
		};
		const ddd = (fff.instance() as any).handleChange(e);
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('Test clickHandler ', () => {
		const fff = forgottenPass;
		const spy = jest.spyOn((fff.instance() as any), 'clickHandler');
		const ddd = (fff.instance() as any).clickHandler();
		expect(spy).toHaveBeenCalledTimes(1);
	});
});
 