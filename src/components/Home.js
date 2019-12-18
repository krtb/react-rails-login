import React from 'react';
import { Link } from 'react-router-dom'

const Home = (props) => {

    // handle the logout functionality
    // 1) update the isLoggedIn state in our front - end to false and remove the User data
    // 2) logout the User on the back - end server
    const handleClick = () => {
        // logout functionality here
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