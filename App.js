import ReactDOM from "react-dom/client";
import Header from "./src/components/Header";
import Body from "./src/components/Body";
import Footer from "./src/components/Footer";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import About from "./src/components/About";
import Contact from "./src/components/Contact";
import Error from "./src/components/Error";
import RestaurantMenu from "./src/components/RestaurantMenu";
// import { FlappyBirdGame } from "./src/flappybird/FlappyBirdGame";

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
      { path: "/", Component: Body },
      { path: "/about", Component: About },
      { path: "/contact", Component: Contact },
      { path: "/restaurant/:resId", Component: RestaurantMenu },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={router} />);
