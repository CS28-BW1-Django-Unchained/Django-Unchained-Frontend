import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const UnPrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (!sessionStorage.getItem('token')) {
                    //render component from props
                    console.log(Component)
                    return <Component {...props} />;
                } else {
                    return <Redirect to='/game' />
                }
            }}
        />
    );
}

export default UnPrivateRoute;