const staticReviewsData = [
  {
    id: "review1",
    customer: {
      avatar_url: "https://example.com/avatar1.jpg",
      display_name: "Jane Doe",
    },
    rating: 5,
    heading: "Excellent Product!",
    body: "I am very satisfied with this product. The quality is top-notch and it arrived on time.",
    media: [
      { id: "media1", url: "https://example.com/image1.jpg" },
      { id: "media2", url: "https://example.com/image2.jpg" },
    ],
  },
  {
    id: "review2",
    customer: {
      avatar_url: "https://example.com/avatar2.jpg",
      display_name: "John Smith",
    },
    rating: 4,
    heading: "Very Good",
    body: "This product is really good, but I think it could be improved in some aspects.",
    media: [{ id: "media3", url: "https://example.com/image3.jpg" }],
  },
  // Add more reviews as needed
];

const Reviews = () => {
  return staticReviewsData.map((review) => (
    <div className="flex flex-col gap-4" key={review.id}>
      {/* USER */}
      <div className="flex items-center gap-4 font-medium">
        <img
          src="https://images.pexels.com/photos/19036832/pexels-photo-19036832/free-photo-of-mountain-reflection-in-lake.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
          alt=""
          width={32}
          height={32}
          className="rounded-full"
        />
        <span>{review.customer.display_name}</span>
      </div>

      {/* DESC */}
      {review.heading && <p>{review.heading}</p>}
      {review.body && <p>{review.body}</p>}
    </div>
  ));
};

export default Reviews;
