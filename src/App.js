import React, { Component } from 'react';
import axios from 'axios'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

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

  // app won't render itself to DOM
  // will serve as our router to render all other components
  // will also manage the application’s state and authentication status

  render() {
    return (
      <div>

        <BrowserRouter>

          <Switch>

            <Route exact path='/' component={} />
            <Route exact path='/login' component={} />
            <Route exact path='/signup' component={} />

          </Switch>

        </BrowserRouter>
        
      </div>
    );
  }
}

export default App;
