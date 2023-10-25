import React from "react";

const ModelInfo: React.FC = () => {
  return (
    <div className="mt-2 flex justify-center self-stretch px-1 text-xs text-gray-400 max-sm:gap-2">
      Model:{" "}
      <a className="hover:underline" target="_blank">
        chatgpt-tubo-3.5
      </a>
      <br className="sm:hidden" /> Generate content may be inaccurate or false.
      {/* <p>
        Finance LLM is an AI-based tool designed to provide various
        financial/economic information and data processing services based on
        large amounts of financial/economic data and code generation technology
      </p> */}
    </div>
  );
};

export { ModelInfo };
