import React from "react";
import { Redirect, Route } from "react-router-dom";

function AuthenticationRoute ({component: Component, ...rest}) {
    const islog=(sessionStorage.getItem("username"))?true:false;
    return (
      <Route
        {...rest}
        render={(props) => islog === true
          ? <Component {...props} />
          : <Redirect to={{pathname: '/sign-in', state: {from: props.location}}} />}
      />
    )
  }
  export default AuthenticationRoute