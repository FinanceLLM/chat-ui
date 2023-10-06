import { useState } from "react";
import postChatCompletion from "../apis/post-chat-completion";
import { useInputContext } from "../store/input-context";

export const useStreamFetch = async () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [input, _] = useInputContext();
  const [stream, setStream] = useState("");
  let reader: ReadableStreamDefaultReader<Uint8Array>;
  const res = await postChatCompletion(input);

  if (res) {
    reader = res.getReader();

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
  }

  return { stream };
};
