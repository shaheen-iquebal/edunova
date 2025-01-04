// import React from "react";
import Cookies from "js-cookie";

function Home() {
  const userData = Cookies.get("userData");

  return (
    <div>
      <div className="flex flex-col h-screen mx-auto items-center justify-center text-xl">
        {!userData && ( // Check if userData is not present
          <div className="text-red-500 mb-4">
            You are not logged in. Please login&nbsp;
            <a href="/login" className="underline font-semibold">
              here
            </a>
            &nbsp;to start using.
          </div>
        )}
        <a href="/chat" className="hover:underline">
          Chat with Flask App
        </a>
        <div className="my-2"> </div>
        <a href="/admin" className="hover:underline">
          Dashboard
        </a>
        {/* <div className="my-2"> </div> Adds vertical margin */}
        {/* <a href="/generic-bot" className="hover:underline">
          Generic Bot
        </a>
        <div className="my-2"> </div>
        <a href="/login" className="hover:underline">
          Login
        </a>
        <div className="my-2"> </div>
        <a href="/bots" className="hover:underline">
          Bots
        </a>
        <div className="my-2"> </div>
        <a href="/chatbot" className="hover:underline">
          Chat
        </a>
        <div className="my-2"> </div>
        <a href="/chatwithcontext" className="hover:underline">
          Chat with Context
        </a>
        <div className="my-2"> </div>
        <a href="/add-new-student" className="hover:underline">
          Add new student
        </a> */}
      </div>
    </div>
  );
}

export default Home;
