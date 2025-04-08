import ReactDOM from "react-dom/client";
import Header from "./src/components/Header";
// import Body from "./src/components/Body";
import Footer from "./src/components/Footer";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
// import About from "./src/components/About";
// import Contact from "./src/components/Contact";
// import Error from "./src/components/Error";
// import RestaurantMenu from "./src/components/RestaurantMenu";
import { lazy, Suspense } from "react";
// import { FlappyBirdGame } from "./src/flappybird/FlappyBirdGame";

const Body = lazy(() => import("./src/components/Body"));
const About = lazy(() => import("./src/components/About"));
const Contact = lazy(() => import("./src/components/Contact"));
const RestaurantMenu = lazy(() => import("./src/components/RestaurantMenu"));
const AppLayout = () => {
  return (
    <main>
      <Header />
      <Outlet />
      <Footer />
      {/* <FlappyBirdGame /> */}
    </main>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<h1>Loading Suspense</h1>}>
            <Body />
          </Suspense>
        ),
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<h1>Loading Suspense</h1>}>
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
