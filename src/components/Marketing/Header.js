import React from 'react';
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import RegisterForm from './RegisterForm'
function Marketing() {
    return (
        <div>
            <Link to="/register"><Button> Register </Button> </Link>
            <Link to="/login"><Button> Login </Button> </Link>
        </div>
    )
}

export default Marketing