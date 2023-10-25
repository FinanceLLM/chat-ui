import { PaperPlaneIcon } from "@radix-ui/react-icons";
import React, { KeyboardEventHandler, useRef } from "react";
import { setInput, useInputContext } from "../store/input-context";
import { useNavigate } from "react-router-dom";

const ChatInput: React.FC = () => {
  const navigate = useNavigate();
  const [_, dispatch] = useInputContext();
  const ref = useRef<HTMLInputElement>(null);

  const handleEnter: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  const handleClick = () => {
    if (ref.current!.value.length === 0) return;
    dispatch(setInput(ref.current!.value));
    navigate("/chat");
    ref.current!.value = "";
  };

  return (
    <div className="flex w-full p-3 border border-gray-200 rounded-lg shadow">
      <div className="relative min-w0 flex-1">
        <input
          className="h-full w-full outline-none"
          onKeyDown={handleEnter}
          placeholder="Ask anything"
          ref={ref}
        ></input>
      </div>
      <div
        className="flex justify-items-center items-center px-1 py-1 hover:cursor-pointer"
        onClick={handleClick}
      >
        <PaperPlaneIcon width={"24px"} height={"24px"} />
      </div>
    </div>
  );
};

export { ChatInput };
