import React from "react";
import { useNavigate } from "react-router-dom";
//import "./Categories.css";

export default function Categories(){

  const navigate = useNavigate();

  const categories = [
    "pajamas",
    "nightdress",
    "rompers",
    "bathrobes"
  ];

  return(

    <div className="categories">

      <h2>Shop by Category</h2>

      <div className="category-buttons">

        {categories.map(cat => (

          <button
            key={cat}
            onClick={()=>navigate(`/${cat}`)}
          >
            {cat.toUpperCase()}
          </button>

        ))}

      </div>

    </div>

  )

}