import styles from "./form.module.css"; // Importing CSS module for styling
import { addMovie, movieListSelector, editMovie } from "../../Redux"; // Importing actions and selector from Redux
import { useDispatch, useSelector } from "react-redux"; // Importing useDispatch and useSelector hooks from react-redux
import { createRef, useEffect, useRef, useState } from "react"; // Importing necessary hooks from React
import { toast } from "react-toastify"; // Importing toast for displaying notifications
import { useEditValue } from "../../editContext"; // Importing custom context hook

const Form = () => {
  const dispatch = useDispatch(); // Initializing dispatch function from react-redux
  const titleRef = useRef(); // Creating refs for form fields
  const imageRef = useRef();
  const releaseYearRef = useRef();
  const genreRef = useRef();
  const descriptionRef = useRef();
  const [showForm, setShowForm] = useState(true); // State to manage form visibility
  const { isEdited } = useEditValue(); // Accessing isEdited state from custom context
  const movieList = useSelector(movieListSelector); // Selecting movieList from Redux state

  // Handling form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Preventing default form submission behavior

    // If editing a movie, dispatch editMovie action
    if (isEdited.status) {
      dispatch(editMovie(isEdited.index));
    }

    // Creating a movie object from form input values
    const movie = {
      Title: titleRef.current.value,
      Images: [e.target[1].value],
      Year: e.target[2].value,
      Genre: e.target[3].value,
      Plot: e.target[4].value,
      Watched: false,
      YouRated: 0,
      YouReview: null,
    };

    dispatch(addMovie(movie)); // Dispatching addMovie action with movie object

    setShowForm(false); // Hiding the form after submission
    toast.success("Added Successfully"); // Showing success toast notification
  };

  // Effect to handle editing movie details
  useEffect(() => {
    if (isEdited.status) {
      setShowForm(true); // Showing the form when editing
      editMovieDetails(); // Calling function to populate form fields with edited movie details
    }
  }, [isEdited]);

  // Function to populate form fields with edited movie details
  const editMovieDetails = () => {
    const editedMovie = movieList[isEdited.index]; // Getting the edited movie from movieList
    titleRef.current.value = editedMovie.Title; // Setting title input field value
    imageRef.current.value = editedMovie.Images[0]; // Setting image URL input field value
    genreRef.current.value = editedMovie.Genre; // Setting genre input field value
    releaseYearRef.current.value = editedMovie.Year; // Setting release year input field value
    descriptionRef.current.value = editedMovie.Plot; // Setting description textarea value
  };

  return (
    <>
      {!showForm ? (
        // Button to show form for adding a movie
        <button
          onClick={() => setShowForm(!showForm)}
          className={styles["add-btn"]}
        >
          Add Movie
        </button>
      ) : (
        // Form for adding or editing a movie
        <div className={styles.form}>
          <h2>{isEdited.status ? "Edit Movie" : "Add A Movie"}</h2>
          <div className={styles.formFields}>
            <form onSubmit={handleSubmit}>
              <input
                ref={titleRef}
                type="text"
                required
                placeholder="Title"
              ></input>{" "}
              {/* Title input field */}
              <input
                ref={imageRef}
                type="url"
                placeholder="Image URL"
              ></input>{" "}
              {/* Image URL input field */}
              <input
                ref={releaseYearRef}
                type="text"
                placeholder="Release Year"
              ></input>{" "}
              {/* Release year input field */}
              <input
                ref={genreRef}
                type="text"
                placeholder="Genre"
              ></input>{" "}
              {/* Genre input field */}
              <textarea
                ref={descriptionRef}
                placeholder="Description"
              ></textarea>{" "}
              {/* Description textarea */}
              <button type="submit">
                {isEdited.status ? "Edit Movie" : "Add Movie"}
              </button>{" "}
              {/* Submit button with dynamic text */}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Form;
