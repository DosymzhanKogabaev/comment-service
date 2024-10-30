import React from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getCompanyByName,
  getCompaniesList,
} from "../services/companyService.ts";
import NotFound from "./notFound.js";
import Header from "../components/header.js";
import noimage from "../assets/no-image.jpg";
import StarRating from "../components/starRating.js";
import Footer from "../components/footer.js";
import CompanyInfo from "../components/companyInfo.js";
import CompanyReviews from "../components/companyReviews.js";
import CompanySalaries from "../components/companySalaries.js";
import CompanyInterviews from "../components/companyInterviews.js";

const CompanyPage = () => {
  const [companies, setCompanies] = useState([]);
  const [company, setCompany] = useState(null);
  const [searchParams] = useSearchParams();
  const { companyName } = useParams();
  const tab = searchParams.get("tab") || "info";

  useEffect(() => {
    const fetchCompany = async () => {
      const response = await getCompanyByName(companyName);
      setCompany(response);
    };

    fetchCompany();
  }, [companyName]);

  useEffect(() => {
    const fetchCompanies = async () => {
      const response = await getCompaniesList();
      const sortedCompanies = response.sort((a, b) => b.rating - a.rating);
      setCompanies(sortedCompanies);
    };

    fetchCompanies();
  }, []);

  if (!company || company.companyName !== companyName) {
    return (
      <div className="h-screen flex">
        <div className="my-auto mx-auto">
          <svg
            aria-hidden="true"
            className="inline w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <div>
      {company &&
      (tab === "info" ||
        tab === "reviews" ||
        tab === "salaries" ||
        tab === "interviews") ? (
        <div className="min-h-screen flex flex-col justify-between">
          <Header companies={companies}></Header>
          <div className="wrapper grow">
            <div className="mt-6">
              <div className="flex gap-8">
                <div className="w-[96px] h-[96px] flex">
                  <img
                    className={
                      company.imgUrl
                        ? "rounded-xl my-auto"
                        : "rounded-xl border"
                    }
                    src={company.imgUrl ? company.imgUrl : noimage}
                  ></img>
                </div>
                <div>
                  <div className="text-2xl font-semibold">
                    {company.companyName}
                  </div>
                  <div className="flex mt-2">
                    <div>{parseFloat(company.rating).toFixed(1)}</div>
                    <StarRating rating={company.rating}></StarRating>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <ul className="flex">
                  <li>
                    <Link
                      to={`/company/${companyName}?tab=info`}
                      className={
                        tab === "info"
                          ? "flex gap-x-2 px-3 py-4 bg-[#f4f9ff] border-t-2 border-[#3460a4]"
                          : "flex gap-x-2 px-3 py-4"
                      }
                    >
                      <div>Company</div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="#9E9E9E"
                      >
                        <path d="M14 8h1a1 1 0 1 0 0-2h-1a1 1 0 1 0 0 2m0 4h1a1 1 0 0 0 0-2h-1a1 1 0 0 0 0 2M9 8h1a1 1 0 1 0 0-2H9a1 1 0 0 0 0 2m0 4h1a1 1 0 0 0 0-2H9a1 1 0 0 0 0 2m12 8h-1V3a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v17H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2m-8 0h-2v-4h2zm5 0h-3v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5H6V4h12z" />
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/company/${companyName}?tab=reviews`}
                      className={
                        tab === "reviews"
                          ? "flex gap-x-2 px-3 py-4 bg-[#f4f9ff] border-t-2 border-[#3460a4]"
                          : "flex gap-x-2 px-3 py-4"
                      }
                    >
                      <div>Reviews</div>
                      <div className="text-[#757575]">
                        {company.comments.length}
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/company/${companyName}?tab=salaries`}
                      className={
                        tab === "salaries"
                          ? "flex px-3 py-4 bg-[#f4f9ff] border-t-2 border-[#3460a4]"
                          : "flex px-3 py-4"
                      }
                    >
                      Salaries
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/company/${companyName}?tab=interviews`}
                      className={
                        tab === "interviews"
                          ? "flex px-3 py-4 bg-[#f4f9ff] border-t-2 border-[#3460a4]"
                          : "flex px-3 py-4"
                      }
                    >
                      Interviews
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="h-10 bg-gradient-to-b from-[#f4f9ff] to-[#fff]"></div>
              <div className="mt-6 mb-12">
                {tab === "info" && <CompanyInfo company={company} />}
                {tab === "reviews" && <CompanyReviews company={company} />}
                {tab === "salaries" && <CompanySalaries company={company} />}
                {tab === "interviews" && (
                  <CompanyInterviews company={company} />
                )}
              </div>
            </div>
          </div>
          <Footer></Footer>
        </div>
      ) : (
        <NotFound></NotFound>
      )}
    </div>
  );
};

export default CompanyPage;
