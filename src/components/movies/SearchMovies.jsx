import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/index.css";

const Search = () => {
  const API_KEY = "39a0cddb8f1e47f844fe1db8b89c5139";
  const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
  const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(SEARCH_API + query);
      const data = await response.json();

      setMovies(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const getClassByRate = (vote) => {
    if (vote >= 8) {
      return "text-green-500";
    } else if (vote >= 5) {
      return "text-orange-500";
    } else {
      return "text-red-500";
    }
  };

  return (
    <div className='container mx-auto px-4'>
      <header className='text-center my-8'>
        <h1 className='text-3xl font-bold'>Movie Search</h1>
        <p className='my-3'>
          Write the name of a movie :) <br /> For example... Avengers
        </p>
        <form
          onSubmit={searchMovies}
          className='my-4 flex justify-center gap-5'
        >
          <input
            className='border border-gray-400 rounded-lg p-2'
            type='text'
            placeholder='Search movies...'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'
            type='submit'
          >
            Search
          </button>
        </form>
      </header>
      <div className='flex flex-wrap justify-center gap-8'>
        {movies.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id}>
            <div className='movie bg-white rounded-lg overflow-hidden shadow-md w-[300px] h-full'>
              <img
                src={IMG_PATH + movie.poster_path}
                alt={movie.title}
                className='w-full h-full object-cover'
              />
              <div className='movie-info p-4 bg-gray-600'>
                <div className='flex justify-between items-center gap-3'>
                  <h3 className='text-sm font-bold mb-2'>{movie.title}</h3>
                  <p
                    className={`text-sm ${getClassByRate(movie.vote_average)}`}
                  >
                    {movie.vote_average}
                  </p>
                </div>
                <div className='overview bg-gray-600'>
                  <h3 className='text-lg font-bold mb-2'>Overview</h3>
                  <p className='text-gray-200'>{movie.overview}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Search;
