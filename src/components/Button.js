import React from "react";

const Button = ({ buttonDisplay, clickHandler }) => (
  <button onClick={clickHandler}>{buttonDisplay}</button>
);

export default Button;
