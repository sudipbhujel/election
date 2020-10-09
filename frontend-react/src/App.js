import React from 'react';

import Candidates from './candidates/Candidates';
import Login from './Login/Login';
import Profile from './profile/Profile';
import Home from './pages/home';

import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/candidates' component={Candidates} />
      <Route path='/login' component={Login} />
      <Route path='/profile' component={Profile} />
      <Redirect to='/' />
    </Switch>
  );
}

export default withRouter(App);
