import { useState } from "react";

const CartModal = () => {
  // Example cart data for demonstration purposes
  const [cart, setCart] = useState({
    lineItems: [
      {
        _id: "1",
        image:
          "https://images.pexels.com/photos/19036832/pexels-photo-19036832/free-photo-of-mountain-reflection-in-lake.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
        productName: { original: "Product Name" },
        quantity: 2,
        price: { amount: 29.99 },
        availability: { status: "In Stock" },
      },
    ],
    subtotal: { amount: 29.99 },
  });

  const [isLoading, setIsLoading] = useState(false);

  const removeItem = (id) => {
    setIsLoading(true);
    // Simulate removing item
    setCart((prevCart) => ({
      ...prevCart,
      lineItems: prevCart.lineItems.filter((item) => item._id !== id),
    }));
    setIsLoading(false);
  };

  const handleCheckout = () => {
    // Simulate checkout process
    alert("Proceeding to checkout");
  };

  return (
    <div className="lg:w-max w-full absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-20  right-0 flex flex-col gap-6 z-20">
      {!cart.lineItems.length ? (
        <div>Cart is Empty</div>
      ) : (
        <>
          <h2 className="text-xl">Shopping Cart</h2>
          {/* LIST */}
          <div className="flex flex-col gap-8">
            {/* ITEM */}
            {cart.lineItems.map((item) => (
              <div className="flex gap-4" key={item._id}>
                {item.image && (
                  <img
                    src={item.image}
                    alt=""
                    width={72}
                    height={96}
                    className="object-cover rounded-md"
                  />
                )}
                <div className="flex flex-col justify-between w-full">
                  {/* TOP */}
                  <div>
                    {/* TITLE */}
                    <div className="flex items-center justify-between gap-8">
                      <h3 className="font-semibold">
                        {item.productName.original}
                      </h3>
                      <div className="p-1 bg-gray-50 rounded-sm flex items-center gap-2">
                        {item.quantity > 1 && (
                          <div className="text-xs text-green-500">
                            {item.quantity} x{" "}
                          </div>
                        )}
                        ${item.price.amount}
                      </div>
                    </div>
                    {/* DESC */}
                    <div className="text-sm text-gray-500">
                      {item.availability.status}
                    </div>
                  </div>
                  {/* BOTTOM */}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Qty. {item.quantity}</span>
                    <span
                      className="text-blue-500"
                      style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
                      onClick={() => removeItem(item._id)}
                    >
                      Remove
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* BOTTOM */}
          <div>
            <div className="flex items-center justify-between font-semibold">
              <span>Subtotal</span>
              <span>${cart.subtotal.amount}</span>
            </div>
            <p className="text-gray-500 text-sm mt-2 mb-4">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="flex justify-between text-sm">
              <button className="rounded-md py-3 px-4 ring-1 ring-gray-300">
                View Cart
              </button>
              <button
                className="rounded-md py-3 px-4 bg-black text-white disabled:cursor-not-allowed disabled:opacity-75"
                disabled={isLoading}
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartModal;
