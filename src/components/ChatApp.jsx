import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { marked } from "marked";
import BeatLoader from "react-spinners/BeatLoader";
import FeedbackButtons from "./FeedbackButtons";
import ChatSideBar from "./ChatSideBar";
import botsData from "./../data/bots";

function ChatApp() {
  // Update the initial state to use the first bot's title
  const [activeBot, setActiveBot] = useState(botsData[0].title);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      text: `Hello! This is ${activeBot}. How can I assist you today?`,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [textareaHeight, setTextareaHeight] = useState(50); // Initial height (minHeight)
  // Create a ref to store a reference to the textarea element foo focus
  const textareaRef = useRef(null);

  const bots = [
    "Physics",
    "Mathematics",
    "History",
    "English/Literature",
    "Chemistry",
    "Geography",
  ];

  const messagesEndRef = useRef(null);

  // Scroll to the bottom of the chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    // When the component mounts, check if the ref is assigned to the DOM element
    if (textareaRef.current) {
      // Set focus to the textarea element
      textareaRef.current.focus();
    }
  }, [messages]);

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

      const markdownText = response.data.candidates[0].content.parts[0].text;
      console.log(response.data);
      const renderer = new marked.Renderer();
      return marked(markdownText, { renderer });
    } catch (error) {
      setError("Sorry, there was an error processing your request.");
      return "I'm unable to process your request at the moment.";
    } finally {
      setLoading(false);
      setTextareaHeight(50); // Reset height to initial value after sending the message
    }
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;

    const userMessage = {
      id: messages.length + 1,
      type: "user",
      text: inputMessage,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const botResponseText = await fetchBotResponse(inputMessage);

    const botMessage = {
      id: messages.length + 2,
      type: "bot",
      text: botResponseText,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prevMessages) => [...prevMessages, botMessage]);
    setInputMessage(""); // Reset input message

    // Reset textarea height explicitly
    const textarea = document.querySelector("textarea");
    if (textarea) {
      textarea.style.height = "50px";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) {
      handleSendMessage();
    }
  };

  const handleBotSwitch = (botTitle, botSubject) => {
    // const selectedBot = botsData.find(bot => bot.title === botTitle);
    setActiveBot(botTitle);

    // Optional: You can store the subject if needed for future use
    // setActiveSubject(botSubject);
    console.log(botSubject);

    setMessages([
      {
        id: 1,
        type: "bot",
        // text: `Hello! This is your ${botTitle}. How can I assist you today?`,
        text: `Hello! How can I assist you today?`,
      },
    ]);
  };

  return (
    <div className="h-screen flex bg-[#212121]">
      {/* Sidebar */}
      <ChatSideBar
        bots={botsData}
        activeBot={activeBot}
        onBotSwitch={handleBotSwitch}
      />

      {/* Chat Window */}
      <div className="w-5/6 flex flex-col bg-[#212121] shadow-lg">
        <div className="flex-1 overflow-y-auto py-4 flex justify-center">
          <div className="space-y-4 max-w-3xl w-full">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-2.5 ${
                  message.type === "user" ? "justify-end" : ""
                }`}
              >
                {message.type === "bot" && (
                  <img
                    className="w-8 h-8 rounded-full"
                    src="/ai.svg"
                    alt="Bot image"
                  />
                )}
                <div className="flex flex-col gap-1">
                  <div
                    data-message-id={message.id} // Add this line
                    className={`flex flex-col leading-1.5 border-gray-200 rounded-xl ${
                      message.type === "bot"
                        ? "srounded-tl-none shaddow-lg text-gray-100"
                        : "text-gray-100 rounded-br-none shadow-lg bg-gray-700 p-3 max-w-xl"
                    }`}
                  >
                    {message.type === "bot" ? (
                      <>
                        <div
                          className="text-sm prose prose-sm space-y-4 leading-6 message-text-content"
                          dangerouslySetInnerHTML={{ __html: message.text }}
                        />
                        <FeedbackButtons messageId={message.id} />
                      </>
                    ) : (
                      <div
                        className="text-sm"
                        dangerouslySetInnerHTML={{
                          __html: message.text.replace(/\n/g, "<br />"), // Replace \n with <br />
                        }}
                      />
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

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="pt-8 pb-4 bg-[#212121] flex flex-col justify-center items-center">
          {loading && (
            <div className="mb-3">
              <BeatLoader
                color="#3B82F6"
                loading={loading}
                size={10}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          )}
          <div className="relative max-w-3xl w-full">
            <div className="relative">
              <textarea
                rows={1}
                placeholder="Ask anything"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    if (!loading) handleSendMessage();
                  }
                }}
                disabled={loading}
                className="w-full px-4 py-3 pr-14 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-600 disabled:opacity-50 resize-none overflow-hidden bg-[#2F2F2F] text-white placeholder:text-sm"
                style={{ minHeight: "50px", maxHeight: "200px" }}
                ref={textareaRef}
              />
              <button
                onClick={handleSendMessage}
                disabled={loading}
                className="absolute top-2 right-2 px-3 py-1 bg-blxue-600 text-white rounded-md shaxdow-md hovger:bg-blue-700 disabled:opacity-50"
              >
                <img src="/send-1.svg" className="h-6 w-6" />
              </button>
            </div>
            {error && (
              <div className="text-red-500 mt-2 text-sm w-full text-center">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatApp;
