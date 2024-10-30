import React from "react";
import { useState, useEffect } from "react";
import { getCompaniesList } from "../services/companyService.ts";
import Header from "../components/header.js";
import Footer from "../components/footer.js";

const AddReviewToUser = () => {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        const fetchCompanies = async () => {
          const response = await getCompaniesList();
          const sortedCompanies = response.sort((a, b) => b.rating - a.rating);
          setCompanies(sortedCompanies);
        };
    
        fetchCompanies();
    }, []);
    
    return (
        <div className="min-h-screen flex flex-col justify-between">
            <Header companies={companies}></Header>
            <div>
                Add Review to user
            </div>
            <Footer></Footer>
        </div>
    )
}

export default AddReviewToUser