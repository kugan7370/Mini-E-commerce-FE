import React, { useEffect, useState } from "react";
import { getCategories } from "../api/Category";

const FilterData = ({ onFilterChange }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCategories();
        setCategories(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Handle filter changes
  const handleFilterChange = (event) => {
    let target = event.target || {};
    let { name, value } = target;
    let filterValue = value;

    onFilterChange({ [name]: filterValue });
  };

  return (
    <div className="mt-12 flex justify-between">
      <div className="flex gap-6 flex-wrap">
        {/* Category Filter */}
        <select
          name="category"
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
          onChange={handleFilterChange}
        >
          <option value="">Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterData;
