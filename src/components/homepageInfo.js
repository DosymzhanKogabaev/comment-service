import React from "react";
import handshake from "../assets/handshake.png"
import checklist from "../assets/checklist.png"
import bargraph from "../assets/bar-graph.png"

const HomepageInfo = () => {
    return (
        <div className="grid grid-cols-3 gap-x-4">
            <div className="bg-[#fef6f6] p-6 rounded-2xl border-0">
                <div className="w-1/2 mx-auto">
                    <img src={handshake}></img>
                </div>
                <div className="font-medium text-3xl mt-2">
                    Meet your future employer
                </div>
                <div className="text-xl mt-2">
                    Reviews from employees will tell you about the advantages and features of working in companies
                </div>
            </div>
            <div className="bg-[#f9f8fe] p-6 rounded-2xl border-0">
                <div className="w-1/2 mx-auto">
                    <img src={bargraph}></img>
                </div>
                <div className="font-medium text-3xl mt-2">
                    Stay up to date with the salary market
                </div>
                <div className="text-xl mt-2">
                    Study market salaries for various positions and their level in specific companies
                </div>
            </div>
            <div className="bg-[#f2fdfe] p-6 rounded-2xl border-0">
                <div className="w-1/2 mx-auto">
                    <img src={checklist}></img>
                </div>
                <div className="font-medium text-3xl mt-2">
                    Prepare for your interview
                </div>
                <div className="text-xl mt-2">
                    Feedback from candidates will help you understand what to expect from the company's selection process
                </div>
            </div>
        </div>
    )
}

export default HomepageInfo