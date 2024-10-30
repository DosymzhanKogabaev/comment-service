import React from "react";
import noimage from '../assets/no-image.jpg'
import StarRating from "./starRating";
import { Link } from "react-router-dom";

const HomePageCompanyCard = ({ company }) => {
    return (
        <div className="border-0 rounded-2xl shadow px-4 py-4">
            <Link to={`/company/${encodeURIComponent(company.companyName)}`}>
                <div className="flex border-b pb-4 gap-2">
                    <div className="w-[72px] flex">
                        <img className={company.imgUrl ? "rounded-xl my-auto" : "rounded-xl border"} src={company.imgUrl ? company.imgUrl : noimage}></img>
                    </div>
                    <div className="grid grid-rows-3">
                        <div>
                            {company.companyName}
                        </div>
                        <div className="flex">
                            <div>{company.rating.toFixed(1)}</div>
                            <StarRating rating={company.rating}></StarRating>
                        </div>
                        <div className="text-[#9e9e9e]">
                            {company.comments.length} {company.comments.length === 1 ? "review" : "reviews"}
                        </div>
                    </div>
                </div>
            </Link>
            <div className="grid grid-cols-3 pt-4 text-[#3460a4]">
                <div className="mx-auto">
                    <Link to={`/company/${company.companyName}?tab=reviews`}>
                        Reviews
                    </Link>
                </div>
                <div className="w-full text-center border-l border-r">
                    <Link to={`/company/${company.companyName}?tab=salaries`}>
                        Salaries
                    </Link>
                </div>
                <div className="mx-auto">
                    <Link to={`/company/${company.companyName}?tab=interviews`}>
                        Interviews
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default HomePageCompanyCard