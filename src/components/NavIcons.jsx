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

  const handleLogout = async () => {
    setIsLoading(true); // Show loading state when logging out
    try {
      isProfileOpen && setIsProfileOpen(false); // Close profile modal if open
      dispatch(logoutUser());
      toast.success("Logged out successfully!");
      navigate("/signin");
    } catch (error) {
      toast.error("Error logging out. Please try again.");
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false); // Remove loading state
    }
  };

  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      {isAuthenticated ? (
        <img
          src="/profile.png"
          alt=""
          width={22}
          height={22}
          className="cursor-pointer"
          onClick={() => setIsProfileOpen((prev) => !prev)}
        />
      ) : (
        <Link to="/signin">
          <img
            src="/profile.png"
            alt=""
            width={22}
            height={22}
            className="cursor-pointer"
          />
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
        <div className="absolute -top-4 -right-4 w-6 h-6 bg-Primary rounded-full text-white text-sm flex items-center justify-center">
          1
        </div>
      </div>

      {/* Cart Modal */}
      {isCartOpen && <CartModal closeCart={() => setIsCartOpen(false)} />}
    </div>
  );
};

export default NavIcons;
