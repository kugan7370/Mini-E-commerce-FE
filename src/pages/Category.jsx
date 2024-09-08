import { Suspense, useEffect, useState } from "react";
import Skeleton from "../components/Skeleton";
import ProductList from "../components/ProductList";
import FilterData from "../components/FilterData";
import { useParams } from "react-router-dom";
import { getProducts } from "../api/Product";

const Category = () => {
  const { id: categoryId } = useParams();
  console.log("Category ID:", categoryId);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch all products from the API
        const fetchedProducts = await getProducts();
        console.log("Fetched products:", fetchedProducts);

        // Filter products based on the category ID
        const filteredProducts = fetchedProducts.filter(
          (product) => product.category == categoryId
        );
        console.log("Filtered products:", filteredProducts);
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  if (loading) {
    return <Skeleton />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative mt-32">
      {/* Campaign Section */}
      <div className="hidden bg-pink-50 px-4 sm:flex justify-between h-64">
        <div className="w-2/3 flex flex-col items-center justify-center gap-8">
          <h1 className="text-4xl font-semibold leading-[48px] text-gray-700">
            Grab up to 50% off on
            <br /> Selected Products
          </h1>
          <button className="rounded-3xl bg-Primary text-white w-max py-3 px-5 text-sm">
            Buy Now
          </button>
        </div>
        <div className="relative w-1/3">
          <img src="/woman.png" alt="campaign" className="object-contain" />
        </div>
      </div>

      {/* Filter Section */}
      <FilterData />

      {/* Products Section */}
      <h1 className="mt-12 text-xl font-semibold">Products in this Category</h1>
      <Suspense fallback={<Skeleton />}>
        <ProductList products={products} />
      </Suspense>
    </div>
  );
};

export default Category;
