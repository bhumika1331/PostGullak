"use client";

import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; from: "user" | "bot" }[]>([]);
  const [input, setInput] = useState("");

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (input.trim()) {
      // Add user message
      setMessages([...messages, { text: input, from: "user" }]);
  
      try {
        // Call your API to get the bot's response
        const response = await fetch("https://postgullak-backend.onrender.com/bot/prompt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sysmsg: "str",question: "You are PostGullak, a finance AI oriented with Indian Post Offices, do not mention your name unless asked. Here's the prompt : " + input }),
        });
  
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
  
        const data = await response.json();
        const botResponse = data.ans || "Sorry, I didn't understand that.";
  
        // Add bot response
        setMessages([...messages, { text: input, from: "user" }, { text: botResponse, from: "bot" }]);
      } catch (error) {
        console.error("Error fetching bot response:", error);
        // Fallback response in case of an error
        setMessages([...messages, { text: input, from: "user" }, { text: "Sorry, something went wrong. Please try again later.", from: "bot" }]);
      }
  
      setInput("");
    }
  };

  return (
    <div className={`fixed bottom-8 right-4 transition-all mb-5 ${isOpen ? "w-80 h-80" : "w-14 h-14"}`}>
      {!isOpen && (
        <div
          className="fixed bottom-8 right-8 bg-black p-1 rounded-full cursor-pointer shadow-lg"
          onClick={toggleChatbot}
        >
          <Image src="/home/chatbot.png" alt="Chatbot" width={45} height={50} />
        </div>
      )}
      {isOpen && (
        <>
          <div
            className="flex items-center p-3 bg-black text-white rounded-t-lg shadow-lg cursor-pointer"
            onClick={toggleChatbot}
          >
            <Image src="/home/chatbot.png" alt="Chatbot" width={30} height={30} className="mr-2" />
            <span className="font-semibold">Chat with us</span>
            <XMarkIcon className="w-5 h-5 ml-auto" />
          </div>
          <div className="bg-black text-white border border-gray-700 rounded-b-lg p-4 shadow-lg h-full flex flex-col">
            <div className="flex-1 overflow-y-auto">
              {messages.map((message, index) => (
                <div key={index} className={`my-2 ${message.from === "bot" ? "text-left" : "text-right"}`}>
                  <div
                    className={`inline-block px-4 py-2 rounded-lg ${
                      message.from === "bot" ? "bg-gray-800" : "bg-blue-800"
                    } relative`}
                  >
                    {message.from === "bot" && (
                      <Image
                        src="/home/chatbot.png"
                        alt="Chatbot"
                        width={20}
                        height={20}
                        className="absolute top-0 left-0 -ml-8 mt-2"
                      />
                    )}
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center mt-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 p-2 border border-gray-600 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your message..."
              />
              <button
                onClick={handleSendMessage}
                className="ml-2 bg-blue-800 text-white p-2 rounded-md shadow hover:bg-blue-900 transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
