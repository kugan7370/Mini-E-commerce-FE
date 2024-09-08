import { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Assuming you're using React Router for dynamic routing
import ProductImages from "../components/ProductImages";
import Add from "../components/Add";
import Reviews from "../components/Reviews";
import { getProduct } from "../api/Product";

const Details = () => {
  const { id: productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getProduct(productId);
        console.log("Fetched product:", fetchedProduct);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (loading) {
    return <div>Loading product details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16 mt-32">
      {/* IMG */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages items={product.images} />
      </div>
      {/* TEXTS */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">{product.productName}</h1>
        <p className="text-gray-500">{product.description}</p>
        <div className="h-[2px] bg-gray-100" />
        {product.price?.price === product.price?.discountedPrice ? (
          <h2 className="font-medium text-2xl">${product.price}</h2>
        ) : (
          <div className="flex items-center gap-4">
            <h3 className="text-xl text-gray-500 line-through">
              ${product.price}
            </h3>
            <h2 className="font-medium text-2xl">
              ${product.price?.discountedPrice}
            </h2>
          </div>
        )}
        <div className="h-[2px] bg-gray-100" />

        {/* Add to Cart */}
        <Add
          productId={product._id}
          variantId={
            product.variantId || "00000000-0000-0000-0000-000000000000"
          }
          stockNumber={product.stock || 0}
        />

        <div className="h-[2px] bg-gray-100" />
        <div className="h-[2px] bg-gray-100" />

        {/* REVIEWS */}
        <h1 className="text-2xl">User Reviews</h1>
        <Suspense fallback={<div>Loading reviews...</div>}>
          <Reviews productId={product._id} />
        </Suspense>
      </div>
    </div>
  );
};

export default Details;
