import classes from "./Header.module.css";
import Navigation from "./Navigation";

const Header = ({ companyName, isAuthenticated, onLogout }) => {
  return (
    <div className={classes.header}>
      <h1>{companyName}</h1>
      <Navigation isLoggedIn={isAuthenticated} onLogout={onLogout} />
    </div>
  );
};
export default Header;
