import React from "react";

const StarRating = ({ rating }) => {
  const filledStars = Math.round(rating);

  const renderStars = (count, type) => {
    const starType = type === "filled" ? "text-yellow-500" : "text-gray-400";
    const starIcon =
      type === "filled" ? (
        <svg
          className={`mx-1 w-4 h-4 fill-current ${starType}`}
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
        >
          <path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
        </svg>
      ) : (
        <svg
          className={`mx-1 w-4 h-4 fill-current ${starType}`}
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
        >
          <path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
        </svg>
      );

    return Array(count)
      .fill()
      .map((_, index) => <span key={index}>{starIcon}</span>);
  };

  return (
    <div className='flex items-center'>
      {renderStars(filledStars, "filled")}
      {renderStars(10 - filledStars, "empty")}
    </div>
  );
};

export default StarRating;
