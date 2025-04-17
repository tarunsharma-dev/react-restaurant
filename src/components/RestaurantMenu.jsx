import { useEffect, useState } from "react";
import { CDN_URL, MENU_API } from "../utils/constants";
import { useParams } from "react-router";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategories from "./RestaurantCategories";

const RestaurantMenu = () => {
  // const [resInfo, setResInfo] = useState([]);
  const { resId } = useParams();
  //   console.log(resId);

  const resInfo = useRestaurantMenu(resId);
  const [showIndex, setShowIndex] = useState(0);

  // const fetchMenu = async () => {
  //   const data = await fetch(MENU_API + resId);
  //   const json = await data.json();
  //   setResInfo(json?.data);
  //   console.log(json?.data);
  // };
  // useEffect(() => {
  //   fetchMenu();
  // }, []);

  // console.log(
  //   resInfo !== null &&
  //     resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards
  // );

  const categories =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c?.card?.card["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  // console.log(categories);

  if (resInfo === null || resInfo === undefined) return <div>Loading...</div>;

  const { name, cuisines, costForTwo, cloudinaryImageId } =
    resInfo?.cards[2]?.card?.card?.info;

  return (
    <div className="w-full max-w-[768px] mx-auto space-y-5">
      {/* <div style={{ width: "300px" }}>
        <img
          alt="restaurant"
          src={CDN_URL + cloudinaryImageId}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div> */}
      <h1 className="text-4xl font-semibold">{name}</h1>
      <h3>Menu</h3>
      {/* <ul>
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
      </ul> */}

      <div className="space-y-4">
        {categories !== undefined
          ? categories.map((data, index) => (
              // Controller component
              <RestaurantCategories
                data={data?.card?.card}
                key={data?.card?.card?.categoryId}
                showItems={index === showIndex ? true : false}
                setShowIndex={() => {
                  index === showIndex
                    ? setShowIndex(false)
                    : setShowIndex(index);
                }}
              />
            ))
          : ""}
      </div>
    </div>
  );
};
export default RestaurantMenu;
