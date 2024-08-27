import React from "react";

interface ButtonProps {
  text: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, icon, onClick }) => {
  return (
    <button className="rounde m-1 flex items-center rounded-md border-2 border-blue-400 bg-blue-300/70 text-blue-500 px-2">
      {icon}
      <span className="pl-1">{text}</span>
    </button>
  );
};

export default Button;
