import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCompaniesList } from "../services/companyService.ts";
import Header from "../components/header.js";
import SearchCompanies from "../components/searchCompanies.js";
import HomepageInfo from "../components/homepageInfo.js";
import HomePageCompaniesList from "../components/homepageCompaniesList.js";
import PopularCompanies from "../components/popularCompanies.js";
import HomePageReviews from "../components/homepageReviews.js";
import HomePageCreateCompany from "../components/homepageCreateCompany.js";
import Footer from "../components/footer.js";

const Home = () => {
  const [companies, setCompanies] = useState([]);
  const [reviewsCount, setReviewsCount] = useState(0);

  useEffect(() => {
    const fetchCompanies = async () => {
      const response = await getCompaniesList();
      const sortedCompanies = response.sort((a, b) => b.rating - a.rating);
      setCompanies(sortedCompanies);
      let count = 0;
      for (let i in sortedCompanies) {
        count += sortedCompanies[i].comments.length;
      }
      setReviewsCount(count);
    };

    fetchCompanies();
  }, []);

  return (
    <div>
      <Header companies={companies}></Header>
      <div className="wrapper">
        <div className="mt-6">
          <div className="font-medium text-4xl">Find your dream company</div>
          <div className="text-xl mt-4">
            Reviews, salaries and work atmosphere in companies
          </div>
          <div className="mt-6 w-full border rounded-2xl p-8 bg-[#f4f9ff]">
            <SearchCompanies companies={companies}></SearchCompanies>
            <div className="flex justify-between mt-6">
              <div className="flex gap-4 text-[#3460a4] my-auto">
                <div>Popular: </div>
                {companies.length > 0 ? (
                  <ul className="flex gap-2">
                    {companies.slice(0, 3).map((company) => (
                      <Link
                        key={company._id}
                        to={`/company/${encodeURIComponent(
                          company.companyName
                        )}`}
                      >
                        <li className="border rounded-3xl px-4 py-0.5 bg-white hover:bg-[#a6bee3] hover:text-white">
                          {company.companyName}
                        </li>
                      </Link>
                    ))}
                  </ul>
                ) : (
                  <div className="py-[2.8px]">Loading...</div>
                )}
              </div>
              <div className="flex gap-4">
                <div>
                  <div className="text-center font-semibold">
                    {reviewsCount}
                  </div>
                  <div>reviews</div>
                </div>
                <div>
                  <div className="text-center font-semibold">
                    {companies.length}
                  </div>
                  <div>companies</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6"></div>
        <HomepageInfo></HomepageInfo>
      </div>
      <HomePageCompaniesList></HomePageCompaniesList>
      <div className="mt-6"></div>
      <PopularCompanies companies={companies}></PopularCompanies>
      <div className="mt-6"></div>
      <HomePageCreateCompany></HomePageCreateCompany>
      <div className="mt-6"></div>
      <HomePageReviews></HomePageReviews>
      <Footer></Footer>
    </div>
  );
};
export default Home;
