import React from 'react';
import { Link } from 'react-router-dom'

function NotLoggedIn() {
    return (
        <>
        <h2>Please <Link to='/'>log in</Link> to view your saved information</h2>
        </>
    )
};

export default NotLoggedIn;