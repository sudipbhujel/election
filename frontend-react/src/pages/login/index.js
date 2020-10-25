import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { useHistory } from "react-router-dom";

import LoginForm from "./LoginForm";

function Login(props) {
  const history = useHistory();

  useEffect(() => {
    if (props.pageState.isAuthenticated) {
      history.replace("/");
    }
  }, [props.counter]);

  return <LoginForm />;
}

const mapStateToProps = (state) => ({
  pageState: state.auth,
});

export default connect(mapStateToProps)(Login);
