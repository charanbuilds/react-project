import ItemCards from "../ItemCards";

const RestaurantCategory = ({ data, showItems, setshowIndex }) => {
  return (
    <div className="border-b-[12px] border-gray-100">
      
      <div
        className="flex justify-between items-center py-4 cursor-pointer"
        onClick={setshowIndex}
      >
        <span className="font-bold text-base text-gray-800">
          {data?.title} ({data?.itemCards.length})
        </span>
        <svg
          className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${
            showItems ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

    
      {showItems && <ItemCards items={data?.itemCards} />}
    </div>
  );
};

export default RestaurantCategory;
