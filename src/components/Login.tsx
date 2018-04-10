import * as React                   from 'react';

const logo = require('../images/logo.png');

export const Login = ({formSubmit}: {formSubmit: any}) => {
    let nameInput: any;
    let passwordInput: any;
    const onSubmit = (e: any) => {
        e.preventDefault();
        formSubmit(e, nameInput.value, passwordInput.value);
    };
    
    return (
        <div className="fix_block">
            <img src={logo} alt="site logo" />
            <div className="login_page">
                <h1>Login</h1>
                <form onSubmit={e => { onSubmit(e); }}>
                    <input type="text" required={true} placeholder="loginname" ref={el => nameInput = el} />
                    <input type="password" required={true} placeholder="password" ref={el => passwordInput = el} />
                    <button className="sn_btn">login</button>
                </form>
            </div>
        </div>
    );
};

export default Login; 