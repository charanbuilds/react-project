import RestaurantCard, { Promotedlabelcard } from "./RestaurantCard";
import { useEffect, useContext } from "react";
import Shimmer from "./shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../../utils/useOnlinestatus";
import userContext from "../../utils/userContext";
import OffersSection from "./OffersSection";
import Chatbot from "./Chatbot";

const Body = () => {
  const onlinestatus = useOnlineStatus();
  const Cardwithpromotelabel = Promotedlabelcard(RestaurantCard);

  const {
    Listedhotels,
    SetListedhotels,
    filteredrestro,
    Setfilteredrestro,
    searchText,
    SetsearchText,
  } = useContext(userContext);

  useEffect(() => {
    fetchData();
  }, []);

  if (onlinestatus === false)
    return (
      <div className="flex items-center justify-center min-h-screen bg-rose-50">
        <div className="text-center p-10 bg-white rounded-2xl shadow-lg">
          <span className="text-5xl mb-4 block">📡</span>
          <h1 className="font-heading text-2xl font-bold text-teal-800 mb-2">You are Offline</h1>
          <p className="text-gray-500">Please check your internet connection</p>
        </div>
      </div>
    );

  const fetchData = async () => {
    let data = await fetch(
      "https://corsproxy.io/?url=https://namastedev.com/api/v1/listRestaurants"
    );
    const json = await data.json();
    SetListedhotels(
      json.data.data.cards[1].card.card.gridElements.infoWithStyle.restaurants
    );
    Setfilteredrestro(
      json.data.data.cards[1].card.card.gridElements.infoWithStyle.restaurants
    );
  };

  if (Listedhotels.length === 0) {
    return <Shimmer />;
  }

  return (
    <div className="bg-rose-50/50 pt-20 min-h-screen">

      <div className="relative mx-4 md:mx-16 rounded-3xl overflow-hidden mb-14 group cursor-pointer">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1400&q=80"
          alt="food banner"
          className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
        />
       <div className="absolute inset-0 bg-black/70"></div>
        <div className="absolute inset-0 z-10 flex flex-col justify-center px-8 md:px-16">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-[2px] bg-white"></div>
            <p className="text-white font-semibold text-sm tracking-widest uppercase font-body">Fresh & Fast Delivery</p>
          </div>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
            Hungry? <br />
            <span className="text-red-400">We got you</span> covered!
          </h1>
          <p className="text-white text-base md:text-lg max-w-md mb-8 font-body">
            Order from the best restaurants near you. Hot food delivered in{" "}
            <span className="text-teal-300 font-semibold">30 minutes</span>.
          </p>
          <div className="flex items-center gap-4">
            <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-red-500/30 font-heading text-sm">Order Now 🍔</button>
            <button className="border-2 border-white/30 text-white hover:border-teal-300 hover:text-teal-300 font-semibold px-8 py-3.5 rounded-full transition-all duration-300 font-heading text-sm">Explore Menu →</button>
          </div>
          <div className="flex items-center gap-8 mt-10">
            <div>
              <p className="text-2xl font-bold text-white font-heading">500+</p>
              <p className="text-white text-xs font-body">Restaurants</p>
            </div>
            <div className="w-[1px] h-10 bg-teal-600"></div>
            <div>
              <p className="text-2xl font-bold text-white font-heading">4.8 ⭐</p>
              <p className="text-white text-xs font-body">Average Rating</p>
            </div>
            <div className="w-[1px] h-10 bg-teal-600"></div>
            <div>
              <p className="text-2xl font-bold text-white font-heading">30 min</p>
              <p className="text-white text-xs font-body">Fast Delivery</p>
            </div>
          </div>
        </div>
      </div>

      <OffersSection />

      <div className="mx-4 md:mx-16 mt-14 mb-16">

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-10 bg-red-500 rounded-full"></div>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-teal-900">Restaurants Near You</h2>
              <p className="text-gray-500 text-sm mt-0.5 font-body">Discover the best food around you</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full px-4 py-2 focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-100 focus-within:bg-white transition-all duration-300">
              <svg className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                className="bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 w-48 font-body"
                placeholder="Search restaurants..."
                value={searchText}
                onChange={(e) => SetsearchText(e.target.value)}
              />
              <button
                className="ml-2 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-4 py-1 rounded-full transition-all duration-300 active:scale-95 flex-shrink-0"
                onClick={() => {
                  let filtered = Listedhotels.filter((res) =>
                    res.info.name.toLowerCase().includes(searchText.toLowerCase())
                  );
                  Setfilteredrestro(filtered);
                }}
              >
                Search
              </button>
            </div>
            <button
              className="px-5 py-2.5 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 transition-all duration-300 active:scale-95 shadow-md shadow-red-500/20 text-sm font-heading"
              onClick={() => {
                const filteredRestaurants = Listedhotels.filter(
                  (res) => res.info.avgRating > 4.2
                );
                Setfilteredrestro(filteredRestaurants);
              }}
            >
              ⭐ Top Rated
            </button>
            <button
              className="px-5 py-2.5 bg-teal-800 text-white font-semibold rounded-full hover:bg-teal-900 transition-all duration-300 active:scale-95 text-sm font-heading"
              onClick={() => {
                Setfilteredrestro(Listedhotels);
              }}
            >
              Show All
            </button>
          </div>
        </div>

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-teal-200 to-transparent mb-8"></div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredrestro?.map((restaurant) => {
            const isPromoted = restaurant?.info?.avgRating > 4.5;
            return (
              <Link
                key={restaurant.info.id}
                to={"/Restro/" + restaurant.info.id}
                className="transform hover:-translate-y-2 transition-all duration-300"
              >
                {isPromoted ? (
                  <Cardwithpromotelabel resName={restaurant} />
                ) : (
                  <RestaurantCard resName={restaurant} />
                )}
              </Link>
            );
          })}
        </div>
      </div>

      <footer className="bg-teal-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center">
                  <span className="font-heading text-xl font-extrabold text-white">HC</span>
                </div>
                <span className="font-heading text-lg font-bold">Food<span className="text-red-400">Hub</span></span>
              </div>
              <p className="text-teal-300/60 text-sm font-body leading-relaxed">Your favorite food, delivered fast. Fresh meals from the best restaurants near you.</p>
            </div>
            <div>
              <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-teal-300 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-teal-100/60 hover:text-white text-sm transition-colors duration-200">Home</a></li>
                <li><a href="#" className="text-teal-100/60 hover:text-white text-sm transition-colors duration-200">About Us</a></li>
                <li><a href="#" className="text-teal-100/60 hover:text-white text-sm transition-colors duration-200">Restaurants</a></li>
                <li><a href="#" className="text-teal-100/60 hover:text-white text-sm transition-colors duration-200">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-teal-300 mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-teal-100/60 hover:text-white text-sm transition-colors duration-200">Help Center</a></li>
                <li><a href="#" className="text-teal-100/60 hover:text-white text-sm transition-colors duration-200">Privacy Policy</a></li>
                <li><a href="#" className="text-teal-100/60 hover:text-white text-sm transition-colors duration-200">Terms of Service</a></li>
                <li><a href="#" className="text-teal-100/60 hover:text-white text-sm transition-colors duration-200">FAQs</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-teal-300 mb-4">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-teal-100/60 text-sm"><span>📧</span> support@hcfoodhub.com</li>
                <li className="flex items-center gap-2 text-teal-100/60 text-sm"><span>📞</span> +91 98765 43210</li>
                <li className="flex items-center gap-2 text-teal-100/60 text-sm"><span>📍</span> Hyderabad, India</li>
              </ul>
              <div className="flex items-center gap-3 mt-4">
                <a href="#" className="w-8 h-8 bg-teal-800 hover:bg-red-500 rounded-full flex items-center justify-center transition-all duration-300"><span className="text-sm">𝕏</span></a>
                <a href="#" className="w-8 h-8 bg-teal-800 hover:bg-red-500 rounded-full flex items-center justify-center transition-all duration-300"><span className="text-sm">📘</span></a>
                <a href="#" className="w-8 h-8 bg-teal-800 hover:bg-red-500 rounded-full flex items-center justify-center transition-all duration-300"><span className="text-sm">📸</span></a>
              </div>
            </div>
          </div>
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-teal-700 to-transparent mb-6"></div>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-teal-100/40 text-sm font-body">© 2025 HC FoodHub. All rights reserved.</p>
            <p className="text-teal-100/40 text-sm font-body mt-2 md:mt-0">Made with <span className="text-red-400">❤️</span> by Haricharan</p>
          </div>
        </div>
      </footer>

      <Chatbot />
    </div>
  );
};

export default Body;
