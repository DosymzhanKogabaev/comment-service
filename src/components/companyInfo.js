import React from "react";

const CompanyInfo = ({ company }) => {
  return (
    <div>
      <div className="text-3xl font-medium mb-10">About this company</div>
      {company.websiteUrl ||
      company.employeesNumber ||
      company.city ||
      company.yearFounded ||
      company.description ? (
        <div className="border rounded-2xl shadow py-6 px-6">
          <div className="grid grid-cols-4">
            {company.websiteUrl && (
              <div>
                <div className="text-[#bdbdbd]">Company website</div>
                <a href={company.websiteUrl} className="text-[#3460a4]">
                  {company.websiteUrl}
                </a>
              </div>
            )}
            {company.employeesNumber && (
              <div>
                <div className="text-[#bdbdbd]">Number of employees</div>
                <div>{company.employeesNumber}</div>
              </div>
            )}
            {company.city && (
              <div>
                <div className="text-[#bdbdbd]">City (head office)</div>
                <div>{company.city}</div>
              </div>
            )}
            {company.yearFounded && (
              <div>
                <div className="text-[#bdbdbd]">Year founded</div>
                <div>{company.yearFounded}</div>
              </div>
            )}
          </div>
          {company.description && (
            <div className="border-t mt-4 pt-2">{company.description}</div>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default CompanyInfo;
