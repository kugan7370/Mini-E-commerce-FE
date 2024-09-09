// NavIcons.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../features/UserSlicer";
import { toast } from "react-toastify";
import CartModal from "./CardModel";

const NavIcons = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => !!state.user.token);
  const userData = useSelector((state) => state.user.user);

  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      if (isProfileOpen) setIsProfileOpen(false);
      dispatch(logoutUser());
      toast.success("Logged out successfully!");
      navigate("/signin");
    } catch (error) {
      toast.error("Error logging out. Please try again.");
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      {isAuthenticated ? (
        // user name
        <div
          className="cursor-pointer"
          onClick={() => setIsProfileOpen((prev) => !prev)}
        >
          <span className="hidden xl:inline-block text-sm font-medium uppercase">
            {userData.username}
          </span>
        </div>
      ) : (
        <Link to="/signin">
          <button className="text-sm font-medium text-gray-600 uppercase">
            Sign In
          </button>
        </Link>
      )}

      {/* Profile Dropdown */}
      {isProfileOpen && (
        <div className="absolute p-4 rounded-md top-12 left-0 bg-white text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20">
          <Link to="/profile">Profile</Link>
          <div className="mt-2 cursor-pointer" onClick={handleLogout}>
            {isLoading ? "Logging out..." : "Logout"}
          </div>
        </div>
      )}

      {/* Notification Icon */}
      <img
        src="/notification.png"
        alt="Notification"
        width={22}
        height={22}
        className="cursor-pointer"
      />

      {/* Cart Icon */}
      <div
        className="relative cursor-pointer"
        onClick={() => setIsCartOpen((prev) => !prev)}
      >
        <img src="/cart.png" alt="Cart" width={22} height={22} />
        {totalItems > 0 && (
          <div className="absolute -top-2 -right-2 w-5 h-5 bg-Primary rounded-full text-white text-xs flex items-center justify-center">
            {totalItems}
          </div>
        )}
      </div>

      {/* Cart Modal */}
      {isCartOpen && (
        <CartModal
          closeCart={() => setIsCartOpen(false)}
          cartItems={cartItems}
        />
      )}
    </div>
  );
};

export default NavIcons;
