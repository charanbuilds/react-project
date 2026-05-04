import { useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../../utils/useOnlinestatus";
import userContext from "../../utils/userContext";
import { useSelector } from "react-redux";

export const Header = () => {
  const onlineStatus = useOnlineStatus();
  const cartitems = useSelector((store) => store.cart.items);

  const {
    loggedInUser,
    setLoggedInUser,
    setAuthToken,
    setShowLoginModal,
    authToken,
  } = useContext(userContext);

  const handleLogout = async () => {
    try {
      await fetch("http://127.0.0.1:8000/logout", {
        method: "POST",
        headers: { Authorization: `Bearer ${authToken}` },
      });
    } catch (err) {
      console.log("Logout error", err);
    }
    setLoggedInUser(null);
    setAuthToken(null);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md shadow-red-500/20">
            <span className="font-heading text-xl font-extrabold text-white">HC</span>
          </div>
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="font-heading text-sm font-bold text-teal-800 tracking-wide">
              Food<span className="text-red-500">Hub</span>
            </span>
            <span className="text-[10px] text-gray-400 uppercase tracking-widest">Taste the best</span>
          </div>
        </Link>

        <nav>
          <ul className="flex items-center gap-2">

            <li className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100">
              <span className={`w-2 h-2 rounded-full ${onlineStatus ? "bg-teal-500 animate-pulse" : "bg-red-500"}`}></span>
              <span className="text-xs font-medium text-teal-700">{onlineStatus ? "Online" : "Offline"}</span>
            </li>

            <li>
              <Link to="/" className="px-4 py-2 text-sm font-medium text-slate-600 rounded-full hover:bg-teal-50 hover:text-teal-800 transition-all duration-200">
                Home
              </Link>
            </li>

            <li>
              {loggedInUser ? (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-red-500 rounded-full hover:bg-red-50 transition-all duration-200"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="px-5 py-2 text-sm font-semibold text-white bg-teal-700 rounded-full hover:bg-teal-800 transition-all duration-200 active:scale-95 shadow-md"
                >
                  Login
                </button>
              )}
            </li>

            <li>
              <Link
                to="/Cart"
                className="relative flex items-center gap-1.5 px-5 py-2 text-sm font-semibold bg-teal-800 text-white rounded-full hover:bg-teal-900 transition-all duration-200 active:scale-95 shadow-md shadow-teal-800/20"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
                <span>Cart</span>
                {cartitems.length > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartitems.length}
                  </span>
                )}
              </Link>
            </li>

            {loggedInUser && (
              <li>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-rose-50 rounded-full border border-rose-100">
                  <div className="w-7 h-7 rounded-full bg-red-500 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{loggedInUser.charAt(0).toUpperCase()}</span>
                  </div>
                  <span className="text-sm font-medium text-slate-700">{loggedInUser}</span>
                </div>
              </li>
            )}

          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
