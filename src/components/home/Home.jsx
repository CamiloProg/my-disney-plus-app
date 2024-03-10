import React, { useState, useEffect } from "react";
import CategoryCard from "../movies/CategoryCard";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [genreList, setGenreList] = useState([]);
  const [visibleCategories, setVisibleCategories] = useState(6);
  const [selectedCategoryName, setSelectedCategoryName] =
    useState("Movie Search App");
  const [categoryImages, setCategoryImages] = useState({});
  const navigate = useNavigate();
  const API_KEY = "39a0cddb8f1e47f844fe1db8b89c5139";

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        setGenreList(data.genres);
        getFirstMovieImages(data.genres);
      })
      .catch((err) => console.error(err));
  }, [API_KEY]);

  const getFirstMovieImages = (genres) => {
    const promises = genres.map((genre) => {
      return fetch(
        `https://api.themoviedb.org/3/discover/movie?with_genres=${genre.id}&api_key=${API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.results.length > 0) {
            return {
              id: genre.id,
              imageUrl: `https://image.tmdb.org/t/p/w500${data.results[0].poster_path}`,
            };
          }
          return {
            id: genre.id,
            imageUrl: "https://via.placeholder.com/500x750?text=No+Image",
          };
        });
    });

    Promise.all(promises).then((results) => {
      const images = results.reduce((acc, result) => {
        acc[result.id] = result.imageUrl;
        return acc;
      }, {});
      setCategoryImages(images);
    });
  };

  const handleClickCategory = (genreId, categoryName) => {
    setSelectedCategoryName(categoryName);
    navigate(`/contentCategory/${genreId}`);
  };

  const handleShowMore = () => {
    setVisibleCategories(visibleCategories + 6);
  };

  return (
    <div className='container mx-auto flex flex-col items-center mb-32'>
      <h1 className='text-3xl font-bold my-8'>{selectedCategoryName}</h1>
      <ul className='flex flex-wrap gap-5 justify-center items-center '>
        {genreList.slice(0, visibleCategories).map((category) => (
          <li
            onClick={() => handleClickCategory(category.id, category.name)}
            key={category.id}
            className='hover:scale-105 cursor-pointer'
          >
            <CategoryCard
              text={category.name}
              imageUrl={categoryImages[category.id]}
            />
          </li>
        ))}
      </ul>
      {genreList.length > visibleCategories && (
        <button
          onClick={handleShowMore}
          className='bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-8'
        >
          Ver Más
        </button>
      )}
    </div>
  );
};

export default Home;
