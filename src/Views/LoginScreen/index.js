import React, { useState, useEffect } from "react";
import * as classes from "./LoginScreen.module.css";
import firebase from "../../config/firebase";

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push("/dashboard");
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  return (
    <div className={classes.root}>
      <form onSubmit={loginHandler} className={classes.loginFormFields}>
        <h3 className="mb-4 font-bold">Please login to Dashboard</h3>
        <div>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
          />
        </div>
        <div>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </div>
        <button>Login</button>
      </form>
    </div>
  );
};

export default LoginScreen;
