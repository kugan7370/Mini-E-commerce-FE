import React, { useState, useEffect } from "react";
import Skeleton from "../components/Skeleton";
import ProductList from "../components/ProductList";
import FilterData from "../components/FilterData";
import { useParams } from "react-router-dom";
import { getFilteredProducts } from "../api/Product";

const Category = () => {
  const { id: categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: categoryId,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const fetchedProducts = await getFilteredProducts(filters);
        console.log("Fetched Products:", fetchedProducts);
        setProducts(fetchedProducts);
      } catch (error) {
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters, categoryId]);

  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  if (loading) {
    return <Skeleton />;
  }

  if (error) {
    return <div className="text-center mt-12 text-red-600">{error}</div>;
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
      <FilterData onFilterChange={handleFilterChange} />

      {/* Products Section */}
      <h1 className="mt-12 text-xl font-semibold">Products in this Category</h1>
      {products.length > 0 ? (
        <ProductList products={products} />
      ) : (
        <div className="text-center mt-12 text-gray-600">
          No products found in this category.
        </div>
      )}
    </div>
  );
};

export default Category;
