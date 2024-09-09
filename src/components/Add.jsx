import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../features/cartSlicer";

const Add = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  // Handle quantity increment and decrement
  const handleQuantity = (type) => {
    if (type === "d" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (type === "i" && quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  // Handle adding product to cart
  const handleAddToCart = () => {
    dispatch(
      addProduct({
        productId: product._id,
        productName: product.productName,
        price: product.price,
        image: product.images[0]?.url,
        quantity: quantity,
      })
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-medium">Choose a Quantity</h4>
      <div className="flex justify-between items-center">
        {/* Quantity selection */}
        <div className="flex items-center gap-4">
          <div className="bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32">
            <button
              className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => handleQuantity("d")}
              disabled={quantity === 1}
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => handleQuantity("i")}
              disabled={quantity === product.stock}
            >
              +
            </button>
          </div>
          {product.stock < 1 ? (
            <div className="text-xs text-red-500">Product is out of stock</div>
          ) : (
            <div className="text-xs">
              Only{" "}
              <span className="text-orange-500">{product.stock} items</span>{" "}
              left! Don't miss it.
            </div>
          )}
        </div>

        {/* Add to Cart button */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock < 1}
          className="w-36 text-sm rounded-3xl ring-1 ring-Primary text-Primary py-2 px-4 hover:bg-Primary hover:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:ring-0 disabled:text-white"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Add;
