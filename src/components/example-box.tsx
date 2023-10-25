import React from "react";
import { useNavigate } from "react-router-dom";
import { setInput, useInputContext } from "../store/input-context";

interface IExampleBox {
  exMessage: string;
}

const ExampleBox: React.FC<IExampleBox> = ({ exMessage }) => {
  const navigate = useNavigate();
  const [_, dispatch] = useInputContext();

  const handleClick = () => {
    dispatch(setInput(exMessage));
    navigate("/chat");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="rounded-xl border bg-gray-50 p-2.5 text-gray-600 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 sm:p-4"
    >
      {exMessage}
    </button>
  );
};

export { ExampleBox };
