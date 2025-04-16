import { MdArrowForwardIos } from "react-icons/md";
import ListItems from "./ListItems";
import { useState } from "react";

const RestaurantCategories = ({ data, showItems, setShowIndex }) => {
  //   console.log(data);

  //   const [showItems, setShowItems] = useState(false);

  const { title, itemCards } = data;

  const handleClick = () => {
    // setShowItems(!showItems);
    setShowIndex();
  };
  return (
    <div className="space-y-4">
      <div
        className="bg-gray-100 p-3 rounded-lg flex justify-between items-center cursor-pointer"
        onClick={() => handleClick()}
      >
        <h5 className="text-lg font-semibold">
          {title}
          <span>({itemCards.length})</span>
        </h5>
        <span
          className={`${
            showItems ? "rotate-90" : "-rotate-90"
          } transition-all duration-300`}
        >
          <MdArrowForwardIos />
        </span>
      </div>
      {showItems && <ListItems listData={itemCards} />}
    </div>
  );
};

export default RestaurantCategories;
