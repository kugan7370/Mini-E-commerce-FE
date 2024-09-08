import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeProduct, loadCart } from "../features/cartSlicer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CartModal = ({ closeCart }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  // Load cart items from storage or API
  useEffect(() => {
    dispatch(loadCart());
  }, [dispatch]);

  // Handle removing item from cart
  const handleRemove = async (id) => {
    setIsLoading(true);
    try {
      // Optionally, you can also remove the item from the backend
      // await axios.delete(`/api/cart/remove/${id}`);
      dispatch(removeProduct(id));
    } catch (error) {
      console.error("Error removing item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle checkout process
  const handleCheckout = async () => {
    setIsCheckoutLoading(true);
    try {
      // Replace with your API endpoint
      await axios.post("/api/checkout", { cart });
      alert("Proceeding to checkout");
      // Handle successful checkout, maybe navigate to another page
    } catch (error) {
      console.error("Error during checkout:", error);
    } finally {
      setIsCheckoutLoading(false);
    }
  };

  const handleViewCart = () => {
    navigate("/cart");
    closeCart();
  };
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-end items-start z-50">
      <div
        className="bg-white p-6 rounded-lg shadow-lg relative w-80"
        style={{
          marginTop: "80px",
          maxHeight: "calc(100vh - 60px)",
          overflowY: "auto",
        }}
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
                <div className="flex gap-4 border-b py-2" key={item.productId}>
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.productName}
                      width={72}
                      height={96}
                      className="object-cover rounded-md"
                    />
                  )}
                  <div className="flex flex-col justify-between w-full">
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{item.productName}</h3>
                        <div className="bg-gray-100 p-1 rounded-sm flex items-center gap-2">
                          {item.quantity > 1 && (
                            <div className="text-xs text-green-500">
                              {item.quantity} x
                            </div>
                          )}
                          ${item.price}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">In Stock</div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">
                        Qty. {item.quantity}
                      </span>
                      <button
                        className="text-blue-500 disabled:opacity-50"
                        disabled={isLoading}
                        onClick={() => handleRemove(item.productId)}
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
                <span>${totalPrice}</span>
              </div>
              <p className="text-gray-500 text-sm mt-2 mb-4">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="flex justify-between text-sm">
                <button
                  className="rounded-md py-2 px-4 ring-1 ring-gray-300"
                  onClick={handleViewCart}
                >
                  View Cart
                </button>
                <button
                  className="rounded-md py-2 px-4 bg-black text-white disabled:cursor-not-allowed disabled:opacity-75"
                  disabled={isCheckoutLoading}
                  onClick={handleCheckout}
                >
                  {isCheckoutLoading ? "Processing..." : "Checkout"}
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
