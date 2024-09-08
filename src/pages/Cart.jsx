import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartProduct from "../components/CartProduct";

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const [subTotal, setSubTotal] = useState(0.0);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    email: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (cart.length > 0) {
      let priceList = cart.map((item) => item.price * item.quantity);
      setSubTotal(parseFloat(priceList.reduce((a, b) => a + b, 0)).toFixed(2));
    }
  }, [cart]);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  const handlePlaceOrder = async () => {};

  return (
    <div className="w-full p-10 mt-32">
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : cart.length > 0 ? (
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Shipping Address */}
          <div className="border-[1px] border-gray-200 p-6">
            <h2 className="text-2xl font-semibold mb-4">Shipping Address</h2>
            <form className="grid grid-cols-1 gap-5">
              {/* Form fields for address */}
              {Object.keys(shippingAddress).map((field) => (
                <div key={field}>
                  <label className="mb-2 block text-lg font-medium">
                    {field.charAt(0).toUpperCase() +
                      field.slice(1).replace(/([A-Z])/g, " $1")}
                  </label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    value={shippingAddress[field]}
                    onChange={handleAddressChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              ))}
            </form>
          </div>

          {/* Your Orders */}
          <div className="border-[1px] border-gray-200 p-6">
            <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>

            {/* Cart items */}
            <div className="grid grid-cols-1 gap-5 my-10">
              <div className="flex flex-col w-full">
                {cart.map((cartItem) => (
                  <CartProduct cartItem={cartItem} key={cartItem._id} />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {cart.map((cartItem) => (
                <div key={cartItem._id} className="flex justify-between">
                  <p>{cartItem.name}</p>
                  <p>
                    {cartItem.quantity} x ${cartItem.price}
                  </p>
                </div>
              ))}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <p>Subtotal</p>
                  <p>${subTotal}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Cart is empty</div>
      )}

      {/* Checkout Button */}
      <div className="w-full mt-10 flex justify-end">
        <button
          onClick={handlePlaceOrder}
          className="p-3 rounded-sm bg-Primary text-center cursor-pointer"
          disabled={isLoading}
        >
          <p className="text-white font-medium">
            {isLoading ? "Placing Order..." : "Place Order"}
          </p>
        </button>
      </div>
    </div>
  );
}

export default Cart;
