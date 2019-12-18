import React, { Component } from 'react';

class Login extends Component {

    state = {
        username: '',
        email: '',
        password: '',
        errors: ''
    }

    render() {
        return (
            <div>
                <h1>Log In</h1>
            </div>
        );
    }
}
export default Login;