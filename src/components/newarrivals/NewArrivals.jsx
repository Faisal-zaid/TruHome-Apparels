import React, { useEffect, useState } from "react";
import "./NewArrivals.css";

export default function NewArrivals(){

  const [items,setItems] = useState([]);

  useEffect(()=>{
    loadItems();
  },[]);

  async function loadItems(){

    const urls = [
      "https://truhome-backend-8.onrender.com/pajamas",
      "https://truhome-backend-8.onrender.com/nightdress",
      "https://truhome-backend-8.onrender.com/rompers",
      "https://truhome-backend-8.onrender.com/bathrobes"
    ];

    const responses = await Promise.all(urls.map(url=>fetch(url)));
    const data = await Promise.all(responses.map(res=>res.json()));

    const combined = data.flat();

    combined.sort((a,b)=>b.id-a.id);

    setItems(combined.slice(0,6));

  }

  return(

    <div className="arrivals">

      <h2>New Arrivals</h2>

      <div className="product-grid">

        {items.map(item => (

          <div key={item.id} className="product-card">

            <img src={item.image} alt={item.name}/>
            <h4>{item.name}</h4>
            <p>Ksh {item.price}</p>

          </div>

        ))}

      </div>

    </div>

  )

}