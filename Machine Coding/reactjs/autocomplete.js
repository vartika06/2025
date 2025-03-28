import { useState, useEffect, useCallback } from "react";
import "./styles.css";

/**
 * 📝 Problem Statement:
 * Implement a search bar that fetches recipe results from an API based on user input.
 *
 * 🔹 Features:
 * 1. **Debounce Input:** Prevents excessive API calls by waiting for 300ms after the user stops typing.
 * 2. **Cache Responses:** Stores previous search results to optimize performance and reduce redundant API calls.
 * 3. **Optimized API Calls:** Uses `useCallback` to ensure the fetch function is not re-created unnecessarily.
 * 4. **Loading & Error Handling:** Displays a loading indicator while fetching data and handles API failures.
 */

const App = () => {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState([]);
  const [cache, setCache] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch results with caching
  const fetchResults = useCallback(async () => {
    if (cache[searchInput]) {
      setResults(cache[searchInput]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://dummyjson.com/recipes/search?q=${searchInput}`
      );
      if (!response.ok) throw new Error("Failed to fetch results");

      const parsedResults = await response.json();
      setResults(parsedResults.recipes || []);
      setCache((prevCache) => ({
        ...prevCache,
        [searchInput]: parsedResults.recipes || []
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [searchInput, cache]);

  // Debounce API calls
  useEffect(() => {
    const timer = setTimeout(fetchResults, 300);

    return () => clearTimeout(timer);
  }, [searchInput, fetchResults]);

  // Handle input change
  const handleChange = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <div className="container">
      <input
        onChange={handleChange}
        value={searchInput}
        type="text"
        className="searchBar"
        placeholder="Search recipes..."
      />

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && results.length > 0 ? (
        <div className="list">
          {results.map((result) => (
            <div key={result.id}>{result.name}</div>
          ))}
        </div>
      ) : null}
      {!loading && results.length === 0 ? <p>No recipes found</p> : null}
    </div>
  );
};

export default App;

// .searchBar {
//     width: 100%;
//     max-width: 500px;
//     height: 36px;
//     padding: 6px 10px;
//     font-size: 1rem;
//     border: 1px solid #ccc;
//     border-radius: 4px;
//     outline: none;
//   }

//   .list {
//     width: 100%;
//     max-width: 500px;
//     height: 400px;
//     border: 1px solid #ddd;
//     padding: 8px;
//     overflow-y: auto;
//   }

//   .list div {
//     padding: 6px;
//     font-size: 1rem;
//     border-bottom: 1px solid #eee;
//   }

//   .list div:last-child {
//     border-bottom: none;
//   }

//   @media (max-width: 600px) {
//     .searchBar,
//     .list {
//       max-width: 90%;
//     }
//   }
