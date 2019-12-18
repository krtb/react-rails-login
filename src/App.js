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
