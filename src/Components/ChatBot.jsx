import { useState, useRef, useEffect } from "react";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi! 👋 I'm your food ordering support assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8000/chat", {
        message: userMessage,
      });
      setMessages((prev) => [...prev, { role: "bot", text: res.data.reply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Sorry, something went wrongggggggggggggggg. Please try again! 😕" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 9999 }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "60px", height: "60px", borderRadius: "50%",
          backgroundColor: "#fc8019", border: "none",
          fontSize: "26px", cursor: "pointer",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
          display: "flex", alignItems: "center", justifyContent: "center",
          marginLeft: "auto",
        }}
      >
        {isOpen ? "✕" : "💬"}
      </button>

      {isOpen && (
        <div style={{
          position: "absolute", bottom: "70px", right: "0px",
          width: "320px", backgroundColor: "#fff", borderRadius: "16px",
          boxShadow: "0px 8px 24px rgba(0,0,0,0.2)", overflow: "hidden",
          display: "flex", flexDirection: "column",
        }}>
          <div style={{
            backgroundColor: "#fc8019", padding: "14px 16px",
            color: "white", fontWeight: "bold", fontSize: "15px",
            display: "flex", alignItems: "center", gap: "8px",
          }}>
            🍔 Customer Support
          </div>

          <div style={{
            height: "300px", overflowY: "auto", padding: "12px",
            display: "flex", flexDirection: "column", gap: "10px",
            backgroundColor: "#f9f9f9",
          }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                <span style={{
                  padding: "10px 14px",
                  borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                  backgroundColor: msg.role === "user" ? "#fc8019" : "#fff",
                  color: msg.role === "user" ? "white" : "#333",
                  fontSize: "13px", maxWidth: "80%",
                  boxShadow: "0px 1px 4px rgba(0,0,0,0.1)", lineHeight: "1.4",
                }}>
                  {msg.text}
                </span>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <span style={{
                  padding: "10px 14px", borderRadius: "16px 16px 16px 4px",
                  backgroundColor: "#fff", fontSize: "13px", color: "#999",
                  boxShadow: "0px 1px 4px rgba(0,0,0,0.1)",
                }}>
                  Typing...
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div style={{
            display: "flex", padding: "10px", borderTop: "1px solid #eee",
            gap: "8px", backgroundColor: "#fff",
          }}>
            <input
              style={{
                flex: 1, padding: "8px 12px", borderRadius: "20px",
                border: "1px solid #ddd", outline: "none", fontSize: "13px",
              }}
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              style={{
                padding: "8px 16px",
                backgroundColor: loading ? "#ccc" : "#fc8019",
                color: "white", border: "none", borderRadius: "20px",
                cursor: loading ? "not-allowed" : "pointer",
                fontSize: "13px", fontWeight: "bold",
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
