import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { marked } from "marked";
import BeatLoader from "react-spinners/BeatLoader";

function GenericBot() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      text: "Hello! How can I assist you today?",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Create a ref for the messages container
  const messagesEndRef = useRef(null);

  // Function to scroll to the bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Use effect to scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to handle API call to Gemini
  const fetchBotResponse = async (userText) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDZDK4iaYCc7f9QWycchOqKGf_BTEDWSyo",
        JSON.stringify({ contents: [{ parts: [{ text: userText }] }] }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Extract markdown text and convert to HTML
      const markdownText = response.data.candidates[0].content.parts[0].text;
      const renderer = new marked.Renderer();
      const htmlResponse = marked(markdownText, { renderer });

      return htmlResponse;
    } catch (error) {
      setError(error.message);
      return "Sorry, there was an error processing your request.";
    } finally {
      setLoading(false);
    }
  };

  // Handle sending a message
  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: "user",
      text: inputMessage,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    // Update messages with user message
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Fetch bot response
    const botResponseText = await fetchBotResponse(inputMessage);

    // Add bot response
    const botMessage = {
      id: messages.length + 2,
      type: "bot",
      text: botResponseText,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    // Update messages with bot response
    setMessages((prevMessages) => [...prevMessages, botMessage]);

    // Clear input
    setInputMessage("");
  };

  // Handle key down for Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) {
      handleSendMessage();
    }
  };

  return (
    <>
      <div className="h-screen flex justify-center items-center bg-gray-100 pt-2 pb-2">
        <div className="w-full max-w-3xl h-full flex flex-col bg-white bg-gradient-to-r from-rose-50 to-teal-50 shadow-lg">
          {/* Chat Header */}
          <div className="px-4 py-3 bg-blue-600 text-white font-semibold text-lg rounded-t-lg">
            <img
              className="w-8 h-8 inline mr-3"
              src="/icon.svg"
              alt="Chat icon"
            />
            AI ChatBot
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-2.5 ${
                  message.type === "user" ? "justify-end" : ""
                }`}
              >
                {message.type === "bot" && (
                  <img
                    className="w-8 h-8 rounded-full shadow-lg"
                    src="/robot.svg"
                    alt="Bot image"
                  />
                )}

                <div className="flex flex-col gap-1">
                  <div
                    className={`flex items-center ${
                      message.type === "user" ? "justify-end" : ""
                    } space-x-2`}
                  >
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      {message.timestamp}
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {message.type === "bot" ? "Bot" : "You"}
                    </span>
                  </div>
                  <div
                    className={`flex flex-col leading-1.5 p-4 border-gray-200 rounded-xl ${
                      message.type === "bot"
                        ? "bg-white dark:bg-gray-700 rounded-tl-none shadow-lg"
                        : "bg-blue-500 text-white rounded-br-none shadow-lg"
                    }`}
                  >
                    {message.type === "bot" ? (
                      <div
                        className="text-sm font-semibold prose prose-sm"
                        dangerouslySetInnerHTML={{ __html: message.text }}
                      />
                    ) : (
                      <p className="text-sm font-semibold">{message.text}</p>
                    )}
                  </div>
                </div>

                {message.type === "user" && (
                  <img
                    className="w-8 h-8 rounded-full self-end"
                    src="/user.svg"
                    alt="User image"
                  />
                )}
              </div>
            ))}
            {/* Invisible div to force scroll to bottom */}
            <div ref={messagesEndRef} />
          </div>

          {/* Loading Indicator */}
          {loading && (
            <div className="px-4 py-2 text-center text-gray-500">
              {/* Generating response */}
              <BeatLoader color="#36d7b7" loading={true} />
            </div>
          )}

          {/* Input Area */}
          <div className="px-4 py-3 bg-gray-100 border-t">
            <div className="flex items-center space-x-3">
              <input
                type="text"
                placeholder="Ask anything"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              />
              <button
                onClick={handleSendMessage}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 disabled:opacity-50"
              >
                Send
              </button>
            </div>
            {error && <div className="text-red-500 mt-2 text-sm">{error}</div>}
          </div>
        </div>
      </div>
    </>
  );
}

export default GenericBot;
