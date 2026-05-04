import { useState, useContext, useEffect } from "react";
import userContext from "../../utils/userContext";

export default function LoginModal() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { showLoginModal, setShowLoginModal, setLoggedInUser, setAuthToken } =
    useContext(userContext);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setShowLoginModal(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setShowLoginModal]);

  useEffect(() => {
    if (showLoginModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [showLoginModal]);

  if (!showLoginModal) return null;

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.token) {
        setAuthToken(data.token);
        setLoggedInUser(data.username);
        setShowLoginModal(false);
        setUsername("");
        setPassword("");
        setError("");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={() => setShowLoginModal(false)}
    >
      <div
        className="relative bg-white rounded-3xl shadow-2xl w-[420px] max-w-[90vw] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "modalSlideUp 0.3s ease-out" }}
      >
        <div className="h-1.5 bg-gradient-to-r from-red-500 via-teal-500 to-red-500"></div>

        <button
          onClick={() => setShowLoginModal(false)}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-red-100 flex items-center justify-center transition-colors duration-200 group"
        >
          <svg className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="px-8 pt-8 pb-10">
          <div className="flex items-center justify-center mb-6">
            <div className="w-14 h-14 bg-red-500 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/30">
              <span className="font-heading text-2xl font-extrabold text-white">HC</span>
            </div>
          </div>

          <h2 className="font-heading text-2xl font-bold text-center text-teal-900 mb-1">Welcome Back!</h2>
          <p className="text-center text-gray-400 text-sm mb-8 font-body">Login to order your favorite food 🍔</p>

          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 font-heading">Username</label>
            <input
              type="text"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm font-body text-gray-700 placeholder-gray-300 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all duration-200"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          </div>

          <div className="mb-5">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 font-heading">Password</label>
            <input
              type="password"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm font-body text-gray-700 placeholder-gray-300 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all duration-200"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          {error && (
            <div className="mb-4 px-4 py-2.5 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-500 text-sm text-center font-medium">❌ {error}</p>
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading || !username || !password}
            className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-heading font-semibold py-3.5 rounded-xl transition-all duration-300 active:scale-[0.98] shadow-lg shadow-red-500/30 text-sm"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Logging in...
              </span>
            ) : (
              "Login →"
            )}
          </button>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-[1px] bg-gray-200"></div>
            <span className="text-xs text-gray-400 font-body">Test Credentials</span>
            <div className="flex-1 h-[1px] bg-gray-200"></div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => { setUsername("admin"); setPassword("1234"); }}
              className="px-4 py-2 bg-teal-50 border border-teal-200 rounded-lg text-xs font-semibold text-teal-700 hover:bg-teal-100 transition-colors duration-200"
            >
              👤 admin / 1234
            </button>
            <button
              onClick={() => { setUsername("charan"); setPassword("pass"); }}
              className="px-4 py-2 bg-teal-50 border border-teal-200 rounded-lg text-xs font-semibold text-teal-700 hover:bg-teal-100 transition-colors duration-200"
            >
              👤 charan / pass
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
