import * as React 						  	from 'react';
import UserInfoListItem 					from '../../components/UserInfoListItem';
import { 
		configure, 
		shallow,
		mount,
		render } 							from 'enzyme';
import * as Adapter 					  	from 'enzyme-adapter-react-16';
import toJson 				      			from 'enzyme-to-json';

configure( {adapter: new Adapter()} );

describe('<UserInfoListItem /> shallow rendering', () => {

	const props = {
		name: 'Test item',
		value: 'Item 1',
		infoType: 0
	};
		
	const userinfolist = mount(<UserInfoListItem {...props}/>); 
		
	// test Snapshot 
	it('Match to snapshot', () => {
		expect(toJson(userinfolist)).toMatchSnapshot();
	});

	it('Get a simple text value', () => {
		expect(userinfolist.find('.user__global_info__list__item--name').text()).toBe('Test item :');
		expect(userinfolist.find('.user__global_info__list__item--value').text()).toBe('Item 1');
	});

	it('Get a link value', () => {
		const props2 = {
			name: 'Test item',
			value: 'Item 1',
			infoType: 1
		};
		const userinfolist2 = render(<UserInfoListItem {...props2}/>); 
		expect(userinfolist2.find('.user__global_info__list__item--name').text()).toBe('Test item :');
		expect(userinfolist2.find('.user__global_info__list__item--value a').text()).toBe('Item 1');
	}); 

	it('Get a select box value', () => {
		const props3 = {
			name: 'Test item',
			value: 'Item 1',
			infoType: 2
		};
		const userinfolist3 = render(<UserInfoListItem {...props3}/>); 
		expect(userinfolist3.find('.user__global_info__list__item--name').text()).toBe('Test item :');
		expect(userinfolist3.find('.user__global_info__list__item--value select').val()).toBe('Item 1');
	});
		
	it('Not added value type', () => {
		const props4 = {
			name: 'Test item',
		};
		const userinfolist4 = render(<UserInfoListItem {...props4}/>); 
		expect(userinfolist4.find('.user__global_info__list__item--name').text()).toBe('Test item :');
		expect(userinfolist4.find('.user__global_info__list__item--value').text()).toBe('');
	});
});
 