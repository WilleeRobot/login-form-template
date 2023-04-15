import { useState, useEffect } from "react";
import Header from "./Components/MainHeader/Header";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";

function App() {
  // ***** MANAGE STATES *****
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userInfo = localStorage.getItem("isLoggedIn");

    if (userInfo === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  //***** Handler functions*****
  const logInHandler = (email, password) => {
    const userCredentials = {
      email,
      password,
    };
    console.log(userCredentials);
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <>
      <Header
        companyName="Orange Monorail"
        isAuthenticated={isLoggedIn}
        onLogout={logoutHandler}
      />
      ;
      <main>
        {!isLoggedIn && <Login onLogin={logInHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </>
  );
}

export default App;
