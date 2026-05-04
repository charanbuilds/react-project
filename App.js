import React, { lazy, Suspense, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./src/Components/Header";
import Body from "./src/Components/Body";
import Error from "./src/Components/Error";
import Cart from "./src/Components/Cart";
import RestroMenu from "./src/RestroMenu";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Shimmer from "./src/Components/shimmer";
import userContext from "./utils/userContext";
import { Provider } from "react-redux";
import AppStore from "./redux/AppStore";
import LoginModal from "./src/Components/LoginModal";

const AppLayout = () => {
  const [username, setUsername] = useState("Guest");
  const [Listedhotels, SetListedhotels] = useState([]);
  const [filteredrestro, Setfilteredrestro] = useState([]);
  const [searchText, SetsearchText] = useState("");

  // Auth state — stored in memory, not localStorage
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <Provider store={AppStore}>
      <userContext.Provider
        value={{
          username: loggedInUser || "Guest",
          setUsername,
          searchText,
          SetsearchText,
          Listedhotels,
          SetListedhotels,
          filteredrestro,
          Setfilteredrestro,
          loggedInUser,
          setLoggedInUser,
          authToken,
          setAuthToken,
          showLoginModal,
          setShowLoginModal,
        }}
      >
        <div className="app">
          <Header />
          <Outlet />
          <LoginModal />
        </div>
      </userContext.Provider>
    </Provider>
  );
};

const Grocery = lazy(() => import("./src/Components/Grocery"));

const approuter = createBrowserRouter(
  [
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { path: "/", element: <Body /> },
        { path: "/Grocery", element: (<Suspense fallback={<Shimmer />}><Grocery /></Suspense>) },
        { path: "/Cart", element: <Cart /> },
        { path: "/Restro/:resID", element: <RestroMenu /> },
      ],
      errorElement: <Error />,
    },
  ],
  {
    future: {
      v7_startTransition: true,
    },
  }
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={approuter} />);
