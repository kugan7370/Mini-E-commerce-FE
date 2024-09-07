import React from "react";
const sampleImage =
  "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800";

const staticProducts = [
  {
    _id: "1",
    name: "Product 1",
    price: { price: 29.99 },
    slug: "product-1",
  },
  {
    _id: "2",
    name: "Product 2",
    price: { price: 49.99 },
    slug: "product-2",
  },
  {
    _id: "3",
    name: "Product 3",
    price: { price: 19.99 },
    slug: "product-3",
  },
  {
    _id: "4",
    name: "Product 4",
    price: { price: 39.99 },
    slug: "product-4",
  },
  {
    _id: "5",
    name: "Product 5",
    price: { price: 59.99 },
    slug: "product-5",
  },
  {
    _id: "6",
    name: "Product 6",
    price: { price: 24.99 },
    slug: "product-6",
  },
  {
    _id: "7",
    name: "Product 7",
    price: { price: 34.99 },
    slug: "product-7",
  },
  {
    _id: "8",
    name: "Product 8",
    price: { price: 74.99 },
    slug: "product-8",
  },
];

const ProductList = () => {
  return (
    <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {staticProducts.map((product) => (
        <div
          key={product._id}
          className="flex flex-col gap-4  border-[1px] border-gray-100 p-5"
        >
          <div className="relative w-full h-48">
            <img
              src={sampleImage}
              alt={product.name}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">{product.name}</span>
            <span className="font-semibold">${product.price?.price}</span>
          </div>
          <button className="w-1/2   rounded-2xl ring-1 ring-lama text-lama py-2 px-4 text-xs hover:bg-lama hover:text-white">
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
