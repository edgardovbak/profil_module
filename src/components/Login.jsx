import * as React               from 'react';

export const Login = ({ formSubmit }) => {
    let nameInput, passwordInput;
    const onSubmit = e => {
        e.preventDefault();
        formSubmit(e, nameInput.value, passwordInput.value);
    };
    return (
        <div className="fix_block">
            <div className="login_page">
                <h1>Login</h1>
                <form onSubmit={e => { onSubmit(e); }}>
                    <input type="text" placeholder="loginname" ref={el => nameInput = el} />
                    <input type="password" placeholder="password" ref={el => passwordInput = el} />
                    <button className="btn">login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;