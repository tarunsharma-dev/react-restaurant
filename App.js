import ReactDOM from "react-dom/client";
import Header from "./src/components/Header";
// import Body from "./src/components/Body";
import Footer from "./src/components/Footer";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
// import About from "./src/components/About";
// import Contact from "./src/components/Contact";
// import Error from "./src/components/Error";
// import RestaurantMenu from "./src/components/RestaurantMenu";
import { lazy, Suspense, useEffect, useState } from "react";
// import { FlappyBirdGame } from "./src/flappybird/FlappyBirdGame";
import "./index.css";
import Main from "./src/Main";
import Shimmer from "./src/components/Shimmer";
import RestaurantMenu from "./src/components/RestaurantMenu";
import UserContext from "./src/context/UserContext";

const Body = lazy(() => import("./src/components/Body"));
const About = lazy(() => import("./src/components/About"));
const Contact = lazy(() => import("./src/components/Contact"));
// const RestaurantMenu = lazy(() => import("./src/components/RestaurantMenu"));
const AppLayout = () => {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const data = { name: "Tarun Sharma" };

    setUserName(data.name);
  }, []);
  return (
    <div className="flex justify-center mx-auto">
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
      { path: "/contact", element: <Contact /> },
      { path: "/restaurant/:resId", element: <RestaurantMenu /> },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={router} />);
