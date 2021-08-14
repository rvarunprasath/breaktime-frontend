import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./components/loginComponent/LoginComponent";
import SignUp from "./components/loginComponent/SignupComponent";
import IntrestComponent from './components/intrest/IntrestComponent';
import Nav1 from './components/navs/Nav1';
import Error from './components/welcome/Error';
import AuthenticationRoute from './AuthenticatedRoute';
import LogoutComponent from './components/loginComponent/LogoutComponent';
import WelcomeComponent from './components/welcome/WelcomeComponent';

function App() {
  
  return (<Router>
    <div className="App">
      <Nav1/>
      
          <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/error" component={Error}/>
            <AuthenticationRoute exact path='/chooseIntrest' component={IntrestComponent} />
            <AuthenticationRoute exact path='/welcome' component={WelcomeComponent} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/logout" component={LogoutComponent} />
          </Switch>
       
    </div></Router>
  );
}

export default App;