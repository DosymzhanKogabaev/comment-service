import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const SearchCompanies = ({companies}) => {
  const [query, setQuery] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  
  const navigate = useNavigate()

  useEffect(() => {
    if (query.length > 0) {
      const results = companies.filter((company) =>
        company.companyName.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCompanies(results);
      setDropdownVisible(true);
    } else {
      setFilteredCompanies([]);
      setDropdownVisible(false);
    }
  }, [query, companies]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const clearQuery = () => {
    setQuery("");
    setDropdownVisible(false);
  };

  const handleSearch = () => {
    if(query.trim()) {
      navigate(`/search/${encodeURIComponent(query)}`)
      clearQuery()
    }
  }

  return (
    <div>
      <div className="relative w-full">
        <div className="flex items-center">
          <div className="relative w-full">
            <input
              type="text"
              className="border border-gray-300 rounded-l-xl px-4 py-2 w-full focus:outline-0 pr-10"
              placeholder="Search companies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setDropdownVisible(true)}
            />
            {query && (
              <button
                className="absolute right-0 top-0 bottom-0 px-2 flex items-center text-gray-500"
                onClick={clearQuery}
              >
                &#x2715;
              </button>
            )}
          </div>
          <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded-r-xl flex items-center">
            {loading && (
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            )}
            Search
          </button>
        </div>
        {dropdownVisible && filteredCompanies.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-2 rounded-xl shadow-lg max-h-48 overflow-y-auto">
            {filteredCompanies.map((company) => (
                <li
                  key={company._id}
                  className="hover:bg-blue-100 first:hover:rounded-tl-xl last:hover:rounded-bl-xl"
                >
                  <Link
                    onClick={clearQuery} 
                    to={`/company/${encodeURIComponent(company.companyName)}`}>
                    <div className="px-4 py-2 w-full">{company.companyName}</div>
                  </Link>
                </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchCompanies;
