/* eslint-disable react/prop-types */
import { useState } from "react";
import { LiaThumbsUp, LiaThumbsDown } from "react-icons/lia";
import { TbCopy } from "react-icons/tb";
import { HiOutlineRefresh } from "react-icons/hi";

function FeedbackButtons({ messageId }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // Find the message div using the messageId
    const messageDiv = document.querySelector(
      `[data-message-id="${messageId}"]`
    );

    if (messageDiv) {
      // Select the text content div specifically
      const textContentDiv = messageDiv.querySelector(".message-text-content");

      if (textContentDiv) {
        // Remove HTML tags and get plain text
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = textContentDiv.innerHTML;
        const plainText = tempDiv.textContent || tempDiv.innerText;

        // Copy to clipboard
        navigator.clipboard
          .writeText(plainText.trim())
          .then(() => {
            setCopied(true);
            // Reset copied state after 2 seconds
            setTimeout(() => setCopied(false), 2000);
          })
          .catch((err) => {
            console.error("Failed to copy text: ", err);
          });
      }
    }
  };

  return (
    <div className="flex flex-row pt-3 gap-2" style={{ fontSize: "17px" }}>
      <div className="relative">
        <TbCopy
          onClick={handleCopy}
          className="text-gray-400 hover:text-blue-500 cursor-pointer"
          style={{ fontSize: "15px", marginRight: "4" }}
          title={copied ? "Copied!" : "Copy"}
        />
        {copied && (
          <span className="absolute -top-7 left-0 bg-green-100 text-green-800 text-xs font-medium me-2 px-2 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
            Copied!
          </span>
        )}
      </div>
      <LiaThumbsUp
        className="text-gray-400 hover:text-green-500 cursor-pointer"
        title="Good response"
      />
      <LiaThumbsDown
        className="text-gray-400 hover:text-red-500 cursor-pointer"
        title="Bad response"
      />
      <HiOutlineRefresh
        className="text-gray-400 hover:text-gray-500 tsext-sm cursor-pointer"
        style={{ marginLeft: "3px" }}
        title="Regenerate"
      />
    </div>
  );
}

export default FeedbackButtons;
