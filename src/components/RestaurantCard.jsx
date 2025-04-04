import { Link } from "react-router";
import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { cloudinaryImageId, name, cuisines, sla, avgRating, id } =
    props?.resData;
  console.log("cards called");

  return (
    <Link to={{ pathname: `/restaurant/${id}` }} className="res-card">
      <img alt="restaurant" src={CDN_URL + cloudinaryImageId} />
      <div className="res-info">
        <h2>{name}</h2>
        <h4>{cuisines.join(", ")}</h4>
        <h4>{avgRating} Star</h4>
        <h5>{sla?.deliveryTime} minutes</h5>
      </div>
    </Link>
  );
};
export default RestaurantCard;
