import React, { useEffect, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { appContext } from "./App";

const GuardedRoute = ({ component: Component, auth, ...rest }) => {
    const localAuthUser = localStorage.getItem("currentUserLoginDetails");
    if (localAuthUser) {
        var parsedAuthUser = JSON.parse(localAuthUser);
        if (parsedAuthUser.userInfo.userRoles.length > 1) {
            if (parsedAuthUser.userInfo.userRoles[1] == "ROLE_ADMIN") {
                auth = true;
            }
        }
    }

    return (<Route {...rest} render={(props) => (
        auth ? <Component {...props} /> : <Redirect to='/login' />
    )} />)
}

export default GuardedRoute;