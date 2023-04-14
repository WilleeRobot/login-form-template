import classes from "./Header.module.css";
import Navigation from "./Navigation";

const Header = ({ isAuthenticated, onLogout }) => {
  return (
    <div className={classes.header}>
      <h1>ABC Company</h1>
      <Navigation isLoggedIn={isAuthenticated} onLogout={onLogout} />
    </div>
  );
};
export default Header;
