import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../features/cartSlicer";

const sampleImage =
  "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800";

const ProductList = ({ products }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(
      addProduct({
        productId: product._id,
        productName: product.productName,
        price: product.price,
        image: product.images[0]?.url || sampleImage,
        quantity: 1,
      })
    );
  };

  return (
    <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <div
          key={product._id}
          className="flex flex-col gap-4 border-[1px] border-gray-100 p-5"
        >
          <Link to={`/detail/${product._id}`} className="relative w-full h-48">
            <img
              src={product.images[0]?.url || sampleImage}
              alt={product.productName}
              className="w-full h-full object-cover cursor-pointer rounded-md"
            />
          </Link>
          <div className="flex justify-between items-center">
            <span className="font-medium">{product.productName}</span>
            <span className="font-semibold">${product.price}</span>
          </div>
          <button
            className="w-1/2 rounded-2xl ring-1 ring-Primary text-Primary py-2 px-4 text-xs hover:bg-Primary hover:text-white"
            onClick={() => handleAddToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
