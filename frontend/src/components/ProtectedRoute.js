import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { LoginContext } from '../contexts/LoginContext.js';

function ProtectedRoute ({ component: Component, ...props }) {
    const isLoggedIn = useContext(LoginContext);

    return (
        <Route>
            {() =>
            isLoggedIn ? <Component {...props} /> : <Redirect to="/sign-in" />
            }
        </Route>
    );
};

export default ProtectedRoute;