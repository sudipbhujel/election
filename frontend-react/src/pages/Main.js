import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import Candidates from "../candidates/Candidates";
import Navbar from "../components/Navbar";
import About from "./about";
import Home from "./home";
import Login from "./login";
import Party from "./party";
import PartyDetail from "./party/:id";
import ProfilePage from "./profile";
import useCandidates from "./useCandidates";
import useParties from "./useParties";
import useProfile from "./useProfile";

export default function Main() {
  const {
    isAuthenticated,
    getProfile,
    profile,
    error: errProfile,
  } = useProfile();

  const { candidates, error: errCandidates, getCandidates } = useCandidates();

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
      isAuthenticated={isAuthenticated}
      profile={profile}
      error={errProfile}
      candidates={candidates}
    />
  );

  const CandidateComponent = () => <Candidates candidates={candidates} />;

  const PartyPage = () => <Party parties={parties} />;
  const Profile = () => <ProfilePage profile={profile} />;

  const PartyWithId = ({ match }) => (
    <PartyDetail
      party={parties.filter((party) => party.id == match.params.partyId)[0]}
      isLoading={partyLoading}
      error={errParties}
    />
  );

  const NoMatchPage = () => {
    return <h3>404 - Not found</h3>;
  };

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} profile={profile} />
      <Switch>
        <Route exact path="/" component={HomeComponent} />
        <Route path="/about" component={About} />
        <Route path="/parties" component={PartyPage} />
        <Route path="/party/:partyId" component={PartyWithId} />
        <Route path="/candidates" component={CandidateComponent} />
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profile} />
        <Route component={NoMatchPage} />
      </Switch>
    </>
  );
}
