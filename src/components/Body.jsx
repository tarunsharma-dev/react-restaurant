import RestaurantCard from "./RestaurantCard";
import restaurantList from "../utils/mockData";
import { useEffect, useState } from "react";

const Body = () => {
  //   console.log(restaurantList[0].info);

  const [resList, setResList] = useState([]);
  const [filterList, setFilterList] = useState(false);
  const [filterListData, setFilterListData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  // const [topRated, setTopRated] = useState(false);

  useEffect(() => {
    fetchData();
    // const timer = setTimeout(() => fetchData(), 300);

    // return clearTimeout(timer);
  }, []);

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

  console.log("called body", resList);

  return resList === undefined || resList.length === 0 ? (
    <div>Loading...</div>
  ) : (
    <div className="body">
      <div>
        <div className="filter">
          <div className="search-box">
            <input
              type="text"
              placeholder="search"
              className=""
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
            >
              Search
            </button>
          </div>
          <button
            className="filter-btn"
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
        </div>
      </div>
      <div className="res-container">
        {filterListData.map((resData) => (
          //   console.log(restaurantList[0].info),
          <RestaurantCard key={resData.info?.id} resData={resData?.info} />
        ))}
      </div>
    </div>
  );
};

export default Body;
