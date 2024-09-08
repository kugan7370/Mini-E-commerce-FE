import React, { useState } from "react";

const sampleCartItem = {
  _id: 1,
  name: "Soccer Jersey",
  price: 59.99,
  image:
    "https://img.freepik.com/free-vector/soccer-jersey-template-sport-t-shirt-design_29096-1299.jpg?w=2000",
};

function CartProduct() {
  const [cartItem, setCartItem] = useState(sampleCartItem);

  const handleRemove = () => {
    console.log("clicked");
    setCartItem(null);
  };

  if (!cartItem) {
    return null;
  }

  return (
    <div className="border-[1px] border-gray-200 w-full p-4">
      <div className="grid grid-cols-12 gap-4 items-center">
        {/* image */}
        <div className="col-span-3">
          <div className="h-16 w-16  md:h-32 md:w-32 ">
            <img
              src={cartItem.image}
              className="w-full h-full object-contain"
              alt="Jersey"
            />
          </div>
        </div>
        {/* details */}
        <div className="w-full col-span-3">
          <div className="flex-col gap-4 justify-center items-center">
            <p>{cartItem.name}</p>
          </div>
        </div>

        {/* price */}
        <div className="flex justify-center items-center col-span-3">
          <p>${cartItem.price}</p>
        </div>
        {/* remove */}
        <div className="flex justify-center items-center col-span-3">
          <div
            className="py-1 px-2 md:px-4 rounded-md bg-black cursor-pointer"
            onClick={handleRemove}
          >
            <p className="text-white">Remove</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartProduct;
