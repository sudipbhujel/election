import React from 'react';

<<<<<<< Updated upstream
import Candidates from './candidates/Candidates';
import Login from './Login/Login';
import Profile from './profile/Profile';
=======
import Main from './pages/Main';
>>>>>>> Stashed changes

export default function App() {
  return (
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
  );
}
