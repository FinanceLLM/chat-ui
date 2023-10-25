import { ReactNode } from "react";

interface IButton {
  children: string | ReactNode;
  onClick?: () => void;
}

const Button: React.FC<IButton> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center border hover:bg-slate-50 hover:bg-accent rounded-lg shadow px-4 py-2"
    >
      {children}
    </button>
  );
};

export { Button };
