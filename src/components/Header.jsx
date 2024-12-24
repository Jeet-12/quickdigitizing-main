import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { FaWindowClose } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import { getInitials } from "../features/utils/helper";
import logo from "../assets/Logo.png";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "About Us", path: "/about-us" },
  { name: "Service", path: "/service" },
  { name: "Gallery", path: "/gallery" },
  { name: "Contact", path: "/contact" },
  { name: "Login", path: "/login" },
  { name: "Register", path: "/register" },
];

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOrderDropdownOpen, setIsOrderDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const role = localStorage.getItem("user");
  const data = role ? JSON.parse(role) : null; // Add a fallback for `null`

  useEffect(() => {
    setIsLoggedIn(loginState);
  }, [loginState]);

  const logOut = () => {
    localStorage.clear();
    dispatch(logoutUser());
    navigate("/login");
  };

  const handleOrderHover = () => setIsOrderDropdownOpen(true);
  const handleOrderLeave = () => setIsOrderDropdownOpen(false);

  const handleOrderClick = (e) => {
    e.preventDefault(); // Prevent default navigation
    setIsOrderDropdownOpen((prev) => !prev); // Toggle dropdown
  };

  const handleStatusClick = (status) => {
    // Navigate to the order details with the selected status
    navigate(`/order`, { state: { status } });
    setIsOrderDropdownOpen(false); // Close the dropdown after selection
  };

  return (
    <header className="bg-[#93C572] shadow-md">
      <div className="max-w-[70rem] mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" className="w-44" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 relative">
          {navItems.map((item) => {
            if ((item.name === "Login" || item.name === "Register") && isLoggedIn) {
              return null;
            }
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `text-lg font-medium capitalize transition duration-200 ${isActive ? "text-white" : "text-black hover:text-white"
                  }`
                }
              >
                {item.name}
              </NavLink>
            );
          })}

          {isLoggedIn && data?.role === "admin" && (
            <NavLink
              to="/admin/admin-profile"
              className={({ isActive }) =>
                `text-lg font-medium capitalize transition duration-200 ${isActive ? "text-white" : "text-black hover:text-white"
                }`
              }
            >
              Admin Dashboard
            </NavLink>
          )}
          {isLoggedIn && data?.role === "user" && (
            <>
              <NavLink
                to="quotation"
                className={({ isActive }) =>
                  `text-lg font-medium capitalize transition duration-200 ${isActive ? "text-white" : "text-black hover:text-white"
                  }`
                }
              >
                Quotation
              </NavLink>
              <div
                className="relative"
                onMouseEnter={handleOrderHover}
                onMouseLeave={handleOrderLeave}
              >
                <NavLink
                  to="#" // Prevent navigation
                  className="text-lg font-medium capitalize transition duration-200 text-black hover:text-white"
                  onClick={handleOrderClick} // Toggle dropdown on click
                >
                  Order
                </NavLink>
                {isOrderDropdownOpen && (
                  <div className="absolute top-8 bg-white shadow-lg rounded-md p-4 w-40" style={{ zIndex: 100 }}>
                    <div
                      className="py-2 px-4 hover:bg-gray-100 rounded-md cursor-pointer text-gray-600"
                      onClick={() => handleStatusClick("Pending")}
                    >
                      Pending
                    </div>
                    <div
                      className="py-2 px-4 hover:bg-gray-100 rounded-md cursor-pointer text-yellow-500"
                      onClick={() => handleStatusClick("In-Progress")}
                    >
                      In Progress
                    </div>
                    <div
                      className="py-2 px-4 hover:bg-gray-100 rounded-md cursor-pointer text-green-500"
                      onClick={() => handleStatusClick("Complete")}
                    >
                      Completed
                    </div>
                  </div>

                )}
              </div>
            </>
          )}
        </nav>

        {/* User Avatar & Dropdown */}
        {isLoggedIn && data?.role === "user" && (
          <div className="hidden md:block">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 text-2xl pt-1 h-10 rounded-full ring-2 ring-offset-2 ring-gradient-to-r from-blue-400 via-purple-500 to-pink-500 hover:ring-offset-4 transition-all transform hover:scale-110">
                  {getInitials(data?.email)}
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm bg-white text-gray-800 dropdown-content mt-3 z-[1] p-4 shadow-xl rounded-lg w-60 space-y-2 transition-all transform hover:scale-105"
              >
                <li className="hover:bg-gradient-to-r from-green-400 to-blue-500 hover:text-white rounded-md transition-colors py-2 px-4">
                  <Link to="/user-profile" className="flex items-center gap-2">
                    <i className="pi pi-user"></i> Profile
                  </Link>
                </li>
                <li className="hover:bg-gradient-to-r from-green-400 to-blue-500 hover:text-white rounded-md transition-colors py-2 px-4">
                  <Link to="/order-history" className="flex items-center gap-2">
                    <i className="pi pi-box"></i> Order History
                  </Link>
                </li>
                <li className="hover:bg-gradient-to-r from-green-400 to-blue-500 hover:text-white rounded-md transition-colors py-2 px-4">
                  <Link to="/login" className="flex items-center gap-2">
                    <i className="pi pi-lock"></i> Change Password
                  </Link>
                </li>
                <li className="hover:bg-red-500 hover:text-white rounded-md transition-colors py-2 px-4">
                  <Link onClick={logOut} className="flex items-center gap-2">
                    <i className="pi pi-sign-out"></i> Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};

export default Header;
