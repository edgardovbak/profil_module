jest.unmock('../../index.tsx');
jest.unmock('redux-mock-store');

import * as React 						  		from 'react';
import UserAvatar, { UserAvatarComponent } 		from '../../components/UserAvatar';
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
		useravatarMount:  ReactWrapper<any, any>,
		userAvatarComponent: ShallowWrapper<any, any>;

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
		let onUpdate = (value: any) => {
			return value;
		};
		let user = {
			AvatarImageRef: 'something',
			Name: 'Test User'
		};
		userAvatarComponent = shallow(
			<UserAvatarComponent onUpdate={onUpdate} user={user}/>
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

	it('test makeid', () => {
		const fff = useravatarMount.children().children();
		
		const spy = jest.spyOn(fff.instance() as any, 'makeid');
		let makedId = (fff.instance() as any).makeid();
		expect(spy).toHaveBeenCalledTimes(1);
		expect(typeof(makedId)).toBe('string');
	});

	it('test b64toBlob', () => {
		const fff = useravatarMount.children().children();
		const spy = jest.spyOn(fff.instance() as any, 'b64toBlob');
		let createFile = (fff.instance() as any).b64toBlob(base64);
		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toBeCalledWith(base64);
		expect(typeof(createFile)).toBe('object');
		base64 = null;
		createFile = (fff.instance() as any).b64toBlob(base64);
		expect(spy).toBeCalledWith(base64);
		expect(createFile).toBe('');
	});

	it('test useDefaultImage', () => {
		const fff = useravatarMount.children().children();
		const spy = jest.spyOn(fff.instance() as any, 'useDefaultImage');
		(fff.instance() as any).useDefaultImage();
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('test handleRotate', () => {
		const fff = useravatarMount.children().children();
		const spy = jest.spyOn(fff.instance() as any, 'handleRotate');
		useravatarMount.setState({
			rotate: 0
		});
		const event = {target: {name: 'rotate', value: 19}};
		(fff.instance() as any).handleRotate(event);
		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toBeCalledWith(event);
	});

	it('test handleDrop', () => {
		const fff = useravatarMount.children().children();
		const spy = jest.spyOn(fff.instance() as any, 'handleDrop');
		
		const files = {acceptedFiles: [ 'image']};
		(fff.instance() as any).handleDrop(files);
		// fff.find('#rotate').simulate('change', event);
		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toBeCalledWith(files);
	});

	it('test handleScale', () => {
		const fff = useravatarMount.children().children();
		const spy = jest.spyOn(fff.instance() as any, 'handleScale');
		
		const event = {target: {name: 'scale', value: 19}};
		(fff.instance() as any).handleScale(event);
		// fff.find('#rotate').simulate('change', event);
		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toBeCalledWith(event);
	});

	it('test imageChange', () => {
		const fff = useravatarMount.children().children();
		const spy = jest.spyOn(fff.instance() as any, 'imageChange');

		(fff.instance() as any).imageChange();
		// fff.find('#rotate').simulate('change', event);
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('test handleSave', () => {
		const fff = useravatarMount.children().children();
		const spy = jest.spyOn(fff.instance() as any, 'handleSave');
		(fff.instance() as any).handleSave();
		// fff.find('#rotate').simulate('change', event);
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('test setEditorRef', () => {
		const fff = useravatarMount.children().children();
		const spy = jest.spyOn(fff.instance() as any, 'setEditorRef');
		let editor: any = 'something';
		(fff.instance() as any).setEditorRef(editor);
		// fff.find('#rotate').simulate('change', event);
		expect(spy).toHaveBeenCalledTimes(1);
	});
		
}); 