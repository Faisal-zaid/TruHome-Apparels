import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Categories(){

  const navigate = useNavigate();

  const [categories,setCategories] = useState([]);

  useEffect(()=>{
    fetchCategories();
  },[])

  async function fetchCategories(){

    try{

      const res = await fetch(
        "https://truhome-backend-8.onrender.com/categories"
      )

      const data = await res.json()

      setCategories(data)

    }catch(err){

      console.error(err)

    }

  }

  return(

    <div className="categories">

      <h2>Shop by Category</h2>

      <div className="category-buttons">

        {categories.map(cat => (

          <button
            key={cat.id}
            onClick={()=>navigate(`/${cat.name}`)}
          >

            {cat.name.toUpperCase()}

          </button>

        ))}

      </div>

    </div>

  )

}