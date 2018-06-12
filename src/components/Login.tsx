import * as React                   from 'react';
import axios                        from 'axios';
const logo = require('../images/logo.png');

const DATA = require('../config.json');

interface Props {
    formSubmit: (email: string, pass: string) => void;
}

interface State {
    emailInput: string;
    passwordInput: string;
    error: boolean;
    emailValid: boolean;
    passwordValid: boolean;
}

export class Login extends React.Component<Props, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            emailInput: '', 
            passwordInput: '',
            emailValid: true,
            passwordValid: true,
            error: false,
        },

        this.onSubmit               = this.onSubmit.bind(this);
        this.handleUserEmail        = this.handleUserEmail.bind(this);
        this.handleUserPassword     = this.handleUserPassword.bind(this);
        this.handleBlur             = this.handleBlur.bind(this);
        this.clickHandler           = this.clickHandler.bind(this);
    }
    
    public onSubmit = () => {
        this.props.formSubmit(this.state.emailInput, this.state.passwordInput);
    }

    public handleUserEmail = (e: any) => {
        const emailValid = e.target.value.match(/^[A-Za-z\s0-9\\]+$/);
        this.setState({
            emailInput: e.target.value,
        });
        if ( emailValid && e.target.value.length > 0) {
            this.setState({
                emailValid: true
            });
        } else {
            this.setState({
                error: true,
                emailValid: false
            });
        }
    }

    public handleUserPassword = (e: any) => {
        const regex = /^[A-Za-z\s0-9\\]+$/;
        const special = !e.target.value.match(/[!@#$%\^&*\+]/);
        let passwordValid = regex.test(e.target.value) && special ? true : false;
        this.setState({
            passwordInput: e.target.value,
        });
        // console.log(e.target.value);
        if ( passwordValid ) {
            this.setState({
                passwordValid: true
            });
            
        } else {
            this.setState({
                error: true,
                passwordValid: false
            });
        }
    }

    public handleBlur = () => {
        if (this.state.emailValid && this.state.passwordValid) {
            this.setState({
                error: false
            });
        }
    }

    public clickHandler = () => {
        const userEmail = {
            UserEmail: 'edgar.dovbak@sensenet.com'
          };
        axios.post(DATA.odataDomain + '/Root/Sites/Profil(\'ForgottenPassword\')/BisonProfileSendChangePasswordMail', userEmail)
        .then(res => {
            console.log(res);
            console.log(res.data);
        });
    }

    public render () {
        return (
            <div className="fix_block">
                <img src={logo} alt="site logo" />
                <div className="login_page">
                    <h1>Login</h1>
                    <form onSubmit={e => { this.onSubmit(); }}>
                        <input 
                            type="text" 
                            required={true} 
                            placeholder="loginname" 
                            name="email"
                            data-testid="email"
                            onChange={this.handleUserEmail}
                            value={this.state.emailInput}
                            onBlur={this.handleBlur}
                        />
                        <input 
                            type="password" 
                            required={true} 
                            placeholder="password" 
                            name="password"
                            className="login__password"
                            data-testid="password"
                            onChange={this.handleUserPassword}
                            value={this.state.passwordInput}
                            onBlur={this.handleBlur}
                        />
                        <button 
                            className="sn_btn"
                            id="submitLoginForm"
                            disabled={this.state.passwordValid && this.state.emailValid ? false : true}
                        >
                            login
                        </button>
                        <div onClick={this.clickHandler}>
                            Forgott password
                        </div>
                        { this.state.error ? 
                            ( 
                                <div className="error">
                                    Values atre not valid
                                </div>
                            )
                            :
                            ( '' )
                        }
                    </form>
                </div>
            </div>
        );
    }
}

export default Login; 