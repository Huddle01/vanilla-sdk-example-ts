import React from "react";

type Props = {} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button = ({ children, ...rest }: Props) => {
  return (
    <button {...rest} className="bg-blue-500 py-3 px-4 rounded-lg">
      {children}
    </button>
  );
};

export default Button;
