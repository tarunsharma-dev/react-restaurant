import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import restaurantList from "../utils/mockData";
import { useContext, useEffect, useState } from "react";
import useOnlineStatus from "../utils/useOnlineStatus";
import { Link } from "react-router";
import Shimmer from "./Shimmer";
import UserContext from "../context/UserContext";

const Body = () => {
  //   console.log(restaurantList[0].info);

  const [resList, setResList] = useState([]);
  const [filterList, setFilterList] = useState(false);
  const [filterListData, setFilterListData] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const { loggedInUser, setUserName } = useContext(UserContext);
  // const [topRated, setTopRated] = useState(false);

  useEffect(() => {
    fetchData();
    // const timer = setTimeout(() => fetchData(), 300);

    // return clearTimeout(timer);
  }, []);

  const PromotedResCard = withPromotedLabel(RestaurantCard);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.5583611&lng=77.3766484&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const res = await data.json();
    // console.log(
    //   res?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    // );

    setResList(
      res?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilterListData(
      res?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  // console.log("called body", resList);

  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false)
    return (
      <h1>
        Looks like you're offline!! Please check your internet connectivity.
      </h1>
    );

  return resList === undefined || resList.length === 0 ? (
    <div className="body relative">
      <Shimmer column={15} />
    </div>
  ) : (
    <div className="body relative">
      <div>
        <div className="flex items-center gap-2">
          <div className="search-box flex items-center">
            <input
              type="text"
              placeholder="search"
              className="shad-input_primary sm:rounded-r-[0]"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button
              type="button"
              onClick={() => {
                const res = resList.filter((res) =>
                  res?.info?.name
                    .toLowerCase()
                    .includes(searchInput.toLowerCase())
                );
                setFilterListData(res);
              }}
              className="shad-button_primary sm:rounded-l-[0]"
            >
              Search
            </button>
          </div>
          <button
            className="shad-button_primary"
            onClick={() => {
              if (filterList === false) {
                // console.log("list", filterList);
                setFilterListData(
                  resList.filter((res) => res?.info?.avgRating > 4.2)
                );
              } else {
                console.log("list2", filterList);
                // setFilterList(resList);
                setFilterListData(resList);
              }
              setFilterList(!filterList);
            }}
          >
            Top Rated Restaurant
          </button>
          <div>
            <input
              type="text"
              className="shad-input_primary"
              value={loggedInUser}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 py-4">
        {filterListData.map((resData) => (
          //   console.log(restaurantList[0].info),
          <Link
            to={{ pathname: `/restaurant/${resData?.info?.id}` }}
            key={resData.info?.id}
            className="res-card hover:bg-gray-50 shadow-md hover:shadow-xl border border-gray-200 rounded-md overflow-hidden p-3"
          >
            {resData.info?.aggregatedDiscountInfoV3 ||
            resData.info?.aggregatedDiscountInfoV2 ? (
              <PromotedResCard resData={resData?.info} />
            ) : (
              <RestaurantCard resData={resData?.info} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
