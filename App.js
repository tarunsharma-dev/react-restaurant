import ReactDOM from "react-dom/client";
import Header from "./src/components/Header";
import Footer from "./src/components/Footer";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import RestaurantMenu from "./src/components/RestaurantMenu";
import { lazy, Suspense, useEffect, useState } from "react";
import "./index.css";
import Main from "./src/Main";
import Shimmer from "./src/components/Shimmer";
import UserContext from "./src/context/UserContext";
import { Provider } from "react-redux";
import appStore from "./src/utils/store/appStore";
import Cart from "./src/components/Cart";
import Error from "./src/components/Error";

const Body = lazy(() => import("./src/components/Body"));
const About = lazy(() => import("./src/components/About"));
const Contact = lazy(() => import("./src/components/Contact"));

const AppLayout = () => {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const data = { name: "Tarun Sharma" };

    setUserName(data.name);
  }, []);
  return (
    <div className="flex justify-center mx-auto">
      <Provider store={appStore}>
        <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
          <Main>
            <Header />
            <div className="py-4">
              <Outlet />
            </div>
            {/* <Footer /> */}
            {/* <FlappyBirdGame /> */}
          </Main>
        </UserContext.Provider>
      </Provider>
    </div>
  );
};

const ShimmerUI = () => {
  return <Shimmer column={15} />;
};

const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<ShimmerUI />}>
            <Body />
          </Suspense>
        ),
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<ShimmerUI />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback={<ShimmerUI />}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: (
          <Suspense fallback={<ShimmerUI />}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: "/restaurant/:resId",
        element: (
          // <Suspense fallback={<ShimmerUI />}>
          <RestaurantMenu />
          // </Suspense>
        ),
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={router} />);
