import { useState } from "react";
import axios from "axios";
import { marked } from "marked";

function Test() {
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleButtonClick = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDZDK4iaYCc7f9QWycchOqKGf_BTEDWSyo",
        JSON.stringify({ contents: [{ parts: [{ text }] }] }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // setResponse(response.data.candidates[0].content.parts[0].text);
      // console.log(response.data.candidates[0].content.parts[0].text);
      const markdownText = response.data.candidates[0].content.parts[0].text;
      const renderer = new marked.Renderer();
      const html = marked(markdownText, { renderer });
      setResponse(html);
      console.log(html);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container p-2 flex flex-col max-w-2xl mx-auto">
      <input
        type="text"
        value={text}
        onChange={handleTextChange}
        placeholder="Enter your text"
        className="border p-2 bg-gray-50"
      />
      <button
        onClick={handleButtonClick}
        className="border bg-gray-100 p-2 mt-3 mb-3"
      >
        Click me!
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <p>Your text: {text}</p>
      )}
      <p>AI Response:</p>
      <div
        dangerouslySetInnerHTML={{
          __html: response,
        }}
      />
    </div>
  );
}

export default Test;
