import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import Error from "../../components/Error";
import LoginForm from "./LoginForm";

function Login(props) {
  return (
    <>
      <LoginForm>
        {props.pageState.error ? <Error>{props.pageState.error}</Error> : null}
      </LoginForm>
    </>
  );
}

const mapStateToProps = (state) => ({
  pageState: state.auth,
});

export default connect(mapStateToProps)(Login);
