import React from "react";
import { Link } from "react-router-dom";

const ContentCategory = ({ category }) => {
  return (
    <div>
      <h2>{category.name}</h2>
      <div>
        {category.content.map((item) => (
          <div key={item.id}>
            <Link to={"/contentCategory"}>
              <img src={item.image} alt={item.title} />
              <p>{item.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentCategory;
