import React, { forwardRef } from "react";

const ChatInput: React.FC = forwardRef(() => {
  return (
    <div className="flex w-full p-3 border border-slate-900 rounded-full shadow-md">
      <div className="relative min-w0 flex-1">
        <textarea
          className="absolute top-0 m-0 h-full w-full resize-none outline-none"
          placeholder="Ask anything"
        ></textarea>
      </div>
      <button>button</button>
    </div>
  );
});

export { ChatInput };
