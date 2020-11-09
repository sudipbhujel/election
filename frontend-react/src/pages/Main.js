import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";

import Ballot from "../pages/vote/ballot";
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
import Vote from "./vote";
import useCandidates from "./useCandidates";
import useParties from "./useParties";
import useProfile from "./useProfile";
import Footer from "../components/Footer";
import UserActivate from "./user/activate";
import UserResetPassword from "./user/reset/password";
import UserPasswordResetConfirm from "./user/reset/password/confirm";

function Main(props) {
  const { auth, vote } = props;
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
  const VotingPage = () => <Vote candidates={candidates} />;
  const BallotPage = () => <Ballot candidates={candidates} />;
  const UserActivatePage = ({ match }) => (
    <UserActivate uid={match.params.uid} token={match.params.token} />
  );
  const UserPasswordResetPage = () => <UserResetPassword />;
  const UserPasswordResetConfirmPage = ({ match }) => (
    <UserPasswordResetConfirm
      uid={match.params.uid}
      token={match.params.token}
    />
  );

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
        <PublicRoute
          isAuthenticated={auth.isAuthenticated}
          restricted
          path="/user/activate/:uid/:token"
          component={UserActivatePage}
        />
        <PublicRoute
          exact
          isAuthenticated={auth.isAuthenticated}
          restricted
          path="/user/reset/password"
          component={UserPasswordResetPage}
        />
        <PublicRoute
          isAuthenticated={auth.isAuthenticated}
          restricted
          path="/user/reset/password/confirm/:uid/:token"
          component={UserPasswordResetConfirmPage}
        />

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
        <PrivateRoute
          exact
          isAuthenticated={auth.isAuthenticated}
          path="/vote"
          component={VotingPage}
        />
        <PrivateRoute
          restricted={
            typeof vote.data.voted === "undefined"
              ? true
              : vote.data.voted && typeof vote.data.private_key === "undefined"
              ? true
              : !vote.data.private_key
          }
          isAuthenticated={auth.isAuthenticated}
          path="/vote/ballot"
          component={BallotPage}
        />

        {/* Not found */}
        <Route path="*" component={NoMatchPage} />
      </Switch>
      <Footer />
    </>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  vote: state.vote,
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
