import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'

class Login extends Component {

    state = {
        username: '',
        email: '',
        password: '',
        errors: ''
    }

    handleChange = (event) => {
        const { name, value } = event.target

        this.setState({
            [name]: value
        })

    };

    handleSubmit = (event) => {
        event.preventDefault()

        const { username, email, password } = this.state

        let user = {
            username: username,
            email: email,
            password: password
        }

        // creating a user object based on the component’s state. 
        // This is the data argument that axios will POST to the Rails server for authentication

        // also passing {withCredentials: true}. Pass this in the header as it’s what allows Rails to set the cookie!

        axios.post('http://localhost:3001/login', { user }, { withCredentials: true })
            .then(response => {
                if (response.data.logged_in) {
                    // if valid, call App.js' handleLogin() method, 
                    // which will change the app’s isLogged_in status.

                    this.props.handleLogin(response.data)
                    this.redirect()
                } else {
                    //  Else, the server responds with errors and we set the state’s errors attribute
                    
                    this.setState({
                        errors: response.data.errors
                    })
                }
            })
            .catch(error => console.log('api errors:', error))
    };

    handleErrors = () => {
        // IF error attribute evaluates to true, 
        // the handleErrors() method is called in the component’s render() method 
        // and displays these errors to the user

        return (
            <div>
                <ul>
                {this.state.errors.map((error) => {
                    return <li key={error} > { error }</li>
                    })
                }
                </ul> 
            </div >
        )
    }


    render() {
        const { username, email, password } = this.state

        return (
            <div>
                <h1>Log In</h1>
                <form onSubmit={this.handleSubmit}>
                    <input
                        placeholder="username"
                        type="text"
                        name="username"
                        value={username}
                        onChange={this.handleChange}
                    />
                    <input
                        placeholder="email"
                        type="text"
                        name="email"
                        value={email}
                        onChange={this.handleChange}
                    />
                    <input
                        placeholder="password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                    />
                    <button placeholder="submit" type="submit">
                        Log In
                    </button>
                    <div>
                        or <Link to='/signup'>sign up</Link>
                    </div>

                </form>
                <div>
                    {
                        this.state.errors ? this.handleErrors() : null
                    }
                </div>
            </div>
        );
    }
}
export default Login;