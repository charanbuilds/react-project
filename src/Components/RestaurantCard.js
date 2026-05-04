import { CDN_URL } from "../../utils/links";

const RestaurantCard = (props) => {
  const { resName } = props;
  const { name, cuisines, costForTwo, areaName, avgRating, cloudinaryImageId, sla } = resName?.info;

  return (
    <div className="w-[250px] hover:scale-95 transition-all duration-200 cursor-pointer">
      <div className="relative">
        <img
          className="w-full h-44 object-cover rounded-2xl"
          src={CDN_URL + cloudinaryImageId}
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80";
          }}
          alt={name}
        />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent rounded-b-2xl"></div>
        <p className="absolute bottom-2 left-3 text-white font-extrabold text-xl">
          {costForTwo}
        </p>
      </div>
      <div className="mt-3 px-1">
       <h3 className="font-bold text-base text-gray-800 truncate">{name}</h3>
        <div className="flex items-center gap-1 mt-1">
          <div className="flex items-center gap-1 bg-green-600 px-1.5 py-0.5 rounded-full">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-white text-xs font-bold">{avgRating}</span>
          </div>
          <span className="text-gray-400 text-xs">•</span>
          <span className="text-gray-400 text-xs font-medium">{sla?.slaString}</span>
        </div>
        <p className="text-gray-500 text-sm truncate mt-1">{cuisines.join(", ")}</p>
        <p className="text-gray-500 text-sm">{areaName}</p>
      </div>
    </div>
  );
};

export const Promotedlabelcard = (RestaurantCard) => {
  return (props) => {
    return (
      <div className="relative">
        <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-neutral-800 to-neutral-700 text-white font-bold px-3 py-1 text-[10px] tracking-wider uppercase rounded-md">
          PROMOTED
        </div>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
