import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";

import Ballot from "../pages/vote/ballot";
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
import UserChangePassword from "./user/change/password";
import Candidate from "./candidate";
import CandidateDetail from "./candidate/detail";
import Dashboard from "./dashboard";

import { loadStatsAction, loadStateAction } from "../store";

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

  const {
    parties,
    isLoading: partyLoading,
    error: errParties,
    getParties,
  } = useParties();

  useEffect(() => {
    getProfile();
    getCandidates();
    getParties();
  }, [getProfile, getCandidates, getParties]);

  useEffect(() => {
    props.getStats();
    props.getState();
  }, []);

  const HomeComponent = () => (
    <Home
      // isAuthenticated={auth.isAuthenticated}
      profile={props.profile}
      error={errProfile}
      candidates={candidates}
    />
  );

  const CandidatePage = () => <Candidate candidates={candidates} />;
  const CandidateDetailPage = ({ match }) => (
    <CandidateDetail
      candidate={
        candidates.filter(
          (candidate) => candidate.id === match.params.candidateId
        )[0]
      }
    />
  );

  const PartyPage = () => <Party parties={parties} />;
  const Profile = () => (
    <ProfilePage profile={profile} editProfile={editProfile} />
  );

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
  const PasswordChangePage = () => <UserChangePassword />;
  const DashboardPage = () => (
    <Dashboard
      candidates={candidates}
      winner={
        candidates.filter(
          (candidate) =>
            candidate.vote_count ===
            Math.max(...candidates.map((candidate) => candidate.vote_count))
        )[0]
      }
      stats={props.stats.data}
      state={props.state.data}
    />
  );

  const NoMatchPage = () => {
    return (
      <>
        <h2 style={{ color: "#cf1b1b" }}>Oops!</h2>
        <h1>404</h1>
        <h3 style={{ fontWeight: "normal" }}>Page Not Found</h3>
      </>
    );
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
        <PublicRoute path="/candidates" component={CandidatePage} />
        <PublicRoute
          path="/candidate/:candidateId"
          component={CandidateDetailPage}
        />
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
        <PublicRoute 
        path="/dashboard" 
        component={DashboardPage} 
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
        <PrivateRoute
          exact
          isAuthenticated={auth.isAuthenticated}
          path="/user/change/password"
          component={PasswordChangePage}
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
  stats: state.stats,
  state: state.state,
});

const mapDispathToProps = (dispatch) => ({
  getStats: () => dispatch(loadStatsAction()),
  getState: () => dispatch(loadStateAction()),
});

export default connect(mapStateToProps, mapDispathToProps)(Main);

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
