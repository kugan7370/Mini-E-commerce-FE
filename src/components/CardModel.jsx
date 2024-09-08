import { useState } from "react";

const CartModal = ({ closeCart }) => {
  const cart = [
    {
      _id: "1",
      productName: {
        original: "Product 1",
      },
      image: "https://via.placeholder.com/150",
      price: {
        amount: 100,
      },
      quantity: 1,
      availability: {
        status: "In stock",
      },
    },
    {
      _id: "2",
      productName: {
        original: "Product 2",
      },
      image: "https://via.placeholder.com/150",
      price: {
        amount: 200,
      },
      quantity: 2,
      availability: {
        status: "In stock",
      },
    },
    {
      _id: "3",
      productName: {
        original: "Product 2",
      },
      image: "https://via.placeholder.com/150",
      price: {
        amount: 200,
      },
      quantity: 2,
      availability: {
        status: "In stock",
      },
    },
  ];

  const [isLoading, setIsLoading] = useState(false);

  const removeItem = (id) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const handleCheckout = () => {
    alert("Proceeding to checkout");
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-end items-start z-50">
      <div
        className="bg-white p-6 rounded-lg shadow-lg relative w-80"
        style={{
          marginTop: "80px",
          maxHeight: "calc(100vh - 60px)",
          overflowY: "auto",
        }} // Adjust top based on navbar height
      >
        <button onClick={closeCart} className="absolute top-2 right-2 text-xl">
          &times;
        </button>
        <h2 className="text-lg font-bold mb-4">Shopping Cart</h2>

        {!cart.length ? (
          <div>Cart is Empty</div>
        ) : (
          <>
            <div className="flex flex-col gap-4 overflow-y-auto max-h-60 px-4">
              {cart.map((item) => (
                <div className="flex gap-4 border-b py-2" key={item._id}>
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.productName.original}
                      width={72}
                      height={96}
                      className="object-cover rounded-md"
                    />
                  )}
                  <div className="flex flex-col justify-between w-full">
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">
                          {item.productName.original}
                        </h3>
                        <div className="bg-gray-100 p-1 rounded-sm flex items-center gap-2">
                          {item.quantity > 1 && (
                            <div className="text-xs text-green-500">
                              {item.quantity} x
                            </div>
                          )}
                          ${item.price.amount}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {item.availability.status}
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">
                        Qty. {item.quantity}
                      </span>
                      <button
                        className="text-blue-500 disabled:opacity-50"
                        disabled={isLoading}
                        onClick={() => removeItem(item._id)}
                      >
                        {isLoading ? "Removing..." : "Remove"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between font-semibold">
                <span>Subtotal</span>
                <span>${10}</span>
              </div>
              <p className="text-gray-500 text-sm mt-2 mb-4">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="flex justify-between text-sm">
                <button className="rounded-md py-2 px-4 ring-1 ring-gray-300">
                  View Cart
                </button>
                <button
                  className="rounded-md py-2 px-4 bg-black text-white disabled:cursor-not-allowed disabled:opacity-75"
                  disabled={isLoading}
                  onClick={handleCheckout}
                >
                  {isLoading ? "Processing..." : "Checkout"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartModal;
