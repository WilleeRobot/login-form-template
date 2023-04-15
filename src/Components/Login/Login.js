import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from "./Login.module.css";
import { useState, useReducer } from "react";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (prevState, action) => {
  switch (action.type) {
    case "INPUT":
      return {
        value: action.payload,
        isValid: action.payload.trim().length > 6,
      };
    case "BLUR":
      return {
        value: prevState.value,
        isValid: prevState.value.trim().length > 6,
      };
    default:
      return { value: "", isValid: false };
  }
};

const Login = ({ onLogin }) => {
  // **** States - must use state to manage the form inputs because we are doing real time validation as user types -> hooks into validity of button. Cannot use Refs
  //   const [emailIsValid, setEmailIsValid] = useState();
  //   const [enteredEmail, setEnteredEmail] = useState("");
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  // ***** useReducers to manage complex / grouped states
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: undefined,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: undefined,
  });

  // ***** useEffects() for validations
  //   useEffect(() => {
  //     const identifier = setTimeout(() => {
  //       console.log("check form validity)");
  //       setFormIsValid(
  //         enteredEmail.includes("@") && enteredPassword.trim().length > 6
  //       );
  //     }, 500);
  //     return () => {
  //       console.log("CLEANUP");
  //       clearTimeout(identifier);
  //     };
  //   }, [enteredEmail, enteredPassword]);

  // ***** Handler functions
  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });

    setFormIsValid(
      event.target.value.includes("@") && passwordState.value.trim().length > 6
    );
  };

  const passwordChangeHandler = (event) => {
    //update state with useReducer
    dispatchPassword({ type: "INPUT", payload: event.target.value });
    setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    onLogin(emailState.value, passwordState.value);

    // setEnteredEmail("");
    // setEnteredPassword("");
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            onBlur={validateEmailHandler}
            onChange={emailChangeHandler}
            value={emailState.value}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onBlur={validatePasswordHandler}
            onChange={passwordChangeHandler}
            value={passwordState.value}
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
