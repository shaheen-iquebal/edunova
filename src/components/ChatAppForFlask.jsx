/* eslint-disable react/prop-types */
// import { useState, useRef, useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import {
//   Brain,
//   // MessageCircle,
//   Send,
//   ThumbsUp,
//   ThumbsDown,
//   Notebook,
//   MessageSquareMore,
//   NotebookText,
// } from "lucide-react";
// import axios from "axios";
// import botsData from "./../data/bots";
// import FeedbackButtons from "./FeedbackButtons";

// const ChatAppForFlask = ({ home }) => {
//   const [activeBot, setActiveBot] = useState(botsData[0].title);
//   const [activeSubject, setActiveSubject] = useState(botsData[0].subject);
//   const [botStatus, setBotStatus] = useState(botsData[0].status);
//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       type: "bot",
//       text: `Hello! I'm your ${botsData[0].title} guide. How can I assist you today?`,
//       timestamp: new Date().toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       }),
//     },
//   ]);
//   const [inputMessage, setInputMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const textareaRef = useRef(null);
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     scrollToBottom();
//     if (textareaRef.current) {
//       textareaRef.current.focus();
//     }
//   }, [messages]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const fetchBotResponse = async (userText) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.post(
//         "https://flask-hello-de597930da7a.herokuapp.com/ask_question",
//         { question: userText },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       return response.data.answer;
//     } catch (err) {
//       setError("Sorry, there was an error processing your request.");
//       return "I'm unable to process your request at the moment.";
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSendMessage = async () => {
//     if (inputMessage.trim() === "") return;

//     const userMessage = {
//       id: messages.length + 1,
//       type: "user",
//       text: inputMessage,
//       timestamp: new Date().toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       }),
//     };
//     setMessages((prevMessages) => [...prevMessages, userMessage]);

//     const botResponseText = await fetchBotResponse(inputMessage);

//     const botMessage = {
//       id: messages.length + 2,
//       type: "bot",
//       text: botResponseText,
//       timestamp: new Date().toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       }),
//     };

//     setMessages((prevMessages) => [...prevMessages, botMessage]);
//     setInputMessage("");
//   };

//   const handleBotSwitch = (botTitle, botSubject, botStatus) => {
//     setActiveBot(botTitle);
//     setActiveSubject(botSubject);
//     //console.log(botStatus);
//     setBotStatus(botStatus);
//     setMessages([
//       {
//         id: 1,
//         type: "bot",
//         text: `Hello! I'm your ${botTitle} guide. How can I assist you today?`,
//         timestamp: new Date().toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         }),
//       },
//     ]);
//   };

//   return (
//     <div className="flex h-full gap-6 p-4">
//       {/* Subjects Sidebar */}
//       <Card className="w-64 shrink-0">
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Notebook className="h-5 w-5 text-blue-500" />
//             Subjects
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="p-0">
//           <ScrollArea className="h-[calc(100vh-12rem)]">
//             <div className="space-y-1 p-2">
//               {botsData.map((bot) => (
//                 <button
//                   key={bot.title}
//                   onClick={() =>
//                     handleBotSwitch(bot.title, bot.subject, bot.status)
//                   }
//                   className={`w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors
//                     ${
//                       activeBot === bot.title
//                         ? "bg-blue-50 text-blue-700"
//                         : "hover:bg-gray-100"
//                     }`}
//                 >
//                   <MessageSquareMore className="h-4 w-4" />
//                   {bot.title}
//                 </button>
//               ))}
//             </div>
//           </ScrollArea>
//         </CardContent>
//       </Card>

//       {/* Main Chat Area */}
//       <Card className="flex-1">
//         {/* <CardHeader>
//           <div className="flex items-center justify-between">
//             <CardTitle className="flex items-center gap-2">
//               <NotebookText className="h-5 w-5 text-blue-500" />
//               {activeBot}
//             </CardTitle>
//             <Badge
//               variant="secondary"
//               className={
//                 botStatus === "online" ? "bg-emerald-400" : "bg-red-400"
//               }
//             >
//               {botStatus}
//             </Badge>
//           </div>
//         </CardHeader> */}
//         <CardHeader>
//           <div className="flex items-center justify-between">
//             <CardTitle className="flex items-center gap-2">
//               <NotebookText className="h-5 w-5 text-blue-500" />
//               {activeBot}
//             </CardTitle>
//             <div className="flex items-center gap-1">
//               {botStatus === "online" && (
//                 <span
//                   className="h-2 w-2 bg-emerald-400 rounded-full"
//                   style={{
//                     animation: "blink 1s infinite",
//                     animationTimingFunction: "ease-in-out",
//                     animationName: "blink-keyframes",
//                   }}
//                 />
//               )}
//               <Badge
//                 variant="secondary"
//                 className={
//                   botStatus === "online" ? "bg-emerald-400" : "bg-red-400"
//                 }
//               >
//                 {botStatus}
//               </Badge>
//             </div>

//             {/* Inline Keyframes */}
//             <style>
//               {`
//         @keyframes blink-keyframes {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0; }
//         }
//       `}
//             </style>
//           </div>
//         </CardHeader>

//         <CardContent className="p-0">
//           <div className="flex flex-col h-[calc(100vh-12rem)]">
//             {/* Messages Area */}
//             <ScrollArea className="flex-1 p-4">
//               <div className="space-y-4">
//                 {messages.map((message) => (
//                   <div
//                     key={message.id}
//                     className={`flex items-start gap-3 ${
//                       message.type === "user" ? "justify-end" : ""
//                     }`}
//                   >
//                     {message.type === "bot" && (
//                       <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
//                         <Brain className="h-4 w-4 text-blue-500" />
//                       </div>
//                     )}
//                     <div className="group">
//                       <div
//                         className={`rounded-lg px-4 py-2 max-w-[80%] ${
//                           message.type === "bot"
//                             ? "bg-gray-100"
//                             : "bg-blue-500 text-white ml-auto"
//                         }`}
//                       >
//                         <div className="text-sm">{message.text}</div>
//                       </div>
//                       {message.type === "bot" && (
//                         <div className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
//                           {/* <div className="absolute toxp-full mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"> */}
//                           <FeedbackButtons messageId={message.id} />
//                           {/* </div> */}
//                           {/* <button className="text-gray-400 hover:text-green-500">
//                             <ThumbsUp className="h-4 w-4" />
//                           </button>
//                           <button className="text-gray-400 hover:text-red-500">
//                             <ThumbsDown className="h-4 w-4" />
//                           </button> */}
//                         </div>
//                       )}
//                     </div>
//                     {message.type === "user" && (
//                       <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
//                         <img src="/user.svg" alt="User" className="h-4 w-4" />
//                       </div>
//                     )}
//                   </div>
//                 ))}
//                 <div ref={messagesEndRef} />
//               </div>
//             </ScrollArea>

//             {/* Error Alert */}
//             {error && (
//               <Alert variant="destructive" className="mx-4 my-2">
//                 <AlertDescription>{error}</AlertDescription>
//               </Alert>
//             )}

//             {/* Input Area */}
//             <div className="px-4 pt-4 pb-0 border-t">
//               <div className="relative">
//                 <textarea
//                   ref={textareaRef}
//                   rows={1}
//                   placeholder="Ask anything..."
//                   value={inputMessage}
//                   onChange={(e) => setInputMessage(e.target.value)}
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter" && !e.shiftKey) {
//                       e.preventDefault();
//                       if (!loading) handleSendMessage();
//                     }
//                   }}
//                   disabled={loading}
//                   className="w-full px-4 py-3 pr-12 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
//                   style={{ minHeight: "50px", maxHeight: "200px" }}
//                 />
//                 <button
//                   onClick={handleSendMessage}
//                   disabled={loading}
//                   className="absolute right-2 top-2 p-2 text-blue-500 hover:text-blue-600 disabled:opacity-50"
//                 >
//                   <Send className="h-5 w-5" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default ChatAppForFlask;

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Brain,
  Send,
  Notebook,
  MessageSquareMore,
  NotebookText,
  Loader2,
} from "lucide-react";
import axios from "axios";
import botsData from "./../data/bots";
import FeedbackButtons from "./FeedbackButtons";

const ChatAppForFlask = ({ home }) => {
  const [activeBot, setActiveBot] = useState(botsData[0].title);
  const [activeSubject, setActiveSubject] = useState(botsData[0].subject);
  const [botStatus, setBotStatus] = useState(botsData[0].status);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      text: `Hello! I'm your ${botsData[0].title} guide. How can I assist you today?`,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchBotResponse = async (userText) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "https://flask-hello-de597930da7a.herokuapp.com/ask_question",
        { question: userText },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.answer;
    } catch (err) {
      setError("Sorry, there was an error processing your request.");
      return "I'm unable to process your request at the moment.";
    } finally {
      setLoading(false);
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

    // Add loading message
    const loadingMessage = {
      id: messages.length + 2,
      type: "bot",
      isLoading: true,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prevMessages) => [...prevMessages, loadingMessage]);

    const botResponseText = await fetchBotResponse(inputMessage);

    // Remove loading message and add actual response
    setMessages((prevMessages) => {
      const filteredMessages = prevMessages.filter((msg) => !msg.isLoading);
      return [
        ...filteredMessages,
        {
          id: messages.length + 2,
          type: "bot",
          text: botResponseText,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ];
    });

    setInputMessage("");
  };

  const handleBotSwitch = (botTitle, botSubject, botStatus) => {
    setActiveBot(botTitle);
    setActiveSubject(botSubject);
    setBotStatus(botStatus);
    setMessages([
      {
        id: 1,
        type: "bot",
        text: `Hello! I'm your ${botTitle} guide. How can I assist you today?`,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  };

  return (
    <div className="flex h-full gap-6 p-4">
      {/* Subjects Sidebar */}
      <Card className="w-64 shrink-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Notebook className="h-5 w-5 text-blue-500" />
            Subjects
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[calc(100vh-12rem)]">
            <div className="space-y-1 p-2">
              {botsData.map((bot) => (
                <button
                  key={bot.title}
                  onClick={() =>
                    handleBotSwitch(bot.title, bot.subject, bot.status)
                  }
                  className={`w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors
                    ${
                      activeBot === bot.title
                        ? "bg-blue-50 text-blue-700"
                        : "hover:bg-gray-100"
                    }`}
                >
                  <MessageSquareMore className="h-4 w-4" />
                  {bot.title}
                </button>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Main Chat Area */}
      <Card className="flex-1">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <NotebookText className="h-5 w-5 text-blue-500" />
              {activeBot}
            </CardTitle>
            <div className="flex items-center gap-1">
              {botStatus === "online" && (
                <span
                  className="h-2 w-2 bg-emerald-400 rounded-full"
                  style={{
                    animation: "blink 1s infinite",
                    animationTimingFunction: "ease-in-out",
                    animationName: "blink-keyframes",
                  }}
                />
              )}
              <Badge
                variant="secondary"
                className={
                  botStatus === "online" ? "bg-emerald-400" : "bg-red-400"
                }
              >
                {botStatus}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="flex flex-col h-[calc(100vh-12rem)]">
            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start gap-3 ${
                      message.type === "user" ? "justify-end" : ""
                    }`}
                  >
                    {message.type === "bot" && (
                      <div className="w-8 h-8 shrink-0 rounded-full bg-blue-100 flex items-center justify-center">
                        <Brain className="h-4 w-4 text-blue-500" />
                      </div>
                    )}
                    <div
                      className={`group ${
                        message.type === "user" ? "order-1" : ""
                      }`}
                    >
                      <div
                        className={`rounded-lg px-4 py-2 ${
                          message.type === "bot"
                            ? "bg-gray-100 max-w-[80%]"
                            : "bg-blue-500 text-white ml-auto"
                        }`}
                      >
                        {message.isLoading ? (
                          <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span className="text-sm">Thinking... </span>
                          </div>
                        ) : (
                          <div className="text-sm whitespace-pre-wrap">
                            {message.text}
                          </div>
                        )}
                      </div>
                      {message.type === "bot" && !message.isLoading && (
                        <div className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                          <FeedbackButtons messageId={message.id} />
                        </div>
                      )}
                    </div>
                    {message.type === "user" && (
                      <div className="w-8 h-8 shrink-0 rounded-full bg-blue-500 flex items-center justify-center order-2">
                        <img src="/user.svg" alt="User" className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Error Alert */}
            {error && (
              <Alert variant="destructive" className="mx-4 my-2">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Input Area */}
            <div className="px-4 pt-4 pb-0 border-t">
              <div className="relative">
                <textarea
                  ref={textareaRef}
                  rows={1}
                  placeholder="Ask anything..."
                  value={inputMessage}
                  onChange={(e) => {
                    setInputMessage(e.target.value);
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
                  className="w-full px-4 py-3 pr-12 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  style={{ minHeight: "50px", maxHeight: "200px" }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={loading}
                  className="absolute right-2 top-2 p-2 text-blue-500 hover:text-blue-600 disabled:opacity-50"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <style>
        {`
          @keyframes blink-keyframes {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
        `}
      </style>
    </div>
  );
};

export default ChatAppForFlask;
