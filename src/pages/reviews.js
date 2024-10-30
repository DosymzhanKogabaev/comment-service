import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
import { getUserByID } from "../services/userService.ts";
import { getCompanyByID } from "../services/companyService.ts";
import StarRating from "../components/starRating.js";

async function getUser() {
  let userJSON = localStorage.getItem("user");
  let user = JSON.parse(userJSON);
  if (user) user = await getUserByID(user._id);
  else {
    user = JSON.parse(localStorage.getItem("company"));
    user = await getCompanyByID(user._id);
  }
  return user;
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

const Reviews = () => {
  let userJSON = localStorage.getItem("user");
  const [user, setUser] = useState({});
  const [comments, setComments] = useState([]);
  const [authors, setAuthors] = useState({});
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      const user = await getUser();
      setUser(user);
    }

    fetchUser();
  }, []);

  useEffect(() => {
    function fetchComments() {
      if (user && user.comments) {
        const commentsList = [...user.comments];
        if (commentsList.length === 0) {
          setIsEmpty(true);
        }
        setComments(commentsList);
      }
    }

    fetchComments();
  }, [user]);

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
    <div className="flex">
      <Sidebar></Sidebar>
      <div className="px-8 bg-gray-100 w-full">
        <div className="max-w-3xl h-screen pt-20 w-full overflow-y-scroll no-scrollbar">
          <div className="text-3xl font-medium mb-4">My Reviews</div>
          {comments.length > 0 && !isEmpty ? (
            <ul>
              {comments.map((comment, index) => (
                <li key={index}>
                  <div className="border bg-white px-8 py-6 rounded-xl mb-4">
                    <div className="flex justify-between">
                      <div>
                        <div className="font-bold">{comment.jobTitle} </div>
                        {authors[comment.authorId] ? (
                          authors[comment.authorId].user ? (
                            <span>
                              {authors[comment.authorId].user.username}
                            </span>
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
                        {user.companyName ? 'Current place of work' : 'Current employee'}
                      </div>
                    ) : (
                      <div className="text-[#424242] bg-[#f5f5f5] border-0 rounded-lg px-3 py-2 text-sm inline-block mt-1">
                        {user.companyName ? 'Previous place of work' : 'Previous employee'}
                      </div>
                    )}
                    <div className="h-px bg-gray-200 mt-4"></div>
                    <div className="mt-4 font-bold">Description:</div>
                    <div className="break-words">{comment.description}</div>
                    {comment.recommend ? (
                      <div className="flex gap-x-2 mt-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="#3460A4"
                        >
                          <path d="M21.3 10.08A3 3 0 0 0 19 9h-4.56L15 7.57A4.13 4.13 0 0 0 11.11 2a1 1 0 0 0-.91.59L7.35 9H5a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h12.73a3 3 0 0 0 2.95-2.46l1.27-7a3 3 0 0 0-.65-2.46M7 20H5a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h2zm13-7.82-1.27 7a1 1 0 0 1-1 .82H9v-9.79l2.72-6.12a2.11 2.11 0 0 1 1.38 2.78l-.53 1.43a2 2 0 0 0 1.87 2.7H19a1 1 0 0 1 .77.36 1 1 0 0 1 .23.82" />
                        </svg>
                        <div className="text-[#3460A4] my-auto">
                        {user.companyName ? 'Recommends your company' : 'Recommends you'}
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-x-2 mt-4">
                        <svg
                          className="rotate-180"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="#3460A4"
                        >
                          <path d="M21.3 10.08A3 3 0 0 0 19 9h-4.56L15 7.57A4.13 4.13 0 0 0 11.11 2a1 1 0 0 0-.91.59L7.35 9H5a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h12.73a3 3 0 0 0 2.95-2.46l1.27-7a3 3 0 0 0-.65-2.46M7 20H5a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h2zm13-7.82-1.27 7a1 1 0 0 1-1 .82H9v-9.79l2.72-6.12a2.11 2.11 0 0 1 1.38 2.78l-.53 1.43a2 2 0 0 0 1.87 2.7H19a1 1 0 0 1 .77.36 1 1 0 0 1 .23.82" />
                        </svg>
                        <div className="text-[#3460A4] my-auto">
                          {user.companyName ? "Doesn't Recommend your company" : "Doesn't Recommends you"}
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : isEmpty ? (
            <div className="text-xl">You don't have any reviews</div>
          ) : (
            <div className="text-xl">Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Reviews;
