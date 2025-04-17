import { useContext, useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router";
import UserContext from "../context/UserContext";

const Header = () => {
  const [loginStatus, setLoginStatus] = useState("Login");

  const { loggedInUser } = useContext(UserContext);
  // console.log(loggedInUser);
  return (
    <header className="header flex justify-between items-center py-1.5 px-5">
      <Link
        to={{
          pathname: "/",
          // search: "?query=string",
          // hash: "#hash",
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
          <li>Cart</li>
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
