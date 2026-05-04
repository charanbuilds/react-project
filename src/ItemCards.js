import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CDN_URL } from "../utils/links";
import { addItem, removeItem } from "../redux/CartSlice";
import userContext from "../utils/userContext";

const ItemCards = ({ items }) => {
  const dispatch = useDispatch();
  const { loggedInUser, setShowLoginModal } = useContext(userContext);
  const cartItems = useSelector((store) => store.cart.items);

  const getCount = (itemId) =>
    cartItems.filter((i) => i?.card?.info?.id === itemId).length;

  const handleAdd = (e, item) => {
    e.stopPropagation(); 
    if (!loggedInUser) { setShowLoginModal(true); return; }
    dispatch(addItem(item));
  };

  const handleRemove = (e, itemId) => {
    e.stopPropagation(); 
    if (!loggedInUser) { setShowLoginModal(true); return; }
    dispatch(removeItem(itemId));
  };

  return (
    <div>
      {items?.map((item, index) => {
        const info = item?.card?.info;
        const price = (info?.price || info?.defaultPrice || 0) / 100;
        const count = getCount(info?.id);
        const isVeg = info?.itemAttribute?.vegClassifier === "VEG";

        return (
          <div
            key={`${info?.id}-${index}`}
            className="py-6 border-b border-gray-200 last:border-b-0 flex justify-between gap-4"
          >
            {/* ========== LEFT: Item Info ========== */}
            <div className="flex-1">

              {/* Veg/Non-veg Icon */}
              <div className="mb-1">
                {isVeg ? (
                  <div className="w-4 h-4 border-2 border-green-600 flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                ) : (
                  <div className="w-4 h-4 border-2 border-red-600 flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-b-[7px] border-l-transparent border-r-transparent border-b-red-600"></div>
                  </div>
                )}
              </div>

              {/* Name */}
              <h3 className="font-bold text-base text-gray-800">
                {info?.name}
              </h3>

              {/* Price */}
              <p className="text-sm font-medium text-gray-800 mt-1">
                ₹{price}
              </p>

              {/* Rating if available */}
              {info?.ratings?.aggregatedRating?.rating && (
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-green-600 text-xs">★</span>
                  <span className="text-xs font-medium text-gray-600">
                    {info?.ratings?.aggregatedRating?.rating}
                  </span>
                  <span className="text-xs text-gray-400">
                    ({info?.ratings?.aggregatedRating?.ratingCountV2})
                  </span>
                </div>
              )}

              {/* Description */}
              {info?.description && (
                <p className="text-sm text-gray-500 mt-2 leading-relaxed line-clamp-2">
                  {info?.description}
                </p>
              )}
            </div>

            {/* ========== RIGHT: Image + Button ========== */}
            <div className="relative w-[150px] flex-shrink-0">

              {/* Image */}
              {info?.imageId ? (
                <img
                  src={CDN_URL + info?.imageId}
                  className="w-[150px] h-[120px] object-cover rounded-xl"
                  alt={info?.name}
                />
              ) : (
                <div className="w-[150px] h-[120px] bg-gray-100 rounded-xl"></div>
              )}

              {/* ADD / Quantity Button */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
                {count === 0 ? (
                  <button
                    className="bg-white border border-gray-300 text-green-600 font-bold text-sm px-8 py-1.5 rounded-lg shadow-md hover:shadow-lg transition-all active:scale-95 uppercase"
                    onClick={(e) => handleAdd(e, item)}
                  >
                    Add
                  </button>
                ) : (
                  <div className="flex items-center bg-green-600 rounded-lg shadow-md overflow-hidden">
                    <button
                      className="px-3 py-1.5 text-white font-bold text-base hover:bg-green-700 transition-colors"
                      onClick={(e) => handleRemove(e, info?.id)}
                    >
                      −
                    </button>
                    <span className="px-3 py-1.5 text-white font-bold text-sm min-w-[24px] text-center">
                      {count}
                    </span>
                    <button
                      className="px-3 py-1.5 text-white font-bold text-base hover:bg-green-700 transition-colors"
                      onClick={(e) => handleAdd(e, item)}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ItemCards;
