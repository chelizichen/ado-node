import React, { ReactNode } from "react";
import classes from "./Button.module.css";

type ButtonProps = {
  children: ReactNode;
  click: () => void;
};
function Button({ children, click }: ButtonProps): JSX.Element {
  return (
    <button className={classes.button} onClick={() => click()}>
      {children}
    </button>
  );
}

export default Button;
