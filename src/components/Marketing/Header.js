import React from 'react';
import { Link, useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import RegisterForm from './RegisterForm'
function Marketing() {
    let history = useHistory()
    const handleLogout = e => {
        e.preventDefault()
        sessionStorage.removeItem('token');
        // alert('Logged out successfully. Come back soon!');
        history.push('/login');
    }
    return (
        <div>
            {!sessionStorage.getItem('token') &&
                <>
                    <Link to="/register"><Button>Register</Button></Link>
                    <Link to="/login"><Button>Login</Button></Link>
                </>
            }
            {sessionStorage.getItem('token') &&
                <>
                    <Button onClick={handleLogout}>
                        Logout
                    </Button>
                </>
            }
        </div>
    )
}

export default Marketing