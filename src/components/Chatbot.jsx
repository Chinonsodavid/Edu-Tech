import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { FaPaperPlane, FaRobot, FaTimes, FaComments } from "react-icons/fa";
import { db, auth } from "../firebase"; // Adjust path if needed
import { collection, addDoc, query, getDocs, orderBy } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null); // Track the logged-in user
    const chatRef = useRef(null);

    const API_URL = "https://openrouter.ai/api/v1/chat/completions";
    const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

    // Load previous chat history when user logs in
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                console.log("User logged in:", currentUser.uid);
                setUser(currentUser);

                const q = query(collection(db, "chats", currentUser.uid, "messages"), orderBy("timestamp", "asc"));
                const querySnapshot = await getDocs(q);
                const chatHistory = querySnapshot.docs.map((doc) => doc.data());

                console.log("Loaded chat history:", chatHistory);
                setMessages(chatHistory);
            } else {
                console.log("No user logged in. Clearing chat.");
                setUser(null);
                setMessages([]);
            }
        });

        return () => unsubscribe();
    }, []);

    // Function to send message
    const sendMessage = async () => {
        if (!user) {
            toast.error("You need to be logged in to chat.");
            return;
        }

        if (!input.trim()) return;

        const userMessage = { role: "user", content: input, timestamp: Date.now() };
        setMessages((prev) => [...prev, userMessage]);
        console.log("User message sent:", userMessage);

        setInput("");
        setLoading(true);

        try {
            // Save user message to Firestore
            await addDoc(collection(db, "chats", user.uid, "messages"), userMessage);

            // Call AI API
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
            const botMessage = { role: "assistant", content: data.choices[0]?.message?.content || "No response from AI.", timestamp: Date.now() };

            console.log("AI response received:", botMessage);
            setMessages((prev) => [...prev, botMessage]);

            // Save AI response to Firestore
            await addDoc(collection(db, "chats", user.uid, "messages"), botMessage);
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
                        {messages.length === 0 && !user && (
                            <div className="text-gray-500 text-center">Log in to start chatting.</div>
                        )}
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
                            className="flex-grow border-none outline-none p-2 text-gray-700 disabled:bg-gray-200"
                            placeholder={user ? "Ask me anything..." : "Log in to chat"}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                            disabled={!user || loading}
                        />
                        <button 
                            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-700 transition duration-300 disabled:bg-gray-400"
                            onClick={sendMessage}
                            disabled={!user || loading}
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
