import React from "react";
import Slider from "react-slick";

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 1920,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        variableWidth: true,
      },
    },
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        variableWidth: true,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        variableWidth: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        variableWidth: true,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

function DynamicSlider({ datas }) {
  return (
    <div className="product-slider">
      <Slider {...sliderSettings}>
        {datas.map((item) => (
          <div key={item._id} className="slide-item text-center  px-4">
            <img
              src={
                item.image ||
                "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800"
              }
              alt={item.name}
              className="object-cover w-full h-64"
            />
            <h2 className="mt-4 text-lg font-medium">{item.name}</h2>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default DynamicSlider;
