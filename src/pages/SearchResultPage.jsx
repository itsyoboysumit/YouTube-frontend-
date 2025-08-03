import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useSearch from '../hooks/useSearch';
import VideoGrid from '../components/SearchResult/SearchVideoGrid';
import Loader from '../components/Loader';

const SearchResultPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query');

  const { results, loading, error, performSearch } = useSearch();

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

  if (!query) {
    return (
      <div className="text-center text-gray-400 py-10">
        No search query provided.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-xl font-semibold mt-4 mb-2 text-white">
        Search results for: <span className="text-blue-400">"{query}"</span>
      </h2>

      {loading && <Loader />}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {!loading && !error && <VideoGrid videos={results || []} />}
    </div>
  );
};

export default SearchResultPage;
