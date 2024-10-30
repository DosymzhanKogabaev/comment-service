import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import { getCompaniesList } from "../services/companyService.ts";

const NotFound = () => {
    const [companies, setCompanies] = useState([]);
    const navigate = useNavigate()
    
    useEffect(() => {
        const fetchCompanies = async () => {
        const response = await getCompaniesList();
        const sortedCompanies = response.sort((a, b) => b.rating - a.rating);
        setCompanies(sortedCompanies);
        };
        
        fetchCompanies();
    }, []);
    
    const handleNavigate = () => {
        navigate('/')
    }

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <Header companies={companies}></Header>
            <div className="wrapper grow flex">
                <div className="my-auto">
                    <div className='font-medium text-4xl'>
                        Sorry! The page you are looking for<br></br>
                        cannot be found
                    </div>
                    <button onClick={handleNavigate} className='mt-6 flex text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg px-8 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'>
                        Go to Home
                    </button>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default NotFound