import { Suspense } from "react";
import ProductImages from "../components/ProductImages";
import Add from "../components/Add";
import Reviews from "../components/Reviews";
import CustomizeProducts from "../components/CustomizeProducts";

const staticProductData = {
  name: "Sample Product",
  description: "This is a sample product description.",
  price: {
    price: 99.99,
    discountedPrice: 79.99,
  },
  stock: {
    quantity: 100,
  },
  media: {
    items: [
      {
        url: "https://images.pexels.com/photos/19036832/pexels-photo-19036832/free-photo-of-mountain-reflection-in-lake.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
        alt: "Product Image 1",
      },
      {
        url: "https://images.pexels.com/photos/19036832/pexels-photo-19036832/free-photo-of-mountain-reflection-in-lake.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
        alt: "Product Image 2",
      },
    ],
  },
  additionalInfoSections: [
    {
      title: "Material",
      description: "Made of 100% organic cotton.",
    },
    {
      title: "Care Instructions",
      description: "Machine wash cold, tumble dry low.",
    },
  ],
  _id: "00000000-0000-0000-0000-000000000000",
};

const Details = () => {
  // Use static data directly
  const product = staticProductData;

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16 mt-32">
      {/* IMG */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages items={product.media?.items} />
      </div>
      {/* TEXTS */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">{product.name}</h1>
        <p className="text-gray-500">{product.description}</p>
        <div className="h-[2px] bg-gray-100" />
        {product.price?.price === product.price?.discountedPrice ? (
          <h2 className="font-medium text-2xl">${product.price?.price}</h2>
        ) : (
          <div className="flex items-center gap-4">
            <h3 className="text-xl text-gray-500 line-through">
              ${product.price?.price}
            </h3>
            <h2 className="font-medium text-2xl">
              ${product.price?.discountedPrice}
            </h2>
          </div>
        )}
        <div className="h-[2px] bg-gray-100" />

        <Add
          productId={product._id}
          variantId="00000000-0000-0000-0000-000000000000"
          stockNumber={product.stock?.quantity || 0}
        />

        <div className="h-[2px] bg-gray-100" />
        <div className="h-[2px] bg-gray-100" />
        {/* REVIEWS */}
        <h1 className="text-2xl">User Reviews</h1>
        <Suspense fallback={<div>Loading reviews...</div>}>
          <Reviews />
        </Suspense>
      </div>
    </div>
  );
};

export default Details;
