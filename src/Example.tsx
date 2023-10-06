import React, { useState } from "react";
import { marked } from "marked";
import { CodeBlock } from "./components/codeblock";

const url = "http://localhost:5001/chat-completion";

const renderer = new marked.Renderer();

const options: marked.MarkedOptions = {
  ...marked.defaults,
  gfm: true,
  breaks: true,
  renderer,
};

function Example() {
  const [stream, setStream] = useState("");
  const [input, setInput] = useState("");

  const handleClick = async () => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_message: input,
        }),
      });

      if (!response.ok) {
        console.error("Server response was not ok", response);
        return;
      }

      const reader = response.body.getReader();

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const text = new TextDecoder("utf-8").decode(value);
        const messages = text.split("\n\n").filter(Boolean); //Split by double newline

        messages.forEach((msg) => {
          // Extract the JSON string from the data event
          const jsonString = msg.replace("data: ", "");
          try {
            const parsedMsg = JSON.parse(jsonString);
            const content =
              parsedMsg.choices &&
              parsedMsg.choices[0] &&
              parsedMsg.choices[0].delta &&
              parsedMsg.choices[0].delta.content;
            if (content) {
              setStream((prev) => `${prev}${content}`);
            }
          } catch (err) {
            console.error("Error parsing message:", jsonString, err);
          }
        });
      }
    } catch (error) {
      console.error("Fetch failed", error);
    }
  };

  return (
    <main>
      <p>response:</p>
      <br />
      <input onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleClick}>send</button>
      <button onClick={() => setStream("")}>delete</button>
      <br />
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
    </main>
  );
}

export default Example;
