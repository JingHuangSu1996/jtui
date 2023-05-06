import React from "react";

type ButtonProps = {
  /** Add a description comment for each prop. */
};

const Button = React.forwardRef<HTMLDivElement, ButtonProps>(({}, ref) => {
  return <div>Hello World</div>;
});

Button.displayName = "Button";

export { Button };