import { useState } from "react";

const ProductImages = ({ items }) => {
  console.log(items);
  const [index, setIndex] = useState(0);

  return (
    <div className="flex flex-col">
      {/* Main Image */}
      <div className="h-[500px] relative">
        <img
          src={items[index].url}
          alt=""
          className="object-cover rounded-md w-full h-full"
        />
      </div>

      {/* Thumbnail Images */}
      <div className="flex gap-4 mt-4 overflow-x-auto justify-center">
        {items.map((item, i) => (
          <div
            className="w-24 h-24 cursor-pointer"
            key={item.id}
            onClick={() => setIndex(i)}
          >
            <img
              src={item.url}
              alt=""
              className={`object-cover rounded-md w-full  h-full ${
                i === index ? "border-2 border-blue-500" : ""
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
