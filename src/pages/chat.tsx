import React, { useState, useEffect } from "react";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Layout } from "../components/layout";
import { Message } from "../components/message";
import { ChatInput } from "../components/chat-input";
import { useInputContext } from "../store/input-context";
import { Button } from "../components/button";
import { useNavigate } from "react-router-dom";
import { safeJSONParser } from "../utils/parse";

const url = "http://localhost:5001/chat-completion";

const Chat: React.FC = () => {
  const [userInput] = useInputContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [stream, setStream] = useState("");
  const navigate = useNavigate();
  const jsonParser = safeJSONParser();

  useEffect(() => {
    let ignore = false;
    if (userInput && !ignore) {
      setStream("");
      handleClick();
    }
    return () => {
      ignore = true;
    };
  }, [userInput]);

  const handleClick = async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_message: userInput,
        }),
      });

      if (!response.ok) {
        setIsError(true);
        console.error("Server response was not ok", response);
        return;
      }

      setIsLoading(false);

      // @ts-ignore
      const reader = response.body.getReader();

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }

        const text = new TextDecoder("utf-8").decode(value);
        const messages = text.split("\n\n").filter(Boolean); //Split by double newline

        messages.forEach((msg) => {
          // Extract the JSON string from the data event
          const jsonString = msg.replace("data: ", "");
          try {
            const parsedMsg = jsonParser(jsonString);
            const content =
              parsedMsg.choices &&
              parsedMsg.choices[0] &&
              parsedMsg.choices[0].delta &&
              parsedMsg.choices[0].delta.content;
            if (content) {
              setStream((prev) => `${prev}${content}`);
            }
          } catch (err) {
            setIsError(true);
            console.error("Error parsing message:", jsonString, err);
          }
        });
      }
    } catch (error) {
      setIsError(true);
      console.error("Fetch failed", error);
    }
  };

  return (
    <Layout>
      <div className="flex gap-4">
        <Button onClick={() => navigate("/")}>
          <ChevronLeftIcon width={"24px"} height={"24px"} />
        </Button>
        <ChatInput />
      </div>
      <Message
        userInput={userInput}
        stream={stream}
        isLoading={isLoading}
        isError={isError}
      />
      <br />
      <div></div>
    </Layout>
  );
};

export { Chat };
