import { useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router";

const Header = () => {
  const [loginStatus, setLoginStatus] = useState("Login");
  return (
    <header className="header">
      <Link
        to={{
          pathname: "/",
          // search: "?query=string",
          // hash: "#hash",
        }}
        className="logo_container"
      >
        <img alt="logo" src={LOGO_URL} className="logo" />
      </Link>
      <nav className="nav-items">
        <ul>
          <li>
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
              className="login-btn"
              onClick={() => {
                loginStatus === "Login"
                  ? setLoginStatus("Logout")
                  : setLoginStatus("Login");
              }}
            >
              {loginStatus}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
