import { Link } from "react-router";
import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { cloudinaryImageId, name, cuisines, sla, avgRating, id } =
    props?.resData;
  // console.log("cards called");

  return (
    <>
      <div className="overflow-hidden relative rounded-md ">
        <div className="pb-[70%] h-0"></div>
        <img
          alt="restaurant"
          src={CDN_URL + cloudinaryImageId}
          className="w-full h-full object-cover absolute inset-0"
        />
      </div>
      <div className="res-info py-3">
        <h2 className="text-lg font-semibold">{name}</h2>
        <h4>{cuisines.join(", ")}</h4>
        <h4>{avgRating} Star</h4>
        <h5>{sla?.deliveryTime} minutes</h5>
      </div>
    </>
  );
};
export default RestaurantCard;

export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    // console.log(props?.resData?.aggregatedDiscountInfoV2);
    return (
      <div className="relative">
        <div className="bg-neutral-900/40 backdrop-blur-md rounded-md p-1 text-white absolute z-10 top-2 left-2 text-xs font-semibold">
          {(props?.resData?.aggregatedDiscountInfoV3 !== undefined ||
            props?.resData?.aggregatedDiscountInfoV2 !== undefined) &&
            `${
              props?.resData?.aggregatedDiscountInfoV3?.header !== undefined
                ? props?.resData?.aggregatedDiscountInfoV3?.header
                : ""
            }
          ${
            props?.resData?.aggregatedDiscountInfoV3?.subHeader !== undefined
              ? `- ${props?.resData?.aggregatedDiscountInfoV3?.subHeader}`
              : ""
          }`}
        </div>
        <RestaurantCard {...props} />
      </div>
    );
  };
};
