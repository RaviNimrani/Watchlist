import { ToastContainer } from "react-toastify";
import EditContextProvider from "../../editContext";
import Navbar from "../Navbar/Navbar";
import MovieList from "../MovieList/MovieList";
import Form from "../Form/Form";

const HomePage = () => {
  return (
    <>
      <EditContextProvider>
        <Navbar />
        <div className="app">
          <MovieList />
          <Form />
        </div>
      </EditContextProvider>
    </>
  );
};

export default HomePage;
