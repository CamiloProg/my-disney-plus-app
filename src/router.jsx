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
        element: <PrivateRoute element={<Home />} />,
      },
      {
        path: "contentCategory",
        element: <PrivateRoute element={<ContentCategory />} />,
      },
      {
        path: "/contentCategory/:genreId",
        element: <PrivateRoute element={<ContentDetails />} />,
      },
      {
        path: "/movie/:id",
        element: <PrivateRoute element={<MovieDetail />} />,
      },
      {
        path: "/popularMovies",
        element: <PrivateRoute element={<PopularMovies />} />,
      },
      {
        path: "/UpcomingMovies",
        element: <PrivateRoute element={<UpcomingMovies />} />,
      },
      {
        path: "/searchMovies",
        element: <PrivateRoute element={<SearchMovies />} />,
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
