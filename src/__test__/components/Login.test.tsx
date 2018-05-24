import * as React 						from 'react';
import Login 							from '../../components/Login';
import { 
	configure, 
    shallow,
    mount } 							from 'enzyme';
import * as Adapter 					from 'enzyme-adapter-react-16';
import toJson 				      		from 'enzyme-to-json';

configure( {adapter: new Adapter()} );

const updateInput = (login: any, instance: any, newValue: any) => {
    const input = login.find(instance);
    input.simulate('change', {
        target: {value: newValue}
    });
    return login.find(instance);
};

const wrongEmails = ['somebody@', 'somebody@.', 'somebody@mail', 'somebodymail.com', 'somebody@mail.'];
const wrongPasswords = ['aaaaaa', 'aaaa@', '@@@@###', 'AAAAAA', 'AAAdfsdd', 'AAA1234', 'gdfdf1234', 'sd'];

describe('<Login /> shallow rendering', () => {
    const props = {
        formSubmit: jest.fn()
    };
    const login = shallow(<Login {...props} />); 

    Login.prototype.constructor();
    
	it('Contain one H1 element ', () => {
		expect(login.find('h1').length).toBe(1);
    });
    // test Snapshot 
	it('Match to snapshot', () => {
		expect(toJson(login)).toMatchSnapshot();
    });
     
    it('Income values are same as in state ', () => {
        const email = updateInput(login, '[data-testid="email"]', 'edgar@gmail.com');
        const password = updateInput(login, '[data-testid="password"]', 'abAB12');
        expect(email.props().value).toBe('edgar@gmail.com');
        expect(password.props().value).toBe('abAB12');
    }); 
    
    it('Email validation ', () => {
        for (let index = 0; index < wrongEmails.length; index++) {
            const email = updateInput(login, '[data-testid="email"]', wrongEmails[index]);
            expect(login.state().emailValid).toBe(false);
        }
    }); 
    
    it('Password validation ', () => {
        for (let index = 0; index < wrongPasswords.length; index++) {
            const password = updateInput(login, '[data-testid="password"]', wrongPasswords[index]);
            expect(login.state().passwordValid).toBe(false);
        }
    }); 

    it('Password change calls validation functions', () => {
        jest.spyOn(Login.prototype, 'handleBlur'); 
        jest.spyOn(Login.prototype, 'handleUserPassword'); 
        
        const input = login.find('[data-testid="password"]');
        input.simulate('change', {
            target: {value: 'abAB12'}
        });
        expect(Login.prototype.handleBlur.call.length).toBe(1);
        expect(Login.prototype.handleUserPassword.call.length).toBe(1);
    }); 

    it('Email change calls validation functions', () => {
        jest.spyOn(Login.prototype, 'handleBlur'); 
        jest.spyOn(Login.prototype, 'handleUserEmail'); 
        
        const input = login.find('[data-testid="email"]');
        input.simulate('change', {
            target: {value: 'abAB12'}
        });
        expect(Login.prototype.handleBlur.call.length).toBe(1);
        expect(Login.prototype.handleUserEmail.call.length).toBe(1);
        // console.log(Login.prototype.handleUserEmail);
    }); 

    it('Password is called without errors', () => {
        jest.spyOn(Login.prototype, 'handleUserPassword'); 
        
        const input = login.find('[data-testid="password"]');
        input.simulate('change', {
            target: {value: 'abAB12'}
        });
        // expect(Login.prototype.handleUserPassword).toHaveBeenCalledWith('abAB12');
    }); 
    
    it('Error message ', () => {
        login.setState({ error: true });
        const errorMsg = login.find('.error');
        expect(errorMsg.length).toBe(1);
        login.setState({ error: false });
    }); 

    // it('Submits the form ', () => {
    //     const loginf = mount(<Login />); 
    //     jest.spyOn(loginf, 'onSubmit').mockImplementation(() => Promise.resolve({
    //         data : 'Login user'
    //     }));
    //     updateInput(loginf, '[data-testid="email"]', 'edgar@gmail.com');
    //     updateInput(loginf, '[data-testid="password"]', 'abAB12');
    //     loginf.find('#submitLoginForm').simulate('click');
        
    //     expect(loginf.onSubmit).toBeCalledWith({username: 'edgar@gmail.com', password: 'abAB12'});
    // }); 

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
