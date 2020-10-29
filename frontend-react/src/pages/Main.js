import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";

import Candidates from "../candidates/Candidates";
import Navbar from "../components/Navbar";
import About from "./about";
import FillFormPage from "./election/fill";
import Home from "./home";
import Login from "./login";
import Logout from "./logout";
import Party from "./party";
import PartyDetail from "./party/:id";
import ProfilePage from "./profile";
import ProfileEdit from "./profile/edit";
import Signup from "./signup";
import useCandidates from "./useCandidates";
import useParties from "./useParties";
import useProfile from "./useProfile";

function Main(props) {
  const { auth } = props;
  const {
    getProfile,
    profile,
    error: errProfile,
    addProfile,
    editProfile,
  } = useProfile();

  const { candidates, getCandidates } = useCandidates();

  useEffect(() => {
    getProfile();
    getCandidates();
  }, [getProfile, getCandidates]);

  const {
    parties,
    isLoading: partyLoading,
    error: errParties,
    getParties,
  } = useParties();

  useEffect(() => {
    getParties();
  }, [getParties]);

  const HomeComponent = () => (
    <Home
      // isAuthenticated={auth.isAuthenticated}
      profile={props.profile}
      error={errProfile}
      candidates={candidates}
    />
  );

  const CandidateComponent = () => <Candidates candidates={candidates} />;

  const PartyPage = () => <Party parties={parties} />;
  const Profile = () => <ProfilePage profile={profile} />;

  const PartyWithId = ({ match }) => (
    <PartyDetail
      party={parties.filter((party) => party.id === match.params.partyId)[0]}
      isLoading={partyLoading}
      error={errParties}
    />
  );

  const FillForm = () => <FillFormPage addProfile={addProfile} />;

  const ProfileEditPage = () => (
    <ProfileEdit profile={profile} editProfile={editProfile} />
  );

  const LoginPage = () => <Login />;
  const SignupPage = () => <Signup />;

  const NoMatchPage = () => {
    return <h3>404 - Not found</h3>;
  };

  return (
    <>
      <Navbar isAuthenticated={auth.isAuthenticated} profile={profile} />
      <Switch>
        {/* Public Route */}
        <PublicRoute exact path="/" component={HomeComponent} />
        <PublicRoute path="/about" component={About} />
        <PublicRoute path="/parties" component={PartyPage} />
        <PublicRoute path="/party/:partyId" component={PartyWithId} />
        <PublicRoute path="/candidates" component={CandidateComponent} />
        <PublicRoute
          isAuthenticated={auth.isAuthenticated}
          restricted
          path="/login"
          component={LoginPage}
        />
        <PublicRoute
          isAuthenticated={auth.isAuthenticated}
          restricted
          path="/signup"
          component={SignupPage}
        />
        <Route path="*" component={NoMatchPage} />

        {/* Private Route */}
        <PrivateRoute
          isAuthenticated={auth.isAuthenticated}
          exact
          path="/profile"
          component={Profile}
        />
        <PrivateRoute
          isAuthenticated={auth.isAuthenticated}
          path="/profile/edit"
          component={ProfileEditPage}
        />
        <PrivateRoute
          restricted={profile.first_name}
          isAuthenticated={auth.isAuthenticated}
          path="/election/fill_form"
          component={FillForm}
        />
        <PrivateRoute
          isAuthenticated={auth.isAuthenticated}
          path="/logout"
          component={Logout}
        />
      </Switch>
    </>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps)(Main);

const PrivateRoute = ({ component: Component, ...restProps }) => {
  const isAuthenticated = restProps.isAuthenticated;
  const restricted = restProps.restricted;
  return (
    <Route
      {...restProps}
      render={(props) => {
        if (isAuthenticated && restricted) {
          return <Redirect to="/" />;
        } else if (isAuthenticated && !restricted) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

const PublicRoute = ({ component: Component, ...restProps }) => {
  const isAuthenticated = restProps.isAuthenticated;
  const restricted = restProps.restricted;
  return (
    <Route
      {...restProps}
      render={(props) =>
        isAuthenticated && restricted ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
