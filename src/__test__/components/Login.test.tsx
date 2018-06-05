import * as React 						from 'react';
import Login 							from '../../components/Login';
import { 
	configure, 
    shallow,
    mount, 
    ReactWrapper } 						from 'enzyme';
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

describe('<Login /> rendering', () => {
    const props = {
        formSubmit: (emailInput: string, passwordInput: string) => {
            return 'sucsces';
        }
    };
    const login: ReactWrapper<any, any> = mount(<Login {...props} />); 

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
        let spyBlur = jest.spyOn(Login.prototype, 'handleBlur'); 
        let spyEmail = jest.spyOn(Login.prototype, 'handleUserEmail'); 
        
        const input = login.find('[data-testid="email"]');
        Login.prototype.handleBlur();
        let event = {
            target: {value: 'abAB12'}
        };
        Login.prototype.handleUserEmail(event);
        input.simulate('change');
        expect(spyBlur).toHaveBeenCalledTimes(1);
        expect(spyEmail).toHaveBeenCalledTimes(1);
    }); 

    it('Password is called without errors', () => {
        let spyPass = jest.spyOn(Login.prototype, 'handleUserPassword'); 
        
        let input = login.find('[data-testid="password"]');

        let event = {
            target: {value: 'abAB12'}
        };
        Login.prototype.handleUserPassword(event);
        input.simulate('change');
        expect(spyPass).toHaveBeenCalledWith(event);
        expect(spyPass).toHaveBeenCalledTimes(1);
    }); 

    it('onSubmit is called ', () => {
        let spyPass = jest.spyOn(Login.prototype, 'onSubmit'); 
        let event = {
            target: {value: 'nothing'}
        };
        Login.prototype.onSubmit();
        expect(spyPass).toHaveBeenCalledTimes(1);
    }); 
    
    it('Error message ', () => {
        login.setState({ error: true });
        const errorMsg = login.find('.error');
        expect(errorMsg.length).toBe(1);
        login.setState({ error: false });
    }); 
});
