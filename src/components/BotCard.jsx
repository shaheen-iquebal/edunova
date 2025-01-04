/* eslint-disable react/prop-types */
import React from "react";

function BotCard({ bot, key }) {
  return (
    <div className="p-4 md:w-1/3 sm:mb-0 mb-8 borser shasdow-md" key={key}>
      <div className="rounded-lg h-64 overflow-hidden">
        <img
          alt="content"
          className="object-cover object-center h-full w-full"
          src={bot.imageLink}
        />
      </div>
      <h2 className="text-xl font-medium title-font text-gray-900 mt-5">
        {bot.title}
      </h2>
      <p className="text-base leading-relaxed mt-2">{bot.description}</p>
      <a
        className="text-indigo-500 inline-flex items-center mt-3"
        href="/generic-bot"
      >
        Start Chat
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          className="w-4 h-4 ml-2"
          viewBox="0 0 24 24"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  );
}

export default BotCard;
