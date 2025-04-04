import { useEffect, useState } from "react";
import { CDN_URL, MENU_API } from "../utils/constants";
import { useParams } from "react-router";
import useRestaurantMenu from "../utils/useRestaurantMenu";

const RestaurantMenu = () => {
  // const [resInfo, setResInfo] = useState([]);
  const { resId } = useParams();
  //   console.log(resId);

  const resInfo = useRestaurantMenu(resId);

  // const fetchMenu = async () => {
  //   const data = await fetch(MENU_API + resId);
  //   const json = await data.json();
  //   setResInfo(json?.data);
  //   console.log(json?.data);
  // };
  // useEffect(() => {
  //   fetchMenu();
  // }, []);

  //   console.log(resInfo?.cards);

  if (resInfo.length === 0 || resInfo === undefined)
    return <div>Loading...</div>;

  const { name, cuisines, costForTwo, cloudinaryImageId } =
    resInfo?.cards[2]?.card?.card?.info;

  return (
    <div>
      <div style={{ width: "300px" }}>
        <img
          alt="restaurant"
          src={CDN_URL + cloudinaryImageId}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <h1>{name}</h1>
      <h3>Menu</h3>
      <ul>
        {(resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card
          ?.card?.itemCards
          ? resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]
              ?.card?.card?.itemCards
          : resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]
              ?.card?.card?.itemCards
        ).map((item) => {
          return (
            <li
              key={item?.card?.info?.id}
              style={{
                display: "flex",
                gap: "20px",
                justifyContent: "space-between",
                width: "400px",
              }}
            >
              <span>{item?.card?.info?.name}:</span>
              <span>
                {(item?.card?.info?.defaultPrice || item?.card?.info?.price) /
                  100}
                .00
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default RestaurantMenu;
