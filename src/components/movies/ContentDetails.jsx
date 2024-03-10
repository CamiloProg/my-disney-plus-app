import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../styles/index.css";

const ContentDetails = () => {
  const API_KEY = "39a0cddb8f1e47f844fe1db8b89c5139";
  const location = useLocation();

  const genreId = location.pathname.split("/").pop();
  const API_URL = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&api_key=${API_KEY}`;
  const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

  const [movies, setMovies] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    getMovies(API_URL);
  }, [API_URL]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        const category = data.genres.find(
          (genre) => String(genre.id) === genreId
        );
        if (category) {
          setCategoryName(category.name);
        }
      })
      .catch((err) => console.error(err));
  }, [genreId, API_KEY]);

  const getMovies = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
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
        <h1 className='text-3xl font-bold'>{categoryName}</h1>
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

export default ContentDetails;
