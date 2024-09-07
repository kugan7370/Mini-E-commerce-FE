import { useState } from "react";
import { Link } from "react-router-dom";

const NavIcons = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {};
  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      <img
        src="/profile.png"
        alt=""
        width={22}
        height={22}
        className="cursor-pointer"
        // onClick={login}
        onClick={() => console.log("pressed")}
      />
      {isProfileOpen && (
        <div className="absolute p-4 rounded-md top-12 left-0 bg-white text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20">
          <Link to="/profile">Profile</Link>
          <div className="mt-2 cursor-pointer" onClick={handleLogout}>
            {isLoading ? "Logging out" : "Logout"}
          </div>
        </div>
      )}
      <img
        src="/notification.png"
        alt=""
        width={22}
        height={22}
        className="cursor-pointer"
      />
      <div
        className="relative cursor-pointer"
        onClick={() => setIsCartOpen((prev) => !prev)}
      >
        <img src="/cart.png" alt="" width={22} height={22} />
        <div className="absolute -top-4 -right-4 w-6 h-6 bg-lama rounded-full text-white text-sm flex items-center justify-center">
          1
        </div>
      </div>
      {/* {isCartOpen && <CartModal />} */}
    </div>
  );
};

export default NavIcons;
