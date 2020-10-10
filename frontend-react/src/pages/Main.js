import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import Candidates from "../candidates/Candidates";
import Navbar from "../components/Navbar";
import Profile from "../profile/Profile";
import About from "./about";
import Home from "./home";
import Login from "./login";
import useCandidates from './useCandidates';
import useProfile from "./useProfile";

export default function Main() {
  const {
    isAuthenticated,
    getProfile,
    profile,
    error: errProfile,
  } = useProfile();

  const {
      candidates,
      error: errCandidates,
      getCandidates
  } = useCandidates();

  useEffect(() => {
    getProfile();
    getCandidates();
  }, [getProfile, getCandidates]);

  const HomeComponent = () => (
    <Home
      isAuthenticated={isAuthenticated}
      profile={profile}
      error={errProfile}
      candidates={candidates}
    />
  );

  const CandidateComponent = () => (
      <Candidates candidates={candidates} />
  )

  return (
    <>
      <Navbar 
        isAuthenticated={isAuthenticated}
        profile = {profile}
        />
      <Switch>
        <Route exact path="/" component={HomeComponent} />
        <Route path="/about" component={About} />
        <Route path="/candidates" component={CandidateComponent} />
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </>
  );
}
