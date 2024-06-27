import { ToastContainer } from "react-toastify";
import Form from "./Components/Form/Form";

import MovieList from "./Components/MovieList/MovieList";
import Navbar from "./Components/Navbar/Navbar";
import "./app.css";
import "react-toastify/dist/ReactToastify.css";
import EditContextProvider from "./editContext";
import MovieDetails from "./Components/MovieDetails/MovieDetails";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/:id", element: <MovieDetails /> },
  ]);
  console.log("this is appp");
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
      {/* <MovieDetails /> */}
    </>
  );
}

export default App;
