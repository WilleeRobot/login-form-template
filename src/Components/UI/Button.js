import classes from "./Button.module.css";

const Button = ({ type, disabled, className, onClick, children }) => {
  return (
    <button
      type={type || "button"}
      className={`${classes.button} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
