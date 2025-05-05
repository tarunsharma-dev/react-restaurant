import { useContext, useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router";
import UserContext from "../context/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  const [loginStatus, setLoginStatus] = useState("Login");
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const { loggedInUser } = useContext(UserContext);
  const cartItems = useSelector((store) => store.cart.items);

  const formatPrice = (price) => {
    if (!price) return "0.00";
    return (price / 100).toFixed(2);
  };

  const total = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );
  console.log(cartItems);

  return (
    <header className="header flex justify-between items-center py-1.5 px-5">
      <Link
        to={{
          pathname: "/",
        }}
        className="logo_container "
      >
        <img alt="logo" src={LOGO_URL} className="logo h-52 -my-16 -mx-8" />
      </Link>
      <nav className="nav-items">
        <ul className="flex items-center gap-3 text-base font-medium">
          <li className="p-2.5">
            <Link
              to={{
                pathname: "/",
              }}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to={{
                pathname: "/about",
              }}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to={{
                pathname: "/contact",
              }}
            >
              Contact
            </Link>
          </li>
          <li className="relative">
            <Link
              to={{
                pathname: "/cart",
              }}
              onMouseEnter={() => setShowCartDropdown(true)}
              onMouseLeave={() => setShowCartDropdown(false)}
              className="flex items-center gap-1"
            >
              Cart ({cartItems.length})
              {/* {showCartDropdown && cartItems.length > 0 && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 max-h-96 overflow-y-auto">
                    {cartItems.map((item, idx) => (
                      <div
                        key={item?.id ? item?.id : idx}
                        className="flex items-center justify-between py-2 border-b last:border-b-0"
                      >
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-600">
                            ₹{formatPrice(item.price)} x {item.quantity}
                          </p>
                        </div>
                        <p className="font-medium">
                          ₹{formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t bg-gray-50">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total:</span>
                      <span className="font-semibold">
                        ₹{formatPrice(total)}
                      </span>
                    </div>
                  </div>
                </div>
              )} */}
            </Link>
          </li>
          <li>
            <button
              className="shad-button_primary"
              onClick={() => {
                loginStatus === "Login"
                  ? setLoginStatus("Logout")
                  : setLoginStatus("Login");
              }}
            >
              {loginStatus}
            </button>
          </li>
          <li className="text-sm font-bold">{loggedInUser}</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
