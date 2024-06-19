import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import Home from "./components/home/Home.jsx";
import Login from "./components/auth/Login.jsx";
import Register from "./components/auth/Register.jsx";
import ContentCategory from "./components/home/ContentCategory.jsx";
import ContentDetails from "./components/movies/ContentDetails.jsx";
import MovieDetail from "./components/movies/MovieDetail.jsx";
import PopularMovies from "./components/movies/PopularMovies.jsx";
import UpcomingMovies from "./components/movies/UpcomingMovies.jsx";
import SearchMovies from "./components/movies/SearchMovies.jsx";
import PrivateRoute from "./components/auth/PrivateRoute.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "contentCategory",
        element: <ContentCategory />,
      },
      {
        path: "/contentCategory/:genreId",
        element: <ContentDetails />,
      },
      {
        path: "/movie/:id",
        element: <MovieDetail />,
      },
      {
        path: "/popularMovies",
        element: <PopularMovies />,
      },
      {
        path: "/UpcomingMovies",
        element: <UpcomingMovies />,
      },
      {
        path: "/searchMovies",
        element: <SearchMovies />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
