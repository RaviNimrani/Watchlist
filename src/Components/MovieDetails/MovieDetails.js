import { useParams } from "react-router-dom"; // Importing useParams hook from react-router-dom to access route parameters
import styles from "./moviedetails.module.css"; // Importing CSS module for styling
import { useSelector } from "react-redux"; // Importing useSelector from react-redux to access Redux state
import { movieListSelector } from "../../Redux"; // Importing movieListSelector to select movie list from Redux state

const MovieDetails = () => {
  const { id } = useParams(); // Getting the id parameter from the URL
  const movieList = useSelector(movieListSelector); // Selecting movieList from Redux state

  // Handling edge case: if id is out of bounds or invalid
  if (id >= movieList.length || id < 0) {
    return <p>Nothing to show</p>; // Display message if id is invalid
  }

  const movie = movieList[id]; // Selecting the movie object based on id from movieList
  console.log(movie); // Logging movie object for debugging
  if (!movie) {
    return <p>Nothing to show</p>;
  }
  return (
    <>
      <div className={styles["container"]}>
        <div className={styles["movieDetails-container"]}>
          <div className={styles["title-details"]}>
            <div className={styles["title"]}>
              <h1>{movie.Title}</h1> {/* Displaying movie title */}
              <p>
                <span>{movie.Released}</span> {/* Displaying release date */}
                <span>{movie.YouRated ? "Rated" : "Not Rated"}</span>{" "}
                {/* Displaying rating status */}
                <span>{movie.Runtime}</span> {/* Displaying runtime */}
              </p>
            </div>
            <div className={styles["rating"]}>
              <div className={styles["box"]}>
                <p>IMDB Ratings</p>
                <p>⭐{movie.imdbVotes}</p> {/* Displaying IMDb ratings */}
              </div>
              <div className={styles["box"]}>
                <p>Your Ratings</p>
                <p>⭐{movie.YouRated}/5</p> {/* Displaying user's rating */}
              </div>
            </div>
          </div>
          <div className={styles["poster-details"]}>
            <div className={styles["poster"]}>
              <img src={movie.Images[1]} alt={movie.Title}></img>{" "}
              {/* Displaying movie poster */}
            </div>
            <div className={styles["details"]}>
              <div className={styles["details-inner"]}>
                <p>{movie.Plot}</p> {/* Displaying movie plot */}
                <p>
                  <span>Director:</span>
                  {movie.Director} {/* Displaying movie director */}
                </p>
                <p>
                  <span>Writer:</span>
                  {movie.Writer} {/* Displaying movie writer */}
                </p>
                <p>
                  <span>Cast:</span>
                  {movie.Actors} {/* Displaying movie cast */}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
