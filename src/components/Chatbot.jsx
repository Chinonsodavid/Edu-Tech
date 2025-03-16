import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { FaPaperPlane, FaRobot, FaTimes, FaComments } from "react-icons/fa";
import axios from "axios"; // Import axios

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const chatRef = useRef(null);

    const API_URL = "https://openrouter.ai/api/v1/chat/completions";
    const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
    
    const sendMessage = async () => {
        if (!input.trim()) return;
        setMessages((prev) => [...prev, { role: "user", content: input }]);
        setInput("");
        setLoading(true);
    
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "openai/gpt-3.5-turbo",
                    messages: [{ role: "user", content: input }],
                }),
            });
    
            if (!response.ok) throw new Error("Failed to fetch response");
    
            const data = await response.json();
            const botMessage = data.choices[0]?.message?.content || "No response from AI.";
    
            setMessages((prev) => [...prev, { role: "assistant", content: botMessage }]);
        } catch (error) {
            console.error("Chatbot API Error:", error);
            toast.error("Failed to connect to chatbot. Check API key & model.");
        }
    
        setLoading(false);
    };
    
    
    return (
        <div className="fixed bottom-6 right-6">
            {!isOpen ? (
                <button 
                    onClick={() => setIsOpen(true)} 
                    className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
                >
                    <FaComments size={24} />
                </button>
            ) : (
                <div className="w-80 h-96 bg-white shadow-2xl rounded-lg border border-gray-300 flex flex-col">
                    <div className="bg-blue-600 text-white p-3 flex justify-between items-center rounded-t-lg">
                        <div className="flex items-center space-x-2">
                            <FaRobot size={20} />
                            <span className="text-lg font-semibold">EduTech AI</span>
                        </div>
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:text-gray-200"
                        >
                            <FaTimes size={18} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-3 space-y-2">
                        {messages.map((msg, index) => (
                            <div 
                                key={index} 
                                className={`p-2 max-w-[80%] rounded-lg ${msg.role === "user" ? "bg-blue-500 text-white self-end ml-auto" : "bg-gray-200 text-gray-800 self-start"}`}
                            >
                                {msg.content}
                            </div>
                        ))}
                        {loading && <div className="text-gray-500">Typing...</div>}
                        <div ref={chatRef} />
                    </div>

                    <div className="border-t p-2 flex items-center">
                        <input 
                            type="text"
                            className="flex-grow border-none outline-none p-2 text-gray-700"
                            placeholder="Ask me anything..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        />
                        <button 
                            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-700 transition duration-300"
                            onClick={sendMessage}
                            disabled={loading}
                        >
                            <FaPaperPlane size={18} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
