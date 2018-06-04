jest.unmock('../../index.tsx');
jest.unmock('redux-mock-store');

import * as React 						  		from 'react';
import UserAvatar 								from '../../components/UserAvatar';
import { 
	    configure, 
		shallow,
		mount, 
		ShallowWrapper, 
		ReactWrapper } 							from 'enzyme';
import * as Adapter 					  		from 'enzyme-adapter-react-16';
import toJson 				      				from 'enzyme-to-json';
import * as createMockStore 					from 'redux-mock-store';
import { Provider } 							from 'react-redux';

configure( {adapter: new Adapter()} );
let base64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfiBR8NLAkf95jJAAAA5klEQVQoz33QP0uCcRTF8U9/1ElsKSgH91ZxewppMByMXILcfBdBb8ShuaVXIEW1SIM4SENTZfAMgkYNBYEQDZo8PyLvdO/3Hu65HMKKRBbWjdtF601DQ/kkWgkETSMPttz9d6EjEukm0aqi9VmfldfBhmNvMzZecmVP2xe4cI6GI5Cx75q0lq7CH7uCrpb073OxSrCuiDWToGigOp+qBorTdnmGeh5N5oKJJ73QMWckhQN1pIythUEdymg701C269K2b/dJi5oPfUMlJbG+T7Uw8FcvyvN5x7N3qaTgVC74KetkmsEP724z6YNUPMMAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMDUtMzFUMTM6NDQ6MDkrMDI6MDCmJO14AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE4LTA1LTMxVDEzOjQ0OjA5KzAyOjAw13lVxAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=';
describe('<UserAvatar /> rendering', () => {
		
	let store, 
		useravatarShallow: ShallowWrapper<any, any>,
		useravatarMount:  ReactWrapper<any, any>;

	const mockStore = (createMockStore as any)();
	beforeEach( () => {
        store = mockStore({
			user: {
				user: {
					AvatarImageRef: 'something',
					Name: 'Test User'
				}
			}
		});
		const props = {
			user: {
				user: {
					AvatarImageRef: {
						Path: 'something'
					}
				}
			},
			onUpdate: Function
		};
        
		useravatarMount = mount(
            <Provider store={store}>
            	<UserAvatar {...props}/>
			</Provider>
        );
	}); 
		
	// test Snapshot 
	it('Match to snapshot', () => {
		expect(toJson(useravatarMount)).toMatchSnapshot();
	});
		
	it('Test state', () => {
		expect(useravatarMount.children().children().instance().state.allowZoomOut).toBe(false);
		expect(useravatarMount.children().children().instance().state.scale).toBe(1);
		expect(useravatarMount.children().children().instance().state.rotate).toBe(0);
		expect(useravatarMount.children().children().instance().state.borderRadius).toBe(300);
		expect(useravatarMount.children().children().instance().state.preview).toBe(null);
		expect(useravatarMount.children().children().instance().state.width).toBe(250);
		expect(useravatarMount.children().children().instance().state.height).toBe(250);
	});

	it('Test props user data', () => {
		const props = {
			AvatarImageRef: 'something',
			Name: 'Test User'
		};
		expect(useravatarMount.children().children().props().user).toEqual(props);
	});

	it('Test props user data', () => {
		const props = {
			AvatarImageRef: 'something',
			Name: 'Test User'
		};
		expect(useravatarMount.children().children().props().user).toEqual(props);
	});

	// it('test makeid', () => {
	// 	const fff = useravatarMount.children().children();
		
	// 	const spy = jest.spyOn(fff.instance(), 'makeid');
	// 	let makedId = fff.instance().makeid();
	// 	expect(spy).toHaveBeenCalledTimes(1);
	// 	expect(typeof(makedId)).toBe('string');
	// });

	// it('test b64toBlob', () => {
	// 	const fff = useravatarMount.children().children();
	// 	const spy = jest.spyOn(fff.instance(), 'b64toBlob');
	// 	let createFile = fff.instance().b64toBlob(base64);
	// 	expect(spy).toHaveBeenCalledTimes(1);
	// 	expect(spy).toBeCalledWith(base64);
	// 	expect(typeof(createFile)).toBe('object');
	// 	base64 = null;
	// 	createFile = fff.instance().b64toBlob(base64);
	// 	expect(spy).toBeCalledWith(base64);
	// 	expect(createFile).toBe('');
	// });

	// it('test useDefaultImage', () => {
	// 	const fff = useravatarMount.children().children();
	// 	const spy = jest.spyOn(fff.instance(), 'useDefaultImage');
	// 	fff.instance().useDefaultImage();
	// 	expect(spy).toHaveBeenCalledTimes(1);
	// 	// expect(spy).toBeCalledWith('lol');
	// });

	// it('test handleRotate', () => {
	// 	const fff = useravatarMount.children().children();
	// 	const spy = jest.spyOn(fff.instance(), 'handleRotate');
		
	// 	const event = {target: {name: 'rotate', value: 19}};
	// 	fff.instance().handleRotate(event);
	// 	// fff.find('#rotate').simulate('change', event);
	// 	expect(spy).toHaveBeenCalledTimes(1);
	// 	expect(spy).toBeCalledWith(event);
	// });

	// it('test handleDrop', () => {
	// 	const fff = useravatarMount.children().children();
	// 	const spy = jest.spyOn(fff.instance(), 'handleDrop');
		
	// 	const files = {acceptedFiles: [ 'image']};
	// 	fff.instance().handleDrop(files);
	// 	// fff.find('#rotate').simulate('change', event);
	// 	expect(spy).toHaveBeenCalledTimes(1);
	// 	expect(spy).toBeCalledWith(files);
	// });

	// it('test handleScale', () => {
	// 	const fff = useravatarMount.children().children();
	// 	const spy = jest.spyOn(fff.instance(), 'handleScale');
		
	// 	const event = {target: {name: 'scale', value: 19}};
	// 	fff.instance().handleScale(event);
	// 	// fff.find('#rotate').simulate('change', event);
	// 	expect(spy).toHaveBeenCalledTimes(1);
	// 	expect(spy).toBeCalledWith(event);
	// });

	// it('test imageChange', () => {
	// 	console.log(toJson(useravatarMount));
	// 	const fff = useravatarMount.children().children();
	// 	const spy = jest.spyOn(fff.instance(), 'imageChange');

	// 	fff.instance().imageChange();
	// 	// fff.find('#rotate').simulate('change', event);
	// 	expect(spy).toHaveBeenCalledTimes(1);
	// });

	// it('test handleSave', () => {
	// 	const fff = useravatarMount.children().children();
	// 	const spy = jest.spyOn(fff.instance(), 'handleSave');
	// 	fff.instance().handleSave();
	// 	// fff.find('#rotate').simulate('change', event);
	// 	expect(spy).toHaveBeenCalledTimes(1);
	// });

	// it('test setEditorRef', () => {
	// 	const fff = useravatarMount.children().children();
	// 	const spy = jest.spyOn(fff.instance(), 'setEditorRef');
	// 	let editor: any = 'something';
	// 	fff.instance().setEditorRef(editor);
	// 	// fff.find('#rotate').simulate('change', event);
	// 	expect(spy).toHaveBeenCalledTimes(1);
	// });
		
}); 

describe('<UserAvatar /> rendering without user data', () => {
		
	let store, 
		useravatarMount:  ReactWrapper<any, any>;

	const mockStore = (createMockStore as any)();
	beforeEach( () => {
        store = mockStore({
			user: {
				user: null
			}
		});
		const props = {
			user: {
				user: null
			},
			onUpdate: Function
		};
        
		useravatarMount = mount(
            <Provider store={store}>
            	<UserAvatar {...props}/>
			</Provider>
        );
	}); 

	// test Snapshot 
	it('Match to snapshot', () => {
		expect(toJson(useravatarMount)).toMatchSnapshot();
	});
		
});