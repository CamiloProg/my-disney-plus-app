import React from "react";

export default function CategoryCard({ text, imageUrl }) {
  return (
    <div className='daisy-card  w-52  bg-base-200 shadow daisy-image-full'>
      <figure>
        <img src={imageUrl} alt={text} />
      </figure>
      <div className='daisy-card-body flex justify-center items-center'>
        <h2 className='daisy-card-title'>{text}</h2>
      </div>
    </div>
  );
}
