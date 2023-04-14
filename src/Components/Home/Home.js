import Card from "../UI/Card";
import classes from "./Home.module.css";

const Home = ({ onLogout }) => {
  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
    </Card>
  );
};

export default Home;
