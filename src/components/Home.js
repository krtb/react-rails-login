import React from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'

const Home = (props) => {

    // handle the logout functionality
    // 1) update the isLoggedIn state in our front - end to false and remove the User data
    // 2) logout the User on the back - end server
    const handleClick = () => {
        // to logout the User on the back-end, we make a request to the server's /logout route
        // triggers the sessions_controller destroy action
        // also keep the User on the home page by redirecting to the root route
        // ALWAYS, remember to pass {withCredentials: true}
        axios.delete('http://localhost:3001/logout', { withCredentials: true })
            .then(response => {

                props.handleLogout()
                props.history.push('/')

            })
            .catch(error => console.log(error))
    }

    return (
        <div>
            <Link to='/login'>Log In</Link>
            
            <br></br>

            <Link to='/signup'>Sign Up</Link>

            <br></br>

            {/* displaying the link only if the User is logged in */}
            {
                props.loggedInStatus ?
                    <Link to='/logout' onClick={handleClick}>Log Out</Link> :
                    null
            }

        </div>
    );
};

export default Home;