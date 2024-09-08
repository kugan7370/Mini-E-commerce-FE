// Navbar.jsx
import Menu from "./Menu";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import NavIcons from "./NavIcons";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 h-20 px-4 md:px-8 lg:px-16 xl:px-32 bg-white shadow-md z-50">
      {/* MOBILE */}
      <div className="h-full flex items-center justify-between md:hidden">
        <Link to="/">
          <div className="text-2xl tracking-wide">E-Shop</div>
        </Link>
        <Menu />
      </div>
      {/* BIGGER SCREENS */}
      <div className="hidden md:flex items-center justify-between gap-8 h-full">
        {/* LEFT */}
        <div className="w-1/3 xl:w-1/2 flex items-center gap-12">
          <Link to="/" className="flex items-center gap-3">
            <div className="text-2xl tracking-wide">E-Shop</div>
          </Link>
          <div className="hidden xl:flex gap-4">
            <Link to="/">Home</Link>
            <Link to="/">Shop</Link>
            <Link to="/">Deals</Link>
            <Link to="/">About</Link>
            <Link to="/">Contact</Link>
          </div>
        </div>
        {/* RIGHT */}
        <div className="w-2/3 xl:w-1/2 flex items-center justify-between gap-8">
          <SearchBar />
          <NavIcons />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
