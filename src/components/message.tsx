import React from "react";
import { marked } from "marked";
import { CodeBlock } from "./codeblock";
import { Spinner } from "./spinner";
import { GlobeIcon } from "@radix-ui/react-icons";

const renderer = new marked.Renderer();

const options = {
  ...marked.defaults,
  gfm: true,
  breaks: true,
  renderer,
};

interface ICard {
  userInput: string;
  stream: string;
  isLoading?: boolean;
  isError?: boolean;
}

const Message: React.FC<ICard> = ({
  userInput,
  stream,
  isLoading,
  isError,
}) => {
  if (!userInput && !stream) return;
  // if (isError) return <div>Something Wrong... Please try again.</div>;

  return (
    <div className="border rounded-lg shadow px-4 py-2">
      {isLoading && <Spinner />}
      {userInput && stream && (
        <>
          <div className="flex flex-1 gap-2 items-center">
            <div className="flex-shrink-0 flex justify-items-center items-center py-2">
              <GlobeIcon width={"24px"} height={"24px"} />
            </div>
            <p className="font-semibold">{userInput}</p>
          </div>
          <div className="prose max-w-none dark:prose-invert max-sm:prose-sm prose-headings:font-semibold prose-h1:text-lg prose-h2:text-base prose-h3:text-base prose-pre:bg-gray-800 dark:prose-pre:bg-gray-900">
            {marked.lexer(stream).map((token, index) => (
              <div key={index}>
                {token.type === "code" ? (
                  <CodeBlock lang={token.lang} code={token.text || ""} />
                ) : (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: marked(token.raw, options),
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export { Message };
