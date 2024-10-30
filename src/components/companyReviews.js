import React, { useState, useEffect } from "react";
import { getUserByID } from "../services/userService.ts";
import { getCompanyByID } from "../services/companyService.ts";
import StarRating from "../components/starRating.js";

async function getCommentsList(company) {
  let comments = [];
  for (let i in company.comments) {
    comments.push(company.comments[i]);
  }
  return comments;
}

async function getUserOrCompanyByID(id) {
  let user;
  let res;
  try {
    res = await getUserByID(id);
    user = { user: res };
  } catch (error) {
    res = await getCompanyByID(id);
    user = { company: res };
  }
  return user;
}

const CompanyReviews = ({ company }) => {
  const [comments, setComments] = useState([]);
  const [authors, setAuthors] = useState({});

  useEffect(() => {
    async function fetchComments() {
      const commentsList = await getCommentsList(company);
      setComments(commentsList);
    }

    fetchComments();
  }, []);

  useEffect(() => {
    const fetchAuthors = async () => {
      const newAuthors = {};

      for (const comment of comments) {
        const author = await getUserOrCompanyByID(comment.authorId);
        newAuthors[comment.authorId] = author;
      }

      setAuthors(newAuthors);
    };

    fetchAuthors();
  }, [comments]);

  return (
    <div>
      <div className="text-3xl font-medium mb-10">
        Employee reviews about {company.companyName}
      </div>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>
            <div className="border bg-white px-8 py-6 rounded-xl mb-4">
              <div className="flex justify-between">
                <div>
                  <div className="font-bold text-lg">{comment.jobTitle}</div>
                  {authors[comment.authorId] ? (
                    authors[comment.authorId].user ? (
                      <span>{authors[comment.authorId].user.username}</span>
                    ) : (
                      <span>
                        {authors[comment.authorId].company.companyName}
                      </span>
                    )
                  ) : (
                    "Loading..."
                  )}
                </div>
                <div>
                  <StarRating rating={comment.rating}></StarRating>
                </div>
              </div>
              {comment.isCurrent ? (
                <div className="text-[#424242] bg-[#f5f5f5] border-0 rounded-lg px-3 py-2 text-sm inline-block mt-1"> 
                  Current place of work
                </div>
              ) : (
                <div className="text-[#424242] bg-[#f5f5f5] border-0 rounded-lg px-3 py-2 text-sm inline-block mt-1">
                  Previous place of work
                </div>
              )}
              <div className="h-px bg-gray-200 mt-4"></div>
              <div className="mt-4 font-bold text-lg">Description:</div>
              <div className="break-words">{comment.description}</div>
              {comment.recommend ? (
                <div className="flex gap-x-2 mt-4">
                  <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='#3460A4'>
                    <path d='M21.3 10.08A3 3 0 0 0 19 9h-4.56L15 7.57A4.13 4.13 0 0 0 11.11 2a1 1 0 0 0-.91.59L7.35 9H5a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h12.73a3 3 0 0 0 2.95-2.46l1.27-7a3 3 0 0 0-.65-2.46M7 20H5a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h2zm13-7.82-1.27 7a1 1 0 0 1-1 .82H9v-9.79l2.72-6.12a2.11 2.11 0 0 1 1.38 2.78l-.53 1.43a2 2 0 0 0 1.87 2.7H19a1 1 0 0 1 .77.36 1 1 0 0 1 .23.82'/>
                  </svg>
                  <div className="text-[#3460A4] my-auto">
                     Recommends This Company
                  </div>
                </div>
              ) : (
                <div className="flex gap-x-2 mt-4">
                  <svg className='rotate-180' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='#3460A4'>
                    <path d='M21.3 10.08A3 3 0 0 0 19 9h-4.56L15 7.57A4.13 4.13 0 0 0 11.11 2a1 1 0 0 0-.91.59L7.35 9H5a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h12.73a3 3 0 0 0 2.95-2.46l1.27-7a3 3 0 0 0-.65-2.46M7 20H5a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h2zm13-7.82-1.27 7a1 1 0 0 1-1 .82H9v-9.79l2.72-6.12a2.11 2.11 0 0 1 1.38 2.78l-.53 1.43a2 2 0 0 0 1.87 2.7H19a1 1 0 0 1 .77.36 1 1 0 0 1 .23.82'/>
                  </svg>
                  <div className="text-[#3460A4] my-auto">
                    Doesn't Recommend This Company
                  </div>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyReviews;
