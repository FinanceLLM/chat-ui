function safeJSONParser() {
  let slicedData = "";

  return function innerFunction(data: string) {
    try {
      return JSON.parse(data);
    } catch (initialError) {
      console.error("Initial JSON parse error:", initialError);
      console.error("error data:", data);

      slicedData = slicedData + data;

      try {
        const result = JSON.parse(slicedData);
        slicedData = "";
        return result;
      } catch (secondaryError) {
        console.error(
          "Error after base64 decoding and re-parsing:",
          secondaryError
        );

        return null;
      }
    }
  };
}

export { safeJSONParser };
