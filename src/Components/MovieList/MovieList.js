import { useSelector } from "react-redux";

import MovieCard from "../MovieCard/MovieCard";
import { Link } from "react-router-dom";

const MovieList = () => {
  const { movieList } = useSelector((state) => state.movies);
  return (
    <>
      <div style={{ width: "60vw" }}>
        {movieList.map((movie, i) => (
          <MovieCard key={i} movie={movie} index={i} />
        ))}
      </div>
    </>
  );
};

export default MovieList;
