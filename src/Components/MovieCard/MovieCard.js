import styles from "../MovieCard/moviecard.module.css"; // Importing CSS module for styling
import { addRating } from "../../Redux"; // Importing addRating action from Redux
import { useDispatch } from "react-redux"; // Importing useDispatch hook from react-redux for dispatching actions
import { removeMovie, toggleWatch, addReview } from "../../Redux"; // Importing multiple actions from Redux
import { useRef, useState } from "react"; // Importing useRef and useState hooks from React
import { useEditValue } from "../../editContext"; // Importing custom context hook
import { toast } from "react-toastify"; // Importing toast for displaying notifications
import { Link } from "react-router-dom"; // Importing Link component from react-router-dom for navigation

// MovieCard component
const MovieCard = ({ movie, index }) => {
  const [ratedStars, setRatedStars] = useState(0); // State for storing rated stars
  const { setIsEdited } = useEditValue(); // Accessing setIsEdited function from custom context
  const textRef = useRef(); // Creating a ref for textarea

  const dispatch = useDispatch(); // Initializing dispatch function from react-redux

  // Function to add star ratings
  const addStars = (count) => {
    setRatedStars(count); // Setting rated stars
    dispatch(addRating({ count, index })); // Dispatching addRating action with count and index
  };

  // Function to delete a movie
  const deleteMovie = () => {
    // Confirmation dialog for deletion
    if (window.confirm("Are You Really Want to Delete This ?")) {
      dispatch(removeMovie(index)); // Dispatching removeMovie action with index
      toast.success("Deleted SuccessFully"); // Showing success toast notification
    }
  };

  return (
    <>
      <div className={styles.card}>
        {" "}
        {/* Main card container */}
        <div className={styles["poster-details"]}>
          {" "}
          {/* Container for poster and details */}
          <div className={styles["poster"]}>
            <img src={movie.Images[1]}></img> {/* Movie poster */}
          </div>
          <div className={styles["details"]}>
            <Link
              to={`/watchlist/${index}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <h2>
                {index + 1}.&nbsp;{movie.Title} {/* Movie title with index */}
              </h2>
            </Link>
            <p id={styles["rate"]}>
              <span>
                <i class="fa-solid fa-star"></i> {movie.imdbRating}(
                {movie.imdbVotes})&nbsp;&nbsp;&nbsp;{" "}
                {/* IMDb rating and votes */}
              </span>
              <span>
                {/* Star rating section */}
                <>
                  <div className={styles.star}>
                    {[1, 2, 3, 4, 5].map((star) => {
                      if (star <= ratedStars) {
                        return (
                          <span
                            className={styles["star-filled"]}
                            onClick={() => addStars(star)}
                          >
                            {" "}
                            <i class="fa-solid fa-star"></i>{" "}
                            {/* Filled star icon */}
                          </span>
                        );
                      } else {
                        return (
                          <span
                            className={styles["star"]}
                            onClick={() => addStars(star)}
                          >
                            {" "}
                            <i class="fa-regular fa-star"></i>{" "}
                            {/* Empty star icon */}
                          </span>
                        );
                      }
                    })}
                  </div>
                </>
              </span>
              {/* Displaying rating status */}
              {movie.YouRated === 0 ? (
                <>&nbsp;&nbsp;&nbsp;Rate It Now</>
              ) : (
                <>&nbsp;&nbsp;&nbsp; Rated ✔️</>
              )}
            </p>
            <div className={styles["review"]}>
              {/* Displaying review or textarea to add review */}
              {movie.YouReview ? (
                <p>
                  <i class="fa-solid fa-angles-right"></i>
                  {" " + movie.YouReview}
                  <span>Reviewed✔️</span>
                </p>
              ) : (
                <>
                  <textarea
                    ref={textRef}
                    placeholder="Write A Review...."
                  ></textarea>{" "}
                  {/* Review input textarea */}
                  <button
                    onClick={() =>
                      dispatch(
                        addReview({ text: textRef.current.value, index })
                      )
                    }
                  >
                    ADD {/* Button to add review */}
                  </button>
                </>
              )}
            </div>
            <p>Released : {movie.Year}</p> {/* Release year */}
            <button
              className={
                movie.Watched ? styles["watched"] : styles["unwatched"]
              }
              onClick={() => dispatch(toggleWatch(index))}
            >
              {movie.Watched ? "Watched" : "WATCH"}{" "}
              {/* Button to toggle watch status */}
            </button>
          </div>
        </div>
        <div className={styles["added"]}>
          <div className={styles["delete"]}>
            <i
              onClick={() => setIsEdited({ status: true, index })}
              class="fa-solid fa-pen"
            ></i>{" "}
            {/* Edit icon */}
            <i onClick={() => deleteMovie()} class="fa-solid fa-trash"></i>{" "}
            {/* Delete icon */}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
