import { createContext } from "react";

const userContext = createContext({
  Listedhotels: [],
  SetListedhotels: () => {},
  filteredrestro: [],
  Setfilteredrestro: () => {},
  searchText: "",
  SetsearchText: () => {},
  username: "Guest",
  setUsername: () => {},
  loggedInUser: null,
  setLoggedInUser: () => {},
  authToken: null,
  setAuthToken: () => {},
  showLoginModal: false,
  setShowLoginModal: () => {},
});

export default userContext;
