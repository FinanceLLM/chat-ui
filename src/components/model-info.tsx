import React from "react";

const ModelInfo: React.FC = () => {
  return (
    <div className="mt-2 flex justify-center self-stretch px-1 text-xs text-gray-400 max-sm:gap-2">
      <p>
        Model:{" "}
        <a className="hover:underline" target="_blank">
          chatgpt-tubo-3.5
        </a>
        <br className="sm:hidden" /> Generate content may be inaccurate or
        false.
      </p>
    </div>
  );
};

export { ModelInfo };
