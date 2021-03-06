import React, { Component } from 'react';
import axios from 'axios'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/registrations/Login'
import Signup from './components/registrations/Signup'

class App extends Component {

  // use the component’s state to maintain the logged in status of a User
  // and to store the User data when we request it from the server
  state = {
    isLoggedIn: false,
    user: {}
  }

  handleLogin = (data) => {
    this.setState({
      isLoggedIn: true,
      user: data.user
    })
  }

  handleLogout = () => {
    this.setState({
      isLoggedIn: false,
      user: {}
    })
  }

  loginStatus = () => {
    // GET API response data

    // {withCredentials: true}, allows our Rails server to set and read the cookie on the front-end’s browser
    // always pass this arg

    // Rails /logged_in, route and its corresponding controller action
    // App.js component communicates with Rails through this route 
    // If the User is verified in the Rails server, then a logged_in boolean is returned, along with the user object
    // App.js uses this response data to maintain the logged in status in the front-end

    axios.get('http://localhost:3001/logged_in',
      { withCredentials: true })
      .then(response => {

        if (response.data.logged_in) {
          this.handleLogin(response)
        } else {
          this.handleLogout()
        }

      })
      .catch(error => console.log('api errors:', error))
  }

  componentDidMount() {
    // keep track of status and request this information every time it’s mounted
    this.loginStatus()
  }

  // app won't render itself to DOM
  // will serve as our router to render all other components
  // will also manage the application’s state and authentication status

  render() {
    // rendering components using render=props
    // allows us to pass props to the components to be rendered
    // in this way, we can pass 
    // isLoggedIn state status, handleLogin(), and handleLogout(), 
    // to our components as props

    // can also pass the User object from state down to the necessary components, not passing User currently

    return (
      <div>

        <BrowserRouter>

          <Switch>

            <Route
              exact path='/'
              render={props => (
                <Home {...props} loggedInStatus={this.state.isLoggedIn} />
              )}
            />

            <Route
              exact path='/login'
              render={props => (
                <Login {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn} />
              )}
            />

            <Route
              exact path='/signup'
              render={props => (
                <Signup {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn} />
              )}
            />

          </Switch>

        </BrowserRouter>
        
      </div>
    );
  }
}

export default App;
