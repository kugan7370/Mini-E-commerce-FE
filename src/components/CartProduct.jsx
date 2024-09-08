import React from "react";
import { useDispatch } from "react-redux";
import { removeProduct } from "../features/cartSlicer";

function CartProduct({ cartItem }) {
  console.log(cartItem);
  const dispatch = useDispatch();
  if (!cartItem) {
    return null;
  }

  const handleRemove = () => {
    dispatch(removeProduct(cartItem.productId));
  };

  return (
    <div className="border-[1px] border-gray-200 w-full p-4">
      <div className="gap-4 items-center flex justify-between">
        {/* Image */}
        <div className="">
          <div className="h-16 w-16 md:h-24 md:w-24">
            <img
              src={cartItem.image}
              className="w-full h-full object-contain"
              alt={cartItem.name}
            />
          </div>
        </div>

        {/* Details */}
        <div className="">
          <div className="flex flex-col gap-4 items-center">
            <p className="font-semibold">{cartItem.productName}</p>
          </div>
        </div>

        {/* Price */}
        <div className="flex justify-center items-center ">
          <p className="font-medium">
            {cartItem.quantity} x ${cartItem.price}
          </p>
        </div>

        {/* Remove */}
        <div className="flex justify-center items-center ">
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
