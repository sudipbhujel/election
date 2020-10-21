import React, { useEffect } from "react";
import { withRouter, useHistory, useLocation } from "react-router";

import LoginForm from "./LoginForm";

function Login(props) {
  return (
    <div>
      <LoginForm />
    </div>
  );
}

export default Login;
