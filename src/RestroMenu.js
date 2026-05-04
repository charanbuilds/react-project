import { useState, useEffect } from "react";
import { MenucardUrl, CDN_URL } from "../utils/links";
import { useParams, useNavigate } from "react-router-dom";
import Shimmer from "./Components/shimmer";
import RestaurantCategory from "./Components/RestaurantCategory";

const RestroMenu = () => {
  let [Resinfo, setResInfo] = useState(null);
  const [showIndex, setshowIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMenu();
  }, []);

  let { resID } = useParams();

  const fetchMenu = async () => {
    const data = await fetch(MenucardUrl + resID);
    const json = await data.json();
    setResInfo(json.data);
  };

  if (!Resinfo) {
    return <Shimmer />;
  }

  const info = Resinfo?.cards[2]?.card?.card?.info;
  const {
    name,
    cuisines,
    avgRating,
    totalRatingsString,
    costForTwoMessage,
    areaName,
    sla,
  } = info;

  const category =
    Resinfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (a) =>
        a?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  return (
    <div className="bg-white min-h-screen pt-24">
      <div className="max-w-[800px] mx-auto px-4">

        {/* ========== BREADCRUMB WITH BACK ========== */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
          <button
            onClick={() => navigate("/")}
            className="hover:text-gray-600 transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-gray-600">{name}</span>
        </div>

        {/* ========== RESTAURANT NAME ========== */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{name}</h1>

        {/* ========== INFO CARD ========== */}
        <div className="border border-gray-200 rounded-2xl p-4 mb-8 bg-gradient-to-b from-white to-gray-50">
          <div className="flex items-center gap-2 mb-2">
            <span className="flex items-center gap-1 text-sm font-bold text-gray-800">
              <span className="text-green-600">⭐</span> {avgRating} ({totalRatingsString})
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-sm font-bold text-gray-800">{costForTwoMessage}</span>
          </div>

          <p className="text-sm text-orange-600 font-medium underline mb-3">
            {cuisines.join(", ")}
          </p>

          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-[1px] h-6 bg-gray-300"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            </div>
            <div>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Outlet</span>{" "}
                <span className="text-gray-500">{areaName}</span>
              </p>
              <p className="text-sm font-medium text-gray-700 mt-2">
                {sla?.slaString}
              </p>
            </div>
          </div>
        </div>

        {/* ========== MENU DIVIDER ========== */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-16 h-[1px] bg-gray-300"></div>
          <span className="text-xs font-medium text-gray-500 tracking-[4px]">
            MENU
          </span>
          <div className="w-16 h-[1px] bg-gray-300"></div>
        </div>

        {/* ========== MENU CATEGORIES ========== */}
        {category.map((c, index) => (
          <RestaurantCategory
            key={c?.card?.card?.title}
            data={c?.card?.card}
            showItems={index === showIndex}
            setshowIndex={() =>
              setshowIndex(index === showIndex ? null : index)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default RestroMenu;
