import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartProduct from "../components/CartProduct";
import { clearCart } from "../features/cartSlicer";
import { addOrder } from "../api/Order";
import { toast } from "react-toastify";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const [subTotal, setSubTotal] = useState(0.0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (cart.length > 0) {
      const priceList = cart.map((item) => item.price * item.quantity);
      setSubTotal(parseFloat(priceList.reduce((a, b) => a + b, 0)).toFixed(2));
    }
  }, [cart]);

  const initialValues = {
    fullName: "",
    address: "",
    phone: "",
    email: "",
    city: "",
    postalCode: "",
    country: "",
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    address: Yup.string().required("Address is required"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]+$/, "Must be a valid phone number"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    city: Yup.string().required("City is required"),
    postalCode: Yup.string().required("Postal Code is required"),
    country: Yup.string().required("Country is required"),
  });

  const handlePlaceOrder = async (values) => {
    setIsLoading(true);
    setError("");

    try {
      const orderData = {
        orderItems: cart.map((item) => ({
          name: item.productName,
          qty: item.quantity,
          image: item.image,
          price: item.price,
          product: item.productId,
        })),
        shippingAddress: values,
        totalPrice: subTotal,
      };
      const response = await addOrder(orderData);
      dispatch(clearCart());
      toast.success("Order placed successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to place order");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full p-10 mt-32">
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : cart.length > 0 ? (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handlePlaceOrder}
        >
          {({ isSubmitting, isValid, dirty }) => (
            <Form className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Shipping Address */}
              <div className="border-[1px] border-gray-200 p-6">
                <h2 className="text-2xl font-semibold mb-4">
                  Shipping Address
                </h2>
                <div className="grid grid-cols-1 gap-5">
                  {Object.keys(initialValues).map((field) => (
                    <div key={field}>
                      <label className="mb-2 block text-lg font-medium">
                        {field.charAt(0).toUpperCase() +
                          field.slice(1).replace(/([A-Z])/g, " $1")}
                      </label>
                      <Field
                        type={field === "email" ? "email" : "text"}
                        name={field}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                      <ErrorMessage
                        name={field}
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  ))}
                </div>
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

              {/* Checkout Button */}
              <div className="w-full mt-10 flex justify-end">
                <button
                  type="submit"
                  className={`p-3 rounded-sm ${
                    !isValid || !dirty || isLoading
                      ? "bg-gray-400"
                      : "bg-Primary"
                  } text-center cursor-pointer`}
                  disabled={!isValid || !dirty || isLoading}
                >
                  <p className="text-white font-medium">
                    {isLoading ? "Placing Order..." : "Place Order"}
                  </p>
                </button>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <div>Cart is empty</div>
      )}
    </div>
  );
}

export default Cart;
