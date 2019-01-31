import React from 'react';
import Dashboard from '../Components/Dashboard';
import SignIn from '../Components/SignIn';
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import Page404 from '../Components/Page404';
class Routing extends React.Component {
    render() {
        return (  
          <Router>
          <Switch>
            <Route  path="/dashboard" component={Dashboard} />
            <Route  path="/settings" component={Dashboard} />
            <Route  path="/profile" component={Dashboard} />
            <Route path="/login" component={SignIn} />
            <Route  exact={true} path="/" component={SignIn} />
            <Route component={Page404} /> 
          </Switch>
        </Router>
        );
      }
}
export default Routing;