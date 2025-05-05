import { CDN_URL_MENU } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/slice/cartSlice";

const ListItems = ({ listData }) => {
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    // dispatch(
    //   addItem({
    //     id: item?.card?.info?.id,
    //     name: item?.card?.info?.name,
    //     price: item?.card?.info?.price || item?.card?.info?.defaultPrice,
    //     description: item?.card?.info?.description,
    //     imageId: item?.card?.info?.imageId,
    //   })
    // );
    dispatch(addItem(item));
  };

  return (
    <div className="divide-y divide-gray-200">
      {listData.map((list) => (
        <div
          key={list?.card?.info?.id}
          className="flex justify-between flex-wrap md:flex-nowrap gap-5 py-5 px-2.5"
        >
          <div className="space-y-3 md:w-[70%]">
            <div>
              <h3 className="text-lg font-semibold mb-1">
                {list?.card?.info?.name}
              </h3>
              <p className="text-sm text-gray-600">
                {list?.card?.info?.description}
              </p>
            </div>
            <p className="font-semibold">
              ₹
              {list?.card?.info?.price
                ? list?.card?.info?.price / 100
                : list?.card?.info?.defaultPrice / 100}
            </p>
          </div>
          <div className="shrink-0">
            <div className="relative flex flex-col mb-3">
              <div className="w-[150px] h-[150px] rounded-xl overflow-hidden shadow-md border border-gray-100">
                <img
                  alt="restaurant"
                  loading="lazy"
                  srcSet={`${CDN_URL_MENU + list?.card?.info?.imageId} 300w, ${
                    CDN_URL_MENU + list?.card?.info?.imageId
                  } 600w, ${CDN_URL_MENU + list?.card?.info?.imageId} 900w`}
                  src={CDN_URL_MENU + list?.card?.info?.imageId}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
                <button
                  className="shad-button_primary2 flex items-center"
                  onClick={() => handleAddItem(list)}
                  // onClick={handleAddItem(list)}
                  // onClick={handleAddItem()}
                >
                  Add +
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListItems;
