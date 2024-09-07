import { useState } from "react";

const images = [
  {
    id: 1,
    url: "https://images.pexels.com/photos/19036832/pexels-photo-19036832/free-photo-of-mountain-reflection-in-lake.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
  },
  {
    id: 2,
    url: "https://images.pexels.com/photos/17867705/pexels-photo-17867705/free-photo-of-crowd-of-hikers-on-the-mountain-ridge-at-dusk.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
  },
  {
    id: 3,
    url: "https://images.pexels.com/photos/21812160/pexels-photo-21812160/free-photo-of-puerta-colonial-color-rojo-de-guanajuato-mexico.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
  },
  {
    id: 4,
    url: "https://images.pexels.com/photos/20832069/pexels-photo-20832069/free-photo-of-a-narrow-street-with-buildings-and-cars.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
  },
];

const ProductImages = () => {
  const [index, setIndex] = useState(0);

  return (
    <div className="flex flex-col">
      {/* Main Image */}
      <div className="h-[500px] relative">
        <img
          src={images[index].url}
          alt=""
          className="object-cover rounded-md w-full h-full"
        />
      </div>

      {/* Thumbnail Images */}
      <div className="flex gap-4 mt-4 overflow-x-auto justify-center">
        {images.map((item, i) => (
          <div
            className="w-24 h-24 cursor-pointer"
            key={item.id}
            onClick={() => setIndex(i)}
          >
            <img
              src={item.url}
              alt=""
              className={`object-cover rounded-md w-full  h-full ${
                i === index ? "border-2 border-blue-500" : ""
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
