import React from "react";
import star from "../assets/star.png"
import { useState } from "react";

const PutStarRating = ({ onRatingSelect }) => {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);

  const handleMouseEnter = (rating) => {
    setHoveredRating(rating);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  const handleClick = (rating) => {
    setSelectedRating(rating);
    onRatingSelect(rating);
  };

  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={hoveredRating >= star || selectedRating >= star ? "#FFD700" : "#D3D3D3"}
          className="w-6 h-6 cursor-pointer"
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(star)}
        >
          <path
            d="M12 .587l3.668 7.431 8.207 1.196-5.938 5.789 1.4 8.167L12 18.896l-7.337 3.857 1.4-8.167-5.938-5.789 8.207-1.196z"
          />
        </svg>
      ))}
    </div>
  );
};

export default PutStarRating;
