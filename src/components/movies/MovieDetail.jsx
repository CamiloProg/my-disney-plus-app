import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import StarRating from "./StarRating";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [cast, setCast] = useState([]);
  const [iframeWidth, setIframeWidth] = useState(500); // Ancho inicial

  const getScreenWidth = () => {
    return (
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth
    );
  };

  const adjustIframeWidth = () => {
    const screenWidth = getScreenWidth();
    const newWidth = screenWidth > 768 ? 530 : screenWidth - 32;
    setIframeWidth(newWidth);
  };

  useEffect(() => {
    adjustIframeWidth();
    const handleResize = () => adjustIframeWidth();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const API_KEY = "39a0cddb8f1e47f844fe1db8b89c5139";
    const MOVIE_URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
    const VIDEO_URL = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`;
    const CREDITS_URL = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`;

    const fetchMovieData = async () => {
      try {
        const movieResponse = await fetch(MOVIE_URL);
        const movieData = await movieResponse.json();
        setMovie(movieData);

        const videoResponse = await fetch(VIDEO_URL);
        const videoData = await videoResponse.json();

        const trailer = videoData.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        setTrailer(trailer);

        const creditsResponse = await fetch(CREDITS_URL);
        const creditsData = await creditsResponse.json();
        setCast(creditsData.cast.slice(0, 6));
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchMovieData();
  }, [id]);

  if (!movie || !trailer) {
    return (
      <div className='flex justify-center items-center h-[700px]'>
        Loading...
      </div>
    );
  }

  const renderGenres = () => {
    return movie.genres.map((genre) => (
      <Link to={`/contentCategory/${genre.id}`} key={genre.id}>
        <div className='hover:scale-110'>
          <span
            key={genre.id}
            className='mr-2  bg-indigo-100 text-indigo-800 px-2 py-1 rounded'
          >
            {genre.name}
          </span>
        </div>
      </Link>
    ));
  };

  const getClassByRate = (vote) => {
    if (vote >= 7) {
      return "text-green-500";
    } else if (vote >= 5) {
      return "text-orange-500";
    } else {
      return "text-red-500";
    }
  };

  return (
    <div className='container mx-auto px-4 '>
      <header className='text-center my-8'>
        <h1 className='text-3xl font-bold'>{movie.title}</h1>
      </header>
      <div className='flex  justify-center items-center gap-8'>
        <div className='xl:w-[80%] w-full  items-center md:items-stretch flex flex-col md:flex-row rounded-lg overflow-hidden shadow-md'>
          <img
            src={`https://image.tmdb.org/t/p/w1280${movie.poster_path}`}
            alt={movie.title}
            className='w-56 rounded-lg md:rounded-none h-auto object-cover'
          />
          <div className='p-4 rounded-lg md:rounded-none bg-gray-700'>
            <div className='mb-4'>
              <h3 className='text-lg font-bold mb-2'>Overview</h3>
              <p className='text-white'>{movie.overview}</p>
            </div>
            <div className='mb-4'>
              <h3 className='text-lg font-bold mb-2'>Production Companies</h3>
              <ul className='list-disc list-inside text-white'>
                {movie.production_companies.map((company) => (
                  <li key={company.id}>{company.name}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className='text-lg font-bold mb-2'>Spoken Languages</h3>
              <ul className='list-disc list-inside text-white'>
                {movie.spoken_languages.map((language) => (
                  <li key={language.iso_639_1}>{language.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col lg:flex-row justify-center items-center mb-4 gap-5 mt-5 '>
        <div className='flex flex-col gap-5 bg-gray-700 rounded-xl p-10'>
          <div className='flex gap-8'>
            <div className='flex flex-col'>
              <p className='text-sm font-bold'>Release Date:</p>
              <p className='text-white'>{movie.release_date}</p>
            </div>
            <div className='flex flex-col'>
              <p className='text-sm font-bold'>Runtime:</p>
              <p className='text-white'>{movie.runtime} minutes</p>
            </div>
          </div>
          <div className='flex flex-col gap-5'>
            <div className='flex flex-col'>
              <p className='text-sm font-bold'>Vote Average:</p>
              <p className={` ${getClassByRate(movie.vote_average)}`}>
                {movie.vote_average}
              </p>
            </div>
            <StarRating rating={movie.vote_average} />

            <div className='flex flex-col'>
              <p className='text-sm font-bold mb-3'>Genres:</p>
              <div className='flex flex-wrap gap-3'>{renderGenres()}</div>
            </div>
          </div>
        </div>

        {trailer && (
          <div className='text-center'>
            <div className='iframe-container'>
              <iframe
                title='trailer'
                width={iframeWidth}
                height='315'
                src={`https://www.youtube.com/embed/${trailer.key}`}
                frameBorder='0'
                allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </div>
      <div className='flex flex-col justify-center items-center mt-3 mb-12'>
        <h3 className='text-2xl font-bold mb-4'>Cast</h3>
        <div className='flex flex-wrap justify-center gap-4'>
          {cast.map((actor) => (
            <div
              key={actor.id}
              className='cast-member hover:scale-105 flex flex-col items-center justify-center'
            >
              {actor.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                  alt={actor.name}
                  className='rounded-full lg:w-40 w-28 object-cover'
                />
              ) : (
                <div
                  className='rounded-full lg:w-40 w-28 bg-gray-700 h-full flex justify-center items-center'
                  style={{ aspectRatio: "1/1" }}
                >
                  <span className='text-gray-100'>No Image</span>
                </div>
              )}
              <p className='text-white text-center text-sm'>{actor.name}</p>
              <p className='text-gray-300 text-xs text-center'>
                {actor.character ? actor.character : actor.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
