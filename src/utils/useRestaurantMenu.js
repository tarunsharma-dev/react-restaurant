import { useEffect, useState } from "react";
import { MENU_API } from "./constants";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);
  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const res = await fetch(MENU_API + resId);
    const json = await res.json();

    setResInfo(json.data);
  };
  //   console.log(resInfo);
  return resInfo;
};

export default useRestaurantMenu;
