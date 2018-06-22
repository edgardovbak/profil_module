
import * as React				    from 'react';
import axios                        from 'axios';

const DATA = require('../config.json');

export class ForgottenPassComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            email: ''
        },
        this.clickHandler           = this.clickHandler.bind(this);
        this.handleChange           = this.handleChange.bind(this);
    }

    public clickHandler = () => {
        const userEmail = {
            UserEmail:  this.state.email
        };
        axios.post(DATA.odataDomain + '/Root/Sites/Profil(\'ForgottenPassword\')/BisonProfileSendChangePasswordMail', userEmail)
        .then(res => {
            this.props.history.push('/login');
        });
    }

    public handleChange = (e: any) => {
        this.setState({
            email: e.target.value,
        });
    }

    // edgar.dovbak@sensenet.com

    render() {

		return (
			<div className="">
				<label htmlFor="Email">Enter your email</label>
                <input 
                    type="email" 
                    id="Email"
                    name="Email"
                    autoComplete="nope"
                    required={true}
                    onChange={this.handleChange}
                />
                <p/>
                <button className="sn_btn" onClick={this.clickHandler} >
                    Send
                </button>
			</div>
		);
	}
}

export default ForgottenPassComponent;
 