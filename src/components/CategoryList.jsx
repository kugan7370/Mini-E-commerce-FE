import React from "react";
import DynamicSlider from "./DynamicSlider";

const staticCategories = [
  {
    _id: "1",
    name: "Category 1",
    slug: "category-1",
    image:
      "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800", // Replace with actual image URLs
  },
  {
    _id: "2",
    name: "Category 2",
    slug: "category-2",
    image:
      "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    _id: "3",
    name: "Category 3",
    slug: "category-3",
    image:
      "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    _id: "4",
    name: "Category 4",
    slug: "category-4",
    image:
      "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    _id: "5",
    name: "Category 5",
    slug: "category-5",
    image:
      "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    _id: "6",
    name: "Category 6",
    slug: "category-6",
    image:
      "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    _id: "7",
    name: "Category 7",
    slug: "category-7",
    image:
      "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

const CategoryList = ({ categories }) => {
  return (
    <div className="px-[36px]">
      <DynamicSlider datas={categories} />
    </div>
  );
};

export default CategoryList;
