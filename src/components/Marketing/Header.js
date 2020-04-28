import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    header: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    link: {
        paddingRight: 75,
        paddingLeft: 75
    }
}))


function Marketing() {
    let history = useHistory();

    const classes = useStyles();

    const handleLogout = e => {
        e.preventDefault()
        sessionStorage.removeItem('token');
        // alert('Logged out successfully. Come back soon!');
        history.push('/login');
    }
    return (
        <div className={classes.header}>
            {!sessionStorage.getItem('token') &&
                <>
                    <Link className={classes.link} to="/about"><Button>About</Button></Link>
                    <Link className={classes.link} to="/register"><Button>Register</Button></Link>
                    <Link className={classes.link} to="/login"><Button>Login</Button></Link>
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

export default Marketing;