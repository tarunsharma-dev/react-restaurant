import React from "react";

function Shimmer({ column = 4 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 p-3">
      {Array(column)
        .fill()
        .map((_, index) => (
          <div
            className="res-card hover:bg-gray-50 shadow-md hover:shadow-xl border border-gray-100 rounded-md overflow-hidden p-3 h-[300px]"
            key={index}
          >
            <div className="overflow-hidden relative rounded-md ">
              <div className="pb-[70%] h-0"></div>
              <div className="w-full h-full object-cover absolute inset-0 bg-gray-100" />
            </div>
            <div className="res-info py-3 space-y-2">
              <div className="bg-gray-100 h-6"></div>
              <div className="bg-gray-100 h-3"></div>
              <div className="bg-gray-100 h-3"></div>
              <div className="bg-gray-100 h-3"></div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Shimmer;
