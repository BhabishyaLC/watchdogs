import React, { useState, useRef, useEffect } from "react";
import API from "../api/axios";
import ReactMarkdown from "react-markdown";
const CityWatchAIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "System Assistant Online. Ask me about active cases, regional threats, or reporting protocols.",
    },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);



  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userQuery = input;

    setMessages((prev) => [...prev, { sender: "user", text: userQuery }]);
    setInput("");

    setMessages((prev) => [...prev, { sender: "ai", text: "Thinking..." }]);

    try {
      const res = await API.post("/ai/query", { message: userQuery });

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { sender: "ai", text: res.data.text };
        return updated;
      });
    } catch (error) {
      console.error("Failed to connect to backend AI portal:", error);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          sender: "ai",
          text: "Sorry, I lost connection to the main grid. Try again shortly.",
        };
        return updated;
      });
    }
  };

  return (
    <div className="w-full max-w-md h-[calc(100vh-180px)] bg-[#0f121d] border border-slate-800/60 rounded-2xl flex flex-col shadow-xl backdrop-blur-md overflow-hidden">
      <div className="p-4 border-b border-slate-800/80 bg-slate-900/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-200">
              WatchDogs Intelligence Bot
            </h3>
            <p className="text-[11px] text-slate-500">
              Connected to Local Registry
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 scrollbar-thin scrollbar-thumb-slate-800">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex flex-col max-w-[85%] ${
              msg.sender === "user"
                ? "self-end items-end"
                : "self-start items-start"
            }`}
          >
            <span className="text-[10px] text-slate-500 mb-1 px-1">
              {msg.sender === "user" ? "Dispatcher" : "AI Monitor"}
            </span>

            <div
              className={`p-3 text-sm rounded-2xl leading-relaxed shadow-sm ${
                msg.sender === "user"
                  ? "bg-pink-600 text-white rounded-tr-none"
                  : "bg-slate-900/80 text-slate-300 border border-slate-800/40 rounded-tl-none"
              }`}
            >
              {msg.sender === "user" ? (
                
                msg.text
              ) : (
                
                <ReactMarkdown
                  class="space-y-3 prose prose-invert text-sm max-w-none
                    prose-p:leading-relaxed 
                    prose-ul:list-disc prose-ul:pl-4 prose-ul:space-y-1
                    prose-ol:list-decimal prose-ol:pl-4 prose-ol:space-y-1
                    prose-strong:text-white prose-strong:font-bold"
                >
                  {msg.text}
                </ReactMarkdown>
              )}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <form
        onSubmit={handleSendMessage}
        className="p-3 border-t border-slate-800/80 bg-slate-900/20"
      >
        <div className="flex gap-2 bg-slate-950/60 rounded-xl p-1.5 border border-slate-800/50 focus-within:border-pink-500/50 transition-colors">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Query system database..."
            className="flex-1 bg-transparent text-sm text-slate-200 pl-2 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-pink-600 hover:bg-pink-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-colors duration-150 shadow-md"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default CityWatchAIAssistant;
