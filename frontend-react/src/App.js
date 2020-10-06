import React from 'react';

import Candidates from './candidates/Candidates';
import Login from './Login/Login';
// import {withRouter} from 'react-router';

import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

function App() {
  return (

    <div>
      <h1>Base Page</h1>
      <Switch>
        <Route path='/candidates' component={Candidates} />
        <Route path='/login' component={Login} />
        <Redirect to='/'/>
      </Switch>
    </div>
  );
}

export default App;
