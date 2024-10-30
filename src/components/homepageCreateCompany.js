import React from "react";
import { Link } from "react-router-dom";

const HomePageCreateCompany = () => {
    return (
        <div className="w-full bg-[#f4f9ff] py-24 mt-6">
            <div className="wrapper grid grid-cols-2">
                <div>
                    <div className="text-4xl font-medium">
                        Create your own<br></br>
                        company page now
                    </div>
                    <div className="text-xl mt-8">
                        Work with your employer brand by managing <br></br>
                        your company page on LoremIpsum
                    </div>
                    <Link to='/sign-up?type=company'>
                        <button className='flex mt-6 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg pl-5 pr-3 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'>
                            Register as a Company
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill="#fff" d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z"/></svg>
                        </button>
                    </Link>
                </div>
                <div className="bg-[#adf] flex">
                    <div className="m-auto text-6xl">some image</div>
                </div>
            </div>
        </div>
    )
}

export default HomePageCreateCompany