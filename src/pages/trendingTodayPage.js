import React from "react";
import { getTrendingMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';

const TrendingTodayPage = (props) => {

  const { data, error, isLoading, isError }  = useQuery('trending', getTrendingMovies)
  
  if (isLoading) {
    return <Spinner />
  }
  
  if (isError) {
    return <h1>{error.message}</h1>
  }  
  
  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const trendings = movies.filter(m => m.trending)
  localStorage.setItem('trending', JSON.stringify(trendings))

  return (
    <PageTemplate
      title='Trending Today'
      movies={movies}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />
      }}
    />
  );
};
export default TrendingTodayPage;