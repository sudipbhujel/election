import React from 'react';

<<<<<<< Updated upstream
import Candidates from './candidates/Candidates';
import Login from './Login/Login';
import Profile from './profile/Profile';
<<<<<<< HEAD
=======
import Main from './pages/Main';
>>>>>>> Stashed changes
=======
import Home from './pages/home';
>>>>>>> origin/frontend

export default function App() {
  return (
<<<<<<< HEAD
<<<<<<< Updated upstream

    <div>
      <h1>Base Page</h1>
      <Switch>
        <Route path='/candidates' component={Candidates} />
        <Route path='/login' component={Login} />
        <Route path='/profile' component={Profile} />
        <Redirect to='/'/>
      </Switch>
    </div>
=======
    <Main />
>>>>>>> Stashed changes
=======
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/candidates' component={Candidates} />
      <Route path='/login' component={Login} />
      <Route path='/profile' component={Profile} />
      <Redirect to='/' />
    </Switch>
>>>>>>> origin/frontend
  );
}
