/* eslint-disable react/prop-types */
import { TbLogout2 } from "react-icons/tb";
import { IoHomeOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

function ChatSideBar({ bots, activeBot, onBotSwitch, home }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [userGrade, setUserGrade] = useState(null);
  const [filteredBots, setFilteredBots] = useState([]);

  useEffect(() => {
    // Retrieve and parse the userData cookie
    const userData = Cookies.get("userData");
    if (userData) {
      const user = JSON.parse(userData);
      setName(user.name);
      setUserGrade(parseInt(user.grade)); // Convert grade to a number
    }
  }, []);

  useEffect(() => {
    // Filter bots based on user's grade
    if (userGrade !== null) {
      const botsForUserGrade = bots.filter((bot) =>
        bot.grades.includes(userGrade)
      );
      setFilteredBots(botsForUserGrade);
    }
  }, [bots, userGrade]);

  const handleLogout = () => {
    navigate("/logout");
  };

  return (
    <div className="w-1/6 bg-[#171717] text-white p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-bold mb-4 px-2">Subjects</h2>
        <ul>
          {filteredBots.map((bot) => (
            <li
              key={bot.title}
              onClick={() => onBotSwitch(bot.title, bot.subject)}
              className={`p-2 cursor-pointer rounded ${
                activeBot === bot.title ? "bg-gray-700" : "hover:bg-gray-800"
              }`}
            >
              {bot.title}
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom section */}
      <div className="mt-4 border-t border-gray-700 pt-4">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2 py-2">
            <img
              src="/user.svg"
              alt="Profile"
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm">Hi, {name}</span>
          </div>
          <div
            className="py-2 cursor-pointer hoxver:bg-gray-800 rounded text-sm"
            onClick={handleLogout}
          >
            <TbLogout2 className="inline text-xl" />
            <span className="pl-2.5">Logout</span>
          </div>
          <div className="py-2 cursor-pointer hoxver:bg-gray-800 rounded text-sm">
            <a href={home}>
              <IoHomeOutline className="inline text-lg" />
              <span className="pl-2.5">Back to Home</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatSideBar;
