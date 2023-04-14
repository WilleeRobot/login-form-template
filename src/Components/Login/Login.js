import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from "./Login.module.css";
import { useState } from "react";

const Login = ({ onLogin }) => {
  // **** States - must use state to manage the form inputs because we are doing real time validation as user types -> hooks into validity of button. Cannot use Refs
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [formIsValid, setFormIsValid] = useState(false);

  // ***** Handler functions
  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
    setFormIsValid(
      event.target.value.includes("@") && enteredPassword.trim().length > 6
    );
  };
  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
    setFormIsValid(
      event.target.value.trim().length > 6 && enteredEmail.includes("@")
    );
  };
  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes("@"));
  };
  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    onLogin(enteredEmail, enteredPassword);

    setEnteredEmail("");
    setEnteredPassword("");
  };
  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            !emailIsValid ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            onBlur={validateEmailHandler}
            onChange={emailChangeHandler}
            value={enteredEmail}
          />
        </div>
        <div
          className={`${classes.control} ${
            !passwordIsValid ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onBlur={validatePasswordHandler}
            onChange={passwordChangeHandler}
            value={enteredPassword}
          />
        </div>
        <div>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
