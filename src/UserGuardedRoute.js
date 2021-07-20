import React, { useEffect, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { appContext } from "./App";

const UserGuardedRoute = ({ component: Component, auth, ...rest }) => {
    const localAuthUser = localStorage.getItem("currentUserLoginDetails");
    if (localAuthUser) {
        var parsedAuthUser = JSON.parse(localAuthUser);
        if (parsedAuthUser.userInfo.userId) {
            auth = true;
        }
    }

    return (<Route {...rest} render={(props) => (
        auth ? <Component {...props} /> : <Redirect to='/login' />
    )} />)
}

export default UserGuardedRoute;