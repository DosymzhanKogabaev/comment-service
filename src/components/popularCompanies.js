import React from "react";
import HomePageCompanyCard from "./homepageCompanyCard";

const PopularCompanies = ({ companies }) => {
    return (
        <div className="py-8 wrapper">
            <div className="text-center text-3xl font-medium">
                Popular companies
            </div>
            <div className="text-center text-xl mt-4">
                Companies with a large number of employee reviews and popular among job seekers
            </div>
            <div className="grid grid-cols-3 mt-6 gap-4">
            {
                companies.slice(0, 6).map((company) => (
                    <HomePageCompanyCard company={company} key={company._id}></HomePageCompanyCard>
                ))
            }
            </div>
        </div>
    )
}
export default PopularCompanies