import React from "react";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCompaniesList } from "../services/companyService.ts";
import noimage from "../assets/no-image.jpg";
import StarRating from "../components/starRating.js";
import Header from "../components/header.js";
import Footer from "../components/footer.js";

const SearchResults = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { query } = useParams();

  useEffect(() => {
    const fetchCompanies = async () => {
      const response = await getCompaniesList();
      const sortedCompanies = response.sort((a, b) => b.rating - a.rating);
      setCompanies(sortedCompanies);
    };

    fetchCompanies();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if(companies.length > 0) {
      const results = companies.filter((company) =>
        company.companyName.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCompanies(results);
      setIsLoading(false);
    }
  }, [query, companies]);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header companies={companies}></Header>
      <div className="wrapper grow">
        {isLoading ? (
          <div className="font-medium text-4xl mt-6">Loading...</div>
        ) : filteredCompanies.length > 0 ? (
          <div>
            <div className="font-medium text-4xl mt-6">
              Search results: "{query}" ({filteredCompanies.length})
            </div>
            <div className="grid grid-cols-5 py-12 gap-x-4 gap-y-12">
              {filteredCompanies.map((company) => (
                <Link
                  to={`/company/${encodeURIComponent(company.companyName)}`}
                  key={company._id}
                >
                  <div
                    key={company._id}
                    className="border-0 rounded-2xl shadow px-4 py-4 h-full"
                  >
                    <div className="p-2 w-[84px] border rounded-xl shadow-lg mx-auto mt-[-48px]">
                      <div className="w-full">
                        <img
                          className="rounded-xl"
                          src={company.imgUrl ? company.imgUrl : noimage}
                        ></img>
                      </div>
                    </div>
                    <div className="text-center mt-2 text-xl font-semibold">
                      {company.companyName}
                    </div>
                    <div className="flex justify-center mt-2">
                      <div>{company.rating.toFixed(1)}</div>
                      <StarRating rating={company.rating}></StarRating>
                    </div>
                    <div className="text-[#9e9e9e] text-center">
                      {company.comments.length}{" "}
                      {company.comments.length === 1 ? "review" : "reviews"}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="font-medium text-4xl mt-6">
              Company "{query}" was not found
            </div>
            <div className="text-xl mt-4">
              Try entering different search query
            </div>
          </div>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default SearchResults;
