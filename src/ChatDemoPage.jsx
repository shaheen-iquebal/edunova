import { useState } from "react";

function App() {
  return (
    <>
      <div className="h-screen flex justify-center items-center bg-gray-100 pt-2 pb-2">
        <div className="w-full max-w-3xl h-full flex flex-col bg-whivte bg-gradient-to-r from-rose-50 to-teal-50 shadow-lg">
          {/* Chat Header */}
          <div className="px-4 py-3 bg-blue-600 text-white font-semibold text-lg rounded-t-lg">
            <img className="w-8 h-8 inline mr-3" src="/icon.svg"></img>AI
            ChatBot
          </div>

          {/* <!-- Chat Messages --> */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {/* <!-- Bot Message --> */}
            <div className="flex items-start gap-2.5" id="bot-message">
              <img
                className="w-8 h-8 rounded-full"
                src="/robot.svg"
                alt="Bot image"
              />
              <div className="flex flex-col gap-1 w-full max-w-[320px]">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    Bot
                  </span>
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    11:46
                  </span>
                </div>
                <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    Hello! How can I assist you today?
                  </p>
                </div>
              </div>
            </div>

            {/* <!-- User Message --> */}
            <div
              className="flex items-start gap-2.5 justify-end"
              id="user-message"
            >
              <div className="flex flex-col gap-1 w-full max-w-[320px]">
                <div className="flex items-center justify-end space-x-2 rtl:space-x-reverse">
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    11:47
                  </span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    You
                  </span>
                </div>
                <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-blue-500 text-white rounded-s-xl rounded-se-xl">
                  <p className="text-sm font-semibold">
                    I need help setting up my chatbot UI.
                  </p>
                </div>
              </div>
              <img
                className="w-8 h-8 rounded-full self-end"
                src="/user.svg"
                alt="User image"
              />
            </div>
          </div>

          {/* <!-- Input Area --> */}
          <div className="px-4 py-3 bg-gray-100 border-t">
            <div className="flex items-center space-x-3">
              <input
                type="text"
                placeholder="Ask anything"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
