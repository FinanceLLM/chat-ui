import { END_POINTS } from "./constants";

async function postChatCompletion(input: string) {
  try {
    const response = await fetch(
      `${import.meta.env.SERVER_URL}${END_POINTS.postChatCompletion}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_message: input,
        }),
      }
    );

    if (!response.ok) {
      console.error("Server response was not ok", response);
      return;
    }

    return response.body;
  } catch (err) {
    console.error(err);
  }
}
export default postChatCompletion;
