import React from "react";
import star from "../assets/star.png"

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const partialStar = rating - fullStars;
  const starArr = [];
  for (let i = 1; i <= fullStars; i++) {
    starArr.push(1);
  }
  if(rating < 5) {
    const partialStar = rating - fullStars;
  
    starArr.push(partialStar);
  
    const emptyStars = 5 - starArr.length;
  
    for(let i=1; i<=emptyStars; i++) {
      starArr.push(0);
    }
  }
  const stars = starArr.map((val, i) => {
    return <div key={i} className="w-5 h-5 my-auto"
      style={{background: `linear-gradient(90deg, #ffc107 
      ${val * 100}%, #bbbac0 ${val * 100}%)`}}>
        <img src={star}></img>
      </div>
    })

  return (
    <div className="flex gap-0.5 ml-1">
        {stars}
    </div>
  );
};

export default StarRating;
