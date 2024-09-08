import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CartProduct from "../components/CartProduct";

function Cart() {
  const sampleCarts = [
    { _id: 1, name: "Product 1", price: 29.99, quantity: 1 },
    { _id: 2, name: "Product 2", price: 19.99, quantity: 2 },
    { _id: 3, name: "Product 3", price: 49.99, quantity: 1 },
  ];

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

  useEffect(() => {
    if (sampleCarts.length > 0) {
      let priceList = sampleCarts.map((item) => item.price * item.quantity);
      setSubTotal(parseFloat(priceList.reduce((a, b) => a + b, 0)).toFixed(2));
    }
  }, [sampleCarts]);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  return (
    <div className="w-full p-10 mt-32">
      {/* Checkout Section */}
      {sampleCarts.length > 0 && (
        <div className="w-full  grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Shipping Address */}
          <div className="border-[1px] border-gray-200 p-6">
            <h2 className="text-2xl font-semibold mb-4">Shipping Address</h2>
            <form className="grid grid-cols-1 gap-5">
              <div>
                <label className="mb-2 block text-lg font-medium">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={shippingAddress.firstName}
                  onChange={handleAddressChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="mb-2 block text-lg font-medium">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={shippingAddress.lastName}
                  onChange={handleAddressChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="mb-2 block text-lg font-medium">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={shippingAddress.phoneNumber}
                  onChange={handleAddressChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="mb-2 block text-lg font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={shippingAddress.email}
                  onChange={handleAddressChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="mb-2 block text-lg font-medium">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={shippingAddress.address}
                  onChange={handleAddressChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="mb-2 block text-lg font-medium">City</label>
                  <input
                    type="text"
                    name="city"
                    value={shippingAddress.city}
                    onChange={handleAddressChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-lg font-medium">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={shippingAddress.postalCode}
                    onChange={handleAddressChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-lg font-medium">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={shippingAddress.country}
                  onChange={handleAddressChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </form>
          </div>

          {/* Your Orders */}
          <div className="border-[1px] border-gray-200 p-6">
            <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>

            {/* Cart items */}
            <div className="grid grid-cols-1 gap-5 my-10 ">
              <div className="flex flex-col w-full">
                {sampleCarts.map((cartItem) => (
                  <CartProduct cartItem={cartItem} key={cartItem._id} />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {sampleCarts.map((cartItem) => (
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
      )}

      {/* Checkout Button */}
      <div className="w-full mt-10 flex justify-end">
        <Link to="/userOrderInfo">
          <div className="p-3 rounded-sm  bg-lama text-center cursor-pointer">
            <p className="text-white font-medium">Place Order</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Cart;
