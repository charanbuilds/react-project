import { useState,useEffect } from "react";
import { MenucardUrl } from "../../utils/links";

const useRestaurantMenu = (resID) => {

 useEffect(() => {
    fetchMenu();
  }, []);

const [resInfo, setResInfo] = useState(null);
const fetchMenu = async () => {
    const response = await fetch(MenucardUrl + resID);
    const json = await response.json();
    console.log(json);
    setResInfo(json.data);
  };


 return resInfo
}



export default useRestaurantMenu;